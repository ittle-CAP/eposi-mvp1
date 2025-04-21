
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { CustomButton } from "@/components/ui/custom-button";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/9d2f5aa3-5aba-45fe-9236-96bf12782e8e.png"
          alt="Misty lake with boat and church"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#1A1F2C]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-32 pb-48 text-center">
        <div className="mx-auto max-w-3xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl">
              Fully Licensed Character Ready for Your Next AI Project
            </h1>
            <p className="mb-8 text-lg text-gray-200">
              Discover professional characters with standardized contracts, clear usage rights, and AI-based content creation—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CustomButton
                size="lg"
                className="h-14 px-12 text-lg"
                onClick={() => navigate("/characters")}
              >
                Browse Characters
              </CustomButton>
              <CustomButton
                variant="outline"
                size="lg"
                className="h-14 px-12 text-lg border-2 border-[#553D8A] text-[#553D8A] hover:bg-[#553D8A] hover:text-white"
                onClick={() => navigate("/how-it-works")}
              >
                How it Works
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
