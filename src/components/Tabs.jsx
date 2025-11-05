import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex mb-4 border-b border-gray-200">
      <button
        className={`w-1/2 py-2 font-semibold ${
          activeTab === "overview"
            ? "text-red-600 border-b-2 border-red-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("overview")}
      >
        Overview
      </button>
      <button
        className={`w-1/2 py-2 font-semibold ${
          activeTab === "expenses"
            ? "text-red-600 border-b-2 border-red-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("expenses")}
      >
        Expenses
      </button>
    </div>
  );
};

export default Tabs;
