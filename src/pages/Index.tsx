
import { useEffect, useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/feature-card";
import { Chrome, Github } from "lucide-react";

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
              Log in
            </CustomButton>
            <CustomButton size="sm">Sign up</CustomButton>
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
              Unlock AI-ready licensed characters
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Create stunning videos with professional characters, all fully licensed and ready for your AI projects.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CustomButton size="lg" className="w-full sm:w-auto">
                Start Creating
              </CustomButton>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <CustomButton
                  variant="outline"
                  size="lg"
                  className="flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <Chrome className="h-5 w-5" />
                  Continue with Google
                </CustomButton>
                <CustomButton
                  variant="outline"
                  size="lg"
                  className="flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <Github className="h-5 w-5" />
                  Continue with GitHub
                </CustomButton>
              </div>
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

      {/* Pricing Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Start Creating Today</h2>
          <p className="mb-6 text-center text-gray-600">Try Saga free for 14 days</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <svg
                className="h-5 w-5 text-saga-500"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Unlimited AI character generation
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <svg
                className="h-5 w-5 text-saga-500"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Commercial license included
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <svg
                className="h-5 w-5 text-saga-500"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Priority support
            </div>
          </div>
          <CustomButton className="mt-8 w-full">Start Your Free Trial</CustomButton>
          <p className="mt-4 text-center text-sm text-gray-500">No credit card required</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
