import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { AudienceSelector } from "@/components/home/AudienceSelector";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowItWorks } from "@/components/home/HowItWorks";
import { KitsSection } from "@/components/home/KitsSection";
import { SchoolPartnership } from "@/components/home/SchoolPartnership";
import { ProductionGallery } from "@/components/home/ProductionGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lanchinho Feliz | Alimentação infantil para famílias e escolas" },
      {
        name: "description",
        content:
          "Lanches, lancheiras e kits cuidadosos para crianças. Atendemos famílias e escolas parceiras com pedidos confirmados pelo WhatsApp.",
      },
      { property: "og:title", content: "Lanchinho Feliz" },
      {
        property: "og:description",
        content:
          "Lanches que alimentam bons momentos — para famílias e escolas parceiras.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <AudienceSelector />
      <BenefitsSection />
      <FeaturedProducts />
      <HowItWorks />
      <KitsSection />
      <SchoolPartnership />
      <ProductionGallery />
      <Testimonials />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
