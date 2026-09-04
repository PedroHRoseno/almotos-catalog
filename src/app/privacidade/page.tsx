import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, COMPANY } from "@/components/site-footer";
import { SiteHeader, shellClass } from "@/components/site-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Política de Privacidade | AL Motos",
  description:
    "Como a AL Motos trata nome e telefone no atendimento por WhatsApp e na simulação de financiamento, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <SiteHeader />
      <main className={cn(shellClass, "flex-1 py-10 sm:py-14")}>
        <p className="text-sm text-ink-subtle">
          <Link href="/" className="hover:text-ink">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          Privacidade
        </p>

        <article className="mt-6 max-w-3xl space-y-6 text-base leading-relaxed text-ink-muted">
          <header className="space-y-2">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Política de Privacidade
            </h1>
            <p className="text-sm text-ink-subtle">
              Última atualização: 4 de setembro de 2026
            </p>
          </header>

          <p>
            Esta política descreve, de forma simples, como a{" "}
            <strong className="font-medium text-ink">{COMPANY.tradeName}</strong>{" "}
            ({COMPANY.legalName}, CNPJ {COMPANY.cnpj}) trata dados pessoais no
            site e no atendimento, em linha com a Lei Geral de Proteção de Dados
            (Lei nº 13.709/2018 — LGPD).
          </p>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Quem é o controlador
            </h2>
            <p>
              O controlador dos dados é {COMPANY.legalName}, com sede em{" "}
              {COMPANY.street}, {COMPANY.neighborhood}, {COMPANY.city}, CEP{" "}
              {COMPANY.cep}. Contato: {COMPANY.email.toLowerCase()} ·{" "}
              {COMPANY.phone}.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Quais dados coletamos
            </h2>
            <p>
              No catálogo e no atendimento, pedimos apenas{" "}
              <strong className="font-medium text-ink">nome</strong> e{" "}
              <strong className="font-medium text-ink">telefone</strong> (WhatsApp).
              Não solicitamos CPF, documentos ou dados bancários por este site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Para que usamos
            </h2>
            <p>
              Nome e telefone são usados{" "}
              <strong className="font-medium text-ink">exclusivamente</strong> para:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>atendimento comercial via WhatsApp (dúvidas sobre motos, visita e proposta);</li>
              <li>simulação de financiamento, quando você pede essa análise à nossa equipe.</li>
            </ul>
            <p>
              Não usamos esses dados para marketing em massa, venda de lista ou
              perfilamento alheio à compra da moto.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Base legal
            </h2>
            <p>
              O tratamento ocorre com o seu consentimento e para medidas
              preliminares a um contrato de compra ou de financiamento (art. 7º,
              I e V, da LGPD), a partir do contato que você inicia.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Compartilhamento
            </h2>
            <p>
              Não vendemos seus dados. Na simulação de financiamento, o nome e o
              telefone podem ser encaminhados ao parceiro financeiro apenas para
              essa análise, quando você solicita a simulação. Fora isso, o
              atendimento permanece na conversa de WhatsApp com a loja.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Retenção
            </h2>
            <p>
              Mantemos o histórico de conversa pelo tempo necessário ao
              atendimento e às obrigações legais da concessionária. Depois,
              os dados são eliminados ou anonimizados, salvo dever legal de guarda.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Seus direitos
            </h2>
            <p>
              Você pode confirmar se tratamos seus dados, acessá-los, corrigir
              informações, pedir exclusão, revogar o consentimento e solicitar
              informação sobre compartilhamentos (arts. 18 e 9º da LGPD).
            </p>
            <p>
              Para exercer esses direitos, fale conosco pelo e-mail{" "}
              <a
                href={`mailto:${COMPANY.email.toLowerCase()}`}
                className="text-ink underline-offset-4 hover:underline"
              >
                {COMPANY.email.toLowerCase()}
              </a>{" "}
              ou pelo telefone{" "}
              <a
                href="tel:+558181146588"
                className="text-ink underline-offset-4 hover:underline"
              >
                {COMPANY.phone}
              </a>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">
              Este site
            </h2>
            <p>
              O catálogo mostra motos à venda. O assistente e os botões de
              WhatsApp apenas encaminham você ao atendimento humano da loja. Não
              há cadastro obrigatório para navegar no estoque.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
