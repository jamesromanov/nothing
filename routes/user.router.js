const express = require("express");

const userRouter = express.Router();
const userController = require("../controller/user.controller");

userRouter.route("/register").post(userController.registerUser);
userRouter.route("/profile").get(userController.getAllUsers);
userRouter.route("/profile/:id").get(userController.getUsersById);

module.exports = userRouter;
