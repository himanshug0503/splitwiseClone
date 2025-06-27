import React from "react";
import Register from "../components/Auth/Register";
import Footer from "../components/Shared/Footer"; // ✅ Import footer
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <img
            src="/s.png" // use actual Splitwise-like logo
            alt="Logo"
            className={styles.logo}
          />
          <Register />
        </div>
      </div>
      <Footer /> {/* ✅ Add footer here */}
    </>
  );
}
