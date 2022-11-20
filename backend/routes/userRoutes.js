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

router.delete(
  "/delete",
  catchAsync(async (req, res) => {
    await db.query(
      format(
        "DELETE FROM party where party_uuid IN (SELECT DISTINCT party_uuid FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid " +
          "WHERE party_member.user_uuid=%L AND party_member.member_status='host')",
        req.user.user_uuid
      )
    );

    await db.query(
      format("DELETE FROM user_account WHERE user_uuid=%L", req.user.user_uuid)
    );

    res.send({
      status: "success",
    });
  })
);

module.exports = router;
