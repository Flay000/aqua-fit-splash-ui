import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
}

const LoadingScreen = ({ onComplete, message = "Analyzing your image..." }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center space-y-8">
        <div className="relative">
          <img 
            src="/logo-aquafit.png" 
            alt="AquaFit Logo" 
            className="w-24 h-24 mx-auto logo-spin"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">AquaFit AI</h2>
          <p className="text-muted-foreground">{message}</p>
          
          <div className="w-64 mx-auto bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;