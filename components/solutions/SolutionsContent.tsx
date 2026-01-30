"use client";

import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle,
  Cpu,
  Database,
  FileText,
  Layers,
  Lock,
  Mail,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import CTASection from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================
type ProductFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Product = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  badgeColor?: "flagship" | "popular" | "enterprise";
  imageFront: string;
  imageBack: string;
  imageBackLight: string;
  features: ProductFeature[];
};

type DataService = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
};

const PRISMA_FEATURES: { key: string; icon: LucideIcon }[] = [
  { key: "multiDocQA", icon: Brain },
  { key: "knowledgeSynthesis", icon: Sparkles },
  { key: "lightningFast", icon: Zap },
  { key: "enterpriseSecurity", icon: Lock }
];

const SMART_EMAIL_FEATURES: { key: string; icon: LucideIcon }[] = [
  { key: "smartClassification", icon: Mail },
  { key: "priorityDetection", icon: Target },
  { key: "autoRouting", icon: Bot },
  { key: "analyticsDashboard", icon: TrendingUp }
];

const SMART_INVOICE_FEATURES: { key: string; icon: LucideIcon }[] = [
  { key: "ocrExtraction", icon: FileText },
  { key: "sapIntegration", icon: Cpu },
  { key: "smartValidation", icon: CheckCircle },
  { key: "approvalWorkflows", icon: Zap }
];

const DATA_SERVICE_ICONS: Record<string, LucideIcon> = {
  dataGovernance: Shield,
  dataLakehouse: Database,
  dataIntegration: Layers
};

