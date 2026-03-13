import React from "react";

const Balance = ({ transactions }) => {
  
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div style={{
background:"#e6f7ff",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px",
textAlign:"center"
}}>
<h2>Balance: ₹{balance}</h2>
<p>Income: ₹{income}</p>
<p>Expense: ₹{expense}</p>
</div>
  );
};

export default Balance;