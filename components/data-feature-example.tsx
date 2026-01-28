import DataFeature from "@/components/data-feature";

export default function DataFeatureExample() {
  const dataFeatures = [
    {
      title: "Client Experience Manager Drives Revenue",
      description:
        "Missed messages & slow responses can frustrate clients, hurt client outcomes, and impact your bottom line. Stay ahead of client needs with proactive check-ins on care plans, screenings for changes in condition, and outreach to gauge interest in additional services — all without overloading your team.",
      image: "/og.png",
      imageAlt: "Client Experience Manager Dashboard",
    },
    {
      title: "Automated Client Engagement",
      description:
        "Keep your clients engaged with automated check-ins, reminders, and personalized communication. Our AI-powered system ensures no client falls through the cracks while maintaining a personal touch.",
      image: "/music.png",
      imageAlt: "Automated Engagement System",
    },
    {
      title: "Real-time Analytics & Insights",
      description:
        "Get instant visibility into client satisfaction, engagement metrics, and revenue opportunities. Make data-driven decisions with comprehensive dashboards and actionable insights.",
      image: "/mail2.png",
      imageAlt: "Analytics Dashboard",
    },
    {
      title: "Seamless Integration",
      description:
        "Integrate with your existing CRM, scheduling, and communication tools. Our platform works with the tools you already use, making adoption seamless for your team.",
      image: "/payments.png",
      imageAlt: "Integration Platform",
    },
  ];

  return (
    <DataFeature
      badge="FEATURES"
      heading="Work Smarter with Your 24/7 AI Coordinator"
      subheading="Your AI coordination agent is built for the way you run your agency. Mix and match modules for scheduling, communication, onboarding, and client engagement — each tailored to your processes for maximum impact. We can start with one custom use case, and expand to more as you see ROI."
      ctaText="Get Started"
      ctaHref="/contact"
      items={dataFeatures}
    />
  );
}

