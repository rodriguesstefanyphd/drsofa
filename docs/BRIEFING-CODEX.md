# Briefing para agente de código — Landing page Doutor Sofá PT

Documento autossuficiente. Contém todo o contexto necessário; não é preciso conhecer a conversa anterior.

---

## 1. Objetivo

Construir uma landing page de conversão para uma unidade Doutor Sofá em Portugal (serviço de limpeza de sofás, colchões e estofos ao domicílio), **replicando a estrutura e a lógica da página que já está a converter em Google Ads**: `https://porto.doutorsofa.pt/`

Abrir essa página e usá-la como referência de estrutura, secções, ordem dos argumentos e tom. A sequência dela está validada por resultados reais de tráfego pago — não a reinventar.

**Importante:** replicar a *estrutura e a lógica*, escrevendo código próprio. Não copiar ficheiros, CSS ou assets da página de referência.

---

## 2. Estado atual

Já existe uma primeira versão em `index.html` (ficheiro único, sem dependências, sem build). Serve de base. A tarefa é alinhá-la visual e estruturalmente com a página do Porto, mantendo as correções já implementadas (secção 5).

**Decisões técnicas já tomadas, a manter:**

- HTML/CSS/JS num único ficheiro, sem framework, sem build step
- Sem Google Fonts nem qualquer CDN externo — stack de tipos do sistema. Motivo: RGPD (o carregamento de fontes a partir de servidores Google já foi considerado transferência de dados sem base legal em decisões judiciais na UE) e velocidade de carregamento, que afeta o Índice de Qualidade no Google Ads
- Alojamento: Netlify, deploy manual por pasta
- Formulário: Web3Forms (sem backend próprio)
- Mobile-first; barra de contacto fixa no fundo em ecrãs pequenos
- Acessibilidade: foco visível no teclado, `prefers-reduced-motion` respeitado, contraste mínimo AA

---

## 3. Estrutura de secções

Seguir a ordem da página do Porto:

1. Barra superior — marca + telefone clicável
2. Herói — H1 com o serviço e a cidade, subtítulo de benefício, CTA principal para WhatsApp, CTA secundário para chamada, 3 pontos de confiança
3. Faixa de confiança — avaliação Google, anos de experiência, meios de pagamento, horário
4. Serviços — sofás, colchões, impermeabilização (+ menção a tapetes, alcatifas, escritórios, condomínios e alojamento local)
5. Antes e depois — galeria de trabalhos reais
6. Como funciona — 4 passos numerados
7. Avaliações — 3 avaliações reais em texto + link para o perfil Google
8. Área de cobertura — lista de concelhos
9. Formulário de orçamento
10. Perguntas frequentes
11. CTA final
12. Rodapé com identificação legal

O CTA principal é sempre o WhatsApp. O formulário é alternativa, não o caminho principal.

---

## 4. Parametrização por cidade

A página deve ser facilmente replicável para outras unidades. Todos os valores variáveis estão como marcadores em maiúsculas no HTML, para substituição por Localizar/Substituir.

| Marcador | Descrição |
|---|---|
| `GTM-XXXXXXX` | ID do contentor Google Tag Manager |
| `AVALIACAO_GOOGLE` / `NUMERO_AVALIACOES` | Nota e número de avaliações |
| `PRECO_SOFA` / `PRECO_COLCHAO` / `PRECO_IMPERM` | Preços mínimos |
| `AVALIACAO_REAL_1..3`, `NOME_CLIENTE_1..3`, `DATA_1..3` | Avaliações reais |
| `LINK_PERFIL_GOOGLE` | URL do Perfil de Empresa no Google |
| `CHAVE_WEB3FORMS_AQUI` | Chave do formulário |
| `DENOMINACAO_SOCIAL`, `NIF_AQUI`, `MORADA_AQUI`, `CODIGO_POSTAL_AQUI` | Dados legais |

Variável `CIDADE` no JavaScript, usada em todos os eventos de conversão.

**Concelhos por unidade** (a lista da cobertura e a segmentação geográfica dos anúncios têm de coincidir):

- **Lisboa:** Lisboa, Amadora, Odivelas, Loures, Oeiras, Sintra, Cascais, Almada, Barreiro, Seixal
- **Coimbra:** Coimbra, Oliveira do Hospital, Mealhada, Lousã, Penacova, Miranda do Corvo, Tábua, Arganil, Mortágua, Vila Nova de Poiares, Penela, Pampilhosa da Serra, Góis

A lista de Coimbra é a área contratual da unidade e não pode ser alargada.

---

## 5. Correções a manter face à página de referência

A página do Porto tem lacunas que **não** devem ser replicadas. Estas já estão resolvidas no `index.html` atual e têm de se manter:

