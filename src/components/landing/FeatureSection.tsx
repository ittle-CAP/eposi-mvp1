
import { FeatureCard } from "@/components/feature-card";

export const FeatureSection = () => (
  <section className="container relative z-20 mx-auto px-4">
    <div className="grid -mt-24 gap-8 md:grid-cols-3">
      <FeatureCard
        icon="skills"
        title="No Technical Skills Needed"
        description="Easily generate visuals with our AI tool."
      />
      <FeatureCard
        icon="ai"
        title="AI-Powered Creation"
        description="Ensure consistent style and personality across every output."
      />
      <FeatureCard
        icon="security"
        title="Legal & Secure"
        description="Standardized contracts, transparent pricing, and compliant outputs."
      />
    </div>
  </section>
);
