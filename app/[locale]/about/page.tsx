import About from "@/components/blocks/about";
import { AboutHero } from "@/components/blocks/about-hero";
import { ParallaxImage } from "@/components/blocks/parallax-image";
import TeamSection from "@/components/contact/team";
import CTASection from "@/components/cta-section";
import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

type MetadataProps = { params: Params };

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return constructMetadata({
    page: "About",
    title: t("title"),
    description: t("description"),
    locale: locale as Locale,
    path: `/about`,
    canonicalUrl: `/about`,
  });
}

export default async function AboutPage(_props: { params: Params }) {
  return (
    <>
      <AboutHero />
      <About />
      <ParallaxImage
        imageSrc="/about/cmcc.jpg"
        imageAlt="CMC Consulting Office"
        height="h-[400px] md:h-[500px] lg:h-[600px]"
        overlayOpacity={0.2}
      />
      <TeamSection />
      <CTASection />
    </>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
