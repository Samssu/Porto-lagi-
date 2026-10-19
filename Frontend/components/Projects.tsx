'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/types';

/* Modal popup penjelasan project: nama, teks, teknologi, button GitHub / Menuju Web */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail proyek ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Tutup"
        >
          ✕
        </button>

        <h3 className="mb-3 pr-10 text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {project.title}
        </h3>

        <p className="mb-6 text-base leading-8 text-neutral-600">
          {project.description}
        </p>

        {project.tech && project.tech.length > 0 && (
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Teknologi
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900"
            >
              Menuju Web
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const total = projects.length;

  const scrollTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track || total === 0) return;
      const next = Math.min(total - 1, Math.max(0, i));
      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
    },
    [total]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || expanded) return;
    const onScroll = () => setIndex(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [expanded]);

  const card = (project: Project) => (
    <button
      type="button"
      key={project.id}
      onClick={() => setSelected(project)}
      className="group relative flex h-80 w-full flex-col justify-end overflow-hidden rounded-2xl border border-neutral-200 text-left sm:h-96"
      aria-label={`Lihat detail proyek ${project.title}`}
    >
      {/* Background gambar project + scrim untuk keterbacaan */}
      <div
        className="absolute inset-0 bg-neutral-200 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
        role="img"
        aria-label={`Gambar proyek ${project.title}`}
      />
      <div className="absolute inset-0 bg-neutral-900/60" aria-hidden="true" />

      <div className="relative p-6 sm:p-8">
        <h3 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
          {project.title}
        </h3>
        <p className="mb-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
          {project.description}
        </p>
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );

  return (
    <section id="projects" className="py-24 bg-neutral-50">
      <div className="md:pl-32 lg:pl-36">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Kiri: penjelasan + tombol lihat semua */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              Selected Works
            </h2>
            <p className="mb-10 max-w-md text-lg leading-8 text-neutral-600">
              Proyek pilihan yang pernah saya kerjakan. Klik pada gambar proyek untuk melihat
              penjelasan lengkapnya.
            </p>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900"
            >
              {expanded ? 'Tutup' : 'Lihat Semua Proyek'}
            </button>
          </div>

          {/* Kanan: carousel ATAU grid semua */}
          {expanded ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map(card)}
            </div>
          ) : (
            <>
              <div
                ref={trackRef}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full flex-none snap-center">
                    {card(project)}
                  </div>
                ))}
              </div>

              {/* Navigasi carousel — DI BAWAH gambar */}
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={() => scrollTo(index - 1)}
                  disabled={index === 0}
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Proyek sebelumnya"
                >
                  ←
                </button>
                <p className="text-sm tabular-nums text-neutral-500">
                  {index + 1} / {total}
                </p>
                <button
                  type="button"
                  onClick={() => scrollTo(index + 1)}
                  disabled={index >= total - 1}
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Proyek berikutnya"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
