# Doutor Sofá — Unidade Lisboa

Landing page da unidade de Lisboa, em HTML/CSS/JS estático (sem dependências
externas nem build step). Abrir `index.html` no browser é suficiente para ver
o resultado.

```
index.html
assets/
  css/style.css
  js/main.js
  img/favicon.svg
```

## Antes de publicar — substituir os placeholders

A página foi escrita de raiz porque o ambiente onde foi desenvolvida não tinha
acesso de rede ao site do Porto (`porto.doutorsofa.pt` bloqueado pelo proxy da
organização). Os dados abaixo são fictícios e têm de ser trocados pelos reais
da unidade de Lisboa:

| Placeholder | Onde aparece | Substituir por |
|---|---|---|
| `+351 000 000 000` | topo, hero, CTA final, rodapé | telefone da unidade |
| `351000000000` | links `wa.me`, `tel:` e `WHATSAPP` em `assets/js/main.js` | número em formato internacional, sem `+` |
| `lisboa@doutorsofa.pt` | rodapé, JSON-LD | e-mail da unidade |
| `https://lisboa.doutorsofa.pt/` | `canonical`, Open Graph, JSON-LD | domínio final |
| Horário `9h–19h` | rodapé, CTA, JSON-LD | horário real |

Substituição rápida (Linux/macOS):

```sh
grep -rl '000000000' . --include='*.html' --include='*.js' \
  | xargs sed -i 's/351000000000/351XXXXXXXXX/g; s/+351 000 000 000/+351 XXX XXX XXX/g'
```

## Conteúdo a rever

- **Imagem “Antes & Depois”** (`.media-ph` em `index.html`) — placeholder à espera
  de fotografia real da unidade.
- **Testemunhos** — são ilustrativos e estão assinalados como tal na página.
  Trocar por avaliações reais (Google) e remover o aviso `.disclaimer`.
- **Zonas atendidas** — lista actual cobre a Área Metropolitana de Lisboa;
  ajustar à área efectivamente servida.
- **Imagem Open Graph** — criar `assets/img/og-lisboa.jpg` (1200×630).
- **Política de Privacidade** — o link no rodapé aponta para `#`.
- **Cores da marca** — a paleta em `:root` (`assets/css/style.css`) é uma
  aproximação azul; confirmar com o manual de marca Doutor Sofá.

## Formulário

O formulário do hero não envia e-mail: valida os campos obrigatórios e abre uma
conversa de WhatsApp com a mensagem já preenchida. Para passar a enviar por
e-mail ou para um CRM, alterar o handler `submit` em `assets/js/main.js`.
