import React from "react";
import styles from "./SubModal.module.css";

export default function ChooseDateModal({
  onClose,
  selectedDate,
  onDateChange,
}) {
  const handleChange = (e) => {
    onDateChange(new Date(e.target.value));
    onClose();
  };

  return (
    <div className={styles.subModal}>
      <div className={styles.subHeader}>
        <h4>Choose date</h4>
        <button onClick={onClose}>×</button>
      </div>
      <div className={styles.subBody}>
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
