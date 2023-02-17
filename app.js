const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

//Config Import
const config = require("./config");

//Middlewares Import
const verifyToken = require("./middlewares/verify-token");

//Router Import
const posts = require("./rotuer/posts");
const users = require("./rotuer/users");
const authenticate = require("./rotuer/authenticate");
//App Use
app.use(cors());
app.use(express.json());
app.use("/", authenticate);
// app.use("/api", verifyToken);
app.use("/api/posts", posts);
app.use("/api/user", users);
//App Set
app.set("api_secret_key", config.api_secret_key);

dotenv.config();

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected the Server..."))
    .catch((err) => {
      console.log(err);
    });
});
