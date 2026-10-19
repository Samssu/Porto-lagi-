# Footer Spec

## Current State
`components/Footer.js` — receives `profile` prop, shows GitHub + LinkedIn links, copyright year + name. bg-gray-900, text-white.

## Target
`components/Footer.tsx` — typed, social icons, optional newsletter (future), accessibility.

## Props
```ts
interface FooterProps {
  profile: Profile | null;
}
```

## Behavior
- `if (!profile) return null;` — guard
- Social links: GitHub, LinkedIn (text links currently)
- Optional: icon buttons (SVG) instead of text
- Copyright: `© {year} {name}. All rights reserved.`
- bg-gray-900, text-gray-400
- `rel="noopener noreferrer"` on external links
- `aria-label` on social links

## Implementation Plan
1. Type-safe props with Profile
2. Null guard
3. Social links with icons (optional)
4. Current year: `new Date().getFullYear()`
5. External links security
6. Optional: back-to-top button (future)

## Tasks
- [ ] Convert Footer.js → Footer.tsx
- [ ] Add Profile type
- [ ] Add null guard
- [ ] Add social icons
- [ ] Test with mock data

## Verification
- `npm run dev` → Footer renders with profile
- Backend down → Footer returns null, no crash
- GitHub link → opens new tab with noopener