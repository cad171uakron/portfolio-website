'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/resume', label: 'Résumé' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070d1a]/95 backdrop-blur-md border-b border-[rgba(56,189,248,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">
              Carter<span className="text-cyan-400">.</span>dev
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    active ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-cyan-400/10 border border-cyan-400/20"
                      transition={{ type: 'spring', duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://github.com/cad171uakron"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            >
              <GithubIcon size={14} /> GitHub
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#070d1a]/98 backdrop-blur-xl pt-20 px-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 text-lg font-medium rounded-xl transition-colors ${
                        active
                          ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href="https://github.com/cad171uakron"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
