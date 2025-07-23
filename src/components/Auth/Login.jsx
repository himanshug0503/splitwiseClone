// src/components/Auth/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ import context
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ context login method

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data; // expecting both token and user from server

      login({ ...user, token }); // ✅ call login from context
      setMessage("✅ Login successful");
      navigate("/dashboard");
    } catch (err) {
      setMessage(
        "❌ Login failed: " + (err.response?.data?.msg || err.message)
      );
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h2>Log in</h2>

        <input
          type="email"
          placeholder="Email address"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.captchaBox}>
          <input type="checkbox" />
          <label>I'm not a robot</label>
        </div>

        <button className={styles.loginBtn} onClick={handleLogin}>
          Log in
        </button>

        {message && <p>{message}</p>}

        <a href="#" className={styles.forgotPassword}>
          Forgot your password?
        </a>

        <div className={styles.separator}>
          <span>or</span>
        </div>

        <button className={styles.googleBtn}>
          <img src="/google-icon.svg.webp" alt="Google" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
