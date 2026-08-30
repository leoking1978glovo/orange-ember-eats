import { motion } from "motion/react";
import { dishes } from "@/data/restaurant";

export function Dishes() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,7vw,4.5rem)] text-cream"
          >
            Platos <span className="text-fire">estrella</span>
          </motion.h2>
          <p className="text-sm tracking-widest text-cream/50 uppercase">Desliza →</p>
        </div>
      </div>

      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12">
        {dishes.map((dish, i) => (
          <motion.article
            key={dish.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="group relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl bg-cream/5 md:w-[380px]"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border-2 border-primary px-8 py-3 font-display text-lg tracking-tight text-cream uppercase">
                  Ver detalles
                </span>
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 p-6">
              <div>
                <h3 className="text-2xl text-cream">{dish.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{dish.description}</p>
              </div>
              <span className="shrink-0 font-display text-xl text-secondary">{dish.price}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
