const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction.js');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB once
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
app.get('/api/transaction', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ datetime: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});
// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'test ok' });
});

app.post('/api/transaction', async (req, res) => {
  try {
    const { name, description, datetime, price } = req.body;
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return res.status(400).json({ error: 'Price must be a number' });
    }
    // Create and save the transaction
    const newTransaction = await Transaction.create({ name, description, datetime, price });

    res.json({ status: 'Transaction saved', data: newTransaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save transaction' });
  }
});
app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions= await Transaction.find();
    res.json(transactions);
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
