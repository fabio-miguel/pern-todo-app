const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5433,
  database: "perntodo"
});

console.log(process.env.DB_PASSWORD)

module.exports = pool;