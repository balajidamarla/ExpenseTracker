import React from "react";

const Balance = ({ transactions }) => {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Balance</h3>
      <h2 className="text-3xl font-bold text-green-600 mb-4">₹{total}</h2>

      <div className="flex justify-between">
        <div className="w-1/2 text-center border-r border-gray-300">
          <h4 className="text-sm text-gray-500">Income</h4>
          <p className="text-lg text-green-500 font-semibold">₹{income}</p>
        </div>
        <div className="w-1/2 text-center">
          <h4 className="text-sm text-gray-500">Expense</h4>
          <p className="text-lg text-red-500 font-semibold">₹{expense}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
