const { Pool } = require("pg");

const db = new Pool();
//   {
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   }

module.exports = { db };
