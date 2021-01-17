const ErrorResponse = require("../utils/errorResponse");
const { asyncHandler } = require("../middleware");
const { Transaction, User } = require("../models");

exports.sendToBank = asyncHandler(async (req, res, next) => {
  const { id, balance } = req.user;
  const { amount, category, recipient } = req.body;

  if (category === "debit" && amount > balance) {
    return next(new ErrorResponse("Insufficient Funds", 400));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse("Invalid request", 400));
  }
  const transaction = await Transaction.create({
    user: id,
    amount,
    category,
    type: "BANK_TRANSFER",
    recipient
  });

  return res.status(200).json({
    success: true,
    message: "Transaction Succesful",
    data: transaction
  });
});

exports.buyAirtime = asyncHandler(async (req, res, next) => {
  const { id, balance } = req.user;
  const { amount, category, recipient } = req.body;

  if (amount > balance) {
    return next(new ErrorResponse("Insufficient Funds", 400));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse("Invalid request", 400));
  }
  const transaction = await Transaction.create({
    user: id,
    amount,
    category,
    type: "VTU",
    recipient
  });

  return res.status(200).json({
    success: true,
    message: "Transaction Succesful",
    data: transaction
  });
});

exports.payBill = asyncHandler(async (req, res, next) => {
  const { id, balance } = req.user;
  const { amount, category, recipient } = req.body;

  if (req.body.amount > balance) {
    return next(new ErrorResponse("Insufficient Funds", 400));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse("Invalid request", 400));
  }

  const transaction = await Transaction.create({
    user: id,
    amount,
    category,
    type: "UTILITY_BILL",
    recipient
  });

  return res.status(200).json({
    success: true,
    message: "Transaction Succesful",
    data: transaction
  });
});

exports.transferMobile = asyncHandler(async (req, res, next) => {
  const { id, balance } = req.user;
  const { recipients } = req.body;
  let completed = [];

  if (recipients.length > 0) {
    const totalAmount = recipients.reduce((acc, { amount }) => Number(acc) + Number(amount), 0);

    if (totalAmount > balance) {
      return next(new ErrorResponse("Insufficient Funds", 400));
    }

    recipients.forEach(async recipient => {
      const { amount, mobile, remark } = recipient;
      const transaction = await Transaction.create({
        user: id,
        amount,
        recipient: { mobile, remark },
        category: "debit",
        type: "PHONE_TRANSFER"
      });

      completed.push(transaction);
      // console.log(completed);
    });

    return res.status(200).json({
      success: true,
      message: "Transaction Succesful",
      data: {
        transactions: completed
      }
    });
  } else {
    return next(new ErrorResponse("Invalid requesr", 400));
  }
});
