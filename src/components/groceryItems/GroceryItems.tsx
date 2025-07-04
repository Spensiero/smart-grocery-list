import { Input } from "@/components/shadcn/input";
import { Search, TriangleAlert, X } from "lucide-react";
import GroceryItem from "@/components/groceryItem/GroceryItem";
import Spinner from "@/components/spinner/Spinner";
import CenteredMessage from "@/components/centeredMessage/CenteredMessage";
import { useState } from "react";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/utils/optimizePath";

const GroceryItems = () => {
  const { products, isLoading, isError } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="flex-1 mt-4">
      <div className="flex gap-4 w-2/4">
        <div
          role="search"
          aria-label="Search products"
          className="flex items-center gap-2 px-3 rounded-md border flex-1"
        >
          <label htmlFor="searchProduct" className="sr-only">
            Search product
          </label>
          <Search className="h-4 w-4 color-action-default" aria-hidden="true" />
          <Input
            name="searchProduct"
            id="searchProduct"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setFilteredProducts(
                products?.filter((item) =>
                  item.name.toLowerCase().includes(e.target.value.toLowerCase())
                ) || []
              );
            }}
            placeholder="Search product"
            aria-label="Search product"
            className="border-0 focus-visible:ring-0 px-0"
          />
          {searchValue && (
            <button
              onClick={() => {
                setSearchValue("");
                setFilteredProducts(null);
              }}
              title="Clear search"
              aria-label="Clear search"
              className="color-action-default cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div aria-live="polite" className="mt-4">
        {isError && (
          <CenteredMessage>
            <div className="h-[calc(100vh-15rem)] flex items-center justify-center">
              <div role="alert" className="flex items-center gap-2 color-action-default">
                <TriangleAlert className="w-4 h-4 text-red-500" aria-hidden="true" />
                An error has occurred. Please try again later
              </div>
            </div>
          </CenteredMessage>
        )}
        {filteredProducts && !isError && filteredProducts.length === 0 && (
          <CenteredMessage>
            <div className="h-[calc(100vh-15rem)] flex items-center justify-center">
              <div role="status" className="flex items-center gap-2">
                <TriangleAlert className="w-4 h-4" aria-hidden="true" />
                Item not found
              </div>
            </div>
          </CenteredMessage>
        )}
        {isLoading && (
          <div role="status" aria-label="Loading products">
            <Spinner />
          </div>
        )}
      </div>

      {!filteredProducts && products && products.length > 0 && (
        <div 
          className="overflow-y-auto h-[calc(100vh-15rem)] mt-4"
          role="region"
          aria-label={`All products: ${products.length} items`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((item) => (
              <GroceryItem key={item.name} name={item.name} icon={item.icon} />
            ))}
          </div>
        </div>
      )}
      {filteredProducts && filteredProducts.length > 0 && (
        <div 
          className="overflow-y-auto h-[calc(100vh-15rem)] mt-4"
          role="region"
          aria-label={`Search results: ${filteredProducts.length} items found`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((item) => (
              <GroceryItem key={item.name} name={item.name} icon={item.icon} />
            ))}
          </div>
        </div>
      )}
      
      {/* Screen reader only announcement for search results */}
      <div className="sr-only" role="status" aria-live="polite">
        {filteredProducts ? 
          `Found ${filteredProducts.length} items matching your search` : 
          products ? 
            `Showing all ${products.length} available products` : 
            ''
        }
      </div>
    </div>
  );
};

export default GroceryItems;
