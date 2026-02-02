"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { DashedLine } from "@/components/ui/dashed-line";

type StatItem = { value: string; label: string };

export const AboutHero = () => {
  const t = useTranslations("About.hero");
  const stats = t.raw("stats") as StatItem[];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gray-900 py-28 lg:py-52 px-4 sm:px-6 lg:px-8 flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/about/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Additional Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-black/40" />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        <div className="flex flex-col justify-between gap-16 md:gap-24 lg:flex-row lg:items-center lg:gap-28">
          <div className="flex-[1.5] space-y-8 md:space-y-10">
            <h1 className="font-display leading-[1.1]">
              <span className="block text-white/90 text-sm tracking-[0.2em] sm:text-base md:text-lg lg:text-xl mb-4 uppercase font-medium">
                {t("headline1")}
              </span>
              <span className="block text-white text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-8xl font-bold drop-shadow-lg">
                {t("headlineHighlight")}
              </span>
            </h1>

            <p className="text-white/90 max-w-2xl text-xl leading-[1.7] md:text-2xl md:leading-[1.75] drop-shadow-md">
              {t("subtitle")}
            </p>

            {/* <p className="text-foreground/70 hidden max-w-xl text-lg leading-[1.7] text-balance md:block lg:text-xl lg:leading-[1.75]">
              {t("subtitle2")}
            </p> */}
          </div>

          <div className="relative flex flex-1 flex-col justify-center gap-5 pt-10 lg:pt-0 lg:pl-12">
            <DashedLine
              orientation="vertical"
              className="absolute top-0 left-0 max-lg:hidden opacity-30"
            />
            <DashedLine
              orientation="horizontal"
              className="absolute top-0 lg:hidden opacity-30"
            />
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="font-display text-white text-3xl tracking-wide md:text-4xl lg:text-5xl font-semibold drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm md:text-base lg:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group">
        <span className="text-white/60 text-xs md:text-sm font-medium tracking-[0.2em] uppercase group-hover:text-white/80 transition-colors">Scroll</span>
        <div className="flex flex-col items-center animate-bounce">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-white/80 transition-colors" />
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-white/80 transition-colors -mt-3" />
        </div>
      </div>
    </section>
  );
};
