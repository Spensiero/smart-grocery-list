import { ReactNode } from 'react';

export type Product = {
    x: number;
    y: number;
    icon: string | ReactNode;
    name: string;
  };
  
  export function constrainedDistance(a: {x: number, y: number}, b: {x: number, y: number}): number {
    if (a.x === b.x) {
      return Math.abs(a.y - b.y);
    } else {
      const down = a.y + b.y + Math.abs(a.x - b.x);
      const up = (3 - a.y) + (3 - b.y) + Math.abs(a.x - b.x);
  
      return Math.min(down, up);
    }
  }
  
  
  function nearestNeighbor(products: Product[]): Product[] {
    const unvisited = [...products];
    const path: Product[] = [];
    let current = { x: 0, y: 0 };
  
    while (unvisited.length > 0) {
      let nearestIndex = 0;
      let minDist = constrainedDistance(current, unvisited[0]);
  
      for (let i = 1; i < unvisited.length; i++) {
        const dist = constrainedDistance(current, unvisited[i]);
        if (dist < minDist) {
          nearestIndex = i;
          minDist = dist;
        }
      }
  
      const next = unvisited.splice(nearestIndex, 1)[0];
      path.push(next);
      current = next;
    }
  
    return path;
  }
  
  function totalDistance(path: Product[]): number {
    const start = { x: 0, y: 0 };
    const end = { x: 3, y: 0 };
  
    let total = constrainedDistance(start, path[0]);
    for (let i = 0; i < path.length - 1; i++) {
      total += constrainedDistance(path[i], path[i + 1]);
    }
    total += constrainedDistance(path[path.length - 1], end);
  
    return total;
  }
  
  export function optimizeShoppingPath(products: Product[]): { path: Product[], totalDistance: number } {
    const path = nearestNeighbor(products);
    const dist = totalDistance(path);
    return { path, totalDistance: dist };
  }  