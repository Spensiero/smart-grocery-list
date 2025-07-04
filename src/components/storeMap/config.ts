import { TPoint } from "@/components/storeMap/types";

export const GRID_CONFIG = {
  WIDTH: 4,
  HEIGHT: 4,
  CELL_SIZE: 60,
  CELL_GAP: 4,
  ENTRANCE: [0, 0] as TPoint,
  CHECKOUT: [3, 0] as TPoint,
} as const;

export const PATH_CONFIG = {
  LINE_LENGTH: 10,
  ARROW_MARKER_ID: "storeMapArrow",
} as const;
