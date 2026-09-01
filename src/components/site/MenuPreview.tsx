import { motion } from "motion/react";
import { menu } from "@/data/restaurant";

export function MenuPreview() {
  return (
    <section id="menu" className="bg-cream py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.75rem,9vw,6.5rem)] text-ink md:col-span-7"
          >
            La carta
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-16 md:grid-cols-2 xl:grid-cols-4">
          {menu.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={i % 2 === 1 ? "xl:mt-16" : ""}
            >
              <h3 className="border-b-4 border-ink pb-3 text-3xl text-ink">{cat.title}</h3>
              <ul className="mt-6 space-y-6">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-ink">{item.name}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="font-display text-lg text-primary">{item.price}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}