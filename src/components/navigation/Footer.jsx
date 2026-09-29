import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-white/[0.03] border-t border-gray-200 dark:border-white/10 mt-20 relative z-[100]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/favicon.ico" alt="Logo" className="w-8" />
              <span className="text-lg font-bold text-black dark:text-white">TechXplora</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Making learning fun through interactive quizzes and engaging courses! 🎓
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-black dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bootcamp" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Data & AI Bootcamp 🚀
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/nigeria-curriculum" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Nigeria Curriculum 🇳🇬
                </Link>
              </li>
              <li>
                <Link to="/price" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Pricing 💰
                </Link>
              </li>
              <li>
                <Link to="/how-to-use" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  How To Use
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-black dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Privacy Policy 🔒
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Terms of Service ⚖️
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                  Get Help 💬
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-black dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@techxplora.co" className="hover:text-[#a6b1ff] transition-colors">
                  support@techxplora.co
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              © {currentYear} TechXplora. All rights reserved. 💡
            </p>
            <div className="flex gap-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                Twitter
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#a6b1ff] transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
