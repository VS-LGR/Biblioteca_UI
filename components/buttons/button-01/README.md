# Button 01 — Primário e fantasma

## Descrição

Botão de interface com variantes **primária** (gradiente suave + sombra) e **fantasma** (borda leve). Pensado para CTAs em heros, formulários e barras de ação. Usa as mesmas variáveis CSS da Biblioteca UI (`--ui-color-*`, `--ui-radius-*`, `--ui-transition-fast`).

## Onde usar

- Heros e seções de conversão.
- Formulários (enviar, cancelar).
- Qualquer projeto que já defina os tokens `:root` desta biblioteca.

## Recursos

- Estados: hover, focus visível, active (leve scale), disabled.
- Tamanho `--lg` opcional (classe `ui-button--lg`).
- Sem JavaScript.

## Estrutura de arquivos

```
button-01/
  style.css
  README.md
```

## Como usar

1. Garanta que a página tenha os tokens em `:root` (como em `headers/header-01/style.css`).
2. Inclua `style.css` depois dos tokens (ou no mesmo ficheiro após `:root`).
3. Marcação:

```html
<button type="button" class="ui-button ui-button--primary">Começar</button>
<a class="ui-button ui-button--ghost" href="#docs">Documentação</a>
```

## Como personalizar

- Cores: `--ui-color-accent`, `--ui-color-primary`, etc.
- Raio: `--ui-radius-md`.
- Sombra do primário: ajuste o `box-shadow` em `.ui-button--primary`.

## Dependências

Nenhuma.

## Acessibilidade

- Use sempre `<button type="button">` para ações; `<a href>` apenas para navegação real.
- Contraste do texto do primário: texto em `#0f172a` sobre accent; ajuste se mudar o accent.

## Responsividade

- `min-height` confortável para toque; em telas muito estreitas pode usar `width: 100%` no contentor pai.

## Possíveis variações futuras

- Variante `danger`, `link`, ícone + texto, loading com spinner.
