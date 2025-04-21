import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/feature-card";
import { Header } from "@/components/navigation/header";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquare, Instagram, Mail, Check } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-36 md:pb-48">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                Fully Licensed Character Ready for Your Next AI Project
              </h1>
              <p className="mb-10 text-lg md:text-xl text-gray-300 font-medium">
                Discover professional characters with standardized contracts, clear usage rights, and AI-based content creation—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CustomButton
                  size="lg"
                  className="h-14 px-10 text-lg bg-[#9b87f5] text-black font-bold hover:bg-[#7E69AB] transition-all"
                  onClick={() => navigate("/characters")}
                >
                  Browse Characters
                </CustomButton>
                <CustomButton
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg border-2 border-[#9b87f5] text-[#9b87f5] font-bold hover:bg-[#9b87f5] hover:text-black transition-all"
                  onClick={() => {
                    const howItWorks = document.getElementById('how-it-works-section');
                    if (howItWorks) {
                      howItWorks.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  How it Works
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container relative z-20 mx-auto px-4" id="how-it-works-section">
        <div className="grid -mt-20 gap-8 md:grid-cols-3">
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

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-5xl bg-[#F1F0FB] py-16 px-8 rounded-3xl">
          <h2 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$15</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">3 AI Characters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">Basic Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">1080p Video Quality</span>
                  </li>
                </ul>
                <CustomButton className="w-full bg-[#553D8A] text-white hover:bg-[#553D8A]/90 py-6" onClick={() => navigate("/subscription")}>
                  Get Started
                </CustomButton>
              </div>
            </div>

            {/* Monetizable Plan */}
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-[#553D8A] hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#553D8A] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Monetizable Channels</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$40</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">10 AI Characters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">Priority Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">2K Video Quality</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">Commercial Rights</span>
                  </li>
                </ul>
                <CustomButton className="w-full bg-[#553D8A] text-white hover:bg-[#553D8A]/90 py-6" onClick={() => navigate("/subscription")}>
                  Go Premium
                </CustomButton>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">Advanced Features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">Dedicated Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">Custom Integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#553D8A]" />
                    <span className="text-gray-600">SLA Guarantee</span>
                  </li>
                </ul>
                <CustomButton variant="outline" className="w-full border-2 border-[#553D8A] text-[#553D8A] hover:bg-[#553D8A] hover:text-white py-6" onClick={() => navigate("/contact")}>
                  Contact Sales
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">Join Our Community</h2>
          <p className="mb-12 text-lg text-gray-600">Connect with fellow creators and stay updated with the latest news and features.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <CustomButton 
              onClick={() => window.open('https://discord.gg/your-discord', '_blank')}
              size="lg" 
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-white font-semibold py-6 px-8"
            >
              <div className="flex items-center justify-center gap-3 mx-auto">
                <MessageSquare className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Join Discord</span>
              </div>
            </CustomButton>
            
            <CustomButton 
              onClick={() => window.open('https://instagram.com/your-instagram', '_blank')}
              size="lg" 
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 bg-gradient-to-r from-[#E4405F] to-[#FD1D1D] hover:from-[#D63251] hover:to-[#E31D1D] shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-white font-semibold py-6 px-8"
            >
              <div className="flex items-center justify-center gap-3 mx-auto">
                <Instagram className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Follow on Instagram</span>
              </div>
            </CustomButton>
            
            <CustomButton 
              onClick={() => navigate("/newsletter")}
              size="lg" 
              variant="outline"
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 border-2 border-[#553D8A] text-[#553D8A] hover:bg-[#553D8A] hover:text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 font-semibold py-6 px-8"
            >
              <div className="flex items-center justify-center gap-3 mx-auto">
                <Mail className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Join Newsletter</span>
              </div>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
