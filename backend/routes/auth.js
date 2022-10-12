var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
var db = require("../db");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "passwd",
    },
    function (username, password, done) {
      // ...
    }
  )
);
