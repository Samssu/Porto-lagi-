'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken, getStoredUser, logout } from '@/lib/api';
import type { AuthUser, Message } from '@/types';

const dateFmt = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function DashboardPage() {
  const router = useRouter();
  const [user] = useState<AuthUser | null>(() => getStoredUser());
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = useCallback(async (signal?: AbortSignal) => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'}/api/messages`,
        { headers: { Authorization: `Bearer ${token}` }, signal }
      );
      if (res.status === 401) {
        // Token kedaluwarsa/invalid — paksa logout.
        logout();
        router.replace('/login');
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setError('Gagal memuat pesan. Pastikan backend berjalan.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getToken() || !getStoredUser()) {
      router.replace('/login');
      return;
    }
    const ac = new AbortController();
    fetchMessages(ac.signal).catch(() => {});
    return () => ac.abort();
  }, [router, fetchMessages]);

  if (!user) return null;

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Hai, {user.name} — {user.email}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => fetchMessages()}
              className="px-4 py-2 glass glass-hover rounded-lg text-slate-300 transition"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace('/');
              }}
              className="px-4 py-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition"
            >
              Keluar
            </button>
          </div>
        </header>

        <section aria-label="Pesan masuk">
          <h2 className="text-lg font-semibold text-white mb-4">
            Pesan Masuk{' '}
            <span className="text-slate-500 font-normal">({messages.length})</span>
          </h2>

          {loading ? (
            <div className="space-y-3" aria-hidden="true">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl p-5 animate-pulse">
                  <div className="h-4 w-40 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 w-full bg-white/5 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-slate-400 mb-4">{error}</p>
              <button
                type="button"
                onClick={() => fetchMessages()}
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                Coba Lagi
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-slate-400">
                Belum ada pesan masuk. Pesan dari form kontak akan tampil di sini.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {messages.map((msg) => (
                <li key={msg._id} className="glass glass-hover rounded-2xl p-5 transition">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <span className="font-medium text-white">{msg.name}</span>
                    <time className="text-xs text-slate-500" dateTime={msg.createdAt}>
                      {dateFmt.format(new Date(msg.createdAt))}
                    </time>
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-indigo-300 hover:underline"
                  >
                    {msg.email}
                  </a>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">{msg.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="text-center text-sm text-slate-500 mt-10">
          <Link href="/" className="hover:text-indigo-300 transition">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </main>
  );
}
