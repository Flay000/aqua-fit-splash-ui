import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import { Upload, Camera } from "lucide-react";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    goal: "",
    activityType: "",
    daysPerWeek: "",
    healthCondition: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAnalysis = () => {
    if (!selectedFile) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione uma imagem para analisar",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    toast({
      title: "Análise concluída!",
      description: "Sua imagem foi analisada. Confira os resultados abaixo.",
    });
  };

  const handleSubmitProfile = () => {
    // Check if all required fields are filled
    const requiredFields = ['weight', 'height', 'age', 'gender', 'goal', 'activityType', 'daysPerWeek'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Informações em falta",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Perfil atualizado!",
      description: "Seu perfil de saúde foi salvo com sucesso.",
    });
  };

  if (isAnalyzing) {
    return <LoadingScreen onComplete={handleAnalysisComplete} />;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Bem-vindo ao AquaFit</h1>
          <p className="text-lg text-muted-foreground">
            Vamos personalizar sua jornada de saúde e fitness
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="aqua-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Perfil de Saúde</CardTitle>
              <CardDescription>
                Conte-nos sobre você para receber recomendações personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="aqua-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    className="aqua-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="aqua-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="aqua-input">
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo de Fitness</Label>
                <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
                  <SelectTrigger className="aqua-input">
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-weight">Perder Peso</SelectItem>
                    <SelectItem value="gain-muscle">Ganhar Músculo</SelectItem>
                    <SelectItem value="maintain">Manter Peso Atual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activityType">Nível de Atividade</Label>
                  <Select value={formData.activityType} onValueChange={(value) => handleInputChange("activityType", value)}>
                    <SelectTrigger className="aqua-input">
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Leve</SelectItem>
                      <SelectItem value="moderate">Moderado</SelectItem>
                      <SelectItem value="intense">Intenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daysPerWeek">Dias por Semana</Label>
                  <Select value={formData.daysPerWeek} onValueChange={(value) => handleInputChange("daysPerWeek", value)}>
                    <SelectTrigger className="aqua-input">
                      <SelectValue placeholder="Selecione os dias" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <SelectItem key={day} value={day.toString()}>{day} dia{day > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthCondition">Condições de Saúde (Opcional)</Label>
                <Textarea
                  id="healthCondition"
                  placeholder="Alguma condição de saúde ou medicamento que devemos saber..."
                  value={formData.healthCondition}
                  onChange={(e) => handleInputChange("healthCondition", e.target.value)}
                  className="aqua-input"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleSubmitProfile}
                className="w-full aqua-button"
              >
                Salvar Perfil
              </Button>
            </CardContent>
          </Card>

          {/* AI Image Analysis */}
          <Card className="aqua-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Análise de Imagem com IA
              </CardTitle>
              <CardDescription>
                Envie uma foto para análise de saúde e fitness com IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-muted-foreground">
                          Clique para alterar a imagem
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-lg font-medium">Enviar uma imagem</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG até 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {selectedFile && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Arquivo selecionado:</p>
                    <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleImageAnalysis}
                className="w-full aqua-button"
                disabled={!selectedFile}
              >
                Analisar com IA
              </Button>

              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">O que nossa IA pode analisar?</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Estimativa de composição corporal</li>
                  <li>Análise de postura</li>
                  <li>Avaliação da forma de exercício</li>
                  <li>Análise nutricional de refeições</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;