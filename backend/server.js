const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Payer routes
const payerRoutes = require("./routes/payerRoutes");
app.use("/api/payers", payerRoutes);

// Expense Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);

// Friend Routes
// const friendRoutes = require("./routes/friendRoutes");
// app.use("/api/friends", friendRoutes);

// //New stuff
// app.use("/api/friends", require("./routes/friends"));
// app.use("/api/groups", require("./routes/groups"));
// app.use("/api/transactions", require("./routes/transactions"));

// Routes
const friendsRoutes = require("./routes/friends");
const groupsRoutes = require("./routes/groups");

app.use("/api/friends", friendsRoutes);
app.use("/api/groups", groupsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "✅ You accessed a protected route!", userId: req.userId });
});
