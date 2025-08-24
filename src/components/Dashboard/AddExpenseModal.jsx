import React, { useState } from "react";
import styles from "./AddExpenseModal.module.css";
import axios from "axios";

export default function AddExpenseModal({ onClose, userId }) {
  const [friend, setFriend] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const handleSave = async () => {
    if (!description.trim() || !amount) return;

    try {
      await axios.post(`/api/users/${userId}/expenses`, {
        description,
        amount: parseFloat(amount),
        splitWith: friend ? [friend.trim()] : [],
        paidBy: userId,
        splitType: "equal",
        notes,
        image,
      });
      onClose();
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  // per person calculation
  const numPeople = friend ? 2 : 1;
  const perPerson = amount
    ? (parseFloat(amount) / numPeople).toFixed(2)
    : "0.00";

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Add an expense</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <label>With you and:</label>
          <input
            type="text"
            placeholder="Enter names or email addresses"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          />

          <div className={styles.expenseRow}>
            {/* 📷 Image next to description input */}
            <img
              src="/images/general@2x.png" // put image inside public/images/
              alt="Expense"
              className={styles.expenseIcon}
            />
            <input
              type="text"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <input
            type="number"
            placeholder="₹ 0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.amountInput}
          />

          <p>
            Paid by <strong>you</strong> and split <strong>equally</strong>{" "}
            <span className={styles.perPerson}>(₹{perPerson}/person)</span>
          </p>

          {/* Options row */}
          <div className={styles.optionsRow}>
            <span>
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              className={styles.linkBtn}
              onClick={() => {
                const text = prompt("Add notes:");
                if (text) setNotes(text);
              }}
            >
              Add image/notes
            </button>

            <button
              className={styles.linkBtn}
              onClick={() => alert("Group selection not implemented yet")}
            >
              No group
            </button>
          </div>
        </div>

        {/* Footer */}
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
