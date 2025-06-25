import React, { useState } from "react";
import styles from "./Register.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className={styles.form}>
      <p className={styles.subheading}>INTRODUCE YOURSELF</p>
      <h2 className={styles.heading}>Hi there! My name is</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />

      <label className={styles.label}>
        Here’s my <strong>email address</strong>:
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <label className={styles.label}>
        And here’s my <strong>password</strong>:
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <div className={styles.recaptcha}>[reCAPTCHA here]</div>

      <button className={styles.signup}>Sign me up!</button>

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
