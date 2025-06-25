import React from "react";
import styles from "./GroupList.module.css";

export default function GroupList() {
  const groups = ["Trip to Goa", "Roommates"];

  return (
    <ul className={styles.groupList}>
      {groups.map((group, idx) => (
        <li key={idx} className={styles.groupItem}>
          {group}
        </li>
      ))}
    </ul>
  );
}
