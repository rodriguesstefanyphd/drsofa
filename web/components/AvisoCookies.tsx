'use client';

import { useEffect, useState } from 'react';
import {
  actualizarConsentimento,
  consentimentoEscolhido,
  guardarConsentimento,
  lerConsentimento,
} from '@/lib/eventos';

/**
 * O aviso não salta à frente do vídeo de entrada: espera que ele saia do ecrã
 * inteiro. Dois avisos ao mesmo tempo por cima da página seria de mais.
 */
export function AvisoCookies({ esperarPor }: { esperarPor: boolean }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (esperarPor) return;
    if (lerConsentimento() === null) setVisivel(true);
  }, [esperarPor]);

  useEffect(() => {
    document.body.classList.toggle('aviso-aberto', visivel);
  }, [visivel]);

  if (!visivel) return null;

  function escolher(aceite: boolean) {
    guardarConsentimento(aceite ? 'aceite' : 'recusado');
    actualizarConsentimento(aceite);
    consentimentoEscolhido(aceite);
    setVisivel(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-[90] border-t-[3px] border-amarelo bg-white p-5 shadow-[0_-8px_26px_rgba(0,0,0,.16)] md:inset-x-auto md:bottom-6 md:right-6 md:max-w-[400px] md:rounded-[10px] md:border md:border-borda md:border-t-[3px] md:border-t-amarelo"
    >
      <p className="text-[0.88rem] text-tinta-suave">
        Usamos cookies para perceber como o site é utilizado e para medir a eficácia da nossa
        publicidade. Pode recusar sem perder qualquer funcionalidade.{' '}
        <a href="/privacidade/" className="text-tinta underline">
          Saber mais
        </a>
        .
      </p>
      <div className="mt-3.5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => escolher(false)}
          className="min-w-[130px] flex-1 rounded-md border-[1.5px] border-[#C6D1D0] bg-white px-3 py-3.5 font-bold"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => escolher(true)}
          className="min-w-[130px] flex-1 rounded-md bg-amarelo px-3 py-3.5 font-bold text-carvao"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
