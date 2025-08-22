import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";





const CodeAnalysisPanel = ({ data, updateParentVal, setLoadingParent }) => {
    const [fileSelected, setFileSelected] = useState(true);
    const [fileName, setFileName] = useState("main");
    const [language, setLanguage] = useState("python");
    const [extension, setExtension] = useState(".py");
    const [comment, setComment] = useState(`# Your comment here \n \n \n`);
    const [criticalCount, setCriticalCount] = useState(0);
    const [warningCount, setWarningCount] = useState(0);
    const [infoCount, setInfoCount] = useState(0);
    const [optimized_code, setOptimized_code] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [codeQualityScore, setCodeQualityScore] = useState("");
    const [fileSizeKB, setFileSizeKB] = useState(null);


    const [AnalysisResultsPanel, setAnalysisResultsPanel] = useState(null)



    function commentGenerate(lang) {
        const hashCommentLangs = ["python", "ruby", "shell", "bash", "r"];
        const doubleSlashLangs = ["javascript", "typescript", "java", "c", "cpp", "csharp", "go", "swift", "kotlin", "rust", "scala", "dart", "php"];

        lang = lang.toLowerCase();

        if (hashCommentLangs.includes(lang)) {
            setComment("# Your comment here\n\n\n");
        } else if (doubleSlashLangs.includes(lang)) {
            setComment("// Your comment here\n\n\n");
        } else {
            setComment("/* Start coding... */\n\n\n");
        }
    }

    const handleFileImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const sizeInKB = (file.size / 1024).toFixed(2);
        setFileSizeKB(sizeInKB);

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            setCode(text); // set editor content
            setFileName(file.name.split(".")[0]); // set name without extension
            const ext = "." + file.name.split(".").pop();
            setExtension(ext); // set extension
            const lang = Object.keys(languageExtensions).find(
                (key) => languageExtensions[key] === file.name.split(".").pop()
            );
            if (lang) setLanguage(lang); // update language if recognized
        };
        reader.readAsText(file);
    };



    // const apiKey = import.meta.env.VITE_GOOGLE_API_KEY



    async function analyzeCodeHandler() {

        const apiKeys = [
            import.meta.env.VITE_GOOGLE_API_KEY_1,
            import.meta.env.VITE_GOOGLE_API_KEY_2,
            import.meta.env.VITE_GOOGLE_API_KEY_3,
            import.meta.env.VITE_GOOGLE_API_KEY_4
        ];

        setLoading(true);
        setLoadingParent(true);
        let parsed = null;


        for (let key of apiKeys) {

            if (!key) continue;
            const gen = new GoogleGenerativeAI(key);
            try {
                const model = gen.getGenerativeModel({ model: "gemini-1.5-flash" });

                const prompt = `
            You are a code analysis assistant.
            Analyze the following ${language} code and return ONLY valid JSON with:
            {
                "critical": integer,
                "warning": integer,
                "info": integer,
                "code_quality": percentage(0-100)
                "messages": [
                        {
                            "type": "critical" | "warning" | "info",
                            "message": "short explanation of the issue",
                            "suggestion": "how to fix the issue"
                        }
                    ],
                
                "notification": "If there are any issues, provide a summary notification message here. Otherwise  say 'No issues found.'",
                
                "optimized_code": "Provide the 100% corrected and           
                optimized code here not give any comment"
  
            }
            No explanations or extra text.

            Rules:
            - Output must be ONLY valid JSON (no markdown, no explanations, no extra text).

            - 'optimized_code' must contain the full improved version of the input code.

            - Keep all counts ('critical', 'warning', 'info') accurate and consistent with messages.

            - If there are no issues, 'messages' can be an empty array.
            
            Code:
            ${code}
           `;

                const result = await model.generateContent(prompt);
                let text = (await result.response.text()).trim();

                // Extract JSON safely (if model adds extra text accidentally)
                const match = text.match(/\{[\s\S]*\}/);
                if (!match) continue;
                // if (!match) {
                //     console.error("No valid JSON found:", text);
                //     return;
                // }

                parsed = JSON.parse(match[0]);
                break;
            } catch (err) {
                console.warn(`API key failed, trying next: ${err.message}`);
                continue; // try next key
            }
        }
        if (!parsed) {
            alert("All API keys failed or no valid response.");
            setLoading(false);
            setLoadingParent(false);
            return;
        }
        setCriticalCount(parsed.critical || 0);
        setWarningCount(parsed.warning || 0);
        setInfoCount(parsed.info || 0);
        setCodeQualityScore(parsed.code_quality || 0);
        setMessages(parsed.messages || []);
        setOptimized_code(parsed.optimized_code || "");

        updateParentVal(
            parsed.critical || 0,
            parsed.warning || 0,
            parsed.info || 0,
            parsed.code_quality || 0,
            parsed.messages || [],
            parsed.optimized_code || "",
            setLoading
        );

        setLoading(false);
        setLoadingParent(false);
    }

