# Imagens

Estes ficheiros ainda não estão no repositório. Copiar da página do Porto
(`https://porto.doutorsofa.pt/images/…`) ou substituir por material próprio
da unidade de Lisboa, mantendo os mesmos nomes:

| Ficheiro | Onde é usado |
|---|---|
| `logobranca.png` | cabeçalho e rodapé |
| `fundo.webp` | fundo fixo da página (`assets/css/style.css`, regra `.bg-fixed`) |
| `limpezasofa.webp` | card "Limpeza de Sofás" |
| `limpezacolchao.webp` | card "Limpeza de Colchões" |
| `impermeabilizacao.webp` | card "Impermeabilização" |
| `avaliacao1.jpeg` | secção "Clientes Satisfeitos" |

`favicon.svg` já está incluído (placeholder — trocar pelo ícone oficial).

Nota sobre o fundo: a página do Porto não usa `background-attachment: fixed`.
Tem dois elementos próprios logo a abrir o `<body>` — `.bg-fixed` (a fotografia)
e `.bg-overlay` (o véu escuro por cima) — que cobrem a página toda, não só o
hero. Para obter o URL da fotografia, no Console da página do Porto:

```js
copy(getComputedStyle(document.querySelector('.bg-fixed')).backgroundImage)
```
