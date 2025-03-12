const response = (res, data, sts = 200) => {
  if (!data) res.status(500).json({ message: "Something broke!" });
  else res.status(sts).json(data);
};

module.exports = { response };
