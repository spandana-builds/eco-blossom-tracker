import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";

type Plant = {
  id: string;
  name: string;
  species: string;
  intervalDays: number;
  lastWatered: string; // ISO date
};

const seed: Plant[] = [
  { id: "1", name: "Olive", species: "Monstera Deliciosa", intervalDays: 7, lastWatered: new Date(Date.now() - 5 * 86_400_000).toISOString() },
  { id: "2", name: "Fern Bueller", species: "Boston Fern", intervalDays: 3, lastWatered: new Date(Date.now() - 2 * 86_400_000).toISOString() },
  { id: "3", name: "Prickle", species: "Aloe Vera", intervalDays: 14, lastWatered: new Date(Date.now() - 9 * 86_400_000).toISOString() },
];

const daysSince = (iso: string) => Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);

export const PlantGarden = () => {
  const [plants, setPlants] = useLocalStorage<Plant[]>("ecolife.plants", seed);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: "", species: "", intervalDays: 7 });

  const water = (id: string) =>
    setPlants((p) => p.map((x) => (x.id === id ? { ...x, lastWatered: new Date().toISOString() } : x)));

  const remove = (id: string) => setPlants((p) => p.filter((x) => x.id !== id));

  const addPlant = () => {
    if (!draft.name.trim()) return;
    setPlants((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        name: draft.name,
        species: draft.species || "Houseplant",
        intervalDays: Math.max(1, Number(draft.intervalDays) || 7),
        lastWatered: new Date().toISOString(),
      },
    ]);
    setDraft({ name: "", species: "", intervalDays: 7 });
    setAdding(false);
  };

  return (
    <section className="bg-warm border-y border-border">
      <div className="container py-20">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-leaf mb-3">02 — The Garden</p>
            <h2 className="font-display text-4xl md:text-5xl text-moss tracking-tight">
              Your plants, <em className="italic font-light">happily watered.</em>
            </h2>
          </div>
          <button
            onClick={() => setAdding((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-moss text-primary-foreground px-5 py-3 text-sm hover:bg-leaf transition-colors shadow-soft"
          >
            <Plus className="h-4 w-4" /> Add plant
          </button>
        </div>

        <AnimatePresence>
          {adding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="grid sm:grid-cols-4 gap-3 bg-card rounded-2xl p-5 border border-border shadow-soft">
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Name (e.g. Olive)"
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
                />
                <input
                  value={draft.species}
                  onChange={(e) => setDraft({ ...draft, species: e.target.value })}
                  placeholder="Species"
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
                />
                <input
                  type="number"
                  min={1}
                  value={draft.intervalDays}
                  onChange={(e) => setDraft({ ...draft, intervalDays: Number(e.target.value) })}
                  placeholder="Water every N days"
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
                />
                <button
                  onClick={addPlant}
                  className="rounded-lg bg-leaf text-primary-foreground text-sm font-medium hover:bg-moss transition-colors"
                >
                  Plant it
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {plants.map((plant, i) => {
              const since = daysSince(plant.lastWatered);
              const overdue = since >= plant.intervalDays;
              const progress = Math.min(100, (since / plant.intervalDays) * 100);
              return (
                <motion.article
                  key={plant.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative rounded-3xl bg-card border border-border p-6 shadow-soft overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-leaf/10 blur-2xl" />
                  <div className="flex items-start justify-between relative">
                    <div>
                      <h3 className="font-display text-3xl text-moss leading-tight">{plant.name}</h3>
                      <p className="text-sm text-muted-foreground italic">{plant.species}</p>
                    </div>
                    <button
                      onClick={() => remove(plant.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-2"
                      aria-label="Remove plant"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>{since === 0 ? "Watered today" : `${since}d since watering`}</span>
                      <span>every {plant.intervalDays}d</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                        className={`h-full rounded-full ${overdue ? "bg-destructive" : "bg-leaf"}`}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => water(plant.id)}
                    className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all ${
                      overdue
                        ? "bg-moss text-primary-foreground hover:bg-leaf"
                        : "bg-secondary text-moss hover:bg-leaf hover:text-primary-foreground"
                    }`}
                  >
                    <Droplet className="h-4 w-4" />
                    {overdue ? "Water now" : "Mark watered"}
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