const [code, setCode] = useState(`${comment}\n`); // store editor content here

useEffect(() => {
    setCode(comment);
}, [comment]);

useEffect(() => {
    if (data) setCode(data);
}, [data]);


function Reanalyze() {
    setCode(""); // clears the editor
    setCode(`${comment}`);

}



const languageExtensions = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    java: "java",
    c: "c",
    cpp: "cpp",
    csharp: "cs",
    go: "go",
    php: "php",
    ruby: "rb",
    swift: "swift",
    kotlin: "kt",
    rust: "rs",
    scala: "scala",
    dart: "dart",
};

return (

    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg flex flex-col min-h-[700px] overflow-hidden relative">

  {/* Loading Overlay */}
  {loading && (
    <div className="absolute inset-0 bg-gray-900/70 z-50 flex flex-col items-center justify-center">
      <svg
        className="animate-spin h-10 w-10 text-indigo-500 mb-4"
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
      <p className="text-white text-lg font-semibold">Analyzing code...</p>
    </div>
  )}

  {/* Panel Header */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 border-b border-gray-700 bg-gray-900/30 gap-4 sm:gap-0">
    <div className="flex flex-col gap-1 w-full sm:w-auto">
      <h2 className="text-lg font-semibold text-indigo-400">Code Analysis</h2>
      <div className="flex flex-row sm:flex-row gap-2 text-sm text-gray-400">
        <span>{fileSelected ? `${fileName}.${extension}` : "No file selected"}</span>
        <span className="bg-gray-700/50 px-2 rounded text-xs">{fileSizeKB ? `${fileSizeKB} KB` : "-- KB"}</span>
      </div>
    </div>

    {/* Import + Re-analyze buttons */}
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <label
        htmlFor="fileInput"
        className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-700/50 text-gray-300 rounded hover:bg-gray-700/70 transition cursor-pointer w-full sm:w-auto text-center"
      >
        <i className="feather-download"></i> Import
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".py,.js,.ts,.java,.c,.cpp,.cs,.go,.php,.rb,.swift,.kt,.rs,.scala,.dart"
        className="hidden"
        onChange={handleFileImport}
      />

      <button
        onClick={Reanalyze}
        className="flex items-center justify-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition w-full sm:w-auto"
      >
        <i className="feather-refresh-cw"></i> Re-analyze
      </button>
    </div>
  </div>

  {/* File Tabs + Language Select */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-700 gap-3">
    <div
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-b-2 ${fileSelected ? "border-indigo-500 text-indigo-400 font-medium" : "border-transparent text-gray-400"}`}
      onClick={() => setFileSelected(true)}
    >
      {fileName}.{extension}
    </div>

    <div className=" relative w-full sm:w-1/3">
      <select
        value={language}
        onChange={(e) => {
          const selectedLang = e.target.value;
          setLanguage(selectedLang);
          setExtension(languageExtensions[selectedLang]);
          commentGenerate(selectedLang);
        }}
        className="bg-gray-800 text-gray-200 px-3 py-2 rounded-xl border border-gray-700 shadow-sm w-full appearance-none cursor-pointer text-sm sm:px-3"
      >
        {Object.keys(languageExtensions).map((lang) => (
          <option key={lang} value={lang} className="bg-gray-800 text-gray-200">
            {lang} 
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <button
      onClick={analyzeCodeHandler}
      className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg w-full sm:w-auto"
    >
      Submit
    </button>
  </div>

  {/* Editor */}
  <div className="flex-1 relative h-[60vh] sm:h-[80vh] overflow-auto">
    {fileSelected ? (
      <Editor
        height="100vh"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
        defaultValue={comment}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          lineNumbers: "on",
          lineNumbersMinChars: 3,
          renderLineHighlight: "all",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        onMount={(editor, monaco) => {
          monaco.editor.setTheme("vs-dark");
        }}
      />
    ) : (
      <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center z-10 rounded-b-2xl">
        <i className="feather-file-text text-gray-500 text-4xl mb-2"></i>
        <p className="text-gray-400">Select a file to view code</p>
      </div>
    )}
  </div>
</div>

);
    };


export default CodeAnalysisPanel;
