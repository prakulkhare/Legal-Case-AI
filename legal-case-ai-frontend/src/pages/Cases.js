import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

export default function Cases() {
  const [user, loading] = useAuthState(auth);
  const [cases, setCases] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingCases, setLoadingCases] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    caseText: "",
    summary: "",
  });
  const [editingCase, setEditingCase] = useState(null);

  useEffect(() => {
    if (user) {
      fetchCases();
    }
  }, [user]);

  const fetchCases = async () => {
    if (!user) return;
    setLoadingCases(true);
    try {
      const response = await fetch(`${API_URL}/cases?userId=${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setCases(data);
      } else {
        toast.error("Failed to fetch cases");
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
      toast.error("Error loading cases");
    } finally {
      setLoadingCases(false);
    }
  };

  const handleAddCase = () => {
    setFormData({ title: "", caseText: "", summary: "" });
    setEditingCase(null);
    setShowModal(true);
  };

  const handleEditCase = (caseItem) => {
    setFormData({
      title: caseItem.title,
      caseText: caseItem.caseText,
      summary: caseItem.summary || "",
    });
    setEditingCase(caseItem);
    setShowModal(true);
  };

  const handleDeleteCase = async (caseId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this case?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cases/${caseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Case deleted successfully");
        fetchCases();
      } else {
        toast.error("Failed to delete case");
      }
    } catch (error) {
      console.error("Error deleting case:", error);
      toast.error("Error deleting case");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.caseText.trim()) {
      toast.error("Title and case text are required");
      return;
    }

    try {
      if (editingCase) {
        // Update existing case
        const response = await fetch(`${API_URL}/cases/${editingCase._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            caseText: formData.caseText,
            summary: formData.summary,
          }),
        });

        if (response.ok) {
          toast.success("Case updated successfully");
          setShowModal(false);
          fetchCases();
        } else {
          toast.error("Failed to update case");
        }
      } else {
        // Analyze case first, then save
        toast.info("Analyzing case...");
        const analyzeResponse = await fetch(`${API_URL}/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ caseText: formData.caseText }),
        });

        if (!analyzeResponse.ok) {
          toast.error("Failed to analyze case");
          return;
        }

        const analyzeData = await analyzeResponse.json();

        // Create new case with analysis
        const response = await fetch(`${API_URL}/cases`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.uid,
            title: formData.title,
            caseText: formData.caseText,
            analysis: analyzeData.analysis,
            summary: formData.summary,
          }),
        });

        if (response.ok) {
          toast.success("Case created successfully");
          setShowModal(false);
          fetchCases();
        } else {
          toast.error("Failed to create case");
        }
      }
    } catch (error) {
      console.error("Error saving case:", error);
      toast.error("Error saving case");
    }
  };

  if (loading || loadingCases) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  const filteredCases = cases.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Your Cases</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search cases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          onClick={handleAddCase}
        >
          + Add New Case
        </button>
      </div>

      {filteredCases.length === 0 && !loadingCases && (
        <p className="text-center text-gray-500 py-8">No cases found.</p>
      )}

      {filteredCases.map((caseItem) => (
        <div
          key={caseItem._id}
          className="border border-gray-300 dark:border-gray-600 rounded mb-4 p-4 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div
              className="flex-1 cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === caseItem._id ? null : caseItem._id)
              }
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{caseItem.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(caseItem.date).toLocaleDateString()}
                </span>
              </div>
              {caseItem.summary && (
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {caseItem.summary}
                </p>
              )}
              {expandedId === caseItem._id && (
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Case Details:</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {caseItem.caseText}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">AI Analysis:</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {caseItem.analysis}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditCase(caseItem);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition"
                title="Edit case"
              >
                <FaEdit />
              </button>
              <button
                onClick={(e) => handleDeleteCase(caseItem._id, e)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                title="Delete case"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add/Edit Case Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingCase ? "Edit Case" : "Add New Case"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Case Text *</label>
                <textarea
                  value={formData.caseText}
                  onChange={(e) =>
                    setFormData({ ...formData, caseText: e.target.value })
                  }
                  rows="6"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Summary (Optional)</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  rows="3"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Brief summary of the case"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {editingCase ? "Update Case" : "Create Case"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
