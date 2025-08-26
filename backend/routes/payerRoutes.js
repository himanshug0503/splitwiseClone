// routes/payerRoutes.js
const express = require("express");
const router = express.Router();
const Payer = require("../models/Payer");
const authMiddleware = require("../middleware/authMiddleware");

// Save payer data
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { description, mode, payerAmounts } = req.body;
    const payer = new Payer({
      userId: req.userId,
      description,
      mode,
      payerAmounts,
    });

    await payer.save();
    res.status(201).json({ success: true, payer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fetch all payers of logged in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const payers = await Payer.find({ userId: req.userId });
    res.json(payers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
