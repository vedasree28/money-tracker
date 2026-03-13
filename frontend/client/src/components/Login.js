import React, { useState } from "react";
import API from "../api";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  title: {
    textAlign: "center",
    marginBottom: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};