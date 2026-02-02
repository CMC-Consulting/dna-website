"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link as I18nLink } from "@/i18n/routing";
import { BlogPost } from "@/types/blog";
import dayjs from "dayjs";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

type FeaturedPostsCarouselProps = {
  posts: BlogPost[];
  currentSlug: string;
};

export function FeaturedPostsCarousel({
  posts,
  currentSlug,
}: FeaturedPostsCarouselProps) {
  // Filter out current post and get up to 6 related posts
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 6);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            More Articles
          </h2>
          <p className="mt-2 text-muted-foreground">
            Continue reading with these related posts
          </p>
        </div>
        <I18nLink
          href="/blog"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          View all posts
          <ArrowRight className="size-4" />
        </I18nLink>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: relatedPosts.length > 3,
          containScroll: "trimSnaps",
        }}
        className="w-full min-w-0"
      >
        <CarouselContent className="ml-0 sm:-ml-4">
          {relatedPosts.map((post) => {
            const primaryTag = post.tags?.split(",")[0]?.trim();

            return (
              <CarouselItem
                key={post.slug}
                className="min-w-0 basis-full pl-0 pr-3 sm:pl-4 sm:pr-0 md:basis-1/2 lg:basis-1/3"
              >
                <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border/40 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full sm:rounded-2xl">
                  <I18nLink
                    href={`/blog${post.slug}`}
                    prefetch={false}
                    className="relative aspect-[16/10] min-h-0 overflow-hidden bg-muted"
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

                  <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5">
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground sm:mb-3">
                      <Calendar className="size-3.5 shrink-0" />
                      <span className="truncate">{dayjs(post.date).format("MMM D, YYYY")}</span>
                    </div>

                    <I18nLink
                      href={`/blog${post.slug}`}
                      prefetch={false}
                      className="min-w-0 flex-1"
                    >
                      <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:mb-2 sm:text-base">
                        {post.title}
                      </h3>
                    </I18nLink>

                    {post.description && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {post.description}
                      </p>
                    )}
                  </div>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden md:flex" />
        <CarouselNext className="-right-4 hidden md:flex" />
      </Carousel>

      <I18nLink
        href="/blog"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline sm:mt-6 sm:hidden"
        aria-label="View all blog posts"
      >
        View all posts
        <ArrowRight className="size-4 shrink-0" />
      </I18nLink>
    </section>
  );
}
