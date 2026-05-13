# PSG Associate Premium Website - Documentation

## 🎯 Project Overview

**PSG Associate** is a world-class premium corporate website for a leading manpower and business services company. The website combines modern design principles with enterprise-grade functionality to deliver an impressive, conversion-focused user experience.

### Key Features

✅ **Premium Design** - Modern, luxurious aesthetic with professional polish
✅ **Fully Responsive** - Mobile-first design, works flawlessly on all devices
✅ **High Performance** - Optimized for speed and SEO
✅ **Interactive Animations** - Smooth Framer Motion animations throughout
✅ **Multiple Services** - 7 core business services showcased beautifully
✅ **Lead Generation** - Integrated contact, job seeker, and client requirement forms
✅ **Mobile Optimized** - Sticky navbar, floating CTA buttons, optimized forms

---

## 🏗️ Website Structure

### Pages Included

| Page | Route | Purpose |
|------|-------|---------|
| **Homepage** | `/` | Hero, services, testimonials, stats, CTA |
| **Services** | `/services` | Detailed service descriptions with process |
| **About** | `/about` | Company story, team, mission, vision |
| **Contact** | `/contact` | Contact form, location, business hours |
| **Job Seeker** | `/job-seeker` | Job application with resume upload |
| **Client Requirement** | `/client-requirement` | Service request form |
| **404 Page** | `/not-found` | Premium error page |

### Sections on Homepage

1. **Hero Section** - Animated gradient, logo, headline, CTA buttons, stats
2. **Services Grid** - 7 services with icons, descriptions, and features
3. **Why Choose Us** - 6 key differentiators with glassmorphism design
4. **Clients Marquee** - Smooth scrolling client logos (infinite loop)
5. **Testimonials** - Rotating testimonial carousel with controls
6. **Industries Served** - 8 industry categories with emoji icons
7. **FAQ Section** - Expandable questions with smooth animations
8. **CTA Banner** - Final call-to-action with dual buttons

---

## 🎨 Design System

### Color Palette

```
Primary (Navy):    #0A1628
Navy Mid:          #112240
Navy Light:        #1A3A5C
Gold (Accent):     #C9A84C
Gold Light:        #E8C97A
Gold Dark:         #A07830
Off-White:         #F8F9FB
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Hierarchy**: 
  - Hero: clamp(2rem, 6vw, 4rem)
  - Section Title: clamp(1.6rem, 4vw, 2.75rem)
  - Body: 1rem (base)

### Components

- **Buttons**: `.btn-gold`, `.btn-navy`, `.btn-outline-gold`
- **Cards**: `.glass-card`, `.glass-card-white`, `.card-hover`
- **Forms**: `.input-field` with icon support
- **Badges**: `.gold-badge` (premium pill badges)
- **Icons**: Lucide React Icons (18-24px sizes)

---

## 🛠️ Technology Stack

```
Frontend:
  - Next.js 16.2.6 (App Router)
  - React 19.2.4
  - TypeScript 5
  - Tailwind CSS 4
  
Animations:
  - Framer Motion 12.38.0
  
Icons:
  - Lucide React 1.14.0
  
Forms:
  - React Hook Form 7.75.0
  - Zod 4.4.3
  
Backend:
  - Nodemailer 8.0.7 (Email)
  
Development:
  - ESLint 9
  - Turbopack (bundler)
```

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   cd /c/Users/ruchi/ppcp/psg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # .env.local
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   NEXT_PUBLIC_URL=https://yourdomain.com
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Visit: `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 📧 Email Configuration

The website uses **Nodemailer** with Gmail SMTP for email delivery.

### Setup Gmail SMTP

1. Enable 2-factor authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the 16-character password in `.env.local`

### Email Templates

**Contact Form** → Admin receives inquiry, user gets confirmation
**Job Seeker Form** → Admin receives application, user gets confirmation
**Client Requirement** → Admin receives requirement, client gets confirmation

---

## 🎬 Animation Features

### Scroll Animations

- **Fade-up**: Elements fade in while scrolling up into view
- **Stagger**: Cards animate with staggered delays
- **Scale**: Hover effects with smooth scale transitions

### Hero Section

- Animated gradient background
- Floating glass orbs with blur effects
- Bouncing scroll indicator
- Logo pop-in animation

### Interactive Elements

- Button hover lift (translateY(-2px))
- Card hover with shadow elevation
- Icon animations on service cards
- Smooth page transitions

### Animation Library Usage

