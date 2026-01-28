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
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {relatedPosts.map((post) => {
            const primaryTag = post.tags?.split(",")[0]?.trim();

            return (
              <CarouselItem
                key={post.slug}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full">
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

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      <span>{dayjs(post.date).format("MMM D, YYYY")}</span>
                    </div>

                    <I18nLink
                      href={`/blog${post.slug}`}
                      prefetch={false}
                      className="flex-1"
                    >
                      <h3 className="mb-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                        {post.title}
                      </h3>
                    </I18nLink>

                    {post.description && (
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
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
        className="mt-6 inline-flex sm:hidden items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        View all posts
        <ArrowRight className="size-4" />
      </I18nLink>
    </section>
  );
}
