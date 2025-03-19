const { response } = require("../utils/response");
const userModel = require("../models/user.model");

let getAllUsers = async (req, res, next) => {
  let users = await userModel.find().populate("books");
  response(res, users);
};
let getUsersById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let users = await userModel.findById(id).populate("book");
    response(res, users);
  } catch (error) {
    console.log(error);
    response(res, { message: "User provided at this id is not found!" }, 404);
  }
};
module.exports = { getAllUsers, getUsersById };
