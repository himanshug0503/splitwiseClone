import React from "react";
import BalanceSummary from "./BalanceSummary";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.sectionTitle}>Dashboard</h1>
      <BalanceSummary />
    </div>
  );
}
