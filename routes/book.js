const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const User = require("../models/User");

router.post("/add", function(req, res) {
  User.findOne({
    token: req.headers.authorization.replace("Bearer ", "")
  }).exec(function(err, userAuthenticated) {
    if (userAuthenticated && !err) {
      const book = new Book(req.body);
      book.save(function(err, addedBook) {
        if (!err) {
          res.status(200).json(addedBook);
        } else {
          res.status(400).json("Error message", err.message);
        }
      });
    }
  });
});

module.exports = router;
