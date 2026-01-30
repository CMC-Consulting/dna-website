import { DashedLine } from "@/components/ui/dashed-line";

const stats = [
  {
    value: "$20M+",
    label: "Raised",
  },
  {
    value: "95%",
    label: "Client Satisfaction Rate",
  },
  {
    value: "12B+",
    label: "Annual revenue",
  },
  {
    value: "100+",
    label: "Customers",
  },
];

export function AboutHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-gray-950 py-28 lg:py-52 px-4 sm:px-6 lg:px-8 flex items-center">
      {/* Background gradient effect - matches hero/solutions pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at bottom left,
              rgba(139, 92, 246, 0.25),
              transparent 60%
            ),
            radial-gradient(
              circle at top right,
              rgba(59, 130, 246, 0.25),
              transparent 60%
            )
          `,
          filter: "blur(60px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 z-0 dark:block hidden"
        style={{
          background: "rgb(3, 7, 18)",
          backgroundImage: `
            radial-gradient(
              circle at bottom left,
              rgba(139, 92, 246, 0.2),
              transparent 60%
            ),
            radial-gradient(
              circle at top right,
              rgba(59, 130, 246, 0.2),
              transparent 60%
            )
          `,
          filter: "blur(60px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        <div className="flex flex-col justify-between gap-12 md:gap-20 lg:flex-row lg:items-center lg:gap-24">
          <div className="flex-[1.5] space-y-6">
            <h1 className="font-display text-foreground text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Democratising
              <br />
              <span className="text-[#276df0]"> AI and Data solutions</span>
            </h1>

            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl">
              CMC Consulting AI specializes in delivering advanced AI and data services to companies and groups, empowering them with innovative tools to meet their operational needs.
            </p>

            <p className="text-muted-foreground hidden max-w-xl text-base leading-relaxed text-balance md:block lg:text-lg">
              CMC Consulting AI is committed to delivering artificial intelligence and data-driven services to companies. Our goal is to support enterprises in realizing their objectives through innovative AI and data strategies.
            </p>
          </div>

          <div className="relative flex flex-1 flex-col justify-center gap-4 pt-10 lg:pt-0 lg:pl-12">
            <DashedLine
              orientation="vertical"
              className="absolute top-0 left-0 max-lg:hidden"
            />
            <DashedLine
              orientation="horizontal"
              className="absolute top-0 lg:hidden"
            />
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <div className="font-display text-foreground text-4xl tracking-wide md:text-5xl lg:text-6xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
