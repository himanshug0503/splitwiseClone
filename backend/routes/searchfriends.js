const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// ✅ Search only within current user's friends
router.get("/search-friends", authMiddleware, async (req, res) => {
  try {
    const query = (req.query.q || "").toLowerCase();

    // Get current user with populated friends
    const user = await User.findById(req.userId).populate(
      "friends",
      "name email"
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Filter friends by name or email match
    const filteredFriends = user.friends.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.email.toLowerCase().includes(query)
    );

    res.json(filteredFriends);
  } catch (err) {
    console.error("Error in search-friends:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
