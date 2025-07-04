import useProducts from "@/hooks/useProducts";
import GroceryStop from "@/components/groceryStop/GroceryStop";
import { SheetTrigger } from "@/components/shadcn/sheet";
import { ArrowRightToLine, ReceiptEuro } from 'lucide-react';
import CenteredMessage from "@/components/centeredMessage/CenteredMessage";

const Guide = () => {
    const { orderedProducts } = useProducts();

    const orderedProductEmpty = orderedProducts.length === 0;
    
    return (
        <div className="ml-4 mr-4 h-full">
            <div className="mt-4 mb-4 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-12.5rem)]">
                {!orderedProductEmpty ? 
                    <>
                        {orderedProducts.map((item, index) => (
                            <GroceryStop 
                                key={item.name} 
                                product={item} 
                                stop={index + 1}
                                previousProduct={index > 0 ? orderedProducts[index - 1] : null}
                            />
                        ))}
                        <GroceryStop
                            product={{name: "Checkout", icon: <ReceiptEuro className="w-15 h-15 color-action-discount"/>, x: 3, y: 0}} 
                            stop={orderedProducts.length + 1}
                            previousProduct={orderedProducts.length > 0 ? orderedProducts[orderedProducts.length - 1] : null}
                        />
                    </>
                :
                    <CenteredMessage>
                        <div className="color-action-default text-xs">No items in the list</div>
                    </CenteredMessage>
                }
                    
                <SheetTrigger title="Close Shopping Guide" className="color-action-primary cursor-pointer mb-4 w-full">
                    <div className="flex items-center justify-center">
                        <ArrowRightToLine className="mr-2" /> 
                        <span>Close</span>
                    </div>
                </SheetTrigger>
            </div>
        </div>
    );
};
export default Guide;