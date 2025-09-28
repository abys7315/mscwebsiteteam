import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-apple-gray-50 dark:bg-apple-gray-900 text-apple-gray-900 dark:text-white relative overflow-hidden border-t border-apple-gray-200 dark:border-apple-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Name */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-apple-blue to-purple-500 rounded-full blur-lg opacity-30"></div>
              <img
                src="/msc-logo.png"
                alt="MSC Logo"
                className="w-10 h-10 object-contain relative z-10"
              />
            </div>
            <span className="font-semibold text-lg">MSC VIT-AP</span>
          </div>

          {/* Contact Email */}
          <div className="flex items-center gap-2 text-apple-gray-600 dark:text-apple-gray-300">
            <Mail className="w-4 h-4" />
            <span className="font-medium">contact@msc-vitap.org</span>
          </div>

          {/* Copyright */}
          <div className="text-apple-gray-600 dark:text-apple-gray-300 text-sm">
            © {currentYear} Microsoft Student Chapter VIT-AP. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;