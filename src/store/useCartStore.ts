import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id && item.size === size
          );

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += 1;
            return { items: updatedItems };
          }

          return { items: [...state.items, { ...product, quantity: 1, size }] };
        });
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        }));
      },

      updateQuantity: (id, quantity, size) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'marl-cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
