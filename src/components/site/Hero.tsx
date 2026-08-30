import { motion } from "motion/react";
import heroBg from "@/assets/hero-bg.jpg";

const words = ["Saborea", "la", "Revolución"];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <img
        src={heroBg}
        alt="Textura de humo y fuego"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />
      <div className="absolute -top-40 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />


      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-12 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-xs font-semibold tracking-[0.4em] text-secondary uppercase"
        >
          Cocina urbana · Madrid · Desde 2016
        </motion.p>

        <h1 className="max-w-[15ch] text-[clamp(3rem,11vw,7.5rem)] text-cream">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: "60%", rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className={`mr-4 inline-block ${i === 2 ? "text-fire" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-md text-base leading-relaxed text-cream/70"
          >
            Fuego vivo, ingredientes de mercado y recetas sin miedo. Un sitio ruidoso, honesto y
            adictivo en pleno centro.
          </motion.p>

          <motion.a
            href="#reservas"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 font-display text-lg tracking-tight text-primary-foreground uppercase shadow-[var(--shadow-fire)]"
          >
            Reservar mesa
            <span aria-hidden>→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
