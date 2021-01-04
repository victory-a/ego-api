const ErrorResponse = require("../utils/errorResponse");
const { asyncHandler } = require("../middleware");
const { Beneficiary, Transaction } = require("../models");
const computeBalance = require("../utils/calculateBalance");

// GETBENEFICIARIES
exports.getBeneficiaries = asyncHandler(async (req, res, next) => {
  const beneficiaries = await Beneficiary.find({ user: req.params.userId });

  if (!beneficiaries) {
    return res.status(200).json({
      success: true,
      data: []
    });
  }

  return res.status(200).json({
    success: true,
    data: beneficiaries
  });
});

// DELETE BENEFICIARY
exports.deleteBeneficiary = asyncHandler(async (req, res, next) => {
  const beneficiary = await Beneficiary.findById(req.params.beneficiaryId);

  if (!beneficiary) {
    return next(new ErrorResponse("beneficiary not found", 404));
  }

  beneficiary.remove();
  return res.status(200).json({ success: true, message: "beneficiary deleted successfully" });
});

// GET TRANSACTIONS
exports.getTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.params.userId });

  if (!transactions) {
    return res.status(200).json({
      success: true,
      data: []
    });
  }

  return res.status(200).json({
    success: true,
    data: transactions
  });
});

// CALCULATE BALANCE
exports.getBalance = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.params.userId });

  const balance = computeBalance(transactions);

  return res.status(200).json({
    success: true,
    data: balance
  });
});
