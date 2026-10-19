'use client';

import { useState } from 'react';
import { sendContact } from '@/lib/api';
import type { ContactForm } from '@/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error: All fields required');
      return;
    }
    if (!EMAIL_RE.test(form.email)) {
      setStatus('error: Invalid email');
      return;
    }

    setSending(true);
    setStatus('sending');

    try {
      const data = await sendContact(form);
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus(`error: ${data.error ?? 'Failed to send'}`);
      }
    } catch {
      setStatus('error: Backend unavailable');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase">
          Contact
        </h2>

        <form onSubmit={handleSubmit} className="card space-y-6" noValidate>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>

          <button
            type="submit"
            disabled={sending}
            className={`btn accent w-full ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {sending ? 'SENDING...' : 'SEND MESSAGE'}
          </button>

          {status && (
            <div
              className={`font-mono text-sm font-bold uppercase ${
                status.startsWith('error')
                  ? 'text-red-500'
                  : status === 'success'
                    ? 'text-lime-400'
                    : 'text-white/60'
              }`}
              role="status"
              aria-live="polite"
            >
              {status === 'sending'
                ? '⏳ Sending...'
                : status === 'success'
                  ? '✓ Message sent!'
                  : status.replace(/^error: /, '')}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
