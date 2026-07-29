'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 503) {
          // Email service not configured — fall back to mailto
          const sub = encodeURIComponent(form.subject || `Portfolio contact from ${form.name}`);
          const bod = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
          window.open(`mailto:cad171@uakron.edu?subject=${sub}&body=${bod}`);
          setStatus('success');
          return;
        }
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setApiError(msg);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
        <p className="text-slate-400 mb-6">Thanks! I&apos;ll get back to you within a day or two.</p>
        <button
          onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
          className="text-cyan-400 text-sm hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Name <span className="text-cyan-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none focus:ring-2 transition-all ${
              errors.name
                ? 'border-red-500/50 focus:ring-red-500/30'
                : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Email <span className="text-cyan-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none focus:ring-2 transition-all ${
              errors.email
                ? 'border-red-500/50 focus:ring-red-500/30'
                : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Message <span className="text-cyan-400">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project, opportunity, or question..."
          rows={5}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none focus:ring-2 transition-all resize-none ${
            errors.message
              ? 'border-red-500/50 focus:ring-red-500/30'
              : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>

      {status === 'error' && apiError && (
        <p className="text-red-400 text-sm text-center flex items-center justify-center gap-1">
          <AlertCircle size={14} /> {apiError}
        </p>
      )}

      <p className="text-slate-600 text-xs text-center">
        Or reach me directly at{' '}
        <a href="mailto:cad171@uakron.edu" className="text-cyan-400 hover:underline">
          cad171@uakron.edu
        </a>
      </p>
    </form>
  );
}
