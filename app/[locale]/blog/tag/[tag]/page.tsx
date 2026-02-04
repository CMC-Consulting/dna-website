import { BlogCard } from "@/app/[locale]/blog/BlogCard";
import { InfiniteScrollPosts } from "@/app/[locale]/blog/InfiniteScrollPosts";
import { Button } from "@/components/ui/button";
import { Link, Locale, LOCALES } from "@/i18n/routing";
import { getPostsByTag, getAllTags } from "@/lib/getBlogs";
import { constructMetadata } from "@/lib/metadata";
import { BookOpen, ArrowLeft, Tag } from "lucide-react";
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

  const tagName = t.has(`tags.${tag}`) ? t(`tags.${tag}`) : tag;

  return constructMetadata({
    page: "BlogTag",
    title: t("title", { tag: tagName }),
    description: t("description", { tag: tagName }),
    locale: locale as Locale,
    path: `/blog/tag/${tag}`,
    canonicalUrl: `/blog/tag/${tag}`,
  });
}

export default async function TagPage({ params }: { params: Params }) {
  const { locale, tag } = await params;
  const { posts } = await getPostsByTag(locale, tag);
  const t = await getTranslations("BlogTag");

  const tagName = t.has(`tags.${tag}`) ? t(`tags.${tag}`) : tag;

  const featuredPost = posts.find((post) => post.pin);
  const regularPosts = posts.filter((post) => !post.pin);

  return (
    <>
      {/* Hero Section */}
      <section className="relative mt-20 md:mt-32 overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/50 to-background w-screen left-1/2 -translate-x-1/2">
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

        <div className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl text-center">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="size-4" />
              {t("backToBlog")}
            </Link>

            {/* Tag Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Tag className="size-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {tagName}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("title", { tag: tagName })}
            </h1>

            {/* Stats */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="size-5 text-primary" />
              <span>
                <strong className="text-foreground">{posts.length}</strong>{" "}
                {t("articlesCount", { count: posts.length })}
              </span>
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
                  Featured Article
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
                Latest Articles
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

  // Also add predefined important tags for data services
  const predefinedTags = [
    "data-services",
    "data-governance",
    "data-lakehouse",
    "data-integration",
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
