import type { MetadataRoute } from 'next';
import { unidadeActual } from '@/data/unidades';

/**
 * Uma página só, e é quanto basta: o site é uma landing page.
 *
 * `/privacidade` fica de fora porque vai com `noindex`. Um mapa que aponta
 * para páginas que pedem para não ser indexadas dá sinais contraditórios ao
 * motor, e não ganha nada com isso.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = unidadeActual();
  return [
    {
      url: `${u.dominio}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
