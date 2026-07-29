'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import ContactForm from '@/components/ContactForm';

const contactLinks = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'cad171@uakron.edu',
    href: 'mailto:cad171@uakron.edu',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <LinkedinIcon size={20} />,
    label: 'LinkedIn',
    value: 'carter-dockery-924741350',
    href: 'https://www.linkedin.com/in/carter-dockery-924741350/',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <GithubIcon size={20} />,
    label: 'GitHub',
    value: 'github.com/cad171uakron',
    href: 'https://github.com/cad171uakron',
    color: 'from-slate-500 to-slate-400',
  },
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
        <path d="M25 2C12.318 2 2 12.318 2 25s10.318 23 23 23 23-10.318 23-23S37.682 2 25 2zm0 4c10.476 0 19 8.524 19 19S35.476 44 25 44 6 35.476 6 25 14.524 6 25 6zm-3 6v2h-3v4h3v14h4V18h3l1-4h-4v-2h4v-4h-4c-2.2 0-4 1.8-4 4z"/>
      </svg>
    ),
    label: 'Handshake',
    value: 'joinhandshake.com/carterdockery',
    href: 'https://app.joinhandshake.com/profiles/carterdockery',
    color: 'from-pink-500 to-rose-400',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-4">
            <span className="text-slate-600">//</span> contact
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            I'm actively looking for opportunities in software development, data engineering, BI, and IT roles. Whether you have a position, a project, or a question — reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact links sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-4 bg-[#111827] rounded-2xl p-5 card-glow transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{link.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate max-w-[160px]">{link.value}</p>
                </div>
              </a>
            ))}

            <div className="bg-[#111827] rounded-2xl p-5 card-glow space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="text-slate-400">Copley, OH (Akron area)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="text-slate-400">EST · Typically responds within 24 hrs</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0d1f3c] to-[#111827] rounded-2xl p-5 border border-cyan-400/15">
              <p className="text-slate-400 text-sm leading-relaxed">
                Open to <span className="text-white">full-time</span> and <span className="text-white">contract</span> opportunities in:
              </p>
              <ul className="mt-3 space-y-1.5">
                {[
                  'Software Development',
                  'Data Engineering',
                  'Business Intelligence',
                  'IT / Systems Administration',
                ].map((role) => (
                  <li key={role} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3 bg-[#111827] rounded-2xl p-8 card-glow"
          >
            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
