'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, role } = useAuth();

  const isDashboard = pathname.startsWith('/admin/');
  const isSubpage = pathname !== '/';
  const isDark = isDashboard || isSubpage || isScrolled;

  // Normalize role to ensure admin detection works regardless of casing or separators
  const normalizedRole = (role || '').toLowerCase().replace(/[-_\s]/g, '');
  const isAdmin = normalizedRole === 'admin' || normalizedRole === 'superadmin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.services-dropdown')) {
        setServicesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    {
      href: '/',
      label: 'Home',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      href: '/tours',
      label: 'Itineraries',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      href: '/about',
      label: 'About',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      href: '/contact',
      label: 'Contact',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  const servicesLinks = [
    { href: '/services/hotels', label: 'Hotels', icon: '🏨' },
    { href: '/services/things-to-do', label: 'Things to Do', icon: '🎯' },
    { href: '/services/restaurants', label: 'Restaurants', icon: '🍽️' },
    // { href: '/services/rental-cars', label: 'Rental Cars', icon: '🚗' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isDark
          ? 'bg-black/95 backdrop-blur-lg shadow-xl border-b border-white/20 py-3'
          : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`w-60 h-23 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 ${isScrolled ? '' : 'shadow-white/20'
                }`}>
                <img
                  src="/images/main_logo.png"
                  alt="Triple SR Travelers Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`font-['Poppins'] text-2xl font-bold transition-all duration-300 ${isDark ? 'text-white' : 'text-white drop-shadow-lg'
                }`}>

              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${isDark
                      ? 'text-white hover:text-[#EAD8C4] hover:bg-white/10'
                      : 'text-white hover:text-[#EAD8C4] hover:bg-white/10'
                    } ${pathname === link.href ? (isDark ? 'bg-white/10 text-white' : 'bg-white/20 text-white') : ''}`}
                >
                  {link.icon}
                  {link.label}
                  {pathname === link.href && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${'bg-white'
                      }`} />
                  )}
                </Link>
              ))}

              {/* Services dropdown */}
              <div className="relative services-dropdown">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${servicesDropdownOpen ? 'bg-white/10' : ''} ${isDark
                      ? 'text-white hover:text-[#EAD8C4] hover:bg-white/10'
                      : 'text-white hover:text-[#EAD8C4] hover:bg-white/10'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Services
                  <svg className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesDropdownOpen && (
                  <div className={`absolute left-0 mt-3 w-64 rounded-2xl ${isDark ? 'bg-black/95 border-white/20' : 'bg-white border-gray-200'} shadow-2xl border p-2 z-50`}>
                    {servicesLinks.map((service, index) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r ${isDark ? 'hover:from-white/10 hover:to-white/5 text-white hover:text-[#EAD8C4]' : 'hover:from-[#0B6E65]/10 hover:to-[#095850]/10 text-gray-700 hover:text-[#0B6E65]'} transition-all duration-200`}
                      >
                        <span className="text-lg">{service.icon}</span>
                        <span className="font-medium">{service.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {user ? (
                <div className="relative group ml-4">
                  <button className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${isDark
                      ? 'text-white hover:bg-white/10'
                      : 'text-white hover:bg-white/10'
                    }`}>
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0B6E65] to-[#095850] flex items-center justify-center text-white font-semibold shadow-lg">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="hidden xl:inline font-medium">{user.name}</span>
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`absolute right-0 mt-3 w-64 rounded-2xl ${isDark ? 'bg-black/95 border-white/20' : 'bg-white border-gray-200'} shadow-2xl border p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                    <div className="px-4 py-3 border-b border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0B6E65] to-[#095850] flex items-center justify-center text-white font-semibold">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} capitalize`}>{role}</div>
                        </div>
                      </div>
                    </div>
                    {isAdmin && (
                      <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors ${isDark ? 'text-white hover:text-[#EAD8C4]' : 'text-gray-700 hover:text-[#0B6E65]'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        router.push('/');
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 transition-colors ${isDark ? 'text-white hover:text-red-600' : 'text-gray-700 hover:text-red-600'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className={`ml-4 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isSubpage
                      ? 'bg-white text-black hover:bg-gray-100'
                      : isScrolled
                        ? 'bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white hover:from-[#095850] hover:to-[#07433D]'
                        : 'bg-white text-[#0B6E65] hover:bg-[#EAD8C4] shadow-white/20'
                    }`}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-6 relative ${isDark ? 'text-white' : 'text-white'}`}>
                <span className={`absolute block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3 bg-red-500' : 'top-1 bg-current'
                  }`}></span>
                <span className={`absolute block w-6 h-0.5 top-3 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'bg-current'
                  }`}></span>
                <span className={`absolute block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3 bg-red-500' : 'top-5 bg-current'
                  }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}>
            <div className={`bg-${isDark ? 'black' : 'white'}/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-${isDark ? 'white' : 'gray-200'}/50 p-6`}>
              {/* Navigation Links */}
              <div className="space-y-1 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${pathname === link.href
                        ? 'bg-[#0B6E65]/10 text-[#0B6E65] font-semibold'
                        : isDark
                          ? 'text-white hover:bg-white/10 hover:text-[#EAD8C4]'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-[#0B6E65]'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Services Section */}
              <div className={`border-t ${isDark ? 'border-white/20' : 'border-gray-200'} pt-6 mb-6`}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[#0B6E65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Services</span>
                </div>
                <div className="space-y-1">
                  {servicesLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isDark ? 'text-white hover:bg-white/10 hover:text-[#EAD8C4]' : 'text-gray-700 hover:bg-gray-100 hover:text-[#0B6E65]'} transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-lg">{service.icon}</span>
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User Section */}
              {user ? (
                <div className={`border-t ${isDark ? 'border-white/20' : 'border-gray-200'} pt-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0B6E65] to-[#095850] flex items-center justify-center text-white font-semibold shadow-lg">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                      <div className={`text-sm capitalize ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>{role}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl ${isDark ? 'text-white hover:bg-white/10 hover:text-[#EAD8C4]' : 'text-gray-700 hover:bg-gray-100 hover:text-[#0B6E65]'} transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                        router.push('/');
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl ${isDark ? 'text-white hover:bg-red-50 hover:text-red-600' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'} transition-colors`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white py-3 rounded-xl font-semibold hover:from-[#095850] hover:to-[#07433D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
