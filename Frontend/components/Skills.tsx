import type { Skill } from '@/types';

const CATEGORIES = ['Frontend', 'Backend', 'Tools'] as const;

function categorize(skill: Skill): string {
  const name = skill.name.toLowerCase();
  const frontend = ['html', 'css', 'javascript', 'typescript', 'react', 'next', 'vue', 'tailwind', 'svelte'];
  const backend = ['node', 'express', 'php', 'laravel', 'python', 'django', 'mongodb', 'mysql', 'postgresql', 'sql'];

  if (frontend.some((k) => name.includes(k))) return 'Frontend';
  if (backend.some((k) => name.includes(k))) return 'Backend';
  return 'Tools';
}

/* slug logo simple-icons per nama skill */
function slugFor(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes('html')) return 'html5';
  if (n.includes('tailwind')) return 'tailwindcss';
  if (n.includes('css')) return 'css';
  if (n.includes('typescript')) return 'typescript';
  if (n.includes('javascript')) return 'javascript';
  if (n.includes('next')) return 'nextdotjs';
  if (n.includes('react')) return 'react';
  if (n.includes('vue')) return 'vuedotjs';
  if (n.includes('svelte')) return 'svelte';
  if (n.includes('node')) return 'nodedotjs';
  if (n.includes('express')) return 'express';
  if (n.includes('mongodb')) return 'mongodb';
  if (n.includes('postgres') || n.includes('mysql')) return 'postgresql';
  if (n.includes('python')) return 'python';
  if (n.includes('php')) return 'php';
  if (n.includes('laravel')) return 'laravel';
  if (n.includes('django')) return 'django';
  if (n.includes('git')) return 'git';
  if (n.includes('vercel')) return 'vercel';
  if (n.includes('figma')) return 'figma';
  return null;
}

/* Icon logo resmi via CDN simple-icons, warna brand asli (disetujui owner).
   ponytail: runtime fetch ke cdn.simpleicons.org; jika offline / gagal, fallback inisial huruf. Ganti ke SVG inline saat butuh offline penuh. */
function SkillIcon({ skill }: { skill: Skill }) {
  const slug = slugFor(skill.name);

  if (!slug) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-neutral-900 text-xs font-bold text-white">
        {skill.name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      className="h-8 w-8 shrink-0"
      onError={(e) => {
        const el = e.currentTarget;
        const fallback = document.createElement('span');
        fallback.className = 'flex h-8 w-8 shrink-0 items-center justify-center rounded bg-neutral-900 text-xs font-bold text-white';
        fallback.textContent = skill.name.charAt(0).toUpperCase();
        el.replaceWith(fallback);
      }}
    />
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="md:pl-32 lg:pl-36">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
            My Expertise
          </h2>
          <p className="mb-14 max-w-xl text-lg text-neutral-600">
            Kumpulan teknologi yang saya kuasai, dikelompokkan berdasarkan kategori.
          </p>

          {/* Tanpa card: heading kategori + daftar baris teks + icon */}
          <div className="grid gap-14 md:grid-cols-3">
            {CATEGORIES.map((category) => {
              const items = skills.filter((s) => categorize(s) === category);
              if (items.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="mb-6 border-b border-neutral-200 pb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    {category}
                  </h3>

                  <ul className="space-y-5">
                    {items.map((skill) => (
                      <li key={skill.id} className="flex items-center gap-4">
                        <SkillIcon skill={skill} />
                        <span className="text-xl font-medium text-neutral-900 sm:text-2xl">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
