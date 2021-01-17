const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
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
      bankCode: { type: String, match: [/^[0-9]{0,4}$/, "Please provide a valid bankcode"] },
      subscriber: {
        type: String,
        enum: ["DSTV", "GOTV", "KWESE", "MTN", "GLO", "AIRTEL", "9MOBILE"]
      },
      disco: { type: String, enum: ["EKEDC", "IBEDC", "IKEDC"] },
      mobile: {
        type: String,
        match: [/^0[789][01][0-9]{8}$/, "Please provide a valid mobile number"]
      },
      plan: { type: String, maxlength: [256, "should not exceed 256 characters"] },
      customerID: {
        type: String,
        maxlength: [4, "should not exceed 4 characters"]
      },
      paymentCode: {
        type: String,
        maxlength: [8, "should not exceed 8 characters"]
      },
      remark: {
        type: String,
        maxlength: [256, "Remark cannot exceed 256 characters"]
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transactions", TransactionSchema);
