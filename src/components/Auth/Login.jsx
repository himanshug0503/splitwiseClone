import React from "react";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h2>Log in</h2>
        <input
          type="email"
          placeholder="Email address"
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <div className={styles.captchaBox}>
          <input type="checkbox" />
          <label>I'm not a robot</label>
        </div>
        <button className={styles.loginBtn}>Log in</button>
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
