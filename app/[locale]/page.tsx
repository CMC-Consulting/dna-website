import HomeComponent from "@/components/home";
import { LOCALES } from "@/i18n/routing";

type Params = Promise<{ locale: string }>;

export default async function Home({ params }: { params: Params }) {
  const { locale } = await params;
  return <HomeComponent locale={locale} />;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
