import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);

  const [caseText, setCaseText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  const handleAnalyze = async () => {
    if (!caseText.trim()) {
      alert("Please enter a case description before analyzing.");
      return;
    }

    setLoadingAI(true);
    setAnalysis("");

    try {
      // Make sure this endpoint matches your backend route!
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseText }),
      });

      if (!response.ok) {
        // Try to read error message from backend, else show generic error
        let errorText = await response.text();
        setAnalysis(
          `❌ Backend error (${response.status}):\n${errorText || "Unknown error."}`
        );
        setLoadingAI(false);
        return;
      }

      const data = await response.json();

      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        setAnalysis("⚠️ No analysis received.");
      }
    } catch (error) {
      console.error("Error analyzing case:", error);
      setAnalysis("❌ Failed to connect to backend or invalid response.");
    }

    setLoadingAI(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.email}</h2>

      {/* Profile Card */}
      <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Account:</strong> Basic
          </p>
          <p>
            <strong>Status:</strong> Active
          </p>
        </div>
      </section>

      {/* Legal Case Input */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Enter Legal Case</h3>
        <textarea
          rows="7"
          placeholder="Paste or type legal case description..."
          value={caseText}
          onChange={(e) => setCaseText(e.target.value)}
          className="w-full p-4 border rounded-lg mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 transition"
        />
        <button
          onClick={handleAnalyze}
          disabled={loadingAI}
          className="bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loadingAI ? "Analyzing..." : "Analyze Case"}
        </button>

        <div className="mt-6">
          <h4 className="text-md font-medium mb-2 text-gray-800 dark:text-gray-200">
            AI Result
          </h4>
          <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {analysis
              ? analysis
              : "🔎 The AI-generated case analysis will appear here."}
          </div>
        </div>
      </section>
    </div>
  );
}
