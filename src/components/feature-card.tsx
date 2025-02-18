
import { Brain, Lock, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: "skills" | "ai" | "security";
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  const Icon = {
    skills: UserRound,
    ai: Brain,
    security: Lock,
  }[icon];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl",
        "before:absolute before:inset-0 before:z-0 before:bg-gradient-to-br before:from-white/40 before:to-white/60 before:backdrop-blur-xl",
        className
      )}
    >
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-lg bg-[#553D8A]/10 p-3 text-[#553D8A] transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export { FeatureCard };
