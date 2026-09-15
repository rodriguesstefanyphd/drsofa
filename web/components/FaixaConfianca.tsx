import type { Unidade } from '@/data/unidades';
import { ou } from '@/lib/marcadores';
import { Env } from './Env';

export function FaixaConfianca({ u }: { u: Unidade }) {
  const blocos = [
    {
      forte: `★ ${ou(u.avaliacoes.nota, 'avaliacoes.nota')}`,
      fraco: `${ou(u.avaliacoes.total, 'avaliacoes.total')} avaliações no Google`,
    },
    {
      forte: `${ou(u.anosExperiencia, 'anosExperiencia')} anos`,
      fraco: 'de experiência',
    },
    { forte: 'MB Way e Multibanco', fraco: 'pagamento só no fim' },
    { forte: 'Seg a sáb', fraco: u.horario.legivelCurto },
  ];
  return (
    <div className="border-b border-borda bg-white py-6">
      <Env className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
        {blocos.map((b) => (
          <div key={b.forte}>
            <b className="block font-extrabold">{b.forte}</b>
            <small className="mt-1 block text-[0.85rem] text-tinta-suave">{b.fraco}</small>
          </div>
        ))}
      </Env>
    </div>
  );
}
