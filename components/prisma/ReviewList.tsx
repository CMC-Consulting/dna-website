// ReviewList.tsx
import ReviewCard, { ReviewType } from "@/components/prisma/ReviewCard";
import styles from "@/components/prisma/ReviewList.module.css";

const REVIEWS: ReviewType[] = [
  { id: 1, stars: 5, comment: "I keep switching from Prisma to whatever the latest flavor is, but always end up coming back to Prisma.", name: "Nicolás Torres", role: "Fullstack Engineer", avatar: "/prisma-desc/user.jpeg" },
  { id: 2, stars: 5, comment: "Prisma has completely transformed how I interact with databases. The type safety alone is worth it.", name: "Sarah Johnson", role: "Backend Developer", avatar: "/prisma-desc/user.jpeg" },
  { id: 3, stars: 5, comment: "The auto-generated CRUD operations save me hours every week. Prisma is a must-have in my stack.", name: "James Lee", role: "Software Engineer", avatar: "/prisma-desc/user.jpeg" },
  { id: 4, stars: 4, comment: "Schema migrations with Prisma are so seamless. I no longer dread database changes.", name: "Emily Chen", role: "Tech Lead", avatar: "/prisma-desc/user.jpeg" },
  { id: 5, stars: 5, comment: "Prisma's developer experience is unmatched. The docs are great and the community is super helpful.", name: "Marcus Webb", role: "Frontend Developer", avatar: "/prisma-desc/user.jpeg" },
  { id: 6, stars: 5, comment: "Switching to Prisma was the best decision for our team. Onboarding new devs is so much easier now.", name: "Aisha Patel", role: "Engineering Manager", avatar: "/prisma-desc/user.jpeg" },
  { id: 7, stars: 4, comment: "I love how Prisma integrates with Next.js. It just works out of the box.", name: "Tom Rivera", role: "Fullstack Developer", avatar: "/prisma-desc/user.jpeg" },
  { id: 8, stars: 5, comment: "The Prisma Studio is incredibly useful for visualizing and managing data during development.", name: "Lena Schmidt", role: "Product Engineer", avatar: "/prisma-desc/user.jpeg" },
  { id: 9, stars: 5, comment: "Type-safe queries mean fewer bugs in production. Prisma has made our codebase much more reliable.", name: "David Kim", role: "Senior Developer", avatar: "/prisma-desc/user.jpeg" },
  { id: 10, stars: 5, comment: "Multi-database support is a game changer. We run PostgreSQL and MySQL and Prisma handles both flawlessly.", name: "Fatima Al-Hassan", role: "Database Engineer", avatar: "/prisma-desc/user.jpeg" },
  { id: 11, stars: 4, comment: "Our whole team adopted Prisma within a week. The learning curve is minimal and the payoff is huge.", name: "Chris Nguyen", role: "CTO", avatar: "/prisma-desc/user.jpeg" },
  { id: 12, stars: 5, comment: "Prisma has replaced raw SQL for us entirely. Productivity has gone through the roof.", name: "Mia Rossi", role: "Backend Engineer", avatar: "/prisma-desc/user.jpeg" },
  { id: 13, stars: 5, comment: "The relation queries in Prisma are so intuitive. No more painful JOINs.", name: "Alex Turner", role: "API Developer", avatar: "/prisma-desc/user.jpeg" },
  { id: 14, stars: 4, comment: "We migrated from TypeORM to Prisma and never looked back. Everything just feels cleaner.", name: "Sophie Martin", role: "Fullstack Engineer", avatar: "/prisma-desc/user.jpeg" },
  { id: 15, stars: 5, comment: "Prisma is the ORM I always wished existed. It fits perfectly into modern TypeScript workflows.", name: "Omar Hassan", role: "Software Architect", avatar: "/prisma-desc/user.jpeg" },
];

export default function ReviewList() {
  return (
    <section id="review-list" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-8 lg:px-8 lg:py-16">
        <h1 className="text-center py-5 text-3xl font-extrabold text-[#111827] md:text-4xl">
          User reviews
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* mobai */}
          <div className={`${styles.viewport} h-[28rem] overflow-hidden rounded-2xl md:h-[32rem] lg:h-[36rem] px-[1px]`}>
            <div
              className={styles.track}
              style={{ "--review-duration": "150s" } as React.CSSProperties}
            >
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <ReviewCard key={`col1-${review.id}-${i}`} review={review} />
              ))}
            </div>
          </div>

          {/* md*/}
          <div className={`hidden md:block ${styles.viewport} h-[28rem] overflow-hidden rounded-2xl md:h-[32rem] lg:h-[36rem] px-[1px]`}>
            <div
              className={`${styles.track} ${styles.reverse}`}
              style={{ "--review-duration": "150s" } as React.CSSProperties}
            >
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <ReviewCard key={`col2-${review.id}-${i}`} review={review} />
              ))}
            </div>
          </div>

          {/* lg: */}
          <div className={`hidden lg:block ${styles.viewport} h-[28rem] overflow-hidden rounded-2xl md:h-[32rem] lg:h-[36rem] px-[1px]`}>
            <div
              className={styles.track}
              style={{ "--review-duration": "130s" } as React.CSSProperties}
            >
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <ReviewCard key={`col3-${review.id}-${i}`} review={review} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
