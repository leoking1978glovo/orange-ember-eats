import { useState } from "react";
import { motion } from "motion/react";
import { menu } from "@/data/restaurant";
import { ShoppingCart, X, Check } from "lucide-react";

type SelectedItem = {
  name: string;
  price: string;
} | null;

export function MenuPreview() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);

  const handlePriceClick = (item: { name: string; price: string }) => {
    setSelectedItem(item);
  };

  const handleConfirm = () => {
    if (!selectedItem) return;

    // Guardar en localStorage (el drawer lee de aquí)
    const stored = localStorage.getItem("punto-verde-cart-simple");
    const current: { name: string; price: string }[] = stored ? JSON.parse(stored) : [];
    current.push(selectedItem);
    localStorage.setItem("punto-verde-cart-simple", JSON.stringify(current));

    setSelectedItem(null);

    // Abrir el drawer
    window.dispatchEvent(new Event("open-cart"));
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  return (
    <section id="menu" className="bg-cream py-24 md:py-40 relative">
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
                      <button
                        type="button"
                        onClick={() => handlePriceClick(item)}
                        className="font-display text-lg text-primary hover:text-primary/80 transition-colors cursor-pointer flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {item.price}
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* POPUP DE CONFIRMACIÓN */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-display text-xl text-ink mb-2">
              ¿Añadir al carrito?
            </h3>
            <p className="text-muted-foreground mb-6">
              <span className="font-semibold text-ink">{selectedItem.name}</span>
              <br />
              <span className="text-primary font-display text-lg">
                {selectedItem.price}
              </span>
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3 text-ink font-semibold hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4" />
                No
              </button>
              <button
               