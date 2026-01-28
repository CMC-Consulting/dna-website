"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type AIFeatureItem = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
};

const aiProducts: AIFeatureItem[] = [
  {
    title: "Prisma AI",
    description:
      "Your intelligent knowledge assistant. Like NotebookLM, Prisma AI synthesizes information from multiple documents, providing instant answers and deep insights through natural conversations. Extract knowledge, generate summaries, and get citations across all your enterprise documents.",
    image: "/og.png",
    imageAlt: "Prisma AI interface showing document Q&A and knowledge synthesis",
  },
  {
    title: "Smart Email",
    description:
      "Intelligent email classification system that automatically categorizes, prioritizes, and routes emails. Reduce inbox overload by up to 60% and ensure critical messages never get missed with AI-powered priority detection and smart routing workflows.",
    image: "/og.png",
    imageAlt: "Smart Email dashboard with email classification and priority detection",
  },
  {
    title: "Smart Invoice",
    description:
      "Invoice Intelligence Suite for SAP. Automate invoice processing from extraction to approval with seamless SAP integration. Reduce processing time by 80% with advanced OCR, automatic validation, and intelligent approval workflows.",
    image: "/og.png",
    imageAlt: "Smart Invoice interface showing OCR extraction and SAP integration",
  },
];

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

export default function AIFeature({ className = "" }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-48", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Fixed Content - Left Side */}
          <div className="lg:sticky lg:top-48 lg:self-start flex-shrink-0 lg:w-1/2">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-muted text-foreground rounded-full border border-border/60">
                AI PRODUCTS
              </span>
              <h2 className="text-balance text-4xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
                Intelligent Automation for Enterprise
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                Transform your business operations with our suite of AI-powered products. From document intelligence to email automation and invoice processing, our solutions integrate seamlessly with your existing systems to deliver measurable ROI.
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href="/solutions">Explore Solutions</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Cards - Right Side */}
          <div className="flex-1 space-y-8">
            {aiProducts.map((item, index) => (
              <FeatureCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
