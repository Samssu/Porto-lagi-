'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { logout, getStoredUser } from '@/lib/api';
import type { AuthUser } from '@/types';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/* Icon SVG inline (disetujui owner: rumah, chip, tas, amplop + user untuk About): flat stroke, warna ikut currentColor */
function NavIcon({ name }: { name: string }) {
  const common = {
    className: 'h-6 w-6',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };
  switch (name) {
    case 'Home':
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
      );
    case 'About':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
        </svg>
      );
    case 'Skills':
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
        </svg>
      );
    case 'Projects':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
        </svg>
      );
    case 'Contact':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case 'Login':
      return (
        <svg {...common}>
          <path d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" />
          <path d="M3 12h11m0 0-3-3m3 3-3 3" />
        </svg>
      );
    case 'Admin':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 4v5" />
        </svg>
      );
    case 'Logout':
      return (
        <svg {...common}>
          <path d="M14 7V5a2 2 0 0 0-2-2H5v18h7a2 2 0 0 0 2-2v-2" />
          <path d="M21 12H10m0 0 3-3m-3 3 3 3" />
        </svg>
      );
    default:
      return null;
  }
}

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
  const [menuOpen, setMenuOpen] = useState(false);
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
    <>
      {/* Sidebar vertikal — desktop */}
      <nav
        className="fixed left-6 top-6 bottom-6 z-50 hidden md:flex w-20 flex-col items-center gap-5 rounded-3xl border border-neutral-200 bg-white py-6"
        aria-label="Main navigation"
      >
        {/* Brand circle — klik toggle menu admin/logout; tanpa teks Welcome */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white transition-colors hover:bg-neutral-700"
            aria-label={menuOpen ? 'Tutup menu akun' : 'Buka menu akun'}
            aria-expanded={menuOpen}
          >
            {user ? user.name.charAt(0).toUpperCase() : 'P'}
          </button>

          {/* Popup kecil: icon-only. Tidak login → Login saja; login → Admin + Logout */}
          {menuOpen && (
            <div className="absolute left-12 top-0 flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2">
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Login"
                  title="Login"
                >
                  <NavIcon name="Login" />
                </Link>
              )}
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                    aria-label="Dashboard admin"
                    title="Admin"
                  >
                    <NavIcon name="Admin" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <NavIcon name="Logout" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <ul className="flex flex-col items-center gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-label={link.label}
                title={link.label}
                aria-current={active === link.href.slice(1) ? 'page' : undefined}
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                  active === link.href.slice(1)
                    ? 'text-neutral-900 bg-neutral-100'
                    : 'text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {active === link.href.slice(1) && (
                  <span
                    className="absolute -left-3 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-neutral-900"
                    aria-hidden="true"
                  />
                )}
                <NavIcon name={link.label} />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Topbar + menu mobile */}
      <div className="fixed top-0 w-full z-50 md:hidden border-b border-neutral-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="#home" className="text-lg font-bold text-neutral-900">
            Porto<span className="text-neutral-400">folio</span>
          </a>

          <button
            type="button"
            className="p-2 text-neutral-700"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {open && (
          <ul className="border-t border-neutral-200 px-6 py-4 space-y-1 bg-white">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                    active === link.href.slice(1)
                      ? 'text-neutral-900 bg-neutral-100'
                      : 'text-neutral-500'
                  }`}
                >
                  <NavIcon name={link.label} />
                  {link.label}
                </a>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-neutral-900"
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
                    className="block w-full text-left rounded-lg px-3 py-3 text-sm font-medium text-neutral-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
