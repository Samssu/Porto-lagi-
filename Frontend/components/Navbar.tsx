'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { logout, getStoredUser } from '@/lib/api';
import type { AuthUser } from '@/types';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function useAuthUser(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const sync = () => setUser(getStoredUser());
    sync();
    window.addEventListener('auth-changed', sync);
    return () => window.removeEventListener('auth-changed', sync);
  }, []);

  return user;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const user = useAuthUser();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const { href } of links) {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b-4 border-white" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-black uppercase">
          {/* LOGO */}
          DEV
        </a>

        <ul className="hidden md:flex gap-12 text-sm font-bold uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href.slice(1) ? 'page' : undefined}
                className={`border-b-2 pb-1 transition-colors ${
                  active === link.href.slice(1)
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm font-mono text-white/60">{user.name}</span>
              <Link href="/dashboard" className="btn text-sm">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm font-bold text-white/60 hover:text-white underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn text-sm">
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          className="md:hidden p-2 font-bold uppercase text-lg"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <ul className="md:hidden bg-black border-t-4 border-white px-6 py-4 space-y-3 text-sm font-bold uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  active === link.href.slice(1)
                    ? 'block py-2 text-white border-b-2 border-red-500'
                    : 'block py-2 text-white/60'
                }
              >
                {link.label}
              </a>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block py-2 text-white underline"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-2 text-white"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
