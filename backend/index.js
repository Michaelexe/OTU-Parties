require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const format = require("pg-format");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

//-------------------------middleware---------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

// ------------------------------------------------------------- Passport

passport.use(
  "user_account_local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      const userinfo = await db.query(
        format("SELECT * FROM user_account where username=%L", username)
      );
      const partiesJoined = await db.query(
        format(
          "SELECT * FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid WHERE user_uuid=%L AND member_status='joined'",
          userinfo.rows[0].user_uuid
        )
      );

      const partiesCreated = await db.query(
        format(
          "SELECT * FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid WHERE user_uuid=%L AND member_status='host'",
          userinfo.rows[0].user_uuid
        )
      );
      if (userinfo.rows[0]) {
        bcrypt
          .compare(password, userinfo.rows[0].password_hash)
          .then((result) => {
            if (result) {
              done(null, {
                username: userinfo.rows[0].username,
                email: userinfo.rows[0].username,
                user_uuid: userinfo.rows[0].user_uuid,
                joined: partiesJoined.rows,
                created: partiesCreated.rows,
              });
            } else {
              done(null, false);
            }
          });
      } else {
        return done(null, false);
      }
    }
  )
);

passport.use(
  "user_account_jwt",
  new JWTStrategy(
    {
      jwtFromRequest: (req) => {
        if (req && req.headers.user_jwt) {
          return req.headers.user_jwt;
        }
      },
      secretOrKey: process.env.JWTSECRET,
    },
    async (jwt_payload, done) => {
      const results = await db.query(
        format(
          "SELECT user_uuid FROM user_account WHERE user_uuid=%L",
          jwt_payload.user_uuid
        )
      );
      const user = results.rows[0];

      if (user && user.user_uuid === jwt_payload.user_uuid) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Token not matched",
        });
      }
    }
  )
);

// ------------------------------------------------------------- Auth middleware

app.use(
  "/api/user",
  passport.authenticate("user_account_jwt", { session: false })
);

// ------------------------------------------------------------- ROUTES

app.use("/api/auth/user", authRoutes);
app.use("/api/user", userRoutes);

// ------------------------------------------------------------- LISTENER
port = process.env.SERVERPORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
