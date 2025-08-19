import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  FaMoon,
  FaSun,
  FaHome,
  FaUser,
  FaFolderOpen,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 shadow p-6 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && (
            <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              ⚖️ Lawlytics
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4 flex-grow">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 text-left font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive ? "font-bold text-blue-700 dark:text-blue-300" : ""
              } ${sidebarOpen ? "justify-start" : "justify-center"}`
            }
            title="Dashboard"
          >
            <FaHome />
            {sidebarOpen && "Dashboard"}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 text-left font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive ? "font-bold text-blue-700 dark:text-blue-300" : ""
              } ${sidebarOpen ? "justify-start" : "justify-center"}`
            }
            title="Profile"
          >
            <FaUser />
            {sidebarOpen && "Profile"}
          </NavLink>

          <NavLink
            to="/cases"
            className={({ isActive }) =>
              `flex items-center gap-3 text-left font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive ? "font-bold text-blue-700 dark:text-blue-300" : ""
              } ${sidebarOpen ? "justify-start" : "justify-center"}`
            }
            title="Cases"
          >
            <FaFolderOpen />
            {sidebarOpen && "Cases"}
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 text-left font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive ? "font-bold text-blue-700 dark:text-blue-300" : ""
              } ${sidebarOpen ? "justify-start" : "justify-center"}`
            }
            title="Settings"
          >
            <FaCog />
            {sidebarOpen && "Settings"}
          </NavLink>
        </nav>

        {/* Bottom Controls */}
        <div className="mt-auto flex flex-col space-y-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center ${
              sidebarOpen ? "justify-start px-4" : "justify-center"
            } gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition`}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {sidebarOpen && (darkMode ? "Light Mode" : "Dark Mode")}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className={`flex items-center ${
              sidebarOpen ? "justify-start px-4" : "justify-center"
            } gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition`}
            title="Logout"
          >
            <FaSignOutAlt />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Page Content */}
      <main className="flex-grow p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
