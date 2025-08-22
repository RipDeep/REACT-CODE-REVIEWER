import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LandingPage() {

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black w-screen h-full overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl absolute top-10 left-10 animate-pulse" />
        <div className="w-96 h-96 bg-purple-600/20 rounded-full blur-3xl absolute bottom-20 right-10 animate-pulse" />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center text-white pt-28 px-5">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to analyze your code?
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-4 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Upload your files or paste your code to get started with our
          AI-powered <span className="font-semibold text-indigo-400">smart code review</span>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* <Link
            to="/home"
            // onClick={handleGetStarted}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-8 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform">
            Get Started
          </Link> */}
          <Link
            to="/home"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-8 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform">
            Get Started
          </Link>

          <Link
            to="/demo"
            className="bg-gray-800 py-3 px-8 rounded-xl font-semibold text-gray-300 text-lg shadow hover:bg-gray-700 hover:text-white transition-transform">
            Try Demo
          </Link>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 text-lg">
          <motion.div
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="font-bold mb-2 text-indigo-400">🔒 Security Analysis</h3>
            <p className="text-sm text-gray-300">
              Detect vulnerabilities, insecure patterns, and improve code safety.
            </p>
          </motion.div>

          <motion.div
            className="mb-5 bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="font-bold mb-2 text-purple-400">⚡ Performance Tips</h3>
            <p className="text-sm text-gray-300">
              Get AI suggestions to optimize performance and efficiency.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
