import { getStoreProducts } from "@/api/getStoreProducts";
import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";
import { optimizeShoppingPath, Product } from "@/utils/optimizePath";
interface IUseProducts {
    products: Product[] | undefined;
    orderedProducts: Product[];
    setOrderedProducts: (name: string) => void;
    removeOrderedProduct: (name: string) => void;
    cleanOrderedProducts: () => void;
    isLoading: boolean;
    isError: boolean;
}

const useProducts = (): IUseProducts => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ['getStoreProducts'],
      queryFn: getStoreProducts,
      staleTime: Infinity,
    });
    const { setTotalDistance } = useProductStore();

    const orderedProductsFromStore = useProductStore((state) => state.orderedProducts);
    const setOrderedProductsStore = useProductStore((state) => state.setOrderedProducts);

    const setOrderedProducts = (name: string) => {
      const product = data?.find((item) => item.name === name);
      if(!product) return;
        
      const newOrderedProducts = [...orderedProductsFromStore, product];

      const {path: sortedProducts, totalDistance} = optimizeShoppingPath(newOrderedProducts);
        
      setOrderedProductsStore(sortedProducts);
      setTotalDistance(totalDistance);
    }

    const removeOrderedProduct = (name: string) => {
      const newOrderedProducts = orderedProductsFromStore.filter((item) => item.name !== name);
      setOrderedProductsStore(newOrderedProducts);
      
      if (newOrderedProducts.length === 0) {
        setTotalDistance(0);
      } else {
        const { totalDistance } = optimizeShoppingPath(newOrderedProducts);
        setTotalDistance(totalDistance);
      }
    }

    const cleanOrderedProducts = () => {
      setOrderedProductsStore([]);
      setTotalDistance(0);
    }
        
      
    return {
        products: data,
        orderedProducts: orderedProductsFromStore,
        setOrderedProducts: (name: string) => setOrderedProducts(name),
        removeOrderedProduct: (name: string) => removeOrderedProduct(name),
        cleanOrderedProducts: () => cleanOrderedProducts(),
        isLoading,
        isError
    }
}
export default useProducts;
