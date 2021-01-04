const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bankName: { type: String, maxlength: [256, "should not exceed 256 characters"] },
    accountNumber: {
      type: String,
      match: [/^[0-9]{10}$/, "Please Provide a valid account number"]
    },
    bankCode: { type: String, match: [/^[0-9]{0,4}$/, "Please provide a valid bankcode"] },
    accountName: { type: String, maxlength: [256, "should not exceed 256 characters"] }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Beneficiary", BeneficiarySchema);
