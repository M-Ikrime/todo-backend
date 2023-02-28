const express = require("express");

const joiPost = require("../middlewares/post");

const router = express.Router();

//middleware

const auth = require("../middlewares/auth");

router.use(auth);

router.get("/", require("../controller/post").get);

router.get("/:id", require("../controller/post").getId);

router.delete("/:id", require("../controller/post").delete);

router.put("/:id", joiPost, require("../controller/post").put);

router.post("/", joiPost, require("../controller/post").post);

module.exports = router;
