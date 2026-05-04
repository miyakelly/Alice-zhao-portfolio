"use client";

const WARM = "#C05A30";
const WARM_FILL = "oklch(0.65 0.12 45 / 0.06)";
const WARM_LINE = "oklch(0.65 0.12 45 / 0.5)";
const NEUTRAL_STROKE = "var(--muted)";
const NEUTRAL_FILL = "var(--bg2)";
const GREEN = "var(--accent)";

function ConnectorLine({ x1, y1, x2, y2, color = NEUTRAL_STROKE, dashed = false }) {
  const midX = (x1 + x2) / 2;
  return (
    <g>
      <path
        d={`M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`}
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        strokeDasharray={dashed ? "3 3" : "none"}
      />
      <polygon
        points={`${x2},${y2} ${x2 - 5},${y2 - 2.5} ${x2 - 5},${y2 + 2.5}`}
        fill={color}
      />
    </g>
  );
}

function NodeBox({ x, y, w, h, label, sublabel, stroke = NEUTRAL_STROKE, fill = "none", labelColor }) {
  const textColor = labelColor || stroke;
  return (
    <g>
      <rect
        x={x - w / 2} y={y - h / 2}
        width={w} height={h}
        rx="3"
        stroke={stroke}
        strokeWidth="0.75"
        fill={fill}
      />
      {sublabel ? (
        <>
          <text x={x} y={y - 3} textAnchor="middle" fill={textColor}
            fontSize="9" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif" letterSpacing="0.06em">
            {label}
          </text>
          <text x={x} y={y + 10} textAnchor="middle" fill={textColor}
            fontSize="9" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif" letterSpacing="0.06em">
            {sublabel}
          </text>
        </>
      ) : (
        <text x={x} y={y + 3} textAnchor="middle" fill={textColor}
          fontSize="9" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif" letterSpacing="0.06em">
          {label}
        </text>
      )}
    </g>
  );
}

function SectionLabel({ x, y, children, color = NEUTRAL_STROKE }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={color}
      fontSize="7.5" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif"
      letterSpacing="0.12em" style={{ textTransform: "uppercase" }}>
      {children}
    </text>
  );
}

function NumberBadge({ x, y, n, color = NEUTRAL_STROKE }) {
  return (
    <g>
      <circle cx={x} cy={y} r="8" stroke={color} strokeWidth="0.5" fill="none" />
      <text x={x} y={y + 3} textAnchor="middle" fill={color}
        fontSize="7" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif">
        {n}
      </text>
    </g>
  );
}

export function DiagramImagine() {
  const cx = [120, 280, 440];
  const cy = 130;
  const w = 100;
  const h = 56;

  return (
    <svg viewBox="0 0 560 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Simple three-step workflow: Storage to Infrastructure to Analytics Engine">

      <NumberBadge x={cx[0]} y={cy - 46} n="1" />
      <NumberBadge x={cx[1]} y={cy - 46} n="2" />
      <NumberBadge x={cx[2]} y={cy - 46} n="3" />

      <NodeBox x={cx[0]} y={cy} w={w} h={h} label="Storage" fill={NEUTRAL_FILL} />
      <NodeBox x={cx[1]} y={cy} w={w} h={h} label="Infrastructure" fill={NEUTRAL_FILL} />
      <NodeBox x={cx[2]} y={cy} w={w} h={h} label="Analytics" sublabel="Engine" fill={NEUTRAL_FILL} />

      <ConnectorLine x1={cx[0] + w / 2 + 2} y1={cy} x2={cx[1] - w / 2 - 2} y2={cy} />
      <ConnectorLine x1={cx[1] + w / 2 + 2} y1={cy} x2={cx[2] - w / 2 - 2} y2={cy} />

      <SectionLabel x={cx[0]} y={cy + h / 2 + 18}>DATA IN</SectionLabel>
      <SectionLabel x={cx[1]} y={cy + h / 2 + 18}>PROCESS</SectionLabel>
      <SectionLabel x={cx[2]} y={cy + h / 2 + 18}>QUERY</SectionLabel>
    </svg>
  );
}

