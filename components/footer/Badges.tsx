"use client";

import { useTranslations } from "next-intl";

export default function Badges() {
  const t = useTranslations("Footer.Badges");

  return (
    <div className="py-6 flex justify-center w-full flex-wrap gap-2">
      <a
        href="https://firstlook.tools"
        title={t("featuredOnFirstLook")}
        target="_blank"
      >
        <img
          src="https://firstlook.tools/badge/badge_light.svg"
          alt={t("featuredOnFirstLook")}
          width="200"
          height="54"
        />
      </a>
    </div>
  );
}
