// src/components/Groups/GroupList.jsx
import React from "react";

export default function GroupList() {
  const groups = ["Trip to Goa", "Roommates"];

  return (
    <div>
      <ul>
        {groups.map((group, idx) => (
          <li key={idx} className="py-1">
            {group}
          </li>
        ))}
      </ul>
    </div>
  );
}
