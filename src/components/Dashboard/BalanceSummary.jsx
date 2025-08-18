import React from "react";
import styles from "./Dashboard.module.css"; // Assuming you're using the same CSS file

export default function BalanceSummary() {
  const balances = [
    { name: "Alice", amount: -20 },
    { name: "Bob", amount: 20 },
    { name: "Charlie", amount: 0 }, // Example to show zero is skipped
  ];

  const formattedBalances = balances.filter((b) => b.amount !== 0);

  return (
    <div className={styles.balanceContainer}>
      <h2 className={styles.balanceTitle}>Your Balances</h2>
      {formattedBalances.length > 0 ? (
        <ul className={styles.balanceList}>
          {formattedBalances.map((b) => (
            <li
              key={b.name}
              className={`${styles.balanceItem} ${
                b.amount < 0 ? styles.positive : styles.negative
              }`}
            >
              {b.amount < 0
                ? `${b.name} owes you ₹${Math.abs(b.amount)}`
                : `You owe ₹${b.amount} to ${b.name}`}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noBalance}>You’re all settled up! 🎉</p>
      )}
    </div>
  );
}
