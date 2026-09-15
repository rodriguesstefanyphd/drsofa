import type { Unidade } from '@/data/unidades';
import { ou } from '@/lib/marcadores';
import { Env } from './Env';

export function Rodape({ u }: { u: Unidade }) {
  return (
    <footer className="bg-preto py-12 text-center text-white">
      <Env>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-branco.png"
          alt="Doutor Sofá — limpeza especializada"
          width={522}
          height={240}
          loading="lazy"
          className="mx-auto h-12 w-auto"
        />
        <h3 className="mt-5 font-bold">Unidade de {u.cidade}</h3>
        <p className="mt-2 text-[0.95rem] text-white/85">
          {u.telefone ? (
            <a href={`tel:${u.telefone.e164}`} data-local="rodape" className="hover:underline">
              {u.telefone.e164.replace('+351', '+351 ')}
            </a>
          ) : (
            ou(null, 'telefone')
          )}
          <br />
          {u.email ? (
            <a href={`mailto:${u.email}`} className="hover:underline">
              {u.email}
            </a>
          ) : (
            ou(null, 'email')
          )}
          <br />
          {u.horario.legivel}
        </p>
        <p className="mt-4 text-[0.95rem]">
          <a href="/privacidade/" className="underline">
            Política de privacidade
          </a>
          {' · '}
          <a
            href="https://www.livroreclamacoes.pt/"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Livro de reclamações
          </a>
        </p>
        <div className="mt-6 text-[0.8rem] leading-relaxed text-white/60">
          {ou(u.legal.denominacao, 'legal.denominacao')} · NIF {ou(u.legal.nif, 'legal.nif')} ·{' '}
          {ou(u.legal.morada, 'legal.morada')}
          <br />
          Chamada para a rede móvel nacional. © {new Date().getFullYear()} Doutor Sofá {u.cidade}.
        </div>
      </Env>
    </footer>
  );
}
