import assert from '../assert';
import {
  quadBezierSegmentAA,
  quadBezierSegment
} from './quadratic';
import { line, lineAA } from '../line';

/**
 * Plot limited cubic Bezier segment
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {number} x3
 * @param  {number} y3
 * @param  {setPixel} setPixel
 */
export function cubicBezierSegment(x0, y0, x1, y1, x2, y2, x3, y3, setPixel) {
  var f, fx, fy, leg = 1;
  var sx = x0 < x3 ? 1 : -1,
      sy = y0 < y3 ? 1 : -1; /* step direction */
  var xc = -Math.abs(x0 + x1 - x2 - x3),
      xa = xc - 4 * sx * (x1 - x2),
      xb = sx * (x0 - x1 - x2 + x3);
  var yc = -Math.abs(y0 + y1 - y2 - y3),
      ya = yc - 4 * sy * (y1 - y2),
      yb = sy * (y0 - y1 - y2 + y3);
  var ab, ac, bc, cb, xx, xy, yy, dx, dy, ex, pxy, EP = 0.01;
  /* check for curve restrains */
  /* slope P0-P1 == P2-P3    and  (P0-P3 == P1-P2      or   no slope change) */
  assert((x1 - x0) * (x2 - x3) < EP && ((x3 - x0) * (x1 - x2) < EP || xb * xb <
    xa * xc + EP), 'slope change');
  assert((y1 - y0) * (y2 - y3) < EP && ((y3 - y0) * (y1 - y2) < EP || yb * yb <
    ya * yc + EP), 'slope change');

  if (xa == 0 && ya == 0) { /* quadratic Bezier */
    sx = Math.floor((3 * x1 - x0 + 1) / 2);
    sy = Math.floor((3 * y1 - y0 + 1) / 2); /* new midpoint */
    return quadBezierSegment(x0, y0, sx, sy, x3, y3, setPixel);
  }
  x1 = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0) + 1; /* line lengths */
  x2 = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3) + 1;
  do { /* loop over both ends */
    ab = xa * yb - xb * ya;
    ac = xa * yc - xc * ya;
    bc = xb * yc - xc * yb;
    ex = ab * (ab + ac - 3 * bc) + ac * ac; /* P0 part of self-intersection loop? */
    f = ex > 0 ? 1 : Math.sqrt(1 + 1024 / x1); /* calculate resolution */
    ab *= f;
    ac *= f;
    bc *= f;
    ex *= f * f; /* increase resolution */
    xy = 9 * (ab + ac + bc) / 8;
    cb = 8 * (xa - ya); /* init differences of 1st degree */
    dx = 27 * (8 * ab * (yb * yb - ya * yc) + ex * (ya + 2 * yb + yc)) / 64 -
      ya * ya * (xy - ya);
    dy = 27 * (8 * ab * (xb * xb - xa * xc) - ex * (xa + 2 * xb + xc)) / 64 -
      xa * xa * (xy + xa);
    /* init differences of 2nd degree */
    xx = 3 * (3 * ab * (3 * yb * yb - ya * ya - 2 * ya * yc) - ya * (3 * ac * (
      ya + yb) + ya * cb)) / 4;
    yy = 3 * (3 * ab * (3 * xb * xb - xa * xa - 2 * xa * xc) - xa * (3 * ac * (
      xa + xb) + xa * cb)) / 4;
    xy = xa * ya * (6 * ab + 6 * ac - 3 * bc + cb);
    ac = ya * ya;
    cb = xa * xa;
    xy = 3 * (xy + 9 * f * (cb * yb * yc - xb * xc * ac) - 18 * xb * yb * ab) /
      8;

    if (ex < 0) { /* negate values if inside self-intersection loop */
      dx = -dx;
      dy = -dy;
      xx = -xx;
      yy = -yy;
      xy = -xy;
      ac = -ac;
      cb = -cb;
    } /* init differences of 3rd degree */
    ab = 6 * ya * ac;
    ac = -6 * xa * ac;
    bc = 6 * ya * cb;
    cb = -6 * xa * cb;
    dx += xy;
    ex = dx + dy;
    dy += xy; /* error of 1st step */

    outer:for (pxy = xy, fx = fy = f; x0 != x3 && y0 != y3;) {
      setPixel(x0, y0); /* plot curve */
      do { /* move sub-steps of one pixel */
        if (dx > pxy || dy < pxy) {
          break outer;
        } /* confuMath.sing values */
        y1 = 2 * ex - dy; /* save value for test of y step */
        if (2 * ex >= dx) { /* x sub-step */
          fx--;
          ex += dx += xx;
          dy += xy += ac;
          yy += bc;
          xx += ab;
        }
        if (y1 <= 0) { /* y sub-step */
          fy--;
          ex += dy += yy;
          dx += xy += bc;
          xx += ac;
          yy += cb;
        }
      } while (fx > 0 && fy > 0); /* pixel complete? */
      if (2 * fx <= f) {
        x0 += sx;
        fx += f;
      } /* x step */
      if (2 * fy <= f) {
        y0 += sy;
        fy += f;
      } /* y step */
      if (pxy == xy && dx < 0 && dy > 0) pxy = EP; /* pixel ahead valid */
    }
    //exit:
    xx = x0;
    x0 = x3;
    x3 = xx;
    sx = -sx;
    xb = -xb; /* swap legs */

    yy = y0;
    y0 = y3;
    y3 = yy;
    sy = -sy;
    yb = -yb;
    x1 = x2;
  } while (leg--); /* try other end */
  line(x0, y0, x3, y3, setPixel); /* remaining part in case of cusp or crunode */
}

