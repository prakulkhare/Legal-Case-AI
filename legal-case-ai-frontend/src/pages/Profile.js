import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    phone: "",
    bio: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    setLoadingProfile(true);
    try {
      const response = await fetch(
        `${API_URL}/profile?userId=${user.uid}&email=${user.email}`
      );
      if (response.ok) {
        const data = await response.json();
        setProfile({
          email: data.email || user.email || "",
          username: data.username || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });
      } else {
        toast.error("Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error loading profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be logged in to save your profile");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email || profile.email,
          username: profile.username,
          phone: profile.phone,
          bio: profile.bio,
        }),
      });

      if (response.ok) {
        toast.success("Profile saved successfully!");
        fetchProfile();
      } else {
        toast.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

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
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
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
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          placeholder="Tell us something about yourself"
        ></textarea>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
