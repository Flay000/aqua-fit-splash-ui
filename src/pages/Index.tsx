import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Droplets, Target, Users, Zap } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Personalized Goals",
      description: "AI-powered fitness and nutrition plans tailored to your unique needs"
    },
    {
      icon: Zap,
      title: "Smart Analytics",
      description: "Advanced image analysis to track your progress and optimize results"
    },
    {
      icon: Droplets,
      title: "Hydration Focus",
      description: "Specialized hydration tracking and aqua-based fitness routines"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with like-minded individuals on similar health journeys"
    }
  ];

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex justify-center mb-8">
                <img 
                  src="/logo-aquafit.png" 
                  alt="AquaFit Logo" 
                  className="w-24 h-24 floating-animation"
                />
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 animate-fade-in">
                AquaFit
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
                Your AI-Powered Health, Fitness & Nutrition Companion
              </p>
              
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in">
                Dive into a personalized wellness journey with cutting-edge AI analysis, 
                tailored workout plans, and smart nutrition tracking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button 
                  onClick={() => navigate("/register")}
                  variant="aqua"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Start Your Journey
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">
                Why Choose AquaFit?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the future of personalized health and fitness with our innovative features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="aqua-card text-center hover-scale animate-fade-in">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <feature.icon className="w-12 h-12 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="aqua-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl text-primary mb-4">
                  Ready to Transform Your Health?
                </CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of users who have already started their AquaFit journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/register")}
                  variant="aqua"
                  size="lg"
                  className="text-lg px-12 py-4"
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
