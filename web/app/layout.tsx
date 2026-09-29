import { MEDICAO } from '@/data/configuracao';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PERGUNTAS } from '@/data/perguntas';
import { unidadeActual } from '@/data/unidades';

const u = unidadeActual();

/** ID do contentor do Google Tag Manager. Definido no painel da Cloudflare
 *  Pages como variável de ambiente — não precisa de tocar no código. */
// Sem contentor não se carrega o Tag Manager de todo. A reserva anterior era
// 'GTM-XXXXXXX', e o resultado foi um script a pedir um contentor
// inexistente em todas as visitas: nenhuma medição, e nenhum sinal disso.
const GTM = MEDICAO.gtm;

const titulo = `Limpeza de Sofás ao Domicílio em ${u.cidade} | Doutor Sofá`;
/**
 * A descrição não posiciona a página — o Google escolhe o que lhe apetece
 * mostrar —, mas é ela que decide se a pessoa carrega neste resultado ou no
 * de baixo. Por isso leva o preço de entrada e a taxa de deslocação, que são
 * as duas coisas que quem compara serviços procura primeiro.
 *
 * O preço vem dos dados. Escrito à mão aqui, seria a quarta cópia do mesmo
 * número no projeto — e a primeira a ficar desactualizada.
 */
const desde =
  typeof u.precos.sofa === 'number' ? `, desde ${u.precos.sofa} €` : '';
const descricao =
  `Limpeza de sofás, colchões e tapetes ao domicílio em ${u.cidade} e ` +
  `arredores${desde}. Sem taxa de deslocação, orçamento grátis por WhatsApp ` +
  'e secagem em 24 h.';

export const metadata: Metadata = {
  metadataBase: new URL(u.dominio),
  title: titulo,
  description: descricao,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    title: titulo,
    description: `Limpeza e higienização de sofás, colchões e tapetes ao domicílio em ${u.cidade}. Orçamento gratuito por WhatsApp.`,
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
${
  GTM === null
    ? '/* Sem contentor definido: o Tag Manager não é carregado. */'
    : `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM}');`
}
`.trim();

const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `Doutor Sofá ${u.cidade}`,
  description: `Limpeza e higienização de sofás, colchões e tapetes ao domicílio em ${u.cidade}.`,
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
  // O perfil do Google é a outra morada desta unidade na Internet. Ligá-la
  // aqui ajuda o motor a perceber que as duas são a mesma casa.
  ...(u.avaliacoes.linkPerfil ? { sameAs: [u.avaliacoes.linkPerfil] } : {}),
  // Os três serviços, com o preço quando há preço. Onde é sob consulta não se
  // declara valor nenhum: um preço inventado no JSON-LD é uma promessa que
  // aparece no resultado de pesquisa e que depois não se cumpre ao telefone.
  makesOffer: [
    { nome: 'Limpeza de sofás e cadeirões', preco: u.precos.sofa },
    { nome: 'Limpeza e higienização de colchões', preco: u.precos.colchao },
    { nome: 'Impermeabilização de sofás e cadeiras', preco: u.precos.impermeabilizacao },
  ].map((s) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: s.nome,
      areaServed: u.concelhos,
      provider: { '@type': 'LocalBusiness', name: `Doutor Sofá ${u.cidade}` },
    },
    ...(typeof s.preco === 'number'
      ? { price: String(s.preco), priceCurrency: 'EUR', priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: String(s.preco),
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: true,
        } }
      : {}),
  })),
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

/**
 * As mesmas perguntas que a página mostra, declaradas para o Google.
 *
 * É o que faz aparecer as perguntas expansíveis por baixo do resultado de
 * pesquisa. A regra é simples e não se contorna: só pode declarar-se o que
 * está visível na página — e por isso vêm do mesmo ficheiro que a secção lê.
 */
const perguntasFrequentes = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PERGUNTAS.map((q) => ({
    '@type': 'Question',
    name: q.p,
    acceptedAnswer: { '@type': 'Answer', text: q.r },
  })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(perguntasFrequentes) }}
        />
      </head>
      <body>
        {GTM !== null && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
