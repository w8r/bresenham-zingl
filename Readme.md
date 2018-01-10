# Bresenham rasterisation function by Alois Zingl

Port of [C code](https://gist.github.com/w8r/2f57de439a736b0a079b70ed24c9a246) by Alois Zingl from this paper

[ALOIS ZINGL: "A Rasterizing Algorithm for Drawing Curves", 8 November 2012 (2012-11-08), pages 1 - 81](https://github.com/Traumflug/Teacup_Firmware/raw/master/research/A_Rasterizing_Algorithm_for_Drawing_Curves_-_Alois_Zingl_2012.pdf)

## Install

```
npm i -S bresenham-zingl
```

## [Demo](https://w8r.github.io/bresenham-zingl/demo/)

## API

These are two callbacks you will have to provide in order to make use of the output:

### `setPixel(x, y)`

Use that callback to fill the pixel on canvas.

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `x`       | number |             |
| `y`       | number |             |



### `setPixelAlpha(x, y, alpha)`

Callback that would also receive the alpha value for the pixel

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `x`       | number |             |
| `y`       | number |             |
| `alpha`   | number |             |



### `line(x0, y0, x1, y1, setPixel)`

Line segment rasterisation

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `setPixel` | setPixel |             |



### `ellipse(xm, ym, a, b, setPixel)`

Draws ellipse

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `xm`       | number   |             |
| `ym`       | number   |             |
| `a`        | number   |             |
| `b`        | number   |             |
| `setPixel` | setPixel |             |



### `circle(xm, ym, r, setPixel)`

Circel rasterisation

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `xm`       | number   |             |
| `ym`       | number   |             |
| `r`        | number   |             |
| `setPixel` | setPixel |             |



### `quadBezierSegment(x0, y0, x1, y1, x2, y2, setPixel)`

plot a limited quadratic Bezier segment

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `x2`       | number   |             |
| `y2`       | number   |             |
| `setPixel` | setPixel |             |



### `quadBezierAA(x0, y0, x1, y1, x2, y2, setPixelAA)`

Plot any quadratic Bezier curve with anti-alias

### Parameters

| parameter    | type          | description |
| ------------ | ------------- | ----------- |
| `x0`         | number        |             |
| `y0`         | number        |             |
| `x1`         | number        |             |
| `y1`         | number        |             |
| `x2`         | number        |             |
| `y2`         | number        |             |
| `setPixelAA` | setPixelAlpha |             |



### `quadBezier(x0, y0, x1, y1, x2, y2, setPixel)`

Plot any quadratic Bezier curve

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `x2`       | number   |             |
| `y2`       | number   |             |
| `setPixel` | setPixel |             |



### `quadRationalBezierSegment(x0, y0, x1, y1, x2, y2, w, setPixel)`

plot a limited rational Bezier segment, squared weight

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `x2`       | number   |             |
| `y2`       | number   |             |
| `w`        | number   |             |
| `setPixel` | setPixel |             |



### `quadRationalBezier(x0, y0, x1, y1, x2, y2, w, setPixel)`

plot any quadratic rational Bezier curve

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `x2`       | number   |             |
| `y2`       | number   |             |
| `w`        | number   |             |
| `setPixel` | setPixel |             |



### `rotatedEllipse(x, y, a, b, angle, setPixel)`

Plot ellipse rotated by angle (radian)

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x`        | number   |             |
| `y`        | number   |             |
| `a`        | number   |             |
| `b`        | number   |             |
| `angle`    | number   |             |
| `setPixel` | setPixel |             |



### `cubicBezierSeg(x0, y0, x1, y1, x2, y2, x3, y3, setPixel)`

Plot limited cubic Bezier segment

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `x2`       | number   |             |
| `y2`       | number   |             |
| `x3`       | number   |             |
| `y3`       | number   |             |
| `setPixel` | setPixel |             |



### `cubicBezier(x0, y0, x1, y1, x2, y2, x3, y3, setPixel)`

plot any cubic Bezier curve

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `x2`       | number   |             |
| `y2`       | number   |             |
| `x3`       | number   |             |
| `y3`       | number   |             |
| `setPixel` | setPixel |             |



### `lineAA(x0, y0, x1, y1, setPixelAA)`

Draw a black (0) anti-aliased line on white (255) background

### Parameters

| parameter    | type          | description |
| ------------ | ------------- | ----------- |
| `x0`         | number        |             |
| `y0`         | number        |             |
| `x1`         | number        |             |
| `y1`         | number        |             |
| `setPixelAA` | setPixelAlpha |             |



**Returns** `number`,


### `circleAA(xm, ym, r, setPixelAA)`

Draw a black anti-aliased circle on white background

### Parameters

| parameter    | type          | description |
| ------------ | ------------- | ----------- |
| `xm`         | number        |             |
| `ym`         | number        |             |
| `r`          | number        |             |
| `setPixelAA` | setPixelAlpha |             |



### `quadBezierSegmentAA(x0, y0, x1, y1, x2, y2, setPixelAA)`

Draw an limited anti-aliased quadratic Bezier segment

### Parameters

| parameter    | type          | description |
| ------------ | ------------- | ----------- |
| `x0`         | number        |             |
| `y0`         | number        |             |
| `x1`         | number        |             |
| `y1`         | number        |             |
| `x2`         | number        |             |
| `y2`         | number        |             |
| `setPixelAA` | setPixelAlpha |             |



### `quadRationalBezierSegmentAA(x0, y0, x1, y1, x2, y2, w, setPixelAA)`

draw an anti-aliased rational quadratic Bezier segment, squared weight

### Parameters

| parameter    | type          | description |
| ------------ | ------------- | ----------- |
| `x0`         | number        |             |
| `y0`         | number        |             |
| `x1`         | number        |             |
| `y1`         | number        |             |
| `x2`         | number        |             |
| `y2`         | number        |             |
| `w`          | number        |             |
| `setPixelAA` | setPixelAlpha |             |



### `lineWidth(x0, y0, x1, y1, wd, setPixel)`

Plot an anti-aliased line of width wd

### Parameters

| parameter  | type     | description |
| ---------- | -------- | ----------- |
| `x0`       | number   |             |
| `y0`       | number   |             |
| `x1`       | number   |             |
| `y1`       | number   |             |
| `wd`       | number   |             |
| `setPixel` | setPixel |             |

## License

(The MIT License)

Copyright (c) 2012 Alois Zingl

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
