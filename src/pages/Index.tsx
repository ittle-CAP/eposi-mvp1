
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/feature-card";
import { Header } from "@/components/navigation/header";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquare, Instagram, Mail, Check } from "lucide-react";

const GRADIENT = "bg-gradient-to-r from-[#9b87f5] via-[#8579f5] to-[#62B3E5]";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#19171D]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center pt-32 pb-12 text-center z-10">
          {/* Logo */}
          <img
            src="/lovable-uploads/b61b4a44-a310-4600-9d4d-8423d4254654.png"
            alt="Eposi Logo"
            className="mx-auto mb-8 mt-2 w-40 h-40"
            style={{ minWidth: 120, maxWidth: 180 }}
          />
          {/* Main Headline */}
          <h1 className={`mb-4 text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(155,135,245,0.12)]`}>
            Unleash AI Storytelling With{" "}
            <span
              className="block sm:inline bg-gradient-to-r from-[#9b87f5] to-[#62B3E5] bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Licensed Characters
            </span>
          </h1>
          {/* Subheadline */}
          <p className="mb-10 text-xl sm:text-2xl font-medium text-[#b7b6be] max-w-2xl mx-auto drop-shadow">
            Eposi makes it easy for creators to access licensed, ready-to-use character models—no technical skills required.
          </p>
          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              className={`rounded-xl px-10 py-5 text-lg font-bold text-white shadow-lg transition-all duration-200 ${GRADIENT} hover:brightness-110 focus-visible:ring-2 focus:ring-white focus:outline-none`}
              onClick={() => navigate("/newsletter")}
            >
              {user ? "Join the Community" : "Join the Waitlist"}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container relative z-20 mx-auto px-4">
        <div className="grid -mt-24 gap-8 md:grid-cols-3">
          <FeatureCard icon="skills" title="No Technical Skills Needed" description="Create professional content without any additional data files or technical expertise." className="text-gray-100" />
          <FeatureCard icon="ai" title="AI-Powered Creation" description="Leverage cutting-edge AI technology to bring your characters to life." className="text-gray-100" />
          <FeatureCard icon="security" title="Legal & Secure" description="All characters are fully licensed and ready for respective usage." className="text-gray-100" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-5xl bg-[#221f29] py-16 px-8 rounded-3xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-white drop-shadow">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="relative bg-[#19171D] rounded-2xl p-8 shadow-lg border border-[#281D3A] hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Basic</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$15</span>
                  <span className="ml-2 text-[#b7b6be]">/month</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#a086e5]" />
                    <span className="text-[#dedcee]">3 AI Characters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#a086e5]" />
                    <span className="text-[#dedcee]">Basic Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#a086e5]" />
                    <span className="text-[#dedcee]">1080p Video Quality</span>
                  </li>
                </ul>
                <CustomButton className="w-full rounded-xl bg-gradient-to-r from-[#9b87f5] to-[#62B3E5] text-white hover:brightness-110 py-6" onClick={() => navigate("/subscription")}>
                  Get Started
                </CustomButton>
              </div>
            </div>
            {/* Monetizable */}
            <div className="relative bg-[#19171D] rounded-2xl p-8 shadow-xl border-2 border-[#9b87f5] hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#9b87f5] to-[#62B3E5] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Monetizable Channels</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$40</span>
                  <span className="ml-2 text-[#b7b6be]">/month</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#9b87f5]" />
                    <span className="text-[#dedcee]">10 AI Characters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#9b87f5]" />
                    <span className="text-[#dedcee]">Priority Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#9b87f5]" />
                    <span className="text-[#dedcee]">2K Video Quality</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#9b87f5]" />
                    <span className="text-[#dedcee]">Commercial Rights</span>
                  </li>
                </ul>
                <CustomButton className="w-full rounded-xl bg-gradient-to-r from-[#9b87f5] to-[#62B3E5] text-white hover:brightness-110 py-6 transition-all" onClick={() => navigate("/subscription")}>
                  Go Premium
                </CustomButton>
              </div>
            </div>
            {/* Enterprise */}
            <div className="relative bg-[#19171D] rounded-2xl p-8 shadow-lg border border-[#281D3A] hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Enterprise</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7E69AB]" />
                    <span className="text-[#dedcee]">Advanced Features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7E69AB]" />
                    <span className="text-[#dedcee]">Dedicated Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7E69AB]" />
                    <span className="text-[#dedcee]">Custom Integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7E69AB]" />
                    <span className="text-[#dedcee]">SLA Guarantee</span>
                  </li>
                </ul>
                <CustomButton variant="outline" className="w-full border-2 border-[#9b87f5] text-[#9b87f5] hover:bg-[#7E69AB] hover:text-white py-6 transition-all rounded-xl" onClick={() => navigate("/contact")}>
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
          <p className="mb-12 text-lg text-[#b7b6be]">Connect with fellow creators and stay updated with the latest news and features.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <CustomButton 
              onClick={() => window.open('https://discord.gg/your-discord', '_blank')}
              size="lg"
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 bg-gradient-to-r from-[#9b87f5] to-[#62B3E5] hover:brightness-110 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-white font-semibold py-6 px-8 rounded-xl"
            >
              <div className="flex items-center justify-center gap-3 mx-auto">
                <MessageSquare className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Join Discord</span>
              </div>
            </CustomButton>
            <CustomButton 
              onClick={() => window.open('https://instagram.com/your-instagram', '_blank')}
              size="lg"
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 bg-gradient-to-r from-[#9b87f5] to-[#62B3E5] hover:brightness-110 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-white font-semibold py-6 px-8 rounded-xl"
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
              className="relative w-full sm:w-auto min-w-[200px] inline-flex items-center gap-2 border-2 border-[#9b87f5] text-[#9b87f5] hover:bg-[#7E69AB] hover:text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 font-semibold py-6 px-8 rounded-xl"
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
