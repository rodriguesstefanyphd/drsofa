import type { Metadata, Viewport } from 'next';
import './globals.css';
import { unidadeActual } from '@/data/unidades';

const u = unidadeActual();

/** ID do contentor do Google Tag Manager. Definido no painel da Cloudflare
 *  Pages como variável de ambiente — não precisa de tocar no código. */
const GTM = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-XXXXXXX';

const titulo = `Limpeza de Sofás ao Domicílio em ${u.cidade} | Doutor Sofá`;
const descricao =
  `Limpeza e higienização de sofás, colchões e estofos ao domicílio em ${u.cidade}. ` +
  'Orçamento gratuito por WhatsApp, produtos biodegradáveis e secagem rápida.';

export const metadata: Metadata = {
  metadataBase: new URL(u.dominio),
  title: titulo,
  description: descricao,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    title: titulo,
    description: `Limpeza e higienização de sofás, colchões e estofos ao domicílio em ${u.cidade}. Orçamento gratuito por WhatsApp.`,
    url: u.dominio,
    images: [`${u.dominio}/images/capa.jpg`],
  },
  icons: {
    icon: [{ url: '/images/favicon.png', sizes: '96x96' }],
    apple: '/images/apple-touch-icon.png',
  },
};

export const viewport: Viewport = { themeColor: '#1A1A1A' };

/*
  Consent Mode v2 e o GTM vão no MESMO script, e por esta ordem de propósito.
  O consentimento tem de estar declarado antes de qualquer tag de marketing
  carregar; separá-los em dois scripts deixaria a ordem ao critério do
  bundler. Por predefinição está tudo em `denied`: só passa a `granted`
  depois de a pessoa carregar em «Aceitar».

  O acesso ao localStorage vai em try/catch — em modo privado rebenta, e o
  site tem de continuar a funcionar na mesma.
*/
const arranque = `
document.documentElement.className='js';
if(/(\\.github\\.io|\\.pages\\.dev|\\.netlify\\.app)$/.test(location.hostname)){
  var m=document.createElement('meta');m.name='robots';m.content='noindex, nofollow';
  document.head.appendChild(m);
}
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
window.gtag=gtag;
gtag('consent','default',{
  ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
  analytics_storage:'denied',functionality_storage:'granted',
  security_storage:'granted',wait_for_update:500
});
try{
  if(localStorage.getItem('ds_consentimento')==='aceite'){
    gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',
      ad_personalization:'granted',analytics_storage:'granted'});
  }
}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM}');
`.trim();

const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `Doutor Sofá ${u.cidade}`,
  description: `Limpeza e higienização de sofás, colchões e estofos ao domicílio em ${u.cidade}.`,
  url: `${u.dominio}/`,
  ...(u.telefone ? { telephone: u.telefone.e164 } : {}),
  ...(u.email ? { email: u.email } : {}),
  image: `${u.dominio}/images/capa.jpg`,
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    addressLocality: u.cidade,
    addressCountry: 'PT',
    ...(u.legal.morada ? { streetAddress: u.legal.morada } : {}),
    ...(u.legal.codigoPostal ? { postalCode: u.legal.codigoPostal } : {}),
  },
  // A mesma lista que a secção «Onde vamos» mostra, para não poderem divergir.
  areaServed: u.concelhos,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: u.horario.semana.abre,
      closes: u.horario.semana.fecha,
    },
    ...(u.horario.sabado
      ? [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: u.horario.sabado.abre,
            closes: u.horario.sabado.fecha,
          },
        ]
      : []),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className="sem-js">
      <head>
        <script dangerouslySetInnerHTML={{ __html: arranque }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
