import type { Unidade } from '@/data/unidades';
import { Env } from './Env';
import { Titulo } from './Titulo';

export function Cobertura({ u }: { u: Unidade }) {
  return (
    <section className="py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo>Onde vamos</Titulo>
        <p className="mt-6 text-tinta-suave">
          Serviço ao domicílio, sem taxa de deslocação nestes concelhos:
        </p>
        {/* A mesma lista alimenta o areaServed do JSON-LD. Uma fonte só, para
            a página e os dados estruturados não poderem divergir. */}
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {u.concelhos.map((c) => (
            <li
              key={c}
              className="rounded border border-borda bg-banda px-3 py-1.5 text-[0.94rem]"
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.94rem] text-tinta-suave">
          Fora desta área? Pergunte-nos na mesma — muitas vezes conseguimos ir.
        </p>
      </Env>
    </section>
  );
}
