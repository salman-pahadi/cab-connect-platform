# 🚀 WEBSITE DEVELOPMENT TEMPLATE
## Professional Corporate Website Best Practices

*A generic template for building professional corporate websites. Based on real-world experience from the TwikiWeb.com project.*

**📖 For detailed case study and examples, see:** `WEBSITE-DEVELOPMENT-GUIDE.md`

---

## 📋 PROJECT SETUP CHECKLIST

```bash
PROJECT NAME: _______________________
DOMAIN: _____________________________
TARGET LAUNCH DATE: _________________
PRIMARY COLOR: ______________________
SECONDARY COLOR: ____________________
ACCENT COLOR: _______________________
FONT CHOICE: ________________________
```

---

## 🎯 CONTENT & COPYWRITING RULES

### ❌ NEVER DO (Critical Content Mistakes to Avoid)

#### 1. **NO Real Company Names or Identifiable Client Information**
```
❌ BAD:
"We built a platform for [Real Company Name] that increased efficiency by 40%"
"Our client [Brand Name] saw amazing results"

✅ GOOD:
"Our first client was a local manufacturing company..."
"A major e-commerce platform saw 40% efficiency increase"
"We worked with a leading financial institution..."
"An enterprise retail client achieved..."
```

**Why:** Legal liability, NDA violations, competitive intelligence exposure.

**Exception:** ONLY use real names with written permission and signed release.

---

#### 2. **NO Specific Numbers Without Proof**
```
❌ BAD:
"500+ clients"
"10,000 projects completed"
"$50M in revenue generated"

✅ GOOD:
"Hundreds of successful projects delivered"
"Many businesses across [YOUR REGION]"
"Significant growth for our clients"
"Worked with everyone from startups to enterprises"
```

---

#### 3. **NO Empty Superlatives**
```
❌ BAD:
"Best in [Country]"
"#1 [Industry] Company"
"Award-winning team" (with no actual awards)
"World-class solutions"

✅ GOOD:
"Experienced [service] provider"
"Trusted technology partner"
"Proven track record across industries"
"Quality-focused development team"
```

---

#### 4. **NO Vague Marketing Fluff**
```
❌ BAD:
• "Established" 
• "Extensive"
• "Diverse"
• "Innovative solutions"

✅ GOOD:
• "Operating since [YEAR]"
• "Expertise across [NUMBER] major industries"
• "Team of specialists in [skill 1], [skill 2], [skill 3]"
• "Custom software tailored to your business needs"
```

**Rule:** Be specific or be silent.

---

#### 5. **NO Stock Photo Testimonials**
```
❌ BAD:
"Great work!" - John Smith, CEO
[Generic stock photo]

✅ BETTER OPTIONS:
A) Real testimonials with first name + industry only:
   "[Your Company] transformed our operations" - [First Name], [Industry]

B) No testimonials section at all (better than fake ones)

C) Case studies without names:
   "A healthcare provider reduced costs by 30%"
```

---

#### 6. **NO "We, We, We" - Make It About Them**
```
❌ BAD:
"We are the best"
"We have 20 years experience"
"We offer cutting-edge solutions"

✅ GOOD:
"Your business deserves reliable technology partners"
"Transform your operations with proven solutions"
"Get the expertise needed to scale"
```

---

#### 7. **NO Dead Content Sections**
```
❌ NEVER CREATE:
• Blog with 2 posts from 2020
• "News" section with no news
• "White Papers" page with no downloads
• "Case Studies" with "Coming Soon"
• "Careers" with no actual jobs

✅ RULE: If you can't maintain it, don't build it.
```

---

#### 8. **NO Emojis (STRICTLY FORBIDDEN)**
```
❌ FORBIDDEN:
• 🚀 🎯 ✨ 💡 ⭐ ANY emojis in visible content
• Emojis in headings, body text, buttons, CTAs

✅ ALLOWED:
• SVG icons from design system only
• Professional icon sets (Heroicons)
• Unicode symbols if part of brand (©, ™)
```

---

#### 9. **NO Certification or Compliance Claims**
```
❌ REMOVE:
• ISO, SOC, HIPAA, PCI, GDPR, DPDPA certifications
• "Certified", "Compliant", "Standards"
• Certification badges
• Regulatory claims

✅ REPLACE WITH:
• "Industry best practices"
• "Professional standards"
• "Security-focused development"
```

---

