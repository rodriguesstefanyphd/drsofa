# Imagens do site

Coloque aqui os ficheiros com estes nomes exactos — são os que o `index.html`
e o `privacidade.html` procuram.

## Logótipo

Já está no repositório. O site usa `logo-branco.png` no cabeçalho e no rodapé,
que assentam sempre em fundo escuro.

| Ficheiro | O que é |
|---|---|
| `logo-branco.png` | versão branca, 522×240, a que as páginas carregam |
| `favicon.png` | 96×96, símbolo do sofá sobre o amarelo da marca |
| `apple-touch-icon.png` | 180×180, o mesmo ícone para o ecrã principal do iPhone |
| `logo/logo-cor.png` | original amarelo e preto, resolução completa |
| `logo/logo-branco.png` | original branco, resolução completa |
| `logo/logo-escuro.png` | original monocromático escuro |
| `logo/logo-amarelo.png` | original amarelo |

Os ficheiros em `logo/` são os originais tal como foram entregues, guardados
para futuras utilizações (impressão, redes sociais, assinaturas de e-mail). Os
do site foram gerados a partir deles: a versão branca redimensionada para
522×240 e os ícones recortados do símbolo do sofá, sem o ®, que a 96px seria
apenas ruído.

Se algum dia faltar o ficheiro do logótipo, o cabeçalho e o rodapé mostram o
nome «doutor sofá» composto em texto — não fica nada partido.

O logótipo é marca registada — não esticar, não recolorir e não recortar o
símbolo do wordmark.

## Fotografias

| Ficheiro | Onde aparece | Tamanho | Estado |
|---|---|---|---|
| `capa.jpg` | painel do herói e imagem de partilha (Open Graph) | 1600×900, 177 KB | ✅ |
| `sofa.jpg` | cartão «Sofás e cadeirões» | 600×400, 25 KB | ✅ |
| `colchao.jpg` | cartão «Colchões» | 600×400, 21 KB | ✅ |
| `impermeabilizacao.jpg` | cartão «Impermeabilização» | 600×400, 12 KB | ✅ |
| `antes-1.jpg` / `depois-1.jpg` | comparador de arrastar (cadeirão) | 1200×800, 75/46 KB | ✅ |
| `antes-2.jpg` / `depois-2.jpg` | par lado a lado (cadeirinha de bebé) | 800×914, 85/56 KB | ✅ |
| `heroi.webm` / `heroi.mp4` | vídeo de entrada e mini-leitor | 1280×720, 10 s, com áudio, 724/704 KB | ⚠️ exemplo |
| `heroi-poster.jpg` | poster do vídeo | 1280×720, 69 KB | ✅ |

### De onde vêm

- `capa.jpg` — fotografia do banco de imagens da marca, de um técnico a aplicar
  produto num sofá. **Não foi tirada em Lisboa**, por isso o `alt` não o afirma.
- `sofa.jpg`, `colchao.jpg`, `impermeabilizacao.jpg` — recortes de produto do
  material de Instagram, recompostos sobre o amarelo da marca. São
  **ilustrações de estúdio, não fotografias de trabalhos reais**; os `alt`
  dizem-no («do tipo que limpamos»), para não prometerem um resultado.
- `antes-*` / `depois-*` — recortes de publicações reais do Instagram
  `@doutorsofalisboa.pt`, de 27 de agosto de 2024. O enquadramento do
  Instagram (moldura amarela, texto «ANTES»/«DEPOIS», autocolante do logótipo)
  foi cortado fora.
- `heroi.*` — **vídeo de exemplo**, entregue apenas para a apresentação. O
  áudio foi removido de propósito (ver mais abaixo). Substituir por material
  definitivo antes de qualquer campanha.

### Porque é que só um dos casos é comparador de arrastar

O comparador sobrepõe as duas fotografias e revela uma por cima da outra, por
isso **só funciona se as duas tiverem o mesmo enquadramento**.

- **Cadeirão** (`antes-1`/`depois-1`) — as duas fotografias foram tiradas do
  mesmo sítio; alinham e o comparador funciona.
- **Cadeirinha de bebé** (`antes-2`/`depois-2`) — o «antes» é de cima, o
  «depois» é de frente. São o mesmo objecto, mas de ângulos diferentes: ao
  arrastar, a cadeirinha saltava. Por isso este caso está como **par lado a
  lado** (`figure.par`), que não exige alinhamento nenhum.

Se houver um dia duas fotografias da cadeirinha com o mesmo enquadramento,
basta trocar a `figure.par` por uma `figure.comparador` igual à do cadeirão.

### O vídeo de entrada

`heroi.webm` e `heroi.mp4` **têm áudio** (Opus e AAC, 96 kbps). O vídeo abre em
ecrã inteiro à chegada e passa a mini-leitor no canto quando acaba, quando se
carrega em «Ver o site» ou quando se carrega em Esc. No canto continua a tocar,
em ciclo; o segundo botão fecha-o de vez.

Em ecrã inteiro é um diálogo modal a sério: `role="dialog"`, `aria-modal`, o
foco preso entre os dois botões, Esc fecha e o foco volta ao `<h1>`. No canto
deixa de ser modal e passa a `role="group"` com nome próprio — um `aria-label`
num `div` sem papel seria inválido.

**Arranca sempre sem som**, e não é preferência: nenhum browser actual deixa um
vídeo arrancar sozinho com som — Chrome, Safari e Firefox bloqueiam-no, e pedir
`autoplay` com som não dá som, dá um vídeo que não começa. Arrancar mudo com um
botão «Ligar som» é o que faz o som chegar a ouvir-se, e é também o que o
**WCAG 1.4.2** pede: som que arranca sozinho tem de ter como se desligar.

Quando não aparece de todo:

| Situação | O que acontece |
|---|---|
| Sem JavaScript | fica `hidden` e as `<source>` nunca são criadas — nem se descarregam os 700 KB |
| «Reduzir movimento» ligado | não abre; o aviso de cookies sai logo |
| Já visto nesta sessão do browser | não abre (`sessionStorage`, com `try/catch`) |
| O browser recusa tocar | encolhe já para o canto, para não deixar um ecrã preto à frente do site |

O aviso de cookies **espera** pelo fim do ecrã inteiro: dois avisos ao mesmo
tempo por cima da página seria de mais. Se o vídeo não abrir, o aviso sai logo.

⚠️ **Falta a legendagem.** Com áudio e com fala aplica-se o **WCAG 1.2.2**
(legendas em multimédia pré-gravada, nível A). Assim que houver o texto do que
é dito, junta-se um `heroi.vtt` e a linha:

```html
<track kind="captions" src="images/heroi.vtt" srclang="pt" label="Português" default>
```

Até lá o `axe-core` deixa `video-caption` como «a rever», e desta vez é mesmo
uma falha por fechar.

Comprima sempre antes de publicar (por exemplo em squoosh.app).
