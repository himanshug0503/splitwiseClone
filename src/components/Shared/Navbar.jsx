import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navBrand}>
        Splitwise Clone
      </Link>
      <div className={styles.navLinks}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
