import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  slug: string;
  featured?: boolean;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Generative AI in SAP: Revolutionizing Enterprise Workflows",
    excerpt:
      "Discover how generative AI is transforming SAP environments with intelligent document generation and automated assistance.",
    author: "Dat Le",
    authorRole: "AI Solutions Architect",
    authorImage: "/testimonials/amy-chase.webp",
    image: "/blog/1.jpg",
    slug: "generative-ai-sap-enterprise-workflows",
    featured: true,
  },
  {
    id: "2",
    title: "Real-time data pipelines connecting SAP to modern AI/ML platforms",
    excerpt:
      "Learn how to build robust real-time data pipelines that seamlessly connect SAP systems to modern AI/ML platforms.",
    author: "Alex Thompson",
    authorRole: "Data Engineer",
    authorImage: "/testimonials/jonas-kotara.webp",
    image: "/blog/2.jpg",
    slug: "real-time-data-pipelines-sap-ai",
  },
  {
    id: "3",
    title: "AI-powered business intelligence transforming static reporting",
    excerpt:
      "Learn how AI is transforming business intelligence from static reporting to intelligent analytics.",
    author: "Emily Watson",
    authorRole: "BI Consultant",
    authorImage: "/testimonials/kevin-yam.webp",
    image: "/blog/3.jpg",
    slug: "ai-powered-business-intelligence",
  },
  {
    id: "4",
    title: "SAP data migration strategies for seamless cloud transition",
    excerpt:
      "A practical guide to migrating SAP data to cloud platforms with best practices.",
    author: "David Kim",
    authorRole: "Cloud Architect",
    authorImage: "/testimonials/kundo-marta.webp",
    image: "/blog/4.jpg",
    slug: "sap-data-migration-cloud-strategy",
  },
  {
    id: "5",
    title: "Building modern data architectures for enterprise analytics",
    excerpt:
      "A comprehensive guide to designing modern data architectures that enable advanced analytics.",
    author: "Sarah Chen",
    authorRole: "Data Architect",
    authorImage: "/testimonials/amy-chase.webp",
    image: "/blog/5.jpg",
    slug: "modern-data-architecture-enterprise",
  },
];

export const BlogSection = () => {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

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
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Tech Insights
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Exploring cutting-edge technologies shaping tomorrow&apos;s digital landscape
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="group shrink-0 rounded-full border-border bg-background px-6 py-5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Link href="/blog" aria-label="View all blog posts">
              Read More
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
                href={`/blog/${featuredPost.slug}`}
                className="group relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <Link href={`/blog/${featuredPost.slug}`}>
                <h3 className="mb-4 text-2xl font-bold leading-tight text-foreground transition-colors hover:text-primary md:text-3xl">
                  {featuredPost.title}
                </h3>
              </Link>
              <div className="mt-auto flex items-center gap-3">
                <div className="relative size-10 overflow-hidden rounded-full">
                  <Image
                    src={featuredPost.authorImage}
                    alt={featuredPost.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{featuredPost.author}</p>
                  <p className="text-sm text-muted-foreground">{featuredPost.authorRole}</p>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts - Right Side */}
          <div className="flex flex-col divide-y divide-border">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-5 py-5 first:pt-0 last:pb-0"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted md:size-20">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary md:text-lg">
                  {post.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
