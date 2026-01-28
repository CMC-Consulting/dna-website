import { Link as I18nLink } from "@/i18n/routing";
import { BlogPost } from "@/types/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";

type BlogCardProps = {
  post: BlogPost;
  locale: string;
  featured?: boolean;
};

export function BlogCard({ post, locale, featured = false }: BlogCardProps) {
  // Estimate read time (roughly 200 words per minute)
  const wordCount = post.content?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const primaryTag = post.tags?.split(",")[0]?.trim();

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-background to-background border border-border/40">
        <div className="grid gap-0 lg:grid-cols-2">
          {/* Image */}
          <I18nLink
            href={`/blog${post.slug}`}
            prefetch={false}
            className="relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[400px]"
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </I18nLink>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="mb-4 flex items-center gap-3">
              {primaryTag && (
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  {primaryTag}
                </span>
              )}
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                Featured
              </span>
            </div>

            <I18nLink href={`/blog${post.slug}`} prefetch={false}>
              <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl lg:text-4xl">
                {post.title}
              </h2>
            </I18nLink>

            {post.description && (
              <p className="mb-6 text-base leading-relaxed text-muted-foreground line-clamp-3 lg:text-lg">
                {post.description}
              </p>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{dayjs(post.date).format("MMM D, YYYY")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{readTime} min read</span>
              </div>
            </div>

            <I18nLink
              href={`/blog${post.slug}`}
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Read Article
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </I18nLink>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <I18nLink
        href={`/blog${post.slug}`}
        prefetch={false}
        className="relative aspect-[16/10] overflow-hidden bg-muted"
      >
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        {primaryTag && (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {primaryTag}
          </span>
        )}
      </I18nLink>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span>{dayjs(post.date).format("MMM D, YYYY")}</span>
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>{readTime} min read</span>
          </div>
        </div>

        <I18nLink href={`/blog${post.slug}`} prefetch={false} className="flex-1">
          <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>
        </I18nLink>

        {post.description && (
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        )}

        <I18nLink
          href={`/blog${post.slug}`}
          prefetch={false}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Read more
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </I18nLink>
      </div>
    </article>
  );
}
