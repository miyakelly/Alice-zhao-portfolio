import { ClaudeCode, Codex, Github, Adobe, Figma, ZenMux, Bedrock, OpenRouter } from "@lobehub/icons";
import s from "./MetricCard.module.css";
import "./Tools.css";

const iconMap = {
  "Claude Code": ClaudeCode,
  "Codex": Codex,
  "Github": Github,
  "Adobe": Adobe,
  "OpenRouter": OpenRouter,
  "Figma": Figma,
  "ZenMux": ZenMux,
  "Bedrock": Bedrock
};

export default function Tools({ heading, items }) {
  return (
    <section className="about-section col-grid">
      <h2>{heading}</h2>
      <div className="tools-strip">
        {items.map((tool, i) => (
          <div key={i} className={`${s.card} tool-card`}>
            {(() => { const Icon = iconMap[tool.name]; return Icon ? <div className="tool-card-logo"><Icon width="100%" height="100%" /></div> : null; })()}
            <div>
              <span className={s.value}>{tool.name}</span>
              <p className={s.label}>{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
