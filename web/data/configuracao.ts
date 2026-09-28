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
  gtm: 'GTM-MFFJ6KWM',
};

/**
 * Cópia dos pedidos num Google Forms, a par do WhatsApp.
 *
 * O formulário do site abre o WhatsApp com a mensagem escrita, mas quem
 * carrega em enviar é a pessoa — e quem desiste a meio não deixa rasto. Esta
 * cópia é a rede por baixo: fica tudo numa folha de cálculo, mesmo os pedidos
 * que nunca chegam a ser enviados.
 *
 * Enviada com `navigator.sendBeacon`, que existe precisamente para isto:
 * sobrevive à navegação que leva a pessoa para o WhatsApp a seguir. Não há
 * como saber se chegou — o Google não responde a pedidos destes vindos de
 * outro domínio —, por isso é uma cópia de segurança e nunca o canal
 * principal.
 *
 * Com `url` a `null` não se envia nada, e a política de privacidade também não
 * o menciona: o que a página declara acompanha o que ela faz.
 */
export const FORMULARIO_GOOGLE: {
  /** O endereço que acaba em `/formResponse`. */
  url: PorPreencher<string>;
  /** O nome `entry.N` de cada pergunta, tirado do link pré-preenchido. */
  campos: {
    nome: PorPreencher<string>;
    telemovel: PorPreencher<string>;
    servico: PorPreencher<string>;
    detalhes: PorPreencher<string>;
    cidade: PorPreencher<string>;
  };
} = {
  url: null,
  campos: { nome: null, telemovel: null, servico: null, detalhes: null, cidade: null },
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
