const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { api_secret_key } = require("../config");

module.exports = {
  get: async (req, res, next) => {
    res.render("index", { title: "express" });
  },
  post: async (req, res) => {
    const { username, password } = req.body;
    await User.findOne(
      {
        username,
      },
      (err, user) => {
        if (err) {
          throw err;
        }
        if (!user) {
          res.status(404).json({
            status: false,
            message: "Authentication is failed, user not found.",
          });
        } else {
          bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
              res.status(404).json({
                status: false,
                message: "Authentication is failed, wrong password.",
              });
            } else {
              const payload = {
                username,
              };
              const token = jwt.sign(payload, req.app.get("api_secret_key"), {
                expiresIn: 720, // 12 saat
              });
              res.json({
                status: true,
                token,
              });
            }
          });
        }
      }
    );
  },
};
