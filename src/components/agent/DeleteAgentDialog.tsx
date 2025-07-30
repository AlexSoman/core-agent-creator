import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Agent } from "@/types/agent";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeleteAgentDialogProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteAgentDialog({ agent, open, onOpenChange, onConfirm }: DeleteAgentDialogProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    onConfirm();
    onOpenChange(false);
    
    toast({
      title: "Agent Deleted",
      description: `${agent.name} has been permanently deleted.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Delete Agent</DialogTitle>
              <DialogDescription className="mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <span className="font-medium text-foreground">{agent.name}</span>? 
            This will permanently remove the agent and all associated data.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}