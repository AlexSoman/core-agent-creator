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
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types/agent";
import { Play, Sparkles, Target, User, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExperimentDialogProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExperimentDialog({ agent, open, onOpenChange }: ExperimentDialogProps) {
  const [experimentName, setExperimentName] = useState("");
  const [experimentPrompt, setExperimentPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleStartExperiment = async () => {
    if (!experimentName.trim() || !experimentPrompt.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both experiment name and prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    
    // Simulate experiment running
    toast({
      title: "Experiment Started",
      description: `Starting "${experimentName}" with ${agent.name}...`,
    });

    // Simulate processing time
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Experiment Complete",
        description: `"${experimentName}" has been successfully executed!`,
      });
      setExperimentName("");
      setExperimentPrompt("");
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Start Experiment</DialogTitle>
              <DialogDescription>
                Run an experiment with your AI agent
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Agent Summary */}
          <div className="rounded-lg border border-border/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Agent Profile</h3>
              <Badge variant="secondary">{agent.name}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Role:</span>
                </div>
                <p className="text-foreground">{agent.role}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span className="font-medium">Goal:</span>
                </div>
                <p className="text-foreground">{agent.goal}</p>
              </div>
            </div>
          </div>

          {/* Experiment Configuration */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experiment-name" className="text-sm font-medium">
                Experiment Name
              </Label>
              <Input
                id="experiment-name"
                placeholder="e.g., Marketing Campaign Analysis"
                value={experimentName}
                onChange={(e) => setExperimentName(e.target.value)}
                disabled={isRunning}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experiment-prompt" className="text-sm font-medium">
                Experiment Prompt
              </Label>
              <Textarea
                id="experiment-prompt"
                placeholder="Describe what you want the agent to work on..."
                value={experimentPrompt}
                onChange={(e) => setExperimentPrompt(e.target.value)}
                className="min-h-[120px]"
                disabled={isRunning}
              />
            </div>
          </div>

          {isRunning && (
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Clock className="h-5 w-5 text-primary animate-spin" />
              <div>
                <p className="font-medium text-primary">Experiment in Progress</p>
                <p className="text-sm text-muted-foreground">
                  {agent.name} is working on "{experimentName}"...
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Cancel"}
          </Button>
          <Button 
            onClick={handleStartExperiment}
            disabled={isRunning}
            className="min-w-[140px]"
          >
            {isRunning ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Experiment
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}