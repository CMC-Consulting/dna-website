"use client";

import { BlogCard } from "@/app/[locale]/blog/BlogCard";
import { BlogPost } from "@/types/blog";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type InfiniteScrollPostsProps = {
  posts: BlogPost[];
  locale: string;
  initialCount?: number;
  loadMoreCount?: number;
};

export function InfiniteScrollPosts({
  posts,
  locale,
  initialCount = 6,
  loadMoreCount = 3,
}: InfiniteScrollPostsProps) {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const displayedPosts = posts.slice(0, displayCount);
  const hasMore = displayCount < posts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          // Small delay for smooth loading effect
          setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + loadMoreCount, posts.length));
            setIsLoading(false);
          }, 300);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading, loadMoreCount, posts.length]);

  return (
    <>
      {/* Posts Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post) => (
          <BlogCard key={post.slug} locale={locale} post={post} />
        ))}
      </div>

      {/* Loader / End indicator */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="flex items-center justify-center py-12"
        >
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-sm">Loading more articles...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && posts.length > initialCount && (
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-muted-foreground">
            You&apos;ve reached the end
          </span>
        </div>
      )}
    </>
  );
}
