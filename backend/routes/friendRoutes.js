const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// 🔎 Search friends from backend
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const query = req.query.q || "";

    if (!query.trim()) {
      return res.json([]);
    }

    // Exclude current user
    const currentUserId = req.user.id;

    const friends = await User.find({
      _id: { $ne: currentUserId },
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .select("name email _id")
      .limit(10);

    // Normalize so frontend can always use f.id
    const normalized = friends.map((f) => ({
      id: f._id,
      name: f.name,
      email: f.email,
    }));

    res.json(normalized);
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({ msg: "❌ Server error", error: err.message });
  }
});

module.exports = router;
