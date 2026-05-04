"use client";

const WARM = "#C05A30";
const WARM_FILL = "oklch(0.65 0.12 45 / 0.06)";
const NEUTRAL_STROKE = "var(--muted)";
const NEUTRAL_FILL = "var(--bg2)";
const GREEN = "var(--accent)";
const INK = "var(--ink)";

function ActionPill({ x, y, text, color = NEUTRAL_STROKE, fill = "none", opacity = 1 }) {
  const w = text.length * 5.8 + 20;
  return (
    <g opacity={opacity}>
      <rect x={x - w / 2} y={y - 11} width={w} height={22} rx="11"
        stroke={color} strokeWidth="0.75" fill={fill} />
      <text x={x} y={y + 3.5} textAnchor="middle" fill={color}
        fontSize="8.5" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif">
        {text}
      </text>
    </g>
  );
}

function BubbleCallout({ x, y, text, tailDirection = "bottom" }) {
  const w = text.length * 5 + 24;
  const h = 26;
  const tailOffset = tailDirection === "left" ? -8 : tailDirection === "right" ? 8 : 0;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="4"
        stroke={NEUTRAL_STROKE} strokeWidth="0.5" fill={NEUTRAL_FILL} />
      <polygon
        points={`${x + tailOffset - 4},${y + h / 2} ${x + tailOffset},${y + h / 2 + 6} ${x + tailOffset + 4},${y + h / 2}`}
        fill={NEUTRAL_FILL} stroke={NEUTRAL_STROKE} strokeWidth="0.5" />
      <text x={x} y={y + 3} textAnchor="middle" fill={INK}
        fontSize="7.5" fontStyle="italic" fontFamily="'Helvetica Neue', sans-serif">
        {text}
      </text>
    </g>
  );
}

function CategoryLabel({ x, y, text, color = NEUTRAL_STROKE }) {
  return (
    <text x={x} y={y} fill={color}
      fontSize="7.5" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif"
      letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>
      {text}
    </text>
  );
}

export function DiagramScopingChaos() {
  const actions = [
    { text: "Create table bucket", x: 320, y: 85 },
    { text: "Create table", x: 130, y: 155 },
    { text: "Integrate with analytics services", x: 370, y: 200 },
    { text: "List tables", x: 180, y: 240 },
    { text: "Configure compaction", x: 420, y: 130 },
  ];

  return (
    <svg viewBox="0 0 560 320" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Scattered user actions with team discussion bubbles showing the challenge of prioritization">

      {/* Conversation bubbles */}
      <BubbleCallout x={140} y={60} text="[TBD]" tailDirection="right" />
      <BubbleCallout x={460} y={55} text="[TBD]" tailDirection="left" />
      <BubbleCallout x={280} y={285} text="[TBD]" tailDirection="bottom" />

      {/* Scattered action pills */}
      {actions.map((a, i) => (
        <ActionPill key={i} x={a.x} y={a.y} text={a.text} color={WARM} fill={WARM_FILL} />
      ))}

      {/* Scattered connecting lines to show lack of structure */}
      <line x1={220} y1={95} x2={170} y2={140} stroke={WARM} strokeWidth="0.5" opacity={0.3} strokeDasharray="3 3" />
      <line x1={380} y1={100} x2={400} y2={120} stroke={WARM} strokeWidth="0.5" opacity={0.3} strokeDasharray="3 3" />
      <line x1={200} y1={165} x2={300} y2={190} stroke={WARM} strokeWidth="0.5" opacity={0.3} strokeDasharray="3 3" />
      <line x1={350} y1={140} x2={330} y2={185} stroke={WARM} strokeWidth="0.5" opacity={0.3} strokeDasharray="3 3" />
      <line x1={220} y1={250} x2={310} y2={210} stroke={WARM} strokeWidth="0.5" opacity={0.3} strokeDasharray="3 3" />
    </svg>
  );
}

