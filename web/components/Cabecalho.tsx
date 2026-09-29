import type { Unidade } from '@/data/unidades';
import { linkWhatsApp } from '@/lib/eventos';
import { ou } from '@/lib/marcadores';
import { Env } from './Env';

export function Cabecalho({ u }: { u: Unidade }) {
  return (
    <header className="sticky top-0 z-50 bg-carvao text-white shadow-[0_2px_12px_rgba(0,0,0,.18)]">
      <Env className="flex items-center justify-between gap-4 py-3">
        <a href="/" className="flex items-center gap-3" aria-label="Doutor Sofá — página inicial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-branco.png"
            alt="Doutor Sofá — limpeza especializada"
            width={522}
            height={240}
            className="h-11 w-auto"
          />
          <span className="border-l border-white/30 pl-3 text-xs leading-tight text-white/85">
            Unidade
            <br />
            de {u.cidade}
          </span>
        </a>
        <div className="flex items-center gap-4">
          {u.telefone ? (
            <a
              href={`tel:${u.telefone.e164}`}
              data-local="topo"
              // Era texto solto com 28 px de altura, ao lado de um botão de
              // 44. Passa a ter a mesma caixa de toque do botão sem mudar de
              // aspecto: continua a ler-se como um número, mas já se acerta
              // nele com o dedo e com o rato.
              className="hidden items-center font-bold hover:underline sm:inline-flex sm:min-h-[44px]"
            >
              {u.telefone.legivel}
            </a>
          ) : (
            <span className="hidden text-sm text-amarelo sm:inline">{ou(null, 'telefone')}</span>
          )}
          {u.telefone && (
            <a
              className="hidden rounded bg-amarelo px-4 py-2.5 font-bold text-carvao hover:bg-amarelo-escuro md:inline-block"
              href={linkWhatsApp(u.telefone.whatsapp, u.cidade)}
              data-local="topo_cta"
            >
              Orçamento gratuito
            </a>
          )}
        </div>
      </Env>
    </header>
  );
}
