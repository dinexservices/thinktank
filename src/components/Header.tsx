'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


const logo = "/logo.png"
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Register', href: '/register' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src={logo} alt="Logo" width={150} height={150} className="w-32 md:w-48 h-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            Join the Tank
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-black/90 backdrop-blur-xl border-l border-white/10 p-8 flex flex-col transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {navLinks.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hover:to-blue-400 transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div
              className={`mt-8 pt-8 border-t border-white/10 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              <Link
                href="/register"
                className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Rocket size={20} />
                Join the Tank
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
        </div>
      </div>
    </header>
  );
};

export default Header;
