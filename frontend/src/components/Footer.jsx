import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-sm py-4 mt-auto shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        
        {/* Left: Copyright */}
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Arnab Chakraborty. All rights reserved.
        </p>

        {/* Right: Social Links with Icons */}
        <div className="flex gap-5 text-lg">
          <a
            href="https://github.com/your-github" // 🔁 Replace this
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition flex items-center gap-1"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="mailto:your-email@gmail.com" // 🔁 Replace this
            className="hover:text-indigo-600 transition flex items-center gap-1"
          >
            <HiOutlineMail /> Gmail
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin" // 🔁 Replace this
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition flex items-center gap-1"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
