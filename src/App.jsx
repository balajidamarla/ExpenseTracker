import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import Tabs from "./components/Tabs";
import AppModal from "./components/AppModal";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState({
    show: false,
    type: "success", // "success" | "confirm" | "error"
    title: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Calculate total balance
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const closeModal = () =>
    setModal((prev) => ({ ...prev, show: false, onConfirm: null }));

  const showSuccess = (msg) => {
    setModal({
      show: true,
      type: "success",
      title: "Success!",
      message: msg,
      onConfirm: null,
    });
    setTimeout(() => closeModal(), 2000);
  };

  const showConfirm = (title, message, onConfirm, type = "confirm") => {
    setModal({
      show: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const addTransaction = (transaction) => {
    // Case 1: Add salary
    if (transactions.length === 0) {
      setTransactions([
        { ...transaction, amount: Math.abs(transaction.amount) },
      ]);
      showSuccess("Salary added successfully!");
      return;
    }

    // Case 2: Prevent adding expense if balance = 0
    if (balance <= 0) {
      setErrorMessage("❌ Cannot add expense — balance is ₹0!");
      setTimeout(() => setErrorMessage(""), 2500);
      return;
    }

    // Case 3: Add expense (negative)
    setTransactions([
      { ...transaction, amount: -Math.abs(transaction.amount) },
      ...transactions,
    ]);
    showSuccess("Expense added successfully!");
  };

  const deleteTransaction = (id) => {
    showConfirm(
      "Delete Expense?",
      "Are you sure you want to delete this expense?",
      () => {
        setTransactions(transactions.filter((t) => t.id !== id));
        closeModal();
      },
      "error"
    );
  };

  const deleteSalary = () => {
    showConfirm(
      "Delete Salary?",
      "This will reset all data and remove your salary and expenses.",
      () => {
        setTransactions([]);
        closeModal();
      },
      "confirm"
    );
  };

  const editSalary = (newAmount) => {
    if (transactions.length > 0) {
      const updated = [...transactions];
      updated[updated.length - 1].amount = Math.abs(newAmount);
      setTransactions(updated);
      showSuccess("Salary updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md relative">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "overview" && (
          <>
            <Balance transactions={transactions} />
            {transactions.length === 0 && (
              <p className="text-gray-500 text-center mb-3">
                💰 Add your salary first!
              </p>
            )}

            {errorMessage && (
              <div className="bg-red-100 text-red-600 text-sm text-center p-2 rounded-md mb-2">
                {errorMessage}
              </div>
            )}

            <AddTransaction onAdd={addTransaction} />
          </>
        )}

        {activeTab === "expenses" && (
          <TransactionList
            transactions={transactions.filter((t) => t.amount < 0)}
            salary={transactions[transactions.length - 1]}
            onEditSalary={editSalary}
            onRequestDeleteExpense={(id, name) =>
              setModal({
                show: true,
                type: "error",
                title: "Delete Expense?",
                message: `Are you sure you want to delete "${name}"?`,
                onConfirm: () => {
                  setTransactions(transactions.filter((t) => t.id !== id));
                  closeModal();
                },
              })
            }
            onRequestDeleteSalary={() =>
              setModal({
                show: true,
                type: "confirm",
                title: "Delete Salary?",
                message:
                  "This will remove your salary and all expenses. Do you want to continue?",
                onConfirm: () => {
                  setTransactions([]);
                  closeModal();
                },
              })
            }
          />
        )}

        {/*Universal Modal */}
        <AppModal
          show={modal.show}
          type={modal.type}
          title={modal.title}
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={closeModal}
        />
      </div>
    </div>
  );
}

export default App;