const JTBD_CATEGORIES = [
  {
    name: "CREATE",
    actions: ["Create table bucket", "Create table", "Migrate tables"],
  },
  {
    name: "LIST",
    actions: ["List table buckets", "List tables", "Search snapshots"],
  },
  {
    name: "VIEW",
    actions: ["View bucket details", "View table details", "View metadata"],
  },
  {
    name: "MANAGE",
    actions: ["Define permissions", "Configure compaction", "Manage snapshots"],
  },
  {
    name: "DELETE",
    actions: ["Delete table", "Delete table bucket", "Purge snapshots"],
  },
  {
    name: "AUDIT",
    actions: ["Audit changes", "Integrity check", "CloudTrail events"],
  },
];

const P0_ACTIONS = [
  "Create table bucket", "Create table",
  "List table buckets", "List tables",
  "View bucket details", "View table details",
  "Define permissions", "Configure compaction", "Manage snapshots",
  "Delete table", "Delete table bucket",
  "Audit changes", "Integrity check",
];

function JTBDGrid({ highlight = false }) {
  const startY = 30;
  const rowH = 44;
  const labelX = 16;
  const pillStartX = 130;
  const pillGap = 150;

  return (
    <>
      {JTBD_CATEGORIES.map((cat, ci) => {
        const y = startY + ci * rowH;
        return (
          <g key={ci}>
            <line x1={12} y1={y + 18} x2={548} y2={y + 18}
              stroke={NEUTRAL_STROKE} strokeWidth="0.25" opacity={0.4} />
            <CategoryLabel x={labelX} y={y + 12} text={cat.name} />
            {cat.actions.map((action, ai) => {
              const isP0 = P0_ACTIONS.includes(action);
              const pillColor = highlight && isP0 ? GREEN : NEUTRAL_STROKE;
              const pillFill = highlight && isP0 ? "oklch(0.55 0.15 25 / 0.08)" : "none";
              const dimmed = highlight && !isP0 ? 0.35 : 1;
              return (
                <ActionPill
                  key={ai}
                  x={pillStartX + ai * pillGap}
                  y={y + 8}
                  text={action}
                  color={pillColor}
                  fill={pillFill}
                  opacity={dimmed}
                />
              );
            })}
          </g>
        );
      })}
    </>
  );
}

export function DiagramScopingOrganized() {
  return (
    <svg viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="User actions organized into JTBD framework with six categories">
      <JTBDGrid highlight={false} />
    </svg>
  );
}

export function DiagramScopingPrioritized() {
  return (
    <svg viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="JTBD framework with P0 actions highlighted for launch">
      <JTBDGrid highlight={true} />

      {/* Legend */}
      <g>
        <rect x={400} y={280} width={10} height={10} rx="5" stroke={GREEN} strokeWidth="0.75" fill="oklch(0.55 0.15 25 / 0.08)" />
        <text x={416} y={289} fill={GREEN} fontSize="7.5" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif">
          P0 — Launch
        </text>
        <rect x={480} y={280} width={10} height={10} rx="5" stroke={NEUTRAL_STROKE} strokeWidth="0.75" fill="none" opacity={0.35} />
        <text x={496} y={289} fill={NEUTRAL_STROKE} fontSize="7.5" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif" opacity={0.35}>
          Post-launch
        </text>
      </g>
    </svg>
  );
}

function ServiceBox({ x, y, label, color = NEUTRAL_STROKE }) {
  return (
    <g>
      <rect x={x - 50} y={y - 20} width={100} height={40} rx="3"
        stroke={color} strokeWidth="0.75" fill={NEUTRAL_FILL} />
      <text x={x} y={y + 3.5} textAnchor="middle" fill={color}
        fontSize="9" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif">
        {label}
      </text>
    </g>
  );
}

