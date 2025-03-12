const { config } = require("dotenv");
const mongoose = require("mongoose");
const env = require("dotenv").config();

let connectDb = () => {
  try {
    mongoose
      .connect(
        process.env.DATABESE.replace("<db_password>", process.env.PASSWORD) ||
          process.env.DATABESE
      )
      .then(() => {
        console.log("MongoDb connected succesfully!");
      });
  } catch (error) {
    console.log("MongoDb connection error:", error);
  }
};

module.exports = connectDb;
