const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Friends list (other users)
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Groups this user is part of
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],

    // Balance with each friend (key = friendId, value = amount)
    // positive = others owe me, negative = I owe them
    balance: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
