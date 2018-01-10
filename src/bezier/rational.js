import assert from '../assert';
import { line, lineAA } from '../line';

/**
 * plot any quadratic rational Bezier curve
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {number} w
 * @param  {setPixel} setPixel
 */
export function quadRationalBezier(x0, y0, x1, y1, x2, y2, w, setPixel) {
  var x = x0 - 2 * x1 + x2,
      y = y0 - 2 * y1 + y2;
  var xx = x0 - x1,
      yy = y0 - y1,
      ww, t, q;

  assert(w >= 0.0, 'width is negative');

  if (xx * (x2 - x1) > 0) { /* horizontal cut at P4? */
    if (yy * (y2 - y1) > 0) /* vertical cut at P6 too? */
      if (Math.abs(xx * y) > Math.abs(yy * x)) { /* which first? */
        x0 = x2;
        x2 = xx + x1;
        y0 = y2;
        y2 = yy + y1; /* swap points */
      } /* now horizontal cut at P4 comes first */
    if (x0 == x2 || w == 1) t = (x0 - x1) / x;
    else { /* non-rational or rational case */
      q = Math.sqrt(4 * w * w * (x0 - x1) * (x2 - x1) + (x2 - x0) * (x2 - x0));
      if (x1 < x0) q = -q;
      t = (2 * w * (x0 - x1) - x0 + x2 + q) / (2 * (1 - w) * (x2 - x0)); /* t at P4 */
    }
    q = 1 / (2 * t * (1 - t) * (w - 1) + 1); /* sub-divide at t */
    xx = (t * t * (x0 - 2 * w * x1 + x2) + 2 * t * (w * x1 - x0) + x0) * q; /* = P4 */
    yy = (t * t * (y0 - 2 * w * y1 + y2) + 2 * t * (w * y1 - y0) + y0) * q;
    ww = t * (w - 1) + 1;
    ww *= ww * q; /* squared weight P3 */
    w = ((1 - t) * (w - 1) + 1) * Math.sqrt(q); /* weight P8 */
    x = Math.floor(xx + 0.5);
    y = Math.floor(yy + 0.5); /* P4 */
    yy = (xx - x0) * (y1 - y0) / (x1 - x0) + y0; /* intersect P3 | P0 P1 */
    quadRationalBezierSegment(x0, y0, x, Math.floor(yy + 0.5), x, y, ww, setPixel);
    yy = (xx - x2) * (y1 - y2) / (x1 - x2) + y2; /* intersect P4 | P1 P2 */
    y1 = Math.floor(yy + 0.5);
    x0 = x1 = x;
    y0 = y; /* P0 = P4, P1 = P8 */
  }
  if ((y0 - y1) * (y2 - y1) > 0) { /* vertical cut at P6? */
    if (y0 == y2 || w == 1) t = (y0 - y1) / (y0 - 2 * y1 + y2);
    else { /* non-rational or rational case */
      q = Math.sqrt(4 * w * w * (y0 - y1) * (y2 - y1) + (y2 - y0) * (y2 - y0));
      if (y1 < y0) q = -q;
      t = (2 * w * (y0 - y1) - y0 + y2 + q) / (2 * (1 - w) * (y2 - y0)); /* t at P6 */
    }
    q = 1 / (2 * t * (1 - t) * (w - 1) + 1); /* sub-divide at t */
    xx = (t * t * (x0 - 2 * w * x1 + x2) + 2 * t * (w * x1 - x0) + x0) * q; /* = P6 */
    yy = (t * t * (y0 - 2 * w * y1 + y2) + 2 * t * (w * y1 - y0) + y0) * q;
    ww = t * (w - 1) + 1;
    ww *= ww * q; /* squared weight P5 */
    w = ((1 - t) * (w - 1) + 1) * Math.sqrt(q); /* weight P7 */
    x = Math.floor(xx + 0.5);
    y = Math.floor(yy + 0.5); /* P6 */
    xx = (x1 - x0) * (yy - y0) / (y1 - y0) + x0; /* intersect P6 | P0 P1 */
    quadRationalBezierSegment(x0, y0, Math.floor(xx + 0.5), y, x, y, ww, setPixel);
    xx = (x1 - x2) * (yy - y2) / (y1 - y2) + x2; /* intersect P7 | P1 P2 */
    x1 = Math.floor(xx + 0.5);
    x0 = x;
    y0 = y1 = y; /* P0 = P6, P1 = P7 */
  }
  quadRationalBezierSegment(x0, y0, x1, y1, x2, y2, w * w, setPixel); /* remaining */
}

