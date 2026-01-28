"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type DataFeatureItem = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
};

type DataFeatureProps = {
  badge?: string;
  heading: string;
  subheading: string;
  ctaText?: string;
  ctaHref?: string;
  items: DataFeatureItem[];
  className?: string;
};

// Individual Feature Card Component
function FeatureCard({ item }: { item: DataFeatureItem }) {
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
            alt={item.imageAlt || item.title}
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

export default function DataFeature({
  badge = "FEATURES",
  heading,
  subheading,
  ctaText = "Get Started",
  ctaHref = "#",
  items,
  className = "",
}: DataFeatureProps) {

  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-48", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Fixed Content - Left Side */}
          <div className="lg:sticky lg:top-48 lg:self-start flex-shrink-0 lg:w-1/2">
            <div className="space-y-6 max-w-2xl">
              {badge && (
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-muted text-foreground rounded-full border border-border/60">
                  {badge}
                </span>
              )}
              <h2 className="text-balance text-4xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                {subheading}
              </p>
              {ctaText && (
                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <a href={ctaHref}>{ctaText}</a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Cards - Right Side */}
          <div className="flex-1 space-y-8">
            {items.map((item, index) => (
              <FeatureCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

