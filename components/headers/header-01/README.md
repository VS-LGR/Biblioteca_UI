# Header 01 — Responsivo com menu mobile animado

## Descrição

Header fixo no topo com navegação horizontal no desktop, menu em gaveta no mobile (animação com `transform`), mudança visual ao rolar a página (sombra e fundo mais opaco), estados de hover e foco, `aria-expanded` / `aria-controls` e suporte a `prefers-reduced-motion`. A página `index.html` inclui também o **Button 01** (`../../buttons/button-01/style.css`) como segundo componente de exemplo na hero e no painel final.

## Onde usar

- Sites com poucos itens de menu (4–8 links).
- Projetos em HTML/CSS/JS puro ou como referência para portar a React, Next.js, etc.
- Quando se quer evitar dependências e manter controle total sobre acessibilidade e animação.

## Recursos

- Responsivo (breakpoint em `767px` no CSS e `768` no JS — mantenha os dois alinhados se alterar).
- Acessível: botão do menu, `aria-expanded`, `aria-controls`, `aria-hidden` no drawer, link “Ir para o conteúdo”, foco visível, armadilha de foco no drawer, Escape e backdrop para fechar.
- Animações suaves (gaveta, ícone hamburger, backdrop) com `transform` e `opacity`.
- Fácil de customizar via variáveis CSS e classes `ui-header*`.
- Reutilizável: copie a pasta inteira e ajuste links, logo e tokens.

## Estrutura de arquivos

```
header-01/
  index.html   — marcação de exemplo + área de demo com scroll
  style.css    — tokens, layout, estados e animações
  script.js    — menu, scroll, altura do header e teclado
  README.md    — esta documentação
```

## Como usar

1. Copie a pasta `header-01` para o seu projeto (ou integre os trechos no seu layout).
2. No HTML da sua página, inclua a mesma estrutura de `<header class="ui-header">` (marca, botão, `nav#primary-menu`, backdrop).
3. Inclua `style.css` e `script.js` (ordem: CSS no `<head>`, JS antes de `</body>` ou `defer` no `<head>`).
4. Ajuste os links em `.ui-header__list` e o texto do `.ui-header__brand`.

**Importante:** o script define `--ui-header-h` em `:root` com a altura real do header para posicionar o backdrop e a gaveta; não remova a classe `.ui-header` do elemento raiz do componente.

## Como personalizar

| Aspecto | Onde alterar |
|--------|----------------|
| Cores, raios, sombras, transições | `:root` no início de `style.css` |
| Largura máxima da barra | `.ui-header__inner { max-width }` |
| Largura da gaveta mobile | `--ui-nav-max-w` em `:root` |
| Breakpoint desktop/mobile | `@media (max-width: 767px)` em `style.css` e constante `BREAKPOINT` em `script.js` |
| Velocidade das animações | `--ui-transition-*` |
| Intensidade do blur no scroll | `.ui-header` e `.ui-header.is-scrolled` |
| Conteúdo de demo | Seções `.ui-demo-*` em `index.html` (podem ser removidas) |

Classes seguem o padrão `ui-header`, `ui-header__elemento` (BEM-like) para evitar colisões.

## Dependências

Nenhuma. Apenas HTML5, CSS e JavaScript ES5+ compatível com navegadores modernos.

## Acessibilidade

- Menu mobile é controlado por `<button type="button">` (não use `<div>` clicável).
- `aria-expanded` e `aria-controls` ligam o botão ao `#primary-menu`.
- Com o drawer fechado no mobile, links e o botão “Fechar” recebem `tabindex="-1"` para não entrarem na ordem de tabulação até o menu abrir.
- Escape fecha o menu e devolve o foco ao botão hamburger; o mesmo ao fechar pelo backdrop ou pelo botão “Fechar”.
- Clique em um link do menu no mobile fecha o gaveta (navegação in-page ou externa).
- `prefers-reduced-motion`: transições são encurtadas globalmente no CSS de exemplo (ajuste se quiser um bloco só para este componente).

## Responsividade

- **Mobile (≤767px):** hamburger visível, navegação em painel lateral direito, backdrop escuro no restante da tela.
- **Tablet / desktop (≥768px):** links em linha, botão e backdrop ocultos, sem bloqueio de scroll.
- Área mínima do botão do menu: `2.75rem` × `2.75rem`.

## Possíveis variações futuras

- Indicador de item ativo (rota ou seção visível).
- Mega menu simples no desktop.
- Variante com logo em imagem (`<img>` + dimensões explícitas).
- Integração com `dialog` / `popover` quando a base de navegadores do projeto permitir.
- Tradução dos textos de `aria-label` via i18n.
