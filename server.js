require("dotenv").config();

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

const cors = require("cors");
app.use("/api", cors());

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
  res.status(404).json({ error: "404 Not Found" });
});

app.use(function(err, req, res, next) {
  if (res.statusCode === 200) res.status(400);
  console.error(err);

  // if (process.env.NODE_ENV === "production") err = "An error occurred";
  res.json({ error: err });
});

app.listen(process.env.PORT, function() {
  console.log(`Books API running on port ${process.env.PORT}`);
});
