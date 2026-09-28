// Só tipos: este ficheiro também é lido pelo `npm run pendentes`, que corre em
// Node puro e não resolve o atalho `@/`. Os tipos desaparecem em execução; uma
// constante importada daqui partiria o script.
import type { Unidade } from '@/data/unidades';

/**
 * Campos por preencher.
 *
 * Um valor que falta nunca é escondido nem adivinhado: aparece como marcador
 * bem visível, para ninguém publicar uma página com um telefone em branco sem
 * dar por isso. O `npm run pendentes` usa a mesma lista para dizer, antes do
 * deploy, o que é que ainda falta a cada unidade.
 */
export function marcador(campo: string): string {
  return `«FALTA: ${campo}»`;
}

/** Devolve o valor, ou um marcador visível se ainda não o soubermos. */
export function ou<T>(valor: T | null, campo: string): string {
  return valor === null ? marcador(campo) : String(valor);
}

/**
 * A linha de identificação legal do rodapé, ou `null` se não houver nada a
 * mostrar.
 *
 * Aqui a ausência não leva marcador, ao contrário do resto do ficheiro: as
 * unidades decidiram não publicar denominação, NIF e morada, e uma decisão
 * tomada não é um campo esquecido. Os campos continuam no modelo, prontos,
 * para o dia em que essa decisão mudar.
 */
export function linhaLegal(u: Unidade): string | null {
  const partes = [
    u.legal.denominacao,
    u.legal.nif === null ? null : `NIF ${u.legal.nif}`,
    u.legal.morada,
  ].filter((p): p is string => p !== null);

  return partes.length === 0 ? null : partes.join(' · ');
}

export type Pendencia = { campo: string; descricao: string };

/** Tudo o que falta a uma unidade, por ordem de impacto. */
export function pendencias(u: Unidade): Pendencia[] {
  const faltas: Pendencia[] = [];
  const falta = (campo: string, descricao: string) => faltas.push({ campo, descricao });

  if (!u.telefone) falta('telefone', 'Sem telefone não há chamadas nem links de WhatsApp.');
  if (!u.email) falta('email', 'Aparece no rodapé e no JSON-LD.');
  if (!u.web3formsKey)
    falta('web3formsKey', 'Sem ela o formulário não aparece: os pedidos não têm para onde ir.');

  if (u.precos.sofa === null) falta('precos.sofa', 'Preço «desde» do cartão de sofás.');
  if (u.precos.colchao === null) falta('precos.colchao', 'Preço «desde» do cartão de colchões.');
  if (u.precos.impermeabilizacao === null)
    falta('precos.impermeabilizacao', 'Preço «desde» do cartão de impermeabilização.');

  if (u.avaliacoes.nota === null) falta('avaliacoes.nota', 'Nota média do perfil no Google.');
  if (u.avaliacoes.total === null) falta('avaliacoes.total', 'Número de avaliações no Google.');
  if (u.avaliacoes.linkPerfil === null)
    falta('avaliacoes.linkPerfil', 'Link de partilha do perfil no Google.');
  // Menos de três, e não zero: a secção tem três colunas, e uma unidade que
  // ficasse com um testemunho só deixaria de ser assinalada aqui e ficaria
  // assim para sempre — que é precisamente a perda silenciosa que esta lista
  // existe para evitar.
  if (u.avaliacoes.testemunhos.length < 3) {
    const faltam = 3 - u.avaliacoes.testemunhos.length;
    falta(
      'avaliacoes.testemunhos',
      `Faltam ${faltam} de três, reais desta unidade e copiadas tal como estão.`,
    );
  }

  if (u.anosExperiencia === null) falta('anosExperiencia', 'Aparece na faixa de confiança.');
  if (u.antesDepois.length === 0)
    falta('antesDepois', 'Fotografias de trabalhos reais desta unidade.');

  // `legal` não entra nesta lista. As unidades optaram por não publicar
  // denominação, NIF e morada, e listá-los para sempre transformaria este
  // relatório em ruído que se aprende a ignorar — que é justamente o que lhe
  // tiraria a utilidade. Se a decisão mudar, basta preencher os campos:
  // a página mostra-os sozinha.

  return faltas;
}
