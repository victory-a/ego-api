const express = require("express");
const router = express.Router();

const { fetchBanks, gotvPlans, dstvPlans, kwesePlans } = require("../controllers/data");

router.get("/banks", fetchBanks);
router.get("/gotv", gotvPlans);
router.get("/dstv", dstvPlans);
router.get("/kwese", kwesePlans);

module.exports = router;
