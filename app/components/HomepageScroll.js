"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HERO_SLIDES = [
  "/img/hero-card/206311main_wright_brothers_full-1024x637-2214572863.jpg",
  "/img/hero-card/9933c0ab-5c4a-4283-bf19-debb4aeefb2c-EPA_SPACE_PHOTO_ESSAY_MOON_LANDING_ANNIVERSARY.5-3782150148.jpg",
  "/img/hero-card/Ada-1945299396.jpg",
  "/img/hero-card/How-ENIAC-Worked-min-1024x536-4207126977.png",
  "/img/hero-card/IMG_2613-2533134824.jpg",
  "/img/hero-card/me-1.jpg",
  "/img/hero-card/Intel 4004 (1971).jpg",
  "/img/hero-card/MV5BOTU3NWJjNDktZGU5Zi00ZWYwLTg1MzQtYWNlN2Q4ZTNjNDU4XkEyXkFqcGc@._V1_-1615251397.jpg",
  "/img/hero-card/OIP-1311303196.jpg",
  "/img/hero-card/deep-blue-vs-garry-kasparov-chess-3360251239.jpg",
  "/img/hero-card/doAmESF84E3NVgu2mbEBAX-1312980986.jpg",
  "/img/hero-card/first-web-server_0451b7775b0ff60c530e897c31ea3ad1-3243532772.jpg",
  "/img/hero-card/me-3.jpg",
  "/img/hero-card/hst_launch_hi-658738499.jpg",
  "/img/hero-card/sputnik-1-satellite-806590417.jpg",
  "/img/hero-card/steve-wozniak-working-in-garage-2-1562671878.jpg",
  "/img/hero-card/uUzyjQw1zPGuTy4XirHoCcr8odl0tEiupNpbCzp4-478125760.jpg",
  "/img/hero-card/arduino-uno-pinout-80294469.jpg",
  "/img/hero-card/hedy-lamarr-2000-908a22cd2d3c490ab20edfa189e95a72-643054585.jpg",
  "/img/hero-card/Perlman_Radia+CIC+judge-595700236.jpg",
  "/img/hero-card/me-2.jpg",

];

// Pinwheel grid: 4 center cards positioned relative to the hero, 4 side cards flanking.
// Each center card aligns with one hero edge and has a gap on the perpendicular side.
// Rotationally symmetric: S3 Tables ↔ My Design Process, Streamlining ↔ Agent.
const CARD_DEFS = [
  { id: "about",     label: "???",                       pos: "side-tl",   from: "left" },
  { id: "my-lab",    label: "My Lab",                    pos: "side-bl",   from: "left" },
  { id: "s3-tables", label: "S3 Tables",                 pos: "center-tl", from: "top-left" },
  { id: "agent-opp", label: "Agent Opportunities",       pos: "center-bl", from: "bottom-left" },
  { id: "sda",       label: "Streamlining Data Access",  pos: "center-tr", from: "top-right" },
  { id: "hidn",      label: "My Design Process",         pos: "center-br", from: "bottom-right" },
  { id: "who-am-i",  label: "Who Am I",                  pos: "side-tr",   from: "right" },
  { id: "links",     label: "Links",                     pos: "side-br",   from: "right" },
];

function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    let ticking = false;

    function update() {
      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollableDistance));
      setProgress(p);
      container.style.setProperty("--scroll-progress", p.toFixed(4));
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  return progress;
}

