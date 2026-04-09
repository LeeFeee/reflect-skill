---
name: reflect-skill
description: "Injects reflect-skill reminder during agent bootstrap"
metadata: {"openclaw":{"emoji":"🪞","events":["agent:bootstrap"]}}
---

# Reflect Skill Hook

Injects a reminder to check for pending reflect reports during agent bootstrap.

## What It Does

- Fires on `agent:bootstrap` (before workspace files are injected)
- Checks if there are pending review reports in the reflect-skill's reports/ directory
- Reminds the agent to either generate today's report (Phase A) or prompt user for review (Phase B)

## Configuration

No configuration needed. Enable with:

```bash
openclaw hooks enable reflect-skill
```
