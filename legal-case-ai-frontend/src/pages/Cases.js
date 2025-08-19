import React, { useState } from "react";

const mockCases = [
  {
    id: 1,
    title: "Cheating Case - Section 420 IPC",
    date: "2025-08-01",
    summary: "Case involving cheating and dishonestly inducing delivery of property.",
    detail:
      "Detailed analysis shows this case falls under Section 420 IPC for cheating. Additional legal references can be added here.",
  },
  {
    id: 2,
    title: "Property Dispute - Section 6",
    date: "2025-07-15",
    summary: "Dispute over property ownership between parties.",
    detail:
      "Further details about property dispute case, legal precedents, and suggested arguments.",
  },
];

export default function Cases() {
  const [cases, setCases] = useState(mockCases);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredCases = cases.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Your Cases</h2>

      <input
        type="text"
        placeholder="Search cases..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      <button
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={() => alert("Add case form coming soon!")}
      >
        + Add New Case
      </button>

      {filteredCases.length === 0 && (
        <p className="text-center text-gray-500">No cases found.</p>
      )}

      {filteredCases.map(({ id, title, date, summary, detail }) => (
        <div
          key={id}
          className="border border-gray-300 dark:border-gray-600 rounded mb-4 p-4 cursor-pointer"
          onClick={() => setExpandedId(expandedId === id ? null : id)}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{title}</h3>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-1">{summary}</p>
          {expandedId === id && (
            <p className="text-gray-600 dark:text-gray-400 mt-3">{detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}
