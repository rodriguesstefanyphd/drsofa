'use client';

import { useState } from 'react';
import type { ParAntesDepois } from '@/data/unidades';

/**
 * A barra é um input[type=range] invisível por cima das imagens: funciona com
 * rato, com dedo E com as setas do teclado, e é anunciada correctamente por um
 * leitor de ecrã. Um div com eventos de rato não teria nada disso.
 */
export function Comparador({ par }: { par: ParAntesDepois }) {
  const [corte, setCorte] = useState(50);

  return (
    <figure
      className="comparador m-0"
      style={{ ['--corte' as string]: `${corte}%` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={par.antes} alt={par.altAntes} loading="lazy" width={1200} height={800} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="depois"
        src={par.depois}
        alt={par.altDepois}
        loading="lazy"
        width={1200}
        height={800}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={corte}
        aria-label={par.rotulo}
        onChange={(e) => setCorte(Number(e.target.value))}
      />
      <span className="puxador" aria-hidden />
      <span className="etiqueta left-2.5">Antes</span>
      <span className="etiqueta right-2.5">Depois</span>
    </figure>
  );
}
