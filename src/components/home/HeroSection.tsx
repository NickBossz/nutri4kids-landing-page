import { ChevronDown, School, ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function HeroSection() {
  const scrollToSchools = () => {
    const schoolsSection = document.getElementById("para-escolas");

    if (!schoolsSection) {
      return;
    }

    schoolsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    track("hero_secondary_cta_clicked", {
      target: "para-escolas",
    });
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=70"
          alt=""
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60 sm:to-background/40" />
      </div>

      <div className="container-page relative grid min-h-[78vh] items-center gap-10 py-16 md:min-h-[82vh] md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            Produção própria para famílias e escolas
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            Lanches infantis feitos para facilitar{" "}
            <span className="text-primary">a sua rotina</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Escolha produtos individuais, kits e opções personalizadas para
            crianças, famílias, festas e escolas parceiras.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="xl"
              variant="hero"
              onClick={() =>
                track("hero_primary_cta_clicked", {
                  target: "produtos",
                })
              }
            >
              <Link to="/produtos">
                <ShoppingBasket aria-hidden="true" />
                Ver cardápio
              </Link>
            </Button>

            <Button
              type="button"
              size="xl"
              variant="outline"
              onClick={scrollToSchools}
            >
              <School aria-hidden="true" />
              Sou de uma escola
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Produção própria
            </li>

            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Pedidos personalizados
            </li>

            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Atendimento para escolas
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.1,
          }}
          className="relative hidden lg:block"
        >
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[var(--brand-accent)]/30 blur-2xl" />

          <div className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-[var(--brand-secondary)]/25 blur-2xl" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-[var(--shadow-soft)]">
            <img
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80"
              alt="Lancheira infantil organizada com diferentes opções de lanche"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-background/85 p-4 shadow-lg backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Escolha do seu jeito
              </p>

              <p className="mt-1 font-display text-lg font-bold text-foreground">
                Produtos individuais, kits e pedidos para escolas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#diferenciais"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary md:inline-flex"
      >
        Conhecer
        <ChevronDown
          className="h-4 w-4 animate-bounce"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}