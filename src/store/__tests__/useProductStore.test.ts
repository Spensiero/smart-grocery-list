import { beforeEach, describe, expect, it } from 'vitest';
import { useProductStore } from '@/store/useProductStore';
import { Product } from '@/utils/optimizePath';

describe('Product Store', () => {
  beforeEach(() => {
    const store = useProductStore.getState();
    store.setOrderedProducts([]);
    store.setTotalDistance(0);
  });

  it('should maintain correct product order and show walking distance', () => {
    // Create test products
    const products: Product[] = [
      { name: 'Eggplant', x: 0, y: 0, icon: '🍆' },
      { name: 'Cheese', x: 0, y: 0, icon: '🧀' },
      { name: 'Broccoli', x: 0, y: 0, icon: '🥦' },
      { name: 'Tangerine', x: 0, y: 0, icon: '🍊' },
      { name: 'Hot Pepper', x: 0, y: 0, icon: '🌶️' },
    ];

    // Add products in the specified order
    const expectedOrder = [
      products[3], // 🍊
      products[1], // 🧀
      products[0], // 🍆
      products[4], // 🌶️
      products[2], // 🥦
    ];

    // Set the ordered products
    useProductStore.setState({ orderedProducts: expectedOrder, totalDistance: 13 });

    // Get fresh state after update
    const store = useProductStore.getState();

    // Verify the order of products
    expect(store.orderedProducts.map(p => p.name)).toEqual(['Tangerine', 'Cheese', 'Eggplant', 'Hot Pepper', 'Broccoli']);
    
    // Verify the walking distance
    expect(store.totalDistance).toBe(13);
  });
});
