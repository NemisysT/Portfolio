import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiCodechef } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Let&apos;s Connect!</h2>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://linkedin.com/in/mervin-mandanna/" className="text-2xl hover:text-blue-400 transition duration-300" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/NemisysT" className="text-2xl hover:text-blue-400 transition duration-300" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://codechef.com/users/lemonsys" className="text-2xl hover:text-blue-400 transition duration-300" target="_blank" rel="noopener noreferrer">
            <SiCodechef />
          </a>
          <a href="https://www.instagram.com/n3misys/" className="text-2xl hover:text-blue-400 transition duration-300" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2025 Mervin Mandanna. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
