const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRESQLCONNSTR_DATABASE_URL,
});

pool.connect()
    .then(client => {
        console.log('Connected');
        client.release();
    })
    .catch(err => console.error('Connection Error:', err));

module.exports = pool;
