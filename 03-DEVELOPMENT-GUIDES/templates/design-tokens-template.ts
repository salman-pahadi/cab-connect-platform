// =========================================================
// DESIGN TOKENS — WEBSITE DESIGN SYSTEM
// =========================================================
// Purpose: Single source of truth for design values
// Usage: Import and use throughout project
// =========================================================

/**
 * QUICK START:
 * 1. If using BRAND-KIT-LITE: Copy industry preset colors below
 * 2. If using BRAND-KIT-FULL: Copy custom colors from brand kit
 * 3. Choose font (Plus Jakarta Sans recommended for 90% of projects)
 * 4. Import: import { colors, typography } from '@/lib/design-tokens'
 */

// ---------------------------------------------------------
// INDUSTRY COLOR PRESETS (90% of projects)
// ---------------------------------------------------------

/**
 * COPY-PASTE YOUR INDUSTRY PRESET:
 * 
 * Tech/SaaS:
 * primary: { main: '#2563eb', hover: '#1d4ed8', light: '#3b82f6' }
 * secondary: { main: '#10b981', hover: '#059669', light: '#34d399' }
 * accent: { main: '#f59e0b', hover: '#d97706' }
 * 
 * Finance/Legal:
 * primary: { main: '#1e40af', hover: '#1e3a8a', light: '#3b82f6' }
 * secondary: { main: '#64748b', hover: '#475569', light: '#94a3b8' }
 * accent: { main: '#dc2626', hover: '#b91c1c' }
 * 
 * Healthcare:
 * primary: { main: '#0ea5e9', hover: '#0284c7', light: '#38bdf8' }
 * secondary: { main: '#10b981', hover: '#059669', light: '#34d399' }
 * accent: { main: '#3b82f6', hover: '#2563eb' }
 * 
 * E-commerce:
 * primary: { main: '#ec4899', hover: '#db2777', light: '#f472b6' }
 * secondary: { main: '#8b5cf6', hover: '#7c3aed', light: '#a78bfa' }
 * accent: { main: '#f59e0b', hover: '#d97706' }
 * 
 * Consulting:
 * primary: { main: '#475569', hover: '#334155', light: '#64748b' }
 * secondary: { main: '#0891b2', hover: '#0e7490', light: '#06b6d4' }
 * accent: { main: '#f97316', hover: '#ea580c' }
 * 
 * Creative/Agency:
 * primary: { main: '#7c3aed', hover: '#6d28d9', light: '#8b5cf6' }
 * secondary: { main: '#ec4899', hover: '#db2777', light: '#f472b6' }
 * accent: { main: '#10b981', hover: '#059669' }
 */

// ---------------------------------------------------------
// YOUR PROJECT COLORS (Fill from preset or custom)
// ---------------------------------------------------------

export const colors = {
  primary: { 
    main: '#______',     // Paste from industry preset OR BRAND-KIT-FULL Section 3
    hover: '#______',    // Darker shade
    light: '#______',    // Lighter shade
  },
  secondary: {
    main: '#______',     // Paste from industry preset OR BRAND-KIT-FULL Section 3
    hover: '#______',    // Darker shade
    light: '#______',    // Lighter shade
  },
  accent: {
    main: '#______',     // Paste from industry preset OR BRAND-KIT-FULL Section 3
    hover: '#______',    // Darker shade
  },
  neutral: {
    dark: '#0f172a',     // slate-900 (standard dark)
    medium: '#64748b',   // slate-500 (standard gray)
    light: '#f1f5f9',    // slate-100 (standard light)
    white: '#ffffff',    // pure white
  },
  semantic: {
    success: '#10b981',  // emerald-500 (for success messages)
    warning: '#f59e0b',  // amber-500 (for warnings)
    error: '#ef4444',    // red-500 (for errors)
    info: '#3b82f6',     // blue-500 (for info)
  }
}

// ---------------------------------------------------------
// TYPOGRAPHY
// ---------------------------------------------------------

