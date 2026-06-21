import { createFileRoute } from "@tanstack/react-router";

import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductionGallery } from "@/components/home/ProductionGallery";
import { SchoolPartnership } from "@/components/home/SchoolPartnership";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Nutri4Kids | Lanches infantis para famílias e escolas",
      },
      {
        name: "description",
        content:
          "Lanches infantis, kits e pedidos personalizados para famílias e escolas. Escolha os produtos e envie seu pedido organizado pelo WhatsApp.",
      },
      {
        property: "og:title",
        content: "Nutri4Kids",
      },
      {
        property: "og:description",
        content:
          "Lanches infantis preparados para facilitar a rotina de famílias e escolas.",
      },
    ],
  }),

  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />

      <BenefitsSection />

      <FeaturedProducts />

      <HowItWorks />

      <ProductionGallery />

      <SchoolPartnership />

      <FaqSection />

      <FinalCTA />
    </>
  );
}