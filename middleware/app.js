const express = require("express");
const userRouter = require("../routes/user.router");
const booksRouter = require("../routes/book.router");
const requestRouter = require("../routes/request.router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter, booksRouter, requestRouter);

module.exports = app;
