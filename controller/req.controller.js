const { response } = require("../utils/response");
const bookModel = require("../models/book.model");
const reqModel = require("../models/requests.model");

let addReq = async (req, res, next) => {
  try {
    let ownerId = req.params.bookId;
    let { _id } = await bookModel.findById(ownerId);
    ownerId = _id;
    let { requestedBook, canRent } = req.body;
    let requests = await reqModel.create({ requestedBook, canRent, ownerId });
    response(res, { message: "Added!", requests }, 201);
  } catch (error) {
    response(res, { message: error.message });
  }
};
let getAllReqs = async (req, res, next) => {
  let requests = await reqModel.find();
  response(res, requests);
};
let updateReq = async (req, res, next) => {
  try {
    let requestId = req.params.requestId;
    let { canRent, requestedBook } = req.body;
    let requests = await reqModel.findByIdAndUpdate(requestId, {
      canRent,
      requestedBook,
    });
    response(res, requests);
  } catch (error) {
    response(res, { message: "Not found!" });
  }
};
let getBorrowBooks = async (req, res, next) => {
  let requests = await reqModel.find();
  requests = requests.filter((x) => x.canRent == true);
  response(res, requests ?? { message: "No borrowed books" });
};
module.exports = { addReq, getAllReqs, updateReq, getBorrowBooks };
