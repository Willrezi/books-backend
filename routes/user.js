const express = require("express");
const router = express.Router();

const validator = require("validator");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

module.exports = router;
