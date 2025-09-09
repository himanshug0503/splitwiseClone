import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import BalanceSummary from "./BalanceSummary";
import AddExpenseModal from "./AddExpenseModal";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showInviteBox, setShowInviteBox] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const navigate = useNavigate();

  // Helper: get token or redirect to login
  const getTokenOrRedirect = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return null;
    }
    return token;
  };

  // ✅ Fetch groups and friends when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = getTokenOrRedirect();
      if (!token) return;

      try {
        const resFriends = await fetch("http://localhost:5000/api/friends", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const resGroups = await fetch("http://localhost:5000/api/groups", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Handle unauthorized
        if (resFriends.status === 401 || resGroups.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!resFriends.ok) {
          throw new Error(`Friends fetch failed: ${resFriends.status}`);
        }
        if (!resGroups.ok) {
          throw new Error(`Groups fetch failed: ${resGroups.status}`);
        }

        const friendsData = await resFriends.json();
        const groupsData = await resGroups.json();

        setFriends(Array.isArray(friendsData) ? friendsData : []);
        setGroups(Array.isArray(groupsData) ? groupsData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Add friend logic
  const handleAddFriend = async () => {
    const email = prompt("Enter friend's email:");
    if (!email) return;

    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/friends/search?q=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (data.exists && data.user?._id) {
        // Friend exists → add them
        const addRes = await fetch("http://localhost:5000/api/friends/add", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ friendId: data.user._id }),
        });

        if (!addRes.ok) {
          const j = await addRes.json().catch(() => ({}));
          throw new Error(j?.msg || "Failed to add friend");
        }

        setFriends((prev) => {
          const exists = prev.some((f) => f._id === data.user._id);
          return exists ? prev : [...prev, data.user];
        });
        alert("Friend added successfully!");
      } else {
        // Friend does not exist → send invite email (if you have this endpoint)
        const inviteRes = await fetch("http://localhost:5000/api/invite", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!inviteRes.ok) {
          const j = await inviteRes.json().catch(() => ({}));
          throw new Error(j?.msg || "Failed to send invite");
        }

        alert("Invite sent to email!");
      }
    } catch (err) {
      console.error("Error adding friend:", err);
      alert(err.message || "Error adding friend");
    }
  };

  // ✅ Add group logic
  const handleAddGroup = async () => {
    const groupName = prompt("Enter group name:");
    if (!groupName) return;

    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/groups/search?q=${encodeURIComponent(
          groupName
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (data.exists && data.group?._id) {
        // Group exists → add to sidebar if not already listed
        setGroups((prev) => {
          const exists = prev.some((g) => g._id === data.group._id);
          return exists ? prev : [...prev, data.group];
        });
        alert("Group added successfully!");
      } else {
        // Group doesn’t exist → redirect to creation page you already built
        navigate("/create-group");
      }
    } catch (err) {
      console.error("Error adding group:", err);
      alert(err.message || "Error adding group");
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
          <button onClick={() => navigate("/groups")}>+ add</button>
          <ul>
            {groups.slice(-3).map((g) => (
              <li key={g._id}>{g.name}</li>
            ))}
          </ul>
        </div>

        {/* Friends */}
        <div className={styles.section}>
          <strong>Friends</strong>{" "}
          <button onClick={() => setShowInviteBox(true)}>+ add</button>
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
      {showInviteBox && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Invite friends</h3>
            <input
              type="email"
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <div className={styles.modalActions}>
              <button
                className={styles.orangeBtn}
                onClick={async () => {
                  if (!inviteEmail) return;

                  const token = getTokenOrRedirect();
                  if (!token) return;

                  try {
                    const res = await fetch(
                      `http://localhost:5000/api/friends/search?q=${encodeURIComponent(
                        inviteEmail
                      )}`,
                      {
                        method: "GET",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    if (res.status === 401) {
                      localStorage.removeItem("token");
                      navigate("/login");
                      return;
                    }

                    const data = await res.json();

                    if (data.exists && data.user?._id) {
                      // Add as friends (mutual)
                      const addRes = await fetch(
                        "http://localhost:5000/api/friends/add",
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ friendId: data.user._id }),
                        }
                      );

                      if (!addRes.ok) {
                        const j = await addRes.json().catch(() => ({}));
                        throw new Error(j?.msg || "Failed to add friend");
                      }

                      setFriends((prev) => {
                        const exists = prev.some(
                          (f) => f._id === data.user._id
                        );
                        return exists ? prev : [...prev, data.user];
                      });

                      alert("Friend added successfully!");
                    } else {
                      // Invite email
                      const inviteRes = await fetch(
                        "http://localhost:5000/api/invite",
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ email: inviteEmail }),
                        }
                      );

                      if (!inviteRes.ok) {
                        const j = await inviteRes.json().catch(() => ({}));
                        throw new Error(j?.msg || "Failed to send invite");
                      }

                      alert("Invite sent!");
                    }
                  } catch (err) {
                    console.error(err);
                    alert(err.message || "Error adding friend");
                  }

                  setInviteEmail("");
                  setShowInviteBox(false);
                }}
              >
                Send invites and add friends
              </button>
              <button onClick={() => setShowInviteBox(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
