import { ContactForm } from "@/components/blocks/contact-form";
import TeamSection from "@/components/contact/team";
import CTASection from "@/components/cta-section";
import { DashedLine } from "@/components/ui/dashed-line";
import { Link, Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Facebook, Linkedin } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "Contact" });

  return constructMetadata({
    page: "Contact",
    title: t("title"),
    description: t("description"),
    locale: locale as Locale,
    path: `/contact`,
    canonicalUrl: `/contact`,
  });
}

export default async function Contact({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  const contactInfo = [
    {
      title: t("info.office.title"),
      content: (
        <p className="text-muted-foreground mt-3">
          {t("info.office.address")}
        </p>
      ),
    },
    {
      title: t("info.email.title"),
      content: (
        <div className="mt-3">
          <div>
            <p className="">{t("info.email.careers.label")}</p>
            <Link
              href={`mailto:${t("info.email.careers.email")}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("info.email.careers.email")}
            </Link>
          </div>
          <div className="mt-1">
            <p className="">{t("info.email.press.label")}</p>
            <Link
              href={`mailto:${t("info.email.press.email")}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("info.email.press.email")}
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: t("info.social.title"),
      content: (
        <div className="mt-3 flex gap-6 lg:gap-10">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="size-5" />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          {t("description")}
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium">{info.title}</h2>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Inquiry Form */}
        <div className="mx-auto">
          <h2 className="mb-4 text-lg font-semibold">{t("form.title")}</h2>
          <ContactForm />
        </div>

        <DashedLine className="my-12" />
      </div>
      <TeamSection />
      <CTASection />
    </section>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}
