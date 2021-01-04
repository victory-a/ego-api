const ErrorResponse = require("../utils/errorResponse");
const { asyncHandler } = require("../middleware");
const { Transaction } = require("../models");

exports.sendToBank = asyncHandler(async (req, res, next) => {
  const { id, balance } = req.user;

  return res.status(200).json({
    success: true
  });
});
