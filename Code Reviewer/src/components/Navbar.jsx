import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [toastMessage, setToastMessage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex items-center justify-between w-full px-8 py-5 bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700"
      >
        {/* Logo + Badge */}
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            CodeReview <span className="text-indigo-400">AI</span>
          </h1>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-bold uppercase rounded-full px-3 py-1 text-white shadow-md">
            Beta
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 items-center">
          <button
            onClick={() => showToast("History feature is on the way!")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            History
          </button>
          <button
            onClick={() => showToast("Settings feature is on the way!")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            Settings
          </button>
          <button
            onClick={() => showToast("New Review feature is on the way!")}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform"
          >
            New Review
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Menu className="text-white w-6 h-6" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-gray-900/80 backdrop-blur-md rounded-b-2xl border border-gray-700 mt-2"
          >
            <button
              onClick={() => {
                showToast("History feature is on the way!");
                setMenuOpen(false);
              }}
              className="w-full text-left px-6 py-3 border-b border-gray-700 text-gray-300 hover:bg-gray-800 transition"
            >
              History
            </button>
            <button
              onClick={() => {
                showToast("Settings feature is on the way!");
                setMenuOpen(false);
              }}
              className="w-full text-left px-6 py-3 border-b border-gray-700 text-gray-300 hover:bg-gray-800 transition"
            >
              Settings
            </button>
            <button
              onClick={() => {
                showToast("New Review feature is on the way!");
                setMenuOpen(false);
              }}
              className="w-full text-left px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
            >
              New Review
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
