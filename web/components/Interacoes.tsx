'use client';

import { useEffect } from 'react';
import { contactoTelefone, contactoWhatsApp, type LocalBotao } from '@/lib/eventos';

/**
 * Comportamentos de página que não pertencem a nenhuma secção.
 *
 * Os cliques de conversão são apanhados por delegação, num só ouvinte no
 * documento: assim cada link continua a ser um `<a>` normal, renderizado no
 * servidor, e basta-lhe o atributo `data-local` para ser contado. Acrescentar
 * um botão novo não obriga a mexer aqui.
 *
 * Tudo degrada para nada: sem JavaScript o conteúdo aparece na mesma, e com
 * «reduzir movimento» não há animação alguma.
 */
export function Interacoes({ cidade }: { cidade: string }) {
  useEffect(() => {
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Revelação ao rolar. Sem IntersectionObserver, mostra tudo de imediato. */
    const alvos = Array.from(document.querySelectorAll('.revelar'));
    let observador: IntersectionObserver | null = null;

    if (semMovimento || !('IntersectionObserver' in window)) {
      alvos.forEach((a) => a.classList.add('visivel'));
    } else {
      observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visivel');
              observador?.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      );
      alvos.forEach((a) => observador?.observe(a));
    }

    /* Eventos de conversão, por delegação. */
    function aoClicar(e: MouseEvent) {
      const alvo = e.target as HTMLElement | null;
      const link = alvo?.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const local = (link.dataset.local ?? 'nao_definido') as LocalBotao;

      if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
        contactoWhatsApp(cidade, local);
      }
      if (href.startsWith('tel:')) {
        contactoTelefone(cidade, local);
      }
    }

    document.addEventListener('click', aoClicar);
    return () => {
      document.removeEventListener('click', aoClicar);
      observador?.disconnect();
    };
  }, [cidade]);

  return null;
}
