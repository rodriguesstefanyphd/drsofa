import { Env } from './Env';
import { Titulo } from './Titulo';

const PERGUNTAS = [
  {
    p: 'Quanto tempo demora a secar?',
    r: 'Cerca de 24 horas, dependendo da ventilação da divisão. Usamos um método semi-seco, por isso o estofo fica apenas ligeiramente húmido.',
  },
  {
    p: 'Quanto custa?',
    r: 'Depende do tipo e do tamanho do estofo. Envie-nos uma foto pelo WhatsApp e damos-lhe um valor fechado no mesmo dia, sem compromisso.',
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

export function Faq() {
  return (
    <section className="py-14 md:py-[78px]">
      <div className="mx-auto w-full max-w-[760px] px-5">
        <Titulo>Perguntas frequentes</Titulo>
        <div className="mt-8 divide-y divide-borda border-y border-borda">
          {PERGUNTAS.map((q) => (
            <details key={q.p} className="group">
              <summary className="cursor-pointer list-none py-4 font-bold marker:hidden">
                <span aria-hidden className="mr-3 inline-block text-tinta-suave group-open:hidden">
                  +
                </span>
                <span aria-hidden className="mr-3 hidden text-tinta-suave group-open:inline-block">
                  −
                </span>
                {q.p}
              </summary>
              <p className="pb-4 pl-7 text-[0.97rem] text-tinta-suave">{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
