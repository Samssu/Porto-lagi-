# Portfolio Development Plan

## Overview
Next.js 16.4.2 + React 19 + Tailwind 4 portfolio. Backend Express di port 5000. Frontend di port 3000.

Stack:
- Frontend: Next.js (app router), React 19, TypeScript, Tailwind CSS 4
- Backend: Express 5.3, Node.js, CORS
- Components: Navbar, Hero, Skills, Projects, Contact, Footer (JS→TS migration needed)

---

## Phase 1: Foundation (Week 1)

### Objectives
- Convert all `.js` components to `.tsx`
- Setup proper TypeScript types
- Fix component exports for Next.js 16
- Verify dev server runs clean

### Tasks
1.1 Create `types/index.ts` — Define all data types (Profile, Skill, Project, Contact)
1.2 Convert `components/Navbar.tsx` — Fix exports, add types
1.3 Convert `components/Hero.tsx` — Add Profile type, handle null safely
1.4 Convert `components/Skills.tsx` — Array types, .map safety
1.5 Convert `components/Projects.tsx` — Project type, nested arrays
1.6 Convert `components/Contact.tsx` — Form state types, handler types
1.7 Convert `components/Footer.tsx` — Social links type safety
1.8 Update `app/page.tsx` — Use types, error boundary
1.9 Run `npm run build` — Verify no TS errors
1.10 Test `npm run dev` — Check all components render

### Deliverables
- All components `.tsx` with full type safety
- Zero TypeScript errors
- Dev server runs at localhost:3000 clean

---

## Phase 2: Features & UX (Week 2)

### Objectives
- Add mobile navigation (hamburger menu)
- Add smooth scroll behavior
- Add loading skeletons
- Add error boundaries
- Improve accessibility

### Tasks
2.1 Create `components/MobileMenu.tsx` — Hamburger nav for mobile
2.2 Update `Navbar.tsx` — Integrate mobile menu, smooth scroll links
2.3 Create `components/SkeletonLoader.tsx` — Loading state UI
2.4 Update `app/page.tsx` — Replace "Loading..." with skeleton
2.5 Create `components/ErrorBoundary.tsx` — Catch render errors
2.6 Wrap components in `app/page.tsx` — Error safety
2.7 Add `aria-label`, `role` attributes — Accessibility pass
2.8 Add `rel="noopener noreferrer"` — Security on external links
2.9 Verify mobile responsive — Check Tailwind breakpoints
2.10 Test on 3 screen sizes (mobile/tablet/desktop)

### Deliverables
- Mobile menu functional
- Smooth scroll navigation works
- Loading states polished
- No console errors
- WCAG baseline (contrast, labels, keyboard nav)

---

## Phase 3: Backend Integration & Data (Week 3)

### Objectives
- Verify backend API stability
- Add retry logic for failed fetches
- Add environment variables for API URL
- Mock data fallback
- Setup `.env.local`

### Tasks
3.1 Create `.env.local` — API_URL=http://localhost:5000
3.2 Update `app/page.tsx` — Use `process.env.NEXT_PUBLIC_API_URL` (or fallback)
3.3 Add retry logic — Fetch with 2x retry on network error
3.4 Create `lib/api.ts` — Centralized fetch functions (getProfile, getSkills, etc)
3.5 Add error UI — Show fallback message if API down
3.6 Verify Contact form submits to backend — Test via localhost
3.7 Test offline mode — Check graceful degradation
3.8 Update README — Document env setup

### Deliverables
- API calls centralized
- Fallback data works
- Error messages helpful
- Contact form tested
- `.env.local` documented

---

## Phase 4: Performance & Optimization (Week 4)

### Objectives
- Image optimization (Next.js Image component)
- Font optimization
- Code splitting
- Reduce bundle size
- Add meta tags/SEO

### Tasks
4.1 Replace avatar div with `next/image` — Profile picture optimization
4.2 Setup Google Fonts via `next/font` — Load Geist or custom font
4.3 Add dynamic imports — Code split heavy components if needed
4.4 Setup `next.config.js` — Image domains for future CDN
4.5 Add metadata — `app/layout.tsx` title, description, OG tags
4.6 Run `npm run build` — Check bundle size
4.7 Generate sitemap (if needed) — For SEO
4.8 Test Lighthouse score — Aim for 90+ on Performance

### Deliverables
- Images lazy-loaded, optimized
- Fonts served fast
- Metadata in place
- Lighthouse 90+
- Build size < 500KB

---

## Phase 5: Deployment & Polish (Week 5)

### Objectives
- Setup deployment (Vercel recommended)
- Environment parity
- Final testing
- Documentation

### Tasks
5.1 Create `vercel.json` — Deployment config (if needed)
5.2 Setup CI/CD — GitHub Actions or Vercel auto-deploy
5.3 Test production build locally — `npm run build && npm run start`
5.4 Setup monitoring — Error tracking (Sentry optional)
5.5 Document API endpoints — Create API.md
5.6 Create DEPLOYMENT.md — How to deploy
5.7 Final QA — All sections work, no broken links
5.8 Go live — Deploy to Vercel

### Deliverables
- Live portfolio URL
- CI/CD pipeline working
- Documentation complete
- Performance metrics tracked

---

## Timeline Summary
- Phase 1: 2-3 days (types + conversions)
- Phase 2: 2-3 days (mobile + UX)
- Phase 3: 2-3 days (backend integration)
- Phase 4: 2-3 days (optimization)
- Phase 5: 2-3 days (deployment + final)

**Total: ~2 weeks**

---

## Known Issues & Blockers
- Backend running on port 5000 manually (no auto-start)
- `.js` components need TS migration
- No environment config yet
- No error boundaries currently
- Mobile nav missing

---

## Success Criteria
✅ All components TypeScript-safe
✅ Mobile responsive works
✅ Backend API integrated
✅ Deployed live
✅ No console errors
✅ Lighthouse 90+
