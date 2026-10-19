import type { Profile } from "@/types";

export default function Hero({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <section id="home" className="relative min-h-screen bg-neutral-50">
      {/* Background pemandangan (Unsplash) + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80)' }}
        role="img"
        aria-label="Latar pemandangan gunung"
      />
      <div className="absolute inset-0 bg-neutral-50/70 dark:bg-neutral-950/70" aria-hidden="true" />

      <div className="relative">
        {/* Mengubah px-6 menjadi pl-4 pr-12 (atau sesuaikan lg:pl-8) agar konten bergeser ke kiri */}
        <div className="mx-auto flex w-full max-w-5xl flex-col justify-center pb-16 pt-32 pl-4 pr-12 sm:px-10 lg:pt-36 lg:pl-8 min-h-screen">
         
          {/* Main Content — semua rata kiri */}
          <div className="text-left">
            <p className="mb-5 text-base font-semibold uppercase tracking-[0.25em] text-neutral-400">
              {profile.role}
            </p>

            {/* Nama kini sedikit lebih ke kiri dari sebelumnya */}
            <h1 className="mb-10 text-7xl font-light leading-[1.0] tracking-tight text-neutral-900 sm:text-8xl lg:text-9xl">
              {profile.name}
            </h1>

            <p className="mb-12 max-w-xl text-xl leading-10 text-neutral-600 sm:text-2xl">
              {profile.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="rounded-full bg-neutral-900 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-neutral-700"
              >
                Work with me
              </a>

              <a
                href="#projects"
                className="rounded-full border border-neutral-300 px-8 py-4 text-lg font-semibold text-neutral-900 transition-colors hover:border-neutral-900"
              >
                See projects
              </a>
            </div>

            {/* Location + social — tanpa panah */}
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 pt-8">
              <p className="text-base text-neutral-500">{profile.location}</p>

              {profile.social?.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  GitHub
                </a>
              )}

              {profile.social?.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  LinkedIn
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-base font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}