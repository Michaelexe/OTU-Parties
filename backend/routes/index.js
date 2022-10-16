const express = require("express");
const router = express.Router();
const auth = require("auth");
const { db } = require("../db");

function isUser(email) {
  // look into select exists
  db.query("EXISTS (SELECT $1 from member)", email);
}

/* POST register new member */
router.post("/register", (req, res, next) => {
  // Check if user already exists
  // Add new member
  // db.query("INSERT INTO member ()");
});

module.exports = router;
