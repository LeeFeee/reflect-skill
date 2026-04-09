/**
 * Reflect Skill Hook for OpenClaw
 *
 * Injects a reminder to check reflect reports during agent bootstrap.
 * Fires on agent:bootstrap event before workspace files are injected.
 */

import type { HookHandler } from 'openclaw/hooks';

const REMINDER_CONTENT = `## Reflect Skill Reminder

Check the reflect-skill reports directory for pending items:

1. If today's report does not exist → Run Phase A: analyze yesterday's sessions, generate report
2. If a report has \`status: pending\` → Run Phase B: show pending items to user for review
3. If today's report has \`status: completed\` → Do nothing, stay silent

See the reflect-skill SKILL.md for full SOP.`;

const handler: HookHandler = async (event) => {
  if (!event || typeof event !== 'object') {
    return;
  }

  if (event.type !== 'agent' || event.action !== 'bootstrap') {
    return;
  }

  if (!event.context || typeof event.context !== 'object') {
    return;
  }

  // Skip sub-agent sessions
  const sessionKey = event.sessionKey || '';
  if (sessionKey.includes(':subagent:')) {
    return;
  }

  if (Array.isArray(event.context.bootstrapFiles)) {
    event.context.bootstrapFiles.push({
      path: 'REFLECT_SKILL_REMINDER.md',
      content: REMINDER_CONTENT,
      virtual: true,
    });
  }
};

export default handler;
