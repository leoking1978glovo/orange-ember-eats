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

const GAP = 24; // gap-6

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
    if (!track || track.children.length === 0) return 320;
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
    <section id="menu" className="relative bg-cream py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.75rem,9vw,6.5rem)] text-ink"
          >
            La carta
          </motion.h2>
          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-cream"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-cream"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CARRUSEL: ocupa TODO el ancho de pantalla */}
      <div ref={viewportRef} className="mt-14 overflow-hidden">
        <motion.div
          ref={trackRef}
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
          className="flex cursor-grab gap-6 active:cursor-grabbing pl-6 md:pl-12"
        >
          {menu.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="w-[85vw] shrink-0 rounded-2xl bg-white p-8 shadow-sm md:w-[380px]"
            >
              <h3 className="border-b-4 border-ink pb-3 text-3xl text-ink">
                {cat.title}
              </h3>
              <ul className="mt-6 space-y-6">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-ink">{item.name}</span>
                      <span className="h-px flex-1 bg-border" />
                      <button
                        type="button"
                        onClick={() => handlePriceClick(item, cat.title)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-display text-lg text-primary transition-colors hover:bg-primary/20 hover:text-primary/80"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {item.price}
                      </button>
                    </div>
                    {item.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
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

      {/* POPUP DE CONFIRMACION */}
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