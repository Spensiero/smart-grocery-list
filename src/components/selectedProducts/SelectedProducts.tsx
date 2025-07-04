import { ShoppingCart, X } from "lucide-react";
import CenteredMessage from "@/components/centeredMessage/CenteredMessage";
import useProducts from "@/hooks/useProducts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";

const SelectedProducts = () => {
  const { orderedProducts, cleanOrderedProducts } = useProducts();
  const orderedProductEmpty = orderedProducts.length === 0;

  return (
    <AlertDialog>
      <div className="flex items-center gap-2 mt-4">
        {!orderedProductEmpty && (
          <div title="Clear list" className="w-6 h-6 flex">
            <AlertDialogTrigger className="cursor-pointer">
              <X className="w-6 h-6 color-action-discount" />
            </AlertDialogTrigger>
          </div>
        )}
        <div className="w-6 h-6 flex">
          <ShoppingCart className="w-6 h-6 color-action-primary" />
        </div>
        <div
          className="flex gap-2 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:cursor-grab"
          title="Scroll to see more products"
        >
          {orderedProductEmpty && (
            <CenteredMessage>
              <div className="color-action-default text-xs">
                No items in the list
              </div>
            </CenteredMessage>
          )}

          {orderedProducts.map((item) => (
            <div
              key={item.name}
              title={item.name}
              className="text-1xl h-[1.5rem]"
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="color-action-primary flex items-center gap-2">
            <span className="text-4xl">🐷</span>
            <span>Are you sure you want to clear the list?</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction 
                onClick={() => cleanOrderedProducts()} 
                title="Definitively clear the list" 
                className="color-action-discount bg-transparent hover:bg-transparent cursor-pointer">
                    Continue
            </AlertDialogAction>
            <AlertDialogCancel className="color-action-default cursor-pointer">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SelectedProducts;
