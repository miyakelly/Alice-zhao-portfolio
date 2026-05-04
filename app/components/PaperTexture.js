"use client";

export default function PaperTexture() {
  return (
    <div className="paper-texture" aria-hidden="true">
      <svg className="paper-grain" preserveAspectRatio="none">
        <defs>
          <filter id="paper-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id="grain-tile"
            width="256"
            height="256"
            patternUnits="userSpaceOnUse"
          >
            <rect width="256" height="256" filter="url(#paper-noise)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grain-tile)" />
      </svg>

      <svg className="paper-lines" preserveAspectRatio="none">
        <defs>
          <pattern
            id="draft-lines"
            width="600"
            height="600"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="150" x2="600" y2="150.5" stroke="var(--paper-line)" strokeWidth="0.35" opacity="0.5" />
            <line x1="0" y1="300" x2="600" y2="299.5" stroke="var(--paper-line)" strokeWidth="0.3" opacity="0.4" />
            <line x1="0" y1="450" x2="600" y2="450.4" stroke="var(--paper-line)" strokeWidth="0.3" opacity="0.45" />

            <line x1="200" y1="0" x2="200.4" y2="600" stroke="var(--paper-line)" strokeWidth="0.25" opacity="0.35" />
            <line x1="400" y1="0" x2="399.6" y2="600" stroke="var(--paper-line)" strokeWidth="0.25" opacity="0.3" />

            <circle cx="200" cy="150" r="4" stroke="var(--paper-line)" strokeWidth="0.25" fill="none" opacity="0.35" />
            <circle cx="400" cy="300" r="5" stroke="var(--paper-line)" strokeWidth="0.2" fill="none" opacity="0.3" />

            <path d="M280,150 A80,80 0 0,1 360,230" stroke="var(--paper-line)" strokeWidth="0.2" fill="none" opacity="0.25" />

            <line x1="0" y1="0" x2="300" y2="300" stroke="var(--paper-line)" strokeWidth="0.18" strokeDasharray="6 10" opacity="0.2" />

            <line x1="195" y1="300" x2="205" y2="300" stroke="var(--paper-line)" strokeWidth="0.3" opacity="0.35" />
            <line x1="400" y1="145" x2="400" y2="155" stroke="var(--paper-line)" strokeWidth="0.3" opacity="0.35" />

            <text x="210" y="145" fontFamily="Georgia, 'Times New Roman', serif" fontSize="6.5" fill="var(--paper-line)" opacity="0.4">fig. iii</text>
            <text x="385" y="315" fontFamily="Georgia, 'Times New Roman', serif" fontSize="5.5" fill="var(--paper-line)" opacity="0.35">N 47°</text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#draft-lines)" />
      </svg>

      <div className="paper-vignette" />
    </div>
  );
}
