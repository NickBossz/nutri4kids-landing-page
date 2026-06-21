import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartButton } from "@/components/cart/CartButton";
import { buildWhatsappUrl, isWhatsappConfigured } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/" as const, label: "Início" },
  { to: "/produtos" as const, label: "Produtos" },
  { to: "/escolas" as const, label: "Para escolas" },
  { to: "/sobre" as const, label: "Sobre" },
  { to: "/faq" as const, label: "FAQ" },
  { to: "/contato" as const, label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = isWhatsappConfigured()
    ? buildWhatsappUrl("Olá! Gostaria de tirar uma dúvida.")
    : undefined;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-background/60 backdrop-blur",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Ir para a página inicial" className="shrink-0">
          <Logo className="h-12" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary font-semibold" }}
              inactiveProps={{ className: "text-foreground/80 hover:text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {waUrl && (
            <Button
              asChild
              variant="whatsapp"
              size="sm"
              className="hidden md:inline-flex"
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          )}
          <CartButton />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu de navegação"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo className="h-14" />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeProps={{ className: "bg-accent text-primary font-semibold" }}
                    inactiveProps={{ className: "text-foreground/80" }}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-lg px-3 py-3 text-base hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              {waUrl && (
                <Button asChild variant="whatsapp" size="lg" className="mt-6 w-full">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden="true" />
                    Falar no WhatsApp
                  </a>
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
