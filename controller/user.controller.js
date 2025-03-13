const { response } = require("../utils/response");
const userModel = require("../models/user.model");

let registerUser = async (req, res, next) => {
  try {
    let { name, email, mobile, role, password } = req.body;
    let users = await userModel.create({ name, email, mobile, role, password });
    response(res, { status: "Added", users }, 201);
  } catch (error) {
    response(res, { message: error.message }, 501);
  }
};
let getAllUsers = async (req, res, next) => {
  let users = await userModel.find();
  response(res, users);
};
let getUsersById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let users = await userModel.findById(id);
    response(res, users);
  } catch (error) {
    response(res, { message: "User provided at this id is not found!" }, 404);
  }
};
module.exports = { registerUser, getAllUsers, getUsersById };
