import { useState } from "react";
import { Copy } from "lucide-react";

export default function OptimizedCodeBlock({ optimized_code }) {
  const [copied, setCopied] = useState(false);
    
  const handleCopy = async () => {
    try {
      if (!optimized_code) {
        console.warn("No code to copy!");
        return;
      }
      await navigator.clipboard.writeText(optimized_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="mt-4 relative">
      <h3 className="text-lg font-bold mb-2">Optimized Code</h3>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
        title="Copy code"
      >
        <Copy size={18} />
      </button>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
        {optimized_code}
      </pre>
      {copied && (
        <span className="absolute top-2 right-12 text-xs text-green-400">
          Copied!
        </span>
      )}
    </div>
  );
}
