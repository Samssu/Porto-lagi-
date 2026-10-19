# Navbar Spec

## Current State
`components/Navbar.js` — fixed top, white bg, shadow, logo "Portfolio", 4 links (Home, Skills, Projects, Contact). No mobile menu, no smooth scroll.

## Target
`components/Navbar.tsx` — responsive, mobile hamburger, smooth scroll, active link highlight, accessibility.

## Props
```ts
interface NavbarProps {
  links?: { label: string; href: string }[];
}
```

## Behavior
- Fixed top-0, z-50, bg-white/80 backdrop-blur (sticky feel)
- Logo: initial "P" avatar or name
- Desktop: flex row, gap-6, font-medium
- Mobile: hamburger toggle → slide-down menu
- Click link → smooth scroll to section, close mobile menu
- Active section → text-blue-600 font-bold
- `aria-label="Navigasi utama"`

## Implementation Plan
1. `useState` for `isOpen` (mobile menu)
2. `useEffect` for scroll highlight (scroll spy)
3. `useRef` array for section IDs
4. Tailwind: `md:hidden` for mobile, `flex-col` when open
5. Hamburger icon: SVG (2 lines) or emoji ▼/▲
6. Smooth scroll: `scroll-behavior: smooth` on html (globals.css)

## Tasks
- [ ] Convert Navbar.js → Navbar.tsx
- [ ] Add mobile menu component
- [ ] Add scroll spy active state
- [ ] Add aria-label
- [ ] Test mobile + desktop

## Verification
- `npm run dev` → open mobile viewport → hamburger works
- Scroll to Skills → "Skills" link highlights