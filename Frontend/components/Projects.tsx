'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/types';

// Dummy images untuk fallback jika data tidak ada
const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
];

/* Modal popup penjelasan project dengan animasi scale up */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    
    // Mencegah scroll pada body saat modal terbuka
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const mainImage = project.image || DUMMY_IMAGES[0];
  const galleryImages = [mainImage, DUMMY_IMAGES[1], DUMMY_IMAGES[2]];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail proyek ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Kontainer Modal dengan Animasi Membesar */}
      <div className="relative flex max-h-[90vh] w-full max-w-4xl animate-in zoom-in-95 fade-in duration-300 flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl">
        
        {/* Tombol Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-lg text-white backdrop-blur-md transition-colors hover:bg-black/80"
          aria-label="Tutup"
        >
          ✕
        </button>

        <div className="overflow-y-auto">
          {/* Bagian Galeri Gambar (2-3 Foto) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-64 sm:h-80 bg-neutral-100">
            <div className="md:col-span-2 h-full overflow-hidden">
              <img
                src={galleryImages[0]}
                alt={`Gambar utama ${project.title}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col gap-1 h-full">
              <img
                src={galleryImages[1]}
                alt={`Gambar detail 1 ${project.title}`}
                className="h-1/2 w-full object-cover"
              />
              <img
                src={galleryImages[2]}
                alt={`Gambar detail 2 ${project.title}`}
                className="h-1/2 w-full object-cover"
              />
            </div>
          </div>

          {/* Bagian Informasi */}
          <div className="p-8 sm:p-10">
            <h3 className="mb-4 text-3xl font-semibold text-neutral-900">
              {project.title}
            </h3>

            <p className="mb-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
              {project.description || 'Deskripsi proyek belum ditambahkan. Ini adalah teks dummy untuk mengisi kekosongan informasi. Proyek ini dibuat menggunakan teknologi modern terkini untuk memastikan performa dan user experience yang maksimal.'}
            </p>

            {project.tech && project.tech.length > 0 && (
              <div className="mb-10">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Teknologi yang Digunakan
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tombol Action di Bawah */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-100">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-neutral-700 sm:flex-none"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-4 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 sm:flex-none"
                >
                  Kunjungi Website
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Modal Popup untuk Menampilkan Semua Proyek */
function AllProjectsModal({ 
  projects, 
  onClose, 
  onSelectProject 
}: { 
  projects: Project[]; 
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Semua Proyek"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-6xl animate-in zoom-in-95 fade-in duration-300 flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-neutral-100 p-6 sm:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Semua Proyek</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Grid Semua Proyek */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelectProject(project)}
                className="group relative flex h-72 w-full flex-col justify-end overflow-hidden rounded-2xl border border-neutral-200 text-left transition-transform duration-300 hover:scale-[1.02]"
              >
                <div
                  className="absolute inset-0 bg-neutral-200 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image || DUMMY_IMAGES[0]})` }}
                  role="img"
                  aria-label={`Gambar proyek ${project.title}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent" aria-hidden="true" />
                <div className="relative p-6">
                  <h3 className="mb-2 text-xl font-bold text-white line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAllModal, setShowAllModal] = useState(false); // State untuk modal semua proyek
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
    if (!track) return;
    const onScroll = () => setIndex(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const card = (project: Project) => (
    <button
      type="button"
      key={project.id}
      onClick={() => setSelected(project)}
      className="group relative flex h-[32rem] w-full flex-col justify-end overflow-hidden rounded-3xl border border-neutral-200 text-left transition-transform duration-300 hover:scale-[1.02] sm:h-[40rem]"
      aria-label={`Lihat detail proyek ${project.title}`}
    >
      <div
        className="absolute inset-0 bg-neutral-200 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image || DUMMY_IMAGES[0]})` }}
        role="img"
        aria-label={`Gambar proyek ${project.title}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent" aria-hidden="true" />

      <div className="relative p-8 sm:p-10">
        <h3 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          {project.title}
        </h3>
        <p className="mb-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg line-clamp-3">
          {project.description}
        </p>
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
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
    <section id="projects" className="py-32 bg-neutral-50">
      <div className="md:pl-32 lg:pl-36">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          
          {/* Kiri: penjelasan + tombol lihat semua */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              Selected Works
            </h2>
            <p className="mb-10 max-w-md text-lg leading-8 text-neutral-600">
              Kumpulan proyek pilihan. Klik pada gambar proyek untuk melihat galeri foto dan detail lengkapnya.
            </p>

            {/* Tombol Lihat Semua Proyek yang memicu Popup */}
            <button
              type="button"
              onClick={() => setShowAllModal(true)}
              className="rounded-full border border-neutral-300 px-8 py-4 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900"
            >
              Lihat Semua Proyek
            </button>
          </div>

          {/* Kanan: carousel utama */}
          <div className="flex flex-col">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-3xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-none snap-center">
                  {card(project)}
                </div>
              ))}
            </div>

            {/* Navigasi carousel */}
            <div className="flex items-center justify-center gap-5 pt-8">
              <button
                type="button"
                onClick={() => scrollTo(index - 1)}
                disabled={index === 0}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Proyek sebelumnya"
              >
                ←
              </button>
              <p className="text-sm font-medium tabular-nums text-neutral-500">
                {index + 1} / {total}
              </p>
              <button
                type="button"
                onClick={() => scrollTo(index + 1)}
                disabled={index >= total - 1}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Proyek berikutnya"
              >
                →
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Modal Detail Projek */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      
      {/* Modal Semua Projek */}
      {showAllModal && (
        <AllProjectsModal 
          projects={projects} 
          onClose={() => setShowAllModal(false)}
          onSelectProject={(project) => {
            setShowAllModal(false); // Tutup modal grid
            setSelected(project);   // Buka modal detail
          }}
        />
      )}
    </section>
  );
}