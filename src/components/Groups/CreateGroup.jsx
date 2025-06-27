import React, { useState } from "react";
import styles from "./CreateGroup.module.css";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [members, setMembers] = useState([
    { name: "Himanshu", email: "himanshu0503@gmail.com", locked: true },
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);
  const [simplifyToggle, setSimplifyToggle] = useState(false); // Toggle state

  // Handle logo file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  // Add a new member input row
  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  // Remove a member input row
  const handleRemoveMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  // Update member name or email
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  // Handle form submission
  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log("Group Name:", groupName);
    console.log("Members:", members);
    console.log("File:", file);
    console.log("Simplify Debts:", simplifyToggle);
  };

  return (
    <div className={styles.container}>
      {/* Left section - logo and file input */}
      <div className={styles.left}>
        <div className={styles.logoBox}>
          <img
            src={previewURL || "/s.png"}
            alt="Group Logo"
            className={styles.previewImg}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>

      {/* Right section - form */}
      <form onSubmit={handleCreateGroup} className={styles.right}>
        <h4 className={styles.heading}>START A NEW GROUP</h4>

        {/* Group name input */}
        <label className={styles.label}>My group shall be called...</label>
        <input
          type="text"
          placeholder="Enter Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={styles.input}
          required
        />

        {/* Show members and other settings only if group name is entered */}
        <div
          className={`${styles.fadeInSection} ${
            groupName ? styles.fadeInVisible : ""
          }`}
        >
          {/* Group Members Section */}
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
                  title="Remove"
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
            <select className={styles.dropdown}>
              <option>Home</option>
              <option>Trip</option>
              <option>Couple</option>
              <option>Other</option>
            </select>

            {/* Settle Up Day Note */}
            <h5 className={styles.subHeading}>SETTLE UP DAY: OFF</h5>
            <p className={styles.infoText}>
              Currently, the settle up day can only be changed on the Splitwise
              app. Please use the app to update this setting.
            </p>

            {/* Toggle Switch */}
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

        {/* Save Button */}
        <button type="submit" className={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}
