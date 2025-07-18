import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form refresh

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // Optionally save token to localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard or login
      navigate("/dashboard"); // or use `/login` if you want them to log in separately
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.subheading}>INTRODUCE YOURSELF</p>
      <h2 className={styles.heading}>Hi there! My name is</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
        required
      />

      <label className={styles.label}>
        Here’s my <strong>email address</strong>:
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        required
      />

      <label className={styles.label}>
        And here’s my <strong>password</strong>:
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        required
      />

      <div className={styles.recaptcha}>[reCAPTCHA here]</div>

      <button type="submit" className={styles.signup}>
        Sign me up!
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.orContainer}>
        <span className={styles.or}>or</span>
        <button type="button" className={styles.googleBtn}>
          <img src="/google-icon.svg.webp" alt="G" height="16" />
          Sign up with Google
        </button>
      </div>

      <p className={styles.terms}>
        By signing up, you accept the <a href="#">Splitwise Terms of Service</a>
        .
      </p>
      <p className={styles.currency}>
        Don’t use USD for currency? <a href="#">Click here</a>.
      </p>
    </form>
  );
}
