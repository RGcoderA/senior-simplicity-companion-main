
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center elder-card max-w-lg">
        <div className="inline-block bg-companion-lightBlue p-6 rounded-full mb-6">
          <h1 className="text-[80px] font-bold text-companion-blue">404</h1>
        </div>
        <h2 className="text-elder-xl font-bold text-companion-dark mb-4">Page Not Found</h2>
        <p className="text-elder-base text-gray-600 mb-8">
          We couldn't find the page you were looking for. Let's get you back to the dashboard.
        </p>
        <Button asChild className="elder-button bg-companion-blue text-white hover:bg-companion-blue/90">
          <a href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
