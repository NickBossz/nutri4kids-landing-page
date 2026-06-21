import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { companyConfig } from "@/config/company";
import { buildWhatsappUrl, isWhatsappConfigured } from "@/lib/whatsapp";

export function Footer() {
  const wa = isWhatsappConfigured()
    ? buildWhatsappUrl("Olá! Gostaria de mais informações.")
    : "#";
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Produzimos opções práticas e cuidadosas de alimentação para famílias,
            crianças e escolas parceiras.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {companyConfig.deliveryNotice}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/produtos" className="text-muted-foreground hover:text-primary">Produtos</Link></li>
            <li><Link to="/escolas" className="text-muted-foreground hover:text-primary">Para escolas</Link></li>
            <li><Link to="/sobre" className="text-muted-foreground hover:text-primary">Sobre</Link></li>
            <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            <li><Link to="/contato" className="text-muted-foreground hover:text-primary">Contato</Link></li>
            <li>
              <Link to="/politica-de-privacidade" className="text-muted-foreground hover:text-primary">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Contato</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <a href={wa} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </li>
            {companyConfig.instagram && (
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <a href={companyConfig.instagram} className="hover:text-primary">
                  Instagram
                </a>
              </li>
            )}
            {companyConfig.email && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${companyConfig.email}`} className="hover:text-primary">
                  {companyConfig.email}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {companyConfig.serviceRegion}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {companyConfig.businessHours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {companyConfig.name}. Todos os direitos reservados.</p>
          <p>Feito com carinho para acompanhar bons momentos.</p>
        </div>
      </div>
    </footer>
  );
}
