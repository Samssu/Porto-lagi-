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

function NavIcon({ name, className = 'h-7 w-7' }: { name: string; className?: string }) {
  const common = {
    className: className,
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
    case 'ArrowLeft':
      return (
        <svg {...common}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    case 'ArrowRight':
      return (
        <svg {...common}>
          <path d="M9 18l6-6-6-6" />
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const user = useAuthUser();

  const activeIndex = links.findIndex((l) => l.href.slice(1) === active);
  const hoveredIndex = links.findIndex((l) => l.href.slice(1) === hovered);
  const barIndex = hoveredIndex !== -1 ? hoveredIndex : activeIndex;

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

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
      {/* Tombol Toggle khusus Mobile (Di Tengah Kiri Layar) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen((v) => !v)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:scale-105 md:hidden"
        aria-label={isMobileOpen ? 'Tutup navigasi' : 'Buka navigasi'}
      >
        <NavIcon name={isMobileOpen ? 'ArrowLeft' : 'ArrowRight'} className="h-7 w-7" />
      </button>

      {/* Sidebar Vertikal (Diperbesar & Digeser ke Kanan) */}
      <nav
        className={`fixed left-12 top-1/2 z-50 flex w-20 -translate-y-1/2 flex-col items-center gap-5 rounded-[2rem] border border-neutral-200 bg-white py-8 shadow-sm transition-transform duration-300 ease-in-out dark:border-neutral-800 dark:bg-neutral-900 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-[200%] md:translate-x-0'
        }`}
        aria-label="Main navigation"
      >
        {/* Foto Profil Bulat di Atas (Hanya Muncul Jika Sudah Login) */}
        {user && (
          <div className="relative mb-2">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-200 border-2 border-white shadow-sm transition-transform hover:scale-105 dark:border-neutral-700"
              aria-label="Pengaturan Akun"
              title="Pengaturan"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-neutral-600 dark:text-neutral-300">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>

            {/* Dropdown Menu Pengaturan dari Foto Profil */}
            {menuOpen && (
              <div className="absolute top-0 left-16 flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  aria-label={dark ? 'Aktifkan light mode' : 'Aktifkan dark mode'}
                  title={dark ? 'Light mode' : 'Dark mode'}
                >
                  {dark ? (
                    <svg {...{ className: 'h-6 w-6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24', 'aria-hidden': true }}>
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
                    </svg>
                  ) : (
                    <svg {...{ className: 'h-6 w-6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24', 'aria-hidden': true }}>
                      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                    </svg>
                  )}
                </button>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Dashboard admin"
                  title="Admin"
                >
                  <NavIcon name="Admin" className="h-6 w-6" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Logout"
                  title="Logout"
                >
                  <NavIcon name="Logout" className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        )}

        <ul
          className="relative flex flex-col items-center gap-3"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Bar Hitam Animasi (Disesuaikan untuk ukuran ikon h-14 w-14 dengan gap-3) */}
          <span
            className="absolute -left-1 top-3 h-14 w-0.5 rounded-full bg-neutral-900 transition-all duration-300 ease-in-out dark:bg-white"
            style={{
              transform: `translateY(${barIndex * 4.25}rem)`, // 3.5rem (tinggi) + 0.75rem (gap) = 4.25rem
              opacity: barIndex !== -1 ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-label={link.label}
                title={link.label}
                onMouseEnter={() => setHovered(link.href.slice(1))}
                onClick={() => {
                  setActive(link.href.slice(1));
                  setHovered(null);
                  setIsMobileOpen(false);
                }}
                aria-current={active === link.href.slice(1) ? 'page' : undefined}
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                  active === link.href.slice(1)
                    ? 'text-neutral-900 bg-neutral-100 dark:text-white dark:bg-neutral-800'
                    : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <NavIcon name={link.label} className="h-7 w-7" />
              </a>
            </li>
          ))}
        </ul>

        {/* Bagian Bawah: Tombol Login (Hanya Muncul Jika Belum Login) */}
        {!user && (
          <div className="mt-auto flex flex-col items-center pt-6 border-t border-neutral-100 dark:border-neutral-800 w-14">
            <Link
              href="/login"
              title="Login"
              aria-label="Login"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition-all hover:bg-neutral-700 hover:scale-105"
            >
              <NavIcon name="Login" className="h-6 w-6" />
            </Link>
          </div>
        )}
      </nav>

      {/* Overlay Mobile saat Sidebar Terbuka */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}