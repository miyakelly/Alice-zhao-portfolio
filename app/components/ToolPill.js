import { MCP, Bedrock, Nova, Claude, ClaudeCode, Figma, Github, Codex, Adobe, OpenAI } from "@lobehub/icons";
import "./ToolPill.css";

const iconMap = { MCP, Bedrock, Nova, Claude, ClaudeCode, Figma, Github, Codex, Adobe, OpenAI };

export default function ToolPill({ name, icon }) {
  const Icon = iconMap[icon] || MCP;
  return (
    <span className="tool-pill">
      <Icon width={14} height={14} />
      {name}
    </span>
  );
}
