const express = require("express");
const booksController = require("../controller/books.controller");
const booksRouter = express.Router();
const path = require("path");
const multer = require("multer");
const { stdin } = require("process");
let storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.floor(Math.random() * 1000) +
        "-" +
        "book" +
        (path.extname(file.originalname) || file.originalname)
    );
  },
});
let upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    let extName = path.extname(file.originalname);
    if (extName == ".png") cb(null, true);
    else cb(null, false);
  },
});
booksRouter
  .route("/books")
  .get(booksController.getAllBooks)
  .post(upload.single("image"), booksController.addBooks);
booksRouter
  .route("/books/:id")
  .get(booksController.getBooksById)
  .put(upload.single("image"), booksController.updateBookById)
  .delete(booksController.deleteBookById);

module.exports = booksRouter;
