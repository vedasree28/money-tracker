const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionroutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// Database
connectDB();

// Routes
app.use("/api/transactions", transactionRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
