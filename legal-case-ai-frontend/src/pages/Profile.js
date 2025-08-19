import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  // Mock user data - replace with real data later
  const [profile, setProfile] = useState({
    email: "user@example.com",
    username: "JohnDoe",
    phone: "",
    bio: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // mock save
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email (read-only)</label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="e.g. +1234567890"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border rounded"
          placeholder="Tell us something about yourself"
        ></textarea>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
