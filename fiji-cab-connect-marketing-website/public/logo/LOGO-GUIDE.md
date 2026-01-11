# 🎨 FIJI CAB CONNECT - LOGO USAGE GUIDE

## 📦 **LOGO FILES AVAILABLE**

### **1. Horizontal Logo** (`logo-horizontal.svg`)
- **Usage:** Primary logo for headers, navigation, website
- **Layout:** Icon on left, text on right
- **Best For:** Desktop headers, wide spaces
- **Dimensions:** 240x48px (scalable)

### **2. White Logo** (`logo-white.svg`)
- **Usage:** On dark backgrounds (black, blue, green)
- **Layout:** Same as horizontal, all white elements
- **Best For:** Dark mode, colored backgrounds, footer
- **Dimensions:** 240x48px (scalable)

### **3. Icon Only** (`logo-icon.svg`)
- **Usage:** App icon, social media profile, favicon
- **Layout:** Just the cab icon, no text
- **Best For:** Square spaces, small sizes
- **Dimensions:** 64x64px (scalable)

### **4. Stacked Logo** (`logo-stacked.svg`)
- **Usage:** Mobile headers, square spaces
- **Layout:** Icon on top, text below
- **Best For:** Mobile apps, vertical layouts
- **Dimensions:** 140x100px (scalable)

### **5. Favicon** (`favicon.svg`)
- **Usage:** Browser tab icon
- **Layout:** Ultra-simplified cab icon
- **Best For:** 16x16px to 32x32px sizes
- **Dimensions:** 32x32px

---

## 🎨 **LOGO DESIGN PHILOSOPHY**

### **Luxury Minimalism**
Inspired by: **Uber, Bolt, Tesla, Apple**

**Key Elements:**
1. **Modern Cab Icon**
   - Sleek, geometric design
   - Clean lines and rounded edges
   - Premium feel with subtle details
   - Works at any size (16px to 2000px)

2. **Bold Typography**
   - "FIJI" in large, bold letters (primary blue)
   - "CAB CONNECT" in smaller, professional font
   - Plus Jakarta Sans (800 weight for FIJI, 700 for CAB CONNECT)

3. **Premium Color Palette**
   - Primary Blue: `#0A84FF` (vibrant, modern)
   - Accent Gold: `#FFD60A` (headlights, premium touch)
   - Dark: `#1C1C1E` (wheels, contrast)
   - Light Blue: `#5EACFF` (wheel centers, highlights)

4. **Subtle Details**
   - Gold headlight accent (premium touch)
   - Translucent windows (depth)
   - Dual-tone wheels (sophistication)
   - Minimal accent line (elegance)

---

## ✅ **USAGE RULES**

### **DO:**
- ✅ Use on white/light backgrounds (horizontal logo)
- ✅ Use white version on dark backgrounds
- ✅ Maintain clear space (minimum 20px around logo)
- ✅ Scale proportionally (never stretch)
- ✅ Use SVG format for web (best quality)

### **DON'T:**
- ❌ Change colors (use provided versions only)
- ❌ Add effects (shadows, glows, gradients)
- ❌ Stretch or distort the logo
- ❌ Place on busy backgrounds without backdrop
- ❌ Rotate or flip the logo
- ❌ Use low-resolution versions

---

## 📐 **CLEAR SPACE**

Minimum clear space around logo = **Height of the "F" in FIJI**

```
┌─────────────────────────────────┐
│         [CLEAR SPACE]           │
│   ┌─────────────────────┐       │
│   │  [FIJI CAB LOGO]    │       │
│   └─────────────────────┘       │
│         [CLEAR SPACE]           │
└─────────────────────────────────┘
```

---

## 🎯 **WHEN TO USE WHICH VERSION**

| Context | Logo Version | Background |
|---------|--------------|------------|
| Website Header | `logo-horizontal.svg` | White/Light |
| Mobile Header | `logo-stacked.svg` | White/Light |
| Dark Mode Header | `logo-white.svg` | Dark |
| Footer | `logo-white.svg` | Black/Dark Blue |
| App Icon (iOS/Android) | `logo-icon.svg` | Gradient background |
| Browser Tab | `favicon.svg` | Any |
| Social Media Profile | `logo-icon.svg` | White/Light |
| Email Signature | `logo-horizontal.svg` | White |
| Business Card | `logo-horizontal.svg` | White |
| Vehicle Decal | `logo-white.svg` | Dark vehicle color |

