import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function CartButton() {
  const open = useCartStore((s) => s.open);
  const items = useCartStore((s) => s.items);
  const count = items.reduce((a, i) => a + i.quantity, 0);
  const [pulse, setPulse] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (!hydrated) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 320);
    return () => clearTimeout(t);
  }, [count, hydrated]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      aria-label={`Abrir carrinho — ${count} item${count === 1 ? "" : "s"}`}
      onClick={() => {
        open();
        track("cart_opened");
      }}
    >
      <ShoppingBag />
      {hydrated && count > 0 && (
        <span
          aria-live="polite"
          className={cn(
            "absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground transition-transform",
            pulse && "scale-125",
          )}
        >
          {count}
        </span>
      )}
    </Button>
  );
}
