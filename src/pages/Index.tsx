import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Droplets, Target, Users, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import React from 'react';
import logo from "@/pages/appyellow.png";

// Componente para o Efeito de Chuva (inalterado, mas agora mais visível)
const RainEffect = () => {
  const rainDrops = Array.from({ length: 100 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${0.5 + Math.random() * 0.5}s`,
      animationDelay: `${Math.random() * 5}s`,
    };
    return <div key={i} className="raindrop" style={style}></div>;
  });

  return (
    <>
      <style>
        {`
          @keyframes fall {
            from {
              transform: translateY(-250px);
            }
            to {
              transform: translateY(100vh);
            }
          }

          .raindrop {
            position: absolute;
            bottom: 100%;
            width: 1px;
            height: 80px;
            pointer-events: none;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
            animation: fall linear infinite;
          }
        `}
      </style>
      {rainDrops}
    </>
  );
};


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
      {/* Container principal com fundo preto */}
      <div className="relative min-h-screen bg-black overflow-hidden">
        
        <RainEffect />

        <div className="relative z-10">
            {/* Hero Section */}
            <section className="relative">
              <div className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="flex justify-center mb-8">
                    <img 
                      src={logo} 
                      alt="AquaFit Logo" 
                      className="w-24 h-24 floating-animation"
                    />
                  </div>
                  
                  {/* Título em amarelo */}
                  <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 mb-6 animate-fade-in">
                    AquaFit
                  </h1>
                  
                  {/* Textos de descrição em um tom de amarelo mais suave */}
                  <p className="text-xl md:text-2xl text-yellow-300 mb-8 animate-fade-in">
                    Seu Companheiro de Saúde, Fitness e Nutrição com IA
                  </p>
                  
                  <p className="text-lg text-yellow-300 mb-12 max-w-2xl mx-auto animate-fade-in">
                    Mergulhe em uma jornada de bem-estar personalizada com análise de IA avançada, 
                    planos de treino sob medida e acompanhamento inteligente de nutrição.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                    {/* Botão primário preenchido */}
                    <Button 
                      onClick={() => navigate("/register")}
                      size="lg"
                      className="text-lg px-8 py-4 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold transition-colors"
                    >
                      Inicie Sua Jornada
                    </Button>
                    {/* Botão secundário vazado */}
                    <Button 
                      onClick={() => navigate("/login")}
                      size="lg"
                      className="text-lg px-8 py-4 bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold transition-colors"
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
                  <h2 className="text-4xl font-bold text-yellow-400 mb-4">
                    Por que Escolher o AquaFit?
                  </h2>
                  <p className="text-xl text-yellow-300 max-w-2xl mx-auto">
                    Experimente o futuro da saúde e fitness personalizado com nossos recursos inovadores
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    // Cards com fundo sutil para se destacar do background preto puro
                    <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 text-center hover-scale animate-fade-in">
                      <CardHeader>
                        <div className="flex justify-center mb-4">
                          {/* Ícones em branco para destaque */}
                          <feature.icon className="w-12 h-12 text-white" />
                        </div>
                        <CardTitle className="text-xl text-yellow-400">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base text-yellow-300">
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
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-3xl text-yellow-400 mb-4">
                      Pronto para Transformar sua Saúde?
                    </CardTitle>
                    <CardDescription className="text-lg text-yellow-300">
                      Junte-se a milhares de usuários que já iniciaram sua jornada no AquaFit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => navigate("/register")}
                      size="lg"
                      className="text-lg px-12 py-4 bg-yellow-400 text-black hover:bg-yellow-500 font-bold transition-colors"
                    >
                      Começar Grátis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
        </div>
      </div>
    </Layout>
  );
};

export default Index;