export const typography = {
  // Headings (mobile → tablet → desktop)
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-semibold',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg md:text-xl font-semibold',
  h6: 'text-base md:text-lg font-semibold',
  
  // Body text
  body: {
    large: 'text-lg md:text-xl leading-relaxed',
    regular: 'text-base md:text-lg leading-relaxed',
    small: 'text-sm md:text-base leading-relaxed',
    tiny: 'text-xs md:text-sm leading-normal',
  },
  
  // Font weights
  weight: {
    light: 'font-light',      // 300
    regular: 'font-normal',   // 400
    medium: 'font-medium',    // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',        // 700
    extrabold: 'font-extrabold', // 800
  },
}

// ---------------------------------------------------------
// SPACING
// ---------------------------------------------------------

export const spacing = {
  // Section spacing (vertical padding)
  section: {
    mobile: 'py-16 px-6',      // Mobile: 64px top/bottom, 24px sides
    tablet: 'md:py-24 md:px-8',  // Tablet: 96px top/bottom, 32px sides
    desktop: 'lg:py-32 lg:px-12', // Desktop: 128px top/bottom, 48px sides
    combined: 'py-16 md:py-24 lg:py-32 px-6 md:px-8 lg:px-12',
  },
  
  // Card/component padding
  card: {
    small: 'p-4 md:p-6',
    medium: 'p-6 md:p-8 lg:p-10',
    large: 'p-8 md:p-10 lg:p-12',
  },
  
  // Grid gaps
  grid: {
    small: 'gap-4 md:gap-6',
    medium: 'gap-6 md:gap-8 lg:gap-10',
    large: 'gap-8 md:gap-10 lg:gap-12',
  },
  
  // Container
  container: {
    maxWidth: 'max-w-[1400px]',
    padding: 'px-6 md:px-12',
    centered: 'mx-auto',
    full: 'max-w-[1400px] mx-auto px-6 md:px-12',
  }
}

// ---------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------

export const components = {
  // Card styles
  card: {
    base: 'bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300',
    bordered: 'bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200',
    flat: 'bg-white rounded-3xl',
  },
  
  // Button styles
  button: {
    primary: `
      bg-[YOUR_PRIMARY] hover:bg-[YOUR_PRIMARY_DARK] 
      text-white font-semibold 
      px-6 py-3 rounded-xl 
      transition-all duration-300 
      hover:scale-105 hover:shadow-lg
    `.trim().replace(/\s+/g, ' '),
    
    secondary: `
      border-2 border-[YOUR_PRIMARY] 
      text-[YOUR_PRIMARY] hover:bg-[YOUR_PRIMARY] hover:text-white 
      font-semibold px-6 py-3 rounded-xl 
      transition-all duration-300
    `.trim().replace(/\s+/g, ' '),
    
    outline: `
      border-2 border-slate-300 
      text-slate-700 hover:border-slate-400 hover:bg-slate-50 
      font-semibold px-6 py-3 rounded-xl 
      transition-all duration-300
    `.trim().replace(/\s+/g, ' '),
    
    text: `
      text-[YOUR_PRIMARY] hover:text-[YOUR_PRIMARY_DARK] 
      font-semibold underline-offset-4 hover:underline 
      transition-colors duration-200
    `.trim().replace(/\s+/g, ' '),
  },
  
  // Input/form styles
  input: {
    base: `
      w-full px-4 py-3 
      border border-slate-300 rounded-xl 
      focus:outline-none focus:ring-2 focus:ring-[YOUR_PRIMARY] focus:border-transparent 
      transition-all duration-200
    `.trim().replace(/\s+/g, ' '),
    
    error: `
      w-full px-4 py-3 
      border-2 border-red-500 rounded-xl 
      focus:outline-none focus:ring-2 focus:ring-red-500 
      transition-all duration-200
    `.trim().replace(/\s+/g, ' '),
  },
  
  // Badge styles
  badge: {
    base: 'px-3 py-1 rounded-full text-sm font-semibold',
    primary: 'px-3 py-1 rounded-full text-sm font-semibold bg-[YOUR_PRIMARY] text-white',
    secondary: 'px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700',
    success: 'px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700',
  },
  
  // Gradient definitions
  gradient: {
    primary: 'from-[YOUR_PRIMARY] via-[YOUR_PRIMARY_LIGHT] to-[YOUR_SECONDARY]',
    hero: 'from-slate-900 via-[YOUR_PRIMARY] to-[YOUR_SECONDARY]',
    card1: 'from-[YOUR_PRIMARY] via-[YOUR_PRIMARY_LIGHT] to-[YOUR_ACCENT]',
    card2: 'from-[YOUR_SECONDARY] via-[YOUR_SECONDARY_LIGHT] to-[YOUR_ACCENT]',
    text: 'from-[YOUR_PRIMARY] via-[YOUR_SECONDARY] to-[YOUR_ACCENT]',
  }
}