#### 10. **NO Outcome-Based Case Studies**
```
❌ FORBIDDEN:
• Client names
• Specific outcomes/results
• Metrics ("increased by 40%")
• Before/after claims

✅ ALLOWED:
• Process-focused descriptions
• Technology approach
• Problem-solving methodology
• Anonymous scenarios
```

---

## 🎨 DESIGN SYSTEM SETUP

### 1. **Design Tokens (Create FIRST)**

```typescript
// lib/design-tokens.ts
export const colors = {
  primary: { 
    main: '#______',     // Your primary color
    hover: '#______',    // Darker shade
    light: '#______',    // Lighter shade
  },
  secondary: {
    main: '#______',     // Your secondary color
    hover: '#______',    // Darker shade
  },
  accent: {
    main: '#______',     // Your accent/CTA color
    hover: '#______',    // Darker shade
  },
  neutral: {
    dark: '#0f172a',     // slate-900 (standard)
    medium: '#64748b',   // slate-500 (standard)
    light: '#f1f5f9',    // slate-100 (standard)
  }
}

export const typography = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-semibold',
  h3: 'text-2xl md:text-3xl font-semibold',
  body: 'text-base md:text-lg leading-relaxed',
  small: 'text-sm md:text-base',
}

export const spacing = {
  section: 'py-20 md:py-32 px-6 md:px-12',
  card: 'p-6 md:p-8 lg:p-10',
  grid: 'gap-6 md:gap-8 lg:gap-12',
}

export const components = {
  card: 'bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300',
  button: {
    primary: 'bg-[YOUR_PRIMARY] hover:bg-[YOUR_PRIMARY_DARK] text-white px-6 py-3 rounded-xl font-semibold transition-all',
    secondary: 'border-2 border-[YOUR_PRIMARY] text-[YOUR_PRIMARY] hover:bg-[YOUR_PRIMARY] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all',
  },
  gradient: {
    hero: 'from-[COLOR1] via-[COLOR2] to-[COLOR3]',
    card1: 'from-[COLOR1] via-[COLOR2] to-[COLOR3]',
    card2: 'from-[COLOR1] via-[COLOR2] to-[COLOR3]',
  }
}
```

---

### 2. **Font Selection**

**Recommended Modern Fonts (Google Fonts):**
- ✅ **Plus Jakarta Sans** - Modern geometric, professional (RECOMMENDED)
- ✅ **Inter** - Clean, versatile, widely used
- ✅ **Space Grotesk** - Bold, tech-forward
- ✅ **Outfit** - Ultra-modern, geometric

**Implementation:**
```tsx
// app/layout.tsx
import { Plus_Jakarta_Sans } from 'next/font/google'

const customFont = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-custom',
  weight: ['300', '400', '500', '600', '700', '800'],
})
```

---

### 3. **Icon Strategy**

#### ❌ **NEVER USE:**
- Numbered badges (01, 02, 03...)
- Letters as visual elements (A, B, C...)
- Generic shapes without meaning

#### ✅ **ALWAYS USE:**
- Meaningful SVG icons from Heroicons
- Icons that represent the concept
- Consistent stroke width (2px)

**Source:** https://heroicons.com

---

## 💻 TECHNICAL IMPLEMENTATION

### 1. **Project Structure**

```
[your-project]/
├── app/
│   ├── layout.tsx              # Global layout, fonts, analytics
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design system CSS
│   ├── sitemap.ts              # Auto-generate sitemap.xml
│   ├── robots.ts               # Auto-generate robots.txt
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── services/
│   │   ├── [service-1]/
│   │   ├── [service-2]/
│   │   └── [service-3]/
│   │
│   ├── industries/ (optional)
│   │   ├── [industry-1]/
│   │   └── [industry-2]/
│   │
│   ├── contact/
│   ├── privacy-policy/
│   └── terms-conditions/
│
├── components/
│   ├── Header.tsx              # Navigation
│   ├── Footer.tsx              # Footer
│   └── Hero.tsx                # Reusable hero
│
├── lib/
│   ├── design-tokens.ts        # Design system
│   └── schemas.ts              # Schema.org markup
│
├── public/
│   ├── robots.txt
│   └── _headers
│
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

### 2. **Next.js Configuration**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ✅ Static HTML export
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,  // Creates /about/index.html
}

module.exports = nextConfig
```

---

### 3. **Metadata Template (Copy for Every Page)**

