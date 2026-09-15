import type { Unidade } from '@/data/unidades';
import { Comparador } from './Comparador';
import { Env } from './Env';
import { Titulo } from './Titulo';

export function AntesDepois({ u }: { u: Unidade }) {
  const temArrastar = u.antesDepois.some((p) => p.modo === 'arrastar');

  return (
    <section className="bg-grafite py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo escuro realce="depois">
          Antes e
        </Titulo>
        <p className="mt-4 text-center text-[#D8D8D8]">
          Trabalhos reais da unidade de {u.cidade}.
        </p>

        {u.antesDepois.length === 0 ? (
          <p className="mx-auto mt-8 max-w-[52ch] rounded-[10px] border-2 border-dashed border-white/40 p-6 text-center font-bold text-white">
            «FALTA: antesDepois» — fotografias de trabalhos desta unidade. As que existem no
            repositório são de outra unidade e não podem ser apresentadas como sendo daqui.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {u.antesDepois.map((par) =>
              par.modo === 'arrastar' ? (
                <Comparador key={par.antes} par={par} />
              ) : (
                /* Quando as duas fotografias não têm o mesmo enquadramento, o
                   comparador de arrastar faz o objeto saltar. Lado a lado não
                   exige alinhamento nenhum e mostra a diferença na mesma. */
                <figure
                  key={par.antes}
                  className="m-0 grid aspect-[3/2] grid-cols-2 gap-1.5 overflow-hidden rounded-[10px] bg-black"
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={par.antes}
                      alt={par.altAntes}
                      loading="lazy"
                      width={800}
                      height={914}
                      className="h-full w-full object-cover"
                    />
                    <span className="etiqueta left-2.5">Antes</span>
                  </div>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={par.depois}
                      alt={par.altDepois}
                      loading="lazy"
                      width={800}
                      height={914}
                      className="h-full w-full object-cover"
                    />
                    <span className="etiqueta right-2.5">Depois</span>
                  </div>
                </figure>
              ),
            )}
          </div>
        )}

        {temArrastar && (
          <p className="mt-4 text-center text-[0.9rem] text-[#D8D8D8]">
            Na primeira imagem, arraste a barra amarela para ver a diferença.
          </p>
        )}
      </Env>
    </section>
  );
}
