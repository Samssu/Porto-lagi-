import type { Profile } from '@/types';

export default function Footer({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <footer className="border-stark border-t-4 py-12 px-6">
      <div className="max-w-4xl">
        <div className="grid-cols-2 mb-12">
          <div>
            <p className="text-xs uppercase font-mono text-white/60 mb-2">Name</p>
            <p className="text-2xl font-black">{profile.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-white/60 mb-2">Based in</p>
            <p className="text-2xl font-black">{profile.location}</p>
          </div>
        </div>

        <div className="border-stark border-t-2 pt-8">
          <p className="text-xs uppercase font-mono text-white/60 mb-4">Links</p>
          <div className="flex flex-wrap gap-6">
            {profile.social?.github && (
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lg"
              >
                GitHub
              </a>
            )}
            {profile.social?.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lg"
              >
                LinkedIn
              </a>
            )}
            <a href={`mailto:${profile.email}`} className="font-bold text-lg">
              Email
            </a>
          </div>
        </div>

        <div className="border-stark border-t-2 pt-8 mt-8 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
