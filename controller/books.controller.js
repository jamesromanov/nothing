const bookModel = require("../models/book.model");
const { replaceOne } = require("../models/user.model");
const { response } = require("../utils/response");
let addBooks = async (req, res, next) => {
  try {
    let { title, author, quantity, status, description, genre, image } =
      req.body;
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
    response(res, error, 501);
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
    response(res, { message: "User provided at this id not found!" }, 404);
  }
};
module.exports = { addBooks, getAllBooks, getBooksById };
