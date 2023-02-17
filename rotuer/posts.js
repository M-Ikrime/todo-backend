const express = require("express");

const joiPost = require("../middlewares/post");

const router = express.Router();

router.get("/", require("../controller/post").get);

router.get("/:id", require("../controller/post").getId);

router.post("/", joiPost, require("../controller/post").post);

router.put("/:id", joiPost, require("../controller/post").put);

router.delete("/:id", require("../controller/post").delete);

module.exports = router;
