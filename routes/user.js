const express = require("express");
const router = express.Router();

const validator = require("validator");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.post("/sign_up", function(req, res, next) {
  if (validator.isEmail(req.body.email) === false) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const newUser = new User(req.body);
  const password = req.body.password;
  const token = uid2(16);
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);

  newUser.email = req.body.email;
  newUser.username = req.body.username;
  newUser.token = token;
  newUser.hash = hash;
  newUser.salt = salt;

  if (!req.body.password) {
    return res.status(400).json({ error: "Password is missing !" });
  } else {
    newUser.save(function(err, createdUser) {
      if (err) {
        return next({ error: err.message });
      } else {
        return res.status(200).json(createdUser);
      }
    });
  }
});

module.exports = router;
