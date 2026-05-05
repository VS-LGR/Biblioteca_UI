import type { TreeMenuSize, TreeMenuVariant } from "./types";

export interface TreeMenuTokens {
  background: string;
  trunk: string;
  branch: string;
  blossom: string;
  blossomSoft: string;
  text: string;
  textContrast: string;
  focus: string;
}

export const TREE_MENU_TOKENS: Record<TreeMenuVariant, TreeMenuTokens> = {
  psychology: {
    background: "#f7f7f8",
    trunk: "#5f1f17",
    branch: "#4a1612",
    blossom: "#f48fb1",
    blossomSoft: "#fdd4e1",
    text: "#2f2b2c",
    textContrast: "#ffffff",
    focus: "#1f7aec",
  },
  calm: {
    background: "#f6fbf6",
    trunk: "#355e3b",
    branch: "#234428",
    blossom: "#9fd6a5",
    blossomSoft: "#d8efdb",
    text: "#1f2d22",
    textContrast: "#ffffff",
    focus: "#0b66d9",
  },
  contrast: {
    background: "#f3f3f5",
    trunk: "#1d1d1f",
    branch: "#111113",
    blossom: "#e06ba8",
    blossomSoft: "#f7c3dc",
    text: "#111113",
    textContrast: "#ffffff",
    focus: "#005fcc",
  },
};

export const TREE_MENU_SIZE_MAP: Record<
  TreeMenuSize,
  { width: number; height: number; nodePaddingX: number; nodePaddingY: number; fontSize: number }
> = {
  sm: { width: 620, height: 500, nodePaddingX: 14, nodePaddingY: 8, fontSize: 14 },
  md: { width: 800, height: 600, nodePaddingX: 18, nodePaddingY: 10, fontSize: 16 },
  lg: { width: 980, height: 720, nodePaddingX: 22, nodePaddingY: 12, fontSize: 18 },
};
