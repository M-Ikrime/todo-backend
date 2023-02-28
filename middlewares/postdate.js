const Posts = require("../models/post");

module.exports = (req, res, next) => {
  const { endDate } = req.params;
  date = new Date();

  if (!endDate) {
    return console.log("hataaaa");
  }
  if (date - endDate > 0) {
    next();
  } else {
    return "asdf";
  }
};
