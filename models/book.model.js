const mongoose = require("mongoose");
const { validate } = require("./user.model");
const { MongoOIDCError } = require("mongodb");

let bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the book's title!"],
    validate: {
      validator: (title) => {
        let n = title.replace(/[-()\s!@><{}/|#]/g, "");
        if (title.length !== n.length) {
          return false;
        } else {
          return true;
        }
      },
      message: "Please enter valid input for the title!",
    },
    minLength: 4,
    maxLength: 20,
  },
  author: {
    type: String,
    required: [true, "Please enter book's author!"],
    minLength: 2,
    maxLength: 20,
    validate: {
      validator: (author) => {
        let n = author.replace(/[-()\s!@#]/g, "");
        if (author.length !== n.length) {
          return false;
        } else {
          return true;
        }
      },
      message: "Please enter valid input for the author!",
    },
  },
  image: { type: String, required: [true, "Image must be uploaded!"] },
  genre: {
    type: String,
    enum: [
      "fiction",
      "science-fiction",
      "mystery",
      "novel",
      "Non-fiction",
      "thriller",
    ],
    required: [true, "Genre must be chosen!"],
  },
  description: { type: String, default: "This is a book!" },
  status: {
    type: String,
    required: [true, "Please choose whether Available or Not Available"],
    enum: ["Available", "Not-available"],
  },
  quantity: { type: Number, required: [true, "Quantity must be provided"] },
});

let bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
