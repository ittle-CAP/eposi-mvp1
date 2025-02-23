
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
      <div className="relative z-10 flex flex-col items-start transition-all duration-300 group-hover:-translate-y-12">
        <div className="mb-3 inline-flex rounded-lg bg-[#553D8A]/10 p-3 text-[#553D8A] transition-all duration-300 group-hover:opacity-0">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export { FeatureCard };
