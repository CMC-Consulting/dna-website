import About from "@/components/blocks/about";
import { AboutHero } from "@/components/blocks/about-hero";
import TeamSection from "@/components/contact/team";
import CTASection from "@/components/cta-section";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <About />
      <TeamSection />
      <CTASection />
    </>
  );
}
