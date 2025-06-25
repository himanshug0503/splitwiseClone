// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
}
