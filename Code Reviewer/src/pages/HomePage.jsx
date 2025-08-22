import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CodeAnalysisPanel from '../components/CodeAnalysisPanel';
import AnalysisResultsPanel from '../components/AnalysisResultsPanel';

function HomePage(props) {

  const [criticalCount, setCriticalCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loadingParent, setLoadingParent] = useState(false);
  const [optimized_code, setOptimized_code] = useState([]);
  const [codeQualityScore, setCodeQualityScore] = useState("");



  const updateVal = (criticalCountVal, warningCountVal, infoCountVal, codeQualityScoreVal, messagesVal, optimized_code, loading) => {
    setCriticalCount(criticalCountVal);
    setWarningCount(warningCountVal);
    setInfoCount(infoCountVal);
    setCodeQualityScore(codeQualityScoreVal);
    setMessages(messagesVal)
    setOptimized_code(optimized_code)
    setLoadingParent(loadingParent)
  }

  const [data, setData] = useState("")
  useEffect(() => {
    setData(props.demoData ? props.demoData : "");
  }, [props.demoData]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">


      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">

        {/* Code Analysis Panel */}
        <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">Code Analysis</h2>
          <CodeAnalysisPanel data={data} updateParentVal={updateVal} setLoadingParent={setLoadingParent} />
        </div>

        {/* Analysis Results Panel */}
        <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Analysis Results</h2>
          <AnalysisResultsPanel
            criticalCount={criticalCount}
            infoCount={infoCount}
            warningCount={warningCount}
            codeQualityScore={codeQualityScore}
            messages={messages}
            optimized_code={optimized_code}
            loadingParent={loadingParent}
          />
        </div>

      </main>
    </div>
  );
}

export default HomePage;
