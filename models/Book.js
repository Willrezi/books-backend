const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  editor: String,
  country: String,
  genre: String,
  pages: Number,
  note: Number,
  read: String,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Book", BookSchema, "books");