---

## 🖼️ **BACKGROUND COLORS**

### **Works Best On:**
- ✅ White (`#FFFFFF`)
- ✅ Light Gray (`#F2F2F7`)
- ✅ Black (`#1C1C1E`) - use white version
- ✅ Dark Blue (`#0A84FF`) - use white version
- ✅ Dark backgrounds - use white version

### **Avoid:**
- ❌ Busy patterns
- ❌ Low contrast backgrounds
- ❌ Gradients (unless logo has solid backdrop)

---

## 💻 **IMPLEMENTATION CODE**

### **React/Next.js:**

```tsx
import Image from 'next/image'

// Horizontal Logo (Header)
<Image
  src="/logo/logo-horizontal.svg"
  alt="FIJI CAB CONNECT"
  width={180}
  height={40}
  priority
/>

// White Logo (Dark backgrounds)
<Image
  src="/logo/logo-white.svg"
  alt="FIJI CAB CONNECT"
  width={180}
  height={40}
/>

// Icon Only (App icon, favicon)
<Image
  src="/logo/logo-icon.svg"
  alt="FIJI CAB CONNECT"
  width={48}
  height={48}
/>
```

### **HTML:**

```html
<!-- Horizontal Logo -->
<img 
  src="/logo/logo-horizontal.svg" 
  alt="FIJI CAB CONNECT" 
  width="180" 
  height="40"
/>

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/logo/favicon.svg" />
```

---

## 🎨 **COLOR SPECIFICATIONS**

### **Primary Colors Used:**

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Blue | `#0A84FF` | Car body, "FIJI" text |
| Dark | `#1C1C1E` | Wheels, "CAB CONNECT" text |
| Accent Gold | `#FFD60A` | Headlights, premium accents |
| Light Blue | `#5EACFF` | Wheel centers, highlights |
| White | `#FFFFFF` | Windows, white logo version |

---

## 📱 **APP ICON SPECIFICATIONS**

### **iOS:**
- **Size:** 1024x1024px
- **Format:** PNG (no transparency)
- **File:** Export `logo-icon.svg` at 1024x1024

### **Android:**
- **Size:** 512x512px
- **Format:** PNG (with transparency)
- **File:** Export `logo-icon.svg` at 512x512

### **Favicon:**
- **Size:** 32x32px, 16x16px
- **Format:** SVG (preferred) or ICO
- **File:** `favicon.svg` or `favicon.ico`

---

## 🚀 **EXPORT SETTINGS**

### **For Web (SVG):**
- Use provided SVG files as-is
- No compression needed
- Scalable to any size

### **For Print (PNG):**
```
Export at:
- 2000px width (high-res)
- 300 DPI
- Transparent background
```

### **For Social Media:**
```
Profile Picture:
- 512x512px (logo-icon.svg)
- PNG format
- White or light background

Cover Photo:
- 1920x1080px (logo-horizontal.svg)
- PNG format
- Centered with brand colors
```

---

## ✨ **PREMIUM DESIGN FEATURES**

1. **Modern Minimalism**
   - Clean geometric shapes
   - No unnecessary details
   - Inspired by Uber/Bolt simplicity

2. **Luxury Touches**
   - Gold headlight accents
   - Subtle gradients in app icon
   - Premium blue color palette
   - Refined typography

3. **Scalability**
   - Works from 16px (favicon) to 2000px (billboard)
   - Maintains clarity at all sizes
   - SVG format for infinite scaling

4. **Professional Typography**
   - Plus Jakarta Sans (modern, clean)
   - Bold weights for impact
   - Perfect letter spacing

---

## 📞 **QUESTIONS?**

For logo customization or additional formats:
- **Email:** creativerse360@gmail.com
- **Phone:** +91 8128557443

---

## ✅ **APPROVAL**

**Logo Version:** 2.0 (Luxury Minimalism Redesign)  
**Created:** January 2, 2026  
**Status:** ✅ Approved for Production  
**Design Philosophy:** Uber + Bolt + Tesla + Apple

---

**Your premium logo is ready to make FIJI CAB CONNECT stand out!** 🚖✨
