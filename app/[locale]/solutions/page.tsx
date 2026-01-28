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
import Image from "next/image";

import CTASection from "@/components/cta-section";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

// ============================================
// Data
// ============================================
const aiProducts: Product[] = [
  {
    id: "prisma-ai",
    title: "Prisma AI",
    tagline: "Your Intelligent Knowledge Assistant",
    description:
      "Transform how your team accesses and synthesizes information. Like NotebookLM, Prisma AI helps you extract insights from multiple documents through natural conversations.",
    badge: "Flagship",
    badgeColor: "flagship",
    imageFront: "/og.png",
    imageBack: "/og.png",
    imageBackLight: "/og.png",
    features: [
      {
        icon: Brain,
        title: "Multi-Document Q&A",
        description:
          "Ask questions across multiple documents and get answers with source citations.",
      },
      {
        icon: Sparkles,
        title: "Knowledge Synthesis",
        description:
          "Automatically synthesize information from various sources into coherent insights.",
      },
      {
        icon: Zap,
        title: "Lightning Fast",
        description:
          "Get instant answers powered by advanced RAG and vector search technology.",
      },
      {
        icon: Lock,
        title: "Enterprise Security",
        description:
          "Your data stays secure with enterprise-grade encryption and access controls.",
      },
    ],
  },
  {
    id: "smart-email",
    title: "Smart Email",
    tagline: "Intelligent Email Management",
    description:
      "Never miss important emails again. Our AI automatically classifies, prioritizes, and routes emails so your team can focus on what matters most.",
    badge: "Popular",
    badgeColor: "popular",
    imageFront: "/og.png",
    imageBack: "/og.png",
    imageBackLight: "/og.png",
    features: [
      {
        icon: Mail,
        title: "Smart Classification",
        description:
          "Automatically categorize emails by topic, urgency, and department.",
      },
      {
        icon: Target,
        title: "Priority Detection",
        description:
          "AI identifies critical emails and surfaces them instantly to the right people.",
      },
      {
        icon: Bot,
        title: "Auto-Routing",
        description:
          "Route emails to the right team or department based on content and context.",
      },
      {
        icon: TrendingUp,
        title: "Analytics Dashboard",
        description:
          "Track email volumes, response times, and team performance metrics.",
      },
    ],
  },
  {
    id: "smart-invoice",
    title: "Smart Invoice",
    tagline: "Invoice Intelligence Suite for SAP",
    description:
      "Reduce invoice processing time by 80%. Automate extraction, validation, and approval workflows with seamless SAP integration.",
    badge: "Enterprise",
    badgeColor: "enterprise",
    imageFront: "/og.png",
    imageBack: "/og.png",
    imageBackLight: "/og.png",
    features: [
      {
        icon: FileText,
        title: "OCR Extraction",
        description:
          "Extract data from invoices with 99%+ accuracy using advanced OCR technology.",
      },
      {
        icon: Cpu,
        title: "SAP Integration",
        description:
          "Native integration with SAP for seamless data flow and real-time updates.",
      },
      {
        icon: CheckCircle,
        title: "Smart Validation",
        description:
          "Automatically validate invoice data against purchase orders and contracts.",
      },
      {
        icon: Zap,
        title: "Approval Workflows",
        description:
          "Intelligent routing and approval workflows that adapt to your business rules.",
      },
    ],
  },
];

const dataServices: DataService[] = [
  {
    id: "data-governance",
    title: "Data Governance",
    description:
      "Establish robust data governance frameworks with policies, standards, and controls to ensure data quality, security, and compliance across your organization.",
    icon: Shield,
    benefits: [
      "Data quality management",
      "Metadata management",
      "Compliance & privacy",
      "Data lineage tracking",
    ],
  },
  {
    id: "data-lakehouse",
    title: "Data Lakehouse",
    description:
      "Modern data architecture combining the flexibility of data lakes with the reliability of data warehouses for unified analytics and AI workloads.",
    icon: Database,
    benefits: [
      "Unified storage layer",
      "ACID transactions",
      "Cost optimization",
      "Schema enforcement",
    ],
  },
  {
    id: "data-integration",
    title: "Data Integration",
    description:
      "Seamless data integration services connecting disparate systems, enabling real-time data flows, and ensuring data consistency across your enterprise.",
    icon: Layers,
    benefits: [
      "ETL/ELT pipelines",
      "Real-time streaming",
      "API integration",
      "Data transformation",
    ],
  },
];

// ============================================
// Components
// ============================================
const SolutionsHero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-gray-950 py-28 lg:py-52 px-4 sm:px-6 lg:px-8 flex items-center">
      {/* Cool Blue Glow Background */}
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
              AI & Data Solutions
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
          >
            Transform Your Business
            <br />
            <span className="text-[#276df0]">with AI & Data</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg leading-relaxed md:text-xl"
          >
            Discover our suite of AI-powered products and enterprise data
            services designed to accelerate your digital transformation journey.
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
              <a href="#ai-products" aria-label="Explore AI Products">
                Explore AI Products
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="px-6 py-5 text-base">
              <a href="#data-services" aria-label="View Data Services">
                View Data Services
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductShowcase = ({ product, index }: { product: Product; index: number }) => {
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
        {/* Header */}
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

        {/* Image Showcase */}
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

        {/* Features Grid */}
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

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Button
            asChild
            className="bg-[linear-gradient(135deg,#0f1e35,#276df0)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-105"
          >
            <Link href="/contact" aria-label={`Learn more about ${product.title}`}>
              Learn More & Get Started
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

const AIProductsSection = () => {
  return (
    <section
      id="ai-products"
      className="relative w-full bg-background py-16 sm:py-20 lg:py-32"
      aria-labelledby="ai-products-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              AI Products
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
            Intelligent Automation Suite
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Enterprise-ready AI products designed to automate workflows, enhance
            productivity, and drive business outcomes.
          </motion.p>
        </div>

        {/* Product Showcases */}
        <div className="space-y-16 md:space-y-32">
          {aiProducts.map((product, index) => (
            <ProductShowcase key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
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

const DataServicesSection = () => {
  return (
    <section
      id="data-services"
      className="w-full bg-background py-16 sm:py-20 lg:py-32"
      aria-labelledby="data-services-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-20">
          {/* Top Content */}
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
                Data Services
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
              Enterprise Data Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-muted-foreground"
            >
              Build a solid data foundation with our comprehensive data
              services. From governance to integration, we help you unlock the
              full potential of your data assets.
            </motion.p>
          </div>

          {/* Service Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dataServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* CTA */}
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
              <Link href="/contact" aria-label="Get started with data services">
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// Main Page Component
// ============================================
export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <AIProductsSection />
      <DataServicesSection />
      <CTASection />
    </>
  );
}
