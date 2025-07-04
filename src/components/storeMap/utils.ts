import { GRID_CONFIG, PATH_CONFIG } from "@/components/storeMap/config";
import { TPoint } from "@/components/storeMap/types";
import { constrainedDistance } from "@/utils/optimizePath";

const constrainedPath = (from: TPoint, to: TPoint): TPoint[] => {
  const path: TPoint[] = [];
  const [startX, startY] = from;
  const [targetX, targetY] = to;

  if (startX === targetX) {
    let y = startY;
    while (y !== targetY) {
      y += y < targetY ? 1 : -1;
      path.push([startX, y]);
    }
    return path;
  }

  const pointA = { x: from[0], y: from[1] };
  const pointB = { x: to[0], y: to[1] };
  const cost = constrainedDistance(pointA, pointB);
  const upCost = (3 - from[1]) + (3 - to[1]) + Math.abs(from[0] - to[0]);

  if (upCost <= cost) {
    let y = startY;
    while (y < 3) {
      y++;
      path.push([startX, y]);
    }
    let x = startX;
    while (x !== targetX) {
      x += x < targetX ? 1 : -1;
      path.push([x, 3]);
    }
    y = 3;
    while (y !== targetY) {
      y--;
      path.push([targetX, y]);
    }
  } else {
    let y = startY;
    while (y > 0) {
      y--;
      path.push([startX, y]);
    }
    let x = startX;
    while (x !== targetX) {
      x += x < targetX ? 1 : -1;
      path.push([x, 0]);
    }
    y = 0;
    while (y !== targetY) {
      y++;
      path.push([targetX, y]);
    }
  }

  return path;
};

export const getPath = (from: TPoint, to: TPoint): TPoint[] => {
  return constrainedPath(from, to);
};

export const getCellCenter = (x: number, y: number): TPoint => {
  const px = x * (GRID_CONFIG.CELL_SIZE + GRID_CONFIG.CELL_GAP) + GRID_CONFIG.CELL_SIZE / 2;
  const py = (GRID_CONFIG.HEIGHT - 1 - y) * (GRID_CONFIG.CELL_SIZE + GRID_CONFIG.CELL_GAP) + GRID_CONFIG.CELL_SIZE / 2;
  return [px, py];
};

export const getAdjustedPoints = (start: TPoint, end: TPoint) => {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  const midPoint: TPoint = [x1 + dx * 0.5, y1 + dy * 0.5];
  const ratio = PATH_CONFIG.LINE_LENGTH / distance;

  const adjustedStart: TPoint = [
    midPoint[0] - dx * ratio,
    midPoint[1] - dy * ratio
  ];

  const adjustedEnd: TPoint = [
    midPoint[0] + dx * ratio,
    midPoint[1] + dy * ratio
  ];

  return { adjustedStart, adjustedEnd };
};
