import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ArrowLeft, Crown, Target, Zap } from "lucide-react";
import { Agent } from "@/types/agent";

interface LLMScore {
  name: string;
  score: number;
  attempts: number;
}

const LLMS = ["GPT-4", "Claude-3", "Gemini", "LLaMA-2", "PaLM-2"];

const ExperimentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { agent, experimentName, experimentPrompt, maxIterations } = location.state || {};

  const [currentIteration, setCurrentIteration] = useState(0);
  const [llmScores, setLlmScores] = useState<LLMScore[]>(
    LLMS.map(name => ({ name, score: 0, attempts: 0 }))
  );
  const [isComplete, setIsComplete] = useState(false);
  const [bestLLM, setBestLLM] = useState<string>("");

  useEffect(() => {
    if (!agent) {
      navigate("/");
      return;
    }

    const interval = setInterval(() => {
      if (currentIteration >= maxIterations) {
        setIsComplete(true);
        const winner = llmScores.reduce((prev, current) => 
          current.score > prev.score ? current : prev
        );
        setBestLLM(winner.name);
        clearInterval(interval);
        return;
      }

      // Simulate Monte Carlo selection - select random LLM
      const selectedLLM = LLMS[Math.floor(Math.random() * LLMS.length)];
      
      setLlmScores(prev => prev.map(llm => 
        llm.name === selectedLLM 
          ? { 
              ...llm, 
              score: Math.max(0, llm.score + (Math.random() - 0.3) * 20),
              attempts: llm.attempts + 1
            }
          : llm
      ));
      
      setCurrentIteration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIteration, maxIterations, agent, navigate, llmScores]);

  const handleComplete = () => {
    // In a real app, you would update the agent in your backend/state
    // For now, we'll just navigate back
    navigate("/", { 
      state: { 
        message: `Experiment completed! ${bestLLM} performed best and has been assigned to ${agent.name}.` 
      }
    });
  };

  if (!agent) return null;

  const chartData = llmScores.map(llm => ({
    name: llm.name,
    score: Math.round(llm.score),
    attempts: llm.attempts
  }));

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Agents
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Experiment Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {experimentName}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Agent: <Badge variant="secondary">{agent.name}</Badge>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {currentIteration}/{maxIterations}
                  </div>
                  <div className="text-sm text-muted-foreground">Iterations</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Task Prompt:</label>
                  <p className="text-sm mt-1">{experimentPrompt}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round((currentIteration / maxIterations) * 100)}%</span>
                  </div>
                  <Progress value={(currentIteration / maxIterations) * 100} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LLM Scores Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                LLM Performance Scores
              </CardTitle>
              <CardDescription>
                Real-time scores from Monte Carlo Tree Search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name, props) => [
                        `Score: ${value}`,
                        `Attempts: ${props.payload.attempts}`
                      ]}
                    />
                    <Bar 
                      dataKey="score" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Results */}
          {isComplete && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Crown className="h-5 w-5" />
                  Experiment Complete!
                </CardTitle>
                <CardDescription>
                  The best performing LLM has been identified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      Winner: <span className="text-primary">{bestLLM}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Final Score: {Math.round(llmScores.find(llm => llm.name === bestLLM)?.score || 0)}
                    </p>
                  </div>
                  <Button onClick={handleComplete} className="min-w-[120px]">
                    Save & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperimentResults;