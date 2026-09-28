import type { Metadata } from 'next';
import { Env } from '@/components/Env';
import { unidadeActual } from '@/data/unidades';
import { FORMULARIO_GOOGLE, SITE } from '@/data/configuracao';
import { CHAVE_CONSENTIMENTO } from '@/lib/eventos';
import { linhaLegal, ou } from '@/lib/marcadores';

const u = unidadeActual();
const dominio = u.dominio.replace(/^https?:\/\//, '');

export const metadata: Metadata = {
  title: `Política de Privacidade e de Cookies | Doutor Sofá ${u.cidade}`,
  description: `Que dados pessoais recolhemos no site da Doutor Sofá ${u.cidade}, para que os usamos e que direitos lhe assistem.`,
  robots: { index: false, follow: true },
};

const ALOJAMENTO = SITE.alojamento;
const ACTUALIZADA_EM = SITE.dataPolitica;

function Acapite({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="text-[1.25rem] font-bold">
        <span className="text-tinta-suave">{n}.</span> {titulo}
      </h2>
      <div className="mt-3 space-y-3 text-tinta-suave">{children}</div>
    </section>
  );
}

export default function Privacidade() {
  const email = u.email ?? ou(null, 'email');
  const telefone = u.telefone ? u.telefone.e164.replace('+351', '+351 ') : ou(null, 'telefone');
  const legal = linhaLegal(u);

  return (
    <>
      <header className="bg-carvao py-4 text-white">
        <Env className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3" aria-label="Doutor Sofá — página inicial">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-branco.png"
              alt="Doutor Sofá — limpeza especializada"
              width={522}
              height={240}
              className="h-10 w-auto"
            />
            <span className="border-l border-white/30 pl-3 text-xs leading-tight text-white/85">
              Unidade
              <br />
              de {u.cidade}
            </span>
          </a>
          <a href="/" className="text-[0.9rem] font-bold underline">
            Voltar ao site
          </a>
        </Env>
      </header>

      <main className="py-12">
        <div className="mx-auto w-full max-w-[760px] px-5">
          <h1 className="text-[1.9rem] font-extrabold leading-tight">
            Política de Privacidade e de Cookies
          </h1>
          <p className="mt-2 text-[0.9rem] text-tinta-suave">
            Última atualização: {ou(ACTUALIZADA_EM, 'SITE.dataPolitica')}
          </p>

          <p className="mt-6 text-tinta-suave">
            Esta política explica que dados pessoais recolhemos através deste site, para que os
            usamos, durante quanto tempo os guardamos e que direitos lhe assistem. Aplica-se ao site{' '}
            {dominio} e aos pedidos de orçamento que nos envia por formulário, telefone ou WhatsApp.
          </p>

          <Acapite n={1} titulo="Quem é responsável pelos seus dados">
            {/* Cada linha só aparece se existir. Sem denominação, NIF e morada,
                a unidade identifica-se pela marca, pela cidade e pelos
                contactos — que é por onde o cliente lhe fala de facto. */}
            <p>
              {u.legal.denominacao ?? `Doutor Sofá ${u.cidade}`}
              <br />
              {u.legal.nif !== null && (
                <>
                  NIF {u.legal.nif}
                  <br />
                </>
              )}
              {u.legal.morada !== null && (
                <>
                  {u.legal.morada}
                  {u.legal.codigoPostal !== null && `, ${u.legal.codigoPostal}`} {u.cidade}
                  <br />
                </>
              )}
              E-mail: {email}
              <br />
              Telefone: {telefone}
            </p>
          </Acapite>

          <Acapite n={2} titulo="Que dados recolhemos e porquê">
            <h3 className="font-bold text-tinta">Pedido de orçamento (formulário do site)</h3>
            <p>
              O formulário do site <strong>não envia os seus dados a lado nenhum</strong>: escreve a
              mensagem e abre o WhatsApp no seu telemóvel ou computador, já preenchida. Quem carrega
              em enviar é você, e a conversa é directamente connosco.
            </p>
            {FORMULARIO_GOOGLE.url !== null && (
              <p>
                Ao mesmo tempo, guardamos uma cópia do que escreveu numa folha nossa no Google
                Forms, para o pedido não se perder caso o WhatsApp não chegue a ser enviado.
              </p>
            )}
            <p>
              A mensagem leva o <strong>nome</strong>, o <strong>telemóvel</strong>, o{' '}
              <strong>serviço pretendido</strong> e os detalhes que optar por escrever. Usamos estes
              dados apenas para responder ao pedido e, se avançar, para marcar e prestar o serviço.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Fundamento legal: as diligências prévias ao contrato que nos pede (artigo 6.º, n.º
                1, alínea b) do RGPD); se contratar o serviço, o mesmo fundamento cobre a sua
                execução.
              </li>
              <li>
                Prazo de conservação: 12 meses no caso de orçamentos sem seguimento; nos serviços
                prestados, o prazo legal aplicável às obrigações contabilísticas e fiscais (10
                anos).
              </li>
            </ul>

            <h3 className="font-bold text-tinta">Contacto por WhatsApp ou telefone</h3>
            <p>
              Ao contactar-nos por estas vias fica registado o seu número e o conteúdo da conversa,
              pelo mesmo motivo e pelos mesmos prazos indicados acima. O WhatsApp é um serviço da
              Meta Platforms Ireland Ltd., com política de privacidade própria.
            </p>

            <h3 className="font-bold text-tinta">Navegação no site</h3>
            <p>
              Se der o seu consentimento no aviso de cookies, recolhemos dados de utilização e de
              medição de publicidade através do Google (ver ponto 4). Sem esse consentimento, não
              são instalados cookies de análise ou de publicidade.
            </p>
          </Acapite>

          <Acapite n={3} titulo="Com quem partilhamos os dados">
            <p>
              Não vendemos nem cedemos os seus dados. Recorremos apenas a prestadores de serviço que
              os tratam por nossa conta:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Google Ireland Ltd. — Google Tag Manager, Google Analytics e Google Ads, para
                medição de audiência e de publicidade, apenas mediante consentimento.
              </li>
              {FORMULARIO_GOOGLE.url !== null && (
                <li>
                  Google Ireland Ltd. — Google Forms, onde guardamos uma cópia dos pedidos de
                  orçamento, para nenhum se perder.
                </li>
              )}
              <li>{ou(ALOJAMENTO, 'SITE.alojamento')} — alojamento do site.</li>
              <li>Autoridades públicas, quando exista obrigação legal.</li>
            </ul>
            <p>
              Alguns destes prestadores podem tratar dados fora do Espaço Económico Europeu. Nesses
              casos, a transferência assenta nas Cláusulas Contratuais-Tipo aprovadas pela Comissão
              Europeia ou em decisão de adequação.
            </p>
          </Acapite>

          <Acapite n={4} titulo="Cookies e tecnologias semelhantes">
            <p>
              Ao entrar no site, todos os cookies não essenciais estão bloqueados por predefinição
              (Consent Mode v2 do Google). Só são ativados depois de carregar em «Aceitar» no aviso
              de cookies. Se carregar em «Recusar», o site continua a funcionar na íntegra.
            </p>
            {/* Uma área que rola tem de ser alcançável pelo teclado, senão
                quem não usa rato não chega ao fim da tabela em ecrã estreito. */}
            <div
              className="overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="Categorias de cookies"
            >
              <table className="w-full border-collapse text-left text-[0.92rem]">
                <caption className="sr-only oculto">
                  Categorias de cookies utilizadas e se precisam de consentimento
                </caption>
                <thead>
                  <tr className="border-b border-borda">
                    <th scope="col" className="py-2 pr-3 font-bold text-tinta">
                      Categoria
                    </th>
                    <th scope="col" className="py-2 pr-3 font-bold text-tinta">
                      Para que serve
                    </th>
                    <th scope="col" className="py-2 font-bold text-tinta">
                      Precisa de consentimento?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-borda">
                    <th scope="row" className="py-2 pr-3 font-semibold text-tinta">
                      Essenciais
                    </th>
                    <td className="py-2 pr-3">
                      Segurança e funcionamento do site, incluindo o registo da sua escolha sobre
                      cookies.
                    </td>
                    <td className="py-2">Não</td>
                  </tr>
                  <tr className="border-b border-borda">
                    <th scope="row" className="py-2 pr-3 font-semibold text-tinta">
                      Análise
                    </th>
                    <td className="py-2 pr-3">
                      Perceber que páginas são vistas e como o site é utilizado (Google Analytics).
                    </td>
                    <td className="py-2">Sim</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 pr-3 font-semibold text-tinta">
                      Publicidade
                    </th>
                    <td className="py-2 pr-3">
                      Medir a eficácia dos anúncios e mostrar publicidade relevante (Google Ads).
                    </td>
                    <td className="py-2">Sim</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              A sua escolha fica guardada no navegador, na chave{' '}
              <code className="rounded bg-banda px-1.5 py-0.5 text-[0.9em]">
                {CHAVE_CONSENTIMENTO}
              </code>
              . Para a alterar, apague os dados do site no seu navegador — o aviso volta a aparecer
              na visita seguinte.
            </p>
          </Acapite>

          <Acapite n={5} titulo="Os seus direitos">
            <p>
              Pode a qualquer momento pedir-nos o <strong>acesso</strong>, a{' '}
              <strong>retificação</strong>, o <strong>apagamento</strong>, a{' '}
              <strong>limitação</strong> ou a <strong>portabilidade</strong> dos seus dados, bem
              como opor-se ao tratamento ou retirar o consentimento (sem afetar a licitude do
              tratamento já feito).
            </p>
            <p>
              Basta escrever para{' '}
              {u.email ? (
                <a href={`mailto:${u.email}`} className="text-tinta underline">
                  {u.email}
                </a>
              ) : (
                email
              )}
              . Respondemos no prazo de um mês.
            </p>
            <p>
              Se entender que os seus dados não estão a ser tratados corretamente, pode apresentar
              reclamação à Comissão Nacional de Proteção de Dados (CNPD) —{' '}
              <a href="https://www.cnpd.pt" target="_blank" rel="noopener" className="text-tinta underline">
                www.cnpd.pt
              </a>
              .
            </p>
          </Acapite>

          <Acapite n={6} titulo="Segurança">
            <p>
              Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra
              perda, acesso não autorizado ou divulgação indevida. O site é servido por ligação
              cifrada (HTTPS) e o acesso aos pedidos de orçamento está limitado a quem precisa dele
              para responder.
            </p>
          </Acapite>

          <Acapite n={7} titulo="Alterações a esta política">
            <p>
              Esta política pode ser atualizada sempre que houver alterações aos serviços ou à
              legislação aplicável. A data da última atualização está indicada no topo desta página.
            </p>
          </Acapite>
        </div>
      </main>

      <footer className="bg-preto py-10 text-center text-[0.9rem] text-white/75">
        <Env>
          <p>
            Doutor Sofá — Unidade de {u.cidade} · {telefone} · {email}
          </p>
          <p className="mt-2">
            <a
              href="https://www.livroreclamacoes.pt/"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              Livro de reclamações
            </a>
          </p>
          <p className="mt-4 text-[0.8rem] text-white/55">
            {legal !== null && (
              <>
                {legal}
                <br />
              </>
            )}
            © {new Date().getFullYear()} Doutor Sofá {u.cidade}.
          </p>
        </Env>
      </footer>
    </>
  );
}
