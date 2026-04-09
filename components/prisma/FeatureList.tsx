import FeatureCard from "@/components/prisma/FeatureCard";

export default function FeatureList() {
  const dataFeatureCard = [
    {
      title: "Fully type-safe database queries",
      desc: "Prisma generates type definitions directly from your database schema, ensuring every query is safe, predictable, and error-free.",
      icon: "/prisma-desc/Type-safe-queries-icon.png",
      img: "/prisma-desc/typesafe-img.svg",
      tag: "type safety"
    },
    {
      title: "Auto-generated CRUD operations",
      desc: "Prisma Client automatically provides ready-to-use CRUD queries, reducing boilerplate and speeding up development.",
      icon: "/prisma-desc/Auto-generated-CRUD-icon.png",
      img: "/prisma-desc/Auto-generated-CRUD-img.svg",
      tag: "crud"
    },
    {
      title: "Schema evolution made simple",
      desc: "Manage and version your database schema with Prisma Migrate, ensuring safe and consistent updates across environments.",
      icon: "/prisma-desc/Migrations-icon.png",
      img: "/prisma-desc/Migrations-img.svg",
      tag:'migrations'
    },
    {
      title: "Works with your favorite databases",
      desc: "Connect Prisma seamlessly with popular databases, giving you flexibility to choose the right technology for your stack.",
      icon: "/prisma-desc/Multi-database-support-icon.png",
      img: "/prisma-desc/Multi-database-support-img.svg",
      tag: "database support"
    },
  ]
  return (
    <section id="feature-list" className="scroll-mt-24">
      <div className="w-full flex flex-col justify-center py-12 sm:py-8 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-10 md:gap-12">
        <h1 className="text-3xl font-extrabold text-center md:text-4xl text-[#111827]">Why Choose Prisma?</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
          {dataFeatureCard.map((item) => {
            return (
              <FeatureCard key={item.title} feature={item} />
            )
          })}

        </div>
      </div>
    </section>
  )
}
