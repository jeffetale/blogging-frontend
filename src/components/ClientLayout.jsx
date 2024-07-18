'use client';

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import React from "react";

export default function ClientLayout({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { searchTerm, setSearchTerm });
  });

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      {children}
    </>
  );
}