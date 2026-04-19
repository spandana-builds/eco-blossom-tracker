import { useState, useCallback } from "react";
import { Hero } from "@/components/Hero";
import { HabitTracker } from "@/components/HabitTracker";
import { PlantGarden } from "@/components/PlantGarden";

const Index = () => {
  const [stats, setStats] = useState({ score: 0, streak: 0, completedToday: 0, total: 6 });
  const handleStats = useCallback((s: typeof stats) => setStats(s), []);

  return (
    <main className="min-h-screen bg-background">
      <header className="container flex items-center justify-between py-6">
        <a href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-leaf flex items-center justify-center text-primary-foreground font-display italic">e</span>
          <span className="font-display text-xl text-moss tracking-tight">EcoLife</span>
        </a>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#habits" className="hover:text-moss transition-colors">Habits</a>
          <a href="#garden" className="hover:text-moss transition-colors">Garden</a>
          <span className="text-moss">{stats.score} pts</span>
        </nav>
      </header>

      <Hero score={stats.score} streak={stats.streak} />

      <div id="habits">
        <HabitTracker onStats={handleStats} />
      </div>

      <div id="garden">
        <PlantGarden />
      </div>

      <footer className="container py-12 text-center text-xs text-muted-foreground tracking-widest uppercase">
        Tend gently · EcoLife © {new Date().getFullYear()}
      </footer>
    </main>
  );
};

export default Index;
