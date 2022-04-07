// API dependencies
require('dotenv').config();
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const db = require('../models/charityModels');
const { Pool } = require('pg')

const charityAPIController = {};

charityAPIController.getCharities = async (req,res,next) => {
    const PostgreSQLColumns = ['city','country','ein','logoUrl','mission','name','url'];

    try {
        fetch('https://api.globalgiving.org/api/public/orgservice/all/organizations/active?api_key=57c25a2c-f4d8-47b2-add7-cd2e316adb3e', {
            'headers': {
            'Accept': 'application/xml',
            'Content-Type': 'application/xml'
        }})
        .then(res => res.text())
        .then(str => 
            parseString(str, (err,data) => {
            if(err) return console.log('charityAPIController.getCharities ERROR: ',err)
            const orgs = data.organizations.organization;
            
            for(let j = 0; j < orgs.length; j++){
                let cleanOrg = {};
                for(let i = 0; i < PostgreSQLColumns.length; i++){
                    let data = orgs[j][PostgreSQLColumns[i]];
                    data = !data ? 'unknown' : data[0];
                    cleanOrg[PostgreSQLColumns[i]] = data;
                }
                // console.log(`KEYS: ${Object.keys(cleanOrg)}, VALS: ${Object.values(cleanOrg)}`)
                writeDataToDB(Object.keys(cleanOrg),Object.values(cleanOrg));
            }

        }))
        next();
    } catch (err) {
        return next({
            log: `charityAPIController.getCharities: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
          message: {
            err: 'charityAPIController.getCharities: ERROR: Check server logs for details'
        }})
    }
}

writeDataToDB = async (columnNames, value) => {
    const query = `INSERT INTO public.charities
    (
        ${columnNames[0]}, ${columnNames[1]}, ${columnNames[2]},
        ${columnNames[3]}, ${columnNames[4]}, ${columnNames[5]},
        ${columnNames[6]}
    ) VALUES($1,$2,$3,$4,$5,$6,$7)`;
    

    // await db.query(query,value ,(err,res) => {
    //     if(err) console.log('ERROR: ',err)
    // })

    
    const PG_URI = 'postgres://tuvajlhz:0B3hf6CGsyuCOLtTVBAdCiirBkXFYN2S@heffalump.db.elephantsql.com/tuvajlhz';
    const pool = new Pool({
    connectionString: PG_URI
    });
    ;(async function() {
    const client = await pool.connect()
    await client.query(query, value)
    client.release()
    })()
}

module.exports = charityAPIController;