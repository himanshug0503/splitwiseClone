// src/components/Expenses/ExpenseList.jsx
import React from "react";

export default function ExpenseList({ expenses = [] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Expenses</h2>
      <ul>
        {expenses.map((expense, idx) => (
          <li key={idx} className="border p-2 my-1">
            <div>
              <strong>{expense.description}</strong> - ${expense.amount}
            </div>
            <div>Paid by: {expense.paidBy}</div>
            <div>Split: {expense.splitType}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
