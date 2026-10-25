require("dotenv").config();

require("./config/database");

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});