import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { email } = req.body;

    // TODO: plug in nodemailer or SendGrid here
    console.log(`📨 Invite sent to: ${email}`);

    res.json({ msg: "Invite sent successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

// Right now this is of no use, once I get nodemailer. Then we can plug it in
