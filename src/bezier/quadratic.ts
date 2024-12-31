import assert from '../assert';
import { line, lineAA } from '../line';

/**
 * Plot any quadratic Bezier curve
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {setPixel} setPixel
 */
export function quadBezier(x0, y0, x1, y1, x2, y2, setPixel) {
  var x = x0 - x1,
      y = y0 - y1;
  var t = x0 - 2 * x1 + x2, r;

  if (x * (x2 - x1) > 0) { /* horizontal cut at P4? */
    if (y * (y2 - y1) > 0) /* vertical cut at P6 too? */
      if (Math.abs((y0 - 2 * y1 + y2) / t * x) > Math.abs(y)) { /* which first? */
        x0 = x2;
        x2 = x + x1;
        y0 = y2;
        y2 = y + y1; /* swap points */
      } /* now horizontal cut at P4 comes first */
    t = (x0 - x1) / t;
    r = (1 - t) * ((1 - t) * y0 + 2 * t * y1) + t * t * y2; /* By(t=P4) */
    t = (x0 * x2 - x1 * x1) * t / (x0 - x1); /* gradient dP4/dx=0 */
    x = Math.floor(t + 0.5);
    y = Math.floor(r + 0.5);
    r = (y1 - y0) * (t - x0) / (x1 - x0) + y0; /* intersect P3 | P0 P1 */
    quadBezierSegment(x0, y0, x, Math.floor(r + 0.5), x, y, setPixel);
    r = (y1 - y2) * (t - x2) / (x1 - x2) + y2; /* intersect P4 | P1 P2 */
    x0 = x1 = x;
    y0 = y;
    y1 = Math.floor(r + 0.5); /* P0 = P4, P1 = P8 */
  }
  if ((y0 - y1) * (y2 - y1) > 0) { /* vertical cut at P6? */
    t = y0 - 2 * y1 + y2;
    t = (y0 - y1) / t;
    r = (1 - t) * ((1 - t) * x0 + 2 * t * x1) + t * t * x2; /* Bx(t=P6) */
    t = (y0 * y2 - y1 * y1) * t / (y0 - y1); /* gradient dP6/dy=0 */
    x = Math.floor(r + 0.5);
    y = Math.floor(t + 0.5);
    r = (x1 - x0) * (t - y0) / (y1 - y0) + x0; /* intersect P6 | P0 P1 */
    quadBezierSegment(x0, y0, Math.floor(r + 0.5), y, x, y, setPixel);
    r = (x1 - x2) * (t - y2) / (y1 - y2) + x2; /* intersect P7 | P1 P2 */
    x0 = x;
    x1 = Math.floor(r + 0.5);
    y0 = y1 = y; /* P0 = P6, P1 = P7 */
  }
  quadBezierSegment(x0, y0, x1, y1, x2, y2, setPixel); /* remaining part */
}

/**
 * plot a limited quadratic Bezier segment
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {setPixel} setPixel
 */
export function quadBezierSegment(x0, y0, x1, y1, x2, y2, setPixel) {
  var sx = x2 - x1,
      sy = y2 - y1;
  var xx = x0 - x1,
      yy = y0 - y1,
      xy; /* relative values for checks */
  var dx, dy, err, cur = xx * sy - yy * sx; /* curvature */

  assert(xx * sx <= 0 && yy * sy <= 0, 'sign of gradient must not change');

  if (sx * sx + sy * sy > xx * xx + yy * yy) { /* begin with longer part */
    x2 = x0;
    x0 = sx + x1;
    y2 = y0;
    y0 = sy + y1;
    cur = -cur; /* swap P0 P2 */
  }
  if (cur != 0) { /* no straight line */
    xx += sx;
    xx *= sx = x0 < x2 ? 1 : -1; /* x step direction */
    yy += sy;
    yy *= sy = y0 < y2 ? 1 : -1; /* y step direction */
    xy = 2 * xx * yy;
    xx *= xx;
    yy *= yy; /* differences 2nd degree */
    if (cur * sx * sy < 0) { /* negated curvature? */
      xx = -xx;
      yy = -yy;
      xy = -xy;
      cur = -cur;
    }
    dx = 4 * sy * cur * (x1 - x0) + xx - xy; /* differences 1st degree */
    dy = 4 * sx * cur * (y0 - y1) + yy - xy;
    xx += xx;
    yy += yy;
    err = dx + dy + xy; /* error 1st step */
    do {
      setPixel(x0, y0); /* plot curve */
      if (x0 == x2 && y0 == y2) return; /* last pixel -> curve finished */
      y1 = 2 * err < dx; /* save value for test of y step */
      if (2 * err > dy) {
        x0 += sx;
        dx -= xy;
        err += dy += yy;
      } /* x step */
      if (y1) {
        y0 += sy;
        dy -= xy;
        err += dx += xx;
      } /* y step */
    } while (dy < 0 && dx > 0); /* gradient negates -> algorithm fails */
  }
  line(x0, y0, x2, y2, setPixel); /* plot remaining part to end */
}


/**
 * Plot any quadratic Bezier curve with anti-alias
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {setPixelAlpha} setPixelAA
 */
