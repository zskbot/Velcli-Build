export type AgentMode = "plan" | "build" | "review";
export type AgentRole = "orchestrator" | "coder" | "reviewer" | "researcher" | "tester";

export interface AgentMessage { role: "system" | "user" | "assistant" | "tool"; content: string; createdAt?: string }
export interface AgentPlanStep { id: string; title: string; detail: string; status: "pending" | "running" | "done" | "blocked" }
export interface AgentRunRequest { prompt: string; mode: AgentMode; projectId?: string; conversationId?: string }
export interface AgentRunResult { runId: string; status: "queued" | "running" | "completed" | "failed"; message: string; plan: AgentPlanStep[] }

export interface ToolPermission { tool: string; allowed: boolean; reason: string }
export interface AgentTool<TInput = unknown, TOutput = unknown> {
  name: string;
  description: string;
  execute(input: TInput, context: { signal?: AbortSignal; permissions: ToolPermission[] }): Promise<TOutput>;
}
