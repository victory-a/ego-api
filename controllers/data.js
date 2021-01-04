const ErrorResponse = require("../utils/errorResponse");
const { asyncHandler } = require("../middleware");
const { gotv, dstv, kwese, banks } = require("../data");

exports.fetchBanks = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ data: banks });
});

exports.gotvPlans = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ data: gotv });
});

exports.dstvPlans = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ data: dstv });
});

exports.kwesePlans = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ data: kwese });
});
