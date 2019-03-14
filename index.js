const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/books-api"
);

app.get("/", function(req, res) {
  res.json({ message: "Hello API" });
});

//-----MODELS-----//

// BOOK MODEL //
const bookModel = mongoose.model("Book", {
  title: String,
  author: String,
  editor: String,
  country: String,
  genre: String,
  pages: Number,
  note: Number,
  read: String
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
