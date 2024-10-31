import { c as bi, g as wi } from "./js-pinyin.js";
var Dn = { exports: {} };
/*!
 * Vditor v3.10.7 - A markdown editor written in TypeScript.
 *
 * MIT License
 *
 * Copyright (c) 2018-present B3log 开源, b3log.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
(function(On, Ei) {
  (function(St, ee) {
    On.exports = ee();
  })(bi, () => (
    /******/
    (() => {
      var Kt = {
        /***/
        85: (
          /***/
          (J) => {
            var E = function() {
              this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = 0.5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = 0.5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
            }, L = -1, x = 1, _ = 0;
            E.Diff = function(c, l) {
              return [c, l];
            }, E.prototype.diff_main = function(c, l, g, p) {
              typeof p > "u" && (this.Diff_Timeout <= 0 ? p = Number.MAX_VALUE : p = (/* @__PURE__ */ new Date()).getTime() + this.Diff_Timeout * 1e3);
              var m = p;
              if (c == null || l == null)
                throw new Error("Null input. (diff_main)");
              if (c == l)
                return c ? [new E.Diff(_, c)] : [];
              typeof g > "u" && (g = !0);
              var f = g, v = this.diff_commonPrefix(c, l), w = c.substring(0, v);
              c = c.substring(v), l = l.substring(v), v = this.diff_commonSuffix(c, l);
              var b = c.substring(c.length - v);
              c = c.substring(0, c.length - v), l = l.substring(0, l.length - v);
              var y = this.diff_compute_(c, l, f, m);
              return w && y.unshift(new E.Diff(_, w)), b && y.push(new E.Diff(_, b)), this.diff_cleanupMerge(y), y;
            }, E.prototype.diff_compute_ = function(c, l, g, p) {
              var m;
              if (!c)
                return [new E.Diff(x, l)];
              if (!l)
                return [new E.Diff(L, c)];
              var f = c.length > l.length ? c : l, v = c.length > l.length ? l : c, w = f.indexOf(v);
              if (w != -1)
                return m = [new E.Diff(x, f.substring(0, w)), new E.Diff(_, v), new E.Diff(x, f.substring(w + v.length))], c.length > l.length && (m[0][0] = m[2][0] = L), m;
              if (v.length == 1)
                return [new E.Diff(L, c), new E.Diff(x, l)];
              var b = this.diff_halfMatch_(c, l);
              if (b) {
                var y = b[0], s = b[1], C = b[2], A = b[3], H = b[4], M = this.diff_main(y, C, g, p), P = this.diff_main(s, A, g, p);
                return M.concat([new E.Diff(_, H)], P);
              }
              return g && c.length > 100 && l.length > 100 ? this.diff_lineMode_(c, l, p) : this.diff_bisect_(c, l, p);
            }, E.prototype.diff_lineMode_ = function(c, l, g) {
              var p = this.diff_linesToChars_(c, l);
              c = p.chars1, l = p.chars2;
              var m = p.lineArray, f = this.diff_main(c, l, !1, g);
              this.diff_charsToLines_(f, m), this.diff_cleanupSemantic(f), f.push(new E.Diff(_, ""));
              for (var v = 0, w = 0, b = 0, y = "", s = ""; v < f.length; ) {
                switch (f[v][0]) {
                  case x:
                    b++, s += f[v][1];
                    break;
                  case L:
                    w++, y += f[v][1];
                    break;
                  case _:
                    if (w >= 1 && b >= 1) {
                      f.splice(v - w - b, w + b), v = v - w - b;
                      for (var C = this.diff_main(y, s, !1, g), A = C.length - 1; A >= 0; A--)
                        f.splice(v, 0, C[A]);
                      v = v + C.length;
                    }
                    b = 0, w = 0, y = "", s = "";
                    break;
                }
                v++;
              }
              return f.pop(), f;
            }, E.prototype.diff_bisect_ = function(c, l, g) {
              for (var p = c.length, m = l.length, f = Math.ceil((p + m) / 2), v = f, w = 2 * f, b = new Array(w), y = new Array(w), s = 0; s < w; s++)
                b[s] = -1, y[s] = -1;
              b[v + 1] = 0, y[v + 1] = 0;
              for (var C = p - m, A = C % 2 != 0, H = 0, M = 0, P = 0, V = 0, G = 0; G < f && !((/* @__PURE__ */ new Date()).getTime() > g); G++) {
                for (var Q = -G + H; Q <= G - M; Q += 2) {
                  var ne = v + Q, oe;
                  Q == -G || Q != G && b[ne - 1] < b[ne + 1] ? oe = b[ne + 1] : oe = b[ne - 1] + 1;
                  for (var me = oe - Q; oe < p && me < m && c.charAt(oe) == l.charAt(me); )
                    oe++, me++;
                  if (b[ne] = oe, oe > p)
                    M += 2;
                  else if (me > m)
                    H += 2;
                  else if (A) {
                    var fe = v + C - Q;
                    if (fe >= 0 && fe < w && y[fe] != -1) {
                      var le = p - y[fe];
                      if (oe >= le)
                        return this.diff_bisectSplit_(c, l, oe, me, g);
                    }
                  }
                }
                for (var we = -G + P; we <= G - V; we += 2) {
                  var fe = v + we, le;
                  we == -G || we != G && y[fe - 1] < y[fe + 1] ? le = y[fe + 1] : le = y[fe - 1] + 1;
                  for (var Me = le - we; le < p && Me < m && c.charAt(p - le - 1) == l.charAt(m - Me - 1); )
                    le++, Me++;
                  if (y[fe] = le, le > p)
                    V += 2;
                  else if (Me > m)
                    P += 2;
                  else if (!A) {
                    var ne = v + C - we;
                    if (ne >= 0 && ne < w && b[ne] != -1) {
                      var oe = b[ne], me = v + oe - ne;
                      if (le = p - le, oe >= le)
                        return this.diff_bisectSplit_(c, l, oe, me, g);
                    }
                  }
                }
              }
              return [new E.Diff(L, c), new E.Diff(x, l)];
            }, E.prototype.diff_bisectSplit_ = function(c, l, g, p, m) {
              var f = c.substring(0, g), v = l.substring(0, p), w = c.substring(g), b = l.substring(p), y = this.diff_main(f, v, !1, m), s = this.diff_main(w, b, !1, m);
              return y.concat(s);
            }, E.prototype.diff_linesToChars_ = function(c, l) {
              var g = [], p = {};
              g[0] = "";
              function m(b) {
                for (var y = "", s = 0, C = -1, A = g.length; C < b.length - 1; ) {
                  C = b.indexOf(`
`, s), C == -1 && (C = b.length - 1);
                  var H = b.substring(s, C + 1);
                  (p.hasOwnProperty ? p.hasOwnProperty(H) : p[H] !== void 0) ? y += String.fromCharCode(p[H]) : (A == f && (H = b.substring(s), C = b.length), y += String.fromCharCode(A), p[H] = A, g[A++] = H), s = C + 1;
                }
                return y;
              }
              var f = 4e4, v = m(c);
              f = 65535;
              var w = m(l);
              return {
                chars1: v,
                chars2: w,
                lineArray: g
              };
            }, E.prototype.diff_charsToLines_ = function(c, l) {
              for (var g = 0; g < c.length; g++) {
                for (var p = c[g][1], m = [], f = 0; f < p.length; f++)
                  m[f] = l[p.charCodeAt(f)];
                c[g][1] = m.join("");
              }
            }, E.prototype.diff_commonPrefix = function(c, l) {
              if (!c || !l || c.charAt(0) != l.charAt(0))
                return 0;
              for (var g = 0, p = Math.min(c.length, l.length), m = p, f = 0; g < m; )
                c.substring(f, m) == l.substring(f, m) ? (g = m, f = g) : p = m, m = Math.floor((p - g) / 2 + g);
              return m;
            }, E.prototype.diff_commonSuffix = function(c, l) {
              if (!c || !l || c.charAt(c.length - 1) != l.charAt(l.length - 1))
                return 0;
              for (var g = 0, p = Math.min(c.length, l.length), m = p, f = 0; g < m; )
                c.substring(c.length - m, c.length - f) == l.substring(l.length - m, l.length - f) ? (g = m, f = g) : p = m, m = Math.floor((p - g) / 2 + g);
              return m;
            }, E.prototype.diff_commonOverlap_ = function(c, l) {
              var g = c.length, p = l.length;
              if (g == 0 || p == 0)
                return 0;
              g > p ? c = c.substring(g - p) : g < p && (l = l.substring(0, g));
              var m = Math.min(g, p);
              if (c == l)
                return m;
              for (var f = 0, v = 1; ; ) {
                var w = c.substring(m - v), b = l.indexOf(w);
                if (b == -1)
                  return f;
                v += b, (b == 0 || c.substring(m - v) == l.substring(0, v)) && (f = v, v++);
              }
            }, E.prototype.diff_halfMatch_ = function(c, l) {
              if (this.Diff_Timeout <= 0)
                return null;
              var g = c.length > l.length ? c : l, p = c.length > l.length ? l : c;
              if (g.length < 4 || p.length * 2 < g.length)
                return null;
              var m = this;
              function f(M, P, V) {
                for (var G = M.substring(V, V + Math.floor(M.length / 4)), Q = -1, ne = "", oe, me, fe, le; (Q = P.indexOf(G, Q + 1)) != -1; ) {
                  var we = m.diff_commonPrefix(M.substring(V), P.substring(Q)), Me = m.diff_commonSuffix(M.substring(0, V), P.substring(0, Q));
                  ne.length < Me + we && (ne = P.substring(Q - Me, Q) + P.substring(Q, Q + we), oe = M.substring(0, V - Me), me = M.substring(V + we), fe = P.substring(0, Q - Me), le = P.substring(Q + we));
                }
                return ne.length * 2 >= M.length ? [oe, me, fe, le, ne] : null;
              }
              var v = f(g, p, Math.ceil(g.length / 4)), w = f(g, p, Math.ceil(g.length / 2)), b;
              if (!v && !w)
                return null;
              w ? v ? b = v[4].length > w[4].length ? v : w : b = w : b = v;
              var y, s, C, A;
              c.length > l.length ? (y = b[0], s = b[1], C = b[2], A = b[3]) : (C = b[0], A = b[1], y = b[2], s = b[3]);
              var H = b[4];
              return [y, s, C, A, H];
            }, E.prototype.diff_cleanupSemantic = function(c) {
              for (var l = !1, g = [], p = 0, m = null, f = 0, v = 0, w = 0, b = 0, y = 0; f < c.length; )
                c[f][0] == _ ? (g[p++] = f, v = b, w = y, b = 0, y = 0, m = c[f][1]) : (c[f][0] == x ? b += c[f][1].length : y += c[f][1].length, m && m.length <= Math.max(v, w) && m.length <= Math.max(b, y) && (c.splice(g[p - 1], 0, new E.Diff(L, m)), c[g[p - 1] + 1][0] = x, p--, p--, f = p > 0 ? g[p - 1] : -1, v = 0, w = 0, b = 0, y = 0, m = null, l = !0)), f++;
              for (l && this.diff_cleanupMerge(c), this.diff_cleanupSemanticLossless(c), f = 1; f < c.length; ) {
                if (c[f - 1][0] == L && c[f][0] == x) {
                  var s = c[f - 1][1], C = c[f][1], A = this.diff_commonOverlap_(s, C), H = this.diff_commonOverlap_(C, s);
                  A >= H ? (A >= s.length / 2 || A >= C.length / 2) && (c.splice(f, 0, new E.Diff(_, C.substring(0, A))), c[f - 1][1] = s.substring(0, s.length - A), c[f + 1][1] = C.substring(A), f++) : (H >= s.length / 2 || H >= C.length / 2) && (c.splice(f, 0, new E.Diff(_, s.substring(0, H))), c[f - 1][0] = x, c[f - 1][1] = C.substring(0, C.length - H), c[f + 1][0] = L, c[f + 1][1] = s.substring(H), f++), f++;
                }
                f++;
              }
            }, E.prototype.diff_cleanupSemanticLossless = function(c) {
              function l(H, M) {
                if (!H || !M)
                  return 6;
                var P = H.charAt(H.length - 1), V = M.charAt(0), G = P.match(E.nonAlphaNumericRegex_), Q = V.match(E.nonAlphaNumericRegex_), ne = G && P.match(E.whitespaceRegex_), oe = Q && V.match(E.whitespaceRegex_), me = ne && P.match(E.linebreakRegex_), fe = oe && V.match(E.linebreakRegex_), le = me && H.match(E.blanklineEndRegex_), we = fe && M.match(E.blanklineStartRegex_);
                return le || we ? 5 : me || fe ? 4 : G && !ne && oe ? 3 : ne || oe ? 2 : G || Q ? 1 : 0;
              }
              for (var g = 1; g < c.length - 1; ) {
                if (c[g - 1][0] == _ && c[g + 1][0] == _) {
                  var p = c[g - 1][1], m = c[g][1], f = c[g + 1][1], v = this.diff_commonSuffix(p, m);
                  if (v) {
                    var w = m.substring(m.length - v);
                    p = p.substring(0, p.length - v), m = w + m.substring(0, m.length - v), f = w + f;
                  }
                  for (var b = p, y = m, s = f, C = l(p, m) + l(m, f); m.charAt(0) === f.charAt(0); ) {
                    p += m.charAt(0), m = m.substring(1) + f.charAt(0), f = f.substring(1);
                    var A = l(p, m) + l(m, f);
                    A >= C && (C = A, b = p, y = m, s = f);
                  }
                  c[g - 1][1] != b && (b ? c[g - 1][1] = b : (c.splice(g - 1, 1), g--), c[g][1] = y, s ? c[g + 1][1] = s : (c.splice(g + 1, 1), g--));
                }
                g++;
              }
            }, E.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, E.whitespaceRegex_ = /\s/, E.linebreakRegex_ = /[\r\n]/, E.blanklineEndRegex_ = /\n\r?\n$/, E.blanklineStartRegex_ = /^\r?\n\r?\n/, E.prototype.diff_cleanupEfficiency = function(c) {
              for (var l = !1, g = [], p = 0, m = null, f = 0, v = !1, w = !1, b = !1, y = !1; f < c.length; )
                c[f][0] == _ ? (c[f][1].length < this.Diff_EditCost && (b || y) ? (g[p++] = f, v = b, w = y, m = c[f][1]) : (p = 0, m = null), b = y = !1) : (c[f][0] == L ? y = !0 : b = !0, m && (v && w && b && y || m.length < this.Diff_EditCost / 2 && v + w + b + y == 3) && (c.splice(g[p - 1], 0, new E.Diff(L, m)), c[g[p - 1] + 1][0] = x, p--, m = null, v && w ? (b = y = !0, p = 0) : (p--, f = p > 0 ? g[p - 1] : -1, b = y = !1), l = !0)), f++;
              l && this.diff_cleanupMerge(c);
            }, E.prototype.diff_cleanupMerge = function(c) {
              c.push(new E.Diff(_, ""));
              for (var l = 0, g = 0, p = 0, m = "", f = "", v; l < c.length; )
                switch (c[l][0]) {
                  case x:
                    p++, f += c[l][1], l++;
                    break;
                  case L:
                    g++, m += c[l][1], l++;
                    break;
                  case _:
                    g + p > 1 ? (g !== 0 && p !== 0 && (v = this.diff_commonPrefix(f, m), v !== 0 && (l - g - p > 0 && c[l - g - p - 1][0] == _ ? c[l - g - p - 1][1] += f.substring(0, v) : (c.splice(0, 0, new E.Diff(_, f.substring(0, v))), l++), f = f.substring(v), m = m.substring(v)), v = this.diff_commonSuffix(f, m), v !== 0 && (c[l][1] = f.substring(f.length - v) + c[l][1], f = f.substring(0, f.length - v), m = m.substring(0, m.length - v))), l -= g + p, c.splice(l, g + p), m.length && (c.splice(l, 0, new E.Diff(L, m)), l++), f.length && (c.splice(l, 0, new E.Diff(x, f)), l++), l++) : l !== 0 && c[l - 1][0] == _ ? (c[l - 1][1] += c[l][1], c.splice(l, 1)) : l++, p = 0, g = 0, m = "", f = "";
                    break;
                }
              c[c.length - 1][1] === "" && c.pop();
              var w = !1;
              for (l = 1; l < c.length - 1; )
                c[l - 1][0] == _ && c[l + 1][0] == _ && (c[l][1].substring(c[l][1].length - c[l - 1][1].length) == c[l - 1][1] ? (c[l][1] = c[l - 1][1] + c[l][1].substring(0, c[l][1].length - c[l - 1][1].length), c[l + 1][1] = c[l - 1][1] + c[l + 1][1], c.splice(l - 1, 1), w = !0) : c[l][1].substring(0, c[l + 1][1].length) == c[l + 1][1] && (c[l - 1][1] += c[l + 1][1], c[l][1] = c[l][1].substring(c[l + 1][1].length) + c[l + 1][1], c.splice(l + 1, 1), w = !0)), l++;
              w && this.diff_cleanupMerge(c);
            }, E.prototype.diff_xIndex = function(c, l) {
              var g = 0, p = 0, m = 0, f = 0, v;
              for (v = 0; v < c.length && (c[v][0] !== x && (g += c[v][1].length), c[v][0] !== L && (p += c[v][1].length), !(g > l)); v++)
                m = g, f = p;
              return c.length != v && c[v][0] === L ? f : f + (l - m);
            }, E.prototype.diff_prettyHtml = function(c) {
              for (var l = [], g = /&/g, p = /</g, m = />/g, f = /\n/g, v = 0; v < c.length; v++) {
                var w = c[v][0], b = c[v][1], y = b.replace(g, "&amp;").replace(p, "&lt;").replace(m, "&gt;").replace(f, "&para;<br>");
                switch (w) {
                  case x:
                    l[v] = '<ins style="background:#e6ffe6;">' + y + "</ins>";
                    break;
                  case L:
                    l[v] = '<del style="background:#ffe6e6;">' + y + "</del>";
                    break;
                  case _:
                    l[v] = "<span>" + y + "</span>";
                    break;
                }
              }
              return l.join("");
            }, E.prototype.diff_text1 = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                c[g][0] !== x && (l[g] = c[g][1]);
              return l.join("");
            }, E.prototype.diff_text2 = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                c[g][0] !== L && (l[g] = c[g][1]);
              return l.join("");
            }, E.prototype.diff_levenshtein = function(c) {
              for (var l = 0, g = 0, p = 0, m = 0; m < c.length; m++) {
                var f = c[m][0], v = c[m][1];
                switch (f) {
                  case x:
                    g += v.length;
                    break;
                  case L:
                    p += v.length;
                    break;
                  case _:
                    l += Math.max(g, p), g = 0, p = 0;
                    break;
                }
              }
              return l += Math.max(g, p), l;
            }, E.prototype.diff_toDelta = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                switch (c[g][0]) {
                  case x:
                    l[g] = "+" + encodeURI(c[g][1]);
                    break;
                  case L:
                    l[g] = "-" + c[g][1].length;
                    break;
                  case _:
                    l[g] = "=" + c[g][1].length;
                    break;
                }
              return l.join("	").replace(/%20/g, " ");
            }, E.prototype.diff_fromDelta = function(c, l) {
              for (var g = [], p = 0, m = 0, f = l.split(/\t/g), v = 0; v < f.length; v++) {
                var w = f[v].substring(1);
                switch (f[v].charAt(0)) {
                  case "+":
                    try {
                      g[p++] = new E.Diff(x, decodeURI(w));
                    } catch {
                      throw new Error("Illegal escape in diff_fromDelta: " + w);
                    }
                    break;
                  case "-":
                  case "=":
                    var b = parseInt(w, 10);
                    if (isNaN(b) || b < 0)
                      throw new Error("Invalid number in diff_fromDelta: " + w);
                    var y = c.substring(m, m += b);
                    f[v].charAt(0) == "=" ? g[p++] = new E.Diff(_, y) : g[p++] = new E.Diff(L, y);
                    break;
                  default:
                    if (f[v])
                      throw new Error("Invalid diff operation in diff_fromDelta: " + f[v]);
                }
              }
              if (m != c.length)
                throw new Error("Delta length (" + m + ") does not equal source text length (" + c.length + ").");
              return g;
            }, E.prototype.match_main = function(c, l, g) {
              if (c == null || l == null || g == null)
                throw new Error("Null input. (match_main)");
              return g = Math.max(0, Math.min(g, c.length)), c == l ? 0 : c.length ? c.substring(g, g + l.length) == l ? g : this.match_bitap_(c, l, g) : -1;
            }, E.prototype.match_bitap_ = function(c, l, g) {
              if (l.length > this.Match_MaxBits)
                throw new Error("Pattern too long for this browser.");
              var p = this.match_alphabet_(l), m = this;
              function f(oe, me) {
                var fe = oe / l.length, le = Math.abs(g - me);
                return m.Match_Distance ? fe + le / m.Match_Distance : le ? 1 : fe;
              }
              var v = this.Match_Threshold, w = c.indexOf(l, g);
              w != -1 && (v = Math.min(f(0, w), v), w = c.lastIndexOf(l, g + l.length), w != -1 && (v = Math.min(f(0, w), v)));
              var b = 1 << l.length - 1;
              w = -1;
              for (var y, s, C = l.length + c.length, A, H = 0; H < l.length; H++) {
                for (y = 0, s = C; y < s; )
                  f(H, g + s) <= v ? y = s : C = s, s = Math.floor((C - y) / 2 + y);
                C = s;
                var M = Math.max(1, g - s + 1), P = Math.min(g + s, c.length) + l.length, V = Array(P + 2);
                V[P + 1] = (1 << H) - 1;
                for (var G = P; G >= M; G--) {
                  var Q = p[c.charAt(G - 1)];
                  if (H === 0 ? V[G] = (V[G + 1] << 1 | 1) & Q : V[G] = (V[G + 1] << 1 | 1) & Q | ((A[G + 1] | A[G]) << 1 | 1) | A[G + 1], V[G] & b) {
                    var ne = f(H, G - 1);
                    if (ne <= v)
                      if (v = ne, w = G - 1, w > g)
                        M = Math.max(1, 2 * g - w);
                      else
                        break;
                  }
                }
                if (f(H + 1, g) > v)
                  break;
                A = V;
              }
              return w;
            }, E.prototype.match_alphabet_ = function(c) {
              for (var l = {}, g = 0; g < c.length; g++)
                l[c.charAt(g)] = 0;
              for (var g = 0; g < c.length; g++)
                l[c.charAt(g)] |= 1 << c.length - g - 1;
              return l;
            }, E.prototype.patch_addContext_ = function(c, l) {
              if (l.length != 0) {
                if (c.start2 === null)
                  throw Error("patch not initialized");
                for (var g = l.substring(c.start2, c.start2 + c.length1), p = 0; l.indexOf(g) != l.lastIndexOf(g) && g.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; )
                  p += this.Patch_Margin, g = l.substring(c.start2 - p, c.start2 + c.length1 + p);
                p += this.Patch_Margin;
                var m = l.substring(c.start2 - p, c.start2);
                m && c.diffs.unshift(new E.Diff(_, m));
                var f = l.substring(c.start2 + c.length1, c.start2 + c.length1 + p);
                f && c.diffs.push(new E.Diff(_, f)), c.start1 -= m.length, c.start2 -= m.length, c.length1 += m.length + f.length, c.length2 += m.length + f.length;
              }
            }, E.prototype.patch_make = function(c, l, g) {
              var p, m;
              if (typeof c == "string" && typeof l == "string" && typeof g > "u")
                p = /** @type {string} */
                c, m = this.diff_main(
                  p,
                  /** @type {string} */
                  l,
                  !0
                ), m.length > 2 && (this.diff_cleanupSemantic(m), this.diff_cleanupEfficiency(m));
              else if (c && typeof c == "object" && typeof l > "u" && typeof g > "u")
                m = /** @type {!Array.<!diff_match_patch.Diff>} */
                c, p = this.diff_text1(m);
              else if (typeof c == "string" && l && typeof l == "object" && typeof g > "u")
                p = /** @type {string} */
                c, m = /** @type {!Array.<!diff_match_patch.Diff>} */
                l;
              else if (typeof c == "string" && typeof l == "string" && g && typeof g == "object")
                p = /** @type {string} */
                c, m = /** @type {!Array.<!diff_match_patch.Diff>} */
                g;
              else
                throw new Error("Unknown call format to patch_make.");
              if (m.length === 0)
                return [];
              for (var f = [], v = new E.patch_obj(), w = 0, b = 0, y = 0, s = p, C = p, A = 0; A < m.length; A++) {
                var H = m[A][0], M = m[A][1];
                switch (!w && H !== _ && (v.start1 = b, v.start2 = y), H) {
                  case x:
                    v.diffs[w++] = m[A], v.length2 += M.length, C = C.substring(0, y) + M + C.substring(y);
                    break;
                  case L:
                    v.length1 += M.length, v.diffs[w++] = m[A], C = C.substring(0, y) + C.substring(y + M.length);
                    break;
                  case _:
                    M.length <= 2 * this.Patch_Margin && w && m.length != A + 1 ? (v.diffs[w++] = m[A], v.length1 += M.length, v.length2 += M.length) : M.length >= 2 * this.Patch_Margin && w && (this.patch_addContext_(v, s), f.push(v), v = new E.patch_obj(), w = 0, s = C, b = y);
                    break;
                }
                H !== x && (b += M.length), H !== L && (y += M.length);
              }
              return w && (this.patch_addContext_(v, s), f.push(v)), f;
            }, E.prototype.patch_deepCopy = function(c) {
              for (var l = [], g = 0; g < c.length; g++) {
                var p = c[g], m = new E.patch_obj();
                m.diffs = [];
                for (var f = 0; f < p.diffs.length; f++)
                  m.diffs[f] = new E.Diff(p.diffs[f][0], p.diffs[f][1]);
                m.start1 = p.start1, m.start2 = p.start2, m.length1 = p.length1, m.length2 = p.length2, l[g] = m;
              }
              return l;
            }, E.prototype.patch_apply = function(c, l) {
              if (c.length == 0)
                return [l, []];
              c = this.patch_deepCopy(c);
              var g = this.patch_addPadding(c);
              l = g + l + g, this.patch_splitMax(c);
              for (var p = 0, m = [], f = 0; f < c.length; f++) {
                var v = c[f].start2 + p, w = this.diff_text1(c[f].diffs), b, y = -1;
                if (w.length > this.Match_MaxBits ? (b = this.match_main(l, w.substring(0, this.Match_MaxBits), v), b != -1 && (y = this.match_main(l, w.substring(w.length - this.Match_MaxBits), v + w.length - this.Match_MaxBits), (y == -1 || b >= y) && (b = -1))) : b = this.match_main(l, w, v), b == -1)
                  m[f] = !1, p -= c[f].length2 - c[f].length1;
                else {
                  m[f] = !0, p = b - v;
                  var s;
                  if (y == -1 ? s = l.substring(b, b + w.length) : s = l.substring(b, y + this.Match_MaxBits), w == s)
                    l = l.substring(0, b) + this.diff_text2(c[f].diffs) + l.substring(b + w.length);
                  else {
                    var C = this.diff_main(w, s, !1);
                    if (w.length > this.Match_MaxBits && this.diff_levenshtein(C) / w.length > this.Patch_DeleteThreshold)
                      m[f] = !1;
                    else {
                      this.diff_cleanupSemanticLossless(C);
                      for (var A = 0, H, M = 0; M < c[f].diffs.length; M++) {
                        var P = c[f].diffs[M];
                        P[0] !== _ && (H = this.diff_xIndex(C, A)), P[0] === x ? l = l.substring(0, b + H) + P[1] + l.substring(b + H) : P[0] === L && (l = l.substring(0, b + H) + l.substring(b + this.diff_xIndex(C, A + P[1].length))), P[0] !== L && (A += P[1].length);
                      }
                    }
                  }
                }
              }
              return l = l.substring(g.length, l.length - g.length), [l, m];
            }, E.prototype.patch_addPadding = function(c) {
              for (var l = this.Patch_Margin, g = "", p = 1; p <= l; p++)
                g += String.fromCharCode(p);
              for (var p = 0; p < c.length; p++)
                c[p].start1 += l, c[p].start2 += l;
              var m = c[0], f = m.diffs;
              if (f.length == 0 || f[0][0] != _)
                f.unshift(new E.Diff(_, g)), m.start1 -= l, m.start2 -= l, m.length1 += l, m.length2 += l;
              else if (l > f[0][1].length) {
                var v = l - f[0][1].length;
                f[0][1] = g.substring(f[0][1].length) + f[0][1], m.start1 -= v, m.start2 -= v, m.length1 += v, m.length2 += v;
              }
              if (m = c[c.length - 1], f = m.diffs, f.length == 0 || f[f.length - 1][0] != _)
                f.push(new E.Diff(_, g)), m.length1 += l, m.length2 += l;
              else if (l > f[f.length - 1][1].length) {
                var v = l - f[f.length - 1][1].length;
                f[f.length - 1][1] += g.substring(0, v), m.length1 += v, m.length2 += v;
              }
              return g;
            }, E.prototype.patch_splitMax = function(c) {
              for (var l = this.Match_MaxBits, g = 0; g < c.length; g++)
                if (!(c[g].length1 <= l)) {
                  var p = c[g];
                  c.splice(g--, 1);
                  for (var m = p.start1, f = p.start2, v = ""; p.diffs.length !== 0; ) {
                    var w = new E.patch_obj(), b = !0;
                    for (w.start1 = m - v.length, w.start2 = f - v.length, v !== "" && (w.length1 = w.length2 = v.length, w.diffs.push(new E.Diff(_, v))); p.diffs.length !== 0 && w.length1 < l - this.Patch_Margin; ) {
                      var y = p.diffs[0][0], s = p.diffs[0][1];
                      y === x ? (w.length2 += s.length, f += s.length, w.diffs.push(p.diffs.shift()), b = !1) : y === L && w.diffs.length == 1 && w.diffs[0][0] == _ && s.length > 2 * l ? (w.length1 += s.length, m += s.length, b = !1, w.diffs.push(new E.Diff(y, s)), p.diffs.shift()) : (s = s.substring(0, l - w.length1 - this.Patch_Margin), w.length1 += s.length, m += s.length, y === _ ? (w.length2 += s.length, f += s.length) : b = !1, w.diffs.push(new E.Diff(y, s)), s == p.diffs[0][1] ? p.diffs.shift() : p.diffs[0][1] = p.diffs[0][1].substring(s.length));
                    }
                    v = this.diff_text2(w.diffs), v = v.substring(v.length - this.Patch_Margin);
                    var C = this.diff_text1(p.diffs).substring(0, this.Patch_Margin);
                    C !== "" && (w.length1 += C.length, w.length2 += C.length, w.diffs.length !== 0 && w.diffs[w.diffs.length - 1][0] === _ ? w.diffs[w.diffs.length - 1][1] += C : w.diffs.push(new E.Diff(_, C))), b || c.splice(++g, 0, w);
                  }
                }
            }, E.prototype.patch_toText = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                l[g] = c[g];
              return l.join("");
            }, E.prototype.patch_fromText = function(c) {
              var l = [];
              if (!c)
                return l;
              for (var g = c.split(`
`), p = 0, m = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; p < g.length; ) {
                var f = g[p].match(m);
                if (!f)
                  throw new Error("Invalid patch string: " + g[p]);
                var v = new E.patch_obj();
                for (l.push(v), v.start1 = parseInt(f[1], 10), f[2] === "" ? (v.start1--, v.length1 = 1) : f[2] == "0" ? v.length1 = 0 : (v.start1--, v.length1 = parseInt(f[2], 10)), v.start2 = parseInt(f[3], 10), f[4] === "" ? (v.start2--, v.length2 = 1) : f[4] == "0" ? v.length2 = 0 : (v.start2--, v.length2 = parseInt(f[4], 10)), p++; p < g.length; ) {
                  var w = g[p].charAt(0);
                  try {
                    var b = decodeURI(g[p].substring(1));
                  } catch {
                    throw new Error("Illegal escape in patch_fromText: " + b);
                  }
                  if (w == "-")
                    v.diffs.push(new E.Diff(L, b));
                  else if (w == "+")
                    v.diffs.push(new E.Diff(x, b));
                  else if (w == " ")
                    v.diffs.push(new E.Diff(_, b));
                  else {
                    if (w == "@")
                      break;
                    if (w !== "") throw new Error('Invalid patch mode "' + w + '" in: ' + b);
                  }
                  p++;
                }
              }
              return l;
            }, E.patch_obj = function() {
              this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
            }, E.patch_obj.prototype.toString = function() {
              var c, l;
              this.length1 === 0 ? c = this.start1 + ",0" : this.length1 == 1 ? c = this.start1 + 1 : c = this.start1 + 1 + "," + this.length1, this.length2 === 0 ? l = this.start2 + ",0" : this.length2 == 1 ? l = this.start2 + 1 : l = this.start2 + 1 + "," + this.length2;
              for (var g = ["@@ -" + c + " +" + l + ` @@
`], p, m = 0; m < this.diffs.length; m++) {
                switch (this.diffs[m][0]) {
                  case x:
                    p = "+";
                    break;
                  case L:
                    p = "-";
                    break;
                  case _:
                    p = " ";
                    break;
                }
                g[m + 1] = p + encodeURI(this.diffs[m][1]) + `
`;
              }
              return g.join("").replace(/%20/g, " ");
            }, J.exports = E, J.exports.diff_match_patch = E, J.exports.DIFF_DELETE = L, J.exports.DIFF_INSERT = x, J.exports.DIFF_EQUAL = _;
          }
        ),
        /***/
        664: (
          /***/
          (J, E, L) => {
            L.d(E, {
              default: () => (
                /* binding */
                Ue
              )
            });
            var x = L(386), _ = L(781), c = L(379), l = L(895), g = L(169), p = L(572), m = L(702), f = function(N) {
              N === void 0 && (N = document);
              var re = function(U) {
                var j = document.createElement("img");
                j.src = U.getAttribute("data-src"), j.addEventListener("load", function() {
                  !U.getAttribute("style") && !U.getAttribute("class") && !U.getAttribute("width") && !U.getAttribute("height") && j.naturalHeight > j.naturalWidth && j.naturalWidth / j.naturalHeight < document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) && j.naturalHeight > window.innerHeight - 40 && (U.style.height = window.innerHeight - 40 + "px"), U.src = j.src;
                }), U.removeAttribute("data-src");
              };
              if (!("IntersectionObserver" in window))
                return N.querySelectorAll("img").forEach(function(U) {
                  U.getAttribute("data-src") && re(U);
                }), !1;
              window.vditorImageIntersectionObserver ? (window.vditorImageIntersectionObserver.disconnect(), N.querySelectorAll("img").forEach(function(U) {
                window.vditorImageIntersectionObserver.observe(U);
              })) : (window.vditorImageIntersectionObserver = new IntersectionObserver(function(U) {
                U.forEach(function(j) {
                  (typeof j.isIntersecting > "u" ? j.intersectionRatio !== 0 : j.isIntersecting) && j.target.getAttribute("data-src") && re(j.target);
                });
              }), N.querySelectorAll("img").forEach(function(U) {
                window.vditorImageIntersectionObserver.observe(U);
              }));
            }, v = L(982), w = L(431), b = L(570), y = L(474), s = L(593), C = L(558), A = L(182), H = L(931), M = L(793), P = L(652), V = L(998), G = L(118), Q = L(2), ne = function(N) {
              document.querySelectorAll(".vditor-anchor").forEach(function(re) {
                N === 1 && re.classList.add("vditor-anchor--left"), re.onclick = function() {
                  var U = re.getAttribute("href").substr(1), j = document.getElementById("vditorAnchor-" + U).offsetTop;
                  document.querySelector("html").scrollTop = j;
                };
              }), window.onhashchange = function() {
                var re = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
                re && (document.querySelector("html").scrollTop = re.offsetTop);
              };
            }, oe = L(65), me = L(307), fe = function(N, re) {
              if (re === void 0 && (re = "zh_CN"), !(typeof speechSynthesis > "u" || typeof SpeechSynthesisUtterance > "u")) {
                var U = function() {
                  var Ce = speechSynthesis.getVoices(), X, de;
                  return Ce.forEach(function(Ae) {
                    Ae.lang === re.replace("_", "-") && (X = Ae), Ae.default && (de = Ae);
                  }), X || (X = de), X;
                }, j = '<svg><use xlink:href="#vditor-icon-play"></use></svg>', pe = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
                document.getElementById("vditorIconScript") || (j = '<svg viewBox="0 0 32 32"><path d="M3.436 0l25.128 16-25.128 16v-32z"></path></svg>', pe = '<svg viewBox="0 0 32 32"><path d="M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z"></path></svg>');
                var z = document.querySelector(".vditor-speech");
                z || (z = document.createElement("button"), z.className = "vditor-speech", N.insertAdjacentElement("beforeend", z), speechSynthesis.onvoiceschanged !== void 0 && (speechSynthesis.onvoiceschanged = U));
                var ge = U(), ie = new SpeechSynthesisUtterance();
                ie.voice = ge, ie.onend = ie.onerror = function() {
                  z.style.display = "none", speechSynthesis.cancel(), z.classList.remove("vditor-speech--current"), z.innerHTML = j;
                }, N.addEventListener(window.ontouchstart !== void 0 ? "touchend" : "click", function(Ce) {
                  var X = Ce.target;
                  if (X.classList.contains("vditor-speech") || X.parentElement.classList.contains("vditor-speech")) {
                    z.classList.contains("vditor-speech--current") ? speechSynthesis.speaking && (speechSynthesis.paused ? (speechSynthesis.resume(), z.innerHTML = pe) : (speechSynthesis.pause(), z.innerHTML = j)) : (ie.text = z.getAttribute("data-text"), speechSynthesis.speak(ie), z.classList.add("vditor-speech--current"), z.innerHTML = pe), (0, me.Hc)(window.vditorSpeechRange), N.focus();
                    return;
                  }
                  if (z.style.display = "none", speechSynthesis.cancel(), z.classList.remove("vditor-speech--current"), z.innerHTML = j, getSelection().rangeCount !== 0) {
                    var de = getSelection().getRangeAt(0), Ae = de.toString().trim();
                    if (Ae) {
                      window.vditorSpeechRange = de.cloneRange();
                      var He = de.getBoundingClientRect();
                      z.innerHTML = j, z.style.display = "block", z.style.top = He.top + He.height + document.querySelector("html").scrollTop - 20 + "px", window.ontouchstart !== void 0 ? z.style.left = Ce.changedTouches[Ce.changedTouches.length - 1].pageX + 2 + "px" : z.style.left = Ce.clientX + 2 + "px", z.setAttribute("data-text", Ae);
                    }
                  }
                });
              }
            }, le = function(N, re, U, j) {
              function pe(z) {
                return z instanceof U ? z : new U(function(ge) {
                  ge(z);
                });
              }
              return new (U || (U = Promise))(function(z, ge) {
                function ie(de) {
                  try {
                    X(j.next(de));
                  } catch (Ae) {
                    ge(Ae);
                  }
                }
                function Ce(de) {
                  try {
                    X(j.throw(de));
                  } catch (Ae) {
                    ge(Ae);
                  }
                }
                function X(de) {
                  de.done ? z(de.value) : pe(de.value).then(ie, Ce);
                }
                X((j = j.apply(N, [])).next());
              });
            }, we = function(N, re) {
              var U = { label: 0, sent: function() {
                if (z[0] & 1) throw z[1];
                return z[1];
              }, trys: [], ops: [] }, j, pe, z, ge;
              return ge = { next: ie(0), throw: ie(1), return: ie(2) }, typeof Symbol == "function" && (ge[Symbol.iterator] = function() {
                return this;
              }), ge;
              function ie(X) {
                return function(de) {
                  return Ce([X, de]);
                };
              }
              function Ce(X) {
                if (j) throw new TypeError("Generator is already executing.");
                for (; ge && (ge = 0, X[0] && (U = 0)), U; ) try {
                  if (j = 1, pe && (z = X[0] & 2 ? pe.return : X[0] ? pe.throw || ((z = pe.return) && z.call(pe), 0) : pe.next) && !(z = z.call(pe, X[1])).done) return z;
                  switch (pe = 0, z && (X = [X[0] & 2, z.value]), X[0]) {
                    case 0:
                    case 1:
                      z = X;
                      break;
                    case 4:
                      return U.label++, { value: X[1], done: !1 };
                    case 5:
                      U.label++, pe = X[1], X = [0];
                      continue;
                    case 7:
                      X = U.ops.pop(), U.trys.pop();
                      continue;
                    default:
                      if (z = U.trys, !(z = z.length > 0 && z[z.length - 1]) && (X[0] === 6 || X[0] === 2)) {
                        U = 0;
                        continue;
                      }
                      if (X[0] === 3 && (!z || X[1] > z[0] && X[1] < z[3])) {
                        U.label = X[1];
                        break;
                      }
                      if (X[0] === 6 && U.label < z[1]) {
                        U.label = z[1], z = X;
                        break;
                      }
                      if (z && U.label < z[2]) {
                        U.label = z[2], U.ops.push(X);
                        break;
                      }
                      z[2] && U.ops.pop(), U.trys.pop();
                      continue;
                  }
                  X = re.call(N, U);
                } catch (de) {
                  X = [6, de], pe = 0;
                } finally {
                  j = z = 0;
                }
                if (X[0] & 5) throw X[1];
                return { value: X[0] ? X[1] : void 0, done: !0 };
              }
            }, Me = function(N) {
              var re, U = {
                anchor: 0,
                cdn: M.g.CDN,
                customEmoji: {},
                emojiPath: "".concat(M.g.CDN, "/dist/images/emoji"),
                hljs: M.g.HLJS_OPTIONS,
                icon: "ant",
                lang: "zh_CN",
                markdown: M.g.MARKDOWN_OPTIONS,
                math: M.g.MATH_OPTIONS,
                mode: "light",
                speech: {
                  enable: !1
                },
                render: {
                  media: {
                    enable: !0
                  }
                },
                theme: M.g.THEME_OPTIONS
              };
              return N.cdn && (!((re = N.theme) === null || re === void 0) && re.path || (U.theme.path = "".concat(N.cdn, "/dist/css/content-theme")), N.emojiPath || (U.emojiPath = "".concat(N.cdn, "/dist/images/emoji"))), (0, Q.T)(U, N);
            }, ve = function(N, re) {
              var U = Me(re);
              return (0, V.G)("".concat(U.cdn, "/dist/js/lute/lute.min.js"), "vditorLuteScript").then(function() {
                var j = (0, oe.X)({
                  autoSpace: U.markdown.autoSpace,
                  gfmAutoLink: U.markdown.gfmAutoLink,
                  codeBlockPreview: U.markdown.codeBlockPreview,
                  emojiSite: U.emojiPath,
                  emojis: U.customEmoji,
                  fixTermTypo: U.markdown.fixTermTypo,
                  footnotes: U.markdown.footnotes,
                  headingAnchor: U.anchor !== 0,
                  inlineMathDigit: U.math.inlineDigit,
                  lazyLoadImage: U.lazyLoadImage,
                  linkBase: U.markdown.linkBase,
                  linkPrefix: U.markdown.linkPrefix,
                  listStyle: U.markdown.listStyle,
                  mark: U.markdown.mark,
                  mathBlockPreview: U.markdown.mathBlockPreview,
                  paragraphBeginningSpace: U.markdown.paragraphBeginningSpace,
                  sanitize: U.markdown.sanitize,
                  toc: U.markdown.toc
                });
                return re != null && re.renderers && j.SetJSRenderers({
                  renderers: {
                    Md2HTML: re.renderers
                  }
                }), j.SetHeadingID(!0), j.Md2HTML(N);
              });
            }, k = function(N, re, U) {
              return le(void 0, void 0, void 0, function() {
                var j, pe, z, ge;
                return we(this, function(ie) {
                  switch (ie.label) {
                    case 0:
                      return j = Me(U), [4, ve(re, j)];
                    case 1:
                      if (pe = ie.sent(), j.transform && (pe = j.transform(pe)), N.innerHTML = pe, N.classList.add("vditor-reset"), j.i18n) return [3, 5];
                      if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(j.lang)) return [3, 2];
                      throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
                    case 2:
                      return z = "vditorI18nScript", ge = z + j.lang, document.querySelectorAll('head script[id^="'.concat(z, '"]')).forEach(function(Ce) {
                        Ce.id !== ge && document.head.removeChild(Ce);
                      }), [4, (0, V.G)("".concat(j.cdn, "/dist/js/i18n/").concat(j.lang, ".js"), ge)];
                    case 3:
                      ie.sent(), ie.label = 4;
                    case 4:
                      return [3, 6];
                    case 5:
                      window.VditorI18n = j.i18n, ie.label = 6;
                    case 6:
                      return j.icon ? [4, (0, V.G)("".concat(j.cdn, "/dist/js/icons/").concat(j.icon, ".js"), "vditorIconScript")] : [3, 8];
                    case 7:
                      ie.sent(), ie.label = 8;
                    case 8:
                      return (0, P.Z)(j.theme.current, j.theme.path), j.anchor === 1 && N.classList.add("vditor-reset--anchor"), (0, l.O)(N, j.hljs), (0, m.s)(j.hljs, N, j.cdn), (0, v.H)(N, {
                        cdn: j.cdn,
                        math: j.math
                      }), (0, b.i)(N, j.cdn, j.mode), (0, y.J)(N, j.cdn, j.mode), (0, s.K)(N, j.cdn), (0, g.P)(N, j.cdn), (0, p.v)(N, j.cdn), (0, c.p)(N, j.cdn, j.mode), (0, C.P)(N, j.cdn, j.mode), (0, H.B)(N, j.cdn), (0, x.Q)(N, j.cdn), j.render.media.enable && (0, w.Y)(N), j.speech.enable && fe(N), j.anchor !== 0 && ne(j.anchor), j.after && j.after(), j.lazyLoadImage && f(N), N.addEventListener("click", function(Ce) {
                        var X = (0, G.lG)(Ce.target, "SPAN");
                        if (X && (0, G.fb)(X, "vditor-toc")) {
                          var de = N.querySelector("#" + X.getAttribute("data-target-id"));
                          de && window.scrollTo(window.scrollX, de.offsetTop);
                          return;
                        }
                      }), [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, Re = L(971), lt = L(34), ct = (
              /** @class */
              function() {
                function N() {
                }
                return N.adapterRender = _, N.previewImage = Re.E, N.codeRender = l.O, N.graphvizRender = p.v, N.highlightRender = m.s, N.mathRender = v.H, N.mermaidRender = b.i, N.SMILESRender = y.J, N.markmapRender = s.K, N.flowchartRender = g.P, N.chartRender = c.p, N.abcRender = x.Q, N.mindmapRender = C.P, N.plantumlRender = H.B, N.outlineRender = A.k, N.mediaRender = w.Y, N.speechRender = fe, N.lazyLoadImageRender = f, N.md2html = ve, N.preview = k, N.setCodeTheme = lt.Y, N.setContentTheme = P.Z, N;
              }()
            );
            const Ue = ct;
          }
        ),
        /***/
        793: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              H: () => (
                /* binding */
                x
              ),
              /* harmony export */
              g: () => (
                /* binding */
                _
              )
              /* harmony export */
            });
            var x = "3.10.7", _ = (
              /** @class */
              function() {
                function c() {
                }
                return c.ZWSP = "​", c.DROP_EDITOR = "application/editor", c.MOBILE_WIDTH = 520, c.CLASS_MENU_DISABLED = "vditor-menu--disabled", c.EDIT_TOOLBARS = [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "list",
                  "ordered-list",
                  "outdent",
                  "indent",
                  "check",
                  "line",
                  "quote",
                  "code",
                  "inline-code",
                  "insert-after",
                  "insert-before",
                  "upload",
                  "record",
                  "table"
                ], c.CODE_THEME = [
                  "a11y-dark",
                  "agate",
                  "an-old-hope",
                  "androidstudio",
                  "arta",
                  "atom-one-dark",
                  "atom-one-dark-reasonable",
                  "base16/3024",
                  "base16/apathy",
                  "base16/apprentice",
                  "base16/ashes",
                  "base16/atelier-cave",
                  "base16/atelier-dune",
                  "base16/atelier-estuary",
                  "base16/atelier-forest",
                  "base16/atelier-heath",
                  "base16/atelier-lakeside",
                  "base16/atelier-plateau",
                  "base16/atelier-savanna",
                  "base16/atelier-seaside",
                  "base16/atelier-sulphurpool",
                  "base16/atlas",
                  "base16/bespin",
                  "base16/black-metal",
                  "base16/black-metal-bathory",
                  "base16/black-metal-burzum",
                  "base16/black-metal-dark-funeral",
                  "base16/black-metal-gorgoroth",
                  "base16/black-metal-immortal",
                  "base16/black-metal-khold",
                  "base16/black-metal-marduk",
                  "base16/black-metal-mayhem",
                  "base16/black-metal-nile",
                  "base16/black-metal-venom",
                  "base16/brewer",
                  "base16/bright",
                  "base16/brogrammer",
                  "base16/brush-trees-dark",
                  "base16/chalk",
                  "base16/circus",
                  "base16/classic-dark",
                  "base16/codeschool",
                  "base16/colors",
                  "base16/danqing",
                  "base16/darcula",
                  "base16/dark-violet",
                  "base16/darkmoss",
                  "base16/darktooth",
                  "base16/decaf",
                  "base16/default-dark",
                  "base16/dracula",
                  "base16/edge-dark",
                  "base16/eighties",
                  "base16/embers",
                  "base16/equilibrium-dark",
                  "base16/equilibrium-gray-dark",
                  "base16/espresso",
                  "base16/eva",
                  "base16/eva-dim",
                  "base16/flat",
                  "base16/framer",
                  "base16/gigavolt",
                  "base16/google-dark",
                  "base16/grayscale-dark",
                  "base16/green-screen",
                  "base16/gruvbox-dark-hard",
                  "base16/gruvbox-dark-medium",
                  "base16/gruvbox-dark-pale",
                  "base16/gruvbox-dark-soft",
                  "base16/hardcore",
                  "base16/harmonic16-dark",
                  "base16/heetch-dark",
                  "base16/helios",
                  "base16/hopscotch",
                  "base16/horizon-dark",
                  "base16/humanoid-dark",
                  "base16/ia-dark",
                  "base16/icy-dark",
                  "base16/ir-black",
                  "base16/isotope",
                  "base16/kimber",
                  "base16/london-tube",
                  "base16/macintosh",
                  "base16/marrakesh",
                  "base16/materia",
                  "base16/material",
                  "base16/material-darker",
                  "base16/material-palenight",
                  "base16/material-vivid",
                  "base16/mellow-purple",
                  "base16/mocha",
                  "base16/monokai",
                  "base16/nebula",
                  "base16/nord",
                  "base16/nova",
                  "base16/ocean",
                  "base16/oceanicnext",
                  "base16/onedark",
                  "base16/outrun-dark",
                  "base16/papercolor-dark",
                  "base16/paraiso",
                  "base16/pasque",
                  "base16/phd",
                  "base16/pico",
                  "base16/pop",
                  "base16/porple",
                  "base16/qualia",
                  "base16/railscasts",
                  "base16/rebecca",
                  "base16/ros-pine",
                  "base16/ros-pine-moon",
                  "base16/sandcastle",
                  "base16/seti-ui",
                  "base16/silk-dark",
                  "base16/snazzy",
                  "base16/solar-flare",
                  "base16/solarized-dark",
                  "base16/spacemacs",
                  "base16/summercamp",
                  "base16/summerfruit-dark",
                  "base16/synth-midnight-terminal-dark",
                  "base16/tango",
                  "base16/tender",
                  "base16/tomorrow-night",
                  "base16/twilight",
                  "base16/unikitty-dark",
                  "base16/vulcan",
                  "base16/windows-10",
                  "base16/windows-95",
                  "base16/windows-high-contrast",
                  "base16/windows-nt",
                  "base16/woodland",
                  "base16/xcode-dusk",
                  "base16/zenburn",
                  "codepen-embed",
                  "dark",
                  "devibeans",
                  "far",
                  "felipec",
                  "github-dark",
                  "github-dark-dimmed",
                  "gml",
                  "gradient-dark",
                  "hybrid",
                  "ir-black",
                  "isbl-editor-dark",
                  "kimbie-dark",
                  "lioshi",
                  "monokai",
                  "monokai-sublime",
                  "night-owl",
                  "nnfx-dark",
                  "nord",
                  "obsidian",
                  "panda-syntax-dark",
                  "paraiso-dark",
                  "pojoaque",
                  "qtcreator-dark",
                  "rainbow",
                  "shades-of-purple",
                  "srcery",
                  "stackoverflow-dark",
                  "sunburst",
                  "tomorrow-night-blue",
                  "tomorrow-night-bright",
                  "tokyo-night-dark",
                  "vs2015",
                  "xt256",
                  "ant-design",
                  "a11y-light",
                  "arduino-light",
                  "ascetic",
                  "atom-one-light",
                  "base16/atelier-cave-light",
                  "base16/atelier-dune-light",
                  "base16/atelier-estuary-light",
                  "base16/atelier-forest-light",
                  "base16/atelier-heath-light",
                  "base16/atelier-lakeside-light",
                  "base16/atelier-plateau-light",
                  "base16/atelier-savanna-light",
                  "base16/atelier-seaside-light",
                  "base16/atelier-sulphurpool-light",
                  "base16/brush-trees",
                  "base16/classic-light",
                  "base16/cupcake",
                  "base16/cupertino",
                  "base16/default-light",
                  "base16/dirtysea",
                  "base16/edge-light",
                  "base16/equilibrium-gray-light",
                  "base16/equilibrium-light",
                  "base16/fruit-soda",
                  "base16/github",
                  "base16/google-light",
                  "base16/grayscale-light",
                  "base16/gruvbox-light-hard",
                  "base16/gruvbox-light-medium",
                  "base16/gruvbox-light-soft",
                  "base16/harmonic16-light",
                  "base16/heetch-light",
                  "base16/humanoid-light",
                  "base16/horizon-light",
                  "base16/ia-light",
                  "base16/material-lighter",
                  "base16/mexico-light",
                  "base16/one-light",
                  "base16/papercolor-light",
                  "base16/ros-pine-dawn",
                  "base16/sagelight",
                  "base16/shapeshifter",
                  "base16/silk-light",
                  "base16/solar-flare-light",
                  "base16/solarized-light",
                  "base16/summerfruit-light",
                  "base16/synth-midnight-terminal-light",
                  "base16/tomorrow",
                  "base16/unikitty-light",
                  "base16/windows-10-light",
                  "base16/windows-95-light",
                  "base16/windows-high-contrast-light",
                  "brown-paper",
                  "base16/windows-nt-light",
                  "color-brewer",
                  "docco",
                  "foundation",
                  "github",
                  "googlecode",
                  "gradient-light",
                  "grayscale",
                  "idea",
                  "intellij-light",
                  "isbl-editor-light",
                  "kimbie-light",
                  "lightfair",
                  "magula",
                  "mono-blue",
                  "nnfx-light",
                  "panda-syntax-light",
                  "paraiso-light",
                  "purebasic",
                  "qtcreator-light",
                  "routeros",
                  "school-book",
                  "stackoverflow-light",
                  "tokyo-night-light",
                  "vs",
                  "xcode",
                  "default"
                ], c.ALIAS_CODE_LANGUAGES = [
                  // 自定义
                  "abc",
                  "plantuml",
                  "mermaid",
                  "flowchart",
                  "echarts",
                  "mindmap",
                  "graphviz",
                  "math",
                  "markmap",
                  "smiles",
                  // 别名
                  "js",
                  "ts",
                  "html",
                  "toml",
                  "c#",
                  "bat"
                ], c.CDN = "https://unpkg.com/vditor@".concat("3.10.7"), c.MARKDOWN_OPTIONS = {
                  autoSpace: !1,
                  gfmAutoLink: !0,
                  codeBlockPreview: !0,
                  fixTermTypo: !1,
                  footnotes: !0,
                  linkBase: "",
                  linkPrefix: "",
                  listStyle: !1,
                  mark: !1,
                  mathBlockPreview: !0,
                  paragraphBeginningSpace: !1,
                  sanitize: !0,
                  toc: !1
                }, c.HLJS_OPTIONS = {
                  enable: !0,
                  lineNumber: !1,
                  defaultLang: "",
                  style: "github"
                }, c.MATH_OPTIONS = {
                  engine: "KaTeX",
                  inlineDigit: !1,
                  macros: {}
                }, c.THEME_OPTIONS = {
                  current: "light",
                  list: {
                    "ant-design": "Ant Design",
                    dark: "Dark",
                    light: "Light",
                    wechat: "WeChat"
                  },
                  path: "".concat(c.CDN, "/dist/css/content-theme")
                }, c;
              }()
            );
          }
        ),
        /***/
        474: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              J: () => (
                /* binding */
                g
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = L(446), g = function(p, m, f) {
              p === void 0 && (p = document), m === void 0 && (m = x.g.CDN);
              var v = c.SMILESRenderAdapter.getElements(p);
              v.length > 0 && (0, _.G)("".concat(m, "/dist/js/smiles-drawer/smiles-drawer.min.js?v=2.1.7"), "vditorAbcjsScript").then(function() {
                var w = new SmiDrawer({}, {});
                v.forEach(function(b) {
                  var y = c.SMILESRenderAdapter.getCode(b).trim();
                  if (!(b.getAttribute("data-processed") === "true" || y.trim() === "")) {
                    var s = "smiles" + (0, l.Wb)();
                    b.innerHTML = '<svg id="'.concat(s, '"></svg>'), w.draw(y, "#" + s, f === "dark" ? "dark" : void 0), b.setAttribute("data-processed", "true");
                  }
                });
              });
            };
          }
        ),
        /***/
        386: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              Q: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = function(g, p) {
              g === void 0 && (g = document), p === void 0 && (p = x.g.CDN);
              var m = c.abcRenderAdapter.getElements(g);
              m.length > 0 && (0, _.G)("".concat(p, "/dist/js/abcjs/abcjs_basic.min.js"), "vditorAbcjsScript").then(function() {
                m.forEach(function(f) {
                  f.parentElement.classList.contains("vditor-wysiwyg__pre") || f.parentElement.classList.contains("vditor-ir__marker--pre") || f.getAttribute("data-processed") !== "true" && (ABCJS.renderAbc(f, c.abcRenderAdapter.getCode(f).trim()), f.style.overflowX = "auto", f.setAttribute("data-processed", "true"));
                });
              });
            };
          }
        ),
        /***/
        781: (
          /***/
          (J, E, L) => {
            L.r(E), L.d(E, {
              /* harmony export */
              SMILESRenderAdapter: () => (
                /* binding */
                _
              ),
              /* harmony export */
              abcRenderAdapter: () => (
                /* binding */
                m
              ),
              /* harmony export */
              chartRenderAdapter: () => (
                /* binding */
                p
              ),
              /* harmony export */
              flowchartRenderAdapter: () => (
                /* binding */
                v
              ),
              /* harmony export */
              graphvizRenderAdapter: () => (
                /* binding */
                f
              ),
              /* harmony export */
              markmapRenderAdapter: () => (
                /* binding */
                l
              ),
              /* harmony export */
              mathRenderAdapter: () => (
                /* binding */
                x
              ),
              /* harmony export */
              mermaidRenderAdapter: () => (
                /* binding */
                c
              ),
              /* harmony export */
              mindmapRenderAdapter: () => (
                /* binding */
                g
              ),
              /* harmony export */
              plantumlRenderAdapter: () => (
                /* binding */
                w
              )
              /* harmony export */
            });
            var x = {
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-math");
              }
            }, _ = {
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-smiles");
              }
            }, c = {
              /** 不仅要返回code，并且需要将 code 设置为 el 的 innerHTML */
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-mermaid");
              }
            }, l = {
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-markmap");
              }
            }, g = {
              getCode: function(b) {
                return b.getAttribute("data-code");
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-mindmap");
              }
            }, p = {
              getCode: function(b) {
                return b.innerText;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-echarts");
              }
            }, m = {
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-abc");
              }
            }, f = {
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-graphviz");
              }
            }, v = {
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-flowchart");
              }
            }, w = {
              getCode: function(b) {
                return b.textContent;
              },
              getElements: function(b) {
                return b.querySelectorAll(".language-plantuml");
              }
            };
          }
        ),
        /***/
        379: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              p: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = L(446), g = function(f, v, w, b) {
              function y(s) {
                return s instanceof w ? s : new w(function(C) {
                  C(s);
                });
              }
              return new (w || (w = Promise))(function(s, C) {
                function A(P) {
                  try {
                    M(b.next(P));
                  } catch (V) {
                    C(V);
                  }
                }
                function H(P) {
                  try {
                    M(b.throw(P));
                  } catch (V) {
                    C(V);
                  }
                }
                function M(P) {
                  P.done ? s(P.value) : y(P.value).then(A, H);
                }
                M((b = b.apply(f, [])).next());
              });
            }, p = function(f, v) {
              var w = { label: 0, sent: function() {
                if (s[0] & 1) throw s[1];
                return s[1];
              }, trys: [], ops: [] }, b, y, s, C;
              return C = { next: A(0), throw: A(1), return: A(2) }, typeof Symbol == "function" && (C[Symbol.iterator] = function() {
                return this;
              }), C;
              function A(M) {
                return function(P) {
                  return H([M, P]);
                };
              }
              function H(M) {
                if (b) throw new TypeError("Generator is already executing.");
                for (; C && (C = 0, M[0] && (w = 0)), w; ) try {
                  if (b = 1, y && (s = M[0] & 2 ? y.return : M[0] ? y.throw || ((s = y.return) && s.call(y), 0) : y.next) && !(s = s.call(y, M[1])).done) return s;
                  switch (y = 0, s && (M = [M[0] & 2, s.value]), M[0]) {
                    case 0:
                    case 1:
                      s = M;
                      break;
                    case 4:
                      return w.label++, { value: M[1], done: !1 };
                    case 5:
                      w.label++, y = M[1], M = [0];
                      continue;
                    case 7:
                      M = w.ops.pop(), w.trys.pop();
                      continue;
                    default:
                      if (s = w.trys, !(s = s.length > 0 && s[s.length - 1]) && (M[0] === 6 || M[0] === 2)) {
                        w = 0;
                        continue;
                      }
                      if (M[0] === 3 && (!s || M[1] > s[0] && M[1] < s[3])) {
                        w.label = M[1];
                        break;
                      }
                      if (M[0] === 6 && w.label < s[1]) {
                        w.label = s[1], s = M;
                        break;
                      }
                      if (s && w.label < s[2]) {
                        w.label = s[2], w.ops.push(M);
                        break;
                      }
                      s[2] && w.ops.pop(), w.trys.pop();
                      continue;
                  }
                  M = v.call(f, w);
                } catch (P) {
                  M = [6, P], y = 0;
                } finally {
                  b = s = 0;
                }
                if (M[0] & 5) throw M[1];
                return { value: M[0] ? M[1] : void 0, done: !0 };
              }
            }, m = function(f, v, w) {
              f === void 0 && (f = document), v === void 0 && (v = x.g.CDN);
              var b = c.chartRenderAdapter.getElements(f);
              b.length > 0 && (0, _.G)("".concat(v, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                b.forEach(function(y) {
                  return g(void 0, void 0, void 0, function() {
                    var s, C, A;
                    return p(this, function(H) {
                      switch (H.label) {
                        case 0:
                          if (y.parentElement.classList.contains("vditor-wysiwyg__pre") || y.parentElement.classList.contains("vditor-ir__marker--pre"))
                            return [
                              2
                              /*return*/
                            ];
                          if (s = c.chartRenderAdapter.getCode(y).trim(), !s)
                            return [
                              2
                              /*return*/
                            ];
                          H.label = 1;
                        case 1:
                          return H.trys.push([1, 3, , 4]), y.getAttribute("data-processed") === "true" ? [
                            2
                            /*return*/
                          ] : [4, (0, l.Qf)(s)];
                        case 2:
                          return C = H.sent(), echarts.init(y, w === "dark" ? "dark" : void 0).setOption(C), y.setAttribute("data-processed", "true"), [3, 4];
                        case 3:
                          return A = H.sent(), y.className = "vditor-reset--error", y.innerHTML = "echarts render error: <br>".concat(A), [3, 4];
                        case 4:
                          return [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                });
              });
            };
          }
        ),
        /***/
        895: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              O: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var x = L(528), _ = L(793), c = function(l, g) {
              Array.from(l.querySelectorAll("pre > code")).filter(function(p, m) {
                return !(p.parentElement.classList.contains("vditor-wysiwyg__pre") || p.parentElement.classList.contains("vditor-ir__marker--pre") || p.classList.contains("language-mermaid") || p.classList.contains("language-flowchart") || p.classList.contains("language-echarts") || p.classList.contains("language-mindmap") || p.classList.contains("language-plantuml") || p.classList.contains("language-markmap") || p.classList.contains("language-abc") || p.classList.contains("language-graphviz") || p.classList.contains("language-math") || p.classList.contains("language-smiles") || p.style.maxHeight.indexOf("px") > -1 || l.classList.contains("vditor-preview") && m > 5);
              }).forEach(function(p) {
                var m, f, v, w = p.innerText;
                if (p.classList.contains("highlight-chroma")) {
                  var b = p.cloneNode(!0);
                  b.querySelectorAll(".highlight-ln").forEach(function(A) {
                    A.remove();
                  }), w = b.innerText;
                } else w.endsWith(`
`) && (w = w.substr(0, w.length - 1));
                var y = '<svg><use xlink:href="#vditor-icon-copy"></use></svg>';
                document.getElementById("vditorIconScript") || (y = '<svg viewBox="0 0 32 32"><path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path></svg>');
                var s = document.createElement("div");
                s.className = "vditor-copy", s.innerHTML = '<span aria-label="'.concat(((m = window.VditorI18n) === null || m === void 0 ? void 0 : m.copy) || "复制", `"
onmouseover="this.setAttribute('aria-label', '`).concat(((f = window.VditorI18n) === null || f === void 0 ? void 0 : f.copy) || "复制", `')"
class="vditor-tooltipped vditor-tooltipped__w"
onclick="this.previousElementSibling.select();document.execCommand('copy');this.setAttribute('aria-label', '`).concat(((v = window.VditorI18n) === null || v === void 0 ? void 0 : v.copied) || "已复制", `');this.previousElementSibling.blur()">`).concat(y, "</span>");
                var C = document.createElement("textarea");
                C.value = (0, x.X)(w), s.insertAdjacentElement("afterbegin", C), g && g.renderMenu && g.renderMenu(p, s), p.before(s), p.style.maxHeight = window.outerHeight - 40 + "px", p.insertAdjacentHTML("afterend", '<span style="position: absolute">'.concat(_.g.ZWSP, "</span>"));
              });
            };
          }
        ),
        /***/
        169: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              P: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = function(g, p) {
              p === void 0 && (p = x.g.CDN);
              var m = c.flowchartRenderAdapter.getElements(g);
              m.length !== 0 && (0, _.G)("".concat(p, "/dist/js/flowchart.js/flowchart.min.js"), "vditorFlowchartScript").then(function() {
                m.forEach(function(f) {
                  if (f.getAttribute("data-processed") !== "true") {
                    var v = flowchart.parse(c.flowchartRenderAdapter.getCode(f));
                    f.innerHTML = "", v.drawSVG(f), f.setAttribute("data-processed", "true");
                  }
                });
              });
            };
          }
        ),
        /***/
        572: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              v: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = function(g, p) {
              p === void 0 && (p = x.g.CDN);
              var m = c.graphvizRenderAdapter.getElements(g);
              m.length !== 0 && (0, _.G)("".concat(p, "/dist/js/graphviz/viz.js"), "vditorGraphVizScript").then(function() {
                m.forEach(function(f) {
                  var v = c.graphvizRenderAdapter.getCode(f);
                  if (!(f.parentElement.classList.contains("vditor-wysiwyg__pre") || f.parentElement.classList.contains("vditor-ir__marker--pre")) && !(f.getAttribute("data-processed") === "true" || v.trim() === "")) {
                    try {
                      var w = new Blob(["importScripts('".concat(document.getElementById("vditorGraphVizScript").src.replace("viz.js", "full.render.js"), "');")], { type: "application/javascript" }), b = window.URL || window.webkitURL, y = b.createObjectURL(w), s = new Worker(y);
                      new Viz({ worker: s }).renderSVGElement(v).then(function(C) {
                        f.innerHTML = C.outerHTML;
                      }).catch(function(C) {
                        f.innerHTML = "graphviz render error: <br>".concat(C), f.className = "vditor-reset--error";
                      });
                    } catch (C) {
                      console.error("graphviz error", C);
                    }
                    f.setAttribute("data-processed", "true");
                  }
                });
              });
            };
          }
        ),
        /***/
        702: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              s: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(296), l = function(g, p, m) {
              p === void 0 && (p = document), m === void 0 && (m = x.g.CDN);
              var f = g.style;
              x.g.CODE_THEME.includes(f) || (f = "github");
              var v = document.getElementById("vditorHljsStyle"), w = "".concat(m, "/dist/js/highlight.js/styles/").concat(f, ".min.css");
              if (v && v.getAttribute("href") !== w && v.remove(), (0, c.c)("".concat(m, "/dist/js/highlight.js/styles/").concat(f, ".min.css"), "vditorHljsStyle"), g.enable !== !1) {
                var b = p.querySelectorAll("pre > code");
                b.length !== 0 && (0, _.G)("".concat(m, "/dist/js/highlight.js/highlight.min.js?v=11.7.0"), "vditorHljsScript").then(function() {
                  (0, _.G)("".concat(m, "/dist/js/highlight.js/third-languages.js?v=1.0.1"), "vditorHljsThirdScript").then(function() {
                    p.querySelectorAll("pre > code").forEach(function(y) {
                      if (!(y.parentElement.classList.contains("vditor-ir__marker--pre") || y.parentElement.classList.contains("vditor-wysiwyg__pre")) && !(y.classList.contains("language-mermaid") || y.classList.contains("language-flowchart") || y.classList.contains("language-echarts") || y.classList.contains("language-mindmap") || y.classList.contains("language-plantuml") || y.classList.contains("language-smiles") || y.classList.contains("language-abc") || y.classList.contains("language-graphviz") || y.classList.contains("language-math"))) {
                        g.defaultLang !== "" && y.className.indexOf("language-") === -1 && y.classList.add("language-" + g.defaultLang);
                        var s = g.defaultLang || y.className.replace("language-", "");
                        if (window.hljs.getLanguage(s) || (s = "plaintext"), y.innerHTML = window.hljs.highlight(y.textContent, {
                          language: s,
                          ignoreIllegals: !0
                        }).value, y.classList.add("hljs"), !!g.lineNumber) {
                          y.classList.add("vditor-linenumber");
                          var C = y.querySelector(".vditor-linenumber__temp");
                          C || (C = document.createElement("div"), C.className = "vditor-linenumber__temp", y.insertAdjacentElement("beforeend", C));
                          var A = getComputedStyle(y).whiteSpace, H = !1;
                          (A === "pre-wrap" || A === "pre-line") && (H = !0);
                          var M = "", P = y.textContent.split(/\r\n|\r|\n/g);
                          P.pop(), P.map(function(V) {
                            var G = "";
                            H && (C.textContent = V || `
`, G = ' style="height:'.concat(C.getBoundingClientRect().height, 'px"')), M += "<span".concat(G, "></span>");
                          }), C.style.display = "none", M = '<span class="vditor-linenumber__rows">'.concat(M, "</span>"), y.insertAdjacentHTML("beforeend", M);
                        }
                      }
                    });
                  });
                });
              }
            };
          }
        ),
        /***/
        593: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              K: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = {}, g = function(f, v) {
              var w = f.transform(v), b = Object.keys(w.features).filter(function(H) {
                return !l[H];
              });
              b.forEach(function(H) {
                l[H] = !0;
              });
              var y = f.getAssets(b), s = y.styles, C = y.scripts, A = window.markmap;
              return s && A.loadCSS(s), C && A.loadJS(C), w;
            }, p = function(f, v) {
              var w = window.markmap, b = w.Transformer, y = w.Markmap, s = w.deriveOptions;
              w.globalCSS;
              var C = new b();
              f.innerHTML = '<svg style="width:100%"></svg>';
              var A = f.firstChild, H = y.create(A, null), M = g(C, v), P = M.root, V = M.frontmatter, G = V == null ? void 0 : V.markmap, Q = s(G);
              H.setData(P, Q), H.fit();
            }, m = function(f, v) {
              f === void 0 && (f = document), v === void 0 && (v = x.g.CDN);
              var w = c.markmapRenderAdapter.getElements(f);
              w.length !== 0 && (0, _.G)("".concat(v, "/dist/js/markmap/markmap.min.js"), "vditorMarkerScript").then(function() {
                w.forEach(function(b) {
                  var y = c.markmapRenderAdapter.getCode(b);
                  if (!(b.getAttribute("data-processed") === "true" || y.trim() === "")) {
                    var s = document.createElement("div");
                    s.className = "language-markmap", b.parentNode.appendChild(s), p(s, y), b.parentNode.childNodes[0].nodeName == "CODE" && b.parentNode.removeChild(b.parentNode.childNodes[0]);
                  }
                });
              });
            };
          }
        ),
        /***/
        982: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              H: () => (
                /* binding */
                p
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(296), l = L(528), g = L(781), p = function(m, f) {
              m === void 0 && (m = document);
              var v = g.mathRenderAdapter.getElements(m);
              if (v.length !== 0) {
                var w = {
                  cdn: x.g.CDN,
                  math: {
                    engine: "KaTeX",
                    inlineDigit: !1,
                    macros: {}
                  }
                };
                if (f && f.math && (f.math = Object.assign({}, w.math, f.math)), f = Object.assign({}, w, f), f.math.engine === "KaTeX")
                  (0, c.c)("".concat(f.cdn, "/dist/js/katex/katex.min.css?v=0.16.9"), "vditorKatexStyle"), (0, _.G)("".concat(f.cdn, "/dist/js/katex/katex.min.js?v=0.16.9"), "vditorKatexScript").then(function() {
                    (0, _.G)("".concat(f.cdn, "/dist/js/katex/mhchem.min.js?v=0.16.9"), "vditorKatexChemScript").then(function() {
                      v.forEach(function(s) {
                        if (!(s.parentElement.classList.contains("vditor-wysiwyg__pre") || s.parentElement.classList.contains("vditor-ir__marker--pre")) && !s.getAttribute("data-math")) {
                          var C = (0, l.X)(g.mathRenderAdapter.getCode(s));
                          s.setAttribute("data-math", C);
                          try {
                            s.innerHTML = katex.renderToString(C, {
                              displayMode: s.tagName === "DIV",
                              output: "html",
                              macros: f.math.macros
                            });
                          } catch (A) {
                            s.innerHTML = A.message, s.className = "language-math vditor-reset--error";
                          }
                          s.addEventListener("copy", function(A) {
                            A.stopPropagation(), A.preventDefault();
                            var H = A.currentTarget.closest(".language-math");
                            A.clipboardData.setData("text/html", H.innerHTML), A.clipboardData.setData("text/plain", H.getAttribute("data-math"));
                          });
                        }
                      });
                    });
                  });
                else if (f.math.engine === "MathJax") {
                  var b = function(s) {
                    if (s.length !== 0) {
                      var C = 0, A = s[s.length - 1], H = function() {
                        var M = s[C++];
                        M === A ? M() : M(H);
                      };
                      H();
                    }
                  };
                  window.MathJax || (window.MathJax = {
                    loader: {
                      paths: { mathjax: "".concat(f.cdn, "/dist/js/mathjax") }
                    },
                    startup: {
                      typeset: !1
                    },
                    tex: {
                      macros: f.math.macros
                    }
                  }, Object.assign(window.MathJax, f.math.mathJaxOptions)), (0, _.J)("".concat(f.cdn, "/dist/js/mathjax/tex-svg-full.js"), "protyleMathJaxScript");
                  var y = function(s, C) {
                    var A = (0, l.X)(s.textContent).trim(), H = window.MathJax.getMetricsFor(s);
                    H.display = s.tagName === "DIV", window.MathJax.tex2svgPromise(A, H).then(function(M) {
                      s.innerHTML = "", s.setAttribute("data-math", A), s.append(M), window.MathJax.startup.document.clear(), window.MathJax.startup.document.updateDocument();
                      var P = M.querySelector('[data-mml-node="merror"]');
                      P && P.textContent.trim() !== "" && (s.innerHTML = P.textContent.trim(), s.className = "vditor-reset--error"), C && C();
                    });
                  };
                  window.MathJax.startup.promise.then(function() {
                    for (var s = [], C = function(H) {
                      var M = v[H];
                      !M.parentElement.classList.contains("vditor-wysiwyg__pre") && !M.parentElement.classList.contains("vditor-ir__marker--pre") && !M.getAttribute("data-math") && (0, l.X)(M.textContent).trim() && s.push(function(P) {
                        H === v.length - 1 ? y(M) : y(M, P);
                      });
                    }, A = 0; A < v.length; A++)
                      C(A);
                    b(s);
                  });
                }
              }
            };
          }
        ),
        /***/
        431: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              Y: () => (
                /* binding */
                g
              )
              /* harmony export */
            });
            var x = L(446), _ = function(p, m) {
              p.insertAdjacentHTML("afterend", '<video controls="controls" src="'.concat(m, '"></video>')), p.remove();
            }, c = function(p, m) {
              p.insertAdjacentHTML("afterend", '<audio controls="controls" src="'.concat(m, '"></audio>')), p.remove();
            }, l = function(p, m) {
              var f = m.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/), v = m.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/), w = m.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/), b = m.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/), y = m.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/), s = m.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/), C = m.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/), A = m.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
              if (f && f[1].length === 11)
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//www.youtube.com/embed/'.concat(f[1] + (f[2] ? "?start=" + f[2] : ""), '"></iframe>')), p.remove();
              else if (v && v[1])
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//player.youku.com/embed/'.concat(v[1], '"></iframe>')), p.remove();
              else if (w && w[1])
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="https://v.qq.com/txp/iframe/player.html?vid='.concat(w[1], '"></iframe>')), p.remove();
              else if (b && b[1])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="//coub.com/embed/`.concat(b[1], '?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>')), p.remove();
              else if (y && y[0])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.facebook.com/plugins/video.php?href=`.concat(encodeURIComponent(y[0]), '"></iframe>')), p.remove();
              else if (s && s[2])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.dailymotion.com/embed/video/`.concat(s[2], '"></iframe>')), p.remove();
              else if (m.indexOf("bilibili.com") > -1 && (m.indexOf("bvid=") > -1 || C && C[1])) {
                var H = {
                  bvid: (0, x.on)("bvid", m) || C && C[1],
                  page: "1",
                  high_quality: "1",
                  as_wide: "1",
                  allowfullscreen: "true",
                  autoplay: "0"
                };
                new URL(m.startsWith("http") ? m : "https:" + m).search.split("&").forEach(function(V, G) {
                  if (V) {
                    G === 0 && (V = V.substr(1));
                    var Q = V.split("=");
                    H[Q[0]] = Q[1];
                  }
                });
                var M = "https://player.bilibili.com/player.html?", P = Object.keys(H);
                P.forEach(function(V, G) {
                  M += "".concat(V, "=").concat(H[V]), G < P.length - 1 && (M += "&");
                }), p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="'.concat(M, '"></iframe>')), p.remove();
              } else A && A[1] && (p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//embed.ted.com/talks/'.concat(A[1], '"></iframe>')), p.remove());
            }, g = function(p) {
              p && p.querySelectorAll("a").forEach(function(m) {
                var f = m.getAttribute("href");
                f && (f.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/) ? _(m, f) : f.match(/^.+.(mp3|wav|flac)$/) ? c(m, f) : l(m, f));
              });
            };
          }
        ),
        /***/
        570: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              i: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = L(446), g = function(f, v, w, b) {
              function y(s) {
                return s instanceof w ? s : new w(function(C) {
                  C(s);
                });
              }
              return new (w || (w = Promise))(function(s, C) {
                function A(P) {
                  try {
                    M(b.next(P));
                  } catch (V) {
                    C(V);
                  }
                }
                function H(P) {
                  try {
                    M(b.throw(P));
                  } catch (V) {
                    C(V);
                  }
                }
                function M(P) {
                  P.done ? s(P.value) : y(P.value).then(A, H);
                }
                M((b = b.apply(f, [])).next());
              });
            }, p = function(f, v) {
              var w = { label: 0, sent: function() {
                if (s[0] & 1) throw s[1];
                return s[1];
              }, trys: [], ops: [] }, b, y, s, C;
              return C = { next: A(0), throw: A(1), return: A(2) }, typeof Symbol == "function" && (C[Symbol.iterator] = function() {
                return this;
              }), C;
              function A(M) {
                return function(P) {
                  return H([M, P]);
                };
              }
              function H(M) {
                if (b) throw new TypeError("Generator is already executing.");
                for (; C && (C = 0, M[0] && (w = 0)), w; ) try {
                  if (b = 1, y && (s = M[0] & 2 ? y.return : M[0] ? y.throw || ((s = y.return) && s.call(y), 0) : y.next) && !(s = s.call(y, M[1])).done) return s;
                  switch (y = 0, s && (M = [M[0] & 2, s.value]), M[0]) {
                    case 0:
                    case 1:
                      s = M;
                      break;
                    case 4:
                      return w.label++, { value: M[1], done: !1 };
                    case 5:
                      w.label++, y = M[1], M = [0];
                      continue;
                    case 7:
                      M = w.ops.pop(), w.trys.pop();
                      continue;
                    default:
                      if (s = w.trys, !(s = s.length > 0 && s[s.length - 1]) && (M[0] === 6 || M[0] === 2)) {
                        w = 0;
                        continue;
                      }
                      if (M[0] === 3 && (!s || M[1] > s[0] && M[1] < s[3])) {
                        w.label = M[1];
                        break;
                      }
                      if (M[0] === 6 && w.label < s[1]) {
                        w.label = s[1], s = M;
                        break;
                      }
                      if (s && w.label < s[2]) {
                        w.label = s[2], w.ops.push(M);
                        break;
                      }
                      s[2] && w.ops.pop(), w.trys.pop();
                      continue;
                  }
                  M = v.call(f, w);
                } catch (P) {
                  M = [6, P], y = 0;
                } finally {
                  b = s = 0;
                }
                if (M[0] & 5) throw M[1];
                return { value: M[0] ? M[1] : void 0, done: !0 };
              }
            }, m = function(f, v, w) {
              f === void 0 && (f = document), v === void 0 && (v = x.g.CDN);
              var b = c.mermaidRenderAdapter.getElements(f);
              b.length !== 0 && (0, _.G)("".concat(v, "/dist/js/mermaid/mermaid.min.js"), "vditorMermaidScript").then(function() {
                var y = {
                  securityLevel: "loose",
                  altFontFamily: "sans-serif",
                  fontFamily: "sans-serif",
                  startOnLoad: !1,
                  flowchart: {
                    htmlLabels: !0,
                    useMaxWidth: !0
                  },
                  sequence: {
                    useMaxWidth: !0,
                    diagramMarginX: 8,
                    diagramMarginY: 8,
                    boxMargin: 8,
                    showSequenceNumbers: !0
                    // Mermaid 时序图增加序号 https://github.com/siyuan-note/siyuan/pull/6992 https://mermaid.js.org/syntax/sequenceDiagram.html#sequencenumbers
                  },
                  gantt: {
                    leftPadding: 75,
                    rightPadding: 20
                  }
                };
                w === "dark" && (y.theme = "dark"), mermaid.initialize(y), b.forEach(function(s) {
                  return g(void 0, void 0, void 0, function() {
                    var C, A, H, M, P;
                    return p(this, function(V) {
                      switch (V.label) {
                        case 0:
                          if (C = c.mermaidRenderAdapter.getCode(s), s.getAttribute("data-processed") === "true" || C.trim() === "")
                            return [
                              2
                              /*return*/
                            ];
                          A = "mermaid" + (0, l.Wb)(), V.label = 1;
                        case 1:
                          return V.trys.push([1, 3, , 4]), [4, mermaid.render(A, s.textContent)];
                        case 2:
                          return H = V.sent(), s.innerHTML = H.svg, [3, 4];
                        case 3:
                          return M = V.sent(), P = document.querySelector("#" + A), s.innerHTML = "".concat(P.outerHTML, `<br>
<div style="text-align: left"><small>`).concat(M.message.replace(/\n/, "<br>"), "</small></div>"), P.parentElement.remove(), [3, 4];
                        case 4:
                          return s.setAttribute("data-processed", "true"), [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                });
              });
            };
          }
        ),
        /***/
        558: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              P: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = function(g, p, m) {
              g === void 0 && (g = document), p === void 0 && (p = x.g.CDN);
              var f = c.mindmapRenderAdapter.getElements(g);
              f.length > 0 && (0, _.G)("".concat(p, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                f.forEach(function(v) {
                  if (!(v.parentElement.classList.contains("vditor-wysiwyg__pre") || v.parentElement.classList.contains("vditor-ir__marker--pre"))) {
                    var w = c.mindmapRenderAdapter.getCode(v);
                    if (w)
                      try {
                        if (v.getAttribute("data-processed") === "true")
                          return;
                        echarts.init(v, m === "dark" ? "dark" : void 0).setOption({
                          series: [
                            {
                              data: [JSON.parse(decodeURIComponent(w))],
                              initialTreeDepth: -1,
                              itemStyle: {
                                borderWidth: 0,
                                color: "#4285f4"
                              },
                              label: {
                                backgroundColor: "#f6f8fa",
                                borderColor: "#d1d5da",
                                borderRadius: 5,
                                borderWidth: 0.5,
                                color: "#586069",
                                lineHeight: 20,
                                offset: [-5, 0],
                                padding: [0, 5],
                                position: "insideRight"
                              },
                              lineStyle: {
                                color: "#d1d5da",
                                width: 1
                              },
                              roam: !0,
                              symbol: function(b, y) {
                                var s;
                                return !((s = y == null ? void 0 : y.data) === null || s === void 0) && s.children ? "circle" : "path://";
                              },
                              type: "tree"
                            }
                          ],
                          tooltip: {
                            trigger: "item",
                            triggerOn: "mousemove"
                          }
                        }), v.setAttribute("data-processed", "true");
                      } catch (b) {
                        v.className = "vditor-reset--error", v.innerHTML = "mindmap render error: <br>".concat(b);
                      }
                  }
                });
              });
            };
          }
        ),
        /***/
        182: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              k: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var x = L(946), _ = L(982), c = function(l, g, p) {
              var m = "", f = [];
              if (Array.from(l.children).forEach(function(y, s) {
                if ((0, x.W)(y)) {
                  if (p) {
                    var C = y.id.lastIndexOf("_");
                    y.id = y.id.substring(0, C === -1 ? void 0 : C) + "_" + s;
                  }
                  f.push(y.id), m += y.outerHTML.replace("<wbr>", "");
                }
              }), m === "")
                return g.innerHTML = "", "";
              var v = document.createElement("div");
              if (p)
                p.lute.SetToC(!0), p.currentMode === "wysiwyg" && !p.preview.element.contains(l) ? v.innerHTML = p.lute.SpinVditorDOM("<p>[ToC]</p>" + m) : p.currentMode === "ir" && !p.preview.element.contains(l) ? v.innerHTML = p.lute.SpinVditorIRDOM("<p>[ToC]</p>" + m) : v.innerHTML = p.lute.HTML2VditorDOM("<p>[ToC]</p>" + m), p.lute.SetToC(p.options.preview.markdown.toc);
              else {
                g.classList.add("vditor-outline");
                var w = Lute.New();
                w.SetToC(!0), v.innerHTML = w.HTML2VditorDOM("<p>[ToC]</p>" + m);
              }
              var b = v.firstElementChild.querySelectorAll("li > span[data-target-id]");
              return b.forEach(function(y, s) {
                if (y.nextElementSibling && y.nextElementSibling.tagName === "UL") {
                  var C = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
                  document.getElementById("vditorIconScript") || (C = '<svg class="vditor-outline__action" viewBox="0 0 32 32"><path d="M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z"></path></svg>'), y.innerHTML = "".concat(C, "<span>").concat(y.innerHTML, "</span>");
                } else
                  y.innerHTML = "<svg></svg><span>".concat(y.innerHTML, "</span>");
                y.setAttribute("data-target-id", f[s]);
              }), m = v.firstElementChild.innerHTML, b.length === 0 ? (g.innerHTML = "", m) : (g.innerHTML = m, p && (0, _.H)(g, {
                cdn: p.options.cdn,
                math: p.options.preview.math
              }), g.firstElementChild.addEventListener("click", function(y) {
                for (var s = y.target; s && !s.isEqualNode(g); ) {
                  if (s.classList.contains("vditor-outline__action")) {
                    s.classList.contains("vditor-outline__action--close") ? (s.classList.remove("vditor-outline__action--close"), s.parentElement.nextElementSibling.setAttribute("style", "display:block")) : (s.classList.add("vditor-outline__action--close"), s.parentElement.nextElementSibling.setAttribute("style", "display:none")), y.preventDefault(), y.stopPropagation();
                    break;
                  } else if (s.getAttribute("data-target-id")) {
                    y.preventDefault(), y.stopPropagation();
                    var C = document.getElementById(s.getAttribute("data-target-id"));
                    if (!C)
                      return;
                    if (p)
                      if (p.options.height === "auto") {
                        var A = C.offsetTop + p.element.offsetTop;
                        p.options.toolbarConfig.pin || (A += p.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, A);
                      } else
                        p.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, p.element.offsetTop), p.preview.element.contains(l) ? l.parentElement.scrollTop = C.offsetTop : l.scrollTop = C.offsetTop;
                    else
                      window.scrollTo(window.scrollX, C.offsetTop);
                    break;
                  }
                  s = s.parentElement;
                }
              }), m);
            };
          }
        ),
        /***/
        931: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              B: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = L(793), _ = L(998), c = L(781), l = function(g, p) {
              g === void 0 && (g = document), p === void 0 && (p = x.g.CDN);
              var m = c.plantumlRenderAdapter.getElements(g);
              m.length !== 0 && (0, _.G)("".concat(p, "/dist/js/plantuml/plantuml-encoder.min.js"), "vditorPlantumlScript").then(function() {
                m.forEach(function(f) {
                  if (!(f.parentElement.classList.contains("vditor-wysiwyg__pre") || f.parentElement.classList.contains("vditor-ir__marker--pre"))) {
                    var v = c.plantumlRenderAdapter.getCode(f).trim();
                    if (v)
                      try {
                        f.innerHTML = '<object type="image/svg+xml" data="https://www.plantuml.com/plantuml/svg/~1'.concat(plantumlEncoder.encode(v), '"/>');
                      } catch (w) {
                        f.className = "vditor-reset--error", f.innerHTML = "plantuml render error: <br>".concat(w);
                      }
                  }
                });
              });
            };
          }
        ),
        /***/
        65: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              X: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(_) {
              var c = Lute.New();
              return c.PutEmojis(_.emojis), c.SetEmojiSite(_.emojiSite), c.SetHeadingAnchor(_.headingAnchor), c.SetInlineMathAllowDigitAfterOpenMarker(_.inlineMathDigit), c.SetAutoSpace(_.autoSpace), c.SetToC(_.toc), c.SetFootnotes(_.footnotes), c.SetFixTermTypo(_.fixTermTypo), c.SetVditorCodeBlockPreview(_.codeBlockPreview), c.SetVditorMathBlockPreview(_.mathBlockPreview), c.SetSanitize(_.sanitize), c.SetChineseParagraphBeginningSpace(_.paragraphBeginningSpace), c.SetRenderListStyle(_.listStyle), c.SetLinkBase(_.linkBase), c.SetLinkPrefix(_.linkPrefix), c.SetMark(_.mark), c.SetGFMAutoLink(_.gfmAutoLink), _.lazyLoadImage && c.SetImageLazyLoading(_.lazyLoadImage), c;
            };
          }
        ),
        /***/
        971: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              E: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(_, c, l) {
              l === void 0 && (l = "classic");
              var g = _.getBoundingClientRect(), p = 36;
              document.body.insertAdjacentHTML("beforeend", '<div class="vditor vditor-img'.concat(l === "dark" ? " vditor--dark" : "", `">
    <div class="vditor-img__bar">
      <span class="vditor-img__btn" data-deg="0">
        <svg><use xlink:href="#vditor-icon-redo"></use></svg>
        `).concat(window.VditorI18n.spin, `
      </span>
      <span class="vditor-img__btn"  onclick="this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''">
        X &nbsp;`).concat(window.VditorI18n.close, `
      </span>
    </div>
    <div class="vditor-img__img" onclick="this.parentElement.outerHTML = '';document.body.style.overflow = ''">
      <img style="width: `).concat(_.width, "px;height:").concat(_.height, "px;transform: translate3d(").concat(g.left, "px, ").concat(g.top - p, 'px, 0)" src="').concat(_.getAttribute("src"), `">
    </div>
</div>`)), document.body.style.overflow = "hidden";
              var m = document.querySelector(".vditor-img img"), f = "translate3d(".concat(Math.max(0, window.innerWidth - _.naturalWidth) / 2, "px, ").concat(Math.max(0, window.innerHeight - p - _.naturalHeight) / 2, "px, 0)");
              setTimeout(function() {
                m.setAttribute("style", "transition: transform .3s ease-in-out;transform: ".concat(f)), setTimeout(function() {
                  m.parentElement.scrollTo((m.parentElement.scrollWidth - m.parentElement.clientWidth) / 2, (m.parentElement.scrollHeight - m.parentElement.clientHeight) / 2);
                }, 400);
              });
              var v = document.querySelector(".vditor-img__btn");
              v.addEventListener("click", function() {
                var w = parseInt(v.getAttribute("data-deg"), 10) + 90;
                w / 90 % 2 === 1 && _.naturalWidth > m.parentElement.clientHeight ? m.style.transform = "translate3d(".concat(Math.max(0, window.innerWidth - _.naturalWidth) / 2, "px, ").concat(_.naturalWidth / 2 - _.naturalHeight / 2, "px, 0) rotateZ(").concat(w, "deg)") : m.style.transform = "".concat(f, " rotateZ(").concat(w, "deg)"), v.setAttribute("data-deg", w.toString()), setTimeout(function() {
                  m.parentElement.scrollTo((m.parentElement.scrollWidth - m.parentElement.clientWidth) / 2, (m.parentElement.scrollHeight - m.parentElement.clientHeight) / 2);
                }, 400);
              });
            };
          }
        ),
        /***/
        34: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              Y: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var x = L(793), _ = L(296), c = function(l, g) {
              g === void 0 && (g = x.g.CDN), x.g.CODE_THEME.includes(l) || (l = "github");
              var p = document.getElementById("vditorHljsStyle"), m = "".concat(g, "/dist/js/highlight.js/styles/").concat(l, ".css");
              p ? p.getAttribute("href") !== m && (p.remove(), (0, _.c)(m, "vditorHljsStyle")) : (0, _.c)(m, "vditorHljsStyle");
            };
          }
        ),
        /***/
        652: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              Z: () => (
                /* binding */
                _
              )
              /* harmony export */
            });
            var x = L(296), _ = function(c, l) {
              if (!(!c || !l)) {
                var g = document.getElementById("vditorContentTheme"), p = "".concat(l, "/").concat(c, ".css");
                g ? g.getAttribute("href") !== p && (g.remove(), (0, x.c)(p, "vditorContentTheme")) : (0, x.c)(p, "vditorContentTheme");
              }
            };
          }
        ),
        /***/
        998: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              G: () => (
                /* binding */
                _
              ),
              /* harmony export */
              J: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(c, l) {
              if (document.getElementById(l))
                return !1;
              var g = new XMLHttpRequest();
              g.open("GET", c, !1), g.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"), g.send("");
              var p = document.createElement("script");
              p.type = "text/javascript", p.text = g.responseText, p.id = l, document.head.appendChild(p);
            }, _ = function(c, l) {
              return new Promise(function(g, p) {
                if (document.getElementById(l))
                  return g(!0), !1;
                var m = document.createElement("script");
                m.src = c, m.async = !0, document.head.appendChild(m), m.onerror = function(f) {
                  p(f);
                }, m.onload = function() {
                  if (document.getElementById(l))
                    return m.remove(), g(!0), !1;
                  m.id = l, g(!0);
                };
              });
            };
          }
        ),
        /***/
        296: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              c: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(_, c) {
              if (!document.getElementById(c)) {
                var l = document.createElement("link");
                l.id = c, l.rel = "stylesheet", l.type = "text/css", l.href = _, document.getElementsByTagName("head")[0].appendChild(l);
              }
            };
          }
        ),
        /***/
        528: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              X: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(_) {
              return _.replace(/\u00a0/g, " ");
            };
          }
        ),
        /***/
        796: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              G6: () => (
                /* binding */
                x
              ),
              /* harmony export */
              Le: () => (
                /* binding */
                l
              ),
              /* harmony export */
              i7: () => (
                /* binding */
                m
              ),
              /* harmony export */
              ns: () => (
                /* binding */
                p
              ),
              /* harmony export */
              pK: () => (
                /* binding */
                c
              ),
              /* harmony export */
              vU: () => (
                /* binding */
                _
              ),
              /* harmony export */
              yl: () => (
                /* binding */
                g
              )
              /* harmony export */
            });
            var x = function() {
              return navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1;
            }, _ = function() {
              return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            }, c = function() {
              try {
                return typeof localStorage < "u";
              } catch {
                return !1;
              }
            }, l = function() {
              return navigator.userAgent.indexOf("iPhone") > -1 ? "touchstart" : "click";
            }, g = function(f) {
              return navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? !!(f.metaKey && !f.ctrlKey) : !!(!f.metaKey && f.ctrlKey);
            }, p = function(f) {
              return /Mac/.test(navigator.platform) || navigator.platform === "iPhone" ? f.indexOf("⇧") > -1 && _() && (f = f.replace(";", ":").replace("=", "+").replace("-", "_")) : (f.startsWith("⌘") ? f = f.replace("⌘", "⌘+") : f.startsWith("⌥") && f.substr(1, 1) !== "⌘" ? f = f.replace("⌥", "⌥+") : f = f.replace("⇧⌘", "⌘+⇧+").replace("⌥⌘", "⌥+⌘+"), f = f.replace("⌘", "Ctrl").replace("⇧", "Shift").replace("⌥", "Alt"), f.indexOf("Shift") > -1 && (f = f.replace(";", ":").replace("=", "+").replace("-", "_"))), f;
            }, m = function() {
              return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            };
          }
        ),
        /***/
        446: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              Qf: () => (
                /* binding */
                c
              ),
              /* harmony export */
              Wb: () => (
                /* binding */
                x
              ),
              /* harmony export */
              on: () => (
                /* binding */
                _
              )
              /* harmony export */
            });
            var x = function() {
              return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(l) {
                return (parseInt(l, 10) ^ window.crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> parseInt(l, 10) / 4).toString(16);
              });
            }, _ = function(l, g) {
              g === void 0 && (g = window.location.search);
              var p = g.substring(g.indexOf("?")), m = p.indexOf("#"), f = new URLSearchParams(p.substring(0, m >= 0 ? m : void 0));
              return f.get(l);
            }, c = function(l) {
              return Function('"use strict";return ('.concat(l, ")"))();
            };
          }
        ),
        /***/
        118: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              DX: () => (
                /* binding */
                v
              ),
              /* harmony export */
              E2: () => (
                /* binding */
                c
              ),
              /* harmony export */
              F9: () => (
                /* binding */
                p
              ),
              /* harmony export */
              JQ: () => (
                /* binding */
                _
              ),
              /* harmony export */
              O9: () => (
                /* binding */
                l
              ),
              /* harmony export */
              a1: () => (
                /* binding */
                g
              ),
              /* harmony export */
              fb: () => (
                /* binding */
                f
              ),
              /* harmony export */
              lG: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = L(946), _ = function(w, b) {
              for (var y = f(w, b), s = !1, C = !1; y && !y.classList.contains("vditor-reset") && !C; )
                s = f(y.parentElement, b), s ? y = s : C = !0;
              return y || !1;
            }, c = function(w, b) {
              for (var y = (0, x.S)(w, b), s = !1, C = !1; y && !y.classList.contains("vditor-reset") && !C; )
                s = (0, x.S)(y.parentElement, b), s ? y = s : C = !0;
              return y || !1;
            }, l = function(w) {
              var b = c(w, "UL"), y = c(w, "OL"), s = b;
              return y && (!b || b && y.contains(b)) && (s = y), s;
            }, g = function(w, b, y) {
              if (!w)
                return !1;
              w.nodeType === 3 && (w = w.parentElement);
              for (var s = w, C = !1; s && !C && !s.classList.contains("vditor-reset"); )
                s.getAttribute(b) === y ? C = !0 : s = s.parentElement;
              return C && s;
            }, p = function(w) {
              if (!w)
                return !1;
              w.nodeType === 3 && (w = w.parentElement);
              var b = w, y = !1, s = g(w, "data-block", "0");
              if (s)
                return s;
              for (; b && !y && !b.classList.contains("vditor-reset"); )
                b.tagName === "H1" || b.tagName === "H2" || b.tagName === "H3" || b.tagName === "H4" || b.tagName === "H5" || b.tagName === "H6" || b.tagName === "P" || b.tagName === "BLOCKQUOTE" || b.tagName === "OL" || b.tagName === "UL" ? y = !0 : b = b.parentElement;
              return y && b;
            }, m = function(w, b) {
              if (!w)
                return !1;
              w.nodeType === 3 && (w = w.parentElement);
              for (var y = w, s = !1; y && !s && !y.classList.contains("vditor-reset"); )
                y.nodeName === b ? s = !0 : y = y.parentElement;
              return s && y;
            }, f = function(w, b) {
              if (!w)
                return !1;
              w.nodeType === 3 && (w = w.parentElement);
              for (var y = w, s = !1; y && !s && !y.classList.contains("vditor-reset"); )
                y.classList.contains(b) ? s = !0 : y = y.parentElement;
              return s && y;
            }, v = function(w) {
              for (; w && w.lastChild; )
                w = w.lastChild;
              return w;
            };
          }
        ),
        /***/
        946: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              S: () => (
                /* binding */
                x
              ),
              /* harmony export */
              W: () => (
                /* binding */
                _
              )
              /* harmony export */
            });
            var x = function(c, l) {
              if (!c)
                return !1;
              c.nodeType === 3 && (c = c.parentElement);
              for (var g = c, p = !1; g && !p && !g.classList.contains("vditor-reset"); )
                g.nodeName.indexOf(l) === 0 ? p = !0 : g = g.parentElement;
              return p && g;
            }, _ = function(c) {
              var l = x(c, "H");
              return l && l.tagName.length === 2 && l.tagName !== "HR" ? l : !1;
            };
          }
        ),
        /***/
        2: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              T: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function() {
              for (var _ = [], c = 0; c < arguments.length; c++)
                _[c] = arguments[c];
              for (var l = {}, g = function(m) {
                for (var f in m)
                  m.hasOwnProperty(f) && (Object.prototype.toString.call(m[f]) === "[object Object]" ? l[f] = x(l[f], m[f]) : l[f] = m[f]);
              }, p = 0; p < _.length; p++)
                g(_[p]);
              return l;
            };
          }
        ),
        /***/
        307: (
          /***/
          (J, E, L) => {
            L.d(E, {
              /* harmony export */
              $j: () => (
                /* binding */
                v
              ),
              /* harmony export */
              Gb: () => (
                /* binding */
                p
              ),
              /* harmony export */
              Hc: () => (
                /* binding */
                m
              ),
              /* harmony export */
              Ny: () => (
                /* binding */
                g
              ),
              /* harmony export */
              ib: () => (
                /* binding */
                w
              ),
              /* harmony export */
              im: () => (
                /* binding */
                f
              ),
              /* harmony export */
              oC: () => (
                /* binding */
                b
              ),
              /* harmony export */
              zh: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = L(793), _ = L(796), c = L(118), l = function(y) {
              var s, C = y[y.currentMode].element;
              return getSelection().rangeCount > 0 && (s = getSelection().getRangeAt(0), C.isEqualNode(s.startContainer) || C.contains(s.startContainer)) ? s : y[y.currentMode].range ? y[y.currentMode].range : (C.focus(), s = C.ownerDocument.createRange(), s.setStart(C, 0), s.collapse(!0), s);
            }, g = function(y) {
              var s = window.getSelection().getRangeAt(0);
              if (!y.contains(s.startContainer) && !(0, c.fb)(s.startContainer, "vditor-panel--none"))
                return {
                  left: 0,
                  top: 0
                };
              var C = y.parentElement.getBoundingClientRect(), A;
              if (s.getClientRects().length === 0)
                if (s.startContainer.nodeType === 3) {
                  var H = s.startContainer.parentElement;
                  if (H && H.getClientRects().length > 0)
                    A = H.getClientRects()[0];
                  else
                    return {
                      left: 0,
                      top: 0
                    };
                } else {
                  var M = s.startContainer.children;
                  if (M[s.startOffset] && M[s.startOffset].getClientRects().length > 0)
                    A = M[s.startOffset].getClientRects()[0];
                  else if (s.startContainer.childNodes.length > 0) {
                    var P = s.cloneRange();
                    s.selectNode(s.startContainer.childNodes[Math.max(0, s.startOffset - 1)]), A = s.getClientRects()[0], s.setEnd(P.endContainer, P.endOffset), s.setStart(P.startContainer, P.startOffset);
                  } else
                    A = s.startContainer.getClientRects()[0];
                  if (!A) {
                    for (var V = s.startContainer.childNodes[s.startOffset]; !V.getClientRects || V.getClientRects && V.getClientRects().length === 0; )
                      V = V.parentElement;
                    A = V.getClientRects()[0];
                  }
                }
              else
                A = s.getClientRects()[0];
              return {
                left: A.left - C.left,
                top: A.top - C.top
              };
            }, p = function(y, s) {
              if (!s) {
                if (getSelection().rangeCount === 0)
                  return !1;
                s = getSelection().getRangeAt(0);
              }
              var C = s.commonAncestorContainer;
              return y.isEqualNode(C) || y.contains(C);
            }, m = function(y) {
              var s = window.getSelection();
              s.removeAllRanges(), s.addRange(y);
            }, f = function(y, s, C) {
              var A = {
                end: 0,
                start: 0
              };
              if (!C) {
                if (getSelection().rangeCount === 0)
                  return A;
                C = window.getSelection().getRangeAt(0);
              }
              if (p(s, C)) {
                var H = C.cloneRange();
                y.childNodes[0] && y.childNodes[0].childNodes[0] ? H.setStart(y.childNodes[0].childNodes[0], 0) : H.selectNodeContents(y), H.setEnd(C.startContainer, C.startOffset), A.start = H.toString().length, A.end = A.start + C.toString().length;
              }
              return A;
            }, v = function(y, s, C) {
              var A = 0, H = 0, M = C.childNodes[H], P = !1, V = !1;
              y = Math.max(0, y), s = Math.max(0, s);
              var G = C.ownerDocument.createRange();
              for (G.setStart(M || C, 0), G.collapse(!0); !V && M; ) {
                var Q = A + M.textContent.length;
                if (!P && y >= A && y <= Q && (y === 0 ? G.setStart(M, 0) : M.childNodes[0].nodeType === 3 ? G.setStart(M.childNodes[0], y - A) : M.nextSibling ? G.setStartBefore(M.nextSibling) : G.setStartAfter(M), P = !0, y === s)) {
                  V = !0;
                  break;
                }
                P && s >= A && s <= Q && (s === 0 ? G.setEnd(M, 0) : M.childNodes[0].nodeType === 3 ? G.setEnd(M.childNodes[0], s - A) : M.nextSibling ? G.setEndBefore(M.nextSibling) : G.setEndAfter(M), V = !0), A = Q, M = C.childNodes[++H];
              }
              return !V && C.childNodes[H - 1] && G.setStartBefore(C.childNodes[H - 1]), m(G), G;
            }, w = function(y, s) {
              var C = y.querySelector("wbr");
              if (C) {
                if (!C.previousElementSibling)
                  C.previousSibling ? s.setStart(C.previousSibling, C.previousSibling.textContent.length) : C.nextSibling ? C.nextSibling.nodeType === 3 ? s.setStart(C.nextSibling, 0) : s.setStartBefore(C.nextSibling) : s.setStart(C.parentElement, 0);
                else if (C.previousElementSibling.isSameNode(C.previousSibling))
                  if (C.previousElementSibling.lastChild) {
                    s.setStartBefore(C), s.collapse(!0), m(s), (0, _.i7)() && (C.previousElementSibling.tagName === "EM" || C.previousElementSibling.tagName === "STRONG" || C.previousElementSibling.tagName === "S") && (s.insertNode(document.createTextNode(x.g.ZWSP)), s.collapse(!1)), C.remove();
                    return;
                  } else
                    s.setStartAfter(C.previousElementSibling);
                else
                  s.setStart(C.previousSibling, C.previousSibling.textContent.length);
                s.collapse(!0), C.remove(), m(s);
              }
            }, b = function(y, s) {
              var C = document.createElement("div");
              C.innerHTML = y;
              var A = C.querySelectorAll("p");
              A.length === 1 && !A[0].previousSibling && !A[0].nextSibling && s[s.currentMode].element.children.length > 0 && C.firstElementChild.tagName === "P" && (y = A[0].innerHTML.trim());
              var H = document.createElement("div");
              H.innerHTML = y;
              var M = l(s);
              if (M.toString() !== "" && (s[s.currentMode].preventInput = !0, document.execCommand("delete", !1, "")), H.firstElementChild && H.firstElementChild.getAttribute("data-block") === "0") {
                H.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
                var P = (0, c.F9)(M.startContainer);
                P ? P.insertAdjacentHTML("afterend", H.innerHTML) : s[s.currentMode].element.insertAdjacentHTML("beforeend", H.innerHTML), w(s[s.currentMode].element, M);
              } else {
                var V = document.createElement("template");
                V.innerHTML = y, M.insertNode(V.content.cloneNode(!0)), M.collapse(!1), m(M);
              }
            };
          }
        )
        /******/
      }, St = {};
      function ee(J) {
        var E = St[J];
        if (E !== void 0)
          return E.exports;
        var L = St[J] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        return Kt[J](L, L.exports, ee), L.exports;
      }
      ee.d = (J, E) => {
        for (var L in E)
          ee.o(E, L) && !ee.o(J, L) && Object.defineProperty(J, L, { enumerable: !0, get: E[L] });
      }, ee.o = (J, E) => Object.prototype.hasOwnProperty.call(J, E), ee.r = (J) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(J, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(J, "__esModule", { value: !0 });
      };
      var st = {};
      return (() => {
        ee.d(st, {
          default: () => (
            /* binding */
            yi
          )
        });
        var J = ee(664), E = ee(793), L = ee(528), x = function(e) {
          return e.currentMode === "sv" ? (0, L.X)("".concat(e.sv.element.textContent, `
`).replace(/\n\n$/, `
`)) : e.currentMode === "wysiwyg" ? e.lute.VditorDOM2Md(e.wysiwyg.element.innerHTML) : e.currentMode === "ir" ? e.lute.VditorIRDOM2Md(e.ir.element.innerHTML) : "";
        }, _ = ee(998), c = (
          /** @class */
          function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-devtools", this.element.innerHTML = '<div class="vditor-reset--error"></div><div style="height: 100%;"></div>';
            }
            return e.prototype.renderEchart = function(t) {
              var n = this;
              t.devtools.element.style.display === "block" && (0, _.G)("".concat(t.options.cdn, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                n.ASTChart || (n.ASTChart = echarts.init(t.devtools.element.lastElementChild));
                try {
                  n.element.lastElementChild.style.display = "block", n.element.firstElementChild.innerHTML = "", n.ASTChart.setOption({
                    series: [
                      {
                        data: JSON.parse(t.lute.RenderEChartsJSON(x(t))),
                        initialTreeDepth: -1,
                        label: {
                          align: "left",
                          backgroundColor: "rgba(68, 77, 86, .68)",
                          borderRadius: 3,
                          color: "#d1d5da",
                          fontSize: 12,
                          lineHeight: 12,
                          offset: [9, 12],
                          padding: [2, 4, 2, 4],
                          position: "top",
                          verticalAlign: "middle"
                        },
                        lineStyle: {
                          color: "#4285f4",
                          type: "curve",
                          width: 1
                        },
                        orient: "vertical",
                        roam: !0,
                        type: "tree"
                      }
                    ],
                    toolbox: {
                      bottom: 25,
                      emphasis: {
                        iconStyle: {
                          color: "#4285f4"
                        }
                      },
                      feature: {
                        restore: {
                          show: !0
                        },
                        saveAsImage: {
                          show: !0
                        }
                      },
                      right: 15,
                      show: !0
                    }
                  }), n.ASTChart.resize();
                } catch (r) {
                  n.element.lastElementChild.style.display = "none", n.element.firstElementChild.innerHTML = r;
                }
              });
            }, e;
          }()
        ), l = ee(796), g = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && r.classList.contains("vditor-menu--current") && r.classList.remove("vditor-menu--current");
            }
          });
        }, p = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && !r.classList.contains("vditor-menu--current") && r.classList.add("vditor-menu--current");
            }
          });
        }, m = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && r.classList.contains(E.g.CLASS_MENU_DISABLED) && r.classList.remove(E.g.CLASS_MENU_DISABLED);
            }
          });
        }, f = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && !r.classList.contains(E.g.CLASS_MENU_DISABLED) && r.classList.add(E.g.CLASS_MENU_DISABLED);
            }
          });
        }, v = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "none");
          });
        }, w = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "block");
          });
        }, b = function(e, t, n) {
          t.includes("subToolbar") && (e.toolbar.element.querySelectorAll(".vditor-hint").forEach(function(r) {
            n && r.isEqualNode(n) || (r.style.display = "none");
          }), e.toolbar.elements.emoji && (e.toolbar.elements.emoji.lastElementChild.style.display = "none")), t.includes("hint") && (e.hint.element.style.display = "none"), e.wysiwyg.popover && t.includes("popover") && (e.wysiwyg.popover.style.display = "none");
        }, y = function(e, t, n, r) {
          n.addEventListener((0, l.Le)(), function(i) {
            i.preventDefault(), i.stopPropagation(), !n.classList.contains(E.g.CLASS_MENU_DISABLED) && (e.toolbar.element.querySelectorAll(".vditor-hint--current").forEach(function(a) {
              a.classList.remove("vditor-hint--current");
            }), t.style.display === "block" ? t.style.display = "none" : (b(e, ["subToolbar", "hint", "popover"], n.parentElement.parentElement), n.classList.contains("vditor-tooltipped") || n.classList.add("vditor-hint--current"), t.style.display = "block", e.toolbar.element.getBoundingClientRect().right - n.getBoundingClientRect().right < 250 ? t.classList.add("vditor-panel--left") : t.classList.remove("vditor-panel--left")));
          });
        }, s = ee(118), C = ee(946), A = function(e, t, n, r) {
          r && console.log("".concat(e, " - ").concat(n, ": ").concat(t));
        }, H = ee(386), M = ee(379), P = ee(895), V = ee(169), G = ee(572), Q = ee(702), ne = ee(982), oe = ee(570), me = ee(593), fe = ee(558), le = ee(931), we = ee(474), Me = function(e, t, n) {
          n === void 0 && (n = "sv");
          var r = document.createElement("div");
          r.innerHTML = e;
          var i = !1;
          r.childElementCount === 1 && r.lastElementChild.style.fontFamily.indexOf("monospace") > -1 && (i = !0);
          var a = r.querySelectorAll("pre");
          if (r.childElementCount === 1 && a.length === 1 && a[0].className !== "vditor-wysiwyg" && a[0].className !== "vditor-sv" && (i = !0), e.indexOf(`
<p class="p1">`) === 0 && (i = !0), r.childElementCount === 1 && r.firstElementChild.tagName === "TABLE" && r.querySelector(".line-number") && r.querySelector(".line-content") && (i = !0), i) {
            var o = t || e;
            return /\n/.test(o) || a.length === 1 ? n === "wysiwyg" ? '<div class="vditor-wysiwyg__block" data-block="0" data-type="code-block"><pre><code>'.concat(o.replace(/&/g, "&amp;").replace(/</g, "&lt;"), "<wbr></code></pre></div>") : "\n```\n" + o.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n```" : n === "wysiwyg" ? "<code>".concat(o.replace(/&/g, "&amp;").replace(/</g, "&lt;"), "</code><wbr>") : "`".concat(o, "`");
          }
          return !1;
        }, ve = function(e, t) {
          if (e) {
            if (e.parentElement.getAttribute("data-type") === "html-block") {
              e.setAttribute("data-render", "1");
              return;
            }
            var n = e.firstElementChild.className.replace("language-", "");
            if (n === "abc")
              (0, H.Q)(e, t.options.cdn);
            else if (n === "mermaid")
              (0, oe.i)(e, t.options.cdn, t.options.theme);
            else if (n === "smiles")
              (0, we.J)(e, t.options.cdn, t.options.theme);
            else if (n === "markmap")
              (0, me.K)(e, t.options.cdn);
            else if (n === "flowchart")
              (0, V.P)(e, t.options.cdn);
            else if (n === "echarts")
              (0, M.p)(e, t.options.cdn, t.options.theme);
            else if (n === "mindmap")
              (0, fe.P)(e, t.options.cdn, t.options.theme);
            else if (n === "plantuml")
              (0, le.B)(e, t.options.cdn);
            else if (n === "graphviz")
              (0, G.v)(e, t.options.cdn);
            else if (n === "math")
              (0, ne.H)(e, { cdn: t.options.cdn, math: t.options.preview.math });
            else {
              var r = t.options.customRenders.find(function(i) {
                if (i.language === n)
                  return i.render(e, t), !0;
              });
              r || ((0, Q.s)(Object.assign({}, t.options.preview.hljs), e, t.options.cdn), (0, P.O)(e, t.options.preview.hljs));
            }
            e.setAttribute("data-render", "1");
          }
        }, k = ee(307), Re = function(e) {
          if (e.currentMode !== "sv") {
            var t = e[e.currentMode].element, n = e.outline.render(e);
            n === "" && (n = "[ToC]"), t.querySelectorAll('[data-type="toc-block"]').forEach(function(r) {
              r.innerHTML = n, (0, ne.H)(r, {
                cdn: e.options.cdn,
                math: e.options.preview.math
              });
            });
          }
        }, lt = function(e, t) {
          var n = (0, s.lG)(e.target, "SPAN");
          if (n && (0, s.fb)(n, "vditor-toc")) {
            var r = t[t.currentMode].element.querySelector("#" + n.getAttribute("data-target-id"));
            if (r)
              if (t.options.height === "auto") {
                var i = r.offsetTop + t.element.offsetTop;
                t.options.toolbarConfig.pin || (i += t.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, i);
              } else
                t.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, t.element.offsetTop), t[t.currentMode].element.scrollTop = r.offsetTop;
            return;
          }
        }, ct = function(e, t, n, r) {
          if (e.previousElementSibling && e.previousElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Backspace" && (0, k.im)(e, t[t.currentMode].element, r).start === 0)
              return e.previousElementSibling.remove(), $(t), !0;
            if (Je(t, n, r, e, e.previousElementSibling))
              return !0;
          }
          if (e.nextElementSibling && e.nextElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Delete" && (0, k.im)(e, t[t.currentMode].element, r).start >= e.textContent.trimRight().length)
              return e.nextElementSibling.remove(), $(t), !0;
            if (rt(t, n, r, e, e.nextElementSibling))
              return !0;
          }
          if (n.key === "Backspace" || n.key === "Delete") {
            var i = (0, s.fb)(r.startContainer, "vditor-toc");
            if (i)
              return i.remove(), $(t), !0;
          }
        }, Ue = function(e, t, n, r) {
          n === void 0 && (n = !1);
          var i = (0, s.F9)(t.startContainer);
          if (i && !n && i.getAttribute("data-type") !== "code-block") {
            if (It(i.innerHTML) && i.previousElementSibling || Pt(i.innerHTML))
              return;
            for (
              var a = (0, k.im)(i, e.ir.element, t).start, o = !0, d = a - 1;
              // 软换行后有空格
              d > i.textContent.substr(0, a).lastIndexOf(`
`);
              d--
            )
              if (i.textContent.charAt(d) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
              i.textContent.charAt(d) !== "	") {
                o = !1;
                break;
              }
            a === 0 && (o = !1);
            for (var h = !0, d = a - 1; d < i.textContent.length; d++)
              if (i.textContent.charAt(d) !== " " && i.textContent.charAt(d) !== `
`) {
                h = !1;
                break;
              }
            if (o) {
              typeof e.options.input == "function" && e.options.input(x(e));
              return;
            }
            if (h && /^#{1,6} $/.test(i.textContent) && (h = !1), h) {
              var u = (0, s.fb)(t.startContainer, "vditor-ir__marker");
              if (!u) {
                var S = t.startContainer.previousSibling;
                S && S.nodeType !== 3 && S.classList.contains("vditor-ir__node--expand") && S.classList.remove("vditor-ir__node--expand"), typeof e.options.input == "function" && e.options.input(x(e));
                return;
              }
            }
          }
          if (e.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(Y) {
            Y.classList.remove("vditor-ir__node--expand");
          }), i || (i = e.ir.element), !i.querySelector("wbr")) {
            var T = (0, s.fb)(t.startContainer, "vditor-ir__preview");
            T ? T.previousElementSibling.insertAdjacentHTML("beforeend", "<wbr>") : t.insertNode(document.createElement("wbr"));
          }
          i.querySelectorAll("[style]").forEach(function(Y) {
            Y.removeAttribute("style");
          }), i.getAttribute("data-type") === "link-ref-defs-block" && (i = e.ir.element);
          var I = i.isEqualNode(e.ir.element), R = (0, s.a1)(i, "data-type", "footnotes-block"), O = "";
          if (I)
            O = i.innerHTML;
          else {
            var q = (0, C.S)(t.startContainer, "BLOCKQUOTE"), B = (0, s.O9)(t.startContainer);
            if (B && (i = B), q && (!B || B && !q.contains(B)) && (i = q), R && (i = R), O = i.outerHTML, i.tagName === "UL" || i.tagName === "OL") {
              var D = i.previousElementSibling, F = i.nextElementSibling;
              D && (D.tagName === "UL" || D.tagName === "OL") && (O = D.outerHTML + O, D.remove()), F && (F.tagName === "UL" || F.tagName === "OL") && (O = O + F.outerHTML, F.remove()), O = O.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
            } else i.previousElementSibling && i.previousElementSibling.textContent.replace(E.g.ZWSP, "") !== "" && r && r.inputType === "insertParagraph" && (O = i.previousElementSibling.outerHTML + O, i.previousElementSibling.remove());
            i.innerText.startsWith("```") || (e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(Y) {
              Y && !i.isEqualNode(Y) && (O += Y.outerHTML, Y.remove());
            }), e.ir.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(Y) {
              Y && !i.isEqualNode(Y) && (O += Y.outerHTML, Y.remove());
            }));
          }
          if (A("SpinVditorIRDOM", O, "argument", e.options.debugger), O = e.lute.SpinVditorIRDOM(O), A("SpinVditorIRDOM", O, "result", e.options.debugger), I)
            i.innerHTML = O;
          else if (i.outerHTML = O, R) {
            var W = (0, s.a1)(e.ir.element.querySelector("wbr"), "data-type", "footnotes-def");
            if (W) {
              var Z = W.textContent, se = Z.substring(1, Z.indexOf("]:")), ae = e.ir.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="'.concat(se, '"]'));
              ae && ae.setAttribute("aria-label", Z.substr(se.length + 3).trim().substr(0, 24));
            }
          }
          var ue, Te = e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']");
          Te.forEach(function(Y, be) {
            be === 0 ? ue = Y : (ue.insertAdjacentHTML("beforeend", Y.innerHTML), Y.remove());
          }), Te.length > 0 && e.ir.element.insertAdjacentElement("beforeend", Te[0]);
          var Le, _e = e.ir.element.querySelectorAll("[data-type='footnotes-block']");
          _e.forEach(function(Y, be) {
            be === 0 ? Le = Y : (Le.insertAdjacentHTML("beforeend", Y.innerHTML), Y.remove());
          }), _e.length > 0 && e.ir.element.insertAdjacentElement("beforeend", _e[0]), (0, k.ib)(e.ir.element, t), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(Y) {
            ve(Y, e);
          }), Re(e), je(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, N = function(e, t) {
          if (e === "")
            return !1;
          if (e.indexOf("⇧") === -1 && e.indexOf("⌘") === -1 && e.indexOf("⌥") === -1)
            return !(0, l.yl)(t) && !t.altKey && !t.shiftKey && t.code === e;
          if (e === "⇧Tab")
            return !!(!(0, l.yl)(t) && !t.altKey && t.shiftKey && t.code === "Tab");
          var n = e.split("");
          if (e.startsWith("⌥")) {
            var r = n.length === 3 ? n[2] : n[1];
            return !!((n.length === 3 ? (0, l.yl)(t) : !(0, l.yl)(t)) && t.altKey && !t.shiftKey && t.code === (/^[0-9]$/.test(r) ? "Digit" : "Key") + r);
          }
          e === "⌘Enter" && (n = ["⌘", "Enter"]);
          var i = n.length > 2 && n[0] === "⇧", a = i ? n[2] : n[1];
          return i && ((0, l.vU)() || !/Mac/.test(navigator.platform)) && (a === "-" ? a = "_" : a === "=" && (a = "+")), !!((0, l.yl)(t) && t.key.toLowerCase() === a.toLowerCase() && !t.altKey && (!i && !t.shiftKey || i && t.shiftKey));
        }, re = function(e) {
          var t = e.startContainer;
          if (t.nodeType === 3 && t.nodeValue.length !== e.startOffset)
            return !1;
          for (var n = t.nextSibling; n && n.textContent === ""; )
            n = n.nextSibling;
          if (n) {
            if (n && n.nodeType !== 3 && n.classList.contains("vditor-ir__node") && !n.getAttribute("data-block"))
              return n;
          } else {
            var r = (0, s.fb)(t, "vditor-ir__marker");
            if (r && !r.nextSibling) {
              var i = t.parentElement.parentElement.nextSibling;
              if (i && i.nodeType !== 3 && i.classList.contains("vditor-ir__node"))
                return i;
            }
            return !1;
          }
          return !1;
        }, U = function(e) {
          var t = e.startContainer, n = t.previousSibling;
          return t.nodeType === 3 && e.startOffset === 0 && n && n.nodeType !== 3 && // *em*|text
          n.classList.contains("vditor-ir__node") && !n.getAttribute("data-block") ? n : !1;
        }, j = function(e, t) {
          t.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(o) {
            o.classList.remove("vditor-ir__node--expand");
          });
          var n = (0, s.JQ)(e.startContainer, "vditor-ir__node"), r = !e.collapsed && (0, s.JQ)(e.endContainer, "vditor-ir__node");
          if (!(!e.collapsed && (!n || n !== r))) {
            n && (n.classList.add("vditor-ir__node--expand"), n.classList.remove("vditor-ir__node--hidden"), (0, k.Hc)(e));
            var i = re(e);
            if (i) {
              i.classList.add("vditor-ir__node--expand"), i.classList.remove("vditor-ir__node--hidden");
              return;
            }
            var a = U(e);
            if (a) {
              a.classList.add("vditor-ir__node--expand"), a.classList.remove("vditor-ir__node--hidden");
              return;
            }
          }
        }, pe = function(e, t) {
          if (e.ir.composingLock = t.isComposing, t.isComposing)
            return !1;
          t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t);
          var n = (0, k.zh)(e), r = n.startContainer;
          if (!tn(t, e, r) || (nn(n, e, t), bn(n), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l.yl)(t) && t.key !== "Escape" && t.key !== "Delete"))
            return !1;
          var i = (0, s.a1)(r, "data-newline", "1");
          if (!(0, l.yl)(t) && !t.altKey && !t.shiftKey && t.key === "Enter" && i && n.startOffset < i.textContent.length) {
            var a = i.previousElementSibling;
            a && (n.insertNode(document.createTextNode(a.textContent)), n.collapse(!1));
            var o = i.nextSibling;
            o && (n.insertNode(document.createTextNode(o.textContent)), n.collapse(!0));
          }
          var d = (0, s.lG)(r, "P");
          if (ln(t, e, d, n) || sn(n, e, d, t) || mn(e, n, t, d))
            return !0;
          var h = (0, s.fb)(r, "vditor-ir__marker--pre");
          if (h && h.tagName === "PRE") {
            var u = h.firstChild;
            if (hn(e, t, h, n) || (u.getAttribute("data-type") === "math-block" || u.getAttribute("data-type") === "html-block") && Je(e, t, n, u, h.parentElement) || rt(e, t, n, u, h.parentElement))
              return !0;
          }
          var S = (0, s.a1)(r, "data-type", "code-block-info");
          if (S) {
            if (t.key === "Enter" || t.key === "Tab")
              return n.selectNodeContents(S.nextElementSibling.firstChild), n.collapse(!0), t.preventDefault(), b(e, ["hint"]), !0;
            if (t.key === "Backspace") {
              var T = (0, k.im)(S, e.ir.element).start;
              T === 1 && n.setStart(r, 0), T === 2 && (e.hint.recentLanguage = "");
            }
            if (Je(e, t, n, S, S.parentElement))
              return b(e, ["hint"]), !0;
          }
          var I = (0, s.lG)(r, "TD") || (0, s.lG)(r, "TH");
          if (t.key.indexOf("Arrow") > -1 && I) {
            var R = tr(I);
            if (R && Je(e, t, n, I, R))
              return !0;
            var O = nr(I);
            if (O && rt(e, t, n, I, O))
              return !0;
          }
          if (pn(e, t, n) || gn(e, n, t) || jt(e, n, t))
            return !0;
          var q = (0, C.W)(r);
          if (q) {
            if (N("⌘=", t)) {
              var B = q.querySelector(".vditor-ir__marker--heading");
              return B && B.textContent.trim().length > 1 && it(e, B.textContent.substr(1)), t.preventDefault(), !0;
            }
            if (N("⌘-", t)) {
              var B = q.querySelector(".vditor-ir__marker--heading");
              return B && B.textContent.trim().length < 6 && it(e, B.textContent.trim() + "# "), t.preventDefault(), !0;
            }
          }
          var D = (0, s.F9)(r);
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && n.toString() === "") {
            if (yn(e, n, t, d))
              return !0;
            if (D && D.previousElementSibling && D.tagName !== "UL" && D.tagName !== "OL" && (D.previousElementSibling.getAttribute("data-type") === "code-block" || D.previousElementSibling.getAttribute("data-type") === "math-block")) {
              var F = (0, k.im)(D, e.ir.element, n).start;
              if (F === 0 || F === 1 && D.innerText.startsWith(E.g.ZWSP))
                return n.selectNodeContents(D.previousElementSibling.querySelector(".vditor-ir__marker--pre code")), n.collapse(!1), j(n, e), D.textContent.trim().replace(E.g.ZWSP, "") === "" && (D.remove(), je(e)), t.preventDefault(), !0;
            }
            if (q) {
              var W = q.firstElementChild.textContent.length;
              (0, k.im)(q, e.ir.element).start === W && W !== 0 && (n.setStart(q.firstElementChild.firstChild, W - 1), n.collapse(!0), (0, k.Hc)(n));
            }
          }
          return (t.key === "ArrowUp" || t.key === "ArrowDown") && D && (D.querySelectorAll(".vditor-ir__node").forEach(function(Z) {
            Z.contains(r) || Z.classList.add("vditor-ir__node--hidden");
          }), wn(t, D, n)) ? !0 : (rn(n, t.key), D && ct(D, e, t, n) ? (t.preventDefault(), !0) : !1);
        }, z = ee(971), ge = function(e, t) {
          e.querySelectorAll("[data-type=footnotes-link]").forEach(function(n) {
            for (var r = n.parentElement, i = r.nextSibling; i && i.textContent.startsWith("    "); ) {
              var a = i;
              a.childNodes.forEach(function(o) {
                r.append(o.cloneNode(!0));
              }), i = i.nextSibling, a.remove();
            }
            t && t(r);
          });
        }, ie = function(e, t) {
          var n, r = getSelection().getRangeAt(0).cloneRange(), i = r.startContainer;
          r.startContainer.nodeType !== 3 && r.startContainer.tagName === "DIV" && (i = r.startContainer.childNodes[r.startOffset - 1]);
          var a = (0, s.a1)(i, "data-block", "0");
          if (a && t && (t.inputType === "deleteContentBackward" || t.data === " ")) {
            for (
              var o = (0, k.im)(a, e.sv.element, r).start, d = !0, h = o - 1;
              // 软换行后有空格
              h > a.textContent.substr(0, o).lastIndexOf(`
`);
              h--
            )
              if (a.textContent.charAt(h) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
              a.textContent.charAt(h) !== "	") {
                d = !1;
                break;
              }
            if (o === 0 && (d = !1), d) {
              Ee(e);
              return;
            }
            if (t.inputType === "deleteContentBackward") {
              var u = (0, s.a1)(i, "data-type", "code-block-open-marker") || (0, s.a1)(i, "data-type", "code-block-close-marker");
              if (u) {
                if (u.getAttribute("data-type") === "code-block-close-marker") {
                  var S = dt(i, "code-block-open-marker");
                  if (S) {
                    S.textContent = u.textContent, Ee(e);
                    return;
                  }
                }
                if (u.getAttribute("data-type") === "code-block-open-marker") {
                  var S = dt(i, "code-block-close-marker", !1);
                  if (S) {
                    S.textContent = u.textContent, Ee(e);
                    return;
                  }
                }
              }
              var T = (0, s.a1)(i, "data-type", "math-block-open-marker");
              if (T) {
                var I = T.nextElementSibling.nextElementSibling;
                I && I.getAttribute("data-type") === "math-block-close-marker" && (I.remove(), Ee(e));
                return;
              }
              a.querySelectorAll('[data-type="code-block-open-marker"]').forEach(function(D) {
                D.textContent.length === 1 && D.remove();
              }), a.querySelectorAll('[data-type="code-block-close-marker"]').forEach(function(D) {
                D.textContent.length === 1 && D.remove();
              });
              var R = (0, s.a1)(i, "data-type", "heading-marker");
              if (R && R.textContent.indexOf("#") === -1) {
                Ee(e);
                return;
              }
            }
            if ((t.data === " " || t.inputType === "deleteContentBackward") && ((0, s.a1)(i, "data-type", "padding") || (0, s.a1)(i, "data-type", "li-marker") || (0, s.a1)(i, "data-type", "task-marker") || (0, s.a1)(i, "data-type", "blockquote-marker"))) {
              Ee(e);
              return;
            }
          }
          if (a && a.textContent.trimRight() === "$$") {
            Ee(e);
            return;
          }
          a || (a = e.sv.element), ((n = a.firstElementChild) === null || n === void 0 ? void 0 : n.getAttribute("data-type")) === "link-ref-defs-block" && (a = e.sv.element), (0, s.a1)(i, "data-type", "footnotes-link") && (a = e.sv.element), a.textContent.indexOf(Lute.Caret) === -1 && r.insertNode(document.createTextNode(Lute.Caret)), a.querySelectorAll("[style]").forEach(function(D) {
            D.removeAttribute("style");
          }), a.querySelectorAll("font").forEach(function(D) {
            D.outerHTML = D.innerHTML;
          });
          var O = a.textContent, q = a.isEqualNode(e.sv.element);
          if (q)
            O = a.textContent;
          else {
            a.previousElementSibling && (O = a.previousElementSibling.textContent + O, a.previousElementSibling.remove()), a.previousElementSibling && O.indexOf(`---
`) === 0 && (O = a.previousElementSibling.textContent + O, a.previousElementSibling.remove());
            var B = "";
            e.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(D, F) {
              D && !a.isEqualNode(D.parentElement) && (B += D.parentElement.textContent + `
`, D.parentElement.remove());
            }), e.sv.element.querySelectorAll("[data-type='footnotes-link']").forEach(function(D, F) {
              D && !a.isEqualNode(D.parentElement) && (B += D.parentElement.textContent + `
`, D.parentElement.remove());
            }), O = B + O;
          }
          O = Yt(O, e), q ? a.innerHTML = O : a.outerHTML = O, e.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(D) {
            e.sv.element.insertAdjacentElement("beforeend", D.parentElement);
          }), ge(e.sv.element, function(D) {
            e.sv.element.insertAdjacentElement("beforeend", D);
          }), (0, k.ib)(e.sv.element, r), ye(e), Ee(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, Ce = function(e, t) {
          var n, r, i, a, o;
          if (e.sv.composingLock = t.isComposing, t.isComposing || (t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l.yl)(t) && t.key !== "Escape"))
            return !1;
          var d = (0, k.zh)(e), h = d.startContainer;
          d.startContainer.nodeType !== 3 && d.startContainer.tagName === "DIV" && (h = d.startContainer.childNodes[d.startOffset - 1]);
          var u = (0, s.a1)(h, "data-type", "text"), S = (0, s.a1)(h, "data-type", "blockquote-marker");
          if (!S && d.startOffset === 0 && u && u.previousElementSibling && u.previousElementSibling.getAttribute("data-type") === "blockquote-marker" && (S = u.previousElementSibling), S && t.key === "Enter" && !(0, l.yl)(t) && !t.altKey && S.nextElementSibling.textContent.trim() === "" && (0, k.im)(S, e.sv.element, d).start === S.textContent.length)
            return ((n = S.previousElementSibling) === null || n === void 0 ? void 0 : n.getAttribute("data-type")) === "padding" && S.previousElementSibling.setAttribute("data-action", "enter-remove"), S.remove(), Ee(e), t.preventDefault(), !0;
          var T = (0, s.a1)(h, "data-type", "li-marker"), I = (0, s.a1)(h, "data-type", "task-marker"), R = T;
          if (R || I && I.nextElementSibling.getAttribute("data-type") !== "task-marker" && (R = I), !R && d.startOffset === 0 && u && u.previousElementSibling && (u.previousElementSibling.getAttribute("data-type") === "li-marker" || u.previousElementSibling.getAttribute("data-type") === "task-marker") && (R = u.previousElementSibling), R) {
            var O = (0, k.im)(R, e.sv.element, d).start, q = R.getAttribute("data-type") === "task-marker", B = R;
            if (q && (B = R.previousElementSibling.previousElementSibling.previousElementSibling), O === R.textContent.length) {
              if (t.key === "Enter" && !(0, l.yl)(t) && !t.altKey && !t.shiftKey && R.nextElementSibling.textContent.trim() === "")
                return ((r = B.previousElementSibling) === null || r === void 0 ? void 0 : r.getAttribute("data-type")) === "padding" ? (B.previousElementSibling.remove(), ie(e)) : (q && (B.remove(), R.previousElementSibling.previousElementSibling.remove(), R.previousElementSibling.remove()), R.nextElementSibling.remove(), R.remove(), Ee(e)), t.preventDefault(), !0;
              if (t.key === "Tab")
                return t.shiftKey ? B.previousElementSibling.getAttribute("data-type") === "padding" && B.previousElementSibling.remove() : B.insertAdjacentHTML("beforebegin", '<span data-type="padding">'.concat(B.textContent.replace(/\S/g, " "), "</span>")), /^\d/.test(B.textContent) && (B.textContent = B.textContent.replace(/^\d{1,}/, "1"), d.selectNodeContents(R.firstChild), d.collapse(!1)), ie(e), t.preventDefault(), !0;
            }
          }
          if (jt(e, d, t))
            return !0;
          var D = (0, s.a1)(h, "data-block", "0"), F = (0, C.S)(h, "SPAN");
          if (t.key === "Enter" && !(0, l.yl)(t) && !t.altKey && !t.shiftKey && D) {
            var W = !1, Z = D.textContent.match(/^\n+/);
            (0, k.im)(D, e.sv.element).start <= (Z ? Z[0].length : 0) && (W = !0);
            var se = `
`;
            if (F) {
              if (((i = F.previousElementSibling) === null || i === void 0 ? void 0 : i.getAttribute("data-action")) === "enter-remove")
                return F.previousElementSibling.remove(), Ee(e), t.preventDefault(), !0;
              se += zn(F);
            }
            return d.insertNode(document.createTextNode(se)), d.collapse(!1), D && D.textContent.trim() !== "" && !W ? ie(e) : Ee(e), t.preventDefault(), !0;
          }
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.altKey && !t.shiftKey) {
            if (F && ((a = F.previousElementSibling) === null || a === void 0 ? void 0 : a.getAttribute("data-type")) === "newline" && (0, k.im)(F, e.sv.element, d).start === 1 && // 飘号的处理需在 inputEvent 中，否则上下飘号对不齐
            F.getAttribute("data-type").indexOf("code-block-") === -1)
              return d.setStart(F, 0), d.extractContents(), F.textContent.trim() !== "" ? ie(e) : Ee(e), t.preventDefault(), !0;
            if (D && (0, k.im)(D, e.sv.element, d).start === 0 && D.previousElementSibling) {
              d.extractContents();
              var ae = D.previousElementSibling.lastElementChild;
              return ae.getAttribute("data-type") === "newline" && (ae.remove(), ae = D.previousElementSibling.lastElementChild), ae.getAttribute("data-type") !== "newline" && (ae.insertAdjacentHTML("afterend", D.innerHTML), D.remove()), D.textContent.trim() !== "" && !(!((o = D.previousElementSibling) === null || o === void 0) && o.querySelector('[data-type="code-block-open-marker"]')) ? ie(e) : (ae.getAttribute("data-type") !== "newline" && (d.selectNodeContents(ae.lastChild), d.collapse(!1)), Ee(e)), t.preventDefault(), !0;
            }
          }
          return !1;
        }, X = ee(652), de = function(e) {
          e.options.theme === "dark" ? e.element.classList.add("vditor--dark") : e.element.classList.remove("vditor--dark");
        }, Ae = function(e) {
          e.element.innerHTML = "", e.element.classList.add("vditor"), e.options.rtl && e.element.setAttribute("dir", "rtl"), de(e), (0, X.Z)(e.options.preview.theme.current, e.options.preview.theme.path), typeof e.options.height == "number" ? e.element.style.height = e.options.height + "px" : e.element.style.height = e.options.height, typeof e.options.minHeight == "number" && (e.element.style.minHeight = e.options.minHeight + "px"), typeof e.options.width == "number" ? e.element.style.width = e.options.width + "px" : e.element.style.width = e.options.width, e.element.appendChild(e.toolbar.element);
          var t = document.createElement("div");
          if (t.className = "vditor-content", e.options.outline.position === "left" && t.appendChild(e.outline.element), t.appendChild(e.wysiwyg.element.parentElement), t.appendChild(e.sv.element), t.appendChild(e.ir.element.parentElement), t.appendChild(e.preview.element), e.toolbar.elements.devtools && t.appendChild(e.devtools.element), e.options.outline.position === "right" && (e.outline.element.classList.add("vditor-outline--right"), t.appendChild(e.outline.element)), e.upload && t.appendChild(e.upload.element), e.options.resize.enable && t.appendChild(e.resize.element), t.appendChild(e.hint.element), t.appendChild(e.tip.element), e.element.appendChild(t), t.addEventListener("click", function() {
            b(e, ["subToolbar"]);
          }), e.toolbar.elements.export && e.element.insertAdjacentHTML("beforeend", '<iframe id="vditorExportIframe" style="width: 100%;height: 0;border: 0"></iframe>'), ze(e, e.options.mode, Nn(e)), document.execCommand("DefaultParagraphSeparator", !1, "p"), navigator.userAgent.indexOf("iPhone") > -1 && typeof window.visualViewport < "u") {
            var n = !1, r = function(i) {
              n || (n = !0, requestAnimationFrame(function() {
                n = !1;
                var a = e.toolbar.element;
                a.style.transform = "none", a.getBoundingClientRect().top < 0 && (a.style.transform = "translate(0, ".concat(-a.getBoundingClientRect().top, "px)"));
              }));
            };
            window.visualViewport.addEventListener("scroll", r), window.visualViewport.addEventListener("resize", r);
          }
        }, He = function(e) {
          var t = window.innerWidth <= E.g.MOBILE_WIDTH ? 10 : 35;
          if (e.wysiwyg.element.parentElement.style.display !== "none") {
            var n = (e.wysiwyg.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2;
            e.wysiwyg.element.style.padding = "10px ".concat(Math.max(t, n), "px");
          }
          if (e.ir.element.parentElement.style.display !== "none") {
            var n = (e.ir.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2;
            e.ir.element.style.padding = "10px ".concat(Math.max(t, n), "px");
          }
          e.preview.element.style.display !== "block" ? e.toolbar.element.style.paddingLeft = Math.max(5, parseInt(e[e.currentMode].element.style.paddingLeft || "0", 10) + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0)) + "px" : e.toolbar.element.style.paddingLeft = 5 + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0) + "px";
        }, ut = function(e) {
          if (e.options.typewriterMode) {
            var t = window.innerHeight;
            typeof e.options.height == "number" ? (t = e.options.height, typeof e.options.minHeight == "number" && (t = Math.max(t, e.options.minHeight)), t = Math.min(window.innerHeight, t)) : t = e.element.clientHeight, e.element.classList.contains("vditor--fullscreen") && (t = window.innerHeight), e[e.currentMode].element.style.setProperty("--editor-bottom", (t - e.toolbar.element.offsetHeight) / 2 + "px");
          }
        }, qt;
        function zt() {
          window.removeEventListener("resize", qt);
        }
        var Nn = function(e) {
          ut(e), zt(), window.addEventListener("resize", qt = function() {
            He(e), ut(e);
          });
          var t = (0, l.pK)() && localStorage.getItem(e.options.cache.id);
          return (!e.options.cache.enable || !t) && (e.options.value ? t = e.options.value : e.originalInnerHTML ? t = e.lute.HTML2Md(e.originalInnerHTML) : e.options.cache.enable || (t = "")), t || "";
        }, $e = function(e) {
          clearTimeout(e[e.currentMode].hlToolbarTimeoutId), e[e.currentMode].hlToolbarTimeoutId = window.setTimeout(function() {
            if (e[e.currentMode].element.getAttribute("contenteditable") !== "false" && (0, k.Gb)(e[e.currentMode].element)) {
              g(e.toolbar.elements, E.g.EDIT_TOOLBARS), m(e.toolbar.elements, E.g.EDIT_TOOLBARS);
              var t = (0, k.zh)(e), n = t.startContainer;
              t.startContainer.nodeType === 3 && (n = t.startContainer.parentElement), n.classList.contains("vditor-reset") && (n = n.childNodes[t.startOffset]);
              var r = e.currentMode === "sv" ? (0, s.a1)(n, "data-type", "heading") : (0, C.W)(n);
              r && p(e.toolbar.elements, ["headings"]);
              var i = e.currentMode === "sv" ? (0, s.a1)(n, "data-type", "blockquote") : (0, s.lG)(n, "BLOCKQUOTE");
              i && p(e.toolbar.elements, ["quote"]);
              var a = (0, s.a1)(n, "data-type", "strong");
              a && p(e.toolbar.elements, ["bold"]);
              var o = (0, s.a1)(n, "data-type", "em");
              o && p(e.toolbar.elements, ["italic"]);
              var d = (0, s.a1)(n, "data-type", "s");
              d && p(e.toolbar.elements, ["strike"]);
              var h = (0, s.a1)(n, "data-type", "a");
              h && p(e.toolbar.elements, ["link"]);
              var u = (0, s.lG)(n, "LI");
              u ? (u.classList.contains("vditor-task") ? p(e.toolbar.elements, ["check"]) : u.parentElement.tagName === "OL" ? p(e.toolbar.elements, ["ordered-list"]) : u.parentElement.tagName === "UL" && p(e.toolbar.elements, ["list"]), m(e.toolbar.elements, ["outdent", "indent"])) : f(e.toolbar.elements, ["outdent", "indent"]);
              var S = (0, s.a1)(n, "data-type", "code-block");
              S && (f(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "inline-code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["code"]));
              var T = (0, s.a1)(n, "data-type", "code");
              T && (f(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["inline-code"]));
              var I = (0, s.a1)(n, "data-type", "table");
              I && f(e.toolbar.elements, [
                "headings",
                "list",
                "ordered-list",
                "check",
                "line",
                "quote",
                "code",
                "table"
              ]);
            }
          }, 200);
        }, ce = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && e.hint.render(e), clearTimeout(e.wysiwyg.afterRenderTimeoutId), e.wysiwyg.afterRenderTimeoutId = window.setTimeout(function() {
            if (!e.wysiwyg.composingLock) {
              var n = x(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, Rn = function(e) {
          for (var t = e.previousSibling; t; ) {
            if (t.nodeType !== 3 && t.tagName === "A" && !t.previousSibling && t.innerHTML.replace(E.g.ZWSP, "") === "" && t.nextSibling)
              return t;
            t = t.previousSibling;
          }
          return !1;
        }, In = function(e) {
          for (var t = e.startContainer.nextSibling; t && t.textContent === ""; )
            t = t.nextSibling;
          return !!(t && t.nodeType !== 3 && (t.tagName === "CODE" || t.getAttribute("data-type") === "math-inline" || t.getAttribute("data-type") === "html-entity" || t.getAttribute("data-type") === "html-inline"));
        }, Gt = function(e) {
          for (var t = "", n = e.nextSibling; n; )
            n.nodeType === 3 ? t += n.textContent : t += n.outerHTML, n = n.nextSibling;
          return t;
        }, Ft = function(e) {
          for (var t = "", n = e.previousSibling; n; )
            n.nodeType === 3 ? t = n.textContent + t : t = n.outerHTML + t, n = n.previousSibling;
          return t;
        }, Pn = function(e) {
          for (var t = e; t && !t.nextSibling; )
            t = t.parentElement;
          return t.nextSibling;
        }, jn = function(e) {
          var t = Ft(e.startContainer), n = Gt(e.startContainer), r = e.startContainer.textContent, i = e.startOffset, a = "", o = "";
          return (r.substr(0, i) !== "" && r.substr(0, i) !== E.g.ZWSP || t) && (a = "".concat(t).concat(r.substr(0, i))), (r.substr(i) !== "" && r.substr(i) !== E.g.ZWSP || n) && (o = "".concat(r.substr(i)).concat(n)), {
            afterHTML: o,
            beforeHTML: a
          };
        }, Ct = function(e, t) {
          Array.from(e.wysiwyg.element.childNodes).find(function(n) {
            if (n.nodeType === 3) {
              var r = document.createElement("p");
              r.setAttribute("data-block", "0"), r.textContent = n.textContent;
              var i = t.startContainer.nodeType === 3 ? t.startOffset : n.textContent.length;
              return n.parentNode.insertBefore(r, n), n.remove(), t.setStart(r.firstChild, Math.min(r.firstChild.textContent.length, i)), t.collapse(!0), (0, k.Hc)(t), !0;
            } else if (!n.getAttribute("data-block"))
              return n.tagName === "P" ? n.remove() : (n.tagName === "DIV" ? (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.innerHTML, "</p>")) : n.tagName === "BR" ? n.outerHTML = '<p data-block="0">'.concat(n.outerHTML, "<wbr></p>") : (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.outerHTML, "</p>")), (0, k.ib)(e.wysiwyg.element, t), t = getSelection().getRangeAt(0)), !0;
          });
        }, ft = function(e, t) {
          var n = (0, k.zh)(e), r = (0, s.F9)(n.startContainer);
          r || (r = n.startContainer.childNodes[n.startOffset]), !r && e.wysiwyg.element.children.length === 0 && (r = e.wysiwyg.element), r && !r.classList.contains("vditor-wysiwyg__block") && (n.insertNode(document.createElement("wbr")), r.innerHTML.trim() === "<wbr>" && (r.innerHTML = "<wbr><br>"), r.tagName === "BLOCKQUOTE" || r.classList.contains("vditor-reset") ? r.innerHTML = "<".concat(t, ' data-block="0">').concat(r.innerHTML.trim(), "</").concat(t, ">") : r.outerHTML = "<".concat(t, ' data-block="0">').concat(r.innerHTML.trim(), "</").concat(t, ">"), (0, k.ib)(e.wysiwyg.element, n), Re(e));
        }, Lt = function(e) {
          var t = getSelection().getRangeAt(0), n = (0, s.F9)(t.startContainer);
          n || (n = t.startContainer.childNodes[t.startOffset]), n && (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.innerHTML, "</p>"), (0, k.ib)(e.wysiwyg.element, t)), e.wysiwyg.popover.style.display = "none";
        }, et = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e.previousElementSibling, i = r.ownerDocument.createRange();
          r.tagName === "CODE" ? (r.style.display = "inline-block", n ? i.setStart(r.firstChild, 1) : i.selectNodeContents(r)) : (r.style.display = "block", r.firstChild.firstChild || r.firstChild.appendChild(document.createTextNode("")), i.selectNodeContents(r.firstChild)), n ? i.collapse(!0) : i.collapse(!1), (0, k.Hc)(i), !e.firstElementChild.classList.contains("language-mindmap") && ye(t);
        }, Bn = function(e, t) {
          if (e.wysiwyg.composingLock = t.isComposing, t.isComposing)
            return !1;
          t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t);
          var n = (0, k.zh)(e), r = n.startContainer;
          if (!tn(t, e, r) || (nn(n, e, t), bn(n), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l.yl)(t) && t.key !== "Escape" && t.key !== "Delete"))
            return !1;
          var i = (0, s.F9)(r), a = (0, s.lG)(r, "P");
          if (ln(t, e, a, n) || sn(n, e, a, t) || pn(e, t, n))
            return !0;
          var o = (0, s.fb)(r, "vditor-wysiwyg__block");
          if (o) {
            if (t.key === "Escape" && o.children.length === 2)
              return e.wysiwyg.popover.style.display = "none", o.firstElementChild.style.display = "none", e.wysiwyg.element.blur(), t.preventDefault(), !0;
            if (!(0, l.yl)(t) && !t.shiftKey && t.altKey && t.key === "Enter" && o.getAttribute("data-type") === "code-block") {
              var d = e.wysiwyg.popover.querySelector(".vditor-input");
              return d.focus(), d.select(), t.preventDefault(), !0;
            }
            if (o.getAttribute("data-block") === "0" && (hn(e, t, o.firstElementChild, n) || rt(e, t, n, o.firstElementChild, o) || o.getAttribute("data-type") !== "yaml-front-matter" && Je(e, t, n, o.firstElementChild, o)))
              return !0;
          }
          if (mn(e, n, t, a))
            return !0;
          var h = (0, s.E2)(r, "BLOCKQUOTE");
          if (h && !t.shiftKey && t.altKey && t.key === "Enter") {
            (0, l.yl)(t) ? n.setStartBefore(h) : n.setStartAfter(h), (0, k.Hc)(n);
            var u = document.createElement("p");
            return u.setAttribute("data-block", "0"), u.innerHTML = `
`, n.insertNode(u), n.collapse(!0), (0, k.Hc)(n), ce(e), ye(e), t.preventDefault(), !0;
          }
          var S = (0, C.W)(r);
          if (S) {
            if (S.tagName === "H6" && r.textContent.length === n.startOffset && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && t.key === "Enter") {
              var T = document.createElement("p");
              return T.textContent = `
`, T.setAttribute("data-block", "0"), r.parentElement.insertAdjacentElement("afterend", T), n.setStart(T, 0), (0, k.Hc)(n), ce(e), ye(e), t.preventDefault(), !0;
            }
            if (N("⌘=", t)) {
              var I = parseInt(S.tagName.substr(1), 10) - 1;
              return I > 0 && (ft(e, "h".concat(I)), ce(e)), t.preventDefault(), !0;
            }
            if (N("⌘-", t)) {
              var I = parseInt(S.tagName.substr(1), 10) + 1;
              return I < 7 && (ft(e, "h".concat(I)), ce(e)), t.preventDefault(), !0;
            }
            t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && S.textContent.length === 1 && Lt(e);
          }
          if (gn(e, n, t))
            return !0;
          if (t.altKey && t.key === "Enter" && !(0, l.yl)(t) && !t.shiftKey) {
            var R = (0, s.lG)(r, "A"), O = (0, s.a1)(r, "data-type", "link-ref"), q = (0, s.a1)(r, "data-type", "footnotes-ref");
            if (R || O || q || S && S.tagName.length === 2) {
              var B = e.wysiwyg.popover.querySelector("input");
              B.focus(), B.select();
            }
          }
          if (ke(e, t))
            return !0;
          if (N("⇧⌘U", t)) {
            var D = e.wysiwyg.popover.querySelector('[data-type="up"]');
            if (D)
              return D.click(), t.preventDefault(), !0;
          }
          if (N("⇧⌘D", t)) {
            var D = e.wysiwyg.popover.querySelector('[data-type="down"]');
            if (D)
              return D.click(), t.preventDefault(), !0;
          }
          if (jt(e, n, t))
            return !0;
          if (!(0, l.yl)(t) && t.shiftKey && !t.altKey && t.key === "Enter" && r.parentElement.tagName !== "LI" && r.parentElement.tagName !== "P")
            return ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r.parentElement.tagName) ? n.insertNode(document.createTextNode(`
` + E.g.ZWSP)) : n.insertNode(document.createTextNode(`
`)), n.collapse(!1), (0, k.Hc)(n), ce(e), ye(e), t.preventDefault(), !0;
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && n.toString() === "") {
            if (yn(e, n, t, a))
              return !0;
            if (i) {
              if (i.previousElementSibling && i.previousElementSibling.classList.contains("vditor-wysiwyg__block") && i.previousElementSibling.getAttribute("data-block") === "0" && i.tagName !== "UL" && i.tagName !== "OL") {
                var F = (0, k.im)(i, e.wysiwyg.element, n).start;
                if (F === 0 && n.startOffset === 0 || // https://github.com/Vanessa219/vditor/issues/894
                F === 1 && i.innerText.startsWith(E.g.ZWSP))
                  return et(i.previousElementSibling.lastElementChild, e, !1), i.innerHTML.trim().replace(E.g.ZWSP, "") === "" && (i.remove(), ce(e)), t.preventDefault(), !0;
              }
              var W = n.startOffset;
              if (n.toString() === "" && r.nodeType === 3 && r.textContent.charAt(W - 2) === `
` && r.textContent.charAt(W - 1) !== E.g.ZWSP && ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r.parentElement.tagName))
                return r.textContent = r.textContent.substring(0, W - 1) + E.g.ZWSP, n.setStart(r, W), n.collapse(!0), ce(e), t.preventDefault(), !0;
              r.textContent === E.g.ZWSP && n.startOffset === 1 && !r.previousSibling && In(n) && (r.textContent = ""), i.querySelectorAll("span.vditor-wysiwyg__block[data-type='math-inline']").forEach(function(se) {
                se.firstElementChild.style.display = "inline", se.lastElementChild.style.display = "none";
              }), i.querySelectorAll("span.vditor-wysiwyg__block[data-type='html-entity']").forEach(function(se) {
                se.firstElementChild.style.display = "inline", se.lastElementChild.style.display = "none";
              });
            }
          }
          if ((0, l.vU)() && n.startOffset === 1 && r.textContent.indexOf(E.g.ZWSP) > -1 && r.previousSibling && r.previousSibling.nodeType !== 3 && r.previousSibling.tagName === "CODE" && (t.key === "Backspace" || t.key === "ArrowLeft"))
            return n.selectNodeContents(r.previousSibling), n.collapse(!1), t.preventDefault(), !0;
          if (wn(t, i, n))
            return t.preventDefault(), !0;
          if (rn(n, t.key), t.key === "ArrowDown") {
            var Z = r.nextSibling;
            Z && Z.nodeType !== 3 && Z.getAttribute("data-type") === "math-inline" && n.setStartAfter(Z);
          }
          return i && ct(i, e, t, n) ? (t.preventDefault(), !0) : !1;
        }, ke = function(e, t) {
          if (N("⇧⌘X", t)) {
            var n = e.wysiwyg.popover.querySelector('[data-type="remove"]');
            return n && n.click(), t.preventDefault(), !0;
          }
        }, qe = function(e) {
          clearTimeout(e.wysiwyg.hlToolbarTimeoutId), e.wysiwyg.hlToolbarTimeoutId = window.setTimeout(function() {
            if (e.wysiwyg.element.getAttribute("contenteditable") !== "false" && (0, k.Gb)(e.wysiwyg.element)) {
              g(e.toolbar.elements, E.g.EDIT_TOOLBARS), m(e.toolbar.elements, E.g.EDIT_TOOLBARS);
              var t = getSelection().getRangeAt(0), n = t.startContainer;
              t.startContainer.nodeType === 3 ? n = t.startContainer.parentElement : n = n.childNodes[t.startOffset >= n.childNodes.length ? n.childNodes.length - 1 : t.startOffset];
              var r = (0, s.a1)(n, "data-type", "footnotes-block");
              if (r) {
                e.wysiwyg.popover.innerHTML = "", Oe(r, e), De(e, r);
                return;
              }
              var i = (0, s.lG)(n, "LI");
              i ? (i.classList.contains("vditor-task") ? p(e.toolbar.elements, ["check"]) : i.parentElement.tagName === "OL" ? p(e.toolbar.elements, ["ordered-list"]) : i.parentElement.tagName === "UL" && p(e.toolbar.elements, ["list"]), m(e.toolbar.elements, ["outdent", "indent"])) : f(e.toolbar.elements, ["outdent", "indent"]), (0, s.lG)(n, "BLOCKQUOTE") && p(e.toolbar.elements, ["quote"]), ((0, s.lG)(n, "B") || (0, s.lG)(n, "STRONG")) && p(e.toolbar.elements, ["bold"]), ((0, s.lG)(n, "I") || (0, s.lG)(n, "EM")) && p(e.toolbar.elements, ["italic"]), ((0, s.lG)(n, "STRIKE") || (0, s.lG)(n, "S")) && p(e.toolbar.elements, ["strike"]), e.wysiwyg.element.querySelectorAll(".vditor-comment--focus").forEach(function(K) {
                K.classList.remove("vditor-comment--focus");
              });
              var a = (0, s.fb)(n, "vditor-comment");
              if (a) {
                var o = a.getAttribute("data-cmtids").split(" ");
                if (o.length > 1 && a.nextSibling.isSameNode(a.nextElementSibling)) {
                  var d = a.nextElementSibling.getAttribute("data-cmtids").split(" ");
                  o.find(function(K) {
                    if (d.includes(K))
                      return o = [K], !0;
                  });
                }
                e.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(K) {
                  K.getAttribute("data-cmtids").indexOf(o[0]) > -1 && K.classList.add("vditor-comment--focus");
                });
              }
              var h = (0, s.lG)(n, "A");
              h && p(e.toolbar.elements, ["link"]);
              var u = (0, s.lG)(n, "TABLE"), S = (0, C.W)(n);
              (0, s.lG)(n, "CODE") ? (0, s.lG)(n, "PRE") ? (f(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "inline-code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["code"])) : (f(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["inline-code"])) : S ? (f(e.toolbar.elements, ["bold"]), p(e.toolbar.elements, ["headings"])) : u && f(e.toolbar.elements, ["table"]);
              var T = (0, s.fb)(n, "vditor-toc");
              if (T) {
                e.wysiwyg.popover.innerHTML = "", Oe(T, e), De(e, T);
                return;
              }
              var I = (0, C.S)(n, "BLOCKQUOTE");
              if (I && (e.wysiwyg.popover.innerHTML = "", Ge(t, I, e), Fe(t, I, e), Oe(I, e), De(e, I)), i && (e.wysiwyg.popover.innerHTML = "", Ge(t, i, e), Fe(t, i, e), Oe(i, e), De(e, i)), u) {
                e.options.lang, e.options, e.wysiwyg.popover.innerHTML = "";
                var R = function() {
                  var K = u.rows.length, te = u.rows[0].cells.length, We = parseInt(be.value, 10) || K, Ke = parseInt(xe.value, 10) || te;
                  if (!(We === K && te === Ke)) {
                    if (te !== Ke)
                      for (var ot = Ke - te, Pe = 0; Pe < u.rows.length; Pe++)
                        if (ot > 0)
                          for (var An = 0; An < ot; An++)
                            Pe === 0 ? u.rows[Pe].lastElementChild.insertAdjacentHTML("afterend", "<th> </th>") : u.rows[Pe].lastElementChild.insertAdjacentHTML("afterend", "<td> </td>");
                        else
                          for (var Vt = te - 1; Vt >= Ke; Vt--)
                            u.rows[Pe].cells[Vt].remove();
                    if (K !== We) {
                      var xn = We - K;
                      if (xn > 0) {
                        for (var Wt = "<tr>", Qe = 0; Qe < Ke; Qe++)
                          Wt += "<td> </td>";
                        for (var Hn = 0; Hn < xn; Hn++)
                          u.querySelector("tbody") ? u.querySelector("tbody").insertAdjacentHTML("beforeend", Wt) : u.querySelector("thead").insertAdjacentHTML("afterend", Wt + "</tr>");
                      } else
                        for (var Qe = K - 1; Qe >= We; Qe--)
                          u.rows[Qe].remove(), u.rows.length === 1 && u.querySelector("tbody").remove();
                    }
                    typeof e.options.input == "function" && e.options.input(x(e));
                  }
                }, O = function(K) {
                  gt(u, K), K === "right" ? (F.classList.remove("vditor-icon--current"), W.classList.remove("vditor-icon--current"), Z.classList.add("vditor-icon--current")) : K === "center" ? (F.classList.remove("vditor-icon--current"), Z.classList.remove("vditor-icon--current"), W.classList.add("vditor-icon--current")) : (W.classList.remove("vditor-icon--current"), Z.classList.remove("vditor-icon--current"), F.classList.add("vditor-icon--current")), (0, k.Hc)(t), ce(e);
                }, q = (0, s.lG)(n, "TD"), B = (0, s.lG)(n, "TH"), D = "left";
                q ? D = q.getAttribute("align") || "left" : B && (D = B.getAttribute("align") || "center");
                var F = document.createElement("button");
                F.setAttribute("type", "button"), F.setAttribute("aria-label", window.VditorI18n.alignLeft + "<" + (0, l.ns)("⇧⌘L") + ">"), F.setAttribute("data-type", "left"), F.innerHTML = '<svg><use xlink:href="#vditor-icon-align-left"></use></svg>', F.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (D === "left" ? " vditor-icon--current" : ""), F.onclick = function() {
                  O("left");
                };
                var W = document.createElement("button");
                W.setAttribute("type", "button"), W.setAttribute("aria-label", window.VditorI18n.alignCenter + "<" + (0, l.ns)("⇧⌘C") + ">"), W.setAttribute("data-type", "center"), W.innerHTML = '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>', W.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (D === "center" ? " vditor-icon--current" : ""), W.onclick = function() {
                  O("center");
                };
                var Z = document.createElement("button");
                Z.setAttribute("type", "button"), Z.setAttribute("aria-label", window.VditorI18n.alignRight + "<" + (0, l.ns)("⇧⌘R") + ">"), Z.setAttribute("data-type", "right"), Z.innerHTML = '<svg><use xlink:href="#vditor-icon-align-right"></use></svg>', Z.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (D === "right" ? " vditor-icon--current" : ""), Z.onclick = function() {
                  O("right");
                };
                var se = document.createElement("button");
                se.setAttribute("type", "button"), se.setAttribute("aria-label", window.VditorI18n.insertRowBelow + "<" + (0, l.ns)("⌘=") + ">"), se.setAttribute("data-type", "insertRow"), se.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-row"></use></svg>', se.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", se.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && cn(e, t, te);
                };
                var ae = document.createElement("button");
                ae.setAttribute("type", "button"), ae.setAttribute("aria-label", window.VditorI18n.insertRowAbove + "<" + (0, l.ns)("⇧⌘F") + ">"), ae.setAttribute("data-type", "insertRow"), ae.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-rowb"></use></svg>', ae.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", ae.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && un(e, t, te);
                };
                var ue = document.createElement("button");
                ue.setAttribute("type", "button"), ue.setAttribute("aria-label", window.VditorI18n.insertColumnRight + "<" + (0, l.ns)("⇧⌘=") + ">"), ue.setAttribute("data-type", "insertColumn"), ue.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-column"></use></svg>', ue.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", ue.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && yt(e, u, te);
                };
                var Te = document.createElement("button");
                Te.setAttribute("type", "button"), Te.setAttribute("aria-label", window.VditorI18n.insertColumnLeft + "<" + (0, l.ns)("⇧⌘G") + ">"), Te.setAttribute("data-type", "insertColumn"), Te.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-columnb"></use></svg>', Te.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Te.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && yt(e, u, te, "beforebegin");
                };
                var Le = document.createElement("button");
                Le.setAttribute("type", "button"), Le.setAttribute("aria-label", window.VditorI18n["delete-row"] + "<" + (0, l.ns)("⌘-") + ">"), Le.setAttribute("data-type", "deleteRow"), Le.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-row"></use></svg>', Le.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Le.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && fn(e, t, te);
                };
                var _e = document.createElement("button");
                _e.setAttribute("type", "button"), _e.setAttribute("aria-label", window.VditorI18n["delete-column"] + "<" + (0, l.ns)("⇧⌘-") + ">"), _e.setAttribute("data-type", "deleteColumn"), _e.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-column"></use></svg>', _e.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", _e.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && dn(e, t, u, te);
                };
                var Y = document.createElement("span");
                Y.setAttribute("aria-label", window.VditorI18n.row), Y.className = "vditor-tooltipped vditor-tooltipped__n";
                var be = document.createElement("input");
                Y.appendChild(be), be.type = "number", be.min = "1", be.className = "vditor-input", be.style.width = "42px", be.style.textAlign = "center", be.setAttribute("placeholder", window.VditorI18n.row), be.value = u.rows.length.toString(), be.oninput = function() {
                  R();
                }, be.onkeydown = function(K) {
                  if (!K.isComposing) {
                    if (K.key === "Tab") {
                      xe.focus(), xe.select(), K.preventDefault();
                      return;
                    }
                    ke(e, K) || Ie(K, t);
                  }
                };
                var vt = document.createElement("span");
                vt.setAttribute("aria-label", window.VditorI18n.column), vt.className = "vditor-tooltipped vditor-tooltipped__n";
                var xe = document.createElement("input");
                vt.appendChild(xe), xe.type = "number", xe.min = "1", xe.className = "vditor-input", xe.style.width = "42px", xe.style.textAlign = "center", xe.setAttribute("placeholder", window.VditorI18n.column), xe.value = u.rows[0].cells.length.toString(), xe.oninput = function() {
                  R();
                }, xe.onkeydown = function(K) {
                  if (!K.isComposing) {
                    if (K.key === "Tab") {
                      be.focus(), be.select(), K.preventDefault();
                      return;
                    }
                    ke(e, K) || Ie(K, t);
                  }
                }, Ge(t, u, e), Fe(t, u, e), Oe(u, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", F), e.wysiwyg.popover.insertAdjacentElement("beforeend", W), e.wysiwyg.popover.insertAdjacentElement("beforeend", Z), e.wysiwyg.popover.insertAdjacentElement("beforeend", ae), e.wysiwyg.popover.insertAdjacentElement("beforeend", se), e.wysiwyg.popover.insertAdjacentElement("beforeend", Te), e.wysiwyg.popover.insertAdjacentElement("beforeend", ue), e.wysiwyg.popover.insertAdjacentElement("beforeend", Le), e.wysiwyg.popover.insertAdjacentElement("beforeend", _e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Y), e.wysiwyg.popover.insertAdjacentHTML("beforeend", " x "), e.wysiwyg.popover.insertAdjacentElement("beforeend", vt), De(e, u);
              }
              var Ut = (0, s.a1)(n, "data-type", "link-ref");
              Ut && Zt(e, Ut, t);
              var Xe = (0, s.a1)(n, "data-type", "footnotes-ref");
              if (Xe) {
                e.options.lang, e.options, e.wysiwyg.popover.innerHTML = "";
                var Y = document.createElement("span");
                Y.setAttribute("aria-label", window.VditorI18n.footnoteRef + "<" + (0, l.ns)("⌥Enter") + ">"), Y.className = "vditor-tooltipped vditor-tooltipped__n";
                var Be = document.createElement("input");
                Y.appendChild(Be), Be.className = "vditor-input", Be.setAttribute("placeholder", window.VditorI18n.footnoteRef + "<" + (0, l.ns)("⌥Enter") + ">"), Be.style.width = "120px", Be.value = Xe.getAttribute("data-footnotes-label"), Be.oninput = function() {
                  Be.value.trim() !== "" && Xe.setAttribute("data-footnotes-label", Be.value), typeof e.options.input == "function" && e.options.input(x(e));
                }, Be.onkeydown = function(te) {
                  te.isComposing || ke(e, te) || Ie(te, t);
                }, Oe(Xe, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Y), De(e, Xe);
              }
              var Se = (0, s.fb)(n, "vditor-wysiwyg__block"), Tn = Se ? Se.getAttribute("data-type").indexOf("block") > -1 : !1;
              if (e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(K) {
                if (!Se || Se && Tn && !Se.contains(K)) {
                  var te = K.previousElementSibling;
                  te.style.display = "none";
                }
              }), Se && Tn) {
                if (e.wysiwyg.popover.innerHTML = "", Ge(t, Se, e), Fe(t, Se, e), Oe(Se, e), Se.getAttribute("data-type") === "code-block") {
                  var Et = document.createElement("span");
                  Et.setAttribute("aria-label", window.VditorI18n.language + "<" + (0, l.ns)("⌥Enter") + ">"), Et.className = "vditor-tooltipped vditor-tooltipped__n";
                  var Ne = document.createElement("input");
                  Et.appendChild(Ne);
                  var at = Se.firstElementChild.firstElementChild;
                  Ne.className = "vditor-input", Ne.setAttribute("placeholder", window.VditorI18n.language + "<" + (0, l.ns)("⌥Enter") + ">"), Ne.value = at.className.indexOf("language-") > -1 ? at.className.split("-")[1].split(" ")[0] : "", Ne.oninput = function(K) {
                    Ne.value.trim() !== "" ? at.className = "language-".concat(Ne.value) : (at.className = "", e.hint.recentLanguage = ""), Se.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (Se.lastElementChild.innerHTML = Se.firstElementChild.innerHTML, ve(Se.lastElementChild, e)), ce(e), K.detail === 1 && (t.setStart(at.firstChild, 0), t.collapse(!0), (0, k.Hc)(t));
                  }, Ne.onkeydown = function(K) {
                    if (!K.isComposing && !ke(e, K)) {
                      if (K.key === "Escape" && e.hint.element.style.display === "block") {
                        e.hint.element.style.display = "none", K.preventDefault();
                        return;
                      }
                      e.hint.select(K, e), Ie(K, t);
                    }
                  }, Ne.onkeyup = function(K) {
                    var te, We;
                    if (!(K.isComposing || K.key === "Enter" || K.key === "ArrowUp" || K.key === "Escape" || K.key === "ArrowDown")) {
                      var Ke = [], ot = Ne.value.substring(0, Ne.selectionStart);
                      (e.options.preview.hljs.langs || E.g.ALIAS_CODE_LANGUAGES.concat(((We = (te = window.hljs) === null || te === void 0 ? void 0 : te.listLanguages()) !== null && We !== void 0 ? We : []).sort())).forEach(function(Pe) {
                        Pe.indexOf(ot.toLowerCase()) > -1 && Ke.push({
                          html: Pe,
                          value: Pe
                        });
                      }), e.hint.genHTML(Ke, ot, e), K.preventDefault();
                    }
                  }, e.wysiwyg.popover.insertAdjacentElement("beforeend", Et);
                }
                De(e, Se);
              } else
                Se = void 0;
              if (S) {
                e.wysiwyg.popover.innerHTML = "";
                var Y = document.createElement("span");
                Y.setAttribute("aria-label", "ID<" + (0, l.ns)("⌥Enter") + ">"), Y.className = "vditor-tooltipped vditor-tooltipped__n";
                var Ve = document.createElement("input");
                Y.appendChild(Ve), Ve.className = "vditor-input", Ve.setAttribute("placeholder", "ID<" + (0, l.ns)("⌥Enter") + ">"), Ve.style.width = "120px", Ve.value = S.getAttribute("data-id") || "", Ve.oninput = function() {
                  S.setAttribute("data-id", Ve.value), typeof e.options.input == "function" && e.options.input(x(e));
                }, Ve.onkeydown = function(te) {
                  te.isComposing || ke(e, te) || Ie(te, t);
                }, Ge(t, S, e), Fe(t, S, e), Oe(S, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Y), De(e, S);
              }
              if (h && Mt(e, h, t), !I && !i && !u && !Se && !h && !Ut && !Xe && !S && !T) {
                var Ye = (0, s.a1)(n, "data-block", "0");
                Ye && Ye.parentElement.isEqualNode(e.wysiwyg.element) ? (e.wysiwyg.popover.innerHTML = "", Ge(t, Ye, e), Fe(t, Ye, e), Oe(Ye, e), De(e, Ye)) : e.wysiwyg.popover.style.display = "none";
              }
              e.wysiwyg.element.querySelectorAll('span[data-type="backslash"] > span').forEach(function(K) {
                K.style.display = "none";
              });
              var _n = (0, s.a1)(t.startContainer, "data-type", "backslash");
              _n && (_n.querySelector("span").style.display = "inline");
            }
          }, 200);
        }, De = function(e, t) {
          var n = t, r = (0, s.lG)(t, "TABLE");
          r && (n = r), e.wysiwyg.popover.style.left = "0", e.wysiwyg.popover.style.display = "block", e.wysiwyg.popover.style.top = Math.max(-8, n.offsetTop - 21 - e.wysiwyg.element.scrollTop) + "px", e.wysiwyg.popover.style.left = Math.min(n.offsetLeft, e.wysiwyg.element.clientWidth - e.wysiwyg.popover.clientWidth) + "px", e.wysiwyg.popover.setAttribute("data-top", (n.offsetTop - 21).toString());
        }, Zt = function(e, t, n) {
          n === void 0 && (n = getSelection().getRangeAt(0)), e.wysiwyg.popover.innerHTML = "";
          var r = function() {
            a.value.trim() !== "" && (t.tagName === "IMG" ? t.setAttribute("alt", a.value) : t.textContent = a.value), d.value.trim() !== "" && t.setAttribute("data-link-label", d.value), typeof e.options.input == "function" && e.options.input(x(e));
          }, i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), a.style.width = "120px", a.value = t.getAttribute("alt") || t.textContent, a.oninput = function() {
            r();
          }, a.onkeydown = function(h) {
            ke(e, h) || Ie(h, n) || tt(e, t, h, d);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.linkRef), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          o.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.linkRef), d.value = t.getAttribute("data-link-label"), d.oninput = function() {
            r();
          }, d.onkeydown = function(h) {
            ke(e, h) || Ie(h, n) || tt(e, t, h, a);
          }, Oe(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", i), e.wysiwyg.popover.insertAdjacentElement("beforeend", o), De(e, t);
        }, Ge = function(e, t, n) {
          var r = t.previousElementSibling;
          if (!(!r || !t.parentElement.isEqualNode(n.wysiwyg.element) && t.tagName !== "LI")) {
            var i = document.createElement("button");
            i.setAttribute("type", "button"), i.setAttribute("data-type", "up"), i.setAttribute("aria-label", window.VditorI18n.up + "<" + (0, l.ns)("⇧⌘U") + ">"), i.innerHTML = '<svg><use xlink:href="#vditor-icon-up"></use></svg>', i.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i.onclick = function() {
              e.insertNode(document.createElement("wbr")), r.insertAdjacentElement("beforebegin", t), (0, k.ib)(n.wysiwyg.element, e), ce(n), qe(n), ye(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", i);
          }
        }, Fe = function(e, t, n) {
          var r = t.nextElementSibling;
          if (!(!r || !t.parentElement.isEqualNode(n.wysiwyg.element) && t.tagName !== "LI")) {
            var i = document.createElement("button");
            i.setAttribute("type", "button"), i.setAttribute("data-type", "down"), i.setAttribute("aria-label", window.VditorI18n.down + "<" + (0, l.ns)("⇧⌘D") + ">"), i.innerHTML = '<svg><use xlink:href="#vditor-icon-down"></use></svg>', i.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i.onclick = function() {
              e.insertNode(document.createElement("wbr")), r.insertAdjacentElement("afterend", t), (0, k.ib)(n.wysiwyg.element, e), ce(n), qe(n), ye(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", i);
          }
        }, Oe = function(e, t) {
          var n = document.createElement("button");
          n.setAttribute("type", "button"), n.setAttribute("data-type", "remove"), n.setAttribute("aria-label", window.VditorI18n.remove + "<" + (0, l.ns)("⇧⌘X") + ">"), n.innerHTML = '<svg><use xlink:href="#vditor-icon-trashcan"></use></svg>', n.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", n.onclick = function() {
            var r = (0, k.zh)(t);
            r.setStartAfter(e), (0, k.Hc)(r), e.remove(), ce(t), qe(t), ["H1", "H2", "H3", "H4", "H5", "H6"].includes(e.tagName) && Re(t);
          }, t.wysiwyg.popover.insertAdjacentElement("beforeend", n);
        }, tt = function(e, t, n, r) {
          if (!n.isComposing) {
            if (n.key === "Tab") {
              r.focus(), r.select(), n.preventDefault();
              return;
            }
            if (!(0, l.yl)(n) && !n.shiftKey && n.altKey && n.key === "Enter") {
              var i = (0, k.zh)(e);
              t.insertAdjacentHTML("afterend", E.g.ZWSP), i.setStartAfter(t.nextSibling), i.collapse(!0), (0, k.Hc)(i), n.preventDefault();
            }
          }
        }, Mt = function(e, t, n) {
          e.wysiwyg.popover.innerHTML = "";
          var r = function() {
            a.value.trim() !== "" && (t.innerHTML = a.value), t.setAttribute("href", d.value), t.setAttribute("title", u.value), ce(e);
          };
          t.querySelectorAll("[data-marker]").forEach(function(S) {
            S.removeAttribute("data-marker");
          });
          var i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), a.style.width = "120px", a.value = t.innerHTML || "", a.oninput = function() {
            r();
          }, a.onkeydown = function(S) {
            ke(e, S) || Ie(S, n) || tt(e, t, S, d);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.link), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          o.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.link), d.value = t.getAttribute("href") || "", d.oninput = function() {
            r();
          }, d.onkeydown = function(S) {
            ke(e, S) || Ie(S, n) || tt(e, t, S, u);
          };
          var h = document.createElement("span");
          h.setAttribute("aria-label", window.VditorI18n.tooltipText), h.className = "vditor-tooltipped vditor-tooltipped__n";
          var u = document.createElement("input");
          h.appendChild(u), u.className = "vditor-input", u.setAttribute("placeholder", window.VditorI18n.tooltipText), u.style.width = "60px", u.value = t.getAttribute("title") || "", u.oninput = function() {
            r();
          }, u.onkeydown = function(S) {
            ke(e, S) || Ie(S, n) || tt(e, t, S, a);
          }, Oe(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", i), e.wysiwyg.popover.insertAdjacentElement("beforeend", o), e.wysiwyg.popover.insertAdjacentElement("beforeend", h), De(e, t);
        }, Un = function(e, t) {
          var n = e.target;
          t.wysiwyg.popover.innerHTML = "";
          var r = function() {
            n.setAttribute("src", a.value), n.setAttribute("alt", d.value), n.setAttribute("title", u.value), typeof t.options.input == "function" && t.options.input(x(t));
          }, i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.imageURL), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.imageURL), a.value = n.getAttribute("src") || "", a.oninput = function() {
            r();
          }, a.onkeydown = function(S) {
            ke(t, S);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.alternateText), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          o.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.alternateText), d.style.width = "52px", d.value = n.getAttribute("alt") || "", d.oninput = function() {
            r();
          }, d.onkeydown = function(S) {
            ke(t, S);
          };
          var h = document.createElement("span");
          h.setAttribute("aria-label", window.VditorI18n.title), h.className = "vditor-tooltipped vditor-tooltipped__n";
          var u = document.createElement("input");
          h.appendChild(u), u.className = "vditor-input", u.setAttribute("placeholder", window.VditorI18n.title), u.value = n.getAttribute("title") || "", u.oninput = function() {
            r();
          }, u.onkeydown = function(S) {
            ke(t, S);
          }, Oe(n, t), t.wysiwyg.popover.insertAdjacentElement("beforeend", i), t.wysiwyg.popover.insertAdjacentElement("beforeend", o), t.wysiwyg.popover.insertAdjacentElement("beforeend", h), De(t, n);
        }, Ie = function(e, t) {
          if (!(0, l.yl)(e) && !e.shiftKey && e.key === "Enter" || e.key === "Escape")
            return t && (0, k.Hc)(t), e.preventDefault(), e.stopPropagation(), !0;
        }, Ze = function(e) {
          e.currentMode === "wysiwyg" ? qe(e) : e.currentMode === "ir" && $e(e);
        }, Jt = function(e, t, n) {
          n === void 0 && (n = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          });
          var r = e.wysiwyg.element;
          r.innerHTML = e.lute.Md2VditorDOM(t), r.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(i) {
            ve(i, e), i.previousElementSibling.setAttribute("style", "display:none");
          }), ce(e, n);
        }, Vn = function(e, t, n) {
          for (var r = e.startContainer.parentElement, i = !1, a = "", o = "", d = jn(e), h = d.beforeHTML, u = d.afterHTML; r && !i; ) {
            var S = r.tagName;
            if (S === "STRIKE" && (S = "S"), S === "I" && (S = "EM"), S === "B" && (S = "STRONG"), S === "S" || S === "STRONG" || S === "EM") {
              var T = "", I = "", R = "";
              r.parentElement.getAttribute("data-block") !== "0" && (I = Ft(r), R = Gt(r)), (h || I) && (T = "".concat(I, "<").concat(S, ">").concat(h, "</").concat(S, ">"), h = T), (n === "bold" && S === "STRONG" || n === "italic" && S === "EM" || n === "strikeThrough" && S === "S") && (T += "".concat(a).concat(E.g.ZWSP, "<wbr>").concat(o), i = !0), (u || R) && (u = "<".concat(S, ">").concat(u, "</").concat(S, ">").concat(R), T += u), r.parentElement.getAttribute("data-block") !== "0" ? (r = r.parentElement, r.innerHTML = T) : (r.outerHTML = T, r = r.parentElement), a = "<".concat(S, ">") + a, o = "</".concat(S, ">") + o;
            } else
              i = !0;
          }
          (0, k.ib)(t.wysiwyg.element, e);
        }, Wn = function(e, t, n) {
          if (!(e.wysiwyg.composingLock && n instanceof CustomEvent)) {
            var r = !0, i = !0;
            e.wysiwyg.element.querySelector("wbr") && e.wysiwyg.element.querySelector("wbr").remove();
            var a = (0, k.zh)(e), o = t.getAttribute("data-type");
            if (t.classList.contains("vditor-menu--current"))
              if (o === "strike" && (o = "strikeThrough"), o === "quote") {
                var d = (0, s.lG)(a.startContainer, "BLOCKQUOTE");
                d || (d = a.startContainer.childNodes[a.startOffset]), d && (r = !1, t.classList.remove("vditor-menu--current"), a.insertNode(document.createElement("wbr")), d.outerHTML = d.innerHTML.trim() === "" ? '<p data-block="0">'.concat(d.innerHTML, "</p>") : d.innerHTML, (0, k.ib)(e.wysiwyg.element, a));
              } else if (o === "inline-code") {
                var h = (0, s.lG)(a.startContainer, "CODE");
                h || (h = a.startContainer.childNodes[a.startOffset]), h && (h.outerHTML = h.innerHTML.replace(E.g.ZWSP, "") + "<wbr>", (0, k.ib)(e.wysiwyg.element, a));
              } else o === "link" ? (a.collapsed && a.selectNode(a.startContainer.parentElement), document.execCommand("unlink", !1, "")) : o === "check" || o === "list" || o === "ordered-list" ? (mt(e, a, o), (0, k.ib)(e.wysiwyg.element, a), r = !1, t.classList.remove("vditor-menu--current")) : (r = !1, t.classList.remove("vditor-menu--current"), a.toString() === "" ? Vn(a, e, o) : document.execCommand(o, !1, ""));
            else {
              e.wysiwyg.element.childNodes.length === 0 && (e.wysiwyg.element.innerHTML = '<p data-block="0"><wbr></p>', (0, k.ib)(e.wysiwyg.element, a));
              var u = (0, s.F9)(a.startContainer);
              if (o === "quote") {
                if (u || (u = a.startContainer.childNodes[a.startOffset]), u) {
                  r = !1, t.classList.add("vditor-menu--current"), a.insertNode(document.createElement("wbr"));
                  var S = (0, s.lG)(a.startContainer, "LI");
                  S && u.contains(S) ? S.innerHTML = '<blockquote data-block="0">'.concat(S.innerHTML, "</blockquote>") : u.outerHTML = '<blockquote data-block="0">'.concat(u.outerHTML, "</blockquote>"), (0, k.ib)(e.wysiwyg.element, a);
                }
              } else if (o === "check" || o === "list" || o === "ordered-list")
                mt(e, a, o, !1), (0, k.ib)(e.wysiwyg.element, a), r = !1, g(e.toolbar.elements, ["check", "list", "ordered-list"]), t.classList.add("vditor-menu--current");
              else if (o === "inline-code") {
                if (a.toString() === "") {
                  var T = document.createElement("code");
                  T.textContent = E.g.ZWSP, a.insertNode(T), a.setStart(T.firstChild, 1), a.collapse(!0), (0, k.Hc)(a);
                } else if (a.startContainer.nodeType === 3) {
                  var T = document.createElement("code");
                  a.surroundContents(T), a.insertNode(T), (0, k.Hc)(a);
                }
                t.classList.add("vditor-menu--current");
              } else if (o === "code") {
                var T = document.createElement("div");
                T.className = "vditor-wysiwyg__block", T.setAttribute("data-type", "code-block"), T.setAttribute("data-block", "0"), T.setAttribute("data-marker", "```"), a.toString() === "" ? T.innerHTML = `<pre><code><wbr>
</code></pre>` : (T.innerHTML = "<pre><code>".concat(a.toString(), "<wbr></code></pre>"), a.deleteContents()), a.insertNode(T), u && (u.outerHTML = e.lute.SpinVditorDOM(u.outerHTML)), (0, k.ib)(e.wysiwyg.element, a), e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(se) {
                  ve(se, e);
                }), t.classList.add("vditor-menu--disabled");
              } else if (o === "link") {
                if (a.toString() === "") {
                  var I = document.createElement("a");
                  I.innerText = E.g.ZWSP, a.insertNode(I), a.setStart(I.firstChild, 1), a.collapse(!0), Mt(e, I, a);
                  var R = e.wysiwyg.popover.querySelector("input");
                  R.value = "", R.focus(), i = !1;
                } else {
                  var T = document.createElement("a");
                  T.setAttribute("href", ""), T.innerHTML = a.toString(), a.surroundContents(T), a.insertNode(T), (0, k.Hc)(a), Mt(e, T, a);
                  var O = e.wysiwyg.popover.querySelectorAll("input");
                  O[0].value = T.innerText, O[1].focus();
                }
                r = !1, t.classList.add("vditor-menu--current");
              } else if (o === "table") {
                var q = '<table data-block="0"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>';
                if (a.toString().trim() === "")
                  u && u.innerHTML.trim().replace(E.g.ZWSP, "") === "" ? u.outerHTML = q : document.execCommand("insertHTML", !1, q), a.selectNode(e.wysiwyg.element.querySelector("wbr").previousSibling), e.wysiwyg.element.querySelector("wbr").remove(), (0, k.Hc)(a);
                else {
                  q = '<table data-block="0"><thead><tr>';
                  var B = a.toString().split(`
`), D = B[0].split(",").length > B[0].split("	").length ? "," : "	";
                  B.forEach(function(Z, se) {
                    se === 0 ? (Z.split(D).forEach(function(ae, ue) {
                      ue === 0 ? q += "<th>".concat(ae, "<wbr></th>") : q += "<th>".concat(ae, "</th>");
                    }), q += "</tr></thead>") : (se === 1 ? q += "<tbody><tr>" : q += "<tr>", Z.split(D).forEach(function(ae) {
                      q += "<td>".concat(ae, "</td>");
                    }), q += "</tr>");
                  }), q += "</tbody></table>", document.execCommand("insertHTML", !1, q), (0, k.ib)(e.wysiwyg.element, a);
                }
                r = !1, t.classList.add("vditor-menu--disabled");
              } else if (o === "line") {
                if (u) {
                  var F = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                  u.innerHTML.trim() === "" ? u.outerHTML = F : u.insertAdjacentHTML("afterend", F), (0, k.ib)(e.wysiwyg.element, a);
                }
              } else if (r = !1, t.classList.add("vditor-menu--current"), o === "strike" && (o = "strikeThrough"), a.toString() === "" && (o === "bold" || o === "italic" || o === "strikeThrough")) {
                var W = "strong";
                o === "italic" ? W = "em" : o === "strikeThrough" && (W = "s");
                var T = document.createElement(W);
                T.textContent = E.g.ZWSP, a.insertNode(T), T.previousSibling && T.previousSibling.textContent === E.g.ZWSP && (T.previousSibling.textContent = ""), a.setStart(T.firstChild, 1), a.collapse(!0), (0, k.Hc)(a);
              } else
                document.execCommand(o, !1, "");
            }
            r && qe(e), i && ce(e);
          }
        }, he = (
          /** @class */
          /* @__PURE__ */ function() {
            function e(t, n) {
              var r, i = this;
              this.element = document.createElement("div"), n.className && (r = this.element.classList).add.apply(r, n.className.split(" "));
              var a = n.hotkey ? " <".concat((0, l.ns)(n.hotkey), ">") : "";
              n.level === 2 && (a = n.hotkey ? " &lt;".concat((0, l.ns)(n.hotkey), "&gt;") : "");
              var o = n.tip ? n.tip + a : "".concat(window.VditorI18n[n.name]).concat(a), d = n.name === "upload" ? "div" : "button";
              if (n.level === 2)
                this.element.innerHTML = "<".concat(d, ' data-type="').concat(n.name, '">').concat(o, "</").concat(d, ">");
              else {
                this.element.classList.add("vditor-toolbar__item");
                var h = document.createElement(d);
                h.setAttribute("data-type", n.name), h.className = "vditor-tooltipped vditor-tooltipped__".concat(n.tipPosition), h.setAttribute("aria-label", o), h.innerHTML = n.icon, this.element.appendChild(h);
              }
              n.prefix && this.element.children[0].addEventListener((0, l.Le)(), function(u) {
                u.preventDefault(), !i.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED) && (t.currentMode === "wysiwyg" ? Wn(t, i.element.children[0], u) : t.currentMode === "ir" ? rr(t, i.element.children[0], n.prefix || "", n.suffix || "") : Gn(t, i.element.children[0], n.prefix || "", n.suffix || ""));
              });
            }
            return e;
          }()
        ), Kn = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), ze = function(e, t, n) {
          var r;
          if (typeof n != "string" ? (b(e, ["subToolbar", "hint"]), n.preventDefault(), r = x(e)) : r = n, !(e.currentMode === t && typeof n != "string")) {
            if (e.devtools && e.devtools.renderEchart(e), e.options.preview.mode === "both" && t === "sv" ? e.preview.element.style.display = "block" : e.preview.element.style.display = "none", m(e.toolbar.elements, E.g.EDIT_TOOLBARS), g(e.toolbar.elements, E.g.EDIT_TOOLBARS), f(e.toolbar.elements, ["outdent", "indent"]), t === "ir")
              v(e.toolbar.elements, ["both"]), w(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "block", e.lute.SetVditorIR(!0), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!1), e.currentMode = "ir", e.ir.element.innerHTML = e.lute.Md2VditorIRDOM(r), je(e, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), He(e), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(a) {
                ve(a, e);
              }), e.ir.element.querySelectorAll(".vditor-toc").forEach(function(a) {
                (0, ne.H)(a, {
                  cdn: e.options.cdn,
                  math: e.options.preview.math
                });
              });
            else if (t === "wysiwyg")
              v(e.toolbar.elements, ["both"]), w(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "block", e.ir.element.parentElement.style.display = "none", e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!0), e.lute.SetVditorSV(!1), e.currentMode = "wysiwyg", He(e), Jt(e, r, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), e.wysiwyg.element.querySelectorAll(".vditor-toc").forEach(function(a) {
                (0, ne.H)(a, {
                  cdn: e.options.cdn,
                  math: e.options.preview.math
                });
              }), e.wysiwyg.popover.style.display = "none";
            else if (t === "sv") {
              w(e.toolbar.elements, ["both"]), v(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "none", (e.options.preview.mode === "both" || e.options.preview.mode === "editor") && (e.sv.element.style.display = "block"), e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!0), e.currentMode = "sv";
              var i = Yt(r, e);
              i === "<div data-block='0'></div>" && (i = ""), e.sv.element.innerHTML = i, ge(e.sv.element), Ee(e, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), He(e);
            }
            e.undo.resetIcon(e), typeof n != "string" && (e[e.currentMode].element.focus(), Ze(e)), Re(e), ut(e), e.toolbar.elements["edit-mode"] && (e.toolbar.elements["edit-mode"].querySelectorAll("button").forEach(function(a) {
              a.classList.remove("vditor-menu--current");
            }), e.toolbar.elements["edit-mode"].querySelector('button[data-mode="'.concat(e.currentMode, '"]')).classList.add("vditor-menu--current")), e.outline.toggle(e, e.currentMode !== "sv" && e.options.outline.enable, typeof n != "string");
          }
        }, qn = (
          /** @class */
          function(e) {
            Kn(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = document.createElement("div");
              return a.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow"), a.innerHTML = '<button data-mode="wysiwyg">'.concat(window.VditorI18n.wysiwyg, " &lt;").concat((0, l.ns)("⌥⌘7"), `></button>
<button data-mode="ir">`).concat(window.VditorI18n.instantRendering, " &lt;").concat((0, l.ns)("⌥⌘8"), `></button>
<button data-mode="sv">`).concat(window.VditorI18n.splitView, " &lt;").concat((0, l.ns)("⌥⌘9"), "></button>"), i.element.appendChild(a), i._bindEvent(n, a, r), i;
            }
            return t.prototype._bindEvent = function(n, r, i) {
              var a = this.element.children[0];
              y(n, r, a, i.level), r.children.item(0).addEventListener((0, l.Le)(), function(o) {
                ze(n, "wysiwyg", o), o.preventDefault(), o.stopPropagation();
              }), r.children.item(1).addEventListener((0, l.Le)(), function(o) {
                ze(n, "ir", o), o.preventDefault(), o.stopPropagation();
              }), r.children.item(2).addEventListener((0, l.Le)(), function(o) {
                ze(n, "sv", o), o.preventDefault(), o.stopPropagation();
              });
            }, t;
          }(he)
        ), nt = function(e, t) {
          return (0, k.Gb)(e, t) ? getSelection().toString() : "";
        }, kt = function(e, t) {
          t.addEventListener("focus", function() {
            e.options.focus && e.options.focus(x(e)), b(e, ["subToolbar", "hint"]);
          });
        }, Xt = function(e, t) {
          t.addEventListener("dblclick", function(n) {
            n.target.tagName === "IMG" && (e.options.image.preview ? e.options.image.preview(n.target) : e.options.image.isPreview && (0, z.E)(n.target, e.options.lang, e.options.theme));
          });
        }, Tt = function(e, t) {
          t.addEventListener("blur", function(n) {
            if (e.currentMode === "ir") {
              var r = e.ir.element.querySelector(".vditor-ir__node--expand");
              r && r.classList.remove("vditor-ir__node--expand");
            } else e.currentMode === "wysiwyg" && !e.wysiwyg.selectPopover.contains(n.relatedTarget) && e.wysiwyg.hideComment();
            e[e.currentMode].range = (0, k.zh)(e), e.options.blur && e.options.blur(x(e));
          });
        }, _t = function(e, t) {
          t.addEventListener("dragstart", function(n) {
            n.dataTransfer.setData(E.g.DROP_EDITOR, E.g.DROP_EDITOR);
          }), t.addEventListener("drop", function(n) {
            n.dataTransfer.getData(E.g.DROP_EDITOR) ? $(e) : (n.dataTransfer.types.includes("Files") || n.dataTransfer.types.includes("text/html")) && bt(e, n, {
              pasteCode: function(r) {
                document.execCommand("insertHTML", !1, r);
              }
            });
          });
        }, At = function(e, t, n) {
          t.addEventListener("copy", function(r) {
            return n(r, e);
          });
        }, xt = function(e, t, n) {
          t.addEventListener("cut", function(r) {
            n(r, e), e.options.comment.enable && e.currentMode === "wysiwyg" && e.wysiwyg.getComments(e), document.execCommand("delete");
          });
        }, ye = function(e) {
          if (e.currentMode === "wysiwyg" && e.options.comment.enable && e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)), !!e.options.typewriterMode) {
            var t = e[e.currentMode].element, n = (0, k.Ny)(t).top;
            e.options.height === "auto" && !e.element.classList.contains("vditor--fullscreen") && window.scrollTo(window.scrollX, n + e.element.offsetTop + e.toolbar.element.offsetHeight - window.innerHeight / 2 + 10), (e.options.height !== "auto" || e.element.classList.contains("vditor--fullscreen")) && (t.scrollTop = n + t.scrollTop - t.clientHeight / 2 + 10);
          }
        }, Ht = function(e, t) {
          t.addEventListener("keydown", function(n) {
            if (!n.isComposing && e.options.keydown && e.options.keydown(n), !((e.options.hint.extend.length > 1 || e.toolbar.elements.emoji) && e.hint.select(n, e))) {
              if (e.options.comment.enable && e.currentMode === "wysiwyg" && (n.key === "Backspace" || N("⌘X", n)) && e.wysiwyg.getComments(e), e.currentMode === "sv") {
                if (Ce(e, n))
                  return;
              } else if (e.currentMode === "wysiwyg") {
                if (Bn(e, n))
                  return;
              } else if (e.currentMode === "ir" && pe(e, n))
                return;
              if (e.options.ctrlEnter && N("⌘Enter", n)) {
                e.options.ctrlEnter(x(e)), n.preventDefault();
                return;
              }
              if (N("⌘Z", n) && !e.toolbar.elements.undo) {
                e.undo.undo(e), n.preventDefault();
                return;
              }
              if (N("⌘Y", n) && !e.toolbar.elements.redo) {
                e.undo.redo(e), n.preventDefault();
                return;
              }
              if (n.key === "Escape") {
                e.hint.element.style.display === "block" ? e.hint.element.style.display = "none" : e.options.esc && !n.isComposing && e.options.esc(x(e)), n.preventDefault();
                return;
              }
              if ((0, l.yl)(n) && n.altKey && !n.shiftKey && /^Digit[1-6]$/.test(n.code)) {
                if (e.currentMode === "wysiwyg") {
                  var r = n.code.replace("Digit", "H");
                  (0, s.lG)(getSelection().getRangeAt(0).startContainer, r) ? Lt(e) : ft(e, r), ce(e);
                } else e.currentMode === "sv" ? Qt(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ") : e.currentMode === "ir" && it(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ");
                return n.preventDefault(), !0;
              }
              if ((0, l.yl)(n) && n.altKey && !n.shiftKey && /^Digit[7-9]$/.test(n.code))
                return n.code === "Digit7" ? ze(e, "wysiwyg", n) : n.code === "Digit8" ? ze(e, "ir", n) : n.code === "Digit9" && ze(e, "sv", n), !0;
              e.options.toolbar.find(function(i) {
                if (!i.hotkey || i.toolbar) {
                  if (i.toolbar) {
                    var a = i.toolbar.find(function(o) {
                      if (!o.hotkey)
                        return !1;
                      if (N(o.hotkey, n))
                        return e.toolbar.elements[o.name].children[0].dispatchEvent(new CustomEvent((0, l.Le)())), n.preventDefault(), !0;
                    });
                    return !!a;
                  }
                  return !1;
                }
                if (N(i.hotkey, n))
                  return e.toolbar.elements[i.name].children[0].dispatchEvent(new CustomEvent((0, l.Le)())), n.preventDefault(), !0;
              });
            }
          });
        }, Dt = function(e, t) {
          t.addEventListener("selectstart", function(n) {
            t.onmouseup = function() {
              setTimeout(function() {
                var r = nt(e[e.currentMode].element);
                r.trim() ? (e.currentMode === "wysiwyg" && e.options.comment.enable && (!(0, s.a1)(n.target, "data-type", "footnotes-block") && !(0, s.a1)(n.target, "data-type", "link-ref-defs-block") ? e.wysiwyg.showComment() : e.wysiwyg.hideComment()), e.options.select && e.options.select(r)) : e.currentMode === "wysiwyg" && e.options.comment.enable && e.wysiwyg.hideComment();
              });
            };
          });
        }, Ot = function(e, t) {
          var n = (0, k.zh)(e);
          n.extractContents(), n.insertNode(document.createTextNode(Lute.Caret)), n.insertNode(document.createTextNode(t));
          var r = (0, s.a1)(n.startContainer, "data-block", "0");
          r || (r = e.sv.element);
          var i = e.lute.SpinVditorSVDOM(r.textContent);
          i = "<div data-block='0'>" + i.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", r.isEqualNode(e.sv.element) ? r.innerHTML = i : r.outerHTML = i, ge(e.sv.element), (0, k.ib)(e.sv.element, n), ye(e);
        }, dt = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e;
          for (r.nodeType === 3 && (r = r.parentElement); r; ) {
            if (r.getAttribute("data-type") === t)
              return r;
            n ? r = r.previousElementSibling : r = r.nextElementSibling;
          }
          return !1;
        }, Yt = function(e, t) {
          A("SpinVditorSVDOM", e, "argument", t.options.debugger);
          var n = t.lute.SpinVditorSVDOM(e);
          return e = "<div data-block='0'>" + n.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", A("SpinVditorSVDOM", e, "result", t.options.debugger), e;
        }, zn = function(e) {
          var t = e.getAttribute("data-type"), n = e.previousElementSibling, r = t && t !== "text" && t !== "table" && t !== "heading-marker" && t !== "newline" && t !== "yaml-front-matter-open-marker" && t !== "yaml-front-matter-close-marker" && t !== "code-block-info" && t !== "code-block-close-marker" && t !== "code-block-open-marker" ? e.textContent : "", i = !1;
          for (t === "newline" && (i = !0); n && !i; ) {
            var a = n.getAttribute("data-type");
            if (a === "li-marker" || a === "blockquote-marker" || a === "task-marker" || a === "padding") {
              var o = n.textContent;
              if (a === "li-marker" && (t === "code-block-open-marker" || t === "code-block-info"))
                r = o.replace(/\S/g, " ") + r;
              else if (t === "code-block-close-marker" && n.nextElementSibling.isSameNode(e)) {
                var d = dt(e, "code-block-open-marker");
                d && d.previousElementSibling && (n = d.previousElementSibling, r = o + r);
              } else
                r = o + r;
            } else a === "newline" && (i = !0);
            n = n.previousElementSibling;
          }
          return r;
        }, Ee = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && e.hint.render(e), e.preview.render(e);
          var n = x(e);
          typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), clearTimeout(e.sv.processTimeoutId), e.sv.processTimeoutId = window.setTimeout(function() {
            t.enableAddUndoStack && !e.sv.composingLock && e.undo.addToUndoStack(e);
          }, e.options.undoDelay);
        }, Qt = function(e, t) {
          var n = (0, k.zh)(e), r = (0, C.S)(n.startContainer, "SPAN");
          r && r.textContent.trim() !== "" && (t = `
` + t), n.collapse(!0), document.execCommand("insertHTML", !1, t);
        }, Gn = function(e, t, n, r) {
          var i = (0, k.zh)(e), a = t.getAttribute("data-type");
          e.sv.element.childNodes.length === 0 && (e.sv.element.innerHTML = `<span data-type="p" data-block="0"><span data-type="text"><wbr></span></span><span data-type="newline"><br><span style="display: none">
</span></span>`, (0, k.ib)(e.sv.element, i));
          var o = (0, s.F9)(i.startContainer), d = (0, C.S)(i.startContainer, "SPAN");
          if (o) {
            if (a === "link") {
              var h = void 0;
              i.toString() === "" ? h = "".concat(n).concat(Lute.Caret).concat(r) : h = "".concat(n).concat(i.toString()).concat(r.replace(")", Lute.Caret + ")")), document.execCommand("insertHTML", !1, h);
              return;
            } else if (a === "italic" || a === "bold" || a === "strike" || a === "inline-code" || a === "code" || a === "table" || a === "line") {
              var h = void 0;
              i.toString() === "" ? h = "".concat(n).concat(Lute.Caret).concat(a === "code" ? "" : r) : h = "".concat(n).concat(i.toString()).concat(Lute.Caret).concat(a === "code" ? "" : r), a === "table" || a === "code" && d && d.textContent !== "" ? h = `

` + h : a === "line" && (h = `

`.concat(n, `
`).concat(Lute.Caret)), document.execCommand("insertHTML", !1, h);
              return;
            } else if ((a === "check" || a === "list" || a === "ordered-list" || a === "quote") && d) {
              var u = "* ";
              a === "check" ? u = "* [ ] " : a === "ordered-list" ? u = "1. " : a === "quote" && (u = "> ");
              var S = dt(d, "newline");
              S ? S.insertAdjacentText("afterend", u) : o.insertAdjacentText("afterbegin", u), ie(e);
              return;
            }
            (0, k.ib)(e.sv.element, i), Ee(e);
          }
        }, $t = function(e) {
          switch (e.currentMode) {
            case "ir":
              return e.ir.element;
            case "wysiwyg":
              return e.wysiwyg.element;
            case "sv":
              return e.sv.element;
          }
        }, en = function(e, t) {
          e.options.upload.setHeaders && (e.options.upload.headers = e.options.upload.setHeaders()), e.options.upload.headers && Object.keys(e.options.upload.headers).forEach(function(n) {
            t.setRequestHeader(n, e.options.upload.headers[n]);
          });
        }, Fn = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function d(S) {
              try {
                u(r.next(S));
              } catch (T) {
                o(T);
              }
            }
            function h(S) {
              try {
                u(r.throw(S));
              } catch (T) {
                o(T);
              }
            }
            function u(S) {
              S.done ? a(S.value) : i(S.value).then(d, h);
            }
            u((r = r.apply(e, [])).next());
          });
        }, Zn = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1) throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(u) {
            return function(S) {
              return h([u, S]);
            };
          }
          function h(u) {
            if (r) throw new TypeError("Generator is already executing.");
            for (; o && (o = 0, u[0] && (n = 0)), n; ) try {
              if (r = 1, i && (a = u[0] & 2 ? i.return : u[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, u[1])).done) return a;
              switch (i = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
                case 0:
                case 1:
                  a = u;
                  break;
                case 4:
                  return n.label++, { value: u[1], done: !1 };
                case 5:
                  n.label++, i = u[1], u = [0];
                  continue;
                case 7:
                  u = n.ops.pop(), n.trys.pop();
                  continue;
                default:
                  if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                    n = 0;
                    continue;
                  }
                  if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
                    n.label = u[1];
                    break;
                  }
                  if (u[0] === 6 && n.label < a[1]) {
                    n.label = a[1], a = u;
                    break;
                  }
                  if (a && n.label < a[2]) {
                    n.label = a[2], n.ops.push(u);
                    break;
                  }
                  a[2] && n.ops.pop(), n.trys.pop();
                  continue;
              }
              u = t.call(e, n);
            } catch (S) {
              u = [6, S], i = 0;
            } finally {
              r = a = 0;
            }
            if (u[0] & 5) throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, Jn = (
          /** @class */
          /* @__PURE__ */ function() {
            function e() {
              this.isUploading = !1, this.element = document.createElement("div"), this.element.className = "vditor-upload";
            }
            return e;
          }()
        ), Xn = function(e, t) {
          e.tip.hide();
          var n = [], r = "", i = "";
          e.options.lang, e.options;
          for (var a = function(h, u) {
            var S = t[u], T = !0;
            S.name || (r += "<li>".concat(window.VditorI18n.nameEmpty, "</li>"), T = !1), S.size > e.options.upload.max && (r += "<li>".concat(S.name, " ").concat(window.VditorI18n.over, " ").concat(e.options.upload.max / 1024 / 1024, "M</li>"), T = !1);
            var I = S.name.lastIndexOf("."), R = S.name.substr(I), O = e.options.upload.filename(S.name.substr(0, I)) + R;
            if (e.options.upload.accept) {
              var q = e.options.upload.accept.split(",").some(function(B) {
                var D = B.trim();
                if (D.indexOf(".") === 0) {
                  if (R.toLowerCase() === D.toLowerCase())
                    return !0;
                } else if (S.type.split("/")[0] === D.split("/")[0])
                  return !0;
                return !1;
              });
              q || (r += "<li>".concat(S.name, " ").concat(window.VditorI18n.fileTypeError, "</li>"), T = !1);
            }
            T && (n.push(S), i += "<li>".concat(O, " ").concat(window.VditorI18n.uploading, "</li>"));
          }, o = t.length, d = 0; d < o; d++)
            a(o, d);
          return e.tip.show("<ul>".concat(r).concat(i, "</ul>")), n;
        }, Yn = function(e, t) {
          var n = $t(t);
          n.focus();
          var r = JSON.parse(e), i = "";
          r.code === 1 && (i = "".concat(r.msg)), r.data.errFiles && r.data.errFiles.length > 0 && (i = "<ul><li>".concat(i, "</li>"), r.data.errFiles.forEach(function(o) {
            var d = o.lastIndexOf("."), h = t.options.upload.filename(o.substr(0, d)) + o.substr(d);
            i += "<li>".concat(h, " ").concat(window.VditorI18n.uploadError, "</li>");
          }), i += "</ul>"), i ? t.tip.show(i) : t.tip.hide();
          var a = "";
          Object.keys(r.data.succMap).forEach(function(o) {
            var d = r.data.succMap[o], h = o.lastIndexOf("."), u = o.substr(h), S = t.options.upload.filename(o.substr(0, h)) + u;
            u = u.toLowerCase(), u.indexOf(".wav") === 0 || u.indexOf(".mp3") === 0 || u.indexOf(".ogg") === 0 ? t.currentMode === "wysiwyg" ? a += `<div class="vditor-wysiwyg__block" data-type="html-block"
 data-block="0"><pre><code>&lt;audio controls="controls" src="`.concat(d, '"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="').concat(d, `"></audio></pre></div>
`) : t.currentMode === "ir" ? a += '<audio controls="controls" src="'.concat(d, `"></audio>
`) : a += "[".concat(S, "](").concat(d, `)
`) : u.indexOf(".apng") === 0 || u.indexOf(".bmp") === 0 || u.indexOf(".gif") === 0 || u.indexOf(".ico") === 0 || u.indexOf(".cur") === 0 || u.indexOf(".jpg") === 0 || u.indexOf(".jpeg") === 0 || u.indexOf(".jfif") === 0 || u.indexOf(".pjp") === 0 || u.indexOf(".pjpeg") === 0 || u.indexOf(".png") === 0 || u.indexOf(".svg") === 0 || u.indexOf(".webp") === 0 ? t.currentMode === "wysiwyg" ? a += '<img alt="'.concat(S, '" src="').concat(d, `">
`) : a += "![".concat(S, "](").concat(d, `)
`) : t.currentMode === "wysiwyg" ? a += '<a href="'.concat(d, '">').concat(S, `</a>
`) : a += "[".concat(S, "](").concat(d, `)
`);
          }), (0, k.Hc)(t.upload.range), document.execCommand("insertHTML", !1, a), t.upload.range = getSelection().getRangeAt(0).cloneRange();
        }, Nt = function(e, t, n) {
          return Fn(void 0, void 0, void 0, function() {
            var r, i, O, a, o, o, d, h, u, S, T, I, R, O, q, B;
            return Zn(this, function(D) {
              switch (D.label) {
                case 0:
                  for (r = [], i = e.options.upload.multiple === !0 ? t.length : 1, O = 0; O < i; O++)
                    a = t[O], a instanceof DataTransferItem && (a = a.getAsFile()), r.push(a);
                  return e.options.upload.handler ? [4, e.options.upload.handler(r)] : [3, 2];
                case 1:
                  return o = D.sent(), n && (n.value = ""), typeof o == "string" ? (e.tip.show(o), [
                    2
                    /*return*/
                  ]) : [
                    2
                    /*return*/
                  ];
                case 2:
                  return !e.options.upload.url || !e.upload ? (n && (n.value = ""), e.tip.show("please config: options.upload.url"), [
                    2
                    /*return*/
                  ]) : e.options.upload.file ? [4, e.options.upload.file(r)] : [3, 4];
                case 3:
                  r = D.sent(), D.label = 4;
                case 4:
                  if (e.options.upload.validate && (o = e.options.upload.validate(r), typeof o == "string"))
                    return e.tip.show(o), [
                      2
                      /*return*/
                    ];
                  if (d = $t(e), e.upload.range = (0, k.zh)(e), h = Xn(e, r), h.length === 0)
                    return n && (n.value = ""), [
                      2
                      /*return*/
                    ];
                  for (u = new FormData(), S = e.options.upload.extraData, T = 0, I = Object.keys(S); T < I.length; T++)
                    R = I[T], u.append(R, S[R]);
                  for (O = 0, q = h.length; O < q; O++)
                    u.append(e.options.upload.fieldName, h[O]);
                  return B = new XMLHttpRequest(), B.open("POST", e.options.upload.url), e.options.upload.token && B.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (B.withCredentials = !0), en(e, B), e.upload.isUploading = !0, d.setAttribute("contenteditable", "false"), B.onreadystatechange = function() {
                    if (B.readyState === XMLHttpRequest.DONE) {
                      if (e.upload.isUploading = !1, d.setAttribute("contenteditable", "true"), B.status >= 200 && B.status < 300)
                        if (e.options.upload.success)
                          e.options.upload.success(d, B.responseText);
                        else {
                          var F = B.responseText;
                          e.options.upload.format && (F = e.options.upload.format(t, B.responseText)), Yn(F, e);
                        }
                      else
                        e.options.upload.error ? e.options.upload.error(B.responseText) : e.tip.show(B.responseText);
                      n && (n.value = ""), e.upload.element.style.display = "none";
                    }
                  }, B.upload.onprogress = function(F) {
                    if (F.lengthComputable) {
                      var W = F.loaded / F.total * 100;
                      e.upload.element.style.display = "block";
                      var Z = e.upload.element;
                      Z.style.width = W + "%";
                    }
                  }, B.send(u), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, pt = function(e, t, n) {
          var r, i = (0, s.F9)(t.startContainer);
          if (i || (i = e.wysiwyg.element), n && n.inputType !== "formatItalic" && n.inputType !== "deleteByDrag" && n.inputType !== "insertFromDrop" && n.inputType !== "formatBold" && n.inputType !== "formatRemove" && n.inputType !== "formatStrikeThrough" && n.inputType !== "insertUnorderedList" && n.inputType !== "insertOrderedList" && n.inputType !== "formatOutdent" && n.inputType !== "formatIndent" && n.inputType !== "" || !n) {
            var a = Rn(t.startContainer);
            a && a.remove(), e.wysiwyg.element.querySelectorAll("wbr").forEach(function(W) {
              W.remove();
            }), t.insertNode(document.createElement("wbr")), i.querySelectorAll("[style]").forEach(function(W) {
              W.removeAttribute("style");
            }), i.querySelectorAll(".vditor-comment").forEach(function(W) {
              W.textContent.trim() === "" && (W.classList.remove("vditor-comment", "vditor-comment--focus"), W.removeAttribute("data-cmtids"));
            }), (r = i.previousElementSibling) === null || r === void 0 || r.querySelectorAll(".vditor-comment").forEach(function(W) {
              W.textContent.trim() === "" && (W.classList.remove("vditor-comment", "vditor-comment--focus"), W.removeAttribute("data-cmtids"));
            });
            var o = "";
            i.getAttribute("data-type") === "link-ref-defs-block" && (i = e.wysiwyg.element);
            var d = i.isEqualNode(e.wysiwyg.element), h = (0, s.a1)(i, "data-type", "footnotes-block");
            if (d)
              o = i.innerHTML;
            else {
              var u = (0, s.O9)(t.startContainer);
              if (u && !h) {
                var S = (0, C.S)(t.startContainer, "BLOCKQUOTE");
                S ? i = (0, s.F9)(t.startContainer) || i : i = u;
              }
              if (h && (i = h), o = i.outerHTML, i.tagName === "UL" || i.tagName === "OL") {
                var T = i.previousElementSibling, I = i.nextElementSibling;
                T && (T.tagName === "UL" || T.tagName === "OL") && (o = T.outerHTML + o, T.remove()), I && (I.tagName === "UL" || I.tagName === "OL") && (o = o + I.outerHTML, I.remove()), o = o.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
              }
              i.innerText.startsWith("```") || (e.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(W) {
                W && !i.isEqualNode(W) && (o += W.outerHTML, W.remove());
              }), e.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(W) {
                W && !i.isEqualNode(W) && (o += W.outerHTML, W.remove());
              }));
            }
            if (o = o.replace(/<\/(strong|b)><strong data-marker="\W{2}">/g, "").replace(/<\/(em|i)><em data-marker="\W{1}">/g, "").replace(/<\/(s|strike)><s data-marker="~{1,2}">/g, ""), o === '<p data-block="0">```<wbr></p>' && e.hint.recentLanguage && (o = '<p data-block="0">```<wbr></p>'.replace("```", "```" + e.hint.recentLanguage)), A("SpinVditorDOM", o, "argument", e.options.debugger), o = e.lute.SpinVditorDOM(o), A("SpinVditorDOM", o, "result", e.options.debugger), d)
              i.innerHTML = o;
            else if (i.outerHTML = o, h) {
              var R = (0, s.E2)(e.wysiwyg.element.querySelector("wbr"), "LI");
              if (R) {
                var O = e.wysiwyg.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="'.concat(R.getAttribute("data-marker"), '"]'));
                O && O.setAttribute("aria-label", R.textContent.trim().substr(0, 24));
              }
            }
            var q, B = e.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']");
            B.forEach(function(W, Z) {
              Z === 0 ? q = W : (q.insertAdjacentHTML("beforeend", W.innerHTML), W.remove());
            }), B.length > 0 && e.wysiwyg.element.insertAdjacentElement("beforeend", B[0]);
            var D, F = e.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']");
            F.forEach(function(W, Z) {
              Z === 0 ? D = W : (D.insertAdjacentHTML("beforeend", W.innerHTML), W.remove());
            }), F.length > 0 && e.wysiwyg.element.insertAdjacentElement("beforeend", F[0]), (0, k.ib)(e.wysiwyg.element, t), e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(W) {
              ve(W, e);
            }), n && (n.inputType === "deleteContentBackward" || n.inputType === "deleteContentForward") && e.options.comment.enable && (e.wysiwyg.triggerRemoveComment(e), e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)));
          }
          Re(e), ce(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, Qn = function(e, t) {
          return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
        }, $n = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function d(S) {
              try {
                u(r.next(S));
              } catch (T) {
                o(T);
              }
            }
            function h(S) {
              try {
                u(r.throw(S));
              } catch (T) {
                o(T);
              }
            }
            function u(S) {
              S.done ? a(S.value) : i(S.value).then(d, h);
            }
            u((r = r.apply(e, [])).next());
          });
        }, er = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1) throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(u) {
            return function(S) {
              return h([u, S]);
            };
          }
          function h(u) {
            if (r) throw new TypeError("Generator is already executing.");
            for (; o && (o = 0, u[0] && (n = 0)), n; ) try {
              if (r = 1, i && (a = u[0] & 2 ? i.return : u[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, u[1])).done) return a;
              switch (i = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
                case 0:
                case 1:
                  a = u;
                  break;
                case 4:
                  return n.label++, { value: u[1], done: !1 };
                case 5:
                  n.label++, i = u[1], u = [0];
                  continue;
                case 7:
                  u = n.ops.pop(), n.trys.pop();
                  continue;
                default:
                  if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                    n = 0;
                    continue;
                  }
                  if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
                    n.label = u[1];
                    break;
                  }
                  if (u[0] === 6 && n.label < a[1]) {
                    n.label = a[1], a = u;
                    break;
                  }
                  if (a && n.label < a[2]) {
                    n.label = a[2], n.ops.push(u);
                    break;
                  }
                  a[2] && n.ops.pop(), n.trys.pop();
                  continue;
              }
              u = t.call(e, n);
            } catch (S) {
              u = [6, S], i = 0;
            } finally {
              r = a = 0;
            }
            if (u[0] & 5) throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, tn = function(e, t, n) {
          if (e.keyCode === 229 && e.code === "" && e.key === "Unidentified" && t.currentMode !== "sv") {
            var r = (0, s.F9)(n);
            if (r && r.textContent.trim() === "")
              return t[t.currentMode].composingLock = !0, !1;
          }
          return !0;
        }, nn = function(e, t, n) {
          if (!(n.key === "Enter" || n.key === "Tab" || n.key === "Backspace" || n.key.indexOf("Arrow") > -1 || (0, l.yl)(n) || n.key === "Escape" || n.shiftKey || n.altKey)) {
            var r = (0, s.lG)(e.startContainer, "P") || (0, s.lG)(e.startContainer, "LI");
            if (r && (0, k.im)(r, t[t.currentMode].element, e).start === 0) {
              r.nodeValue && (r.nodeValue = r.nodeValue.replace(/\u2006/g, ""));
              var i = document.createTextNode(E.g.ZWSP);
              e.insertNode(i), e.setStartAfter(i);
            }
          }
        }, rn = function(e, t) {
          if (t === "ArrowDown" || t === "ArrowUp") {
            var n = (0, s.a1)(e.startContainer, "data-type", "math-inline") || (0, s.a1)(e.startContainer, "data-type", "html-entity") || (0, s.a1)(e.startContainer, "data-type", "html-inline");
            n && (t === "ArrowDown" && e.setStartAfter(n.parentElement), t === "ArrowUp" && e.setStartBefore(n.parentElement));
          }
        }, ht = function(e, t) {
          var n = (0, k.zh)(e), r = (0, s.F9)(n.startContainer);
          r && (r.insertAdjacentHTML(t, '<p data-block="0">'.concat(E.g.ZWSP, `<wbr>
</p>`)), (0, k.ib)(e[e.currentMode].element, n), Ze(e), $(e));
        }, tr = function(e) {
          var t = (0, s.lG)(e, "TABLE");
          return t && t.rows[0].cells[0].isSameNode(e) ? t : !1;
        }, nr = function(e) {
          var t = (0, s.lG)(e, "TABLE");
          return t && t.lastElementChild.lastElementChild.lastElementChild.isSameNode(e) ? t : !1;
        }, an = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e.previousElementSibling;
          return r || (e.parentElement.previousElementSibling ? r = e.parentElement.previousElementSibling.lastElementChild : e.parentElement.parentElement.tagName === "TBODY" && e.parentElement.parentElement.previousElementSibling ? r = e.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild : r = null), r && (t.selectNodeContents(r), n || t.collapse(!1), (0, k.Hc)(t)), r;
        }, rt = function(e, t, n, r, i) {
          var a = (0, k.im)(r, e[e.currentMode].element, n);
          if (t.key === "ArrowDown" && r.textContent.trimRight().substr(a.start).indexOf(`
`) === -1 || t.key === "ArrowRight" && a.start >= r.textContent.trimRight().length) {
            var o = i.nextElementSibling;
            return !o || o && (o.tagName === "TABLE" || o.getAttribute("data-type")) ? (i.insertAdjacentHTML("afterend", '<p data-block="0">'.concat(E.g.ZWSP, "<wbr></p>")), (0, k.ib)(e[e.currentMode].element, n)) : (n.selectNodeContents(o), n.collapse(!0), (0, k.Hc)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, Je = function(e, t, n, r, i) {
          var a = (0, k.im)(r, e[e.currentMode].element, n);
          if (t.key === "ArrowUp" && r.textContent.substr(0, a.start).indexOf(`
`) === -1 || (t.key === "ArrowLeft" || t.key === "Backspace" && n.toString() === "") && a.start === 0) {
            var o = i.previousElementSibling;
            return !o || o && (o.tagName === "TABLE" || o.getAttribute("data-type")) ? (i.insertAdjacentHTML("beforebegin", '<p data-block="0">'.concat(E.g.ZWSP, "<wbr></p>")), (0, k.ib)(e[e.currentMode].element, n)) : (n.selectNodeContents(o), n.collapse(!1), (0, k.Hc)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, mt = function(e, t, n, r) {
          r === void 0 && (r = !0);
          var i = (0, s.lG)(t.startContainer, "LI");
          if (e[e.currentMode].element.querySelectorAll("wbr").forEach(function(S) {
            S.remove();
          }), t.insertNode(document.createElement("wbr")), r && i) {
            for (var a = "", o = 0; o < i.parentElement.childElementCount; o++) {
              var d = i.parentElement.children[o].querySelector("input");
              d && d.remove(), a += '<p data-block="0">'.concat(i.parentElement.children[o].innerHTML.trimLeft(), "</p>");
            }
            i.parentElement.insertAdjacentHTML("beforebegin", a), i.parentElement.remove();
          } else if (i)
            if (n === "check")
              i.parentElement.querySelectorAll("li").forEach(function(S) {
                S.insertAdjacentHTML("afterbegin", '<input type="checkbox" />'.concat(S.textContent.indexOf(" ") === 0 ? "" : " ")), S.classList.add("vditor-task");
              });
            else {
              i.querySelector("input") && i.parentElement.querySelectorAll("li").forEach(function(S) {
                S.querySelector("input").remove(), S.classList.remove("vditor-task");
              });
              var u = void 0;
              n === "list" ? (u = document.createElement("ul"), u.setAttribute("data-marker", "*")) : (u = document.createElement("ol"), u.setAttribute("data-marker", "1.")), u.setAttribute("data-block", "0"), u.setAttribute("data-tight", i.parentElement.getAttribute("data-tight")), u.innerHTML = i.parentElement.innerHTML, i.parentElement.parentNode.replaceChild(u, i.parentElement);
            }
          else {
            var h = (0, s.a1)(t.startContainer, "data-block", "0");
            h || (e[e.currentMode].element.querySelector("wbr").remove(), h = e[e.currentMode].element.querySelector("p"), h.innerHTML = "<wbr>"), n === "check" ? (h.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li class="vditor-task"><input type="checkbox" /> '.concat(h.innerHTML, "</li></ul>")), h.remove()) : n === "list" ? (h.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li>'.concat(h.innerHTML, "</li></ul>")), h.remove()) : n === "ordered-list" && (h.insertAdjacentHTML("beforebegin", '<ol data-block="0"><li>'.concat(h.innerHTML, "</li></ol>")), h.remove());
          }
        }, on = function(e, t, n) {
          var r = t.previousElementSibling;
          if (t && r) {
            var i = [t];
            Array.from(n.cloneContents().children).forEach(function(h, u) {
              h.nodeType !== 3 && t && h.textContent.trim() !== "" && t.getAttribute("data-node-id") === h.getAttribute("data-node-id") && (u !== 0 && i.push(t), t = t.nextElementSibling);
            }), e[e.currentMode].element.querySelectorAll("wbr").forEach(function(h) {
              h.remove();
            }), n.insertNode(document.createElement("wbr"));
            var a = r.parentElement, o = "";
            i.forEach(function(h) {
              var u = h.getAttribute("data-marker");
              u.length !== 1 && (u = "1".concat(u.slice(-1))), o += '<li data-node-id="'.concat(h.getAttribute("data-node-id"), '" data-marker="').concat(u, '">').concat(h.innerHTML, "</li>"), h.remove();
            }), r.insertAdjacentHTML("beforeend", "<".concat(a.tagName, ' data-block="0">').concat(o, "</").concat(a.tagName, ">")), e.currentMode === "wysiwyg" ? a.outerHTML = e.lute.SpinVditorDOM(a.outerHTML) : a.outerHTML = e.lute.SpinVditorIRDOM(a.outerHTML), (0, k.ib)(e[e.currentMode].element, n);
            var d = (0, s.O9)(n.startContainer);
            d && d.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(h) {
              ve(h, e), e.currentMode === "wysiwyg" && h.previousElementSibling.setAttribute("style", "display:none");
            }), $(e), Ze(e);
          } else
            e[e.currentMode].element.focus();
        }, Rt = function(e, t, n, r) {
          var i = (0, s.lG)(t.parentElement, "LI");
          if (i) {
            e[e.currentMode].element.querySelectorAll("wbr").forEach(function(T) {
              T.remove();
            }), n.insertNode(document.createElement("wbr"));
            var a = t.parentElement, o = a.cloneNode(), d = [t];
            Array.from(n.cloneContents().children).forEach(function(T, I) {
              T.nodeType !== 3 && t && T.textContent.trim() !== "" && t.getAttribute("data-node-id") === T.getAttribute("data-node-id") && (I !== 0 && d.push(t), t = t.nextElementSibling);
            });
            var h = !1, u = "";
            a.querySelectorAll("li").forEach(function(T) {
              h && (u += T.outerHTML, !T.nextElementSibling && !T.previousElementSibling ? T.parentElement.remove() : T.remove()), T.isSameNode(d[d.length - 1]) && (h = !0);
            }), d.reverse().forEach(function(T) {
              i.insertAdjacentElement("afterend", T);
            }), u && (o.innerHTML = u, d[0].insertAdjacentElement("beforeend", o)), e.currentMode === "wysiwyg" ? r.outerHTML = e.lute.SpinVditorDOM(r.outerHTML) : r.outerHTML = e.lute.SpinVditorIRDOM(r.outerHTML), (0, k.ib)(e[e.currentMode].element, n);
            var S = (0, s.O9)(n.startContainer);
            S && S.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(T) {
              ve(T, e), e.currentMode === "wysiwyg" && T.previousElementSibling.setAttribute("style", "display:none");
            }), $(e), Ze(e);
          } else
            e[e.currentMode].element.focus();
        }, gt = function(e, t) {
          for (var n = getSelection().getRangeAt(0).startContainer.parentElement, r = e.rows[0].cells.length, i = e.rows.length, a = 0, o = 0; o < i; o++)
            for (var d = 0; d < r; d++)
              if (e.rows[o].cells[d].isSameNode(n)) {
                a = d;
                break;
              }
          for (var h = 0; h < i; h++)
            e.rows[h].cells[a].setAttribute("align", t);
        }, It = function(e) {
          var t = e.trimRight().split(`
`).pop();
          return t === "" ? !1 : (t.replace(/ |-/g, "") === "" || t.replace(/ |_/g, "") === "" || t.replace(/ |\*/g, "") === "") && t.replace(/ /g, "").length > 2 ? !(t.indexOf("-") > -1 && t.trimLeft().indexOf(" ") === -1 && e.trimRight().split(`
`).length > 1 || t.indexOf("    ") === 0 || t.indexOf("	") === 0) : !1;
        }, Pt = function(e) {
          var t = e.trimRight().split(`
`);
          return e = t.pop(), e.indexOf("    ") === 0 || e.indexOf("	") === 0 || (e = e.trimLeft(), e === "" || t.length === 0) ? !1 : e.replace(/-/g, "") === "" || e.replace(/=/g, "") === "";
        }, $ = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), e.currentMode === "wysiwyg" ? ce(e, t) : e.currentMode === "ir" ? je(e, t) : e.currentMode === "sv" && Ee(e, t);
        }, sn = function(e, t, n, r) {
          var i, a = e.startContainer, o = (0, s.lG)(a, "LI");
          if (o) {
            if (!(0, l.yl)(r) && !r.altKey && r.key === "Enter" && // fix li 中有多个 P 时，在第一个 P 中换行会在下方生成新的 li
            !r.shiftKey && n && o.contains(n) && n.nextElementSibling)
              return o && !o.textContent.endsWith(`
`) && o.insertAdjacentText("beforeend", `
`), e.insertNode(document.createTextNode(`

`)), e.collapse(!1), $(t), r.preventDefault(), !0;
            if (!(0, l.yl)(r) && !r.shiftKey && !r.altKey && r.key === "Backspace" && !o.previousElementSibling && e.toString() === "" && (0, k.im)(o, t[t.currentMode].element, e).start === 0)
              return o.nextElementSibling ? (o.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>'.concat(o.innerHTML, "</p>")), o.remove()) : o.parentElement.outerHTML = '<p data-block="0"><wbr>'.concat(o.innerHTML, "</p>"), (0, k.ib)(t[t.currentMode].element, e), $(t), r.preventDefault(), !0;
            if (!(0, l.yl)(r) && !r.shiftKey && !r.altKey && r.key === "Backspace" && o.textContent.trim().replace(E.g.ZWSP, "") === "" && e.toString() === "" && ((i = o.previousElementSibling) === null || i === void 0 ? void 0 : i.tagName) === "LI")
              return o.previousElementSibling.insertAdjacentText("beforeend", `

`), e.selectNodeContents(o.previousElementSibling), e.collapse(!1), o.remove(), (0, k.ib)(t[t.currentMode].element, e), $(t), r.preventDefault(), !0;
            if (!(0, l.yl)(r) && !r.altKey && r.key === "Tab") {
              var d = !1;
              if ((e.startOffset === 0 && (a.nodeType === 3 && !a.previousSibling || a.nodeType !== 3 && a.nodeName === "LI") || o.classList.contains("vditor-task") && e.startOffset === 1 && a.previousSibling.nodeType !== 3 && a.previousSibling.tagName === "INPUT") && (d = !0), d || e.toString() !== "")
                return r.shiftKey ? Rt(t, o, e, o.parentElement) : on(t, o, e), r.preventDefault(), !0;
            }
          }
          return !1;
        }, jt = function(e, t, n) {
          if (e.options.tab && n.key === "Tab")
            return n.shiftKey || (t.toString() === "" ? (t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1)) : (t.extractContents(), t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1))), (0, k.Hc)(t), $(e), n.preventDefault(), !0;
        }, ln = function(e, t, n, r) {
          if (n) {
            if (!(0, l.yl)(e) && !e.altKey && e.key === "Enter") {
              var i = String.raw(vn || (vn = Qn(["", ""], ["", ""])), n.textContent).replace(/\\\|/g, "").trim(), a = i.split("|");
              if (i.startsWith("|") && i.endsWith("|") && a.length > 3) {
                var o = a.map(function() {
                  return "---";
                }).join("|");
                return o = n.textContent + `
` + o.substring(3, o.length - 3) + `
|<wbr>`, n.outerHTML = t.lute.SpinVditorDOM(o), (0, k.ib)(t[t.currentMode].element, r), $(t), ye(t), e.preventDefault(), !0;
              }
              if (It(n.innerHTML) && n.previousElementSibling) {
                var d = "", h = n.innerHTML.trimRight().split(`
`);
                return h.length > 1 && (h.pop(), d = '<p data-block="0">'.concat(h.join(`
`), "</p>")), n.insertAdjacentHTML("afterend", "".concat(d, `<hr data-block="0"><p data-block="0"><wbr>
</p>`)), n.remove(), (0, k.ib)(t[t.currentMode].element, r), $(t), ye(t), e.preventDefault(), !0;
              }
              if (Pt(n.innerHTML))
                return t.currentMode === "wysiwyg" ? n.outerHTML = t.lute.SpinVditorDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`) : n.outerHTML = t.lute.SpinVditorIRDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`), (0, k.ib)(t[t.currentMode].element, r), $(t), ye(t), e.preventDefault(), !0;
            }
            if (r.collapsed && n.previousElementSibling && e.key === "Backspace" && !(0, l.yl)(e) && !e.altKey && !e.shiftKey && n.textContent.trimRight().split(`
`).length > 1 && (0, k.im)(n, t[t.currentMode].element, r).start === 0) {
              var u = (0, s.DX)(n.previousElementSibling);
              return u.textContent.endsWith(`
`) || (u.textContent = u.textContent + `
`), u.parentElement.insertAdjacentHTML("beforeend", "<wbr>".concat(n.innerHTML)), n.remove(), (0, k.ib)(t[t.currentMode].element, r), !1;
            }
            return !1;
          }
        }, cn = function(e, t, n) {
          for (var r = "", i = 0; i < n.parentElement.childElementCount; i++)
            r += '<td align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </td>');
          n.tagName === "TH" ? n.parentElement.parentElement.insertAdjacentHTML("afterend", "<tbody><tr>".concat(r, "</tr></tbody>")) : n.parentElement.insertAdjacentHTML("afterend", "<tr>".concat(r, "</tr>")), $(e);
        }, un = function(e, t, n) {
          for (var r = "", i = 0; i < n.parentElement.childElementCount; i++)
            n.tagName === "TH" ? r += '<th align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </th>') : r += '<td align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </td>');
          if (n.tagName === "TH") {
            n.parentElement.parentElement.insertAdjacentHTML("beforebegin", "<thead><tr>".concat(r, "</tr></thead>")), t.insertNode(document.createElement("wbr"));
            var a = n.parentElement.innerHTML.replace(/<th>/g, "<td>").replace(/<\/th>/g, "</td>");
            n.parentElement.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", a), n.parentElement.parentElement.remove(), (0, k.ib)(e.ir.element, t);
          } else
            n.parentElement.insertAdjacentHTML("beforebegin", "<tr>".concat(r, "</tr>"));
          $(e);
        }, yt = function(e, t, n, r) {
          r === void 0 && (r = "afterend");
          for (var i = 0, a = n.previousElementSibling; a; )
            i++, a = a.previousElementSibling;
          for (var o = 0; o < t.rows.length; o++)
            o === 0 ? t.rows[o].cells[i].insertAdjacentHTML(r, "<th> </th>") : t.rows[o].cells[i].insertAdjacentHTML(r, "<td> </td>");
          $(e);
        }, fn = function(e, t, n) {
          if (n.tagName === "TD") {
            var r = n.parentElement.parentElement;
            n.parentElement.previousElementSibling ? t.selectNodeContents(n.parentElement.previousElementSibling.lastElementChild) : t.selectNodeContents(r.previousElementSibling.lastElementChild.lastElementChild), r.childElementCount === 1 ? r.remove() : n.parentElement.remove(), t.collapse(!1), (0, k.Hc)(t), $(e);
          }
        }, dn = function(e, t, n, r) {
          for (var i = 0, a = r.previousElementSibling; a; )
            i++, a = a.previousElementSibling;
          (r.previousElementSibling || r.nextElementSibling) && (t.selectNodeContents(r.previousElementSibling || r.nextElementSibling), t.collapse(!0));
          for (var o = 0; o < n.rows.length; o++) {
            var d = n.rows[o].cells;
            if (d.length === 1) {
              n.remove(), Ze(e);
              break;
            }
            d[i].remove();
          }
          (0, k.Hc)(t), $(e);
        }, pn = function(e, t, n) {
          var r = n.startContainer, i = (0, s.lG)(r, "TD") || (0, s.lG)(r, "TH");
          if (i) {
            if (!(0, l.yl)(t) && !t.altKey && t.key === "Enter") {
              (!i.lastElementChild || i.lastElementChild && (!i.lastElementChild.isSameNode(i.lastChild) || i.lastElementChild.tagName !== "BR")) && i.insertAdjacentHTML("beforeend", "<br>");
              var a = document.createElement("br");
              return n.insertNode(a), n.setStartAfter(a), $(e), ye(e), t.preventDefault(), !0;
            }
            if (t.key === "Tab") {
              if (t.shiftKey)
                return an(i, n), t.preventDefault(), !0;
              var o = i.nextElementSibling;
              return o || (i.parentElement.nextElementSibling ? o = i.parentElement.nextElementSibling.firstElementChild : i.parentElement.parentElement.tagName === "THEAD" && i.parentElement.parentElement.nextElementSibling ? o = i.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild : o = null), o && (n.selectNodeContents(o), (0, k.Hc)(n)), t.preventDefault(), !0;
            }
            var d = i.parentElement.parentElement.parentElement;
            if (t.key === "ArrowUp") {
              if (t.preventDefault(), i.tagName === "TH")
                return d.previousElementSibling ? (n.selectNodeContents(d.previousElementSibling), n.collapse(!1), (0, k.Hc)(n)) : ht(e, "beforebegin"), !0;
              for (var h = 0, u = i.parentElement; h < u.cells.length && !u.cells[h].isSameNode(i); h++)
                ;
              var S = u.previousElementSibling;
              return S || (S = u.parentElement.previousElementSibling.firstChild), n.selectNodeContents(S.cells[h]), n.collapse(!1), (0, k.Hc)(n), !0;
            }
            if (t.key === "ArrowDown") {
              t.preventDefault();
              var u = i.parentElement;
              if (!u.nextElementSibling && i.tagName === "TD")
                return d.nextElementSibling ? (n.selectNodeContents(d.nextElementSibling), n.collapse(!0), (0, k.Hc)(n)) : ht(e, "afterend"), !0;
              for (var h = 0; h < u.cells.length && !u.cells[h].isSameNode(i); h++)
                ;
              var o = u.nextElementSibling;
              return o || (o = u.parentElement.nextElementSibling.firstChild), n.selectNodeContents(o.cells[h]), n.collapse(!0), (0, k.Hc)(n), !0;
            }
            if (e.currentMode === "wysiwyg" && !(0, l.yl)(t) && t.key === "Enter" && !t.shiftKey && t.altKey) {
              var T = e.wysiwyg.popover.querySelector(".vditor-input");
              return T.focus(), T.select(), t.preventDefault(), !0;
            }
            if (!(0, l.yl)(t) && !t.shiftKey && !t.altKey && t.key === "Backspace" && n.startOffset === 0 && n.toString() === "") {
              var I = an(i, n, !1);
              return !I && d && (d.textContent.trim() === "" ? (d.outerHTML = `<p data-block="0"><wbr>
</p>`, (0, k.ib)(e[e.currentMode].element, n)) : (n.setStartBefore(d), n.collapse(!0)), $(e)), t.preventDefault(), !0;
            }
            if (N("⇧⌘F", t))
              return un(e, n, i), t.preventDefault(), !0;
            if (N("⌘=", t))
              return cn(e, n, i), t.preventDefault(), !0;
            if (N("⇧⌘G", t))
              return yt(e, d, i, "beforebegin"), t.preventDefault(), !0;
            if (N("⇧⌘=", t))
              return yt(e, d, i), t.preventDefault(), !0;
            if (N("⌘-", t))
              return fn(e, n, i), t.preventDefault(), !0;
            if (N("⇧⌘-", t))
              return dn(e, n, d, i), t.preventDefault(), !0;
            if (N("⇧⌘L", t)) {
              if (e.currentMode === "ir")
                return gt(d, "left"), $(e), t.preventDefault(), !0;
              var R = e.wysiwyg.popover.querySelector('[data-type="left"]');
              if (R)
                return R.click(), t.preventDefault(), !0;
            }
            if (N("⇧⌘C", t)) {
              if (e.currentMode === "ir")
                return gt(d, "center"), $(e), t.preventDefault(), !0;
              var R = e.wysiwyg.popover.querySelector('[data-type="center"]');
              if (R)
                return R.click(), t.preventDefault(), !0;
            }
            if (N("⇧⌘R", t)) {
              if (e.currentMode === "ir")
                return gt(d, "right"), $(e), t.preventDefault(), !0;
              var R = e.wysiwyg.popover.querySelector('[data-type="right"]');
              if (R)
                return R.click(), t.preventDefault(), !0;
            }
          }
          return !1;
        }, hn = function(e, t, n, r) {
          if (n.tagName === "PRE" && N("⌘A", t))
            return r.selectNodeContents(n.firstElementChild), t.preventDefault(), !0;
          if (e.options.tab && t.key === "Tab" && !t.shiftKey && r.toString() === "")
            return r.insertNode(document.createTextNode(e.options.tab)), r.collapse(!1), $(e), t.preventDefault(), !0;
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey) {
            var i = (0, k.im)(n, e[e.currentMode].element, r);
            if ((i.start === 0 || i.start === 1 && n.innerText === `
`) && r.toString() === "")
              return n.parentElement.outerHTML = '<p data-block="0"><wbr>'.concat(n.firstElementChild.innerHTML, "</p>"), (0, k.ib)(e[e.currentMode].element, r), $(e), t.preventDefault(), !0;
          }
          return !(0, l.yl)(t) && !t.altKey && t.key === "Enter" ? (n.firstElementChild.textContent.endsWith(`
`) || n.firstElementChild.insertAdjacentText("beforeend", `
`), r.extractContents(), r.insertNode(document.createTextNode(`
`)), r.collapse(!1), (0, k.Hc)(r), (0, l.vU)() || (e.currentMode === "wysiwyg" ? pt(e, r) : Ue(e, r)), ye(e), t.preventDefault(), !0) : !1;
        }, mn = function(e, t, n, r) {
          var i = t.startContainer, a = (0, s.lG)(i, "BLOCKQUOTE");
          if (a && t.toString() === "") {
            if (n.key === "Backspace" && !(0, l.yl)(n) && !n.shiftKey && !n.altKey && (0, k.im)(a, e[e.currentMode].element, t).start === 0)
              return t.insertNode(document.createElement("wbr")), a.outerHTML = a.innerHTML, (0, k.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            if (r && n.key === "Enter" && !(0, l.yl)(n) && !n.shiftKey && !n.altKey && r.parentElement.tagName === "BLOCKQUOTE") {
              var o = !1;
              if (r.innerHTML.replace(E.g.ZWSP, "") === `
` || r.innerHTML.replace(E.g.ZWSP, "") === "" ? (o = !0, r.remove()) : r.innerHTML.endsWith(`

`) && (0, k.im)(r, e[e.currentMode].element, t).start === r.textContent.length - 1 && (r.innerHTML = r.innerHTML.substr(0, r.innerHTML.length - 2), o = !0), o)
                return a.insertAdjacentHTML("afterend", '<p data-block="0">'.concat(E.g.ZWSP, `<wbr>
</p>`)), (0, k.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            }
            var d = (0, s.F9)(i);
            if (e.currentMode === "wysiwyg" && d && N("⇧⌘;", n))
              return t.insertNode(document.createElement("wbr")), d.outerHTML = '<blockquote data-block="0">'.concat(d.outerHTML, "</blockquote>"), (0, k.ib)(e.wysiwyg.element, t), ce(e), n.preventDefault(), !0;
            if (rt(e, n, t, a, a) || Je(e, n, t, a, a))
              return !0;
          }
          return !1;
        }, gn = function(e, t, n) {
          var r = t.startContainer, i = (0, s.fb)(r, "vditor-task");
          if (i) {
            if (N("⇧⌘J", n)) {
              var a = i.firstElementChild;
              return a.checked ? a.removeAttribute("checked") : a.setAttribute("checked", "checked"), $(e), n.preventDefault(), !0;
            }
            if (n.key === "Backspace" && !(0, l.yl)(n) && !n.shiftKey && !n.altKey && t.toString() === "" && t.startOffset === 1 && (r.nodeType === 3 && r.previousSibling && r.previousSibling.tagName === "INPUT" || r.nodeType !== 3)) {
              var o = i.previousElementSibling;
              if (i.querySelector("input").remove(), o) {
                var d = (0, s.DX)(o);
                d.parentElement.insertAdjacentHTML("beforeend", "<wbr>" + i.innerHTML.trim()), i.remove();
              } else
                i.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>'.concat(i.innerHTML.trim() || `
`, "</p>")), i.nextElementSibling ? i.remove() : i.parentElement.remove();
              return (0, k.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            }
            if (n.key === "Enter" && !(0, l.yl)(n) && !n.shiftKey && !n.altKey) {
              if (i.textContent.trim() === "")
                if ((0, s.fb)(i.parentElement, "vditor-task")) {
                  var h = (0, s.O9)(r);
                  h && Rt(e, i, t, h);
                } else if (i.nextElementSibling) {
                  var u = "", S = "", T = !1;
                  Array.from(i.parentElement.children).forEach(function(q) {
                    i.isSameNode(q) ? T = !0 : T ? u += q.outerHTML : S += q.outerHTML;
                  });
                  var I = i.parentElement.tagName, R = i.parentElement.tagName === "OL" ? "" : ' data-marker="'.concat(i.parentElement.getAttribute("data-marker"), '"'), O = "";
                  S && (O = i.parentElement.tagName === "UL" ? "" : ' start="1"', S = "<".concat(I, ' data-tight="true"').concat(R, ' data-block="0">').concat(S, "</").concat(I, ">")), i.parentElement.outerHTML = "".concat(S, `<p data-block="0"><wbr>
</p><`).concat(I, `
 data-tight="true"`).concat(R, ' data-block="0"').concat(O, ">").concat(u, "</").concat(I, ">");
                } else
                  i.parentElement.insertAdjacentHTML("afterend", `<p data-block="0"><wbr>
</p>`), i.parentElement.querySelectorAll("li").length === 1 ? i.parentElement.remove() : i.remove();
              else r.nodeType !== 3 && t.startOffset === 0 && r.firstChild.tagName === "INPUT" ? t.setStart(r.childNodes[1], 1) : (t.setEndAfter(i.lastChild), i.insertAdjacentHTML("afterend", '<li class="vditor-task" data-marker="'.concat(i.getAttribute("data-marker"), '"><input type="checkbox"> <wbr></li>')), document.querySelector("wbr").after(t.extractContents()));
              return (0, k.ib)(e[e.currentMode].element, t), $(e), ye(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, yn = function(e, t, n, r) {
          if (t.startContainer.nodeType !== 3) {
            var i = t.startContainer.children[t.startOffset];
            if (i && i.tagName === "HR")
              return t.selectNodeContents(i.previousElementSibling), t.collapse(!1), n.preventDefault(), !0;
          }
          if (r) {
            var a = r.previousElementSibling;
            if (a && (0, k.im)(r, e[e.currentMode].element, t).start === 0 && ((0, l.vU)() && a.tagName === "HR" || a.tagName === "TABLE")) {
              if (a.tagName === "TABLE") {
                var o = a.lastElementChild.lastElementChild.lastElementChild;
                o.innerHTML = o.innerHTML.trimLeft() + "<wbr>" + r.textContent.trim(), r.remove();
              } else
                a.remove();
              return (0, k.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, bn = function(e) {
          (0, l.vU)() && e.startContainer.nodeType !== 3 && e.startContainer.tagName === "HR" && e.setStartBefore(e.startContainer);
        }, wn = function(e, t, n) {
          var r, i;
          if (!(0, l.vU)())
            return !1;
          if (e.key === "ArrowUp" && t && ((r = t.previousElementSibling) === null || r === void 0 ? void 0 : r.tagName) === "TABLE") {
            var a = t.previousElementSibling;
            return n.selectNodeContents(a.rows[a.rows.length - 1].lastElementChild), n.collapse(!1), e.preventDefault(), !0;
          }
          return e.key === "ArrowDown" && t && ((i = t.nextElementSibling) === null || i === void 0 ? void 0 : i.tagName) === "TABLE" ? (n.selectNodeContents(t.nextElementSibling.rows[0].cells[0]), n.collapse(!0), e.preventDefault(), !0) : !1;
        }, bt = function(e, t, n) {
          return $n(void 0, void 0, void 0, function() {
            var r, i, a, o, d, h, u, S, T, I, R, O, q, D, B, D, F;
            return er(this, function(W) {
              switch (W.label) {
                case 0:
                  return e[e.currentMode].element.getAttribute("contenteditable") !== "true" ? [
                    2
                    /*return*/
                  ] : (t.stopPropagation(), t.preventDefault(), "clipboardData" in t ? (r = t.clipboardData.getData("text/html"), i = t.clipboardData.getData("text/plain"), a = t.clipboardData.files) : (r = t.dataTransfer.getData("text/html"), i = t.dataTransfer.getData("text/plain"), t.dataTransfer.types.includes("Files") && (a = t.dataTransfer.items)), o = {}, d = function(Z, se) {
                    if (!se)
                      return ["", Lute.WalkContinue];
                    if (e.options.upload.renderLinkDest)
                      return e.options.upload.renderLinkDest(e, Z, se);
                    var ae = Z.TokensStr();
                    if (Z.__internal_object__.Parent.Type === 34 && ae && ae.indexOf("file://") === -1 && e.options.upload.linkToImgUrl) {
                      var ue = new XMLHttpRequest();
                      ue.open("POST", e.options.upload.linkToImgUrl), e.options.upload.token && ue.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (ue.withCredentials = !0), en(e, ue), ue.setRequestHeader("Content-Type", "application/json; charset=utf-8"), ue.onreadystatechange = function() {
                        if (ue.readyState === XMLHttpRequest.DONE) {
                          if (ue.status === 200) {
                            var Te = ue.responseText;
                            e.options.upload.linkToImgFormat && (Te = e.options.upload.linkToImgFormat(ue.responseText));
                            var Le = JSON.parse(Te);
                            if (Le.code !== 0) {
                              e.tip.show(Le.msg);
                              return;
                            }
                            var _e = Le.data.originalURL;
                            if (e.currentMode === "sv")
                              e.sv.element.querySelectorAll(".vditor-sv__marker--link").forEach(function(be) {
                                be.textContent === _e && (be.textContent = Le.data.url);
                              });
                            else {
                              var Y = e[e.currentMode].element.querySelector('img[src="'.concat(_e, '"]'));
                              Y.src = Le.data.url, e.currentMode === "ir" && (Y.previousElementSibling.previousElementSibling.innerHTML = Le.data.url);
                            }
                            $(e);
                          } else
                            e.tip.show(ue.responseText);
                          e.options.upload.linkToImgCallback && e.options.upload.linkToImgCallback(ue.responseText);
                        }
                      }, ue.send(JSON.stringify({ url: ae }));
                    }
                    return e.currentMode === "ir" ? ['<span class="vditor-ir__marker vditor-ir__marker--link">'.concat(Lute.EscapeHTMLStr(ae), "</span>"), Lute.WalkContinue] : e.currentMode === "wysiwyg" ? ["", Lute.WalkContinue] : ['<span class="vditor-sv__marker--link">'.concat(Lute.EscapeHTMLStr(ae), "</span>"), Lute.WalkContinue];
                  }, (r.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<a href="'.concat(i, '">').concat(i, "</a>") || r.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<!--StartFragment--><a href="'.concat(i, '">').concat(i, "</a><!--EndFragment-->")) && (r = ""), h = new DOMParser().parseFromString(r, "text/html"), h.body && (r = h.body.innerHTML), r = Lute.Sanitize(r), e.wysiwyg.getComments(e), u = e[e.currentMode].element.scrollHeight, S = Me(r, i, e.currentMode), T = e.currentMode === "sv" ? (0, s.a1)(t.target, "data-type", "code-block") : (0, s.lG)(t.target, "CODE"), T ? (e.currentMode === "sv" ? document.execCommand("insertHTML", !1, i.replace(/&/g, "&amp;").replace(/</g, "&lt;")) : (I = (0, k.im)(t.target, e[e.currentMode].element), T.parentElement.tagName !== "PRE" && (i += E.g.ZWSP), T.textContent = T.textContent.substring(0, I.start) + i + T.textContent.substring(I.end), (0, k.$j)(I.start + i.length, I.start + i.length, T.parentElement), !((F = T.parentElement) === null || F === void 0) && F.nextElementSibling.classList.contains("vditor-".concat(e.currentMode, "__preview")) && (T.parentElement.nextElementSibling.innerHTML = T.outerHTML, ve(T.parentElement.nextElementSibling, e))), [3, 8]) : [3, 1]);
                case 1:
                  return S ? (n.pasteCode(S), [3, 8]) : [3, 2];
                case 2:
                  return r.trim() === "" ? [3, 3] : (R = document.createElement("div"), R.innerHTML = r, R.querySelectorAll("[style]").forEach(function(Z) {
                    Z.removeAttribute("style");
                  }), R.querySelectorAll(".vditor-copy").forEach(function(Z) {
                    Z.remove();
                  }), e.currentMode === "ir" ? (o.HTML2VditorIRDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, k.oC)(e.lute.HTML2VditorIRDOM(R.innerHTML), e)) : e.currentMode === "wysiwyg" ? (o.HTML2VditorDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, k.oC)(e.lute.HTML2VditorDOM(R.innerHTML), e)) : (o.Md2VditorSVDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), Ot(e, e.lute.HTML2Md(R.innerHTML).trimRight())), e.outline.render(e), [3, 8]);
                case 3:
                  return a.length > 0 ? e.options.upload.url || e.options.upload.handler ? [4, Nt(e, a)] : [3, 5] : [3, 7];
                case 4:
                  return W.sent(), [3, 6];
                case 5:
                  O = new FileReader(), "clipboardData" in t ? (a = t.clipboardData.files, q = a[0]) : t.dataTransfer.types.includes("Files") && (a = t.dataTransfer.items, q = a[0].getAsFile()), q && q.type.startsWith("image") && (O.readAsDataURL(q), O.onload = function() {
                    var Z = "";
                    e.currentMode === "wysiwyg" ? Z += '<img alt="'.concat(q.name, '" src="').concat(O.result.toString(), `">
`) : Z += "![".concat(q.name, "](").concat(O.result.toString(), `)
`), document.execCommand("insertHTML", !1, Z);
                  }), W.label = 6;
                case 6:
                  return [3, 8];
                case 7:
                  i.trim() !== "" && a.length === 0 && (D = (0, k.zh)(e), D.toString() !== "" && e.lute.IsValidLinkDest(i) && (i = "[".concat(D.toString(), "](").concat(i, ")")), e.currentMode === "ir" ? (o.Md2VditorIRDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, k.oC)(e.lute.Md2VditorIRDOM(i), e)) : e.currentMode === "wysiwyg" ? (o.Md2VditorDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, k.oC)(e.lute.Md2VditorDOM(i), e)) : (o.Md2VditorSVDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), Ot(e, i)), e.outline.render(e)), W.label = 8;
                case 8:
                  return e.currentMode !== "sv" && (B = (0, s.F9)((0, k.zh)(e).startContainer), B && (D = (0, k.zh)(e), e[e.currentMode].element.querySelectorAll("wbr").forEach(function(Z) {
                    Z.remove();
                  }), D.insertNode(document.createElement("wbr")), e.currentMode === "wysiwyg" ? B.outerHTML = e.lute.SpinVditorDOM(B.outerHTML) : B.outerHTML = e.lute.SpinVditorIRDOM(B.outerHTML), (0, k.ib)(e[e.currentMode].element, D)), e[e.currentMode].element.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(Z) {
                    ve(Z, e);
                  })), e.wysiwyg.triggerRemoveComment(e), $(e), e[e.currentMode].element.scrollHeight - u > Math.min(e[e.currentMode].element.clientHeight, window.innerHeight) / 2 && ye(e), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, vn, En = function(e) {
          var t, n;
          e.hint.render(e);
          var r = (0, k.zh)(e).startContainer, i = (0, s.a1)(r, "data-type", "code-block-info");
          if (i)
            if (i.textContent.replace(E.g.ZWSP, "") === "" && e.hint.recentLanguage) {
              i.textContent = E.g.ZWSP + e.hint.recentLanguage;
              var a = (0, k.zh)(e);
              a.selectNodeContents(i);
            } else {
              var o = [], d = i.textContent.substring(0, (0, k.im)(i, e.ir.element).start).replace(E.g.ZWSP, "");
              (e.options.preview.hljs.langs || E.g.ALIAS_CODE_LANGUAGES.concat(((n = (t = window.hljs) === null || t === void 0 ? void 0 : t.listLanguages()) !== null && n !== void 0 ? n : []).sort())).forEach(function(h) {
                h.indexOf(d.toLowerCase()) > -1 && o.push({
                  html: h,
                  value: h
                });
              }), e.hint.genHTML(o, d, e);
            }
        }, je = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && En(e), clearTimeout(e.ir.processTimeoutId), e.ir.processTimeoutId = window.setTimeout(function() {
            if (!e.ir.composingLock) {
              var n = x(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, it = function(e, t) {
          var n = (0, k.zh)(e), r = (0, s.F9)(n.startContainer) || n.startContainer;
          if (r) {
            var i = r.querySelector(".vditor-ir__marker--heading");
            i ? i.innerHTML = t : (r.insertAdjacentText("afterbegin", t), n.selectNodeContents(r), n.collapse(!1)), Ue(e, n.cloneRange()), $e(e);
          }
        }, wt = function(e, t, n) {
          var r = (0, s.a1)(e.startContainer, "data-type", n);
          if (r) {
            r.firstElementChild.remove(), r.lastElementChild.remove(), e.insertNode(document.createElement("wbr"));
            var i = document.createElement("div");
            i.innerHTML = t.lute.SpinVditorIRDOM(r.outerHTML), r.outerHTML = i.firstElementChild.innerHTML.trim();
          }
        }, rr = function(e, t, n, r) {
          var i = (0, k.zh)(e), a = t.getAttribute("data-type"), o = i.startContainer;
          o.nodeType === 3 && (o = o.parentElement);
          var d = !0;
          if (t.classList.contains("vditor-menu--current"))
            if (a === "quote") {
              var h = (0, s.lG)(o, "BLOCKQUOTE");
              h && (i.insertNode(document.createElement("wbr")), h.outerHTML = h.innerHTML.trim() === "" ? '<p data-block="0">'.concat(h.innerHTML, "</p>") : h.innerHTML);
            } else if (a === "link") {
              var u = (0, s.a1)(i.startContainer, "data-type", "a");
              if (u) {
                var S = (0, s.fb)(i.startContainer, "vditor-ir__link");
                S ? (i.insertNode(document.createElement("wbr")), u.outerHTML = S.innerHTML) : u.outerHTML = u.querySelector(".vditor-ir__link").innerHTML + "<wbr>";
              }
            } else a === "italic" ? wt(i, e, "em") : a === "bold" ? wt(i, e, "strong") : a === "strike" ? wt(i, e, "s") : a === "inline-code" ? wt(i, e, "code") : (a === "check" || a === "list" || a === "ordered-list") && (mt(e, i, a), d = !1, t.classList.remove("vditor-menu--current"));
          else {
            e.ir.element.childNodes.length === 0 && (e.ir.element.innerHTML = '<p data-block="0"><wbr></p>', (0, k.ib)(e.ir.element, i));
            var T = (0, s.F9)(i.startContainer);
            if (a === "line") {
              if (T) {
                var I = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                T.innerHTML.trim() === "" ? T.outerHTML = I : T.insertAdjacentHTML("afterend", I);
              }
            } else if (a === "quote")
              T && (i.insertNode(document.createElement("wbr")), T.outerHTML = '<blockquote data-block="0">'.concat(T.outerHTML, "</blockquote>"), d = !1, t.classList.add("vditor-menu--current"));
            else if (a === "link") {
              var R = void 0;
              i.toString() === "" ? R = "".concat(n, "<wbr>").concat(r) : R = "".concat(n).concat(i.toString()).concat(r.replace(")", "<wbr>)")), document.execCommand("insertHTML", !1, R), d = !1, t.classList.add("vditor-menu--current");
            } else if (a === "italic" || a === "bold" || a === "strike" || a === "inline-code" || a === "code" || a === "table") {
              var R = void 0;
              i.toString() === "" ? R = "".concat(n, "<wbr>").concat(r) : (a === "code" ? R = "".concat(n, `
`).concat(i.toString(), "<wbr>").concat(r) : a === "table" ? R = "".concat(n).concat(i.toString(), "<wbr>").concat(r) : R = "".concat(n).concat(i.toString()).concat(r, "<wbr>"), i.deleteContents()), (a === "table" || a === "code") && (R = `
` + R + `

`);
              var O = document.createElement("span");
              O.innerHTML = R, i.insertNode(O), Ue(e, i), a === "table" && (i.selectNodeContents(getSelection().getRangeAt(0).startContainer.parentElement), (0, k.Hc)(i));
            } else (a === "check" || a === "list" || a === "ordered-list") && (mt(e, i, a, !1), d = !1, g(e.toolbar.elements, ["check", "list", "ordered-list"]), t.classList.add("vditor-menu--current"));
          }
          (0, k.ib)(e.ir.element, i), je(e), d && $e(e);
        }, ir = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function d(S) {
              try {
                u(r.next(S));
              } catch (T) {
                o(T);
              }
            }
            function h(S) {
              try {
                u(r.throw(S));
              } catch (T) {
                o(T);
              }
            }
            function u(S) {
              S.done ? a(S.value) : i(S.value).then(d, h);
            }
            u((r = r.apply(e, [])).next());
          });
        }, ar = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1) throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(u) {
            return function(S) {
              return h([u, S]);
            };
          }
          function h(u) {
            if (r) throw new TypeError("Generator is already executing.");
            for (; o && (o = 0, u[0] && (n = 0)), n; ) try {
              if (r = 1, i && (a = u[0] & 2 ? i.return : u[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, u[1])).done) return a;
              switch (i = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
                case 0:
                case 1:
                  a = u;
                  break;
                case 4:
                  return n.label++, { value: u[1], done: !1 };
                case 5:
                  n.label++, i = u[1], u = [0];
                  continue;
                case 7:
                  u = n.ops.pop(), n.trys.pop();
                  continue;
                default:
                  if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                    n = 0;
                    continue;
                  }
                  if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
                    n.label = u[1];
                    break;
                  }
                  if (u[0] === 6 && n.label < a[1]) {
                    n.label = a[1], a = u;
                    break;
                  }
                  if (a && n.label < a[2]) {
                    n.label = a[2], n.ops.push(u);
                    break;
                  }
                  a[2] && n.ops.pop(), n.trys.pop();
                  continue;
              }
              u = t.call(e, n);
            } catch (S) {
              u = [6, S], i = 0;
            } finally {
              r = a = 0;
            }
            if (u[0] & 5) throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, or = (
          /** @class */
          function() {
            function e(t) {
              var n = this;
              this.splitChar = "", this.lastIndex = -1, this.fillEmoji = function(r, i) {
                n.element.style.display = "none";
                var a = decodeURIComponent(r.getAttribute("data-value")), o = window.getSelection().getRangeAt(0);
                if (i.currentMode === "ir") {
                  var d = (0, s.a1)(o.startContainer, "data-type", "code-block-info");
                  if (d) {
                    d.textContent = E.g.ZWSP + a.trimRight(), o.selectNodeContents(d), o.collapse(!1), je(i), d.parentElement.querySelectorAll("code").forEach(function(T) {
                      T.className = "language-" + a.trimRight();
                    }), ve(d.parentElement.querySelector(".vditor-ir__preview"), i), n.recentLanguage = a.trimRight();
                    return;
                  }
                }
                if (i.currentMode === "wysiwyg" && o.startContainer.nodeType !== 3) {
                  var h = o.startContainer, u = void 0;
                  if (h.classList.contains("vditor-input") ? u = h : u = h.firstElementChild, u && u.classList.contains("vditor-input")) {
                    u.value = a.trimRight(), o.selectNodeContents(u), o.collapse(!1), u.dispatchEvent(new CustomEvent("input", { detail: 1 })), n.recentLanguage = a.trimRight();
                    return;
                  }
                }
                if (o.setStart(o.startContainer, n.lastIndex), o.deleteContents(), i.options.hint.parse ? i.currentMode === "sv" ? (0, k.oC)(i.lute.SpinVditorSVDOM(a), i) : i.currentMode === "wysiwyg" ? (0, k.oC)(i.lute.SpinVditorDOM(a), i) : (0, k.oC)(i.lute.SpinVditorIRDOM(a), i) : (0, k.oC)(a, i), n.splitChar === ":" && a.indexOf(":") > -1 && i.currentMode !== "sv" && o.insertNode(document.createTextNode(" ")), o.collapse(!1), (0, k.Hc)(o), i.currentMode === "wysiwyg") {
                  var S = (0, s.fb)(o.startContainer, "vditor-wysiwyg__block");
                  S && S.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (S.lastElementChild.innerHTML = S.firstElementChild.innerHTML, ve(S.lastElementChild, i));
                } else if (i.currentMode === "ir") {
                  var S = (0, s.fb)(o.startContainer, "vditor-ir__marker--pre");
                  S && S.nextElementSibling.classList.contains("vditor-ir__preview") && (S.nextElementSibling.innerHTML = S.innerHTML, ve(S.nextElementSibling, i));
                }
                $(i);
              }, this.timeId = -1, this.element = document.createElement("div"), this.element.className = "vditor-hint", this.recentLanguage = "", t.push({ key: ":" });
            }
            return e.prototype.render = function(t) {
              var n = this;
              if (window.getSelection().focusNode) {
                var r, i = getSelection().getRangeAt(0);
                r = i.startContainer.textContent.substring(0, i.startOffset) || "";
                var a = this.getKey(r, t.options.hint.extend);
                if (typeof a > "u")
                  this.element.style.display = "none", clearTimeout(this.timeId);
                else if (this.splitChar === ":") {
                  var o = a === "" ? t.options.hint.emoji : t.lute.GetEmojis(), d = [];
                  Object.keys(o).forEach(function(h) {
                    h.indexOf(a.toLowerCase()) === 0 && (o[h].indexOf(".") > -1 ? d.push({
                      html: '<img src="'.concat(o[h], '" title=":').concat(h, ':"/> :').concat(h, ":"),
                      value: ":".concat(h, ":")
                    }) : d.push({
                      html: '<span class="vditor-hint__emoji">'.concat(o[h], "</span>").concat(h),
                      value: o[h]
                    }));
                  }), this.genHTML(d, a, t);
                } else
                  t.options.hint.extend.forEach(function(h) {
                    h.key === n.splitChar && (clearTimeout(n.timeId), n.timeId = window.setTimeout(function() {
                      return ir(n, void 0, void 0, function() {
                        var u;
                        return ar(this, function(S) {
                          switch (S.label) {
                            case 0:
                              return u = this.genHTML, [4, h.hint(a)];
                            case 1:
                              return u.apply(this, [S.sent(), a, t]), [
                                2
                                /*return*/
                              ];
                          }
                        });
                      });
                    }, t.options.hint.delay));
                  });
              }
            }, e.prototype.genHTML = function(t, n, r) {
              var i = this;
              if (t.length === 0) {
                this.element.style.display = "none";
                return;
              }
              var a = r[r.currentMode].element, o = (0, k.Ny)(a), d = o.left + (r.options.outline.position === "left" ? r.outline.element.offsetWidth : 0), h = o.top, u = "";
              t.forEach(function(T, I) {
                if (!(I > 7)) {
                  var R = T.html;
                  if (n !== "") {
                    var O = R.lastIndexOf(">") + 1, q = R.substr(O), B = q.toLowerCase().indexOf(n.toLowerCase());
                    B > -1 && (q = q.substring(0, B) + "<b>" + q.substring(B, B + n.length) + "</b>" + q.substring(B + n.length), R = R.substr(0, O) + q);
                  }
                  u += '<button type="button" data-value="'.concat(encodeURIComponent(T.value), ` "
`).concat(I === 0 ? "class='vditor-hint--current'" : "", "> ").concat(R, "</button>");
                }
              }), this.element.innerHTML = u;
              var S = parseInt(document.defaultView.getComputedStyle(a, null).getPropertyValue("line-height"), 10);
              this.element.style.top = "".concat(h + (S || 22), "px"), this.element.style.left = "".concat(d, "px"), this.element.style.display = "block", this.element.style.right = "auto", this.element.querySelectorAll("button").forEach(function(T) {
                T.addEventListener("click", function(I) {
                  i.fillEmoji(T, r), I.preventDefault();
                });
              }), this.element.getBoundingClientRect().bottom > window.innerHeight && (this.element.style.top = "".concat(h - this.element.offsetHeight, "px")), this.element.getBoundingClientRect().right > window.innerWidth && (this.element.style.left = "auto", this.element.style.right = "0");
            }, e.prototype.select = function(t, n) {
              if (this.element.querySelectorAll("button").length === 0 || this.element.style.display === "none")
                return !1;
              var r = this.element.querySelector(".vditor-hint--current");
              if (t.key === "ArrowDown")
                return t.preventDefault(), t.stopPropagation(), r.removeAttribute("class"), r.nextElementSibling ? r.nextElementSibling.className = "vditor-hint--current" : this.element.children[0].className = "vditor-hint--current", !0;
              if (t.key === "ArrowUp") {
                if (t.preventDefault(), t.stopPropagation(), r.removeAttribute("class"), r.previousElementSibling)
                  r.previousElementSibling.className = "vditor-hint--current";
                else {
                  var i = this.element.children.length;
                  this.element.children[i - 1].className = "vditor-hint--current";
                }
                return !0;
              } else if (!(0, l.yl)(t) && !t.shiftKey && !t.altKey && t.key === "Enter" && !t.isComposing)
                return t.preventDefault(), t.stopPropagation(), this.fillEmoji(r, n), !0;
              return !1;
            }, e.prototype.getKey = function(t, n) {
              var r = this;
              this.lastIndex = -1, this.splitChar = "", n.forEach(function(u) {
                var S = t.lastIndexOf(u.key);
                r.lastIndex < S && (r.splitChar = u.key, r.lastIndex = S);
              });
              var i;
              if (this.lastIndex === -1)
                return i;
              var a = t.split(this.splitChar), o = a[a.length - 1], d = 32;
              if (a.length > 1 && o.trim() === o)
                if (a.length === 2 && a[0] === "" && a[1].length < d)
                  i = a[1];
                else {
                  var h = a[a.length - 2].slice(-1);
                  (0, L.X)(h) === " " && o.length < d && (i = o);
                }
              return i;
            }, e;
          }()
        ), sr = (
          /** @class */
          function() {
            function e(t) {
              this.composingLock = !1;
              var n = document.createElement("div");
              n.className = "vditor-ir", n.innerHTML = '<pre class="vditor-reset" placeholder="'.concat(t.options.placeholder, `"
 contenteditable="true" spellcheck="false"></pre>`), this.element = n.firstElementChild, this.bindEvent(t), kt(t, this.element), Xt(t, this.element), Tt(t, this.element), Ht(t, this.element), Dt(t, this.element), _t(t, this.element), At(t, this.element, this.copy), xt(t, this.element, this.copy);
            }
            return e.prototype.copy = function(t, n) {
              var r = getSelection().getRangeAt(0);
              if (r.toString() !== "") {
                t.stopPropagation(), t.preventDefault();
                var i = document.createElement("div");
                i.appendChild(r.cloneContents()), t.clipboardData.setData("text/plain", n.lute.VditorIRDOM2Md(i.innerHTML).trim()), t.clipboardData.setData("text/html", "");
              }
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.element.addEventListener("paste", function(r) {
                bt(t, r, {
                  pasteCode: function(i) {
                    document.execCommand("insertHTML", !1, i);
                  }
                });
              }), this.element.addEventListener("scroll", function() {
                b(t, ["hint"]);
              }), this.element.addEventListener("compositionstart", function(r) {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                (0, l.vU)() || Ue(t, getSelection().getRangeAt(0).cloneRange()), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop")) {
                  if (n.preventInput) {
                    n.preventInput = !1, je(t, {
                      enableAddUndoStack: !0,
                      enableHint: !0,
                      enableInput: !0
                    });
                    return;
                  }
                  n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《" || Ue(t, getSelection().getRangeAt(0).cloneRange(), !1, r);
                }
              }), this.element.addEventListener("click", function(r) {
                if (r.target.tagName === "INPUT") {
                  r.target.checked ? r.target.setAttribute("checked", "checked") : r.target.removeAttribute("checked"), n.preventInput = !0, je(t);
                  return;
                }
                var i = (0, k.zh)(t), a = (0, s.fb)(r.target, "vditor-ir__preview");
                if (a || (a = (0, s.fb)(i.startContainer, "vditor-ir__preview")), a && (a.previousElementSibling.firstElementChild ? i.selectNodeContents(a.previousElementSibling.firstElementChild) : i.selectNodeContents(a.previousElementSibling), i.collapse(!0), (0, k.Hc)(i), ye(t)), r.target.tagName === "IMG") {
                  var o = r.target.parentElement.querySelector(".vditor-ir__marker--link");
                  o && (i.selectNode(o), (0, k.Hc)(i));
                }
                var d = (0, s.a1)(r.target, "data-type", "a");
                if (d && !d.classList.contains("vditor-ir__node--expand")) {
                  t.options.link.click ? t.options.link.click(d.querySelector(":scope > .vditor-ir__marker--link")) : t.options.link.isOpen && window.open(d.querySelector(":scope > .vditor-ir__marker--link").textContent);
                  return;
                }
                if (r.target.isEqualNode(n.element) && n.element.lastElementChild && i.collapsed) {
                  var h = n.element.lastElementChild.getBoundingClientRect();
                  r.y > h.top + h.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(E.g.ZWSP, "") === "" ? (i.selectNodeContents(n.element.lastElementChild), i.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", '<p data-block="0">'.concat(E.g.ZWSP, "<wbr></p>")), (0, k.ib)(n.element, i)));
                }
                i.toString() === "" ? j(i, t) : setTimeout(function() {
                  j((0, k.zh)(t), t);
                }), lt(r, t), $e(t);
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l.yl)(r))) {
                  if (r.key === "Enter" && ye(t), $e(t), (r.key === "Backspace" || r.key === "Delete") && t.ir.element.innerHTML !== "" && t.ir.element.childNodes.length === 1 && t.ir.element.firstElementChild && t.ir.element.firstElementChild.tagName === "P" && t.ir.element.firstElementChild.childElementCount === 0 && (t.ir.element.textContent === "" || t.ir.element.textContent === `
`)) {
                    t.ir.element.innerHTML = "";
                    return;
                  }
                  var i = (0, k.zh)(t);
                  r.key === "Backspace" ? ((0, l.vU)() && i.startContainer.textContent === `
` && i.startOffset === 1 && (i.startContainer.textContent = "", j(i, t)), n.element.querySelectorAll(".language-math").forEach(function(o) {
                    var d = o.querySelector("br");
                    d && d.remove();
                  })) : r.key.indexOf("Arrow") > -1 ? ((r.key === "ArrowLeft" || r.key === "ArrowRight") && En(t), j(i, t)) : r.keyCode === 229 && r.code === "" && r.key === "Unidentified" && j(i, t);
                  var a = (0, s.fb)(i.startContainer, "vditor-ir__preview");
                  if (a) {
                    if (r.key === "ArrowUp" || r.key === "ArrowLeft")
                      return a.previousElementSibling.firstElementChild ? i.selectNodeContents(a.previousElementSibling.firstElementChild) : i.selectNodeContents(a.previousElementSibling), i.collapse(!1), r.preventDefault(), !0;
                    if (a.tagName === "SPAN" && (r.key === "ArrowDown" || r.key === "ArrowRight"))
                      return a.parentElement.getAttribute("data-type") === "html-entity" ? (a.parentElement.insertAdjacentText("afterend", E.g.ZWSP), i.setStart(a.parentElement.nextSibling, 1)) : i.selectNodeContents(a.parentElement.lastElementChild), i.collapse(!1), r.preventDefault(), !0;
                  }
                }
              });
            }, e;
          }()
        ), Sn = function(e) {
          if (e.currentMode === "sv")
            return e.lute.Md2HTML(x(e));
          if (e.currentMode === "wysiwyg")
            return e.lute.VditorDOM2HTML(e.wysiwyg.element.innerHTML);
          if (e.currentMode === "ir")
            return e.lute.VditorIRDOM2HTML(e.ir.element.innerHTML);
        }, lr = ee(65), Cn = ee(182), cr = (
          /** @class */
          function() {
            function e(t) {
              this.element = document.createElement("div"), this.element.className = "vditor-outline", this.element.innerHTML = '<div class="vditor-outline__title">'.concat(t, `</div>
<div class="vditor-outline__content"></div>`);
            }
            return e.prototype.render = function(t) {
              var n = "";
              return t.preview.element.style.display === "block" ? n = (0, Cn.k)(t.preview.previewElement, this.element.lastElementChild, t) : n = (0, Cn.k)(t[t.currentMode].element, this.element.lastElementChild, t), n;
            }, e.prototype.toggle = function(t, n, r) {
              var i;
              n === void 0 && (n = !0), r === void 0 && (r = !0);
              var a = (i = t.toolbar.elements.outline) === null || i === void 0 ? void 0 : i.firstElementChild;
              if (n && window.innerWidth >= E.g.MOBILE_WIDTH ? (this.element.style.display = "block", this.render(t), a == null || a.classList.add("vditor-menu--current")) : (this.element.style.display = "none", a == null || a.classList.remove("vditor-menu--current")), r && getSelection().rangeCount > 0) {
                var o = getSelection().getRangeAt(0);
                t[t.currentMode].element.contains(o.startContainer) && (0, k.Hc)(o);
              }
              He(t);
            }, e;
          }()
        ), ur = ee(431), fr = (
          /** @class */
          function() {
            function e(t) {
              var n = this;
              this.element = document.createElement("div"), this.element.className = "vditor-preview", this.previewElement = document.createElement("div"), this.previewElement.className = "vditor-reset", t.options.classes.preview && this.previewElement.classList.add(t.options.classes.preview), this.previewElement.style.maxWidth = t.options.preview.maxWidth + "px", this.previewElement.addEventListener("copy", function(h) {
                if (h.target.tagName !== "TEXTAREA") {
                  var u = document.createElement("div");
                  u.className = "vditor-reset", u.appendChild(getSelection().getRangeAt(0).cloneContents()), n.copyToX(t, u, "default"), h.preventDefault();
                }
              }), this.previewElement.addEventListener("click", function(h) {
                var u = (0, s.lG)(h.target, "SPAN");
                if (u && (0, s.fb)(u, "vditor-toc")) {
                  var S = n.previewElement.querySelector("#" + u.getAttribute("data-target-id"));
                  S && (n.element.scrollTop = S.offsetTop);
                  return;
                }
                if (h.target.tagName === "A") {
                  t.options.link.click ? t.options.link.click(h.target) : t.options.link.isOpen && window.open(h.target.getAttribute("href")), h.preventDefault();
                  return;
                }
                h.target.tagName === "IMG" && (t.options.image.preview ? t.options.image.preview(h.target) : t.options.image.isPreview && (0, z.E)(h.target, t.options.lang, t.options.theme));
              }), this.element.appendChild(this.previewElement);
              var r = t.options.preview.actions;
              if (r.length !== 0) {
                var i = document.createElement("div");
                i.className = "vditor-preview__action";
                for (var a = [], o = 0; o < r.length; o++) {
                  var d = r[o];
                  if (typeof d == "object") {
                    a.push('<button type="button" data-type="'.concat(d.key, '" class="').concat(d.className, '"').concat(d.tooltip ? ' aria-label="'.concat(d.tooltip, '"') : "", '">').concat(d.text, "</button>"));
                    continue;
                  }
                  switch (d) {
                    case "desktop":
                      a.push('<button type="button" class="vditor-preview__action--current" data-type="desktop">Desktop</button>');
                      break;
                    case "tablet":
                      a.push('<button type="button" data-type="tablet">Tablet</button>');
                      break;
                    case "mobile":
                      a.push('<button type="button" data-type="mobile">Mobile/Wechat</button>');
                      break;
                    case "mp-wechat":
                      a.push('<button type="button" data-type="mp-wechat" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到公众号"><svg><use xlink:href="#vditor-icon-mp-wechat"></use></svg></button>');
                      break;
                    case "zhihu":
                      a.push('<button type="button" data-type="zhihu" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到知乎"><svg><use xlink:href="#vditor-icon-zhihu"></use></svg></button>');
                      break;
                  }
                }
                i.innerHTML = a.join(""), i.addEventListener((0, l.Le)(), function(h) {
                  var u = (0, C.S)(h.target, "BUTTON");
                  if (u) {
                    var S = u.getAttribute("data-type"), T = r.find(function(I) {
                      return (I == null ? void 0 : I.key) === S;
                    });
                    if (T) {
                      T.click(S);
                      return;
                    }
                    if (S === "mp-wechat" || S === "zhihu") {
                      n.copyToX(t, n.previewElement.cloneNode(!0), S);
                      return;
                    }
                    S === "desktop" ? n.previewElement.style.width = "auto" : S === "tablet" ? n.previewElement.style.width = "780px" : n.previewElement.style.width = "360px", n.previewElement.scrollWidth > n.previewElement.parentElement.clientWidth && (n.previewElement.style.width = "auto"), n.render(t), i.querySelectorAll("button").forEach(function(I) {
                      I.classList.remove("vditor-preview__action--current");
                    }), u.classList.add("vditor-preview__action--current");
                  }
                }), this.element.insertBefore(i, this.previewElement);
              }
            }
            return e.prototype.render = function(t, n) {
              var r = this;
              if (clearTimeout(this.mdTimeoutId), this.element.style.display === "none") {
                this.element.getAttribute("data-type") === "renderPerformance" && t.tip.hide();
                return;
              }
              if (n) {
                this.previewElement.innerHTML = n;
                return;
              }
              if (x(t).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === "") {
                this.previewElement.innerHTML = "";
                return;
              }
              var i = (/* @__PURE__ */ new Date()).getTime(), a = x(t);
              this.mdTimeoutId = window.setTimeout(function() {
                if (t.options.preview.url) {
                  var o = new XMLHttpRequest();
                  o.open("POST", t.options.preview.url), o.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), o.onreadystatechange = function() {
                    if (o.readyState === XMLHttpRequest.DONE)
                      if (o.status === 200) {
                        var h = JSON.parse(o.responseText);
                        if (h.code !== 0) {
                          t.tip.show(h.msg);
                          return;
                        }
                        t.options.preview.transform && (h.data = t.options.preview.transform(h.data)), r.previewElement.innerHTML = h.data, r.afterRender(t, i);
                      } else {
                        var u = t.lute.Md2HTML(a);
                        t.options.preview.transform && (u = t.options.preview.transform(u)), r.previewElement.innerHTML = u, r.afterRender(t, i);
                      }
                  }, o.send(JSON.stringify({ markdownText: a }));
                } else {
                  var d = t.lute.Md2HTML(a);
                  t.options.preview.transform && (d = t.options.preview.transform(d)), r.previewElement.innerHTML = d, r.afterRender(t, i);
                }
              }, t.options.preview.delay);
            }, e.prototype.afterRender = function(t, n) {
              t.options.preview.parse && t.options.preview.parse(this.element);
              var r = (/* @__PURE__ */ new Date()).getTime() - n;
              (/* @__PURE__ */ new Date()).getTime() - n > 2600 ? (t.tip.show(window.VditorI18n.performanceTip.replace("${x}", r.toString())), t.preview.element.setAttribute("data-type", "renderPerformance")) : t.preview.element.getAttribute("data-type") === "renderPerformance" && (t.tip.hide(), t.preview.element.removeAttribute("data-type"));
              var i = t.preview.element.querySelector(".vditor-comment--focus");
              i && i.classList.remove("vditor-comment--focus"), (0, P.O)(t.preview.previewElement, t.options.preview.hljs), (0, Q.s)(t.options.preview.hljs, t.preview.previewElement, t.options.cdn), (0, oe.i)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, me.K)(t.preview.previewElement, t.options.cdn), (0, we.J)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, V.P)(t.preview.previewElement, t.options.cdn), (0, G.v)(t.preview.previewElement, t.options.cdn), (0, M.p)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, fe.P)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, le.B)(t.preview.previewElement, t.options.cdn), (0, H.Q)(t.preview.previewElement, t.options.cdn), t.options.preview.render.media.enable && (0, ur.Y)(t.preview.previewElement), t.options.customRenders.forEach(function(d) {
                d.render(t.preview.previewElement, t);
              });
              var a = t.preview.element, o = t.outline.render(t);
              o === "" && (o = "[ToC]"), a.querySelectorAll('[data-type="toc-block"]').forEach(function(d) {
                d.innerHTML = o, (0, ne.H)(d, {
                  cdn: t.options.cdn,
                  math: t.options.preview.math
                });
              }), (0, ne.H)(t.preview.previewElement, {
                cdn: t.options.cdn,
                math: t.options.preview.math
              });
            }, e.prototype.copyToX = function(t, n, r) {
              r === void 0 && (r = "mp-wechat"), r !== "zhihu" ? n.querySelectorAll(".katex-html .base").forEach(function(a) {
                a.style.display = "initial";
              }) : n.querySelectorAll(".language-math").forEach(function(a) {
                a.outerHTML = '<img class="Formula-image" data-eeimg="true" src="//www.zhihu.com/equation?tex=" alt="'.concat(a.getAttribute("data-math"), '\\" style="display: block; margin: 0 auto; max-width: 100%;">');
              }), n.style.backgroundColor = "#fff", n.querySelectorAll("code").forEach(function(a) {
                a.style.backgroundImage = "none";
              }), this.element.append(n);
              var i = n.ownerDocument.createRange();
              i.selectNode(n), (0, k.Hc)(i), document.execCommand("copy"), n.remove(), t.tip.show(["zhihu", "mp-wechat"].includes(r) ? "已复制，可到".concat(r === "zhihu" ? "知乎" : "微信公众号平台", "进行粘贴") : "已复制到剪切板");
            }, e;
          }()
        ), dr = (
          /** @class */
          function() {
            function e(t) {
              this.element = document.createElement("div"), this.element.className = "vditor-resize vditor-resize--".concat(t.options.resize.position), this.element.innerHTML = '<div><svg><use xlink:href="#vditor-icon-resize"></use></svg></div>', this.bindEvent(t);
            }
            return e.prototype.bindEvent = function(t) {
              var n = this;
              this.element.addEventListener("mousedown", function(r) {
                var i = document, a = r.clientY, o = t.element.offsetHeight, d = 63 + t.element.querySelector(".vditor-toolbar").clientHeight;
                i.ondragstart = function() {
                  return !1;
                }, window.captureEvents && window.captureEvents(), n.element.classList.add("vditor-resize--selected"), i.onmousemove = function(h) {
                  t.options.resize.position === "top" ? t.element.style.height = Math.max(d, o + (a - h.clientY)) + "px" : t.element.style.height = Math.max(d, o + (h.clientY - a)) + "px", t.options.typewriterMode && (t.sv.element.style.paddingBottom = t.sv.element.parentElement.offsetHeight / 2 + "px");
                }, i.onmouseup = function() {
                  t.options.resize.after && t.options.resize.after(t.element.offsetHeight - o), window.captureEvents && window.captureEvents(), i.onmousemove = null, i.onmouseup = null, i.ondragstart = null, i.onselectstart = null, i.onselect = null, n.element.classList.remove("vditor-resize--selected");
                };
              });
            }, e;
          }()
        ), pr = (
          /** @class */
          function() {
            function e(t) {
              this.composingLock = !1, this.element = document.createElement("pre"), this.element.className = "vditor-sv vditor-reset", this.element.setAttribute("placeholder", t.options.placeholder), this.element.setAttribute("contenteditable", "true"), this.element.setAttribute("spellcheck", "false"), this.bindEvent(t), kt(t, this.element), Tt(t, this.element), Ht(t, this.element), Dt(t, this.element), _t(t, this.element), At(t, this.element, this.copy), xt(t, this.element, this.copy);
            }
            return e.prototype.copy = function(t, n) {
              t.stopPropagation(), t.preventDefault(), t.clipboardData.setData("text/plain", nt(n[n.currentMode].element));
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.element.addEventListener("paste", function(r) {
                bt(t, r, {
                  pasteCode: function(i) {
                    document.execCommand("insertHTML", !1, i);
                  }
                });
              }), this.element.addEventListener("scroll", function() {
                if (t.preview.element.style.display === "block") {
                  var r = n.element.scrollTop, i = n.element.clientHeight, a = n.element.scrollHeight - parseFloat(n.element.style.paddingBottom || "0"), o = t.preview.element;
                  r / i > 0.5 ? o.scrollTop = (r + i) * o.scrollHeight / a - i : o.scrollTop = r * o.scrollHeight / a;
                }
              }), this.element.addEventListener("compositionstart", function(r) {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                (0, l.vU)() || ie(t, r), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop") && !(n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《")) {
                  if (n.preventInput) {
                    n.preventInput = !1, Ee(t, {
                      enableAddUndoStack: !0,
                      enableHint: !0,
                      enableInput: !0
                    });
                    return;
                  }
                  ie(t, r);
                }
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l.yl)(r))) {
                  if ((r.key === "Backspace" || r.key === "Delete") && t.sv.element.innerHTML !== "" && t.sv.element.childNodes.length === 1 && t.sv.element.firstElementChild && t.sv.element.firstElementChild.tagName === "DIV" && t.sv.element.firstElementChild.childElementCount === 2 && (t.sv.element.firstElementChild.textContent === "" || t.sv.element.textContent === `
`)) {
                    t.sv.element.innerHTML = "";
                    return;
                  }
                  r.key === "Enter" && ye(t);
                }
              });
            }, e;
          }()
        ), Ln = (
          /** @class */
          function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-tip";
            }
            return e.prototype.show = function(t, n) {
              var r = this;
              n === void 0 && (n = 6e3), this.element.className = "vditor-tip vditor-tip--show", n === 0 ? (this.element.innerHTML = '<div class="vditor-tip__content">'.concat(t, `
<div class="vditor-tip__close">X</div></div>`), this.element.querySelector(".vditor-tip__close").addEventListener("click", function() {
                r.hide();
              })) : (this.element.innerHTML = '<div class="vditor-tip__content">'.concat(t, "</div>"), setTimeout(function() {
                r.hide();
              }, n)), this.element.removeAttribute("style"), setTimeout(function() {
                var i = r.element.getBoundingClientRect();
                i.top < 46 && (r.element.style.position = "fixed", r.element.style.top = "46px");
              }, 150);
            }, e.prototype.hide = function() {
              this.element.className = "vditor-messageElementtip", this.element.innerHTML = "";
            }, e;
          }()
        ), Bt = function(e, t) {
          if (t.options.preview.mode !== e) {
            switch (t.options.preview.mode = e, e) {
              case "both":
                t.sv.element.style.display = "block", t.preview.element.style.display = "block", t.preview.render(t), p(t.toolbar.elements, ["both"]);
                break;
              case "editor":
                t.sv.element.style.display = "block", t.preview.element.style.display = "none", g(t.toolbar.elements, ["both"]);
                break;
            }
            t.devtools && t.devtools.renderEchart(t);
          }
        }, hr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), mr = (
          /** @class */
          function(e) {
            hr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return n.options.preview.mode === "both" && i.element.children[0].classList.add("vditor-menu--current"), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                var o = i.element.firstElementChild;
                o.classList.contains(E.g.CLASS_MENU_DISABLED) || (a.preventDefault(), n.currentMode === "sv" && (n.options.preview.mode === "both" ? Bt("editor", n) : Bt("both", n)));
              }), i;
            }
            return t;
          }(he)
        ), gr = (
          /** @class */
          /* @__PURE__ */ function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-toolbar__br";
            }
            return e;
          }()
        ), Mn = ee(34), yr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), br = (
          /** @class */
          function(e) {
            yr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow");
              var d = "";
              return E.g.CODE_THEME.forEach(function(h) {
                d += "<button>".concat(h, "</button>");
              }), o.innerHTML = '<div style="overflow: auto;max-height:'.concat(window.innerHeight / 2, 'px">').concat(d, "</div>"), o.addEventListener((0, l.Le)(), function(h) {
                h.target.tagName === "BUTTON" && (b(n, ["subToolbar"]), n.options.preview.hljs.style = h.target.textContent, (0, Mn.Y)(h.target.textContent, n.options.cdn), h.preventDefault(), h.stopPropagation());
              }), i.element.appendChild(o), y(n, o, a, r.level), i;
            }
            return t;
          }(he)
        ), wr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), vr = (
          /** @class */
          function(e) {
            wr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow");
              var d = "";
              return Object.keys(n.options.preview.theme.list).forEach(function(h) {
                d += '<button data-type="'.concat(h, '">').concat(n.options.preview.theme.list[h], "</button>");
              }), o.innerHTML = '<div style="overflow: auto;max-height:'.concat(window.innerHeight / 2, 'px">').concat(d, "</div>"), o.addEventListener((0, l.Le)(), function(h) {
                h.target.tagName === "BUTTON" && (b(n, ["subToolbar"]), n.options.preview.theme.current = h.target.getAttribute("data-type"), (0, X.Z)(n.options.preview.theme.current, n.options.preview.theme.path), h.preventDefault(), h.stopPropagation());
              }), i.element.appendChild(o), y(n, o, a, r.level), i;
            }
            return t;
          }(he)
        ), Er = (
          /** @class */
          function() {
            function e(t) {
              this.element = document.createElement("span"), this.element.className = "vditor-counter vditor-tooltipped vditor-tooltipped__nw", this.render(t, "");
            }
            return e.prototype.render = function(t, n) {
              var r = n.endsWith(`
`) ? n.length - 1 : n.length;
              if (t.options.counter.type === "text" && t[t.currentMode]) {
                var i = t[t.currentMode].element.cloneNode(!0);
                i.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(a) {
                  a.remove();
                }), r = i.textContent.length;
              }
              typeof t.options.counter.max == "number" ? (r > t.options.counter.max ? this.element.className = "vditor-counter vditor-counter--error" : this.element.className = "vditor-counter", this.element.innerHTML = "".concat(r, "/").concat(t.options.counter.max)) : this.element.innerHTML = "".concat(r), this.element.setAttribute("aria-label", t.options.counter.type), t.options.counter.after && t.options.counter.after(r, {
                enable: t.options.counter.enable,
                max: t.options.counter.max,
                type: t.options.counter.type
              });
            }, e;
          }()
        ), Sr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Cr = (
          /** @class */
          function(e) {
            Sr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].innerHTML = r.icon, i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !a.currentTarget.classList.contains(E.g.CLASS_MENU_DISABLED) && r.click(a, n);
              }), i;
            }
            return t;
          }(he)
        ), Lr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Mr = (
          /** @class */
          function(e) {
            Lr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.firstElementChild.addEventListener((0, l.Le)(), function(a) {
                var o = i.element.firstElementChild;
                o.classList.contains(E.g.CLASS_MENU_DISABLED) || (a.preventDefault(), o.classList.contains("vditor-menu--current") ? (o.classList.remove("vditor-menu--current"), n.devtools.element.style.display = "none", He(n)) : (o.classList.add("vditor-menu--current"), n.devtools.element.style.display = "block", He(n), n.devtools.renderEchart(n)));
              }), i;
            }
            return t;
          }(he)
        ), kr = (
          /** @class */
          /* @__PURE__ */ function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-toolbar__divider";
            }
            return e;
          }()
        ), Tr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), _r = (
          /** @class */
          function(e) {
            Tr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = document.createElement("div");
              a.className = "vditor-panel vditor-panel--arrow";
              var o = "";
              return Object.keys(n.options.hint.emoji).forEach(function(d) {
                var h = n.options.hint.emoji[d];
                h.indexOf(".") > -1 ? o += '<button data-value=":'.concat(d, ': " data-key=":').concat(d, `:"><img
data-value=":`).concat(d, ': " data-key=":').concat(d, ':" class="vditor-emojis__icon" src="').concat(h, '"/></button>') : o += '<button data-value="'.concat(h, ` "
 data-key="`).concat(d, '"><span class="vditor-emojis__icon">').concat(h, "</span></button>");
              }), a.innerHTML = '<div class="vditor-emojis" style="max-height: '.concat(n.options.height === "auto" ? "auto" : n.options.height - 80, 'px">').concat(o, `</div><div class="vditor-emojis__tail">
    <span class="vditor-emojis__tip"></span><span>`).concat(n.options.hint.emojiTail || "", `</span>
</div>`), i.element.appendChild(a), y(n, a, i.element.firstElementChild, r.level), i.bindEvent(n), i;
            }
            return t.prototype.bindEvent = function(n) {
              var r = this;
              this.element.lastElementChild.addEventListener((0, l.Le)(), function(i) {
                var a = (0, C.S)(i.target, "BUTTON");
                if (a) {
                  i.preventDefault();
                  var o = a.getAttribute("data-value"), d = (0, k.zh)(n), h = o;
                  if (n.currentMode === "wysiwyg" ? h = n.lute.SpinVditorDOM(o) : n.currentMode === "ir" && (h = n.lute.SpinVditorIRDOM(o)), o.indexOf(":") > -1 && n.currentMode !== "sv") {
                    var u = document.createElement("div");
                    u.innerHTML = h, h = u.firstElementChild.firstElementChild.outerHTML + " ", (0, k.oC)(h, n);
                  } else
                    d.extractContents(), d.insertNode(document.createTextNode(o)), (0, s.F9)(d.startContainer) || Ct(n, d);
                  d.collapse(!1), (0, k.Hc)(d), r.element.lastElementChild.style.display = "none", $(n);
                }
              }), this.element.lastElementChild.addEventListener("mouseover", function(i) {
                var a = (0, C.S)(i.target, "BUTTON");
                a && (r.element.querySelector(".vditor-emojis__tip").innerHTML = a.getAttribute("data-key"));
              });
            }, t;
          }(he)
        ), kn = function(e, t, n) {
          var r = document.createElement("a");
          "download" in r ? (r.download = n, r.style.display = "none", r.href = URL.createObjectURL(new Blob([t])), document.body.appendChild(r), r.click(), r.remove()) : e.tip.show(window.VditorI18n.downloadTip, 0);
        }, Ar = function(e) {
          var t = x(e);
          kn(e, t, t.substr(0, 10) + ".md");
        }, xr = function(e) {
          e.tip.show(window.VditorI18n.generate, 3800);
          var t = document.querySelector("#vditorExportIframe");
          t.contentDocument.open(), t.contentDocument.write('<link rel="stylesheet" href="'.concat(e.options.cdn, `/dist/index.css"/>
<script src="`).concat(e.options.cdn, `/dist/method.min.js"><\/script>
<div id="preview" style="width: 800px"></div>
<script>
window.addEventListener("message", (e) => {
  if(!e.data) {
    return;
  }
  Vditor.preview(document.getElementById('preview'), e.data, {
    cdn: "`).concat(e.options.cdn, `",
    markdown: {
      theme: `).concat(JSON.stringify(e.options.preview.theme), `
    },
    hljs: {
      style: "`).concat(e.options.preview.hljs.style, `"
    }
  });
  setTimeout(() => {
        window.print();
    }, 3600);
}, false);
<\/script>`)), t.contentDocument.close(), setTimeout(function() {
            t.contentWindow.postMessage(x(e), "*");
          }, 200);
        }, Hr = function(e) {
          var t = Sn(e), n = '<html><head><link rel="stylesheet" type="text/css" href="'.concat(e.options.cdn, `/dist/index.css"/>
<script src="`).concat(e.options.cdn, "/dist/js/i18n/").concat(e.options.lang, `.js"><\/script>
<script src="`).concat(e.options.cdn, `/dist/method.min.js"><\/script></head>
<body><div class="vditor-reset" id="preview">`).concat(t, `</div>
<script>
    const previewElement = document.getElementById('preview')
    Vditor.setContentTheme('`).concat(e.options.preview.theme.current, "', '").concat(e.options.preview.theme.path, `');
    Vditor.codeRender(previewElement);
    Vditor.highlightRender(`).concat(JSON.stringify(e.options.preview.hljs), ", previewElement, '").concat(e.options.cdn, `');
    Vditor.mathRender(previewElement, {
        cdn: '`).concat(e.options.cdn, `',
        math: `).concat(JSON.stringify(e.options.preview.math), `,
    });
    Vditor.mermaidRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.SMILESRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.markmapRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.flowchartRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.graphvizRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.chartRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.mindmapRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.abcRender(previewElement, '`).concat(e.options.cdn, `');
    `).concat(e.options.preview.render.media.enable ? "Vditor.mediaRender(previewElement);" : "", `
    Vditor.speechRender(previewElement);
<\/script>
<script src="`).concat(e.options.cdn, "/dist/js/icons/").concat(e.options.icon, '.js"><\/script></body></html>');
          kn(e, n, t.substr(0, 10) + ".html");
        }, Dr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Or = (
          /** @class */
          function(e) {
            Dr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              return o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow"), o.innerHTML = `<button data-type="markdown">Markdown</button>
<button data-type="pdf">PDF</button>
<button data-type="html">HTML</button>`, o.addEventListener((0, l.Le)(), function(d) {
                var h = d.target;
                if (h.tagName === "BUTTON") {
                  switch (h.getAttribute("data-type")) {
                    case "markdown":
                      Ar(n);
                      break;
                    case "pdf":
                      xr(n);
                      break;
                    case "html":
                      Hr(n);
                      break;
                  }
                  b(n, ["subToolbar"]), d.preventDefault(), d.stopPropagation();
                }
              }), i.element.appendChild(o), y(n, o, a, r.level), i;
            }
            return t;
          }(he)
        ), Nr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Rr = (
          /** @class */
          function(e) {
            Nr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n, r), i;
            }
            return t.prototype._bindEvent = function(n, r) {
              this.element.children[0].addEventListener((0, l.Le)(), function(i) {
                i.preventDefault(), n.element.className.includes("vditor--fullscreen") ? (r.level || (this.innerHTML = r.icon), n.element.style.zIndex = "", document.body.style.overflow = "", n.element.classList.remove("vditor--fullscreen"), Object.keys(n.toolbar.elements).forEach(function(a) {
                  var o = n.toolbar.elements[a].firstChild;
                  o && (o.className = o.className.replace("__s", "__n"), n.options.toolbar.forEach(function(d) {
                    typeof d != "string" && d.tipPosition && d.name === o.dataset.type && (o.className = "vditor-tooltipped vditor-tooltipped__".concat(d.tipPosition));
                  }));
                }), n.counter && (n.counter.element.className = n.counter.element.className.replace("__s", "__n"))) : (r.level || (this.innerHTML = '<svg><use xlink:href="#vditor-icon-contract"></use></svg>'), n.element.style.zIndex = n.options.fullscreen.index.toString(), document.body.style.overflow = "hidden", n.element.classList.add("vditor--fullscreen"), Object.keys(n.toolbar.elements).forEach(function(a) {
                  var o = n.toolbar.elements[a].firstChild;
                  o && (o.className = o.className.replace("__n", "__s"));
                }), n.counter && (n.counter.element.className = n.counter.element.className.replace("__n", "__s"))), n.devtools && n.devtools.renderEchart(n), r.click && r.click(i, n), He(n), ut(n);
              });
            }, t;
          }(he)
        ), Ir = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Pr = (
          /** @class */
          function(e) {
            Ir(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = document.createElement("div");
              return a.className = "vditor-hint vditor-panel--arrow", a.innerHTML = '<button data-tag="h1" data-value="# ">'.concat(window.VditorI18n.heading1, " ").concat((0, l.ns)("&lt;⌥⌘1>"), `</button>
<button data-tag="h2" data-value="## ">`).concat(window.VditorI18n.heading2, " &lt;").concat((0, l.ns)("⌥⌘2"), `></button>
<button data-tag="h3" data-value="### ">`).concat(window.VditorI18n.heading3, " &lt;").concat((0, l.ns)("⌥⌘3"), `></button>
<button data-tag="h4" data-value="#### ">`).concat(window.VditorI18n.heading4, " &lt;").concat((0, l.ns)("⌥⌘4"), `></button>
<button data-tag="h5" data-value="##### ">`).concat(window.VditorI18n.heading5, " &lt;").concat((0, l.ns)("⌥⌘5"), `></button>
<button data-tag="h6" data-value="###### ">`).concat(window.VditorI18n.heading6, " &lt;").concat((0, l.ns)("⌥⌘6"), "></button>"), i.element.appendChild(a), i._bindEvent(n, a), i;
            }
            return t.prototype._bindEvent = function(n, r) {
              var i = this.element.children[0];
              i.addEventListener((0, l.Le)(), function(o) {
                o.preventDefault(), clearTimeout(n.wysiwyg.afterRenderTimeoutId), clearTimeout(n.ir.processTimeoutId), clearTimeout(n.sv.processTimeoutId), !i.classList.contains(E.g.CLASS_MENU_DISABLED) && (i.blur(), i.classList.contains("vditor-menu--current") ? (n.currentMode === "wysiwyg" ? (Lt(n), ce(n)) : n.currentMode === "ir" && it(n, ""), i.classList.remove("vditor-menu--current")) : (b(n, ["subToolbar"]), r.style.display = "block"));
              });
              for (var a = 0; a < 6; a++)
                r.children.item(a).addEventListener((0, l.Le)(), function(o) {
                  o.preventDefault(), n.currentMode === "wysiwyg" ? (ft(n, o.target.getAttribute("data-tag")), ce(n), i.classList.add("vditor-menu--current")) : n.currentMode === "ir" ? (it(n, o.target.getAttribute("data-value")), i.classList.add("vditor-menu--current")) : Qt(n, o.target.getAttribute("data-value")), r.style.display = "none";
                });
            }, t;
          }(he)
        ), jr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Br = (
          /** @class */
          function(e) {
            jr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), n.tip.show(`<div style="margin-bottom:14px;font-size: 14px;line-height: 22px;min-width:300px;max-width: 360px;display: flex;">
<div style="margin-top: 14px;flex: 1">
    <div>Markdown 使用指南</div>
    <ul style="list-style: none">
        <li><a href="https://ld246.com/article/1583308420519" target="_blank">语法速查手册</a></li>
        <li><a href="https://ld246.com/article/1583129520165" target="_blank">基础语法</a></li>
        <li><a href="https://ld246.com/article/1583305480675" target="_blank">扩展语法</a></li>
        <li><a href="https://ld246.com/article/1582778815353" target="_blank">键盘快捷键</a></li>
    </ul>
</div>
<div style="margin-top: 14px;flex: 1">
    <div>Vditor 支持</div>
    <ul style="list-style: none">
        <li><a href="https://github.com/Vanessa219/vditor/issues" target="_blank">Issues</a></li>
        <li><a href="https://ld246.com/tag/vditor" target="_blank">官方讨论区</a></li>
        <li><a href="https://ld246.com/article/1549638745630" target="_blank">开发手册</a></li>
        <li><a href="https://ld246.com/guide/markdown" target="_blank">演示地址</a></li>
    </ul>
</div></div>`, 0);
              }), i;
            }
            return t;
          }(he)
        ), Ur = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Vr = (
          /** @class */
          function(e) {
            Ur(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                if (a.preventDefault(), !(i.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED) || n.currentMode === "sv")) {
                  var o = (0, k.zh)(n), d = (0, s.lG)(o.startContainer, "LI");
                  d && on(n, d, o);
                }
              }), i;
            }
            return t;
          }(he)
        ), Wr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Kr = (
          /** @class */
          function(e) {
            Wr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), n.tip.show(`<div style="max-width: 520px; font-size: 14px;line-height: 22px;margin-bottom: 14px;">
<p style="text-align: center;margin: 14px 0">
    <em>下一代的 Markdown 编辑器，为未来而构建</em>
</p>
<div style="display: flex;margin-bottom: 14px;flex-wrap: wrap;align-items: center">
    <img src="https://unpkg.com/vditor/dist/images/logo.png" style="margin: 0 auto;height: 68px"/>
    <div>&nbsp;&nbsp;</div>
    <div style="flex: 1;min-width: 250px">
        Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。
        它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。
    </div>
</div>
<div style="display: flex;flex-wrap: wrap;">
    <ul style="list-style: none;flex: 1;min-width:148px">
        <li>
        项目地址：<a href="https://b3log.org/vditor" target="_blank">b3log.org/vditor</a>
        </li>
        <li>
        开源协议：MIT
        </li>
    </ul>
    <ul style="list-style: none;margin-right: 18px">
        <li>
        组件版本：Vditor v`.concat(E.H, " / Lute v").concat(Lute.Version, `
        </li>
        <li>
        赞助捐赠：<a href="https://ld246.com/sponsor" target="_blank">https://ld246.com/sponsor</a>
        </li>
    </ul>
</div>
</div>`), 0);
              }), i;
            }
            return t;
          }(he)
        ), qr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), zr = (
          /** @class */
          function(e) {
            qr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !(i.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED) || n.currentMode === "sv") && ht(n, "afterend");
              }), i;
            }
            return t;
          }(he)
        ), Gr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Fr = (
          /** @class */
          function(e) {
            Gr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !(i.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED) || n.currentMode === "sv") && ht(n, "beforebegin");
              }), i;
            }
            return t;
          }(he)
        ), Zr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Jr = (
          /** @class */
          function(e) {
            Zr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                if (a.preventDefault(), !(i.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED) || n.currentMode === "sv")) {
                  var o = (0, k.zh)(n), d = (0, s.lG)(o.startContainer, "LI");
                  d && Rt(n, d, o, d.parentElement);
                }
              }), i;
            }
            return t;
          }(he)
        ), Xr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Yr = (
          /** @class */
          function(e) {
            Xr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return n.options.outline && i.element.firstElementChild.classList.add("vditor-menu--current"), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault();
                var o = n.toolbar.elements.outline.firstElementChild;
                o.classList.contains(E.g.CLASS_MENU_DISABLED) || (n.options.outline.enable = !i.element.firstElementChild.classList.contains("vditor-menu--current"), n.outline.toggle(n, n.options.outline.enable));
              }), i;
            }
            return t;
          }(he)
        ), Qr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), $r = (
          /** @class */
          function(e) {
            Qr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this;
              this.element.children[0].addEventListener((0, l.Le)(), function(i) {
                i.preventDefault();
                var a = r.element.firstElementChild;
                if (!a.classList.contains(E.g.CLASS_MENU_DISABLED)) {
                  var o = E.g.EDIT_TOOLBARS.concat(["both", "edit-mode", "devtools"]);
                  a.classList.contains("vditor-menu--current") ? (a.classList.remove("vditor-menu--current"), n.currentMode === "sv" ? (n.sv.element.style.display = "block", n.options.preview.mode === "both" ? n.preview.element.style.display = "block" : n.preview.element.style.display = "none") : (n[n.currentMode].element.parentElement.style.display = "block", n.preview.element.style.display = "none"), m(n.toolbar.elements, o), n.outline.render(n)) : (f(n.toolbar.elements, o), n.preview.element.style.display = "block", n.currentMode === "sv" ? n.sv.element.style.display = "none" : n[n.currentMode].element.parentElement.style.display = "none", n.preview.render(n), a.classList.add("vditor-menu--current"), b(n, ["subToolbar", "hint", "popover"]), setTimeout(function() {
                    n.outline.render(n);
                  }, n.options.preview.delay + 10)), He(n);
                }
              });
            }, t;
          }(he)
        ), ei = (
          /** @class */
          function() {
            function e(t) {
              this.SAMPLE_RATE = 5e3, this.isRecording = !1, this.readyFlag = !1, this.leftChannel = [], this.rightChannel = [], this.recordingLength = 0;
              var n;
              if (typeof AudioContext < "u")
                n = new AudioContext();
              else if (webkitAudioContext)
                n = new webkitAudioContext();
              else
                return;
              this.DEFAULT_SAMPLE_RATE = n.sampleRate;
              var r = n.createGain(), i = n.createMediaStreamSource(t);
              i.connect(r), this.recorder = n.createScriptProcessor(2048, 2, 1), this.recorder.onaudioprocess = null, r.connect(this.recorder), this.recorder.connect(n.destination), this.readyFlag = !0;
            }
            return e.prototype.cloneChannelData = function(t, n) {
              this.leftChannel.push(new Float32Array(t)), this.rightChannel.push(new Float32Array(n)), this.recordingLength += 2048;
            }, e.prototype.startRecordingNewWavFile = function() {
              this.readyFlag && (this.isRecording = !0, this.leftChannel.length = this.rightChannel.length = 0, this.recordingLength = 0);
            }, e.prototype.stopRecording = function() {
              this.isRecording = !1;
            }, e.prototype.buildWavFileBlob = function() {
              for (var t = this.mergeBuffers(this.leftChannel), n = this.mergeBuffers(this.rightChannel), r = new Float32Array(t.length), i = 0; i < t.length; ++i)
                r[i] = 0.5 * (t[i] + n[i]);
              this.DEFAULT_SAMPLE_RATE > this.SAMPLE_RATE && (r = this.downSampleBuffer(r, this.SAMPLE_RATE));
              var a = 44 + r.length * 2, o = new ArrayBuffer(a), d = new DataView(o);
              this.writeUTFBytes(d, 0, "RIFF"), d.setUint32(4, a, !0), this.writeUTFBytes(d, 8, "WAVE"), this.writeUTFBytes(d, 12, "fmt "), d.setUint32(16, 16, !0), d.setUint16(20, 1, !0), d.setUint16(22, 1, !0), d.setUint32(24, this.SAMPLE_RATE, !0), d.setUint32(28, this.SAMPLE_RATE * 2, !0), d.setUint16(32, 2, !0), d.setUint16(34, 16, !0);
              var h = r.length * 2;
              this.writeUTFBytes(d, 36, "data"), d.setUint32(40, h, !0);
              for (var u = r.length, S = 44, T = 1, I = 0; I < u; I++)
                d.setInt16(S, r[I] * (32767 * T), !0), S += 2;
              return new Blob([d], { type: "audio/wav" });
            }, e.prototype.downSampleBuffer = function(t, n) {
              if (n === this.DEFAULT_SAMPLE_RATE || n > this.DEFAULT_SAMPLE_RATE)
                return t;
              for (var r = this.DEFAULT_SAMPLE_RATE / n, i = Math.round(t.length / r), a = new Float32Array(i), o = 0, d = 0; o < a.length; ) {
                for (var h = Math.round((o + 1) * r), u = 0, S = 0, T = d; T < h && T < t.length; T++)
                  u += t[T], S++;
                a[o] = u / S, o++, d = h;
              }
              return a;
            }, e.prototype.mergeBuffers = function(t) {
              for (var n = new Float32Array(this.recordingLength), r = 0, i = t.length, a = 0; a < i; ++a) {
                var o = t[a];
                n.set(o, r), r += o.length;
              }
              return n;
            }, e.prototype.writeUTFBytes = function(t, n, r) {
              for (var i = r.length, a = 0; a < i; a++)
                t.setUint8(n + a, r.charCodeAt(a));
            }, e;
          }()
        ), ti = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), ni = (
          /** @class */
          function(e) {
            ti(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this, i;
              this.element.children[0].addEventListener((0, l.Le)(), function(a) {
                if (a.preventDefault(), !r.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED)) {
                  var o = n[n.currentMode].element;
                  if (!i) {
                    navigator.mediaDevices.getUserMedia({ audio: !0 }).then(function(h) {
                      i = new ei(h), i.recorder.onaudioprocess = function(u) {
                        if (i.isRecording) {
                          var S = u.inputBuffer.getChannelData(0), T = u.inputBuffer.getChannelData(1);
                          i.cloneChannelData(S, T);
                        }
                      }, i.startRecordingNewWavFile(), n.tip.show(window.VditorI18n.recording), o.setAttribute("contenteditable", "false"), r.element.children[0].classList.add("vditor-menu--current");
                    }).catch(function() {
                      n.tip.show(window.VditorI18n["record-tip"]);
                    });
                    return;
                  }
                  if (i.isRecording) {
                    i.stopRecording(), n.tip.hide();
                    var d = new File([i.buildWavFileBlob()], "record".concat((/* @__PURE__ */ new Date()).getTime(), ".wav"), { type: "video/webm" });
                    Nt(n, [d]), r.element.children[0].classList.remove("vditor-menu--current");
                  } else
                    n.tip.show(window.VditorI18n.recording), o.setAttribute("contenteditable", "false"), i.startRecordingNewWavFile(), r.element.children[0].classList.add("vditor-menu--current");
                }
              });
            }, t;
          }(he)
        ), ri = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), ii = (
          /** @class */
          function(e) {
            ri(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return f({ redo: i.element }, ["redo"]), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !i.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED) && n.undo.redo(n);
              }), i;
            }
            return t;
          }(he)
        ), ai = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), oi = (
          /** @class */
          function(e) {
            ai(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return f({ undo: i.element }, ["undo"]), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !i.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED) && n.undo.undo(n);
              }), i;
            }
            return t;
          }(he)
        ), si = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), li = (
          /** @class */
          function(e) {
            si(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = '<input type="file"';
              return n.options.upload.multiple && (a += ' multiple="multiple"'), n.options.upload.accept && (a += ' accept="'.concat(n.options.upload.accept, '"')), i.element.children[0].innerHTML = "".concat(r.icon || '<svg><use xlink:href="#vditor-icon-upload"></use></svg>').concat(a, ">"), i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this;
              this.element.children[0].addEventListener((0, l.Le)(), function(i) {
                if (r.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED)) {
                  i.stopPropagation(), i.preventDefault();
                  return;
                }
              }), this.element.querySelector("input").addEventListener("change", function(i) {
                if (r.element.firstElementChild.classList.contains(E.g.CLASS_MENU_DISABLED)) {
                  i.stopPropagation(), i.preventDefault();
                  return;
                }
                i.target.files.length !== 0 && Nt(n, i.target.files, i.target);
              });
            }, t;
          }(he)
        ), ci = (
          /** @class */
          function() {
            function e(t) {
              var n = this, r = t.options;
              this.elements = {}, this.element = document.createElement("div"), this.element.className = "vditor-toolbar", r.toolbar.forEach(function(i, a) {
                var o = n.genItem(t, i, a);
                if (n.element.appendChild(o), i.toolbar) {
                  var d = document.createElement("div");
                  d.className = "vditor-hint vditor-panel--arrow", d.addEventListener((0, l.Le)(), function(h) {
                    d.style.display = "none";
                  }), i.toolbar.forEach(function(h, u) {
                    h.level = 2, d.appendChild(n.genItem(t, h, a + u));
                  }), o.appendChild(d), y(t, d, o.children[0]);
                }
              }), t.options.toolbarConfig.hide && this.element.classList.add("vditor-toolbar--hide"), t.options.toolbarConfig.pin && this.element.classList.add("vditor-toolbar--pin"), t.options.counter.enable && (t.counter = new Er(t), this.element.appendChild(t.counter.element));
            }
            return e.prototype.updateConfig = function(t, n) {
              t.options.toolbarConfig = Object.assign({
                hide: !1,
                pin: !1
              }, n), t.options.toolbarConfig.hide ? this.element.classList.add("vditor-toolbar--hide") : this.element.classList.remove("vditor-toolbar--hide"), t.options.toolbarConfig.pin ? this.element.classList.add("vditor-toolbar--pin") : this.element.classList.remove("vditor-toolbar--pin");
            }, e.prototype.genItem = function(t, n, r) {
              var i;
              switch (n.name) {
                case "bold":
                case "italic":
                case "more":
                case "strike":
                case "line":
                case "quote":
                case "list":
                case "ordered-list":
                case "check":
                case "code":
                case "inline-code":
                case "link":
                case "table":
                  i = new he(t, n);
                  break;
                case "emoji":
                  i = new _r(t, n);
                  break;
                case "headings":
                  i = new Pr(t, n);
                  break;
                case "|":
                  i = new kr();
                  break;
                case "br":
                  i = new gr();
                  break;
                case "undo":
                  i = new oi(t, n);
                  break;
                case "redo":
                  i = new ii(t, n);
                  break;
                case "help":
                  i = new Br(t, n);
                  break;
                case "both":
                  i = new mr(t, n);
                  break;
                case "preview":
                  i = new $r(t, n);
                  break;
                case "fullscreen":
                  i = new Rr(t, n);
                  break;
                case "upload":
                  i = new li(t, n);
                  break;
                case "record":
                  i = new ni(t, n);
                  break;
                case "info":
                  i = new Kr(t, n);
                  break;
                case "edit-mode":
                  i = new qn(t, n);
                  break;
                case "devtools":
                  i = new Mr(t, n);
                  break;
                case "outdent":
                  i = new Jr(t, n);
                  break;
                case "indent":
                  i = new Vr(t, n);
                  break;
                case "outline":
                  i = new Yr(t, n);
                  break;
                case "insert-after":
                  i = new zr(t, n);
                  break;
                case "insert-before":
                  i = new Fr(t, n);
                  break;
                case "code-theme":
                  i = new br(t, n);
                  break;
                case "content-theme":
                  i = new vr(t, n);
                  break;
                case "export":
                  i = new Or(t, n);
                  break;
                default:
                  i = new Cr(t, n);
                  break;
              }
              if (i) {
                var a = n.name;
                return (a === "br" || a === "|") && (a = a + r), this.elements[a] = i.element, i.element;
              }
            }, e;
          }()
        ), ui = ee(85), fi = (
          /** @class */
          function() {
            function e() {
              this.stackSize = 50, this.resetStack(), this.dmp = new ui();
            }
            return e.prototype.clearStack = function(t) {
              this.resetStack(), this.resetIcon(t);
            }, e.prototype.resetIcon = function(t) {
              t.toolbar && (this[t.currentMode].undoStack.length > 1 ? m(t.toolbar.elements, ["undo"]) : f(t.toolbar.elements, ["undo"]), this[t.currentMode].redoStack.length !== 0 ? m(t.toolbar.elements, ["redo"]) : f(t.toolbar.elements, ["redo"]));
            }, e.prototype.undo = function(t) {
              if (t[t.currentMode].element.getAttribute("contenteditable") !== "false" && !(this[t.currentMode].undoStack.length < 2)) {
                var n = this[t.currentMode].undoStack.pop();
                n && (this[t.currentMode].redoStack.push(n), this.renderDiff(n, t), this[t.currentMode].hasUndo = !0, b(t, ["hint"]));
              }
            }, e.prototype.redo = function(t) {
              if (t[t.currentMode].element.getAttribute("contenteditable") !== "false") {
                var n = this[t.currentMode].redoStack.pop();
                n && (this[t.currentMode].undoStack.push(n), this.renderDiff(n, t, !0));
              }
            }, e.prototype.recordFirstPosition = function(t, n) {
              if (getSelection().rangeCount !== 0 && !(this[t.currentMode].undoStack.length !== 1 || this[t.currentMode].undoStack[0].length === 0 || this[t.currentMode].redoStack.length > 0) && !((0, l.vU)() && n.key === "Backspace") && !(0, l.G6)()) {
                var r = this.addCaret(t);
                r.replace("<wbr>", "").replace(" vditor-ir__node--expand", "") === this[t.currentMode].undoStack[0][0].diffs[0][1].replace("<wbr>", "") && (this[t.currentMode].undoStack[0][0].diffs[0][1] = r, this[t.currentMode].lastText = r);
              }
            }, e.prototype.addToUndoStack = function(t) {
              var n = this.addCaret(t, !0), r = this.dmp.diff_main(n, this[t.currentMode].lastText, !0), i = this.dmp.patch_make(n, this[t.currentMode].lastText, r);
              i.length === 0 && this[t.currentMode].undoStack.length > 0 || (this[t.currentMode].lastText = n, this[t.currentMode].undoStack.push(i), this[t.currentMode].undoStack.length > this.stackSize && this[t.currentMode].undoStack.shift(), this[t.currentMode].hasUndo && (this[t.currentMode].redoStack = [], this[t.currentMode].hasUndo = !1, f(t.toolbar.elements, ["redo"])), this[t.currentMode].undoStack.length > 1 && m(t.toolbar.elements, ["undo"]));
            }, e.prototype.renderDiff = function(t, n, r) {
              r === void 0 && (r = !1);
              var i;
              if (r) {
                var a = this.dmp.patch_deepCopy(t).reverse();
                a.forEach(function(d) {
                  d.diffs.forEach(function(h) {
                    h[0] = -h[0];
                  });
                }), i = this.dmp.patch_apply(a, this[n.currentMode].lastText)[0];
              } else
                i = this.dmp.patch_apply(t, this[n.currentMode].lastText)[0];
              if (this[n.currentMode].lastText = i, n[n.currentMode].element.innerHTML = i, n.currentMode !== "sv" && (n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview")).forEach(function(d) {
                d.outerHTML = n.lute.SpinVditorDOM(d.parentElement.outerHTML);
              }), n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview[data-render='2']")).forEach(function(d) {
                ve(d, n);
              })), n[n.currentMode].element.querySelector("wbr"))
                (0, k.ib)(n[n.currentMode].element, n[n.currentMode].element.ownerDocument.createRange()), ye(n);
              else {
                var o = getSelection().getRangeAt(0);
                o.setEndBefore(n[n.currentMode].element), o.collapse(!1);
              }
              Re(n), $(n, {
                enableAddUndoStack: !1,
                enableHint: !1,
                enableInput: !0
              }), Ze(n), n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview[data-render='2']")).forEach(function(d) {
                ve(d, n);
              }), this[n.currentMode].undoStack.length > 1 ? m(n.toolbar.elements, ["undo"]) : f(n.toolbar.elements, ["undo"]), this[n.currentMode].redoStack.length !== 0 ? m(n.toolbar.elements, ["redo"]) : f(n.toolbar.elements, ["redo"]);
            }, e.prototype.resetStack = function() {
              this.ir = {
                hasUndo: !1,
                lastText: "",
                redoStack: [],
                undoStack: []
              }, this.sv = {
                hasUndo: !1,
                lastText: "",
                redoStack: [],
                undoStack: []
              }, this.wysiwyg = {
                hasUndo: !1,
                lastText: "",
                redoStack: [],
                undoStack: []
              };
            }, e.prototype.addCaret = function(t, n) {
              n === void 0 && (n = !1);
              var r;
              if (getSelection().rangeCount !== 0 && !t[t.currentMode].element.querySelector("wbr")) {
                var i = getSelection().getRangeAt(0);
                if (t[t.currentMode].element.contains(i.startContainer)) {
                  r = i.cloneRange();
                  var a = document.createElement("span");
                  a.className = "vditor-wbr", i.insertNode(a);
                }
              }
              var o = t.ir.element.cloneNode(!0);
              o.querySelectorAll(".vditor-".concat(t.currentMode, "__preview[data-render='1']")).forEach(function(h) {
                h.firstElementChild && (h.firstElementChild.classList.contains("language-echarts") || h.firstElementChild.classList.contains("language-plantuml") || h.firstElementChild.classList.contains("language-mindmap") ? (h.firstElementChild.removeAttribute("_echarts_instance_"), h.firstElementChild.removeAttribute("data-processed"), h.firstElementChild.innerHTML = h.previousElementSibling.firstElementChild.innerHTML, h.setAttribute("data-render", "2")) : h.firstElementChild.classList.contains("language-math") && (h.setAttribute("data-render", "2"), h.firstElementChild.textContent = h.firstElementChild.getAttribute("data-math"), h.firstElementChild.removeAttribute("data-math")));
              });
              var d = t[t.currentMode].element.innerHTML;
              return t[t.currentMode].element.querySelectorAll(".vditor-wbr").forEach(function(h) {
                h.remove();
              }), n && r && (0, k.Hc)(r), d.replace('<span class="vditor-wbr"></span>', "<wbr>");
            }, e;
          }()
        ), di = ee(2), pi = (
          /** @class */
          function() {
            function e(t) {
              this.defaultOptions = {
                rtl: !1,
                after: void 0,
                cache: {
                  enable: !0
                },
                cdn: E.g.CDN,
                classes: {
                  preview: ""
                },
                comment: {
                  enable: !1
                },
                counter: {
                  enable: !1,
                  type: "markdown"
                },
                customRenders: [],
                debugger: !1,
                fullscreen: {
                  index: 90
                },
                height: "auto",
                hint: {
                  delay: 200,
                  emoji: {
                    "+1": "👍",
                    "-1": "👎",
                    confused: "😕",
                    eyes: "👀️",
                    heart: "❤️",
                    rocket: "🚀️",
                    smile: "😄",
                    tada: "🎉️"
                  },
                  emojiPath: "".concat(E.g.CDN, "/dist/images/emoji"),
                  extend: [],
                  parse: !0
                },
                icon: "ant",
                lang: "zh_CN",
                mode: "ir",
                outline: {
                  enable: !1,
                  position: "left"
                },
                placeholder: "",
                preview: {
                  actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"],
                  delay: 1e3,
                  hljs: E.g.HLJS_OPTIONS,
                  markdown: E.g.MARKDOWN_OPTIONS,
                  math: E.g.MATH_OPTIONS,
                  maxWidth: 800,
                  mode: "both",
                  theme: E.g.THEME_OPTIONS,
                  render: {
                    media: {
                      enable: !0
                    }
                  }
                },
                link: {
                  isOpen: !0
                },
                image: {
                  isPreview: !0
                },
                resize: {
                  enable: !1,
                  position: "bottom"
                },
                theme: "classic",
                toolbar: [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "|",
                  "list",
                  "ordered-list",
                  "check",
                  "outdent",
                  "indent",
                  "|",
                  "quote",
                  "line",
                  "code",
                  "inline-code",
                  "insert-before",
                  "insert-after",
                  "|",
                  "upload",
                  "record",
                  "table",
                  "|",
                  "undo",
                  "redo",
                  "|",
                  "fullscreen",
                  "edit-mode",
                  {
                    name: "more",
                    toolbar: [
                      "both",
                      "code-theme",
                      "content-theme",
                      "export",
                      "outline",
                      "preview",
                      "devtools",
                      "info",
                      "help"
                    ]
                  }
                ],
                toolbarConfig: {
                  hide: !1,
                  pin: !1
                },
                typewriterMode: !1,
                undoDelay: 800,
                upload: {
                  extraData: {},
                  fieldName: "file[]",
                  filename: function(n) {
                    return n.replace(/\W/g, "");
                  },
                  linkToImgUrl: "",
                  max: 10 * 1024 * 1024,
                  multiple: !0,
                  url: "",
                  withCredentials: !1
                },
                value: "",
                width: "auto"
              }, this.options = t;
            }
            return e.prototype.merge = function() {
              var t, n, r, i, a, o, d, h, u;
              this.options && (this.options.toolbar ? this.options.toolbar = this.mergeToolbar(this.options.toolbar) : this.options.toolbar = this.mergeToolbar(this.defaultOptions.toolbar), !((n = (t = this.options.preview) === null || t === void 0 ? void 0 : t.theme) === null || n === void 0) && n.list && (this.defaultOptions.preview.theme.list = this.options.preview.theme.list), !((a = (i = (r = this.options.preview) === null || r === void 0 ? void 0 : r.render) === null || i === void 0 ? void 0 : i.media) === null || a === void 0) && a.enable && (this.defaultOptions.preview.render.media.enable = this.options.preview.render.media.enable), !((o = this.options.hint) === null || o === void 0) && o.emoji && (this.defaultOptions.hint.emoji = this.options.hint.emoji), this.options.comment && (this.defaultOptions.comment = this.options.comment), this.options.cdn && (!((h = (d = this.options.preview) === null || d === void 0 ? void 0 : d.theme) === null || h === void 0) && h.path || (this.defaultOptions.preview.theme.path = "".concat(this.options.cdn, "/dist/css/content-theme")), !((u = this.options.hint) === null || u === void 0) && u.emojiPath || (this.defaultOptions.hint.emojiPath = "".concat(this.options.cdn, "/dist/images/emoji"))));
              var S = (0, di.T)(this.defaultOptions, this.options);
              if (S.cache.enable && !S.cache.id)
                throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
              return S;
            }, e.prototype.mergeToolbar = function(t) {
              var n = this, r = [
                {
                  icon: '<svg><use xlink:href="#vditor-icon-export"></use></svg>',
                  name: "export",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘E",
                  icon: '<svg><use xlink:href="#vditor-icon-emoji"></use></svg>',
                  name: "emoji",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘H",
                  icon: '<svg><use xlink:href="#vditor-icon-headings"></use></svg>',
                  name: "headings",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘B",
                  icon: '<svg><use xlink:href="#vditor-icon-bold"></use></svg>',
                  name: "bold",
                  prefix: "**",
                  suffix: "**",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘I",
                  icon: '<svg><use xlink:href="#vditor-icon-italic"></use></svg>',
                  name: "italic",
                  prefix: "*",
                  suffix: "*",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘D",
                  icon: '<svg><use xlink:href="#vditor-icon-strike"></use></svg>',
                  name: "strike",
                  prefix: "~~",
                  suffix: "~~",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘K",
                  icon: '<svg><use xlink:href="#vditor-icon-link"></use></svg>',
                  name: "link",
                  prefix: "[",
                  suffix: "](https://)",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "⌘L",
                  icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
                  name: "list",
                  prefix: "* ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘O",
                  icon: '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>',
                  name: "ordered-list",
                  prefix: "1. ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘J",
                  icon: '<svg><use xlink:href="#vditor-icon-check"></use></svg>',
                  name: "check",
                  prefix: "* [ ] ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘I",
                  icon: '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>',
                  name: "outdent",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘O",
                  icon: '<svg><use xlink:href="#vditor-icon-indent"></use></svg>',
                  name: "indent",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "⌘;",
                  icon: '<svg><use xlink:href="#vditor-icon-quote"></use></svg>',
                  name: "quote",
                  prefix: "> ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘H",
                  icon: '<svg><use xlink:href="#vditor-icon-line"></use></svg>',
                  name: "line",
                  prefix: "---",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘U",
                  icon: '<svg><use xlink:href="#vditor-icon-code"></use></svg>',
                  name: "code",
                  prefix: "```",
                  suffix: "\n```",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘G",
                  icon: '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>',
                  name: "inline-code",
                  prefix: "`",
                  suffix: "`",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘B",
                  icon: '<svg><use xlink:href="#vditor-icon-before"></use></svg>',
                  name: "insert-before",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘E",
                  icon: '<svg><use xlink:href="#vditor-icon-after"></use></svg>',
                  name: "insert-after",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
                  name: "upload",
                  tipPosition: "n"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-record"></use></svg>',
                  name: "record",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘M",
                  icon: '<svg><use xlink:href="#vditor-icon-table"></use></svg>',
                  name: "table",
                  prefix: "| col1",
                  suffix: ` | col2 | col3 |
| --- | --- | --- |
|  |  |  |
|  |  |  |`,
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "⌘Z",
                  icon: '<svg><use xlink:href="#vditor-icon-undo"></use></svg>',
                  name: "undo",
                  tipPosition: "nw"
                },
                {
                  hotkey: "⌘Y",
                  icon: '<svg><use xlink:href="#vditor-icon-redo"></use></svg>',
                  name: "redo",
                  tipPosition: "nw"
                },
                {
                  name: "|"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-more"></use></svg>',
                  name: "more",
                  tipPosition: "e"
                },
                {
                  hotkey: "⌘'",
                  icon: '<svg><use xlink:href="#vditor-icon-fullscreen"></use></svg>',
                  name: "fullscreen",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-edit"></use></svg>',
                  name: "edit-mode",
                  tipPosition: "nw"
                },
                {
                  hotkey: "⌘P",
                  icon: '<svg><use xlink:href="#vditor-icon-both"></use></svg>',
                  name: "both",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-preview"></use></svg>',
                  name: "preview",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>',
                  name: "outline",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-theme"></use></svg>',
                  name: "content-theme",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>',
                  name: "code-theme",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-bug"></use></svg>',
                  name: "devtools",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-info"></use></svg>',
                  name: "info",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-help"></use></svg>',
                  name: "help",
                  tipPosition: "nw"
                },
                {
                  name: "br"
                }
              ], i = [];
              return t.forEach(function(a) {
                var o = a;
                r.forEach(function(d) {
                  typeof a == "string" && d.name === a && (o = d), typeof a == "object" && d.name === a.name && (o = Object.assign({}, d, a));
                }), a.toolbar && (o.toolbar = n.mergeToolbar(a.toolbar)), i.push(o);
              }), i;
            }, e;
          }()
        ), hi = (
          /** @class */
          function() {
            function e(t) {
              var n = this;
              this.composingLock = !1, this.commentIds = [];
              var r = document.createElement("div");
              r.className = "vditor-wysiwyg", r.innerHTML = '<pre class="vditor-reset" placeholder="'.concat(t.options.placeholder, `"
 contenteditable="true" spellcheck="false"></pre>
<div class="vditor-panel vditor-panel--none"></div>
<div class="vditor-panel vditor-panel--none">
    <button type="button" aria-label="`).concat(window.VditorI18n.comment, `" class="vditor-icon vditor-tooltipped vditor-tooltipped__n">
        <svg><use xlink:href="#vditor-icon-comment"></use></svg>
    </button>
</div>`), this.element = r.firstElementChild, this.popover = r.firstElementChild.nextElementSibling, this.selectPopover = r.lastElementChild, this.bindEvent(t), kt(t, this.element), Xt(t, this.element), Tt(t, this.element), Ht(t, this.element), Dt(t, this.element), _t(t, this.element), At(t, this.element, this.copy), xt(t, this.element, this.copy), t.options.comment.enable && (this.selectPopover.querySelector("button").onclick = function() {
                var i = Lute.NewNodeID(), a = getSelection().getRangeAt(0), o = a.cloneRange(), d = a.extractContents(), h, u, S = !1, T = !1;
                d.childNodes.forEach(function(O, q) {
                  var B = !1;
                  if (O.nodeType === 3 ? B = !0 : O.classList.contains("vditor-comment") ? O.classList.contains("vditor-comment") && O.setAttribute("data-cmtids", O.getAttribute("data-cmtids") + " " + i) : B = !0, B)
                    if (O.nodeType !== 3 && O.getAttribute("data-block") === "0" && q === 0 && o.startOffset > 0)
                      O.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(O.innerHTML, "</span>"), h = O;
                    else if (O.nodeType !== 3 && O.getAttribute("data-block") === "0" && q === d.childNodes.length - 1 && o.endOffset < o.endContainer.textContent.length)
                      O.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(O.innerHTML, "</span>"), u = O;
                    else if (O.nodeType !== 3 && O.getAttribute("data-block") === "0")
                      q === 0 ? S = !0 : q === d.childNodes.length - 1 && (T = !0), O.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(O.innerHTML, "</span>");
                    else {
                      var D = document.createElement("span");
                      D.classList.add("vditor-comment"), D.setAttribute("data-cmtids", i), O.parentNode.insertBefore(D, O), D.appendChild(O);
                    }
                });
                var I = (0, s.F9)(o.startContainer);
                I && (h ? (I.insertAdjacentHTML("beforeend", h.innerHTML), h.remove()) : I.textContent.trim().replace(E.g.ZWSP, "") === "" && S && I.remove());
                var R = (0, s.F9)(o.endContainer);
                R && (u ? (R.insertAdjacentHTML("afterbegin", u.innerHTML), u.remove()) : R.textContent.trim().replace(E.g.ZWSP, "") === "" && T && R.remove()), a.insertNode(d), t.options.comment.add(i, a.toString(), n.getComments(t, !0)), ce(t, {
                  enableAddUndoStack: !0,
                  enableHint: !1,
                  enableInput: !1
                }), n.hideComment();
              });
            }
            return e.prototype.getComments = function(t, n) {
              var r = this;
              if (n === void 0 && (n = !1), t.currentMode === "wysiwyg" && t.options.comment.enable) {
                this.commentIds = [], this.element.querySelectorAll(".vditor-comment").forEach(function(a) {
                  r.commentIds = r.commentIds.concat(a.getAttribute("data-cmtids").split(" "));
                }), this.commentIds = Array.from(new Set(this.commentIds));
                var i = [];
                if (n)
                  return this.commentIds.forEach(function(a) {
                    i.push({
                      id: a,
                      top: r.element.querySelector('.vditor-comment[data-cmtids="'.concat(a, '"]')).offsetTop
                    });
                  }), i;
              } else
                return [];
            }, e.prototype.triggerRemoveComment = function(t) {
              var n = function(a, o) {
                var d = new Set(o);
                return a.filter(function(h) {
                  return !d.has(h);
                });
              };
              if (t.currentMode === "wysiwyg" && t.options.comment.enable && t.wysiwyg.commentIds.length > 0) {
                var r = JSON.parse(JSON.stringify(this.commentIds));
                this.getComments(t);
                var i = n(r, this.commentIds);
                i.length > 0 && t.options.comment.remove(i);
              }
            }, e.prototype.showComment = function() {
              var t = (0, k.Ny)(this.element);
              this.selectPopover.setAttribute("style", "left:".concat(t.left, "px;display:block;top:").concat(Math.max(-8, t.top - 21), "px"));
            }, e.prototype.hideComment = function() {
              this.selectPopover.setAttribute("style", "display:none");
            }, e.prototype.unbindListener = function() {
              window.removeEventListener("scroll", this.scrollListener);
            }, e.prototype.copy = function(t, n) {
              var r = getSelection().getRangeAt(0);
              if (r.toString() !== "") {
                t.stopPropagation(), t.preventDefault();
                var i = (0, s.lG)(r.startContainer, "CODE"), a = (0, s.lG)(r.endContainer, "CODE");
                if (i && a && a.isSameNode(i)) {
                  var o = "";
                  i.parentElement.tagName === "PRE" ? o = r.toString() : o = "`" + r.toString() + "`", t.clipboardData.setData("text/plain", o), t.clipboardData.setData("text/html", "");
                  return;
                }
                var d = (0, s.lG)(r.startContainer, "A"), h = (0, s.lG)(r.endContainer, "A");
                if (d && h && h.isSameNode(d)) {
                  var u = d.getAttribute("title") || "";
                  u && (u = ' "'.concat(u, '"')), t.clipboardData.setData("text/plain", "[".concat(r.toString(), "](").concat(d.getAttribute("href")).concat(u, ")")), t.clipboardData.setData("text/html", "");
                  return;
                }
                var S = document.createElement("div");
                S.appendChild(r.cloneContents()), t.clipboardData.setData("text/plain", n.lute.VditorDOM2Md(S.innerHTML).trim()), t.clipboardData.setData("text/html", "");
              }
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.unbindListener(), window.addEventListener("scroll", this.scrollListener = function() {
                if (b(t, ["hint"]), !(n.popover.style.display !== "block" || n.selectPopover.style.display !== "block")) {
                  var r = parseInt(n.popover.getAttribute("data-top"), 10);
                  if (t.options.height !== "auto") {
                    if (t.options.toolbarConfig.pin && t.toolbar.element.getBoundingClientRect().top === 0) {
                      var i = Math.max(window.scrollY - t.element.offsetTop - 8, Math.min(r - t.wysiwyg.element.scrollTop, n.element.clientHeight - 21)) + "px";
                      n.popover.style.display === "block" && (n.popover.style.top = i), n.selectPopover.style.display === "block" && (n.selectPopover.style.top = i);
                    }
                    return;
                  } else if (!t.options.toolbarConfig.pin)
                    return;
                  var a = Math.max(r, window.scrollY - t.element.offsetTop - 8) + "px";
                  n.popover.style.display === "block" && (n.popover.style.top = a), n.selectPopover.style.display === "block" && (n.selectPopover.style.top = a);
                }
              }), this.element.addEventListener("scroll", function() {
                if (b(t, ["hint"]), t.options.comment && t.options.comment.enable && t.options.comment.scroll && t.options.comment.scroll(t.wysiwyg.element.scrollTop), n.popover.style.display === "block") {
                  var r = parseInt(n.popover.getAttribute("data-top"), 10) - t.wysiwyg.element.scrollTop, i = -8;
                  t.options.toolbarConfig.pin && t.toolbar.element.getBoundingClientRect().top === 0 && (i = window.scrollY - t.element.offsetTop + i);
                  var a = Math.max(i, Math.min(r, n.element.clientHeight - 21)) + "px";
                  n.popover.style.top = a, n.selectPopover.style.top = a;
                }
              }), this.element.addEventListener("paste", function(r) {
                bt(t, r, {
                  pasteCode: function(i) {
                    var a = (0, k.zh)(t), o = document.createElement("template");
                    o.innerHTML = i, a.insertNode(o.content.cloneNode(!0));
                    var d = (0, s.a1)(a.startContainer, "data-block", "0");
                    d ? d.outerHTML = t.lute.SpinVditorDOM(d.outerHTML) : t.wysiwyg.element.innerHTML = t.lute.SpinVditorDOM(t.wysiwyg.element.innerHTML), (0, k.ib)(t.wysiwyg.element, a);
                  }
                });
              }), this.element.addEventListener("compositionstart", function() {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                var i = (0, C.W)(getSelection().getRangeAt(0).startContainer);
                if (i && i.textContent === "") {
                  Re(t);
                  return;
                }
                (0, l.vU)() || pt(t, getSelection().getRangeAt(0).cloneRange(), r), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop")) {
                  if (n.preventInput) {
                    n.preventInput = !1, ce(t);
                    return;
                  }
                  if (n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《") {
                    ce(t);
                    return;
                  }
                  var i = getSelection().getRangeAt(0), a = (0, s.F9)(i.startContainer);
                  if (a || (Ct(t, i), a = (0, s.F9)(i.startContainer)), !!a) {
                    for (var o = (0, k.im)(a, t.wysiwyg.element, i).start, d = !0, h = o - 1; h > a.textContent.substr(0, o).lastIndexOf(`
`); h--)
                      if (a.textContent.charAt(h) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
                      a.textContent.charAt(h) !== "	") {
                        d = !1;
                        break;
                      }
                    o === 0 && (d = !1);
                    for (var u = !0, h = o - 1; h < a.textContent.length; h++)
                      if (a.textContent.charAt(h) !== " " && a.textContent.charAt(h) !== `
`) {
                        u = !1;
                        break;
                      }
                    u && /^#{1,6} $/.test(a.textContent) && (u = !1);
                    var S = (0, C.W)(getSelection().getRangeAt(0).startContainer);
                    if (S && S.textContent === "" && (Re(t), S.remove()), d && a.getAttribute("data-type") !== "code-block" || u || Pt(a.innerHTML) || It(a.innerHTML) && a.previousElementSibling) {
                      typeof t.options.input == "function" && t.options.input(x(t));
                      return;
                    }
                    r.inputType === "insertParagraph" && n.element.innerHTML === "<p><br></p><p><br></p>" && a.previousElementSibling.remove(), pt(t, i, r);
                  }
                }
              }), this.element.addEventListener("click", function(r) {
                if (r.target.tagName === "INPUT") {
                  var i = r.target;
                  i.checked ? i.setAttribute("checked", "checked") : i.removeAttribute("checked"), n.preventInput = !0, ce(t);
                  return;
                }
                if (r.target.tagName === "IMG" && // plantuml 图片渲染不进行提示
                !r.target.parentElement.classList.contains("vditor-wysiwyg__preview")) {
                  r.target.getAttribute("data-type") === "link-ref" ? Zt(t, r.target) : Un(r, t);
                  return;
                }
                var a = (0, s.lG)(r.target, "A");
                if (a) {
                  t.options.link.click ? t.options.link.click(a) : t.options.link.isOpen && window.open(a.getAttribute("href")), r.preventDefault();
                  return;
                }
                var o = (0, k.zh)(t);
                if (r.target.isEqualNode(n.element) && n.element.lastElementChild && o.collapsed) {
                  var d = n.element.lastElementChild.getBoundingClientRect();
                  r.y > d.top + d.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(E.g.ZWSP, "") === "" ? (o.selectNodeContents(n.element.lastElementChild), o.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", '<p data-block="0">'.concat(E.g.ZWSP, "<wbr></p>")), (0, k.ib)(n.element, o)));
                }
                qe(t);
                var h = (0, s.fb)(r.target, "vditor-wysiwyg__preview");
                h || (h = (0, s.fb)((0, k.zh)(t).startContainer, "vditor-wysiwyg__preview")), h && et(h, t), lt(r, t);
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l.yl)(r))) {
                  r.key === "Enter" && ye(t), (r.key === "Backspace" || r.key === "Delete") && t.wysiwyg.element.innerHTML !== "" && t.wysiwyg.element.childNodes.length === 1 && t.wysiwyg.element.firstElementChild && t.wysiwyg.element.firstElementChild.tagName === "P" && t.wysiwyg.element.firstElementChild.childElementCount === 0 && (t.wysiwyg.element.textContent === "" || t.wysiwyg.element.textContent === `
`) && (t.wysiwyg.element.innerHTML = "");
                  var i = (0, k.zh)(t);
                  if (r.key === "Backspace" && (0, l.vU)() && i.startContainer.textContent === `
` && i.startOffset === 1 && (i.startContainer.textContent = ""), Ct(t, i), qe(t), !(r.key !== "ArrowDown" && r.key !== "ArrowRight" && r.key !== "Backspace" && r.key !== "ArrowLeft" && r.key !== "ArrowUp")) {
                    (r.key === "ArrowLeft" || r.key === "ArrowRight") && t.hint.render(t);
                    var a = (0, s.fb)(i.startContainer, "vditor-wysiwyg__preview");
                    if (!a && i.startContainer.nodeType !== 3 && i.startOffset > 0) {
                      var o = i.startContainer;
                      o.classList.contains("vditor-wysiwyg__block") && (a = o.lastElementChild);
                    }
                    if (a) {
                      var d = a.previousElementSibling;
                      if (d.style.display === "none") {
                        r.key === "ArrowDown" || r.key === "ArrowRight" ? et(a, t) : et(a, t, !1);
                        return;
                      }
                      var h = a.previousElementSibling;
                      if (h.tagName === "PRE" && (h = h.firstElementChild), r.key === "ArrowDown" || r.key === "ArrowRight") {
                        var o = a.parentElement, u = Pn(o);
                        if (u && u.nodeType !== 3) {
                          var S = u.querySelector(".vditor-wysiwyg__preview");
                          if (S) {
                            et(S, t);
                            return;
                          }
                        }
                        if (u.nodeType === 3) {
                          for (; u.textContent.length === 0 && u.nextSibling; )
                            u = u.nextSibling;
                          i.setStart(u, 1);
                        } else
                          i.setStart(u.firstChild, 0);
                      } else
                        i.selectNodeContents(h), i.collapse(!1);
                    }
                  }
                }
              });
            }, e;
          }()
        ), mi = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), gi = (
          /** @class */
          function(e) {
            mi(t, e);
            function t(n, r) {
              var i = e.call(this) || this;
              if (i.version = E.H, typeof n == "string") {
                if (r ? r.cache ? r.cache.id || (r.cache.id = "vditor".concat(n)) : r.cache = { id: "vditor".concat(n) } : r = {
                  cache: {
                    id: "vditor".concat(n)
                  }
                }, !document.getElementById(n))
                  return i.showErrorTip("Failed to get element by id: ".concat(n)), i;
                n = document.getElementById(n);
              }
              var a = new pi(r), o = a.merge();
              if (o.i18n)
                window.VditorI18n = o.i18n, i.init(n, o);
              else if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(o.lang)) {
                var d = "vditorI18nScript", h = d + o.lang;
                document.querySelectorAll('head script[id^="'.concat(d, '"]')).forEach(function(u) {
                  u.id !== h && document.head.removeChild(u);
                }), (0, _.G)("".concat(o.cdn, "/dist/js/i18n/").concat(o.lang, ".js"), h).then(function() {
                  i.init(n, o);
                }).catch(function(u) {
                  i.showErrorTip("GET ".concat(o.cdn, "/dist/js/i18n/").concat(o.lang, ".js net::ERR_ABORTED 404 (Not Found)"));
                });
              } else
                throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
              return i;
            }
            return t.prototype.showErrorTip = function(n) {
              var r = new Ln();
              document.body.appendChild(r.element), r.show(n, 0);
            }, t.prototype.updateToolbarConfig = function(n) {
              this.vditor.toolbar.updateConfig(this.vditor, n);
            }, t.prototype.setTheme = function(n, r, i, a) {
              this.vditor.options.theme = n, de(this.vditor), r && (this.vditor.options.preview.theme.current = r, (0, X.Z)(r, a || this.vditor.options.preview.theme.path)), i && (this.vditor.options.preview.hljs.style = i, (0, Mn.Y)(i, this.vditor.options.cdn));
            }, t.prototype.getValue = function() {
              return x(this.vditor);
            }, t.prototype.getCurrentMode = function() {
              return this.vditor.currentMode;
            }, t.prototype.focus = function() {
              this.vditor.currentMode === "sv" ? this.vditor.sv.element.focus() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.focus() : this.vditor.currentMode === "ir" && this.vditor.ir.element.focus();
            }, t.prototype.blur = function() {
              this.vditor.currentMode === "sv" ? this.vditor.sv.element.blur() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.blur() : this.vditor.currentMode === "ir" && this.vditor.ir.element.blur();
            }, t.prototype.disabled = function() {
              b(this.vditor, ["subToolbar", "hint", "popover"]), f(this.vditor.toolbar.elements, E.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "false");
            }, t.prototype.enable = function() {
              m(this.vditor.toolbar.elements, E.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor.undo.resetIcon(this.vditor), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
            }, t.prototype.getSelection = function() {
              if (this.vditor.currentMode === "wysiwyg")
                return nt(this.vditor.wysiwyg.element);
              if (this.vditor.currentMode === "sv")
                return nt(this.vditor.sv.element);
              if (this.vditor.currentMode === "ir")
                return nt(this.vditor.ir.element);
            }, t.prototype.renderPreview = function(n) {
              this.vditor.preview.render(this.vditor, n);
            }, t.prototype.getCursorPosition = function() {
              return (0, k.Ny)(this.vditor[this.vditor.currentMode].element);
            }, t.prototype.isUploading = function() {
              return this.vditor.upload.isUploading;
            }, t.prototype.clearCache = function() {
              this.vditor.options.cache.enable && (0, l.pK)() && localStorage.removeItem(this.vditor.options.cache.id);
            }, t.prototype.disabledCache = function() {
              this.vditor.options.cache.enable = !1;
            }, t.prototype.enableCache = function() {
              if (!this.vditor.options.cache.id)
                throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
              this.vditor.options.cache.enable = !0;
            }, t.prototype.html2md = function(n) {
              return this.vditor.lute.HTML2Md(n);
            }, t.prototype.exportJSON = function(n) {
              return this.vditor.lute.RenderJSON(n);
            }, t.prototype.getHTML = function() {
              return Sn(this.vditor);
            }, t.prototype.tip = function(n, r) {
              this.vditor.tip.show(n, r);
            }, t.prototype.setPreviewMode = function(n) {
              Bt(n, this.vditor);
            }, t.prototype.deleteValue = function() {
              window.getSelection().isCollapsed || document.execCommand("delete", !1);
            }, t.prototype.updateValue = function(n) {
              document.execCommand("insertHTML", !1, n);
            }, t.prototype.insertValue = function(n, r) {
              r === void 0 && (r = !0);
              var i = (0, k.zh)(this.vditor);
              i.collapse(!0);
              var a = document.createElement("template");
              a.innerHTML = n, i.insertNode(a.content.cloneNode(!0)), i.collapse(!1), this.vditor.currentMode === "sv" ? (this.vditor.sv.preventInput = !0, r && ie(this.vditor)) : this.vditor.currentMode === "wysiwyg" ? r && pt(this.vditor, getSelection().getRangeAt(0)) : this.vditor.currentMode === "ir" && (this.vditor.ir.preventInput = !0, r && Ue(this.vditor, getSelection().getRangeAt(0), !0));
            }, t.prototype.insertMD = function(n) {
              this.vditor.currentMode === "ir" ? (0, k.oC)(this.vditor.lute.Md2VditorIRDOM(n), this.vditor) : this.vditor.currentMode === "wysiwyg" ? (0, k.oC)(this.vditor.lute.Md2VditorDOM(n), this.vditor) : Ot(this.vditor, n), this.vditor.outline.render(this.vditor), $(this.vditor);
            }, t.prototype.setValue = function(n, r) {
              var i = this;
              r === void 0 && (r = !1), this.vditor.currentMode === "sv" ? (this.vditor.sv.element.innerHTML = "<div data-block='0'>".concat(this.vditor.lute.SpinVditorSVDOM(n), "</div>"), Ee(this.vditor, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              })) : this.vditor.currentMode === "wysiwyg" ? Jt(this.vditor, n, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }) : (this.vditor.ir.element.innerHTML = this.vditor.lute.Md2VditorIRDOM(n), this.vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(a) {
                ve(a, i.vditor);
              }), je(this.vditor, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              })), this.vditor.outline.render(this.vditor), n || (b(this.vditor, ["emoji", "headings", "submenu", "hint"]), this.vditor.wysiwyg.popover && (this.vditor.wysiwyg.popover.style.display = "none"), this.clearCache()), r && this.clearStack();
            }, t.prototype.clearStack = function() {
              this.vditor.undo.clearStack(this.vditor), this.vditor.undo.addToUndoStack(this.vditor);
            }, t.prototype.destroy = function() {
              this.vditor.element.innerHTML = this.vditor.originalInnerHTML, this.vditor.element.classList.remove("vditor"), this.vditor.element.removeAttribute("style");
              var n = document.getElementById("vditorIconScript");
              n && n.remove(), this.clearCache(), zt(), this.vditor.wysiwyg.unbindListener();
            }, t.prototype.getCommentIds = function() {
              return this.vditor.currentMode !== "wysiwyg" ? [] : this.vditor.wysiwyg.getComments(this.vditor, !0);
            }, t.prototype.hlCommentIds = function(n) {
              if (this.vditor.currentMode === "wysiwyg") {
                var r = function(i) {
                  i.classList.remove("vditor-comment--hover"), n.forEach(function(a) {
                    i.getAttribute("data-cmtids").indexOf(a) > -1 && i.classList.add("vditor-comment--hover");
                  });
                };
                this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                }), this.vditor.preview.element.style.display !== "none" && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                });
              }
            }, t.prototype.unHlCommentIds = function(n) {
              if (this.vditor.currentMode === "wysiwyg") {
                var r = function(i) {
                  n.forEach(function(a) {
                    i.getAttribute("data-cmtids").indexOf(a) > -1 && i.classList.remove("vditor-comment--hover");
                  });
                };
                this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                }), this.vditor.preview.element.style.display !== "none" && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                });
              }
            }, t.prototype.removeCommentIds = function(n) {
              var r = this;
              if (this.vditor.currentMode === "wysiwyg") {
                var i = function(a, o) {
                  var d = a.getAttribute("data-cmtids").split(" ");
                  d.find(function(h, u) {
                    if (h === o)
                      return d.splice(u, 1), !0;
                  }), d.length === 0 ? (a.outerHTML = a.innerHTML, (0, k.zh)(r.vditor).collapse(!0)) : a.setAttribute("data-cmtids", d.join(" "));
                };
                n.forEach(function(a) {
                  r.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(o) {
                    i(o, a);
                  }), r.vditor.preview.element.style.display !== "none" && r.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(o) {
                    i(o, a);
                  });
                }), ce(this.vditor, {
                  enableAddUndoStack: !0,
                  enableHint: !1,
                  enableInput: !1
                });
              }
            }, t.prototype.init = function(n, r) {
              var i = this;
              this.vditor = {
                currentMode: r.mode,
                element: n,
                hint: new or(r.hint.extend),
                lute: void 0,
                options: r,
                originalInnerHTML: n.innerHTML,
                outline: new cr(window.VditorI18n.outline),
                tip: new Ln()
              }, this.vditor.sv = new pr(this.vditor), this.vditor.undo = new fi(), this.vditor.wysiwyg = new hi(this.vditor), this.vditor.ir = new sr(this.vditor), this.vditor.toolbar = new ci(this.vditor), r.resize.enable && (this.vditor.resize = new dr(this.vditor)), this.vditor.toolbar.elements.devtools && (this.vditor.devtools = new c()), (r.upload.url || r.upload.handler) && (this.vditor.upload = new Jn()), (0, _.G)(r._lutePath || "".concat(r.cdn, "/dist/js/lute/lute.min.js"), "vditorLuteScript").then(function() {
                i.vditor.lute = (0, lr.X)({
                  autoSpace: i.vditor.options.preview.markdown.autoSpace,
                  gfmAutoLink: i.vditor.options.preview.markdown.gfmAutoLink,
                  codeBlockPreview: i.vditor.options.preview.markdown.codeBlockPreview,
                  emojiSite: i.vditor.options.hint.emojiPath,
                  emojis: i.vditor.options.hint.emoji,
                  fixTermTypo: i.vditor.options.preview.markdown.fixTermTypo,
                  footnotes: i.vditor.options.preview.markdown.footnotes,
                  headingAnchor: !1,
                  inlineMathDigit: i.vditor.options.preview.math.inlineDigit,
                  linkBase: i.vditor.options.preview.markdown.linkBase,
                  linkPrefix: i.vditor.options.preview.markdown.linkPrefix,
                  listStyle: i.vditor.options.preview.markdown.listStyle,
                  mark: i.vditor.options.preview.markdown.mark,
                  mathBlockPreview: i.vditor.options.preview.markdown.mathBlockPreview,
                  paragraphBeginningSpace: i.vditor.options.preview.markdown.paragraphBeginningSpace,
                  sanitize: i.vditor.options.preview.markdown.sanitize,
                  toc: i.vditor.options.preview.markdown.toc
                }), i.vditor.preview = new fr(i.vditor), Ae(i.vditor), r.after && r.after(), r.icon && (0, _.J)("".concat(r.cdn, "/dist/js/icons/").concat(r.icon, ".js"), "vditorIconScript");
              });
            }, t;
          }(J.default)
        );
        const yi = gi;
      })(), st = st.default, st;
    })()
  ));
})(Dn);
var vi = Dn.exports;
const Ci = /* @__PURE__ */ wi(vi);
export {
  Ci as V
};
