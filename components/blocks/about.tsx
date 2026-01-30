"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const About = () => {
  const t = useTranslations("About.content");
  const teamParagraphs = t.raw("teamParagraphs") as string[];
  const missionParagraphs = t.raw("missionParagraphs") as string[];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl flex flex-col-reverse gap-8 md:gap-14 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
          <ImageSection
            images={[
              { src: "/about/1.webp", alt: t("imageAlt.teamCollaboration") },
              { src: "/about/2.webp", alt: t("imageAlt.teamWorkspace") },
            ]}
            className="xl:-translate-x-10"
          />

          <TextSection
            title={t("teamTitle")}
            paragraphs={teamParagraphs}
          />
        </div>

        <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
          <TextSection paragraphs={missionParagraphs} />
          <ImageSection
            images={[
              { src: "/about/3.webp", alt: t("imageAlt.modernWorkspace") },
              { src: "/about/4.webp", alt: t("imageAlt.teamCollaboration2") },
            ]}
            className="hidden lg:flex xl:translate-x-10"
          />
        </div>
      </div>
    </section>
  );
};

export default About;

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <section className="flex-1 space-y-4 text-lg md:space-y-6">
      {title && <h2 className="font-display text-foreground text-3xl sm:text-4xl tracking-tight">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Link href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
