# 🎯 PROJECT SETUP INSTRUCTIONS FOR AI
## How to Apply Website Development Guidelines to New Projects

**Purpose:** Copy-paste these instructions into Cursor/AI at project start to enforce guidelines.

---

## 📋 QUICK START (Copy This)

```
I'm starting a new website project. Please follow these guidelines:

PROJECT DETAILS:
- Company Name: [YOUR_COMPANY_NAME]
- Domain: [yourdomain.com]
- Industry: [e.g., IT Services, E-commerce, Healthcare]
- Target Country: [e.g., India, USA, UK]
- Primary Color: [e.g., #3b82f6]
- Secondary Color: [e.g., #10b981]
- Font: [e.g., Plus Jakarta Sans]

REFERENCE FILES:
- @WEBSITE-DEVELOPMENT-TEMPLATE.md (use as checklist)
- @WEBSITE-DEVELOPMENT-GUIDE.md (reference for examples)

MANDATORY RULES (NEVER BREAK):
1. NO real client/company names without written permission
2. NO specific numbers (clients, years, team size, metrics)
3. NO emojis in visible content (STRICTLY FORBIDDEN)
4. NO certification claims (ISO, SOC, HIPAA, GDPR, etc.)
5. NO outcome-based case studies (no results, metrics, ROI)
6. NO vague fluff ("best", "world-class", "leading")
7. Icons only (SVG from design system), no numbered badges
8. Mobile-first ALWAYS (test 375px, 768px, 1280px)
9. Accessibility REQUIRED (skip links, ARIA, keyboard nav)
10. Schema: Organization/Service/WebPage only (NO ratings/reviews)

CONTENT SAFETY OVERRIDES CREATIVITY - ALWAYS.

Please confirm you understand these rules before we begin.
```

---

## 🔧 DETAILED INSTRUCTIONS (For Complex Projects)

### **Phase 1: Project Initialization**

```
TASK: Initialize new website project

SETUP:
- Project Name: [NAME]
- Domain: [DOMAIN]  
- Target Country: [COUNTRY]
- Tech Stack: Next.js 14, TypeScript, Tailwind CSS
- Deployment: Static export (output: 'export')

FOLLOW:
@WEBSITE-DEVELOPMENT-TEMPLATE.md

FIRST STEPS:
1. Create design-tokens.ts with provided colors
2. Setup Next.js with static export config
3. Create layout.tsx with schema markup (Organization only)
4. Create sitemap.ts and robots.ts
5. Add accessibility features (skip link, ARIA)

STOP after each step for approval. Do NOT proceed automatically.
```

---

### **Phase 2: Content Creation**

```
TASK: Create page content for [PAGE_NAME]

MANDATORY CONTENT RULES:
❌ FORBIDDEN:
- Real client/company names
- Specific numbers (ANY numbers)
- Emojis (any emoji character)
- Certification claims (ISO, SOC, HIPAA, GDPR, DPDPA)
- Outcome-based case studies (metrics, results, ROI)
- Superlatives ("best", "#1", "leading", "world-class")
- Pricing or currency symbols
- Years of experience or founding dates

✅ ALLOWED:
- Generic descriptions ("experienced provider")
- Abstract scenarios (no client names)
- Process descriptions (no outcomes)
- Professional icons (SVG only)
- Non-numeric phrasing ("many clients", "extensive experience")

TONE: Professional, neutral, non-promissory

REVIEW CHECKLIST:
Before submitting content, verify:
[ ] No real company names
[ ] No numbers/metrics
[ ] No emojis
[ ] No certification claims
[ ] No outcome-based examples
[ ] No superlatives

Proceed with [PAGE_NAME] content.
```

---

### **Phase 3: Technical Implementation**

```
TASK: Implement [FEATURE_NAME]

FOLLOW:
@WEBSITE-DEVELOPMENT-GUIDE.md (Technical Implementation section)

REQUIREMENTS:
1. Mobile-first responsive (375px → 768px → 1280px)
2. Accessibility (WCAG AA: skip link, ARIA labels, keyboard nav)
3. SEO metadata on every page (title, description, canonical)
4. Schema markup: Organization, Service, WebPage ONLY
5. No emojis in any visible content
6. Icons from Heroicons (SVG, 2px stroke)
7. Design tokens from lib/design-tokens.ts

SCHEMA RESTRICTIONS:
✅ Use: Organization, WebPage, Service, BreadcrumbList
❌ Never: AggregateRating, Review, Award, Certification

TEST BEFORE SUBMITTING:
[ ] Mobile (375px)
[ ] Tablet (768px)  
[ ] Desktop (1280px)
[ ] Keyboard navigation works
[ ] No console errors
[ ] Lighthouse score > 90

Proceed with implementation.
```

