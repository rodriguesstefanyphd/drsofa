/** Invólucro de largura máxima. Uma só definição para toda a página. */
export function Env({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-env px-5 ${className}`}>{children}</div>;
}
