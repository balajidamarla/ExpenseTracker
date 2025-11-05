import React, { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

const TransactionList = ({ transactions, onDelete, salary, onEditSalary }) => {
  const [editing, setEditing] = useState(false);
  const [newSalary, setNewSalary] = useState(salary ? salary.amount : 0);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const handleSave = () => {
    onEditSalary(Number(newSalary));
    setEditing(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  // Calculate balance after each expense
  const calculateBalanceAfter = (index) => {
    if (!salary) return 0;
    const totalExpensesTillNow = transactions
      .slice(index) // includes current expense and all after
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    return salary.amount - totalExpensesTillNow;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Expense History
      </h3>

      {/* Salary Section */}
      {salary && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-md mb-4">
          <div className="flex justify-between items-center">
            {!editing ? (
              <>
                <p className="text-gray-700 font-medium">
                  💼 Salary:{" "}
                  <span className="text-green-600 font-bold">
                    ₹{salary.amount}
                  </span>
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="text-emerald-500 text-sm font-semibold hover:underline"
                >
                  Edit
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  className="p-1 border border-gray-300 rounded-md w-24"
                />
                <button
                  onClick={handleSave}
                  className="bg-emerald-500 text-white px-2 py-1 text-sm rounded-md hover:bg-emerald-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expense List */}
      <ul className="space-y-2">
        {transactions.length === 0 && (
          <p className="text-gray-400 text-sm">No expenses yet</p>
        )}
        {transactions.map((t, index) => {
          const balanceAfter = calculateBalanceAfter(index);

          return (
            <li
              key={t.id}
              className="flex justify-between items-start p-3 bg-red-50 border-r-4 border-red-400 rounded-md shadow-sm"
            >
              {/* Left Side */}
              <div>
                <span className="font-medium text-gray-700">{t.text}</span>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <p>{t.date}</p>
                  {/* 💰 Remaining Balance */}
                  <p className="text-gray-600 font-medium">
                    | Balance:{" "}
                    <span className="text-green-600 font-semibold">
                      ₹{balanceAfter}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-semibold">
                  ₹{Math.abs(t.amount)}
                </span>
                <button
                  onClick={() => {
                    setDeleteId(t.id);
                    setDeleteName(t.text);
                  }}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded-md hover:bg-red-600"
                >
                  X
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <DeleteConfirmModal
          expenseName={deleteName}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default TransactionList;
