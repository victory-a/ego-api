const express = require("express");
const router = express.Router();

const { sendToBank } = require("../controllers/pay");
const { appendBalance } = require("../middleware/index");
const { protect } = require("../middleware/index").auth;

router.use(protect);

router.use(appendBalance);

router.post("/bank", sendToBank);

module.exports = router;
