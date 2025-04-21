
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

  return <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img src="/lovable-uploads/539e296d-1271-477e-802d-658d6bb3d386.png" alt="Futuristic glowing circuit board platform" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/70 via-[#1A1F2C]/50 to-[#1A1F2C]/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-32 pb-48 text-center">
          <div className="mx-auto max-w-3xl">
            <div className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#8B5CF6] via-[#33C3F0] to-[#F97316] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(155,135,245,0.18)] sm:text-6xl">
                Create with AI-Ready Licensed Characters
              </h1>
              <p className="mb-8 text-lg text-[#F1F0FB] drop-shadow-md">
                Create Stunning Videos and Images with Professional Characters, All Fully Licensed and Ready For Your AI Projects.
              </p>
              <div className="flex justify-center">
                <CustomButton
                  size="lg"
                  className="h-14 px-12 text-lg bg-gradient-to-r from-[#8B5CF6] via-[#33C3F0] to-[#F97316] shadow-lg text-white hover:from-[#7E69AB] hover:to-[#F97316] transition-all"
                  onClick={() => !user ? navigate("/auth") : navigate("/generate")}
                >
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
          <FeatureCard icon="skills" title="No Technical Skills Needed" description="Create professional content with any additional data files or technical expertise." />
          <FeatureCard icon="ai" title="AI-Powered Creation" description="Leverage cutting-edge AI technology to bring your characters to life." />
          <FeatureCard icon="security" title="Legal & Secure" description="All characters are fully licensed and ready for respective usage." />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-5xl bg-[#F1F0FB] py-16 px-8 rounded-3xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#7E69AB] drop-shadow">Choose Your Plan</h2>
          
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
                <CustomButton className="w-full bg-[#8B5CF6] text-white hover:bg-[#7E69AB]/90 py-6" onClick={() => navigate("/subscription")}>
                  Get Started
                </CustomButton>
              </div>
            </div>

            {/* Monetizable Plan */}
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-[#7E69AB] hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white px-4 py-1 rounded-full text-sm font-medium">
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
                <CustomButton className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#33C3F0] to-[#F97316] hover:from-[#7E69AB] hover:to-[#F97316] text-white py-6 transition-all" onClick={() => navigate("/subscription")}>
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
                <CustomButton variant="outline" className="w-full border-2 border-[#7E69AB] text-[#7E69AB] hover:bg-[#7E69AB] hover:text-white py-6 transition-all" onClick={() => navigate("/contact")}>
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
          <p className="mb-12 text-lg text-[#7E69AB]">Connect with fellow creators and stay updated with the latest news and features.</p>
          
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
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 border-2 border-[#7E69AB] text-[#7E69AB] hover:bg-[#7E69AB] hover:text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 font-semibold py-6 px-8"
            >
              <div className="flex items-center justify-center gap-3 mx-auto">
                <Mail className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Join Newsletter</span>
              </div>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>;
};

export default Index;