export function DiagramIntegrationChallenge() {
  const services = [
    { label: "S3 Tables", x: 140, y: 80 },
    { label: "Lake Formation", x: 420, y: 80 },
    { label: "Glue Catalog", x: 140, y: 200 },
    { label: "Athena", x: 420, y: 200 },
  ];

  const fragments = [
    { x1: 190, y1: 80, x2: 370, y2: 80 },
    { x1: 140, y1: 100, x2: 140, y2: 180 },
    { x1: 420, y1: 100, x2: 420, y2: 180 },
    { x1: 190, y1: 200, x2: 370, y2: 200 },
    { x1: 190, y1: 90, x2: 370, y2: 190 },
    { x1: 190, y1: 190, x2: 370, y2: 90 },
  ];

  return (
    <svg viewBox="0 0 560 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Four AWS services with fragmented connections showing integration complexity">

      {/* Fragmented connection lines */}
      {fragments.map((f, i) => (
        <line key={i} x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2}
          stroke={WARM} strokeWidth="0.5" opacity={0.25} strokeDasharray="4 4" />
      ))}

      {/* Question marks at intersections */}
      {[
        [280, 80], [280, 200], [140, 140], [420, 140], [280, 140],
      ].map(([x, y], i) => (
        <text key={i} x={x} y={y + 3} textAnchor="middle" fill={WARM}
          fontSize="10" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif" opacity={0.4}>
          ?
        </text>
      ))}

      {/* Service boxes */}
      {services.map((s, i) => (
        <ServiceBox key={i} x={s.x} y={s.y} label={s.label} />
      ))}
    </svg>
  );
}

