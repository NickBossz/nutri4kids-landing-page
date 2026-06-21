import { Building2, School } from "lucide-react";

type PartnerSchool = {
  name: string;
  logo?: string;
};

const PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    name: "Maplebear",
    logo: "images/escolas/maplebear.png",
  },
  {
    name: "Nacional",
    logo: "images/escolas/nacional.jpg",
  },
  {
    name: "Navegantes",
    logo: "images/escolas/navegantes.jpg",
  },
  {
    name: "Techers",
    logo: "images/escolas/techers.jpg",
  },
];

export function PartnerSchools() {
  return (
    <section className="border-y border-border bg-card/60 py-14 md:py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <School className="h-5 w-5" aria-hidden="true" />
          </span>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Escolas parceiras
          </p>

          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Instituições que confiam no nosso trabalho
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Parcerias construídas com organização, cuidado e atendimento
            próximo às necessidades de cada escola.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {PARTNER_SCHOOLS.map((school) => (
            <article
              key={school.name}
              className="group flex min-h-24 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-3 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:min-h-28 sm:p-4"
            >
              {school.logo ? (
                <img
                  src={school.logo}
                  alt={`Logo da ${school.name}`}
                  loading="lazy"
                  className="h-20 w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-24"
                />
              ) : (
                <div className="flex flex-col items-center justify-center px-2 text-center">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Building2
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-2 text-sm font-semibold leading-tight">
                    {school.name}
                  </h3>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}