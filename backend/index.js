require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const authRoutes = require("./routes/authRoutes.js");

const app = express();

//-------------------------middleware---------------------------------

app.use(express.json());
app.use(cors());

// ------------------------------------------------------------- ROUTES

app.use("/api/auth/user", authRoutes);

// ------------------------------------------------------------- LISTENER
port = process.env.SERVERPORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
