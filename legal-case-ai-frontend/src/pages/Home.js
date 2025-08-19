import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaUserShield, FaChartLine } from "react-icons/fa";

export default function HomePage() {
  // Section Refs
  const aboutRef = useRef(null);
  const termsRef = useRef(null);
  const contactRef = useRef(null);
  const privacyRef = useRef(null);
  const insightsRef = useRef(null);

  // Smooth Scroll
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Info tiles data
  const infoTiles = [
    {
      title: "About Us",
      content:
        "Lawlytics empowers legal professionals with AI tools that save time and enhance accuracy. Our mission is to make legal research faster, affordable, and accessible for everyone.",
      ref: aboutRef
    },
    {
      title: "Contact Us",
      content:
        "Reach us at support@lawlytics.com or call us at +91-9876543210.",
      ref: contactRef
    },
    {
      title: "Privacy Policy",
      content:
        "We value your privacy. All data is processed with industry-leading encryption, and we never share your information without consent.",
      ref: privacyRef
    },
    {
      title: "Terms of Service",
      content:
        "By using Lawlytics, you agree to comply with our terms, ensuring lawful use and respecting data privacy regulations.",
      ref: termsRef
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <h1
          className="text-3xl font-bold text-blue-700 flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ⚖️ Lawlytics
        </h1>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium"
        >
          Login / Sign Up
        </Link>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-blue-800 dark:text-blue-300">
          Empowering Legal Intelligence with AI
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Welcome to <strong>Lawlytics</strong> — your AI-powered platform to analyze legal documents, 
          manage case history, and securely handle your legal workflow.
        </p>
      </section>

      {/* Feature Cards */}
      <section ref={insightsRef} className="py-16 px-6 md:px-16 max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Lawlytics?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<FaRobot size={40} className="text-blue-600" />}
            title="AI Legal Insights"
            description="Analyze legal cases, statutes, and precedents quickly and accurately with AI."
          />
          <FeatureCard
            icon={<FaUserShield size={40} className="text-green-600" />}
            title="Secure Data"
            description="Your data is encrypted, secure, and compliant with legal regulations."
          />
          <FeatureCard
            icon={<FaChartLine size={40} className="text-purple-600" />}
            title="Dashboard Access"
            description="Manage cases, track progress, and get insights tailored to your needs."
          />
        </div>
      </section>

      {/* Info Tiles Section */}
      <section className="py-16 w-full px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {infoTiles.map((tile, index) => (
            <div
              key={index}
              ref={tile.ref}
              className="w-full h-64 perspective"
            >
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
                
                {/* Front */}
                <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-lg shadow-lg backface-hidden p-4">
                  <h3 className="text-xl font-bold">{tile.title}</h3>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 flex items-center justify-center rounded-lg shadow-lg rotate-y-180 backface-hidden">
                  <p className="text-sm leading-relaxed">{tile.content}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-6 text-center text-gray-700 dark:text-gray-300">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between px-6">
          <p>© {new Date().getFullYear()} Lawlytics · All rights reserved</p>
          <div className="space-x-6 mt-2 md:mt-0">
            <span onClick={() => scrollToSection(aboutRef)} className="hover:underline cursor-pointer">About</span>
            <span onClick={() => scrollToSection(contactRef)} className="hover:underline cursor-pointer">Contact</span>
            <span onClick={() => scrollToSection(privacyRef)} className="hover:underline cursor-pointer">Privacy Policy</span>
            <span onClick={() => scrollToSection(termsRef)} className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card
function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-xl hover:-translate-y-1 transition bg-white dark:bg-gray-800">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
