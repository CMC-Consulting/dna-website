"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BorderBeam } from "@/components/ui/border-beam";
import { Database, Layers, Shield } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

type ImageKey = "item-1" | "item-2" | "item-3";

const DATA_ITEM_KEYS: { value: ImageKey; key: "governance" | "lakehouse" | "integration" }[] = [
  { value: "item-1", key: "governance" },
  { value: "item-2", key: "lakehouse" },
  { value: "item-3", key: "integration" },
];

const DataServices = () => {
  const t = useTranslations("Home.dataServices");
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  const images: Record<ImageKey, { image: string; alt: string }> = {
    "item-1": { image: "/og.png", alt: t("items.governance.imageAlt") },
    "item-2": { image: "/og.png", alt: t("items.lakehouse.imageAlt") },
    "item-3": { image: "/og.png", alt: t("items.integration.imageAlt") },
  };

  return (
    <section className="w-full bg-background py-16 sm:py-20 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-balance text-4xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) => setActiveItem(value as ImageKey)}
            className="w-full"
          >
            {DATA_ITEM_KEYS.map(({ value, key }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-base">
                    {key === "governance" && <Shield className="size-4" />}
                    {key === "lakehouse" && <Database className="size-4" />}
                    {key === "integration" && <Layers className="size-4" />}
                    {t(`items.${key}.title`)}
                  </div>
                </AccordionTrigger>
                <AccordionContent>{t(`items.${key}.content`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
            <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                >
                  <Image
                    src={images[activeItem].image}
                    className="size-full object-cover object-left-top dark:mix-blend-lighten"
                    alt={images[activeItem].alt}
                    width={1207}
                    height={929}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam duration={15} size={250} borderWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataServices;
