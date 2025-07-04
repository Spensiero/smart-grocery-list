import { Product } from "@/utils/optimizePath";

export type TStoreMapProps = {
  product: Product | null;
  previousProduct: Product | null;
};

export type TPoint = [number, number];

export type TCellProps = {
  x: number;
  y: number;
  isEntrance: boolean;
  isCheckout: boolean;
  isSelected: boolean;
  isPrevious: boolean;
  product?: Product;
  previousProduct?: Product;
};

export type TPathArrowProps = {
  path: TPoint[];
};
