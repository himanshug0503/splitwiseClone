// src/components/Dashboard/BalanceSummary.jsx
import React from "react";

export default function BalanceSummary() {
  const balances = [
    { name: "Alice", amount: -20 },
    { name: "Bob", amount: 20 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold">Your Balances</h2>
      <ul className="mt-2">
        {balances.map((b, idx) => (
          <li key={idx} className="py-1">
            {b.name}{" "}
            {b.amount < 0
              ? `owes you $${Math.abs(b.amount)}`
              : `you owe $${b.amount} to ${b.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
