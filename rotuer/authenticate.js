const express = require("express");
const router = express.Router();

router.get("/", require("../controller/auth").get);
router.post("/register", require("../controller/auth").post);

module.exports = router;
