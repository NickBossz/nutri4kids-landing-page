import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Lanchinho Feliz" },
      {
        name: "description",
        content:
          "Conheça nossa história, nossos cuidados na produção e o compromisso com famílias e escolas.",
      },
      { property: "og:title", content: "Sobre — Lanchinho Feliz" },
      {
        property: "og:description",
        content: "Cuidado, organização e afeto em cada pedido.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Sobre nós
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
          Alimentação feita com carinho, organização e cuidado.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Esta página é um espaço reservado para a história real da empresa.
          Substituir os textos abaixo pela história, valores e equipe quando os
          dados forem fornecidos.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6">
        <Section title="Nossa proposta">
          Produzimos lanches, lancheiras e kits pensados para acompanhar a rotina
          de crianças, famílias e escolas parceiras. Tudo é preparado com
          atenção, sem inventar promessas e com transparência nas informações.
        </Section>
        <Section title="Como cuidamos do processo">
          Selecionamos ingredientes com cuidado, mantemos a higiene e a
          organização da cozinha em todas as etapas e embalamos cada item de
          forma a chegar bem até você. [Substituir por informações reais da operação.]
        </Section>
        <Section title="Compromissos">
          • Comunicação clara durante o atendimento.
          {"\n"}• Informações honestas sobre prazos e disponibilidade.
          {"\n"}• Adaptação responsável a restrições, confirmada caso a caso.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{children}</p>
    </article>
  );
}
