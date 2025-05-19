import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8082/user-service/auth";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isLogin ? `${API_BASE}/login` : `${API_BASE}/register`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(`Status ${res.status}: ${text}`);
      }

      if (isLogin) {
        const data = JSON.parse(text);
        localStorage.setItem("jwtToken", data.token);  // salvează tokenul
        setMessage("Login successful!");
        // redirect către dashboard
        navigate("/dashboard");
      } else {
        setMessage("Registration successful! You can now log in.");
        setIsLogin(true); // după register treci la login
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
        <button type="submit">{isLogin ? "Log In" : "Register"}</button>
      </form>

      <p style={{ marginTop: 20 }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}
        >
          {isLogin ? "Register here" : "Log in here"}
        </button>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AuthForm;
