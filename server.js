const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/books-api",
  {
    useNewUrlParser: true
  }
);

app.get("/", function(req, res) {
  res.json({ message: "Welcome to the Books API" });
});

//-----MODELS-----//
const Book = require("./models/Book");
const User = require("./models/User");

//-----ROUTES-----//
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

app.use("/api/book", bookRoutes);
app.use("/api/user", userRoutes);

app.all("*", function(req, res) {
  res.status(404).json({ error: "Not Found" });
});

app.listen(process.env.PORT || 3100, function() {
  console.log("Server started");
});
