import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const Layout = ({ children, showHeader = true }: LayoutProps) => {
  return (
    <div className="min-h-screen ripple-bg">
      {showHeader && (
        <header className="p-4 aqua-card border-b">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-aquafit.png" 
                alt="AquaFit Logo" 
                className="w-10 h-10 floating-animation"
              />
              <h1 className="text-2xl font-bold text-primary">AquaFit</h1>
            </div>
          </div>
        </header>
      )}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;