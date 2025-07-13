// src/lib/store.ts
import { create } from 'zustand';

type ClothingItem = {
  src: string;
  name: string;
};

type CartItem = {
  items: ClothingItem[];
};

interface CartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  removeItem: (index: number) => void; // ✅ NEW
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addItem: (item: CartItem) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  clearCart: () => set({ cart: [] }),
  removeItem: (index: number) =>
    set((state) => ({
      cart: state.cart.filter((_, i) => i !== index),
    })),
}));
