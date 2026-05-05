import { useMemo, type CSSProperties } from "react";
import { TREE_MENU_SIZE_MAP, TREE_MENU_TOKENS } from "./treeMenu.tokens";
import type { TreeMenuNode, TreeMenuSize, TreeMenuVariant } from "./types";
import "./TreeMenu.css";

interface TreeMenuProps {
  data: TreeMenuNode[];
  title?: string;
  variant?: TreeMenuVariant;
  size?: TreeMenuSize;
  className?: string;
  onNodeClick?: (node: TreeMenuNode) => void;
}

const flattenNodeLookup = (nodes: TreeMenuNode[], map = new Map<string, TreeMenuNode>()) => {
  for (const node of nodes) {
    map.set(node.id, node);
    if (node.children?.length) {
      flattenNodeLookup(node.children, map);
    }
  }
  return map;
};

const DEFAULT_TITLE = "Menu de psicologia em formato de árvore";

const getNodeSeed = (id: string): number => {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash << 5) - hash + id.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const createPetalCluster = (seed: number) => {
  const petals = [];
  for (let index = 0; index < 7; index += 1) {
    const angle = ((seed + index * 51) % 360) * (Math.PI / 180);
    const radius = 10 + ((seed + index * 19) % 11);
    petals.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * (radius * 0.68),
      r: 6 + ((seed + index * 11) % 4),
      soft: index % 2 === 0,
    });
  }
  return petals;
};

const EXTRA_BLOSSOMS = [
  { x: 19, y: 32, r: 11 },
  { x: 26, y: 26, r: 11 },
  { x: 36, y: 23, r: 12 },
  { x: 47, y: 18, r: 12 },
  { x: 58, y: 18, r: 11 },
  { x: 68, y: 21, r: 11 },
  { x: 77, y: 28, r: 12 },
  { x: 84, y: 36, r: 11 },
  { x: 86, y: 47, r: 11 },
  { x: 82, y: 58, r: 11 },
  { x: 72, y: 66, r: 12 },
  { x: 60, y: 70, r: 11 },
  { x: 47, y: 71, r: 11 },
  { x: 34, y: 67, r: 11 },
  { x: 22, y: 60, r: 11 },
  { x: 14, y: 49, r: 10 },
];

const STATIC_MENU_SLOTS = [
  { xPercent: 30, yPercent: 30 },
  { xPercent: 15, yPercent: 52 },
  { xPercent: 31, yPercent: 70 },
  { xPercent: 67, yPercent: 23 },
  { xPercent: 83, yPercent: 46 },
  { xPercent: 72, yPercent: 69 },
];

const STATIC_BRANCH_ANCHORS = [
  { startX: 0.47, startY: 0.36, c1x: 0.4, c1y: 0.33, c2x: 0.34, c2y: 0.31 },
  { startX: 0.45, startY: 0.45, c1x: 0.34, c1y: 0.45, c2x: 0.24, c2y: 0.48 },
  { startX: 0.46, startY: 0.56, c1x: 0.35, c1y: 0.57, c2x: 0.32, c2y: 0.66 },
  { startX: 0.51, startY: 0.3, c1x: 0.58, c1y: 0.27, c2x: 0.63, c2y: 0.24 },
  { startX: 0.54, startY: 0.41, c1x: 0.67, c1y: 0.39, c2x: 0.78, c2y: 0.43 },
  { startX: 0.56, startY: 0.52, c1x: 0.66, c1y: 0.57, c2x: 0.69, c2y: 0.66 },
];

interface StaticLayoutNode {
  id: string;
  label: string;
  state: "default" | "active" | "disabled";
  ariaLabel: string | undefined;
  href: string | undefined;
  xPercent: number;
  yPercent: number;
}

