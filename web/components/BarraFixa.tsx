import type { Unidade } from '@/data/unidades';
import { linkWhatsApp } from '@/lib/eventos';
import { Env } from './Env';

/** Barra de contacto fixa, só em ecrã pequeno. */
export function BarraFixa({ u }: { u: Unidade }) {
  if (!u.telefone) return null;
  return (
    <nav
      aria-label="Contacto rápido"
      className="barra-fixa fixed inset-x-0 bottom-0 z-[60] flex gap-2.5 border-t border-borda bg-white p-2.5 shadow-[0_-6px_18px_rgba(0,0,0,.08)] md:hidden"
    >
      <a
        className="flex flex-1 items-center justify-center rounded-md bg-acao py-3.5 font-bold text-white"
        href={linkWhatsApp(u.telefone.whatsapp, u.cidade)}
        data-local="barra_fixa"
      >
        WhatsApp
      </a>
      <a
        className="flex flex-1 items-center justify-center rounded-md border-[1.5px] border-carvao bg-white py-3.5 font-bold text-carvao"
        href={`tel:${u.telefone.e164}`}
        data-local="barra_fixa"
      >
        Ligar
      </a>
    </nav>
  );
}
