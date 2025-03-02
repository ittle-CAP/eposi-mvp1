
import { useToast } from "@/hooks/use-toast";

/**
 * Type for error handlers with different specificity levels
 */
export type ErrorHandler = {
  handleError: (error: unknown, context?: string) => void;
  handleApiError: (error: unknown, operation: string) => void;
  handleGenerationError: (error: unknown, generationType: string) => void;
};

/**
 * Hook for consistent error handling across the application
 * @returns Object with error handling functions
 */
export const useErrorHandler = (): ErrorHandler => {
  const { toast } = useToast();

  /**
   * Safely extracts error message from different error types
   */
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      return String(error.message);
    }
    return "An unknown error occurred";
  };

  /**
   * Logs and handles a generic error
   */
  const handleError = (error: unknown, context?: string) => {
    const errorMessage = getErrorMessage(error);
    const contextPrefix = context ? `${context}: ` : "";
    console.error(`${contextPrefix}Error:`, error);
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  /**
   * Handles API-related errors with operation context
   */
  const handleApiError = (error: unknown, operation: string) => {
    handleError(error, `API ${operation}`);
  };

  /**
   * Specifically handles content generation errors
   */
  const handleGenerationError = (error: unknown, generationType: string) => {
    const errorMessage = getErrorMessage(error);
    console.error(`${generationType} generation error:`, error);
    
    toast({
      title: `${generationType} Generation Failed`,
      description: errorMessage,
      variant: "destructive",
    });
  };

  return {
    handleError,
    handleApiError,
    handleGenerationError
  };
};
