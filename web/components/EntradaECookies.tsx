'use client';

import { useCallback, useState } from 'react';
import type { Unidade } from '@/data/unidades';
import { AvisoCookies } from './AvisoCookies';
import { VideoEntrada } from './VideoEntrada';

/**
 * O vídeo de entrada e o aviso de cookies partilham o ecrã, por isso
 * partilham estado: o aviso só aparece quando o vídeo sai do ecrã inteiro.
 * Se o vídeo não chegar a abrir, o `aoSair` é chamado logo e o aviso sai já.
 */
export function EntradaECookies({ u }: { u: Unidade }) {
  const [introAberta, setIntroAberta] = useState(true);
  const libertar = useCallback(() => setIntroAberta(false), []);

  return (
    <>
      <VideoEntrada u={u} aoSair={libertar} />
      <AvisoCookies esperarPor={introAberta} />
    </>
  );
}
