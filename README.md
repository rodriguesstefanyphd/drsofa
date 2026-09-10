# drsofa

Landing page da unidade de Lisboa do Doutor Sofá — limpeza e higienização de
sofás, colchões e estofos ao domicílio.

Site estático, sem build: `index.html`, `privacidade.html` e a pasta `images/`.
Publica-se como está em qualquer alojamento estático.

> **Antes de publicar no domínio da marca:** a unidade opera sob contrato de
> franquia que exige autorização escrita da franqueadora para qualquer página
> ou domínio que use a marca (cláusulas 10.22, 16.1 e 16.2). A página pode ser
> construída e testada num URL temporário, mas não deve ir para
> `lisboa.doutorsofa.pt` nem receber tráfego pago antes dessa autorização.
> Por isso todos os caminhos internos são relativos — o site funciona em
> qualquer domínio. Os únicos URLs absolutos são o `canonical` e o `og:url`.

## Ficheiros

- `index.html` — página principal (herói, serviços, prova social, formulário, FAQ).
- `privacidade.html` — política de privacidade e de cookies (RGPD).
- `images/` — logótipo, favicons, fotografias e o vídeo do herói.
  Ver `images/README.md`.

## Documentos de origem

Em `docs/`, tal como foram entregues:

- `docs/BRIEFING-CODEX.md` — especificação: objetivo, estrutura de secções,
  parametrização por cidade, correções a manter e critérios de aceitação.
- `docs/LEIA-ME.md` — guia de publicação: substituições, imagens, deploy na
  Netlify, CNAME do subdomínio e lista de verificação pré-anúncios.

Estado face aos critérios de aceitação do briefing (§8):

| Critério | Estado |
|---|---|
| Estrutura e ordem das secções | ✅ 12 secções pela ordem do briefing |
| Sem pedidos externos além do GTM e do formulário | ✅ verificado |
| Banner na 1.ª visita; recusar não liberta as tags | ✅ testado |
| Formulário só submete com consentimento | ✅ testado |
| Links `wa.me` e `tel:` bem formados | ✅ `tel:+351928313797`, `wa.me/351928313797` |
| Nenhum `href` vazio ou mal formado | ✅ `LINK_PERFIL_GOOGLE` preenchido com o link de partilha |
| Zero construções em português do Brasil | ✅ verificado |
| Acessibilidade (contraste AA, foco, etc.) | ✅ 0 violações WCAG 2.1 AA (axe-core, 360px e 1280px) |
| Legendas do vídeo do herói (WCAG 1.2.2) | ⏳ falta `heroi.vtt` — ver `images/README.md` |
| Testado a 360px com a barra fixa | ✅ sem scroll horizontal, alvos de toque de 56px |
| `privacidade.html` criada e ligada | ✅ |
| Três eventos visíveis no GTM Preview | ⏳ depende do ID do contentor real |
| Lighthouse ≥ 90 desempenho / ≥ 95 acessibilidade | ⏳ medir no URL publicado, com as fotografias finais |

## Replicar para outra unidade

A página está parametrizada para ser copiada de cidade para cidade:

1. Substituir os marcadores em maiúsculas (ver mais abaixo).
2. Trocar `var CIDADE = 'lisboa'` no script do fim do `index.html` — é o valor
   que vai em todos os eventos de conversão e permite separar as unidades no
   GA4 e no Google Ads.
3. Actualizar a lista de concelhos na secção «Onde vamos», o `areaServed` do
   JSON-LD e a segmentação geográfica dos anúncios — os três têm de coincidir.
   Para Coimbra a área contratual é: Coimbra, Oliveira do Hospital, Mealhada,
   Lousã, Penacova, Miranda do Corvo, Tábua, Arganil, Mortágua, Vila Nova de
   Poiares, Penela, Pampilhosa da Serra e Góis — **não pode ser alargada**.
4. Actualizar `canonical`, `og:url`, o telefone e o e-mail da unidade.

## Marca

As cores estão em variáveis CSS no topo do `<style>` de cada página:

| Variável | Valor | Uso |
|---|---|---|
| `--amarelo` | `#FFD100` | amarelo do logótipo: selo, ✓, números dos passos, botão «Enviar pedido», aviso de cookies |
| `--carvao` | `#1A1A1A` | cabeçalho, herói e secção final |
| `--preto` | `#101010` | rodapé |
| `--tinta` / `--tinta-suave` | `#1C1C1C` / `#5C5C5C` | texto |
| `--acao` / `--acao-escuro` | `#128C42` / `#0D6E33` | **só** para os botões de WhatsApp |

O verde está reservado ao WhatsApp de propósito: é a cor que as pessoas
associam à app e ajuda o botão a ser reconhecido. As restantes acções usam o
amarelo da marca com texto preto.

O desenho segue os sites oficiais (`doutorsofa.pt` e `doutorsofa.com.br`):
herói amarelo, cabeçalho preto, faixas a alternar entre branco, amarelo e
grafite, títulos centrados e sem serifas.

**Uma adaptação deliberada:** a marca escreve parte dos títulos a amarelo
sobre branco — por exemplo «*Nossas* Especialidades». Amarelo sobre branco dá
1,46:1 de contraste, muito abaixo do mínimo de 4,5:1 que o briefing exige, e
é ilegível para muita gente. Nas faixas claras isso foi substituído por um
filete amarelo debaixo do título; nas faixas escuras, onde o amarelo tem
7,8:1, a palavra a amarelo mantém-se.

## Medição e consentimento

