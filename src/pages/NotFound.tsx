
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ghost, Home, RotateCcw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Ghost Character Animation */}
        <div className="relative mx-auto w-32 h-32 mb-6 animate-float">
          <Ghost className="w-full h-full text-saga-400" strokeWidth={1.5} />
          <div className="absolute -bottom-4 w-full h-1 bg-gray-200 rounded-full opacity-30"></div>
        </div>
        
        {/* Error Content */}
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold text-saga-600">404</h1>
          <h2 className="text-2xl font-bold text-gray-800">Oops! Page not found</h2>
          <p className="text-gray-600 mt-2">
            Looks like this page has gone ghost! We've searched high and low,
            but couldn't find what you're looking for.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="default" 
            className="gap-2"
            onClick={() => window.location.href = "/"}
          >
            <Home size={18} />
            Back to Home
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => window.history.back()}
          >
            <RotateCcw size={18} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
