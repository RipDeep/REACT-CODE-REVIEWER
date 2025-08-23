import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
// import "../style/navbar.css."

function Navbar({ ReanalyzeParent, loadSettingsValParent = () => { } }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState(2);
  const [autoSave, setAutoSave] = useState(true);
  const [lineWrap, setLineWrap] = useState(true);

  function ReanalyzeEdit() {

    if (typeof loadSettingsValParent === "function") {
      loadSettingsValParent(theme, fontSize, tabSize, autoSave, lineWrap);
      console.log("working");

      // loadSettingsValParent(theme, fontSize, tabSize, autoSave, lineWrap);
    } else {
      console.warn("loadSettingsValParent is not passed from parent!");
    }
  }

  // function loadSettings(theme, fontSize, tabSize, autoSave, lineWrap) {
  //   // setTheme(theme);
  //   // setFontSize(fontSize);
  //   // setTabSize(tabSize);
  //   // setAutoSave(autoSave);
  //   // setLineWrap(lineWrap);
  //   console.log("going to load settings from navbar", { theme, fontSize, tabSize, autoSave, lineWrap });

  // }




  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  async function openHistory() {
    try {
      const savedData = localStorage.getItem("userCodeData");

      if (!savedData) {
        showToast("No history found!");
        return;
      }

      const parsed = JSON.parse(savedData);

      // Ensure parsed data is an array
      if (!Array.isArray(parsed) || parsed.length === 0) {
        showToast("No history found!");
        return;
      }

      // Set state with parsed data (latest first)
      setHistoryData(parsed);

      // Open the modal to show history
      setShowHistory(true);
    } catch (error) {
      console.error("Error reading history:", error);
      showToast("Failed to load history!");
    }
  }


  function handleCopy(code) {
    navigator.clipboard.writeText(code);
    showToast("Copied to clipboard!");
  }

  const clearHistory = () => {
    // Clear the state so the modal updates immediately
    setHistoryData([]);

    // Remove the saved history from localStorage
    localStorage.removeItem("userCodeData");

    // Optional: show a toast/notification
    showToast("History cleared successfully!");
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
            onClick={openHistory}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            History
          </button>
          {/* <button
            onClick={() => setShowSettings(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            Settings
          </button> */}
          <Link

            onClick={() => {
              ReanalyzeParent()
            }}
            to="/home"
            // onClick={() => showToast("New Review feature is on the way!")}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform"
          >
            New Review
          </Link>
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
                openHistory();
                // showToast("History feature is on the way!");
                setMenuOpen(false);
              }}
              className="w-full text-left px-6 py-3 border-b border-gray-700 text-gray-300 hover:bg-gray-800 transition"
            >
              History
            </button>
            {/* <button
              onClick={() => {
                setShowSettings(true)
                setMenuOpen(false);
              }}
              className="w-full text-left px-6 py-3 border-b border-gray-700 text-gray-300 hover:bg-gray-800 transition"
            >
              Settings
            </button> */}
            <Link
              onClick={() => {
                ReanalyzeParent()
                // showToast("New Review feature is on the way!");
                setMenuOpen(false);
              }}
              to="/home"
              className="w-full text-left px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition sm:w-full block font-semibold rounded-b-2xl shadow-lg"
            >
              New Review
            </Link>


          </motion.div>
        )}
      </AnimatePresence>

      {/* setting mode */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 max-w-md w-full text-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Settings Content */}
              <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-gray-900/30">
                {/* Theme Selection */}
                <div className="flex flex-col bg-gray-800 p-3 rounded-lg">
                  <label className="mb-2 text-sm text-gray-200 font-medium">Theme</label>
                  <select
                    className="bg-gray-900 text-white p-2 rounded-md"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option>Dark</option>
                    <option>Light</option>
                    <option>Solarized</option>
                    <option>Monokai</option>
                  </select>
                </div>

                {/* Font Size */}
                <div className="flex flex-col bg-gray-800 p-3 rounded-lg">
                  <label className="mb-2 text-sm text-gray-200 font-medium">Font Size</label>
                  <input
                    type="number"
                    min={10}
                    max={30}
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value) || 14)}
                    className="bg-gray-900 text-white p-2 rounded-md"
                  />
                </div>

                {/* Tab Size */}
                <div className="flex flex-col bg-gray-800 p-3 rounded-lg">
                  <label className="mb-2 text-sm text-gray-200 font-medium">Tab Size</label>
                  <input
                    type="number"
                    min={2}
                    max={8}
                    value={tabSize}
                    onChange={(e) => setTabSize(parseInt(e.target.value) || 4)}
                    className="bg-gray-900 text-white p-2 rounded-md"
                  />
                </div>

                {/* Auto-Save */}
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <span>Enable Auto-Save</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-indigo-500"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                  />
                </div>

                {/* Line Wrap */}
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <span>Enable Line Wrap</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-indigo-500"
                    checked={lineWrap}
                    onChange={(e) => setLineWrap(e.target.checked)}
                  />
                </div>

                <button
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md"
                  onClick={() => {
                    ReanalyzeEdit();
                    showToast("Settings applied!");
                    console.log({ theme, fontSize, tabSize, autoSave, lineWrap });
                  }}
                >
                  Apply Settings
                </button>


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>





      {/* ✅ History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 max-w-2xl w-full text-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Saved History</h2>
                <div className="flex items-center gap-2">
                  {/* Clear History Button */}
                  <button
                    onClick={() => (
                      clearHistory(),
                      setHistoryData([]))}  // clears history
                    className="text-sm px-3 mr-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md"
                  >
                    Clear History
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => (
                      
                      setShowHistory(false))}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* History List */}
              {historyData && historyData.length > 0 ? (
                <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-gray-900/30">
                  {historyData.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 rounded-lg p-3 bg-gray-800"
                    >
                      <p>
                        <span className="font-semibold">File:</span>{" "}
                        {item.fileName}.{item.extension}
                      </p>
                      <p>
                        <span className="font-semibold">Language:</span> {item.language}
                      </p>

                      {/* Code Box with Copy */}
                      <div className="relative bg-gray-900 p-2 rounded-md mt-2 max-h-40 overflow-y-auto text-xs scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-gray-900/30">
                        <button
                          onClick={() => handleCopy(item.code)}
                          className="absolute top-2 right-2 text-xs px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded shadow-md"
                        >
                          Copy
                        </button>
                        <pre className="whitespace-pre-wrap">{item.code}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No history found.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>




      {/* copied notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            ✅ Code Copied!
          </motion.div>
        )}
      </AnimatePresence>



      {/* ✅ Toast Notification */}


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
