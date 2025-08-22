import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

function Navbar() {
  return (
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

      {/* Links */}
      <div className="hidden md:flex gap-5 items-center">
        <Link className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200">
          History
        </Link>
        <Link className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200">
          Settings
        </Link>
        <Link className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform">
          New Review
        </Link>
      </div>
    </motion.div>
  );
}

export default Navbar;
