const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"]
    },
    category: {
      type: String,
      enum: ["debit", "credit"],
      required: [true, "category is required"]
    },
    type: {
      type: String,
      enum: ["BANK_TRANSFER", "VTU", "PHONE_TRANSFER", "UTILITY_BILL"],
      required: [true, "type is required"]
    },
    recipient: {
      accountName: { type: String, maxlength: [256, "should not exceed 256 characters"] },
      accountNumber: {
        type: String,
        match: [/^[0-9]{10}$/, "Please Provide a valid account number"]
      },
      bankCode: { type: String, match: [/^[1,4]{0,4}$/] },
      subscriber: {
        type: String,
        enum: ["DSTV", "GOTV", "KWESE", "MTN", "GLO", "AIRTEL", "9MOBILE"]
      },
      disco: { type: String, enum: ["EKEDC", "IBEDC", "IKEDC"] },
      mobile: {
        type: String,
        match: [/^0[789][01][0-9]{8}$/, "Please provide a valid mobile number"]
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", TransactionSchema);
