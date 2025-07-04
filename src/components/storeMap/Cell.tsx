import { DoorOpen, ReceiptEuro } from "lucide-react";
import { TCellProps } from "@/components/storeMap/types";
import { GRID_CONFIG } from "@/components/storeMap/config";

export const Cell = ({ isEntrance, isCheckout, isSelected, isPrevious, product, previousProduct }: Omit<TCellProps, 'x' | 'y'>) => {
  const title = isEntrance ? "Entrance" 
              : isCheckout ? "Checkout" 
              : isSelected && product ? product.name
              : isPrevious && previousProduct ? previousProduct.name
              : undefined;

  const productIcon = (isSelected && product) ? product.icon
              : (isPrevious && previousProduct) ? previousProduct.icon
              : null;

  const entranceIcon = isEntrance ? <DoorOpen className="w-6 color-action-primary"/> : null;
  const checkoutIcon = isCheckout ? <ReceiptEuro className="w-6 color-action-discount"/> : null;

  const icons = [
    isEntrance && isSelected ? entranceIcon : (!productIcon && !checkoutIcon ? entranceIcon : null),
    productIcon,
    !productIcon ? checkoutIcon : null
  ].filter(Boolean);

  const cellSize = `${GRID_CONFIG.CELL_SIZE / 16}rem`;

  return (
    <div
      className="border border-[#aaa] rounded-md text-center text-[1.375rem] bg-white flex items-center justify-center"
      style={{
        width: cellSize,
        height: cellSize,
        lineHeight: cellSize
      }}
      title={title}
    >
      <div className="flex items-center justify-center gap-0.5 w-full">
        {icons.map((icon, index) => (
          <div key={index} className="flex items-center justify-center">{icon}</div>
        ))}
      </div>
    </div>
  );
};