// ============================================
// Components
// ============================================
const SolutionsHero = ({ t }: { t: ReturnType<typeof useTranslations<"Solutions">> }) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-gray-950 py-28 lg:py-52 px-4 sm:px-6 lg:px-8 flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top right,
              rgba(70, 130, 180, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 z-0 dark:block hidden"
        style={{
          background: "rgb(3, 7, 18)",
          backgroundImage: `
            radial-gradient(
              circle at top right,
              rgba(70, 130, 180, 0.3),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 text-sm font-medium border-border/60"
            >
              {t("hero.badge")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
          >
            {t("hero.headline")}
            <br />
            <span className="text-[#276df0]">{t("hero.headlineHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg leading-relaxed md:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              asChild
              className="bg-[linear-gradient(135deg,#0f1e35,#276df0)] px-6 py-5 text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-105"
            >
              <a href="#ai-products" aria-label={t("hero.exploreAIProducts")}>
                {t("hero.exploreAIProducts")}
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="px-6 py-5 text-base">
              <a href="#data-services" aria-label={t("hero.viewDataServices")}>
                {t("hero.viewDataServices")}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductShowcase = ({
  product,
  index,
  t,
}: {
  product: Product;
  index: number;
  t: ReturnType<typeof useTranslations<"Solutions">>;
}) => {
  const getBadgeStyles = (color?: string) => {
    switch (color) {
      case "flagship":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400";
      case "popular":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400";
      case "enterprise":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400";
      default:
        return "";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <div>
            {product.badge && (
              <Badge
                className={cn(
                  "mb-4 text-xs font-medium",
                  getBadgeStyles(product.badgeColor)
                )}
              >
                {product.badge}
              </Badge>
            )}
            <h2 className="text-4xl font-semibold text-foreground">
              {product.title}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {product.tagline}
            </p>
          </div>
          <p className="max-w-sm text-muted-foreground sm:ml-auto">
            {product.description}
          </p>
        </div>

        <div className="px-3 pt-3 md:-mx-8">
          <div className="relative aspect-[88/36] mask-b-from-75% mask-b-to-95%">
            <Image
              src={product.imageFront}
              className="absolute inset-0 z-10"
              alt={`${product.title} interface`}
              width={2797}
              height={1137}
            />
            <Image
              src={product.imageBack}
              className="hidden dark:block"
              alt={`${product.title} background dark`}
              width={2797}
              height={1137}
            />
            <Image
              src={product.imageBackLight}
              className="dark:hidden"
              alt={`${product.title} background light`}
              width={2797}
              height={1137}
            />
          </div>
        </div>

        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          {product.features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={feature.title} className="space-y-3">
                <div className="flex items-center gap-2">
                  <FeatureIcon className="size-4 text-[#276df0]" />
                  <h3 className="text-sm font-medium text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            asChild
            className="bg-[linear-gradient(135deg,#0f1e35,#276df0)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-105"
          >
            <Link href="/contact" aria-label={`Learn more about ${product.title}`}>
              {t("cta.learnMoreGetStarted")}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

const ServiceCard = ({ service }: { service: DataService }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:border-border hover:shadow-md">
        <CardContent className="p-6 md:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#276df0]/10 to-[#8b5cf6]/10 text-[#276df0] transition-transform duration-300 group-hover:scale-105">
            <Icon className="size-7" aria-hidden />
          </div>

          <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
            {service.title}
          </h3>
          <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
            {service.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {service.benefits.map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                {benefit}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function SolutionsContent() {
  const t = useTranslations("Solutions");

  const aiProducts: Product[] = [
    {
      id: "prisma-ai",
      title: t("products.prismaAI.title"),
      tagline: t("products.prismaAI.tagline"),
      description: t("products.prismaAI.description"),
      badge: t("badges.flagship"),
      badgeColor: "flagship",
      imageFront: "/prisma/Prisma -1.png",
      imageBack: "/prisma/Primsa -6.png",
      imageBackLight: "/prisma/Prisma -7.png",
      features: PRISMA_FEATURES.map(({ key, icon }) => ({
        icon,
        title: t(`products.prismaAI.features.${key}.title`),
        description: t(`products.prismaAI.features.${key}.description`),
      })),
    },
    {
      id: "smart-email",
      title: t("products.smartEmail.title"),
      tagline: t("products.smartEmail.tagline"),
      description: t("products.smartEmail.description"),
      badge: t("badges.popular"),
      badgeColor: "popular",
      imageFront: "/smartemail/Email Intelligence - 1.png",
      imageBack: "/smartemail/Email Intelligence - 2.png",
      imageBackLight: "/smartemail/Email Intelligence - 2.png",
      features: SMART_EMAIL_FEATURES.map(({ key, icon }) => ({
        icon,
        title: t(`products.smartEmail.features.${key}.title`),
        description: t(`products.smartEmail.features.${key}.description`),
      })),
    },
    {
      id: "smart-invoice",
      title: t("products.smartInvoice.title"),
      tagline: t("products.smartInvoice.tagline"),
      description: t("products.smartInvoice.description"),
      badge: t("badges.enterprise"),
      badgeColor: "enterprise",
      imageFront: "/smartinvoice/Invoice Product.png",
      imageBack: "/smartinvoice/Invoice Product.png",
      imageBackLight: "/smartinvoice/Invoice Product.png",
      features: SMART_INVOICE_FEATURES.map(({ key, icon }) => ({
        icon,
        title: t(`products.smartInvoice.features.${key}.title`),
        description: t(`products.smartInvoice.features.${key}.description`),
      })),
    },
  ];

  const dataServices: DataService[] = (
    ["dataGovernance", "dataLakehouse", "dataIntegration"] as const
  ).map((id) => ({
    id,
    title: t(`dataServices.${id}.title`),
    description: t(`dataServices.${id}.description`),
    icon: DATA_SERVICE_ICONS[id],
    benefits: t.raw(`dataServices.${id}.benefits`) as string[],
  }));

  return (
    <>
      <SolutionsHero t={t} />
      <section
        id="ai-products"
        className="relative w-full bg-background py-16 sm:py-20 lg:py-32"
        aria-labelledby="ai-products-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-xs font-semibold tracking-wider uppercase"
              >
                {t("aiProductsSection.badge")}
              </Badge>
            </motion.div>
            <motion.h2
              id="ai-products-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
            >
              {t("aiProductsSection.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t("aiProductsSection.subtitle")}
            </motion.p>
          </div>

          <div className="space-y-16 md:space-y-32">
            {aiProducts.map((product, index) => (
              <ProductShowcase key={product.id} product={product} index={index} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="data-services"
        className="w-full bg-background py-16 sm:py-20 lg:py-32"
        aria-labelledby="data-services-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:gap-20">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  variant="outline"
                  className="mb-4 px-3 py-1 text-xs font-semibold tracking-wider uppercase"
                >
                  {t("dataServicesSection.badge")}
                </Badge>
              </motion.div>
              <motion.h2
                id="data-services-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
              >
                {t("dataServicesSection.title")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-base sm:text-lg text-muted-foreground"
              >
                {t("dataServicesSection.subtitle")}
              </motion.p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dataServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Button
                asChild
                className="bg-[linear-gradient(135deg,#0f1e35,#276df0)] px-6 py-5 text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-105"
              >
                <Link href="/contact" aria-label={t("cta.getStarted")}>
                  {t("cta.getStarted")}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
