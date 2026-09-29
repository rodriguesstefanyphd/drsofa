import type { Unidade } from '@/data/unidades';
import { Comparador } from './Comparador';
import { Env } from './Env';
import { Titulo } from './Titulo';

export function AntesDepois({ u }: { u: Unidade }) {
  const temArrastar = u.antesDepois.some((p) => p.modo === 'arrastar');

  return (
    <section id="antes-depois" className="bg-grafite py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo escuro realce="depois">
          Antes e
        </Titulo>
        {/* Diz «Doutor Sofá» e não «a unidade de X» de propósito. As
            fotografias circulam entre franquiados, e quase nunca se sabe ao
            certo de que unidade é cada uma. Assinar cada trabalho como sendo
            desta casa seria dizer que foi esta mão a fazê-lo, o que não se
            pode garantir. Marca e método são os mesmos em todo o lado: isso
            sim, é verdade, e até diz mais a quem está a decidir. */}
        <p className="mt-4 text-center text-[#D8D8D8]">
          Trabalhos reais Doutor Sofá. O mesmo método em todas as unidades.
        </p>

        {u.antesDepois.length === 0 ? (
          <p className="mx-auto mt-8 max-w-[52ch] rounded-[10px] border-2 border-dashed border-white/40 p-6 text-center font-bold text-white">
            «FALTA: antesDepois» — fotografias de trabalhos, antes e depois. Sem elas esta
            secção não tem nada para mostrar.
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

        {/* Dizia «na primeira imagem», e passou a haver mais do que uma
            com barra. A frase aponta agora para a barra amarela em vez de
            para uma posição, e deixa de mentir quando os pares mudam. */}
        {temArrastar && (
          <p className="mt-4 text-center text-[0.9rem] text-[#D8D8D8]">
            Nas imagens com a barra amarela, arraste-a para ver a diferença.
          </p>
        )}
      </Env>
    </section>
  );
}
