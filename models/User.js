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

  token: String,
  hash: String,
  salt: String
});

module.exports = mongoose.model("User", UserSchema, "users");
