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

router.get("/:userId/beneficiaries", getBeneficiaries);
router.get("/:userId/transactions", getTransactions);
router.get("/:userId/balance", getBalance);
router.delete("/beneficiary/:beneficiaryId", deleteBeneficiary);

module.exports = router;
