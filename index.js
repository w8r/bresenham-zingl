/**
 * Bresenham rasterisation functions by Alois Zingl
 * @author Alois Zingl
 * @preserve
 */

/**
 * @typedef {function} setPixel
 * @param {number} x
 * @param {number} y
 */

/**
 * @typedef {function} setPixelAlpha
 * @param {number} x
 * @param {number} y
 * @param {number} alpha
 */

export * from './src/line';

export * from './src/ellipse';

export * from './src/circle';

export * from './src/bezier';
