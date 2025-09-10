const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/search-friends", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      "friends",
      "name email"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    const query = req.query.q || "";
    const filteredFriends = user.friends.filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredFriends);
  } catch (err) {
    console.error("Error in search-friends:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});
