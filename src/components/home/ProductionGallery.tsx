const images = [
  {
    src: "images/bastidores/biscoito de aveia.jpeg",
    alt: "Biscoitos de aveia preparados para os lanches",
  },
  {
    src: "images/bastidores/biscoito.jpeg",
    alt: "Biscoitos preparados artesanalmente",
  },
  {
    src: "images/bastidores/bolachas.jpeg",
    alt: "Bolachas prontas para serem servidas",
  },
  {
    src: "images/bastidores/cupcake de beterraba.jpeg",
    alt: "Cupcakes de beterraba preparados para as crianças",
  },
  {
    src: "images/bastidores/doce.jpeg",
    alt: "Doce produzido na cozinha",
  },
  {
    src: "images/bastidores/doces.jpeg",
    alt: "Doces preparados para os pedidos",
  },
  {
    src: "images/bastidores/hamburguer.jpeg",
    alt: "Hambúrguer preparado para o lanche",
  },
  {
    src: "images/bastidores/mini pizza.jpeg",
    alt: "Mini pizzas prontas para entrega",
  },
  {
    src: "images/bastidores/pao.jpeg",
    alt: "Pães preparados artesanalmente",
  },
  {
    src: "images/bastidores/risole de abobora.jpeg",
    alt: "Risoles de abóbora preparados para os pedidos",
  },
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
          Conheça um pouco do cuidado presente em cada etapa da nossa produção.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.src}
            className="group overflow-hidden rounded-3xl border border-border bg-muted"
          >
            <div className="aspect-[4/3] w-full">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}