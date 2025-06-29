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

      {/* ✅ Add the Footer here */}
      <Footer />
    </>
  );
}
