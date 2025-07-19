// src/lib/store.ts
import { create } from 'zustand';


export type CartItem = {
  id: string;     // unique ID for the item (e.g. 'shirt-1')
  name: string;
  src: string;
  quantity: number;
};

interface CartState {
  cart: CartItem[];

  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItemById: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addItem: (newItem) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        // If item already exists, increase its quantity
        return {
          cart: state.cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // If new item, add it with quantity 1
      return {
        cart: [...state.cart, { ...newItem, quantity: 1 }],
      };
    }),

  removeItemById: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ cart: [] }),
}));
