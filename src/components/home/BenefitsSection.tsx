import { Heart, Leaf, MessageCircle, Truck, Users } from "lucide-react";

const BENEFITS = [
  {
    icon: Heart,
    title: "Preparo cuidadoso",
    desc: "Cada item é montado com atenção, da escolha dos ingredientes à embalagem.",
  },
  {
    icon: Leaf,
    title: "Opções para diferentes necessidades",
    desc: "Variações sem lactose, sem glúten e sem açúcar adicionado disponíveis sob consulta.",
  },
  {
    icon: Truck,
    title: "Entrega combinada",
    desc: "Definimos a melhor logística para sua rotina ou para a escola.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento próximo",
    desc: "Todo pedido é confirmado em conversa pelo WhatsApp.",
  },
  {
    icon: Users,
    title: "Famílias e escolas",
    desc: "Soluções pensadas tanto para o dia a dia em casa quanto para parcerias institucionais.",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-y border-border bg-card/60 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Feito com cuidado para acompanhar bons momentos
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cinco compromissos que estão presentes em cada pedido que sai daqui.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map((b) => (
            <li
              key={b.title}
              className="rounded-2xl border border-border bg-background p-5 shadow-[var(--shadow-card)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-display text-base font-bold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
