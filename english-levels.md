# English worksheets — level rules & check

Use this for every **English** worksheet (`worksheet-subject: english`).

## Three levels (always same names on the hub)

| URL `?level=` | Hub label | Purpose |
|---------------|-----------|---------|
| `starter` | **Starter** | Motivating first step — not “easy”. Choose / guided, no guilt label. |
| `supported` | **Supported** | **10 questions**, simpler content pool; choose and type where the sheet supports it. |
| `advanced` | **Expert** | Full pool, harder items, all modes (e.g. 15 choose + 15 type on Worksheet 6). |

Aliases (still work in URLs): `easy` → starter, `expert` → advanced.

## Hub

- English tiles show **Starter · Supported · Expert** (small SVG icons), not a single “Open worksheet”.
- Non-English tiles keep one **Open worksheet** button.

## Worksheet page

- Top bar: **Home** + level switcher (same three links).
- Show profile badge from `EnglishLevels.profileBadgeText(level)`.
- `supported` → `html.ui-supported` (larger inputs where styled).
- Implement level behaviour in each sheet’s JS (pool, set size, lock modes) — see Worksheet 6 / 7 as reference.

## Worksheet 7 (prepositions)

- **Picture appendix** — `worksheet7-appendix.html?level=…` lists all 9 prepositions with scenes; worksheet intro says *appendix first*; back link restores the same level (choose/type progress stays in localStorage).
- **Picture + sentence + hint** — not context alone; CSS scene shows position (essential for *behind* / *in front of*).
- **Starter / Supported:** `core` pool (in, on, under, next to) · 10 questions.
- **Expert:** full pool (+ behind, opposite, in front of, above, below) · 15 choose + 15 type (separate sets).

## Check before publish

- [ ] `<meta name="worksheet-subject" content="english">`
- [ ] Listed in `english-levels.js` → `ENGLISH_LEVEL_FILES`
- [ ] Hub shows three level links
- [ ] `?level=starter|supported|advanced` each open without error
- [ ] Home link works from worksheet
- [ ] Supported uses **10** questions where sets are used
- [ ] Copy uses **Starter**, not “Easy”

## Files

- `english-levels.js` — shared labels, icons, hub helpers, worksheet switcher
- `english-levels.md` — this document
