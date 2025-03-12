const bookModel = require("../models/book.model");
const { replaceOne } = require("../models/user.model");
const { response } = require("../utils/response");
let addBooks = async (req, res, next) => {
  try {
    let { title, author, quantity, status, description, genre, image } =
      req.body;
    if (quantity <= 0) (status = "Not-available"), (quantity = 0);
    else if (status == "Not-available") quantity = 0;
    image = req.file.path;

    let books = await bookModel.create({
      title,
      author,
      quantity,
      image,
      description,
      genre,
      status,
    });
    response(res, { status: "Added!", books }, 201);
  } catch (error) {
    response(res, { message: error.message }, 501);
  }
};
let getAllBooks = async (req, res, next) => {
  let books = await bookModel.find();
  response(res, books);
};
let getBooksById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let books = await bookModel.findById(id);
    response(res, books);
  } catch (error) {
    response(res, { message: "User is not found at this id!" }, 404);
  }
};
let updateBookById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let { title, author, quantity, image, description, genre, status } =
      req.body;
    console.log(req.file);
    if (quantity <= 0) (status = "Not-available"), (quantity = 0);
    else if (status == "Not-available") quantity = 0;
    if (req.file) image = req.file.path;
    if (image == "") throw new Error("image is not provided");

    let books = await bookModel.findByIdAndUpdate(id, {
      title,
      author,
      quantity,
      image,
      description,
      genre,
      status,
    });
    response(res, { status: "Updated", books });
  } catch (error) {
    console.log(error);
    response(res, { message: "User is not found at this id!" }, 501);
  }
};
let deleteBookById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let book = await bookModel.findByIdAndDelete(id);
    response(res, { message: "deleted!" }, 204);
  } catch (error) {
    response(res, { message: "User at this provided id is not found!" }, 501);
  }
};
module.exports = {
  addBooks,
  getAllBooks,
  getBooksById,
  updateBookById,
  deleteBookById,
};
