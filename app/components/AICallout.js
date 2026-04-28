const TOOL_ICONS = {
  claude: {
    name: "Claude",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16.098 10.38l-4.408 2.15-2.24 4.366-2.014-4.49-4.447-2.03 4.408-2.15 2.24-4.366 2.014 4.49 4.447 2.03z" fill="currentColor" opacity="0.7"/>
        <path d="M20.5 14.2l-2.6 1.27-1.32 2.57-1.19-2.65-2.62-1.2 2.6-1.27 1.32-2.57 1.19 2.65 2.62 1.2z" fill="currentColor"/>
      </svg>
    ),
  },
  kiro: {
    name: "Kiro",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 9h8M8 12h5M8 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
};

export default function AICallout({ icon, text, showName = true }) {
  const tool = TOOL_ICONS[icon];
  if (!tool) return null;

  return (
    <div className="ai-callout">
      <span className="ai-callout-icon">
        {tool.svg}
        {showName && <span className="ai-callout-tool-name">{tool.name}</span>}
      </span>
      <span className="ai-callout-text">{text}</span>
    </div>
  );
}
