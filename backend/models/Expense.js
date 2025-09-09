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

    payer: {
      type: String, // "you" | "multiple"
      required: true,
    },

    payerAmounts: {
      type: Map,
      of: Number, // Example: { "You": 200, "Alice": 300 }
      default: {},
    },

    splitWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    splitType: {
      type: String,
      default: "equal", // Can be "equal" or "custom"
    },

    notes: {
      type: String,
    },

    image: {
      type: String, // Store URL/path of the image
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