/**
 * Plot limited anti-aliased cubic Bezier segment
 * @param  {Number} x0
 * @param  {Number} y0
 * @param  {Number} x1
 * @param  {Number} y1
 * @param  {Number} x2
 * @param  {Number} y2
 * @param  {Number} x3
 * @param  {Number} y3
 * @param  {setPixelAA} setPixelAA
 */
export function cubicBezierSegmentAA(x0, y0, x1, y1, x2, y2, x3, y3, setPixelAA) {
   let f, fx, fy, leg = 1;
   let sx = x0 < x3 ? 1 : -1, sy = y0 < y3 ? 1 : -1;        /* step direction */
   let xc = -Math.abs(x0 + x1 - x2 - x3),
       xa = xc - 4 * sx * (x1 - x2),
       xb = sx * (x0 - x1 - x2 + x3);
   let yc = -Math.abs(y0 + y1 - y2 - y3),
       ya = yc - 4 * sy * (y1 - y2),
       yb = sy * (y0 - y1 - y2 + y3);
   let ab, ac, bc, ba, xx, xy, yy, dx, dy, ex, px, py, ed, ip;
   const EP = 0.01;

                                                 /* check for curve restrains */
   /* slope P0-P1 == P2-P3     and  (P0-P3 == P1-P2      or  no slope change) */
   assert((x1 - x0) * (x2 - x3) < EP &&
    ((x3 - x0) * (x1 - x2) < EP || xb * xb < xa * xc + EP));
   assert((y1 - y0) * (y2 - y3) < EP &&
    ((y3 - y0) * (y1 - y2) < EP || yb * yb < ya * yc + EP));

   if (xa === 0 && ya === 0) {                            /* quadratic Bezier */
      sx = Math.floor((3 * x1 - x0 + 1) / 2);
      sy = Math.floor((3 * y1 - y0 + 1) / 2);                 /* new midpoint */
      return quadBezierSegmentAA(x0,y0, sx,sy, x3,y3, setPixelAA);
   }
   x1 = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0) + 1;    /* line lengths */
   x2 = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3) + 1;
   do {                                                /* loop over both ends */
      ab = xa * yb-xb * ya; ac = xa * yc-xc * ya; bc = xb * yc-xc * yb;
      ip = 4 * ab * bc - ac * ac;           /* self intersection loop at all? */
                                        /* P0 part of self-intersection loop? */
      ex = ab * (ab + ac - 3 * bc) + ac * ac;
      f = ex > 0 ? 1 : Math.sqrt(1 + 1024 / x1);      /* calculate resolution */
      ab *= f; ac *= f; bc  *= f; ex  *= f * f;        /* increase resolution */
      xy = 9 * (ab + ac + bc) / 8;
      ba = 8 * (xa - ya);                   /* init differences of 1st degree */
      dx = 27 * (8 * ab * (yb * yb-ya * yc) + ex * (ya + 2 * yb + yc)) / 64 - ya * ya * (xy - ya);
      dy = 27 * (8 * ab * (xb * xb-xa * xc) - ex * (xa + 2 * xb + xc)) / 64 - xa * xa * (xy + xa);
                                            /* init differences of 2nd degree */
      xx = 3 * (3 * ab * (3 * yb * yb - ya * ya - 2 * ya * yc) - ya * (3 * ac * (ya + yb) + ya * ba)) / 4;
      yy = 3 * (3 * ab * (3 * xb * xb - xa * xa - 2 * xa * xc) - xa * (3 * ac * (xa + xb) + xa * ba)) / 4;
      xy = xa * ya * (6 * ab + 6 * ac - 3 * bc + ba);
      ac = ya * ya;
      ba = xa * xa;
      xy = 3 * (xy + 9 * f * (ba * yb * yc-xb * xc * ac) - 18 * xb * yb * ab) / 8;

      if (ex < 0) {         /* negate values if inside self-intersection loop */
         dx = -dx; dy = -dy; xx = -xx; yy = -yy; xy = -xy; ac = -ac; ba = -ba;
      }                                     /* init differences of 3rd degree */
      ab = 6 * ya * ac; ac = -6 * xa * ac; bc = 6 * ya * ba; ba = -6 * xa * ba;
      dx += xy; ex = dx+dy; dy += xy;                    /* error of 1st step */

      let exit = false;
      outer: for (fx = fy = f; x0 !== x3 && y0 !== y3; ) {
         y1 = Math.min(Math.abs(xy-dx), Math.abs(dy-xy));
         /* approximate error distance */
         ed = Math.max(Math.abs(xy-dx), Math.abs(dy-xy));
         ed = f * (ed+2 * ed * y1 * y1 / (4 * ed * ed + y1 * y1));
         y1 = 255 * Math.abs(ex - (f - fx + 1) * dx - (f - fy + 1) * dy + f * xy) / ed;
         if (y1 < 256) setPixelAA(x0, y0, y1);                  /* plot curve */
         /* pixel intensity x move */
         px = Math.abs(ex - (f - fx + 1) * dx + (fy - 1) * dy);
         /* pixel intensity y move */
         py = Math.abs(ex + (fx - 1) * dx - (f - fy + 1) * dy);
         y2 = y0;
         do {                                  /* move sub-steps of one pixel */
            if (ip >= -EP)               /* intersection possible? -> check.. */
              if (dx+xx > xy || dy+yy < xy) {             /* two x or y steps */
                exit = true; break outer;
              }
            y1 = 2 * ex+dx;                  /* save value for test of y step */
            if (2 * ex+dy > 0) {                                /* x sub-step */
               fx--; ex += dx += xx; dy += xy += ac; yy += bc; xx += ab;
            } else if (y1 > 0) {                          /* tiny nearly cusp */
              exit = true; break outer;
            }
            if (y1 <= 0) {                                      /* y sub-step */
               fy--; ex += dy += yy; dx += xy += bc; xx += ac; yy += ba;
            }
         } while (fx > 0 && fy > 0);                       /* pixel complete? */
         if (2 * fy <= f) {                         /* x+ anti-aliasing pixel */
            if (py < ed) setPixelAA(x0 + sx, y0, 255 * py / ed);/* plot curve */
            y0 += sy; fy += f;                                      /* y step */
         }
         if (2 * fx <= f) {                         /* y+ anti-aliasing pixel */
            if (px < ed) setPixelAA(x0, y2 + sy, 255 * px / ed);/* plot curve */
            x0 += sx; fx += f;                                      /* x step */
         }
      }

      if (exit) {
        if (2 * ex < dy && 2 * fy <= f+2) {   /* round x+ approximation pixel */
           if (py < ed) setPixelAA(x0 + sx, y0, 255 * py / ed); /* plot curve */
           y0 += sy;
        }
        if (2 * ex > dx && 2 * fx <= f+2) {   /* round y+ approximation pixel */
           if (px < ed) setPixelAA(x0, y2 + sy, 255 * px / ed); /* plot curve */
           x0 += sx;
        }
        xx = x0; x0 = x3; x3 = xx; sx = -sx; xb = -xb;           /* swap legs */
        yy = y0; y0 = y3; y3 = yy; sy = -sy; yb = -yb; x1 = x2;
      }
      break;                                          /* finish curve by line */
   } while (leg--);                                          /* try other end */
   /* remaining part in case of cusp or crunode */
   lineAA(x0,y0, x3,y3, setPixelAA);
}

