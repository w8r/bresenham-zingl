/**
 * Circle rasterisation
 * @param  {number} xm
 * @param  {number} ym
 * @param  {number} r
 * @param  {setPixel} setPixel
 */
export function circle(xm, ym, r, setPixel) {
  var x = -r, y = 0, err = 2 - 2 * r; /* bottom left to top right */
  do {
    setPixel(xm - x, ym + y); /*   I. Quadrant +x +y */
    setPixel(xm - y, ym - x); /*  II. Quadrant -x +y */
    setPixel(xm + x, ym - y); /* III. Quadrant -x -y */
    setPixel(xm + y, ym + x); /*  IV. Quadrant +x -y */
    r = err;
    if (r <= y) err += ++y * 2 + 1; /* e_xy+e_y < 0 */
    if (r > x || err > y) /* e_xy+e_x > 0 or no 2nd y-step */
      err += ++x * 2 + 1; /* -> x-step now */
  } while (x < 0);
}

/**
 * Draw a black anti-aliased circle on white background
 * @param  {number} xm
 * @param  {number} ym
 * @param  {number} r
 * @param  {setPixelAlpha} setPixelAA
 */
export function circleAA(xm, ym, r, setPixelAA) {
  var x = -r,
      y = 0; /* II. quadrant from bottom left to top right */
  var i, x2, e2, err = 2 - 2 * r; /* error of 1.step */
  r = 1 - err;
  do {
    i = 255 * Math.abs(err - 2 * (x + y) - 2) / r; /* get blend value of pixel */
    setPixelAA(xm - x, ym + y, i); /*   I. Quadrant */
    setPixelAA(xm - y, ym - x, i); /*  II. Quadrant */
    setPixelAA(xm + x, ym - y, i); /* III. Quadrant */
    setPixelAA(xm + y, ym + x, i); /*  IV. Quadrant */
    e2 = err;
    x2 = x; /* remember values */
    if (err + y > 0) { /* x step */
      i = 255 * (err - 2 * x - 1) / r; /* outward pixel */
      if (i < 256) {
        setPixelAA(xm - x, ym + y + 1, i);
        setPixelAA(xm - y - 1, ym - x, i);
        setPixelAA(xm + x, ym - y - 1, i);
        setPixelAA(xm + y + 1, ym + x, i);
      }
      err += ++x * 2 + 1;
    }
    if (e2 + x2 <= 0) { /* y step */
      i = 255 * (2 * y + 3 - e2) / r; /* inward pixel */
      if (i < 256) {
        setPixelAA(xm - x2 - 1, ym + y, i);
        setPixelAA(xm - y, ym - x2 - 1, i);
        setPixelAA(xm + x2 + 1, ym - y, i);
        setPixelAA(xm + y, ym + x2 + 1, i);
      }
      err += ++y * 2 + 1;
    }
  } while (x < 0);
}
