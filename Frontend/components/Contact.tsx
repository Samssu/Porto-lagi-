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
      setStatus('error: Semua field wajib diisi');
      return;
    }
    if (!EMAIL_RE.test(form.email)) {
      setStatus('error: Email tidak valid');
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
        setStatus(`error: ${data.error ?? 'Gagal mengirim pesan'}`);
      }
    } catch {
      setStatus('error: Backend tidak tersedia');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="md:pl-32 lg:pl-36">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
            Let&apos;s Connect
          </h2>
          <p className="mb-14 max-w-xl text-lg leading-8 text-neutral-600">
            Punya proyek atau sekadar menyapa? Kirim pesan lewat form di bawah.
          </p>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info kontak */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Email
              </p>
              <a
                href={`mailto:${'halo@example.com'}`}
                className="mb-8 mt-2 block text-xl font-medium text-neutral-900 transition-colors hover:text-neutral-500 sm:text-2xl"
              >
                halo@example.com
              </a>

              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Sosial
              </p>
              <div className="mt-2 flex flex-col gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit border-b-2 border-neutral-900 pb-1 text-lg font-medium text-neutral-900 transition-colors hover:text-neutral-500 hover:border-neutral-500"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit border-b-2 border-neutral-900 pb-1 text-lg font-medium text-neutral-900 transition-colors hover:text-neutral-500 hover:border-neutral-500"
                >
                  LinkedIn
                </a>
              </div>

              <p className="mt-10 max-w-sm text-base leading-8 text-neutral-500">
                Biasanya membalas dalam 1–2 hari kerja. Untuk urusan mendesak, email adalah cara
                tercepat.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-neutral-900">
                  Nama
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Nama lengkap"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-neutral-900">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-neutral-900">
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? 'Mengirim...' : 'Kirim Pesan'}
              </button>

              {status && (
                <div
                  className={`text-sm font-medium ${
                    status.startsWith('error')
                      ? 'text-red-600'
                      : status === 'success'
                        ? 'text-emerald-600'
                        : 'text-neutral-500'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status === 'sending'
                    ? 'Mengirim pesan...'
                    : status === 'success'
                      ? '✓ Pesan berhasil dikirim!'
                      : status.replace(/^error: /, '')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
