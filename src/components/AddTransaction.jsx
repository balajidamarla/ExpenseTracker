import React, { useState } from "react";

const AddTransaction = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount,
      date: formattedDate, // 🆕 add date field
    };

    onAdd(newTransaction);
    setText("");
    setAmount("");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Add Transaction
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter Salary or Expense"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-md hover:bg-emerald-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
