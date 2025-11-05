import React from "react";
import { motion } from "framer-motion";

/**
 * Universal modal for success, confirmation, and warning messages
 * type = "success" | "confirm" | "error"
 * actions = { onConfirm, onCancel }
 */
const AppModal = ({
  show,
  type = "confirm",
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  const color =
    type === "success"
      ? "text-green-500"
      : type === "error"
      ? "text-red-500"
      : "text-blue-500";

  const bgColor =
    type === "success"
      ? "bg-green-100"
      : type === "error"
      ? "bg-red-100"
      : "bg-blue-100";

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-3"
        >
          <div
            className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center`}
          >
            {type === "success" ? (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 52 52"
                className={`w-10 h-10 ${color}`}
              >
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 27l7 7 17-17"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-8 h-8 ${color}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </motion.div>

        {/* Title & Message */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{message}</p>

        {/* Buttons */}
        {type === "success" ? (
          <></> // No buttons for success, closes automatically
        ) : (
          <div className="flex justify-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 ${
                type === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-md`}
            >
              Confirm
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AppModal;
