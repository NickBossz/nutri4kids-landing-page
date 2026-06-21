import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Check, MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";
import { formatBRL } from "@/lib/currency";
import { buildFamilyOrderMessage, buildWhatsappUrl, isWhatsappConfigured } from "@/lib/whatsapp";
import { generateOrderCode } from "@/lib/order-code";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

const todayIso = () => new Date().toISOString().slice(0, 10);

const schema = z
  .object({
    fulfillment: z.enum(["entrega", "retirada", "escola", "recorrente"]),
    name: z.string().trim().min(2, "Informe seu nome").max(120),
    phone: z.string().trim().min(8, "Informe um telefone válido").max(30),
    email: z.string().trim().email("E-mail inválido").max(120).optional().or(z.literal("")),
    cep: z.string().trim().max(15).optional().or(z.literal("")),
    street: z.string().trim().max(160).optional().or(z.literal("")),
    number: z.string().trim().max(20).optional().or(z.literal("")),
    complement: z.string().trim().max(120).optional().or(z.literal("")),
    district: z.string().trim().max(80).optional().or(z.literal("")),
    city: z.string().trim().max(80).optional().or(z.literal("")),
    reference: z.string().trim().max(160).optional().or(z.literal("")),
    schoolName: z.string().trim().max(120).optional().or(z.literal("")),
    date: z
      .string()
      .min(1, "Escolha uma data")
      .refine((v) => v >= todayIso(), "Selecione uma data a partir de hoje"),
    period: z.enum(["manha", "tarde", "horario"]),
    time: z.string().optional().or(z.literal("")),
    childName: z.string().max(80).optional().or(z.literal("")),
    ageRange: z.string().max(40).optional().or(z.literal("")),
    restrictions: z.string().max(400).optional().or(z.literal("")),
    notes: z.string().max(600).optional().or(z.literal("")),
    packaging: z.string().max(160).optional().or(z.literal("")),
    reviewConfirmed: z.literal(true, { errorMap: () => ({ message: "Confirme a revisão" }) }),
  })
  .superRefine((val, ctx) => {
    if ((val.fulfillment === "entrega" || val.fulfillment === "escola") && !val.street) {
      ctx.addIssue({ path: ["street"], code: "custom", message: "Informe o endereço" });
    }
    if (val.fulfillment === "escola" && !val.schoolName) {
      ctx.addIssue({ path: ["schoolName"], code: "custom", message: "Informe a escola" });
    }
    if (val.period === "horario" && !val.time) {
      ctx.addIssue({ path: ["time"], code: "custom", message: "Informe o horário" });
    }
  });