function useViewportSize() {
  const [size, setSize] = useState({ vw: 1440, vh: 900 });

  useEffect(() => {
    function onResize() {
      setSize({ vw: window.innerWidth, vh: window.innerHeight });
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const INTRO_BREAKPOINTS = [
  {
    maxProgress: 0.15,
    text: "Currently designing agentic experience at Amazon AWS. Previoulsy built design systems and enterprise applications at Morgan Stanley, Siemens, and Insperity.",
  },
  {
    maxProgress: 0.35,
    text: "Currently designing agentic experience at Amazon AWS. Previously at Morgan Stanley, Siemens, and Insperity.",
  },
  {
    maxProgress: 0.55,
    text: "Currently designing agentic experience at Amazon AWS.",
  },
  {
    maxProgress: 0.75,
    text: "Currently at Amazon AWS.",
  },
];

function getIntroText(progress) {
  for (const bp of INTRO_BREAKPOINTS) {
    if (progress <= bp.maxProgress) return bp.text;
  }
  return null;
}

// Cycles through images on a timer. interval = ms between swaps (lower = faster, 250 = 4 imgs/sec).
function useSlideshow(images, interval = 250) {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const start = useCallback(() => {
    setActive(true);
    setIndex(0);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
  }, [images.length, interval]);

  const stop = useCallback(() => {
    setActive(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return { active, index, start, stop };
}

function useFitTitle(titleRef) {
  const ratioRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el || ratioRef.current) return;

    const style = getComputedStyle(el);
    const baseFontSize = parseFloat(style.fontSize);
    el.style.whiteSpace = "nowrap";
    const textWidth = el.scrollWidth;
    el.style.whiteSpace = "";
    ratioRef.current = baseFontSize / textWidth;
  }, [titleRef]);

  return ratioRef;
}

export default function HomepageScroll() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const progress = useScrollProgress(containerRef);

  const { vw, vh } = useViewportSize();
  const isMobile = vw < 768;
  const heroStart = isMobile ? Math.min(vw * 0.9, 640) : Math.min(530, vw * 0.37);
  const heroEnd = isMobile ? 100 : 120;
  const avatarStart = (heroStart - 48 * 2) * 0.4;
  const avatarEnd = heroEnd;
  const avatarSize = lerp(avatarStart, avatarEnd, progress);

  const heroSize = lerp(heroStart, heroEnd, progress);

  const gridGap = 20;
  const gridPad = 20;
  const totalW = vw - 2 * gridPad;
  const totalH = vh - 2 * gridPad;
  const topY = gridPad;
  const bottomY = topY + totalH;

  const sideW = (totalW - 3 * gridGap) / 6;

  const heroCX = vw / 2;
  const heroCY = topY + totalH / 2;
  const centerL = gridPad + sideW + gridGap;
  const centerR = vw - gridPad - sideW - gridGap;

  const heroLEnd = heroCX - heroEnd / 2;
  const heroREnd = heroCX + heroEnd / 2;
  const heroTEnd = heroCY - heroEnd / 2;
  const shortH = heroTEnd - gridGap - topY;
  const tallH = bottomY - heroTEnd;

  const heroLNow = heroCX - heroSize / 2;
  const heroRNow = heroCX + heroSize / 2;
  const heroTNow = heroCY - heroSize / 2;

  const shortHNow = heroTNow - gridGap - topY;
  const tallHNow = bottomY - heroTNow;

  function getCardBounds(pos) {
    switch (pos) {
      case "side-tl":   return { left: gridPad, top: topY, width: sideW, height: shortH };
      case "side-bl":   return { left: gridPad, top: topY + shortH + gridGap, width: sideW, height: tallH };
      case "center-tl": return { left: centerL, top: topY, width: heroLNow - gridGap - centerL, height: tallHNow };
      case "center-bl": return { left: centerL, top: topY + tallHNow + gridGap, width: heroRNow - centerL, height: shortHNow };
      case "center-tr": return { left: heroLNow, top: topY, width: centerR - heroLNow, height: shortHNow };
      case "center-br": return { left: heroRNow + gridGap, top: topY + shortHNow + gridGap, width: centerR - heroRNow - gridGap, height: tallHNow };
      case "side-tr":   return { left: vw - gridPad - sideW, top: topY, width: sideW, height: tallH };
      case "side-br":   return { left: vw - gridPad - sideW, top: topY + tallH + gridGap, width: sideW, height: shortH };
    }
  }

  const introText = getIntroText(progress);
  const hasText = introText !== null;

  const textOpacity = progress > 0.65
    ? lerp(1, 0, (progress - 0.65) / 0.1)
    : 1;

  const paddingT = progress > 0.65
    ? lerp(20, 0, Math.min(1, (progress - 0.65) / 0.1))
    : 20;
  const padding = Math.max(0, paddingT);

  const titleRatioRef = useFitTitle(titleRef);
  const maxTitleSize = Math.min(36, vw * 0.025);
  const availableWidth = heroSize - padding * 2;
  const titleFontSize = titleRatioRef.current
    ? Math.min(maxTitleSize, availableWidth * titleRatioRef.current)
    : null;

  const hoverable = progress < 0.75;
  const slideshow = useSlideshow(HERO_SLIDES, 200);
  const cursorOverRef = useRef(false);

  useEffect(() => {
    if (!hoverable && slideshow.active) slideshow.stop();
    if (hoverable && !slideshow.active && cursorOverRef.current) slideshow.start();
  }, [hoverable, slideshow.active, slideshow.start, slideshow.stop]);

  const onEnter = () => {
    cursorOverRef.current = true;
    if (hoverable) slideshow.start();
  };
  const onLeave = () => {
    cursorOverRef.current = false;
    slideshow.stop();
  };

  function getEndBounds(pos) {
    switch (pos) {
      case "center-tl": return { left: centerL, top: topY, width: heroLEnd - gridGap - centerL, height: tallH };
      case "center-bl": return { left: centerL, top: topY + tallH + gridGap, width: heroREnd - centerL, height: shortH };
      case "center-tr": return { left: heroLEnd, top: topY, width: centerR - heroLEnd, height: shortH };
      case "center-br": return { left: heroREnd + gridGap, top: topY + shortH + gridGap, width: centerR - heroREnd - gridGap, height: tallH };
    }
  }

  function getCardOffset(from, bounds) {
    let offsetX = 0;
    let offsetY = 0;
    switch (from) {
      case "left":         offsetX = -(bounds.left + bounds.width); break;
      case "right":        offsetX = vw - bounds.left; break;
      case "top-left":     offsetX = -(bounds.left + bounds.width); offsetY = -(bounds.top + bounds.height); break;
      case "top-right":    offsetX = vw - bounds.left; offsetY = -(bounds.top + bounds.height); break;
      case "bottom-left":  offsetX = -(bounds.left + bounds.width); offsetY = vh - bounds.top; break;
      case "bottom-right": offsetX = vw - bounds.left; offsetY = vh - bounds.top; break;
    }
    return { offsetX, offsetY };
  }

  return (
    <div className="scroll-runway" ref={containerRef}>
      <div className="scroll-sticky">
        <div className="scroll-progress-debug">
          {progress.toFixed(3)}
        </div>

        {CARD_DEFS.map((def) => {
          const bounds = getCardBounds(def.pos);
          if (bounds.width <= 0 || bounds.height <= 0) return null;

          const isCenter = def.pos.startsWith("center");
          const style = {
            left: bounds.left,
            top: bounds.top,
            width: bounds.width,
            height: bounds.height,
          };

          if (isCenter) {
            const endBounds = getEndBounds(def.pos);
            const { offsetX, offsetY } = getCardOffset(def.from, endBounds);
            style.transform = `translate(${lerp(offsetX, 0, progress)}px, ${lerp(offsetY, 0, progress)}px)`;
          } else {
            const neighborPos = def.pos.replace("side", "center");
            const neighborDef = CARD_DEFS.find(d => d.pos === neighborPos);
            const neighborEndBounds = getEndBounds(neighborPos);
            const neighborOffset = getCardOffset(neighborDef.from, neighborEndBounds);
            const { offsetX: sideOffsetX } = getCardOffset(def.from, bounds);
            const totalX = neighborOffset.offsetX + sideOffsetX;
            style.transform = `translate(${lerp(totalX, 0, progress)}px, 0px)`;
          }

          return (
            <div
              key={def.id}
              className="scroll-secondary-card"
              style={style}
            >
              {def.label}
            </div>
          );
        })}

        <div
          className={`scroll-hero-wrap${hoverable ? " hoverable" : ""}`}
          style={{
            left: heroCX - heroSize / 2,
            top: heroCY - heroSize / 2,
            width: heroSize,
            height: heroSize,
          }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div className="scroll-hero-shadow" />
          <div className={`scroll-hero-card${slideshow.active ? " sliding" : ""}`}>
            {slideshow.active && (
              <img
                className="scroll-hero-slideshow"
                src={HERO_SLIDES[slideshow.index]}
                alt=""
              />
            )}
            <div className="scroll-hero-inner" style={{ padding }}>
              <div
                className="scroll-hero-avatar"
                style={{
                  width: hasText ? avatarSize : heroSize - padding * 2,
                  height: hasText ? avatarSize : heroSize - padding * 2,
                  minWidth: hasText ? avatarSize : heroSize - padding * 2,
                  minHeight: hasText ? avatarSize : heroSize - padding * 2,
                }}
              >
                photo
              </div>
              {hasText && (
                <div className="scroll-hero-text" style={{ opacity: textOpacity }}>
                  <h1
                    ref={titleRef}
                    className="scroll-hero-title"
                    style={titleFontSize ? { fontSize: titleFontSize } : undefined}
                  >
                    Alice Zhao, a UX Designer
                  </h1>
                  <p className="scroll-hero-intro">
                    {introText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
