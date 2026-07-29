'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export default function KonamiHandler() {
  const [active, setActive] = useState(false);

  const trigger = useCallback(() => {
    setActive(true);
    document.documentElement.style.setProperty('--konami-active', '1');
    setTimeout(() => {
      setActive(false);
      document.documentElement.style.removeProperty('--konami-active');
    }, 3000);
  }, []);

  useEffect(() => {
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      // Normalize: lowercase for letters, exact for arrow keys
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[idx].length === 1 ? KONAMI[idx].toLowerCase() : KONAMI[idx];

      if (key === expected) {
        idx++;
        if (idx === KONAMI.length) { trigger(); idx = 0; }
      } else {
        // Restart from 1 if this key matches the first in the sequence
        const first = KONAMI[0];
        idx = key === first ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [trigger]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] pointer-events-none"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />

          {/* Center toast */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-[#080d1b] border border-green-400/40 rounded-2xl px-10 py-8 text-center shadow-2xl shadow-green-500/10 font-mono"
            >
              <div className="text-green-400 text-4xl mb-3">⬆⬆⬇⬇⬅➡⬅➡ B A</div>
              <div className="text-green-400 text-xl font-bold mb-1">KONAMI CODE ACTIVATED</div>
              <div className="text-slate-500 text-sm">+30 lives granted ✓</div>
              <div className="text-slate-600 text-xs mt-3">hint: try <span className="text-green-400">sudo hire carter</span> in the terminal</div>
            </motion.div>
          </div>

          {/* Corner glitch lines */}
          <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-green-400/60 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-0.5 bg-gradient-to-l from-green-400/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-gradient-to-r from-green-400/60 to-transparent" />
          <div className="absolute bottom-0 right-0 w-32 h-0.5 bg-gradient-to-l from-green-400/60 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
