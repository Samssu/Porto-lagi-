import type { Profile } from "@/types";

export default function Hero({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#070B16] text-white"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.18),transparent_50%)]" />

        {/* Blue glow */}
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        {/* Purple glow */}
        <div className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[140px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070B16]" />
      </div>

      {/* Decorative circles */}
      <div className="pointer-events-none absolute right-[-150px] top-[10%] hidden h-[550px] w-[550px] rounded-full border border-white/5 lg:block" />

      <div className="pointer-events-none absolute right-[-80px] top-[17%] hidden h-[400px] w-[400px] rounded-full border border-white/5 lg:block" />

      {/* Main Container */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            {/* Status Badge */}
            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs font-medium tracking-wide text-neutral-300 sm:text-sm">
                Welcome to my portfolio
              </span>

              <span className="ml-2 text-neutral-500">✦</span>
            </div>

            {/* Intro */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-indigo-400" />

              <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
                Hello, I'm
              </p>
            </div>

            {/* Name */}
            <h1 className="mb-8 max-w-5xl text-5xl font-bold leading-[1.05] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              <span className="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
                {profile.name}
              </span>
              <span className="text-indigo-400">.</span>
            </h1>

            {/* Role */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300 sm:text-base">
                {profile.role}
              </span>

              <span className="text-sm text-neutral-500">
                • Creative & Technology
              </span>
            </div>

            {/* Bio */}
            <p className="mb-10 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              {profile.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(99,102,241,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(99,102,241,0.4)]"
              >
                Explore My Work

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.08]"
              >
                Let's Connect

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  />
                </svg>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-14 flex flex-wrap items-center gap-6">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                Follow me
              </span>

              <span className="h-px w-8 bg-white/20" />

              {profile.social?.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-400 transition-colors hover:text-indigo-400"
                >
                  GitHub ↗
                </a>
              )}

              {profile.social?.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-400 transition-colors hover:text-indigo-400"
                >
                  LinkedIn ↗
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm font-medium text-neutral-400 transition-colors hover:text-indigo-400"
                >
                  Email ↗
                </a>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative hidden lg:col-span-4 lg:block">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-[100px]" />

            {/* Main Glass Card */}
            <div className="relative rotate-[-3deg] rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-500 hover:rotate-0">
              {/* Window Header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <span className="font-mono text-xs text-neutral-500">
                  developer.ts
                </span>
              </div>

              {/* Code Preview */}
              <div className="space-y-3 font-mono text-xs leading-7 sm:text-sm">
                <p>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-blue-300">developer</span>{" "}
                  <span className="text-neutral-400">=</span> {"{"}
                </p>

                <p className="pl-5">
                  <span className="text-indigo-300">name:</span>{" "}
                  <span className="text-emerald-300">
                    "{profile.name}"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-indigo-300">role:</span>{" "}
                  <span className="text-emerald-300">
                    "{profile.role}"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-indigo-300">location:</span>{" "}
                  <span className="text-emerald-300">
                    "{profile.location}"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-indigo-300">passion:</span>{" "}
                  <span className="text-emerald-300">
                    "Building Digital Experiences"
                  </span>
                </p>

                <p className="text-neutral-400">{"};"}</p>

                <div className="pt-4">
                  <p className="text-neutral-500">
                    {"// Turning ideas into reality"}
                  </p>

                  <p>
                    <span className="text-blue-300">developer</span>
                    <span className="text-neutral-400">.</span>
                    <span className="text-yellow-300">create</span>
                    <span className="text-neutral-400">();</span>
                  </p>
                </div>
              </div>

              {/* Bottom Card */}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                    ✦
                  </span>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Creative Developer
                    </p>

                    <p className="text-[11px] text-neutral-500">
                      Design • Code • Create
                    </p>
                  </div>
                </div>

                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Floating Tag */}
            <div className="absolute -bottom-8 -left-10 rotate-3 rounded-2xl border border-white/10 bg-[#111827]/90 px-5 py-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-xl">
                  ⚡
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Clean Code
                  </p>

                  <p className="text-xs text-neutral-500">
                    Modern Development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-28 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Location */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <svg
                className="h-4 w-4 text-indigo-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-5.25 7-12a7 7 0 10-14 0c0 6.75 7 12 7 12z"
                />

                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                Based in
              </p>

              <p className="text-xs font-medium text-neutral-300">
                {profile.location}
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#projects"
            className="group flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white"
          >
            Scroll to explore

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-indigo-400/40 group-hover:bg-indigo-500/10">
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m-6-6 6 6 6-6"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}