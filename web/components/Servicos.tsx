import type { Unidade } from '@/data/unidades';
import { ou } from '@/lib/marcadores';
import { Env } from './Env';
import { Titulo } from './Titulo';

export function Servicos({ u }: { u: Unidade }) {
  const cartoes = [
    {
      img: '/images/sofa.jpg',
      alt: 'Sofá de tecido de dois lugares, do tipo que limpamos ao domicílio',
      titulo: 'Sofás e cadeirões',
      texto:
        'Limpeza profunda de tecido, chaise longue e cadeirões. Remove nódoas, gordura e odores acumulados.',
      preco: u.precos.sofa,
      campo: 'precos.sofa',
    },
    {
      img: '/images/colchao.jpg',
      alt: 'Colchão de casal, do tipo que higienizamos ao domicílio',
      titulo: 'Colchões',
      texto:
        'Elimina ácaros e bactérias. Recomendado uma vez por ano, sobretudo em casas com alergias ou rinite.',
      preco: u.precos.colchao,
      campo: 'precos.colchao',
    },
    {
      img: '/images/impermeabilizacao.jpg',
      alt: 'Cadeirão claro impermeabilizado: as gotas de líquido ficam à superfície sem penetrar no tecido',
      titulo: 'Impermeabilização',
      texto:
        'Cria uma barreira contra líquidos. Um copo entornado limpa-se com um pano, sem penetrar no tecido.',
      preco: u.precos.impermeabilizacao,
      campo: 'precos.impermeabilizacao',
    },
  ];

  return (
    <section className="py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo>O que limpamos</Titulo>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cartoes.map((c) => (
            <article
              key={c.titulo}
              className="overflow-hidden rounded-[10px] border border-borda bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.alt}
                loading="lazy"
                width={600}
                height={400}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-[1.05rem] font-bold">{c.titulo}</h3>
                <p className="mt-2 text-[0.97rem] text-tinta-suave">{c.texto}</p>
                <p className="mt-3 font-extrabold">Desde {ou(c.preco, c.campo)} €</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[0.95rem] text-tinta-suave">
          Também fazemos tapetes, alcatifas, cadeiras de escritório e estofos de empresas,
          alojamento local e condomínios.
        </p>
      </Env>
    </section>
  );
}