export function DiagramProblem() {
  const cx = [120, 280, 440];
  const cy = 130;
  const w = 100;
  const h = 56;

  const fileRects = [];
  for (let i = 0; i < 8; i++) {
    fileRects.push({
      x: cx[0] - 32 + (i % 4) * 17,
      y: cy - 18 + Math.floor(i / 4) * 20,
      w: 14,
      h: 18,
      rotation: (i % 3 - 1) * 4,
    });
  }

  const pipes = [
    `M${cx[1] - 40},${cy - 18} C${cx[1] - 10},${cy - 18} ${cx[1] - 20},${cy + 12} ${cx[1] + 10},${cy - 8} C${cx[1] + 30},${cy - 22} ${cx[1] + 20},${cy + 18} ${cx[1] + 40},${cy + 6}`,
    `M${cx[1] - 40},${cy - 6} C${cx[1] - 15},${cy + 20} ${cx[1] + 5},${cy - 25} ${cx[1] + 20},${cy + 2} C${cx[1] + 32},${cy + 20} ${cx[1] + 35},${cy - 10} ${cx[1] + 40},${cy - 12}`,
    `M${cx[1] - 40},${cy + 8} C${cx[1] - 20},${cy - 15} ${cx[1]},${cy + 22} ${cx[1] + 15},${cy + 14} C${cx[1] + 28},${cy + 8} ${cx[1] + 35},${cy + 20} ${cx[1] + 40},${cy + 18}`,
    `M${cx[1] - 40},${cy + 18} C${cx[1] - 10},${cy + 5} ${cx[1] + 5},${cy + 25} ${cx[1] + 25},${cy - 5} C${cx[1] + 35},${cy - 18} ${cx[1] + 38},${cy + 8} ${cx[1] + 40},${cy - 2}`,
  ];

  return (
    <svg viewBox="0 0 560 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Detailed workflow showing disorganized files and tangled pipelines as pain points">

      <NumberBadge x={cx[0]} y={cy - 46} n="1" color={WARM} />
      <NumberBadge x={cx[1]} y={cy - 46} n="2" color={WARM} />
      <NumberBadge x={cx[2]} y={cy - 46} n="3" />

      {/* Storage: scattered file rectangles */}
      <g>
        <rect x={cx[0] - w / 2} y={cy - h / 2} width={w} height={h} rx="3"
          stroke={WARM} strokeWidth="0.75" fill={WARM_FILL} strokeDasharray="2 2" />
        {fileRects.map((r, i) => (
          <g key={i} transform={`rotate(${r.rotation}, ${r.x + r.w / 2}, ${r.y + r.h / 2})`}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="1.5"
              stroke={WARM} strokeWidth="0.5" fill="none" opacity={0.4 + i * 0.06} />
            <line x1={r.x + 3} y1={r.y + 5} x2={r.x + r.w - 3} y2={r.y + 5}
              stroke={WARM} strokeWidth="0.3" opacity={0.3} />
            <line x1={r.x + 3} y1={r.y + 8} x2={r.x + r.w - 4} y2={r.y + 8}
              stroke={WARM} strokeWidth="0.3" opacity={0.3} />
          </g>
        ))}
        <SectionLabel x={cx[0]} y={cy + h / 2 + 18} color={WARM}>DATA IN</SectionLabel>
      </g>

      {/* Infrastructure: tangled thin pipes */}
      <g>
        <rect x={cx[1] - w / 2} y={cy - h / 2} width={w} height={h} rx="3"
          stroke={WARM} strokeWidth="0.75" fill={WARM_FILL} strokeDasharray="2 2" />
        {pipes.map((d, i) => (
          <path key={i} d={d} stroke={WARM} strokeWidth="1" strokeLinecap="round"
            fill="none" opacity={0.25 + i * 0.15} />
        ))}
        {/* Small junction dots where pipes visually cross */}
        {[
          [cx[1] - 5, cy - 6], [cx[1] + 12, cy + 4], [cx[1] - 18, cy + 10],
          [cx[1] + 28, cy - 8], [cx[1] + 5, cy + 16],
        ].map(([dx, dy], i) => (
          <circle key={i} cx={dx} cy={dy} r="1.5" fill={WARM} opacity={0.4} />
        ))}
        <SectionLabel x={cx[1]} y={cy + h / 2 + 18} color={WARM}>PROCESS</SectionLabel>
      </g>

      {/* Analytics Engine: clean */}
      <g>
        <NodeBox x={cx[2]} y={cy} w={w} h={h} label="Analytics" sublabel="Engine" fill={NEUTRAL_FILL} />
        <SectionLabel x={cx[2]} y={cy + h / 2 + 18}>QUERY</SectionLabel>
      </g>

      {/* Connectors */}
      <ConnectorLine x1={cx[0] + w / 2 + 2} y1={cy} x2={cx[1] - w / 2 - 2} y2={cy} color={WARM} dashed />
      <ConnectorLine x1={cx[1] + w / 2 + 2} y1={cy} x2={cx[2] - w / 2 - 2} y2={cy} color={NEUTRAL_STROKE} />
    </svg>
  );
}

