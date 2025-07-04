import { TPoint, TStoreMapProps } from "@/components/storeMap/types";
import { Footprints } from "lucide-react";
import { Cell } from "@/components/storeMap/Cell";
import { PathArrow } from "@/components/storeMap/PathArrow";
import { GRID_CONFIG } from "@/components/storeMap/config";
import { getPath } from "@/components/storeMap/utils";

const StoreMap = ({ product, previousProduct }: TStoreMapProps) => {
  const startPoint: TPoint = previousProduct ? [previousProduct.x, previousProduct.y] : GRID_CONFIG.ENTRANCE;
  const path = product
    ? [startPoint, ...getPath(startPoint, [product.x, product.y])]
    : [];

  return (
    <div className="mx-auto">
      <h2 className="color-action-discount flex items-center gap-2">
        <Footprints className="w-5" />
        Path in the store
      </h2>

      <div className="relative flex flex-wrap gap-[0.25rem] w-[16rem] h-[16rem]">
        <div className="flex flex-wrap gap-[0.25rem] absolute top-0 left-0 z-0 w-full h-full">
          {Array.from({ length: GRID_CONFIG.WIDTH * GRID_CONFIG.HEIGHT }).map((_, i) => {
            const x = i % GRID_CONFIG.WIDTH;
            const y = GRID_CONFIG.HEIGHT - 1 - Math.floor(i / GRID_CONFIG.WIDTH);
            const [checkoutX, checkoutY] = GRID_CONFIG.CHECKOUT;
            const [entranceX, entranceY] = GRID_CONFIG.ENTRANCE;

            return (
              <Cell
                key={`${x}-${y}`}
                isEntrance={x === entranceX && y === entranceY}
                isCheckout={x === checkoutX && y === checkoutY}
                isSelected={product !== null && x === product.x && y === product.y}
                isPrevious={previousProduct !== null && x === previousProduct.x && y === previousProduct.y}
                product={product || undefined}
                previousProduct={previousProduct || undefined}
              />
            );
          })}
        </div>
        <PathArrow path={path} />
      </div>
    </div>
  );
};

export default StoreMap;
