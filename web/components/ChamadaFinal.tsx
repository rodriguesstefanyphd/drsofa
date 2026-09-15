import type { Unidade } from '@/data/unidades';
import { linkWhatsApp } from '@/lib/eventos';
import { Env } from './Env';
import { Titulo } from './Titulo';

export function ChamadaFinal({ u }: { u: Unidade }) {
  return (
    <section className="bg-carvao py-14 text-white md:py-[78px]">
      <Env className="text-center">
        <Titulo escuro realce="que dá gosto usar">
          Volte a ter um <span className="text-amarelo">sofá</span>
        </Titulo>
        <p className="mx-auto mt-5 max-w-[44ch] text-[#DBDBDB]">
          Envie uma foto e receba o preço hoje mesmo.
        </p>
        {u.telefone && (
          <a
            className="mt-6 inline-flex min-h-[56px] items-center justify-center rounded-md bg-acao px-6 font-bold text-white hover:bg-acao-escuro"
            href={linkWhatsApp(u.telefone.whatsapp, u.cidade)}
            data-local="final"
          >
            Pedir orçamento no WhatsApp
          </a>
        )}
      </Env>
    </section>
  );
}
