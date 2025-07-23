const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('🟢 Conectado a PostgreSQL'))
  .catch((err) => console.error('🔴 Error al conectar a la BD:', err));

module.exports = pool;

