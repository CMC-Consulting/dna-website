"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { ArrowRight, Database, Layers, Shield, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type DataServiceKey = "governance" | "lakehouse" | "integration";

type DataServiceItem = {
  key: DataServiceKey;
  icon: LucideIcon;
};

const DATA_SERVICE_ITEMS: DataServiceItem[] = [
  { key: "governance", icon: Shield },
  { key: "lakehouse", icon: Database },
  { key: "integration", icon: Layers },
];

const DataServices = () => {
  const t = useTranslations("Home.dataServices");

  return (
    <section className="w-full bg-background py-16 sm:py-20 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mb-12 flex flex-col items-center justify-center gap-4 text-center sm:mb-16"
        >
          {/* <Badge
            variant="outline"
            className="h-auto px-3 py-1 text-sm font-semibold uppercase tracking-wider"
          >
            {t("badge")}
          </Badge> */}
          <Badge variant={"outline"} className="px-3 py-1 h-auto text-sm bg-muted text-foreground border-border/60 rounded-full">
            {t("badge")}
          </Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>          
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DATA_SERVICE_ITEMS.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <Card className="h-full border border-border border-t-4 border-t-transparent py-10 transition-all duration-300 hover:border-t-primary hover:border-primary/50 hover:shadow-lg">
                <CardContent className="flex flex-col gap-6 px-8">
                  <Icon className="h-8 w-8 text-primary" strokeWidth={1.2} />
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-base font-normal text-muted-foreground">
                      {t(`items.${key}.content`)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <Button
            asChild
            size="lg"
            className="group rounded-full bg-[#276df0] px-6 py-5 text-base font-semibold text-white shadow-md transition hover:bg-[#1e5bc7] hover:shadow-lg"
          >
            <Link
              href="/solutions#data-services"
              className="inline-flex items-center gap-2"
            >
              {t("cta")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DataServices;
