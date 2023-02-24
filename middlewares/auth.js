const jwt = require("jsonwebtoken");

const User = require("../models/users");
module.exports = (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    jwt.verify(
      authToken,
      req.app.get("api_secret_key"),
      async (err, decoded) => {
        if (err) return;
        const findUser = await User.findById(decoded.id);
        if (!findUser) return;
        req.user = decoded;
        next();
        return;
      }
    );
  } catch (error) {
    console.log(error);
  }
};
