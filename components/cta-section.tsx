"use client";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import MainButton from "./ui/main-button";

const CTASection = () => {
  const t = useTranslations("CTASection");
  const titleId = "ready-to-build-title";

  return (
    <section aria-labelledby={titleId} className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-[linear-gradient(135deg,#276df0,#c3d6f6)] shadow-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 p-8 sm:p-10 md:flex-row md:items-center md:gap-12 lg:gap-16 lg:p-14">
            <div className="max-w-2xl">
              <h2
                id={titleId}
                className={cn(
                  "text-balance text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-[#a3c4fa]",
                )}
              >
                {t("title")}{" "}
                <span className="text-white">{t("titleHighlight")}</span>
              </h2>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href="/contact">
                  <MainButton
                    text={t("requestDemo")}
                    size="small"
                    className="border-none rounded-[12px] bg-[#5a94f5]/40 hover:bg-[#5a94f5]/60"
                  />
                </Link>
                <Link href="/contact">
                  <MainButton
                    text={t("talkToSales")}
                    size="small"
                    className="rounded-[12px] border border-[#EDEEF0] bg-white hover:bg-white/90 text-[#31373D]"
                  />
                </Link>
              </div>
            </div>

            <div className="w-full max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-md shrink-0">
              <img
                src="/ready_to_build.png"
                alt={t("imageAlt")}
                className="w-full h-auto select-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
