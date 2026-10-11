import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);
  return NextResponse.json({
    status: "ok",
    service: "velcli-build",
    timestamp: new Date().toISOString(),
    checks: { app: "ok", database: databaseConfigured ? "configured" : "not_configured" },
  }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
