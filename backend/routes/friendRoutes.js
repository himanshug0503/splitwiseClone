const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// 🔎 Search friends from backend
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    // Find users whose name matches query (case-insensitive)
    const friends = await User.find({
      name: { $regex: query, $options: "i" },
    }).select("name email _id");

    res.json(friends);
  } catch (err) {
    res.status(500).json({ msg: "❌ Server error", error: err.message });
  }
});

module.exports = router;
