import React from "react";
import API from "../api";

const TransactionList = ({ transactions, loadTransactions }) => {

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      loadTransactions();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: "15px" }}>Transactions</h3>

      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <ul style={styles.list}>
          {transactions.map((t) => (
            <li
              key={t._id}
              style={{
                ...styles.item,
                borderLeft:
                  t.type === "income"
                    ? "6px solid #4CAF50"
                    : "6px solid #ff4d4d"
              }}
            >
              <div>
                <strong>{t.title}</strong>
                <div style={styles.details}>
                  ₹{t.amount} • {t.category}
                </div>
              </div>

              <button
                onClick={() => handleDelete(t._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;


const styles = {
  list: {
    listStyle: "none",
    padding: 0
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "10px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.1)"
  },

  details: {
    fontSize: "14px",
    color: "#555"
  },

  deleteBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};