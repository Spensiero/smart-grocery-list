import products from '@/data/products.json';
import { Product } from '@/utils/optimizePath';

export const getStoreProducts = (): Product[] => {
    return products;
};