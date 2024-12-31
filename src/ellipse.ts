import assert from "./assert";
import { quadRationalBezierSegment } from "./bezier/rational";
import { setPixelFn } from "./types";

/**
 * Draws ellipse
 * @param  {number} xm
 * @param  {number} ym
 * @param  {number} a
 * @param  {number} b
 * @param  {setPixel} setPixel
 */
export function ellipse(
  xm: number,
  ym: number,
  a: number,
  b: number,
  setPixel: setPixelFn
) {
  let x = -a;
  let y = 0; /* II. quadrant from bottom left to top right */
  let e2 = b * b;
  let err = x * (2 * e2 + x) + e2; /* error of 1.step */

  do {
    setPixel(xm - x, ym + y); /*   I. Quadrant */
    setPixel(xm + x, ym + y); /*  II. Quadrant */
    setPixel(xm + x, ym - y); /* III. Quadrant */
    setPixel(xm - x, ym - y); /*  IV. Quadrant */
    e2 = 2 * err;
    if (e2 >= (x * 2 + 1) * b * b)
      /* e_xy+e_x > 0 */
      err += (++x * 2 + 1) * b * b;
    if (e2 <= (y * 2 + 1) * a * a)
      /* e_xy+e_y < 0 */
      err += (++y * 2 + 1) * a * a;
  } while (x <= 0);

  while (y++ < b) {
    /* too early stop of flat ellipses a=1, */
    setPixel(xm, ym + y); /* -> finish tip of ellipse */
    setPixel(xm, ym - y);
  }
}

/**
 * Plot ellipse rotated by angle (radian)
 * @param  {number} x
 * @param  {number} y
 * @param  {number} a
 * @param  {number} b
 * @param  {number} angle
 * @param  {setPixel} setPixel
 */
export function rotatedEllipse(
  x: number,
  y: number,
  a: number,
  b: number,
  angle: number,
  setPixel: setPixelFn
) {
  let xd = a * a;
  let yd = b * b;
  const s = Math.sin(angle);
  let zd = (xd - yd) * s; /* ellipse rotation */
  xd = Math.sqrt(xd - zd * s);
  yd = Math.sqrt(yd + zd * s); /* surrounding rectangle */
  a = xd + 0.5;
  b = yd + 0.5;
  zd = (zd * a * b) / (xd * yd); /* scale to integer */
  rotatedEllipseRect(
    x - a,
    y - b,
    x + a,
    y + b,
    4 * zd * Math.cos(angle),
    setPixel
  );
}

/**
 * Rectangle encloMath.sing the ellipse, integer rotation angle
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} zd
 * @param  {setPixel} setPixel
 */
export function rotatedEllipseRect(x0, y0, x1, y1, zd, setPixel) {
  let xd = x1 - x0;
  let yd = y1 - y0;
  let w = xd * yd;
  if (zd === 0) return ellipseRect(x0, y0, x1, y1, setPixel); /* looks nicer */
  if (w !== 0.0) w = (w - zd) / (w + w); /* squared weight of P1 */
  assert(w <= 1 && w >= 0.0, "limit angle to |zd|<=xd*yd");
  xd = Math.floor(xd * w + 0.5);
  yd = Math.floor(yd * w + 0.5); /* snap xe,ye to int */
  quadRationalBezierSegment(x0, y0 + yd, x0, y0, x0 + xd, y0, 1 - w, setPixel);
  quadRationalBezierSegment(x0, y0 + yd, x0, y1, x1 - xd, y1, w, setPixel);
  quadRationalBezierSegment(x1, y1 - yd, x1, y1, x1 - xd, y1, 1 - w, setPixel);
  quadRationalBezierSegment(x1, y1 - yd, x1, y0, x0 + xd, y0, w, setPixel);
}

/**
 * Rectangular parameter encloMath.sing the ellipse
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {setPixel} setPixel
 */
export function ellipseRect(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  setPixel: setPixelFn
) {
  let a = Math.abs(x1 - x0);
  let b = Math.abs(y1 - y0);
  let b1 = b & 1; /* diameter */
  let dx = 4 * (1 - a) * b * b;
  let dy = 4 * (b1 + 1) * a * a; /* error increment */
  let err = dx + dy + b1 * a * a;
  let e2: number; /* error of 1.step */

  if (x0 > x1) {
    x0 = x1;
    x1 += a;
  } /* if called with swapped points */
  if (y0 > y1) y0 = y1; /* .. exchange them */
  y0 += (b + 1) / 2;
  y1 = y0 - b1; /* starting pixel */
  a = 8 * a * a;
  b1 = 8 * b * b;

  do {
    setPixel(x1, y0); /*   I. Quadrant */
    setPixel(x0, y0); /*  II. Quadrant */
    setPixel(x0, y1); /* III. Quadrant */
    setPixel(x1, y1); /*  IV. Quadrant */
    e2 = 2 * err;
    if (e2 <= dy) {
      y0++;
      y1--;
      err += dy += a;
    } /* y step */
    if (e2 >= dx || 2 * err > dy) {
      x0++;
      x1--;
      err += dx += b1;
    } /* x step */
  } while (x0 <= x1);

  while (y0 - y1 <= b) {
    /* too early stop of flat ellipses a=1 */
    setPixel(x0 - 1, y0); /* -> finish tip of ellipse */
    setPixel(x1 + 1, y0++);
    setPixel(x0 - 1, y1);
    setPixel(x1 + 1, y1--);
  }
}
