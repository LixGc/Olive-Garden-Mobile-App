const express = require("express");
const router = express.Router();

router.use(require("./menu"));
router.use(require("./user"));

module.exports = router;
