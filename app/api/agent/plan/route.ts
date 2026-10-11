import { NextRequest, NextResponse } from "next/server";
import { createPlan } from "@/lib/agent/runtime";
import type { AgentMode } from "@/lib/agent/types";

export const dynamic = "force-dynamic";
const modes = new Set<AgentMode>(["plan", "build", "review"]);

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Request body must be an object." }, { status: 400 });
  const input = body as Record<string, unknown>;
  if (typeof input.prompt !== "string" || input.prompt.trim().length === 0) return NextResponse.json({ error: "prompt is required." }, { status: 400 });
  if (input.prompt.length > 12000) return NextResponse.json({ error: "prompt must be 12,000 characters or fewer." }, { status: 413 });
  const mode = typeof input.mode === "string" && modes.has(input.mode as AgentMode) ? input.mode as AgentMode : "plan";
  try {
    const result = createPlan({ prompt: input.prompt, mode, projectId: typeof input.projectId === "string" ? input.projectId : undefined, conversationId: typeof input.conversationId === "string" ? input.conversationId : undefined });
    return NextResponse.json(result, { status: 202, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Unable to create plan." }, { status: 400 });
  }
}
