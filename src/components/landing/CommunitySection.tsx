
import { CustomButton } from "@/components/ui/custom-button";
import { MessageSquare, Instagram, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CommunitySection = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-gray-900">Join Our Community</h2>
        <p className="mb-12 text-lg text-gray-600">
          Connect with fellow creators and stay updated with the latest news and features.
        </p>

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
  );
};
