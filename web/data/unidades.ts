/**
 * As unidades, como dados.
 *
 * Toda a diferença entre as cidades vive neste ficheiro. Não há páginas
 * duplicadas: os componentes são os mesmos e recebem a unidade como
 * propriedade. Abrir uma cidade nova é acrescentar um objeto aqui.
 *
 * Campos a `null` são os que ainda não sabemos. Nunca se inventam — o site
 * mostra um marcador bem visível e o `npm run pendentes` lista-os todos.
 * Um telefone errado não dá erro nenhum: só perde pedidos em silêncio.
 */

/** Um valor que ainda não conhecemos. Fica `null` até alguém o confirmar. */
export type PorPreencher<T> = T | null;

/**
 * Serviço cujo preço depende do trabalho e se dá ao telefone.
 *
 * Não confundir com `null`: `null` é «ainda não sabemos» e faz aparecer um
 * marcador de campo em falta; isto é uma resposta comercial tomada, e a página
 * mostra-a ao cliente como tal.
 */
export const SOB_CONSULTA = 'sob-consulta' as const;

export type Preco = PorPreencher<number | typeof SOB_CONSULTA>;

export type Testemunho = {
  /** Tal como o cliente escreveu, sem corrigir uma vírgula. Pode vir em
   *  português do Brasil — fica como está, é palavra dele.
   *
   *  Cortar é possível, mas só assim: a parte que fica é literal e o que sai
   *  é assinalado com `[…]`. Nunca se juntam pedaços soltos para formar uma
   *  frase que o cliente não escreveu. A marca existe porque qualquer pessoa
   *  pode abrir o perfil no Google e comparar — e um excerto assumido lê-se
   *  como citação, enquanto um corte escondido lê-se como falsificação e leva
   *  atrás a credibilidade de todos os outros testemunhos. */
  texto: string;
  nome: string;
  /** Ano-mês, ou só o ano quando é essa a precisão que temos. O Google mostra
   *  datas relativas («há 2 meses», «há um ano»), e «há um ano» pode ser
   *  qualquer mês num intervalo largo: escrever ali um mês exacto seria
   *  inventar precisão. Ambos os formatos são válidos no atributo `datetime`. */
  data: string;
  /** Rótulo legível da data, na língua do site. */
  dataLegivel: string;
  estrelas: 1 | 2 | 3 | 4 | 5;
};

export type ParAntesDepois = {
  antes: string;
  depois: string;
  altAntes: string;
  altDepois: string;
  /**
   * `arrastar` só serve quando as duas fotografias têm o mesmo enquadramento.
   * Com ângulos diferentes o objeto salta ao arrastar, e aí usa-se `lado-a-lado`,
   * que não exige alinhamento nenhum.
   */
  modo: 'arrastar' | 'lado-a-lado';
  /** Descreve a interação para quem usa leitor de ecrã. */
  rotulo: string;
};

export type Unidade = {
  slug: string;
  cidade: string;
  /** Domínio final da unidade. Usado no canonical, no og:url e no JSON-LD. */
  dominio: string;

  telefone: PorPreencher<{
    /** Como aparece escrito na página. */
    legivel: string;
    /** Formato E.164, para o href tel: */
    e164: string;
    /** Só dígitos, para os links wa.me */
    whatsapp: string;
  }>;
  email: PorPreencher<string>;

  /** Chave de acesso do Web3Forms, que decide para onde vai o formulário.
   *  Uma por unidade: é o que faz os pedidos de Coimbra chegarem a Coimbra.
   *  Não é segredo — vai escrita no HTML, como em qualquer formulário destes.
   *  Sem ela o formulário não aparece de todo. */
  web3formsKey: PorPreencher<string>;

  /** Concelhos servidos. Alimenta a secção «Onde vamos» E o areaServed do
   *  JSON-LD a partir da mesma fonte, para não poderem divergir. */
  concelhos: string[];

  precos: {
    sofa: Preco;
    colchao: Preco;
    impermeabilizacao: Preco;
  };

  avaliacoes: {
    nota: PorPreencher<string>;
    total: PorPreencher<number>;
    linkPerfil: PorPreencher<string>;
    testemunhos: Testemunho[];
  };

  anosExperiencia: PorPreencher<number>;

  horario: {
    semana: { abre: string; fecha: string };
    sabado: { abre: string; fecha: string } | null;
    /** Como se escreve o horário na página. */
    legivel: string;
    legivelCurto: string;
  };

  antesDepois: ParAntesDepois[];

  legal: {
    denominacao: PorPreencher<string>;
    nif: PorPreencher<string>;
    morada: PorPreencher<string>;
    codigoPostal: PorPreencher<string>;
  };
};

