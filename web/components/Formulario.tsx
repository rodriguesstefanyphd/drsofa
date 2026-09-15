'use client';

import type { Unidade } from '@/data/unidades';
import { linkWhatsApp, pedidoOrcamento } from '@/lib/eventos';
import { Env } from './Env';
import { Titulo } from './Titulo';

const CHAVE = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? 'CHAVE_WEB3FORMS_AQUI';

const SERVICOS = [
  'Limpeza de sofá',
  'Limpeza de colchão',
  'Impermeabilização',
  'Tapetes ou alcatifas',
  'Empresa ou condomínio',
  'Outro',
];

export function Formulario({ u }: { u: Unidade }) {
  return (
    <section id="orcamento" className="bg-banda py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo>Peça o seu orçamento</Titulo>
        <p className="mt-4 text-center text-tinta-suave">
          Respondemos no mesmo dia, em horário de funcionamento.
        </p>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          id="formOrcamento"
          className="mx-auto mt-7 grid max-w-[620px] gap-4 rounded-[10px] border border-borda bg-white p-6"
          onSubmit={(e) => {
            const servico = (e.currentTarget.elements.namedItem('servico') as HTMLSelectElement)
              ?.value;
            pedidoOrcamento(u.slug, servico ?? '');
          }}
        >
          <input type="hidden" name="access_key" value={CHAVE} />
          <input type="hidden" name="subject" value={`Novo pedido de orçamento - ${u.cidade}`} />
          <input type="hidden" name="from_name" value={`Site Doutor Sofá ${u.cidade}`} />
          {/* Armadilha para robôs. Escondida com CSS, não com hidden, para os
              robôs a preencherem e nós sabermos que é spam. */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />

          <div className="grid gap-1.5">
            <label htmlFor="nome" className="font-semibold">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              autoComplete="name"
              className="min-h-[52px] rounded-md border border-borda px-3.5"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="telemovel" className="font-semibold">
              Telemóvel
            </label>
            <input
              type="tel"
              id="telemovel"
              name="telemovel"
              required
              autoComplete="tel"
              inputMode="tel"
              pattern="[0-9+ ]{9,15}"
              className="min-h-[52px] rounded-md border border-borda px-3.5"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="servico" className="font-semibold">
              Serviço
            </label>
            <select
              id="servico"
              name="servico"
              required
              defaultValue=""
              className="min-h-[52px] rounded-md border border-borda bg-white px-3.5"
            >
              <option value="">Escolha uma opção</option>
              {SERVICOS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="mensagem" className="font-semibold">
              Detalhes <span className="font-normal text-tinta-suave">(opcional)</span>
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={4}
              placeholder="Ex.: sofá de 3 lugares em tecido, com nódoas"
              className="rounded-md border border-borda p-3.5"
            />
          </div>

          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="rgpd"
              name="consentimento"
              required
              value="sim"
              className="mt-1 h-5 w-5 flex-none"
            />
            <label htmlFor="rgpd" className="text-[0.94rem]">
              Autorizo o contacto para resposta a este pedido de orçamento e li a{' '}
              <a href="/privacidade/" className="text-tinta underline">
                política de privacidade
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            className="min-h-[56px] rounded-md bg-amarelo font-bold text-carvao hover:bg-amarelo-escuro"
          >
            Enviar pedido
          </button>

          {u.telefone && (
            <p className="text-center text-[0.94rem] text-tinta-suave">
              Prefere falar já?{' '}
              <a
                href={linkWhatsApp(u.telefone.whatsapp, u.cidade)}
                data-local="form"
                className="font-bold text-acao"
              >
                Fale connosco no WhatsApp
              </a>
            </p>
          )}
        </form>
      </Env>
    </section>
  );
}
