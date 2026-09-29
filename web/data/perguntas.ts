/**
 * As perguntas frequentes, num sítio só.
 *
 * São lidas em dois lados: pela secção que as mostra e pelo JSON-LD que as
 * declara ao Google. Se vivessem no componente, o dia em que alguém corrigisse
 * uma resposta na página deixaria o que está declarado a dizer outra coisa —
 * e declarar ao motor de busca uma resposta que a página não dá é das poucas
 * coisas que o Google penaliza de facto.
 */
export type Pergunta = {
  /** A pergunta, como o cliente a faria. */
  p: string;
  /** A resposta. Texto simples: o JSON-LD não leva marcação. */
  r: string;
};

export const PERGUNTAS: Pergunta[] = [
  {
    p: 'Quanto tempo demora a secar?',
    r: 'Cerca de 24 horas, dependendo da ventilação da divisão. Usamos um método semi-seco, por isso o tecido fica apenas ligeiramente húmido.',
  },
  {
    p: 'Quanto custa?',
    r: 'Depende do tipo e do tamanho da peça. Envie-nos uma foto pelo WhatsApp e damos-lhe um valor fechado no mesmo dia, sem compromisso.',
  },
  {
    p: 'Os produtos são seguros para crianças e animais?',
    r: 'Sim. Usamos produtos biodegradáveis, atóxicos e antialérgicos, indicados para casas com crianças, animais ou pessoas com rinite.',
  },
  {
    p: 'Tenho de tirar o sofá de casa?',
    r: 'Não. Todo o trabalho é feito na sua casa. O técnico traz o equipamento e não suja a divisão.',
  },
  {
    p: 'Conseguem tirar todas as nódoas?',
    r: 'A maioria sai por completo. Nódoas antigas de tinta, lixívia ou queimaduras podem ser permanentes — dizemos-lhe isso à partida, antes de avançar.',
  },
  {
    p: 'Trabalham ao fim de semana?',
    r: 'Sim, aos sábados das 8h às 12h. Fora do horário, sob consulta.',
  },
];