export function DiagramIntegrationOptions() {
  const optionY = 50;
  const flowY = 130;
  const colW = 175;
  const cols = [95, 280, 465];

  const options = [
    { title: "Option A", subtitle: "Post-creation prompt", steps: ["Create bucket", "→ Success", "→ Prompt to integrate"], dimmed: true },
    { title: "Option B", subtitle: "Automatic", steps: ["Create bucket", "→ Auto-integrates", "(no choice)"], dimmed: true },
    { title: "Option C", subtitle: "Default-on in create", steps: ["Create bucket", "+ Integration ☑", "→ Ready to query"], dimmed: false },
  ];

  return (
    <svg viewBox="0 0 560 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Three integration approaches compared, with default-on option highlighted as chosen">

      {options.map((opt, i) => {
        const cx = cols[i];
        const color = opt.dimmed ? NEUTRAL_STROKE : GREEN;
        const textOpacity = opt.dimmed ? 0.5 : 1;
        const boxStroke = opt.dimmed ? NEUTRAL_STROKE : GREEN;

        return (
          <g key={i} opacity={textOpacity}>
            {/* Option container */}
            <rect x={cx - colW / 2 + 5} y={optionY - 10} width={colW - 10} height={200} rx="4"
              stroke={boxStroke} strokeWidth={opt.dimmed ? "0.5" : "0.75"} fill="none"
              strokeDasharray={opt.dimmed ? "3 3" : "none"} />

            {/* Title */}
            <text x={cx} y={optionY + 12} textAnchor="middle" fill={color}
              fontSize="8" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif"
              letterSpacing="0.1em">
              {opt.title.toUpperCase()}
            </text>
            <text x={cx} y={optionY + 26} textAnchor="middle" fill={color}
              fontSize="8.5" fontWeight="500" fontFamily="'Helvetica Neue', sans-serif">
              {opt.subtitle}
            </text>

            {/* Flow steps */}
            {opt.steps.map((step, si) => (
              <text key={si} x={cx} y={flowY + si * 28} textAnchor="middle" fill={color}
                fontSize="8" fontFamily="'Helvetica Neue', sans-serif">
                {step}
              </text>
            ))}

            {/* Chosen badge */}
            {!opt.dimmed && (
              <g>
                <rect x={cx - 25} y={optionY + 178} width={50} height={16} rx="8"
                  stroke={GREEN} strokeWidth="0.75" fill="oklch(0.55 0.15 25 / 0.08)" />
                <text x={cx} y={optionY + 189} textAnchor="middle" fill={GREEN}
                  fontSize="7" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif">
                  CHOSEN
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function DiagramIntegrationSolution() {
  const cx = 280;

  return (
    <svg viewBox="0 0 560 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Final integration flow: create page with default-on integration and namespace modal">

      {/* Create page container */}
      <rect x={80} y={30} width={200} height={220} rx="4"
        stroke={GREEN} strokeWidth="0.75" fill={NEUTRAL_FILL} />
      <text x={180} y={22} textAnchor="middle" fill={GREEN}
        fontSize="7.5" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif"
        letterSpacing="0.1em">
        CREATE TABLE BUCKET
      </text>

      {/* Form fields */}
      {["Bucket name", "Region", "Encryption"].map((field, i) => (
        <g key={i}>
          <text x={100} y={60 + i * 32} fill={INK} fontSize="7.5" fontWeight="500"
            fontFamily="'Helvetica Neue', sans-serif">{field}</text>
          <rect x={100} y={64 + i * 32} width={160} height={16} rx="2"
            stroke={NEUTRAL_STROKE} strokeWidth="0.5" fill="none" />
        </g>
      ))}

      {/* Integration checkbox - checked */}
      <g>
        <rect x={100} y={162} width={12} height={12} rx="2"
          stroke={GREEN} strokeWidth="0.75" fill="oklch(0.55 0.15 25 / 0.08)" />
        <path d="M103,168 l2.5,2.5 l4.5,-5" stroke={GREEN} strokeWidth="1" fill="none" />
        <text x={118} y={172} fill={GREEN} fontSize="8" fontWeight="500"
          fontFamily="'Helvetica Neue', sans-serif">
          Integrate with analytics services
        </text>
      </g>

      {/* Arrow to modal */}
      <line x1={280} y1={168} x2={330} y2={168} stroke={GREEN} strokeWidth="0.5" />
      <polygon points="330,168 326,165.5 326,170.5" fill={GREEN} />

      {/* Modal container */}
      <rect x={340} y={60} width={180} height={160} rx="4"
        stroke={GREEN} strokeWidth="0.75" fill={NEUTRAL_FILL} />
      <text x={430} y={52} textAnchor="middle" fill={GREEN}
        fontSize="7.5" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif"
        letterSpacing="0.1em">
        MULTI-STEP MODAL
      </text>

      {/* Modal steps */}
      <g>
        <circle cx={390} cy={100} r="8" stroke={GREEN} strokeWidth="0.5" fill="none" />
        <text x={390} y={103} textAnchor="middle" fill={GREEN}
          fontSize="7" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif">1</text>
        <text x={405} y={103} fill={INK} fontSize="8" fontFamily="'Helvetica Neue', sans-serif">
          Create namespace
        </text>
      </g>
      <line x1={390} y1={108} x2={390} y2={130} stroke={GREEN} strokeWidth="0.5" />
      <g>
        <circle cx={390} cy={140} r="8" stroke={GREEN} strokeWidth="0.5" fill="none" />
        <text x={390} y={143} textAnchor="middle" fill={GREEN}
          fontSize="7" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif">2</text>
        <text x={405} y={143} fill={INK} fontSize="8" fontFamily="'Helvetica Neue', sans-serif">
          Connect query engine
        </text>
      </g>

      {/* Arrow to result */}
      <line x1={430} y1={220} x2={430} y2={250} stroke={GREEN} strokeWidth="0.5" />
      <polygon points="430,250 427,246 433,246" fill={GREEN} />
      <text x={430} y={266} textAnchor="middle" fill={GREEN}
        fontSize="8" fontWeight="600" fontFamily="'Helvetica Neue', sans-serif">
        Ready to query
      </text>
    </svg>
  );
}
