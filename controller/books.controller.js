const bookModel = require("../models/book.model");
const { errorHandler } = require("../utils/errorHandler");
const { response } = require("../utils/response");
const Joi = require("joi");

let addBooksValidator = Joi.object({
  title: Joi.string().min(0).max(50),
  author: Joi.string().min(4).max(20),
  quantity: Joi.number().min(3).max(100),
  image: Joi.string().min(3).max(20),
  description: Joi.string().min(2).max(20),
  genre: Joi.string().min(2).max(15),
  status: Joi.string().min(2).max(20),
  users: Joi.string(),
});

let addBooks = errorHandler(async (req, res, next) => {
  let { title, author, quantity, status, description, genre, image, users } =
    req.body;
  if (quantity <= 0) (status = "Not-available"), (quantity = 0);
  else if (status == "Not-available") quantity = 0;
  image = req.file.path;
  let data = await addBooksValidator.validate(req.body);
  if (data.error) throw new Error("pls enter the title correctly!");
  let books = await bookModel.create({
    title,
    author,
    quantity,
    image,
    description,
    genre,
    status,
    users,
  });
  response(res, { status: "Added!", books }, 201);
});
let getAllBooks = async (req, res, next) => {
  let books = await bookModel.find().populate({ path: "users" });
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
