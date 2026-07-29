'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { blogPosts } from '@/data/blog';

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

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-4">
            <span className="text-slate-600">//</span> blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Writing</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Deep dives into the engineering decisions, architecture patterns, and lessons learned from real projects.
          </p>
        </motion.div>

        {/* Posts */}
        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="bg-[#111827] rounded-2xl p-7 card-glow hover:border-cyan-400/20 transition-all">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColors[post.category] ?? 'bg-slate-500/15 border-slate-500/30 text-slate-400'}`}>
                      {post.category}
                    </span>
                    <span className="text-slate-600 text-xs flex items-center gap-1">
                      <Clock size={11} /> {post.readTime} min read
                    </span>
                    <span className="text-slate-600 text-xs">{formatDate(post.date)}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {post.excerpt}
                  </p>

                  {/* Tags + Read more */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/4 border border-white/8 text-slate-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-cyan-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all font-medium whitespace-nowrap">
                      Read post <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 text-sm mt-12"
        >
          More posts coming as projects evolve.
        </motion.p>
      </div>
    </div>
  );
}
