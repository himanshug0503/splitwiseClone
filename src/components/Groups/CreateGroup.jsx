// src/components/Groups/CreateGroup.jsx
import React, { useState } from "react";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log("Creating group:", groupName);
    // Add create group logic
  };

  return (
    <form onSubmit={handleCreateGroup} className="flex space-x-2 mb-4">
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-purple-500 text-white px-4">
        Create
      </button>
    </form>
  );
}
