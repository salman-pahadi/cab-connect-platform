// FIJI CAB CONNECT Design Tokens - Premium Edition
// Brand colors, typography, spacing, and component styles

export const colors = {
  primary: {
    main: '#10b981',      // Emerald Green (theme accent)
    hover: '#059669',
    light: '#ecfdf5',
    dark: '#047857',
  },
  secondary: {
    main: '#0A84FF',      // Blue (brand)
    hover: '#006FE6',
    light: '#E6F2FF',
    dark: '#005FCC',
  },
  brand: {
    main: '#0A84FF',      // Blue (brand)
    hover: '#006FE6',
    light: '#E6F2FF',
    dark: '#005FCC',
  },
  dark: {
    main: '#000000',      // Pure Black (primary)
    light: '#1a1a1a',
    lighter: '#2d2d2d',
  },
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray900: '#111827',
  },
}

export const typography = {
  fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  display1: 'text-7xl md:text-8xl font-black leading-none tracking-tight',
  display2: 'text-5xl md:text-6xl font-black leading-tight tracking-tight',
  display3: 'text-4xl md:text-5xl font-bold leading-tight tracking-tight',
  h1: 'text-3xl md:text-4xl font-bold leading-snug',
  h2: 'text-2xl md:text-3xl font-bold leading-snug',
  body: 'text-base md:text-lg leading-relaxed',
  small: 'text-sm leading-relaxed',
}

export const spacing = {
  section: 'py-24 md:py-32 px-6 md:px-12 lg:px-20',
  sectionTight: 'py-16 md:py-20 px-6 md:px-12 lg:px-20',
  container: 'max-w-7xl mx-auto',
}

export const components = {
  button: {
    primary: 'bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-full font-semibold transition-all duration-300',
    secondary: 'border-2 border-black text-black hover:bg-black hover:text-white px-10 py-5 rounded-full font-semibold transition-all duration-300',
    accent: 'bg-secondary hover:bg-secondary-hover text-white px-10 py-5 rounded-full font-semibold transition-all duration-300',
  },
  card: 'bg-white rounded-2xl p-8 hover:bg-gray-50 transition-all duration-300',
  input: 'border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all',
}
