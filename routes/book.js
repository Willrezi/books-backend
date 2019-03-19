const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const Book = require("../models/Book");
const User = require("../models/User");

router.post("/add", isAuthenticated, function(req, res) {
  const obj = {
    title: req.body.title,
    author: req.body.author,
    editor: req.body.editor,
    country: req.body.country,
    genre: req.body.genre,
    pages: req.body.pages,
    note: req.body.note,
    read: req.body.read,
    user: req.user
  };

  const book = new Book(obj);
  book.save(function(err, addedBook) {
    if (!err) {
      req.user.books.push(book._id);
      req.user.save();
      res.status(200).json(addedBook);
    } else {
      res.status(400).json("Error message", err.message);
    }
  });
});

module.exports = router;
