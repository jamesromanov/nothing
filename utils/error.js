const { response } = require("../utils/response.js");

let errorMiddle = (err, req, res, next) => {
  console.log(err);

  response(res);
};

module.exports = errorMiddle;
