import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getPosts } from "@/lib/getBlogs";

type BlogSectionProps = {
  locale: string;
};

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  dateTime: string;
  date: string;
};

export const BlogSection = async ({ locale }: BlogSectionProps) => {
  const t = await getTranslations({ locale, namespace: "Home.blogSection" });
  const { posts } = await getPosts(locale);
  const metaLabel = t("metaLabel");
  const dateFormatter = new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const parsePostDate = (dateValue?: string | Date) => {
    if (!dateValue) {
      return null;
    }

    if (dateValue instanceof Date) {
      if (Number.isNaN(dateValue.getTime())) {
        return null;
      }

      return dateValue;
    }

    const trimmedValue = dateValue.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
      const [year, month, day] = trimmedValue.split("-").map(Number);
      return new Date(Date.UTC(year, month - 1, day));
    }

    const parsedDate = new Date(trimmedValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate;
  };

  const blogPosts: BlogPost[] = posts.map((post) => {
    const parsedDate = parsePostDate(post.date);

    return {
      id: post.slug,
      title: post.title,
      excerpt: post.description ?? "",
      image: post.image || "/blog/1.jpg",
      slug: post.slug,
      dateTime: parsedDate ? parsedDate.toISOString() : "",
      date: parsedDate ? dateFormatter.format(parsedDate) : "",
    };
  });

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1, 5);

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
                href={`/blog${featuredPost.slug}`}
                className="group relative mb-6 aspect-video overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <Link href={`/blog${featuredPost.slug}`}>
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium">
                  <span className="text-muted-foreground">{metaLabel}</span>
                  {featuredPost.date && (
                    <>
                      <span aria-hidden="true" className="text-border">•</span>
                      <time dateTime={featuredPost.dateTime} className="text-[#276df0]">
                        {featuredPost.date}
                      </time>
                    </>
                  )}
                </div>
                <h3 className="mb-4 text-2xl font-bold leading-[1.25] text-foreground transition-colors hover:text-primary md:text-3xl">
                  {featuredPost.title}
                </h3>
              </Link>
              {featuredPost.excerpt && (
                <p className="mt-2 text-base text-muted-foreground md:text-lg">
                  {featuredPost.excerpt}
                </p>
              )}
            </div>
          )}

          {/* Regular Posts - Right Side */}
          <div className="flex flex-col divide-y divide-border">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog${post.slug}`}
                className="group flex items-start gap-5 py-5 first:pt-0 last:pb-0"
              >
                <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-muted md:w-40">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em]">
                    <span className="text-muted-foreground">{metaLabel}</span>
                    {post.date && (
                      <>
                        <span aria-hidden="true" className="text-border">•</span>
                        <time dateTime={post.dateTime} className="text-[#276df0]">
                          {post.date}
                        </time>
                      </>
                    )}
                  </div>
                  <p className="text-base font-medium leading-7 text-foreground transition-colors group-hover:text-primary md:text-lg">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