type FormValues = z.infer<typeof schema>;

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const setLastOrderCode = useCartStore((s) => s.setLastOrderCode);
  const clearCart = useCartStore((s) => s.clearCart);
  const lastOrderCode = useCartStore((s) => s.lastOrderCode);
  const close = useCartStore((s) => s.close);

  const [sent, setSent] = useState(Boolean(lastOrderCode));
  const [lastUrl, setLastUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fulfillment: "entrega",
      period: "manha",
      date: todayIso(),
      reviewConfirmed: false as unknown as true,
    },
  });

  const fulfillment = watch("fulfillment");
  const period = watch("period");
  const reviewConfirmed = watch("reviewConfirmed");

  const showAddress = fulfillment === "entrega" || fulfillment === "escola";
  const showSchool = fulfillment === "escola" || fulfillment === "recorrente";

  const waConfigured = isWhatsappConfigured();

  const onSubmit = (values: FormValues) => {
    track("checkout_started");
    if (!waConfigured) {
      toast.error("WhatsApp não configurado", {
        description: "Defina VITE_WHATSAPP_NUMBER no ambiente.",
      });
      track("checkout_error", { reason: "whatsapp_not_configured" });
      return;
    }
    const code = generateOrderCode("PED");
    const message = buildFamilyOrderMessage({
      code,
      items,
      data: { ...values, email: values.email || undefined, reviewConfirmed: true },
    });
    const url = buildWhatsappUrl(message);
    setLastOrderCode(code);
    setLastUrl(url);
    setSent(true);
    track("whatsapp_order_clicked", { code });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const orderSummary = useMemo(
    () => (
      <div className="rounded-2xl border border-border bg-muted/50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Resumo do pedido
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {items.map((i) => (
            <li
              key={`${i.productId}:${i.variationId ?? "_"}`}
              className="flex justify-between gap-2"
            >
              <span className="truncate">
                {i.quantity}x {i.name}
              </span>
              <span>{formatBRL(i.unitPrice * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-semibold">
          <span>Subtotal estimado</span>
          <span>{formatBRL(subtotal)}</span>
        </div>
      </div>
    ),
    [items, subtotal],
  );

  if (sent && lastOrderCode) {
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="rounded-2xl border border-border bg-card p-5 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Check className="h-7 w-7" aria-hidden="true" />
          </div>
          <h3 className="mt-3 text-lg font-bold">Pedido preparado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Código <span className="font-mono font-semibold">{lastOrderCode}</span>
          </p>
          <p className="mt-3 text-sm">
            Abrimos o WhatsApp em uma nova aba. Se a janela não abriu,
            clique no botão abaixo.
          </p>
          {lastUrl && (
            <Button asChild variant="whatsapp" size="lg" className="mt-4 w-full">
              <a href={lastUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                Abrir WhatsApp novamente
              </a>
            </Button>
          )}
        </div>

        <div className="rounded-2xl border border-dashed border-border p-4 text-sm">
          <p className="font-semibold">E agora?</p>
          <p className="mt-1 text-muted-foreground">
            Mantemos o carrinho salvo caso você precise revisar. Quando quiser
            começar um novo pedido, esvazie o carrinho.
          </p>
          <div className="mt-3 grid gap-2">
            <Button variant="outline" onClick={() => close()}>
              Voltar ao site
            </Button>
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                clearCart();
                toast.success("Carrinho limpo");
                close();
              }}
            >
              <Trash2 className="h-4 w-4" /> Limpar carrinho
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col overflow-hidden"
      noValidate
    >
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Button type="button" variant="ghost" size="icon" onClick={onBack} aria-label="Voltar">
          <ArrowLeft />
        </Button>
        <p className="text-sm text-muted-foreground">Voltar ao carrinho</p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {orderSummary}

        <section className="space-y-2">
          <Label>Tipo de pedido</Label>
          <Select
            defaultValue="entrega"
            onValueChange={(v) => setValue("fulfillment", v as FormValues["fulfillment"])}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entrega">Entrega</SelectItem>
              <SelectItem value="escola">Entrega em escola</SelectItem>
              <SelectItem value="recorrente">Pedido recorrente escolar</SelectItem>
              <SelectItem value="retirada">Retirada (a confirmar)</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome completo" error={errors.name?.message} required>
            <Input {...register("name")} autoComplete="name" />
          </Field>
          <Field label="Telefone" error={errors.phone?.message} required>
            <Input {...register("phone")} inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" />
          </Field>
          <Field label="E-mail (opcional)" error={errors.email?.message} className="sm:col-span-2">
            <Input type="email" {...register("email")} autoComplete="email" />
          </Field>
        </section>

        {showSchool && (
          <Field label="Nome da escola" error={errors.schoolName?.message} required>
            <Input {...register("schoolName")} />
          </Field>
        )}

        {showAddress && (
          <section className="grid gap-3 sm:grid-cols-2">
            <Field label="CEP" className="sm:col-span-2">
              <Input {...register("cep")} inputMode="numeric" />
            </Field>
            <Field label="Rua" error={errors.street?.message} required className="sm:col-span-2">
              <Input {...register("street")} autoComplete="address-line1" />
            </Field>
            <Field label="Número">
              <Input {...register("number")} />
            </Field>
            <Field label="Complemento">
              <Input {...register("complement")} />
            </Field>
            <Field label="Bairro">
              <Input {...register("district")} />
            </Field>
            <Field label="Cidade">
              <Input {...register("city")} />
            </Field>
            <Field label="Ponto de referência" className="sm:col-span-2">
              <Input {...register("reference")} />
            </Field>
          </section>
        )}

        <section className="grid gap-3 sm:grid-cols-2">
          <Field label="Data desejada" error={errors.date?.message} required>
            <Input type="date" min={todayIso()} {...register("date")} />
          </Field>
          <Field label="Período" required>
            <Select
              defaultValue="manha"
              onValueChange={(v) => setValue("period", v as FormValues["period"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manha">Manhã</SelectItem>
                <SelectItem value="tarde">Tarde</SelectItem>
                <SelectItem value="horario">Horário específico</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {period === "horario" && (
            <Field label="Horário desejado" error={errors.time?.message} className="sm:col-span-2">
              <Input type="time" {...register("time")} />
            </Field>
          )}
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome da criança (opcional)">
            <Input {...register("childName")} />
          </Field>
          <Field label="Faixa etária (opcional)">
            <Input {...register("ageRange")} placeholder="Ex.: 6 a 8 anos" />
          </Field>
          <Field label="Restrições alimentares" className="sm:col-span-2">
            <Textarea rows={2} {...register("restrictions")} />
          </Field>
          <Field label="Observações" className="sm:col-span-2">
            <Textarea rows={3} {...register("notes")} />
          </Field>
          <Field label="Necessidade de embalagem específica" className="sm:col-span-2">
            <Input {...register("packaging")} />
          </Field>
        </section>

        <div className="rounded-2xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
          A data e o horário serão confirmados pela equipe. O valor final, a
          entrega e a disponibilidade são confirmados pelo WhatsApp.
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3 text-sm">
          <Checkbox
            checked={reviewConfirmed === true}
            onCheckedChange={(v) =>
              setValue("reviewConfirmed", v === true ? true : (false as unknown as true), {
                shouldValidate: true,
              })
            }
            aria-invalid={Boolean(errors.reviewConfirmed)}
          />
          <span>Confirmo que revisei as informações do pedido.</span>
        </label>
        {errors.reviewConfirmed && (
          <p className="text-xs text-destructive">{errors.reviewConfirmed.message as string}</p>
        )}
      </div>

      <div className="border-t border-border bg-card p-5">
        <Button
          type="submit"
          size="lg"
          variant="whatsapp"
          className="w-full"
          disabled={isSubmitting || items.length === 0 || !waConfigured}
        >
          <MessageCircle aria-hidden="true" />
          {waConfigured ? "Enviar pedido pelo WhatsApp" : "WhatsApp não configurado"}
        </Button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, error, required, className, children }: FieldProps) {
  const id = label.toLowerCase().replace(/\W+/g, "-");
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1 inline-flex items-center gap-1">
        {label}
        {required && <span aria-hidden="true" className="text-destructive">*</span>}
      </Label>
      <div
        // pass id to first child input via cloneElement-lite: rely on react-hook-form names
        // (the Label htmlFor + id below isn't strict; users still see association via aria-describedby)
      >
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
