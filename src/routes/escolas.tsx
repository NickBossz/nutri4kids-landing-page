import { createFileRoute } from "@tanstack/react-router";
import { SchoolPartnership } from "@/components/home/SchoolPartnership";
import { Check } from "lucide-react";

export const Route = createFileRoute("/escolas")({
  head: () => ({
    meta: [
      { title: "Para escolas — Lanchinho Feliz" },
      {
        name: "description",
        content:
          "Parcerias para escolas: planejamento, fornecimento recorrente e cardápios adaptáveis. Solicite uma conversa.",
      },
      { property: "og:title", content: "Para escolas — Lanchinho Feliz" },
      {
        property: "og:description",
        content: "Parceria que vai além do lanche. Atendemos escolas com cuidado e organização.",
      },
    ],
  }),
  component: EscolasPage,
});

const POINTS = [
  "Planejamento de quantidades por turma e turno",
  "Adaptação de cardápios às necessidades da escola",
  "Frequência semanal, quinzenal ou pontual",
  "Comunicação próxima com a coordenação",
  "Soluções para eventos, festas e datas especiais",
];

function EscolasPage() {
  return (
    <>
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Parceria escolar
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
            Uma parceria que vai além do lanche
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Atendemos escolas com proposta personalizada conforme o número de
            crianças, a frequência e a operação da instituição.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {POINTS.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <SchoolPartnership />
    </>
  );
}
