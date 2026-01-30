"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type AIFeatureItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const AI_PRODUCT_KEYS = ["prismaAI", "smartEmail", "smartInvoice"] as const;

// Individual Feature Card Component
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

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, y }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow will-change-transform"
    >
      <div className="p-6 sm:p-8">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted mb-3">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

const AIFeature = ({ className = "" }: { className?: string }) => {
  const t = useTranslations("Home.aiFeature");

  const aiProducts: AIFeatureItem[] = AI_PRODUCT_KEYS.map((key) => ({
    title: t(`products.${key}.title`),
    description: t(`products.${key}.description`),
    image: "/og.png",
    imageAlt: t(`products.${key}.imageAlt`),
  }));

  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-48", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-48 lg:self-start flex-shrink-0 lg:w-1/2">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-muted text-foreground rounded-full border border-border/60">
                {t("badge")}
              </span>
              <h2 className="text-balance text-4xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
                {t("title")}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                {t("subtitle")}
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/solutions">{t("exploreSolutions")}</Link>
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
