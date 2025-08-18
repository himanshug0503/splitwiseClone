import React, { useState } from "react";
import styles from "./AddExpenseModal.module.css";
import axios from "axios";

export default function AddExpenseModal({ onClose, userId }) {
  const [friend, setFriend] = useState("");

  const handleSave = async () => {
    if (!friend.trim()) return;

    try {
      await axios.post(`/api/users/${userId}/balances`, {
        name: friend.trim(),
        amount: 0,
      });
      onClose();
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <h3>Add an expense</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <label>With you and:</label>
          <input
            type="text"
            placeholder="Enter names or email addresses"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          />
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
