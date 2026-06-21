const STEPS = [
  { n: 1, title: "Escolha seus produtos", desc: "Navegue pelo catálogo e selecione o que combina com o seu momento." },
  { n: 2, title: "Monte o carrinho", desc: "Ajuste quantidades e variações com calma." },
  { n: 3, title: "Informe entrega e horário", desc: "Preencha um formulário rápido com os dados necessários." },
  { n: 4, title: "Confirme tudo pelo WhatsApp", desc: "Nós recebemos o pedido organizado e finalizamos em conversa." },
];

export function HowItWorks() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Como funciona
        </p>
        <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          Um pedido em quatro passos
        </h2>
      </div>
      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="relative rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <span
              aria-hidden="true"
              className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-lg font-extrabold text-primary-foreground"
            >
              {s.n}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
