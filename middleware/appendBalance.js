const asyncHandler = require("./asyncHandler");
const { Transaction } = require("../models");
const calculateBalance = require("../utils/calculateBalance");

const appendBalance = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.user.id });
  if (!transactions) {
    next();
  }

  const balance = calculateBalance(transactions);
  req.user.balance = balance;
  next();
});

module.exports = appendBalance;
