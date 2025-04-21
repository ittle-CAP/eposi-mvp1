
import { CustomButton } from "@/components/ui/custom-button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
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
              <CustomButton
                className="w-full bg-[#553D8A] text-white hover:bg-[#553D8A]/90 py-6"
                onClick={() => navigate("/subscription")}
              >
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
              <CustomButton
                className="w-full bg-[#553D8A] text-white hover:bg-[#553D8A]/90 py-6"
                onClick={() => navigate("/subscription")}
              >
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
              <CustomButton
                variant="outline"
                className="w-full border-2 border-[#553D8A] text-[#553D8A] hover:bg-[#553D8A] hover:text-white py-6"
                onClick={() => navigate("/contact")}
              >
                Contact Sales
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
