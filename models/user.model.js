const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { useConnection } = require("./book.model");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      validate: {
        validator: (email) => {
          if (validator.isEmail(email)) {
            return true;
          } else {
            return false;
          }
        },
        message: "Please enter valid email!",
      },
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 16,
      minLowercase: 1,
      minUppercase: 1,
      validate: {
        validator: (password) => {
          if (validator.isStrongPassword(password)) {
            return true;
          } else {
            return false;
          }
        },
        message: "Password must be strong password!",
      },
      select: false,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    mobile: {
      type: String,
      validate: {
        validator: (number) => {
          const config = {
            countryCode: "+998",
            validMobileCodes: [
              "33",
              "50",
              "55",
              "61",
              "62",
              "65",
              "66",
              "67",
              "69",
              "71",
              "72",
              "73",
              "74",
              "75",
              "76",
              "77",
              "78",
              "79",
              "88",
              "90",
              "91",
              "93",
              "94",
              "95",
              "97",
              "98",
              "99",
            ],
            totalLength: 12,
            digitLength: 9,
          };
          const cleanedValue = number.replace(/[-()\s]/g, "");
          if (
            cleanedValue.length !== 13 ||
            !cleanedValue.startsWith("+998") ||
            !config.validMobileCodes.includes(cleanedValue.slice(4, 6))
          ) {
            return false;
          }
          for (let i of cleanedValue.slice(6)) {
            if (i < "0" || i > "9") {
              return false;
            }
          }
          return true;
        },
        message: "Phone number is invalid!",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  let password = this.password;
  this.password = await bcrypt.hash(password, 12);
  next();
});
userSchema.post(/^find/, async function () {
  this.where({ password: { select: false } });
});
userSchema.virtual("book", {
  ref: "books",
  localField: "_id",
  foreignField: "users",
});
let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