- **Consent Mode v2** está declarado no `<head>`, **antes** do Google Tag Manager.
  Por predefinição, `ad_storage`, `ad_user_data`, `ad_personalization` e
  `analytics_storage` estão em `denied`; só passam a `granted` depois de o
  visitante carregar em «Aceitar» no aviso de cookies.
- A escolha fica guardada em `localStorage`, na chave `ds_consentimento`
  (`aceite` ou `recusado`). Os acessos ao `localStorage` estão protegidos com
  `try/catch` — em modo privado o site funciona na mesma, apenas não guarda a
  escolha.
- Eventos enviados para o `dataLayer` (para criar as conversões no GTM):

  | Evento | Quando dispara | Parâmetros |
  |---|---|---|
  | `contacto_whatsapp` | clique em qualquer link `wa.me` | `cidade`, `local_botao` |
  | `contacto_telefone` | clique em qualquer link `tel:` | `cidade`, `local_botao` |
  | `pedido_orcamento` | submissão do formulário | `cidade`, `servico` |
  | `consentimento_aceite` / `consentimento_recusado` | escolha no aviso de cookies | — |

  O `local_botao` vem do atributo `data-local` de cada link (`topo`, `heroi`,
  `form`, `final`, `rodape`, `barra_fixa`), o que permite ver no GTM/GA4 qual o
  botão que converte.

## Antes de publicar — valores a substituir

Todos os marcadores em MAIÚSCULAS têm de ser substituídos. Para os listar:

```sh
grep -n -E '[A-Z_]{5,}(_AQUI)?' index.html privacidade.html
```

- `GTM-XXXXXXX` — ID do contentor do Google Tag Manager. Aparece **três vezes**
  no `index.html`: no comentário, no script do `<head>` e no `<noscript>` do
  `<body>`. Substitua todas (`sed -i 's/GTM-XXXXXXX/GTM-OSEUID/g' index.html`).
- `CHAVE_WEB3FORMS_AQUI` — access key do [Web3Forms](https://web3forms.com/)
  para o formulário enviar e-mail.
- `PRECO_SOFA`, `PRECO_COLCHAO`, `PRECO_IMPERM` — preços «desde».
- `AVALIACAO_GOOGLE` e `NUMERO_AVALIACOES` — **ainda por preencher**: a nota
  média e o total de avaliações do perfil de empresa. São os dois últimos
  marcadores em maiúsculas da página e aparecem na faixa de confiança, logo
  por baixo do herói. `LINK_PERFIL_GOOGLE` já está preenchido.
- `AVALIACAO_REAL_1..3`, `NOME_CLIENTE_1..3`, `DATA_1..3` — ✅ preenchidos com
  três avaliações reais do perfil, transcritas tal como os clientes as
  escreveram (incluindo o português do Brasil de uma delas, que fica como
  está). **As datas são aproximadas:** o Google mostra-as em relativo («há 2
  meses»), por isso foram convertidas para o mês correspondente. Para as ter
  exactas, abrir cada avaliação no perfil.
- `DENOMINACAO_SOCIAL`, `NIF_AQUI`, `MORADA_AQUI`, `CODIGO_POSTAL_AQUI` —
  identificação legal, no rodapé, nos dados estruturados e na política de
  privacidade.
- `ALOJAMENTO_AQUI` e `DATA_ATUALIZACAO` — em `privacidade.html`.

## Efeitos

Todos escritos à mão, sem bibliotecas, e todos degradam para nada: sem
JavaScript o conteúdo aparece na mesma, e quem tenha «reduzir movimento»
ligado no sistema não vê animação alguma.

| Efeito | O que faz |
|---|---|
| Revelação ao rolar | as secções sobem e aparecem quando entram no ecrã (`IntersectionObserver`) |
| Cabeçalho fixo | acompanha a página e ganha sombra depois dos primeiros pixels |
| Botão no cabeçalho | «Orçamento gratuito» sempre à vista em ecrã largo |
| Cartões que levantam | ligeira subida e sombra ao passar o rato |
| Comparador antes/depois | arrasta-se uma barra para revelar o resultado |
| Vídeo no herói | toca em ciclo; arranca mudo e tem botão «Ligar som»; com «reduzir movimento» fica a imagem parada |

O comparador é um `input[type=range]` invisível por cima das imagens: assim
funciona com rato, com dedo **e com as setas do teclado**, e é anunciado
correctamente por um leitor de ecrã. Um `div` com eventos de rato não teria
nada disso.

## Pré-visualização pública (GitHub Pages)

Para ir vendo o site online enquanto está a ser feito, sem instalar nada:

1. No repositório, **Settings → Pages**.
2. Em **Source**, escolher **Deploy from a branch**.
3. Em **Branch**, escolher `claude/consent-gtm-setup-bh959t` e a pasta `/ (root)`.
4. **Save**.

Ao fim de um a dois minutos fica em:

**https://rodriguesstefanyphd.github.io/drsofa/**

A partir daí, cada vez que houver um commit novo no branch o endereço
actualiza-se sozinho ao fim de um minuto ou dois (pode ser preciso recarregar
com Ctrl+F5 ou Cmd+Shift+R para o browser largar a versão em cache).

Este endereço é **público**, mas não é um domínio da marca e não recebe
tráfego pago, por isso cabe no que o contrato permite para testes. Enquanto
correr num endereço `github.io`, as páginas pedem aos motores de busca que não
as indexem — a verificação é feita pelo nome do domínio, por isso desliga-se
sozinha no domínio final e não há risco de a página real ir para o ar com
`noindex`.

`.nojekyll` está no repositório para o GitHub servir os ficheiros tal como
estão, sem os processar.

## Ver localmente

```sh
python3 -m http.server 8000
# abrir http://localhost:8000
```
