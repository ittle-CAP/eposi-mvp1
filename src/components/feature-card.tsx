
import { Brain, Lock, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: "skills" | "ai" | "security";
  className?: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const Icon = {
    skills: UserRound,
    ai: Brain,
    security: Lock,
  }[icon];

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/95 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white">
      <div className="inline-flex rounded-lg bg-[#553D8A]/10 p-3 text-[#553D8A] transition-all duration-300 group-hover:opacity-0">
        <Icon className="h-6 w-6" />
      </div>
      <div className="relative z-10 transition-all duration-300">
        <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export { FeatureCard };
