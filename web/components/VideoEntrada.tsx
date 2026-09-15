'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Unidade } from '@/data/unidades';

type Fase = 'escondido' | 'cheio' | 'canto' | 'fora';

const CHAVE = 'ds_intro';

/**
 * Vídeo de entrada.
 *
 * Abre em ecrã inteiro e passa a mini-leitor no canto quando o vídeo acaba,
 * quando se carrega em «Ver o site» ou em Esc. Ecrã inteiro e canto são o
 * MESMO elemento a mudar de classe, para o vídeo não recarregar nem voltar ao
 * início quando encolhe.
 *
 * Arranca sempre SEM som, e não é escolha de gosto: nenhum browser actual
 * deixa um vídeo arrancar sozinho com som — Chrome, Safari e Firefox
 * bloqueiam-no, e pedir `autoplay` com som não dá som, dá um vídeo que não
 * começa. Arrancar mudo com botão é o que faz o som chegar a ouvir-se, e é
 * também o que o WCAG 1.4.2 pede: som que arranca sozinho tem de ter como se
 * desligar.
 *
 * Não aparece: sem JavaScript, com «reduzir movimento», ou se já tiver sido
 * visto nesta sessão do browser.
 */
export function VideoEntrada({ u, aoSair }: { u: Unidade; aoSair: () => void }) {
  const [fase, setFase] = useState<Fase>('escondido');
  const [mudo, setMudo] = useState(true);
  const [podeFechar, setPodeFechar] = useState(false);

  const caixaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const somRef = useRef<HTMLButtonElement>(null);
  const sairRef = useRef<HTMLButtonElement>(null);
  const comecouRef = useRef(false);

  const paraOCanto = useCallback(() => {
    setFase((anterior) => {
      if (anterior !== 'cheio') return anterior;
      const v = videoRef.current;
      if (v) v.loop = true;
      document.body.style.overflow = '';
      document.body.classList.remove('intro-aberta');
      // Enquanto o vídeo desliza para o canto o botão não aceita o clique
      // seguinte: senão um duplo-clique encolhia e fechava de uma vez, e a
      // pessoa ficava sem vídeo nenhum.
      setTimeout(() => setPodeFechar(true), 550);
      document.getElementById('tituloHeroi')?.focus();
      aoSair();
      return 'canto';
    });
  }, [aoSair]);

  const fecharDeVez = useCallback(() => {
    videoRef.current?.pause();
    setFase('fora');
    document.getElementById('tituloHeroi')?.focus();
  }, []);

  /* Decide, uma vez, se o vídeo chega a abrir. */
  useEffect(() => {
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let jaViu = false;
    try {
      jaViu = sessionStorage.getItem(CHAVE) === 'visto';
    } catch {
      /* sem sessionStorage, mostra-se na mesma */
    }

    if (semMovimento || jaViu) {
      aoSair();
      return;
    }

    try {
      sessionStorage.setItem(CHAVE, 'visto');
    } catch {
      /* não faz mal: só se repete noutra visita */
    }

    setFase('cheio');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('intro-aberta');
  }, [aoSair]);

  /* Arranque do vídeo, e as saídas de emergência se ele não tocar. */
  useEffect(() => {
    if (fase !== 'cheio') return;
    const v = videoRef.current;
    if (!v) return;

    sairRef.current?.focus();

    const marcaInicio = () => {
      comecouRef.current = true;
    };
    v.addEventListener('playing', marcaInicio);
    v.addEventListener('error', paraOCanto);

    const promessa = v.play();
    if (promessa?.catch) promessa.catch(() => paraOCanto());

    // A pergunta é «chegou a arrancar?», não «está parado agora?»: um vídeo a
    // meio pode ficar um instante em pausa a encher o buffer, e isso não é
    // motivo para lhe fugir com o ecrã.
    const guarda = setTimeout(() => {
      if (!comecouRef.current) paraOCanto();
    }, 4000);

    return () => {
      v.removeEventListener('playing', marcaInicio);
      v.removeEventListener('error', paraOCanto);
      clearTimeout(guarda);
    };
  }, [fase, paraOCanto]);

  /* Em ecrã inteiro é um diálogo modal a sério: Esc fecha e o foco fica preso
     entre os dois botões. */
  useEffect(() => {
    if (fase !== 'cheio') return;

    function aoTeclar(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        paraOCanto();
        return;
      }
      if (e.key !== 'Tab') return;
      const focaveis = [somRef.current, sairRef.current].filter(Boolean) as HTMLElement[];
      if (focaveis.length === 0) return;
      const i = focaveis.indexOf(document.activeElement as HTMLElement);
      let proximo = e.shiftKey ? i - 1 : i + 1;
      if (proximo < 0) proximo = focaveis.length - 1;
      if (proximo >= focaveis.length) proximo = 0;
      e.preventDefault();
      focaveis[proximo].focus();
    }

    document.addEventListener('keydown', aoTeclar, true);
    return () => document.removeEventListener('keydown', aoTeclar, true);
  }, [fase, paraOCanto]);

  if (fase === 'escondido' || fase === 'fora') return null;

  const noCanto = fase === 'canto';

  function alternarSom() {
    const v = videoRef.current;
    if (!v) return;
    const novo = !v.muted;
    v.muted = novo;
    if (!novo) {
      v.volume = 0.8;
      v.play()?.catch(() => {});
    }
    setMudo(novo);
  }

  return (
    <div
      ref={caixaRef}
      className={`intro${noCanto ? ' cantinho' : ''}`}
      // No canto deixa de ser modal: passa a um leitor com nome próprio. Um
      // aria-label num div sem papel seria inválido, e o axe-core apanha-o.
      {...(noCanto
        ? { role: 'group', 'aria-label': `Vídeo de apresentação da Doutor Sofá ${u.cidade}` }
        : { role: 'dialog', 'aria-modal': true, 'aria-labelledby': 'introTitulo' })}
    >
      <video
        ref={videoRef}
        poster="/images/heroi-poster.jpg"
        width={1280}
        height={720}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={paraOCanto}
      >
        <source src="/images/heroi.webm" type="video/webm" />
        <source src="/images/heroi.mp4" type="video/mp4" />
      </video>

      {!noCanto && (
        <h2 className="oculto" id="introTitulo">
          Vídeo de apresentação da Doutor Sofá {u.cidade}
        </h2>
      )}

      <div
        className={`relative z-[1] flex flex-wrap justify-center gap-3 ${
          noCanto ? 'gap-1.5 p-2' : 'px-4 pb-10'
        }`}
      >
        <button
          ref={somRef}
          type="button"
          aria-pressed={!mudo}
          onClick={alternarSom}
          className={`inline-flex items-center gap-2 rounded-full border-[1.5px] border-tinta/35 bg-amarelo font-bold text-tinta hover:bg-amarelo-escuro ${
            noCanto ? 'min-h-[32px] px-2.5 text-[0.78rem]' : 'min-h-[56px] px-5.5 px-6'
          }`}
        >
          <span aria-hidden>{mudo ? '🔇' : '🔊'}</span>
          <span className={noCanto ? 'oculto' : ''}>{mudo ? 'Ligar som' : 'Desligar som'}</span>
        </button>

        <button
          ref={sairRef}
          type="button"
          onClick={() => {
            if (!noCanto) paraOCanto();
            else if (podeFechar) fecharDeVez();
          }}
          className={`inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#C6D1D0] bg-white font-bold text-tinta hover:bg-[#F1F1F1] ${
            noCanto ? 'min-h-[32px] px-2.5 text-[0.78rem]' : 'min-h-[56px] px-6'
          }`}
        >
          <span aria-hidden>✕</span>
          <span className={noCanto ? 'oculto' : ''}>{noCanto ? 'Fechar vídeo' : 'Ver o site'}</span>
        </button>
      </div>
    </div>
  );
}
