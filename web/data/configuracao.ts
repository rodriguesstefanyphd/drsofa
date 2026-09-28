/**
 * Valores que não pertencem a nenhuma unidade em particular.
 *
 * Viviam como variáveis de ambiente no painel da Cloudflare. Nenhum deles é
 * segredo: todos acabam escritos no HTML publicado, onde qualquer pessoa os lê
 * com um clique direito. O painel não comprava segurança nenhuma, e cobrava um
 * passo manual repetido em dois projetos mais uma reimplantação que é fácil
 * esquecer — porque as variáveis são lidas quando o site compila, não quando
 * alguém o visita.
 *
 * Foi exactamente assim que se perderam coisas: a data da política ficou em
 * branco a público, e o contentor do Tag Manager esteve todo este tempo a
 * apontar para `GTM-XXXXXXX`, a string de reserva do código. Ninguém deu por
 * nenhum dos dois, porque um valor em falta no painel não dá erro nenhum.
 *
 * Aqui mudam no mesmo commit que o resto do conteúdo, ficam no histórico, e o
 * `npm run pendentes` vigia-os como vigia tudo o resto.
 */

import type { PorPreencher } from './unidades';

export const MEDICAO: {
  /**
   * Contentor do Google Tag Manager. Um só serve as duas unidades: cada evento
   * leva a cidade consigo, e é por aí que os relatórios se separam. Dois
   * contentores obrigariam a configurar as mesmas etiquetas duas vezes e a
   * mantê-las em passo uma com a outra.
   */
  gtm: PorPreencher<string>;
} = {
  gtm: null,
};

export const SITE: {
  /** Citado na política de privacidade, na lista de subcontratantes. */
  alojamento: PorPreencher<string>;
  /** Data da última alteração ao texto da política, como se escreve na página. */
  dataPolitica: PorPreencher<string>;
} = {
  alojamento: 'Cloudflare, Inc.',
  dataPolitica: '28 de setembro de 2026',
};
