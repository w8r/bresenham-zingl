/**
 * Line segment rasterisation
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {setPixel} setPixel
 */
export function line(x0, y0, x1, y1, setPixel) {
  var dx = Math.abs(x1 - x0),
      sx = x0 < x1 ? 1 : -1;
  var dy = -Math.abs(y1 - y0),
      sy = y0 < y1 ? 1 : -1;
  var err = dx + dy, e2; /* error value e_xy */

  for (;;) { /* loop */
    setPixel(x0, y0);
    e2 = 2 * err;
    if (e2 >= dy) { /* e_xy+e_x > 0 */
      if (x0 === x1) break;
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) { /* e_xy+e_y < 0 */
      if (y0 === y1) break;
      err += dx;
      y0 += sy;
    }
  }
}


/**
 * Draw a black (0) anti-aliased line on white (255) background
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {setPixelAlpha} setPixelAA
 * @return {number}
 */
export function lineAA(x0, y0, x1, y1, setPixelAA) {
  var sx = x0 < x1 ? 1 : -1,
      sy = y0 < y1 ? 1 : -1,
      x2;
  var dx = Math.abs(x1 - x0),
      dy = Math.abs(y1 - y0),
      err = dx * dx + dy * dy;
  var e2 = err == 0 ? 1 : 0xffff7f / Math.sqrt(err); /* multiplication factor */

  dx *= e2;
  dy *= e2;
  err = dx - dy; /* error value e_xy */
  for (;;) { /* pixel loop */
    setPixelAA(x0, y0, Math.abs(err - dx + dy) >> 16);
    e2 = err;
    x2 = x0;
    if (2 * e2 >= -dx) { /* x step */
      if (x0 == x1) break;
      if (e2 + dy < 0xff0000) setPixelAA(x0, y0 + sy, (e2 + dy) >> 16);
      err -= dy;
      x0 += sx;
    }
    if (2 * e2 <= dy) { /* y step */
      if (y0 == y1) break;
      if (dx - e2 < 0xff0000) setPixelAA(x2 + sx, y0, (dx - e2) >> 16);
      err += dx;
      y0 += sy;
    }
  }
}


/**
 * Plot an anti-aliased line of width wd
 * @param  {number} x0
 * @param  {number} y0
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} wd
 * @param  {setPixel} setPixel
 */
export function lineWidth(x0, y0, x1, y1, wd, setPixel) {
  let dx = Math.abs(x1 - x0),
      sx = x0 < x1 ? 1 : -1;
  let dy = Math.abs(y1 - y0),
      sy = y0 < y1 ? 1 : -1;
  let err = dx - dy,
      e2, x2, y2; /* error value e_xy */
  let ed = dx + dy == 0 ? 1 : Math.sqrt(dx * dx + dy * dy);

  for (wd = (wd + 1) / 2;;) { /* pixel loop */
    setPixel(x0, y0, Math.max(0, 255 * (Math.abs(err - dx + dy) / ed - wd + 1)));
    e2 = err;
    x2 = x0;
    if (2 * e2 >= -dx) { /* x step */
      for (e2 += dy, y2 = y0; e2 < ed * wd && (y1 != y2 || dx > dy); e2 += dx)
        setPixel(x0, y2 += sy, Math.max(0, 255 * (Math.abs(e2) / ed - wd + 1)));
      if (x0 == x1) break;
      e2 = err;
      err -= dy;
      x0 += sx;
    }
    if (2 * e2 <= dy) { /* y step */
      for (e2 = dx - e2; e2 < ed * wd && (x1 != x2 || dx < dy); e2 += dy)
        setPixel(x2 += sx, y0, Math.max(0, 255 * (Math.abs(e2) / ed - wd + 1)));
      if (y0 == y1) break;
      err += dx;
      y0 += sy;
    }
  }
}
