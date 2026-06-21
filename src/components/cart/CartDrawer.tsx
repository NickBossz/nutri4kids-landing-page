import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatBRL } from "@/lib/currency";
import { CheckoutForm } from "./CheckoutForm";
import { useNavigate } from "@tanstack/react-router";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const navigate = useNavigate();

  const [step, setStep] = useState<"cart" | "checkout">("cart");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      setStep("cart");
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent
        className="ml-auto h-full max-h-screen w-full max-w-md rounded-l-3xl rounded-r-none"
        aria-describedby="cart-description"
      >
        <DrawerHeader className="flex flex-row items-start justify-between gap-2 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <DrawerTitle className="text-left text-lg">
                {step === "cart" ? "Seu pedido" : "Finalizar pedido"}
              </DrawerTitle>
              <DrawerDescription id="cart-description" className="text-left">
                {items.length === 0
                  ? "Nenhum item adicionado ainda"
                  : `${items.reduce((a, i) => a + i.quantity, 0)} item(ns) no carrinho`}
              </DrawerDescription>
            </div>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" aria-label="Fechar carrinho">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {step === "cart" ? (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-accent">
                    <ShoppingBag className="h-9 w-9 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-base font-semibold">Seu carrinho está vazio</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Explore os produtos e comece a montar o próximo lanche.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      close();
                      navigate({ to: "/produtos" });
                    }}
                  >
                    Explorar produtos
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((it) => {
                    const lineTotal = it.unitPrice * it.quantity;
                    return (
                      <li
                        key={`${it.productId}:${it.variationId ?? "_"}`}
                        className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                      >
                        {it.image && (
                          <img
                            src={it.image}
                            alt=""
                            width={72}
                            height={72}
                            className="h-18 w-18 shrink-0 rounded-xl object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{it.name}</p>
                          {it.variationName && (
                            <p className="text-xs text-muted-foreground">{it.variationName}</p>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatBRL(it.unitPrice)} cada
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                aria-label={`Diminuir quantidade de ${it.name}`}
                                onClick={() => decrease(it.productId, it.variationId)}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>
                              <span className="w-7 text-center text-sm font-medium" aria-live="polite">
                                {it.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                aria-label={`Aumentar quantidade de ${it.name}`}
                                onClick={() => increase(it.productId, it.variationId)}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <p className="text-sm font-bold">{formatBRL(lineTotal)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Remover ${it.name}`}
                          onClick={() => removeItem(it.productId, it.variationId)}
                          className="h-8 w-8 self-start text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <DrawerFooter className="border-t border-border bg-card">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal estimado</span>
                    <span>{formatBRL(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>A confirmar</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total estimado</span>
                    <span>{formatBRL(subtotal)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  O valor final, a entrega e a disponibilidade serão confirmados pelo WhatsApp.
                </p>
                <div className="grid gap-2">
                  <Button size="lg" variant="hero" onClick={() => setStep("checkout")}>
                    Preencher dados do pedido
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      close();
                      navigate({ to: "/produtos" });
                    }}
                  >
                    Continuar comprando
                  </Button>
                </div>
              </DrawerFooter>
            )}
          </>
        ) : (
          <CheckoutForm onBack={() => setStep("cart")} />
        )}
      </DrawerContent>
    </Drawer>
  );
}
