const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Expense = require("../models/Expense");
const User = require("../models/User");

// ➡️ Add Expense
router.post("/:userId/expenses", authMiddleware, async (req, res) => {
  try {
    const { description, amount, splitWith, paidBy, splitType, notes } =
      req.body;

    if (!description || !amount) {
      return res
        .status(400)
        .json({ msg: "Description and amount are required" });
    }

    const expense = new Expense({
      createdBy: req.userId,
      description,
      amount,
      splitWith,
      payer: paidBy, // ✅ map paidBy → payer
      splitType,
      notes,
    });

    await expense.save();

    res.status(201).json({
      msg: "✅ Expense saved successfully",
      expense,
    });
  } catch (err) {
    console.error("Error saving expense:", err);
    res.status(500).json({ msg: "❌ Server error", error: err.message });
  }
});

// ➡️ Search Friends
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const query = req.query.q || "";

    const friends = await User.find({
      _id: { $ne: req.user.id }, // exclude self
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("name email _id");

    const normalized = friends.map((f) => ({
      id: f._id,
      name: f.name,
      email: f.email,
    }));

    res.json(normalized);
  } catch (err) {
    console.error("Error fetching friends:", err);
    res.status(500).json({ msg: "❌ Server error", error: err.message });
  }
});

module.exports = router;
