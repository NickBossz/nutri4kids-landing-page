const IMAGES = [
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=900&q=70",
];

export function ProductionGallery() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Bastidores
        </p>
        <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          Da nossa cozinha para a sua rotina
        </h2>
        <p className="mt-3 text-muted-foreground">
          Imagens ilustrativas — substituir por fotos reais da produção quando disponíveis.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className={
              "overflow-hidden rounded-3xl border border-border bg-muted " +
              (i === 1 ? "row-span-2 md:row-span-2" : "")
            }
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