// ---------------------------------------------------------
// ANIMATIONS
// ---------------------------------------------------------

export const animations = {
  transition: {
    fast: 'transition-all duration-200 ease-in-out',
    normal: 'transition-all duration-300 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
  },
  
  hover: {
    scale: 'hover:scale-105 transition-transform duration-300',
    lift: 'hover:-translate-y-2 transition-transform duration-300',
    shadow: 'hover:shadow-xl transition-shadow duration-300',
  },
  
  fade: {
    in: 'animate-fadeIn',
    out: 'animate-fadeOut',
  }
}

// ---------------------------------------------------------
// BREAKPOINTS (for reference)
// ---------------------------------------------------------

/**
 * Tailwind default breakpoints:
 * - sm: 640px   (mobile landscape)
 * - md: 768px   (tablet)
 * - lg: 1024px  (desktop)
 * - xl: 1280px  (large desktop)
 * - 2xl: 1536px (extra large)
 * 
 * Test your designs at:
 * - 375px (mobile portrait - iPhone SE)
 * - 768px (tablet - iPad)
 * - 1280px (desktop - standard laptop)
 */

// ---------------------------------------------------------
// USAGE EXAMPLES
// ---------------------------------------------------------

/**
 * In your components:
 * 
 * import { colors, typography, components } from '@/lib/design-tokens'
 * 
 * // Typography:
 * <h1 className={typography.h1}>Heading</h1>
 * <p className={typography.body.regular}>Body text</p>
 * 
 * // Components:
 * <div className={components.card.base}>Card content</div>
 * <button className={components.button.primary}>Click me</button>
 * 
 * // Spacing:
 * <section className={spacing.section.combined}>
 *   <div className={spacing.container.full}>
 *     <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid.medium}`}>
 *       {items.map(item => (
 *         <div className={components.card.bordered}>...</div>
 *       ))}
 *     </div>
 *   </div>
 * </section>
 * 
 * // Custom styles with color references:
 * <div className="bg-slate-900 text-white">
 *   <span style={{ color: colors.primary.main }}>Accent text</span>
 * </div>
 */

// ---------------------------------------------------------
// CUSTOMIZATION NOTES
// ---------------------------------------------------------

/**
 * BEFORE YOU START:
 * 
 * 1. Choose Your Colors:
 *    - Use https://coolors.co to generate palette
 *    - Verify contrast: https://webaim.org/resources/contrastchecker/
 *    - Ensure WCAG AA compliance (4.5:1 ratio minimum)
 * 
 * 2. Select Your Font:
 *    - Recommended: Plus Jakarta Sans, Inter, Space Grotesk
 *    - Add to app/layout.tsx from next/font/google
 * 
 * 3. Test Responsive:
 *    - Mobile: 375px (iPhone SE)
 *    - Tablet: 768px (iPad)
 *    - Desktop: 1280px (MacBook)
 * 
 * 4. Replace Placeholders:
 *    - [YOUR_PRIMARY] → actual color code
 *    - [YOUR_SECONDARY] → actual color code
 *    - [YOUR_ACCENT] → actual color code
 * 
 * 5. Import Everywhere:
 *    - Never hardcode values
 *    - Always use design tokens
 *    - Ensures consistency
 */

// ---------------------------------------------------------
// END OF DESIGN TOKENS
// ---------------------------------------------------------
