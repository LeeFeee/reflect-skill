# Reflect Skill — Agent 自我复盘与进化

通过每日复盘 session 日志，帮助 OpenClaw Agent 自我进化。

## 工作原理

```
会话启动（bootstrap）
  ├─ 无今日报告 → 阶段 A：自动分析昨日 session，生成复盘报告
  ├─ 有待审批报告 → 阶段 B：展示待办清单，用户逐条审批后修改核心文件
  └─ 已完成 → 静默退出
```

核心设计：**累积升级机制**避免频繁打扰——同一个问题出现 3 次才会提交用户审批。

## 安装方法

对你的 OpenClaw 说：

> 给我安装 https://github.com/LeeFeee/reflect-skill，并且启用 hook，然后进行第一次全量分析。

## 安装后配置

安装完成后，请引导用户完成以下步骤：

### 1. 启用 Hook

向用户确认是否启用 `agent:bootstrap` hook，启用后每次会话启动会自动检查是否有待处理的复盘报告。

引导用户执行：

```
openclaw hooks enable reflect-skill
```

如果用户拒绝启用 hook，告知用户可以随时手动触发复盘（在对话中说"复盘"或"reflect"）。

### 2. 首次全量分析

hook 启用后，引导用户**开启一个新会话**。新会话启动时 bootstrap hook 会自动触发首次全量分析（阶段 A），分析 Agent 历史所有 session 日志并生成第一份复盘报告。

首次分析范围不限于"昨天"——因为之前没有历史报告，应对所有可用 session 进行一次性全量分析，为后续的累积匹配建立基线。

分析完成后，如果有待审批项（todo/urgent 级别），会进入阶段 B 提示用户审批。

## 核心文件

| 文件 | 用途 |
|------|------|
| `SKILL.md` | skill 指令（七步 SOP、累积升级规则、报告模板） |
| `_meta.json` | 元数据（路径权限声明） |
| `hooks/openclaw/` | bootstrap hook（会话启动时注入提醒） |
| `reports/` | 每日报告（= 待办清单 = changelog） |
| `backups/` | 核心文件修改前的原始备份 |

## 更新哪些文件

经用户审批后，skill 会更新以下核心配置文件：

- **MEMORY.md** — 关键结论、重要事实
- **USER.md** — 用户画像、偏好、风格
- **SOUL.md** — 行为准则、性格边界
- **AGENTS.md** — 工具约束、战术准则

所有修改前自动备份，所有修改记录永久保存在每日报告中，可溯源。
