import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import logo from "@/pages/appyellow.png";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(async () => {
      setIsLoading(false);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
          throw new Error("Login falhou. Verifique suas credenciais.");
        }
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao AquaFit",
          duration: 1000,
        });
        navigate("/dashboard");
      } catch (error) {
        toast({
          title: "Erro ao fazer login",
          description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md aqua-card animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src={logo} 
                alt="AquaFit Logo" 
                className="w-16 h-16 floating-animation"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">AquaFit</CardTitle>
            <CardDescription>
              Entre na sua jornada de saúde e fitness
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="aqua-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="aqua-input"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full aqua-button"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link 
                  to="/register" 
                  className="text-primary hover:text-secondary transition-colors font-medium"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;