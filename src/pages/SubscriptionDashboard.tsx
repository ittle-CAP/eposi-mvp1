
import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, User, Settings, Plus, ShoppingCart } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

interface UnlockedCharacter {
  id: string;
  name: string;
  imageUrl: string;
  lastUsed: string;
}

const SubscriptionDashboard = () => {
  // Example data (in a real app, this would come from your backend)
  const [credits] = useState(3);
  const [unlockedCharacters] = useState<UnlockedCharacter[]>([
    {
      id: "1",
      name: "Neo",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      lastUsed: "2024-01-15",
    },
    {
      id: "2",
      name: "BuzzBot",
      imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      lastUsed: "2024-01-10",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      {/* Logo */}
      <Link to="/" className="fixed left-4 top-4 text-xl font-semibold text-gray-900">
        Saga
      </Link>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Subscription Dashboard</h1>

        {/* Credits Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#553D8A]/10 p-3">
              <CreditCard className="h-6 w-6 text-[#553D8A]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Available Credits</h2>
              <p className="text-3xl font-bold text-[#553D8A]">{credits} credits</p>
            </div>
          </div>
        </div>

        {/* Unlocked Characters Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-full bg-[#553D8A]/10 p-3">
              <User className="h-6 w-6 text-[#553D8A]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Unlocked Characters</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {unlockedCharacters.map((character) => (
              <div key={character.id} className="flex items-center gap-4 rounded-lg border p-4">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{character.name}</h3>
                  <p className="text-sm text-gray-500">
                    Last used: {new Date(character.lastUsed).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Details Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-full bg-[#553D8A]/10 p-3">
              <Settings className="h-6 w-6 text-[#553D8A]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Subscription Details</h2>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">Current Plan: <span className="font-medium">Basic</span></p>
            <p className="text-sm text-gray-500">Renews on February 1st, 2024</p>
          </div>
          <CustomButton className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Upgrade for More Credits
          </CustomButton>
        </div>

        {/* Purchase Credits Section */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-[#553D8A]/10 p-3">
                <ShoppingCart className="h-6 w-6 text-[#553D8A]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Purchase Credits</h2>
            </div>
            <CustomButton variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Buy Credits
            </CustomButton>
          </div>
          <p className="text-gray-600">Need more credits? Purchase additional credits to unlock more characters.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
