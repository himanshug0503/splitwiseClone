import React from "react";
import styles from "./Dashboard.module.css";

export default function BalanceSummary() {
  const balances = [
    { name: "Alice", amount: -20 },
    { name: "Bob", amount: 20 },
  ];

  return (
    <div className={styles.balanceContainer}>
      <h2 className={styles.balanceTitle}>Your Balances</h2>
      <ul className={styles.balanceList}>
        {balances.map((b, idx) => (
          <li key={idx} className={styles.balanceItem}>
            {b.amount < 0
              ? `${b.name} owes you ₹${Math.abs(b.amount)}`
              : `You owe ₹${b.amount} to ${b.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
