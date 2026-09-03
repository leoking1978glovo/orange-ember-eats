import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "motion/react";
import { menu } from "@/data/restaurant";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, X, Check, ArrowLeft, ArrowRight } from "lucide-react";

type SelectedItem = {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  category: string;
} | null;

function parsePrice(priceStr: string): number {
  const clean = priceStr.replace(/[€\s]/g, "").replace(",", ".");
  const firstValue = clean.split("-")[0];
  return parseFloat(firstValue) || 0;
}

const GAP = 20;

export function MenuPreview() {
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);

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
    if (!track || track.children.length === 0) return 300;
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
    [maxDrag, x]
  );

  const onDragEnd = () => {
    const velocity = x.getVelocity();
    const projected = x.get() + velocity * 0.2;
    snapTo(projected);
  };

  const go = (dir: 1 | -1) => {
    snapTo(x.get() - dir * itemWidth());
  };

  const handlePriceClick = (
    item: {
      name: string;
      price: string;
      description: string;
    },
    category: string
  ) => {
    const id = `${category}-${item.name}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    setSelectedItem({
      id,
      name: item.name,
      price: item.price,
      priceValue: parsePrice(item.price),
      category,
    });
  };

  const handleConfirm = () => {
    if (!selectedItem) return;
    addItem({
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      priceValue: selectedItem.priceValue,
      category: selectedItem.category,
    });
    setSelectedItem(null);
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  return (
    <section id="menu" className="relative bg-[#FFF0E6] py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,8vw,5rem)] text-ink"
          >
            La carta
          </motion.h2>
          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-cream"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-cream"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div ref={viewportRef} className="mt-8 overflow-hidden md:mt-12">
        <motion.div
          ref={trackRef}
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
          className="flex cursor-grab gap-5 active:cursor-grabbing px-4 md:gap-6 md:px-12"
        >
          {menu.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="w-[88vw] shrink-0 rounded-[2rem] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 md:w-[340px] md:p-6"
            >
              <h3 className="border-b-2 border-primary/30 pb-2 text-xl font-bold text-ink md:text-2xl">
                {cat.title}
              </h3>
              <ul className="mt-3 space-y-2 md:mt-4 md:space-y-3">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-ink md:text-base">
                        {item.name}
                      </span>
                      <span className="h-px flex-1 bg-border" />
                      <button
                        type="button"
                        onClick={() => handlePriceClick(item, cat.title)}
                        className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-display text-sm text-primary transition-colors hover:bg-primary hover:text-cream md:px-3 md:py-1 md:text-base"
                      >
                        <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                        {item.price}
                      </button>
                    </div>
                    {item.description && (
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground md:text-sm">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <p className="mt-4 text-center text-xs text-ink/40 md:hidden">
        ← Desliza para ver más categorías →
      </p>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h3 className="font-display text-xl tracking-tight text-ink">
                ¿Añadir al pedido?
              </h3>
              <p className="mt-2 text-muted-foreground">
                <span className="font-semibold text-ink">
                  {selectedItem.name}
                </span>
                <br />
                <span className="font-display text-lg text-primary">
                  {selectedItem.price}
                </span>
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3 font-semibold text-ink transition-colors hover:bg-gray-50"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5F7A3A] py-3 font-semibold text-white transition-colors hover:bg-[#4a602e]"
                >
                  <Check className="h-4 w-4" />
                  Sí, añadir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}