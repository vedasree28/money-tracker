import React, { useState } from "react";
import API from "../api";

const TransactionForm = ({ loadTransactions }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/transactions", { title, amount, type, category, date, description });
    loadTransactions();
    setTitle(""); setAmount(""); setDate(""); setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{display:"grid", gap:"10px"}}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="shopping">Shopping</option>
        <option value="bills">Bills</option>
        <option value="entertainment">Entertainment</option>
        <option value="salary">Salary</option>
        <option value="other">Other</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button style={{
background:"#4CAF50",
color:"white",
border:"none",
padding:"10px",
borderRadius:"5px",
cursor:"pointer"
}}>
Add Transaction
</button>
    </form>
  );
};

export default TransactionForm;