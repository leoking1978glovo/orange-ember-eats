import { useState, useEffect, useCallback } from "react";

const CART_KEY = "punto-verde-cart";

export type CartItem = {
  name: string;
  price: string;
  quantity: number;
};

// Store global (todos los componentes ven el mismo carrito)
let globalItems: CartItem[] = [];
let globalIsOpen = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((cb) => cb());
}

function loadFromStorage() {
  const stored = localStorage.getItem(CART_KEY);
  if (stored) {
    try {
      globalItems = JSON.parse(stored);
    } catch {
      localStorage.removeItem(CART_KEY);
    }
  }
}

function saveToStorage() {
  localStorage.setItem(CART_KEY, JSON.stringify(globalItems));
}

loadFromStorage();

export function useCart() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const cb = () => forceUpdate({});
    listeners.add(cb);
    return () => listeners.delete(cb);
  }, []);

  const addItem = useCallback((name: string, price: string) => {
    const existing = globalItems.find((i) => i.name === name);
    if (existing) {
      globalItems = globalItems.map((i) =>
        i.name === name ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      globalItems = [...globalItems, { name, price, quantity: 1 }];
    }
    saveToStorage();
    notify();
  }, []);

  const removeItem = useCallback((name: string) => {
    globalItems = globalItems.filter((i) => i.name !== name);
    saveToStorage();
    notify();
  }, []);

  const clearCart = useCallback(() => {
    globalItems = [];
    saveToStorage();
    notify();
  }, []);

  const openCart = useCallback(() => {
    globalIsOpen = true;
    notify();
  }, []);

  const closeCart = useCallback(() => {
    globalIsOpen = false;
    notify();
  }, []);

  const totalItems = globalItems.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items: globalItems,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    isOpen: globalIsOpen,
    openCart,
    closeCart,
  };
}