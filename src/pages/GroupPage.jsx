import React from "react";
import CreateGroup from "../components/Groups/CreateGroup";
import GroupList from "../components/Groups/GroupList";

export default function GroupPage() {
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <CreateGroup />
      <GroupList />
    </div>
  );
}
