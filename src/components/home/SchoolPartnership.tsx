import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildSchoolMessage, buildWhatsappUrl, isWhatsappConfigured } from "@/lib/whatsapp";
import { generateOrderCode } from "@/lib/order-code";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

const schema = z.object({
  schoolName: z.string().trim().min(2, "Informe o nome da escola").max(120),
  responsibleName: z.string().trim().min(2, "Informe o responsável").max(120),
  phone: z.string().trim().min(8, "Telefone inválido").max(30),
  childrenCount: z.string().trim().max(20).optional().or(z.literal("")),
});

type Values = z.infer<typeof schema>;

export function SchoolPartnership() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = (v: Values) => {
    if (!isWhatsappConfigured()) {
      toast.error("WhatsApp não configurado");
      return;
    }
    const code = generateOrderCode("PAR");
    const url = buildWhatsappUrl(
      buildSchoolMessage({
        code,
        schoolName: v.schoolName,
        responsibleName: v.responsibleName,
        phone: v.phone,
        childrenCount: v.childrenCount || undefined,
      }),
    );
    track("school_contact_clicked", { code });
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden bg-[var(--brand-secondary)] py-16 text-primary-foreground md:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
            Para escolas
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Uma parceria que vai além do lanche.
          </h2>
          <p className="mt-4 max-w-xl text-base opacity-90">
            Atendemos escolas com planejamento de quantidade, possibilidade de
            frequência recorrente e comunicação próxima com a instituição.
            Adaptamos cardápios conforme a operação e a realidade da escola.
          </p>
          <ul className="mt-6 grid gap-2 text-sm opacity-90 sm:grid-cols-2">
            <li>• Planejamento por turma e por turno</li>
            <li>• Cardápios adaptáveis</li>
            <li>• Frequência semanal ou pontual</li>
            <li>• Comunicação direta com a coordenação</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl bg-background p-6 text-foreground shadow-2xl"
          noValidate
        >
          <h3 className="font-display text-xl font-bold">Solicitar uma conversa</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha e enviaremos uma mensagem pronta no WhatsApp.
          </p>
          <div className="mt-5 grid gap-3">
            <div>
              <Label htmlFor="schoolName">Nome da escola</Label>
              <Input id="schoolName" {...register("schoolName")} className="mt-1" />
              {errors.schoolName && (
                <p className="mt-1 text-xs text-destructive">{errors.schoolName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="responsibleName">Nome do responsável</Label>
              <Input id="responsibleName" {...register("responsibleName")} className="mt-1" />
              {errors.responsibleName && (
                <p className="mt-1 text-xs text-destructive">{errors.responsibleName.message}</p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" inputMode="tel" {...register("phone")} className="mt-1" />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="childrenCount">Nº aproximado de crianças</Label>
                <Input
                  id="childrenCount"
                  inputMode="numeric"
                  {...register("childrenCount")}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            variant="whatsapp"
            size="lg"
            className="mt-5 w-full"
            disabled={isSubmitting}
          >
            <MessageCircle aria-hidden="true" /> Solicitar conversa
          </Button>
          {sent && (
            <p className="mt-3 text-xs text-muted-foreground">
              Mensagem aberta no WhatsApp. Caso a janela não tenha aparecido, verifique seu navegador.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
