// src/components/ClientLayout.jsx

"use client";

import { Navbar } from "@/components/navbar";
import React from "react";

export default function ClientLayout({ children }) {
  const setSearchTerm = (term) => {
    window.dispatchEvent(new CustomEvent("searchChange", { detail: term }));
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      {children}
    </>
  );
}
