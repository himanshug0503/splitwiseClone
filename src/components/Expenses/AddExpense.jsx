// src/components/Expenses/AddExpense.jsx
import React, { useState } from "react";

export default function AddExpense({ groupMembers = [] }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [splits, setSplits] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { description, amount, paidBy, splitType, splits };
    console.log("Submitting expense:", data);
    // Add logic to post data to backend
  };

  const handleSplitChange = (member, value) => {
    setSplits({ ...splits, [member]: parseFloat(value) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Description"
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Paid by</option>
        {groupMembers.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={splitType}
        onChange={(e) => setSplitType(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="equal">Split Equally</option>
        <option value="unequal">Split Unequally</option>
      </select>

      {splitType === "unequal" &&
        groupMembers.map((member) => (
          <div key={member} className="flex justify-between items-center">
            <label>{member}:</label>
            <input
              type="number"
              min="0"
              onChange={(e) => handleSplitChange(member, e.target.value)}
              className="border p-1"
            />
          </div>
        ))}

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Expense
      </button>
    </form>
  );
}
