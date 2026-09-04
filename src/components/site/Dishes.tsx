import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { dishes } from "@/data/restaurant";

const AUTOPLAY_INTERVAL = 4000;

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
      scale: 0.95,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.95,
      x: dir > 0 ? -60 : 60,
    }),
  };

  return (
    <section
      className="bg-ink py-16 md:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* HEADER */}
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="flex items-center justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl text-cream md:text-5xl"
          >
            Platos <span className="text-fire">tradicionales</span>
          </motion.h2>
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-widest text-cream/40 uppercase">
              {index + 1}/{dishes.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-primary hover:bg-primary hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Siguiente"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-primary hover:bg-primary hover:text-ink"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDESHOW: MÁS ALTO EN MÓVIL */}
      <div className="relative mx-auto mt-8 max-w-6xl px-4 md:mt-8 md:px-12">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl md:aspect-[16/8]">
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
              {/* Degradado mínimo solo para el nombre */}
              <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-black/80 to-transparent" />

              {/* NOMBRE ABAJO */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h3 className="text-center text-xl font-bold text-cream md:text-3xl">
                  {current.name}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PUNTOS */}
        <div className="mt-6 flex justify-center gap-1.5">
          {dishes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-cream/30 hover:bg-cream/50"
              }`}
              aria-label={`Ir al plato ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}