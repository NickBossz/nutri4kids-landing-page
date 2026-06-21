import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsappUrl, isWhatsappConfigured } from "@/lib/whatsapp";

export function FinalCTA() {
  const waUrl = isWhatsappConfigured()
    ? buildWhatsappUrl("Olá! Quero fazer um pedido.")
    : undefined;
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-[var(--brand-primary)] p-8 text-primary-foreground sm:p-12">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[var(--brand-accent)]/40 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-[var(--brand-secondary)]/40 blur-3xl" aria-hidden="true" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Vamos montar o próximo lanche?
            </h2>
            <p className="mt-4 max-w-xl opacity-90">
              Escolha entre nossos produtos ou comece uma conversa agora — estamos prontos para receber seu pedido.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="secondary">
                <Link to="/produtos">Ver produtos</Link>
              </Button>
              {waUrl && (
                <Button asChild size="xl" variant="whatsapp">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden="true" /> Conversar no WhatsApp
                  </a>
                </Button>
              )}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=900&q=70"
            alt=""
            className="hidden h-full max-h-[320px] w-full rounded-3xl object-cover lg:block"
          />
        </div>
      </div>
    </section>
  );
}
