'use client';

import type { Unidade } from '@/data/unidades';
import { linkWhatsApp, pedidoOrcamento } from '@/lib/eventos';
import { marcador } from '@/lib/marcadores';
import { Env } from './Env';
import { Titulo } from './Titulo';

/**
 * Sem chave não há formulário.
 *
 * A reserva anterior era a string `'CHAVE_WEB3FORMS_AQUI'`, e o resultado foi
 * o pior comportamento possível: um formulário de aspecto impecável que
 * recolhia nome, telemóvel e serviço e os entregava a um destino inexistente.
 * Quem o preenchesse ficava à espera de resposta, e do nosso lado não havia
 * sequer um erro para dar por isso — a perda perfeitamente silenciosa.
 *
 * Com `null`, a secção mostra os canais que funcionam de facto. Menos bonito,
 * e não perde um único pedido.
 */


const SERVICOS = [
  'Limpeza de sofá',
  'Limpeza de colchão',
  'Impermeabilização',
  'Tapetes ou alcatifas',
  'Empresa ou condomínio',
  'Outro',
];

export function Formulario({ u }: { u: Unidade }) {
  const CHAVE = u.web3formsKey;

  return (
    <section id="orcamento" className="bg-banda py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo>Peça o seu orçamento</Titulo>
        <p className="mt-4 text-center text-tinta-suave">
          Respondemos no mesmo dia, em horário de funcionamento.
        </p>

        {CHAVE === null ? (
          <div className="mx-auto mt-7 max-w-[620px] rounded-[10px] border border-borda bg-white p-6 text-center">
            <p className="font-bold">{marcador('NEXT_PUBLIC_WEB3FORMS_KEY')}</p>
            <p className="mt-3 text-tinta-suave">
              O formulário está desligado até a chave estar definida. Entretanto, fale connosco
              directamente — respondemos no mesmo dia.
            </p>
            {u.telefone && (
              <p className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href={linkWhatsApp(u.telefone.whatsapp, u.cidade)}
                  data-local="form"
                  className="inline-flex min-h-[56px] items-center rounded-md bg-acao px-6 font-bold text-white hover:bg-acao-escuro"
                >
                  Falar no WhatsApp
                </a>
                <a
                  href={`tel:${u.telefone.e164}`}
                  data-local="form"
                  className="inline-flex min-h-[56px] items-center rounded-md border border-borda px-6 font-bold text-tinta"
                >
                  Ligar {u.telefone.legivel}
                </a>
              </p>
            )}
          </div>
        ) : (
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
        )}
      </Env>
    </section>
  );
}
