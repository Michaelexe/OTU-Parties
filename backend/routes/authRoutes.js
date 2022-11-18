require("dotenv").config({ path: "../.env" });
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const joi = require("joi");
const format = require("pg-format");
const jwt = require("jsonwebtoken");
const passport = require("passport");

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
        "INSERT INTO user_account (username, email, password_hash) VALUES (%L, %L, %L) RETURNING username, email, user_uuid",
        req.body.username,
        req.body.email,
        hashedPassword
      )
    );

    jwt.sign(
      {
        user_uuid: user.rows[0].user_uuid,
      },
      process.env.JWTSECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.send({
          token: token,
          username: user.rows[0].username,
          email: user.rows[0].email,
        });
      }
    );
  })
);

const userLoginSchema = joi.object({
  username: joi.string().min(3).max(30).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const checkSchema = catchAsync(async (req, res, next) => {
  const loginData = req.body;
  const formData = {
    username: loginData.username,
    password: loginData.password,
  };
  await userLoginSchema.validateAsync(formData);
  console.log("schema checked");
  next();
});

router.post(
  "/login",
  checkSchema,
  catchAsync(async (req, res, next) => {
    passport.authenticate(
      "user_account_local",
      { session: false },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.json({
            status: "failed",
            message: "Wrong email or password",
          });
        }
        req.login(user, () => {
          jwt.sign(
            { user_uuid: user.user_uuid },
            process.env.JWTSECRET,
            { expiresIn: "7d" },
            (err, token) => {
              if (err) throw err;
              res.send({
                status: "success",
                data: {
                  username: user.username,
                  email: user.email,
                  joined: user.joined,
                  created: user.created,
                  token: token,
                },
              });
            }
          );
        });
      }
    )(req, res, next);
  })
);

module.exports = router;
