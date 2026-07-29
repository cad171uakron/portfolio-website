'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

type LineType = 'input' | 'output' | 'success' | 'error' | 'dim';
type Line = { text: string; type: LineType };

const PROJECTS = [
  'azure-retail-pipeline  → Data Engineering',
  'casino-platform        → Software Development',
  'hc-it-toolkit          → IT Automation',
  'construction-analytics → Analytics',
  'robotics-ecommerce     → Software Development',
  'stratforge-ai          → AI / Software',
];

const HELP_LINES: Line[] = [
  { text: '┌─ Commands ──────────────────────────────────────────', type: 'dim' },
  { text: '│  about            Navigate to About page', type: 'output' },
  { text: '│  projects         Navigate to Projects page', type: 'output' },
  { text: '│  skills           Navigate to Skills page', type: 'output' },
  { text: '│  experience       Navigate to Experience page', type: 'output' },
  { text: '│  analytics        Navigate to Analytics dashboard', type: 'output' },
  { text: '│  resume           Navigate to Resume page', type: 'output' },
  { text: '│  contact          Navigate to Contact page', type: 'output' },
  { text: '│  github           Open GitHub profile', type: 'output' },
  { text: '│  linkedin         Open LinkedIn profile', type: 'output' },
  { text: '│  whoami           Display identity', type: 'output' },
  { text: '│  ls projects      List all projects', type: 'output' },
  { text: '│  theme            Toggle dark / light mode', type: 'output' },
  { text: '│  download resume  Download resume PDF', type: 'output' },
  { text: '│  clear            Clear terminal', type: 'output' },
  { text: '│  sudo hire carter Try it ;)', type: 'output' },
  { text: '└─────────────────────────────────────────────────────', type: 'dim' },
];

const INITIAL_LINES: Line[] = [
  { text: 'Carter Dockery Portfolio  ─  Terminal v2.0', type: 'success' },
  { text: 'Type "help" for available commands. Press Ctrl+` to toggle.', type: 'dim' },
];

export default function FloatingTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const push = useCallback((...newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const processCommand = useCallback((raw: string) => {
    const cmd = raw.trim();
    push({ text: `$ ${cmd}`, type: 'input' });
    if (!cmd) return;

    setHistory((h) => [cmd, ...h.slice(0, 49)]);
    setHistoryIdx(-1);

    const go = (path: string, label: string) => {
      push({ text: `→ Navigating to ${label}...`, type: 'success' });
      setTimeout(() => { router.push(path); setOpen(false); }, 350);
    };

    switch (cmd.toLowerCase()) {
      case 'help': push(...HELP_LINES); break;
      case 'about': go('/about', 'About'); break;
      case 'projects': go('/projects', 'Projects'); break;
      case 'skills': go('/skills', 'Skills'); break;
      case 'experience': go('/experience', 'Experience'); break;
      case 'resume': go('/resume', 'Resume'); break;
      case 'analytics': go('/analytics', 'Analytics'); break;
      case 'contact': go('/contact', 'Contact'); break;
      case 'download resume':
        push({ text: '→ Downloading resume PDF...', type: 'success' });
        {
          const a = document.createElement('a');
          a.href = '/resume.pdf';
          a.download = 'Dockery-Carter-Resume.pdf';
          a.click();
        }
        break;
      case 'theme': {
        const isLight = document.documentElement.classList.contains('light');
        if (isLight) {
          document.documentElement.classList.remove('light');
          localStorage.setItem('theme', 'dark');
          push({ text: '→ Switched to dark mode.', type: 'success' });
        } else {
          document.documentElement.classList.add('light');
          localStorage.setItem('theme', 'light');
          push({ text: '→ Switched to light mode.', type: 'success' });
        }
        break;
      }
      case 'github':
        push({ text: '→ Opening GitHub...', type: 'success' });
        window.open('https://github.com/cad171uakron', '_blank');
        break;
      case 'linkedin':
        push({ text: '→ Opening LinkedIn...', type: 'success' });
        window.open('https://www.linkedin.com/in/carter-dockery-924741350/', '_blank');
        break;
      case 'whoami':
        push(
          { text: 'Carter Dockery', type: 'success' },
          { text: 'Software Developer  |  Data & BI Developer  |  IT Professional', type: 'output' },
          { text: 'Akron, OH  —  cad171@uakron.edu', type: 'dim' }
        );
        break;
      case 'ls projects':
        push(
          { text: 'projects/', type: 'dim' },
          ...PROJECTS.map((p) => ({ text: `  ├── ${p}`, type: 'output' as LineType }))
        );
        break;
      case 'clear':
        setLines([{ text: 'Terminal cleared.', type: 'dim' }]);
        return;
      case 'sudo hire carter':
        push(
          { text: '[sudo] password for recruiter: ········', type: 'dim' },
          { text: '...verifying credentials...', type: 'dim' },
          { text: '✓  Authorization granted.', type: 'success' },
          { text: '✓  Permission level: HIRED', type: 'success' },
          { text: '✓  Redirecting to /contact...', type: 'success' }
        );
        setTimeout(() => { router.push('/contact'); setOpen(false); }, 2200);
        break;
      default:
        push({ text: `zsh: command not found: ${cmd}. Type "help" for options.`, type: 'error' });
    }
  }, [push, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = historyIdx + 1;
      if (next < history.length) { setHistoryIdx(next); setInput(history[next]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) { setHistoryIdx(-1); setInput(''); }
      else { setHistoryIdx(next); setInput(history[next]); }
    }
  };

  return (
    <>
      {/* FAB button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#0d1628] border border-cyan-400/25 flex items-center justify-center text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all shadow-lg shadow-black/40 backdrop-blur-sm"
        title="Terminal (Ctrl+`)"
      >
        <TerminalIcon size={17} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-40 w-[540px] max-w-[calc(100vw-1.5rem)] rounded-xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden font-mono"
          >
            {/* Chrome */}
            <div className="bg-[#1a1a2e] px-4 py-2.5 flex items-center gap-2 border-b border-white/8">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-slate-500 flex-1">~/carter-dockery — portfolio-terminal</span>
              <span className="text-[10px] text-slate-600 mr-2 hidden sm:block">Ctrl+`</span>
              <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-slate-400 transition-colors">
                <X size={13} />
              </button>
            </div>

            {/* Output */}
            <div className="bg-[#080d1b] h-60 overflow-y-auto p-4 text-xs leading-relaxed space-y-0.5">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === 'input' ? 'text-cyan-400' :
                    line.type === 'success' ? 'text-green-400' :
                    line.type === 'error' ? 'text-red-400' :
                    line.type === 'dim' ? 'text-slate-600' :
                    'text-slate-300'
                  }
                >
                  {line.text || <span>&nbsp;</span>}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div className="bg-[#0a101f] border-t border-white/5 px-4 py-2.5 flex items-center gap-2.5">
              <span className="text-cyan-400 text-xs select-none">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-slate-200 text-xs outline-none placeholder:text-slate-700 caret-cyan-400"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
