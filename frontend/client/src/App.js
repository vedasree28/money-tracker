import React, { useState, useEffect, useCallback } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Balance from "./components/Balance";
import Charts from "./components/Charts";
import API from "./api";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = useCallback(async () => {
    if (!loggedIn) return;

    try {
      const { data } = await API.get("/transactions");
      console.log("Transactions from backend:", data);
      setTransactions(data);
    } catch (err) {
      console.error(
        "Failed to load transactions:",
        err.response?.data || err.message
      );

      if (err.response?.status === 401) {
        setLoggedIn(false);
        localStorage.removeItem("token");
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  if (!loggedIn) {
    return (
      <div style={{ padding: "20px" }}>
        <Login setLoggedIn={setLoggedIn} />
        <Register setLoggedIn={setLoggedIn} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💰 Money Tracker</h1>

      <Balance transactions={transactions} />

      <div style={styles.card}>
        <TransactionForm loadTransactions={loadTransactions} />
      </div>

      <div style={styles.card}>
        <TransactionList
          transactions={transactions}
          loadTransactions={loadTransactions}
        />
      </div>

      <div style={styles.card}>
        <Charts transactions={transactions} />
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        }}
        style={styles.logout}
      >
        Logout
      </button>
    </div>
  );
}

export default App;

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px"
  },

  card: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  logout: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};