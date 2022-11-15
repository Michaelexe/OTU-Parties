require("dotenv").config({ path: "../.env" });
const express = require("express");
const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const format = require("pg-format");

const router = express.Router({ mergeParams: true });

router.post(
  "/create",
  catchAsync(async (req, res) => {
    const formData = {
      name: req.body.party_name,
      location: req.body.location,
      date_time: req.body.date_time,
      description: req.body.description,
    };

    console.log(formData);

    const party = await db.query(
      format(
        "INSERT INTO party (party_name, location, date_time, description) VALUES (%L, %L, %L, %L) RETURNING party_uuid, party_name, location, date_time, description",
        formData.name,
        formData.location,
        formData.date_time,
        formData.description
      )
    );

    if (party.rows[0]) {
      const party_member = await db.query(
        format(
          "INSERT INTO party_member (user_uuid, party_uuid, member_status) VALUES (%L, %L, 'host') RETURNING party_uuid",
          req.user.user_uuid,
          party.rows[0].party_uuid
        )
      );

      if (party_member.rows[0]) {
        res.send({
          status: "success",
          party: party.rows[0],
        });
      }
    }
  })
);

router.get(
  "/all",
  catchAsync(async (req, res) => {
    const parties = await db.query(
      format(
        "SELECT * FROM party WHERE party_uuid NOT IN " +
          "(SELECT party.party_uuid FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid WHERE user_uuid=%L)",
        req.user.user_uuid
      )
    );
    if (parties.rows[0]) {
      res.send({
        status: "success",
        parties: parties.rows,
      });
    }
  })
);

router.post(
  "/join",
  catchAsync(async (req, res) => {
    console.log(req.body.party_uuid);
    const result = await db.query(
      format(
        "INSERT INTO party_member (party_uuid, user_uuid, member_status) VALUES (%L, %L, 'pending') RETURNING party_uuid",
        req.body.party_uuid,
        req.user.user_uuid
      )
    );

    if (result.rows[0]) {
      res.send({
        status: "success",
      });
    }
  })
);

router.get(
  "/requests",
  catchAsync(async (req, res) => {
    const requests = await db.query(
      format(
        "SELECT username, party_name, party_member.user_uuid, party.party_uuid FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid " +
          "JOIN user_account ON user_account.user_uuid=party_member.user_uuid WHERE party.party_uuid IN " +
          "(SELECT DISTINCT party.party_uuid FROM party JOIN party_member ON party.party_uuid=party_member.party_uuid WHERE " +
          "party_member.user_uuid=%L AND party_member.member_status='host') AND party_member.member_status='pending'",
        req.user.user_uuid
      )
    );

    res.send({
      status: "success",
      data: requests.rows,
    });
  })
);

router.put(
  "/accept",
  catchAsync(async (req, res) => {
    const result = await db.query(
      format(
        "UPDATE party_member SET member_status='joined' WHERE party_uuid=%L AND user_uuid=%L RETURNING member_status",
        req.body.party_uuid,
        req.body.user_uuid
      )
    );

    if (result.rows[0] && result.rows[0].member_status) {
      res.send({
        status: "success",
      });
    } else {
      res.send({
        status: "failed",
      });
    }
  })
);

router.delete(
  "/decline",
  catchAsync(async (req, res) => {
    const result = await db.query(
      format(
        "DELETE FROM party_member WHERE party_uuid=%L AND user_uuid=%L AND member_status='pending'",
        req.body.party_uuid,
        req.body.user_uuid
      )
    );

    res.send({
      status: "success",
    });
  })
);

module.exports = router;
