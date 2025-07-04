import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet"
import Guide from '@/components/guide/Guide';
import GroceryItems from "@/components/groceryItems/GroceryItems";
import { ShoppingBasket, Gauge, CookingPot } from 'lucide-react';
import SelectedProducts from "@/components/selectedProducts/SelectedProducts";
import { useProductStore } from "@/store/useProductStore";

const Main = () => {
    const { totalDistance } = useProductStore();
   
    return (
        <main className="m-4 flex-1 flex flex-col h-full">
            <Sheet>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 color-action-default">
                        <CookingPot className="w-4"/>
                        <h4>Product</h4>
                    </div>
                    <SheetTrigger className="color-action-primary cursor-pointer flex gap-2" title="Open Shopping Guide">
                        <ShoppingBasket className="w-5"/> Shopping Guide
                    </SheetTrigger>
                </div>
                <SelectedProducts/>
                <GroceryItems/>
                
                <SheetContent 
                    className="flex flex-col h-full gap-4"
                    role="dialog"
                    aria-label="Shopping Guide"
                    aria-modal="true"
                >
                    <div className="flex-1">
                        <SheetHeader>
                            <SheetTitle className="color-action-primary">
                                The Shopping Guide helps you get your groceries quickly and easily.
                            </SheetTitle>
                            <SheetDescription className="color-action-default">
                                Pick up items in the suggested order.<br/>
                                You'll get through the aisles faster than stepping out of the house!
                            </SheetDescription>
                            <div className="color-action-discount flex items-center gap-2">
                                Total distance: {totalDistance}
                                <Gauge className="color-action-primary"/>
                            </div>
                        </SheetHeader>
                        <Guide/>
                    </div>
                </SheetContent>
            </Sheet>
        </main>
    );
};
export default Main;