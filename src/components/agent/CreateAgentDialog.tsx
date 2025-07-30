import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { CreateAgentData } from "@/types/agent";
import { useToast } from "@/hooks/use-toast";

interface CreateAgentDialogProps {
  onCreateAgent: (agentData: CreateAgentData) => void;
}

export function CreateAgentDialog({ onCreateAgent }: CreateAgentDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateAgentData>({
    name: "",
    role: "",
    goal: "",
    backstory: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.role.trim() || !formData.goal.trim() || !formData.backstory.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create an agent.",
        variant: "destructive",
      });
      return;
    }

    onCreateAgent(formData);
    setFormData({ name: "", role: "", goal: "", backstory: "" });
    setOpen(false);
    
    toast({
      title: "Agent Created",
      description: `${formData.name} has been successfully created!`,
    });
  };

  const handleInputChange = (field: keyof CreateAgentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="lg" className="shadow-lg">
          <Plus className="mr-2 h-5 w-5" />
          Create Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Agent</DialogTitle>
          <DialogDescription>
            Define your agent's characteristics and purpose. Fill in all fields to create a powerful AI agent.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Agent Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Marketing Assistant"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <Input
                id="role"
                placeholder="e.g., Senior Marketing Specialist"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal" className="text-sm font-medium">
                Goal
              </Label>
              <Textarea
                id="goal"
                placeholder="e.g., Create compelling marketing campaigns that drive engagement and conversions"
                value={formData.goal}
                onChange={(e) => handleInputChange("goal", e.target.value)}
                className="min-h-[80px] w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backstory" className="text-sm font-medium">
                Backstory
              </Label>
              <Textarea
                id="backstory"
                placeholder="e.g., You are an experienced marketing professional with 10+ years in digital marketing..."
                value={formData.backstory}
                onChange={(e) => handleInputChange("backstory", e.target.value)}
                className="min-h-[120px] w-full"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Create Agent
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}