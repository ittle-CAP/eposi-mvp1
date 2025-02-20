
import { Check, X } from "lucide-react";

interface PasswordFieldsProps {
  password: string;
  confirmPassword: string;
  passwordValid: boolean;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  isSignUp: boolean;
}

export const PasswordFields = ({
  password,
  confirmPassword,
  passwordValid,
  setPassword,
  setConfirmPassword,
  isSignUp,
}: PasswordFieldsProps) => {
  return (
    <>
      <div className="relative">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
          />
          {isSignUp && password && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {passwordValid ? <Check className="h-5 w-5 text-green-500" /> : null}
            </div>
          )}
        </div>
        {isSignUp && !passwordValid && password && (
          <p className="mt-1 text-sm text-red-500">
            Password should be at least 6 characters with uppercase, lowercase, and numbers
          </p>
        )}
      </div>

      {isSignUp && (
        <div className="relative">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
            />
            {confirmPassword && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {password === confirmPassword ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
