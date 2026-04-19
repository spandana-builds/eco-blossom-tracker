import { motion } from "framer-motion";
import { quoteOfTheDay } from "@/lib/quotes";
import heroLeaf from "@/assets/hero-leaf.jpg";

export const Hero = ({ score, streak }: { score: number; streak: number }) => {
  const q = quoteOfTheDay();
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 grain opacity-60 pointer-events-none" />
      <div className="container relative grid md:grid-cols-12 gap-8 py-16 md:py-24">
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-moss/70"
          >
            <span className="h-px w-8 bg-moss/40" /> EcoLife · Today
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-moss mt-6 text-balance"
          >
            Live <em className="italic font-light text-leaf">gently</em>,
            <br /> grow <em className="italic font-light text-leaf">daily</em>.
          </motion.h1>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 max-w-md font-display italic text-lg text-foreground/70 border-l-2 border-leaf/40 pl-5"
          >
            "{q.text}"
            <footer className="not-italic font-body text-xs uppercase tracking-widest mt-2 text-muted-foreground">
              — {q.author}
            </footer>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <StatChip label="Eco Score" value={score} suffix="pts" />
            <StatChip label="Streak" value={streak} suffix={streak === 1 ? "day" : "days"} />
            <StatChip label="Today" value={new Date().toLocaleDateString(undefined, { weekday: "long" })} />
          </motion.div>
        </div>

        <div className="md:col-span-5 relative flex items-center justify-center min-h-[280px]">
          <motion.img
            src={heroLeaf}
            alt="Botanical illustration of monstera and fern leaves"
            width={1280}
            height={1280}
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="w-full max-w-md object-contain mix-blend-multiply animate-sway"
            style={{ filter: "drop-shadow(0 30px 40px hsl(var(--moss) / 0.2))" }}
          />
        </div>
      </div>
    </section>
  );
};

const StatChip = ({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) => (
  <div className="rounded-full bg-card/70 backdrop-blur border border-border px-5 py-3 shadow-soft">
    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className="font-display text-xl text-moss leading-tight">
      {value} {suffix && <span className="text-sm text-muted-foreground font-body">{suffix}</span>}
    </div>
  </div>
);
