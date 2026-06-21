import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const color = variant === "light" ? "text-primary-foreground" : "text-primary";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 48 48"
        className={cn("h-9 w-9", color)}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 4c10 0 18 8 18 18 0 12-10 22-18 22S6 34 6 22C6 12 14 4 24 4Z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="M16 22c0-5 4-9 8-9s8 4 8 9-4 13-8 13-8-8-8-13Z"
          fill="currentColor"
        />
        <circle cx="20" cy="20" r="1.6" fill="var(--brand-background)" />
        <circle cx="28" cy="22" r="1.4" fill="var(--brand-background)" />
        <path d="M24 8c2 2 2 4 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className={cn("font-display text-lg font-extrabold tracking-tight", color)}>
          Lanchinho Feliz
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Alimentação infantil
        </span>
      </div>
    </div>
  );
}
