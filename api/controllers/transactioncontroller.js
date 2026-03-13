const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find({
user: req.user._id
});
    res.json(transactions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTransaction = async (req, res) => {
  try {

    const { title, amount, type, category, description, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount:Number(amount),
      type,
      category,
      description,
      date
    });

    res.status(201).json(transaction);

  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction
};