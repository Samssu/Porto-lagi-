import type { Profile } from "@/types";

export default function Hero({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <section id="home" className="min-h-screen bg-neutral-50">
      <div className="md:pl-32 lg:pl-36">
        <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-24 sm:px-10 lg:pt-28">
          {/* Top Bar — tanpa teks welcome, hanya avatar */}
          <div className="flex items-center justify-end gap-4 border-b border-neutral-200 pb-6">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-base font-semibold text-white"
              aria-hidden="true"
            >
              {profile.name.charAt(0)}
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-16 lg:pt-24">
            <p className="mb-5 text-base font-semibold uppercase tracking-[0.25em] text-neutral-400">
              {profile.role}
            </p>

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
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-neutral-200 pt-8">
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
