import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { CirclePlus, Trash } from 'lucide-react';
import useProducts from "@/hooks/useProducts";
import { ReactNode } from "react";
  interface IGroceryItem {
    name: string;
    icon: string|ReactNode;
  }

  const GroceryItem = ({ name, icon }: IGroceryItem) => {
    const { setOrderedProducts, removeOrderedProduct, orderedProducts } = useProducts();
    const isOrdered = Boolean(orderedProducts.find((item) => item.name === name));

    return (
      <Card 
        className="max-h-60"
        role="article"
        aria-label={`Product: ${name}`}
      >
        <CardHeader>
          <CardTitle className="color-action-default">{name}</CardTitle>
          <CardAction>
              <Button 
                  variant="ghost"  
                  onClick={() => isOrdered ? removeOrderedProduct(name) : setOrderedProducts(name)}
                  title={isOrdered ? "Remove from list" : "Add to list"}
                  className="hover:bg-transparent cursor-pointer"
                  aria-label={isOrdered ? `Remove ${name} from shopping list` : `Add ${name} to shopping list`}
                  aria-pressed={isOrdered}
              >
                  {isOrdered ?
                    <Trash className="color-action-discount" style={{ width: '40px', height: '40px' }} aria-hidden="true"/>:
                    <CirclePlus className="color-action-primary" style={{ width: '40px', height: '40px' }} aria-hidden="true"/>
                  }
              </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div 
            className="text-8xl"
            role="img" 
            aria-label={`${name} icon`}
          >
            {icon}
          </div>
        </CardContent>
      </Card>
    );
  };
  export default GroceryItem;