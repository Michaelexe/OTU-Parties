require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  password: process.env.PGPASSWORD,
  port: 5432,
  host: "localhost",
  database: "otu_parties",
});

module.exports = db;