export const TreeMenu = ({
  data,
  title = DEFAULT_TITLE,
  variant = "psychology",
  size = "md",
  className = "",
  onNodeClick,
}: TreeMenuProps) => {
  const tokens = TREE_MENU_TOKENS[variant];
  const sizeToken = TREE_MENU_SIZE_MAP[size];
  const rootNodes = useMemo(() => data.slice(0, 6), [data]);
  const nodeMap = useMemo(() => flattenNodeLookup(rootNodes), [rootNodes]);
  const staticNodes = useMemo(
    () => {
      const slots: StaticLayoutNode[] = [];
      STATIC_MENU_SLOTS.forEach((slot, index) => {
        const node = rootNodes[index];
        if (!node) {
          return;
        }
        slots.push({
          ...slot,
          id: node.id,
          label: node.label,
          state: node.state ?? "default",
          ariaLabel: node.ariaLabel,
          href: node.href,
        });
      });
      return slots;
    },
    [rootNodes]
  );
  const branchPaths = useMemo(
    () =>
      STATIC_BRANCH_ANCHORS.map((anchor, index) => {
        const slot = staticNodes[index];
        if (!slot) return null;
        const endX = (slot.xPercent / 100) * sizeToken.width;
        const endY = (slot.yPercent / 100) * sizeToken.height + 18;
        return {
          id: slot.id,
          d: `M ${sizeToken.width * anchor.startX} ${sizeToken.height * anchor.startY} C
              ${sizeToken.width * anchor.c1x} ${sizeToken.height * anchor.c1y},
              ${sizeToken.width * anchor.c2x} ${sizeToken.height * anchor.c2y},
              ${endX} ${endY}`,
        };
      }).filter((item): item is { id: string; d: string } => item !== null),
    [sizeToken.height, sizeToken.width, staticNodes]
  );

  return (
    <section
      className={`treeMenu ${className}`.trim()}
      style={
        {
          "--tree-bg": tokens.background,
          "--tree-trunk": tokens.trunk,
          "--tree-branch": tokens.branch,
          "--tree-blossom": tokens.blossom,
          "--tree-blossom-soft": tokens.blossomSoft,
          "--tree-text": tokens.text,
          "--tree-text-contrast": tokens.textContrast,
          "--tree-focus": tokens.focus,
          "--tree-font-size": `${sizeToken.fontSize}px`,
          "--tree-node-px": `${sizeToken.nodePaddingX}px`,
          "--tree-node-py": `${sizeToken.nodePaddingY}px`,
        } as CSSProperties
      }
      aria-label={title}
    >
      <svg
        className="treeMenu__svg"
        viewBox={`0 0 ${sizeToken.width} ${sizeToken.height}`}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="treeSky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--tree-bg)" />
            <stop offset="100%" stopColor="#f2eef1" />
          </linearGradient>

          <linearGradient id="trunkGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--tree-trunk) 85%, #2f120e)" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--tree-trunk) 68%, #120707)" />
          </linearGradient>

          <linearGradient id="branchGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--tree-trunk)" />
            <stop offset="100%" stopColor="var(--tree-branch)" />
          </linearGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#2f1110" floodOpacity="0.3" />
          </filter>
        </defs>

        <rect x="0" y="0" width={sizeToken.width} height={sizeToken.height} fill="url(#treeSky)" />
        <ellipse cx={sizeToken.width * 0.5} cy={sizeToken.height * 0.95} rx={sizeToken.width * 0.34} ry={sizeToken.height * 0.055} className="treeMenu__groundShadow" />

        <path
          className="treeMenu__trunk"
          filter="url(#softShadow)"
          d={`M ${sizeToken.width * 0.42} ${sizeToken.height * 0.94}
             C ${sizeToken.width * 0.5} ${sizeToken.height * 0.91},
               ${sizeToken.width * 0.57} ${sizeToken.height * 0.91},
               ${sizeToken.width * 0.62} ${sizeToken.height * 0.94}
             C ${sizeToken.width * 0.61} ${sizeToken.height * 0.86},
               ${sizeToken.width * 0.57} ${sizeToken.height * 0.79},
               ${sizeToken.width * 0.56} ${sizeToken.height * 0.71}
             C ${sizeToken.width * 0.55} ${sizeToken.height * 0.62},
               ${sizeToken.width * 0.57} ${sizeToken.height * 0.54},
               ${sizeToken.width * 0.54} ${sizeToken.height * 0.48}
             C ${sizeToken.width * 0.52} ${sizeToken.height * 0.43},
               ${sizeToken.width * 0.5} ${sizeToken.height * 0.39},
               ${sizeToken.width * 0.49} ${sizeToken.height * 0.34}
             C ${sizeToken.width * 0.47} ${sizeToken.height * 0.38},
               ${sizeToken.width * 0.43} ${sizeToken.height * 0.44},
               ${sizeToken.width * 0.43} ${sizeToken.height * 0.53}
             C ${sizeToken.width * 0.43} ${sizeToken.height * 0.63},
               ${sizeToken.width * 0.46} ${sizeToken.height * 0.74},
               ${sizeToken.width * 0.44} ${sizeToken.height * 0.83}
             C ${sizeToken.width * 0.43} ${sizeToken.height * 0.88},
               ${sizeToken.width * 0.42} ${sizeToken.height * 0.92},
               ${sizeToken.width * 0.42} ${sizeToken.height * 0.94} Z`}
        />

        {branchPaths.map((path, index) => (
          <path
            key={`base-branch-${index}`}
            className={`treeMenu__branch ${index % 2 ? "treeMenu__branch--front" : "treeMenu__branch--back"}`}
            d={path.d}
            style={{ strokeWidth: index < 4 ? 9 : 7 }}
          />
        ))}

        {staticNodes.map((node) => {
          const x = (node.xPercent / 100) * sizeToken.width;
          const y = (node.yPercent / 100) * sizeToken.height;
          const seed = getNodeSeed(node.id);
          const petals = createPetalCluster(seed);

          return (
            <g key={`branch-${node.id}`}>
              {petals.map((petal, index) => (
                <circle
                  key={`${node.id}-petal-${index}`}
                  cx={x + petal.x}
                  cy={y + petal.y}
                  r={petal.r}
                  className={petal.soft ? "treeMenu__blossomSoft" : "treeMenu__blossom"}
                />
              ))}

              <circle cx={x} cy={y + 10} r={15} className="treeMenu__blossomCore" />
              <circle cx={x + 3} cy={y + 9} r={3} className="treeMenu__pollen" />
            </g>
          );
        })}

        {EXTRA_BLOSSOMS.map((flower, index) => {
          const x = (flower.x / 100) * sizeToken.width;
          const y = (flower.y / 100) * sizeToken.height;
          return (
            <g key={`extra-flower-${index}`}>
              <circle cx={x - 8} cy={y - 1} r={flower.r} className="treeMenu__blossomSoft" />
              <circle cx={x + 8} cy={y - 3} r={flower.r - 1.5} className="treeMenu__blossom" />
              <circle cx={x} cy={y + 8} r={flower.r - 1} className="treeMenu__blossomSoft" />
              <circle cx={x} cy={y} r={flower.r - 4} className="treeMenu__blossomCore" />
            </g>
          );
        })}
      </svg>

      <div className="treeMenu__nodesLayer">
        {staticNodes.map((layoutNode) => {
          const originalNode = nodeMap.get(layoutNode.id);
          if (!originalNode) {
            return null;
          }

          const isDisabled = layoutNode.state === "disabled";
          const isActive = layoutNode.state === "active";
          const label = layoutNode.ariaLabel || layoutNode.label;

          return (
            <a
              key={layoutNode.id}
              href={isDisabled ? undefined : layoutNode.href}
              className={`treeMenu__node treeMenu__node--${layoutNode.state}`}
              style={{ left: `${layoutNode.xPercent}%`, top: `${layoutNode.yPercent}%` }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              aria-disabled={isDisabled || undefined}
              onClick={(event) => {
                if (isDisabled) {
                  event.preventDefault();
                  return;
                }

                onNodeClick?.(originalNode);
              }}
            >
              {layoutNode.label}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default TreeMenu;
