import React from "react";
import CreateGroup from "../components/Groups/CreateGroup";
import GroupList from "../components/Groups/GroupList";

export default function GroupPage() {
  return (
    <div className="page">
      <div className="container">
        <CreateGroup />
        <GroupList />
      </div>
    </div>
  );
}
