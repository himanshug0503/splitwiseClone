import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Splitwise Clone</h1>
      <Link to="/login" className="text-blue-500 underline">
        Login
      </Link>{" "}
      or{" "}
      <Link to="/register" className="text-blue-500 underline">
        Register
      </Link>
    </div>
  );
}
