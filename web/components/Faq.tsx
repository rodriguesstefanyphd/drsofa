import { PERGUNTAS } from '@/data/perguntas';
import { Env } from './Env';
import { Titulo } from './Titulo';


export function Faq() {
  /* O id existe para os links de site do Google Ads poderem apontar
     directamente para aqui. Sem ele, o anúncio só sabe levar ao topo. */
  return (
    <section id="perguntas" className="py-14 md:py-[78px]">
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
