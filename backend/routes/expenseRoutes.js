const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Expense = require("../models/Expense");
const User = require("../models/User"); // assuming you already have this

// ➡️ Add Expense
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { description, amount, splitWith, paidBy, splitType, notes, image } =
      req.body;

    if (!description || !amount) {
      return res
        .status(400)
        .json({ msg: "Description and amount are required" });
    }

    const expense = new Expense({
      createdBy: req.userId, // ✅ Matches schema

      description,
      amount,
      splitWith,
      payer: paidBy, // ✅ Matches schema field

      splitType,
      notes,
      image,
    });

    await expense.save();
    res.json({ msg: "✅ Expense saved successfully", expense });
  } catch (err) {
    res.status(500).json({ msg: "❌ Server error", error: err.message });
  }
});

// ➡️ Get Friends List for suggestions
router.get("/friends", authMiddleware, async (req, res) => {
  try {
    const query = req.query.q || "";

    const friends = await User.find(
      {
        _id: { $ne: req.userId }, // exclude self
        name: { $regex: query, $options: "i" }, // case-insensitive search by name
      },
      "name email"
    );

    res.json(friends);
  } catch (err) {
    res.status(500).json({ msg: "❌ Server error", error: err.message });
  }
});

module.exports = router;
