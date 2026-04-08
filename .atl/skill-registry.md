# Skill Registry — calculadoraServ-FE
Generated: 2026-04-08

## Project Stack
- React 18.2.0 + TypeScript 5.2.2 + Vite 5.1.4
- Tailwind CSS 3.4.1 + Framer Motion
- Vitest 4.1.2 + @testing-library/react (in node_modules)

## User Skills

| Skill | Triggers |
|-------|----------|
| react-19 | `.tsx`, `.jsx` files; React components, hooks, state |
| typescript | `.ts`, `.tsx` files; types, interfaces, generics |
| tailwind-4 | CSS classes, Tailwind utilities, cn(), theme variables |
| playwright | E2E tests, browser automation |
| pytest | Python tests (N/A for this project) |
| go-testing | Go tests (N/A for this project) |
| github-pr | PR creation, gh CLI |
| branch-pr | PR workflow, issue-first enforcement |
| issue-creation | GitHub issues, bug reports |
| sdd-propose | Change proposal phase |
| sdd-spec | Spec writing phase |
| sdd-design | Technical design phase |
| sdd-tasks | Task breakdown phase |
| sdd-apply | Implementation phase |
| sdd-verify | Verification phase |
| sdd-archive | Archive/close change |
| sdd-explore | Codebase investigation |
| judgment-day | Adversarial review protocol |
| skill-creator | Creating new AI skills |

## Compact Rules

### react-19
- Use React 18.2.0 (NOT React 19 — package.json pins `^18.2.0`)
- No useMemo/useCallback unless profiling shows need
- Prefer functional components with hooks
- State lifted to App.tsx (container-presentational pattern in use)
- Props passed explicitly — no context unless truly global

### typescript
- Strict mode enabled (tsconfig.json)
- Interfaces over types for object shapes (see `AppInterfaces.ts`)
- No `any` — use `unknown` + type guards if needed
- File: `src/interfaces/AppInterfaces.ts` — all shared interfaces here

### tailwind-4
- Project uses Tailwind 3.4.1 (NOT Tailwind 4 — adjust syntax accordingly)
- Use `cn()` or `clsx` for conditional classes
- Mobile-first breakpoints
- Light/clear theme (mandated by user — NO dark mode)

### testing (vitest + @testing-library/react)
- Vitest 4.1.2 installed; no vitest.config.ts exists yet (needs setup)
- @testing-library/react, dom, jest-dom, user-event available
- No test files written yet — test infra present but not configured
- STRICT TDD MODE ACTIVE: write tests before implementation

## Convention Files
- `~/.claude/CLAUDE.md` — global user instructions (active)
- No project-level CLAUDE.md
