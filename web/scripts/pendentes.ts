/**
 * Lista o que falta a cada unidade antes de publicar.
 *
 * Corre com `npm run pendentes`. Serve para ninguém pôr uma página no ar com
 * um telefone em branco sem dar por isso: um campo em falta não dá erro
 * nenhum no site, só perde pedidos em silêncio.
 */
import { UNIDADES } from '../data/unidades.ts';
import { pendencias } from '../lib/marcadores.ts';

let total = 0;

for (const [slug, unidade] of Object.entries(UNIDADES)) {
  const faltas = pendencias(unidade);
  total += faltas.length;
  const cabecalho = `${unidade.cidade} (${slug})`;
  console.log(`\n${cabecalho}\n${'-'.repeat(cabecalho.length)}`);
  if (faltas.length === 0) {
    console.log('  Nada em falta.');
    continue;
  }
  for (const f of faltas) {
    console.log(`  ${f.campo.padEnd(26)} ${f.descricao}`);
  }
}

console.log(`\nTotal por preencher: ${total}\n`);
