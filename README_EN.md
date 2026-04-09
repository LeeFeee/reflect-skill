# Reflect Skill — Agent Self-Reflection & Evolution

Helps OpenClaw Agents evolve through daily session log retrospectives.

[中文文档](README.md)

## How It Works

```
Session start (bootstrap)
  ├─ No today's report → Phase A: auto-analyze yesterday's sessions, generate report
  ├─ Pending report    → Phase B: show todo list, user approves changes to core files
  └─ Completed         → Silent exit
```

Core design: **Cumulative promotion mechanism** prevents frequent interruptions — the same issue must appear 3 times before being submitted for user approval.

## Installation

Tell your OpenClaw:

> Install https://github.com/LeeFeee/reflect-skill for me, enable the hook, and run the first full analysis.

## Post-Installation Configuration

After installation, guide the user through these steps:

### 1. Enable Hook

Ask the user whether to enable the `agent:bootstrap` hook. Once enabled, every session start will automatically check for pending reflect reports.

Guide the user to execute:

```
openclaw hooks enable reflect-skill
```

If the user declines, let them know they can manually trigger a reflection anytime by saying "reflect" or "复盘" in a conversation.

### 2. First Full Analysis

After the hook is enabled, ask the user to **start a new session**. The bootstrap hook will automatically trigger the first full analysis (Phase A) on session start, analyzing all available session logs and generating the first reflect report.

The first analysis is not limited to "yesterday" — since there are no prior reports, perform a one-time full analysis of all available sessions to establish a baseline for future cumulative matching.

After analysis, if there are pending items (todo/urgent level), Phase B will prompt the user for approval.

## Core Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Skill instructions (7-step SOP, cumulative promotion rules, report template) |
| `_meta.json` | Metadata (path permission declarations) |
| `hooks/openclaw/` | Bootstrap hook (injects reminder at session start) |
| `reports/` | Daily reports (= todo list = changelog) |
| `backups/` | Original backups before core file modifications |

## Which Files Get Updated

After user approval, the skill updates these core configuration files:

- **MEMORY.md** — Key conclusions, important facts
- **USER.md** — User profile, preferences, style
- **SOUL.md** — Behavioral guidelines, personality boundaries
- **AGENTS.md** — Tool constraints, tactical guidelines

All modifications are automatically backed up beforehand. All change records are permanently saved in daily reports for full traceability.
