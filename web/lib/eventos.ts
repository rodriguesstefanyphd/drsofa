/**
 * Eventos de conversão e consentimento.
 *
 * Tudo passa pelo `dataLayer`, para as conversões serem criadas no GTM sem
 * mexer no código. O `local_botao` diz qual dos botões converteu — é o que
 * permite ver no GA4 se o dinheiro vem do herói, da barra fixa ou do botão
 * flutuante.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type LocalBotao =
  | 'topo'
  | 'topo_cta'
  | 'heroi'
  | 'form'
  | 'final'
  | 'rodape'
  | 'barra_fixa'
  | 'flutuante';

export const CHAVE_CONSENTIMENTO = 'ds_consentimento';

function empurra(evento: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(evento);
}

export function contactoWhatsApp(cidade: string, local: LocalBotao) {
  empurra({ event: 'contacto_whatsapp', cidade, local_botao: local });
}

export function contactoTelefone(cidade: string, local: LocalBotao) {
  empurra({ event: 'contacto_telefone', cidade, local_botao: local });
}

export function pedidoOrcamento(cidade: string, servico: string) {
  empurra({ event: 'pedido_orcamento', cidade, servico });
}

export function consentimentoEscolhido(aceite: boolean) {
  empurra({ event: aceite ? 'consentimento_aceite' : 'consentimento_recusado' });
}

/* O localStorage rebenta em modo privado e com cookies bloqueados. Em vez de
   partir a página, tratamos isso como «ainda não escolheu». */
export function lerConsentimento(): 'aceite' | 'recusado' | null {
  try {
    const v = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return v === 'aceite' || v === 'recusado' ? v : null;
  } catch {
    return null;
  }
}

export function guardarConsentimento(valor: 'aceite' | 'recusado') {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, valor);
  } catch {
    /* sem armazenamento, a escolha vale só para esta visita */
  }
}

/** Liberta as tags de marketing. Só depois de a pessoa carregar em «Aceitar». */
export function actualizarConsentimento(aceite: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return;
  const estado = aceite ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: estado,
    ad_user_data: estado,
    ad_personalization: estado,
    analytics_storage: estado,
  });
}

/** Mensagem pré-preenchida dos links wa.me. */
export function linkWhatsApp(numero: string, cidade: string): string {
  const texto = `Olá, gostaria de um orçamento para ${cidade}.`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
