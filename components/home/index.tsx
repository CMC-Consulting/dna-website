import AIFeature from "@/components/ai-feature";
import { BlogSection } from "@/components/blog-section";
import CTASection from "@/components/cta-section";
import DataServices from "@/components/data-services";
import Hero from "@/components/hero";
import LogoCloud from "@/components/logo-cloud";
import { WhyUs } from "@/components/why-us";

export default function HomeComponent() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <WhyUs variant="list" />
      <AIFeature />
      <DataServices />
      {/* <Testimonials /> */}
      <BlogSection />
      <CTASection />
    </>
  );
}