**Conformidade legal (bloqueante)**
- Banner de cookies com Google Consent Mode v2, tudo em `denied` por defeito, `wait_for_update: 500`
- Nenhuma tag de marketing dispara antes do consentimento
- Checkbox de consentimento obrigatório no formulário, com link para a política de privacidade
- Rodapé com denominação social, NIF, morada e link para `livroreclamacoes.pt`
- Falta criar `privacidade.html`, já referenciada em três sítios

**Medição**
Três eventos empurrados para o `dataLayer`, por delegação de eventos:

| Ação | Evento | Parâmetros |
|---|---|---|
| Clique em `wa.me` / `api.whatsapp.com` | `contacto_whatsapp` | `cidade`, `local_botao` |
| Clique em `tel:` | `contacto_telefone` | `cidade`, `local_botao` |
| Submissão do formulário | `pedido_orcamento` | `cidade`, `servico` |

`local_botao` vem do atributo `data-local` de cada link: `topo`, `heroi`, `form`, `final`, `rodape`, `barra_fixa`.

**Conteúdo**
- Português europeu rigoroso. A referência ainda tem construções do Brasil ("seus estofos", "nossos serviços", "sujeira", "por que escolher", "atendimento à domicílio", "aparência de novo"). Usar: "os seus estofos", "os nossos serviços", "sujidade", "porque escolher", "serviço ao domicílio", "aspeto de novo". Nódoas, não manchas.
- Sem alegações de urgência falsa (a referência usa "vagas limitadas para esta semana"). As políticas do Google Ads sancionam urgência não verdadeira.
- Preço de referência visível ("desde X €"), para filtrar contactos não qualificados em tráfego pago.
- Prova social em texto, não em imagem — a imagem não é indexável nem acessível.
- FAQ com as objeções reais: tempo de secagem, preço, segurança para crianças e animais, necessidade de sair de casa, nódoas permanentes, horário de sábado.

**SEO**
- `canonical` próprio, `og:url` da própria página (não da homepage), `og:locale` `pt_PT`
- `title` e `description` únicos, com o serviço e a cidade
- JSON-LD `HomeAndConstructionBusiness` com `telephone`, `areaServed`, `openingHoursSpecification` e morada

---

## 6. Assets

Pasta `images/` ao lado do `index.html`:

- `capa.jpg` — 1600×900, fundo do herói
- `sofa.jpg`, `colchao.jpg`, `impermeabilizacao.jpg` — 600×400
- `antes-depois-1.jpg`, `antes-depois-2.jpg` — 1200×800

Todas comprimidas. `loading="lazy"` e `width`/`height` explícitos em todas as imagens abaixo da dobra, para evitar CLS.

---

## 7. Restrição contratual a ter presente

A unidade opera sob contrato de franquia que exige **autorização escrita da franqueadora** para qualquer página ou domínio que use a marca (cláusulas 10.22, 16.1 e 16.2). A página pode ser construída e testada num URL temporário, mas **não deve ser publicada em subdomínio da marca nem receber tráfego pago antes dessa autorização**.

Implicação prática para o desenvolvimento: a página tem de funcionar corretamente em qualquer domínio. Não fixar caminhos absolutos — usar caminhos relativos para imagens e para `privacidade.html`. Os únicos URLs absolutos são os das meta tags `canonical` e `og:url`, que ficam com o domínio final previsto.

---

## 8. Critérios de aceitação

- [ ] Estrutura e ordem de secções alinhadas com a página de referência
- [ ] Nenhum pedido a domínios externos além do Google Tag Manager e do endpoint do formulário
- [ ] Banner de cookies aparece na primeira visita; recusar impede o disparo das tags
- [ ] Os três eventos aparecem no modo de pré-visualização do GTM
- [ ] Formulário só submete com o consentimento assinalado
- [ ] Todos os links `wa.me` e `tel:` abrem corretamente em Android e iOS
- [ ] Nenhum `href` vazio ou mal formado
- [ ] Zero construções em português do Brasil
- [ ] Lighthouse mobile: Desempenho ≥ 90, Acessibilidade ≥ 95
- [ ] Testado a 360px de largura, incluindo a barra de contacto fixa
- [ ] `privacidade.html` criada e ligada

---

## 9. Dados em falta

Não inventar. Deixar os marcadores no sítio e listar o que falta:

- Avaliações reais do Google (texto, autor, data) e link do perfil
- Fotos antes/depois de trabalhos reais
- Preços mínimos por serviço
- Denominação social, NIF e morada da entidade que opera em Portugal
- ID do contentor GTM
- Confirmação de qual a unidade a lançar primeiro
