const { Pool } = require('pg');

const PG_URI = 'postgres://tuvajlhz:0B3hf6CGsyuCOLtTVBAdCiirBkXFYN2S@heffalump.db.elephantsql.com/tuvajlhz';
// psql -d 'postgres://tuvajlhz:0B3hf6CGsyuCOLtTVBAdCiirBkXFYN2S@heffalump.db.elephantsql.com/tuvajlhz' -f charity_postgres_create.sql
//create new pool using above connection string
const pool = new Pool({
    connectionString: PG_URI
});



// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};