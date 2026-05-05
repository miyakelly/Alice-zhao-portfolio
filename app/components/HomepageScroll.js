"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HERO_SLIDES = [
  "/img/hero-card/206311main_wright_brothers_full-1024x637-2214572863.jpg",
  "/img/hero-card/9933c0ab-5c4a-4283-bf19-debb4aeefb2c-EPA_SPACE_PHOTO_ESSAY_MOON_LANDING_ANNIVERSARY.5-3782150148.jpg",
  "/img/hero-card/Ada-1945299396.jpg",
  "/img/hero-card/How-ENIAC-Worked-min-1024x536-4207126977.png",
  "/img/hero-card/IMG_2613-2533134824.jpg",
  "/img/hero-card/Intel 4004 (1971).jpg",
  "/img/hero-card/MV5BOTU3NWJjNDktZGU5Zi00ZWYwLTg1MzQtYWNlN2Q4ZTNjNDU4XkEyXkFqcGc@._V1_-1615251397.jpg",
  "/img/hero-card/OIP-1311303196.jpg",
  "/img/hero-card/deep-blue-vs-garry-kasparov-chess-3360251239.jpg",
  "/img/hero-card/doAmESF84E3NVgu2mbEBAX-1312980986.jpg",
  "/img/hero-card/first-web-server_0451b7775b0ff60c530e897c31ea3ad1-3243532772.jpg",
  "/img/hero-card/hst_launch_hi-658738499.jpg",
  "/img/hero-card/sputnik-1-satellite-806590417.jpg",
  "/img/hero-card/steve-wozniak-working-in-garage-2-1562671878.jpg",
  "/img/hero-card/uUzyjQw1zPGuTy4XirHoCcr8odl0tEiupNpbCzp4-478125760.jpg",
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

function useViewportWidth() {
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    function onResize() {
      setVw(window.innerWidth);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return vw;
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

  const vw = useViewportWidth();
  const isMobile = vw < 768;
  const heroStart = isMobile ? Math.min(vw * 0.9, 640) : Math.min(530, vw * 0.37);
  const heroEnd = isMobile ? 100 : 120;
  const avatarStart = (heroStart - 48 * 2) * 0.4;
  const avatarEnd = heroEnd;
  const avatarSize = lerp(avatarStart, avatarEnd, progress);

  const heroSize = lerp(heroStart, heroEnd, progress);

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

  return (
    <div className="scroll-runway" ref={containerRef}>
      <div className="scroll-sticky">
        <div className="scroll-progress-debug">
          {progress.toFixed(3)}
        </div>

        <div
          className={`scroll-hero-wrap${hoverable ? " hoverable" : ""}`}
          style={{
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
