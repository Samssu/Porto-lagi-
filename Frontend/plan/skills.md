# Skills Spec

## Current State
`components/Skills.js` — receives `skills` array, renders progress bars (name + level%). Section id="skills", bg-white.

## Target
`components/Skills.tsx` — typed, animated bars, grid layout optional, category grouping.

## Props
```ts
interface SkillsProps {
  skills: Skill[];
}
```

## Skill Shape (from backend)
```ts
interface Skill {
  id: number;
  name: string;
  level: number; // 0-100
}
```

## Behavior
- Empty state: `if (skills.length === 0) return null;`
- Each skill: label (name + level%), bar container (bg-gray-200), fill (bg-blue-600, animated width)
- Animation: `transition-all duration-700` on width
- Grid: 1 col mobile, 2 col tablet (optional grouping)

## Implementation Plan
1. Type-safe props
2. Empty state guard
3. Progress bar component (reusable)
4. Animate width on mount (useEffect + IntersectionObserver or CSS)
5. Group by category if backend adds `category` field (future)

## Tasks
- [ ] Convert Skills.js → Skills.tsx
- [ ] Add Skill type
- [ ] Add empty state
- [ ] Add bar animation
- [ ] Test with empty array

## Verification
- `npm run dev` → Skills renders bars
- Backend down → Skills returns null, no crash
- Empty array → no crash, no section