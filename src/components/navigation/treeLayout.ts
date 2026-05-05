import type {
  TreeMenuLayoutNode,
  TreeMenuLogicalPosition,
  TreeMenuNode,
  TreeNodeState,
} from "./types";

const LOGICAL_POSITIONS: Exclude<TreeMenuLogicalPosition, "auto">[] = [
  "topLeft",
  "topCenter",
  "topRight",
  "leftTop",
  "leftMid",
  "leftBottom",
  "rightTop",
  "rightMid",
  "rightBottom",
  "bottomLeft",
  "bottomCenter",
  "bottomRight",
];

const POSITION_MAP: Record<Exclude<TreeMenuLogicalPosition, "auto">, { x: number; y: number }> = {
  topLeft: { x: 30, y: 18 },
  topCenter: { x: 50, y: 12 },
  topRight: { x: 70, y: 18 },
  leftTop: { x: 18, y: 35 },
  leftMid: { x: 12, y: 50 },
  leftBottom: { x: 20, y: 66 },
  rightTop: { x: 82, y: 35 },
  rightMid: { x: 88, y: 50 },
  rightBottom: { x: 80, y: 66 },
  bottomLeft: { x: 34, y: 75 },
  bottomCenter: { x: 50, y: 81 },
  bottomRight: { x: 66, y: 75 },
};

const normalizeState = (state?: TreeNodeState): TreeNodeState => {
  if (state === "active" || state === "disabled") {
    return state;
  }

  return "default";
};

interface FlattenedNode {
  id: string;
  label: string;
  href?: string;
  ariaLabel?: string;
  state: TreeNodeState;
  depth: number;
  parentId?: string;
  position?: TreeMenuLogicalPosition;
}

const flattenNodes = (
  nodes: TreeMenuNode[],
  depth = 0,
  parentId?: string,
  collection: FlattenedNode[] = []
): FlattenedNode[] => {
  for (const node of nodes) {
    collection.push({
      id: node.id,
      label: node.label,
      href: node.href,
      ariaLabel: node.ariaLabel,
      state: normalizeState(node.state),
      depth,
      parentId,
      position: node.position,
    });

    if (node.children?.length) {
      flattenNodes(node.children, depth + 1, node.id, collection);
    }
  }

  return collection;
};

export const buildTreeLayout = (nodes: TreeMenuNode[]): TreeMenuLayoutNode[] => {
  const flattened = flattenNodes(nodes);
  const occupied = new Set<string>();
  let autoIndex = 0;

  return flattened.map((node) => {
    const requested =
      node.position && node.position !== "auto" && !occupied.has(node.position) ? node.position : undefined;

    const fallbackPosition = LOGICAL_POSITIONS[autoIndex % LOGICAL_POSITIONS.length];
    const finalPosition = requested ?? fallbackPosition;

    occupied.add(finalPosition);
    autoIndex += requested ? 0 : 1;

    const point = POSITION_MAP[finalPosition];

    // Subitems are gently shifted toward their parent branch.
    const depthShift = Math.min(node.depth * 2.5, 7);
    const shiftedX = point.x < 50 ? point.x + depthShift : point.x - depthShift;
    const shiftedY = point.y + Math.min(node.depth * 1.5, 4);

    return {
      id: node.id,
      label: node.label,
      href: node.href,
      ariaLabel: node.ariaLabel,
      state: node.state,
      xPercent: shiftedX,
      yPercent: shiftedY,
      depth: node.depth,
      parentId: node.parentId,
    };
  });
};
