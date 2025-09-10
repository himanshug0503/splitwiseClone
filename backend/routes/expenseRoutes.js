const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Expense = require("../models/Expense");

// POST /api/expenses/add
router.post("/add", authMiddleware, async (req, res) => {
  try {
    console.log("=== /api/expenses/add ===");
    console.log("auth userId:", req.userId);
    console.log("req.body:", JSON.stringify(req.body));

    const { description, amount, payer, splitWith, splitType, notes } =
      req.body;

    if (!description || amount == null) {
      return res
        .status(400)
        .json({ msg: "Description and amount are required" });
    }

    // normalize splitWith
    const normalizedSplitWith = Array.isArray(splitWith) ? splitWith : [];

    const expense = new Expense({
      createdBy: req.userId,
      description,
      amount,
      payer: payer || req.userId,
      splitWith: normalizedSplitWith,
      splitType: splitType || "equal",
      notes: notes || "",
    });

    await expense.save();
    console.log("Expense saved id:", expense._id);
    return res.status(201).json({ msg: "Expense saved", expense });
  } catch (err) {
    console.error("Error in /api/expenses/add:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
