import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { dishes } from "@/data/restaurant";

const GAP = 24;
const AUTOPLAY_INTERVAL = 3000; // 3 segundos entre cada plato
const TRANSITION_DURATION = 0.8; // duración del movimiento

export function Dishes() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Duplicamos los platos para efecto infinito
  const allDishes = [...dishes, ...dishes];

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    setMaxDrag(Math.max(0, track.scrollWidth - viewport.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const itemWidth = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return 404;
    return (track.children[0] as HTMLElement).offsetWidth + GAP;
  };

  const snapTo = useCallback(
    (target: number) => {
      const clamped = Math.max(-maxDrag, Math.min(0, target));
      const step = itemWidth();
      const snapped = Math.round(clamped / step) * step;
      animate(x, Math.max(-maxDrag, Math.min(0, snapped)), {
        type: "spring",
        stiffness: 300,
        damping: 32,
      });
    },
    [maxDrag, x],
  );

  const goToIndex = useCallback(
    (index: number) => {
      const step = itemWidth();
      const target = -index * step;
      animate(x, target, {
        duration: TRANSITION_DURATION,
        ease: "easeInOut",
      });
      currentIndexRef.current = index;
    },
    [x],
  );

  // Autoplay
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const nextIndex = currentIndexRef.current + 1;
      const totalOriginal = dishes.length;

      if (nextIndex >= totalOriginal) {
        // Reset suave: saltamos al inicio sin animación visible
        animate(x, 0, { duration: 0 });
        currentIndexRef.current = 0;
        // Y luego avanzamos al primero con animación
        setTimeout(() => {
          goToIndex(1);
        }, 50);
      } else {
        goToIndex(nextIndex);
      }
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, goToIndex, x]);

  const onDragEnd = () => {
    const velocity = x.getVelocity();
    const projected = x.get() + velocity * 0.2;
    const step = itemWidth();
    const rawIndex = Math.round(-projected / step);
    const totalOriginal = dishes.length;
    const clampedIndex = Math.max(0, Math.min(totalOriginal - 1, rawIndex));
    currentIndexRef.current = clampedIndex;
    snapTo(projected);
  };

  const go = (dir: 1 | -1) => {
    const newIndex = Math.max(
      0,
      Math.min(dishes.length - 1, currentIndexRef.current + dir),
    );
    currentIndexRef.current = newIndex;
    goToIndex(newIndex);
  };

  return (
    <section
      className="bg-ink py-24 md:py-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          <div className="flex items-center gap-6">
            <p className="text-sm tracking-widest text-cream/50 uppercase">
              Auto · Arrastra
            </p>
            <div className="hidden gap-3 md:flex">
              <button
                onClick={() => go(-1)}
                aria-label="Anterior"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-primary hover:bg-primary hover:text-ink"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Siguiente"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-primary hover:bg-primary hover:text-ink"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="mt-14 overflow-hidden px-6 pb-4 md:px-12"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
          className="flex cursor-grab gap-6 active:cursor-grabbing"
        >
          {allDishes.map((dish, i) => (
            <motion.article
              key={`${dish.name}-${i}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative w-[300px] shrink-0 overflow-hidden rounded-2xl bg-cream/5 md:w-[380px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  draggable={false}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {dish.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-secondary px-4 py-1.5 font-display text-xs tracking-tight text-ink uppercase">
                    {dish.tag}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center pb-5 transition-transform duration-300 ease-out group-hover:translate-y-0">
                  <span className="rounded-full bg-primary px-8 py-3 font-display text-sm tracking-tight text-ink uppercase shadow-lg">
                    Ver detalles
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h3 className="text-2xl text-cream">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {dish.description}
                  </p>
                </div>
                <span className="shrink-0 font-display text-xl text-primary">
                  {dish.price}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}