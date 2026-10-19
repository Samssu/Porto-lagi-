# Hero Spec

## Current State
`components/Hero.js` — receives `profile` prop, shows avatar (initial), name, role, bio, 2 CTAs (Hubungi Saya → #contact, Lihat Projek → #projects). Blue gradient bg.

## Target
`components/Hero.tsx` — typed, animated avatar, optional image, CTA buttons, social links row.

## Props
```ts
interface HeroProps {
  profile: Profile | null;
}
```

## Profile Shape (from backend)
```ts
interface Profile {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
  };
}
```

## Behavior
- `if (!profile) return null;` — guard
- Avatar: 80px circle, bg-blue-600, initial letter
- Name: text-4xl md:text-5xl font-bold
- Role: text-xl text-blue-600
- Bio: text-gray-600, max-w-2xl
- CTAs: primary (Hubungi Saya) + secondary (Lihat Projek)
- Optional: social icons row below CTAs

## Implementation Plan
1. Type-safe props with `Profile` interface
2. Optional `avatarUrl` field (future)
3. CTA buttons with hover states
4. Social links: GitHub + LinkedIn icons (SVG or text)
5. `rel="noopener noreferrer"` on external links
6. Animation: fade-in on mount (optional, Phase 2)

## Tasks
- [ ] Convert Hero.js → Hero.tsx
- [ ] Add Profile type import
- [ ] Add null guard
- [ ] Add social links row
- [ ] Test with mock data

## Verification
- `npm run dev` → Hero renders with profile data
- Backend down → Hero returns null, no crash