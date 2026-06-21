import type { Product } from "@/types";

const productImage = (filename: string) =>
  `/images/products/${filename}`;

export const products: Product[] = [
  {
    id: "p1",
    slug: "risoles-de-abobora",
    name: "Risoles de Abóbora",
    shortDescription:
      "Risoles assado com recheio de abóbora, preparado especialmente para o lanche infantil.",
    description:
      "Risoles de abóbora com massa macia e recheio saboroso. Uma opção prática para lancheiras, eventos e pedidos familiares.",
    category: "salgados",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("risoles-abobora.webp")],
    featured: true,
    popular: true,
    available: true,
    leadTimeHours: 24,
    tags: ["mais-pedidos", "vegetariano"],
    ingredients: ["Abóbora", "Farinha de trigo", "Temperos"],
    allergens: ["Glúten"],
    conservation: "Conservar refrigerado.",
    validity: "Consumir conforme orientação da empresa.",
    placeholder: false,
  },

  {
    id: "p2",
    slug: "cupcake-de-beterraba",
    name: "Cupcake de Beterraba",
    shortDescription:
      "Cupcake macio preparado com beterraba, ideal para o lanche das crianças.",
    description:
      "Cupcake caseiro de beterraba com textura macia e apresentação pensada para o público infantil.",
    category: "doces",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("cupcake-beterraba.webp")],
    featured: true,
    popular: true,
    available: true,
    leadTimeHours: 24,
    tags: ["mais-pedidos", "vegetariano"],
    ingredients: ["Beterraba", "Farinha de trigo", "Ovos", "Açúcar"],
    allergens: ["Glúten", "Ovos"],
    conservation: "Conservar em local fresco.",
    validity: "Consumir conforme orientação da empresa.",
    placeholder: false,
  },

  {
    id: "p3",
    slug: "bolacha-de-aveia",
    name: "Bolacha de Aveia",
    shortDescription:
      "Bolacha caseira de aveia, crocante e preparada para o lanche infantil.",
    description:
      "Bolacha de aveia feita artesanalmente, indicada para lancheiras escolares e pedidos familiares.",
    category: "doces",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "porção",
    images: [productImage("bolacha-aveia.webp")],
    featured: true,
    popular: true,
    available: true,
    leadTimeHours: 24,
    tags: ["mais-pedidos", "vegetariano"],
    ingredients: ["Aveia", "Farinha de trigo", "Ovos"],
    allergens: ["Glúten", "Ovos"],
    conservation: "Conservar em recipiente fechado.",
    validity: "Consumir conforme orientação da empresa.",
    placeholder: false,
  },

  {
    id: "p4",
    slug: "waffle-com-mel",
    name: "Waffle com Mel",
    shortDescription:
      "Waffle macio acompanhado de mel, presente no cardápio escolar.",
    description:
      "Waffle preparado para o lanche infantil e servido com uma porção de mel.",
    category: "doces",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("waffle-mel.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["vegetariano"],
    ingredients: ["Farinha de trigo", "Leite", "Ovos", "Mel"],
    allergens: ["Glúten", "Leite", "Ovos"],
    placeholder: false,
  },

  {
    id: "p5",
    slug: "pao-com-carne-moida",
    name: "Pão com Carne Moída",
    shortDescription:
      "Pão macio com recheio de carne moída temperada.",
    description:
      "Lanche salgado preparado com pão e carne moída, servido em porção infantil.",
    category: "salgados",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("pao-carne-moida.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: [],
    ingredients: ["Pão", "Carne moída", "Temperos"],
    allergens: ["Glúten"],
    placeholder: false,
  },

  {
    id: "p6",
    slug: "pao-de-queijo",
    name: "Pão de Queijo",
    shortDescription:
      "Pão de queijo macio, assado e servido em porção individual.",
    description:
      "Pão de queijo preparado para lancheiras escolares e pedidos familiares.",
    category: "salgados",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "porção",
    images: [productImage("pao-queijo.webp")],
    featured: true,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["vegetariano"],
    ingredients: ["Polvilho", "Queijo", "Leite", "Ovos"],
    allergens: ["Leite", "Ovos"],
    placeholder: false,
  },

  {
    id: "p7",
    slug: "pao-de-batata-com-pate-de-frango",
    name: "Pão de Batata com Patê de Frango",
    shortDescription:
      "Pão de batata recheado com patê de frango.",
    description:
      "Lanche macio e saboroso preparado com pão de batata e patê de frango.",
    category: "salgados",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("pao-batata-frango.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: [],
    ingredients: ["Pão de batata", "Frango", "Temperos"],
    allergens: ["Glúten", "Leite"],
    placeholder: false,
  },

  {
    id: "p8",
    slug: "sanduiche-natural",
    name: "Sanduíche Natural",
    shortDescription:
      "Sanduíche natural preparado com ingredientes frescos.",
    description:
      "Sanduíche leve para o lanche infantil, preparado com recheio fresco.",
    category: "salgados",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("sanduiche-natural.webp")],
    featured: true,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: [],
    allergens: ["Glúten"],
    placeholder: false,
  },

  {
    id: "p9",
    slug: "empada-de-frango",
    name: "Empada de Frango",
    shortDescription:
      "Empada assada com recheio de frango temperado.",
    description:
      "Empada de frango em porção individual, preparada para lanches e pedidos familiares.",
    category: "salgados",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("empada-frango.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: [],
    ingredients: ["Farinha de trigo", "Frango", "Temperos"],
    allergens: ["Glúten", "Ovos"],
    placeholder: false,
  },

  {
    id: "p10",
    slug: "bolo-de-ninho",
    name: "Bolo de Ninho",
    shortDescription:
      "Bolo macio com sabor de leite Ninho.",
    description:
      "Bolo preparado em porção infantil, ideal para o lanche escolar.",
    category: "doces",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "fatia",
    images: [productImage("bolo-ninho.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["vegetariano"],
    ingredients: ["Farinha de trigo", "Leite", "Ovos", "Açúcar"],
    allergens: ["Glúten", "Leite", "Ovos"],
    placeholder: false,
  },

  {
    id: "p11",
    slug: "brownie",
    name: "Brownie",
    shortDescription:
      "Brownie de chocolate macio e servido em porção individual.",
    description:
      "Brownie caseiro preparado para acompanhar os cardápios escolares.",
    category: "doces",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("brownie.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["vegetariano"],
    ingredients: ["Chocolate", "Farinha de trigo", "Ovos", "Açúcar"],
    allergens: ["Glúten", "Leite", "Ovos"],
    placeholder: false,
  },

  {
    id: "p12",
    slug: "salada-de-frutas",
    name: "Salada de Frutas",
    shortDescription:
      "Seleção de frutas frescas em porção individual.",
    description:
      "Salada preparada com frutas da estação, higienizadas e cortadas.",
    category: "frutas",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "pote",
    images: [productImage("salada-frutas.webp")],
    featured: true,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: [
      "sem-acucar-adicionado",
      "sem-lactose",
      "sem-gluten",
      "vegetariano",
    ],
    ingredients: ["Frutas da estação"],
    allergens: [],
    conservation: "Conservar refrigerado.",
    validity: "Consumir no mesmo dia.",
    placeholder: false,
  },

  {
    id: "p13",
    slug: "suco-de-laranja",
    name: "Suco de Laranja",
    shortDescription:
      "Suco de laranja servido gelado.",
    description:
      "Bebida para acompanhar os lanches e cardápios escolares.",
    category: "bebidas",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("suco-laranja.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["sem-lactose", "sem-gluten", "vegetariano"],
    ingredients: ["Laranja"],
    allergens: [],
    placeholder: false,
  },

  {
    id: "p14",
    slug: "suco-de-uva",
    name: "Suco de Uva",
    shortDescription:
      "Suco de uva servido gelado.",
    description:
      "Bebida para acompanhar os lanches e cardápios escolares.",
    category: "bebidas",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("suco-uva.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["sem-lactose", "sem-gluten", "vegetariano"],
    ingredients: ["Uva"],
    allergens: [],
    placeholder: false,
  },

  {
    id: "p15",
    slug: "suco-de-maracuja",
    name: "Suco de Maracujá",
    shortDescription:
      "Suco de maracujá servido gelado.",
    description:
      "Bebida para acompanhar os lanches e cardápios escolares.",
    category: "bebidas",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("suco-maracuja.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["sem-lactose", "sem-gluten", "vegetariano"],
    ingredients: ["Maracujá"],
    allergens: [],
    placeholder: false,
  },

  {
    id: "p16",
    slug: "suco-de-morango",
    name: "Suco de Morango",
    shortDescription:
      "Suco de morango servido gelado.",
    description:
      "Bebida para acompanhar os lanches e cardápios escolares.",
    category: "bebidas",
    price: null,
    priceLabel: "Preço sob consulta",
    unit: "unidade",
    images: [productImage("suco-morango.webp")],
    featured: false,
    popular: false,
    available: true,
    leadTimeHours: 24,
    tags: ["sem-lactose", "sem-gluten", "vegetariano"],
    ingredients: ["Morango"],
    allergens: [],
    placeholder: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getPopularProducts(): Product[] {
  return products.filter((product) => product.popular);
}