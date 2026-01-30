import SolutionsContent from "@/components/solutions/SolutionsContent";
import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{
  locale: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions" });

  return constructMetadata({
    page: "Solutions",
    title: t("title"),
    description: t("description"),
    locale: locale as Locale,
    path: `/solutions`,
    canonicalUrl: `/solutions`,
  });
}

export default async function SolutionsPage(_props: { params: Params }) {
  return <SolutionsContent />;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}
