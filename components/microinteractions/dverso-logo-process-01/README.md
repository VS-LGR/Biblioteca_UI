# DVERSO logo processo 01 — ciclo com tooltips

## Descrição

Demo interativa que sobrepõe **cinco hotspots** circulares sobre o infográfico oficial (`aiAtivo 9LogoDverso.webp`), seguindo a mesma lógica do desenho: cristas do infinito (01, 03 e 04 combinados, 06) com painéis **acima** do ícone; vales (02, 05) com painéis **abaixo**. Em ecrãs estreitos (inferior a 720px de largura), o conteúdo aparece numa **lista de cinco etapas** (03–04 juntos) com miniatura da arte. Abaixo, **linha de ligação** e duas caixas (supervisão mais escura, reavaliação mais clara), como no material de referência.

## Onde usar

- Landing pages e sites institucionais de clínicas ou serviços com processo em etapas.
- Qualquer projeto que possa servir a imagem a partir da raiz pública (Vite: ficheiro em `public/`).

## Estrutura de ficheiros

```
dverso-logo-process-01/
  index.html
  style.css
  script.js
  README.md
```

## Como usar

1. Copie a pasta do componente para o seu projeto.
2. Garanta que o WebP está acessível na URL usada no `src` da imagem (nesta demo: `/aiAtivo%209LogoDverso.webp` — note o encoding do espaço no nome do ficheiro).
3. Inclua `style.css` e, no final do `body`, `script.js` com `defer`.
4. Ajuste as posições dos hotspots editando `--dlp-hotspot-x` e `--dlp-hotspot-y` em cada `.dlp-hotspot` no HTML (valores em `%` relativos ao retângulo da imagem).

## Personalização

| Token / área | Efeito |
|--------------|--------|
| `--dlp-navy`, `--dlp-mid`, `--dlp-sky` | Paleta próxima do infográfico |
| `--dlp-transition` | Velocidade das transições |
| `--dlp-touch` | Tamanho mínimo do alvo de toque nos hotspots |
| `--dlp-break` | Largura a partir da qual se mostra o mapa (também em `script.js`: `720px`) |
| `data-dlp-step="2"` e `"5"` | Vales da trilha: painéis **abaixo** do ícone |
| `data-dlp-step="1"`, `"3"`, `"6"` | Cristas: painéis **acima** do ícone |

## Dependências

Nenhuma biblioteca externa.

## JavaScript

Opcional mas recomendado: sincroniza `aria-expanded` / `aria-hidden` nos painéis desktop, acordeão mobile, **Escape** para fechar, e repõe estado ao mudar a largura da janela. O aspeto visual dos tooltips funciona só com CSS (`:hover`, `:focus-within`).

## Acessibilidade

- Hotspots são `<button type="button">` com texto acessível (`.dlp-visually-hidden`).
- Painéis desktop: `role="region"` e `aria-labelledby`; `aria-hidden` gerido por JS quando o painel está oculto a leitores.
- Mobile: `aria-expanded` e `hidden` nos painéis; um painel aberto de cada vez.
- Foco visível nos botões; link de salto para o conteúdo principal.

## Responsividade

- A partir de 720px: infográfico + hotspots.
- Abaixo de 720px: lista + miniatura; sem dependência de alinhamento pixel-perfect nos círculos.

## Possíveis variações futuras

- i18n (duplicar textos ou carregar JSON).
- Trocar a imagem por SVG vetorial e ancora `href` em coordenadas.
- Um único painel flutuante cujo conteúdo muda via JS (menos DOM, mais lógica).
- Fechar outros painéis ao abrir um (comportamento estilo “accordion” no desktop).
