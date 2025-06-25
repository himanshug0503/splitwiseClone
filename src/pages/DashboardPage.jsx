import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Dashboard />
    </div>
  );
}
