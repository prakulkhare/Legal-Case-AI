import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaBalanceScale } from "react-icons/fa";

export default function Login() {
  const [mode, setMode] = useState("login"); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState(null); // Success or error message
  const navigate = useNavigate();

  const handleAuth = async () => {
    setStatusMessage(null);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        setStatusMessage("Login successful! Redirecting...");
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        setStatusMessage("Account created! Redirecting...");
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setStatusMessage("Password reset link sent! Check your email.");
        setTimeout(() => {
          setMode("login");
          setStatusMessage(null);
        }, 3000);
        return;
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  const handleGoogle = async () => {
    setStatusMessage(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setStatusMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
        <h1 className="flex items-center justify-center text-3xl font-bold text-blue-700 mb-6 space-x-2">
          <FaBalanceScale className="text-4xl" />
          <span>Lawlytics</span>
        </h1>

        <h2 className="text-xl text-center font-semibold mb-4 capitalize">
          {mode === "login"
            ? "Welcome back"
            : mode === "signup"
            ? "Create your account"
            : "Reset your password"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        {mode !== "forgot" && (
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Create Account"
            : "Send Reset Link"}
        </button>

        {statusMessage && (
          <p
            className={`mt-3 text-center ${
              statusMessage.startsWith("Error") ? "text-red-600" : "text-green-600"
            } font-medium`}
          >
            {statusMessage}
          </p>
        )}

        {mode === "login" && (
          <button
            onClick={() => setMode("forgot")}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        )}

        <p className="text-center text-sm my-4">
          {mode === "login" && "New here?"}
          {mode === "signup" && "Already have an account?"}
          {mode === "forgot" && "Remember your password?"}{" "}
          <button
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="text-blue-600 font-medium hover:underline"
          >
            {mode === "login"
              ? "Sign Up"
              : mode === "signup"
              ? "Login"
              : "Back to Login"}
          </button>
        </p>

        <div className="relative text-center my-4">
          <span className="bg-white px-2 text-gray-400 text-sm z-10 relative">
            or continue with
          </span>
          <hr className="absolute w-full top-1/2 transform -translate-y-1/2 border-t" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>

      <footer className="mt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Lawlytics · All rights reserved
      </footer>
    </div>
  );
}
