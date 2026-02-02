import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaSave,
  FaRobot,
  FaFolderOpen,
  FaUser,
  FaCopy,
  FaTrashAlt,
  FaChevronRight,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [caseText, setCaseText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFormData, setSaveFormData] = useState({ title: "", summary: "" });
  const [recentCases, setRecentCases] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/cases?userId=${user.uid}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setRecentCases(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setRecentCases([]));
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>Loading your dashboard...</p>
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
        const errorText = await response.text();
        setAnalysis(
          `❌ Backend error (${response.status}):\n${errorText || "Unknown error."}`
        );
        setLoadingAI(false);
        return;
      }

      const data = await response.json();
      setAnalysis(data.analysis || "⚠️ No analysis received.");
    } catch (error) {
      console.error("Error analyzing case:", error);
      setAnalysis("❌ Failed to connect to backend. Please try again.");
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
        setTimeout(() => navigate("/cases"), 1200);
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

  const handleClear = () => {
    setCaseText("");
    setAnalysis("");
    setShowSaveModal(false);
    setSaveFormData({ title: "", summary: "" });
    toast.info("Cleared");
  };

  const copyResult = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis);
    toast.success("Copied to clipboard");
  };

  const displayName = user?.email?.split("@")[0] || "User";
  const initial = (displayName[0] || "U").toUpperCase();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Greeting */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-lg font-bold shadow">
          {initial}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getGreeting()}, {displayName}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FaRobot size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white">Analyze case</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Use the form below</p>
          </div>
        </div>
        <Link
          to="/cases"
          className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition"
        >
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
            <FaFolderOpen size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white">My cases</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">View all saved</p>
          </div>
          <FaChevronRight className="text-gray-400" />
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <FaUser size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white">Profile</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">View & edit</p>
          </div>
          <FaChevronRight className="text-gray-400" />
        </Link>
      </div>

      {/* Analyze section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FaRobot className="text-blue-600" />
            Analyze legal case
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Paste or type your case below. AI will summarize, cite relevant laws, and outline possible outcomes.
          </p>
        </div>

        <div className="p-5 space-y-4">
          <div className="relative">
            <textarea
              rows={6}
              placeholder="Paste or type legal case description..."
              value={caseText}
              onChange={(e) => setCaseText(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <span className="absolute bottom-2 right-2 text-xs text-gray-400">
              {caseText.length} characters
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAnalyze}
              disabled={loadingAI}
              className="inline-flex items-center gap-2 bg-blue-600 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:cursor-not-allowed"
            >
              <FaRobot />
              {loadingAI ? "Analyzing..." : "Analyze case"}
            </button>
            {analysis && (
              <>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  <FaSave />
                  Save case
                </button>
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <FaCopy />
                  Copy result
                </button>
              </>
            )}
            {(caseText || analysis) && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 px-4 py-2.5 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <FaTrashAlt />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* AI Result */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-5 bg-gray-50/50 dark:bg-gray-900/30">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            AI result
          </h3>
          {loadingAI ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            </div>
          ) : analysis ? (
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {analysis}
            </div>
          ) : (
            <div className="p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center text-gray-500 dark:text-gray-400 text-sm">
              <FaRobot className="mx-auto text-2xl mb-2 opacity-50" />
              <p>Run analysis to see AI summary, relevant laws, and possible outcomes here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent cases */}
      {recentCases.length > 0 && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Recent cases
            </h2>
            <Link
              to="/cases"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="p-5">
            <ul className="space-y-2">
              {recentCases.map((c) => (
                <li key={c._id}>
                  <Link
                    to="/cases"
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {c.title}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                      {new Date(c.date).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Save Case Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Save case
              </h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={saveFormData.title}
                  onChange={(e) =>
                    setSaveFormData({ ...saveFormData, title: e.target.value })
                  }
                  placeholder="e.g. Contract dispute – XYZ Ltd"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Summary (optional)
                </label>
                <textarea
                  value={saveFormData.summary}
                  onChange={(e) =>
                    setSaveFormData({ ...saveFormData, summary: e.target.value })
                  }
                  rows={3}
                  placeholder="Brief summary"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCase}
                disabled={saving}
                className="flex-1 py-2.5 rounded-lg bg-green-600 disabled:opacity-50 text-white font-medium hover:bg-green-700 transition"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
