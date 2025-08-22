import React from "react";
import { useState } from "react";
import ErrorShowing from "./ErrorShowing";

const AnalysisResultsPanel = ({
    criticalCount,
    infoCount,
    warningCount,
    codeQualityScore,
    messages,
    optimized_code,
    loadingParent,
}) => {

    const [showCritical, setShowCritical] = useState(true);
    const [showWarning, setShowWarning] = useState(true);
    const [showInfo, setShowInfo] = useState(true);

    if (codeQualityScore == 100) {
        optimized_code = ""
    }

    const filteredMessages = messages.filter((msg) => {
        if (msg.type === "critical" && showCritical) return true;
        if (msg.type === "warning" && showWarning) return true;
        if (msg.type === "info" && showInfo) return true;
        return false;
    });


    function QualityScore({ score }) {
        const radius = 48; // circle radius
        const stroke = 8; // thickness
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset =
            circumference - (score / 100) * circumference;

        // choose color based on score
        const color =
            score >= 80
                ? "text-green-400"
                : score >= 50
                    ? "text-yellow-400"
                    : "text-red-400";

        return (
            <div className="relative w-28 min-h-28 flex items-center justify-center">


                {loadingParent && (
                    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
                        <svg
                            className="animate-spin h-16 w-16 text-indigo-500 mb-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        <p className="text-white text-lg font-semibold">Fetching Code Quality...</p>
                    </div>
                )}
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="-rotate-90"
                >
                    <circle
                        stroke="#374151" // background circle (gray-700)
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="currentColor"
                        className={color}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        style={{ strokeDashoffset }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        strokeLinecap="round"
                    />
                </svg>
                <span
                    className={`absolute text-xl font-bold ${color}`}
                >
                    {score}%
                </span>
            </div>
        );
    }

    return (
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg flex flex-col max-h-[130vh] overflow-y-scroll 
  [&::-webkit-scrollbar]:w-1 
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-blue-500 
  [&::-webkit-scrollbar-thumb]:rounded-full">

            {/* Stats Section */}
            <div className="px-6 py-4 border-b border-gray-700 bg-gray-900/30">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-indigo-400">Analysis Results</h3>
                    
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-900/50 rounded shadow border border-gray-700">
                        <div className="text-red-500 text-2xl font-bold mb-1">{criticalCount}</div>
                        <div className="text-xs text-gray-400 uppercase font-medium">Critical</div>
                    </div>
                    <div className="text-center p-4 bg-gray-900/50 rounded shadow border border-gray-700">
                        <div className="text-yellow-400 text-2xl font-bold mb-1">{warningCount}</div>
                        <div className="text-xs text-gray-400 uppercase font-medium">Warning</div>
                    </div>
                    <div className="text-center p-4 bg-gray-900/50 rounded shadow border border-gray-700">
                        <div className="text-blue-400 text-2xl font-bold mb-1">{infoCount}</div>
                        <div className="text-xs text-gray-400 uppercase font-medium">Info</div>
                    </div>
                </div>

                {/* Overall Score */}
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2 rounded-full bg-gray-700 flex items-center justify-center">
                        <div className="absolute w-18 h-18 bg-gray-900 rounded-full flex items-center justify-center">
                            <span className="text-green-400 text-xl font-bold"><QualityScore score={codeQualityScore} />
                            </span>
                        </div>
                    </div>

                    <div className="font-semibold text-gray-300">Code Quality Score</div>
                    <div className="text-sm text-gray-500">All checks completed successfully.</div>
                </div>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/20">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-300 text-sm">Filter Issues</h4>
                    <button
                        onClick={() => {
                            setShowCritical(true);
                            setShowWarning(true);
                            setShowInfo(true);
                        }} className="text-indigo-400 text-sm font-medium hover:underline">Clear All</button>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                    <div className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs cursor-pointer">All Issues</div>
                    
                </div>

                <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2 text-gray-300 text-sm">
                        <input
                            type="checkbox"
                            checked={showCritical}
                            onChange={(e) => setShowCritical(e.target.checked)}
                            className="accent-red-500"
                        />
                        Critical Issues
                    </label>
                    <label className="flex items-center gap-2 text-gray-300 text-sm">
                        <input
                            type="checkbox"
                            checked={showWarning}
                            onChange={(e) => setShowWarning(e.target.checked)}
                            className="accent-yellow-400"
                        />
                        Warnings
                    </label>
                    <label className="flex items-center gap-2 text-gray-300 text-sm">
                        <input
                            type="checkbox"
                            checked={showInfo}
                            onChange={(e) => setShowInfo(e.target.checked)}
                            className="accent-blue-400"
                        />
                        Information
                    </label>
                </div>

            </div>
            {/* <AnalysisResultsPanel /> */}
            <ErrorShowing
                messages={filteredMessages}
                optimized_code={optimized_code}
            />
        </div>
    );
};

export default AnalysisResultsPanel;