export function quadBezierAA(x0, y0, x1, y1, x2, y2, setPixelAA) {
  var x = x0 - x1,
      y = y0 - y1;
  var t = x0 - 2 * x1 + x2, r;

  if (x * (x2 - x1) > 0) { /* horizontal cut at P4? */
    if (y * (y2 - y1) > 0) /* vertical cut at P6 too? */
      if (Math.abs((y0 - 2 * y1 + y2) / t * x) > Math.abs(y)) { /* which first? */
        x0 = x2;
        x2 = x + x1;
        y0 = y2;
        y2 = y + y1; /* swap points */
      } /* now horizontal cut at P4 comes first */
    t = (x0 - x1) / t;
    r = (1 - t) * ((1 - t) * y0 + 2 * t * y1) + t * t * y2; /* By(t=P4) */
    t = (x0 * x2 - x1 * x1) * t / (x0 - x1); /* gradient dP4/dx=0 */
    x = Math.floor(t + 0.5);
    y = Math.floor(r + 0.5);
    r = (y1 - y0) * (t - x0) / (x1 - x0) + y0; /* intersect P3 | P0 P1 */
    quadBezierSegmentAA(x0, y0, x, Math.floor(r + 0.5), x, y, setPixelAA);
    r = (y1 - y2) * (t - x2) / (x1 - x2) + y2; /* intersect P4 | P1 P2 */
    x0 = x1 = x;
    y0 = y;
    y1 = Math.floor(r + 0.5); /* P0 = P4, P1 = P8 */
  }
  if ((y0 - y1) * (y2 - y1) > 0) { /* vertical cut at P6? */
    t = y0 - 2 * y1 + y2;
    t = (y0 - y1) / t;
    r = (1 - t) * ((1 - t) * x0 + 2 * t * x1) + t * t * x2; /* Bx(t=P6) */
    t = (y0 * y2 - y1 * y1) * t / (y0 - y1); /* gradient dP6/dy=0 */
    x = Math.floor(r + 0.5);
    y = Math.floor(t + 0.5);
    r = (x1 - x0) * (t - y0) / (y1 - y0) + x0; /* intersect P6 | P0 P1 */
    quadBezierSegmentAA(x0, y0, Math.floor(r + 0.5), y, x, y, setPixelAA);
    r = (x1 - x2) * (t - y2) / (y1 - y2) + x2; /* intersect P7 | P1 P2 */
    x0 = x;
    x1 = Math.floor(r + 0.5);
    y0 = y1 = y; /* P0 = P6, P1 = P7 */
  }
  quadBezierSegmentAA(x0, y0, x1, y1, x2, y2, setPixelAA); /* remaining part */
}


/**
 * Draw an limited anti-aliased quadratic Bezier segment
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {setPixelAlpha} setPixelAA
 */
export function quadBezierSegmentAA(x0, y0, x1, y1, x2, y2, setPixelAA) {
  var sx = x2 - x1,
      sy = y2 - y1;
  var xx = x0 - x1,
      yy = y0 - y1,
      xy; /* relative values for checks */
  var dx, dy, err, ed, cur = xx * sy - yy * sx; /* curvature */

  // assert(xx*sx <= 0 && yy*sy <= 0, 'sign of gradient must not change');

  if (sx * sx + sy * sy > xx * xx + yy * yy) { /* begin with longer part */
    x2 = x0;
    x0 = sx + x1;
    y2 = y0;
    y0 = sy + y1;
    cur = -cur; /* swap P0 P2 */
  }
  if (cur != 0) { /* no straight line */
    xx += sx;
    xx *= sx = x0 < x2 ? 1 : -1; /* x step direction */
    yy += sy;
    yy *= sy = y0 < y2 ? 1 : -1; /* y step direction */
    xy = 2 * xx * yy;
    xx *= xx;
    yy *= yy; /* differences 2nd degree */
    if (cur * sx * sy < 0) { /* negated curvature? */
      xx = -xx;
      yy = -yy;
      xy = -xy;
      cur = -cur;
    }
    dx = 4 * sy * (x1 - x0) * cur + xx - xy; /* differences 1st degree */
    dy = 4 * sx * (y0 - y1) * cur + yy - xy;
    xx += xx;
    yy += yy;
    err = dx + dy + xy; /* error 1st step */
    do {
      cur = Math.min(dx + xy, -xy - dy);
      ed = Math.max(dx + xy, -xy - dy); /* approximate error distance */
      ed += 2 * ed * cur * cur / (4 * ed * ed + cur * cur);
      setPixelAA(x0, y0, 255 * Math.abs(err - dx - dy - xy) / ed); /* plot curve */
      if (x0 == x2 || y0 == y2) break; /* last pixel -> curve finished */
      x1 = x0;
      cur = dx - err;
      y1 = 2 * err + dy < 0;
      if (2 * err + dx > 0) { /* x step */
        if (err - dy < ed) setPixelAA(x0, y0 + sy, 255 * Math.abs(err - dy) / ed);
        x0 += sx;
        dx -= xy;
        err += dy += yy;
      }
      if (y1) { /* y step */
        if (cur < ed) setPixelAA(x1 + sx, y0, 255 * Math.abs(cur) / ed);
        y0 += sy;
        dy -= xy;
        err += dx += xx;
      }
    } while (dy < dx); /* gradient negates -> close curves */
  }
  lineAA(x0, y0, x2, y2, setPixelAA); /* plot remaining needle to end */
}
