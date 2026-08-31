import {
  line, lineAA, lineWidth,
  circle, circleAA, disc,
  ellipse, rotatedEllipseRect, ellipseRect,
  quadBezier, quadBezierAA,
  cubicBezier, cubicBezierAA,
  quadRationalBezier,
} from "../src/index";
import { GUI } from "dat.gui";


console.log("bresenham demo");

// ─── Layout constants ────────────────────────────────────────────────────────
const COLS = 4;
const ROWS = 4;
const TILE_W = 200;
const TILE_H = 170;
const LABEL_H = 28;
const PAD = 12;

// ─── Canvas setup ────────────────────────────────────────────────────────────
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const dpr = Math.min(window.devicePixelRatio || 1, 2);

canvas.width = COLS * TILE_W * dpr;
canvas.height = ROWS * TILE_H * dpr;
canvas.style.width = `${COLS * TILE_W}px`;
canvas.style.height = `${ROWS * TILE_H}px`;
ctx.scale(dpr, dpr);

// ─── Config ──────────────────────────────────────────────────────────────────
const cfg = { pixelSize: 2, dark: false };

// Budget shared by all drawing callbacks to escape runaway algorithm loops
let _pixelBudget = 0;
const BUDGET_PER_SHAPE = 100_000;

const vis: Record<string, boolean> = Object.fromEntries(
  [
    "line", "lineAA", "lineWidth",
    "circle", "circleAA", "disc",
    "ellipse", "rotatedEllipse", "ellipseRect",
    "quadBezier", "quadBezierAA",
    "cubicBezier", "cubicBezierAA", "quadRationalBezier",
  ].map((k) => [k, true])
);

const CLR: Record<string, string> = {
  line:                "#e74c3c",
  lineAA:              "#c0392b",
  lineWidth:           "#e67e22",
  circle:              "#3498db",
  circleAA:            "#2980b9",
  disc:                "#1abc9c",
  ellipse:             "#9b59b6",
  rotatedEllipse:      "#8e44ad",
  ellipseRect:         "#16a085",
  quadBezier:          "#f39c12",
  quadBezierAA:        "#d35400",
  cubicBezier:         "#27ae60",
  cubicBezierAA:       "#1a5276",
  quadRationalBezier:  "#e91e63",
};

// ─── Pixel-drawing helpers ───────────────────────────────────────────────────
function sp(color: string) {
  const ps = cfg.pixelSize;
  return (x: number, y: number) => {
    if (--_pixelBudget < 0) throw new Error("draw-limit");
    ctx.fillStyle = color;
    ctx.fillRect(x | 0, y | 0, ps, ps);
  };
}

function spAA(color: string) {
  const ps = cfg.pixelSize;
  const [r, g, b] = hexRGB(color);
  return (x: number, y: number, alpha: number) => {
    if (--_pixelBudget < 0) throw new Error("draw-limit");
    const a = (255 - alpha) / 255;
    if (a <= 0.01) return;
    ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
    ctx.fillRect(x | 0, y | 0, ps, ps);
  };
}

function hl(color: string) {
  const ps = cfg.pixelSize;
  return (x0: number, x1: number, y: number) => {
    if (--_pixelBudget < 0) throw new Error("draw-limit");
    ctx.fillStyle = color;
    ctx.fillRect(x0 | 0, y | 0, (x1 - x0 + ps) | 0, ps);
  };
}

