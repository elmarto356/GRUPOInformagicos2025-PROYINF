const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres_db',
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
});

async function ping() {
  const r = await pool.query('SELECT NOW() AS now');
  return r.rows[0].now;
}

module.exports = { pool, ping };
