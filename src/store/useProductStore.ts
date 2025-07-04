import { Product } from '@/utils/optimizePath';
import { create } from 'zustand';

interface IProductStore {
  orderedProducts: Product[];
  totalDistance: number;
  setOrderedProducts: (products: Product[]) => void;
  setTotalDistance: (distance: number) => void;
}

export const useProductStore = create<IProductStore>((set) => ({
  orderedProducts: [],
  totalDistance: 0,
  setOrderedProducts: (products: Product[]) => set({ orderedProducts: products }),
  setTotalDistance: (distance: number) => set({ totalDistance: distance }),
}));
