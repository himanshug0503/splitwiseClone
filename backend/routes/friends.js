const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// ✅ Search friends by name/email
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
      _id: { $ne: req.userId }, // exclude self
    }).select("name email");

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Add a friend
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { friendId } = req.body;
    if (!friendId) return res.status(400).json({ msg: "FriendId required" });

    const user = await User.findById(req.userId);
    const friend = await User.findById(friendId);

    if (!friend) return res.status(404).json({ msg: "Friend not found" });

    // Add both sides if not already friends
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }
    if (!friend.friends.includes(req.userId)) {
      friend.friends.push(req.userId);
      await friend.save();
    }

    res.json({ msg: "Friend added", friend });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Get all friends
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      "friends",
      "name email"
    );
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
