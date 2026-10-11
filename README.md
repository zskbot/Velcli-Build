# Velcli Build

**Velcli Build** is the unified Velclaw workspace for planning, building, reviewing, and shipping software with AI agents.

## Current foundation

- Responsive agent-workspace UI with Plan / Build / Review modes.
- Shared TypeScript contracts for agent runs, plans, roles, and tool permissions.
- Safe starter planning runtime; it does **not** execute arbitrary shell commands or generated code.
- `GET /api/health` for deployment smoke checks. It reports whether `DATABASE_URL` is configured; it does not claim to have verified a database connection.
- Environment variable template without real credentials.
- CI workflow for lint, type checking, and production build.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Health check: `GET /api/health`.

## Environment variables

Configure credentials in the hosting provider's secret/environment settings. Do not commit `.env` files, API keys, database URLs, or access tokens. See `.env.example` for variable names only.

## Roadmap

1. Persistent users, conversations, projects, and agent runs with PostgreSQL migrations.
2. Provider adapters with model selection and secret-safe routing.
3. Permissioned tool registry, isolated sandbox, filesystem and Git tools.
4. Plan/execute/verify loop, subagents, skills, MCP servers, plugins, hooks, and `AGENTS.md` support.
5. CLI/headless mode, background jobs, code review, memory, and web research.
6. Deployment integration, audit logs, and verified production health checks.

These roadmap items are not yet implemented by the starter foundation. No database or existing production resource is deleted or modified by this repository scaffold.
