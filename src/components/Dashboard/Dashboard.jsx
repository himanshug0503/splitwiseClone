// src/components/Dashboard/Dashboard.jsx
import React from "react";
import BalanceSummary from "./BalanceSummary";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <BalanceSummary />
    </div>
  );
}
