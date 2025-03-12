const mongoose = require("mongoose");
const validator = require("validator");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validator: {
      validator: (email) => {
        if (validator.isEmail(email)) {
          return true;
        } else {
          return false;
        }
      },
      message: "Please enter valid email!",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 16,
    minLowercase: 1,
    minUppercase: 1,
    validator: {
      validator: (password) => {
        if (validator.isStrongPassword(password)) {
          return true;
        } else {
          return false;
        }
      },
      message: "Password must be strong password!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  mobile: {
    type: String,
    validator: {
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
          cleanedValue.length !== 12 ||
          cleanedValue.startsWith("+998") ||
          validMobileCodes.includes(cleanedValue.slice(4, 6))
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
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
