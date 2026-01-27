import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { FaTimes, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [caseText, setCaseText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFormData, setSaveFormData] = useState({
    title: "",
    summary: "",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  const handleAnalyze = async () => {
    if (!caseText.trim()) {
      toast.error("Please enter a case description before analyzing.");
      return;
    }

    setLoadingAI(true);
    setAnalysis("");

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseText }),
      });

      if (!response.ok) {
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

  const handleSaveCase = async () => {
    if (!saveFormData.title.trim()) {
      toast.error("Please enter a title for the case");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to save cases");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          title: saveFormData.title,
          caseText: caseText,
          analysis: analysis,
          summary: saveFormData.summary,
        }),
      });

      if (response.ok) {
        toast.success("Case saved successfully!");
        setShowSaveModal(false);
        setCaseText("");
        setAnalysis("");
        setSaveFormData({ title: "", summary: "" });
        // Optionally navigate to cases page
        setTimeout(() => {
          navigate("/cases");
        }, 1500);
      } else {
        toast.error("Failed to save case");
      }
    } catch (error) {
      console.error("Error saving case:", error);
      toast.error("Error saving case");
    } finally {
      setSaving(false);
    }
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
        <div className="flex gap-3">
          <button
            onClick={handleAnalyze}
            disabled={loadingAI}
            className="bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {loadingAI ? "Analyzing..." : "Analyze Case"}
          </button>
          {analysis && (
            <button
              onClick={() => setShowSaveModal(true)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition flex items-center gap-2"
            >
              <FaSave /> Save Case
            </button>
          )}
        </div>

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

      {/* Save Case Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Save Case</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title *</label>
                <input
                  type="text"
                  value={saveFormData.title}
                  onChange={(e) =>
                    setSaveFormData({ ...saveFormData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter case title"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Summary (Optional)</label>
                <textarea
                  value={saveFormData.summary}
                  onChange={(e) =>
                    setSaveFormData({
                      ...saveFormData,
                      summary: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Brief summary of the case"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCase}
                  disabled={saving}
                  className="px-4 py-2 bg-green-600 disabled:opacity-50 text-white rounded hover:bg-green-700 transition"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
