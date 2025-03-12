const { response } = require("../utils/response");
const userModel = require("../models/user.model");

let registerUser = async (req, res, next) => {
  let { name, email, number, role } = req.body;
  let users = await userModel.create({ name, email, number, role, password });
  response(res, { status: "Added", users }, 201);
};

module.exports = { registerUser };
