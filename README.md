# 🦅 RAVEN Tutorials — Premier Learning & LMS Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat-square&logo=greensock)](https://greensock.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?style=flat-square&logo=mongodb)](https://mongodb.com/)

A modern, high-performance coaching and educational LMS platform for Board exams, JEE, and NEET preparation. Designed with a unique **Cartoon Neobrutalism** aesthetic and powered by an ultra-smooth, hardware-accelerated **GSAP 3** motion engine.

---

## 🎨 Design Philosophy: Cartoon Neobrutalism

- **Bold Contours**: 2px–3px solid black borders (`#000000`) on cards, buttons, badges, and modals.
- **Hard Cartoon Drop Shadows**: Distinct 2px–8px solid offset drop shadows (`shadow-[4px_4px_0px_#000]`).
- **Tactile Click Feedback**: Interactive physical button depression on click (`active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]`).
- **Playful Color Harmony**: Fresh mint green backgrounds (`#f0fdf4`), sunny yellow badges (`#fef08a`), and crisp white card faces.
- **Modern Typography**: Powered by Google Fonts:
  - **Outfit**: Ultra-bold cartoon headings & display banners
  - **Plus Jakarta Sans**: High-clarity body & interface text
  - **Space Grotesk**: Playful retro-tech stickers & badges
  - **JetBrains Mono**: Clean tabular numbers & registration IDs

---

## 🚀 GSAP Motion & Smooth Transition Engine

Raven Tutorials uses a centralized GSAP system in `src/lib/gsap.ts` with 60–120 FPS hardware acceleration:

### 1. Zero-FOUC Dropdowns & Pickers
- **`CartoonDropdown`**: Initial zero-flash styling with dual `isOpen` and `isMounted` state tracking.
- **Cascading Option Stagger**: Options glide in with spring cascade (`ease: 'power2.out'`).
- **Chevron Rotation**: Smooth 180° flip (`ease: 'back.out(2.2)'`) without conflicting CSS transitions.
- **Rapid Toggle Safety**: Resilient animation cancellation and lifecycle tween cleanup on unmount.

### 2. Global Page Route Transitions
- **`animatePageEnter`**: Smooth page entrance with subtle spring lift and transform property cleanup upon arrival.
- **Top Route Progress Bar**: Animated neon emerald/gold route progress bar in `ClientLayout.tsx`.
- **Automatic ScrollTrigger Cleanup**: Purges orphaned triggers on unmount to prevent scroll jank.

### 3. Directional ScrollTrigger Animations
- `scrollFromLeft`, `scrollFromRight`, `scrollFromUp`, `scrollFromDown`
- `scrollStaggerDirectional` with alternating, cross, and cascading patterns

---

## 📂 Project Architecture

```
Raven-Tutorials/
├── src/
│   ├── app/                    # Next.js 14 App Router routes
│   │   ├── (auth)/             # Authentication routes (login, signup)
│   │   ├── admin/              # Admin dashboard & management panels
│   │   ├── api/                # Next.js API route handlers
│   │   ├── courses/            # Course catalog & detail pages
│   │   ├── dashboard/          # Student portal dashboard
│   │   ├── rsat/               # Raven Scholarship & Aptitude Test
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   └── globals.css         # Cartoon neobrutalism design system tokens
│   ├── components/             # Reusable UI & layout components
│   │   ├── ui/                 # CartoonDropdown, CartoonDatePicker, Card, Input
│   │   ├── admin/              # Admin protected routes & dashboard layouts
│   │   ├── lms/                # CourseCard, LMSFooter, Sidebar
│   │   ├── ClientLayout.tsx    # Global GSAP page transition coordinator
│   │   └── Navbar.tsx          # Animated capsule navbar & mobile drawer
│   ├── constants/              # Courses, classes, and test definitions
│   ├── context/                # Admin & auth context providers
│   ├── lib/                    # GSAP engine, scrollLock, db, email utilities
│   ├── models/                 # Mongoose schemas & data models
│   └── types/                  # TypeScript interface definitions
├── public/                     # Static media & brand assets
├── vercel.json                 # Vercel deployment configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm** or **pnpm**
- **MongoDB**: Local or Atlas connection URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sin-07/Raven-Tutorials.git
   cd Raven-Tutorials
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📜 License

Created with ❤️ by **Aniket Singh** for RAVEN Tutorials. All rights reserved.
