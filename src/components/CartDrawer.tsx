import { useState, useEffect } from "react";
import { X, ShoppingBag, Trash2, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type CartItem = {
  name: string;
  price: string;
};

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar items del localStorage
  const loadItems = () => {
    const stored = localStorage.getItem("punto-verde-cart-simple");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    } else {
      setItems([]);
    }
  };

  // Escuchar evento para abrir
  useEffect(() => {
    const handleOpen = () => {
      loadItems();
      setIsOpen(true);
    };
    window.addEventListener("open-cart", handleOpen);
    return () => window.removeEventListener("open-cart", handleOpen);
  }, []);

  const handleClose = () => setIsOpen(false);

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem("punto-verde-cart-simple", JSON.stringify(newItems));
  };

  const handleClear = () => {
    setItems([]);
    localStorage.removeItem("punto-verde-cart-simple");
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    const orderText = items.map((item) => `- ${item.name} (${item.price})`).join("\n");
    const message = `¡Hola Santiago! Quiero hacer este pedido:\n\n${orderText}\n\n¿Me confirmas?`;
    window.dispatchEvent(new CustomEvent("open-santiago-chat", { detail: { message } }));
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-[#5F7A3A]" />
                <h2 className="font-display text-xl text-ink">Tu pedido</h2>
                <span className="bg-[#5F7A3A] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Lista de items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400">Tu carrito está vacío</p>
                  <p className="text-sm text-gray-300 mt-1">
                    Toca los precios del menú para añadir productos
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-ink">{item.name}</p>
                        <p className="text-sm text-[#5F7A3A] font-display">
                          {item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(index)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer con botones */}
            {items.length > 0 && (
              <div className="p-6 border-t space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5F7A3A] py-4 text-white font-display font-bold text-lg hover:bg-[#4a602e] transition-colors"
                >
                  <Send className="h-5 w-5" />
                  Tramitar pedido con Santiago
                </button>
                <button
                  onClick={handleClear}
                  className="w-full py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}