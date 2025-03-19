const express = require("express");
const userRouter = require("../routes/user.router");
const booksRouter = require("../routes/book.router");
const requestRouter = require("../routes/request.router");
const errorMiddle = require("../utils/error");
const authRouter = require("../routes/auth.router");

const app = express();
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
app.use(errorMiddle);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter, booksRouter, requestRouter, authRouter);

module.exports = app;