---

### **Phase 4: Content Audit**

```
TASK: Audit existing website content

REFERENCE: @WEBSITE-DEVELOPMENT-GUIDE.md (Content Rules section)

AUDIT CHECKLIST:
1. Scan ALL pages for:
   [ ] Real client/company names → Remove or anonymize
   [ ] Specific numbers/metrics → Replace with generic phrasing
   [ ] Emojis → Remove completely
   [ ] Certification claims → Remove or rephrase
   [ ] Outcome-based case studies → Convert to process-focused
   [ ] Superlatives → Replace with neutral language
   [ ] Pricing/currency → Remove
   [ ] CTAs/buttons → List all, wait for approval

2. Schema markup audit:
   [ ] Check for forbidden schemas (Rating, Review, Award)
   [ ] Verify only allowed schemas used
   [ ] Remove metrics from schemas

3. Generate audit report with:
   - Page location
   - Issue found
   - Current text
   - Recommended replacement (3 options)
   - WAIT for approval before changing

DO NOT auto-fix. List issues and wait for instructions.
```

---

## 🚨 EMERGENCY STOP PROTOCOL

```
If you encounter ANY of these, STOP and ask:

⚠️ STOP IF:
1. User requests client names → Ask for written permission
2. User requests specific numbers → Confirm they have proof
3. User requests certification claims → Confirm they have current certifications
4. User requests emojis → Remind they're forbidden
5. User requests outcome-based case studies → Suggest process-focused alternative
6. Multiple conflicting instructions → Ask for clarification
7. Unclear button/CTA behavior → List options, don't choose

RESPONSE FORMAT:
"EXECUTION STOPPED

Reason: [Issue]

Options:
A) [Option 1]
B) [Option 2]  
C) [Option 3]

Please specify which option to proceed with."
```

---

## 📝 PRE-LAUNCH INSTRUCTION

```
TASK: Final pre-launch checklist

Run through complete checklist from:
@WEBSITE-DEVELOPMENT-TEMPLATE.md (Pre-Launch Checklist section)

CRITICAL VERIFICATIONS:
[ ] NO client names anywhere
[ ] NO specific numbers/metrics
[ ] NO emojis in visible content
[ ] NO certification claims
[ ] NO outcome-based case studies
[ ] ALL pages have metadata
[ ] Schema markup correct (no forbidden types)
[ ] Mobile responsive (test on real device)
[ ] Accessibility compliant (WCAG AA)
[ ] All CTAs/buttons working
[ ] Forms functional
[ ] Privacy policy + Terms pages exist

Generate final audit report with:
- Total pages checked
- Issues found (with locations)
- Issues fixed
- Remaining issues requiring approval
- Ready for launch? YES/NO

Do NOT mark ready for launch if ANY mandatory rule is violated.
```

---

## 🎯 QUICK COMMAND TEMPLATES

### **Start New Project:**
```
Follow @WEBSITE-DEVELOPMENT-TEMPLATE.md to setup new project:
- Company: [NAME]
- Domain: [DOMAIN]
- Colors: Primary [COLOR], Secondary [COLOR]
- Font: [FONT]

Create design-tokens.ts first, then layout.tsx. Stop after each file for review.
```

### **Audit Existing Content:**
```
Audit this website for content violations:
- Reference: @WEBSITE-DEVELOPMENT-GUIDE.md (Content Rules)
- Check for: client names, numbers, emojis, certifications, outcome-based case studies
- Generate report with page locations and recommended fixes
- DO NOT auto-fix, wait for approval
```

### **Create New Page:**
```
Create [PAGE_NAME] following:
@WEBSITE-DEVELOPMENT-TEMPLATE.md

Rules:
- No client names, numbers, emojis, certifications
- Include metadata (title, description, canonical)
- Add schema: WebPage type only
- Mobile-first responsive
- Accessibility features

Show me the content before implementing.
```

### **Fix Content Issue:**
```
Fix content issue on [PAGE]:
- Current: [CURRENT_TEXT]
- Issue: [PROBLEM]
- Reference: @WEBSITE-DEVELOPMENT-GUIDE.md

Provide 3 alternative phrasings that follow guidelines. Wait for selection.
```

---

## 💾 SAVE THESE AS SNIPPETS

Create Cursor snippets for quick access:

**Snippet 1: `project-init`**
```
Follow @WEBSITE-DEVELOPMENT-TEMPLATE.md
Company: 
Domain: 
Colors: 
Font: 
Start with design-tokens.ts
```

**Snippet 2: `content-audit`**
```
Audit for violations:
@WEBSITE-DEVELOPMENT-GUIDE.md
Check: names, numbers, emojis, certs, outcomes
Report only, no auto-fix
```

