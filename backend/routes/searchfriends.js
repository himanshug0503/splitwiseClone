const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/search-friends", authMiddleware, async (req, res) => {
  try {
    console.log("authMiddleware added req.userId:", req.userId);

    const user = await User.findById(req.userId).populate(
      "friends",
      "name email"
    );
    console.log("Fetched user with friends:", user?.friends);

    if (!user) {
      console.error("User not found for ID:", req.userId);
      return res.status(404).json({ msg: "User not found" });
    }

    const query = req.query.q || "";
    console.log("Search query:", query);

    const filteredFriends = user.friends.filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Filtered friends:", filteredFriends);

    res.json(filteredFriends);
  } catch (err) {
    console.error("Error in search-friends:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});
