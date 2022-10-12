const { Pool } = require("pg");

const Pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
});

module.exports = { Pool };
