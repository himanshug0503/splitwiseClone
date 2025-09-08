import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import BalanceSummary from "./BalanceSummary";
import AddExpenseModal from "./AddExpenseModal";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  // ✅ Fetch groups and friends when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resFriends = await fetch("http://localhost:5000/api/friends", {
          credentials: "include",
        });
        const resGroups = await fetch("http://localhost:5000/api/groups", {
          credentials: "include",
        });

        const friendsData = await resFriends.json();
        const groupsData = await resGroups.json();

        setFriends(friendsData);
        setGroups(groupsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ Add friend logic
  const handleAddFriend = async () => {
    const email = prompt("Enter friend's email:");
    if (!email) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/friends/search?q=${email}`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (data.exists) {
        // Friend exists → add them
        await fetch("http://localhost:5000/api/friends/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ friendId: data.user._id }),
        });
        setFriends([...friends, data.user]);
        alert("Friend added successfully!");
      } else {
        // Friend does not exist → send invite email
        await fetch("http://localhost:5000/api/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        });
        alert("Invite sent to email!");
      }
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  // ✅ Add group logic
  const handleAddGroup = async () => {
    const groupName = prompt("Enter group name:");
    if (!groupName) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/groups/search?q=${groupName}`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (data.exists) {
        // Group exists → add to sidebar
        setGroups([...groups, data.group]);
        alert("Group added successfully!");
      } else {
        // Group doesn’t exist → redirect to creation page
        window.location.href = "/create-group";
      }
    } catch (err) {
      console.error("Error adding group:", err);
    }
  };

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
        <>
          <div className={styles.settledBox}>
            <img src="/new1.png" alt="Settled" />
            <div>
              <h2>You’re all settled up. Awesome!</h2>
              <p>
                To add a new expense, click the orange “Add an expense” button.
              </p>
            </div>
          </div>
          <BalanceSummary />
        </>
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

        {/* Groups */}
        <div className={styles.section}>
          <strong>Groups</strong>{" "}
          <button onClick={handleAddGroup}>+ add</button>
          <ul>
            {groups.map((g) => (
              <li key={g._id}>{g.name}</li>
            ))}
          </ul>
        </div>

        {/* Friends */}
        <div className={styles.section}>
          <strong>Friends</strong>{" "}
          <button onClick={handleAddFriend}>+ add</button>
          <ul>
            {friends.map((f) => (
              <li key={f._id}>{f.name || f.email}</li>
            ))}
          </ul>
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
            <button
              className={styles.orangeBtn}
              onClick={() => setShowAddExpenseModal(true)}
            >
              Add an expense
            </button>
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

      {/* Modal */}
      {showAddExpenseModal && (
        <AddExpenseModal
          onClose={() => setShowAddExpenseModal(false)}
          userId={"yourLoggedInUserId"} // 🔁 Replace with actual user ID
        />
      )}
    </div>
  );
}
