import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaUserShield,
  FaChartLine,
  FaBalanceScale,
  FaArrowRight,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function HomePage() {
  const [flippedCard, setFlippedCard] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const featuresRef = useRef(null);
  const quickLinksRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", ref: featuresRef },
    { label: "Quick Links", ref: quickLinksRef },
    { label: "About", ref: aboutRef },
    { label: "Contact", ref: contactRef },
  ];

  const infoTiles = [
    {
      id: "about",
      title: "About Us",
      content:
        "Lawlytics empowers legal professionals with AI tools that save time and enhance accuracy. Our mission is to make legal research faster, affordable, and accessible for everyone.",
    },
    {
      id: "contact",
      title: "Contact Us",
      content: "Reach us at support@lawlytics.com or call us at +91-9876543210.",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content:
        "We value your privacy. All data is processed with industry-leading encryption, and we never share your information without consent.",
    },
    {
      id: "terms",
      title: "Terms of Service",
      content:
        "By using Lawlytics, you agree to comply with our terms, ensuring lawful use and respecting data privacy regulations.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-700 dark:text-blue-400 hover:opacity-90 transition"
          >
            <FaBalanceScale className="text-3xl" />
            <span>Lawlytics</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, ref }) => (
              <button
                key={label}
                onClick={() => scrollToSection(ref)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                {label}
              </button>
            ))}
            <Link
              to="/login"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Login
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-4 space-y-2">
            {navLinks.map(({ label, ref }) => (
              <button
                key={label}
                onClick={() => scrollToSection(ref)}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 dark:from-blue-600/20 dark:to-purple-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 to-transparent dark:from-blue-900/20 dark:to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 animate-pulse">
            <FaRobot className="text-blue-600" />
            AI-Powered Legal Analysis
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Smarter legal insights,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              in seconds
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Analyze cases, spot risks, and get clear recommendations with our AI.
            Built for lawyers and legal teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start free <FaArrowRight />
            </Link>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              See how it works <FaChevronDown />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        className="scroll-mt-20 px-4 sm:px-6 py-16 sm:py-20 bg-white dark:bg-gray-800/50"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Why Lawlytics?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            One platform for analysis, case management, and secure collaboration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaRobot size={44} className="text-blue-600" />}
              title="AI Legal Insights"
              description="Analyze cases, statutes, and precedents in minutes. Get summaries, risks, and recommendations."
              gradient="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={<FaUserShield size={44} className="text-emerald-600" />}
              title="Secure & Compliant"
              description="Your data is encrypted and handled with strict privacy. No sharing without your consent."
              gradient="from-emerald-500 to-emerald-600"
            />
            <FeatureCard
              icon={<FaChartLine size={44} className="text-purple-600" />}
              title="Dashboard & Cases"
              description="Manage all cases in one place. Track progress and get insights tailored to you."
              gradient="from-purple-500 to-purple-600"
            />
          </div>
        </div>
      </section>

      {/* Quick Links - Interactive flip cards */}
      <section
        ref={quickLinksRef}
        className="scroll-mt-20 px-4 sm:px-6 py-16 sm:py-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Quick Links
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Click any card to read more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoTiles.map((tile, index) => (
              <div
                key={tile.id}
                className="h-56 cursor-pointer select-none perspective-1000"
                onClick={() =>
                  setFlippedCard(flippedCard === index ? null : index)
                }
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 style-3d ${
                    flippedCard === index ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex flex-col items-center justify-center p-6 shadow-xl border border-blue-400/20 front-face">
                    <h3 className="text-xl font-bold text-center">{tile.title}</h3>
                    <p className="text-blue-100 text-sm mt-2 text-center">
                      Click to read
                    </p>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 flex flex-col justify-center shadow-xl border border-gray-200 dark:border-gray-700 back-face">
                    <p className="text-sm leading-relaxed line-clamp-6">
                      {tile.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - single section with ref for nav */}
      <section
        ref={aboutRef}
        className="scroll-mt-20 px-4 sm:px-6 py-16 bg-white dark:bg-gray-800/50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">About Lawlytics</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Lawlytics empowers legal professionals with AI tools that save time
            and enhance accuracy. Our mission is to make legal research faster,
            affordable, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Contact - CTA */}
      <section
        ref={contactRef}
        className="scroll-mt-20 px-4 sm:px-6 py-16 sm:py-20"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            support@lawlytics.com · +91-9876543210
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-8 text-gray-700 dark:text-gray-300">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Lawlytics · All rights reserved
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(quickLinksRef)}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Quick Links
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div
        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
