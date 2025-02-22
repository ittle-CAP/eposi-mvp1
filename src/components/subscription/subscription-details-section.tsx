
import { Settings, Plus } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

interface SubscriptionDetailsSectionProps {
  planType: string;
  planEndsAt: string;
}

export const SubscriptionDetailsSection = ({ planType, planEndsAt }: SubscriptionDetailsSectionProps) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-4">
        <div className="rounded-full bg-[#553D8A]/10 p-3">
          <Settings className="h-6 w-6 text-[#553D8A]" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Subscription Details</h2>
      </div>
      <div className="mb-6">
        <p className="text-gray-600">
          Current Plan: <span className="font-medium capitalize">{planType}</span>
        </p>
        <p className="text-sm text-gray-500">
          Renews on {planEndsAt ? new Date(planEndsAt).toLocaleDateString() : 'Loading...'}
        </p>
      </div>
      <CustomButton className="w-full flex items-center justify-center gap-2">
        <Plus className="h-4 w-4" />
        Upgrade Plan
      </CustomButton>
    </div>
  );
};
