import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/feature-card";
import { Header } from "@/components/navigation/header";
import { useAuth } from "@/components/AuthProvider";
const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img src="/lovable-uploads/9d2f5aa3-5aba-45fe-9236-96bf12782e8e.png" alt="Misty lake with boat and church" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#1A1F2C]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-32 pb-48 text-center">
          <div className="mx-auto max-w-3xl">
            <div className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl">
                Create with AI-Ready Licensed Characters
              </h1>
              <p className="mb-8 text-lg text-gray-200">
                Create Stunning Videos and Images with Professional Characters, All Fully Licensed and Ready For Your AI Projects.
              </p>
              <div className="flex justify-center">
                <CustomButton size="lg" className="h-14 px-12 text-lg" onClick={() => !user ? navigate("/auth") : navigate("/create")}>
                  {user ? "Start Creating" : "Sign Up to Start"}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container relative z-20 mx-auto px-4">
        <div className="grid -mt-24 gap-8 md:grid-cols-3">
          <FeatureCard icon="skills" title="No Technical Skills Needed" description="Create professional content with any additional data files or technical expertise" />
          <FeatureCard icon="ai" title="AI-Powered Creation" description="Leverage cutting-edge AI technology to bring your characters to life." />
          <FeatureCard icon="security" title="Legal & Secure" description="All characters are fully licensed and ready for respective usage" />
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Connect with Creators</h2>
          <p className="mb-8 text-lg text-gray-600">Join our community of creators and collaborate to bring your stories to life with our AI-powered platform.</p>
          <CustomButton onClick={() => !user ? navigate("/auth") : navigate("/create")} size="lg" className="bg-[#553D8A] text-white hover:bg-[#553D8A]/90">
            Get Started
          </CustomButton>
        </div>
      </section>
    </div>;
};
export default Index;