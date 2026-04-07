import { BlogCard } from "@/app/[locale]/blog/BlogCard";
import { InfiniteScrollPosts } from "@/app/[locale]/blog/InfiniteScrollPosts";
import { Button } from "@/components/ui/button";
import { Link, Locale, LOCALES } from "@/i18n/routing";
import { getAllTags, getPostsByTag } from "@/lib/getBlogs";
import { constructMetadata } from "@/lib/metadata";
import { ArrowLeft, BookOpen, Tag } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string; tag: string }>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const t = await getTranslations({ locale, namespace: "BlogTag" });

  return constructMetadata({
    page: "BlogTag",
    title: t("title", { tag }),
    description: t("description", { tag }),
    locale: locale as Locale,
    path: `/blog/tag/${tag}`,
    canonicalUrl: `/blog/tag/${tag}`,
  });
}

export default async function TagPage({ params }: { params: Params }) {
  const { locale, tag } = await params;
  const { posts } = await getPostsByTag(locale, tag);
  const t = await getTranslations("BlogTag");

  const featuredPost = posts.find((post) => post.pin);
  const regularPosts = posts.filter((post) => !post.pin);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/50 to-background w-screen left-1/2 -translate-x-1/2">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="w-full  mt-20 md:mt-32  px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Back Link */}
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {t("backToBlog")}
            </Link>

            {/* Tag Badge */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Tag className="size-4" />
                <span className="max-w-[min(60vw,420px)] truncate">{tag}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("title", { tag })}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t("description", { tag })}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 backdrop-blur">
                <BookOpen className="size-4 text-primary" />
                <span>{t("articlesCount", { count: posts.length })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("sections.featuredArticle")}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
              </div>
              <BlogCard post={featuredPost} locale={locale} featured />
            </div>
          )}

          {/* Section Header */}
          {regularPosts.length > 0 && (
            <div className="mb-10 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("sections.latestArticles")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
            </div>
          )}

          {/* Posts Grid with Infinite Scroll */}
          {regularPosts.length > 0 && (
            <InfiniteScrollPosts
              posts={regularPosts}
              locale={locale}
              initialCount={6}
              loadMoreCount={3}
            />
          )}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-muted">
                <BookOpen className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {t("noArticles")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("noArticlesDescription")}
              </p>
              <Button asChild variant="outline">
                <Link href="/blog">{t("backToBlog")}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];

  for (const locale of LOCALES) {
    const tags = await getAllTags(locale);
    for (const tag of tags) {
      params.push({ locale, tag });
    }
  }

  // Also add predefined important tags for products and services
  const predefinedTags = [
    "data-services",
    "data-governance",
    "data-lakehouse",
    "data-integration",
    "prisma-ai",
    "smart-email",
    "smart-invoice",
  ];
  for (const locale of LOCALES) {
    for (const tag of predefinedTags) {
      if (!params.some((p) => p.locale === locale && p.tag === tag)) {
        params.push({ locale, tag });
      }
    }
  }

  return params;
}
