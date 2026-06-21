import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  audience: "family" | "school";
  lastOrderCode: string | null;
  open: () => void;
  close: () => void;
  setAudience: (a: "family" | "school") => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variationId?: string) => void;
  increase: (productId: string, variationId?: string) => void;
  decrease: (productId: string, variationId?: string) => void;
  updateQuantity: (productId: string, variationId: string | undefined, qty: number) => void;
  clearCart: () => void;
  setLastOrderCode: (code: string | null) => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

const sameLine = (a: CartItem, productId: string, variationId?: string) =>
  a.productId === productId && (a.variationId ?? null) === (variationId ?? null);

const MAX_QTY = 99;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      audience: "family",
      lastOrderCode: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setAudience: (a) => set({ audience: a }),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, item.productId, item.variationId));
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item.productId, item.variationId)
                  ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + item.quantity) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: Math.min(MAX_QTY, Math.max(1, item.quantity)) }] };
        }),
      removeItem: (productId, variationId) =>
        set((s) => ({ items: s.items.filter((i) => !sameLine(i, productId, variationId)) })),
      increase: (productId, variationId) =>
        set((s) => ({
          items: s.items.map((i) =>
            sameLine(i, productId, variationId) ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + 1) } : i,
          ),
        })),
      decrease: (productId, variationId) =>
        set((s) => ({
          items: s.items
            .map((i) => (sameLine(i, productId, variationId) ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),
      updateQuantity: (productId, variationId, qty) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              sameLine(i, productId, variationId)
                ? { ...i, quantity: Math.max(0, Math.min(MAX_QTY, qty)) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [], lastOrderCode: null }),
      setLastOrderCode: (code) => set({ lastOrderCode: code }),
      getItemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      getSubtotal: () => get().items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
    }),
    {
      name: "lf:cart",
      partialize: (s) => ({ items: s.items, audience: s.audience, lastOrderCode: s.lastOrderCode }),
    },
  ),
);
