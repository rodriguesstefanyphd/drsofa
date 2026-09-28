/**
 * Lista o que falta antes de publicar.
 *
 * Corre com `npm run pendentes`. Serve para ninguém pôr uma página no ar com
 * um telefone em branco sem dar por isso: um campo em falta não dá erro
 * nenhum no site, só perde pedidos em silêncio.
 *
 * Os valores gerais são verificados aqui, e não em `lib/marcadores.ts`, por
 * uma razão prática: este script corre em Node puro, que não resolve o atalho
 * `@/`. Aquele ficheiro só pode importar tipos, que desaparecem em execução;
 * uma constante importada lá parte este comando.
 */
import { MEDICAO, SITE } from '../data/configuracao.ts';
import { UNIDADES } from '../data/unidades.ts';
import { pendencias, type Pendencia } from '../lib/marcadores.ts';

let total = 0;

/** Não pertencem a nenhuma cidade, e a falta de qualquer um afecta as duas. */
const gerais: Pendencia[] = [];
if (MEDICAO.gtm === null)
  gerais.push({
    campo: 'MEDICAO.gtm',
    descricao: 'Contentor do Tag Manager. Sem ele não há uma única conversão medida.',
  });
if (SITE.alojamento === null)
  gerais.push({ campo: 'SITE.alojamento', descricao: 'Citado na política de privacidade.' });
if (SITE.dataPolitica === null)
  gerais.push({ campo: 'SITE.dataPolitica', descricao: 'Data da última alteração à política.' });

console.log('\nGerais (as duas unidades)\n-------------------------');
if (gerais.length === 0) {
  console.log('  Nada em falta.');
} else {
  for (const f of gerais) console.log(`  ${f.campo.padEnd(26)} ${f.descricao}`);
  total += gerais.length;
}

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