function hexRGB(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

// ─── Shape definitions ───────────────────────────────────────────────────────
type DrawFn = (cx: number, cy: number, dw: number, dh: number) => void;
interface ShapeDef { key: string; label: string; fn: DrawFn }

const SHAPES: ShapeDef[] = [
  {
    key: "line", label: "line",
    fn(cx, cy, dw, dh) {
      line(
        (cx - dw / 2) | 0, (cy - dh / 2) | 0,
        (cx + dw / 2) | 0, (cy + dh / 2) | 0,
        sp(CLR.line)
      );
    },
  },
  {
    key: "lineAA", label: "lineAA",
    fn(cx, cy, dw, dh) {
      lineAA(
        (cx - dw / 2) | 0, (cy + dh / 2) | 0,
        (cx + dw / 2) | 0, (cy - dh / 2) | 0,
        spAA(CLR.lineAA)
      );
    },
  },
  {
    key: "lineWidth", label: "lineWidth (wd=6)",
    fn(cx, cy, dw) {
      lineWidth(
        (cx - dw / 2) | 0, cy | 0,
        (cx + dw / 2) | 0, cy | 0,
        6,
        spAA(CLR.lineWidth)
      );
    },
  },
  {
    key: "circle", label: "circle",
    fn(cx, cy, dw, dh) {
      const r = ((Math.min(dw, dh) / 2) | 0) - 4;
      circle(cx | 0, cy | 0, r, sp(CLR.circle));
    },
  },
  {
    key: "circleAA", label: "circleAA",
    fn(cx, cy, dw, dh) {
      const r = ((Math.min(dw, dh) / 2) | 0) - 4;
      circleAA(cx | 0, cy | 0, r, spAA(CLR.circleAA));
    },
  },
  {
    key: "disc", label: "disc (filled)",
    fn(cx, cy, dw, dh) {
      const r = ((Math.min(dw, dh) / 2) | 0) - 4;
      disc(cx | 0, cy | 0, r, hl(CLR.disc));
    },
  },
  {
    key: "ellipse", label: "ellipse",
    fn(cx, cy, dw, dh) {
      ellipse(cx | 0, cy | 0, (dw / 2 - 4) | 0, (dh / 2 - 4) | 0, sp(CLR.ellipse));
    },
  },
  {
    key: "rotatedEllipse", label: "rotatedEllipse 30°",
    fn(cx, cy, dw, dh) {
      // rotatedEllipse() passes float coords internally; call rotatedEllipseRect
      // directly with integers so quadRationalBezierSegment terminates cleanly
      const hw = (dw / 2 - 14) | 0;
      const hh = (dh / 2 - 14) | 0;
      const x0 = (cx | 0) - hw, y0 = (cy | 0) - hh;
      const x1 = (cx | 0) + hw, y1 = (cy | 0) + hh;
      const zd = Math.round((x1 - x0) * (y1 - y0) * 0.3);
      rotatedEllipseRect(x0, y0, x1, y1, zd, sp(CLR.rotatedEllipse));
    },
  },
  {
    key: "ellipseRect", label: "ellipseRect (bbox)",
    fn(cx, cy, dw, dh) {
      const pad = 8;
      ellipseRect(
        (cx - dw / 2 + pad) | 0, (cy - dh / 2 + pad) | 0,
        (cx + dw / 2 - pad) | 0, (cy + dh / 2 - pad) | 0,
        sp(CLR.ellipseRect)
      );
    },
  },
  {
    key: "quadBezier", label: "quadBezier",
    fn(cx, cy, dw, dh) {
      quadBezier(
        (cx - dw / 2) | 0, (cy + dh / 2) | 0,
        cx | 0,            (cy - dh / 2) | 0,
        (cx + dw / 2) | 0, (cy + dh / 2) | 0,
        sp(CLR.quadBezier)
      );
    },
  },
  {
    key: "quadBezierAA", label: "quadBezierAA",
    fn(cx, cy, dw, dh) {
      quadBezierAA(
        (cx - dw / 2) | 0, (cy + dh / 2) | 0,
        cx | 0,            (cy - dh / 2) | 0,
        (cx + dw / 2) | 0, (cy + dh / 2) | 0,
        spAA(CLR.quadBezierAA)
      );
    },
  },
  {
    key: "cubicBezier", label: "cubicBezier",
    fn(cx, cy, dw, dh) {
      // S-curve satisfying Zingl slope constraints
      try {
        cubicBezier(
          (cx - dw / 2) | 0, (cy + dh / 2) | 0,
          (cx - dw / 4) | 0, (cy - dh / 2) | 0,
          (cx + dw / 4) | 0, (cy + dh / 2) | 0,
          (cx + dw / 2) | 0, (cy - dh / 2) | 0,
          sp(CLR.cubicBezier)
        );
      } catch (_) { /* degenerate curve */ }
    },
  },
  {
    key: "cubicBezierAA", label: "cubicBezierAA",
    fn(cx, cy, dw, dh) {
      try {
        cubicBezierAA(
          (cx - dw / 2) | 0, (cy + dh / 2) | 0,
          (cx - dw / 4) | 0, (cy - dh / 2) | 0,
          (cx + dw / 4) | 0, (cy + dh / 2) | 0,
          (cx + dw / 2) | 0, (cy - dh / 2) | 0,
          spAA(CLR.cubicBezierAA)
        );
      } catch (_) {}
    },
  },
  {
    key: "quadRationalBezier", label: "quadRationalBezier (w=0.5)",
    fn(cx, cy, dw, dh) {
      // w < 1 gives an elliptic arc
      quadRationalBezier(
        (cx - dw / 2) | 0, (cy + dh / 2) | 0,
        cx | 0,            (cy - dh / 2) | 0,
        (cx + dw / 2) | 0, (cy + dh / 2) | 0,
        0.5,
        sp(CLR.quadRationalBezier)
      );
    },
  },
];

// ─── Render ──────────────────────────────────────────────────────────────────
function render() {
  const dark = cfg.dark;
  const BG      = dark ? "#111827" : "#e8e8e8";
  const TILE_BG = dark ? "#1f2937" : "#ffffff";
  const BORDER  = dark ? "#374151" : "#e0e0e0";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, COLS * TILE_W, ROWS * TILE_H);

  SHAPES.forEach((shape, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const tx = col * TILE_W;
    const ty = row * TILE_H;

    const drawX = tx + PAD;
    const drawY = ty + LABEL_H + PAD;
    const dw = TILE_W - 2 * PAD;
    const dh = TILE_H - LABEL_H - 2 * PAD;
    const cx = tx + TILE_W / 2;
    const cy = drawY + dh / 2;

    // Tile card
    ctx.fillStyle = TILE_BG;
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 1;
    rrect(tx + 4, ty + 4, TILE_W - 8, TILE_H - 8, 8);
    ctx.fill();
    ctx.stroke();

    // Label
    ctx.fillStyle = CLR[shape.key];
    ctx.font = "bold 10.5px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(shape.label, tx + TILE_W / 2, ty + LABEL_H / 2);

    if (!vis[shape.key]) return;

    ctx.save();
    ctx.beginPath();
    rrect(drawX, drawY, dw, dh, 5);
    ctx.clip();

    try {
      _pixelBudget = BUDGET_PER_SHAPE;
      shape.fn(cx, cy, dw, dh);
    } catch (_) { /* assertion error or draw-limit */ }

    ctx.restore();
  });
}

function rrect(x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

// ─── dat.GUI ─────────────────────────────────────────────────────────────────
const gui = new GUI({ width: 230 });

gui.add(cfg, "pixelSize", 1, 4, 1).name("pixel size").onChange(render);
gui.add(cfg, "dark").name("dark mode").onChange(render);

const categories: Record<string, string[]> = {
  Lines:    ["line", "lineAA", "lineWidth"],
  Circles:  ["circle", "circleAA", "disc"],
  Ellipses: ["ellipse", "rotatedEllipse", "ellipseRect"],
  "Béziers":["quadBezier", "quadBezierAA", "cubicBezier", "cubicBezierAA", "quadRationalBezier"],
};

Object.entries(categories).forEach(([name, keys]) => {
  const folder = gui.addFolder(name);
  keys.forEach((k) => folder.add(vis, k).onChange(render));
  folder.open();
});

render();
