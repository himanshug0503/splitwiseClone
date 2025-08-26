const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Expense = require("../models/Expense");

// ➡️ Add Expense
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { description, amount, friend } = req.body;

    if (!description || !amount) {
      return res
        .status(400)
        .json({ msg: "Description and amount are required" });
    }

    const expense = new Expense({
      user: req.userId, // logged in user
      description,
      amount,
      friend,
    });

    await expense.save();
    res.json({ msg: "✅ Expense saved successfully", expense });
  } catch (err) {
    res.status(500).json({ msg: "❌ Server error", error: err.message });
  }
});

module.exports = router;
