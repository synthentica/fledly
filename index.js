import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Fledly for OpenCode: registers the hosted Fledly MCP server (OAuth sign-in on first use) and a skill that
// tells the agent which Fledly tool answers which question. Works with OpenCode 1.x (`server` hooks) and
// 2.x (`setup`), the same way @sveltejs/opencode does. If the user already configured an MCP server that
// points at fledly.app, that entry is left alone.

const MCP_URL = "https://fledly.app/mcp";
const NAME = "fledly";
const SKILLS_DIR = join(dirname(fileURLToPath(import.meta.url)), "skills");

const isFledly = (mcp) => mcp?.type === "remote" && typeof mcp.url === "string" && mcp.url.includes("fledly.app/mcp");

async function v1_plugin() {
  return {
    async config(input) {
      input.mcp ??= {};
      input.skills ??= {};
      input.skills.paths ??= [];
      if (!Object.values(input.mcp).some(isFledly) && !input.mcp[NAME]) {
        input.mcp[NAME] = { type: "remote", url: MCP_URL, enabled: true };
      }
      input.skills.paths.push(SKILLS_DIR);
    },
  };
}

async function v2_setup(ctx) {
  await ctx.mcp.transform((draft) => {
    if (draft.get(NAME) || draft.list().some(([, mcp]) => isFledly(mcp))) return;
    draft.set(NAME, { type: "remote", url: MCP_URL });
  });

  const path = join(SKILLS_DIR, NAME, "SKILL.md");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(await readFile(path, "utf8"));
  if (!match) return;
  const description = /^description:\s*(.+)$/m.exec(match[1])?.[1].trim();
  // OpenCode renamed Skill.Info.location to path in 2.0.4; send both so one build works on either side.
  await ctx.skill.transform((draft) => {
    draft.add({ id: NAME, name: NAME, description, path, location: path, content: match[2] });
  });
}

let loaded_by_v1 = false;

export default {
  id: "opencode-fledly",
  // OpenCode 1.x reads `server`; 2.x calls `setup` and ignores `server`.
  get server() {
    loaded_by_v1 = true;
    return v1_plugin;
  },
  setup: v2_setup,
};
