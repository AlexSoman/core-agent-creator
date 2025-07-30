import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Play, Sparkles, Target, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExperimentDialogProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExperimentDialog({ agent, open, onOpenChange }: ExperimentDialogProps) {
  const [experimentName, setExperimentName] = useState("");
  const [experimentPrompt, setExperimentPrompt] = useState("");
  const [maxIterations, setMaxIterations] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartExperiment = async () => {
    if (!experimentName.trim() || !experimentPrompt.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both experiment name and prompt.",
        variant: "destructive",
      });
      return;
    }

    if (maxIterations < 1 || maxIterations > 100) {
      toast({
        title: "Invalid Iterations",
        description: "Max iterations must be between 1 and 100.",
        variant: "destructive",
      });
      return;
    }

    onOpenChange(false);
    navigate(`/experiment/${agent.id}`, {
      state: {
        agent,
        experimentName,
        experimentPrompt,
        maxIterations
      }
    });
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
            
            <div className="space-y-2">
              <Label htmlFor="max-iterations" className="text-sm font-medium">
                Max Iterations
              </Label>
              <Input
                id="max-iterations"
                type="number"
                min="1"
                max="100"
                placeholder="10"
                value={maxIterations}
                onChange={(e) => setMaxIterations(parseInt(e.target.value) || 10)}
                disabled={isRunning}
              />
              <p className="text-xs text-muted-foreground">
                Number of iterations to run the experiment (1-100)
              </p>
            </div>
          </div>

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
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Experiment
            </>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}