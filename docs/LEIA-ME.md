# LP Lisboa — como publicar

## 1. Substituições a fazer no `index.html`

Abra o ficheiro num editor de texto e use Localizar/Substituir. Todos os marcadores estão em maiúsculas:

| Marcador | O que colocar |
|---|---|
| `GTM-XXXXXXX` | ID do contentor GTM (aparece 3 vezes) |
| `AVALIACAO_GOOGLE` | Ex.: `4,9` |
| `NUMERO_AVALIACOES` | Ex.: `87` |
| `PRECO_SOFA` / `PRECO_COLCHAO` / `PRECO_IMPERM` | Preço mínimo de cada serviço |
| `AVALIACAO_REAL_1/2/3` | Texto de 3 avaliações reais do Google |
| `NOME_CLIENTE_1/2/3` e `DATA_1/2/3` | Autor e data de cada avaliação |
| `LINK_PERFIL_GOOGLE` | URL do Perfil de Empresa no Google |
| `CHAVE_WEB3FORMS_AQUI` | Chave gratuita obtida em web3forms.com |
| `DENOMINACAO_SOCIAL`, `NIF_AQUI`, `MORADA_AQUI`, `CODIGO_POSTAL_AQUI` | Dados legais da empresa |

Confirme também o número de WhatsApp: está `351928313797`, retirado da página atual de Lisboa.

Se não tiver preços para publicar, apague as três linhas `<p class="preco">`. Mas recomendo publicar — reduz muito os contactos não qualificados quando o tráfego é pago.

## 2. Imagens

Criar uma pasta `images/` ao lado do `index.html` com:

- `capa.jpg` — fundo do topo, horizontal, 1600×900, sofá em ambiente doméstico
- `sofa.jpg`, `colchao.jpg`, `impermeabilizacao.jpg` — 600×400
- `antes-depois-1.jpg`, `antes-depois-2.jpg` — 1200×800, imagem única com os dois lados

Comprimir tudo em squoosh.app ou tinypng.com antes de publicar. Imagens pesadas baixam o Índice de Qualidade no Google Ads e encarecem o clique.

## 3. Política de privacidade

Falta criar `privacidade.html`, já referenciada no formulário, no banner e no rodapé. Sem ela, o formulário não é conforme com o RGPD e há risco de reprovação de anúncios. Posso escrevê-la assim que tiver os dados da empresa.

## 4. Publicar

1. Criar conta gratuita em netlify.com
2. Ir a **Sites → Add new site → Deploy manually**
3. Arrastar a pasta `lisboa` inteira para a caixa
4. Fica online em poucos segundos num endereço tipo `nome-aleatorio.netlify.app`, já com HTTPS

Este endereço serve para rever tudo e pode até receber os primeiros anúncios, se houver pressa.

## 5. Ligar ao subdomínio

Em **Domain settings → Add custom domain**, escrever `lisboa.doutorsofa.pt`. A Netlify indica o registo a criar. É só isto que precisa de pedir a quem gere o domínio:

> Preciso de criar um subdomínio para uma landing page nova. Basta acrescentarem um registo na zona DNS de doutorsofa.pt:
>
> Tipo: CNAME
> Nome: lisboa
> Valor: [valor indicado pela Netlify]
> TTL: 3600
>
> Não altera nada no site atual nem no e-mail. Obrigada!

Propaga em minutos a poucas horas. O HTTPS é emitido automaticamente.

## 6. Antes de ligar os anúncios

- [ ] Marcadores todos substituídos
- [ ] Imagens no sítio e comprimidas
- [ ] `privacidade.html` publicada
- [ ] Formulário testado (chega um e-mail real)
- [ ] Banner de cookies aparece e a recusa bloqueia as tags
- [ ] Eventos `contacto_whatsapp`, `contacto_telefone` e `pedido_orcamento` visíveis no GTM Preview
- [ ] Conversões importadas no Google Ads
- [ ] Testado num telemóvel real, incluindo a barra fixa de contacto

## O que já vai resolvido de origem

Consent Mode v2 com recusa por defeito, eventos de conversão ligados, dados estruturados LocalBusiness, canonical e Open Graph corretos, texto em português europeu, links `wa.me` e `tel:` no formato certo, barra de contacto fixa em mobile, foco visível no teclado e respeito por `prefers-reduced-motion`.
