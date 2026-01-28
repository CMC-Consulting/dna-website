import { Callout } from "@/components/mdx/Callout";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Link as I18nLink, Locale, LOCALES } from "@/i18n/routing";
import { getPosts } from "@/lib/getBlogs";
import { constructMetadata } from "@/lib/metadata";
import { BlogPost } from "@/types/blog";
import dayjs from "dayjs";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { FeaturedPostsCarousel } from "./FeaturedPostsCarousel";

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

type Params = Promise<{
  locale: string;
  slug: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale, slug } = await params;
  let { posts }: { posts: BlogPost[] } = await getPosts(locale);
  const post = posts.find((post) => post.slug === "/" + slug);

  if (!post) {
    return constructMetadata({
      title: "404",
      description: "Page not found",
      noIndex: true,
      locale: locale as Locale,
      path: `/blog/${slug}`,
      canonicalUrl: `/blog/${slug}`,
    });
  }

  return constructMetadata({
    page: "blog",
    title: post.title,
    description: post.description,
    images: post.image ? [post.image] : [],
    locale: locale as Locale,
    path: `/blog/${slug}`,
    canonicalUrl: `/blog/${slug}`,
  });
}

export default async function BlogPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  let { posts }: { posts: BlogPost[] } = await getPosts(locale);

  const post = posts.find((item) => item.slug === "/" + slug);

  if (!post) {
    return notFound();
  }

  // Estimate read time
  const wordCount = post.content?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Parse tags
  const tags = post.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) || [];

  return (
    <article className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <I18nLink
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </I18nLink>

        {/* Header */}
        <header className="mb-8">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <time dateTime={dayjs(post.date).format("YYYY-MM-DD")}>
                {dayjs(post.date).format("MMMM D, YYYY")}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description callout */}
        {post.description && (
          <Callout>{post.description}</Callout>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-muted prose-pre:border prose-pre:border-border">
          <MDXRemote
            source={post?.content || ""}
            components={MDXComponents}
            options={mdxOptions}
          />
        </div>

        {/* Featured Posts Carousel */}
        <FeaturedPostsCarousel posts={posts} currentSlug={post.slug} />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <I18nLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to all posts
          </I18nLink>
        </footer>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  let posts = (await getPosts()).posts;

  // Filter out posts without a slug
  posts = posts.filter((post) => post.slug);

  return LOCALES.flatMap((locale) =>
    posts.map((post) => {
      const slugPart = post.slug.replace(/^\//, "").replace(/^blog\//, "");

      return {
        locale,
        slug: slugPart,
      };
    })
  );
}