/**
 * plot any cubic Bezier curve
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @param  {number} x3
 * @param  {number} y3
 * @param  {setPixel} setPixel
 */
export function cubicBezier(x0, y0, x1, y1, x2, y2, x3, y3, setPixel) {
  var n = 0, i = 0;
  var xc = x0 + x1 - x2 - x3,
      xa = xc - 4 * (x1 - x2);
  var xb = x0 - x1 - x2 + x3,
      xd = xb + 4 * (x1 + x2);
  var yc = y0 + y1 - y2 - y3,
      ya = yc - 4 * (y1 - y2);
  var yb = y0 - y1 - y2 + y3,
      yd = yb + 4 * (y1 + y2);
  var fx0 = x0,
      fx1, fx2, fx3, fy0 = y0,
      fy1, fy2, fy3;
  var t1 = xb * xb - xa * xc,
      t2, t = [0, 0, 0, 0, 0];
  /* sub-divide curve at gradient sign changes */
  if (xa == 0) { /* horizontal */
    if (Math.abs(xc) < 2 * Math.abs(xb)) t[n++] = xc / (2 * xb); /* one change */
  } else if (t1 > 0.0) { /* two changes */
    t2 = Math.sqrt(t1);
    t1 = (xb - t2) / xa;
    if (Math.abs(t1) < 1) t[n++] = t1;
    t1 = (xb + t2) / xa;
    if (Math.abs(t1) < 1) t[n++] = t1;
  }
  t1 = yb * yb - ya * yc;
  if (ya == 0) { /* vertical */
    if (Math.abs(yc) < 2 * Math.abs(yb)) t[n++] = yc / (2 * yb); /* one change */
  } else if (t1 > 0.0) { /* two changes */
    t2 = Math.sqrt(t1);
    t1 = (yb - t2) / ya;
    if (Math.abs(t1) < 1) t[n++] = t1;
    t1 = (yb + t2) / ya;
    if (Math.abs(t1) < 1) t[n++] = t1;
  }
  for (i = 1; i < n; i++) /* bubble sort of 4 points */
    if ((t1 = t[i - 1]) > t[i]) {
      t[i - 1] = t[i];
      t[i] = t1;
      i = 0;
    }

  t1 = -1;
  t[n] = 1; /* begin / end point */
  for (i = 0; i <= n; i++) { /* plot each segment separately */
    t2 = t[i]; /* sub-divide at t[i-1], t[i] */
    fx1 = (t1 * (t1 * xb - 2 * xc) - t2 * (t1 * (t1 * xa - 2 * xb) + xc) + xd) / 8 - fx0;
    fy1 = (t1 * (t1 * yb - 2 * yc) - t2 * (t1 * (t1 * ya - 2 * yb) + yc) + yd) / 8 - fy0;
    fx2 = (t2 * (t2 * xb - 2 * xc) - t1 * (t2 * (t2 * xa - 2 * xb) + xc) + xd) / 8 - fx0;
    fy2 = (t2 * (t2 * yb - 2 * yc) - t1 * (t2 * (t2 * ya - 2 * yb) + yc) + yd) / 8 - fy0;
    fx0 -= fx3 = (t2 * (t2 * (3 * xb - t2 * xa) - 3 * xc) + xd) / 8;
    fy0 -= fy3 = (t2 * (t2 * (3 * yb - t2 * ya) - 3 * yc) + yd) / 8;
    x3 = Math.floor(fx3 + 0.5);
    y3 = Math.floor(fy3 + 0.5); /* scale bounds to int */
    if (fx0 != 0.0) {
      fx1 *= fx0 = (x0 - x3) / fx0;
      fx2 *= fx0;
    }
    if (fy0 != 0.0) {
      fy1 *= fy0 = (y0 - y3) / fy0;
      fy2 *= fy0;
    }
    if (x0 != x3 || y0 != y3) /* segment t1 - t2 */
      cubicBezierSegment(x0, y0, x0 + fx1, y0 + fy1, x0 + fx2, y0 + fy2, x3, y3, setPixel);
    x0 = x3;
    y0 = y3;
    fx0 = fx3;
    fy0 = fy3;
    t1 = t2;
  }
}
