const express = require("express");

const app = express();

app.use("*", (req, res, next) => {
  res.json("hello world");
});

module.exports = app;
