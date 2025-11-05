import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import Tabs from "./components/Tabs";
import SuccessModal from "./components/SuccessModal"; // 🆕 import

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [showSuccess, setShowSuccess] = useState(false); //for modal

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    if (transactions.length === 0) {
      setTransactions([
        { ...transaction, amount: Math.abs(transaction.amount) },
      ]);
    } else {
      setTransactions([
        { ...transaction, amount: -Math.abs(transaction.amount) },
        ...transactions,
      ]);
      setShowSuccess(true); //Show modal on adding expense
      setTimeout(() => setShowSuccess(false), 2000); // auto hide after 2s
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editSalary = (newAmount) => {
    if (transactions.length > 0) {
      const updated = [...transactions];
      updated[updated.length - 1].amount = Math.abs(newAmount);
      setTransactions(updated);
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
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center mb-3">
                💰 Add your salary first!
              </p>
            ) : null}
            <AddTransaction onAdd={addTransaction} />
          </>
        )}

        {activeTab === "expenses" && (
          <TransactionList
            transactions={transactions.filter((t) => t.amount < 0)}
            onDelete={deleteTransaction}
            salary={transactions[transactions.length - 1]}
            onEditSalary={editSalary}
          />
        )}

        {/* Success Modal */}
        {showSuccess && <SuccessModal message="Expense added successfully!" />}
      </div>
    </div>
  );
}

export default App;
