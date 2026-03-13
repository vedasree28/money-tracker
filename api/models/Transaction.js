const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TransactionSchema = new Schema(
{
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: {
    type: String,
    required: true,
    trim: true
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },

  category: {
    type: String,
    enum: [
      "food",
      "transport",
      "shopping",
      "bills",
      "entertainment",
      "salary",
      "other"
    ],
    default: "other"
  },

  description: {
    type: String,
    trim: true
  },

  date: {
    type: Date,
    required: true
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);