import React from "react";
import Login from "../components/Auth/Login";

export default function LoginPage() {
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        paddingTop: "3rem",
      }}
    >
      <Login />
    </div>
  );
}
