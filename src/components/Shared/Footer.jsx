import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.sections}>
        <div>
          <h4>Splitwise</h4>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Calculators</a>
            </li>
            <li>
              <a href="#">API</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li>
              <a href="#">Log in</a>
            </li>
            <li>
              <a href="#">Sign up</a>
            </li>
            <li>
              <a href="#">Reset password</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Splitwise Pro</a>
            </li>
            <li>
              <a href="#">Splitwise Pay</a>
            </li>
            <li>
              <a href="#">Splitwise Card</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>More</h4>
          <ul>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Site status</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Get the App</h4>
          <div className={styles.appLinks}>
            <img src="/GooglePlayStore.png" alt="Google Play" />
            <img src="/appleAppStore.jpg" alt="App Store" />
          </div>
        </div>
      </div>

      <div className={styles.bottomNote}>
        <p>
          Made with <span className={styles.heart}>♥</span> in Bangalore, KA,
          India
        </p>
        <div className={styles.socialIcons}>
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-facebook" />
          </a>
          <a href="#">
            <i className="fab fa-instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
