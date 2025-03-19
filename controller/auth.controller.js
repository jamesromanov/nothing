const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { response } = require("../utils/response");
const bcrypt = require("bcryptjs");
require("dotenv").config();
let registerUser = async (req, res, next) => {
  try {
    let { name, email, mobile, role, password, books } = req.body;
    let [emailChecking, nameChecking] = await Promise.all([
      userModel.find({ email }),
      userModel.find({ name }),
    ]);
    if (emailChecking.length || nameChecking.length)
      throw new Error(
        `${emailChecking.length ? "email" : "name"} already existed!`
      );

    let users = await userModel.create({
      name,
      email,
      mobile,
      role,
      password,
      books,
    });
    console.log(req.body);
    response(res, { status: "Added", users }, 201);
  } catch (error) {
    console.log(error);
    response(res, { message: error.message }, 501);
  }
};

let loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let checkUser = await userModel
      .findOne({ email })
      .select("name email phone books password");
    if (!checkUser) throw new Error("You haven't signed in before!");
    console.log(checkUser.password);
    let check = await bcrypt.compare(password, checkUser.password);
    if (!check) throw new Error("Password is incorrect!");
    let token = jwt.sign(
      { id: checkUser.id, role: checkUser.role },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "1h" }
    );
    console.log(token);
    response(res, { status: "Succss", checkUser }, 201);
  } catch (error) {
    response(res, { message: error.message }, 501);
  }
};

module.exports = { registerUser, loginUser };