**Snippet 3: `new-page`**
```
Create [PAGE] following template
Rules: no names/numbers/emojis/certs
Include: metadata, schema, accessibility
Show before implementing
```

---

## 🔗 REFERENCE IN .CURSORRULES

Add this to your `.cursorrules` file:

```
# ---------------------------------------------------------
# WEBSITE DEVELOPMENT GUIDELINES
# ---------------------------------------------------------

For website projects, ALWAYS follow:
- @WEBSITE-DEVELOPMENT-TEMPLATE.md (primary checklist)
- @WEBSITE-DEVELOPMENT-GUIDE.md (reference/examples)

MANDATORY RULES:
1. NO real client names
2. NO numbers/metrics  
3. NO emojis (STRICTLY FORBIDDEN)
4. NO certification claims
5. NO outcome-based case studies
6. Icons only (no numbered badges)
7. Mobile-first responsive
8. Accessibility required (WCAG AA)
9. Schema: Generic types only (no ratings/reviews)
10. Content safety overrides creativity

See PROJECT-SETUP-INSTRUCTIONS.md for detailed commands.
```

---

## 📖 USAGE EXAMPLES

### **Example 1: Starting AcmeCorp Website**
```
I'm starting acmecorp.com website project.

Follow @WEBSITE-DEVELOPMENT-TEMPLATE.md

Company: AcmeCorp
Domain: acmecorp.com
Industry: IT Services
Country: USA
Primary Color: #3b82f6 (blue)
Secondary Color: #10b981 (green)
Font: Inter

Rules:
- NO client names, numbers, emojis, certifications
- Mobile-first, accessibility required
- Schema: Organization/Service only

Start with design-tokens.ts. Show me the file before creating.
```

### **Example 2: Auditing Existing Site**
```
Audit twikiweb.com for content violations.

Check ALL pages for:
- Real client/company names
- Specific numbers/metrics
- Emojis
- Certification claims (ISO, HIPAA, etc.)
- Outcome-based case studies

Reference: @WEBSITE-DEVELOPMENT-GUIDE.md

Generate report with page locations and issues.
DO NOT fix anything. Wait for approval.
```

### **Example 3: Creating About Page**
```
Create /about page for AcmeCorp.

Follow @WEBSITE-DEVELOPMENT-TEMPLATE.md

Content requirements:
- Tell company story (no specific years/numbers)
- Explain mission (no superlatives)
- Describe team (no team size/employee count)
- No emojis, no certification claims
- Professional, neutral tone

Include:
- Metadata (title, description, canonical)
- Schema: WebPage type
- Mobile responsive
- Accessibility (heading hierarchy, skip link)

Show me content outline before writing full page.
```

---

## ✅ CHECKLIST FOR NEW PROJECT

```
Project: __________________
Date: ____________________

Setup Phase:
[ ] Copied instructions to project
[ ] Filled in company details
[ ] AI confirmed understanding of rules
[ ] Created design-tokens.ts
[ ] Setup Next.js with static export
[ ] Created layout.tsx with schema
[ ] Created sitemap.ts and robots.ts

Content Phase:
[ ] Homepage (audited for violations)
[ ] About page (audited for violations)
[ ] Services pages (audited for violations)
[ ] Contact page (audited for violations)
[ ] Privacy policy (generic template)
[ ] Terms & conditions (generic template)

Technical Phase:
[ ] Mobile responsive (375px, 768px, 1280px)
[ ] Accessibility (WCAG AA compliant)
[ ] SEO metadata on all pages
[ ] Schema markup (approved types only)
[ ] All CTAs/buttons working
[ ] Forms functional

Pre-Launch:
[ ] Final content audit (no violations)
[ ] CTA/button audit complete
[ ] Schema audit (no forbidden types)
[ ] Lighthouse score > 90
[ ] Real device testing complete
[ ] Client approval received

Ready for launch: YES / NO
```

---

## 🚀 QUICK START (Copy-Paste)

**For immediate use, copy this:**

```
New website project following strict guidelines.

@WEBSITE-DEVELOPMENT-TEMPLATE.md (checklist)
@WEBSITE-DEVELOPMENT-GUIDE.md (reference)

Company: [NAME]
Domain: [DOMAIN]
Colors: [PRIMARY], [SECONDARY]
Font: [FONT]

FORBIDDEN:
- Client names
- Numbers/metrics
- Emojis (STRICT)
- Certifications
- Outcome-based case studies
- Superlatives

REQUIRED:
- Mobile-first
- Accessibility
- Schema (generic only)
- Icons (not numbers)

Start with design-tokens.ts. Wait for approval after each step.

Confirm understanding.
```

---

**END OF INSTRUCTIONS**
