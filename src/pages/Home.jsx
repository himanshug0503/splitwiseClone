import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.left}>
          <h1>
            Less stress when <br />
            sharing expenses <br />
            <span className={styles.highlight}>with your partner.</span>
          </h1>
          <div className={styles.icons}>
            <span>✈️</span>
            <span>🏠</span>
            <span>❤️</span>
            <span>⭐</span>
          </div>
          <p className={styles.description}>
            Keep track of your shared expenses and balances with housemates,
            trips, groups, friends, and family.
          </p>
          <button className={styles.signUpBtn}>Sign up</button>
          <p className={styles.smallText}>Free for iPhone, Android, and web.</p>
        </div>

        <div className={styles.right}>
          <img src="\giphy.webp" alt="Heart Art" className={styles.heroImage} />
        </div>
      </div>
    </div>
  );
}
