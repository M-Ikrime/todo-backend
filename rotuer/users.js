const express = require("express");
const router = express.Router();

router.post("/", require("../controller/user").post);

router.get("/", require("../controller/user").get);

router.get("/:user_id", require("../controller/user").getId);

router.put("/:user_id", require("../controller/user").put);

router.delete("/:user_id", require("../controller/user").delete);

module.exports = router;
