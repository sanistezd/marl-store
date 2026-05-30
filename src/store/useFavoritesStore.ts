import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface FavoritesState {
  items: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleFavorite: (product) => {
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return { items: state.items.filter((item) => item.id !== product.id) };
          } else {
            return { items: [...state.items, product] };
          }
        });
      },

      isFavorite: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: 'marl-favorites-storage',
    }
  )
);
