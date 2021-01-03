const ErrorResponse = require("../utils/errorResponse");
const { asyncHandler } = require("../middleware");
const { User } = require("../models");

// SENDS A RESPONSE WITH TOKEN IN BODY AND COOKIE
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getAuthToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};

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

exports.register = asyncHandler(async (req, res, next) => {
  const { mobile, pin } = req.body;

  if (!mobile || !pin) {
    return next(new ErrorResponse("Kindly provide a mobile and pin", 400));
  }

  const user = await User.create({ mobile, pin });
  sendTokenResponse(user, 201, res);
});

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

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  user.remove();
  res.status(200).json({ success: true, data: {} });
});
