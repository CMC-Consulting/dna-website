"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { Link } from "@/i18n/routing";

const Hero = () => {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-gray-950 py-24 sm:py-28 lg:py-40 xl:py-48 px-4 sm:px-6 lg:px-8 flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      <Particles
        className="absolute inset-0 z-[1]"
        quantity={100}
        ease={80}
        color="#000"
        refresh
      />

      <div className="mx-auto max-w-7xl w-full relative z-10 grid gap-y-12 sm:gap-y-16 lg:gap-y-20 gap-x-10 lg:gap-x-16 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6 md:gap-8">
          <h1 className="font-display text-foreground leading-[1.1] tracking-tight">
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground/70">
              {t("headline1")}
            </span>
            <span className="block mt-2 md:mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
              {t("headline2")}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed md:leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-6 md:space-y-8 rounded-2xl border border-border/60 bg-background/80 p-6 md:p-8 lg:p-10 shadow-lg backdrop-blur">
          <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed">
            {t("cardText")}
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              asChild
              className="bg-[linear-gradient(135deg,#0f1e35,#276df0)] px-6 py-5 text-base sm:text-lg font-semibold text-primary-foreground shadow-lg transition hover:brightness-105"
            >
              <Link href="/contact" aria-label={t("getConsultation")}>
                {t("getConsultation")}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="link" className="text-base sm:text-lg font-semibold">
              <Link href="/solutions" aria-label={t("exploreProducts")}>
                {t("exploreProducts")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
