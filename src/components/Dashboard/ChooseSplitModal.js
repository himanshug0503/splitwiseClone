import React from "react";
import styles from "./SubModal.module.css";

export default function ChooseSplitModal({ onClose }) {
  return (
    <div className={styles.subModal}>
      <div className={styles.subHeader}>
        <h4>Choose split options</h4>
        <button onClick={onClose}>×</button>
      </div>
      <div className={styles.subBody}>
        <div className={styles.option}>Split equally – Himanshu (₹0.00)</div>
      </div>
    </div>
  );
}
