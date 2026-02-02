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
    <article className="w-full py-8 sm:py-12 lg:py-20 xl:py-24 mt-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <I18nLink
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
          aria-label="Back to blog listing"
        >
          <ArrowLeft className="size-4 shrink-0" />
          <span className="truncate">Back to Blog</span>
        </I18nLink>

        {/* Header */}
        <header className="mb-8 sm:mb-10 lg:mb-12">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 sm:mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary sm:px-3"
                >
                  <Tag className="size-3 shrink-0" />
                  <span className="truncate">{tag}</span>
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-5 text-2xl font-bold tracking-tight text-foreground break-words sm:mb-6 sm:text-3xl lg:mb-8 lg:text-4xl xl:text-5xl">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground sm:gap-4">
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
          <div className="relative aspect-video w-full min-w-0 overflow-hidden rounded-xl bg-muted mb-6 sm:mb-10 sm:rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
            />
          </div>
        )}

        {/* Description callout */}
        {post.description && (
          <Callout>{post.description}</Callout>
        )}

        {/* Content */}
        <div className="min-w-0 overflow-x-auto prose prose-base dark:prose-invert max-w-none sm:prose-lg prose-headings:font-semibold prose-headings:tracking-tight prose-headings:break-words prose-a:text-primary prose-a:no-underline prose-a:break-all hover:prose-a:underline prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:text-sm sm:prose-pre:text-base [&>*]:min-w-0 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto">
          <MDXRemote
            source={post?.content || ""}
            components={MDXComponents}
            options={mdxOptions}
          />
        </div>

        {/* Featured Posts Carousel */}
        <FeaturedPostsCarousel posts={posts} currentSlug={post.slug} />

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-border sm:mt-16 sm:pt-8">
          <I18nLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            aria-label="Back to all blog posts"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="truncate">Back to all posts</span>
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
