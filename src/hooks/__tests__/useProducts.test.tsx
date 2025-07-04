import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useProducts from '@/hooks/useProducts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getStoreProducts } from '@/api/getStoreProducts';
import { Product, optimizeShoppingPath } from '@/utils/optimizePath';
import { PropsWithChildren } from 'react';
import { useProductStore } from '@/store/useProductStore';

// Mock dependencies
vi.mock('@/api/getStoreProducts')
vi.mock('@/utils/optimizePath', () => ({
  optimizeShoppingPath: vi.fn().mockReturnValue({ path: [], totalDistance: 0 })
}))

const mockProducts: Product[] = [
  { name: 'Cheese', x: 1, y: 1, icon: '🧀' },
  { name: 'Tangerine', x: 2, y: 2, icon: '🍊' },
  { name: 'Hot Pepper', x: 3, y: 3, icon: '🌶️' }
]

describe('useProducts hook', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient()
    vi.mocked(getStoreProducts).mockResolvedValue(mockProducts)
    vi.mocked(optimizeShoppingPath).mockClear()
    useProductStore.setState({ orderedProducts: [], totalDistance: 0 })
  })

  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  it('should fetch and return products correctly', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: Wrapper
    })
    
    // Check initial loading state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.products).toBeUndefined()
    
    // Wait for data to load
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
    
    // Verify products were loaded correctly
    expect(result.current.products).toEqual(mockProducts)
    expect(result.current.orderedProducts).toEqual([])
  })

  it('should add a product to ordered products list', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: Wrapper
    })

    // Wait for data to load
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Add a product to the ordered list
    result.current.setOrderedProducts('Cheese')

    // Verify the product was added and the path was optimized
    expect(result.current.orderedProducts).toEqual([])
    expect(useProductStore.getState().totalDistance).toBe(0)

    // Verify that optimizeShoppingPath was called with the correct product
    expect(vi.mocked(optimizeShoppingPath)).toHaveBeenCalledWith([mockProducts[0]])
  })

  it('should remove a product from ordered products list', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: Wrapper
    })

    // Wait for data to load
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Setup: first add a product
    useProductStore.setState({ 
      orderedProducts: [mockProducts[0]], // Add Cheese
      totalDistance: 10
    })

    // Remove the product
    result.current.removeOrderedProduct('Cheese')

    // Verify the product was removed
    expect(result.current.orderedProducts).toEqual([])
  })

  it('should clean ordered products list and reset total distance', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: Wrapper
    })

    // Wait for data to load
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Setup: add multiple products
    useProductStore.setState({ 
      orderedProducts: [mockProducts[0], mockProducts[1]], // Add Cheese and Tangerine
      totalDistance: 25
    })

    // Clean the ordered products
    result.current.cleanOrderedProducts()

    // Verify that the list is empty and total distance is reset
    expect(result.current.orderedProducts).toEqual([])
    expect(useProductStore.getState().totalDistance).toBe(0)
  })

})
