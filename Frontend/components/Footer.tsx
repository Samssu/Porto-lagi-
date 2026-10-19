import type { Profile } from '@/types';

export default function Footer({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <div className="md:pl-32 lg:pl-36">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <a
            href="#home"
            className="text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-500"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
