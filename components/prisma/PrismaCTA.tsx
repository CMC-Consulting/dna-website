import { ArrowRight, BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";

export default function PrismaCTA() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-8 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Card className="overflow-hidden border border-[#dbe6f3] bg-white shadow-sm">
          <CardContent className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(39,109,240,0.10),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.08),transparent_30%)]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(39,109,240,0.35),transparent)]"
            />

            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#276df0]">
                Build Beyond Prisma
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
                Turn modern data tooling into real business momentum.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#5b6472]">
                From faster product delivery to scalable data architecture, we help
                teams turn the right stack choices into measurable growth. Explore
                more solutions from our team or talk with us about your next build.
              </p>
            </div>

            <div className="relative flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="bg-[linear-gradient(135deg,#0f1e35,#276df0)] px-6 text-white shadow-md transition-all duration-300 ease-out hover:brightness-105 hover:shadow-lg hover:scale-[1.01] hover:-translate-y-px active:scale-[0.99]"
              >
                <Link href="/solutions">
                  <BriefcaseBusiness className="size-4" />
                  Explore Our Other Solutions
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#cdd9e8] bg-white text-[#1f2937] shadow-sm transition-all duration-300 ease-out hover:border-[#276df0]/40 hover:bg-[#f8fbff] hover:shadow-md hover:scale-[1.01] hover:-translate-y-px active:scale-[0.99]"
              >
                <Link href="/contact">
                  Contact Us Now
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
