'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, register, getStoredUser, getToken } from '@/lib/api';
type Mode = 'login' | 'register';

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sudah login? Langsung ke dashboard.
  useEffect(() => {
    if (getToken() && getStoredUser()) router.replace('/dashboard');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim() || (mode === 'register' && !name.trim())) {
      setError('Semua field wajib diisi');
      return;
    }
    if (mode === 'register' && password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    setLoading(true);
    try {
      const data =
        mode === 'login'
          ? await login(email, password)
          : await register(name, email, password);
      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.error ?? 'Terjadi kesalahan');
      }
    } catch {
      setError('Gagal terhubung ke server. Pastikan backend berjalan di port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-gradient">Porto</span>
            <span className="text-white">folio</span>
          </Link>
        </div>

        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {mode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
          </h1>
          <p className="text-slate-400 text-sm text-center mb-8">
            {mode === 'login'
              ? 'Masuk untuk melihat dashboard pesan.'
              : 'Daftar untuk mulai menggunakan dashboard.'}
          </p>

          {/* Toggle mode */}
          <div className="flex glass rounded-xl p-1 mb-6" role="tablist" aria-label="Mode autentikasi">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m);
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  mode === m
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'login' ? 'Masuk' : 'Daftar'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === 'register' && (
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                autoComplete="name"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder={mode === 'register' ? 'Password (min. 8 karakter)' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
            {error && (
              <p className="text-sm text-rose-400 text-center" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/" className="hover:text-indigo-300 transition">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </main>
  );
}
