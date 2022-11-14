require("dotenv").config({ path: "../.env" });
const express = require("express");
const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const format = require("pg-format");

const router = express.Router({ mergeParams: true });

router.get(
  "/info",
  catchAsync(async (req, res, next) => {
    const userinfo = await db.query(
      format(
        "SELECT username, email FROM user_account where user_uuid=%L",
        req.user.user_uuid
      )
    );
    const partiesJoined = await db.query(
      format(
        "SELECT * FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid WHERE user_uuid=%L AND member_status!='host'",
        req.user.user_uuid
      )
    );

    const partiesCreated = await db.query(
      format(
        "SELECT * FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid WHERE user_uuid=%L AND member_status='host'",
        req.user.user_uuid
      )
    );

    res.send({
      ...userinfo.rows[0],
      joined: partiesJoined.rows,
      created: partiesCreated.rows,
    });
  })
);

module.exports = router;
