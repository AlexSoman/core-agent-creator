export interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAgentData {
  name: string;
  role: string;
  goal: string;
  backstory: string;
}