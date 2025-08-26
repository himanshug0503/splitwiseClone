import React, { useState } from "react";
import styles from "./ChoosePayerModal.module.css";
import axios from "axios";

export default function ChoosePayerModal({ onClose, onSelect }) {
  const [mode, setMode] = useState("choose"); // "choose" | "multiple"
  const [payerAmounts, setPayerAmounts] = useState({
    You: "",
    Alice: "",
  });

  const handleAmountChange = (name, value) => {
    setPayerAmounts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.subModal}>
      <div className={styles.subHeader}>
        <h4>Choose payer</h4>
        <button onClick={onClose}>×</button>
      </div>

      {mode === "choose" && (
        <div className={styles.subBody}>
          <div
            className={styles.option}
            onClick={() => {
              onSelect("you");
              onClose();
            }}
          >
            <strong>You</strong>
          </div>
          <div
            className={styles.option}
            onClick={() => {
              setMode("multiple"); // opens second screen
            }}
          >
            Multiple people
          </div>
        </div>
      )}

      {mode === "multiple" && (
        <div className={styles.subBody}>
          <label>
            <input type="checkbox" /> Each person paid for their own share
          </label>

          {Object.keys(payerAmounts).map((payer) => (
            <div key={payer} className={styles.amountRow}>
              <span>{payer === "You" ? <strong>You</strong> : payer}</span>
              <input
                type="number"
                placeholder="₹"
                value={payerAmounts[payer]}
                onChange={(e) => handleAmountChange(payer, e.target.value)}
              />
            </div>
          ))}

          <div className={styles.footerBtns}>
            <button
              onClick={async () => {
                try {
                  await axios.post(
                    "http://localhost:5000/api/payers",
                    {
                      description: "Dinner Expense", // replace with dynamic
                      mode,
                      payerAmounts: mode === "multiple" ? payerAmounts : {},
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  onSelect(mode, payerAmounts);
                  onClose();
                } catch (err) {
                  console.error("Error saving payer:", err);
                }
              }}
              className={styles.saveBtn}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
