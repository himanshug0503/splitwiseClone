// src/pages/GroupPage.jsx
import React from "react";
import CreateGroup from "../components/Groups/CreateGroup";
import GroupList from "../components/Groups/GroupList";

export default function GroupPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Your Groups</h2>
      <CreateGroup />
      <GroupList />
    </div>
  );
}
