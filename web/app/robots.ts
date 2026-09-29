import type { MetadataRoute } from 'next';
import { unidadeActual } from '@/data/unidades';

/**
 * Sem este ficheiro o site não tinha robots.txt nenhum.
 *
 * A ausência não bloqueia nada — os motores assumem que podem entrar —, mas
 * também não lhes diz onde está o mapa do site. É a linha `Sitemap` que faz o
 * trabalho aqui; o resto é a porta aberta que já estava aberta.
 *
 * A página de privacidade não é excluída de propósito: já vai com `noindex`
 * nas suas próprias metas, e proibi-la aqui impediria o motor de a visitar
 * para ler essa meta — ficaria fora do índice à mesma, mas sem que ninguém
 * soubesse porquê.
 */
export default function robots(): MetadataRoute.Robots {
  const u = unidadeActual();
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${u.dominio}/sitemap.xml`,
    host: u.dominio,
  };
}
