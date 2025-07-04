import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/shadcn/card";
import StoreMap from "@/components/storeMap/StoreMap";
import { Product } from "@/utils/optimizePath";

const GroceryStop = ({ product, stop, previousProduct }: {product: Product, stop: number, previousProduct: Product | null}) => {
    const { name, icon, x, y } = product;

    return (
        <Card className="full-height">
            <CardHeader>
                <div className="color-action-primary font-semibold">Stop: {stop}</div>
                <CardTitle className="color-action-default flex flex-col items-center">
                    <div>{name}</div>
                    <div className="text-8xl mt-4">{icon}</div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex">
                    <StoreMap 
                        product={{x, y, icon: icon ? icon : '🛒', name: name}}
                        previousProduct={previousProduct}
                    />
                </div>
            </CardContent>
        </Card>
    );
};
export default GroceryStop;