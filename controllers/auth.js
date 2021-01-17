const ErrorResponse = require("../utils/errorResponse");
const { asyncHandler } = require("../middleware");
const { User, Beneficiary, Transaction } = require("../models");

const beneficiaries = require("../data/savedAccounts");
const transactions = require("../data/transactions");

// SENDS A RESPONSE WITH TOKEN IN BODY AND COOKIE
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getAuthToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};

// VALIDATE USER
exports.validateUser = asyncHandler(async (req, res, next) => {
  const { mobile } = req.body;

  if (!mobile) {
    return next(new ErrorResponse("Kindly provide a mobile", 400));
  }

  const user = await User.findOne({ mobile });

  if (!user) {
    return res.status(200).json({
      success: true,
      validUser: false,
      message: "Begin user registration"
    });
  }

  return res.status(200).json({
    success: true,
    validUser: true,
    message: "User validation successful"
  });
});

// REGISTER
exports.register = asyncHandler(async (req, res, next) => {
  const { mobile, pin } = req.body;

  if (!mobile || !pin) {
    return next(new ErrorResponse("Kindly provide a mobile and pin", 400));
  }
  const user = await User.create({ mobile, pin });

  // populate with fake saved beneficiaries
  const updatedBeneficiaries = beneficiaries.map(beneficiary => {
    beneficiary.user = user._id;
    return beneficiary;
  });
  Beneficiary.create(updatedBeneficiaries);

  // populate with fake saved transactions
  const updatedTransactions = transactions.map(transaction => {
    transaction.user = user._id;
    return transaction;
  });
  Transaction.create(updatedTransactions);

  sendTokenResponse(user, 201, res);
});

// LOGIN
exports.login = asyncHandler(async (req, res, next) => {
  const { mobile, pin } = req.body;

  if (!mobile || !pin) {
    return next(new ErrorResponse("Kindly provide a mobile and pin", 400));
  }

  const user = await User.findOne({ mobile }).select("+pin");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  if (!(await user.verifyPin(pin))) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// CURRENT USER
exports.currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// DELETE USER
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  user.remove();
  res.status(200).json({ success: true, data: {} });
});
