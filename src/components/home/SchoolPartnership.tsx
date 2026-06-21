import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, School } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { track } from "@/lib/analytics";
import { generateOrderCode } from "@/lib/order-code";
import {
  buildSchoolMessage,
  buildWhatsappUrl,
  isWhatsappConfigured,
} from "@/lib/whatsapp";

const schoolFormSchema = z.object({
  schoolName: z
    .string()
    .trim()
    .min(2, "Informe o nome da escola")
    .max(120, "Nome muito longo"),

  responsibleName: z
    .string()
    .trim()
    .min(2, "Informe o nome do responsável")
    .max(120, "Nome muito longo"),

  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone válido")
    .max(30, "Telefone muito longo"),

  childrenCount: z
    .string()
    .trim()
    .max(20, "Quantidade inválida")
    .optional()
    .or(z.literal("")),
});

type SchoolFormValues = z.infer<typeof schoolFormSchema>;

export function SchoolPartnership() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      schoolName: "",
      responsibleName: "",
      phone: "",
      childrenCount: "",
    },
  });

  const onSubmit = (values: SchoolFormValues) => {
    if (!isWhatsappConfigured()) {
      toast.error("O WhatsApp ainda não foi configurado.");
      return;
    }

    const code = generateOrderCode("PAR");

    const message = buildSchoolMessage({
      code,
      schoolName: values.schoolName,
      responsibleName: values.responsibleName,
      phone: values.phone,
      childrenCount: values.childrenCount || undefined,
    });

    const url = buildWhatsappUrl(message);

    track("school_contact_clicked", {
      code,
      schoolName: values.schoolName,
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
            <School className="h-4 w-4" aria-hidden="true" />
            Solicitação de parceria
          </span>

          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
            Vamos entender a necessidade da sua escola
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Preencha os dados principais da instituição. As informações serão
            organizadas em uma mensagem pronta para continuar o atendimento
            pelo WhatsApp.
          </p>

          <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
            <li>• Planejamento por turma e turno</li>
            <li>• Pedidos recorrentes ou pontuais</li>
            <li>• Opções para eventos e datas especiais</li>
            <li>• Atendimento direto com a coordenação</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-border bg-background p-6 shadow-[var(--shadow-card)] sm:p-8">
          <h3 className="font-display text-2xl font-bold">
            Solicitar uma proposta
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Conte um pouco sobre a escola para iniciarmos o atendimento.
          </p>

          <form
            className="mt-7 space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="schoolName">Nome da escola</Label>

              <Input
                id="schoolName"
                placeholder="Ex.: Escola Mundo Feliz"
                autoComplete="organization"
                aria-invalid={Boolean(errors.schoolName)}
                {...register("schoolName")}
              />

              {errors.schoolName && (
                <p className="text-sm text-destructive">
                  {errors.schoolName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibleName">Nome do responsável</Label>

              <Input
                id="responsibleName"
                placeholder="Nome de quem fará o atendimento"
                autoComplete="name"
                aria-invalid={Boolean(errors.responsibleName)}
                {...register("responsibleName")}
              />

              {errors.responsibleName && (
                <p className="text-sm text-destructive">
                  {errors.responsibleName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>

              <Input
                id="phone"
                type="tel"
                placeholder="(34) 99999-9999"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="childrenCount">
                Número aproximado de crianças
              </Label>

              <Input
                id="childrenCount"
                inputMode="numeric"
                placeholder="Ex.: 120"
                aria-invalid={Boolean(errors.childrenCount)}
                {...register("childrenCount")}
              />

              {errors.childrenCount && (
                <p className="text-sm text-destructive">
                  {errors.childrenCount.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              <MessageCircle aria-hidden="true" />

              {isSubmitting
                ? "Preparando mensagem..."
                : "Solicitar proposta"}
            </Button>

            {sent && (
              <p
                role="status"
                className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary"
              >
                A mensagem foi aberta no WhatsApp. Caso nada tenha aparecido,
                verifique se o navegador bloqueou a nova janela.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}