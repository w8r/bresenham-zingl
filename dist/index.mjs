function T(f, a, i, t, M) {
  const h = Math.abs(i - f), o = f < i ? 1 : -1, e = -Math.abs(t - a), l = a < t ? 1 : -1;
  let r = h + e, n;
  for (; ; ) {
    if (M(f, a), n = 2 * r, n >= e) {
      if (f === i) break;
      r += e, f += o;
    }
    if (n <= h) {
      if (a === t) break;
      r += h, a += l;
    }
  }
}
function U(f, a, i, t, M) {
  const h = f < i ? 1 : -1, o = a < t ? 1 : -1;
  let e, l = Math.abs(i - f), r = Math.abs(t - a), n = l * l + r * r, c = n == 0 ? 1 : 16777087 / Math.sqrt(n);
  for (l *= c, r *= c, n = l - r; ; ) {
    if (M(f, a, Math.abs(n - l + r) >> 16), c = n, e = f, 2 * c >= -l) {
      if (f == i) break;
      c + r < 16711680 && M(f, a + o, c + r >> 16), n -= r, f += h;
    }
    if (2 * c <= r) {
      if (a == t) break;
      l - c < 16711680 && M(e + h, a, l - c >> 16), n += l, a += o;
    }
  }
}
function A(f, a, i, t, M, h) {
  let o = Math.abs(i - f), e = f < i ? 1 : -1, l = Math.abs(t - a), r = a < t ? 1 : -1, n = o - l, c, v, d, b = o + l == 0 ? 1 : Math.sqrt(o * o + l * l);
  for (M = (M + 1) / 2; ; ) {
    if (h(
      f,
      a,
      Math.max(0, 255 * (Math.abs(n - o + l) / b - M + 1))
    ), c = n, v = f, 2 * c >= -o) {
      for (c += l, d = a; c < b * M && (t != d || o > l); c += o)
        h(
          f,
          d += r,
          Math.max(0, 255 * (Math.abs(c) / b - M + 1))
        );
      if (f == i) break;
      c = n, n -= l, f += e;
    }
    if (2 * c <= l) {
      for (c = o - c; c < b * M && (i != v || o < l); c += l)
        h(
          v += e,
          a,
          Math.max(0, 255 * (Math.abs(c) / b - M + 1))
        );
      if (a == t) break;
      n += o, a += r;
    }
  }
}
function K(f, a = "assert error") {
  if (!f) throw new Error(a);
}
function w(f, a, i, t, M, h, o, e) {
  var l = f - 2 * i + M, r = a - 2 * t + h, n = f - i, c = a - t, v, d, b;
  K(o >= 0, "width is negative"), n * (M - i) > 0 && (c * (h - t) > 0 && Math.abs(n * r) > Math.abs(c * l) && (f = M, M = n + i, a = h, h = c + t), f == M || o == 1 ? d = (f - i) / l : (b = Math.sqrt(4 * o * o * (f - i) * (M - i) + (M - f) * (M - f)), i < f && (b = -b), d = (2 * o * (f - i) - f + M + b) / (2 * (1 - o) * (M - f))), b = 1 / (2 * d * (1 - d) * (o - 1) + 1), n = (d * d * (f - 2 * o * i + M) + 2 * d * (o * i - f) + f) * b, c = (d * d * (a - 2 * o * t + h) + 2 * d * (o * t - a) + a) * b, v = d * (o - 1) + 1, v *= v * b, o = ((1 - d) * (o - 1) + 1) * Math.sqrt(b), l = Math.floor(n + 0.5), r = Math.floor(c + 0.5), c = (n - f) * (t - a) / (i - f) + a, J(
    f,
    a,
    l,
    Math.floor(c + 0.5),
    l,
    r,
    v,
    e
  ), c = (n - M) * (t - h) / (i - M) + h, t = Math.floor(c + 0.5), f = i = l, a = r), (a - t) * (h - t) > 0 && (a == h || o == 1 ? d = (a - t) / (a - 2 * t + h) : (b = Math.sqrt(4 * o * o * (a - t) * (h - t) + (h - a) * (h - a)), t < a && (b = -b), d = (2 * o * (a - t) - a + h + b) / (2 * (1 - o) * (h - a))), b = 1 / (2 * d * (1 - d) * (o - 1) + 1), n = (d * d * (f - 2 * o * i + M) + 2 * d * (o * i - f) + f) * b, c = (d * d * (a - 2 * o * t + h) + 2 * d * (o * t - a) + a) * b, v = d * (o - 1) + 1, v *= v * b, o = ((1 - d) * (o - 1) + 1) * Math.sqrt(b), l = Math.floor(n + 0.5), r = Math.floor(c + 0.5), n = (i - f) * (c - a) / (t - a) + f, J(
    f,
    a,
    Math.floor(n + 0.5),
    r,
    l,
    r,
    v,
    e
  ), n = (i - M) * (c - h) / (t - h) + M, i = Math.floor(n + 0.5), f = l, a = t = r), J(
    f,
    a,
    i,
    t,
    M,
    h,
    o * o,
    e
  );
}
function J(f, a, i, t, M, h, o, e) {
  var l = M - i, r = h - t, n = f - M, c = a - h, v = f - i, d = a - t, b = v * r + d * l, s = v * r - d * l, u;
  if (K(v * l <= 0 && d * r <= 0, "sign of gradient must not change"), s != 0 && o > 0) {
    if (l * l + r * r > v * v + d * d && (M = f, f -= n, h = a, a -= c, s = -s), v = 2 * (4 * o * l * v + n * n), d = 2 * (4 * o * r * d + c * c), l = f < M ? 1 : -1, r = a < h ? 1 : -1, b = -2 * l * r * (2 * o * b + n * c), s * l * r < 0 && (v = -v, d = -d, b = -b, s = -s), n = 4 * o * (i - f) * r * s + v / 2 + b, c = 4 * o * (a - t) * l * s + d / 2 + b, o < 0.5 && (c > b || n < b)) {
      s = (o + 1) / 2, o = Math.sqrt(o), b = 1 / (o + 1), l = Math.floor(
        (f + 2 * o * i + M) * b / 2 + 0.5
      ), r = Math.floor((a + 2 * o * t + h) * b / 2 + 0.5), n = Math.floor((o * i + f) * b + 0.5), c = Math.floor((t * o + a) * b + 0.5), J(
        f,
        a,
        n,
        c,
        l,
        r,
        s,
        e
      ), n = Math.floor((o * i + M) * b + 0.5), c = Math.floor((t * o + h) * b + 0.5), J(l, r, n, c, M, h, s, e);
      return;
    }
    u = n + c - b;
    do {
      if (e(f, a), f == M && a == h) return;
      i = 2 * u > c ? 1 : 0, t = 2 * (u + d) < -c ? 1 : 0, (2 * u < n || t) && (a += r, c += b, u += n += v), (2 * u > n || i) && (f += l, n += b, u += c += d);
    } while (c <= b && n >= b);
  }
  T(f, a, M, h, e);
}
function X(f, a, i, t, M, h, o, e) {
  var l = M - i, r = h - t, n = f - M, c = a - h, v = f - i, d = a - t, b = v * r + d * l, s = v * r - d * l, u, z, G;
  if (K(
    v * l <= 0 && d * r <= 0
  ), s != 0 && o > 0) {
    if (l * l + r * r > v * v + d * d && (M = f, f -= n, h = a, a -= c, s = -s), v = 2 * (4 * o * l * v + n * n), d = 2 * (4 * o * r * d + c * c), l = f < M ? 1 : -1, r = a < h ? 1 : -1, b = -2 * l * r * (2 * o * b + n * c), s * l * r < 0 && (v = -v, d = -d, s = -s, b = -b), n = 4 * o * (i - f) * r * s + v / 2 + b, c = 4 * o * (a - t) * l * s + d / 2 + b, o < 0.5 && c > n)
      return s = (o + 1) / 2, o = Math.sqrt(o), b = 1 / (o + 1), l = Math.floor(
        (f + 2 * o * i + M) * b / 2 + 0.5
      ), r = Math.floor((a + 2 * o * t + h) * b / 2 + 0.5), n = Math.floor((o * i + f) * b + 0.5), c = Math.floor((t * o + a) * b + 0.5), X(
        f,
        a,
        n,
        c,
        l,
        r,
        s,
        e
      ), n = Math.floor((o * i + M) * b + 0.5), c = Math.floor((t * o + h) * b + 0.5), X(
        l,
        r,
        n,
        c,
        M,
        h,
        s,
        e
      );
    u = n + c - b;
    do {
      if (s = Math.min(n - b, b - c), z = Math.max(n - b, b - c), z += 2 * z * s * s / (4 * z * z + s * s), i = 255 * Math.abs(u - n - c + b) / z, i < 256 && e(f, a, i), G = 2 * u + c < 0) {
        if (a == h) return;
        n - u < z && e(f + l, a, 255 * Math.abs(n - u) / z);
      }
      if (2 * u + n > 0) {
        if (f == M) return;
        u - c < z && e(f, a + r, 255 * Math.abs(u - c) / z), f += l, n += b, u += c += d;
      }
      G && (a += r, c += b, u += n += v);
    } while (c < n);
  }
  U(f, a, M, h, e);
}
function P(f, a, i, t, M) {
  let h = -i, o = 0, e = t * t, l = h * (2 * e + h) + e;
  do
    M(f - h, a + o), M(f + h, a + o), M(f + h, a - o), M(f - h, a - o), e = 2 * l, e >= (h * 2 + 1) * t * t && (l += (++h * 2 + 1) * t * t), e <= (o * 2 + 1) * i * i && (l += (++o * 2 + 1) * i * i);
  while (h <= 0);
  for (; o++ < t; )
    M(f, a + o), M(f, a - o);
}
function y(f, a, i, t, M, h) {
  let o = i * i, e = t * t;
  const l = Math.sin(M);
  let r = (o - e) * l;
  o = Math.sqrt(o - r * l), e = Math.sqrt(e + r * l), i = o + 0.5, t = e + 0.5, r = r * i * t / (o * e), Z(
    f - i,
    a - t,
    f + i,
    a + t,
    4 * r * Math.cos(M),
    h
  );
}
function Z(f, a, i, t, M, h) {
  let o = i - f, e = t - a, l = o * e;
  if (M === 0) return _(f, a, i, t, h);
  l !== 0 && (l = (l - M) / (l + l)), K(l <= 1 && l >= 0, "limit angle to |zd|<=xd*yd"), o = Math.floor(o * l + 0.5), e = Math.floor(e * l + 0.5), J(f, a + e, f, a, f + o, a, 1 - l, h), J(f, a + e, f, t, i - o, t, l, h), J(i, t - e, i, t, i - o, t, 1 - l, h), J(i, t - e, i, a, f + o, a, l, h);
}
function _(f, a, i, t, M) {
  let h = Math.abs(i - f), o = Math.abs(t - a), e = o & 1, l = 4 * (1 - h) * o * o, r = 4 * (e + 1) * h * h, n = l + r + e * h * h, c;
  f > i && (f = i, i += h), a > t && (a = t), a += (o + 1) / 2, t = a - e, h = 8 * h * h, e = 8 * o * o;
  do
    M(i, a), M(f, a), M(f, t), M(i, t), c = 2 * n, c <= r && (a++, t--, n += r += h), (c >= l || 2 * n > r) && (f++, i--, n += l += e);
  while (f <= i);
  for (; a - t <= o; )
    M(f - 1, a), M(i + 1, a++), M(f - 1, t), M(i + 1, t--);
}
function x(f, a, i, t) {
  var M = -i, h = 0, o = 2 - 2 * i;
  do
    t(f - M, a + h), t(f - h, a - M), t(f + M, a - h), t(f + h, a + M), i = o, i <= h && (o += ++h * 2 + 1), (i > M || o > h) && (o += ++M * 2 + 1);
  while (M < 0);
}
function aa(f, a, i, t) {
  var M = -i, h = 0, o, e, l, r = 2 - 2 * i;
  i = 1 - r;
  do
    o = 255 * Math.abs(r - 2 * (M + h) - 2) / i, t(f - M, a + h, o), t(f - h, a - M, o), t(f + M, a - h, o), t(f + h, a + M, o), l = r, e = M, r + h > 0 && (o = 255 * (r - 2 * M - 1) / i, o < 256 && (t(f - M, a + h + 1, o), t(f - h - 1, a - M, o), t(f + M, a - h - 1, o), t(f + h + 1, a + M, o)), r += ++M * 2 + 1), l + e <= 0 && (o = 255 * (2 * h + 3 - l) / i, o < 256 && (t(f - e - 1, a + h, o), t(f - h, a - e - 1, o), t(f + e + 1, a - h, o), t(f + h, a + e + 1, o)), r += ++h * 2 + 1);
  while (M < 0);
}
function fa(f, a, i, t, M, h, o) {
  var e = f - i, l = a - t, r = f - 2 * i + M, n;
  e * (M - i) > 0 && (l * (h - t) > 0 && Math.abs((a - 2 * t + h) / r * e) > Math.abs(l) && (f = M, M = e + i, a = h, h = l + t), r = (f - i) / r, n = (1 - r) * ((1 - r) * a + 2 * r * t) + r * r * h, r = (f * M - i * i) * r / (f - i), e = Math.floor(r + 0.5), l = Math.floor(n + 0.5), n = (t - a) * (r - f) / (i - f) + a, N(f, a, e, Math.floor(n + 0.5), e, l, o), n = (t - h) * (r - M) / (i - M) + h, f = i = e, a = l, t = Math.floor(n + 0.5)), (a - t) * (h - t) > 0 && (r = a - 2 * t + h, r = (a - t) / r, n = (1 - r) * ((1 - r) * f + 2 * r * i) + r * r * M, r = (a * h - t * t) * r / (a - t), e = Math.floor(n + 0.5), l = Math.floor(r + 0.5), n = (i - f) * (r - a) / (t - a) + f, N(f, a, Math.floor(n + 0.5), l, e, l, o), n = (i - M) * (r - h) / (t - h) + M, f = e, i = Math.floor(n + 0.5), a = t = l), N(f, a, i, t, M, h, o);
}
function N(f, a, i, t, M, h, o) {
  var e = M - i, l = h - t, r = f - i, n = a - t, c, v, d, b, s = r * l - n * e;
  if (K(r * e <= 0 && n * l <= 0, "sign of gradient must not change"), e * e + l * l > r * r + n * n && (M = f, f = e + i, h = a, a = l + t, s = -s), s != 0) {
    r += e, r *= e = f < M ? 1 : -1, n += l, n *= l = a < h ? 1 : -1, c = 2 * r * n, r *= r, n *= n, s * e * l < 0 && (r = -r, n = -n, c = -c, s = -s), v = 4 * l * s * (i - f) + r - c, d = 4 * e * s * (a - t) + n - c, r += r, n += n, b = v + d + c;
    do {
      if (o(f, a), f == M && a == h) return;
      t = 2 * b < v, 2 * b > d && (f += e, v -= c, b += d += n), t && (a += l, d -= c, b += v += r);
    } while (d < 0 && v > 0);
  }
  T(f, a, M, h, o);
}
function ta(f, a, i, t, M, h, o) {
  var e = f - i, l = a - t, r = f - 2 * i + M, n;
  e * (M - i) > 0 && (l * (h - t) > 0 && Math.abs((a - 2 * t + h) / r * e) > Math.abs(l) && (f = M, M = e + i, a = h, h = l + t), r = (f - i) / r, n = (1 - r) * ((1 - r) * a + 2 * r * t) + r * r * h, r = (f * M - i * i) * r / (f - i), e = Math.floor(r + 0.5), l = Math.floor(n + 0.5), n = (t - a) * (r - f) / (i - f) + a, O(f, a, e, Math.floor(n + 0.5), e, l, o), n = (t - h) * (r - M) / (i - M) + h, f = i = e, a = l, t = Math.floor(n + 0.5)), (a - t) * (h - t) > 0 && (r = a - 2 * t + h, r = (a - t) / r, n = (1 - r) * ((1 - r) * f + 2 * r * i) + r * r * M, r = (a * h - t * t) * r / (a - t), e = Math.floor(n + 0.5), l = Math.floor(r + 0.5), n = (i - f) * (r - a) / (t - a) + f, O(f, a, Math.floor(n + 0.5), l, e, l, o), n = (i - M) * (r - h) / (t - h) + M, f = e, i = Math.floor(n + 0.5), a = t = l), O(f, a, i, t, M, h, o);
}
function O(f, a, i, t, M, h, o) {
  var e = M - i, l = h - t, r = f - i, n = a - t, c, v, d, b, s, u = r * l - n * e;
  if (e * e + l * l > r * r + n * n && (M = f, f = e + i, h = a, a = l + t, u = -u), u != 0) {
    r += e, r *= e = f < M ? 1 : -1, n += l, n *= l = a < h ? 1 : -1, c = 2 * r * n, r *= r, n *= n, u * e * l < 0 && (r = -r, n = -n, c = -c, u = -u), v = 4 * l * (i - f) * u + r - c, d = 4 * e * (a - t) * u + n - c, r += r, n += n, b = v + d + c;
    do {
      if (u = Math.min(v + c, -c - d), s = Math.max(v + c, -c - d), s += 2 * s * u * u / (4 * s * s + u * u), o(f, a, 255 * Math.abs(b - v - d - c) / s), f == M || a == h) break;
      i = f, u = v - b, t = 2 * b + d < 0, 2 * b + v > 0 && (b - d < s && o(f, a + l, 255 * Math.abs(b - d) / s), f += e, v -= c, b += d += n), t && (u < s && o(i + e, a, 255 * Math.abs(u) / s), a += l, d -= c, b += v += r);
    } while (d < v);
  }
  U(f, a, M, h, o);
}
function $(f, a, i, t, M, h, o, e, l) {
  var r, n, c, v = 1;
  let d = f < o ? 1 : -1, b = a < e ? 1 : -1, s = -Math.abs(f + i - M - o), u = s - 4 * d * (i - M), z = d * (f - i - M + o), G = -Math.abs(a + t - h - e), B = G - 4 * b * (t - h), S = b * (a - t - h + e), W, k, j, R, C, E, D, q, g, p, I, H = 0.01;
  if (K(
    (i - f) * (M - o) < H && ((o - f) * (i - M) < H || z * z < u * s + H),
    "slope change"
  ), K(
    (t - a) * (h - e) < H && ((e - a) * (t - h) < H || S * S < B * G + H),
    "slope change"
  ), u == 0 && B == 0)
    return d = Math.floor((3 * i - f + 1) / 2), b = Math.floor((3 * t - a + 1) / 2), N(f, a, d, b, o, e, l);
  i = (i - f) * (i - f) + (t - a) * (t - a) + 1, M = (M - o) * (M - o) + (h - e) * (h - e) + 1;
  do {
    W = u * S - z * B, k = u * G - s * B, j = z * G - s * S, p = W * (W + k - 3 * j) + k * k, r = p > 0 ? 1 : Math.sqrt(1 + 1024 / i), W *= r, k *= r, j *= r, p *= r * r, E = 9 * (W + k + j) / 8, R = 8 * (u - B), q = 27 * (8 * W * (S * S - B * G) + p * (B + 2 * S + G)) / 64 - B * B * (E - B), g = 27 * (8 * W * (z * z - u * s) - p * (u + 2 * z + s)) / 64 - u * u * (E + u), C = 3 * (3 * W * (3 * S * S - B * B - 2 * B * G) - B * (3 * k * (B + S) + B * R)) / 4, D = 3 * (3 * W * (3 * z * z - u * u - 2 * u * s) - u * (3 * k * (u + z) + u * R)) / 4, E = u * B * (6 * W + 6 * k - 3 * j + R), k = B * B, R = u * u, E = 3 * (E + 9 * r * (R * S * G - z * s * k) - 18 * z * S * W) / 8, p < 0 && (q = -q, g = -g, C = -C, D = -D, E = -E, k = -k, R = -R), W = 6 * B * k, k = -6 * u * k, j = 6 * B * R, R = -6 * u * R, q += E, p = q + g, g += E;
    a: for (I = E, n = c = r; f != o && a != e; ) {
      l(f, a);
      do {
        if (q > I || g < I)
          break a;
        t = 2 * p - g, 2 * p >= q && (n--, p += q += C, g += E += k, D += j, C += W), t <= 0 && (c--, p += g += D, q += E += j, C += k, D += R);
      } while (n > 0 && c > 0);
      2 * n <= r && (f += d, n += r), 2 * c <= r && (a += b, c += r), I == E && q < 0 && g > 0 && (I = H);
    }
    C = f, f = o, o = C, d = -d, z = -z, D = a, a = e, e = D, b = -b, S = -S, i = M;
  } while (v--);
  T(
    f,
    a,
    o,
    e,
    l
  );
}
function m(f, a, i, t, M, h, o, e, l) {
  let r, n, c, v = 1, d = f < o ? 1 : -1, b = a < e ? 1 : -1, s = -Math.abs(f + i - M - o), u = s - 4 * d * (i - M), z = d * (f - i - M + o), G = -Math.abs(a + t - h - e), B = G - 4 * b * (t - h), S = b * (a - t - h + e), W, k, j, R, C, E, D, q, g, p, I, H, F, V;
  const L = 0.01;
  if (K(
    (i - f) * (M - o) < L && ((o - f) * (i - M) < L || z * z < u * s + L)
  ), K(
    (t - a) * (h - e) < L && ((e - a) * (t - h) < L || S * S < B * G + L)
  ), u === 0 && B === 0)
    return d = Math.floor((3 * i - f + 1) / 2), b = Math.floor((3 * t - a + 1) / 2), O(f, a, d, b, o, e, l);
  i = (i - f) * (i - f) + (t - a) * (t - a) + 1, M = (M - o) * (M - o) + (h - e) * (h - e) + 1;
  do {
    W = u * S - z * B, k = u * G - s * B, j = z * G - s * S, V = 4 * W * j - k * k, p = W * (W + k - 3 * j) + k * k, r = p > 0 ? 1 : Math.sqrt(1 + 1024 / i), W *= r, k *= r, j *= r, p *= r * r, E = 9 * (W + k + j) / 8, R = 8 * (u - B), q = 27 * (8 * W * (S * S - B * G) + p * (B + 2 * S + G)) / 64 - B * B * (E - B), g = 27 * (8 * W * (z * z - u * s) - p * (u + 2 * z + s)) / 64 - u * u * (E + u), C = 3 * (3 * W * (3 * S * S - B * B - 2 * B * G) - B * (3 * k * (B + S) + B * R)) / 4, D = 3 * (3 * W * (3 * z * z - u * u - 2 * u * s) - u * (3 * k * (u + z) + u * R)) / 4, E = u * B * (6 * W + 6 * k - 3 * j + R), k = B * B, R = u * u, E = 3 * (E + 9 * r * (R * S * G - z * s * k) - 18 * z * S * W) / 8, p < 0 && (q = -q, g = -g, C = -C, D = -D, E = -E, k = -k, R = -R), W = 6 * B * k, k = -6 * u * k, j = 6 * B * R, R = -6 * u * R, q += E, p = q + g, g += E;
    let Q = !1;
    a: for (n = c = r; f !== o && a !== e; ) {
      t = Math.min(Math.abs(E - q), Math.abs(g - E)), F = Math.max(Math.abs(E - q), Math.abs(g - E)), F = r * (F + 2 * F * t * t / (4 * F * F + t * t)), t = 255 * Math.abs(p - (r - n + 1) * q - (r - c + 1) * g + r * E) / F, t < 256 && l(f, a, t), I = Math.abs(p - (r - n + 1) * q + (c - 1) * g), H = Math.abs(p + (n - 1) * q - (r - c + 1) * g), h = a;
      do {
        if (V >= -L && (q + C > E || g + D < E)) {
          Q = !0;
          break a;
        }
        if (t = 2 * p + q, 2 * p + g > 0)
          n--, p += q += C, g += E += k, D += j, C += W;
        else if (t > 0) {
          Q = !0;
          break a;
        }
        t <= 0 && (c--, p += g += D, q += E += j, C += k, D += R);
      } while (n > 0 && c > 0);
      2 * c <= r && (H < F && l(f + d, a, 255 * H / F), a += b, c += r), 2 * n <= r && (I < F && l(f, h + b, 255 * I / F), f += d, n += r);
    }
    Q && (2 * p < g && 2 * c <= r + 2 && (H < F && l(f + d, a, 255 * H / F), a += b), 2 * p > q && 2 * n <= r + 2 && (I < F && l(f, h + b, 255 * I / F), f += d), C = f, f = o, o = C, d = -d, z = -z, D = a, a = e, e = D, b = -b, S = -S, i = M);
    break;
  } while (v--);
  U(f, a, o, e, l);
}
function Y(f, a, i, t, M, h, o, e, l, r) {
  let n = 0, c = 0, v = f + i - M - o, d = v - 4 * (i - M), b = f - i - M + o, s = b + 4 * (i + M), u = a + t - h - e, z = u - 4 * (t - h), G = a - t - h + e, B = G + 4 * (t + h);
  var S = f, W, k, j, R = a, C, E, D;
  let q = b * b - d * v, g;
  const p = [0, 0, 0, 0, 0];
  for (d == 0 ? Math.abs(v) < 2 * Math.abs(b) && (p[n++] = v / (2 * b)) : q > 0 && (g = Math.sqrt(q), q = (b - g) / d, Math.abs(q) < 1 && (p[n++] = q), q = (b + g) / d, Math.abs(q) < 1 && (p[n++] = q)), q = G * G - z * u, z == 0 ? Math.abs(u) < 2 * Math.abs(G) && (p[n++] = u / (2 * G)) : q > 0 && (g = Math.sqrt(q), q = (G - g) / z, Math.abs(q) < 1 && (p[n++] = q), q = (G + g) / z, Math.abs(q) < 1 && (p[n++] = q)), c = 1; c < n; c++)
    (q = p[c - 1]) > p[c] && (p[c - 1] = p[c], p[c] = q, c = 0);
  for (q = -1, p[n] = 1, c = 0; c <= n; c++)
    g = p[c], W = (q * (q * b - 2 * v) - g * (q * (q * d - 2 * b) + v) + s) / 8 - S, C = (q * (q * G - 2 * u) - g * (q * (q * z - 2 * G) + u) + B) / 8 - R, k = (g * (g * b - 2 * v) - q * (g * (g * d - 2 * b) + v) + s) / 8 - S, E = (g * (g * G - 2 * u) - q * (g * (g * z - 2 * G) + u) + B) / 8 - R, S -= j = (g * (g * (3 * b - g * d) - 3 * v) + s) / 8, R -= D = (g * (g * (3 * G - g * z) - 3 * u) + B) / 8, o = Math.floor(j + 0.5), e = Math.floor(D + 0.5), S != 0 && (W *= S = (f - o) / S, k *= S), R != 0 && (C *= R = (a - e) / R, E *= R), (f != o || a != e) && l(f, a, f + W, a + C, f + k, a + E, o, e, r), f = o, a = e, S = j, R = D, q = g;
}
function ra(f, a, i, t, M, h, o, e, l) {
  Y(
    f,
    a,
    i,
    t,
    M,
    h,
    o,
    e,
    $,
    l
  );
}
function oa(f, a, i, t, M, h, o, e, l) {
  Y(
    f,
    a,
    i,
    t,
    M,
    h,
    o,
    e,
    m,
    l
  );
}
export {
  x as circle,
  aa as circleAA,
  ra as cubicBezier,
  oa as cubicBezierAA,
  $ as cubicBezierSegment,
  m as cubicBezierSegmentAA,
  P as ellipse,
  _ as ellipseRect,
  T as line,
  U as lineAA,
  A as lineWidth,
  fa as quadBezier,
  ta as quadBezierAA,
  N as quadBezierSegment,
  O as quadBezierSegmentAA,
  w as quadRationalBezier,
  J as quadRationalBezierSegment,
  X as quadRationalBezierSegmentAA,
  y as rotatedEllipse,
  Z as rotatedEllipseRect
};
