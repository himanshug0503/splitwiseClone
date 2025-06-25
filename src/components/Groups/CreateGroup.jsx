// src/components/Groups/CreateGroup.jsx
import React, { useState } from "react";
import styles from "./CreateGroup.module.css";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log("Creating group:", groupName);
  };

  return (
    <form onSubmit={handleCreateGroup} className={styles.formGroup}>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className={styles.inputField}
        required
      />
      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
}
