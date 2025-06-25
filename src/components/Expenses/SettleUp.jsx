// src/components/Expenses/SettleUp.jsx
import React, { useState } from "react";

export default function SettleUp({ balances = [] }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");

  const handleSettle = (e) => {
    e.preventDefault();
    console.log(`Settling $${amount} with ${selectedUser}`);
    // Add settle-up logic here
  };

  return (
    <form onSubmit={handleSettle} className="space-y-4 mt-4">
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Select user to settle with</option>
        {balances.map((b) => (
          <option key={b.name} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Settle Up
      </button>
    </form>
  );
}
