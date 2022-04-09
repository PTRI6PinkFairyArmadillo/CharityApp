// API dependencies
require('dotenv').config();
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const db = require('../models/charityModels');
const { Pool } = require('pg')

const charityAPIController = {};

charityAPIController.loadCharities = async (req,res,next) => {
    const PostgreSQLColumns = ['name','city','country','url','mission','ein'];

    try {
        fetch('https://api.globalgiving.org/api/public/orgservice/all/organizations/active?api_key=57c25a2c-f4d8-47b2-add7-cd2e316adb3e', {
            'headers': {
            'Accept': 'application/xml',
            'Content-Type': 'application/xml'
        }})
        .then(res => res.text())
        .then(str => 
            parseString(str, (err,data) => {
            if(err) return console.log('charityAPIController.loadCharities ERROR: ',err)
            const orgs = data.organizations.organization;
            
            for(let j = 0; j < orgs.length; j++){
                let cleanOrg = {};
                for(let i = 0; i < PostgreSQLColumns.length; i++){
                    let data = orgs[j][PostgreSQLColumns[i]];
                    data = !data ? 'unknown' : data[0];
                    cleanOrg[PostgreSQLColumns[i]] = data;
                }
                writeDataToDB(Object.keys(cleanOrg),Object.values(cleanOrg));
            }

        }))
        next();
    } catch (err) {
        return next({
            log: `charityAPIController.loadCharities: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
          message: {
            err: 'charityAPIController.loadCharities: ERROR: Check server logs for details'
        }})
    }
}


charityAPIController.getCharities = async (req, res, next) => {

    const query = `
      SELECT
      *
      FROM
      public.charities
    `;

    db.query(query, [], (error, response) => {
        // if (!response.rows.length) return next({
        //     log: `charityAPI.getCharities: ERROR: No charities found in DB`,
        // });
        res.locals.charities = response.rows;
        return next();
    })
}


writeDataToDB = async (columnNames, value) => {
    console.log('VALUE', value)
    const query = `INSERT INTO public.charities
    (
        ${columnNames[0]}, ${columnNames[1]}, ${columnNames[2]},
        ${columnNames[3]}, ${columnNames[4]}, ${columnNames[5]}
    ) VALUES($1,$2,$3,$4,$5,$6)`;
    
    const PG_URI = 'postgres://tuvajlhz:0B3hf6CGsyuCOLtTVBAdCiirBkXFYN2S@heffalump.db.elephantsql.com/tuvajlhz';
    const pool = new Pool({
    connectionString: PG_URI
    });

    const client = await pool.connect()
    await client.query(query, value)
    client.release()
}

module.exports = charityAPIController;