import React from "react";
import { useState } from "react";
import { Copy } from "lucide-react";
import OptimizedCodeBlock from "./OptimizedCodeBlock";

export default function ErrorShowing({ messages, optimized_code }) {
  const getColor = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-100 border-red-500 text-red-700";
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-700";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  };







  if (!messages) {
    return <p className="ml-2 text-gray-500">No analysis data available.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="ml-2 text-xl font-bold">Code Analysis Report</h2>

      {/* Messages */}
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`border-l-4 p-3 rounded-md ${getColor(msg.type)}`}
        >
          <p className="font-semibold capitalize">{msg.type}</p>
          <p className="text-sm mt-1">
            <span className="font-bold">Message:</span> {msg.message}
          </p>
          <p className="text-sm mt-1">
            <span className="font-bold">Suggestion:</span> {msg.suggestion}
          </p>
        </div>
      ))}

      {/* Notification
      <div className="mt-4 p-4 bg-gray-800 text-white rounded-md shadow-md">
        <p className="font-semibold">Notification:</p>
        <p>{messages.notification}</p>
      </div> */}

      {/* Optimized Code */}
      <div className="mt-4">
        <h3 className="ml-2 text-lg font-bold">Optimized Code</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
          <OptimizedCodeBlock optimized_code={optimized_code} />
          {/* {optimized_code} */}
        </pre>
      </div>
    </div>
  );
}
