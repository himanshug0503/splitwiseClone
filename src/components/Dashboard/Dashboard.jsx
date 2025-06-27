import React, { useState } from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderMainContent = () => {
    if (activeTab === "Recent activity") {
      return (
        <div className={styles.contentBox}>
          <h2>Recent Activity</h2>
          <p>Here you can view your latest expenses and settlements.</p>
        </div>
      );
    } else if (activeTab === "All expenses") {
      return (
        <div className={styles.contentBox}>
          <h2>All Expenses</h2>
          <p>This section shows all your past expenses.</p>
        </div>
      );
    } else {
      return (
        <div className={styles.settledBox}>
          <img src="/new1.png" alt="Settled" />
          <div>
            <h2>You’re all settled up. Awesome!</h2>
            <p>
              To add a new expense, click the orange “Add an expense” button.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      {/* Left Sidebar */}
      <div className={styles.sidebarLeft}>
        <div
          className={`${styles.section} ${
            activeTab === "Dashboard" ? styles.activeSection : ""
          }`}
          onClick={() => setActiveTab("Dashboard")}
          style={{ cursor: "pointer" }}
        >
          <h2>Dashboard</h2>
        </div>

        <div
          className={`${styles.section} ${
            activeTab === "Recent activity" ? styles.activeSection : ""
          }`}
          onClick={() => setActiveTab("Recent activity")}
          style={{ cursor: "pointer" }}
        >
          Recent activity
        </div>

        <div
          className={`${styles.section} ${
            activeTab === "All expenses" ? styles.activeSection : ""
          }`}
          onClick={() => setActiveTab("All expenses")}
          style={{ cursor: "pointer" }}
        >
          All expenses
        </div>

        <div className={styles.section}>
          <strong>Groups</strong> <button>+ add</button>
        </div>

        <div className={styles.section}>
          <strong>Friends</strong> <button>+ add</button>
        </div>

        <div className={styles.inviteBox}>
          <p>
            <span>🎉</span> <strong>Invite friends</strong>
          </p>
          <input placeholder="Enter an email address" />
          <button>Send invite</button>
          <div className={styles.socialButtons}>
            <button>Share</button>
            <button>Tweet</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.dashboardHeader}>
          <h1>{activeTab}</h1>
          <div>
            <button className={styles.orangeBtn}>Add an expense</button>
            <button className={styles.greenBtn}>Settle up</button>
          </div>
        </div>
        {renderMainContent()}
      </div>

      {/* Right Sidebar */}
      <div className={styles.sidebarRight}>
        <h3>GET SPLITWISE PRO!</h3>
        <img src="/s.png" alt="Splitwise Pro" className={styles.proImage} />
        <p>
          Subscribe to Splitwise Pro for no ads, currency conversion, charts,
          search, and more.
        </p>
        <button className={styles.learnMoreBtn}>Learn more</button>
      </div>
    </div>
  );
}