/**
 * plot a limited rational Bezier segment, squared weight
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {number} w
 * @param  {setPixel} setPixel
 */
export function quadRationalBezierSegment(x0, y0, x1, y1, x2, y2, w, setPixel) {
  var sx = x2 - x1,
      sy = y2 - y1; /* relative values for checks */
  var dx = x0 - x2,
      dy = y0 - y2,
      xx = x0 - x1,
      yy = y0 - y1;
  var xy = xx * sy + yy * sx,
      cur = xx * sy - yy * sx,
      err; /* curvature */

  assert(xx * sx <= 0.0 && yy * sy <= 0.0, 'sign of gradient must not change');

  if (cur != 0.0 && w > 0.0) { /* no straight line */
    if (sx * sx + sy * sy > xx * xx + yy * yy) { /* begin with longer part */
      x2 = x0;
      x0 -= dx;
      y2 = y0;
      y0 -= dy;
      cur = -cur; /* swap P0 P2 */
    }
    xx = 2 * (4 * w * sx * xx + dx * dx); /* differences 2nd degree */
    yy = 2 * (4 * w * sy * yy + dy * dy);
    sx = x0 < x2 ? 1 : -1; /* x step direction */
    sy = y0 < y2 ? 1 : -1; /* y step direction */
    xy = -2 * sx * sy * (2 * w * xy + dx * dy);

    if (cur * sx * sy < 0.0) { /* negated curvature? */
      xx = -xx;
      yy = -yy;
      xy = -xy;
      cur = -cur;
    }
    dx = 4 * w * (x1 - x0) * sy * cur + xx / 2 + xy; /* differences 1st degree */
    dy = 4 * w * (y0 - y1) * sx * cur + yy / 2 + xy;

    if (w < 0.5 && (dy > xy || dx < xy)) { /* flat ellipse, algorithm fails */
      cur = (w + 1) / 2;
      w = Math.sqrt(w);
      xy = 1 / (w + 1);
      sx = Math.floor((x0 + 2 * w * x1 + x2) * xy / 2 + 0.5); /* subdivide curve in half */
      sy = Math.floor((y0 + 2 * w * y1 + y2) * xy / 2 + 0.5);
      dx = Math.floor((w * x1 + x0) * xy + 0.5);
      dy = Math.floor((y1 * w + y0) * xy + 0.5, setPixel);
      quadRationalBezierSegment(x0, y0, dx, dy, sx, sy, cur); /* plot separately */
      dx = Math.floor((w * x1 + x2) * xy + 0.5);
      dy = Math.floor((y1 * w + y2) * xy + 0.5, setPixel);
      quadRationalBezierSegment(sx, sy, dx, dy, x2, y2, cur, setPixel);
      return;
    }
    err = dx + dy - xy; /* error 1.step */
    do {
      setPixel(x0, y0); /* plot curve */
      if (x0 == x2 && y0 == y2) return; /* last pixel -> curve finished */
      x1 = 2 * err > dy;
      y1 = 2 * (err + yy) < -dy; /* save value for test of x step */
      if (2 * err < dx || y1) {
        y0 += sy;
        dy += xy;
        err += dx += xx;
      } /* y step */
      if (2 * err > dx || x1) {
        x0 += sx;
        dx += xy;
        err += dy += yy;
      } /* x step */
    } while (dy <= xy && dx >= xy); /* gradient negates -> algorithm fails */
  }
  line(x0, y0, x2, y2, setPixel); /* plot remaining needle to end */
}


