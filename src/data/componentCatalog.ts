export type Lang = "pt" | "en";

export type ComponentFileRef = {
  name: string;
  repoPath: string;
  rolePt: string;
  roleEn: string;
};

export type ComponentEntry = {
  id: string;
  categoryPt: string;
  categoryEn: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  tagsPt: string[];
  tagsEn: string[];
  files: ComponentFileRef[];
  demoUrl?: string;
};

const role = (pt: string, en: string) => ({ rolePt: pt, roleEn: en });

export const PORTFOLIO_URL = "https://lgr-design.vercel.app";

export const COMPONENT_CATALOG: ComponentEntry[] = [
  {
    id: "header-01",
    categoryPt: "Headers",
    categoryEn: "Headers",
    titlePt: "Header responsivo com menu mobile",
    titleEn: "Responsive header with mobile menu",
    descriptionPt:
      "Barra fixa, navegação em linha no desktop, gaveta animada no telemóvel, backdrop, scroll com sombra e suporte a teclado e leitores de ecrã.",
    descriptionEn:
      "Fixed bar, row navigation on desktop, animated drawer on small screens, backdrop, scroll styling, and keyboard / screen reader support.",
    tagsPt: ["HTML", "CSS", "JS", "Acessível"],
    tagsEn: ["HTML", "CSS", "JS", "Accessible"],
    /** Caminho relativo ao origin (prefixado com import.meta.env.BASE_URL na UI) */
    demoUrl: "library/header-01/index.html",
    files: [
      {
        name: "index.html",
        repoPath: "components/headers/header-01/index.html",
        ...role("Marcação e demo", "Markup and demo"),
      },
      {
        name: "style.css",
        repoPath: "components/headers/header-01/style.css",
        ...role("Estilos e tokens da página", "Styles and page tokens"),
      },
      {
        name: "script.js",
        repoPath: "components/headers/header-01/script.js",
        ...role("Menu, scroll e foco", "Menu, scroll, and focus"),
      },
      {
        name: "README.md",
        repoPath: "components/headers/header-01/README.md",
        ...role("Documentação", "Documentation"),
      },
    ],
  },
  {
    id: "button-01",
    categoryPt: "Botões",
    categoryEn: "Buttons",
    titlePt: "Botão primário e fantasma",
    titleEn: "Primary and ghost button",
    descriptionPt:
      "Estilos reutilizáveis para ações principais e secundárias, com estados de hover, foco e desativação. Depende dos tokens :root da página.",
    descriptionEn:
      "Reusable styles for primary and secondary actions, with hover, focus, and disabled states. Expects page :root tokens.",
    tagsPt: ["CSS", "Sem JS"],
    tagsEn: ["CSS", "No JS"],
    files: [
      {
        name: "style.css",
        repoPath: "components/buttons/button-01/style.css",
        ...role("Classes .ui-button*", "Classes .ui-button*"),
      },
      {
        name: "README.md",
        repoPath: "components/buttons/button-01/README.md",
        ...role("Documentação", "Documentation"),
      },
    ],
  },
  {
    id: "project-book-01",
    categoryPt: "Layout",
    categoryEn: "Layout",
    titlePt: "Livro de projetos + animação de página",
    titleEn: "Project book + page animation",
    descriptionPt:
      "Livro em estética pixel com spreads, hotspots na vista do projeto e destaque cruzado no texto, viragem entre spreads e modo mobile (vista / texto).",
    descriptionEn:
      "Pixel-style book with spreads, hotspots on the project view and cross-highlighted notes, spread transitions, and a mobile project/text toggle.",
    tagsPt: ["HTML", "CSS", "JS", "Animação"],
    tagsEn: ["HTML", "CSS", "JS", "Animation"],
    demoUrl: "library/project-book-01/index.html",
    files: [
      {
        name: "index.html",
        repoPath: "components/layout/project-book-01/index.html",
        ...role("Demo e JSON de conteúdo", "Demo and content JSON"),
      },
      {
        name: "style.css",
        repoPath: "components/layout/project-book-01/style.css",
        ...role("Tokens e layout do livro", "Book tokens and layout"),
      },
      {
        name: "script.js",
        repoPath: "components/layout/project-book-01/script.js",
        ...role("Montagem do DOM e interações", "DOM build and interactions"),
      },
      {
        name: "README.md",
        repoPath: "components/layout/project-book-01/README.md",
        ...role("Documentação", "Documentation"),
      },
    ],
  },
  {
    id: "dverso-logo-process-01",
    categoryPt: "Microinterações",
    categoryEn: "Microinteractions",
    titlePt: "Logo DVERSO — ciclo com tooltips",
    titleEn: "DVERSO logo — process cycle with tooltips",
    descriptionPt:
      "Cinco hotspots alinhados ao infográfico (03–04 num único ponto), painéis acima ou abaixo conforme crista ou vale da trilha, lista em ecrã estreito e cartões de supervisão/reavaliação com linha de ligação.",
    descriptionEn:
      "Five hotspots aligned to the infographic (03–04 merged), panels above or below peaks and valleys, small-screen list, supervision/re-evaluation cards with connector rail.",
    tagsPt: ["HTML", "CSS", "JS", "Acessível", "Tooltip"],
    tagsEn: ["HTML", "CSS", "JS", "Accessible", "Tooltip"],
    demoUrl: "library/microinteractions/dverso-logo-process-01/index.html",
    files: [
      {
        name: "index.html",
        repoPath:
          "components/microinteractions/dverso-logo-process-01/index.html",
        ...role("Marcação e conteúdo das etapas", "Markup and step content"),
      },
      {
        name: "style.css",
        repoPath: "components/microinteractions/dverso-logo-process-01/style.css",
        ...role("Tokens, layout, tooltips e responsividade", "Tokens, layout, tooltips, responsive"),
      },
      {
        name: "script.js",
        repoPath:
          "components/microinteractions/dverso-logo-process-01/script.js",
        ...role("Acordeão mobile, ARIA e Escape", "Mobile accordion, ARIA, Escape"),
      },
      {
        name: "README.md",
        repoPath:
          "components/microinteractions/dverso-logo-process-01/README.md",
        ...role("Documentação", "Documentation"),
      },
    ],
  },
];

export function categoryLabel(entry: ComponentEntry, lang: Lang): string {
  return lang === "pt" ? entry.categoryPt : entry.categoryEn;
}

export function titleLabel(entry: ComponentEntry, lang: Lang): string {
  return lang === "pt" ? entry.titlePt : entry.titleEn;
}

export function descriptionLabel(entry: ComponentEntry, lang: Lang): string {
  return lang === "pt" ? entry.descriptionPt : entry.descriptionEn;
}

export function tagsFor(entry: ComponentEntry, lang: Lang): string[] {
  return lang === "pt" ? entry.tagsPt : entry.tagsEn;
}

export function fileRole(file: ComponentFileRef, lang: Lang): string {
  return lang === "pt" ? file.rolePt : file.roleEn;
}
