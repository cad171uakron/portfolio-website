import Link from 'next/link';
import { Mail, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/resume', label: 'Résumé' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070d1a] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Code2 size={14} className="text-white" />
              </div>
              <span className="font-bold text-white">
                Carter<span className="text-cyan-400">.</span>dev
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Software Developer · Data & BI Developer · IT Professional based in Copley, OH.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/cad171uakron"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/carter-dockery-924741350/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="mailto:cad171@uakron.edu"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://app.joinhandshake.com/profiles/carterdockery"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                aria-label="Handshake"
              >
                <svg width={18} height={18} viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
                  <path d="M25 2C12.318 2 2 12.318 2 25s10.318 23 23 23 23-10.318 23-23S37.682 2 25 2zm0 4c10.476 0 19 8.524 19 19S35.476 44 25 44 6 35.476 6 25 14.524 6 25 6zm-3 6v2h-3v4h3v14h4V18h3l1-4h-4v-2h4v-4h-4c-2.2 0-4 1.8-4 4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-500 hover:text-slate-200 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600 text-xs">
          <span>© {new Date().getFullYear()} Carter Dockery. All rights reserved.</span>
          <span>Built with Next.js · TypeScript · Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
