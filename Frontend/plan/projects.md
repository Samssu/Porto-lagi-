# Projects Spec

## Current State
`components/Projects.js` — receives `projects` array, grid (1 mobile / 2 tablet / 3 desktop), card with title, description, tech tags. Section id="projects", bg-gray-50.

## Target
`components/Projects.tsx` — typed, hover effects, optional links, filter by tech (future).

## Props
```ts
interface ProjectsProps {
  projects: Project[];
}
```

## Project Shape (from backend)
```ts
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
}
```

## Behavior
- Empty state: `if (projects.length === 0) return null;`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Card: bg-white, rounded-xl, shadow-sm, hover:shadow-md
- Tech tags: rounded-full, bg-blue-100, text-blue-700
- Optional: project link (GitHub/Live) — future field

## Implementation Plan
1. Type-safe props
2. Empty state guard
3. Card hover effect
4. Optional `link` field (GitHub, live URL)
5. External links with `rel="noopener noreferrer"`
6. Image placeholder (future — `next/image`)

## Tasks
- [ ] Convert Projects.js → Projects.tsx
- [ ] Add Project type
- [ ] Add empty state
- [ ] Add card hover
- [ ] Test with empty array

## Verification
- `npm run dev` → Projects renders cards
- Backend down → Projects returns null, no crash
- Empty array → no crash, no section