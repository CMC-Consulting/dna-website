import { BlogCard } from "@/app/[locale]/blog/BlogCard";
import { InfiniteScrollPosts } from "@/app/[locale]/blog/InfiniteScrollPosts";
import { Button } from "@/components/ui/button";
import { Link, Locale, LOCALES } from "@/i18n/routing";
import { getPosts } from "@/lib/getBlogs";
import { constructMetadata } from "@/lib/metadata";
import { BookOpen, Rss } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return constructMetadata({
    page: "Blog",
    title: t("title"),
    description: t("description"),
    locale: locale as Locale,
    path: `/blog`,
    canonicalUrl: `/blog`,
  });
}

// Extract unique categories from posts
function getCategories(posts: { tags?: string }[]) {
  const allTags = posts
    .filter((post) => post.tags)
    .flatMap((post) => post.tags!.split(",").map((tag) => tag.trim()));

  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.slice(0, 6); // Limit to 6 categories
}

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;
  const { posts } = await getPosts(locale);

  const t = await getTranslations("Blog");

  // Separate featured (pinned) post from regular posts
  const featuredPost = posts.find((post) => post.pin);
  const regularPosts = posts.filter((post) => !post.pin);
  // const categories = getCategories(posts);

  return (
    <>
      {/* Hero Section */}
      <section className="relative mt-8 md:mt-20 overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/50 to-background w-screen left-1/2 -translate-x-1/2">
        {/* Background Pattern */}
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

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t("description")}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-primary" />
                <span>
                  <strong className="text-foreground">{posts.length}</strong> Articles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Rss className="size-5 text-primary" />
                <span>Updated Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {/* {categories.length > 0 && (
        <section className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-16 z-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                Topics:
              </span>
              <div className="flex gap-2">
                <button className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors">
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className="shrink-0 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )} */}

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
          <InfiniteScrollPosts
            posts={regularPosts}
            locale={locale}
            initialCount={6}
            loadMoreCount={3}
          />

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-muted">
                <BookOpen className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No articles yet
              </h3>
              <p className="text-muted-foreground">
                Check back soon for new content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-[linear-gradient(135deg,#276df0,#c3d6f6)] shadow-sm">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]"
            />

            <div className="relative flex flex-col items-center justify-between gap-8 p-8 sm:p-10 md:flex-row md:items-center md:gap-12 lg:gap-16 lg:p-14">
              <div className="max-w-2xl text-center md:text-left">
                <h2 className="text-balance text-2xl font-bold tracking-tight leading-tight text-[#a3c4fa] sm:text-3xl lg:text-4xl">
                  Have a project in mind?{" "}
                  <span className="text-white">Let&apos;s talk.</span>
                </h2>
                <p className="mt-4 text-white/80 text-base sm:text-lg">
                  Our team of AI and data experts is ready to help you transform your business with cutting-edge solutions.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
                  <Button
                    asChild
                    className="rounded-[12px] border-none bg-[#5a94f5]/40 hover:bg-[#5a94f5]/60 text-white px-6 py-2.5"
                  >
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-[12px] border border-[#EDEEF0] bg-white hover:bg-white/90 text-[#31373D] px-6 py-2.5"
                  >
                    <Link href="/about">Learn about us</Link>
                  </Button>
                </div>
              </div>

              <div className="hidden md:block w-full max-w-xs lg:max-w-sm shrink-0">
                <img
                  src="/ready_to_build.png"
                  alt="Ready to build illustration"
                  className="w-full h-auto select-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
