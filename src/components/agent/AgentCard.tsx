import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types/agent";
import { Edit, Trash2, Play, Calendar, Target, User } from "lucide-react";
import { EditAgentDialog } from "./EditAgentDialog";
import { DeleteAgentDialog } from "./DeleteAgentDialog";
import { ExperimentDialog } from "./ExperimentDialog";

interface AgentCardProps {
  agent: Agent;
  onEdit: (id: string, updates: Partial<Agent>) => void;
  onDelete: (id: string) => void;
}

export function AgentCard({ agent, onEdit, onDelete }: AgentCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExperimentDialog, setShowExperimentDialog] = useState(false);

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {agent.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{agent.role}</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent/50">
              <Calendar className="h-3 w-3 mr-1" />
              {agent.createdAt.toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Target className="h-4 w-4 text-primary" />
              Goal
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {agent.goal}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="h-4 w-4 text-primary" />
              Backstory
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {agent.backstory}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="pt-4 border-t border-border/50">
          <div className="flex gap-2 w-full">
            <Button
              variant="elegant"
              size="sm"
              onClick={() => setShowExperimentDialog(true)}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Experiment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditDialog(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <EditAgentDialog
        agent={agent}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={(updates) => onEdit(agent.id, updates)}
      />

      <DeleteAgentDialog
        agent={agent}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => onDelete(agent.id)}
      />

      <ExperimentDialog
        agent={agent}
        open={showExperimentDialog}
        onOpenChange={setShowExperimentDialog}
      />
    </>
  );
}