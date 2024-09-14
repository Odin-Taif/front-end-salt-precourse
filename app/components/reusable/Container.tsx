"use client";
import React from "react";

type Props = {
  children: React.ReactNode; // Any valid React child element(s).
};

// Container Component: Wraps child components with consistent padding and centering.
function Container({ children }: Props) {
  return (
    // Container div with maximum width, automatic margins for centering, and padding.
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-3 py-10">
      {children} {/* Render child components. */}
    </div>
  );
}

export default Container;
