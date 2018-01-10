const screenWidth  = document.documentElement.clientWidth;
const screenHeight = document.documentElement.clientHeight;

const pxRatio = window.devicePixelRatio;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width = screenWidth * devicePixelRatio;
const h = canvas.height = screenHeight * devicePixelRatio;

canvas.style.width  = screenWidth + 'px';
canvas.style.height = screenHeight + 'px';

function scaleGraphToFitBounds(G, bounds) {
  var min = Math.min, max = Math.max;
  var bbox = getBounds(G);
  var cx = (bounds[0] + bounds[2]) / 2,
      cy = (bounds[1] + bounds[3]) / 2,
      gcx = (bbox[0] + bbox[2]) / 2,
      gcy = (bbox[1] + bbox[3]) / 2;

  var tx = cx - gcx,
      ty = cy - gcy;

  var scale = min(
    (bounds[2] - bounds[0]) / (bbox[2] - bbox[0]),
    (bounds[3] - bounds[1]) / (bbox[3] - bbox[1])
  );


  G.nodes.forEach(function (n) {
    n.x = cx + ((n.x + tx) - cx) * scale;
    n.y = cy + ((n.y + ty) - cy) * scale;
  });
}

function getBounds(g) {
  return g.nodes.reduce((b, n) => {
    b[0] = Math.min(b[0], n.x);
    b[1] = Math.min(b[1], n.y);
    b[2] = Math.max(b[2], n.x);
    b[3] = Math.max(b[3], n.y);
    return b;
  }, [Infinity, Infinity, -Infinity, -Infinity]);
}

var data, nodesMap;
var tw = 2, thw = tw / 2;

function setPixel(x, y, a) {
  ctx.fillRect(x - thw, y - thw, tw, tw);
}

function setPixelAA(x, y, a) {
  ctx.fillRect(x - thw, y - thw, tw, tw);
}

const getQuadraticControlPoint = (x1, y1, x2, y2, cx = 2, cy = 1.5, dest = { x: 0, y: 0}) => {
  dest.x = (x1 + x2) / cx + (y2 - y1) / cy;
  dest.y = (y1 + y2) / cx + (x1 - x2) / cy;

  return dest;
}

function render() {
  console.time('render');
  ctx.clearRect(0, 0, w, h);

  const { nodes, edges } = data;

  // edges
  ctx.beginPath();
  ctx.strokeStyle = '#707070';
  ctx.fillStyle = '#707070';
  edges.forEach((e) => {
    const s = nodesMap[e.source],
          t = nodesMap[e.target];
    ctx.moveTo(s.x, s.y);
    if (e.curvature === 0) {
      ctx.lineTo(t.x, t.y);
    } else {
      const cp = getQuadraticControlPoint(s.x, s.y, t.x, t.y);
      bresenham.quadBezierAA(~~s.x, ~~s.y, ~~cp.x, ~~cp.y, ~~t.x, ~~t.y, setPixelAA);
      //ctx.quadraticCurveTo(cp.x, cp.y, t.x, t.y);
    }
  });
  // ctx.stroke();
  // ctx.closePath();

  // nodes;


  ctx.beginPath();
  ctx.fillStyle   = 'orange';
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1;
  nodes.forEach((n) => {
    ctx.moveTo(n.x + n.r, n.y);
    ctx.arc(n.x, n.y, n.r, 0, 2 * Math.PI, false);
  });
  //ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle   = '#333333';
  nodes.forEach((n) => {
    ctx.moveTo(n.x + n.r, n.y);
    bresenham.circle(n.x, n.y, n.r, setPixel)
    ctx.arc(n.x, n.y, n.r, 0, 2 * Math.PI, false);
  });

  console.timeEnd('render');
}


d3.json('data.json').then((json) => {
  data = json;
  nodesMap = data.nodes.reduce((a, n) => {
    a[n.id] = n;
    return a;
  }, {});

  render();
});