```tsx
// app/[your-page]/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '[Page Title] | [Your Company Name]',
  description: '[150-160 character description with target keywords]',
  keywords: '[keyword1], [keyword2], [keyword3]',
  openGraph: {
    title: '[Page Title]',
    description: '[Description]',
    type: 'website',
    images: ['/og-image.jpg'],  // 1200x630px recommended
  },
  alternates: {
    canonical: 'https://[yourdomain.com]/[page-url]',
  },
}

export default function PageName() {
  return <main>...</main>
}
```

**Rules:**
- ✅ Title: 50-60 characters
- ✅ Description: 150-160 characters
- ✅ Include brand name in title
- ✅ Add canonical URL

---

### 4. **Sitemap Template**

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://[yourdomain.com]'
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-conditions',
  ]
  
  const services = [
    '/services/[service-1]',
    '/services/[service-2]',
    '/services/[service-3]',
  ]
  
  const allRoutes = [...routes, ...services]
  
  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
```

---

### 5. **Robots.txt Template**

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://[yourdomain.com]/sitemap.xml',
  }
}
```

---

### 6. **Layout with Schema Markup**

```tsx
// app/layout.tsx
import { [Your_Font] } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const customFont = [Your_Font]({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-custom',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  metadataBase: new URL('https://[yourdomain.com]'),
  title: {
    default: '[Your Company] - [Your Main Service]',
    template: '%s | [Your Company]'
  },
  description: '[Your company description]',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={customFont.variable}>
      <head>
        {/* Schema.org Organization Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '[Your Company Name]',
              url: 'https://[yourdomain.com]',
              logo: 'https://[yourdomain.com]/logo.png',
              description: '[Your company description]',
              address: {
                '@type': 'PostalAddress',
                addressLocality: '[City]',
                addressRegion: '[State/Province]',
                addressCountry: '[Country Code]',
              },
              sameAs: [
                'https://linkedin.com/company/[yourcompany]',
                'https://twitter.com/[yourcompany]',
              ],
            }),
          }}
        />
      </head>
      <body className={`${customFont.className} antialiased`}>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## 🔍 SEO CHECKLIST

### Schema Markup Rules

#### ✅ **ALLOWED Schema:**
```tsx
• Organization (generic info only)
• WebPage (basic page info)
• Service (no ratings/awards)
• BreadcrumbList (navigation)
```

#### ❌ **FORBIDDEN Schema:**
```tsx
• AggregateRating (no ratings!)
• Review (no reviews!)
• Award (no awards!)
• Certification (no certifications!)
• Metrics (no employee count, years, etc.)
```

**Rule:** Use ONLY generic schemas with NO claims.

---

### Service Page Schema Template

```tsx
// Add to each service page
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Service Name]",
  "provider": {
    "@type": "Organization",
    "name": "[Your Company]"
  },
  "areaServed": "[Country Code]",
  "description": "[Service description]"
}
</script>
```

---

## ♿ ACCESSIBILITY (REQUIRED)

### Skip to Main Content Link

```tsx
// Add to Header component or layout
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
    focus:z-[100] focus:px-6 focus:py-3 focus:bg-[YOUR_PRIMARY] focus:text-white 
    focus:rounded-lg focus:shadow-xl focus:font-bold"
>
  Skip to main content
</a>

// Main content wrapper
<main id="main-content">
  {children}
</main>
```

### Focus Indicators

```css
/* globals.css - REQUIRED */
*:focus-visible {
  @apply outline-none ring-2 ring-[YOUR_PRIMARY] ring-offset-2 rounded;
}

button:focus-visible {
  @apply ring-2 ring-[YOUR_PRIMARY] ring-offset-2;
}

a:focus-visible {
  @apply ring-2 ring-[YOUR_PRIMARY] ring-offset-2 rounded;
}
```

---

## 🔄 DEVELOPMENT WORKFLOW

### Git Commit Pattern

```bash
✅ GOOD COMMITS:
"Initial commit: [Project Name] Next.js website"
"Add: [Feature name] with [details]"
"Fix: [Problem] in [location]"
"Update: [What changed] for [reason]"
"Refactor: [What] to improve [benefit]"

❌ BAD COMMITS:
"Update stuff"
"Fix"
"WIP"
"Changes"
```

### Daily Workflow

```bash
# 1. Start development
npm run dev

