"use client";

import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from "@/components/logos";
import { Marquee } from "@/components/ui/marquee";
import { useTranslations } from "next-intl";

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
              className="[--duration:40s] [&_svg]:mr-8 sm:[&_svg]:mr-10 lg:[&_svg]:mr-12 mask-x-from-70% mask-x-to-90%"
            >
              <Logo01 />
              <Logo02 />
              <Logo03 />
              <Logo04 />
              <Logo05 />
              <Logo06 />
              <Logo07 />
              <Logo08 />
            </Marquee>
            <Marquee
              pauseOnHover
              reverse
              className="[--duration:40s] [&_svg]:mr-8 sm:[&_svg]:mr-10 lg:[&_svg]:mr-12 mask-x-from-70% mask-x-to-90%"
            >
              <Logo01 />
              <Logo02 />
              <Logo03 />
              <Logo04 />
              <Logo05 />
              <Logo06 />
              <Logo07 />
              <Logo08 />
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
