# Doutor Sofá — Unidade Lisboa

Cópia da página da unidade do Porto (`porto.doutorsofa.pt`), adaptada a Lisboa.
HTML/CSS/JS estático, sem build step — abrir `index.html` no browser chega.

```
index.html
assets/css/style.css
assets/js/main.js
images/            (ver images/README.md — ficheiros por copiar)
```

## O que foi replicado do Porto

Estrutura e copy na mesma ordem do original: cabeçalho (logo, Instagram,
telefone, e-mail, botão "Orçamento Gratuito"), hero, selos, "Por que escolher a
Doutor Sofá?", "Nossos Serviços", "Clientes Satisfeitos", "Como funciona",
"Peça seu orçamento", CTA final e rodapé.

Design confirmado por inspecção da página original:

| | Original |
|---|---|
| Tipografia | `Inter, system-ui, -apple-system, sans-serif` |
| Amarelo | `#ffcc00` |
| Fundo | `#000` / `#050505` |
| Véus sobre a foto do hero | `rgba(0,0,0,.35 / .55 / .85)` |
| Bordas | `rgba(255,255,255,.25)` |
| WhatsApp | `#25d366` |

Como no Porto, os CTAs ("Orçamento Gratuito", "Pedir Orçamento Agora",
"Solicitar orçamento agora", "Falar no WhatsApp") abrem directamente o WhatsApp
com a mensagem `Olá, preciso de um orçamento`.

## Por substituir antes de publicar

O contacto de Lisboa ainda não é conhecido — os campos abaixo estão com
valores fictícios (o Porto usa `+351 912 384 904` / `porto@doutorsofa.pt`):

| Placeholder | Onde |
|---|---|
| `+351 000 000 000` | cabeçalho, rodapé, JSON-LD |
| `351000000000` | links `wa.me` (`index.html`) e `WHATSAPP` (`assets/js/main.js`) |
| `lisboa@doutorsofa.pt` | cabeçalho, rodapé, JSON-LD |
| `https://lisboa.doutorsofa.pt/` | `canonical`, Open Graph, JSON-LD |
| `instagram.com/doutorsofa.lisboa` | cabeçalho |

Substituição rápida:

```sh
grep -rl '000000000' index.html assets/js/main.js \
  | xargs sed -i 's/351000000000/351XXXXXXXXX/g; s/+351 000 000 000/+351 XXX XXX XXX/g'
```

Falta ainda:

- **Imagens** — ver `images/README.md`. A página fica funcional sem elas, mas
  com blocos vazios nos cards e no hero.
- **Formulário** — no Porto não foi possível determinar para onde submete. Aqui
  valida os campos e abre o WhatsApp com os dados preenchidos. Para enviar por
  e-mail ou para um CRM, alterar o handler `submit` em `assets/js/main.js`.
- **Avaliações** — a secção usa `images/avaliacao1.jpeg`, tal como o original.
  Se preferir um widget de Google Reviews, o `<figure class="avaliacao">` é o
  ponto de inserção.

## Divergências assumidas em relação ao original

Foram reconstruídas a partir do texto e da paleta, não do HTML do Porto, pelo
que podem não coincidir ao pixel: a grelha exacta de cada secção, os espaçamentos,
os ícones dos passos (aqui em emoji, como no texto extraído) e a animação/estado
de hover dos cards. A copy é literal, com "Porto" trocado por "Lisboa".
