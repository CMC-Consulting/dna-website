"use client";

import {
  PlugZap,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type WhyUsVariant = "chips" | "list";

type WhyUsReason = {
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

const REASON_KEYS = [
  { key: "aiFirst", icon: Sparkles },
  { key: "enterpriseReady", icon: ShieldCheck },
  { key: "openIntegrable", icon: PlugZap },
  { key: "outcomesDriven", icon: Target },
] as const;

type WhyUsProps = {
  variant?: WhyUsVariant;
  className?: string;
};

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)

export const WhyUs = ({ variant = "chips", className = "" }: WhyUsProps) => {
  const t = useTranslations("Home.whyUs");
  const labelId = "why-us-title";

  const reasons: WhyUsReason[] = REASON_KEYS.map(({ key, icon }) => ({
    title: t(`reasons.${key}.title`),
    description: t(`reasons.${key}.description`),
    bullets: t.raw(`reasons.${key}.bullets`) as string[],
    icon,
  }));

  return (
    <section
      id="why-us"
      aria-labelledby={labelId}
      className={`min-h-screen bg-gray-50 w-full relative py-16 sm:py-20 lg:py-48 ${className}`}
    >
      {/* Dashed Dual Fade Grid - Bottom Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Dashed Dual Fade Grid - Top Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id={labelId} className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {reasons.map((reason) => (
            <Card
              key={reason.title}
              className="group rounded-3xl bg-background/70 shadow-none border-none backdrop-blur transition-all duration-300 hover:bg-background/90 hover:shadow-md"
            >
              <CardContent className="p-6 md:p-8">
                {/* <CardDecorator>
                  <reason.icon className="size-6" aria-hidden />
                </CardDecorator> */}
                <div className="mb-4 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                  <reason.icon className="size-5" />
                </div>

                <div className="mt-6 min-w-0">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed text-sm sm:text-base">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-5">
                  {variant === "chips" ? (
                    <div className="flex flex-wrap gap-2">
                      {reason.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="bg-muted text-foreground inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-xs sm:text-sm font-medium transition-colors hover:bg-muted/80"
                        >
                          {bullet}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm sm:text-base">
                      {reason.bullets.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhyUsChips = (props: Omit<WhyUsProps, "variant">) => (
  <WhyUs {...props} variant="chips" />
);

export const WhyUsList = (props: Omit<WhyUsProps, "variant">) => (
  <WhyUs {...props} variant="list" />
);

