const mongoose = require("mongoose");
const { stripLow } = require("validator");

let reqSchema = new mongoose.Schema({
  requestedBook: {
    type: String,
    required: [true, "Please type your requested book!"],
    minLenght: 2,
  },
  ownerId: { type: String, required: true },
  canRent: { type: Boolean, default: false, enum: [true, false] },
  date: { type: String, default: Date.now().toString() },
});

let reqModel = mongoose.model("requests", reqSchema);
module.exports = reqModel;
