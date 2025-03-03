
import { useState } from "react";
import { ShoppingCart, Plus, Shield } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useSubscription } from "@/hooks/use-subscription";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PurchaseSection = () => {
  const [showAdminSection, setShowAdminSection] = useState(false);
  const [userId, setUserId] = useState("");
  const [unlockCount, setUnlockCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addUnlocksToUser } = useSubscription();

  const handleAdminAddUnlocks = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addUnlocksToUser(userId, unlockCount);
      // Reset form after submission
      setUserId("");
      setUnlockCount(1);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <CustomButton 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => setShowAdminSection(!showAdminSection)}
          >
            <Shield className="h-4 w-4" />
          </CustomButton>
        </div>
      </div>
      <p className="text-gray-600">Need more credits or unlocks? Purchase additional currency to enhance your experience.</p>
      
      {showAdminSection && (
        <div className="mt-6 border-t pt-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Admin: Add Unlocks
          </h3>
          <form onSubmit={handleAdminAddUnlocks} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="user-id">User ID</Label>
              <Input 
                id="user-id" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID" 
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unlock-count">Number of Unlocks</Label>
              <Input 
                id="unlock-count" 
                type="number" 
                min="1"
                value={unlockCount} 
                onChange={(e) => setUnlockCount(parseInt(e.target.value, 10))}
                required
              />
            </div>
            <CustomButton 
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Add Unlocks"}
            </CustomButton>
          </form>
        </div>
      )}
    </div>
  );
};
