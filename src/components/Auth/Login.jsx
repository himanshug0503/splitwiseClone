import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); // save token
      setMessage("✅ Login successful");

      navigate("/dashboard"); // ✅ Navigate to dashboard
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
