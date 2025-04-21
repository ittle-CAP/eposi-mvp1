
import { Header } from "@/components/navigation/header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CommunitySection } from "@/components/landing/CommunitySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-white">
      <Header />
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <CommunitySection />
    </div>
  );
};

export default Index;
