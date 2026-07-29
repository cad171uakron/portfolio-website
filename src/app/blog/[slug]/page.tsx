'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { ArrowLeft, Clock, ExternalLink } from 'lucide-react';
import { getBlogPost } from '@/data/blog';
import CodeBlock from '@/components/CodeBlock';

const categoryColors: Record<string, string> = {
  'Data Engineering': 'bg-purple-500/15 border-purple-500/30 text-purple-400',
  'Software Development': 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
  'IT & Automation': 'bg-green-500/15 border-green-500/30 text-green-400',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 text-sm hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColors[post.category] ?? 'bg-slate-500/15 border-slate-500/30 text-slate-400'}`}>
              {post.category}
            </span>
            <span className="text-slate-600 text-xs flex items-center gap-1">
              <Clock size={11} /> {post.readTime} min read
            </span>
            <span className="text-slate-600 text-xs">{formatDate(post.date)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
            {post.title}
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-slate-500">
                {tag}
              </span>
            ))}
          </div>

          {/* Link to project if applicable */}
          {post.projectSlug && (
            <div className="mt-5">
              <Link
                href={`/projects/${post.projectSlug}`}
                className="inline-flex items-center gap-2 text-sm text-cyan-400/80 hover:text-cyan-400 transition-colors"
              >
                <ExternalLink size={13} /> View the full project →
              </Link>
            </div>
          )}
        </motion.header>

        <div className="w-full h-px bg-white/5 mb-12" />

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-6"
        >
          {post.sections.map((section, i) => {
            switch (section.type) {
              case 'heading':
                return (
                  <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-2">
                    {section.content}
                  </h2>
                );
              case 'subheading':
                return (
                  <h3 key={i} className="text-lg font-semibold text-slate-200 mt-6 mb-1">
                    {section.content}
                  </h3>
                );
              case 'paragraph':
                return (
                  <p key={i} className="text-slate-400 leading-relaxed text-[15px]">
                    {section.content}
                  </p>
                );
              case 'bullets':
                return (
                  <ul key={i} className="space-y-2">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-400 text-[15px]">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              case 'code':
                return (
                  <div key={i} className="my-6">
                    <CodeBlock
                      code={section.content ?? ''}
                      language={section.language ?? 'text'}
                      filename={
                        section.language === 'python' ? 'example.py' :
                        section.language === 'javascript' ? 'example.js' :
                        section.language === 'powershell' ? 'example.ps1' :
                        'example.txt'
                      }
                    />
                  </div>
                );
              case 'callout':
                return (
                  <div key={i} className="my-6 bg-cyan-400/5 border border-cyan-400/20 rounded-xl px-6 py-5">
                    <p className="text-cyan-300 text-sm leading-relaxed">
                      <span className="font-bold text-cyan-400">💡 </span>
                      {section.content}
                    </p>
                  </div>
                );
              default:
                return null;
            }
          })}
        </motion.article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-slate-500 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> All posts
          </Link>
          {post.projectSlug && (
            <Link
              href={`/projects/${post.projectSlug}`}
              className="flex items-center gap-2 text-cyan-400/70 text-sm hover:text-cyan-400 transition-colors"
            >
              View project <ExternalLink size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
