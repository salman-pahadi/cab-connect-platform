# 🚀 WEBSITE STARTER KIT
## Complete Template Package for Professional Corporate Websites

**Version:** 2.0  
**Last Updated:** January 2025  

---

## 📦 WHAT'S IN THIS KIT (7 Essential Files)

### **⭐ START HERE: Choose Your Brand Kit Version**

**90% of clients provide minimal info. Pick realistic version:**

#### **BRAND-KIT-LITE.md** (90% of projects) ⚡ RECOMMENDED
- **Time:** 45 minutes total
- **Client provides:** 5-7 fields (domain, industry, audience, year, project type)
- **You provide:** Industry-standard colors, fonts, layouts
- **Best for:** Budget projects, tight timelines, clients without brand team
- **Result:** Professional site with smart defaults

#### **BRAND-KIT-FULL.md** (10% of projects) 🎨 PREMIUM
- **Time:** 2-hour workshop + 1 hour documentation
- **Client provides:** 93 detailed fields
- **You provide:** Fully custom branding
- **Best for:** Premium clients, rebrands, enterprise, high budget
- **Result:** Custom brand system

**🎯 Decision Rule:** Start with LITE. If client wants customization, offer FULL as premium add-on.

---

### **📘 DEVELOPMENT-GUIDE.md** (Main Reference)
- Complete development guide with code templates
- 12 Commandments, design system, technical implementation, checklists
- Use throughout entire project

### **🎯 AI-INSTRUCTIONS.md** (Cursor Automation)
- Copy-paste commands for AI to follow guidelines
- Quick start, project init, content audit, page creation templates
- Paste into Cursor at project start

### **⚙️ .cursorrules-template** (AI Enforcement)
- Auto-enforce content governance and design rules
- Forbidden patterns, required features, quality gates
- Copy to project root as `.cursorrules`

### **🎨 design-tokens-template.ts** (Design System)
- Design system foundation with industry presets
- Fill from Brand Kit (LITE or FULL)
- Copy to `lib/design-tokens.ts`

### **📋 project-checklist.md** (Progress Tracker)
- 4-week timeline with daily tasks
- Track progress, ensure nothing missed

### **📖 README.md** (This File)
- Quick start guide and file overview

---

## 🚀 QUICK START (Correct Order)

### **STEP 0: Brand Kit (Choose Version)** ⚠️

#### **Option A: LITE (90% of clients)** ⚡ RECOMMENDED
```bash
# 1. Open BRAND-KIT-LITE.md
# 2. Ask client 5-7 questions (30 min call):
#    - Domain name?
#    - Founded year?
#    - Industry?
#    - Target audience?
#    - Static/dynamic/mobile?
#    - Have logo files?
#    - Have brand colors?
#
# 3. Fill Section 2 with industry defaults (15 min)
# 4. Get client approval on defaults
# 5. START BUILDING (Total: 45 min)

✅ Use when: Tight timeline, budget project, no brand team
✅ Client provides: 5-7 fields
✅ You provide: Professional defaults
```

#### **Option B: FULL (10% of clients)** 🎨 PREMIUM
```bash
# 1. Schedule 2-hour brand workshop
# 2. Open BRAND-KIT-FULL.md
# 3. Complete ALL 93 fields with client
# 4. Get stakeholder sign-off
# 5. Lock brand kit
# 6. START BUILDING (Total: 3 hours)

✅ Use when: Premium budget, rebrand, enterprise
✅ Client provides: 93 detailed fields
✅ You provide: Full custom brand system
```

**🎯 Default to LITE.** Offer FULL as premium add-on if requested.

### **STEP 1: Project Setup** (15 minutes)
```bash
# 1. Create Next.js project
npx create-next-app@latest your-project --typescript --tailwind --app

# 2. Copy starter kit
cp -r WEBSITE-STARTER-KIT /path/to/your/templates/

# 3. Copy rules file
cp WEBSITE-STARTER-KIT/.cursorrules-template your-project/.cursorrules

# 4. Copy & customize design tokens from Brand Kit
cp WEBSITE-STARTER-KIT/design-tokens-template.ts your-project/lib/design-tokens.ts
# Fill colors/fonts from BRAND-KIT-TEMPLATE.md Section 3 & 4
```

### **STEP 2: AI Automation** (2 minutes)
```bash
# 1. Open your-project in Cursor
cd your-project && code .

# 2. Open WEBSITE-STARTER-KIT/AI-INSTRUCTIONS.md
# 3. Copy "Quick Start" section
# 4. Paste into Cursor chat with brand kit details:
```

```
Follow @DEVELOPMENT-GUIDE.md

[FROM BRAND KIT]
Company: [Section 1.1 - Company Name]
Domain: [Section 1.1 - Domain]  
Colors: [Section 3 - Primary/Secondary/Accent]
Font: [Section 4 - Primary Font]
Voice: [Section 6 - Tone of Voice]

Rules: NO names, numbers, emojis, certifications
Start with homepage
```

