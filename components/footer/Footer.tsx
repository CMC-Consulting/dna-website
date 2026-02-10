"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import Image from "next/image";

type FooterLinkGroup = {
  title: string;
  links: {
    href: string;
    name: string;
    useA?: boolean;
    target?: string;
    rel?: string;
  }[];
};

const Footer = () => {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  const brandName = t("Brand.name");

  const linkGroups = t.raw("Links.groups") as FooterLinkGroup[];

  return (
    <footer className="w-full bg-background border-t border-border/60 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
          <div className="w-full h-full">
            <div className="flex flex-col items-start justify-start md:max-w-[200px]">
              <div className="flex items-center gap-2 text-[#276df0]">
                <Image
                  src="/logos/logo.png"
                  alt={brandName}
                  width={20}
                  height={20}
                  className="h-5 w-auto"
                />
                <span className="text-2xl md:text-lg font-bold">
                  {brandName}
                </span>
              </div>
              <p className="text-muted-foreground mt-4 text-sm text-start">
                {t("Brand.description")}
              </p>
            </div>
          </div>

          <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="w-full h-auto">
                <h3 className="text-base font-medium text-foreground">
                  {t("Columns.Product.title")}
                </h3>
                <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                  <li className="mt-2">
                    <Link
                      href="#"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      {t("Columns.Product.features")}
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="#"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      {t("Columns.Product.pricing")}
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="#"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      {t("Columns.Product.testimonials")}
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="#"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      {t("Columns.Product.supportedLanguages")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full h-auto">
                <div className="mt-10 md:mt-0 flex flex-col">
                  <h3 className="text-base font-medium text-foreground">
                    {t("Columns.Solutions.title")}
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                    <li>
                      <Link
                        href="#"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {t("Columns.Solutions.contentCreators")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="#"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {t("Columns.Solutions.businesses")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="#"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {t("Columns.Solutions.education")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="#"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {t("Columns.Solutions.enterprise")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="w-full h-auto">
                <h3 className="text-base font-medium text-foreground">
                  {t("Columns.Resources.title")}
                </h3>
                <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                  <li className="mt-2">
                    <Link
                      href="/blog"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      {t("Columns.Resources.blog")}
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="#"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      {t("Columns.Resources.translationGuides")}
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="/contact"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      {t("Columns.Resources.support")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full h-auto">
                <div className="mt-10 md:mt-0 flex flex-col">
                  <h3 className="text-base font-medium text-foreground">
                    {t("Columns.Company.title")}
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                    <li>
                      <Link
                        href="/about"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {t("Columns.Company.aboutUs")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/privacy-policy"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {t("Columns.Company.privacyPolicy")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/terms-of-service"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {t("Columns.Company.termsConditions")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60">
          <p className="text-sm text-muted-foreground text-center">
            {t("Copyright", { year, name: brandName })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

