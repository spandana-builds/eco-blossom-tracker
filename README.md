# 🌿 EcoLife

A beautifully designed web app to help you build sustainable daily habits, tend a virtual garden, and stay inspired by nature.



## ✨ Features

- **Daily Eco Habits** — Track rituals like cycling, saving water, meatless meals, recycling, and more. Each habit earns eco points.
- **Eco Score & Streaks** — Watch your lifetime score grow and maintain consecutive-day streaks.
- **Plant Garden** — Add your real plants, set watering intervals, and track when each one needs care with visual progress bars.
- **Inspirational Quotes** — A rotating library of nature-inspired quotes greets you on the hero.
- **Local Persistence** — All your data is saved in your browser via `localStorage` — no account needed.
- **Editorial, Organic Design** — Sage/forest green palette, Fraunces serif display type, smooth Framer Motion animations.

## 🛠 Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** with a custom semantic design system (`moss`, `sage`, `leaf`, `cream`)
- **Framer Motion** for animations
- **Lucide React** for icons
- **shadcn/ui** primitives
- **localStorage** for persistence (via a typed `useLocalStorage` hook)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

The app runs on [http://localhost:8080](http://localhost:8080) by default.

## 📁 Project Structure

```
src/
├── assets/             # Generated botanical imagery
├── components/
│   ├── Hero.tsx        # Hero section with daily quote + stats
│   ├── HabitTracker.tsx# Daily eco-habit toggle cards
│   ├── PlantGarden.tsx # Plant list + watering schedule
│   └── ui/             # shadcn primitives
├── hooks/
│   └── useLocalStorage.ts
├── lib/
│   └── quotes.ts       # Inspirational quote library
├── pages/
│   └── Index.tsx       # Main page
└── index.css           # Design tokens (HSL semantic colors)
```

## 🎨 Design System

All colors are defined as HSL semantic tokens in `src/index.css` and `tailwind.config.ts`. Components reference tokens (e.g. `bg-leaf`, `text-moss`) — never hard-coded colors — so the theme stays consistent and easy to evolve.

## 💾 Data

Everything lives in your browser under these `localStorage` keys:
- `ecolife.habits` — daily habit completions + history
- `ecolife.plants` — your plant list and watering timestamps

Clearing site data resets your progress.

## 📝 License

MIT — tend gently. 🌱
