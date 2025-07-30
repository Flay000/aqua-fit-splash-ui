import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Weight, Ruler, Upload, Brain, Utensils, Droplet, Beef } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configure a API Key do Gemini
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- INTERFACES ---
interface BMIResult {
  value: number;
  category: string;
  description: string;
  color: string;
}

interface AIAnalysis {
  bodyFatPercentage: number;
  muscleMassPercentage: number;
  dietPlan: string;
  waterIntake: string;
  proteinIntake: string;
}

// --- FUNÇÕES AUXILIARES ---
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// --- COMPONENTE PRINCIPAL ---
const Dashboard = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    goal: "",
    healthCondition: "",
  });
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    const weightNum = parseFloat(formData.weight);
    const heightNum = parseFloat(formData.height) / 100;

    if (!weightNum || !heightNum || heightNum <= 0) {
      toast({
        title: "Dados inválidos",
        description: "Por favor, insira peso e altura válidos.",
        variant: "destructive",
      });
      return;
    }

    const bmi = weightNum / (heightNum * heightNum);
    let category, description, color;

    if (bmi < 18.5) {
      category = "Abaixo do peso";
      description = "Você está abaixo do peso ideal. Recomenda-se acompanhamento profissional.";
      color = "text-blue-500";
    } else if (bmi < 25) {
      category = "Peso normal";
      description = "Parabéns! Você está na faixa de peso ideal.";
      color = "text-green-500";
    } else if (bmi < 30) {
      category = "Sobrepeso";
      description = "Você está com sobrepeso. Ajustes na dieta e exercícios são recomendados.";
      color = "text-yellow-500";
    } else {
      category = "Obesidade";
      description = "Você está na faixa de obesidade. É crucial buscar orientação médica.";
      color = "text-red-500";
    }

    setBmiResult({
      value: parseFloat(bmi.toFixed(1)),
      category,
      description,
      color,
    });

    toast({
      title: "IMC Calculado",
      description: `Seu IMC é ${bmi.toFixed(1)} (${category}).`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "Por favor, selecione uma imagem com até 10MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      toast({ title: "Imagem carregada", description: "Sua imagem está pronta para análise." });
    }
  };

  const handleImageAnalysis = async () => {
    if (!selectedFile || !bmiResult) {
      toast({
        title: "Dados incompletos",
        description: "Calcule o IMC e envie uma imagem antes de analisar.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis(null);

    const MAX_RETRIES = 5; // Define o número máximo de tentativas

    try {
      const weightNum = parseFloat(formData.weight);
      const waterIntake = (weightNum * 35).toFixed(0);
      const proteinIntake = (weightNum * 1.8).toFixed(1);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const imageBase64 = await toBase64(selectedFile);
      const imagePart = {
        inlineData: { data: imageBase64.split(",")[1], mimeType: selectedFile.type },
      };

      const prompt = `
        Você é um especialista em fitness e nutrição. Analise a imagem corporal e os dados do usuário para fornecer uma estimativa e um plano.
        Dados do Usuário:
        - Peso: ${formData.weight} kg, Altura: ${formData.height} cm, Idade: ${formData.age} anos, Gênero: ${formData.gender}
        - IMC: ${bmiResult.value} (${bmiResult.category})
        - Objetivo: ${formData.goal}
        - Restrições/Condições de Saúde: ${formData.healthCondition || "Nenhuma"}

        Sua Tarefa:
        1. Estime o percentual de gordura corporal.
        2. Estime o percentual de massa muscular.
        3. Crie um plano alimentar com EXATAMENTE 5 refeições (Café da Manhã, Lanche da Manhã, Almoço, Lanche da Tarde, Jantar).
        4. Ajuste a dieta ao objetivo do usuário.
        5. Seja direto e use o formato de resposta obrigatório abaixo. NÃO adicione nenhuma outra informação ou formatação.

        Formato da Resposta (OBRIGATÓRIO):
        Body Fat: [valor]%
        Muscle Mass: [valor]%
        Diet Plan:
        - Café da Manhã: [descrição da refeição]
        - Lanche da Manhã: [descrição da refeição]
        - Almoço: [descrição da refeição]
        - Lanche da Tarde: [descrição da refeição]
        - Jantar: [descrição da refeição]
      `;

      // --- Início da Lógica de Retentativa ---
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        console.log(`Tentativa de análise com IA: ${attempt} de ${MAX_RETRIES}`);
        
        try {
            const result = await model.generateContent([prompt, imagePart]);
            const responseText = await result.response.text();
    
            const bodyFatMatch = responseText.match(/Body Fat: ([\d.]+)%/);
            const muscleMassMatch = responseText.match(/Muscle Mass: ([\d.]+)%/);
            const dietPlanMatch = responseText.match(/Diet Plan:\n((?:- .+\n?)+)/);
    
            // Se a resposta for válida, processa e sai do loop
            if (bodyFatMatch && muscleMassMatch && dietPlanMatch) {
              console.log("Análise bem-sucedida!");
              const bodyFatPercentage = parseFloat(bodyFatMatch[1]);
              const muscleMassPercentage = parseFloat(muscleMassMatch[1]);
              const dietPlan = dietPlanMatch[1].trim();
    
              setAiAnalysis({
                bodyFatPercentage,
                muscleMassPercentage,
                dietPlan,
                waterIntake: `${waterIntake} ml`,
                proteinIntake: `${proteinIntake} g`,
              });
    
              toast({
                title: "Análise Concluída!",
                description: "Sua análise corporal e plano de dieta estão prontos.",
              });
              
              setIsAnalyzing(false); // Para a animação de loading
              return; // Sai da função handleImageAnalysis com sucesso
            }

            // Se a resposta não for válida, lança um erro para acionar a próxima tentativa
            throw new Error("Formato de resposta inválido da IA.");

        } catch (error) {
            console.error(`Tentativa ${attempt} falhou:`, error);
            // Se for a última tentativa, lança o erro final para o usuário
            if (attempt === MAX_RETRIES) {
                throw new Error(`A IA não respondeu como esperado após ${MAX_RETRIES} tentativas. Tente novamente mais tarde.`);
            }
        }
      }
      // --- Fim da Lógica de Retentativa ---

    } catch (error) {
      console.error("Erro final na análise com IA:", error);
      toast({
        title: "Erro na Análise",
        description: error instanceof Error ? error.message : "Não foi possível processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false); // Garante que a animação de loading sempre pare
    }
  };


  // O restante do componente permanece o mesmo...
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 p-4">
        {/* Formulário de Dados e Calculadora de IMC */}
        <Card className="aqua-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Seu Perfil de Saúde
              </CardTitle>
              <CardDescription>Preencha seus dados para calcular o IMC e obter análises personalizadas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inputs do formulário */}
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input id="weight" type="number" placeholder="70" value={formData.weight} onChange={(e) => handleInputChange("weight", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input id="height" type="number" placeholder="175" value={formData.height} onChange={(e) => handleInputChange("height", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input id="age" type="number" placeholder="25" value={formData.age} onChange={(e) => handleInputChange("age", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="goal">Objetivo Principal</Label>
                  <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose-weight">Perder Peso</SelectItem>
                      <SelectItem value="gain-muscle">Ganhar Músculo</SelectItem>
                      <SelectItem value="maintain">Manter Peso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="healthCondition">Condições de Saúde ou Restrições (Opcional)</Label>
                  <Textarea id="healthCondition" placeholder="Ex: intolerância à lactose, alergia a nozes..." value={formData.healthCondition} onChange={(e) => handleInputChange("healthCondition", e.target.value)} />
                </div>
              </div>

              <Button onClick={calculateBMI} className="w-full" disabled={isAnalyzing}>
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Meu IMC
              </Button>
            
              {bmiResult && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h3 className="text-lg font-semibold">Resultado do IMC</h3>
                  <p className="text-2xl font-bold">
                    Seu IMC é <span className={bmiResult.color}>{bmiResult.value}</span> — {bmiResult.category}
                  </p>
                  <p className="text-sm text-muted-foreground">{bmiResult.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

        {/* Análise com IA */}
        <Card className="aqua-card">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Análise Corporal com IA
            </CardTitle>
            <CardDescription>Envie uma foto de corpo inteiro (frente ou lado) para uma análise detalhada e um plano de dieta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => document.getElementById('image-upload')?.click()}>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="image-upload" disabled={isAnalyzing} />
                {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mx-auto" />
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto" />
                    <p className="font-medium">Clique para enviar uma imagem</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG ou WEBP (Max 10MB)</p>
                  </div>
                )}
            </div>
            
            <Button onClick={handleImageAnalysis} className="w-full" disabled={isAnalyzing || !selectedFile || !bmiResult}>
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Analisando...
                </>
              ) : "Analisar com IA"}
            </Button>

            {aiAnalysis && (
              <div className="mt-6 space-y-6 p-4 bg-muted rounded-lg">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-primary">Resultados da Análise</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-background rounded-lg">
                            <p className="text-sm text-muted-foreground">Gordura Corporal</p>
                            <p className="text-2xl font-bold">{aiAnalysis.bodyFatPercentage}%</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg">
                            <p className="text-sm text-muted-foreground">Massa Muscular</p>
                            <p className="text-2xl font-bold">{aiAnalysis.muscleMassPercentage}%</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4 text-primary">Metas Diárias</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                           <Droplet className="w-6 h-6 text-blue-500" />
                           <div>
                                <p className="text-sm text-muted-foreground">Consumo de Água</p>
                                <p className="font-bold">{aiAnalysis.waterIntake}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <Beef className="w-6 h-6 text-red-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">Meta de Proteína</p>
                                <p className="font-bold">{aiAnalysis.proteinIntake}</p>
                            </div>
                       </div>
                    </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-primary">
                    <Utensils className="w-6 h-6" />
                    Plano Alimentar Sugerido
                  </h3>
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-background p-4 rounded-lg">{aiAnalysis.dietPlan}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;