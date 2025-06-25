import React from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      {/* Left Sidebar */}
      <div className={styles.sidebarLeft}>
        <h2>Dashboard</h2>
        <div className={styles.section}>Recent activity</div>
        <div className={styles.section}>All expenses</div>

        <div className={styles.section}>
          <strong>Groups</strong> <button>+ add</button>
        </div>

        <div className={styles.section}>
          <strong>Friends</strong> <button>+ add</button>
        </div>

        <div className={styles.inviteBox}>
          <p>
            <strong>Invite friends</strong>
          </p>
          <input placeholder="Enter an email address" />
          <button>Send invite</button>
          <div className={styles.socialButtons}>
            <button>Share</button>
            <button>Tweet</button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className={styles.mainContent}>
        <div className={styles.dashboardHeader}>
          <h1>Dashboard</h1>
          <div>
            <button className={styles.orangeBtn}>Add an expense</button>
            <button className={styles.greenBtn}>Settle up</button>
          </div>
        </div>

        <div className={styles.settledBox}>
          <img
            src="https://secure.splitwise.com/images/faces/face1.png"
            alt="Settled"
          />
          <div>
            <h2>You’re all settled up. Awesome!</h2>
            <p>
              To add a new expense, click the orange “Add an expense” button.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={styles.sidebarRight}>
        <h3>GET SPLITWISE PRO!</h3>
        <img
          src="https://secure.splitwise.com/images/pro/illustration-purple.png"
          alt="Splitwise Pro"
          className={styles.proImage}
        />
        <p>
          Subscribe to Splitwise Pro for no ads, currency conversion, charts,
          search, and more.
        </p>
        <button className={styles.learnMoreBtn}>Learn more</button>
      </div>
    </div>
  );
}
