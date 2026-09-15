/**
 * Títulos de secção.
 *
 * A marca escreve parte dos títulos a amarelo sobre branco. Amarelo sobre
 * branco dá 1,46:1 de contraste — muito abaixo do mínimo de 4,5:1 — e é
 * ilegível para muita gente. Nas faixas claras isso passa a um filete amarelo
 * debaixo do título; nas faixas escuras, onde o amarelo tem 7,8:1, a palavra
 * a amarelo mantém-se.
 */
export function Titulo({
  children,
  escuro = false,
  realce,
}: {
  children: React.ReactNode;
  escuro?: boolean;
  realce?: string;
}) {
  return (
    <div className="text-center">
      <h2
        className={`text-[1.7rem] font-extrabold leading-tight md:text-[2.05rem] ${
          escuro ? 'text-white' : 'text-tinta'
        }`}
      >
        {children}
        {realce ? <span className="text-amarelo"> {realce}</span> : null}
      </h2>
      {!escuro && <span aria-hidden className="mx-auto mt-3 block h-1 w-14 bg-amarelo" />}
    </div>
  );
}
