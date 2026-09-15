import { AntesDepois } from '@/components/AntesDepois';
import { Avaliacoes } from '@/components/Avaliacoes';
import { BarraFixa } from '@/components/BarraFixa';
import { BotaoWhatsApp } from '@/components/BotaoWhatsApp';
import { Cabecalho } from '@/components/Cabecalho';
import { ChamadaFinal } from '@/components/ChamadaFinal';
import { Cobertura } from '@/components/Cobertura';
import { ComoFunciona } from '@/components/ComoFunciona';
import { EntradaECookies } from '@/components/EntradaECookies';
import { FaixaConfianca } from '@/components/FaixaConfianca';
import { Faq } from '@/components/Faq';
import { Formulario } from '@/components/Formulario';
import { Heroi } from '@/components/Heroi';
import { Interacoes } from '@/components/Interacoes';
import { Rodape } from '@/components/Rodape';
import { Servicos } from '@/components/Servicos';
import { unidadeActual } from '@/data/unidades';

/* A ordem das secções vem do briefing e está validada por resultados reais de
   tráfego pago. Não a reinventar sem dados. */
export default function Pagina() {
  const u = unidadeActual();
  return (
    <>
      <EntradaECookies u={u} />
      <Cabecalho u={u} />
      <main className="pb-[76px] md:pb-0">
        <Heroi u={u} />
        <FaixaConfianca u={u} />
        <Servicos u={u} />
        <AntesDepois u={u} />
        <ComoFunciona />
        <Avaliacoes u={u} />
        <Cobertura u={u} />
        <Formulario u={u} />
        <Faq />
        <ChamadaFinal u={u} />
      </main>
      <Rodape u={u} />
      <BarraFixa u={u} />
      <BotaoWhatsApp u={u} />
      <Interacoes cidade={u.slug} />
    </>
  );
}
