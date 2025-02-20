
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SignUpFieldsProps {
  fullName: string;
  region: string;
  birthYear: string;
  setFullName: (value: string) => void;
  setRegion: (value: string) => void;
  setBirthYear: (value: string) => void;
  countries: string[];
  years: number[];
}

export const SignUpFields = ({
  fullName,
  region,
  birthYear,
  setFullName,
  setRegion,
  setBirthYear,
  countries,
  years,
}: SignUpFieldsProps) => {
  return (
    <>
      <div>
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
        />
      </div>

      <div>
        <label htmlFor="birthYear" className="text-sm font-medium text-gray-700">
          Birth Year
        </label>
        <Select value={birthYear} onValueChange={setBirthYear}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder="Select your birth year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="region" className="text-sm font-medium text-gray-700">
          Region
        </label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Countries</SelectLabel>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
