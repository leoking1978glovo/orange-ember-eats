import { useState, useEffect, useCallback } from "react";

const CART_KEY = "punto-verde-cart";

export type CartItem = {
  name: string;
  price: string;
  quantity: number;
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar del localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((name: string, price: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { name, price, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    isOpen,
    openCart,
    closeCart,
  };
}