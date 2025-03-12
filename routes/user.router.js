const express = require("express");

const userRouter = express.Router();
const userController = require("../controller/user.controller");

userRouter.route("/register").post(userController.registerUser);

module.exports = userRouter;
