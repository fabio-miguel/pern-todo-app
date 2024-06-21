const { Pool } = require("pg");

let pool;

function connectDb() {
  if (!pool) {
    pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    });
  }
  return pool;
}

async function disconnectDb() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = { connectDb, disconnectDb };
