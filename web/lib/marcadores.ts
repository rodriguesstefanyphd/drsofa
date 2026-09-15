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

export type Pendencia = { campo: string; descricao: string };

/** Tudo o que falta a uma unidade, por ordem de impacto. */
export function pendencias(u: Unidade): Pendencia[] {
  const faltas: Pendencia[] = [];
  const falta = (campo: string, descricao: string) => faltas.push({ campo, descricao });

  if (!u.telefone) falta('telefone', 'Sem telefone não há chamadas nem links de WhatsApp.');
  if (!u.email) falta('email', 'Aparece no rodapé e no JSON-LD.');

  if (u.precos.sofa === null) falta('precos.sofa', 'Preço «desde» do cartão de sofás.');
  if (u.precos.colchao === null) falta('precos.colchao', 'Preço «desde» do cartão de colchões.');
  if (u.precos.impermeabilizacao === null)
    falta('precos.impermeabilizacao', 'Preço «desde» do cartão de impermeabilização.');

  if (u.avaliacoes.nota === null) falta('avaliacoes.nota', 'Nota média do perfil no Google.');
  if (u.avaliacoes.total === null) falta('avaliacoes.total', 'Número de avaliações no Google.');
  if (u.avaliacoes.linkPerfil === null)
    falta('avaliacoes.linkPerfil', 'Link de partilha do perfil no Google.');
  if (u.avaliacoes.testemunhos.length === 0)
    falta('avaliacoes.testemunhos', 'Três avaliações reais desta unidade, copiadas tal como estão.');

  if (u.anosExperiencia === null) falta('anosExperiencia', 'Aparece na faixa de confiança.');
  if (u.antesDepois.length === 0)
    falta('antesDepois', 'Fotografias de trabalhos reais desta unidade.');

  if (u.legal.denominacao === null) falta('legal.denominacao', 'Denominação social, no rodapé.');
  if (u.legal.nif === null) falta('legal.nif', 'NIF, no rodapé e na política de privacidade.');
  if (u.legal.morada === null) falta('legal.morada', 'Morada, no rodapé e no JSON-LD.');
  if (u.legal.codigoPostal === null) falta('legal.codigoPostal', 'Código postal, no JSON-LD.');

  return faltas;
}
