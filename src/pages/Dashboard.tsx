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
        title: "No image selected",
        description: "Please select an image to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    toast({
      title: "Analysis complete!",
      description: "Your image has been analyzed. Check your results below.",
    });
  };

  const handleSubmitProfile = () => {
    // Check if all required fields are filled
    const requiredFields = ['weight', 'height', 'age', 'gender', 'goal', 'activityType', 'daysPerWeek'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile updated!",
      description: "Your health profile has been saved successfully.",
    });
  };

  if (isAnalyzing) {
    return <LoadingScreen onComplete={handleAnalysisComplete} />;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Welcome to AquaFit</h1>
          <p className="text-lg text-muted-foreground">
            Let's personalize your health and fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="aqua-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Health Profile</CardTitle>
              <CardDescription>
                Tell us about yourself to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
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
                  <Label htmlFor="height">Height (cm)</Label>
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
                  <Label htmlFor="age">Age</Label>
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
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="aqua-input">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
                  <SelectTrigger className="aqua-input">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-weight">Lose Weight</SelectItem>
                    <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                    <SelectItem value="maintain">Maintain Current Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activityType">Activity Level</Label>
                  <Select value={formData.activityType} onValueChange={(value) => handleInputChange("activityType", value)}>
                    <SelectTrigger className="aqua-input">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="intense">Intense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daysPerWeek">Days per Week</Label>
                  <Select value={formData.daysPerWeek} onValueChange={(value) => handleInputChange("daysPerWeek", value)}>
                    <SelectTrigger className="aqua-input">
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <SelectItem key={day} value={day.toString()}>{day} day{day > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthCondition">Health Conditions (Optional)</Label>
                <Textarea
                  id="healthCondition"
                  placeholder="Any health conditions or medications we should know about..."
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
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* AI Image Analysis */}
          <Card className="aqua-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Camera className="w-6 h-6" />
                AI Image Analysis
              </CardTitle>
              <CardDescription>
                Upload a photo for AI-powered health and fitness analysis
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
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-lg font-medium">Upload an image</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {selectedFile && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected file:</p>
                    <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleImageAnalysis}
                className="w-full aqua-button"
                disabled={!selectedFile}
              >
                Analyze with AI
              </Button>

              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">What can our AI analyze?</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Body composition estimation</li>
                  <li>Posture analysis</li>
                  <li>Exercise form assessment</li>
                  <li>Meal nutrition breakdown</li>
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