"use client";

import { Marquee } from "@/components/ui/marquee";
import { useTranslations } from "next-intl";
import Image from "next/image";

type CompanyLogo = string;

const companyLogos: CompanyLogo[] = [
  "/companies/1.jpg",
  "/companies/2.png",
  "/companies/3.png",
  "/companies/4.png",
  "/companies/5.png",
  "/companies/6.png",
  "/companies/7.png",
  "/companies/8.png",
  "/companies/9.png",
  "/companies/10.png",
  "/companies/11.png",
  "/companies/12.png",
  "/companies/13.png",
  "/companies/14.png",
  "/companies/15.png",
  "/companies/16.png",
  "/companies/17.png",
  "/companies/18.png",
  "/companies/19.png",
  "/companies/20.png",
  "/companies/21.png",
  "/companies/22.png",
  "/companies/23.png",
  "/companies/24.png",
  "/companies/25.png",
];

const LogoCloud = () => {
  const t = useTranslations("Home.logoCloud");

  return (
    <section className="w-full bg-background py-16 sm:py-20 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="space-y-6 sm:space-y-8">
            <Marquee
              pauseOnHover
              className="[--duration:40s] [&_img]:mr-8 sm:[&_img]:mr-10 lg:[&_img]:mr-12 mask-x-from-70% mask-x-to-90%"
            >
              {companyLogos.map((logoSrc, index) => (
                <Image
                  key={logoSrc}
                  src={logoSrc}
                  alt={`Company logo ${index + 1}`}
                  width={160}
                  height={80}
                  className="h-10 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              reverse
              className="[--duration:40s] [&_img]:mr-8 sm:[&_img]:mr-10 lg:[&_img]:mr-12 mask-x-from-70% mask-x-to-90%"
            >
              {companyLogos
                .slice()
                .reverse()
                .map((logoSrc, index) => (
                  <Image
                    key={`${logoSrc}-reverse`}
                    src={logoSrc}
                    alt={`Company logo ${companyLogos.length - index}`}
                    width={160}
                    height={80}
                    className="h-10 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                  />
                ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
