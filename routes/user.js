const express = require("express");
const router = express.Router();

const validator = require("validator");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

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
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(200).json(createdUser);
      }
    });
  }
});

router.post("/log_in", function(req, res) {
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).exec(function(err, myUser) {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else if (myUser === null) {
      return res.status(400).json({ error: "Email or username don't exist" });
    } else {
      const userInfo = { account: {} };
      const password = req.body.password;
      const salt = myUser.salt;
      const verifiedHash = SHA256(password + salt).toString(encBase64);
      if (verifiedHash === myUser.hash) {
        userInfo._id = myUser._id;
        userInfo.token = myUser.token;
        userInfo.username = myUser.username;
        return res.status(200).json(userInfo);
      } else {
        return res.status(400).json({ error: "Login is not correct" });
      }
    }
  });
});

router.get("/myBooksList/:id", isAuthenticated, function(req, res) {
  User.find({ _id: req.params.id })
    //   query
    //     .skip(0)
    //     .limit(4)
    .populate({ path: "books" })
    .exec((err, myBooksFound) => {
      //   console.log("error", err);
      res.json(myBooksFound);
    });
});

module.exports = router;
