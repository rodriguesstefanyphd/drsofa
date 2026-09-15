import { Env } from './Env';
import { Titulo } from './Titulo';

const PASSOS = [
  {
    titulo: 'Envia uma foto',
    texto:
      'Manda-nos pelo WhatsApp uma foto do sofá ou colchão e as medidas aproximadas. É o suficiente para darmos preço.',
  },
  {
    titulo: 'Recebe o orçamento',
    texto: 'Respondemos no mesmo dia com um valor fechado. Sem visita prévia e sem compromisso.',
  },
  {
    titulo: 'Marcamos o dia',
    texto: 'Combinamos a data e a hora que lhe der jeito. O técnico leva tudo o que precisa.',
  },
  {
    titulo: 'Paga no fim',
    texto:
      'Só paga depois de ver o resultado. Aceitamos MB Way, Multibanco, transferência e numerário.',
  },
];

export function ComoFunciona() {
  return (
    <section className="bg-banda py-14 md:py-[78px]">
      <Env className="revelar">
        <Titulo>Como funciona</Titulo>
        {/* A numeração aqui é informação: os passos são mesmo uma sequência. */}
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {PASSOS.map((p, i) => (
            <li key={p.titulo}>
              <span
                aria-hidden
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amarelo font-extrabold text-carvao"
              >
                {i + 1}
              </span>
              <h3 className="font-bold">{p.titulo}</h3>
              <p className="mt-1.5 text-[0.95rem] text-tinta-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
      </Env>
    </section>
  );
}
