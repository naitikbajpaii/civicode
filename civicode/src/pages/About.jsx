import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden text-white">
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-24 py-24">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-10"
        >
          <h2 className="text-4xl font-bold text-cyan-100 mb-6 text-center">About CiviCode</h2>
          <p className="text-gray-200 text-md leading-relaxed">
            <strong>CiviCode</strong> is a smart IS Code Explorer built for civil engineers, students, and professionals seeking quick and intuitive access to the wide landscape of Indian Standard codes.
          </p>

          <div className="mt-6 space-y-4">
            <p className="text-gray-300">
             <strong>Explore:</strong> Instantly search through Indian Standards with our AI-augmented smart search engine.
            </p>
            <p className="text-gray-300">
             <strong>Understand:</strong> AI summaries help you comprehend lengthy codes in simple language.
            </p>
            <p className="text-gray-300">
             <strong>Bookmark:</strong> Save frequently used codes for quicker reference.
            </p>
            <p className="text-gray-300">
             <strong>Filter:</strong> Quickly find codes by categories or tags tailored for structural, water, transportation, and environmental domains.
            </p>
          </div>

          <p className="mt-6 text-gray-400 text-sm">
            CiviCode is built with ❤️ by Naitik using ReactJS, TailwindCSS, and powered by Gemini AI.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-10"
        >
          <h3 className="text-2xl font-semibold text-cyan-100 mb-4 text-center">Why use CiviCode?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Designed specifically for civil engineers and learners.</li>
            <li>Includes AI-powered smart assistance for deep code understanding.</li>
            <li>Free, responsive, and minimal interface for quick exploration.</li>
            <li>Continuously updated to include new IS codes and summaries.</li>
          </ul>
        </motion.section>

        <footer className="mt-24 text-center text-gray-500 text-sm">
          © 2025 CiviCode | Built with ReactJS by Naitik
        </footer>
      </div>
    </div>
  );
}

export default About;
