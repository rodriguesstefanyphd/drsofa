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
| `capa.jpg` | imagem de partilha (Open Graph) e alternativa do vídeo | 1600×900, 177 KB | ✅ |
| `sofa.jpg` | cartão «Sofás e cadeirões» | 600×400, 25 KB | ✅ |
| `colchao.jpg` | cartão «Colchões» | 600×400, 21 KB | ✅ |
| `impermeabilizacao.jpg` | cartão «Impermeabilização» | 600×400, 12 KB | ✅ |
| `antes-1.jpg` / `depois-1.jpg` | comparador de arrastar (cadeirão) | 1200×800, 75/46 KB | ✅ |
| `antes-2.jpg` / `depois-2.jpg` | par lado a lado (cadeirinha de bebé) | 800×914, 85/56 KB | ✅ |
| `heroi.webm` / `heroi.mp4` | vídeo do herói | 1280×720, 10 s, 605/580 KB | ⚠️ exemplo |
| `heroi-poster.jpg` | poster do vídeo e imagem parada | 1280×720, 69 KB | ✅ |

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

### O vídeo do herói

`heroi.webm` e `heroi.mp4` **têm áudio** (Opus e AAC, 96 kbps), mas o vídeo
**arranca sempre sem som**. Não é uma preferência: nenhum browser actual deixa
um vídeo arrancar sozinho com som — Chrome, Safari e Firefox bloqueiam-no, e o
vídeo nem sequer começaria a tocar. Arrancar mudo e dar um botão «Ligar som» é
a única forma de o som chegar a ouvir-se.

O mesmo arranjo satisfaz o **WCAG 1.4.2**: som que arranque sozinho e dure mais
de 3 segundos tem de ter maneira de se desligar. Aqui nem chega a arrancar com
som, e o botão liga e desliga a qualquer momento, com rato ou com teclado
(`aria-pressed` acompanha o estado).

⚠️ **Falta a legendagem.** Com áudio e com fala, aplica-se o WCAG 1.2.2
(legendas em multimédia pré-gravada, nível A). Assim que houver o texto do que
é dito no vídeo, deve juntar-se um ficheiro `heroi.vtt` e a linha:

```html
<track kind="captions" src="images/heroi.vtt" srclang="pt" label="Português" default>
```

Até lá, o `axe-core` deixa `video-caption` como «a rever» — e desta vez isso é
mesmo uma falha por fechar, não um falso alarme.

Com **«reduzir movimento»** ligado no sistema, o vídeo não toca nem se
descarrega: o CSS esconde-o e mostra `heroi-poster.jpg`, o JavaScript remove-lhe
as `<source>` e tira o botão do som. Sem JavaScript o vídeo toca à mesma, mudo
e sem botão (que sem JavaScript não teria o que fazer); e se o browser não
souber ler nenhum dos formatos, mostra `capa.jpg`.

Comprima sempre antes de publicar (por exemplo em squoosh.app).
