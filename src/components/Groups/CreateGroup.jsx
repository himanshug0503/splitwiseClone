// src/components/Groups/CreateGroup.jsx
import React, { useState, useEffect } from "react";
import styles from "./CreateGroup.module.css";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([
    { name: "Himanshu", email: "himanshu0503@gmail.com", locked: true },
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);
  const [simplifyToggle, setSimplifyToggle] = useState(false);
  const [groupType, setGroupType] = useState("Home"); // ✅ added state
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  // Fetch groups from backend
  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/groups", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const latestGroups = data.slice(-3).reverse();
        setGroups(latestGroups);
        if (!activeGroup && latestGroups.length > 0) {
          setActiveGroup(latestGroups[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Create group
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // ✅ filter out empty members
      const filteredMembers = members.filter((m) => m.email.trim() !== "");

      const res = await fetch("http://localhost:5000/api/groups/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: groupName,
          members: filteredMembers,
          simplifyDebts: simplifyToggle,
          type: groupType,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const updatedGroups = [...groups, data].slice(-3).reverse();
        setGroups(updatedGroups);
        setActiveGroup(data);
        // Reset form
        setGroupName("");
        setMembers([
          { name: "Himanshu", email: "himanshu0503@gmail.com", locked: true },
          { name: "", email: "" },
          { name: "", email: "" },
          { name: "", email: "" },
        ]);
        setSimplifyToggle(false);
        setGroupType("Home");
      } else {
        alert(data.message || "Failed to create group");
      }
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  const handleSelectGroup = (group) => setActiveGroup(group);
  const handleAddMember = () =>
    setMembers([...members, { name: "", email: "" }]);
  const handleRemoveMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidePanel}>
        <h3 className={styles.panelHeading}>My Groups</h3>
        <ul className={styles.groupList}>
          {groups.length > 0 ? (
            groups.map((g) => (
              <li
                key={g._id}
                className={`${styles.groupItem} ${
                  activeGroup?._id === g._id ? styles.active : ""
                }`}
                onClick={() => handleSelectGroup(g)}
              >
                <img
                  src={g.logoUrl || "/s.png"}
                  alt="Logo"
                  className={styles.groupIcon}
                />
                <span>{g.name}</span>
              </li>
            ))
          ) : (
            <p className={styles.emptyText}>No groups yet</p>
          )}
        </ul>
      </aside>

      {/* Right Section */}
      <div className={styles.rightSection}>
        {/* Active Group Details */}
        {activeGroup ? (
          <div className={styles.groupDetails}>
            <h2>{activeGroup.name}</h2>
            <p>
              Members:{" "}
              {activeGroup.members?.map((m) => m.name || m.email).join(", ")}
            </p>
            <p>
              Simplify Debts:{" "}
              {activeGroup.simplifyDebts ? "Enabled ✅" : "Disabled ❌"}
            </p>
          </div>
        ) : (
          <p>Select a group to view details</p>
        )}

        {/* Create Group Form */}
        <form onSubmit={handleCreateGroup} className={styles.formSection}>
          <h4 className={styles.heading}>START A NEW GROUP</h4>
          <label className={styles.label}>My group shall be called...</label>
          <input
            type="text"
            placeholder="Enter Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={styles.input}
            required
          />

          {groupName && (
            <div className={styles.fadeInSection}>
              <h5 className={styles.subHeading}>GROUP MEMBERS</h5>
              {members.map((member, index) => (
                <div key={index} className={styles.memberRow}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    className={styles.inputSmall}
                    disabled={member.locked}
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                    className={styles.inputSmall}
                    disabled={member.locked}
                  />
                  {!member.locked && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className={styles.removeBtn}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMember}
                className={styles.addBtn}
              >
                + Add a person
              </button>

              {/* Group Options */}
              <div className={styles.groupOptions}>
                <h5 className={styles.subHeading}>GROUP TYPE</h5>
                <select
                  className={styles.dropdown}
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)} // ✅ controlled
                >
                  <option>Home</option>
                  <option>Trip</option>
                  <option>Couple</option>
                  <option>Other</option>
                </select>

                <div className={styles.toggleContainer}>
                  <label className={styles.toggleLabel}>
                    SIMPLIFY GROUP DEBTS?
                  </label>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={simplifyToggle}
                      onChange={() => setSimplifyToggle(!simplifyToggle)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className={styles.button}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
