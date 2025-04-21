
import { Search, Filter, Info } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomButton } from "@/components/ui/custom-button";
import { useState } from "react";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  genres: string[];
  selectedLicense?: string;
  setSelectedLicense?: (license: string) => void;
  licenseTypes?: string[];
}

export const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  genres,
  selectedLicense = "All",
  setSelectedLicense,
  licenseTypes = ["All", "Personal", "Creator", "Commercial"],
}: SearchFilterProps) => {
  // For dropdown control
  const [showLicenseDropdown, setShowLicenseDropdown] = useState(false);

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2 focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
        />
      </div>
      <div className="flex items-center gap-2 relative">
        <Filter className="h-5 w-5 text-gray-400" />
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre === "All" ? "all" : genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* License type selector */}
        {setSelectedLicense && (
          <div className="relative">
            <CustomButton
              className="ml-2 h-10 whitespace-nowrap flex items-center px-3"
              size="sm"
              variant={selectedLicense === "All" ? "outline" : "default"}
              onClick={() => setShowLicenseDropdown(v => !v)}
              type="button"
            >
              <Info className="w-4 h-4 mr-1" />
              Select License Type
            </CustomButton>
            {showLicenseDropdown && (
              <div className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-white border shadow-lg">
                <ul className="py-1">
                  {licenseTypes.map((license) => (
                    <li key={license}>
                      <button
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                          selectedLicense === license ? "font-bold text-[#553D8A]" : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedLicense(license);
                          setShowLicenseDropdown(false);
                        }}
                      >
                        {license}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
