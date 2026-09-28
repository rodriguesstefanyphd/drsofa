'use client';

import { useState } from 'react';
import { FORMULARIO_GOOGLE } from '@/data/configuracao';
import type { Unidade } from '@/data/unidades';
import { linkWhatsApp, linkWhatsAppMensagem, pedidoOrcamento } from '@/lib/eventos';
import { Env } from './Env';
import { Titulo } from './Titulo';

const SERVICOS = [
  'Limpeza de sofá',
  'Limpeza de colchão',
  'Impermeabilização',
  'Tapetes ou alcatifas',
  'Empresa ou condomínio',
  'Outro',
];

/**
 * Guarda uma cópia do pedido na folha do Google, se estiver configurada.
 *
 * `sendBeacon` é o que torna isto fiável: o pedido é entregue pelo browser
 * mesmo depois de a página sair para o WhatsApp. Um `fetch` normal seria
 * cancelado a meio nessa altura.
 *
 * Falha em silêncio de propósito. Esta é a rede de segurança, não o canal: se
 * um bloqueador a travar, a pessoa segue para o WhatsApp na mesma e não vê
 * erro nenhum.
 */
function guardarCopia(
  u: Unidade,
  dados: { nome: string; telemovel: string; servico: string; detalhes: string },
) {
  const { url, campos } = FORMULARIO_GOOGLE;
  if (url === null || typeof navigator === 'undefined' || !navigator.sendBeacon) return;

  const corpo = new URLSearchParams();
  const juntar = (campo: string | null, valor: string) => {
    if (campo !== null && valor !== '') corpo.append(campo, valor);
  };
  juntar(campos.nome, dados.nome);
  juntar(campos.telemovel, dados.telemovel);
  juntar(campos.servico, dados.servico);
  juntar(campos.detalhes, dados.detalhes);
  juntar(campos.cidade, u.cidade);

  try {
    navigator.sendBeacon(url, corpo);
  } catch {
    /* sem rede, ou bloqueado: o WhatsApp continua a abrir */
  }
}

/**
 * Pedido de orçamento, entregue no WhatsApp.
 *
 * O formulário não envia nada a lado nenhum: compõe a mensagem e abre o
 * WhatsApp da pessoa com ela já escrita. Quem carrega em enviar é ela, para o
 * número da unidade.
 *
 * É o desenho certo para este negócio e não um remendo. A página inteira pede
 * que enviem uma foto pelo WhatsApp, e é lá que a conversa continua — pedir a
 * foto, dar o preço, marcar o dia. Um formulário que despejasse isto num
 * e-mail obrigava a mudar de canal a meio.
 *
 * O que se ganha além disso: nenhum serviço terceiro recebe o nome e o
 * telemóvel de quem pede orçamento, e a política de privacidade fica com menos
 * um subcontratante. O que se perde: se a pessoa desistir dentro do WhatsApp,
 * o pedido não fica registado em lado nenhum.
 */
export function Formulario({ u }: { u: Unidade }) {
  const [servico, setServico] = useState('');

  function aoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!u.telefone) return;

    const dados = new FormData(e.currentTarget);
    const campo = (nome: string) => String(dados.get(nome) ?? '').trim();

    const linhas = [
      `Olá! Gostaria de um orçamento para ${u.cidade}.`,
      '',
      `Nome: ${campo('nome')}`,
      `Telemóvel: ${campo('telemovel')}`,
      `Serviço: ${campo('servico')}`,
    ];
    const detalhes = campo('mensagem');
    if (detalhes) linhas.push(`Detalhes: ${detalhes}`);

    guardarCopia(u, {
      nome: campo('nome'),
      telemovel: campo('telemovel'),
      servico: campo('servico'),
      detalhes,
    });

    pedidoOrcamento(u.slug, campo('servico'));

    const destino = linkWhatsAppMensagem(u.telefone.whatsapp, linhas.join('\n'));
    // Nova janela quando dá, para não perder a página. Se o browser a bloquear
    // — acontece — vai-se na mesma janela, que é sempre melhor do que o clique
    // não fazer nada.
    const janela = window.open(destino, '_blank', 'noopener');
    if (!janela) window.location.href = destino;
  }

  return (
    <section id="orcamento" className="bg-banda py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo>Peça o seu orçamento</Titulo>
        <p className="mt-4 text-center text-tinta-suave">
          Respondemos no mesmo dia, em horário de funcionamento.
        </p>

        {/* Sem JavaScript o formulário não consegue compor a mensagem, por isso
            não é mostrado de todo: em vez de um botão que não faz nada, ficam
            os contactos directos, que funcionam sempre. */}
        <div className="so-com-js mx-auto mt-7 max-w-[620px] rounded-[10px] border border-borda bg-white p-6">
          <form id="formOrcamento" className="grid gap-4" onSubmit={aoSubmeter}>
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
                value={servico}
                onChange={(e) => setServico(e.target.value)}
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

            <button
              type="submit"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-acao font-bold text-white hover:bg-acao-escuro"
            >
              Enviar pelo WhatsApp
            </button>

            <p className="text-center text-[0.9rem] text-tinta-suave">
              Abre o WhatsApp com o pedido escrito. É você que carrega em enviar. Tratamos os
              seus dados como explica a{' '}
              <a href="/privacidade/" className="text-tinta underline">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>

        {u.telefone && (
          <div className="sem-js-alternativa mx-auto mt-7 max-w-[620px] rounded-[10px] border border-borda bg-white p-6 text-center">
            <p className="text-tinta-suave">Fale connosco — respondemos no mesmo dia.</p>
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
          </div>
        )}
      </Env>
    </section>
  );
}
