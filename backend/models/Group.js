// src/models/Group.js
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User who created the group
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Members of the group
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // Optional group description
    description: {
      type: String,
      trim: true,
    },

    // Optional group logo
    logoUrl: {
      type: String,
      default: "",
    },

    // Optional toggle for simplifying debts
    simplifyDebts: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
