import type { Unidade } from '@/data/unidades';
import { Env } from './Env';
import { Titulo } from './Titulo';

export function Avaliacoes({ u }: { u: Unidade }) {
  const { testemunhos, linkPerfil } = u.avaliacoes;

  return (
    <section className="bg-amarelo py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo>O que dizem os clientes de {u.cidade}</Titulo>

        {testemunhos.length === 0 ? (
          <p className="mt-8 rounded-[10px] border-2 border-dashed border-tinta/40 bg-white/60 p-6 text-center font-bold">
            «FALTA: avaliacoes.testemunhos» — três avaliações reais desta unidade, copiadas tal como
            o cliente as escreveu. As de outra unidade não servem.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testemunhos.map((t) => (
              <blockquote
                key={t.nome}
                className="rounded-[10px] bg-white p-6 shadow-sm transition hover:-translate-y-1"
              >
                {/* role="img" torna o aria-label válido: num div sem papel, o
                    aria-label é proibido e o axe-core assinala-o. */}
                <div
                  role="img"
                  aria-label={`${t.estrelas} em 5 estrelas`}
                  className="tracking-[2px] text-[#E8B400]"
                >
                  {'★'.repeat(t.estrelas)}
                </div>
                <p className="mt-3 whitespace-pre-line text-[0.97rem]">{t.texto}</p>
                <footer className="mt-4">
                  <cite className="block font-semibold not-italic">{t.nome}</cite>
                  <time dateTime={t.data} className="block text-[0.82rem] text-tinta-suave">
                    {t.dataLegivel}
                  </time>
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {linkPerfil && (
          <p className="mt-6 text-center">
            <a
              href={linkPerfil}
              target="_blank"
              rel="noopener"
              className="font-bold text-tinta underline"
            >
              Ver todas as avaliações no Google
            </a>
          </p>
        )}
      </Env>
    </section>
  );
}
