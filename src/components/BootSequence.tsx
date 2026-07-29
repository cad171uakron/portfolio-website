'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '$ Initializing carter-portfolio...', type: 'cmd', delay: 0 },
  { text: '▶ Loading profile data...', suffix: 'done', type: 'info', delay: 450 },
  { text: '▶ Indexing projects...', suffix: '6 found', type: 'info', delay: 900 },
  { text: '▶ Connecting to GitHub...', suffix: 'cad171uakron', type: 'info', delay: 1300 },
  { text: '▶ Building skills graph...', suffix: 'done', type: 'info', delay: 1650 },
  { text: '▶ Initializing analytics...', suffix: 'done', type: 'info', delay: 1950 },
  { text: '', type: 'blank', delay: 2150 },
  { text: '$ Portfolio ready. Welcome.', type: 'success', delay: 2350 },
];

const TOTAL_DURATION = 3000;

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [exiting, setExiting] = useState(false);
  const [skip, setSkip] = useState(false);

  const finish = useCallback(() => {
    setExiting(true);
    sessionStorage.setItem('boot-done', '1');
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    if (sessionStorage.getItem('boot-done')) {
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
        }, line.delay)
      );
    });

    timers.push(setTimeout(finish, TOTAL_DURATION));

    return () => timers.forEach(clearTimeout);
  }, [finish, onComplete]);

  useEffect(() => {
    if (skip) {
      setVisibleLines(BOOT_LINES.map((_, i) => i));
      setTimeout(finish, 400);
    }
  }, [skip, finish]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-[#070d1a] flex items-center justify-center px-4"
          onClick={() => setSkip(true)}
        >
          <div className="w-full max-w-xl">
            {/* Window chrome */}
            <div className="rounded-t-xl bg-[#1a1a2e] px-4 py-2.5 flex items-center gap-2 border border-white/10 border-b-0">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-slate-500 font-mono">~/carter-dockery — zsh</span>
              <span className="ml-auto text-[10px] text-slate-700">click to skip</span>
            </div>

            {/* Terminal body */}
            <div className="bg-[#080d1b] rounded-b-xl border border-white/10 border-t-0 p-6 min-h-[220px] font-mono text-sm">
              {BOOT_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.2 }}
                  className="leading-7"
                >
                  {line.type === 'blank' ? (
                    <span>&nbsp;</span>
                  ) : (
                    <>
                      <span
                        className={
                          line.type === 'cmd' ? 'text-slate-400' :
                          line.type === 'success' ? 'text-cyan-400 font-semibold' :
                          'text-slate-500'
                        }
                      >
                        {line.text}
                      </span>
                      {line.suffix && (
                        <span className="ml-2 text-green-400 text-xs">[{line.suffix}]</span>
                      )}
                    </>
                  )}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <span className="inline-block w-2 h-[14px] bg-cyan-400/80 align-middle ml-0.5 animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
