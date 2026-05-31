"use client";

import { useEffect, useRef } from "react";
import "./WaveBackground.css";

// Simplified Perlin noise (2D)
const PERM = new Uint8Array(512);
const GRAD = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
(function seed() {
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = (i * 7 + 13) & 255;
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function dot(g, x, y) { return g[0] * x + g[1] * y; }
function noise2(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y);
  const u = fade(xf), v = fade(yf);
  const aa = PERM[PERM[X] + Y] & 7, ab = PERM[PERM[X] + Y + 1] & 7;
  const ba = PERM[PERM[X + 1] + Y] & 7, bb = PERM[PERM[X + 1] + Y + 1] & 7;
  const x1 = dot(GRAD[aa], xf, yf) * (1 - u) + dot(GRAD[ba], xf - 1, yf) * u;
  const x2 = dot(GRAD[ab], xf, yf - 1) * (1 - u) + dot(GRAD[bb], xf - 1, yf - 1) * u;
  return x1 * (1 - v) + x2 * v;
}

const COL_SPACING = 10;
const ROW_SPACING = 32;

export default function WaveBackground({ className }) {
  const svgRef = useRef(null);
  const stateRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mouse = {
      x: -10, y: 0,
      lx: 0, ly: 0,
      sx: 0, sy: 0,
      v: 0, vs: 0, a: 0,
      set: false,
    };

    let w = window.innerWidth;
    let h = window.innerHeight;

    function buildLines() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("width", w);
      svg.setAttribute("height", h);

      const oWidth = w + 200;
      const oHeight = h + 30;
      const totalLines = Math.ceil(oWidth / COL_SPACING);
      const totalPoints = Math.ceil(oHeight / ROW_SPACING);
      const xStart = (w - COL_SPACING * totalLines) / 2;
      const yStart = (h - ROW_SPACING * totalPoints) / 2;

      const lines = [];
      const paths = [];

      for (let i = 0; i <= totalLines; i++) {
        const points = [];
        for (let j = 0; j <= totalPoints; j++) {
          points.push({
            x: xStart + COL_SPACING * i,
            y: yStart + ROW_SPACING * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svg.appendChild(path);
        paths.push(path);
        lines.push(points);
      }

      stateRef.current = { lines, paths };
    }

    function movePoints(time) {
      const { lines } = stateRef.current;

      for (const points of lines) {
        for (const p of points) {
          const move = noise2(
            (p.x + time * 0.0125) * 0.002,
            (p.y + time * 0.005) * 0.0015
          ) * 12;
          p.wave.x = Math.cos(move) * 32;
          p.wave.y = Math.sin(move) * 16;

          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const d = Math.hypot(dx, dy);
          const l = Math.max(175, mouse.vs);

          if (d < l) {
            const s = 1 - d / l;
            const f = Math.cos(d * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }

          p.cursor.vx += (0 - p.cursor.x) * 0.005;
          p.cursor.vy += (0 - p.cursor.y) * 0.005;
          p.cursor.vx *= 0.925;
          p.cursor.vy *= 0.925;
          p.cursor.x += p.cursor.vx * 2;
          p.cursor.y += p.cursor.vy * 2;
          p.cursor.x = Math.min(100, Math.max(-100, p.cursor.x));
          p.cursor.y = Math.min(100, Math.max(-100, p.cursor.y));
        }
      }
    }

    function moved(point, withCursor) {
      return {
        x: Math.round((point.x + point.wave.x + (withCursor ? point.cursor.x : 0)) * 10) / 10,
        y: Math.round((point.y + point.wave.y + (withCursor ? point.cursor.y : 0)) * 10) / 10,
      };
    }

    function drawLines() {
      const { lines, paths } = stateRef.current;

      for (let i = 0; i < lines.length; i++) {
        const points = lines[i];
        let p1 = moved(points[0], false);
        let d = `M ${p1.x} ${p1.y}`;

        for (let j = 0; j < points.length; j++) {
          const isLast = j === points.length - 1;
          p1 = moved(points[j], !isLast);
          d += `L ${p1.x} ${p1.y}`;
        }

        paths[i].setAttribute("d", d);
      }
    }

    function tick(time) {
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);

      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);

      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);

      movePoints(time);
      drawLines();

      animRef.current = requestAnimationFrame(tick);
    }

    function onMouseMove(e) {
      const rect = svg.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    function onTouchMove(e) {
      const touch = e.touches[0];
      const rect = svg.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;

      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    function onResize() {
      w = window.innerWidth;
      h = window.innerHeight;
      buildLines();
    }

    buildLines();
    animRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`wave-background${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    />
  );
}
