const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Payer info (what you’re working on in ChoosePayerModal)
    payer: {
      type: String, // "you" | "multiple"
      required: true,
    },

    // If multiple payers
    payerAmounts: {
      type: Map,
      of: Number, // Example: { "You": 200, "Alice": 300 }
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
