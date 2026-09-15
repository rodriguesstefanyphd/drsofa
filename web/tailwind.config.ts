import type { Config } from 'tailwindcss';

/* A paleta é a da marca. O verde está reservado ao WhatsApp de propósito: é
   a cor que as pessoas associam à app, e ajuda o botão a ser reconhecido.

   O tom foi escurecido face ao verde da app para o texto branco cumprir AA.
   O valor anterior (#128C42) dava 4,32:1 — abaixo do mínimo de 4,5:1 — e só
   passava por o texto ser grande o suficiente para a excepção do WCAG. Isso
   é frágil: bastava um botão com letra mais pequena para falhar. #0F7B39 dá
   5,37:1 e cumpre a qualquer tamanho. Medido, não estimado. */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amarelo: { DEFAULT: '#FFD100', escuro: '#E6BC00' },
        carvao: '#1A1A1A',
        grafite: '#3A3A3A',
        preto: '#101010',
        tinta: { DEFAULT: '#1C1C1C', suave: '#5C5C5C' },
        banda: '#F5F5F3',
        borda: '#E3E3DF',
        acao: { DEFAULT: '#0F7B39', escuro: '#0D6E33' },
      },
      fontFamily: {
        sans: [
          'system-ui', '-apple-system', 'Segoe UI', 'Roboto',
          'Helvetica Neue', 'Arial', 'sans-serif',
        ],
      },
      maxWidth: { env: '1120px' },
    },
  },
  plugins: [],
};
export default config;
