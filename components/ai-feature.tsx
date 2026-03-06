"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowRight, Brain, FileText, Mail, type LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type AIFeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  featurePills: string[];
};

const AI_PRODUCT_CONFIG = [
  {
    key: "prismaAI" as const,
    icon: Brain,
    featureKeys: ["multiDocQA", "knowledgeSynthesis"],
  },
  {
    key: "smartEmail" as const,
    icon: Mail,
    featureKeys: ["smartClassification", "priorityDetection"],
  },
  {
    key: "smartInvoice" as const,
    icon: FileText,
    featureKeys: ["ocrExtraction", "sapIntegration"],
  },
] as const;

function FeatureCard({ item }: { item: AIFeatureItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8],
    [0, 1, 1, 0.3, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8],
    [0.8, 1, 1, 0.95, 0.9]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8],
    [100, 0, 0, -30, -80]
  );

  const IconComponent = item.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, y }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow will-change-transform"
    >
      <div className="p-6 sm:p-8">
        <div
          className="mb-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5"
          aria-hidden
        >
          <IconComponent className="size-7 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {item.description}
        </p>
        {item.featurePills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.featurePills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium text-foreground"
              >
                {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

const AIFeature = ({ className = "" }: { className?: string }) => {
  const t = useTranslations("Home.aiFeature");
  const tSolutions = useTranslations("Solutions");

  const aiProducts: AIFeatureItem[] = AI_PRODUCT_CONFIG.map(
    ({ key, icon, featureKeys }) => ({
      title: t(`products.${key}.title`),
      description: t(`products.${key}.description`),
      icon,
      featurePills: featureKeys.map((fk) =>
        tSolutions(`products.${key}.features.${fk}.title`)
      ),
    })
  );

  return (
    <section
      className={cn("w-full bg-background py-16 sm:py-20 lg:py-48", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="flex-shrink-0 lg:sticky lg:top-48 lg:w-1/2 lg:self-start">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block rounded-full border border-border/60 bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
                {t("badge")}
              </span>
              <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
                {t("title")}
              </h2>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                {t("subtitle")}
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-full bg-[#276df0] px-6 py-5 text-base font-semibold text-white shadow-md transition hover:bg-[#1e5bc7] hover:shadow-lg"
                >
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-2"
                  >
                    {t("exploreSolutions")}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            {aiProducts.map((item, index) => (
              <FeatureCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeature;
