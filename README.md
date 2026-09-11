# vittz-code.github.io

Portfólio pessoal do Victor Oliveira — dev front-end e game designer. Site estático, uma página só, sem framework de UI, publicado via GitHub Pages direto da branch `master`.

## Estrutura

```
index.html              conteúdo + estrutura — o único HTML do site
main.js                 tema (dark/light), menu mobile, animação on-scroll, form de contato
assets/
  site.css              CSS próprio (não-Tailwind) — brutalismo, animações, ajustes finos
  tailwind-input.css     entrada do build do Tailwind (3 diretivas @tailwind)
  tailwind.css           saída compilada do Tailwind — é o que o site carrega, não editar direto
  logo.svg                favicon
  images/                 previews dos projetos (SVG)
tailwind.config.js       paleta de cores, dark mode, fontes — config do Tailwind
package.json             scripts de build
```

Não tem branch de deploy separada: `master` é produção. Todo push nela vai pro ar em minutos via GitHub Pages.

## Rodando local

Qualquer servidor estático serve (o site não depende de nenhum framework nem de `file://` vs `http://` pra funcionar):

```bash
python -m http.server 8731
```

## Mudou alguma classe do Tailwind no HTML?

O Tailwind aqui **não** roda via CDN (rodava, foi trocado — ver comentário no `<head>` do `index.html` pra saber o motivo). É uma build estática: se você adicionar ou tirar uma classe do Tailwind no `index.html` ou `main.js`, precisa recompilar:

```bash
npm install        # só na primeira vez
npm run build:css  # gera assets/tailwind.css de novo
```

Ou `npm run watch:css` pra recompilar sozinho enquanto você mexe no HTML.

**Antes de publicar**, sobe o número do `?v=` no `<link>` do `tailwind.css` (e do `site.css`, se mexeu nele) no `index.html` — sem isso o navegador de quem já visitou o site pode segurar a versão velha do CSS em cache.

## Sistema de cor / dark mode

Paleta inteira em `tailwind.config.js`:

| token | hex | uso |
|---|---|---|
| `paper` / `mutedd` | `#FAE3AC` | creme — fundo no light, texto/superfícies no dark (é a mesma cor, dois nomes semânticos) |
| `ink` | `#01344F` | marinho — texto/borda no light |
| `night` | `#141414` | quase-preto — fundo no dark |
| `accent` / `accentd` | `#D12128` | vermelho — destaque nos dois temas |

Dark mode é via atributo (`[data-theme="dark"]` no `<html>`, trocado por `main.js`), não `prefers-color-scheme` puro — dá pra alternar manualmente e persiste em `localStorage`.

## O "brutalismo" (borda grossa + sombra deslocada)

Duas peças, cada uma resolve um problema diferente:

- **`.brutal`** (cards de projeto, estático): borda + `box-shadow` direto. Simples porque nada nele anima.
- **`.btn-anim`** (todo botão que reage a hover/clique): a sombra numa caixa que anima quebra de formas não óbvias — teve 3 tentativas erradas aqui antes de chegar na estrutura atual (documentado em comentário no `site.css`, vale ler antes de mexer). A solução: 2 elementos reais empilhados via CSS grid, `.shadow-block` (parado) embaixo de `.face-block` (borda + fundo + texto, único que recebe `transform` no hover/active). Nunca junta os dois num só elemento com pseudo-elemento — foi tentado, não funciona (pseudo-elemento não carrega texto real, o texto fica "descolado" da borda que anima).

Regra de cor: no dark mode, toda borda de `.face-block` é escura (`#141414`) — inclusive nos botões de fundo próprio (WhatsApp, Enviar Mensagem). Não tem mais variante "borda clara" — já causou bug de contraste (borda quase invisível) e foi simplificado de propósito.
