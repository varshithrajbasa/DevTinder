require("dotenv").config();

const connectDB = require("./config/database");

const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log("Request 1");
  res.send("Request 1");
  next();
}, (req, res, next) => {
console.log("Request 2");
res.send("Request 2");
})

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get('/about', (req, res) => {
  res.send("This is the about page.");
});

connectDB().then(() => {
    console.log("Connected to MongoDB");


}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