```typescript
// Fade-up animation on scroll
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Stagger children
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Usage with component
<motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
  {/* Content */}
</motion.div>
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind CSS)

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

### Mobile-First Features

✅ Sticky navbar with mobile menu
✅ Hamburger menu with smooth animations
✅ Touch-friendly button sizes (min 48px height)
✅ Optimized form inputs (prevents zoom on iOS)
✅ Floating WhatsApp button (repositioned on mobile)
✅ Stacked layout for forms and grids
✅ Font size adjustments for readability

---

## ♿ Accessibility

### Implemented Features

- ✅ Semantic HTML structure
- ✅ Skip-to-main-content link
- ✅ ARIA labels on icons and buttons
- ✅ Color contrast ratios (WCAG AA compliant)
- ✅ Keyboard navigation support
- ✅ Form validation with error messages
- ✅ Alt text on images
- ✅ Proper heading hierarchy

### Schema Markup

LocalBusiness schema included in layout for SEO.

---

## 📈 SEO Optimization

### Implemented SEO Features

- ✅ Meta titles and descriptions
- ✅ Open Graph tags (social sharing)
- ✅ Twitter cards
- ✅ Sitemap-ready structure
- ✅ Schema.org LocalBusiness markup
- ✅ Mobile-friendly design
- ✅ Fast Core Web Vitals
- ✅ Semantic HTML

### Key Meta Tags

```typescript
title: "PSG Associate | Manpower & Business Services - Rewari, Haryana"
description: "Complete workforce & business service solutions. Manpower supply, security, housekeeping, facility management, IT services."
keywords: "manpower agency, security services, housekeeping, facility management"
```

---

## 🔒 Security Features

### Implemented Security

- ✅ Rate limiting on API endpoints (3 requests per minute)
- ✅ HTML escaping in email templates (XSS prevention)
- ✅ Form validation with Zod schemas
- ✅ CORS configuration ready
- ✅ Environment variables for sensitive data
- ✅ No hardcoded credentials

### API Rate Limiting

```typescript
// 3 requests per 60 seconds per IP
const rateLimit = (ip: string, limit: number, window: number) => {
  // Implementation in /lib/rateLimit.ts
};
```

---

## 📊 Performance Metrics

### Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Turbopack for fast builds
- ✅ CSS minification (Tailwind)
- ✅ JavaScript tree-shaking
- ✅ Font optimization (display: swap)
- ✅ Static page prerendering

### Build Output

```
Route (app)
├ ○ / (static)
├ ○ /about (static)
├ ○ /services (static)
├ ○ /contact (static)
├ ○ /job-seeker (static)
├ ○ /client-requirement (static)
├ ✓ /api/* (dynamic)
└ ○ /_not-found (static)
```

---

## 🚀 Deployment

### Recommended Platforms

1. **Vercel** (Recommended - Next.js native)
   - Connect GitHub repo
   - Auto-deploy on push
   - Built-in CDN and analytics

2. **Netlify**
   - Compatible with Next.js
   - Serverless functions for APIs

3. **Self-hosted**
   - Node.js server
   - PM2 for process management

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Email credentials set up
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Email templates tested
- [ ] Forms tested end-to-end
- [ ] Performance audited (Lighthouse)
- [ ] SEO verified (Google Search Console)

---

## 🔧 Customization Guide

### Changing Colors

Edit `/app/globals.css`:
```css
:root {
  --navy: #0a1628;
  --gold: #c9a84c;
  /* Update other colors */
}
```

### Modifying Services

Edit `const services = []` in `/app/page.tsx`:
```typescript
const services = [
  { icon: Users, label: "Service Name", desc: "Description" },
  // Add more services
];
```

### Updating Contact Info

Search for `GSTIN`, `phone`, `email` throughout the codebase:
- `/app/layout.tsx` (metadata)
- `/components/Footer.tsx` (contact details)
- `/app/contact/page.tsx` (contact form)

### Adding New Pages

1. Create folder: `/app/new-page`
2. Create file: `page.tsx`
3. Follow existing page structure
4. Add route to navbar in `/components/Navbar.tsx`

---

## 🐛 Troubleshooting

### Issue: Emails not sending

**Solution**: 
- Verify Gmail app password in .env.local
- Check SMTP credentials are correct
- Enable "Less secure app access" if needed
- Check Gmail account security settings

### Issue: Forms not submitting

**Solution**:
- Verify API route exists and is correct
- Check browser console for errors
- Ensure rate limiting isn't blocking requests
- Verify form validation schema

### Issue: Animations not smooth

**Solution**:
- Check browser performance (DevTools)
- Reduce animation complexity on mobile
- Ensure GPU acceleration is enabled
- Profile with Lighthouse

### Issue: Responsive layout broken

**Solution**:
- Check Tailwind breakpoints
- Use DevTools device emulation
- Test on real devices
- Check for hardcoded widths

---

## 📞 Support & Contact

**Company**: PSG Associate
**Phone**: +91 93130 45554
**Email**: psgassociate1@gmail.com
**Website**: https://psgassociate.com
**Location**: 167/3 Uttam Nagar, Rewari, Haryana 123401

---

## 📄 License

This website is proprietary and designed for PSG Associate.

---

## ✅ Project Completion Checklist

- ✅ Homepage with all sections
- ✅ Services page with details
- ✅ About page with company story
- ✅ Contact page with form
- ✅ Job seeker form with file upload
- ✅ Client requirement form
- ✅ 404 error page
- ✅ Responsive design (mobile-first)
- ✅ Premium animations
- ✅ Email integration
- ✅ SEO optimization
- ✅ Accessibility compliance
- ✅ Security implementation
- ✅ Performance optimization

---

**Last Updated**: May 13, 2026
**Version**: 1.0.0
**Status**: Production Ready ✨
