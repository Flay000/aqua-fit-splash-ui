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
      title: "Objetivos Personalizados",
      description: "Planos de fitness e nutrição com IA adaptados às suas necessidades únicas"
    },
    {
      icon: Zap,
      title: "Análise Inteligente",
      description: "Análise avançada de imagens para acompanhar seu progresso e otimizar resultados"
    },
    {
      icon: Droplets,
      title: "Foco na Hidratação",
      description: "Rastreamento especializado de hidratação e rotinas de fitness aquático"
    },
    {
      icon: Users,
      title: "Suporte da Comunidade",
      description: "Conecte-se com pessoas que compartilham objetivos similares de saúde"
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
                Seu Companheiro de Saúde, Fitness e Nutrição com IA
              </p>
              
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in">
                Mergulhe em uma jornada de bem-estar personalizada com análise de IA avançada, 
                planos de treino sob medida e acompanhamento inteligente de nutrição.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button 
                  onClick={() => navigate("/register")}
                  variant="aqua"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Inicie Sua Jornada
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Entrar
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
                Por que Escolher o AquaFit?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experimente o futuro da saúde e fitness personalizado com nossos recursos inovadores
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
                  Pronto para Transformar sua Saúde?
                </CardTitle>
                <CardDescription className="text-lg">
                  Junte-se a milhares de usuários que já iniciaram sua jornada no AquaFit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/register")}
                  variant="aqua"
                  size="lg"
                  className="text-lg px-12 py-4"
                >
                  Começar Grátis
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
