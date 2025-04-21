
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

  return <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          {/* Remove background image for solid color look */}
          <div className="absolute inset-0 bg-black" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-32 pb-48 text-center">
          <div className="mx-auto max-w-3xl">
            <div className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(255,255,255,0.10)] sm:text-6xl">
                Create with AI-Ready Licensed Characters
              </h1>
              <p className="mb-8 text-lg text-gray-300 drop-shadow-md">
                Create Stunning Videos and Images with Professional Characters, All Fully Licensed and Ready For Your AI Projects.
              </p>
              <div className="flex justify-center">
                <CustomButton
                  size="lg"
                  className="h-14 px-12 text-lg bg-white text-black shadow-lg hover:bg-gray-300 transition-all"
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
          <FeatureCard icon="skills" title="No Technical Skills Needed" description="Create professional content without any additional data files or technical expertise." textClassName="text-gray-100" />
          <FeatureCard icon="ai" title="AI-Powered Creation" description="Leverage cutting-edge AI technology to bring your characters to life." textClassName="text-gray-100" />
          <FeatureCard icon="security" title="Legal & Secure" description="All characters are fully licensed and ready for respective usage." textClassName="text-gray-100" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-5xl bg-gray-900 py-16 px-8 rounded-3xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-white drop-shadow">Choose Your Plan</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="relative bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-900 hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Basic</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$15</span>
                  <span className="ml-2 text-gray-300">/month</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">3 AI Characters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">Basic Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">1080p Video Quality</span>
                  </li>
                </ul>
                <CustomButton className="w-full bg-white text-black hover:bg-gray-200 py-6" onClick={() => navigate("/subscription")}>
                  Get Started
                </CustomButton>
              </div>
            </div>

            {/* Monetizable Plan */}
            <div className="relative bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-white hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Monetizable Channels</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$40</span>
                  <span className="ml-2 text-gray-300">/month</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">10 AI Characters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">Priority Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">2K Video Quality</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">Commercial Rights</span>
                  </li>
                </ul>
                <CustomButton className="w-full bg-white text-black hover:bg-gray-200 py-6 transition-all" onClick={() => navigate("/subscription")}>
                  Go Premium
                </CustomButton>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="relative bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-900 hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Enterprise</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">Advanced Features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">Dedicated Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">Custom Integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#fff]" />
                    <span className="text-gray-300">SLA Guarantee</span>
                  </li>
                </ul>
                <CustomButton variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-black py-6 transition-all" onClick={() => navigate("/contact")}>
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
          <h2 className="mb-6 text-4xl font-bold text-white">Join Our Community</h2>
          <p className="mb-12 text-lg text-gray-400">Connect with fellow creators and stay updated with the latest news and features.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <CustomButton 
              onClick={() => window.open('https://discord.gg/your-discord', '_blank')}
              size="lg" 
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 bg-white hover:bg-gray-300 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-black font-semibold py-6 px-8"
            >
              <div className="flex items-center justify-center gap-3 mx-auto">
                <MessageSquare className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Join Discord</span>
              </div>
            </CustomButton>
            
            <CustomButton 
              onClick={() => window.open('https://instagram.com/your-instagram', '_blank')}
              size="lg" 
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 bg-white hover:bg-gray-300 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-black font-semibold py-6 px-8"
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
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-black shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 font-semibold py-6 px-8"
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
