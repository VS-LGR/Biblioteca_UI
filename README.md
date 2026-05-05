# Biblioteca UI

Hub em **React + TypeScript + Vite** para explorar uma biblioteca de **componentes de interface em HTML, CSS e JavaScript** (vanilla). Cada entrada no catálogo mostra ficheiros no repositório, caminhos para copiar e, quando existir, uma **demo em iframe** servida a partir de `public/library`.

**English:** A small component library showcase — copy repo paths, browse files, and open static demos alongside the React shell.

---

## Funcionalidades

- Catálogo com metadados bilingues (PT / EN)
- Lista de ficheiros por componente com caminho no repositório e botão **copiar**
- Demos estáticas para componentes que expõem `index.html` (ex.: header, layout tipo “livro de projetos”)
- Script de sincronização que copia e ajusta assets de `components/` para `public/library/` (usado pelas demos)

## Stack

| Área        | Tecnologia        |
| ----------- | ----------------- |
| App do hub  | React 19, TypeScript |
| Build       | Vite 6            |
| Componentes | HTML, CSS, JS (sem framework na pasta `components/`) |

## Estrutura do repositório

```
├── components/          # Fonte dos blocos UI (vanilla)
│   ├── headers/
│   ├── buttons/
│   └── layout/
├── public/library/      # Gerada por `library:sync` — não versionada (ver `.gitignore`)
├── scripts/
│   └── sync-public-library.mjs
└── src/                 # App React (hub, catálogo em componentCatalog.ts)
```

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (recomendado LTS)

## Como executar

```bash
npm install
npm run dev
```

O script `predev` corre `library:sync` antes do Vite, para preencher `public/library/`. Abre o endereço indicado no terminal (por omissão `http://localhost:5173`).

### Build e pré-visualização

```bash
npm run build
npm run preview
```

O `prebuild` também corre `library:sync` antes do `tsc` e do `vite build`.

## Scripts npm

| Comando              | Descrição |
| -------------------- | --------- |
| `npm run dev`        | Servidor de desenvolvimento Vite |
| `npm run build`      | Typecheck (`tsc -b`) + build de produção |
| `npm run preview`    | Servir o build localmente |
| `npm run library:sync` | Copia demos e assets de `components/` para `public/library/` e ajusta caminhos onde necessário |

> **Nota:** `npm run dev` e `npm run build` já invocam este script (`predev` / `prebuild`). Podes correr `library:sync` manualmente se quiseres só atualizar a pasta sem subir o servidor.

## Componentes no catálogo

Os metadados vivem em `src/data/componentCatalog.ts`. Cada componente pode ter README próprio dentro da respetiva pasta em `components/`.

## Licença

ISC (ver `package.json`).

---

**Autor:** Lucas Gabriel Rodrigues · [Portfólio](https://lgr-design.vercel.app)
