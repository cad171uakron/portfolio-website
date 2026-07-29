'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
  language: string;
  filename?: string;
  code: string;
}

export default function CodeBlock({ language, filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 my-4 text-xs">
      {/* Window chrome */}
      <div className="bg-[#1a1a2e] px-4 py-2.5 flex items-center gap-2 border-b border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        {filename && <span className="ml-2 text-slate-400 font-mono text-[11px]">{filename}</span>}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-slate-600 font-mono text-[10px]">{language}</span>
          <button
            onClick={copy}
            className="text-slate-600 hover:text-slate-300 transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          </button>
        </div>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          background: '#080d1b',
          fontSize: '0.72rem',
          lineHeight: '1.6',
        }}
        showLineNumbers
        lineNumberStyle={{ color: '#374151', paddingRight: '1rem', userSelect: 'none' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
