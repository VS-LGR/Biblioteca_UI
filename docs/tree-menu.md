# TreeMenu - Guia de Implementacao

## Visao geral
`TreeMenu` e um componente reutilizavel para navegacao em formato de arvore, criado para interfaces de psicologia com opcoes distribuidas pelos galhos.

Arquivos principais:
- `src/components/navigation/TreeMenu.tsx`
- `src/components/navigation/treeLayout.ts`
- `src/components/navigation/types.ts`
- `src/components/navigation/treeMenu.tokens.ts`
- `src/components/navigation/TreeMenu.css`

## Contrato de dados (JSON)
Cada item deve seguir a estrutura:

```ts
interface TreeMenuNode {
  id: string;
  label: string;
  href?: string;
  ariaLabel?: string;
  state?: "default" | "active" | "disabled";
  position?:
    | "topLeft" | "topCenter" | "topRight"
    | "leftTop" | "leftMid" | "leftBottom"
    | "rightTop" | "rightMid" | "rightBottom"
    | "bottomLeft" | "bottomCenter" | "bottomRight"
    | "auto";
  children?: TreeMenuNode[];
}
```

Exemplo em producao:
- `src/data/psychologyTreeMenu.json`

## API de props
`TreeMenu` aceita:
- `data`: array dinamico de `TreeMenuNode`
- `title`: rotulo acessivel do bloco
- `variant`: `psychology` | `calm` | `contrast`
- `size`: `sm` | `md` | `lg`
- `className`: classe adicional para composicao de layout
- `onNodeClick`: callback para telemetria, analytics ou comportamento customizado

## Comportamento e acessibilidade
- Navegacao com teclado suportada por links focaveis.
- `aria-label` aplicado por item.
- `aria-current="page"` para item ativo.
- `aria-disabled` para itens desabilitados.
- Foco visivel com cor configuravel via token.

## Responsividade
- Em telas menores, os botoes aceitam quebra de linha e limite de largura.
- Tamanho de tipografia e paddings reduzem automaticamente em viewport pequeno.
- O motor de layout aplica deslocamento por profundidade para preservar leitura visual quando ha `children`.

## Reutilizacao em paginas diferentes
Exemplos implementados:
- `src/pages/PsychologyHome.tsx`
- `src/pages/PsychologyServices.tsx`

Ambas usam o mesmo componente, mudando apenas:
- dados (estado ativo por pagina)
- `variant`
- `size`

## Checklist de validacao
- [ ] Conferir foco com `Tab` e `Shift+Tab`
- [ ] Validar acionamento com `Enter`
- [ ] Verificar contraste de `variant` escolhido
- [ ] Confirmar estados `active` e `disabled`
- [ ] Testar em desktop, tablet e mobile
- [ ] Confirmar reutilizacao sem duplicacao de logica
