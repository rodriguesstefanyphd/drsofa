# Landing pages Doutor Sofá — Next.js

Uma base de código, uma unidade por build. Next.js 14 (App Router), React 18,
TypeScript e Tailwind — a mesma stack do site PhD Sports, para o conhecimento
ser reaproveitável.

## Porquê exportação estática

`next.config.mjs` tem `output: 'export'`. Estas páginas não têm backend: o
formulário vai para um serviço externo e não há rotas de API nem base de dados.
Sem servidor, ficam ficheiros soltos que a CDN serve directamente — mais
rápido, e a velocidade entra no Índice de Qualidade do Google Ads, ou seja,
mexe no preço do clique.

Continua a ser Next: componentes, tipos, rotas e build. Só não há servidor a
correr em produção, porque não há nada para ele fazer.

## Correr localmente

```sh
npm install
npm run dev          # http://localhost:3000, unidade de Lisboa
NEXT_PUBLIC_UNIDADE=coimbra npm run dev
```

## Abrir uma unidade nova

Não se copia nenhuma página. Acrescenta-se **um objeto** em
`data/unidades.ts` e regista-se em `UNIDADES`:

```ts
export const PORTO: Unidade = {
  slug: 'porto',
  cidade: 'Porto',
  dominio: 'https://porto.doutorsofa.pt',
  telefone: { legivel: '...', e164: '+351...', whatsapp: '351...' },
  concelhos: ['Porto', '...'],
  // o que ainda não se souber fica a null — nunca se inventa
  ...
};
```

O que ainda não se sabe fica a `null`. O site mostra um marcador bem visível
(`«FALTA: telefone»`) em vez de um espaço em branco, porque um campo em falta
não dá erro nenhum: só perde pedidos em silêncio.

```sh
npm run pendentes    # lista o que falta a cada unidade
```

## Uma fonte para cada coisa

| Facto | Onde vive | Quem o usa |
|---|---|---|
| Concelhos servidos | `data/unidades.ts` | secção «Onde vamos» **e** `areaServed` do JSON-LD |
| Telefone | `data/unidades.ts` | cabeçalho, herói, barra fixa, rodapé, JSON-LD, links `wa.me` |
| Horário | `data/unidades.ts` | faixa de confiança, rodapé, `openingHoursSpecification` |

Isto não é arrumação: na versão anterior, a lista de concelhos estava escrita
em dois sítios e podia divergir do JSON-LD sem ninguém dar por isso — e a
segmentação dos anúncios tem de bater certo com ela.

## Publicar na Cloudflare Pages

Dois projetos, o mesmo repositório. Cada um serve uma cidade, e cada um tem o
seu domínio — na Cloudflare Pages o domínio é por projeto.

| Definição | Lisboa | Coimbra |
|---|---|---|
| Root directory | `web` | `web` |
| Build command | `npm run build:lisboa` | `npm run build:coimbra` |
| Build output directory | `out` | `out` |
| Domínio | `lisboa.doutorsofa.pt` | `coimbra.doutorsofa.pt` |

### Variáveis de ambiente

Definem-se no painel, sem tocar no código:

| Variável | Para que serve |
|---|---|
| `NEXT_PUBLIC_UNIDADE` | qual a unidade (já vem no comando de build) |
| `NEXT_PUBLIC_GTM_ID` | contentor do Google Tag Manager |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | chave do formulário; sem ela não chega e-mail |
| `NEXT_PUBLIC_ALOJAMENTO` | nome do alojamento, na política de privacidade |
| `NEXT_PUBLIC_DATA_POLITICA` | data da última atualização da política |

## Medição e consentimento

O Consent Mode v2 e o GTM estão no **mesmo** script em `app/layout.tsx`, e por
esta ordem de propósito: o consentimento tem de estar declarado antes de
qualquer tag de marketing carregar, e separá-los em dois scripts deixaria a
ordem ao critério do bundler. Por predefinição está tudo em `denied`.

Eventos no `dataLayer` (`lib/eventos.ts`):

| Evento | Quando | Parâmetros |
|---|---|---|
| `contacto_whatsapp` | clique em qualquer link `wa.me` | `cidade`, `local_botao` |
| `contacto_telefone` | clique em qualquer link `tel:` | `cidade`, `local_botao` |
| `pedido_orcamento` | submissão do formulário | `cidade`, `servico` |
| `consentimento_aceite` / `_recusado` | escolha no aviso de cookies | — |

Os cliques são apanhados por **delegação**, num só ouvinte no documento
(`components/Interacoes.tsx`): cada link continua a ser um `<a>` normal e
basta-lhe o atributo `data-local`. Um botão novo não obriga a mexer no
JavaScript.

**Meta e Google Ads entram pelo GTM, não pelo código.** Aviso importante: o
Consent Mode é do Google e o pixel da Meta não o lê sozinho. No GTM, a tag da
Meta tem de exigir `ad_storage` nas definições de consentimento — senão dispara
também para quem recusou.

## Acessibilidade

0 violações WCAG 2.1 AA (axe-core 4.13, a 360px e a 1280px, nas duas páginas e
nas duas unidades). O que está lá de propósito:

- O comparador antes/depois é um `input[type=range]` invisível por cima das
  imagens: funciona com rato, com dedo **e** com as setas do teclado, e é
  anunciado por um leitor de ecrã. Um `div` com eventos de rato não teria nada
  disso.
- O vídeo de entrada é um diálogo modal a sério: `aria-modal`, foco preso, Esc
  fecha e o foco volta ao `<h1>`. No canto deixa de ser modal e passa a
  `role="group"` — um `aria-label` num `div` sem papel é inválido.
- Rótulos escondidos usam `.oculto`, nunca `display:none`, que os tiraria da
  árvore de acessibilidade e deixaria botões sem nome.
- O verde do WhatsApp é `#0F7B39` (5,37:1 com branco). O valor anterior dava
  4,32:1 e só passava pela excepção do texto grande.

Tudo degrada: sem JavaScript o conteúdo aparece na mesma e o vídeo de entrada
não existe; com «reduzir movimento» não há animação nenhuma.

## Por fechar

- `heroi.vtt` — legendas do vídeo. Com áudio e com fala aplica-se o WCAG 1.2.2.
  Falta o texto do que é dito.
- Os campos que `npm run pendentes` listar.
