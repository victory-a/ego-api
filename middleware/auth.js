const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../middleware");
const ErrorRespose = require("../utils/errorResponse");
const { User } = require("../models");
const config = require("../config");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorRespose("Not authorized to access this route", 401));
  }

  try {
    const decodeToken = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodeToken.id);

    next();
  } catch (error) {
    return next(new ErrorRespose("Not authorized to access this route", 401));
  }
});
