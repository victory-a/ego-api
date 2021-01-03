const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    mobile: {
      type: String,
      unique: true,
      required: [true, "Please provide a mobile number"],
      match: [/^0[789][01][0-9]{8}$/, "Please provide a valid mobile number"]
    },
    pin: {
      type: String,
      required: [true, "Please provide a pin"],
      match: [/^[\w-_.]{6}$/, "Please provide a valid 6 digit pin"],
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/* Middleware to encrypt pin when as before every save event where pin 
field is modified */
UserSchema.pre("save", async function(next) {
  if (!this.isModified("pin")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.pin = await bcrypt.hash(this.pin, salt);
});

// Checks provided pin against encrypted version in DB
UserSchema.methods.verifyPin = async function(enteredPin) {
  const verified = await bcrypt.compare(enteredPin, this.pin);
  return verified;
};

// Assigns an auth token to client which has a specified expiry date
UserSchema.methods.getAuthToken = function() {
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE
  });
};

module.exports = mongoose.model("User", UserSchema);
