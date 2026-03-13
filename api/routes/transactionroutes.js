const express = require("express");
const router = express.Router();

const {
  getTransactions,
  addTransaction,
  deleteTransaction
} = require("../controllers/transactioncontroller");

const protect = require("../middleware/authMiddleware");
router.use(protect);
router.get("/", getTransactions);
router.post("/", addTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;