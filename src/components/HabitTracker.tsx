import { motion, AnimatePresence } from "framer-motion";
import { Bike, Sprout, Droplets, Leaf, Recycle, Sun, Check } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useMemo } from "react";

type Habit = { id: string; label: string; icon: keyof typeof iconMap; points: number };

const iconMap = { Bike, Sprout, Droplets, Leaf, Recycle, Sun };

const HABITS: Habit[] = [
  { id: "cycle", label: "Cycled or walked", icon: "Bike", points: 15 },
  { id: "plant", label: "Tended a plant", icon: "Sprout", points: 10 },
  { id: "water", label: "Saved water", icon: "Droplets", points: 10 },
  { id: "meatless", label: "Meatless meal", icon: "Leaf", points: 12 },
  { id: "recycle", label: "Recycled or reused", icon: "Recycle", points: 8 },
  { id: "energy", label: "Used less energy", icon: "Sun", points: 10 },
];

const todayKey = () => new Date().toISOString().slice(0, 10);

type State = {
  date: string;
  done: string[];
  history: Record<string, string[]>; // date -> habit ids
};

export const HabitTracker = ({
  onStats,
}: {
  onStats: (s: { score: number; streak: number; completedToday: number; total: number }) => void;
}) => {
  const [state, setState] = useLocalStorage<State>("ecolife.habits", {
    date: todayKey(),
    done: [],
    history: {},
  });

  // Roll over date
  useEffect(() => {
    if (state.date !== todayKey()) {
      setState((s) => ({
        date: todayKey(),
        done: [],
        history: { ...s.history, [s.date]: s.done },
      }));
    }
  }, [state.date, setState]);

  const stats = useMemo(() => {
    const fullHistory = { ...state.history, [state.date]: state.done };
    const score = Object.values(fullHistory).flat().reduce((acc, id) => {
      const h = HABITS.find((x) => x.id === id);
      return acc + (h?.points ?? 0);
    }, 0);

    // streak: consecutive days back from today with >=1 habit
    let streak = 0;
    const d = new Date();
    while (true) {
      const key = d.toISOString().slice(0, 10);
      const list = fullHistory[key] ?? [];
      if (list.length > 0) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        // allow today to be empty without breaking streak
        if (key === todayKey()) {
          d.setDate(d.getDate() - 1);
          continue;
        }
        break;
      }
    }
    return { score, streak, completedToday: state.done.length, total: HABITS.length };
  }, [state]);

  useEffect(() => {
    onStats(stats);
  }, [stats, onStats]);

  const toggle = (id: string) => {
    setState((s) => ({
      ...s,
      done: s.done.includes(id) ? s.done.filter((x) => x !== id) : [...s.done, id],
    }));
  };

  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-leaf mb-3">01 — Daily Rituals</p>
          <h2 className="font-display text-4xl md:text-5xl text-moss tracking-tight">
            Small acts. <em className="italic font-light">Growing roots.</em>
          </h2>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl text-moss">
            {stats.completedToday}<span className="text-muted-foreground">/{stats.total}</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">today</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HABITS.map((h, i) => {
          const Icon = iconMap[h.icon];
          const active = state.done.includes(h.id);
          return (
            <motion.button
              key={h.id}
              onClick={() => toggle(h.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative text-left rounded-2xl border p-6 transition-all duration-500 overflow-hidden ${
                active
                  ? "bg-leaf border-leaf text-primary-foreground shadow-glow"
                  : "bg-card border-border hover:border-leaf/40 shadow-soft"
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                    active ? "bg-primary-foreground/15" : "bg-secondary"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${active ? "text-primary-foreground" : "text-leaf"}`} strokeWidth={1.5} />
                </div>
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className="h-7 w-7 rounded-full bg-primary-foreground/20 flex items-center justify-center"
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <h3 className={`font-display text-2xl mt-6 ${active ? "" : "text-moss"}`}>{h.label}</h3>
              <p className={`text-sm mt-1 ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                +{h.points} eco points
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