# 2. Make changes, test on:
# - http://localhost:3000 (desktop)
# - Chrome DevTools (mobile simulation)

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview

# 5. Commit and push
git add .
git commit -m "[Action]: [What] - [Why]"
git push
```

---

## 🧪 PRE-LAUNCH CHECKLIST

### CTA/BUTTON AUDIT (MUST DO FIRST)
```bash
For EVERY button/CTA, document:
[ ] Page location
[ ] Button text  
[ ] Current behavior (working/broken/unclear)
[ ] Recommended fix options (list 2-3, don't choose)
[ ] Get approval before changing
```

**Rule:** NEVER auto-fix buttons. Always list and wait for approval.

---

### CONTENT
```bash
[ ] All placeholder text replaced
[ ] No "Lorem ipsum"
[ ] No client names without permission
[ ] All links work (no 404s)
[ ] Contact information verified
[ ] Spell check completed
[ ] Grammar check completed
```

### DESIGN
```bash
[ ] Consistent spacing across pages
[ ] Consistent typography
[ ] Icons instead of numbers
[ ] All images optimized (WebP, compressed)
[ ] Mobile responsive (test on real device)
[ ] Tablet responsive
[ ] Desktop looks good up to 1920px
```

### TECHNICAL
```bash
[ ] All pages have metadata
[ ] Schema markup added
[ ] sitemap.xml generated
[ ] robots.txt configured
[ ] Analytics installed
[ ] Forms work and send emails
[ ] 404 page exists
[ ] Privacy policy page
[ ] Terms & conditions page
[ ] Favicon added (16x16, 32x32, 180x180)
[ ] Open Graph images (1200x630)
```

### SEO
```bash
[ ] Google Search Console setup
[ ] Sitemap submitted to Google
[ ] Meta descriptions on all pages
[ ] Alt text on all images
[ ] Heading hierarchy correct (H1 → H2 → H3)
[ ] Canonical URLs set
```

### PERFORMANCE
```bash
[ ] Lighthouse score > 90
[ ] Page load time < 3 seconds
[ ] Core Web Vitals passing
[ ] Images lazy loaded
```

### ACCESSIBILITY
```bash
[ ] WCAG AA compliant
[ ] Keyboard navigation works
[ ] Skip to main content link
[ ] ARIA labels where needed
[ ] Color contrast ratios pass (4.5:1 minimum)
[ ] Focus indicators visible
```

### BROWSER TESTING
```bash
[ ] Chrome (latest)
[ ] Firefox (latest)
[ ] Safari (latest)
[ ] Edge (latest)
[ ] Mobile Safari (iOS)
[ ] Mobile Chrome (Android)
```

### SECURITY
```bash
[ ] SSL certificate active (HTTPS)
[ ] No exposed API keys
[ ] Forms have spam protection
```

---

## 🚀 4-WEEK LAUNCH TIMELINE

### Week 1: Foundation
```bash
[ ] Setup Next.js + TypeScript + Tailwind
[ ] Choose Google Font
[ ] Create design-tokens.ts with your colors
[ ] Create layout.tsx with Header/Footer
[ ] Add schema markup
[ ] Create sitemap.ts
[ ] Setup analytics (Google Analytics)
```

### Week 2: Core Pages
```bash
[ ] Homepage (hero + 3 sections)
[ ] About page (tell your story)
[ ] Contact page (form + info)
[ ] 3-5 service pages (core offerings)
[ ] Add metadata to all pages
[ ] Test mobile responsiveness
```

### Week 3: Polish
```bash
[ ] Replace any number badges with icons
[ ] Implement design system consistently
[ ] Cross-browser test
[ ] Accessibility audit
[ ] Performance optimization
[ ] Deploy to staging
```

### Week 4: Launch
```bash
[ ] Final content review
[ ] Get approvals
[ ] Deploy to production
[ ] Submit sitemap
[ ] Setup Search Console
[ ] Monitor for 7 days
```

---

## 📊 SUCCESS METRICS TO TRACK

### BUSINESS METRICS (Primary):
- Contact form submissions
- Phone calls
- Email inquiries
- Consultation requests

### ENGAGEMENT METRICS:
- Time on key pages (Services, About)
- Pages per session
- Bounce rate on homepage

### SEO METRICS:
- Organic search traffic
- Keyword rankings (top 5 target keywords)
- Click-through rate from search

### TECHNICAL METRICS:
- Page load time
- Core Web Vitals scores
- Uptime percentage (99.9% target)

---

## 🎯 THE 10 COMMANDMENTS

1. ❌ **NO real client names** without written permission
2. ❌ **NO fake numbers** or testimonials (ANY numbers)
3. ❌ **NO vague fluff** ("best", "world-class")
4. ❌ **NO numbered badges** - use meaningful icons
5. ❌ **NO emojis** - STRICTLY FORBIDDEN
6. ❌ **NO certification claims** - (ISO, SOC, HIPAA, GDPR)
7. ❌ **NO outcome-based case studies** - process only
8. ✅ **Design tokens FIRST** - then components
9. ✅ **SEO metadata on EVERY page** - no exceptions
10. ✅ **Mobile-first ALWAYS** - test on 375px
11. ✅ **Accessibility REQUIRED** - skip links, ARIA, keyboard nav
12. ✅ **Ship fast, iterate** - perfect is the enemy of done

**Content Safety Overrides Creativity - ALWAYS.**

---

## 📄 LEGAL PAGES GUIDELINES

### **Privacy Policy & Terms Rules:**

#### ✅ **ALLOWED:**
- Generic, informational language
- Standard clauses
- Simple explanations
- "Informational notice" disclaimers

#### ❌ **FORBIDDEN:**
- Jurisdiction references
- Court specifications
- Compliance claims ("GDPR compliant")
- Legal guarantees
- Binding contracts without lawyer review

### **Template Structure:**

**Privacy Policy:**
```
- Informational notice disclaimer
- What info we collect
- How we use it
- No guarantees of security
- User rights (access, delete, opt-out)
- Contact info
- Last updated date
```

**Terms & Conditions:**
```
- Informational notice disclaimer
- Services provided "as-is"
- User responsibilities
- Prohibited activities
- Limitation of liability
- Changes to terms
- Contact info
- Last updated date
```

**⚠️ IMPORTANT:** Have lawyer review if handling payments, sensitive data, or high-value transactions.

---

## 🔗 USEFUL RESOURCES

**Design:**
- Heroicons: https://heroicons.com
- Google Fonts: https://fonts.google.com
- Color Contrast Checker: https://webaim.org/resources/contrastchecker/
- Color Palette Generator: https://coolors.co

**Development:**
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

**SEO:**
- Schema.org: https://schema.org
- Google Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results

**Testing:**
- Lighthouse: Built into Chrome DevTools
- PageSpeed Insights: https://pagespeed.web.dev
- WAVE Accessibility: https://wave.webaim.org
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

---

## 📝 QUICK REFERENCE CARD

**Before Starting:**
```
1. Choose your colors (primary, secondary, accent)
2. Choose your font (Plus Jakarta Sans recommended)
3. Create design-tokens.ts FIRST
4. Never use real client names
5. Never use fake numbers
```

**Every Page Must Have:**
```
1. Metadata (title, description, keywords)
2. Canonical URL
3. Heading hierarchy (H1 → H2 → H3)
4. Alt text on images
5. Mobile responsiveness
```

**Before Launch:**
```
1. Test on 375px, 768px, 1280px
2. Run Lighthouse (score > 90)
3. Check accessibility (WCAG AA)
4. Submit sitemap to Google
5. Verify analytics working
```

---

## 💡 FINAL TIPS

**Start Small:**
- Launch with 8-10 pages maximum
- Add more only when data proves you need it

**Be Honest:**
- Tell stories, not features
- Admit limitations, it builds trust
- Specific > vague always

**Prioritize:**
1. SEO (gets you found)
2. Clear messaging (gets you understood)
3. Professional design (gets you trusted)
4. Contact form (gets you clients)

Everything else is optional.

---

## 📖 NEED EXAMPLES?

**See the detailed case study:** `WEBSITE-DEVELOPMENT-GUIDE.md`

That guide shows real examples from the TwikiWeb.com project:
- Actual code implementations
- Mistakes we made and how we fixed them
- Real git commit history
- Lessons learned the hard way

---

**Good luck with your project! 🚀**

---

## 📄 TEMPLATE INFO

- **Version:** 1.0
- **Last Updated:** January 2025
- **Based on:** TwikiWeb.com development experience
- **License:** Free to use for any project

---

**COPY THIS TEMPLATE. CUSTOMIZE IT. SHIP IT.** ✨

---

**END OF TEMPLATE**