/**
 * draw an anti-aliased rational quadratic Bezier segment, squared weight
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {number} w
 * @param  {setPixelAlpha} setPixelAA
 */
export function quadRationalBezierSegmentAA(x0, y0, x1, y1, x2, y2, w, setPixelAA) {
  var sx = x2 - x1,
      sy = y2 - y1; /* relative values for checks */
  var dx = x0 - x2,
      dy = y0 - y2,
      xx = x0 - x1,
      yy = y0 - y1;
  var xy = xx * sy + yy * sx,
      cur = xx * sy - yy * sx,
      err, ed; /* curvature */
  var f;

  assert(xx * sx <= 0.0 && yy * sy <= 0.0); /* sign of gradient must not change */

  if (cur != 0.0 && w > 0.0) { /* no straight line */
    if (sx * sx + sy * sy > xx * xx + yy * yy) { /* begin with longer part */
      x2 = x0;
      x0 -= dx;
      y2 = y0;
      y0 -= dy;
      cur = -cur; /* swap P0 P2 */
    }
    xx = 2 * (4 * w * sx * xx + dx * dx); /* differences 2nd degree */
    yy = 2 * (4 * w * sy * yy + dy * dy);
    sx = x0 < x2 ? 1 : -1; /* x step direction */
    sy = y0 < y2 ? 1 : -1; /* y step direction */
    xy = -2 * sx * sy * (2 * w * xy + dx * dy);

    if (cur * sx * sy < 0) { /* negated curvature? */
      xx = -xx;
      yy = -yy;
      cur = -cur;
      xy = -xy;
    }
    dx = 4 * w * (x1 - x0) * sy * cur + xx / 2 + xy; /* differences 1st degree */
    dy = 4 * w * (y0 - y1) * sx * cur + yy / 2 + xy;

    if (w < 0.5 && dy > dx) { /* flat ellipse, algorithm fails */
      cur = (w + 1) / 2;
      w = Math.sqrt(w);
      xy = 1 / (w + 1);
      sx = Math.floor((x0 + 2 * w * x1 + x2) * xy / 2 + 0.5); /* subdivide curve in half  */
      sy = Math.floor((y0 + 2 * w * y1 + y2) * xy / 2 + 0.5);
      dx = Math.floor((w * x1 + x0) * xy + 0.5);
      dy = Math.floor((y1 * w + y0) * xy + 0.5);
      quadRationalBezierSegmentAA(x0, y0, dx, dy, sx, sy, cur, setPixelAA); /* plot apart */
      dx = Math.floor((w * x1 + x2) * xy + 0.5);
      dy = Math.floor((y1 * w + y2) * xy + 0.5);
      return quadRationalBezierSegmentAA(sx, sy, dx, dy, x2, y2, cur,
        setPixelAA);
    }
    err = dx + dy - xy; /* error 1st step */
    do { /* pixel loop */
      cur = Math.min(dx - xy, xy - dy);
      ed = Math.max(dx - xy, xy - dy);
      ed += 2 * ed * cur * cur / (4. * ed * ed + cur * cur); /* approximate error distance */
      x1 = 255 * Math.abs(err - dx - dy + xy) / ed; /* get blend value by pixel error */
      if (x1 < 256) setPixelAA(x0, y0, x1); /* plot curve */
      if (f = 2 * err + dy < 0) { /* y step */
        if (y0 == y2) return; /* last pixel -> curve finished */
        if (dx - err < ed) setPixelAA(x0 + sx, y0, 255 * Math.abs(dx - err) / ed);
      }
      if (2 * err + dx > 0) { /* x step */
        if (x0 == x2) return; /* last pixel -> curve finished */
        if (err - dy < ed) setPixelAA(x0, y0 + sy, 255 * Math.abs(err - dy) / ed);
        x0 += sx;
        dx += xy;
        err += dy += yy;
      }
      if (f) {
        y0 += sy;
        dy += xy;
        err += dx += xx;
      } /* y step */
    } while (dy < dx); /* gradient negates -> algorithm fails */
  }
  lineAA(x0, y0, x2, y2, setPixelAA); /* plot remaining needle to end */
}