export function DiagramSolution() {
  const cx = [120, 280, 440];
  const cy = 130;
  const w = 100;
  const h = 56;
  const pad = 20;

  const containerX = cx[0] - w / 2 - pad;
  const containerY = cy - h / 2 - pad - 16;
  const containerW = cx[1] - cx[0] + w + pad * 2;
  const containerH = h + pad * 2 + 16;

  return (
    <svg viewBox="0 0 560 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="S3 Tables unifies storage and infrastructure into a single managed service">

      <NumberBadge x={cx[0]} y={cy - 46} n="1" color={GREEN} />
      <NumberBadge x={cx[1]} y={cy - 46} n="2" color={GREEN} />
      <NumberBadge x={cx[2]} y={cy - 46} n="3" />

      {/* S3 Tables container */}
      <rect x={containerX} y={containerY} width={containerW} height={containerH}
        rx="5" stroke={GREEN} strokeWidth="0.75" fill="none" />
      <text x={containerX + 10} y={containerY - 6} fill={GREEN}
        fontSize="7.5" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif"
        letterSpacing="0.12em">
        S3 TABLES
      </text>

      {/* Structured Storage */}
      <g>
        <rect x={cx[0] - w / 2} y={cy - h / 2} width={w} height={h} rx="3"
          stroke={GREEN} strokeWidth="0.75" fill={NEUTRAL_FILL} />
        {/* Neat organized rows inside */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={cx[0] - 30} y={cy - 16 + i * 12} width={60} height={8} rx="1.5"
              stroke={GREEN} strokeWidth="0.35" fill="none" opacity={0.35} />
          </g>
        ))}
        <SectionLabel x={cx[0]} y={cy + h / 2 + 18} color={GREEN}>STRUCTURED</SectionLabel>
      </g>

      {/* Managed Maintenance */}
      <g>
        <rect x={cx[1] - w / 2} y={cy - h / 2} width={w} height={h} rx="3"
          stroke={GREEN} strokeWidth="0.75" fill={NEUTRAL_FILL} />
        {/* Clean parallel lines inside */}
        {[0, 1, 2].map((i) => (
          <line key={i}
            x1={cx[1] - 30} y1={cy - 12 + i * 12}
            x2={cx[1] + 30} y2={cy - 12 + i * 12}
            stroke={GREEN} strokeWidth="0.5" opacity={0.3} />
        ))}
        {/* Small checkmarks */}
        {[0, 1, 2].map((i) => (
          <path key={`check-${i}`}
            d={`M${cx[1] + 22},${cy - 14 + i * 12} l2,2 l4,-4`}
            stroke={GREEN} strokeWidth="0.75" fill="none" opacity={0.5} />
        ))}
        <SectionLabel x={cx[1]} y={cy + h / 2 + 18} color={GREEN}>MANAGED</SectionLabel>
      </g>

      {/* Analytics Engine */}
      <g>
        <NodeBox x={cx[2]} y={cy} w={w} h={h} label="Analytics" sublabel="Engine" fill={NEUTRAL_FILL} />
        <SectionLabel x={cx[2]} y={cy + h / 2 + 18}>QUERY</SectionLabel>
      </g>

      {/* Connectors */}
      <ConnectorLine x1={cx[0] + w / 2 + 2} y1={cy} x2={cx[1] - w / 2 - 2} y2={cy} color={GREEN} />
      <ConnectorLine x1={cx[1] + w / 2 + 2} y1={cy} x2={cx[2] - w / 2 - 2} y2={cy} />
    </svg>
  );
}
