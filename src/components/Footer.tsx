import React from 'react';
import { Github, Heart, Twitter, Coffee, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-6 mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">YouTube Downloader</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A simple tool to download YouTube videos in various formats and quality options.
              For educational purposes only.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  How to use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Legal Notice</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This service is intended for personal use only. Downloading copyrighted material without permission may be against the law in your country.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} YouTube Downloader. All rights reserved.
          </p>
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by You
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;