const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const joi = require("joi");
const format = require("pg-format");

const router = express.Router({ mergeParams: true });

const userRegisterSchema = joi
  .object({
    username: joi.string().min(3).max(30).required(),
    email: joi
      .string()
      .pattern(new RegExp("^[A-Za-z0-9._%+-]+@ontariotechu.net$"))
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeatPassword: joi.ref("password"),
  })
  .with("password", "repeatPassword");

router.post(
  "/register",
  catchAsync(async (req, res) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const formData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
    };

    await userRegisterSchema.validateAsync(formData);

    const user = await db.query(
      format(
        "INSERT INTO user_account (username, email, password_hash) VALUES (%L, %L, %L) RETURNING username, email",
        req.body.username,
        req.body.email,
        hashedPassword
      )
    );

    res.send({
      message: "success",
      user: user.rows[0],
    });
  })
);

module.exports = router;
