import type { Unidade } from '@/data/unidades';
import { linkWhatsApp } from '@/lib/eventos';
import { ou } from '@/lib/marcadores';
import { Env } from './Env';

const PONTOS = [
  'Envie uma foto e recebe o preço no mesmo dia',
  'Produtos biodegradáveis, seguros para crianças e animais',
];

export function Heroi({ u }: { u: Unidade }) {
  const zap = u.telefone ? linkWhatsApp(u.telefone.whatsapp, u.cidade) : null;
  return (
    <div className="bg-amarelo py-11 text-tinta">
      <Env className="grid gap-7 md:grid-cols-2 md:items-center">
        <div>
          <span className="mb-4 inline-block rounded-sm border-[1.5px] border-tinta/35 px-3 py-1 text-[0.82rem] font-semibold">
            Serviço ao domicílio em {u.cidade} e arredores
          </span>
          <h1
            id="tituloHeroi"
            tabIndex={-1}
            className="max-w-[18ch] text-[2.1rem] font-extrabold leading-[1.08] md:text-[3rem]"
          >
            Limpeza e higienização de sofás ao domicílio
          </h1>
          <p className="mt-3.5 max-w-[46ch] text-[#3F3A2A] md:text-[1.08rem]">
            Removemos nódoas, ácaros, bactérias e odores no seu sofá, colchão ou tapete, sem tirar
            nada de casa. Orçamento gratuito em minutos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {zap && u.telefone ? (
              <>
                <a
                  className="inline-flex min-h-[56px] items-center justify-center rounded-md bg-acao px-6 font-bold text-white hover:bg-acao-escuro"
                  href={zap}
                  data-local="heroi"
                >
                  Pedir orçamento no WhatsApp
                </a>
                <a
                  className="inline-flex min-h-[56px] items-center justify-center rounded-md border-2 border-tinta px-6 font-bold text-tinta hover:bg-tinta hover:text-amarelo"
                  href={`tel:${u.telefone.e164}`}
                  data-local="heroi"
                >
                  Ligar agora
                </a>
              </>
            ) : (
              <p className="font-bold">{ou(null, 'telefone')}</p>
            )}
          </div>
          <ul className="mt-6 space-y-2">
            <li className="flex gap-2.5">
              <span aria-hidden className="font-bold">
                ✓
              </span>
              Sem taxa de deslocação em {u.cidade}
            </li>
            {PONTOS.map((p) => (
              <li key={p} className="flex gap-2.5">
                <span aria-hidden className="font-bold">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-[10px] bg-[#E8BF00]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/capa.jpg"
            alt="Técnico da Doutor Sofá a aplicar produto num sofá de tecido durante uma limpeza ao domicílio"
            width={1600}
            height={900}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </Env>
    </div>
  );
}
