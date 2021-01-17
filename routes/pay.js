const express = require("express");
const router = express.Router();

const { sendToBank, buyAirtime, payBill, transferMobile } = require("../controllers/pay");
const { appendBalance } = require("../middleware/index");
const { protect } = require("../middleware/index").auth;

router.use(protect);

router.use(appendBalance);

router.post("/bank", sendToBank);
router.post("/airtime", buyAirtime);
router.post("/utility", payBill);
router.post("/mobile", transferMobile);

module.exports = router;
