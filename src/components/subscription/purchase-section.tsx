
import { ShoppingCart, Plus } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

export const PurchaseSection = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#553D8A]/10 p-3">
            <ShoppingCart className="h-6 w-6 text-[#553D8A]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Purchase More</h2>
        </div>
        <div className="flex gap-2">
          <CustomButton variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buy Credits
          </CustomButton>
          <CustomButton variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buy Unlocks
          </CustomButton>
        </div>
      </div>
      <p className="text-gray-600">Need more credits or unlocks? Purchase additional currency to enhance your experience.</p>
    </div>
  );
};
