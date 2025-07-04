import { GRID_CONFIG, PATH_CONFIG } from "@/components/storeMap/config";
import { TPathArrowProps } from "@/components/storeMap/types";
import { getCellCenter, getAdjustedPoints } from "@/components/storeMap/utils";

export const PathArrow = ({ path }: TPathArrowProps) => {
  if (path.length <= 1) return null;

  return (
    <svg
      width={GRID_CONFIG.WIDTH * (GRID_CONFIG.CELL_SIZE + GRID_CONFIG.CELL_GAP)}
      height={GRID_CONFIG.HEIGHT * (GRID_CONFIG.CELL_SIZE + GRID_CONFIG.CELL_GAP)}
      className="absolute top-0 left-0 z-[1]"
    >
      <defs>
        <marker
          id={PATH_CONFIG.ARROW_MARKER_ID}
          markerWidth="1.2"
          markerHeight="1.2"
          refX="1.2"
          refY="0.6"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path 
            d="M0,0 L0,1.2 L1.2,0.6 z" 
            fill="var(--color-action-discount)" 
          />
        </marker>
      </defs>
      {path.slice(0, -1).map((point, idx) => {
        const nextPoint = path[idx + 1];
        const [cx1, cy1] = getCellCenter(...point);
        const [cx2, cy2] = getCellCenter(...nextPoint);
        const { adjustedStart, adjustedEnd } = getAdjustedPoints([cx1, cy1], [cx2, cy2]);
        
        return (
          <line
            key={idx}
            x1={adjustedStart[0]}
            y1={adjustedStart[1]}
            x2={adjustedEnd[0]}
            y2={adjustedEnd[1]}
            stroke="transparent"
            strokeWidth="20"
            markerEnd={`url(#${PATH_CONFIG.ARROW_MARKER_ID})`}
          />
        );
      })}
    </svg>
  );
};
