import type { Profile } from '@/types';

export default function About({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="md:pl-32 lg:pl-36">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <h2 className="mb-14 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
            Tentang Saya
          </h2>

          <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
            {/* Foto — sumber dummy, ganti saat profile punya foto asli */}
            {/* ponytail: pakai avatar dicee dummy; ganti ke profile.avatar saat backend menambah field foto */}
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(profile.name)}`}
              alt={`Foto ${profile.name}`}
              width={256}
              height={256}
              loading="lazy"
              className="h-48 w-48 rounded-2xl border border-neutral-200 object-cover sm:h-64 sm:w-64"
            />

            {/* Teks penjelasan (dummy) + tombol CV/Resume */}
            <div>
              <div className="space-y-6 text-lg leading-9 text-neutral-600 sm:text-xl">
                <p>
                  Halo! Saya <span className="font-semibold text-neutral-900">{profile.name}</span>,
                  seorang {profile.role.toLowerCase()} yang tinggal di {profile.location}.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Saya memiliki ketertarikan
                  pada pengembangan web modern, arsitektur aplikasi yang bersih, dan pengalaman
                  pengguna yang menyenangkan. Setiap proyek saya perlakukan sebagai kesempatan untuk
                  belajar hal baru.
                </p>
                <p>
                  Di luar coding, saya senang menulis dokumentasi teknis, berkontribusi pada proyek
                  open source, dan sesekali berbagi apa yang saya pelajari lewat artikel.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {/* ponytail: file /files/cv.pdf & /files/resume.pdf harus ditambahkan owner ke folder public/ */}
                <a
                  href="/files/cv.pdf"
                  download
                  className="rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  Download CV
                </a>
                <a
                  href="/files/resume.pdf"
                  download
                  className="rounded-full border border-neutral-300 px-8 py-4 text-base font-semibold text-neutral-900 transition-colors hover:border-neutral-900"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
