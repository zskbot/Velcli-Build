"use client";

import { useState } from "react";
import { Activity, ArrowUp, BookOpen, Bot, Check, ChevronDown, Code2, Command, FileCode2, GitBranch, Globe2, Layers3, PanelLeft, Plus, Search, Settings2, ShieldCheck, Sparkles, TerminalSquare, Wrench } from "lucide-react";

type Mode = "Plan" | "Build" | "Review";
const starters = [
  { icon: Code2, title: "Build a feature", text: "Implement a feature in my existing project" },
  { icon: ShieldCheck, title: "Review code", text: "Review the code for bugs and security issues" },
  { icon: GitBranch, title: "Understand a repo", text: "Map the architecture and explain the key modules" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<Mode>("Plan");
  const [notice, setNotice] = useState("Your workspace is ready. Connect a model provider to start an agent run.");
  const [showTools, setShowTools] = useState(false);
  const submit = () => {
    if (!prompt.trim()) { setNotice("Enter a task first."); return; }
    setNotice(`Request queued locally in ${mode} mode. Agent execution and provider credentials are not configured yet.`);
  };

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Sparkles size={19}/></div><div><strong>velcli<span>build</span></strong><small>AGENT WORKSPACE</small></div><button className="icon-btn mobile-menu" aria-label="Open sidebar"><PanelLeft size={18}/></button></div>
      <button className="new-task" onClick={() => { setPrompt(""); setNotice("New task started."); }}><Plus size={17}/> New task <span>⌘ K</span></button>
      <div className="side-label">WORKSPACE</div>
      <nav className="nav-list"><a className="nav-active"><Command size={17}/> Agent chat</a><a><Layers3 size={17}/> Projects <span className="nav-count">0</span></a><a><FileCode2 size={17}/> Files</a><a><TerminalSquare size={17}/> Terminal</a><a><GitBranch size={17}/> Git & changes</a></nav>
      <div className="side-label section-spaced">AGENT TOOLS</div>
      <nav className="nav-list"><a><BookOpen size={17}/> Skills</a><a><Wrench size={17}/> MCP & plugins</a><a><Activity size={17}/> Runs & logs</a></nav>
      <div className="sidebar-bottom"><div className="connection"><span className="status-dot"/><div><b>Runtime offline</b><small>Provider not connected</small></div><Settings2 size={16}/></div><div className="profile"><div className="avatar">V</div><div><b>Velclaw workspace</b><small>Local preview</small></div><ChevronDown size={15}/></div></div>
    </aside>
    <section className="main-panel">
      <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span className="slash">/</span><strong>New task</strong><span className="beta">BETA</span></div><div className="top-actions"><button className="quiet-btn"><Search size={16}/><span>Search</span></button><button className="icon-btn" aria-label="Activity"><Activity size={17}/></button><div className="avatar avatar-small">V</div></div></header>
      <div className="workspace-content"><div className="welcome"><div className="welcome-orb"><Bot size={30}/><span/></div><div className="eyebrow"><span className="pulse"/> YOUR AI DEVELOPMENT WORKSPACE</div><h1>What are we <em>building</em> today?</h1><p>Plan the work, build with agents, and verify every change in one workspace.</p>
      <div className="capability-row"><span><Check size={14}/> Plan-first workflow</span><span><Check size={14}/> Isolated tool permissions</span><span><Check size={14}/> Verify before ship</span></div>
      <div className="composer"><div className="composer-top"><span className="composer-label"><Sparkles size={15}/> Describe your task</span><button className="icon-btn tiny" onClick={() => setShowTools(!showTools)} aria-label="Toggle tools"><Wrench size={15}/></button></div><textarea value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }} placeholder="Build a dashboard, fix a bug, review a pull request..." rows={3}/>
      {showTools && <div className="tool-notice"><ShieldCheck size={15}/> Tools are permission-gated. Shell, filesystem, network, and deploy actions will require explicit runtime configuration.</div>}
      <div className="composer-bottom"><div className="mode-switch" aria-label="Agent mode">{(["Plan", "Build", "Review"] as Mode[]).map(m => <button key={m} className={mode === m ? "mode-selected" : ""} onClick={() => setMode(m)}>{m === "Plan" ? <BookOpen size={14}/> : m === "Build" ? <Code2 size={14}/> : <ShieldCheck size={14}/>} {m}</button>)}</div><div className="send-group"><span className="enter-hint">↵ to submit</span><button className="send-btn" onClick={submit} aria-label="Submit task"><ArrowUp size={19}/></button></div></div></div>
      <div className="starter-grid">{starters.map(({icon: Icon, title, text}) => <button className="starter-card" key={title} onClick={() => setPrompt(text)}><span className="starter-icon"><Icon size={17}/></span><span className="starter-title">{title}</span><span className="starter-text">{text}</span><span className="starter-arrow">↗</span></button>)}</div>
      <div className="notice"><span className="notice-icon"><Globe2 size={15}/></span><span>{notice}</span></div>
      </div><footer className="footer"><span><span className="footer-dot"/> All systems ready for setup</span><span><a href="/api/health" target="_blank" rel="noreferrer">Health API</a><span className="footer-sep">·</span> Built for the Velclaw ecosystem</span></footer></div>
    </section>
  </main>;
}
