import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { dishes } from "@/data/restaurant";

const AUTOPLAY_INTERVAL = 4000; // 4 segundos entre cada plato

export function Dishes() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = dishes[index];

  const goTo = useCallback(
    (newIndex: number) => {
      const total = dishes.length;
      let target = newIndex;
      if (target < 0) target = total - 1;
      if (target >= total) target = 0;

      setDirection(target > index ? 1 : -1);
      setIndex(target);
    },
    [index],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      next();
    }, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, isPaused, next]);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.92,
      x: dir > 0 ? 80 : -80,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.92,
      x: dir > 0 ? -80 : 80,
    }),
  };

  return (
    <section
      className="bg-ink py-20 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.75rem,8vw,6rem)] text-cream"
          >
            Platos <span className="text-fire">tradicionales</span>
          </motion.h2>
          <div className="flex items-center gap-4">
            <p className="text-sm tracking-widest text-cream/50 uppercase">
              {index + 1} / {dishes.length}
            </p>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-primary hover:bg-primary hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-primary hover:bg-primary hover:text-ink"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDESHOW: un solo plato a la vez, ocupa TODO el ancho */}
      <div className="relative mx-auto mt-10 max-w-5xl px-6 md:mt-14 md:px-12">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl md:aspect-[16/9]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.name}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.name}
                draggable={false}
                className="h-full w-full object-cover"
              />
              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Info del plato */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
                  <div>
                    {current.tag && (
                      <span className="mb-2 inline-block rounded-full bg-secondary px-4 py-1 font-display text-xs tracking-tight text-ink uppercase">
                        {current.tag}
                      </span>
                    )}
                    <h3 className="text-3xl text-cream md:text-5xl">
                      {current.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
                      {current.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-3xl text-primary md:text-4xl">
                    {current.price}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicadores de puntos */}
        <div className="mt-6 flex justify-center gap-2">
          {dishes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-cream/30 hover:bg-cream/50"
              }`}
              aria-label={`Ir al plato ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}