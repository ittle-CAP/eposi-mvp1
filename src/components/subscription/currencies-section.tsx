
import { CreditCard, User } from "lucide-react";

interface CurrenciesSectionProps {
  credits: number;
  unlocks: number;
}

export const CurrenciesSection = ({ credits, unlocks }: CurrenciesSectionProps) => {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#553D8A]/10 p-3">
            <CreditCard className="h-6 w-6 text-[#553D8A]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Credits</h2>
            <p className="text-3xl font-bold text-[#553D8A]">{credits}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#553D8A]/10 p-3">
            <User className="h-6 w-6 text-[#553D8A]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Unlocks</h2>
            <p className="text-3xl font-bold text-[#553D8A]">{unlocks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
