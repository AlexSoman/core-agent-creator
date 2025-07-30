import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/types/agent";
import { useToast } from "@/hooks/use-toast";

interface EditAgentDialogProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<Agent>) => void;
}

export function EditAgentDialog({ agent, open, onOpenChange, onSave }: EditAgentDialogProps) {
  const [formData, setFormData] = useState({
    name: agent.name,
    role: agent.role,
    goal: agent.goal,
    backstory: agent.backstory,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.role.trim() || !formData.goal.trim() || !formData.backstory.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to update the agent.",
        variant: "destructive",
      });
      return;
    }

    onSave({
      ...formData,
      updatedAt: new Date(),
    });
    onOpenChange(false);
    
    toast({
      title: "Agent Updated",
      description: `${formData.name} has been successfully updated!`,
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Agent</DialogTitle>
          <DialogDescription>
            Update your agent's characteristics and purpose.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">
                Agent Name
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role" className="text-sm font-medium">
                Role
              </Label>
              <Input
                id="edit-role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-goal" className="text-sm font-medium">
                Goal
              </Label>
              <Textarea
                id="edit-goal"
                value={formData.goal}
                onChange={(e) => handleInputChange("goal", e.target.value)}
                className="min-h-[80px] w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-backstory" className="text-sm font-medium">
                Backstory
              </Label>
              <Textarea
                id="edit-backstory"
                value={formData.backstory}
                onChange={(e) => handleInputChange("backstory", e.target.value)}
                className="min-h-[120px] w-full"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}