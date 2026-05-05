# Livro de projetos 01

## Descrição

Layout em forma de **livro pixel** (inspirado em interfaces tipo livro de jogo) com **dois spreads**: página esquerda com mock do projeto e **hotspots** clicáveis; página direita com blocos de texto. Ao escolher um hotspot, o bloco com o mesmo `ref` é **realçado** na coluna de notas. Inclui **viragem entre spreads** (animação com `opacity` / `transform` no desktop), **teclas seta** e **Escape** para limpar o destaque, e modo **mobile** com alternância entre vista do projeto e texto.

## Onde usar

- Portfólio, landing ou site institucional para apresentar casos de estudo com cruzamento visual ↔ narrativa.
- Quando quiseres evitar dependências e manter tudo em HTML/CSS/JS.

## Recursos

- Tokens `--book-*` em `:root` (paleta marrom / pergaminho / cinza pixel).
- Tipografia pixel na demo: **VT323** (Google Fonts no `index.html`); em produção sem CDN, self-host ou substitui por `monospace`.
- `prefers-reduced-motion` reduz transições.
- `aria-live="polite"` anuncia mudança de spread.
- Hotspots com `aria-pressed` e `aria-label`.

## Estrutura de ficheiros

```
project-book-01/
  index.html    — demo + JSON em #project-book-data
  style.css
  script.js
  README.md
```

## Modelo de dados (JSON)

O script lê o conteúdo de `#project-book-data`:

- `bookLabelPt` / `bookLabelEn` — `aria-label` do livro (usa `lang` do `<html>`).
- `spreads[]` — cada entrada:
  - `announcerPt` / `announcerEn` — texto curto para a região `aria-live` ao mudar de spread.
  - `projectTitle` — título na página esquerda.
  - `leftHeadingPt`, `rightHeadingPt` — cabeçalhos das colunas.
  - `hotspots[]` — `id`, `label`, `topPct`, `leftPct`, `widthPct`, `heightPct` (percentagem dentro do mock).
  - `blocks[]` — `ref` (deve coincidir com `id` de um hotspot), `titlePt`, `bodyPt` (opcional `titleEn` / `bodyEn`).

## Como usar

1. Copia a pasta para o teu projeto.
2. Ajusta o JSON com os teus projetos e textos.
3. Mantém `data-target` no hotspot igual a `data-ref` no bloco (gerado a partir de `ref`).
4. Para segundo visual de mock, o script aplica a classe `pb-mock--data` no segundo spread; podes duplicar a lógica de `variant` em `script.js` para mais estilos.

## Personalização

- Cores e raio: variáveis `--book-*` no topo de `style.css`.
- Velocidade: `--book-transition`.
- Mock da esquerda: editar HTML gerado em `buildMock` / CSS `.pb-mock*` em `style.css`.

## Dependências

- Demo: fonte VT323 via Google Fonts (opcional).
- Sem outras bibliotecas.

## Acessibilidade

- Skip link na demo.
- Botões nativos para hotspots e navegação.
- Foco visível (`:focus-visible`).
- Região anunciada ao mudar de spread.

## Responsividade

- A partir de `720px` de largura: duas colunas e perspetiva leve.
- Abaixo disso: uma coluna de cada vez com botões **Vista do projeto** / **Texto**.

## Pré-visualização no hub Vite

Na raiz do repositório:

```bash
npm run library:sync
npm run dev
```

Abre o catálogo e o item **Livro de projetos 01** para ver o iframe. O script de sync copia esta pasta para `public/library/project-book-01/`.

## Possíveis evoluções

- Mais spreads e variantes de mock.
- Swipe em touch para mudar de spread.
- Sincronizar URL hash com o spread ativo.
