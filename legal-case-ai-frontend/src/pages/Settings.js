import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.info(
      `Notifications ${!notificationsEnabled ? "enabled" : "disabled"}.`
    );
  };

  const handleChangePassword = () => {
    alert("Change password feature coming soon!");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deletion feature coming soon!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="flex items-center justify-between mb-4">
        <span>Enable Notifications</span>
        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={handleNotificationsToggle}
          className="w-5 h-5"
        />
      </div>

      <button
        onClick={handleChangePassword}
        className="w-full mb-4 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded"
      >
        Change Password
      </button>

      <button
        onClick={handleDeleteAccount}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Delete Account
      </button>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Dark Mode toggle is available in the sidebar for your convenience.
      </p>
    </div>
  );
}
