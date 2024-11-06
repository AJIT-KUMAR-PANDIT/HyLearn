import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>
  );
}
