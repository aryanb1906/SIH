# FarmGrow UI/UX Design Guidelines

## Theme Consistency
- All pages use `bg-background` for main backgrounds, with color tokens from `globals.css`.
- Layouts use the `Container` component for horizontal padding and max-width.
- Headers and footers use the same structure and spacing as the front page.

## Spacing & Layout
- Horizontal padding: `px-4` (mobile), `sm:px-6`, `lg:px-8` via `Container`.
- Vertical padding: `py-4` for headers, `py-8` for main content.
- Cards and sections use `gap-4`, `gap-6`, or `gap-8` for grid spacing.

## Typography
- Headings: `text-2xl`/`text-3xl`/`text-4xl` for main titles.
- Body: `text-base`/`text-xl` for descriptions.
- Font family: Geist Sans/Mono via layout.

## Color Tokens
- Use CSS variables from `globals.css` for backgrounds, text, accents, and borders.
- Primary: gold/earth tones; Secondary: pink; Accent: green, blue, brown.

## Accessibility
- All interactive elements have focus states and ARIA labels where needed.
- Images use descriptive alt text and fallback avatars.
- Skip link added to layout for keyboard navigation.

## Component Patterns
- Use `Container` for all page layouts.
- Cards use consistent padding and border radius.
- Buttons use unified variants and sizes from `ui/button.tsx`.

## Responsive Design
- All layouts and grids adapt to mobile, tablet, and desktop via Tailwind breakpoints.

---
For further changes, update this file to keep design rules in sync.
