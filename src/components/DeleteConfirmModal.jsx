import React from "react";
import { motion } from "framer-motion";

const DeleteConfirmModal = ({ onConfirm, onCancel, expenseName }) => {
  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-3"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="red"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </motion.div>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Remove Expense?
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">{expenseName}</span>?
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmModal;
