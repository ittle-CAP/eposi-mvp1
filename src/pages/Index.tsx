
import { useEffect, useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/feature-card";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-semibold text-gray-900">Saga</div>
          <nav className="flex items-center gap-4">
            <CustomButton variant="ghost" size="sm">
              Log In
            </CustomButton>
            <CustomButton size="sm">
              Sign Up
            </CustomButton>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container relative mx-auto px-4 pt-32 text-center">
        <div className="mx-auto max-w-3xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
              Unlock AI-Ready Licensed Characters
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Create Stunning Videos With Professional Characters, All Fully Licensed And Ready For Your AI Projects.
            </p>
            <div className="flex justify-center">
              <CustomButton size="lg" className="h-14 px-12 text-lg">
                Start Creating
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon="skills"
            title="No Technical Skills Needed"
            description="Create professional content without any coding or technical expertise required."
            className="animate-float"
          />
          <FeatureCard
            icon="ai"
            title="AI-Powered Creation"
            description="Leverage cutting-edge AI technology to bring your characters to life."
            className="animate-float [animation-delay:200ms]"
          />
          <FeatureCard
            icon="security"
            title="Legal & Secure"
            description="All characters are fully licensed and ready for commercial use."
            className="animate-float [animation-delay:400ms]"
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
