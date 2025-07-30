import { useState } from "react";
import { Agent, CreateAgentData } from "@/types/agent";
import { CreateAgentDialog } from "@/components/agent/CreateAgentDialog";
import { AgentGrid } from "@/components/agent/AgentGrid";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bot } from "lucide-react";

const Index = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const handleCreateAgent = (agentData: CreateAgentData) => {
    const newAgent: Agent = {
      id: crypto.randomUUID(),
      ...agentData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAgents(prev => [...prev, newAgent]);
  };

  const handleEditAgent = (id: string, updates: Partial<Agent>) => {
    setAgents(prev => 
      prev.map(agent => 
        agent.id === id 
          ? { ...agent, ...updates, updatedAt: new Date() }
          : agent
      )
    );
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Agent Creator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Create, manage, and experiment with AI agents. Build your team of specialized assistants to automate tasks and boost productivity.
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-card/50">
                <Sparkles className="h-3 w-3 mr-1" />
                {agents.length} Agent{agents.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            <CreateAgentDialog onCreateAgent={handleCreateAgent} />
          </div>
        </div>

        {/* Agent Grid */}
        <AgentGrid 
          agents={agents}
          onEdit={handleEditAgent}
          onDelete={handleDeleteAgent}
        />
      </div>
    </div>
  );
};

export default Index;
