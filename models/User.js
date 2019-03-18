const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }
  ],

  token: String,
  hash: String,
  salt: String
});

module.exports = mongoose.model("User", UserSchema, "users");
