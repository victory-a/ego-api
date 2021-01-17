const express = require("express");
const router = express.Router();

const {
  getBeneficiaries,
  deleteBeneficiary,
  getTransactions,
  getBalance
} = require("../controllers/user");
const { protect } = require("../middleware/index").auth;

router.use(protect);

router.get("/beneficiaries", getBeneficiaries);
router.get("/transactions", getTransactions);
router.get("/balance", getBalance);
router.delete("/beneficiary/:beneficiaryId", deleteBeneficiary);

module.exports = router;