const horarioPadrao: Unidade['horario'] = {
  semana: { abre: '08:00', fecha: '18:00' },
  sabado: { abre: '08:00', fecha: '12:00' },
  legivel: 'Segunda a sexta 8h-18h · Sábado 8h-12h',
  legivelCurto: '8h-18h · sáb até 12h',
};

export const LISBOA: Unidade = {
  slug: 'lisboa',
  cidade: 'Lisboa',
  dominio: 'https://lisboa.doutorsofa.pt',

  telefone: {
    legivel: '928 313 797',
    e164: '+351928313797',
    whatsapp: '351928313797',
  },
  email: 'lisboa@doutorsofa.pt',
  web3formsKey: null,

  concelhos: [
    'Lisboa', 'Amadora', 'Odivelas', 'Loures', 'Oeiras',
    'Sintra', 'Cascais', 'Almada', 'Barreiro', 'Seixal',
  ],

  precos: { sofa: 59, colchao: 59, impermeabilizacao: SOB_CONSULTA },

  avaliacoes: {
    nota: '4,9',
    total: 44,
    linkPerfil: 'https://share.google/ePyux0OH4FRJMenZJ',
    testemunhos: [
      {
        texto:
          '5 estrelas! O serviço foi simplesmente impecável. Vieram limpar o sofá cá a casa e fiquei impressionada com o resultado — ficou como novo, parecia acabado de sair da loja! Além disso, foram super simpáticos e muito profissionais. A marcação e toda a comunicação foram feitas por WhatsApp, sempre com respostas rápidas e atenciosas, o que facilitou imenso. Recomendo a 100% e certamente voltarei a chamar quando precisar. Obrigada pelo excelente trabalho!',
        nome: 'Filipa Guimarães',
        data: '2025-09',
        dataLegivel: 'setembro de 2025',
        estrelas: 5,
      },
      {
        texto:
          'Excelente limpeza, atendimento rápido, disponibilidade para o dia em que precisávamos. O colchão ficou como novo, perfumado e limpo. Iremos agendar novamente para limpar os tapetes. Indico a 100%, o Jonathan foi um excelente profissional.\n\nDesejo sucesso ✨',
        nome: 'Victória Saladino',
        data: '2026-07',
        dataLegivel: 'julho de 2026',
        estrelas: 5,
      },
      {
        texto:
          'Trabalho muito bom, conseguiu limpar um sofá que estava com bolor e bastante sujo\nFicou lindo\nMuito obrigado',
        nome: 'Henrique Silva',
        data: '2025-11',
        dataLegivel: 'novembro de 2025',
        estrelas: 5,
      },
    ],
  },

  anosExperiencia: 12,
  horario: horarioPadrao,

  antesDepois: [
    {
      antes: '/images/antes-1.jpg',
      depois: '/images/depois-1.jpg',
      altAntes:
        'Assento e braço de um cadeirão de tecido amarelo com nódoas escuras, antes da limpeza',
      altDepois:
        'O mesmo cadeirão depois da limpeza, com o tecido amarelo uniforme e sem nódoas',
      modo: 'arrastar',
      rotulo: 'Arraste para comparar o cadeirão antes e depois da limpeza',
    },
    {
      antes: '/images/antes-2.jpg',
      depois: '/images/depois-2.jpg',
      altAntes:
        'Cadeirinha de bebé cinzenta muito suja, com o forro escurecido e os cintos manchados',
      altDepois:
        'A mesma cadeirinha depois da higienização, com o forro e os cintos limpos',
      // O «antes» é de cima e o «depois» de frente: é o mesmo objeto, mas de
      // ângulos diferentes. Ao arrastar, a cadeirinha saltava.
      modo: 'lado-a-lado',
      rotulo: 'Cadeirinha de bebé, antes e depois da higienização',
    },
  ],

  legal: {
    denominacao: null,
    nif: null,
    morada: null,
    codigoPostal: null,
  },
};

