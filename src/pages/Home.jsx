import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Footer from "../components/Shared/Footer"; // ✅ Import footer

const gifArray = [
  "/gifs/giphy.webp", // ✅ Corrected path
  "/gifs/giphy.gif",
  "/gifs/giphy1.gif",
  "/gifs/giphy2.gif",
];

const colorMap = {
  "/gifs/giphy.webp": "red",
  "/gifs/giphy.gif": "green",
  "/gifs/giphy1.gif": "pink",
  "/gifs/giphy2.gif": "yellow",
};

export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleSignUpClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % gifArray.length);
        setFade(false);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentGif = gifArray[currentIndex];
  const textColor = colorMap[currentGif] || "inherit";

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.left}>
            <div className={styles.logoContainer}>
              <img src="/s.png" alt="Logo" className={styles.logo} />
            </div>

            <h1>
              Less stress when <br />
              sharing expenses <br />
              <span className={styles.highlight} style={{ color: textColor }}>
                with your partner.
              </span>
            </h1>

            <button
              className={styles.signUpButton}
              onClick={handleSignUpClick}
              style={{
                backgroundColor: textColor,
                transition: "background-color 0.5s ease-in-out",
              }}
            >
              Sign up
            </button>
          </div>

          <div className={styles.right}>
            <img
              src={currentGif}
              alt="Rotating GIF"
              className={`${styles.gif} ${fade ? styles.fadeIn : ""}`}
            />
          </div>
        </div>
      </div>

      <section className={styles.featuresSection}>
        <div className={styles.row}>
          <div
            className={styles.featureBlock}
            style={{ backgroundColor: "#2d2d2d" }}
          >
            <h2>Track balances</h2>
            <p>Keep track of shared expenses, balances, and who owes who.</p>
            <img src="public\track-balances.png" alt="Track balances" />
          </div>
          <div
            className={styles.featureBlock}
            style={{ backgroundColor: "#00bfa6" }}
          >
            <h2>Organize expenses</h2>
            <p>
              Split expenses with any group: trips, housemates, friends, and
              family.
            </p>
            <img src="public\organize-expenses.png" alt="Organize expenses" />
          </div>
        </div>

        <div className={styles.row}>
          <div
            className={styles.featureBlock}
            style={{ backgroundColor: "#ff6f3c" }}
          >
            <h2>Add expenses easily</h2>
            <p>Quickly add expenses on the go before you forget who paid.</p>
            <img src="public\add-expense.png" alt="Add expense" />
          </div>
          <div
            className={styles.featureBlock}
            style={{ backgroundColor: "#2d2d2d" }}
          >
            <h2>Pay friends back</h2>
            <p>
              Settle up with a friend and record any cash or online payment.
            </p>
            <img src="public/pay-friends.png" alt="Pay friends" />
          </div>
        </div>

        <div className={styles.proSection}>
          <div className={styles.proContent}>
            {/* <h2>Get even more with PRO</h2>
            <p>
              Get even more organized with receipt scanning, charts and graphs,
              currency conversion, and more!
            </p> */}
          </div>
          <img src="public\pro-feature.png" alt="Pro features" />
          <button className={styles.signUpButton}>Sign up</button>
        </div>

        <div className={styles.featuresGrid}>
          <h2>The whole nine yards</h2>
          <div className={styles.featureList}>
            <ul>
              <li>✅ Add groups and friends</li>
              <li>✅ Split expenses, record debts</li>
              <li>✅ Equal or unequal splits</li>
              <li>✅ Split by % or shares</li>
              <li>✅ Calculate total balances</li>
              <li>✅ Simplify debts</li>
              <li>✅ Recurring expenses</li>
              <li>✅ Offline mode</li>
            </ul>
            <ul>
              <li>✅ Cloud sync</li>
              <li>✅ Spending totals</li>
              <li>✅ Categorize expenses</li>
              <li>✅ 7+ languages</li>
              <li>✅ 100+ currencies</li>
              <li>✅ Payment integrations</li>
              <li>🟣 Unlimited expenses</li>
              <li>🟣 Transaction import</li>
            </ul>
            <ul>
              <li>🟣 Currency conversion</li>
              <li>🟣 Receipt scanning</li>
              <li>🟣 Itemization</li>
              <li>🟣 Charts and graphs</li>
              <li>🟣 Expense search</li>
              <li>🟣 Save default splits</li>
              <li>🟣 Ad-free experience</li>
              <li>🟣 Early access to features</li>
            </ul>
          </div>
          <p>
            <strong>✅ Core features</strong> &nbsp;&nbsp;&nbsp;
            <strong>🟣 Pro features</strong>
          </p>
        </div>
      </section>

      {/* ✅ Add the Footer here */}
      <Footer />
    </>
  );
}
