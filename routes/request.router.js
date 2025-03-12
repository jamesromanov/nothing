const express = require("express");
const reqController = require("../controller/req.controller");
const requestRouter = express.Router();

requestRouter.route("/requests").get(reqController.getAllReqs);
requestRouter.route("/borrow/:bookId").post(reqController.addReq);
requestRouter.route("/requests/:requestId").put(reqController.updateReq);
requestRouter.route("/my-borrows").get(reqController.getBorrowBooks);
module.exports = requestRouter;