export const COIMBRA: Unidade = {
  slug: 'coimbra',
  cidade: 'Coimbra',
  dominio: 'https://coimbra.doutorsofa.pt',

  // A unidade de Coimbra tem contactos próprios. Os de Lisboa não servem.
  telefone: {
    legivel: '913 165 744',
    e164: '+351913165744',
    whatsapp: '351913165744',
  },
  email: 'coimbra@doutorsofa.pt',
  web3formsKey: null,

  concelhos: [
    'Coimbra', 'Oliveira do Hospital', 'Mealhada', 'Lousã', 'Penacova',
    'Miranda do Corvo', 'Tábua', 'Arganil', 'Mortágua',
    'Vila Nova de Poiares', 'Penela', 'Pampilhosa da Serra', 'Góis',
  ],

  precos: { sofa: 59, colchao: 59, impermeabilizacao: SOB_CONSULTA },

  // As avaliações de Lisboa são de clientes de Lisboa. Coimbra tem o seu
  // próprio perfil no Google e os seus próprios testemunhos.
  avaliacoes: {
    nota: '5,0',
    total: 56,
    linkPerfil: null,
    testemunhos: [
      {
        texto:
          'Solicitei os serviços da empresa para limpeza de sofá em tecido, com bastantes manchas.\nForam muito atenciosos na marcação do serviço e esclarecimento de dúvidas.\nO serviço foi efetuado com pontualidade, muito cuidado e esforço para que ficasse perfeito.\nQuanto ao valor pago, não foi nada caro para o resultado final que obtive.\nRecomendo!',
        nome: 'Apolónia Amorim',
        data: '2025',
        dataLegivel: '2025',
        estrelas: 5,
      },
      {
        // Sai a frase que nomeia um colaborador que já não representa a
        // unidade. O resto é literal, e o corte está à vista.
        texto:
          'Serviço & atendimento de primeira!!!\n[…] Fizeram milagre no meu sofá (que tem 5 anos) que ficou impecável! Gostei tanto que no dia em que vieram cá, acabei por solicitar um serviço adicional: que levassem duas cadeiras da mesa de jantar para limpeza, que voltaram, obviamente, perfeitas!\nAltamente recomendo!',
        nome: 'Luiza Paiva',
        data: '2025',
        dataLegivel: '2025',
        estrelas: 5,
      },
      {
        // Dois cortes: a cliente nomeia o mesmo colaborador na abertura e no
        // fecho. Sai a primeira frase inteira e a recomendação final dirigida
        // a ele; o que descreve o trabalho fica intacto.
        texto:
          '[…] Trabalho bem realizado com rigor e profissionalismo.\nOrçamentos muito bons em relação a outras empresas. Ganharam uma cliente!\nO trabalho foi a higienização de 2 sofás, 6 cadeiras e um colchão de casal. […]\nParabéns pelo excelente trabalho',
        nome: 'Sonia Gonçalves',
        data: '2025',
        dataLegivel: '2025',
        estrelas: 5,
      },
    ],
  },

  anosExperiencia: 12,
  horario: horarioPadrao,

  // As fotografias de antes/depois no repositório são de trabalhos da unidade
  // de Lisboa (Instagram @doutorsofalisboa.pt). Não podem ser apresentadas
  // como trabalhos de Coimbra.
  antesDepois: [],

  legal: {
    denominacao: null,
    nif: null,
    morada: null,
    codigoPostal: null,
  },
};

export const UNIDADES = { lisboa: LISBOA, coimbra: COIMBRA } as const;
export type SlugUnidade = keyof typeof UNIDADES;

/** A unidade que esta build serve. Cada domínio é uma build própria. */
export function unidadeActual(): Unidade {
  const slug = (process.env.NEXT_PUBLIC_UNIDADE ?? 'lisboa') as SlugUnidade;
  const unidade = UNIDADES[slug];
  if (!unidade) {
    throw new Error(
      `Unidade desconhecida: "${slug}". Valores possíveis: ${Object.keys(UNIDADES).join(', ')}.`,
    );
  }
  return unidade;
}
