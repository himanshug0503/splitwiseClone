// src/routes/groups.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Group = require("../models/Group");

// POST /api/groups/create → create a new group
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Group name is required" });
    }

    // 1️⃣ Extract emails from frontend payload
    const emails = members.map((m) => m.email).filter(Boolean);

    // 2️⃣ Find existing users by email
    const users = await User.find({ email: { $in: emails } });

    // 3️⃣ Collect their ObjectIds
    const userIds = users.map((u) => u._id);

    // 4️⃣ Add the logged-in user (creator)
    const uniqueMembers = [...new Set([req.userId, ...userIds])];

    // 5️⃣ Create group
    const group = new Group({
      name,
      members: uniqueMembers,
      createdBy: req.userId,
    });

    await group.save();

    // 6️⃣ Update each user's "groups" array
    if (uniqueMembers.length > 0) {
      await User.updateMany(
        { _id: { $in: uniqueMembers } },
        { $push: { groups: group._id } }
      ).exec(); // ✅ use .exec() for Mongoose 7
    }

    // 7️⃣ Populate response
    await group.populate("createdBy", "name email");
    await group.populate("members", "name email");

    res.json(group);
  } catch (err) {
    console.error("❌ Error creating group:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// GET /api/groups → get all groups for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.userId })
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.json(groups);
  } catch (err) {
    console.error("❌ Error fetching groups:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// GET /api/groups/:id → get single group by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Only allow users who are members
    if (!group.members.some((m) => m._id.toString() === req.userId)) {
      return res.status(403).json({ msg: "Not authorized to view this group" });
    }

    res.json(group);
  } catch (err) {
    console.error("❌ Error fetching group:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
