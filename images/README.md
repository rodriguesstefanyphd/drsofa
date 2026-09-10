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
| `capa.jpg` | fundo do herói e imagem de partilha (Open Graph) | 1600×900, 177 KB | ✅ no repositório |
| `sofa.jpg` | cartão «Sofás e cadeirões» | 600×400, 25 KB | ✅ no repositório |
| `colchao.jpg` | cartão «Colchões» | 600×400, 21 KB | ✅ no repositório |
| `impermeabilizacao.jpg` | cartão «Impermeabilização» | 600×400, 12 KB | ✅ no repositório |
| `antes-1.jpg` e `depois-1.jpg` | comparador do sofá | 1200×800 | ⏳ **em falta** |
| `antes-2.jpg` e `depois-2.jpg` | comparador do colchão | 1200×800 | ⏳ **em falta** |

### De onde vêm as que já cá estão

- `capa.jpg` — fotografia de um técnico a aplicar produto num sofá, do banco de
  imagens da marca. É a única fotografia de trabalho real disponível até agora,
  e **não foi tirada em Lisboa** — por isso o `alt` não o afirma. Quando houver
  uma fotografia de um serviço feito em Lisboa, deve substituir esta.
- `sofa.jpg`, `colchao.jpg`, `impermeabilizacao.jpg` — recortes de produto do
  material de Instagram, recompostos sobre o amarelo da marca em formato
  600×400. São **ilustrações de estúdio, não fotografias de trabalhos reais**;
  os `alt` no `index.html` dizem exactamente isso («do tipo que limpamos»), para
  não sugerirem um resultado que a imagem não mostra.

### As que faltam

**As imagens antes/depois mudaram de formato.** Em vez de uma imagem só com
os dois lados lado a lado, são agora **duas imagens separadas por caso** — o
site sobrepõe-nas e o visitante arrasta uma barra para revelar o resultado,
como no site brasileiro da marca. Para isto resultar, as duas fotografias do
mesmo caso têm de ser tiradas **do mesmo sítio e com o mesmo enquadramento**,
senão a comparação não bate certo.

Use fotografias de trabalhos reais. Comprima antes de publicar (por exemplo em
squoosh.app) — o herói é a imagem que mais pesa no tempo de carregamento.
