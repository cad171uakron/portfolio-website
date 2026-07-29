'use client';

import { motion } from 'framer-motion';

export interface FlowNode {
  icon: string;
  label: string;
  sublabel?: string;
  color: string;
}

interface ArchitectureFlowProps {
  nodes: FlowNode[];
  title?: string;
}

export default function ArchitectureFlow({ nodes, title }: ArchitectureFlowProps) {
  return (
    <div className="my-6">
      {title && <p className="text-slate-500 text-xs font-mono mb-4 uppercase tracking-widest">{title}</p>}
      <div className="flex flex-wrap items-center gap-0">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center">
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-2 border"
                style={{
                  background: `${node.color}18`,
                  borderColor: `${node.color}35`,
                  boxShadow: `0 0 20px ${node.color}15`,
                }}
              >
                {node.icon}
              </div>
              <div className="text-center max-w-[80px]">
                <div className="text-slate-300 text-[11px] font-semibold leading-tight">{node.label}</div>
                {node.sublabel && (
                  <div className="text-slate-600 text-[10px] mt-0.5">{node.sublabel}</div>
                )}
              </div>
            </motion.div>

            {/* Arrow between nodes */}
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.3 }}
                className="flex items-center mx-1 mb-8"
                style={{ transformOrigin: 'left center' }}
              >
                <div className="h-px w-6 bg-gradient-to-r from-white/20 to-white/10" />
                <svg width="8" height="8" viewBox="0 0 8 8" className="text-slate-600 -ml-0.5">
                  <path d="M0 4 L6 1 L6 7 Z" fill="currentColor" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
