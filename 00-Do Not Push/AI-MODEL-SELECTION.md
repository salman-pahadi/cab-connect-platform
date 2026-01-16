# AI Model Selection — Brutal & Honest

**DEFAULT: Claude Sonnet 4.5**
Use this 80%+ of the time. Best TypeScript/React/Next.js code. 128K context. 1x cost. Done.

**Haiku 4.5**: Quick questions, syntax fixes. 0.33x cost. Fast.

**GPT‑5.2‑Codex**: Huge files (3000+ lines) or multi-file refactors. 272K context. 1x cost.

**Opus 4.5**: Only when Sonnet fails. 3x cost. Rare. Only for hard architecture/security bugs.

**DON'T USE**: Auto mode, GPT‑4o, GPT‑5 mini, previews. Lower quality = more rework.

**Quick pick:**
- Syntax/quick q? → Haiku
- Code? → Sonnet
- Massive file? → 5.2‑Codex
- Can't solve it? → Opus

**By task:**
- UI/UX → Sonnet (Tailwind, responsive, a11y)
- Architecture → Opus (deep design)
- Testing → Sonnet (test patterns)
- Project queries → Sonnet (fast, balanced)
- Code review → Sonnet (Opus if security)

**For Cab Connect**: Sonnet default everywhere. Switch only when forced.

**Truth**: Sonnet is 95% good enough. Opus is 5% better but 3x slower/expensive. Not worth it 90% of the time.