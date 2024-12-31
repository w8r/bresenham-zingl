/**
 * Bresenham rasterisation functions by Alois Zingl
 * @author Alois Zingl
 * @preserve
 */

/**
 * Use that callback to fill the pixel on canvas.
 * @callback setPixel
 * @param {number} x
 * @param {number} y
 */

/**
 * Callback that would also receive the alpha value for the pixel
 * @callback setPixelAlpha
 * @param {number} x
 * @param {number} y
 * @param {number} alpha
 */

export * from "./line";

export * from "./ellipse";

export * from "./circle";

export * from "./bezier";
