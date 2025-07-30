import { Agent } from "@/types/agent";
import { AgentCard } from "./AgentCard";

interface AgentGridProps {
  agents: Agent[];
  onEdit: (id: string, updates: Partial<Agent>) => void;
  onDelete: (id: string) => void;
}

export function AgentGrid({ agents, onEdit, onDelete }: AgentGridProps) {
  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No agents yet</h3>
          <p className="text-muted-foreground">
            Create your first AI agent to get started with experiments and automation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}