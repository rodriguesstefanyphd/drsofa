# drsofa

Landing page da unidade de Lisboa do Doutor Sofá — limpeza e higienização de
sofás, colchões e estofos ao domicílio.

Site estático, sem build: `index.html`, `privacidade.html` e a pasta `images/`.
Publica-se como está em qualquer alojamento estático.

## Ficheiros

- `index.html` — página principal (herói, serviços, prova social, formulário, FAQ).
- `privacidade.html` — política de privacidade e de cookies (RGPD).
- `images/` — logótipo e fotografias; ver `images/README.md` para os nomes
  exigidos. **O cabeçalho, o rodapé e os favicons já apontam para os ficheiros
  do logótipo, mas os ficheiros ainda não estão no repositório** — sem eles
  aparece apenas o texto alternativo.

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
- `AVALIACAO_GOOGLE`, `NUMERO_AVALIACOES`, `LINK_PERFIL_GOOGLE` — dados do
  perfil de empresa no Google.
- `AVALIACAO_REAL_1..3`, `NOME_CLIENTE_1..3`, `DATA_1..3` — avaliações reais de
  clientes (usar apenas testemunhos verdadeiros).
- `DENOMINACAO_SOCIAL`, `NIF_AQUI`, `MORADA_AQUI`, `CODIGO_POSTAL_AQUI` —
  identificação legal, no rodapé, nos dados estruturados e na política de
  privacidade.
- `ALOJAMENTO_AQUI` e `DATA_ATUALIZACAO` — em `privacidade.html`.

## Ver localmente

```sh
python3 -m http.server 8000
# abrir http://localhost:8000
```
