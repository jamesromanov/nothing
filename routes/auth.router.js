const express = require("express");
const authConroller = require("../controller/auth.controller");
const authRouter = express.Router();
authRouter.route("/register").post(authConroller.registerUser);
authRouter.route("/login").post(authConroller.loginUser);
module.exports = authRouter;