### **STEP 3: Development** (4 weeks)
```bash
# Follow project-checklist.md:
# Week 1: Foundation (design tokens, layout, homepage)
# Week 2: Core pages (services, about, contact, legal)
# Week 3: Polish (SEO, accessibility, performance)
# Week 4: Launch (audit, testing, deployment)

# Reference DEVELOPMENT-GUIDE.md when stuck
# Track progress in project-checklist.md
```

---

## ⚡ THE 12 COMMANDMENTS

**Content Governance (NEVER BREAK):**

1. ❌ NO real client names (without written permission)
2. ❌ NO numbers/metrics (client counts, years, percentages)
3. ❌ NO emojis (ZERO TOLERANCE)
4. ❌ NO certification claims (ISO, HIPAA, etc.)
5. ❌ NO outcome-based case studies (process only)
6. ❌ NO vague fluff ("best", "world-class", "leading")
7. ❌ NO numbered badges (use icons)
8. ✅ Complete Brand Kit BEFORE coding
9. ✅ Design tokens FIRST, then components
10. ✅ SEO metadata on EVERY page
11. ✅ Mobile-first ALWAYS (375px, 768px, 1280px)
12. ✅ Accessibility REQUIRED (WCAG AA)

**Content Safety Overrides Creativity - ALWAYS.**

---

## 🎯 RECOMMENDED TECH STACK

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Static export (`output: 'export'`)
- **Fonts:** Google Fonts (Plus Jakarta Sans / Inter)
- **Icons:** Heroicons (SVG, 2px stroke)
- **Hosting:** Netlify / Vercel / GitHub Pages

---

## 📊 WHICH FILE WHEN?

| Situation | Use This File |
|-----------|---------------|
| **New project (client meeting)** | BRAND-KIT-TEMPLATE.md |
| **Project setup (first code)** | AI-INSTRUCTIONS.md → Quick Start |
| **Stuck on implementation** | DEVELOPMENT-GUIDE.md → Search topic |
| **Need code example** | DEVELOPMENT-GUIDE.md → Code Templates |
| **Create new page** | AI-INSTRUCTIONS.md → New Page template |
| **Audit content** | AI-INSTRUCTIONS.md → Content Audit |
| **Track progress** | project-checklist.md |
| **Setup design system** | design-tokens-template.ts |
| **AI auto-enforcement** | .cursorrules-template → Copy to `.cursorrules` |

---

## 🆘 TROUBLESHOOTING

### **"Client hasn't provided brand details"**
- ⚠️ STOP development immediately
- Open BRAND-KIT-TEMPLATE.md
- Schedule workshop to complete ALL 93 fields
- Get sign-off before proceeding

### **"AI not following rules"**
- ✅ Verify .cursorrules exists in project root
- ✅ Reference files with @: `@DEVELOPMENT-GUIDE.md`
- ✅ Use exact commands from AI-INSTRUCTIONS.md

### **"Too many files, feeling overwhelmed"**
- ✅ Start with just BRAND-KIT-TEMPLATE.md
- ✅ Then AI-INSTRUCTIONS.md Quick Start
- ✅ Reference others as needed

### **"Client wants forbidden content (numbers, certs)"**
- ✅ Show DEVELOPMENT-GUIDE.md Content Rules
- ✅ Explain legal/regulatory risks
- ✅ Offer approved alternatives
- ✅ If they insist: Get written approval

---

## 📖 RESOURCES

**External Tools:**
- Icons: https://heroicons.com
- Fonts: https://fonts.google.com
- Colors: https://coolors.co
- Contrast: https://webaim.org/resources/contrastchecker/
- Schema: https://schema.org

**In Parent Folder:**
- WEBSITE-DEVELOPMENT-GUIDE.md (1,887 lines - TwikiWeb case study)

---

## ✅ READY TO START?

### **Pre-Development Checklist:**
- [ ] Brand Kit 100% complete (ALL 93 fields)
- [ ] All stakeholders reviewed & approved
- [ ] Logo files received
- [ ] Colors tested for accessibility (≥4.5:1 contrast)
- [ ] Font licenses verified
- [ ] .cursorrules copied to project root
- [ ] design-tokens.ts created from Brand Kit

### **Your Launch:**
1. **Complete** Brand Kit with client (2 hours)
2. **Setup** project following STEP 1-2 (15 min)
3. **Develop** following project-checklist.md (4 weeks)

**Estimated project time:** 4 weeks from brand kit completion

---

## 🎯 FINAL NOTE

**These guidelines exist to protect you and your clients from:**
- Legal liability (false claims, NDAs)
- Regulatory violations (certifications, compliance)
- Reputational damage (unprofessional content)
- Trust erosion (fake numbers, emojis)

**The brand kit is mandatory because assumptions destroy projects.**

---

**Ready to build something amazing? Start with the Brand Kit! 🎨**

---

**END OF README**
