const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  token: String,
  hash: String,
  salt: String
});

module.exports = mongoose.model("User", UserSchema, "users");
