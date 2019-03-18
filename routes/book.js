const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const Book = require("../models/Book");
const User = require("../models/User");

router.post("/add", isAuthenticated, function(req, res) {
  const book = new Book(req.body);
  console.log("body", req.body);

  book.save(function(err, addedBook) {
    if (!err) {
      //   user.save();
      res.status(200).json(addedBook);
    } else {
      res.status(400).json("Error message", err.message);
    }
  });
});

module.exports = router;
