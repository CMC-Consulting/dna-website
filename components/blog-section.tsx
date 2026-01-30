"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  slug: string;
  featured?: boolean;
};

const BLOG_POST_IDS = ["1", "2", "3", "4", "5"] as const;
const BLOG_POST_CONFIG: Record<
  string,
  { slug: string; image: string; authorImage: string; featured: boolean }
> = {
  "1": {
    slug: "generative-ai-sap-enterprise-workflows",
    image: "/blog/1.jpg",
    authorImage: "/testimonials/amy-chase.webp",
    featured: true,
  },
  "2": {
    slug: "real-time-data-pipelines-sap-ai",
    image: "/blog/2.jpg",
    authorImage: "/testimonials/jonas-kotara.webp",
    featured: false,
  },
  "3": {
    slug: "ai-powered-business-intelligence",
    image: "/blog/3.jpg",
    authorImage: "/testimonials/kevin-yam.webp",
    featured: false,
  },
  "4": {
    slug: "sap-data-migration-cloud-strategy",
    image: "/blog/4.jpg",
    authorImage: "/testimonials/kundo-marta.webp",
    featured: false,
  },
  "5": {
    slug: "modern-data-architecture-enterprise",
    image: "/blog/5.jpg",
    authorImage: "/testimonials/amy-chase.webp",
    featured: false,
  },
};

export const BlogSection = () => {
  const t = useTranslations("Home.blogSection");

  const blogPosts: BlogPost[] = BLOG_POST_IDS.map((id) => {
    const config = BLOG_POST_CONFIG[id];
    return {
      id,
      title: t(`posts.${id}.title`),
      excerpt: t(`posts.${id}.excerpt`),
      author: t(`posts.${id}.author`),
      authorRole: t(`posts.${id}.authorRole`),
      authorImage: config.authorImage,
      image: config.image,
      slug: config.slug,
      featured: config.featured,
    };
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section className="bg-gray-50 w-full relative py-16 sm:py-20 lg:py-28">
      {/* Dashed Dual Fade Grid - Bottom Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Dashed Dual Fade Grid - Top Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="group shrink-0 rounded-full border-border bg-background px-6 py-5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Link href="/blog" aria-label={t("readMore")}>
              {t("readMore")}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Featured Post - Left Side */}
          {featuredPost && (
            <div className="flex flex-col">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <Link href={`/blog/${featuredPost.slug}`}>
                <h3 className="mb-4 text-2xl font-bold leading-tight text-foreground transition-colors hover:text-primary md:text-3xl">
                  {featuredPost.title}
                </h3>
              </Link>
              <div className="mt-auto flex items-center gap-3">
                <div className="relative size-10 overflow-hidden rounded-full">
                  <Image
                    src={featuredPost.authorImage}
                    alt={featuredPost.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{featuredPost.author}</p>
                  <p className="text-sm text-muted-foreground">{featuredPost.authorRole}</p>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts - Right Side */}
          <div className="flex flex-col divide-y divide-border">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-5 py-5 first:pt-0 last:pb-0"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted md:size-20">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary md:text-lg">
                  {post.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
