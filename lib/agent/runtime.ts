import { randomUUID } from "node:crypto";
import type { AgentRunRequest, AgentRunResult, AgentPlanStep } from "./types";

/** Safe starter runtime: plans work but does not execute arbitrary shell/code. */
export function createPlan(request: AgentRunRequest): AgentRunResult {
  const prompt = request.prompt.trim();
  if (!prompt) throw new Error("A non-empty prompt is required.");
  const plan: AgentPlanStep[] = [
    { id: "inspect", title: "Inspect project context", detail: "Identify files, framework, constraints, and existing tests.", status: "pending" },
    { id: "plan", title: "Create an implementation plan", detail: "Break the request into verifiable, low-risk changes.", status: "pending" },
    { id: "implement", title: "Implement changes", detail: "Make scoped edits in an isolated workspace after permissions are granted.", status: "pending" },
    { id: "verify", title: "Run verification", detail: "Run lint, type checks, tests, and relevant health checks.", status: "pending" },
  ];
  return { runId: randomUUID(), status: "queued", message: `Plan created for ${request.mode} mode. No tools have been executed.`, plan };
}
