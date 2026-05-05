export type TreeNodeState = "default" | "active" | "disabled";

export type TreeMenuLogicalPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "leftTop"
  | "leftMid"
  | "leftBottom"
  | "rightTop"
  | "rightMid"
  | "rightBottom"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight"
  | "auto";

export interface TreeMenuNode {
  id: string;
  label: string;
  href?: string;
  ariaLabel?: string;
  state?: TreeNodeState;
  position?: TreeMenuLogicalPosition;
  children?: TreeMenuNode[];
}

export interface TreeMenuLayoutNode {
  id: string;
  label: string;
  href?: string;
  ariaLabel?: string;
  state: TreeNodeState;
  xPercent: number;
  yPercent: number;
  depth: number;
  parentId?: string;
}

export type TreeMenuVariant = "psychology" | "calm" | "contrast";

export type TreeMenuSize = "sm" | "md" | "lg";
