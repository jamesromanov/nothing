let errorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      res.json({ message: err });
      console.log(err);
    });
  };
};

module.exports = { errorHandler };
