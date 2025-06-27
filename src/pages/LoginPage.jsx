import React from "react";
import Login from "../components/Auth/Login";
import Footer from "../components/Shared/Footer"; // ✅ import
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <>
      <div className="loginPageWrapper">
        <Login />
      </div>
      <Footer /> {/* ✅ Add footer here */}
    </>
  );
}
