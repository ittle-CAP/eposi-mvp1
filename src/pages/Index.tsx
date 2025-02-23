
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/feature-card";
import { Header } from "@/components/navigation/header";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquare, Instagram, Mail } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-white">
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
          <FeatureCard
            icon="skills"
            title="No Technical Skills Needed"
            description="Create professional content with any additional data files or technical expertise."
          />
          <FeatureCard
            icon="ai"
            title="AI-Powered Creation"
            description="Leverage cutting-edge AI technology to bring your characters to life."
          />
          <FeatureCard
            icon="security"
            title="Legal & Secure"
            description="All characters are fully licensed and ready for respective usage."
          />
        </div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">Join Our Community</h2>
          <p className="mb-12 text-lg text-gray-600">Connect with fellow creators and stay updated with the latest news and features.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <CustomButton 
              onClick={() => window.open('https://discord.gg/your-discord', '_blank')}
              size="lg" 
              className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-white font-semibold py-6"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              Join Discord
            </CustomButton>
            
            <CustomButton 
              onClick={() => window.open('https://instagram.com/your-instagram', '_blank')}
              size="lg" 
              className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#E4405F] to-[#FD1D1D] hover:from-[#D63251] hover:to-[#E31D1D] shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-white font-semibold py-6"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
              Follow on Instagram
            </CustomButton>
            
            <CustomButton 
              onClick={() => navigate("/newsletter")}
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2 border-2 border-[#553D8A] text-[#553D8A] hover:bg-[#553D8A] hover:text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 font-semibold py-6"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Join Newsletter
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
