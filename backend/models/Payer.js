const mongoose = require("mongoose");

const payerSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    mode: { type: String, enum: ["choose", "multiple"], required: true },
    payerAmounts: {
      type: Map,
      of: String, // stores key:value like { You: "200", Alice: "300" }
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link to logged-in user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payer", payerSchema);
