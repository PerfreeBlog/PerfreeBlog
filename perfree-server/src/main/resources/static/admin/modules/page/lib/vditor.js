import { c as yi, g as bi } from "./js-pinyin.js";
var Hn = { exports: {} };
/*!
 * Vditor v3.10.6 - A markdown editor written in TypeScript.
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
(function(Dn, vi) {
  (function(vt, ee) {
    Dn.exports = ee();
  })(yi, () => (
    /******/
    (() => {
      var Ut = {
        /***/
        85: (
          /***/
          (J) => {
            var v = function() {
              this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = 0.5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = 0.5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
            }, L = -1, H = 1, k = 0;
            v.Diff = function(c, l) {
              return [c, l];
            }, v.prototype.diff_main = function(c, l, g, p) {
              typeof p > "u" && (this.Diff_Timeout <= 0 ? p = Number.MAX_VALUE : p = (/* @__PURE__ */ new Date()).getTime() + this.Diff_Timeout * 1e3);
              var m = p;
              if (c == null || l == null)
                throw new Error("Null input. (diff_main)");
              if (c == l)
                return c ? [new v.Diff(k, c)] : [];
              typeof g > "u" && (g = !0);
              var f = g, w = this.diff_commonPrefix(c, l), y = c.substring(0, w);
              c = c.substring(w), l = l.substring(w), w = this.diff_commonSuffix(c, l);
              var S = c.substring(c.length - w);
              c = c.substring(0, c.length - w), l = l.substring(0, l.length - w);
              var b = this.diff_compute_(c, l, f, m);
              return y && b.unshift(new v.Diff(k, y)), S && b.push(new v.Diff(k, S)), this.diff_cleanupMerge(b), b;
            }, v.prototype.diff_compute_ = function(c, l, g, p) {
              var m;
              if (!c)
                return [new v.Diff(H, l)];
              if (!l)
                return [new v.Diff(L, c)];
              var f = c.length > l.length ? c : l, w = c.length > l.length ? l : c, y = f.indexOf(w);
              if (y != -1)
                return m = [new v.Diff(H, f.substring(0, y)), new v.Diff(k, w), new v.Diff(H, f.substring(y + w.length))], c.length > l.length && (m[0][0] = m[2][0] = L), m;
              if (w.length == 1)
                return [new v.Diff(L, c), new v.Diff(H, l)];
              var S = this.diff_halfMatch_(c, l);
              if (S) {
                var b = S[0], s = S[1], C = S[2], A = S[3], x = S[4], T = this.diff_main(b, C, g, p), I = this.diff_main(s, A, g, p);
                return T.concat([new v.Diff(k, x)], I);
              }
              return g && c.length > 100 && l.length > 100 ? this.diff_lineMode_(c, l, p) : this.diff_bisect_(c, l, p);
            }, v.prototype.diff_lineMode_ = function(c, l, g) {
              var p = this.diff_linesToChars_(c, l);
              c = p.chars1, l = p.chars2;
              var m = p.lineArray, f = this.diff_main(c, l, !1, g);
              this.diff_charsToLines_(f, m), this.diff_cleanupSemantic(f), f.push(new v.Diff(k, ""));
              for (var w = 0, y = 0, S = 0, b = "", s = ""; w < f.length; ) {
                switch (f[w][0]) {
                  case H:
                    S++, s += f[w][1];
                    break;
                  case L:
                    y++, b += f[w][1];
                    break;
                  case k:
                    if (y >= 1 && S >= 1) {
                      f.splice(w - y - S, y + S), w = w - y - S;
                      for (var C = this.diff_main(b, s, !1, g), A = C.length - 1; A >= 0; A--)
                        f.splice(w, 0, C[A]);
                      w = w + C.length;
                    }
                    S = 0, y = 0, b = "", s = "";
                    break;
                }
                w++;
              }
              return f.pop(), f;
            }, v.prototype.diff_bisect_ = function(c, l, g) {
              for (var p = c.length, m = l.length, f = Math.ceil((p + m) / 2), w = f, y = 2 * f, S = new Array(y), b = new Array(y), s = 0; s < y; s++)
                S[s] = -1, b[s] = -1;
              S[w + 1] = 0, b[w + 1] = 0;
              for (var C = p - m, A = C % 2 != 0, x = 0, T = 0, I = 0, V = 0, z = 0; z < f && !((/* @__PURE__ */ new Date()).getTime() > g); z++) {
                for (var Q = -z + x; Q <= z - T; Q += 2) {
                  var ne = w + Q, se;
                  Q == -z || Q != z && S[ne - 1] < S[ne + 1] ? se = S[ne + 1] : se = S[ne - 1] + 1;
                  for (var ge = se - Q; se < p && ge < m && c.charAt(se) == l.charAt(ge); )
                    se++, ge++;
                  if (S[ne] = se, se > p)
                    T += 2;
                  else if (ge > m)
                    x += 2;
                  else if (A) {
                    var de = w + C - Q;
                    if (de >= 0 && de < y && b[de] != -1) {
                      var ce = p - b[de];
                      if (se >= ce)
                        return this.diff_bisectSplit_(c, l, se, ge, g);
                    }
                  }
                }
                for (var ve = -z + I; ve <= z - V; ve += 2) {
                  var de = w + ve, ce;
                  ve == -z || ve != z && b[de - 1] < b[de + 1] ? ce = b[de + 1] : ce = b[de - 1] + 1;
                  for (var ie = ce - ve; ce < p && ie < m && c.charAt(p - ce - 1) == l.charAt(m - ie - 1); )
                    ce++, ie++;
                  if (b[de] = ce, ce > p)
                    V += 2;
                  else if (ie > m)
                    I += 2;
                  else if (!A) {
                    var ne = w + C - ve;
                    if (ne >= 0 && ne < y && S[ne] != -1) {
                      var se = S[ne], ge = w + se - ne;
                      if (ce = p - ce, se >= ce)
                        return this.diff_bisectSplit_(c, l, se, ge, g);
                    }
                  }
                }
              }
              return [new v.Diff(L, c), new v.Diff(H, l)];
            }, v.prototype.diff_bisectSplit_ = function(c, l, g, p, m) {
              var f = c.substring(0, g), w = l.substring(0, p), y = c.substring(g), S = l.substring(p), b = this.diff_main(f, w, !1, m), s = this.diff_main(y, S, !1, m);
              return b.concat(s);
            }, v.prototype.diff_linesToChars_ = function(c, l) {
              var g = [], p = {};
              g[0] = "";
              function m(S) {
                for (var b = "", s = 0, C = -1, A = g.length; C < S.length - 1; ) {
                  C = S.indexOf(`
`, s), C == -1 && (C = S.length - 1);
                  var x = S.substring(s, C + 1);
                  (p.hasOwnProperty ? p.hasOwnProperty(x) : p[x] !== void 0) ? b += String.fromCharCode(p[x]) : (A == f && (x = S.substring(s), C = S.length), b += String.fromCharCode(A), p[x] = A, g[A++] = x), s = C + 1;
                }
                return b;
              }
              var f = 4e4, w = m(c);
              f = 65535;
              var y = m(l);
              return {
                chars1: w,
                chars2: y,
                lineArray: g
              };
            }, v.prototype.diff_charsToLines_ = function(c, l) {
              for (var g = 0; g < c.length; g++) {
                for (var p = c[g][1], m = [], f = 0; f < p.length; f++)
                  m[f] = l[p.charCodeAt(f)];
                c[g][1] = m.join("");
              }
            }, v.prototype.diff_commonPrefix = function(c, l) {
              if (!c || !l || c.charAt(0) != l.charAt(0))
                return 0;
              for (var g = 0, p = Math.min(c.length, l.length), m = p, f = 0; g < m; )
                c.substring(f, m) == l.substring(f, m) ? (g = m, f = g) : p = m, m = Math.floor((p - g) / 2 + g);
              return m;
            }, v.prototype.diff_commonSuffix = function(c, l) {
              if (!c || !l || c.charAt(c.length - 1) != l.charAt(l.length - 1))
                return 0;
              for (var g = 0, p = Math.min(c.length, l.length), m = p, f = 0; g < m; )
                c.substring(c.length - m, c.length - f) == l.substring(l.length - m, l.length - f) ? (g = m, f = g) : p = m, m = Math.floor((p - g) / 2 + g);
              return m;
            }, v.prototype.diff_commonOverlap_ = function(c, l) {
              var g = c.length, p = l.length;
              if (g == 0 || p == 0)
                return 0;
              g > p ? c = c.substring(g - p) : g < p && (l = l.substring(0, g));
              var m = Math.min(g, p);
              if (c == l)
                return m;
              for (var f = 0, w = 1; ; ) {
                var y = c.substring(m - w), S = l.indexOf(y);
                if (S == -1)
                  return f;
                w += S, (S == 0 || c.substring(m - w) == l.substring(0, w)) && (f = w, w++);
              }
            }, v.prototype.diff_halfMatch_ = function(c, l) {
              if (this.Diff_Timeout <= 0)
                return null;
              var g = c.length > l.length ? c : l, p = c.length > l.length ? l : c;
              if (g.length < 4 || p.length * 2 < g.length)
                return null;
              var m = this;
              function f(T, I, V) {
                for (var z = T.substring(V, V + Math.floor(T.length / 4)), Q = -1, ne = "", se, ge, de, ce; (Q = I.indexOf(z, Q + 1)) != -1; ) {
                  var ve = m.diff_commonPrefix(T.substring(V), I.substring(Q)), ie = m.diff_commonSuffix(T.substring(0, V), I.substring(0, Q));
                  ne.length < ie + ve && (ne = I.substring(Q - ie, Q) + I.substring(Q, Q + ve), se = T.substring(0, V - ie), ge = T.substring(V + ve), de = I.substring(0, Q - ie), ce = I.substring(Q + ve));
                }
                return ne.length * 2 >= T.length ? [se, ge, de, ce, ne] : null;
              }
              var w = f(g, p, Math.ceil(g.length / 4)), y = f(g, p, Math.ceil(g.length / 2)), S;
              if (!w && !y)
                return null;
              y ? w ? S = w[4].length > y[4].length ? w : y : S = y : S = w;
              var b, s, C, A;
              c.length > l.length ? (b = S[0], s = S[1], C = S[2], A = S[3]) : (C = S[0], A = S[1], b = S[2], s = S[3]);
              var x = S[4];
              return [b, s, C, A, x];
            }, v.prototype.diff_cleanupSemantic = function(c) {
              for (var l = !1, g = [], p = 0, m = null, f = 0, w = 0, y = 0, S = 0, b = 0; f < c.length; )
                c[f][0] == k ? (g[p++] = f, w = S, y = b, S = 0, b = 0, m = c[f][1]) : (c[f][0] == H ? S += c[f][1].length : b += c[f][1].length, m && m.length <= Math.max(w, y) && m.length <= Math.max(S, b) && (c.splice(g[p - 1], 0, new v.Diff(L, m)), c[g[p - 1] + 1][0] = H, p--, p--, f = p > 0 ? g[p - 1] : -1, w = 0, y = 0, S = 0, b = 0, m = null, l = !0)), f++;
              for (l && this.diff_cleanupMerge(c), this.diff_cleanupSemanticLossless(c), f = 1; f < c.length; ) {
                if (c[f - 1][0] == L && c[f][0] == H) {
                  var s = c[f - 1][1], C = c[f][1], A = this.diff_commonOverlap_(s, C), x = this.diff_commonOverlap_(C, s);
                  A >= x ? (A >= s.length / 2 || A >= C.length / 2) && (c.splice(f, 0, new v.Diff(k, C.substring(0, A))), c[f - 1][1] = s.substring(0, s.length - A), c[f + 1][1] = C.substring(A), f++) : (x >= s.length / 2 || x >= C.length / 2) && (c.splice(f, 0, new v.Diff(k, s.substring(0, x))), c[f - 1][0] = H, c[f - 1][1] = C.substring(0, C.length - x), c[f + 1][0] = L, c[f + 1][1] = s.substring(x), f++), f++;
                }
                f++;
              }
            }, v.prototype.diff_cleanupSemanticLossless = function(c) {
              function l(x, T) {
                if (!x || !T)
                  return 6;
                var I = x.charAt(x.length - 1), V = T.charAt(0), z = I.match(v.nonAlphaNumericRegex_), Q = V.match(v.nonAlphaNumericRegex_), ne = z && I.match(v.whitespaceRegex_), se = Q && V.match(v.whitespaceRegex_), ge = ne && I.match(v.linebreakRegex_), de = se && V.match(v.linebreakRegex_), ce = ge && x.match(v.blanklineEndRegex_), ve = de && T.match(v.blanklineStartRegex_);
                return ce || ve ? 5 : ge || de ? 4 : z && !ne && se ? 3 : ne || se ? 2 : z || Q ? 1 : 0;
              }
              for (var g = 1; g < c.length - 1; ) {
                if (c[g - 1][0] == k && c[g + 1][0] == k) {
                  var p = c[g - 1][1], m = c[g][1], f = c[g + 1][1], w = this.diff_commonSuffix(p, m);
                  if (w) {
                    var y = m.substring(m.length - w);
                    p = p.substring(0, p.length - w), m = y + m.substring(0, m.length - w), f = y + f;
                  }
                  for (var S = p, b = m, s = f, C = l(p, m) + l(m, f); m.charAt(0) === f.charAt(0); ) {
                    p += m.charAt(0), m = m.substring(1) + f.charAt(0), f = f.substring(1);
                    var A = l(p, m) + l(m, f);
                    A >= C && (C = A, S = p, b = m, s = f);
                  }
                  c[g - 1][1] != S && (S ? c[g - 1][1] = S : (c.splice(g - 1, 1), g--), c[g][1] = b, s ? c[g + 1][1] = s : (c.splice(g + 1, 1), g--));
                }
                g++;
              }
            }, v.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, v.whitespaceRegex_ = /\s/, v.linebreakRegex_ = /[\r\n]/, v.blanklineEndRegex_ = /\n\r?\n$/, v.blanklineStartRegex_ = /^\r?\n\r?\n/, v.prototype.diff_cleanupEfficiency = function(c) {
              for (var l = !1, g = [], p = 0, m = null, f = 0, w = !1, y = !1, S = !1, b = !1; f < c.length; )
                c[f][0] == k ? (c[f][1].length < this.Diff_EditCost && (S || b) ? (g[p++] = f, w = S, y = b, m = c[f][1]) : (p = 0, m = null), S = b = !1) : (c[f][0] == L ? b = !0 : S = !0, m && (w && y && S && b || m.length < this.Diff_EditCost / 2 && w + y + S + b == 3) && (c.splice(g[p - 1], 0, new v.Diff(L, m)), c[g[p - 1] + 1][0] = H, p--, m = null, w && y ? (S = b = !0, p = 0) : (p--, f = p > 0 ? g[p - 1] : -1, S = b = !1), l = !0)), f++;
              l && this.diff_cleanupMerge(c);
            }, v.prototype.diff_cleanupMerge = function(c) {
              c.push(new v.Diff(k, ""));
              for (var l = 0, g = 0, p = 0, m = "", f = "", w; l < c.length; )
                switch (c[l][0]) {
                  case H:
                    p++, f += c[l][1], l++;
                    break;
                  case L:
                    g++, m += c[l][1], l++;
                    break;
                  case k:
                    g + p > 1 ? (g !== 0 && p !== 0 && (w = this.diff_commonPrefix(f, m), w !== 0 && (l - g - p > 0 && c[l - g - p - 1][0] == k ? c[l - g - p - 1][1] += f.substring(0, w) : (c.splice(0, 0, new v.Diff(k, f.substring(0, w))), l++), f = f.substring(w), m = m.substring(w)), w = this.diff_commonSuffix(f, m), w !== 0 && (c[l][1] = f.substring(f.length - w) + c[l][1], f = f.substring(0, f.length - w), m = m.substring(0, m.length - w))), l -= g + p, c.splice(l, g + p), m.length && (c.splice(l, 0, new v.Diff(L, m)), l++), f.length && (c.splice(l, 0, new v.Diff(H, f)), l++), l++) : l !== 0 && c[l - 1][0] == k ? (c[l - 1][1] += c[l][1], c.splice(l, 1)) : l++, p = 0, g = 0, m = "", f = "";
                    break;
                }
              c[c.length - 1][1] === "" && c.pop();
              var y = !1;
              for (l = 1; l < c.length - 1; )
                c[l - 1][0] == k && c[l + 1][0] == k && (c[l][1].substring(c[l][1].length - c[l - 1][1].length) == c[l - 1][1] ? (c[l][1] = c[l - 1][1] + c[l][1].substring(0, c[l][1].length - c[l - 1][1].length), c[l + 1][1] = c[l - 1][1] + c[l + 1][1], c.splice(l - 1, 1), y = !0) : c[l][1].substring(0, c[l + 1][1].length) == c[l + 1][1] && (c[l - 1][1] += c[l + 1][1], c[l][1] = c[l][1].substring(c[l + 1][1].length) + c[l + 1][1], c.splice(l + 1, 1), y = !0)), l++;
              y && this.diff_cleanupMerge(c);
            }, v.prototype.diff_xIndex = function(c, l) {
              var g = 0, p = 0, m = 0, f = 0, w;
              for (w = 0; w < c.length && (c[w][0] !== H && (g += c[w][1].length), c[w][0] !== L && (p += c[w][1].length), !(g > l)); w++)
                m = g, f = p;
              return c.length != w && c[w][0] === L ? f : f + (l - m);
            }, v.prototype.diff_prettyHtml = function(c) {
              for (var l = [], g = /&/g, p = /</g, m = />/g, f = /\n/g, w = 0; w < c.length; w++) {
                var y = c[w][0], S = c[w][1], b = S.replace(g, "&amp;").replace(p, "&lt;").replace(m, "&gt;").replace(f, "&para;<br>");
                switch (y) {
                  case H:
                    l[w] = '<ins style="background:#e6ffe6;">' + b + "</ins>";
                    break;
                  case L:
                    l[w] = '<del style="background:#ffe6e6;">' + b + "</del>";
                    break;
                  case k:
                    l[w] = "<span>" + b + "</span>";
                    break;
                }
              }
              return l.join("");
            }, v.prototype.diff_text1 = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                c[g][0] !== H && (l[g] = c[g][1]);
              return l.join("");
            }, v.prototype.diff_text2 = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                c[g][0] !== L && (l[g] = c[g][1]);
              return l.join("");
            }, v.prototype.diff_levenshtein = function(c) {
              for (var l = 0, g = 0, p = 0, m = 0; m < c.length; m++) {
                var f = c[m][0], w = c[m][1];
                switch (f) {
                  case H:
                    g += w.length;
                    break;
                  case L:
                    p += w.length;
                    break;
                  case k:
                    l += Math.max(g, p), g = 0, p = 0;
                    break;
                }
              }
              return l += Math.max(g, p), l;
            }, v.prototype.diff_toDelta = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                switch (c[g][0]) {
                  case H:
                    l[g] = "+" + encodeURI(c[g][1]);
                    break;
                  case L:
                    l[g] = "-" + c[g][1].length;
                    break;
                  case k:
                    l[g] = "=" + c[g][1].length;
                    break;
                }
              return l.join("	").replace(/%20/g, " ");
            }, v.prototype.diff_fromDelta = function(c, l) {
              for (var g = [], p = 0, m = 0, f = l.split(/\t/g), w = 0; w < f.length; w++) {
                var y = f[w].substring(1);
                switch (f[w].charAt(0)) {
                  case "+":
                    try {
                      g[p++] = new v.Diff(H, decodeURI(y));
                    } catch {
                      throw new Error("Illegal escape in diff_fromDelta: " + y);
                    }
                    break;
                  case "-":
                  case "=":
                    var S = parseInt(y, 10);
                    if (isNaN(S) || S < 0)
                      throw new Error("Invalid number in diff_fromDelta: " + y);
                    var b = c.substring(m, m += S);
                    f[w].charAt(0) == "=" ? g[p++] = new v.Diff(k, b) : g[p++] = new v.Diff(L, b);
                    break;
                  default:
                    if (f[w])
                      throw new Error("Invalid diff operation in diff_fromDelta: " + f[w]);
                }
              }
              if (m != c.length)
                throw new Error("Delta length (" + m + ") does not equal source text length (" + c.length + ").");
              return g;
            }, v.prototype.match_main = function(c, l, g) {
              if (c == null || l == null || g == null)
                throw new Error("Null input. (match_main)");
              return g = Math.max(0, Math.min(g, c.length)), c == l ? 0 : c.length ? c.substring(g, g + l.length) == l ? g : this.match_bitap_(c, l, g) : -1;
            }, v.prototype.match_bitap_ = function(c, l, g) {
              if (l.length > this.Match_MaxBits)
                throw new Error("Pattern too long for this browser.");
              var p = this.match_alphabet_(l), m = this;
              function f(se, ge) {
                var de = se / l.length, ce = Math.abs(g - ge);
                return m.Match_Distance ? de + ce / m.Match_Distance : ce ? 1 : de;
              }
              var w = this.Match_Threshold, y = c.indexOf(l, g);
              y != -1 && (w = Math.min(f(0, y), w), y = c.lastIndexOf(l, g + l.length), y != -1 && (w = Math.min(f(0, y), w)));
              var S = 1 << l.length - 1;
              y = -1;
              for (var b, s, C = l.length + c.length, A, x = 0; x < l.length; x++) {
                for (b = 0, s = C; b < s; )
                  f(x, g + s) <= w ? b = s : C = s, s = Math.floor((C - b) / 2 + b);
                C = s;
                var T = Math.max(1, g - s + 1), I = Math.min(g + s, c.length) + l.length, V = Array(I + 2);
                V[I + 1] = (1 << x) - 1;
                for (var z = I; z >= T; z--) {
                  var Q = p[c.charAt(z - 1)];
                  if (x === 0 ? V[z] = (V[z + 1] << 1 | 1) & Q : V[z] = (V[z + 1] << 1 | 1) & Q | ((A[z + 1] | A[z]) << 1 | 1) | A[z + 1], V[z] & S) {
                    var ne = f(x, z - 1);
                    if (ne <= w)
                      if (w = ne, y = z - 1, y > g)
                        T = Math.max(1, 2 * g - y);
                      else
                        break;
                  }
                }
                if (f(x + 1, g) > w)
                  break;
                A = V;
              }
              return y;
            }, v.prototype.match_alphabet_ = function(c) {
              for (var l = {}, g = 0; g < c.length; g++)
                l[c.charAt(g)] = 0;
              for (var g = 0; g < c.length; g++)
                l[c.charAt(g)] |= 1 << c.length - g - 1;
              return l;
            }, v.prototype.patch_addContext_ = function(c, l) {
              if (l.length != 0) {
                if (c.start2 === null)
                  throw Error("patch not initialized");
                for (var g = l.substring(c.start2, c.start2 + c.length1), p = 0; l.indexOf(g) != l.lastIndexOf(g) && g.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; )
                  p += this.Patch_Margin, g = l.substring(c.start2 - p, c.start2 + c.length1 + p);
                p += this.Patch_Margin;
                var m = l.substring(c.start2 - p, c.start2);
                m && c.diffs.unshift(new v.Diff(k, m));
                var f = l.substring(c.start2 + c.length1, c.start2 + c.length1 + p);
                f && c.diffs.push(new v.Diff(k, f)), c.start1 -= m.length, c.start2 -= m.length, c.length1 += m.length + f.length, c.length2 += m.length + f.length;
              }
            }, v.prototype.patch_make = function(c, l, g) {
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
              for (var f = [], w = new v.patch_obj(), y = 0, S = 0, b = 0, s = p, C = p, A = 0; A < m.length; A++) {
                var x = m[A][0], T = m[A][1];
                switch (!y && x !== k && (w.start1 = S, w.start2 = b), x) {
                  case H:
                    w.diffs[y++] = m[A], w.length2 += T.length, C = C.substring(0, b) + T + C.substring(b);
                    break;
                  case L:
                    w.length1 += T.length, w.diffs[y++] = m[A], C = C.substring(0, b) + C.substring(b + T.length);
                    break;
                  case k:
                    T.length <= 2 * this.Patch_Margin && y && m.length != A + 1 ? (w.diffs[y++] = m[A], w.length1 += T.length, w.length2 += T.length) : T.length >= 2 * this.Patch_Margin && y && (this.patch_addContext_(w, s), f.push(w), w = new v.patch_obj(), y = 0, s = C, S = b);
                    break;
                }
                x !== H && (S += T.length), x !== L && (b += T.length);
              }
              return y && (this.patch_addContext_(w, s), f.push(w)), f;
            }, v.prototype.patch_deepCopy = function(c) {
              for (var l = [], g = 0; g < c.length; g++) {
                var p = c[g], m = new v.patch_obj();
                m.diffs = [];
                for (var f = 0; f < p.diffs.length; f++)
                  m.diffs[f] = new v.Diff(p.diffs[f][0], p.diffs[f][1]);
                m.start1 = p.start1, m.start2 = p.start2, m.length1 = p.length1, m.length2 = p.length2, l[g] = m;
              }
              return l;
            }, v.prototype.patch_apply = function(c, l) {
              if (c.length == 0)
                return [l, []];
              c = this.patch_deepCopy(c);
              var g = this.patch_addPadding(c);
              l = g + l + g, this.patch_splitMax(c);
              for (var p = 0, m = [], f = 0; f < c.length; f++) {
                var w = c[f].start2 + p, y = this.diff_text1(c[f].diffs), S, b = -1;
                if (y.length > this.Match_MaxBits ? (S = this.match_main(l, y.substring(0, this.Match_MaxBits), w), S != -1 && (b = this.match_main(l, y.substring(y.length - this.Match_MaxBits), w + y.length - this.Match_MaxBits), (b == -1 || S >= b) && (S = -1))) : S = this.match_main(l, y, w), S == -1)
                  m[f] = !1, p -= c[f].length2 - c[f].length1;
                else {
                  m[f] = !0, p = S - w;
                  var s;
                  if (b == -1 ? s = l.substring(S, S + y.length) : s = l.substring(S, b + this.Match_MaxBits), y == s)
                    l = l.substring(0, S) + this.diff_text2(c[f].diffs) + l.substring(S + y.length);
                  else {
                    var C = this.diff_main(y, s, !1);
                    if (y.length > this.Match_MaxBits && this.diff_levenshtein(C) / y.length > this.Patch_DeleteThreshold)
                      m[f] = !1;
                    else {
                      this.diff_cleanupSemanticLossless(C);
                      for (var A = 0, x, T = 0; T < c[f].diffs.length; T++) {
                        var I = c[f].diffs[T];
                        I[0] !== k && (x = this.diff_xIndex(C, A)), I[0] === H ? l = l.substring(0, S + x) + I[1] + l.substring(S + x) : I[0] === L && (l = l.substring(0, S + x) + l.substring(S + this.diff_xIndex(C, A + I[1].length))), I[0] !== L && (A += I[1].length);
                      }
                    }
                  }
                }
              }
              return l = l.substring(g.length, l.length - g.length), [l, m];
            }, v.prototype.patch_addPadding = function(c) {
              for (var l = this.Patch_Margin, g = "", p = 1; p <= l; p++)
                g += String.fromCharCode(p);
              for (var p = 0; p < c.length; p++)
                c[p].start1 += l, c[p].start2 += l;
              var m = c[0], f = m.diffs;
              if (f.length == 0 || f[0][0] != k)
                f.unshift(new v.Diff(k, g)), m.start1 -= l, m.start2 -= l, m.length1 += l, m.length2 += l;
              else if (l > f[0][1].length) {
                var w = l - f[0][1].length;
                f[0][1] = g.substring(f[0][1].length) + f[0][1], m.start1 -= w, m.start2 -= w, m.length1 += w, m.length2 += w;
              }
              if (m = c[c.length - 1], f = m.diffs, f.length == 0 || f[f.length - 1][0] != k)
                f.push(new v.Diff(k, g)), m.length1 += l, m.length2 += l;
              else if (l > f[f.length - 1][1].length) {
                var w = l - f[f.length - 1][1].length;
                f[f.length - 1][1] += g.substring(0, w), m.length1 += w, m.length2 += w;
              }
              return g;
            }, v.prototype.patch_splitMax = function(c) {
              for (var l = this.Match_MaxBits, g = 0; g < c.length; g++)
                if (!(c[g].length1 <= l)) {
                  var p = c[g];
                  c.splice(g--, 1);
                  for (var m = p.start1, f = p.start2, w = ""; p.diffs.length !== 0; ) {
                    var y = new v.patch_obj(), S = !0;
                    for (y.start1 = m - w.length, y.start2 = f - w.length, w !== "" && (y.length1 = y.length2 = w.length, y.diffs.push(new v.Diff(k, w))); p.diffs.length !== 0 && y.length1 < l - this.Patch_Margin; ) {
                      var b = p.diffs[0][0], s = p.diffs[0][1];
                      b === H ? (y.length2 += s.length, f += s.length, y.diffs.push(p.diffs.shift()), S = !1) : b === L && y.diffs.length == 1 && y.diffs[0][0] == k && s.length > 2 * l ? (y.length1 += s.length, m += s.length, S = !1, y.diffs.push(new v.Diff(b, s)), p.diffs.shift()) : (s = s.substring(0, l - y.length1 - this.Patch_Margin), y.length1 += s.length, m += s.length, b === k ? (y.length2 += s.length, f += s.length) : S = !1, y.diffs.push(new v.Diff(b, s)), s == p.diffs[0][1] ? p.diffs.shift() : p.diffs[0][1] = p.diffs[0][1].substring(s.length));
                    }
                    w = this.diff_text2(y.diffs), w = w.substring(w.length - this.Patch_Margin);
                    var C = this.diff_text1(p.diffs).substring(0, this.Patch_Margin);
                    C !== "" && (y.length1 += C.length, y.length2 += C.length, y.diffs.length !== 0 && y.diffs[y.diffs.length - 1][0] === k ? y.diffs[y.diffs.length - 1][1] += C : y.diffs.push(new v.Diff(k, C))), S || c.splice(++g, 0, y);
                  }
                }
            }, v.prototype.patch_toText = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                l[g] = c[g];
              return l.join("");
            }, v.prototype.patch_fromText = function(c) {
              var l = [];
              if (!c)
                return l;
              for (var g = c.split(`
`), p = 0, m = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; p < g.length; ) {
                var f = g[p].match(m);
                if (!f)
                  throw new Error("Invalid patch string: " + g[p]);
                var w = new v.patch_obj();
                for (l.push(w), w.start1 = parseInt(f[1], 10), f[2] === "" ? (w.start1--, w.length1 = 1) : f[2] == "0" ? w.length1 = 0 : (w.start1--, w.length1 = parseInt(f[2], 10)), w.start2 = parseInt(f[3], 10), f[4] === "" ? (w.start2--, w.length2 = 1) : f[4] == "0" ? w.length2 = 0 : (w.start2--, w.length2 = parseInt(f[4], 10)), p++; p < g.length; ) {
                  var y = g[p].charAt(0);
                  try {
                    var S = decodeURI(g[p].substring(1));
                  } catch {
                    throw new Error("Illegal escape in patch_fromText: " + S);
                  }
                  if (y == "-")
                    w.diffs.push(new v.Diff(L, S));
                  else if (y == "+")
                    w.diffs.push(new v.Diff(H, S));
                  else if (y == " ")
                    w.diffs.push(new v.Diff(k, S));
                  else {
                    if (y == "@")
                      break;
                    if (y !== "") throw new Error('Invalid patch mode "' + y + '" in: ' + S);
                  }
                  p++;
                }
              }
              return l;
            }, v.patch_obj = function() {
              this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
            }, v.patch_obj.prototype.toString = function() {
              var c, l;
              this.length1 === 0 ? c = this.start1 + ",0" : this.length1 == 1 ? c = this.start1 + 1 : c = this.start1 + 1 + "," + this.length1, this.length2 === 0 ? l = this.start2 + ",0" : this.length2 == 1 ? l = this.start2 + 1 : l = this.start2 + 1 + "," + this.length2;
              for (var g = ["@@ -" + c + " +" + l + ` @@
`], p, m = 0; m < this.diffs.length; m++) {
                switch (this.diffs[m][0]) {
                  case H:
                    p = "+";
                    break;
                  case L:
                    p = "-";
                    break;
                  case k:
                    p = " ";
                    break;
                }
                g[m + 1] = p + encodeURI(this.diffs[m][1]) + `
`;
              }
              return g.join("").replace(/%20/g, " ");
            }, J.exports = v, J.exports.diff_match_patch = v, J.exports.DIFF_DELETE = L, J.exports.DIFF_INSERT = H, J.exports.DIFF_EQUAL = k;
          }
        ),
        /***/
        664: (
          /***/
          (J, v, L) => {
            L.d(v, {
              default: () => (
                /* binding */
                Be
              )
            });
            var H = L(386), k = L(781), c = L(379), l = L(895), g = L(169), p = L(572), m = L(702), f = function(N) {
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
            }, w = L(982), y = L(431), S = L(570), b = L(593), s = L(558), C = L(182), A = L(931), x = L(793), T = L(652), I = L(998), V = L(118), z = L(2), Q = function(N) {
              document.querySelectorAll(".vditor-anchor").forEach(function(re) {
                N === 1 && re.classList.add("vditor-anchor--left"), re.onclick = function() {
                  var U = re.getAttribute("href").substr(1), j = document.getElementById("vditorAnchor-" + U).offsetTop;
                  document.querySelector("html").scrollTop = j;
                };
              }), window.onhashchange = function() {
                var re = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
                re && (document.querySelector("html").scrollTop = re.offsetTop);
              };
            }, ne = L(65), se = L(307), ge = function(N, re) {
              if (re === void 0 && (re = "zh_CN"), !(typeof speechSynthesis > "u" || typeof SpeechSynthesisUtterance > "u")) {
                var U = function() {
                  var Ce = speechSynthesis.getVoices(), X, pe;
                  return Ce.forEach(function(ke) {
                    ke.lang === re.replace("_", "-") && (X = ke), ke.default && (pe = ke);
                  }), X || (X = pe), X;
                }, j = '<svg><use xlink:href="#vditor-icon-play"></use></svg>', he = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
                document.getElementById("vditorIconScript") || (j = '<svg viewBox="0 0 32 32"><path d="M3.436 0l25.128 16-25.128 16v-32z"></path></svg>', he = '<svg viewBox="0 0 32 32"><path d="M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z"></path></svg>');
                var G = document.querySelector(".vditor-speech");
                G || (G = document.createElement("button"), G.className = "vditor-speech", N.insertAdjacentElement("beforeend", G), speechSynthesis.onvoiceschanged !== void 0 && (speechSynthesis.onvoiceschanged = U));
                var ye = U(), ae = new SpeechSynthesisUtterance();
                ae.voice = ye, ae.onend = ae.onerror = function() {
                  G.style.display = "none", speechSynthesis.cancel(), G.classList.remove("vditor-speech--current"), G.innerHTML = j;
                }, N.addEventListener(window.ontouchstart !== void 0 ? "touchend" : "click", function(Ce) {
                  var X = Ce.target;
                  if (X.classList.contains("vditor-speech") || X.parentElement.classList.contains("vditor-speech")) {
                    G.classList.contains("vditor-speech--current") ? speechSynthesis.speaking && (speechSynthesis.paused ? (speechSynthesis.resume(), G.innerHTML = he) : (speechSynthesis.pause(), G.innerHTML = j)) : (ae.text = G.getAttribute("data-text"), speechSynthesis.speak(ae), G.classList.add("vditor-speech--current"), G.innerHTML = he), (0, se.Hc)(window.vditorSpeechRange), N.focus();
                    return;
                  }
                  if (G.style.display = "none", speechSynthesis.cancel(), G.classList.remove("vditor-speech--current"), G.innerHTML = j, getSelection().rangeCount !== 0) {
                    var pe = getSelection().getRangeAt(0), ke = pe.toString().trim();
                    if (ke) {
                      window.vditorSpeechRange = pe.cloneRange();
                      var xe = pe.getBoundingClientRect();
                      G.innerHTML = j, G.style.display = "block", G.style.top = xe.top + xe.height + document.querySelector("html").scrollTop - 20 + "px", window.ontouchstart !== void 0 ? G.style.left = Ce.changedTouches[Ce.changedTouches.length - 1].pageX + 2 + "px" : G.style.left = Ce.clientX + 2 + "px", G.setAttribute("data-text", ke);
                    }
                  }
                });
              }
            }, de = function(N, re, U, j) {
              function he(G) {
                return G instanceof U ? G : new U(function(ye) {
                  ye(G);
                });
              }
              return new (U || (U = Promise))(function(G, ye) {
                function ae(pe) {
                  try {
                    X(j.next(pe));
                  } catch (ke) {
                    ye(ke);
                  }
                }
                function Ce(pe) {
                  try {
                    X(j.throw(pe));
                  } catch (ke) {
                    ye(ke);
                  }
                }
                function X(pe) {
                  pe.done ? G(pe.value) : he(pe.value).then(ae, Ce);
                }
                X((j = j.apply(N, [])).next());
              });
            }, ce = function(N, re) {
              var U = { label: 0, sent: function() {
                if (G[0] & 1) throw G[1];
                return G[1];
              }, trys: [], ops: [] }, j, he, G, ye;
              return ye = { next: ae(0), throw: ae(1), return: ae(2) }, typeof Symbol == "function" && (ye[Symbol.iterator] = function() {
                return this;
              }), ye;
              function ae(X) {
                return function(pe) {
                  return Ce([X, pe]);
                };
              }
              function Ce(X) {
                if (j) throw new TypeError("Generator is already executing.");
                for (; ye && (ye = 0, X[0] && (U = 0)), U; ) try {
                  if (j = 1, he && (G = X[0] & 2 ? he.return : X[0] ? he.throw || ((G = he.return) && G.call(he), 0) : he.next) && !(G = G.call(he, X[1])).done) return G;
                  switch (he = 0, G && (X = [X[0] & 2, G.value]), X[0]) {
                    case 0:
                    case 1:
                      G = X;
                      break;
                    case 4:
                      return U.label++, { value: X[1], done: !1 };
                    case 5:
                      U.label++, he = X[1], X = [0];
                      continue;
                    case 7:
                      X = U.ops.pop(), U.trys.pop();
                      continue;
                    default:
                      if (G = U.trys, !(G = G.length > 0 && G[G.length - 1]) && (X[0] === 6 || X[0] === 2)) {
                        U = 0;
                        continue;
                      }
                      if (X[0] === 3 && (!G || X[1] > G[0] && X[1] < G[3])) {
                        U.label = X[1];
                        break;
                      }
                      if (X[0] === 6 && U.label < G[1]) {
                        U.label = G[1], G = X;
                        break;
                      }
                      if (G && U.label < G[2]) {
                        U.label = G[2], U.ops.push(X);
                        break;
                      }
                      G[2] && U.ops.pop(), U.trys.pop();
                      continue;
                  }
                  X = re.call(N, U);
                } catch (pe) {
                  X = [6, pe], he = 0;
                } finally {
                  j = G = 0;
                }
                if (X[0] & 5) throw X[1];
                return { value: X[0] ? X[1] : void 0, done: !0 };
              }
            }, ve = function(N) {
              var re, U = {
                anchor: 0,
                cdn: x.g.CDN,
                customEmoji: {},
                emojiPath: "".concat(x.g.CDN, "/dist/images/emoji"),
                hljs: x.g.HLJS_OPTIONS,
                icon: "ant",
                lang: "zh_CN",
                markdown: x.g.MARKDOWN_OPTIONS,
                math: x.g.MATH_OPTIONS,
                mode: "light",
                speech: {
                  enable: !1
                },
                render: {
                  media: {
                    enable: !0
                  }
                },
                theme: x.g.THEME_OPTIONS
              };
              return N.cdn && (!((re = N.theme) === null || re === void 0) && re.path || (U.theme.path = "".concat(N.cdn, "/dist/css/content-theme")), N.emojiPath || (U.emojiPath = "".concat(N.cdn, "/dist/images/emoji"))), (0, z.T)(U, N);
            }, ie = function(N, re) {
              var U = ve(re);
              return (0, I.G)("".concat(U.cdn, "/dist/js/lute/lute.min.js"), "vditorLuteScript").then(function() {
                var j = (0, ne.X)({
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
            }, M = function(N, re, U) {
              return de(void 0, void 0, void 0, function() {
                var j, he, G, ye;
                return ce(this, function(ae) {
                  switch (ae.label) {
                    case 0:
                      return j = ve(U), [4, ie(re, j)];
                    case 1:
                      if (he = ae.sent(), j.transform && (he = j.transform(he)), N.innerHTML = he, N.classList.add("vditor-reset"), j.i18n) return [3, 5];
                      if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(j.lang)) return [3, 2];
                      throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
                    case 2:
                      return G = "vditorI18nScript", ye = G + j.lang, document.querySelectorAll('head script[id^="'.concat(G, '"]')).forEach(function(Ce) {
                        Ce.id !== ye && document.head.removeChild(Ce);
                      }), [4, (0, I.G)("".concat(j.cdn, "/dist/js/i18n/").concat(j.lang, ".js"), ye)];
                    case 3:
                      ae.sent(), ae.label = 4;
                    case 4:
                      return [3, 6];
                    case 5:
                      window.VditorI18n = j.i18n, ae.label = 6;
                    case 6:
                      return j.icon ? [4, (0, I.G)("".concat(j.cdn, "/dist/js/icons/").concat(j.icon, ".js"), "vditorIconScript")] : [3, 8];
                    case 7:
                      ae.sent(), ae.label = 8;
                    case 8:
                      return (0, T.Z)(j.theme.current, j.theme.path), j.anchor === 1 && N.classList.add("vditor-reset--anchor"), (0, l.O)(N, j.hljs), (0, m.s)(j.hljs, N, j.cdn), (0, w.H)(N, {
                        cdn: j.cdn,
                        math: j.math
                      }), (0, S.i)(N, j.cdn, j.mode), (0, b.K)(N, j.cdn, j.mode), (0, g.P)(N, j.cdn), (0, p.v)(N, j.cdn), (0, c.p)(N, j.cdn, j.mode), (0, s.P)(N, j.cdn, j.mode), (0, A.B)(N, j.cdn), (0, H.Q)(N, j.cdn), j.render.media.enable && (0, y.Y)(N), j.speech.enable && ge(N), j.anchor !== 0 && Q(j.anchor), j.after && j.after(), j.lazyLoadImage && f(N), N.addEventListener("click", function(Ce) {
                        var X = (0, V.lG)(Ce.target, "SPAN");
                        if (X && (0, V.fb)(X, "vditor-toc")) {
                          var pe = N.querySelector("#" + X.getAttribute("data-target-id"));
                          pe && window.scrollTo(window.scrollX, pe.offsetTop);
                          return;
                        }
                      }), [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, Ne = L(971), ot = L(34), st = (
              /** @class */
              function() {
                function N() {
                }
                return N.adapterRender = k, N.previewImage = Ne.E, N.codeRender = l.O, N.graphvizRender = p.v, N.highlightRender = m.s, N.mathRender = w.H, N.mermaidRender = S.i, N.markmapRender = b.K, N.flowchartRender = g.P, N.chartRender = c.p, N.abcRender = H.Q, N.mindmapRender = s.P, N.plantumlRender = A.B, N.outlineRender = C.k, N.mediaRender = y.Y, N.speechRender = ge, N.lazyLoadImageRender = f, N.md2html = ie, N.preview = M, N.setCodeTheme = ot.Y, N.setContentTheme = T.Z, N;
              }()
            );
            const Be = st;
          }
        ),
        /***/
        793: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              H: () => (
                /* binding */
                H
              ),
              /* harmony export */
              g: () => (
                /* binding */
                k
              )
              /* harmony export */
            });
            var H = "3.10.6", k = (
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
                  "abap",
                  "algol",
                  "algol_nu",
                  "arduino",
                  "autumn",
                  "borland",
                  "bw",
                  "colorful",
                  "dracula",
                  "emacs",
                  "friendly",
                  "fruity",
                  "github",
                  "igor",
                  "lovelace",
                  "manni",
                  "monokai",
                  "monokailight",
                  "murphy",
                  "native",
                  "paraiso-dark",
                  "paraiso-light",
                  "pastie",
                  "perldoc",
                  "pygments",
                  "rainbow_dash",
                  "rrt",
                  "solarized-dark",
                  "solarized-dark256",
                  "solarized-light",
                  "swapoff",
                  "tango",
                  "trac",
                  "vim",
                  "vs",
                  "xcode",
                  "ant-design"
                ], c.CODE_LANGUAGES = [
                  "mermaid",
                  "echarts",
                  "mindmap",
                  "plantuml",
                  "abc",
                  "graphviz",
                  "flowchart",
                  "apache",
                  "js",
                  "ts",
                  "html",
                  "markmap",
                  // common
                  "properties",
                  "apache",
                  "bash",
                  "c",
                  "csharp",
                  "cpp",
                  "css",
                  "coffeescript",
                  "diff",
                  "go",
                  "xml",
                  "http",
                  "json",
                  "java",
                  "javascript",
                  "kotlin",
                  "less",
                  "lua",
                  "makefile",
                  "markdown",
                  "nginx",
                  "objectivec",
                  "php",
                  "php-template",
                  "perl",
                  "plaintext",
                  "python",
                  "python-repl",
                  "r",
                  "ruby",
                  "rust",
                  "scss",
                  "sql",
                  "shell",
                  "swift",
                  "ini",
                  "typescript",
                  "vbnet",
                  "yaml",
                  "ada",
                  "clojure",
                  "dart",
                  "erb",
                  "fortran",
                  "gradle",
                  "haskell",
                  "julia",
                  "julia-repl",
                  "lisp",
                  "matlab",
                  "pgsql",
                  "powershell",
                  "sql_more",
                  "stata",
                  "cmake",
                  "mathematica",
                  // ext
                  "solidity",
                  "yul"
                ], c.CDN = "https://unpkg.com/vditor@".concat("3.10.6"), c.MARKDOWN_OPTIONS = {
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
        386: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              Q: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = function(g, p) {
              g === void 0 && (g = document), p === void 0 && (p = H.g.CDN);
              var m = c.abcRenderAdapter.getElements(g);
              m.length > 0 && (0, k.G)("".concat(p, "/dist/js/abcjs/abcjs_basic.min.js"), "vditorAbcjsScript").then(function() {
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
          (J, v, L) => {
            L.r(v), L.d(v, {
              /* harmony export */
              abcRenderAdapter: () => (
                /* binding */
                p
              ),
              /* harmony export */
              chartRenderAdapter: () => (
                /* binding */
                g
              ),
              /* harmony export */
              flowchartRenderAdapter: () => (
                /* binding */
                f
              ),
              /* harmony export */
              graphvizRenderAdapter: () => (
                /* binding */
                m
              ),
              /* harmony export */
              markmapRenderAdapter: () => (
                /* binding */
                c
              ),
              /* harmony export */
              mathRenderAdapter: () => (
                /* binding */
                H
              ),
              /* harmony export */
              mermaidRenderAdapter: () => (
                /* binding */
                k
              ),
              /* harmony export */
              mindmapRenderAdapter: () => (
                /* binding */
                l
              ),
              /* harmony export */
              plantumlRenderAdapter: () => (
                /* binding */
                w
              )
              /* harmony export */
            });
            var H = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-math");
              }
            }, k = {
              /** 不仅要返回code，并且需要将 code 设置为 el 的 innerHTML */
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-mermaid");
              }
            }, c = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-markmap");
              }
            }, l = {
              getCode: function(y) {
                return y.getAttribute("data-code");
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-mindmap");
              }
            }, g = {
              getCode: function(y) {
                return y.innerText;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-echarts");
              }
            }, p = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-abc");
              }
            }, m = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-graphviz");
              }
            }, f = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-flowchart");
              }
            }, w = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-plantuml");
              }
            };
          }
        ),
        /***/
        379: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              p: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = L(446), g = function(f, w, y, S) {
              function b(s) {
                return s instanceof y ? s : new y(function(C) {
                  C(s);
                });
              }
              return new (y || (y = Promise))(function(s, C) {
                function A(I) {
                  try {
                    T(S.next(I));
                  } catch (V) {
                    C(V);
                  }
                }
                function x(I) {
                  try {
                    T(S.throw(I));
                  } catch (V) {
                    C(V);
                  }
                }
                function T(I) {
                  I.done ? s(I.value) : b(I.value).then(A, x);
                }
                T((S = S.apply(f, [])).next());
              });
            }, p = function(f, w) {
              var y = { label: 0, sent: function() {
                if (s[0] & 1) throw s[1];
                return s[1];
              }, trys: [], ops: [] }, S, b, s, C;
              return C = { next: A(0), throw: A(1), return: A(2) }, typeof Symbol == "function" && (C[Symbol.iterator] = function() {
                return this;
              }), C;
              function A(T) {
                return function(I) {
                  return x([T, I]);
                };
              }
              function x(T) {
                if (S) throw new TypeError("Generator is already executing.");
                for (; C && (C = 0, T[0] && (y = 0)), y; ) try {
                  if (S = 1, b && (s = T[0] & 2 ? b.return : T[0] ? b.throw || ((s = b.return) && s.call(b), 0) : b.next) && !(s = s.call(b, T[1])).done) return s;
                  switch (b = 0, s && (T = [T[0] & 2, s.value]), T[0]) {
                    case 0:
                    case 1:
                      s = T;
                      break;
                    case 4:
                      return y.label++, { value: T[1], done: !1 };
                    case 5:
                      y.label++, b = T[1], T = [0];
                      continue;
                    case 7:
                      T = y.ops.pop(), y.trys.pop();
                      continue;
                    default:
                      if (s = y.trys, !(s = s.length > 0 && s[s.length - 1]) && (T[0] === 6 || T[0] === 2)) {
                        y = 0;
                        continue;
                      }
                      if (T[0] === 3 && (!s || T[1] > s[0] && T[1] < s[3])) {
                        y.label = T[1];
                        break;
                      }
                      if (T[0] === 6 && y.label < s[1]) {
                        y.label = s[1], s = T;
                        break;
                      }
                      if (s && y.label < s[2]) {
                        y.label = s[2], y.ops.push(T);
                        break;
                      }
                      s[2] && y.ops.pop(), y.trys.pop();
                      continue;
                  }
                  T = w.call(f, y);
                } catch (I) {
                  T = [6, I], b = 0;
                } finally {
                  S = s = 0;
                }
                if (T[0] & 5) throw T[1];
                return { value: T[0] ? T[1] : void 0, done: !0 };
              }
            }, m = function(f, w, y) {
              f === void 0 && (f = document), w === void 0 && (w = H.g.CDN);
              var S = c.chartRenderAdapter.getElements(f);
              S.length > 0 && (0, k.G)("".concat(w, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                S.forEach(function(b) {
                  return g(void 0, void 0, void 0, function() {
                    var s, C, A;
                    return p(this, function(x) {
                      switch (x.label) {
                        case 0:
                          if (b.parentElement.classList.contains("vditor-wysiwyg__pre") || b.parentElement.classList.contains("vditor-ir__marker--pre"))
                            return [
                              2
                              /*return*/
                            ];
                          if (s = c.chartRenderAdapter.getCode(b).trim(), !s)
                            return [
                              2
                              /*return*/
                            ];
                          x.label = 1;
                        case 1:
                          return x.trys.push([1, 3, , 4]), b.getAttribute("data-processed") === "true" ? [
                            2
                            /*return*/
                          ] : [4, (0, l.Qf)(s)];
                        case 2:
                          return C = x.sent(), echarts.init(b, y === "dark" ? "dark" : void 0).setOption(C), b.setAttribute("data-processed", "true"), [3, 4];
                        case 3:
                          return A = x.sent(), b.className = "vditor-reset--error", b.innerHTML = "echarts render error: <br>".concat(A), [3, 4];
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              O: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var H = L(528), k = L(793), c = function(l, g) {
              Array.from(l.querySelectorAll("pre > code")).filter(function(p, m) {
                return !(p.parentElement.classList.contains("vditor-wysiwyg__pre") || p.parentElement.classList.contains("vditor-ir__marker--pre") || p.classList.contains("language-mermaid") || p.classList.contains("language-flowchart") || p.classList.contains("language-echarts") || p.classList.contains("language-mindmap") || p.classList.contains("language-plantuml") || p.classList.contains("language-markmap") || p.classList.contains("language-abc") || p.classList.contains("language-graphviz") || p.classList.contains("language-math") || p.style.maxHeight.indexOf("px") > -1 || l.classList.contains("vditor-preview") && m > 5);
              }).forEach(function(p) {
                var m, f, w, y = p.innerText;
                if (p.classList.contains("highlight-chroma")) {
                  var S = p.cloneNode(!0);
                  S.querySelectorAll(".highlight-ln").forEach(function(A) {
                    A.remove();
                  }), y = S.innerText;
                } else y.endsWith(`
`) && (y = y.substr(0, y.length - 1));
                var b = '<svg><use xlink:href="#vditor-icon-copy"></use></svg>';
                document.getElementById("vditorIconScript") || (b = '<svg viewBox="0 0 32 32"><path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path></svg>');
                var s = document.createElement("div");
                s.className = "vditor-copy", s.innerHTML = '<span aria-label="'.concat(((m = window.VditorI18n) === null || m === void 0 ? void 0 : m.copy) || "复制", `"
onmouseover="this.setAttribute('aria-label', '`).concat(((f = window.VditorI18n) === null || f === void 0 ? void 0 : f.copy) || "复制", `')"
class="vditor-tooltipped vditor-tooltipped__w"
onclick="this.previousElementSibling.select();document.execCommand('copy');this.setAttribute('aria-label', '`).concat(((w = window.VditorI18n) === null || w === void 0 ? void 0 : w.copied) || "已复制", `');this.previousElementSibling.blur()">`).concat(b, "</span>");
                var C = document.createElement("textarea");
                C.value = (0, H.X)(y), s.insertAdjacentElement("afterbegin", C), g && g.renderMenu && g.renderMenu(p, s), p.before(s), p.style.maxHeight = window.outerHeight - 40 + "px", p.insertAdjacentHTML("afterend", '<span style="position: absolute">'.concat(k.g.ZWSP, "</span>"));
              });
            };
          }
        ),
        /***/
        169: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              P: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = function(g, p) {
              p === void 0 && (p = H.g.CDN);
              var m = c.flowchartRenderAdapter.getElements(g);
              m.length !== 0 && (0, k.G)("".concat(p, "/dist/js/flowchart.js/flowchart.min.js"), "vditorFlowchartScript").then(function() {
                m.forEach(function(f) {
                  if (f.getAttribute("data-processed") !== "true") {
                    var w = flowchart.parse(c.flowchartRenderAdapter.getCode(f));
                    f.innerHTML = "", w.drawSVG(f), f.setAttribute("data-processed", "true");
                  }
                });
              });
            };
          }
        ),
        /***/
        572: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              v: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = function(g, p) {
              p === void 0 && (p = H.g.CDN);
              var m = c.graphvizRenderAdapter.getElements(g);
              m.length !== 0 && (0, k.G)("".concat(p, "/dist/js/graphviz/viz.js"), "vditorGraphVizScript").then(function() {
                m.forEach(function(f) {
                  var w = c.graphvizRenderAdapter.getCode(f);
                  if (!(f.parentElement.classList.contains("vditor-wysiwyg__pre") || f.parentElement.classList.contains("vditor-ir__marker--pre")) && !(f.getAttribute("data-processed") === "true" || w.trim() === "")) {
                    try {
                      var y = new Blob(["importScripts('".concat(document.getElementById("vditorGraphVizScript").src.replace("viz.js", "full.render.js"), "');")], { type: "application/javascript" }), S = window.URL || window.webkitURL, b = S.createObjectURL(y), s = new Worker(b);
                      new Viz({ worker: s }).renderSVGElement(w).then(function(C) {
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              s: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(296), l = function(g, p, m) {
              p === void 0 && (p = document), m === void 0 && (m = H.g.CDN);
              var f = g.style;
              H.g.CODE_THEME.includes(f) || (f = "github");
              var w = document.getElementById("vditorHljsStyle"), y = "".concat(m, "/dist/js/highlight.js/styles/").concat(f, ".css");
              if (w && w.getAttribute("href") !== y && w.remove(), (0, c.c)("".concat(m, "/dist/js/highlight.js/styles/").concat(f, ".css"), "vditorHljsStyle"), g.enable !== !1) {
                var S = p.querySelectorAll("pre > code");
                S.length !== 0 && (0, k.G)("".concat(m, "/dist/js/highlight.js/highlight.pack.js"), "vditorHljsScript").then(function() {
                  (0, k.G)("".concat(m, "/dist/js/highlight.js/solidity.min.js"), "vditorHljsSolidityScript").then(function() {
                    (0, k.G)("".concat(m, "/dist/js/highlight.js/yul.min.js"), "vditorHljsYulScript").then(function() {
                      p.querySelectorAll("pre > code").forEach(function(b) {
                        if (!(b.parentElement.classList.contains("vditor-ir__marker--pre") || b.parentElement.classList.contains("vditor-wysiwyg__pre")) && !(b.classList.contains("language-mermaid") || b.classList.contains("language-flowchart") || b.classList.contains("language-echarts") || b.classList.contains("language-mindmap") || b.classList.contains("language-plantuml") || b.classList.contains("language-abc") || b.classList.contains("language-graphviz") || b.classList.contains("language-math")) && (g.defaultLang !== "" && b.className.indexOf("language-") === -1 && b.classList.add("language-" + g.defaultLang), hljs.highlightElement(b), !!g.lineNumber)) {
                          b.classList.add("vditor-linenumber");
                          var s = b.querySelector(".vditor-linenumber__temp");
                          s || (s = document.createElement("div"), s.className = "vditor-linenumber__temp", b.insertAdjacentElement("beforeend", s));
                          var C = getComputedStyle(b).whiteSpace, A = !1;
                          (C === "pre-wrap" || C === "pre-line") && (A = !0);
                          var x = "", T = b.textContent.split(/\r\n|\r|\n/g);
                          T.pop(), T.map(function(I) {
                            var V = "";
                            A && (s.textContent = I || `
`, V = ' style="height:'.concat(s.getBoundingClientRect().height, 'px"')), x += "<span".concat(V, "></span>");
                          }), s.style.display = "none", x = '<span class="vditor-linenumber__rows">'.concat(x, "</span>"), b.insertAdjacentHTML("beforeend", x);
                        }
                      });
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              K: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = {}, g = function(f, w) {
              var y = f.transform(w), S = Object.keys(y.features).filter(function(x) {
                return !l[x];
              });
              S.forEach(function(x) {
                l[x] = !0;
              });
              var b = f.getAssets(S), s = b.styles, C = b.scripts, A = window.markmap;
              return s && A.loadCSS(s), C && A.loadJS(C), y;
            }, p = function(f, w) {
              var y = window.markmap, S = y.Transformer, b = y.Markmap, s = y.deriveOptions;
              y.globalCSS;
              var C = new S();
              f.innerHTML = '<svg style="width:100%"></svg>';
              var A = f.firstChild, x = b.create(A, null), T = g(C, w), I = T.root, V = T.frontmatter, z = V == null ? void 0 : V.markmap, Q = s(z);
              x.setData(I, Q), x.fit();
            }, m = function(f, w, y) {
              w === void 0 && (w = H.g.CDN);
              var S = c.markmapRenderAdapter.getElements(f);
              S.length !== 0 && (0, k.G)("".concat(w, "/dist/js/markmap/markmap.min.js"), "vditorMermaidScript").then(function() {
                S.forEach(function(b) {
                  var s = c.markmapRenderAdapter.getCode(b);
                  if (!(b.getAttribute("data-processed") === "true" || s.trim() === "")) {
                    var C = document.createElement("div");
                    C.className = "language-markmap", b.parentNode.appendChild(C), p(C, s), b.parentNode.childNodes[0].nodeName == "CODE" && b.parentNode.removeChild(b.parentNode.childNodes[0]);
                  }
                });
              });
            };
          }
        ),
        /***/
        982: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              H: () => (
                /* binding */
                p
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(296), l = L(528), g = L(781), p = function(m, f) {
              var w = g.mathRenderAdapter.getElements(m);
              if (w.length !== 0) {
                var y = {
                  cdn: H.g.CDN,
                  math: {
                    engine: "KaTeX",
                    inlineDigit: !1,
                    macros: {}
                  }
                };
                if (f && f.math && (f.math = Object.assign({}, y.math, f.math)), f = Object.assign({}, y, f), f.math.engine === "KaTeX")
                  (0, c.c)("".concat(f.cdn, "/dist/js/katex/katex.min.css?v=0.16.9"), "vditorKatexStyle"), (0, k.G)("".concat(f.cdn, "/dist/js/katex/katex.min.js?v=0.16.9"), "vditorKatexScript").then(function() {
                    (0, k.G)("".concat(f.cdn, "/dist/js/katex/mhchem.min.js?v=0.16.9"), "vditorKatexChemScript").then(function() {
                      w.forEach(function(s) {
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
                            var x = A.currentTarget.closest(".language-math");
                            A.clipboardData.setData("text/html", x.innerHTML), A.clipboardData.setData("text/plain", x.getAttribute("data-math"));
                          });
                        }
                      });
                    });
                  });
                else if (f.math.engine === "MathJax") {
                  var S = function(s) {
                    if (s.length !== 0) {
                      var C = 0, A = s[s.length - 1], x = function() {
                        var T = s[C++];
                        T === A ? T() : T(x);
                      };
                      x();
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
                  }, Object.assign(window.MathJax, f.math.mathJaxOptions)), (0, k.J)("".concat(f.cdn, "/dist/js/mathjax/tex-svg-full.js"), "protyleMathJaxScript");
                  var b = function(s, C) {
                    var A = (0, l.X)(s.textContent).trim(), x = window.MathJax.getMetricsFor(s);
                    x.display = s.tagName === "DIV", window.MathJax.tex2svgPromise(A, x).then(function(T) {
                      s.innerHTML = "", s.setAttribute("data-math", A), s.append(T), window.MathJax.startup.document.clear(), window.MathJax.startup.document.updateDocument();
                      var I = T.querySelector('[data-mml-node="merror"]');
                      I && I.textContent.trim() !== "" && (s.innerHTML = I.textContent.trim(), s.className = "vditor-reset--error"), C && C();
                    });
                  };
                  window.MathJax.startup.promise.then(function() {
                    for (var s = [], C = function(x) {
                      var T = w[x];
                      !T.parentElement.classList.contains("vditor-wysiwyg__pre") && !T.parentElement.classList.contains("vditor-ir__marker--pre") && !T.getAttribute("data-math") && (0, l.X)(T.textContent).trim() && s.push(function(I) {
                        x === w.length - 1 ? b(T) : b(T, I);
                      });
                    }, A = 0; A < w.length; A++)
                      C(A);
                    S(s);
                  });
                }
              }
            };
          }
        ),
        /***/
        431: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              Y: () => (
                /* binding */
                g
              )
              /* harmony export */
            });
            var H = L(446), k = function(p, m) {
              p.insertAdjacentHTML("afterend", '<video controls="controls" src="'.concat(m, '"></video>')), p.remove();
            }, c = function(p, m) {
              p.insertAdjacentHTML("afterend", '<audio controls="controls" src="'.concat(m, '"></audio>')), p.remove();
            }, l = function(p, m) {
              var f = m.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/), w = m.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/), y = m.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/), S = m.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/), b = m.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/), s = m.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/), C = m.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/), A = m.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
              if (f && f[1].length === 11)
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//www.youtube.com/embed/'.concat(f[1] + (f[2] ? "?start=" + f[2] : ""), '"></iframe>')), p.remove();
              else if (w && w[1])
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//player.youku.com/embed/'.concat(w[1], '"></iframe>')), p.remove();
              else if (y && y[1])
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="https://v.qq.com/txp/iframe/player.html?vid='.concat(y[1], '"></iframe>')), p.remove();
              else if (S && S[1])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="//coub.com/embed/`.concat(S[1], '?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>')), p.remove();
              else if (b && b[0])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.facebook.com/plugins/video.php?href=`.concat(encodeURIComponent(b[0]), '"></iframe>')), p.remove();
              else if (s && s[2])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.dailymotion.com/embed/video/`.concat(s[2], '"></iframe>')), p.remove();
              else if (m.indexOf("bilibili.com") > -1 && (m.indexOf("bvid=") > -1 || C && C[1])) {
                var x = {
                  bvid: (0, H.on)("bvid", m) || C && C[1],
                  page: "1",
                  high_quality: "1",
                  as_wide: "1",
                  allowfullscreen: "true",
                  autoplay: "0"
                };
                new URL(m.startsWith("http") ? m : "https:" + m).search.split("&").forEach(function(V, z) {
                  if (V) {
                    z === 0 && (V = V.substr(1));
                    var Q = V.split("=");
                    x[Q[0]] = Q[1];
                  }
                });
                var T = "https://player.bilibili.com/player.html?", I = Object.keys(x);
                I.forEach(function(V, z) {
                  T += "".concat(V, "=").concat(x[V]), z < I.length - 1 && (T += "&");
                }), p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="'.concat(T, '"></iframe>')), p.remove();
              } else A && A[1] && (p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//embed.ted.com/talks/'.concat(A[1], '"></iframe>')), p.remove());
            }, g = function(p) {
              p && p.querySelectorAll("a").forEach(function(m) {
                var f = m.getAttribute("href");
                f && (f.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/) ? k(m, f) : f.match(/^.+.(mp3|wav|flac)$/) ? c(m, f) : l(m, f));
              });
            };
          }
        ),
        /***/
        570: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              i: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = L(446), g = function(f, w, y, S) {
              function b(s) {
                return s instanceof y ? s : new y(function(C) {
                  C(s);
                });
              }
              return new (y || (y = Promise))(function(s, C) {
                function A(I) {
                  try {
                    T(S.next(I));
                  } catch (V) {
                    C(V);
                  }
                }
                function x(I) {
                  try {
                    T(S.throw(I));
                  } catch (V) {
                    C(V);
                  }
                }
                function T(I) {
                  I.done ? s(I.value) : b(I.value).then(A, x);
                }
                T((S = S.apply(f, [])).next());
              });
            }, p = function(f, w) {
              var y = { label: 0, sent: function() {
                if (s[0] & 1) throw s[1];
                return s[1];
              }, trys: [], ops: [] }, S, b, s, C;
              return C = { next: A(0), throw: A(1), return: A(2) }, typeof Symbol == "function" && (C[Symbol.iterator] = function() {
                return this;
              }), C;
              function A(T) {
                return function(I) {
                  return x([T, I]);
                };
              }
              function x(T) {
                if (S) throw new TypeError("Generator is already executing.");
                for (; C && (C = 0, T[0] && (y = 0)), y; ) try {
                  if (S = 1, b && (s = T[0] & 2 ? b.return : T[0] ? b.throw || ((s = b.return) && s.call(b), 0) : b.next) && !(s = s.call(b, T[1])).done) return s;
                  switch (b = 0, s && (T = [T[0] & 2, s.value]), T[0]) {
                    case 0:
                    case 1:
                      s = T;
                      break;
                    case 4:
                      return y.label++, { value: T[1], done: !1 };
                    case 5:
                      y.label++, b = T[1], T = [0];
                      continue;
                    case 7:
                      T = y.ops.pop(), y.trys.pop();
                      continue;
                    default:
                      if (s = y.trys, !(s = s.length > 0 && s[s.length - 1]) && (T[0] === 6 || T[0] === 2)) {
                        y = 0;
                        continue;
                      }
                      if (T[0] === 3 && (!s || T[1] > s[0] && T[1] < s[3])) {
                        y.label = T[1];
                        break;
                      }
                      if (T[0] === 6 && y.label < s[1]) {
                        y.label = s[1], s = T;
                        break;
                      }
                      if (s && y.label < s[2]) {
                        y.label = s[2], y.ops.push(T);
                        break;
                      }
                      s[2] && y.ops.pop(), y.trys.pop();
                      continue;
                  }
                  T = w.call(f, y);
                } catch (I) {
                  T = [6, I], b = 0;
                } finally {
                  S = s = 0;
                }
                if (T[0] & 5) throw T[1];
                return { value: T[0] ? T[1] : void 0, done: !0 };
              }
            }, m = function(f, w, y) {
              w === void 0 && (w = H.g.CDN);
              var S = c.mermaidRenderAdapter.getElements(f);
              S.length !== 0 && (0, k.G)("".concat(w, "/dist/js/mermaid/mermaid.min.js"), "vditorMermaidScript").then(function() {
                var b = {
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
                y === "dark" && (b.theme = "dark"), mermaid.initialize(b), S.forEach(function(s) {
                  return g(void 0, void 0, void 0, function() {
                    var C, A, x, T, I;
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
                          return x = V.sent(), s.innerHTML = x.svg, [3, 4];
                        case 3:
                          return T = V.sent(), I = document.querySelector("#" + A), s.innerHTML = "".concat(I.outerHTML, `<br>
<div style="text-align: left"><small>`).concat(T.message.replace(/\n/, "<br>"), "</small></div>"), I.parentElement.remove(), [3, 4];
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              P: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = function(g, p, m) {
              g === void 0 && (g = document), p === void 0 && (p = H.g.CDN);
              var f = c.mindmapRenderAdapter.getElements(g);
              f.length > 0 && (0, k.G)("".concat(p, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                f.forEach(function(w) {
                  if (!(w.parentElement.classList.contains("vditor-wysiwyg__pre") || w.parentElement.classList.contains("vditor-ir__marker--pre"))) {
                    var y = c.mindmapRenderAdapter.getCode(w);
                    if (y)
                      try {
                        if (w.getAttribute("data-processed") === "true")
                          return;
                        echarts.init(w, m === "dark" ? "dark" : void 0).setOption({
                          series: [
                            {
                              data: [JSON.parse(decodeURIComponent(y))],
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
                              symbol: function(S, b) {
                                var s;
                                return !((s = b == null ? void 0 : b.data) === null || s === void 0) && s.children ? "circle" : "path://";
                              },
                              type: "tree"
                            }
                          ],
                          tooltip: {
                            trigger: "item",
                            triggerOn: "mousemove"
                          }
                        }), w.setAttribute("data-processed", "true");
                      } catch (S) {
                        w.className = "vditor-reset--error", w.innerHTML = "mindmap render error: <br>".concat(S);
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              k: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var H = L(946), k = L(982), c = function(l, g, p) {
              var m = "", f = [];
              if (Array.from(l.children).forEach(function(b, s) {
                if ((0, H.W)(b)) {
                  if (p) {
                    var C = b.id.lastIndexOf("_");
                    b.id = b.id.substring(0, C === -1 ? void 0 : C) + "_" + s;
                  }
                  f.push(b.id), m += b.outerHTML.replace("<wbr>", "");
                }
              }), m === "")
                return g.innerHTML = "", "";
              var w = document.createElement("div");
              if (p)
                p.lute.SetToC(!0), p.currentMode === "wysiwyg" && !p.preview.element.contains(l) ? w.innerHTML = p.lute.SpinVditorDOM("<p>[ToC]</p>" + m) : p.currentMode === "ir" && !p.preview.element.contains(l) ? w.innerHTML = p.lute.SpinVditorIRDOM("<p>[ToC]</p>" + m) : w.innerHTML = p.lute.HTML2VditorDOM("<p>[ToC]</p>" + m), p.lute.SetToC(p.options.preview.markdown.toc);
              else {
                g.classList.add("vditor-outline");
                var y = Lute.New();
                y.SetToC(!0), w.innerHTML = y.HTML2VditorDOM("<p>[ToC]</p>" + m);
              }
              var S = w.firstElementChild.querySelectorAll("li > span[data-target-id]");
              return S.forEach(function(b, s) {
                if (b.nextElementSibling && b.nextElementSibling.tagName === "UL") {
                  var C = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
                  document.getElementById("vditorIconScript") || (C = '<svg class="vditor-outline__action" viewBox="0 0 32 32"><path d="M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z"></path></svg>'), b.innerHTML = "".concat(C, "<span>").concat(b.innerHTML, "</span>");
                } else
                  b.innerHTML = "<svg></svg><span>".concat(b.innerHTML, "</span>");
                b.setAttribute("data-target-id", f[s]);
              }), m = w.firstElementChild.innerHTML, S.length === 0 ? (g.innerHTML = "", m) : (g.innerHTML = m, p && (0, k.H)(g, {
                cdn: p.options.cdn,
                math: p.options.preview.math
              }), g.firstElementChild.addEventListener("click", function(b) {
                for (var s = b.target; s && !s.isEqualNode(g); ) {
                  if (s.classList.contains("vditor-outline__action")) {
                    s.classList.contains("vditor-outline__action--close") ? (s.classList.remove("vditor-outline__action--close"), s.parentElement.nextElementSibling.setAttribute("style", "display:block")) : (s.classList.add("vditor-outline__action--close"), s.parentElement.nextElementSibling.setAttribute("style", "display:none")), b.preventDefault(), b.stopPropagation();
                    break;
                  } else if (s.getAttribute("data-target-id")) {
                    b.preventDefault(), b.stopPropagation();
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              B: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var H = L(793), k = L(998), c = L(781), l = function(g, p) {
              g === void 0 && (g = document), p === void 0 && (p = H.g.CDN);
              var m = c.plantumlRenderAdapter.getElements(g);
              m.length !== 0 && (0, k.G)("".concat(p, "/dist/js/plantuml/plantuml-encoder.min.js"), "vditorPlantumlScript").then(function() {
                m.forEach(function(f) {
                  if (!(f.parentElement.classList.contains("vditor-wysiwyg__pre") || f.parentElement.classList.contains("vditor-ir__marker--pre"))) {
                    var w = c.plantumlRenderAdapter.getCode(f).trim();
                    if (w)
                      try {
                        f.innerHTML = '<object type="image/svg+xml" data="https://www.plantuml.com/plantuml/svg/~1'.concat(plantumlEncoder.encode(w), '"/>');
                      } catch (y) {
                        f.className = "vditor-reset--error", f.innerHTML = "plantuml render error: <br>".concat(y);
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              X: () => (
                /* binding */
                H
              )
              /* harmony export */
            });
            var H = function(k) {
              var c = Lute.New();
              return c.PutEmojis(k.emojis), c.SetEmojiSite(k.emojiSite), c.SetHeadingAnchor(k.headingAnchor), c.SetInlineMathAllowDigitAfterOpenMarker(k.inlineMathDigit), c.SetAutoSpace(k.autoSpace), c.SetToC(k.toc), c.SetFootnotes(k.footnotes), c.SetFixTermTypo(k.fixTermTypo), c.SetVditorCodeBlockPreview(k.codeBlockPreview), c.SetVditorMathBlockPreview(k.mathBlockPreview), c.SetSanitize(k.sanitize), c.SetChineseParagraphBeginningSpace(k.paragraphBeginningSpace), c.SetRenderListStyle(k.listStyle), c.SetLinkBase(k.linkBase), c.SetLinkPrefix(k.linkPrefix), c.SetMark(k.mark), c.SetGFMAutoLink(k.gfmAutoLink), k.lazyLoadImage && c.SetImageLazyLoading(k.lazyLoadImage), c;
            };
          }
        ),
        /***/
        971: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              E: () => (
                /* binding */
                H
              )
              /* harmony export */
            });
            var H = function(k, c, l) {
              l === void 0 && (l = "classic");
              var g = k.getBoundingClientRect(), p = 36;
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
      <img style="width: `).concat(k.width, "px;height:").concat(k.height, "px;transform: translate3d(").concat(g.left, "px, ").concat(g.top - p, 'px, 0)" src="').concat(k.getAttribute("src"), `">
    </div>
</div>`)), document.body.style.overflow = "hidden";
              var m = document.querySelector(".vditor-img img"), f = "translate3d(".concat(Math.max(0, window.innerWidth - k.naturalWidth) / 2, "px, ").concat(Math.max(0, window.innerHeight - p - k.naturalHeight) / 2, "px, 0)");
              setTimeout(function() {
                m.setAttribute("style", "transition: transform .3s ease-in-out;transform: ".concat(f)), setTimeout(function() {
                  m.parentElement.scrollTo((m.parentElement.scrollWidth - m.parentElement.clientWidth) / 2, (m.parentElement.scrollHeight - m.parentElement.clientHeight) / 2);
                }, 400);
              });
              var w = document.querySelector(".vditor-img__btn");
              w.addEventListener("click", function() {
                var y = parseInt(w.getAttribute("data-deg"), 10) + 90;
                y / 90 % 2 === 1 && k.naturalWidth > m.parentElement.clientHeight ? m.style.transform = "translate3d(".concat(Math.max(0, window.innerWidth - k.naturalWidth) / 2, "px, ").concat(k.naturalWidth / 2 - k.naturalHeight / 2, "px, 0) rotateZ(").concat(y, "deg)") : m.style.transform = "".concat(f, " rotateZ(").concat(y, "deg)"), w.setAttribute("data-deg", y.toString()), setTimeout(function() {
                  m.parentElement.scrollTo((m.parentElement.scrollWidth - m.parentElement.clientWidth) / 2, (m.parentElement.scrollHeight - m.parentElement.clientHeight) / 2);
                }, 400);
              });
            };
          }
        ),
        /***/
        34: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              Y: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var H = L(793), k = L(296), c = function(l, g) {
              g === void 0 && (g = H.g.CDN), H.g.CODE_THEME.includes(l) || (l = "github");
              var p = document.getElementById("vditorHljsStyle"), m = "".concat(g, "/dist/js/highlight.js/styles/").concat(l, ".css");
              p ? p.getAttribute("href") !== m && (p.remove(), (0, k.c)(m, "vditorHljsStyle")) : (0, k.c)(m, "vditorHljsStyle");
            };
          }
        ),
        /***/
        652: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              Z: () => (
                /* binding */
                k
              )
              /* harmony export */
            });
            var H = L(296), k = function(c, l) {
              if (!(!c || !l)) {
                var g = document.getElementById("vditorContentTheme"), p = "".concat(l, "/").concat(c, ".css");
                g ? g.getAttribute("href") !== p && (g.remove(), (0, H.c)(p, "vditorContentTheme")) : (0, H.c)(p, "vditorContentTheme");
              }
            };
          }
        ),
        /***/
        998: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              G: () => (
                /* binding */
                k
              ),
              /* harmony export */
              J: () => (
                /* binding */
                H
              )
              /* harmony export */
            });
            var H = function(c, l) {
              if (document.getElementById(l))
                return !1;
              var g = new XMLHttpRequest();
              g.open("GET", c, !1), g.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"), g.send("");
              var p = document.createElement("script");
              p.type = "text/javascript", p.text = g.responseText, p.id = l, document.head.appendChild(p);
            }, k = function(c, l) {
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              c: () => (
                /* binding */
                H
              )
              /* harmony export */
            });
            var H = function(k, c) {
              if (!document.getElementById(c)) {
                var l = document.createElement("link");
                l.id = c, l.rel = "stylesheet", l.type = "text/css", l.href = k, document.getElementsByTagName("head")[0].appendChild(l);
              }
            };
          }
        ),
        /***/
        528: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              X: () => (
                /* binding */
                H
              )
              /* harmony export */
            });
            var H = function(k) {
              return k.replace(/\u00a0/g, " ");
            };
          }
        ),
        /***/
        796: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              G6: () => (
                /* binding */
                H
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
                k
              ),
              /* harmony export */
              yl: () => (
                /* binding */
                g
              )
              /* harmony export */
            });
            var H = function() {
              return navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1;
            }, k = function() {
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
              return /Mac/.test(navigator.platform) || navigator.platform === "iPhone" ? f.indexOf("⇧") > -1 && k() && (f = f.replace(";", ":").replace("=", "+").replace("-", "_")) : (f.startsWith("⌘") ? f = f.replace("⌘", "⌘+") : f.startsWith("⌥") && f.substr(1, 1) !== "⌘" ? f = f.replace("⌥", "⌥+") : f = f.replace("⇧⌘", "⌘+⇧+").replace("⌥⌘", "⌥+⌘+"), f = f.replace("⌘", "Ctrl").replace("⇧", "Shift").replace("⌥", "Alt"), f.indexOf("Shift") > -1 && (f = f.replace(";", ":").replace("=", "+").replace("-", "_"))), f;
            }, m = function() {
              return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            };
          }
        ),
        /***/
        446: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              Qf: () => (
                /* binding */
                c
              ),
              /* harmony export */
              Wb: () => (
                /* binding */
                H
              ),
              /* harmony export */
              on: () => (
                /* binding */
                k
              )
              /* harmony export */
            });
            var H = function() {
              return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(l) {
                return (parseInt(l, 10) ^ window.crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> parseInt(l, 10) / 4).toString(16);
              });
            }, k = function(l, g) {
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
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              DX: () => (
                /* binding */
                w
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
                k
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
            var H = L(946), k = function(y, S) {
              for (var b = f(y, S), s = !1, C = !1; b && !b.classList.contains("vditor-reset") && !C; )
                s = f(b.parentElement, S), s ? b = s : C = !0;
              return b || !1;
            }, c = function(y, S) {
              for (var b = (0, H.S)(y, S), s = !1, C = !1; b && !b.classList.contains("vditor-reset") && !C; )
                s = (0, H.S)(b.parentElement, S), s ? b = s : C = !0;
              return b || !1;
            }, l = function(y) {
              var S = c(y, "UL"), b = c(y, "OL"), s = S;
              return b && (!S || S && b.contains(S)) && (s = b), s;
            }, g = function(y, S, b) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              for (var s = y, C = !1; s && !C && !s.classList.contains("vditor-reset"); )
                s.getAttribute(S) === b ? C = !0 : s = s.parentElement;
              return C && s;
            }, p = function(y) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              var S = y, b = !1, s = g(y, "data-block", "0");
              if (s)
                return s;
              for (; S && !b && !S.classList.contains("vditor-reset"); )
                S.tagName === "H1" || S.tagName === "H2" || S.tagName === "H3" || S.tagName === "H4" || S.tagName === "H5" || S.tagName === "H6" || S.tagName === "P" || S.tagName === "BLOCKQUOTE" || S.tagName === "OL" || S.tagName === "UL" ? b = !0 : S = S.parentElement;
              return b && S;
            }, m = function(y, S) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              for (var b = y, s = !1; b && !s && !b.classList.contains("vditor-reset"); )
                b.nodeName === S ? s = !0 : b = b.parentElement;
              return s && b;
            }, f = function(y, S) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              for (var b = y, s = !1; b && !s && !b.classList.contains("vditor-reset"); )
                b.classList.contains(S) ? s = !0 : b = b.parentElement;
              return s && b;
            }, w = function(y) {
              for (; y && y.lastChild; )
                y = y.lastChild;
              return y;
            };
          }
        ),
        /***/
        946: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              S: () => (
                /* binding */
                H
              ),
              /* harmony export */
              W: () => (
                /* binding */
                k
              )
              /* harmony export */
            });
            var H = function(c, l) {
              if (!c)
                return !1;
              c.nodeType === 3 && (c = c.parentElement);
              for (var g = c, p = !1; g && !p && !g.classList.contains("vditor-reset"); )
                g.nodeName.indexOf(l) === 0 ? p = !0 : g = g.parentElement;
              return p && g;
            }, k = function(c) {
              var l = H(c, "H");
              return l && l.tagName.length === 2 && l.tagName !== "HR" ? l : !1;
            };
          }
        ),
        /***/
        2: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              T: () => (
                /* binding */
                H
              )
              /* harmony export */
            });
            var H = function() {
              for (var k = [], c = 0; c < arguments.length; c++)
                k[c] = arguments[c];
              for (var l = {}, g = function(m) {
                for (var f in m)
                  m.hasOwnProperty(f) && (Object.prototype.toString.call(m[f]) === "[object Object]" ? l[f] = H(l[f], m[f]) : l[f] = m[f]);
              }, p = 0; p < k.length; p++)
                g(k[p]);
              return l;
            };
          }
        ),
        /***/
        307: (
          /***/
          (J, v, L) => {
            L.d(v, {
              /* harmony export */
              $j: () => (
                /* binding */
                w
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
                y
              ),
              /* harmony export */
              im: () => (
                /* binding */
                f
              ),
              /* harmony export */
              oC: () => (
                /* binding */
                S
              ),
              /* harmony export */
              zh: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var H = L(793), k = L(796), c = L(118), l = function(b) {
              var s, C = b[b.currentMode].element;
              return getSelection().rangeCount > 0 && (s = getSelection().getRangeAt(0), C.isEqualNode(s.startContainer) || C.contains(s.startContainer)) ? s : b[b.currentMode].range ? b[b.currentMode].range : (C.focus(), s = C.ownerDocument.createRange(), s.setStart(C, 0), s.collapse(!0), s);
            }, g = function(b) {
              var s = window.getSelection().getRangeAt(0);
              if (!b.contains(s.startContainer) && !(0, c.fb)(s.startContainer, "vditor-panel--none"))
                return {
                  left: 0,
                  top: 0
                };
              var C = b.parentElement.getBoundingClientRect(), A;
              if (s.getClientRects().length === 0)
                if (s.startContainer.nodeType === 3) {
                  var x = s.startContainer.parentElement;
                  if (x && x.getClientRects().length > 0)
                    A = x.getClientRects()[0];
                  else
                    return {
                      left: 0,
                      top: 0
                    };
                } else {
                  var T = s.startContainer.children;
                  if (T[s.startOffset] && T[s.startOffset].getClientRects().length > 0)
                    A = T[s.startOffset].getClientRects()[0];
                  else if (s.startContainer.childNodes.length > 0) {
                    var I = s.cloneRange();
                    s.selectNode(s.startContainer.childNodes[Math.max(0, s.startOffset - 1)]), A = s.getClientRects()[0], s.setEnd(I.endContainer, I.endOffset), s.setStart(I.startContainer, I.startOffset);
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
            }, p = function(b, s) {
              if (!s) {
                if (getSelection().rangeCount === 0)
                  return !1;
                s = getSelection().getRangeAt(0);
              }
              var C = s.commonAncestorContainer;
              return b.isEqualNode(C) || b.contains(C);
            }, m = function(b) {
              var s = window.getSelection();
              s.removeAllRanges(), s.addRange(b);
            }, f = function(b, s, C) {
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
                var x = C.cloneRange();
                b.childNodes[0] && b.childNodes[0].childNodes[0] ? x.setStart(b.childNodes[0].childNodes[0], 0) : x.selectNodeContents(b), x.setEnd(C.startContainer, C.startOffset), A.start = x.toString().length, A.end = A.start + C.toString().length;
              }
              return A;
            }, w = function(b, s, C) {
              var A = 0, x = 0, T = C.childNodes[x], I = !1, V = !1;
              b = Math.max(0, b), s = Math.max(0, s);
              var z = C.ownerDocument.createRange();
              for (z.setStart(T || C, 0), z.collapse(!0); !V && T; ) {
                var Q = A + T.textContent.length;
                if (!I && b >= A && b <= Q && (b === 0 ? z.setStart(T, 0) : T.childNodes[0].nodeType === 3 ? z.setStart(T.childNodes[0], b - A) : T.nextSibling ? z.setStartBefore(T.nextSibling) : z.setStartAfter(T), I = !0, b === s)) {
                  V = !0;
                  break;
                }
                I && s >= A && s <= Q && (s === 0 ? z.setEnd(T, 0) : T.childNodes[0].nodeType === 3 ? z.setEnd(T.childNodes[0], s - A) : T.nextSibling ? z.setEndBefore(T.nextSibling) : z.setEndAfter(T), V = !0), A = Q, T = C.childNodes[++x];
              }
              return !V && C.childNodes[x - 1] && z.setStartBefore(C.childNodes[x - 1]), m(z), z;
            }, y = function(b, s) {
              var C = b.querySelector("wbr");
              if (C) {
                if (!C.previousElementSibling)
                  C.previousSibling ? s.setStart(C.previousSibling, C.previousSibling.textContent.length) : C.nextSibling ? C.nextSibling.nodeType === 3 ? s.setStart(C.nextSibling, 0) : s.setStartBefore(C.nextSibling) : s.setStart(C.parentElement, 0);
                else if (C.previousElementSibling.isSameNode(C.previousSibling))
                  if (C.previousElementSibling.lastChild) {
                    s.setStartBefore(C), s.collapse(!0), m(s), (0, k.i7)() && (C.previousElementSibling.tagName === "EM" || C.previousElementSibling.tagName === "STRONG" || C.previousElementSibling.tagName === "S") && (s.insertNode(document.createTextNode(H.g.ZWSP)), s.collapse(!1)), C.remove();
                    return;
                  } else
                    s.setStartAfter(C.previousElementSibling);
                else
                  s.setStart(C.previousSibling, C.previousSibling.textContent.length);
                s.collapse(!0), C.remove(), m(s);
              }
            }, S = function(b, s) {
              var C = document.createElement("div");
              C.innerHTML = b;
              var A = C.querySelectorAll("p");
              A.length === 1 && !A[0].previousSibling && !A[0].nextSibling && s[s.currentMode].element.children.length > 0 && C.firstElementChild.tagName === "P" && (b = A[0].innerHTML.trim());
              var x = document.createElement("div");
              x.innerHTML = b;
              var T = l(s);
              if (T.toString() !== "" && (s[s.currentMode].preventInput = !0, document.execCommand("delete", !1, "")), x.firstElementChild && x.firstElementChild.getAttribute("data-block") === "0") {
                x.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
                var I = (0, c.F9)(T.startContainer);
                I ? I.insertAdjacentHTML("afterend", x.innerHTML) : s[s.currentMode].element.insertAdjacentHTML("beforeend", x.innerHTML), y(s[s.currentMode].element, T);
              } else {
                var V = document.createElement("template");
                V.innerHTML = b, T.insertNode(V.content.cloneNode(!0)), T.collapse(!1), m(T);
              }
            };
          }
        )
        /******/
      }, vt = {};
      function ee(J) {
        var v = vt[J];
        if (v !== void 0)
          return v.exports;
        var L = vt[J] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        return Ut[J](L, L.exports, ee), L.exports;
      }
      ee.d = (J, v) => {
        for (var L in v)
          ee.o(v, L) && !ee.o(J, L) && Object.defineProperty(J, L, { enumerable: !0, get: v[L] });
      }, ee.o = (J, v) => Object.prototype.hasOwnProperty.call(J, v), ee.r = (J) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(J, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(J, "__esModule", { value: !0 });
      };
      var at = {};
      return (() => {
        ee.d(at, {
          default: () => (
            /* binding */
            gi
          )
        });
        var J = ee(664), v = ee(793), L = ee(528), H = function(e) {
          return e.currentMode === "sv" ? (0, L.X)("".concat(e.sv.element.textContent, `
`).replace(/\n\n$/, `
`)) : e.currentMode === "wysiwyg" ? e.lute.VditorDOM2Md(e.wysiwyg.element.innerHTML) : e.currentMode === "ir" ? e.lute.VditorIRDOM2Md(e.ir.element.innerHTML) : "";
        }, k = ee(998), c = (
          /** @class */
          function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-devtools", this.element.innerHTML = '<div class="vditor-reset--error"></div><div style="height: 100%;"></div>';
            }
            return e.prototype.renderEchart = function(t) {
              var n = this;
              t.devtools.element.style.display === "block" && (0, k.G)("".concat(t.options.cdn, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                n.ASTChart || (n.ASTChart = echarts.init(t.devtools.element.lastElementChild));
                try {
                  n.element.lastElementChild.style.display = "block", n.element.firstElementChild.innerHTML = "", n.ASTChart.setOption({
                    series: [
                      {
                        data: JSON.parse(t.lute.RenderEChartsJSON(H(t))),
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
              r && r.classList.contains(v.g.CLASS_MENU_DISABLED) && r.classList.remove(v.g.CLASS_MENU_DISABLED);
            }
          });
        }, f = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && !r.classList.contains(v.g.CLASS_MENU_DISABLED) && r.classList.add(v.g.CLASS_MENU_DISABLED);
            }
          });
        }, w = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "none");
          });
        }, y = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "block");
          });
        }, S = function(e, t, n) {
          t.includes("subToolbar") && (e.toolbar.element.querySelectorAll(".vditor-hint").forEach(function(r) {
            n && r.isEqualNode(n) || (r.style.display = "none");
          }), e.toolbar.elements.emoji && (e.toolbar.elements.emoji.lastElementChild.style.display = "none")), t.includes("hint") && (e.hint.element.style.display = "none"), e.wysiwyg.popover && t.includes("popover") && (e.wysiwyg.popover.style.display = "none");
        }, b = function(e, t, n, r) {
          n.addEventListener((0, l.Le)(), function(i) {
            i.preventDefault(), i.stopPropagation(), !n.classList.contains(v.g.CLASS_MENU_DISABLED) && (e.toolbar.element.querySelectorAll(".vditor-hint--current").forEach(function(a) {
              a.classList.remove("vditor-hint--current");
            }), t.style.display === "block" ? t.style.display = "none" : (S(e, ["subToolbar", "hint", "popover"], n.parentElement.parentElement), n.classList.contains("vditor-tooltipped") || n.classList.add("vditor-hint--current"), t.style.display = "block", e.toolbar.element.getBoundingClientRect().right - n.getBoundingClientRect().right < 250 ? t.classList.add("vditor-panel--left") : t.classList.remove("vditor-panel--left")));
          });
        }, s = ee(118), C = ee(946), A = function(e, t, n, r) {
          r && console.log("".concat(e, " - ").concat(n, ": ").concat(t));
        }, x = ee(386), T = ee(379), I = ee(895), V = ee(169), z = ee(572), Q = ee(702), ne = ee(982), se = ee(570), ge = ee(593), de = ee(558), ce = ee(931), ve = function(e, t, n) {
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
        }, ie = function(e, t) {
          if (e) {
            if (e.parentElement.getAttribute("data-type") === "html-block") {
              e.setAttribute("data-render", "1");
              return;
            }
            var n = e.firstElementChild.className.replace("language-", "");
            if (n === "abc")
              (0, x.Q)(e, t.options.cdn);
            else if (n === "mermaid")
              (0, se.i)(e, t.options.cdn, t.options.theme);
            else if (n === "markmap")
              (0, ge.K)(e, t.options.cdn, t.options.theme);
            else if (n === "flowchart")
              (0, V.P)(e, t.options.cdn);
            else if (n === "echarts")
              (0, T.p)(e, t.options.cdn, t.options.theme);
            else if (n === "mindmap")
              (0, de.P)(e, t.options.cdn, t.options.theme);
            else if (n === "plantuml")
              (0, ce.B)(e, t.options.cdn);
            else if (n === "graphviz")
              (0, z.v)(e, t.options.cdn);
            else if (n === "math")
              (0, ne.H)(e, { cdn: t.options.cdn, math: t.options.preview.math });
            else {
              var r = t.options.customRenders.find(function(i) {
                if (i.language === n)
                  return i.render(e, t), !0;
              });
              r || ((0, Q.s)(Object.assign({}, t.options.preview.hljs), e, t.options.cdn), (0, I.O)(e, t.options.preview.hljs));
            }
            e.setAttribute("data-render", "1");
          }
        }, M = ee(307), Ne = function(e) {
          if (e.currentMode !== "sv") {
            var t = e[e.currentMode].element, n = e.outline.render(e);
            n === "" && (n = "[ToC]"), t.querySelectorAll('[data-type="toc-block"]').forEach(function(r) {
              r.innerHTML = n, (0, ne.H)(r, {
                cdn: e.options.cdn,
                math: e.options.preview.math
              });
            });
          }
        }, ot = function(e, t) {
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
        }, st = function(e, t, n, r) {
          if (e.previousElementSibling && e.previousElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Backspace" && (0, M.im)(e, t[t.currentMode].element, r).start === 0)
              return e.previousElementSibling.remove(), $(t), !0;
            if (Fe(t, n, r, e, e.previousElementSibling))
              return !0;
          }
          if (e.nextElementSibling && e.nextElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Delete" && (0, M.im)(e, t[t.currentMode].element, r).start >= e.textContent.trimRight().length)
              return e.nextElementSibling.remove(), $(t), !0;
            if (nt(t, n, r, e, e.nextElementSibling))
              return !0;
          }
          if (n.key === "Backspace" || n.key === "Delete") {
            var i = (0, s.fb)(r.startContainer, "vditor-toc");
            if (i)
              return i.remove(), $(t), !0;
          }
        }, Be = function(e, t, n, r) {
          n === void 0 && (n = !1);
          var i = (0, s.F9)(t.startContainer);
          if (i && !n && i.getAttribute("data-type") !== "code-block") {
            if (Ot(i.innerHTML) && i.previousElementSibling || Nt(i.innerHTML))
              return;
            for (
              var a = (0, M.im)(i, e.ir.element, t).start, o = !0, d = a - 1;
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
              typeof e.options.input == "function" && e.options.input(H(e));
              return;
            }
            if (h && /^#{1,6} $/.test(i.textContent) && (h = !1), h) {
              var u = (0, s.fb)(t.startContainer, "vditor-ir__marker");
              if (!u) {
                var E = t.startContainer.previousSibling;
                E && E.nodeType !== 3 && E.classList.contains("vditor-ir__node--expand") && E.classList.remove("vditor-ir__node--expand"), typeof e.options.input == "function" && e.options.input(H(e));
                return;
              }
            }
          }
          if (e.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(Y) {
            Y.classList.remove("vditor-ir__node--expand");
          }), i || (i = e.ir.element), !i.querySelector("wbr")) {
            var _ = (0, s.fb)(t.startContainer, "vditor-ir__preview");
            _ ? _.previousElementSibling.insertAdjacentHTML("beforeend", "<wbr>") : t.insertNode(document.createElement("wbr"));
          }
          i.querySelectorAll("[style]").forEach(function(Y) {
            Y.removeAttribute("style");
          }), i.getAttribute("data-type") === "link-ref-defs-block" && (i = e.ir.element);
          var P = i.isEqualNode(e.ir.element), R = (0, s.a1)(i, "data-type", "footnotes-block"), O = "";
          if (P)
            O = i.innerHTML;
          else {
            var q = (0, C.S)(t.startContainer, "BLOCKQUOTE"), B = (0, s.O9)(t.startContainer);
            if (B && (i = B), q && (!B || B && !q.contains(B)) && (i = q), R && (i = R), O = i.outerHTML, i.tagName === "UL" || i.tagName === "OL") {
              var D = i.previousElementSibling, F = i.nextElementSibling;
              D && (D.tagName === "UL" || D.tagName === "OL") && (O = D.outerHTML + O, D.remove()), F && (F.tagName === "UL" || F.tagName === "OL") && (O = O + F.outerHTML, F.remove()), O = O.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
            } else i.previousElementSibling && i.previousElementSibling.textContent.replace(v.g.ZWSP, "") !== "" && r && r.inputType === "insertParagraph" && (O = i.previousElementSibling.outerHTML + O, i.previousElementSibling.remove());
            i.innerText.startsWith("```") || (e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(Y) {
              Y && !i.isEqualNode(Y) && (O += Y.outerHTML, Y.remove());
            }), e.ir.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(Y) {
              Y && !i.isEqualNode(Y) && (O += Y.outerHTML, Y.remove());
            }));
          }
          if (A("SpinVditorIRDOM", O, "argument", e.options.debugger), O = e.lute.SpinVditorIRDOM(O), A("SpinVditorIRDOM", O, "result", e.options.debugger), P)
            i.innerHTML = O;
          else if (i.outerHTML = O, R) {
            var W = (0, s.a1)(e.ir.element.querySelector("wbr"), "data-type", "footnotes-def");
            if (W) {
              var Z = W.textContent, le = Z.substring(1, Z.indexOf("]:")), oe = e.ir.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="'.concat(le, '"]'));
              oe && oe.setAttribute("aria-label", Z.substr(le.length + 3).trim().substr(0, 24));
            }
          }
          var fe, Te = e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']");
          Te.forEach(function(Y, we) {
            we === 0 ? fe = Y : (fe.insertAdjacentHTML("beforeend", Y.innerHTML), Y.remove());
          }), Te.length > 0 && e.ir.element.insertAdjacentElement("beforeend", Te[0]);
          var Le, _e = e.ir.element.querySelectorAll("[data-type='footnotes-block']");
          _e.forEach(function(Y, we) {
            we === 0 ? Le = Y : (Le.insertAdjacentHTML("beforeend", Y.innerHTML), Y.remove());
          }), _e.length > 0 && e.ir.element.insertAdjacentElement("beforeend", _e[0]), (0, M.ib)(e.ir.element, t), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(Y) {
            ie(Y, e);
          }), Ne(e), Pe(e, {
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
            n && (n.classList.add("vditor-ir__node--expand"), n.classList.remove("vditor-ir__node--hidden"), (0, M.Hc)(e));
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
        }, he = function(e, t) {
          if (e.ir.composingLock = t.isComposing, t.isComposing)
            return !1;
          t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t);
          var n = (0, M.zh)(e), r = n.startContainer;
          if (!$t(t, e, r) || (en(n, e, t), gn(n), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l.yl)(t) && t.key !== "Escape" && t.key !== "Delete"))
            return !1;
          var i = (0, s.a1)(r, "data-newline", "1");
          if (!(0, l.yl)(t) && !t.altKey && !t.shiftKey && t.key === "Enter" && i && n.startOffset < i.textContent.length) {
            var a = i.previousElementSibling;
            a && (n.insertNode(document.createTextNode(a.textContent)), n.collapse(!1));
            var o = i.nextSibling;
            o && (n.insertNode(document.createTextNode(o.textContent)), n.collapse(!0));
          }
          var d = (0, s.lG)(r, "P");
          if (on(t, e, d, n) || an(n, e, d, t) || pn(e, n, t, d))
            return !0;
          var h = (0, s.fb)(r, "vditor-ir__marker--pre");
          if (h && h.tagName === "PRE") {
            var u = h.firstChild;
            if (dn(e, t, h, n) || (u.getAttribute("data-type") === "math-block" || u.getAttribute("data-type") === "html-block") && Fe(e, t, n, u, h.parentElement) || nt(e, t, n, u, h.parentElement))
              return !0;
          }
          var E = (0, s.a1)(r, "data-type", "code-block-info");
          if (E) {
            if (t.key === "Enter" || t.key === "Tab")
              return n.selectNodeContents(E.nextElementSibling.firstChild), n.collapse(!0), t.preventDefault(), S(e, ["hint"]), !0;
            if (t.key === "Backspace") {
              var _ = (0, M.im)(E, e.ir.element).start;
              _ === 1 && n.setStart(r, 0), _ === 2 && (e.hint.recentLanguage = "");
            }
            if (Fe(e, t, n, E, E.parentElement))
              return S(e, ["hint"]), !0;
          }
          var P = (0, s.lG)(r, "TD") || (0, s.lG)(r, "TH");
          if (t.key.indexOf("Arrow") > -1 && P) {
            var R = er(P);
            if (R && Fe(e, t, n, P, R))
              return !0;
            var O = tr(P);
            if (O && nt(e, t, n, P, O))
              return !0;
          }
          if (fn(e, t, n) || hn(e, n, t) || Rt(e, n, t))
            return !0;
          var q = (0, C.W)(r);
          if (q) {
            if (N("⌘=", t)) {
              var B = q.querySelector(".vditor-ir__marker--heading");
              return B && B.textContent.trim().length > 1 && rt(e, B.textContent.substr(1)), t.preventDefault(), !0;
            }
            if (N("⌘-", t)) {
              var B = q.querySelector(".vditor-ir__marker--heading");
              return B && B.textContent.trim().length < 6 && rt(e, B.textContent.trim() + "# "), t.preventDefault(), !0;
            }
          }
          var D = (0, s.F9)(r);
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && n.toString() === "") {
            if (mn(e, n, t, d))
              return !0;
            if (D && D.previousElementSibling && D.tagName !== "UL" && D.tagName !== "OL" && (D.previousElementSibling.getAttribute("data-type") === "code-block" || D.previousElementSibling.getAttribute("data-type") === "math-block")) {
              var F = (0, M.im)(D, e.ir.element, n).start;
              if (F === 0 || F === 1 && D.innerText.startsWith(v.g.ZWSP))
                return n.selectNodeContents(D.previousElementSibling.querySelector(".vditor-ir__marker--pre code")), n.collapse(!1), j(n, e), D.textContent.trim().replace(v.g.ZWSP, "") === "" && (D.remove(), Pe(e)), t.preventDefault(), !0;
            }
            if (q) {
              var W = q.firstElementChild.textContent.length;
              (0, M.im)(q, e.ir.element).start === W && W !== 0 && (n.setStart(q.firstElementChild.firstChild, W - 1), n.collapse(!0), (0, M.Hc)(n));
            }
          }
          return (t.key === "ArrowUp" || t.key === "ArrowDown") && D && (D.querySelectorAll(".vditor-ir__node").forEach(function(Z) {
            Z.contains(r) || Z.classList.add("vditor-ir__node--hidden");
          }), yn(t, D, n)) ? !0 : (tn(n, t.key), D && st(D, e, t, n) ? (t.preventDefault(), !0) : !1);
        }, G = ee(971), ye = function(e, t) {
          e.querySelectorAll("[data-type=footnotes-link]").forEach(function(n) {
            for (var r = n.parentElement, i = r.nextSibling; i && i.textContent.startsWith("    "); ) {
              var a = i;
              a.childNodes.forEach(function(o) {
                r.append(o.cloneNode(!0));
              }), i = i.nextSibling, a.remove();
            }
            t && t(r);
          });
        }, ae = function(e, t) {
          var n, r = getSelection().getRangeAt(0).cloneRange(), i = r.startContainer;
          r.startContainer.nodeType !== 3 && r.startContainer.tagName === "DIV" && (i = r.startContainer.childNodes[r.startOffset - 1]);
          var a = (0, s.a1)(i, "data-block", "0");
          if (a && t && (t.inputType === "deleteContentBackward" || t.data === " ")) {
            for (
              var o = (0, M.im)(a, e.sv.element, r).start, d = !0, h = o - 1;
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
                  var E = ut(i, "code-block-open-marker");
                  if (E) {
                    E.textContent = u.textContent, Ee(e);
                    return;
                  }
                }
                if (u.getAttribute("data-type") === "code-block-open-marker") {
                  var E = ut(i, "code-block-close-marker", !1);
                  if (E) {
                    E.textContent = u.textContent, Ee(e);
                    return;
                  }
                }
              }
              var _ = (0, s.a1)(i, "data-type", "math-block-open-marker");
              if (_) {
                var P = _.nextElementSibling.nextElementSibling;
                P && P.getAttribute("data-type") === "math-block-close-marker" && (P.remove(), Ee(e));
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
          O = Xt(O, e), q ? a.innerHTML = O : a.outerHTML = O, e.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(D) {
            e.sv.element.insertAdjacentElement("beforeend", D.parentElement);
          }), ye(e.sv.element, function(D) {
            e.sv.element.insertAdjacentElement("beforeend", D);
          }), (0, M.ib)(e.sv.element, r), be(e), Ee(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, Ce = function(e, t) {
          var n, r, i, a, o;
          if (e.sv.composingLock = t.isComposing, t.isComposing || (t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l.yl)(t) && t.key !== "Escape"))
            return !1;
          var d = (0, M.zh)(e), h = d.startContainer;
          d.startContainer.nodeType !== 3 && d.startContainer.tagName === "DIV" && (h = d.startContainer.childNodes[d.startOffset - 1]);
          var u = (0, s.a1)(h, "data-type", "text"), E = (0, s.a1)(h, "data-type", "blockquote-marker");
          if (!E && d.startOffset === 0 && u && u.previousElementSibling && u.previousElementSibling.getAttribute("data-type") === "blockquote-marker" && (E = u.previousElementSibling), E && t.key === "Enter" && !(0, l.yl)(t) && !t.altKey && E.nextElementSibling.textContent.trim() === "" && (0, M.im)(E, e.sv.element, d).start === E.textContent.length)
            return ((n = E.previousElementSibling) === null || n === void 0 ? void 0 : n.getAttribute("data-type")) === "padding" && E.previousElementSibling.setAttribute("data-action", "enter-remove"), E.remove(), Ee(e), t.preventDefault(), !0;
          var _ = (0, s.a1)(h, "data-type", "li-marker"), P = (0, s.a1)(h, "data-type", "task-marker"), R = _;
          if (R || P && P.nextElementSibling.getAttribute("data-type") !== "task-marker" && (R = P), !R && d.startOffset === 0 && u && u.previousElementSibling && (u.previousElementSibling.getAttribute("data-type") === "li-marker" || u.previousElementSibling.getAttribute("data-type") === "task-marker") && (R = u.previousElementSibling), R) {
            var O = (0, M.im)(R, e.sv.element, d).start, q = R.getAttribute("data-type") === "task-marker", B = R;
            if (q && (B = R.previousElementSibling.previousElementSibling.previousElementSibling), O === R.textContent.length) {
              if (t.key === "Enter" && !(0, l.yl)(t) && !t.altKey && !t.shiftKey && R.nextElementSibling.textContent.trim() === "")
                return ((r = B.previousElementSibling) === null || r === void 0 ? void 0 : r.getAttribute("data-type")) === "padding" ? (B.previousElementSibling.remove(), ae(e)) : (q && (B.remove(), R.previousElementSibling.previousElementSibling.remove(), R.previousElementSibling.remove()), R.nextElementSibling.remove(), R.remove(), Ee(e)), t.preventDefault(), !0;
              if (t.key === "Tab")
                return t.shiftKey ? B.previousElementSibling.getAttribute("data-type") === "padding" && B.previousElementSibling.remove() : B.insertAdjacentHTML("beforebegin", '<span data-type="padding">'.concat(B.textContent.replace(/\S/g, " "), "</span>")), /^\d/.test(B.textContent) && (B.textContent = B.textContent.replace(/^\d{1,}/, "1"), d.selectNodeContents(R.firstChild), d.collapse(!1)), ae(e), t.preventDefault(), !0;
            }
          }
          if (Rt(e, d, t))
            return !0;
          var D = (0, s.a1)(h, "data-block", "0"), F = (0, C.S)(h, "SPAN");
          if (t.key === "Enter" && !(0, l.yl)(t) && !t.altKey && !t.shiftKey && D) {
            var W = !1, Z = D.textContent.match(/^\n+/);
            (0, M.im)(D, e.sv.element).start <= (Z ? Z[0].length : 0) && (W = !0);
            var le = `
`;
            if (F) {
              if (((i = F.previousElementSibling) === null || i === void 0 ? void 0 : i.getAttribute("data-action")) === "enter-remove")
                return F.previousElementSibling.remove(), Ee(e), t.preventDefault(), !0;
              le += qn(F);
            }
            return d.insertNode(document.createTextNode(le)), d.collapse(!1), D && D.textContent.trim() !== "" && !W ? ae(e) : Ee(e), t.preventDefault(), !0;
          }
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.altKey && !t.shiftKey) {
            if (F && ((a = F.previousElementSibling) === null || a === void 0 ? void 0 : a.getAttribute("data-type")) === "newline" && (0, M.im)(F, e.sv.element, d).start === 1 && // 飘号的处理需在 inputEvent 中，否则上下飘号对不齐
            F.getAttribute("data-type").indexOf("code-block-") === -1)
              return d.setStart(F, 0), d.extractContents(), F.textContent.trim() !== "" ? ae(e) : Ee(e), t.preventDefault(), !0;
            if (D && (0, M.im)(D, e.sv.element, d).start === 0 && D.previousElementSibling) {
              d.extractContents();
              var oe = D.previousElementSibling.lastElementChild;
              return oe.getAttribute("data-type") === "newline" && (oe.remove(), oe = D.previousElementSibling.lastElementChild), oe.getAttribute("data-type") !== "newline" && (oe.insertAdjacentHTML("afterend", D.innerHTML), D.remove()), D.textContent.trim() !== "" && !(!((o = D.previousElementSibling) === null || o === void 0) && o.querySelector('[data-type="code-block-open-marker"]')) ? ae(e) : (oe.getAttribute("data-type") !== "newline" && (d.selectNodeContents(oe.lastChild), d.collapse(!1)), Ee(e)), t.preventDefault(), !0;
            }
          }
          return !1;
        }, X = ee(652), pe = function(e) {
          e.options.theme === "dark" ? e.element.classList.add("vditor--dark") : e.element.classList.remove("vditor--dark");
        }, ke = function(e) {
          e.element.innerHTML = "", e.element.classList.add("vditor"), e.options.rtl && e.element.setAttribute("dir", "rtl"), pe(e), (0, X.Z)(e.options.preview.theme.current, e.options.preview.theme.path), typeof e.options.height == "number" ? e.element.style.height = e.options.height + "px" : e.element.style.height = e.options.height, typeof e.options.minHeight == "number" && (e.element.style.minHeight = e.options.minHeight + "px"), typeof e.options.width == "number" ? e.element.style.width = e.options.width + "px" : e.element.style.width = e.options.width, e.element.appendChild(e.toolbar.element);
          var t = document.createElement("div");
          if (t.className = "vditor-content", e.options.outline.position === "left" && t.appendChild(e.outline.element), t.appendChild(e.wysiwyg.element.parentElement), t.appendChild(e.sv.element), t.appendChild(e.ir.element.parentElement), t.appendChild(e.preview.element), e.toolbar.elements.devtools && t.appendChild(e.devtools.element), e.options.outline.position === "right" && (e.outline.element.classList.add("vditor-outline--right"), t.appendChild(e.outline.element)), e.upload && t.appendChild(e.upload.element), e.options.resize.enable && t.appendChild(e.resize.element), t.appendChild(e.hint.element), t.appendChild(e.tip.element), e.element.appendChild(t), t.addEventListener("click", function() {
            S(e, ["subToolbar"]);
          }), e.toolbar.elements.export && e.element.insertAdjacentHTML("beforeend", '<iframe id="vditorExportIframe" style="width: 100%;height: 0;border: 0"></iframe>'), We(e, e.options.mode, On(e)), document.execCommand("DefaultParagraphSeparator", !1, "p"), navigator.userAgent.indexOf("iPhone") > -1 && typeof window.visualViewport < "u") {
            var n = !1, r = function(i) {
              n || (n = !0, requestAnimationFrame(function() {
                n = !1;
                var a = e.toolbar.element;
                a.style.transform = "none", a.getBoundingClientRect().top < 0 && (a.style.transform = "translate(0, ".concat(-a.getBoundingClientRect().top, "px)"));
              }));
            };
            window.visualViewport.addEventListener("scroll", r), window.visualViewport.addEventListener("resize", r);
          }
        }, xe = function(e) {
          var t = window.innerWidth <= v.g.MOBILE_WIDTH ? 10 : 35;
          if (e.wysiwyg.element.parentElement.style.display !== "none") {
            var n = (e.wysiwyg.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2;
            e.wysiwyg.element.style.padding = "10px ".concat(Math.max(t, n), "px");
          }
          if (e.ir.element.parentElement.style.display !== "none") {
            var n = (e.ir.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2;
            e.ir.element.style.padding = "10px ".concat(Math.max(t, n), "px");
          }
          e.preview.element.style.display !== "block" ? e.toolbar.element.style.paddingLeft = Math.max(5, parseInt(e[e.currentMode].element.style.paddingLeft || "0", 10) + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0)) + "px" : e.toolbar.element.style.paddingLeft = 5 + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0) + "px";
        }, lt = function(e) {
          if (e.options.typewriterMode) {
            var t = window.innerHeight;
            typeof e.options.height == "number" ? (t = e.options.height, typeof e.options.minHeight == "number" && (t = Math.max(t, e.options.minHeight)), t = Math.min(window.innerHeight, t)) : t = e.element.clientHeight, e.element.classList.contains("vditor--fullscreen") && (t = window.innerHeight), e[e.currentMode].element.style.setProperty("--editor-bottom", (t - e.toolbar.element.offsetHeight) / 2 + "px");
          }
        }, Vt;
        function Wt() {
          window.removeEventListener("resize", Vt);
        }
        var On = function(e) {
          lt(e), Wt(), window.addEventListener("resize", Vt = function() {
            xe(e), lt(e);
          });
          var t = (0, l.pK)() && localStorage.getItem(e.options.cache.id);
          return (!e.options.cache.enable || !t) && (e.options.value ? t = e.options.value : e.originalInnerHTML ? t = e.lute.HTML2Md(e.originalInnerHTML) : e.options.cache.enable || (t = "")), t || "";
        }, Qe = function(e) {
          clearTimeout(e[e.currentMode].hlToolbarTimeoutId), e[e.currentMode].hlToolbarTimeoutId = window.setTimeout(function() {
            if (e[e.currentMode].element.getAttribute("contenteditable") !== "false" && (0, M.Gb)(e[e.currentMode].element)) {
              g(e.toolbar.elements, v.g.EDIT_TOOLBARS), m(e.toolbar.elements, v.g.EDIT_TOOLBARS);
              var t = (0, M.zh)(e), n = t.startContainer;
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
              var E = (0, s.a1)(n, "data-type", "code-block");
              E && (f(e.toolbar.elements, [
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
              var _ = (0, s.a1)(n, "data-type", "code");
              _ && (f(e.toolbar.elements, [
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
              var P = (0, s.a1)(n, "data-type", "table");
              P && f(e.toolbar.elements, [
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
        }, ue = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && e.hint.render(e), clearTimeout(e.wysiwyg.afterRenderTimeoutId), e.wysiwyg.afterRenderTimeoutId = window.setTimeout(function() {
            if (!e.wysiwyg.composingLock) {
              var n = H(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, Nn = function(e) {
          for (var t = e.previousSibling; t; ) {
            if (t.nodeType !== 3 && t.tagName === "A" && !t.previousSibling && t.innerHTML.replace(v.g.ZWSP, "") === "" && t.nextSibling)
              return t;
            t = t.previousSibling;
          }
          return !1;
        }, Rn = function(e) {
          for (var t = e.startContainer.nextSibling; t && t.textContent === ""; )
            t = t.nextSibling;
          return !!(t && t.nodeType !== 3 && (t.tagName === "CODE" || t.getAttribute("data-type") === "math-inline" || t.getAttribute("data-type") === "html-entity" || t.getAttribute("data-type") === "html-inline"));
        }, Kt = function(e) {
          for (var t = "", n = e.nextSibling; n; )
            n.nodeType === 3 ? t += n.textContent : t += n.outerHTML, n = n.nextSibling;
          return t;
        }, qt = function(e) {
          for (var t = "", n = e.previousSibling; n; )
            n.nodeType === 3 ? t = n.textContent + t : t = n.outerHTML + t, n = n.previousSibling;
          return t;
        }, Pn = function(e) {
          for (var t = e; t && !t.nextSibling; )
            t = t.parentElement;
          return t.nextSibling;
        }, In = function(e) {
          var t = qt(e.startContainer), n = Kt(e.startContainer), r = e.startContainer.textContent, i = e.startOffset, a = "", o = "";
          return (r.substr(0, i) !== "" && r.substr(0, i) !== v.g.ZWSP || t) && (a = "".concat(t).concat(r.substr(0, i))), (r.substr(i) !== "" && r.substr(i) !== v.g.ZWSP || n) && (o = "".concat(r.substr(i)).concat(n)), {
            afterHTML: o,
            beforeHTML: a
          };
        }, Gt = function(e, t) {
          Array.from(e.wysiwyg.element.childNodes).find(function(n) {
            if (n.nodeType === 3) {
              var r = document.createElement("p");
              r.setAttribute("data-block", "0"), r.textContent = n.textContent;
              var i = t.startContainer.nodeType === 3 ? t.startOffset : n.textContent.length;
              return n.parentNode.insertBefore(r, n), n.remove(), t.setStart(r.firstChild, Math.min(r.firstChild.textContent.length, i)), t.collapse(!0), (0, M.Hc)(t), !0;
            } else if (!n.getAttribute("data-block"))
              return n.tagName === "P" ? n.remove() : (n.tagName === "DIV" ? (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.innerHTML, "</p>")) : n.tagName === "BR" ? n.outerHTML = '<p data-block="0">'.concat(n.outerHTML, "<wbr></p>") : (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.outerHTML, "</p>")), (0, M.ib)(e.wysiwyg.element, t), t = getSelection().getRangeAt(0)), !0;
          });
        }, ct = function(e, t) {
          var n = (0, M.zh)(e), r = (0, s.F9)(n.startContainer);
          r || (r = n.startContainer.childNodes[n.startOffset]), !r && e.wysiwyg.element.children.length === 0 && (r = e.wysiwyg.element), r && !r.classList.contains("vditor-wysiwyg__block") && (n.insertNode(document.createElement("wbr")), r.innerHTML.trim() === "<wbr>" && (r.innerHTML = "<wbr><br>"), r.tagName === "BLOCKQUOTE" || r.classList.contains("vditor-reset") ? r.innerHTML = "<".concat(t, ' data-block="0">').concat(r.innerHTML.trim(), "</").concat(t, ">") : r.outerHTML = "<".concat(t, ' data-block="0">').concat(r.innerHTML.trim(), "</").concat(t, ">"), (0, M.ib)(e.wysiwyg.element, n), Ne(e));
        }, Et = function(e) {
          var t = getSelection().getRangeAt(0), n = (0, s.F9)(t.startContainer);
          n || (n = t.startContainer.childNodes[t.startOffset]), n && (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.innerHTML, "</p>"), (0, M.ib)(e.wysiwyg.element, t)), e.wysiwyg.popover.style.display = "none";
        }, $e = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e.previousElementSibling, i = r.ownerDocument.createRange();
          r.tagName === "CODE" ? (r.style.display = "inline-block", n ? i.setStart(r.firstChild, 1) : i.selectNodeContents(r)) : (r.style.display = "block", r.firstChild.firstChild || r.firstChild.appendChild(document.createTextNode("")), i.selectNodeContents(r.firstChild)), n ? i.collapse(!0) : i.collapse(!1), (0, M.Hc)(i), !e.firstElementChild.classList.contains("language-mindmap") && be(t);
        }, jn = function(e, t) {
          if (e.wysiwyg.composingLock = t.isComposing, t.isComposing)
            return !1;
          t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t);
          var n = (0, M.zh)(e), r = n.startContainer;
          if (!$t(t, e, r) || (en(n, e, t), gn(n), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l.yl)(t) && t.key !== "Escape" && t.key !== "Delete"))
            return !1;
          var i = (0, s.F9)(r), a = (0, s.lG)(r, "P");
          if (on(t, e, a, n) || an(n, e, a, t) || fn(e, t, n))
            return !0;
          var o = (0, s.fb)(r, "vditor-wysiwyg__block");
          if (o) {
            if (t.key === "Escape" && o.children.length === 2)
              return e.wysiwyg.popover.style.display = "none", o.firstElementChild.style.display = "none", e.wysiwyg.element.blur(), t.preventDefault(), !0;
            if (!(0, l.yl)(t) && !t.shiftKey && t.altKey && t.key === "Enter" && o.getAttribute("data-type") === "code-block") {
              var d = e.wysiwyg.popover.querySelector(".vditor-input");
              return d.focus(), d.select(), t.preventDefault(), !0;
            }
            if (o.getAttribute("data-block") === "0" && (dn(e, t, o.firstElementChild, n) || nt(e, t, n, o.firstElementChild, o) || o.getAttribute("data-type") !== "yaml-front-matter" && Fe(e, t, n, o.firstElementChild, o)))
              return !0;
          }
          if (pn(e, n, t, a))
            return !0;
          var h = (0, s.E2)(r, "BLOCKQUOTE");
          if (h && !t.shiftKey && t.altKey && t.key === "Enter") {
            (0, l.yl)(t) ? n.setStartBefore(h) : n.setStartAfter(h), (0, M.Hc)(n);
            var u = document.createElement("p");
            return u.setAttribute("data-block", "0"), u.innerHTML = `
`, n.insertNode(u), n.collapse(!0), (0, M.Hc)(n), ue(e), be(e), t.preventDefault(), !0;
          }
          var E = (0, C.W)(r);
          if (E) {
            if (E.tagName === "H6" && r.textContent.length === n.startOffset && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && t.key === "Enter") {
              var _ = document.createElement("p");
              return _.textContent = `
`, _.setAttribute("data-block", "0"), r.parentElement.insertAdjacentElement("afterend", _), n.setStart(_, 0), (0, M.Hc)(n), ue(e), be(e), t.preventDefault(), !0;
            }
            if (N("⌘=", t)) {
              var P = parseInt(E.tagName.substr(1), 10) - 1;
              return P > 0 && (ct(e, "h".concat(P)), ue(e)), t.preventDefault(), !0;
            }
            if (N("⌘-", t)) {
              var P = parseInt(E.tagName.substr(1), 10) + 1;
              return P < 7 && (ct(e, "h".concat(P)), ue(e)), t.preventDefault(), !0;
            }
            t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && E.textContent.length === 1 && Et(e);
          }
          if (hn(e, n, t))
            return !0;
          if (t.altKey && t.key === "Enter" && !(0, l.yl)(t) && !t.shiftKey) {
            var R = (0, s.lG)(r, "A"), O = (0, s.a1)(r, "data-type", "link-ref"), q = (0, s.a1)(r, "data-type", "footnotes-ref");
            if (R || O || q || E && E.tagName.length === 2) {
              var B = e.wysiwyg.popover.querySelector("input");
              B.focus(), B.select();
            }
          }
          if (Me(e, t))
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
          if (Rt(e, n, t))
            return !0;
          if (!(0, l.yl)(t) && t.shiftKey && !t.altKey && t.key === "Enter" && r.parentElement.tagName !== "LI" && r.parentElement.tagName !== "P")
            return ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r.parentElement.tagName) ? n.insertNode(document.createTextNode(`
` + v.g.ZWSP)) : n.insertNode(document.createTextNode(`
`)), n.collapse(!1), (0, M.Hc)(n), ue(e), be(e), t.preventDefault(), !0;
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey && n.toString() === "") {
            if (mn(e, n, t, a))
              return !0;
            if (i) {
              if (i.previousElementSibling && i.previousElementSibling.classList.contains("vditor-wysiwyg__block") && i.previousElementSibling.getAttribute("data-block") === "0" && i.tagName !== "UL" && i.tagName !== "OL") {
                var F = (0, M.im)(i, e.wysiwyg.element, n).start;
                if (F === 0 && n.startOffset === 0 || // https://github.com/Vanessa219/vditor/issues/894
                F === 1 && i.innerText.startsWith(v.g.ZWSP))
                  return $e(i.previousElementSibling.lastElementChild, e, !1), i.innerHTML.trim().replace(v.g.ZWSP, "") === "" && (i.remove(), ue(e)), t.preventDefault(), !0;
              }
              var W = n.startOffset;
              if (n.toString() === "" && r.nodeType === 3 && r.textContent.charAt(W - 2) === `
` && r.textContent.charAt(W - 1) !== v.g.ZWSP && ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r.parentElement.tagName))
                return r.textContent = r.textContent.substring(0, W - 1) + v.g.ZWSP, n.setStart(r, W), n.collapse(!0), ue(e), t.preventDefault(), !0;
              r.textContent === v.g.ZWSP && n.startOffset === 1 && !r.previousSibling && Rn(n) && (r.textContent = ""), i.querySelectorAll("span.vditor-wysiwyg__block[data-type='math-inline']").forEach(function(le) {
                le.firstElementChild.style.display = "inline", le.lastElementChild.style.display = "none";
              }), i.querySelectorAll("span.vditor-wysiwyg__block[data-type='html-entity']").forEach(function(le) {
                le.firstElementChild.style.display = "inline", le.lastElementChild.style.display = "none";
              });
            }
          }
          if ((0, l.vU)() && n.startOffset === 1 && r.textContent.indexOf(v.g.ZWSP) > -1 && r.previousSibling && r.previousSibling.nodeType !== 3 && r.previousSibling.tagName === "CODE" && (t.key === "Backspace" || t.key === "ArrowLeft"))
            return n.selectNodeContents(r.previousSibling), n.collapse(!1), t.preventDefault(), !0;
          if (yn(t, i, n))
            return t.preventDefault(), !0;
          if (tn(n, t.key), t.key === "ArrowDown") {
            var Z = r.nextSibling;
            Z && Z.nodeType !== 3 && Z.getAttribute("data-type") === "math-inline" && n.setStartAfter(Z);
          }
          return i && st(i, e, t, n) ? (t.preventDefault(), !0) : !1;
        }, Me = function(e, t) {
          if (N("⇧⌘X", t)) {
            var n = e.wysiwyg.popover.querySelector('[data-type="remove"]');
            return n && n.click(), t.preventDefault(), !0;
          }
        }, Ve = function(e) {
          clearTimeout(e.wysiwyg.hlToolbarTimeoutId), e.wysiwyg.hlToolbarTimeoutId = window.setTimeout(function() {
            if (e.wysiwyg.element.getAttribute("contenteditable") !== "false" && (0, M.Gb)(e.wysiwyg.element)) {
              g(e.toolbar.elements, v.g.EDIT_TOOLBARS), m(e.toolbar.elements, v.g.EDIT_TOOLBARS);
              var t = getSelection().getRangeAt(0), n = t.startContainer;
              t.startContainer.nodeType === 3 ? n = t.startContainer.parentElement : n = n.childNodes[t.startOffset >= n.childNodes.length ? n.childNodes.length - 1 : t.startOffset];
              var r = (0, s.a1)(n, "data-type", "footnotes-block");
              if (r) {
                e.wysiwyg.popover.innerHTML = "", De(r, e), He(e, r);
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
              var u = (0, s.lG)(n, "TABLE"), E = (0, C.W)(n);
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
              ]), p(e.toolbar.elements, ["inline-code"])) : E ? (f(e.toolbar.elements, ["bold"]), p(e.toolbar.elements, ["headings"])) : u && f(e.toolbar.elements, ["table"]);
              var _ = (0, s.fb)(n, "vditor-toc");
              if (_) {
                e.wysiwyg.popover.innerHTML = "", De(_, e), He(e, _);
                return;
              }
              var P = (0, C.S)(n, "BLOCKQUOTE");
              if (P && (e.wysiwyg.popover.innerHTML = "", qe(t, P, e), Ge(t, P, e), De(P, e), He(e, P)), i && (e.wysiwyg.popover.innerHTML = "", qe(t, i, e), Ge(t, i, e), De(i, e), He(e, i)), u) {
                e.options.lang, e.options, e.wysiwyg.popover.innerHTML = "";
                var R = function() {
                  var K = u.rows.length, te = u.rows[0].cells.length, Ke = parseInt(we.value, 10) || K, je = parseInt(Ae.value, 10) || te;
                  if (!(Ke === K && te === je)) {
                    if (te !== je)
                      for (var _n = je - te, Je = 0; Je < u.rows.length; Je++)
                        if (_n > 0)
                          for (var kn = 0; kn < _n; kn++)
                            Je === 0 ? u.rows[Je].lastElementChild.insertAdjacentHTML("afterend", "<th> </th>") : u.rows[Je].lastElementChild.insertAdjacentHTML("afterend", "<td> </td>");
                        else
                          for (var jt = te - 1; jt >= je; jt--)
                            u.rows[Je].cells[jt].remove();
                    if (K !== Ke) {
                      var An = Ke - K;
                      if (An > 0) {
                        for (var Bt = "<tr>", Ye = 0; Ye < je; Ye++)
                          Bt += "<td> </td>";
                        for (var xn = 0; xn < An; xn++)
                          u.querySelector("tbody") ? u.querySelector("tbody").insertAdjacentHTML("beforeend", Bt) : u.querySelector("thead").insertAdjacentHTML("afterend", Bt + "</tr>");
                      } else
                        for (var Ye = K - 1; Ye >= Ke; Ye--)
                          u.rows[Ye].remove(), u.rows.length === 1 && u.querySelector("tbody").remove();
                    }
                    typeof e.options.input == "function" && e.options.input(H(e));
                  }
                }, O = function(K) {
                  ht(u, K), K === "right" ? (F.classList.remove("vditor-icon--current"), W.classList.remove("vditor-icon--current"), Z.classList.add("vditor-icon--current")) : K === "center" ? (F.classList.remove("vditor-icon--current"), Z.classList.remove("vditor-icon--current"), W.classList.add("vditor-icon--current")) : (W.classList.remove("vditor-icon--current"), Z.classList.remove("vditor-icon--current"), F.classList.add("vditor-icon--current")), (0, M.Hc)(t), ue(e);
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
                var le = document.createElement("button");
                le.setAttribute("type", "button"), le.setAttribute("aria-label", window.VditorI18n.insertRowBelow + "<" + (0, l.ns)("⌘=") + ">"), le.setAttribute("data-type", "insertRow"), le.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-row"></use></svg>', le.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", le.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && sn(e, t, te);
                };
                var oe = document.createElement("button");
                oe.setAttribute("type", "button"), oe.setAttribute("aria-label", window.VditorI18n.insertRowAbove + "<" + (0, l.ns)("⇧⌘F") + ">"), oe.setAttribute("data-type", "insertRow"), oe.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-rowb"></use></svg>', oe.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", oe.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && ln(e, t, te);
                };
                var fe = document.createElement("button");
                fe.setAttribute("type", "button"), fe.setAttribute("aria-label", window.VditorI18n.insertColumnRight + "<" + (0, l.ns)("⇧⌘=") + ">"), fe.setAttribute("data-type", "insertColumn"), fe.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-column"></use></svg>', fe.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", fe.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && mt(e, u, te);
                };
                var Te = document.createElement("button");
                Te.setAttribute("type", "button"), Te.setAttribute("aria-label", window.VditorI18n.insertColumnLeft + "<" + (0, l.ns)("⇧⌘G") + ">"), Te.setAttribute("data-type", "insertColumn"), Te.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-columnb"></use></svg>', Te.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Te.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && mt(e, u, te, "beforebegin");
                };
                var Le = document.createElement("button");
                Le.setAttribute("type", "button"), Le.setAttribute("aria-label", window.VditorI18n["delete-row"] + "<" + (0, l.ns)("⌘-") + ">"), Le.setAttribute("data-type", "deleteRow"), Le.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-row"></use></svg>', Le.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Le.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && cn(e, t, te);
                };
                var _e = document.createElement("button");
                _e.setAttribute("type", "button"), _e.setAttribute("aria-label", window.VditorI18n["delete-column"] + "<" + (0, l.ns)("⇧⌘-") + ">"), _e.setAttribute("data-type", "deleteColumn"), _e.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-column"></use></svg>', _e.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", _e.onclick = function() {
                  var K = getSelection().getRangeAt(0).startContainer, te = (0, s.lG)(K, "TD") || (0, s.lG)(K, "TH");
                  te && un(e, t, u, te);
                };
                var Y = document.createElement("span");
                Y.setAttribute("aria-label", window.VditorI18n.row), Y.className = "vditor-tooltipped vditor-tooltipped__n";
                var we = document.createElement("input");
                Y.appendChild(we), we.type = "number", we.min = "1", we.className = "vditor-input", we.style.width = "42px", we.style.textAlign = "center", we.setAttribute("placeholder", window.VditorI18n.row), we.value = u.rows.length.toString(), we.oninput = function() {
                  R();
                }, we.onkeydown = function(K) {
                  if (!K.isComposing) {
                    if (K.key === "Tab") {
                      Ae.focus(), Ae.select(), K.preventDefault();
                      return;
                    }
                    Me(e, K) || Re(K, t);
                  }
                };
                var bt = document.createElement("span");
                bt.setAttribute("aria-label", window.VditorI18n.column), bt.className = "vditor-tooltipped vditor-tooltipped__n";
                var Ae = document.createElement("input");
                bt.appendChild(Ae), Ae.type = "number", Ae.min = "1", Ae.className = "vditor-input", Ae.style.width = "42px", Ae.style.textAlign = "center", Ae.setAttribute("placeholder", window.VditorI18n.column), Ae.value = u.rows[0].cells.length.toString(), Ae.oninput = function() {
                  R();
                }, Ae.onkeydown = function(K) {
                  if (!K.isComposing) {
                    if (K.key === "Tab") {
                      we.focus(), we.select(), K.preventDefault();
                      return;
                    }
                    Me(e, K) || Re(K, t);
                  }
                }, qe(t, u, e), Ge(t, u, e), De(u, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", F), e.wysiwyg.popover.insertAdjacentElement("beforeend", W), e.wysiwyg.popover.insertAdjacentElement("beforeend", Z), e.wysiwyg.popover.insertAdjacentElement("beforeend", oe), e.wysiwyg.popover.insertAdjacentElement("beforeend", le), e.wysiwyg.popover.insertAdjacentElement("beforeend", Te), e.wysiwyg.popover.insertAdjacentElement("beforeend", fe), e.wysiwyg.popover.insertAdjacentElement("beforeend", Le), e.wysiwyg.popover.insertAdjacentElement("beforeend", _e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Y), e.wysiwyg.popover.insertAdjacentHTML("beforeend", " x "), e.wysiwyg.popover.insertAdjacentElement("beforeend", bt), He(e, u);
              }
              var It = (0, s.a1)(n, "data-type", "link-ref");
              It && zt(e, It, t);
              var Ze = (0, s.a1)(n, "data-type", "footnotes-ref");
              if (Ze) {
                e.options.lang, e.options, e.wysiwyg.popover.innerHTML = "";
                var Y = document.createElement("span");
                Y.setAttribute("aria-label", window.VditorI18n.footnoteRef + "<" + (0, l.ns)("⌥Enter") + ">"), Y.className = "vditor-tooltipped vditor-tooltipped__n";
                var Ie = document.createElement("input");
                Y.appendChild(Ie), Ie.className = "vditor-input", Ie.setAttribute("placeholder", window.VditorI18n.footnoteRef + "<" + (0, l.ns)("⌥Enter") + ">"), Ie.style.width = "120px", Ie.value = Ze.getAttribute("data-footnotes-label"), Ie.oninput = function() {
                  Ie.value.trim() !== "" && Ze.setAttribute("data-footnotes-label", Ie.value), typeof e.options.input == "function" && e.options.input(H(e));
                }, Ie.onkeydown = function(te) {
                  te.isComposing || Me(e, te) || Re(te, t);
                }, De(Ze, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Y), He(e, Ze);
              }
              var Se = (0, s.fb)(n, "vditor-wysiwyg__block"), Mn = Se ? Se.getAttribute("data-type").indexOf("block") > -1 : !1;
              if (e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(K) {
                if (!Se || Se && Mn && !Se.contains(K)) {
                  var te = K.previousElementSibling;
                  te.style.display = "none";
                }
              }), Se && Mn) {
                if (e.wysiwyg.popover.innerHTML = "", qe(t, Se, e), Ge(t, Se, e), De(Se, e), Se.getAttribute("data-type") === "code-block") {
                  var wt = document.createElement("span");
                  wt.setAttribute("aria-label", window.VditorI18n.language + "<" + (0, l.ns)("⌥Enter") + ">"), wt.className = "vditor-tooltipped vditor-tooltipped__n";
                  var Oe = document.createElement("input");
                  wt.appendChild(Oe);
                  var it = Se.firstElementChild.firstElementChild;
                  Oe.className = "vditor-input", Oe.setAttribute("placeholder", window.VditorI18n.language + "<" + (0, l.ns)("⌥Enter") + ">"), Oe.value = it.className.indexOf("language-") > -1 ? it.className.split("-")[1].split(" ")[0] : "", Oe.oninput = function(K) {
                    Oe.value.trim() !== "" ? it.className = "language-".concat(Oe.value) : (it.className = "", e.hint.recentLanguage = ""), Se.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (Se.lastElementChild.innerHTML = Se.firstElementChild.innerHTML, ie(Se.lastElementChild, e)), ue(e), K.detail === 1 && (t.setStart(it.firstChild, 0), t.collapse(!0), (0, M.Hc)(t));
                  }, Oe.onkeydown = function(K) {
                    if (!K.isComposing && !Me(e, K)) {
                      if (K.key === "Escape" && e.hint.element.style.display === "block") {
                        e.hint.element.style.display = "none", K.preventDefault();
                        return;
                      }
                      e.hint.select(K, e), Re(K, t);
                    }
                  }, Oe.onkeyup = function(K) {
                    if (!(K.isComposing || K.key === "Enter" || K.key === "ArrowUp" || K.key === "Escape" || K.key === "ArrowDown")) {
                      var te = [], Ke = Oe.value.substring(0, Oe.selectionStart);
                      (e.options.preview.hljs.langs || v.g.CODE_LANGUAGES).forEach(function(je) {
                        je.indexOf(Ke.toLowerCase()) > -1 && te.push({
                          html: je,
                          value: je
                        });
                      }), e.hint.genHTML(te, Ke, e), K.preventDefault();
                    }
                  }, e.wysiwyg.popover.insertAdjacentElement("beforeend", wt);
                }
                He(e, Se);
              } else
                Se = void 0;
              if (E) {
                e.wysiwyg.popover.innerHTML = "";
                var Y = document.createElement("span");
                Y.setAttribute("aria-label", "ID<" + (0, l.ns)("⌥Enter") + ">"), Y.className = "vditor-tooltipped vditor-tooltipped__n";
                var Ue = document.createElement("input");
                Y.appendChild(Ue), Ue.className = "vditor-input", Ue.setAttribute("placeholder", "ID<" + (0, l.ns)("⌥Enter") + ">"), Ue.style.width = "120px", Ue.value = E.getAttribute("data-id") || "", Ue.oninput = function() {
                  E.setAttribute("data-id", Ue.value), typeof e.options.input == "function" && e.options.input(H(e));
                }, Ue.onkeydown = function(te) {
                  te.isComposing || Me(e, te) || Re(te, t);
                }, qe(t, E, e), Ge(t, E, e), De(E, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Y), He(e, E);
              }
              if (h && St(e, h, t), !P && !i && !u && !Se && !h && !It && !Ze && !E && !_) {
                var Xe = (0, s.a1)(n, "data-block", "0");
                Xe && Xe.parentElement.isEqualNode(e.wysiwyg.element) ? (e.wysiwyg.popover.innerHTML = "", qe(t, Xe, e), Ge(t, Xe, e), De(Xe, e), He(e, Xe)) : e.wysiwyg.popover.style.display = "none";
              }
              e.wysiwyg.element.querySelectorAll('span[data-type="backslash"] > span').forEach(function(K) {
                K.style.display = "none";
              });
              var Tn = (0, s.a1)(t.startContainer, "data-type", "backslash");
              Tn && (Tn.querySelector("span").style.display = "inline");
            }
          }, 200);
        }, He = function(e, t) {
          var n = t, r = (0, s.lG)(t, "TABLE");
          r && (n = r), e.wysiwyg.popover.style.left = "0", e.wysiwyg.popover.style.display = "block", e.wysiwyg.popover.style.top = Math.max(-8, n.offsetTop - 21 - e.wysiwyg.element.scrollTop) + "px", e.wysiwyg.popover.style.left = Math.min(n.offsetLeft, e.wysiwyg.element.clientWidth - e.wysiwyg.popover.clientWidth) + "px", e.wysiwyg.popover.setAttribute("data-top", (n.offsetTop - 21).toString());
        }, zt = function(e, t, n) {
          n === void 0 && (n = getSelection().getRangeAt(0)), e.wysiwyg.popover.innerHTML = "";
          var r = function() {
            a.value.trim() !== "" && (t.tagName === "IMG" ? t.setAttribute("alt", a.value) : t.textContent = a.value), d.value.trim() !== "" && t.setAttribute("data-link-label", d.value), typeof e.options.input == "function" && e.options.input(H(e));
          }, i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), a.style.width = "120px", a.value = t.getAttribute("alt") || t.textContent, a.oninput = function() {
            r();
          }, a.onkeydown = function(h) {
            Me(e, h) || Re(h, n) || et(e, t, h, d);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.linkRef), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          o.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.linkRef), d.value = t.getAttribute("data-link-label"), d.oninput = function() {
            r();
          }, d.onkeydown = function(h) {
            Me(e, h) || Re(h, n) || et(e, t, h, a);
          }, De(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", i), e.wysiwyg.popover.insertAdjacentElement("beforeend", o), He(e, t);
        }, qe = function(e, t, n) {
          var r = t.previousElementSibling;
          if (!(!r || !t.parentElement.isEqualNode(n.wysiwyg.element) && t.tagName !== "LI")) {
            var i = document.createElement("button");
            i.setAttribute("type", "button"), i.setAttribute("data-type", "up"), i.setAttribute("aria-label", window.VditorI18n.up + "<" + (0, l.ns)("⇧⌘U") + ">"), i.innerHTML = '<svg><use xlink:href="#vditor-icon-up"></use></svg>', i.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i.onclick = function() {
              e.insertNode(document.createElement("wbr")), r.insertAdjacentElement("beforebegin", t), (0, M.ib)(n.wysiwyg.element, e), ue(n), Ve(n), be(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", i);
          }
        }, Ge = function(e, t, n) {
          var r = t.nextElementSibling;
          if (!(!r || !t.parentElement.isEqualNode(n.wysiwyg.element) && t.tagName !== "LI")) {
            var i = document.createElement("button");
            i.setAttribute("type", "button"), i.setAttribute("data-type", "down"), i.setAttribute("aria-label", window.VditorI18n.down + "<" + (0, l.ns)("⇧⌘D") + ">"), i.innerHTML = '<svg><use xlink:href="#vditor-icon-down"></use></svg>', i.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i.onclick = function() {
              e.insertNode(document.createElement("wbr")), r.insertAdjacentElement("afterend", t), (0, M.ib)(n.wysiwyg.element, e), ue(n), Ve(n), be(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", i);
          }
        }, De = function(e, t) {
          var n = document.createElement("button");
          n.setAttribute("type", "button"), n.setAttribute("data-type", "remove"), n.setAttribute("aria-label", window.VditorI18n.remove + "<" + (0, l.ns)("⇧⌘X") + ">"), n.innerHTML = '<svg><use xlink:href="#vditor-icon-trashcan"></use></svg>', n.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", n.onclick = function() {
            var r = (0, M.zh)(t);
            r.setStartAfter(e), (0, M.Hc)(r), e.remove(), ue(t), Ve(t), ["H1", "H2", "H3", "H4", "H5", "H6"].includes(e.tagName) && Ne(t);
          }, t.wysiwyg.popover.insertAdjacentElement("beforeend", n);
        }, et = function(e, t, n, r) {
          if (!n.isComposing) {
            if (n.key === "Tab") {
              r.focus(), r.select(), n.preventDefault();
              return;
            }
            if (!(0, l.yl)(n) && !n.shiftKey && n.altKey && n.key === "Enter") {
              var i = (0, M.zh)(e);
              t.insertAdjacentHTML("afterend", v.g.ZWSP), i.setStartAfter(t.nextSibling), i.collapse(!0), (0, M.Hc)(i), n.preventDefault();
            }
          }
        }, St = function(e, t, n) {
          e.wysiwyg.popover.innerHTML = "";
          var r = function() {
            a.value.trim() !== "" && (t.innerHTML = a.value), t.setAttribute("href", d.value), t.setAttribute("title", u.value), ue(e);
          };
          t.querySelectorAll("[data-marker]").forEach(function(E) {
            E.removeAttribute("data-marker");
          });
          var i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), a.style.width = "120px", a.value = t.innerHTML || "", a.oninput = function() {
            r();
          }, a.onkeydown = function(E) {
            Me(e, E) || Re(E, n) || et(e, t, E, d);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.link), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          o.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.link), d.value = t.getAttribute("href") || "", d.oninput = function() {
            r();
          }, d.onkeydown = function(E) {
            Me(e, E) || Re(E, n) || et(e, t, E, u);
          };
          var h = document.createElement("span");
          h.setAttribute("aria-label", window.VditorI18n.tooltipText), h.className = "vditor-tooltipped vditor-tooltipped__n";
          var u = document.createElement("input");
          h.appendChild(u), u.className = "vditor-input", u.setAttribute("placeholder", window.VditorI18n.tooltipText), u.style.width = "60px", u.value = t.getAttribute("title") || "", u.oninput = function() {
            r();
          }, u.onkeydown = function(E) {
            Me(e, E) || Re(E, n) || et(e, t, E, a);
          }, De(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", i), e.wysiwyg.popover.insertAdjacentElement("beforeend", o), e.wysiwyg.popover.insertAdjacentElement("beforeend", h), He(e, t);
        }, Bn = function(e, t) {
          var n = e.target;
          t.wysiwyg.popover.innerHTML = "";
          var r = function() {
            n.setAttribute("src", a.value), n.setAttribute("alt", d.value), n.setAttribute("title", u.value), typeof t.options.input == "function" && t.options.input(H(t));
          }, i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.imageURL), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.imageURL), a.value = n.getAttribute("src") || "", a.oninput = function() {
            r();
          }, a.onkeydown = function(E) {
            Me(t, E);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.alternateText), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          o.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.alternateText), d.style.width = "52px", d.value = n.getAttribute("alt") || "", d.oninput = function() {
            r();
          }, d.onkeydown = function(E) {
            Me(t, E);
          };
          var h = document.createElement("span");
          h.setAttribute("aria-label", window.VditorI18n.title), h.className = "vditor-tooltipped vditor-tooltipped__n";
          var u = document.createElement("input");
          h.appendChild(u), u.className = "vditor-input", u.setAttribute("placeholder", window.VditorI18n.title), u.value = n.getAttribute("title") || "", u.oninput = function() {
            r();
          }, u.onkeydown = function(E) {
            Me(t, E);
          }, De(n, t), t.wysiwyg.popover.insertAdjacentElement("beforeend", i), t.wysiwyg.popover.insertAdjacentElement("beforeend", o), t.wysiwyg.popover.insertAdjacentElement("beforeend", h), He(t, n);
        }, Re = function(e, t) {
          if (!(0, l.yl)(e) && !e.shiftKey && e.key === "Enter" || e.key === "Escape")
            return t && (0, M.Hc)(t), e.preventDefault(), e.stopPropagation(), !0;
        }, ze = function(e) {
          e.currentMode === "wysiwyg" ? Ve(e) : e.currentMode === "ir" && Qe(e);
        }, Ft = function(e, t, n) {
          n === void 0 && (n = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          });
          var r = e.wysiwyg.element;
          r.innerHTML = e.lute.Md2VditorDOM(t), r.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(i) {
            ie(i, e), i.previousElementSibling.setAttribute("style", "display:none");
          }), ue(e, n);
        }, Un = function(e, t, n) {
          for (var r = e.startContainer.parentElement, i = !1, a = "", o = "", d = In(e), h = d.beforeHTML, u = d.afterHTML; r && !i; ) {
            var E = r.tagName;
            if (E === "STRIKE" && (E = "S"), E === "I" && (E = "EM"), E === "B" && (E = "STRONG"), E === "S" || E === "STRONG" || E === "EM") {
              var _ = "", P = "", R = "";
              r.parentElement.getAttribute("data-block") !== "0" && (P = qt(r), R = Kt(r)), (h || P) && (_ = "".concat(P, "<").concat(E, ">").concat(h, "</").concat(E, ">"), h = _), (n === "bold" && E === "STRONG" || n === "italic" && E === "EM" || n === "strikeThrough" && E === "S") && (_ += "".concat(a).concat(v.g.ZWSP, "<wbr>").concat(o), i = !0), (u || R) && (u = "<".concat(E, ">").concat(u, "</").concat(E, ">").concat(R), _ += u), r.parentElement.getAttribute("data-block") !== "0" ? (r = r.parentElement, r.innerHTML = _) : (r.outerHTML = _, r = r.parentElement), a = "<".concat(E, ">") + a, o = "</".concat(E, ">") + o;
            } else
              i = !0;
          }
          (0, M.ib)(t.wysiwyg.element, e);
        }, Vn = function(e, t, n) {
          if (!(e.wysiwyg.composingLock && n instanceof CustomEvent)) {
            var r = !0, i = !0;
            e.wysiwyg.element.querySelector("wbr") && e.wysiwyg.element.querySelector("wbr").remove();
            var a = (0, M.zh)(e), o = t.getAttribute("data-type");
            if (t.classList.contains("vditor-menu--current"))
              if (o === "strike" && (o = "strikeThrough"), o === "quote") {
                var d = (0, s.lG)(a.startContainer, "BLOCKQUOTE");
                d || (d = a.startContainer.childNodes[a.startOffset]), d && (r = !1, t.classList.remove("vditor-menu--current"), a.insertNode(document.createElement("wbr")), d.outerHTML = d.innerHTML.trim() === "" ? '<p data-block="0">'.concat(d.innerHTML, "</p>") : d.innerHTML, (0, M.ib)(e.wysiwyg.element, a));
              } else if (o === "inline-code") {
                var h = (0, s.lG)(a.startContainer, "CODE");
                h || (h = a.startContainer.childNodes[a.startOffset]), h && (h.outerHTML = h.innerHTML.replace(v.g.ZWSP, "") + "<wbr>", (0, M.ib)(e.wysiwyg.element, a));
              } else o === "link" ? (a.collapsed && a.selectNode(a.startContainer.parentElement), document.execCommand("unlink", !1, "")) : o === "check" || o === "list" || o === "ordered-list" ? (pt(e, a, o), (0, M.ib)(e.wysiwyg.element, a), r = !1, t.classList.remove("vditor-menu--current")) : (r = !1, t.classList.remove("vditor-menu--current"), a.toString() === "" ? Un(a, e, o) : document.execCommand(o, !1, ""));
            else {
              e.wysiwyg.element.childNodes.length === 0 && (e.wysiwyg.element.innerHTML = '<p data-block="0"><wbr></p>', (0, M.ib)(e.wysiwyg.element, a));
              var u = (0, s.F9)(a.startContainer);
              if (o === "quote") {
                if (u || (u = a.startContainer.childNodes[a.startOffset]), u) {
                  r = !1, t.classList.add("vditor-menu--current"), a.insertNode(document.createElement("wbr"));
                  var E = (0, s.lG)(a.startContainer, "LI");
                  E && u.contains(E) ? E.innerHTML = '<blockquote data-block="0">'.concat(E.innerHTML, "</blockquote>") : u.outerHTML = '<blockquote data-block="0">'.concat(u.outerHTML, "</blockquote>"), (0, M.ib)(e.wysiwyg.element, a);
                }
              } else if (o === "check" || o === "list" || o === "ordered-list")
                pt(e, a, o, !1), (0, M.ib)(e.wysiwyg.element, a), r = !1, g(e.toolbar.elements, ["check", "list", "ordered-list"]), t.classList.add("vditor-menu--current");
              else if (o === "inline-code") {
                if (a.toString() === "") {
                  var _ = document.createElement("code");
                  _.textContent = v.g.ZWSP, a.insertNode(_), a.setStart(_.firstChild, 1), a.collapse(!0), (0, M.Hc)(a);
                } else if (a.startContainer.nodeType === 3) {
                  var _ = document.createElement("code");
                  a.surroundContents(_), a.insertNode(_), (0, M.Hc)(a);
                }
                t.classList.add("vditor-menu--current");
              } else if (o === "code") {
                var _ = document.createElement("div");
                _.className = "vditor-wysiwyg__block", _.setAttribute("data-type", "code-block"), _.setAttribute("data-block", "0"), _.setAttribute("data-marker", "```"), a.toString() === "" ? _.innerHTML = `<pre><code><wbr>
</code></pre>` : (_.innerHTML = "<pre><code>".concat(a.toString(), "<wbr></code></pre>"), a.deleteContents()), a.insertNode(_), u && (u.outerHTML = e.lute.SpinVditorDOM(u.outerHTML)), (0, M.ib)(e.wysiwyg.element, a), e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(le) {
                  ie(le, e);
                }), t.classList.add("vditor-menu--disabled");
              } else if (o === "link") {
                if (a.toString() === "") {
                  var P = document.createElement("a");
                  P.innerText = v.g.ZWSP, a.insertNode(P), a.setStart(P.firstChild, 1), a.collapse(!0), St(e, P, a);
                  var R = e.wysiwyg.popover.querySelector("input");
                  R.value = "", R.focus(), i = !1;
                } else {
                  var _ = document.createElement("a");
                  _.setAttribute("href", ""), _.innerHTML = a.toString(), a.surroundContents(_), a.insertNode(_), (0, M.Hc)(a), St(e, _, a);
                  var O = e.wysiwyg.popover.querySelectorAll("input");
                  O[0].value = _.innerText, O[1].focus();
                }
                r = !1, t.classList.add("vditor-menu--current");
              } else if (o === "table") {
                var q = '<table data-block="0"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>';
                if (a.toString().trim() === "")
                  u && u.innerHTML.trim().replace(v.g.ZWSP, "") === "" ? u.outerHTML = q : document.execCommand("insertHTML", !1, q), a.selectNode(e.wysiwyg.element.querySelector("wbr").previousSibling), e.wysiwyg.element.querySelector("wbr").remove(), (0, M.Hc)(a);
                else {
                  q = '<table data-block="0"><thead><tr>';
                  var B = a.toString().split(`
`), D = B[0].split(",").length > B[0].split("	").length ? "," : "	";
                  B.forEach(function(Z, le) {
                    le === 0 ? (Z.split(D).forEach(function(oe, fe) {
                      fe === 0 ? q += "<th>".concat(oe, "<wbr></th>") : q += "<th>".concat(oe, "</th>");
                    }), q += "</tr></thead>") : (le === 1 ? q += "<tbody><tr>" : q += "<tr>", Z.split(D).forEach(function(oe) {
                      q += "<td>".concat(oe, "</td>");
                    }), q += "</tr>");
                  }), q += "</tbody></table>", document.execCommand("insertHTML", !1, q), (0, M.ib)(e.wysiwyg.element, a);
                }
                r = !1, t.classList.add("vditor-menu--disabled");
              } else if (o === "line") {
                if (u) {
                  var F = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                  u.innerHTML.trim() === "" ? u.outerHTML = F : u.insertAdjacentHTML("afterend", F), (0, M.ib)(e.wysiwyg.element, a);
                }
              } else if (r = !1, t.classList.add("vditor-menu--current"), o === "strike" && (o = "strikeThrough"), a.toString() === "" && (o === "bold" || o === "italic" || o === "strikeThrough")) {
                var W = "strong";
                o === "italic" ? W = "em" : o === "strikeThrough" && (W = "s");
                var _ = document.createElement(W);
                _.textContent = v.g.ZWSP, a.insertNode(_), _.previousSibling && _.previousSibling.textContent === v.g.ZWSP && (_.previousSibling.textContent = ""), a.setStart(_.firstChild, 1), a.collapse(!0), (0, M.Hc)(a);
              } else
                document.execCommand(o, !1, "");
            }
            r && Ve(e), i && ue(e);
          }
        }, me = (
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
                u.preventDefault(), !i.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED) && (t.currentMode === "wysiwyg" ? Vn(t, i.element.children[0], u) : t.currentMode === "ir" ? nr(t, i.element.children[0], n.prefix || "", n.suffix || "") : Gn(t, i.element.children[0], n.prefix || "", n.suffix || ""));
              });
            }
            return e;
          }()
        ), Wn = /* @__PURE__ */ function() {
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
        }(), We = function(e, t, n) {
          var r;
          if (typeof n != "string" ? (S(e, ["subToolbar", "hint"]), n.preventDefault(), r = H(e)) : r = n, !(e.currentMode === t && typeof n != "string")) {
            if (e.devtools && e.devtools.renderEchart(e), e.options.preview.mode === "both" && t === "sv" ? e.preview.element.style.display = "block" : e.preview.element.style.display = "none", m(e.toolbar.elements, v.g.EDIT_TOOLBARS), g(e.toolbar.elements, v.g.EDIT_TOOLBARS), f(e.toolbar.elements, ["outdent", "indent"]), t === "ir")
              w(e.toolbar.elements, ["both"]), y(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "block", e.lute.SetVditorIR(!0), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!1), e.currentMode = "ir", e.ir.element.innerHTML = e.lute.Md2VditorIRDOM(r), Pe(e, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), xe(e), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(a) {
                ie(a, e);
              }), e.ir.element.querySelectorAll(".vditor-toc").forEach(function(a) {
                (0, ne.H)(a, {
                  cdn: e.options.cdn,
                  math: e.options.preview.math
                });
              });
            else if (t === "wysiwyg")
              w(e.toolbar.elements, ["both"]), y(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "block", e.ir.element.parentElement.style.display = "none", e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!0), e.lute.SetVditorSV(!1), e.currentMode = "wysiwyg", xe(e), Ft(e, r, {
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
              y(e.toolbar.elements, ["both"]), w(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "none", (e.options.preview.mode === "both" || e.options.preview.mode === "editor") && (e.sv.element.style.display = "block"), e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!0), e.currentMode = "sv";
              var i = Xt(r, e);
              i === "<div data-block='0'></div>" && (i = ""), e.sv.element.innerHTML = i, ye(e.sv.element), Ee(e, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), xe(e);
            }
            e.undo.resetIcon(e), typeof n != "string" && (e[e.currentMode].element.focus(), ze(e)), Ne(e), lt(e), e.toolbar.elements["edit-mode"] && (e.toolbar.elements["edit-mode"].querySelectorAll("button").forEach(function(a) {
              a.classList.remove("vditor-menu--current");
            }), e.toolbar.elements["edit-mode"].querySelector('button[data-mode="'.concat(e.currentMode, '"]')).classList.add("vditor-menu--current")), e.outline.toggle(e, e.currentMode !== "sv" && e.options.outline.enable, typeof n != "string");
          }
        }, Kn = (
          /** @class */
          function(e) {
            Wn(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = document.createElement("div");
              return a.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow"), a.innerHTML = '<button data-mode="wysiwyg">'.concat(window.VditorI18n.wysiwyg, " &lt;").concat((0, l.ns)("⌥⌘7"), `></button>
<button data-mode="ir">`).concat(window.VditorI18n.instantRendering, " &lt;").concat((0, l.ns)("⌥⌘8"), `></button>
<button data-mode="sv">`).concat(window.VditorI18n.splitView, " &lt;").concat((0, l.ns)("⌥⌘9"), "></button>"), i.element.appendChild(a), i._bindEvent(n, a, r), i;
            }
            return t.prototype._bindEvent = function(n, r, i) {
              var a = this.element.children[0];
              b(n, r, a, i.level), r.children.item(0).addEventListener((0, l.Le)(), function(o) {
                We(n, "wysiwyg", o), o.preventDefault(), o.stopPropagation();
              }), r.children.item(1).addEventListener((0, l.Le)(), function(o) {
                We(n, "ir", o), o.preventDefault(), o.stopPropagation();
              }), r.children.item(2).addEventListener((0, l.Le)(), function(o) {
                We(n, "sv", o), o.preventDefault(), o.stopPropagation();
              });
            }, t;
          }(me)
        ), tt = function(e, t) {
          return (0, M.Gb)(e, t) ? getSelection().toString() : "";
        }, Ct = function(e, t) {
          t.addEventListener("focus", function() {
            e.options.focus && e.options.focus(H(e)), S(e, ["subToolbar", "hint"]);
          });
        }, Zt = function(e, t) {
          t.addEventListener("dblclick", function(n) {
            n.target.tagName === "IMG" && (e.options.image.preview ? e.options.image.preview(n.target) : e.options.image.isPreview && (0, G.E)(n.target, e.options.lang, e.options.theme));
          });
        }, Lt = function(e, t) {
          t.addEventListener("blur", function(n) {
            if (e.currentMode === "ir") {
              var r = e.ir.element.querySelector(".vditor-ir__node--expand");
              r && r.classList.remove("vditor-ir__node--expand");
            } else e.currentMode === "wysiwyg" && !e.wysiwyg.selectPopover.contains(n.relatedTarget) && e.wysiwyg.hideComment();
            e[e.currentMode].range = (0, M.zh)(e), e.options.blur && e.options.blur(H(e));
          });
        }, Mt = function(e, t) {
          t.addEventListener("dragstart", function(n) {
            n.dataTransfer.setData(v.g.DROP_EDITOR, v.g.DROP_EDITOR);
          }), t.addEventListener("drop", function(n) {
            n.dataTransfer.getData(v.g.DROP_EDITOR) ? $(e) : (n.dataTransfer.types.includes("Files") || n.dataTransfer.types.includes("text/html")) && gt(e, n, {
              pasteCode: function(r) {
                document.execCommand("insertHTML", !1, r);
              }
            });
          });
        }, Tt = function(e, t, n) {
          t.addEventListener("copy", function(r) {
            return n(r, e);
          });
        }, _t = function(e, t, n) {
          t.addEventListener("cut", function(r) {
            n(r, e), e.options.comment.enable && e.currentMode === "wysiwyg" && e.wysiwyg.getComments(e), document.execCommand("delete");
          });
        }, be = function(e) {
          if (e.currentMode === "wysiwyg" && e.options.comment.enable && e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)), !!e.options.typewriterMode) {
            var t = e[e.currentMode].element, n = (0, M.Ny)(t).top;
            e.options.height === "auto" && !e.element.classList.contains("vditor--fullscreen") && window.scrollTo(window.scrollX, n + e.element.offsetTop + e.toolbar.element.offsetHeight - window.innerHeight / 2 + 10), (e.options.height !== "auto" || e.element.classList.contains("vditor--fullscreen")) && (t.scrollTop = n + t.scrollTop - t.clientHeight / 2 + 10);
          }
        }, kt = function(e, t) {
          t.addEventListener("keydown", function(n) {
            if (!n.isComposing && e.options.keydown && e.options.keydown(n), !((e.options.hint.extend.length > 1 || e.toolbar.elements.emoji) && e.hint.select(n, e))) {
              if (e.options.comment.enable && e.currentMode === "wysiwyg" && (n.key === "Backspace" || N("⌘X", n)) && e.wysiwyg.getComments(e), e.currentMode === "sv") {
                if (Ce(e, n))
                  return;
              } else if (e.currentMode === "wysiwyg") {
                if (jn(e, n))
                  return;
              } else if (e.currentMode === "ir" && he(e, n))
                return;
              if (e.options.ctrlEnter && N("⌘Enter", n)) {
                e.options.ctrlEnter(H(e)), n.preventDefault();
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
                e.hint.element.style.display === "block" ? e.hint.element.style.display = "none" : e.options.esc && !n.isComposing && e.options.esc(H(e)), n.preventDefault();
                return;
              }
              if ((0, l.yl)(n) && n.altKey && !n.shiftKey && /^Digit[1-6]$/.test(n.code)) {
                if (e.currentMode === "wysiwyg") {
                  var r = n.code.replace("Digit", "H");
                  (0, s.lG)(getSelection().getRangeAt(0).startContainer, r) ? Et(e) : ct(e, r), ue(e);
                } else e.currentMode === "sv" ? Jt(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ") : e.currentMode === "ir" && rt(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ");
                return n.preventDefault(), !0;
              }
              if ((0, l.yl)(n) && n.altKey && !n.shiftKey && /^Digit[7-9]$/.test(n.code))
                return n.code === "Digit7" ? We(e, "wysiwyg", n) : n.code === "Digit8" ? We(e, "ir", n) : n.code === "Digit9" && We(e, "sv", n), !0;
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
        }, At = function(e, t) {
          t.addEventListener("selectstart", function(n) {
            t.onmouseup = function() {
              setTimeout(function() {
                var r = tt(e[e.currentMode].element);
                r.trim() ? (e.currentMode === "wysiwyg" && e.options.comment.enable && (!(0, s.a1)(n.target, "data-type", "footnotes-block") && !(0, s.a1)(n.target, "data-type", "link-ref-defs-block") ? e.wysiwyg.showComment() : e.wysiwyg.hideComment()), e.options.select && e.options.select(r)) : e.currentMode === "wysiwyg" && e.options.comment.enable && e.wysiwyg.hideComment();
              });
            };
          });
        }, xt = function(e, t) {
          var n = (0, M.zh)(e);
          n.extractContents(), n.insertNode(document.createTextNode(Lute.Caret)), n.insertNode(document.createTextNode(t));
          var r = (0, s.a1)(n.startContainer, "data-block", "0");
          r || (r = e.sv.element);
          var i = e.lute.SpinVditorSVDOM(r.textContent);
          i = "<div data-block='0'>" + i.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", r.isEqualNode(e.sv.element) ? r.innerHTML = i : r.outerHTML = i, ye(e.sv.element), (0, M.ib)(e.sv.element, n), be(e);
        }, ut = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e;
          for (r.nodeType === 3 && (r = r.parentElement); r; ) {
            if (r.getAttribute("data-type") === t)
              return r;
            n ? r = r.previousElementSibling : r = r.nextElementSibling;
          }
          return !1;
        }, Xt = function(e, t) {
          A("SpinVditorSVDOM", e, "argument", t.options.debugger);
          var n = t.lute.SpinVditorSVDOM(e);
          return e = "<div data-block='0'>" + n.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", A("SpinVditorSVDOM", e, "result", t.options.debugger), e;
        }, qn = function(e) {
          var t = e.getAttribute("data-type"), n = e.previousElementSibling, r = t && t !== "text" && t !== "table" && t !== "heading-marker" && t !== "newline" && t !== "yaml-front-matter-open-marker" && t !== "yaml-front-matter-close-marker" && t !== "code-block-info" && t !== "code-block-close-marker" && t !== "code-block-open-marker" ? e.textContent : "", i = !1;
          for (t === "newline" && (i = !0); n && !i; ) {
            var a = n.getAttribute("data-type");
            if (a === "li-marker" || a === "blockquote-marker" || a === "task-marker" || a === "padding") {
              var o = n.textContent;
              if (a === "li-marker" && (t === "code-block-open-marker" || t === "code-block-info"))
                r = o.replace(/\S/g, " ") + r;
              else if (t === "code-block-close-marker" && n.nextElementSibling.isSameNode(e)) {
                var d = ut(e, "code-block-open-marker");
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
          var n = H(e);
          typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), clearTimeout(e.sv.processTimeoutId), e.sv.processTimeoutId = window.setTimeout(function() {
            t.enableAddUndoStack && !e.sv.composingLock && e.undo.addToUndoStack(e);
          }, e.options.undoDelay);
        }, Jt = function(e, t) {
          var n = (0, M.zh)(e), r = (0, C.S)(n.startContainer, "SPAN");
          r && r.textContent.trim() !== "" && (t = `
` + t), n.collapse(!0), document.execCommand("insertHTML", !1, t);
        }, Gn = function(e, t, n, r) {
          var i = (0, M.zh)(e), a = t.getAttribute("data-type");
          e.sv.element.childNodes.length === 0 && (e.sv.element.innerHTML = `<span data-type="p" data-block="0"><span data-type="text"><wbr></span></span><span data-type="newline"><br><span style="display: none">
</span></span>`, (0, M.ib)(e.sv.element, i));
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
              var E = ut(d, "newline");
              E ? E.insertAdjacentText("afterend", u) : o.insertAdjacentText("afterbegin", u), ae(e);
              return;
            }
            (0, M.ib)(e.sv.element, i), Ee(e);
          }
        }, Yt = function(e) {
          switch (e.currentMode) {
            case "ir":
              return e.ir.element;
            case "wysiwyg":
              return e.wysiwyg.element;
            case "sv":
              return e.sv.element;
          }
        }, Qt = function(e, t) {
          e.options.upload.setHeaders && (e.options.upload.headers = e.options.upload.setHeaders()), e.options.upload.headers && Object.keys(e.options.upload.headers).forEach(function(n) {
            t.setRequestHeader(n, e.options.upload.headers[n]);
          });
        }, zn = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function d(E) {
              try {
                u(r.next(E));
              } catch (_) {
                o(_);
              }
            }
            function h(E) {
              try {
                u(r.throw(E));
              } catch (_) {
                o(_);
              }
            }
            function u(E) {
              E.done ? a(E.value) : i(E.value).then(d, h);
            }
            u((r = r.apply(e, [])).next());
          });
        }, Fn = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1) throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(u) {
            return function(E) {
              return h([u, E]);
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
            } catch (E) {
              u = [6, E], i = 0;
            } finally {
              r = a = 0;
            }
            if (u[0] & 5) throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, Zn = (
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
            var E = t[u], _ = !0;
            E.name || (r += "<li>".concat(window.VditorI18n.nameEmpty, "</li>"), _ = !1), E.size > e.options.upload.max && (r += "<li>".concat(E.name, " ").concat(window.VditorI18n.over, " ").concat(e.options.upload.max / 1024 / 1024, "M</li>"), _ = !1);
            var P = E.name.lastIndexOf("."), R = E.name.substr(P), O = e.options.upload.filename(E.name.substr(0, P)) + R;
            if (e.options.upload.accept) {
              var q = e.options.upload.accept.split(",").some(function(B) {
                var D = B.trim();
                if (D.indexOf(".") === 0) {
                  if (R.toLowerCase() === D.toLowerCase())
                    return !0;
                } else if (E.type.split("/")[0] === D.split("/")[0])
                  return !0;
                return !1;
              });
              q || (r += "<li>".concat(E.name, " ").concat(window.VditorI18n.fileTypeError, "</li>"), _ = !1);
            }
            _ && (n.push(E), i += "<li>".concat(O, " ").concat(window.VditorI18n.uploading, "</li>"));
          }, o = t.length, d = 0; d < o; d++)
            a(o, d);
          return e.tip.show("<ul>".concat(r).concat(i, "</ul>")), n;
        }, Jn = function(e, t) {
          var n = Yt(t);
          n.focus();
          var r = JSON.parse(e), i = "";
          r.code === 1 && (i = "".concat(r.msg)), r.data.errFiles && r.data.errFiles.length > 0 && (i = "<ul><li>".concat(i, "</li>"), r.data.errFiles.forEach(function(o) {
            var d = o.lastIndexOf("."), h = t.options.upload.filename(o.substr(0, d)) + o.substr(d);
            i += "<li>".concat(h, " ").concat(window.VditorI18n.uploadError, "</li>");
          }), i += "</ul>"), i ? t.tip.show(i) : t.tip.hide();
          var a = "";
          Object.keys(r.data.succMap).forEach(function(o) {
            var d = r.data.succMap[o], h = o.lastIndexOf("."), u = o.substr(h), E = t.options.upload.filename(o.substr(0, h)) + u;
            u = u.toLowerCase(), u.indexOf(".wav") === 0 || u.indexOf(".mp3") === 0 || u.indexOf(".ogg") === 0 ? t.currentMode === "wysiwyg" ? a += `<div class="vditor-wysiwyg__block" data-type="html-block"
 data-block="0"><pre><code>&lt;audio controls="controls" src="`.concat(d, '"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="').concat(d, `"></audio></pre></div>
`) : t.currentMode === "ir" ? a += '<audio controls="controls" src="'.concat(d, `"></audio>
`) : a += "[".concat(E, "](").concat(d, `)
`) : u.indexOf(".apng") === 0 || u.indexOf(".bmp") === 0 || u.indexOf(".gif") === 0 || u.indexOf(".ico") === 0 || u.indexOf(".cur") === 0 || u.indexOf(".jpg") === 0 || u.indexOf(".jpeg") === 0 || u.indexOf(".jfif") === 0 || u.indexOf(".pjp") === 0 || u.indexOf(".pjpeg") === 0 || u.indexOf(".png") === 0 || u.indexOf(".svg") === 0 || u.indexOf(".webp") === 0 ? t.currentMode === "wysiwyg" ? a += '<img alt="'.concat(E, '" src="').concat(d, `">
`) : a += "![".concat(E, "](").concat(d, `)
`) : t.currentMode === "wysiwyg" ? a += '<a href="'.concat(d, '">').concat(E, `</a>
`) : a += "[".concat(E, "](").concat(d, `)
`);
          }), (0, M.Hc)(t.upload.range), document.execCommand("insertHTML", !1, a), t.upload.range = getSelection().getRangeAt(0).cloneRange();
        }, Ht = function(e, t, n) {
          return zn(void 0, void 0, void 0, function() {
            var r, i, O, a, o, o, d, h, u, E, _, P, R, O, q, B;
            return Fn(this, function(D) {
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
                  if (d = Yt(e), e.upload.range = (0, M.zh)(e), h = Xn(e, r), h.length === 0)
                    return n && (n.value = ""), [
                      2
                      /*return*/
                    ];
                  for (u = new FormData(), E = e.options.upload.extraData, _ = 0, P = Object.keys(E); _ < P.length; _++)
                    R = P[_], u.append(R, E[R]);
                  for (O = 0, q = h.length; O < q; O++)
                    u.append(e.options.upload.fieldName, h[O]);
                  return B = new XMLHttpRequest(), B.open("POST", e.options.upload.url), e.options.upload.token && B.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (B.withCredentials = !0), Qt(e, B), e.upload.isUploading = !0, d.setAttribute("contenteditable", "false"), B.onreadystatechange = function() {
                    if (B.readyState === XMLHttpRequest.DONE) {
                      if (e.upload.isUploading = !1, d.setAttribute("contenteditable", "true"), B.status >= 200 && B.status < 300)
                        if (e.options.upload.success)
                          e.options.upload.success(d, B.responseText);
                        else {
                          var F = B.responseText;
                          e.options.upload.format && (F = e.options.upload.format(t, B.responseText)), Jn(F, e);
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
        }, ft = function(e, t, n) {
          var r, i = (0, s.F9)(t.startContainer);
          if (i || (i = e.wysiwyg.element), n && n.inputType !== "formatItalic" && n.inputType !== "deleteByDrag" && n.inputType !== "insertFromDrop" && n.inputType !== "formatBold" && n.inputType !== "formatRemove" && n.inputType !== "formatStrikeThrough" && n.inputType !== "insertUnorderedList" && n.inputType !== "insertOrderedList" && n.inputType !== "formatOutdent" && n.inputType !== "formatIndent" && n.inputType !== "" || !n) {
            var a = Nn(t.startContainer);
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
                var E = (0, C.S)(t.startContainer, "BLOCKQUOTE");
                E ? i = (0, s.F9)(t.startContainer) || i : i = u;
              }
              if (h && (i = h), o = i.outerHTML, i.tagName === "UL" || i.tagName === "OL") {
                var _ = i.previousElementSibling, P = i.nextElementSibling;
                _ && (_.tagName === "UL" || _.tagName === "OL") && (o = _.outerHTML + o, _.remove()), P && (P.tagName === "UL" || P.tagName === "OL") && (o = o + P.outerHTML, P.remove()), o = o.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
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
            }), F.length > 0 && e.wysiwyg.element.insertAdjacentElement("beforeend", F[0]), (0, M.ib)(e.wysiwyg.element, t), e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(W) {
              ie(W, e);
            }), n && (n.inputType === "deleteContentBackward" || n.inputType === "deleteContentForward") && e.options.comment.enable && (e.wysiwyg.triggerRemoveComment(e), e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)));
          }
          Ne(e), ue(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, Yn = function(e, t) {
          return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
        }, Qn = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function d(E) {
              try {
                u(r.next(E));
              } catch (_) {
                o(_);
              }
            }
            function h(E) {
              try {
                u(r.throw(E));
              } catch (_) {
                o(_);
              }
            }
            function u(E) {
              E.done ? a(E.value) : i(E.value).then(d, h);
            }
            u((r = r.apply(e, [])).next());
          });
        }, $n = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1) throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(u) {
            return function(E) {
              return h([u, E]);
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
            } catch (E) {
              u = [6, E], i = 0;
            } finally {
              r = a = 0;
            }
            if (u[0] & 5) throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, $t = function(e, t, n) {
          if (e.keyCode === 229 && e.code === "" && e.key === "Unidentified" && t.currentMode !== "sv") {
            var r = (0, s.F9)(n);
            if (r && r.textContent.trim() === "")
              return t[t.currentMode].composingLock = !0, !1;
          }
          return !0;
        }, en = function(e, t, n) {
          if (!(n.key === "Enter" || n.key === "Tab" || n.key === "Backspace" || n.key.indexOf("Arrow") > -1 || (0, l.yl)(n) || n.key === "Escape" || n.shiftKey || n.altKey)) {
            var r = (0, s.lG)(e.startContainer, "P") || (0, s.lG)(e.startContainer, "LI");
            if (r && (0, M.im)(r, t[t.currentMode].element, e).start === 0) {
              r.nodeValue && (r.nodeValue = r.nodeValue.replace(/\u2006/g, ""));
              var i = document.createTextNode(v.g.ZWSP);
              e.insertNode(i), e.setStartAfter(i);
            }
          }
        }, tn = function(e, t) {
          if (t === "ArrowDown" || t === "ArrowUp") {
            var n = (0, s.a1)(e.startContainer, "data-type", "math-inline") || (0, s.a1)(e.startContainer, "data-type", "html-entity") || (0, s.a1)(e.startContainer, "data-type", "html-inline");
            n && (t === "ArrowDown" && e.setStartAfter(n.parentElement), t === "ArrowUp" && e.setStartBefore(n.parentElement));
          }
        }, dt = function(e, t) {
          var n = (0, M.zh)(e), r = (0, s.F9)(n.startContainer);
          r && (r.insertAdjacentHTML(t, '<p data-block="0">'.concat(v.g.ZWSP, `<wbr>
</p>`)), (0, M.ib)(e[e.currentMode].element, n), ze(e), $(e));
        }, er = function(e) {
          var t = (0, s.lG)(e, "TABLE");
          return t && t.rows[0].cells[0].isSameNode(e) ? t : !1;
        }, tr = function(e) {
          var t = (0, s.lG)(e, "TABLE");
          return t && t.lastElementChild.lastElementChild.lastElementChild.isSameNode(e) ? t : !1;
        }, nn = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e.previousElementSibling;
          return r || (e.parentElement.previousElementSibling ? r = e.parentElement.previousElementSibling.lastElementChild : e.parentElement.parentElement.tagName === "TBODY" && e.parentElement.parentElement.previousElementSibling ? r = e.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild : r = null), r && (t.selectNodeContents(r), n || t.collapse(!1), (0, M.Hc)(t)), r;
        }, nt = function(e, t, n, r, i) {
          var a = (0, M.im)(r, e[e.currentMode].element, n);
          if (t.key === "ArrowDown" && r.textContent.trimRight().substr(a.start).indexOf(`
`) === -1 || t.key === "ArrowRight" && a.start >= r.textContent.trimRight().length) {
            var o = i.nextElementSibling;
            return !o || o && (o.tagName === "TABLE" || o.getAttribute("data-type")) ? (i.insertAdjacentHTML("afterend", '<p data-block="0">'.concat(v.g.ZWSP, "<wbr></p>")), (0, M.ib)(e[e.currentMode].element, n)) : (n.selectNodeContents(o), n.collapse(!0), (0, M.Hc)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, Fe = function(e, t, n, r, i) {
          var a = (0, M.im)(r, e[e.currentMode].element, n);
          if (t.key === "ArrowUp" && r.textContent.substr(0, a.start).indexOf(`
`) === -1 || (t.key === "ArrowLeft" || t.key === "Backspace" && n.toString() === "") && a.start === 0) {
            var o = i.previousElementSibling;
            return !o || o && (o.tagName === "TABLE" || o.getAttribute("data-type")) ? (i.insertAdjacentHTML("beforebegin", '<p data-block="0">'.concat(v.g.ZWSP, "<wbr></p>")), (0, M.ib)(e[e.currentMode].element, n)) : (n.selectNodeContents(o), n.collapse(!1), (0, M.Hc)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, pt = function(e, t, n, r) {
          r === void 0 && (r = !0);
          var i = (0, s.lG)(t.startContainer, "LI");
          if (e[e.currentMode].element.querySelectorAll("wbr").forEach(function(E) {
            E.remove();
          }), t.insertNode(document.createElement("wbr")), r && i) {
            for (var a = "", o = 0; o < i.parentElement.childElementCount; o++) {
              var d = i.parentElement.children[o].querySelector("input");
              d && d.remove(), a += '<p data-block="0">'.concat(i.parentElement.children[o].innerHTML.trimLeft(), "</p>");
            }
            i.parentElement.insertAdjacentHTML("beforebegin", a), i.parentElement.remove();
          } else if (i)
            if (n === "check")
              i.parentElement.querySelectorAll("li").forEach(function(E) {
                E.insertAdjacentHTML("afterbegin", '<input type="checkbox" />'.concat(E.textContent.indexOf(" ") === 0 ? "" : " ")), E.classList.add("vditor-task");
              });
            else {
              i.querySelector("input") && i.parentElement.querySelectorAll("li").forEach(function(E) {
                E.querySelector("input").remove(), E.classList.remove("vditor-task");
              });
              var u = void 0;
              n === "list" ? (u = document.createElement("ul"), u.setAttribute("data-marker", "*")) : (u = document.createElement("ol"), u.setAttribute("data-marker", "1.")), u.setAttribute("data-block", "0"), u.setAttribute("data-tight", i.parentElement.getAttribute("data-tight")), u.innerHTML = i.parentElement.innerHTML, i.parentElement.parentNode.replaceChild(u, i.parentElement);
            }
          else {
            var h = (0, s.a1)(t.startContainer, "data-block", "0");
            h || (e[e.currentMode].element.querySelector("wbr").remove(), h = e[e.currentMode].element.querySelector("p"), h.innerHTML = "<wbr>"), n === "check" ? (h.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li class="vditor-task"><input type="checkbox" /> '.concat(h.innerHTML, "</li></ul>")), h.remove()) : n === "list" ? (h.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li>'.concat(h.innerHTML, "</li></ul>")), h.remove()) : n === "ordered-list" && (h.insertAdjacentHTML("beforebegin", '<ol data-block="0"><li>'.concat(h.innerHTML, "</li></ol>")), h.remove());
          }
        }, rn = function(e, t, n) {
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
            }), r.insertAdjacentHTML("beforeend", "<".concat(a.tagName, ' data-block="0">').concat(o, "</").concat(a.tagName, ">")), e.currentMode === "wysiwyg" ? a.outerHTML = e.lute.SpinVditorDOM(a.outerHTML) : a.outerHTML = e.lute.SpinVditorIRDOM(a.outerHTML), (0, M.ib)(e[e.currentMode].element, n);
            var d = (0, s.O9)(n.startContainer);
            d && d.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(h) {
              ie(h, e), e.currentMode === "wysiwyg" && h.previousElementSibling.setAttribute("style", "display:none");
            }), $(e), ze(e);
          } else
            e[e.currentMode].element.focus();
        }, Dt = function(e, t, n, r) {
          var i = (0, s.lG)(t.parentElement, "LI");
          if (i) {
            e[e.currentMode].element.querySelectorAll("wbr").forEach(function(_) {
              _.remove();
            }), n.insertNode(document.createElement("wbr"));
            var a = t.parentElement, o = a.cloneNode(), d = [t];
            Array.from(n.cloneContents().children).forEach(function(_, P) {
              _.nodeType !== 3 && t && _.textContent.trim() !== "" && t.getAttribute("data-node-id") === _.getAttribute("data-node-id") && (P !== 0 && d.push(t), t = t.nextElementSibling);
            });
            var h = !1, u = "";
            a.querySelectorAll("li").forEach(function(_) {
              h && (u += _.outerHTML, !_.nextElementSibling && !_.previousElementSibling ? _.parentElement.remove() : _.remove()), _.isSameNode(d[d.length - 1]) && (h = !0);
            }), d.reverse().forEach(function(_) {
              i.insertAdjacentElement("afterend", _);
            }), u && (o.innerHTML = u, d[0].insertAdjacentElement("beforeend", o)), e.currentMode === "wysiwyg" ? r.outerHTML = e.lute.SpinVditorDOM(r.outerHTML) : r.outerHTML = e.lute.SpinVditorIRDOM(r.outerHTML), (0, M.ib)(e[e.currentMode].element, n);
            var E = (0, s.O9)(n.startContainer);
            E && E.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(_) {
              ie(_, e), e.currentMode === "wysiwyg" && _.previousElementSibling.setAttribute("style", "display:none");
            }), $(e), ze(e);
          } else
            e[e.currentMode].element.focus();
        }, ht = function(e, t) {
          for (var n = getSelection().getRangeAt(0).startContainer.parentElement, r = e.rows[0].cells.length, i = e.rows.length, a = 0, o = 0; o < i; o++)
            for (var d = 0; d < r; d++)
              if (e.rows[o].cells[d].isSameNode(n)) {
                a = d;
                break;
              }
          for (var h = 0; h < i; h++)
            e.rows[h].cells[a].setAttribute("align", t);
        }, Ot = function(e) {
          var t = e.trimRight().split(`
`).pop();
          return t === "" ? !1 : (t.replace(/ |-/g, "") === "" || t.replace(/ |_/g, "") === "" || t.replace(/ |\*/g, "") === "") && t.replace(/ /g, "").length > 2 ? !(t.indexOf("-") > -1 && t.trimLeft().indexOf(" ") === -1 && e.trimRight().split(`
`).length > 1 || t.indexOf("    ") === 0 || t.indexOf("	") === 0) : !1;
        }, Nt = function(e) {
          var t = e.trimRight().split(`
`);
          return e = t.pop(), e.indexOf("    ") === 0 || e.indexOf("	") === 0 || (e = e.trimLeft(), e === "" || t.length === 0) ? !1 : e.replace(/-/g, "") === "" || e.replace(/=/g, "") === "";
        }, $ = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), e.currentMode === "wysiwyg" ? ue(e, t) : e.currentMode === "ir" ? Pe(e, t) : e.currentMode === "sv" && Ee(e, t);
        }, an = function(e, t, n, r) {
          var i, a = e.startContainer, o = (0, s.lG)(a, "LI");
          if (o) {
            if (!(0, l.yl)(r) && !r.altKey && r.key === "Enter" && // fix li 中有多个 P 时，在第一个 P 中换行会在下方生成新的 li
            !r.shiftKey && n && o.contains(n) && n.nextElementSibling)
              return o && !o.textContent.endsWith(`
`) && o.insertAdjacentText("beforeend", `
`), e.insertNode(document.createTextNode(`

`)), e.collapse(!1), $(t), r.preventDefault(), !0;
            if (!(0, l.yl)(r) && !r.shiftKey && !r.altKey && r.key === "Backspace" && !o.previousElementSibling && e.toString() === "" && (0, M.im)(o, t[t.currentMode].element, e).start === 0)
              return o.nextElementSibling ? (o.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>'.concat(o.innerHTML, "</p>")), o.remove()) : o.parentElement.outerHTML = '<p data-block="0"><wbr>'.concat(o.innerHTML, "</p>"), (0, M.ib)(t[t.currentMode].element, e), $(t), r.preventDefault(), !0;
            if (!(0, l.yl)(r) && !r.shiftKey && !r.altKey && r.key === "Backspace" && o.textContent.trim().replace(v.g.ZWSP, "") === "" && e.toString() === "" && ((i = o.previousElementSibling) === null || i === void 0 ? void 0 : i.tagName) === "LI")
              return o.previousElementSibling.insertAdjacentText("beforeend", `

`), e.selectNodeContents(o.previousElementSibling), e.collapse(!1), o.remove(), (0, M.ib)(t[t.currentMode].element, e), $(t), r.preventDefault(), !0;
            if (!(0, l.yl)(r) && !r.altKey && r.key === "Tab") {
              var d = !1;
              if ((e.startOffset === 0 && (a.nodeType === 3 && !a.previousSibling || a.nodeType !== 3 && a.nodeName === "LI") || o.classList.contains("vditor-task") && e.startOffset === 1 && a.previousSibling.nodeType !== 3 && a.previousSibling.tagName === "INPUT") && (d = !0), d || e.toString() !== "")
                return r.shiftKey ? Dt(t, o, e, o.parentElement) : rn(t, o, e), r.preventDefault(), !0;
            }
          }
          return !1;
        }, Rt = function(e, t, n) {
          if (e.options.tab && n.key === "Tab")
            return n.shiftKey || (t.toString() === "" ? (t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1)) : (t.extractContents(), t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1))), (0, M.Hc)(t), $(e), n.preventDefault(), !0;
        }, on = function(e, t, n, r) {
          if (n) {
            if (!(0, l.yl)(e) && !e.altKey && e.key === "Enter") {
              var i = String.raw(bn || (bn = Yn(["", ""], ["", ""])), n.textContent).replace(/\\\|/g, "").trim(), a = i.split("|");
              if (i.startsWith("|") && i.endsWith("|") && a.length > 3) {
                var o = a.map(function() {
                  return "---";
                }).join("|");
                return o = n.textContent + `
` + o.substring(3, o.length - 3) + `
|<wbr>`, n.outerHTML = t.lute.SpinVditorDOM(o), (0, M.ib)(t[t.currentMode].element, r), $(t), be(t), e.preventDefault(), !0;
              }
              if (Ot(n.innerHTML) && n.previousElementSibling) {
                var d = "", h = n.innerHTML.trimRight().split(`
`);
                return h.length > 1 && (h.pop(), d = '<p data-block="0">'.concat(h.join(`
`), "</p>")), n.insertAdjacentHTML("afterend", "".concat(d, `<hr data-block="0"><p data-block="0"><wbr>
</p>`)), n.remove(), (0, M.ib)(t[t.currentMode].element, r), $(t), be(t), e.preventDefault(), !0;
              }
              if (Nt(n.innerHTML))
                return t.currentMode === "wysiwyg" ? n.outerHTML = t.lute.SpinVditorDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`) : n.outerHTML = t.lute.SpinVditorIRDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`), (0, M.ib)(t[t.currentMode].element, r), $(t), be(t), e.preventDefault(), !0;
            }
            if (r.collapsed && n.previousElementSibling && e.key === "Backspace" && !(0, l.yl)(e) && !e.altKey && !e.shiftKey && n.textContent.trimRight().split(`
`).length > 1 && (0, M.im)(n, t[t.currentMode].element, r).start === 0) {
              var u = (0, s.DX)(n.previousElementSibling);
              return u.textContent.endsWith(`
`) || (u.textContent = u.textContent + `
`), u.parentElement.insertAdjacentHTML("beforeend", "<wbr>".concat(n.innerHTML)), n.remove(), (0, M.ib)(t[t.currentMode].element, r), !1;
            }
            return !1;
          }
        }, sn = function(e, t, n) {
          for (var r = "", i = 0; i < n.parentElement.childElementCount; i++)
            r += '<td align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </td>');
          n.tagName === "TH" ? n.parentElement.parentElement.insertAdjacentHTML("afterend", "<tbody><tr>".concat(r, "</tr></tbody>")) : n.parentElement.insertAdjacentHTML("afterend", "<tr>".concat(r, "</tr>")), $(e);
        }, ln = function(e, t, n) {
          for (var r = "", i = 0; i < n.parentElement.childElementCount; i++)
            n.tagName === "TH" ? r += '<th align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </th>') : r += '<td align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </td>');
          if (n.tagName === "TH") {
            n.parentElement.parentElement.insertAdjacentHTML("beforebegin", "<thead><tr>".concat(r, "</tr></thead>")), t.insertNode(document.createElement("wbr"));
            var a = n.parentElement.innerHTML.replace(/<th>/g, "<td>").replace(/<\/th>/g, "</td>");
            n.parentElement.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", a), n.parentElement.parentElement.remove(), (0, M.ib)(e.ir.element, t);
          } else
            n.parentElement.insertAdjacentHTML("beforebegin", "<tr>".concat(r, "</tr>"));
          $(e);
        }, mt = function(e, t, n, r) {
          r === void 0 && (r = "afterend");
          for (var i = 0, a = n.previousElementSibling; a; )
            i++, a = a.previousElementSibling;
          for (var o = 0; o < t.rows.length; o++)
            o === 0 ? t.rows[o].cells[i].insertAdjacentHTML(r, "<th> </th>") : t.rows[o].cells[i].insertAdjacentHTML(r, "<td> </td>");
          $(e);
        }, cn = function(e, t, n) {
          if (n.tagName === "TD") {
            var r = n.parentElement.parentElement;
            n.parentElement.previousElementSibling ? t.selectNodeContents(n.parentElement.previousElementSibling.lastElementChild) : t.selectNodeContents(r.previousElementSibling.lastElementChild.lastElementChild), r.childElementCount === 1 ? r.remove() : n.parentElement.remove(), t.collapse(!1), (0, M.Hc)(t), $(e);
          }
        }, un = function(e, t, n, r) {
          for (var i = 0, a = r.previousElementSibling; a; )
            i++, a = a.previousElementSibling;
          (r.previousElementSibling || r.nextElementSibling) && (t.selectNodeContents(r.previousElementSibling || r.nextElementSibling), t.collapse(!0));
          for (var o = 0; o < n.rows.length; o++) {
            var d = n.rows[o].cells;
            if (d.length === 1) {
              n.remove(), ze(e);
              break;
            }
            d[i].remove();
          }
          (0, M.Hc)(t), $(e);
        }, fn = function(e, t, n) {
          var r = n.startContainer, i = (0, s.lG)(r, "TD") || (0, s.lG)(r, "TH");
          if (i) {
            if (!(0, l.yl)(t) && !t.altKey && t.key === "Enter") {
              (!i.lastElementChild || i.lastElementChild && (!i.lastElementChild.isSameNode(i.lastChild) || i.lastElementChild.tagName !== "BR")) && i.insertAdjacentHTML("beforeend", "<br>");
              var a = document.createElement("br");
              return n.insertNode(a), n.setStartAfter(a), $(e), be(e), t.preventDefault(), !0;
            }
            if (t.key === "Tab") {
              if (t.shiftKey)
                return nn(i, n), t.preventDefault(), !0;
              var o = i.nextElementSibling;
              return o || (i.parentElement.nextElementSibling ? o = i.parentElement.nextElementSibling.firstElementChild : i.parentElement.parentElement.tagName === "THEAD" && i.parentElement.parentElement.nextElementSibling ? o = i.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild : o = null), o && (n.selectNodeContents(o), (0, M.Hc)(n)), t.preventDefault(), !0;
            }
            var d = i.parentElement.parentElement.parentElement;
            if (t.key === "ArrowUp") {
              if (t.preventDefault(), i.tagName === "TH")
                return d.previousElementSibling ? (n.selectNodeContents(d.previousElementSibling), n.collapse(!1), (0, M.Hc)(n)) : dt(e, "beforebegin"), !0;
              for (var h = 0, u = i.parentElement; h < u.cells.length && !u.cells[h].isSameNode(i); h++)
                ;
              var E = u.previousElementSibling;
              return E || (E = u.parentElement.previousElementSibling.firstChild), n.selectNodeContents(E.cells[h]), n.collapse(!1), (0, M.Hc)(n), !0;
            }
            if (t.key === "ArrowDown") {
              t.preventDefault();
              var u = i.parentElement;
              if (!u.nextElementSibling && i.tagName === "TD")
                return d.nextElementSibling ? (n.selectNodeContents(d.nextElementSibling), n.collapse(!0), (0, M.Hc)(n)) : dt(e, "afterend"), !0;
              for (var h = 0; h < u.cells.length && !u.cells[h].isSameNode(i); h++)
                ;
              var o = u.nextElementSibling;
              return o || (o = u.parentElement.nextElementSibling.firstChild), n.selectNodeContents(o.cells[h]), n.collapse(!0), (0, M.Hc)(n), !0;
            }
            if (e.currentMode === "wysiwyg" && !(0, l.yl)(t) && t.key === "Enter" && !t.shiftKey && t.altKey) {
              var _ = e.wysiwyg.popover.querySelector(".vditor-input");
              return _.focus(), _.select(), t.preventDefault(), !0;
            }
            if (!(0, l.yl)(t) && !t.shiftKey && !t.altKey && t.key === "Backspace" && n.startOffset === 0 && n.toString() === "") {
              var P = nn(i, n, !1);
              return !P && d && (d.textContent.trim() === "" ? (d.outerHTML = `<p data-block="0"><wbr>
</p>`, (0, M.ib)(e[e.currentMode].element, n)) : (n.setStartBefore(d), n.collapse(!0)), $(e)), t.preventDefault(), !0;
            }
            if (N("⇧⌘F", t))
              return ln(e, n, i), t.preventDefault(), !0;
            if (N("⌘=", t))
              return sn(e, n, i), t.preventDefault(), !0;
            if (N("⇧⌘G", t))
              return mt(e, d, i, "beforebegin"), t.preventDefault(), !0;
            if (N("⇧⌘=", t))
              return mt(e, d, i), t.preventDefault(), !0;
            if (N("⌘-", t))
              return cn(e, n, i), t.preventDefault(), !0;
            if (N("⇧⌘-", t))
              return un(e, n, d, i), t.preventDefault(), !0;
            if (N("⇧⌘L", t)) {
              if (e.currentMode === "ir")
                return ht(d, "left"), $(e), t.preventDefault(), !0;
              var R = e.wysiwyg.popover.querySelector('[data-type="left"]');
              if (R)
                return R.click(), t.preventDefault(), !0;
            }
            if (N("⇧⌘C", t)) {
              if (e.currentMode === "ir")
                return ht(d, "center"), $(e), t.preventDefault(), !0;
              var R = e.wysiwyg.popover.querySelector('[data-type="center"]');
              if (R)
                return R.click(), t.preventDefault(), !0;
            }
            if (N("⇧⌘R", t)) {
              if (e.currentMode === "ir")
                return ht(d, "right"), $(e), t.preventDefault(), !0;
              var R = e.wysiwyg.popover.querySelector('[data-type="right"]');
              if (R)
                return R.click(), t.preventDefault(), !0;
            }
          }
          return !1;
        }, dn = function(e, t, n, r) {
          if (n.tagName === "PRE" && N("⌘A", t))
            return r.selectNodeContents(n.firstElementChild), t.preventDefault(), !0;
          if (e.options.tab && t.key === "Tab" && !t.shiftKey && r.toString() === "")
            return r.insertNode(document.createTextNode(e.options.tab)), r.collapse(!1), $(e), t.preventDefault(), !0;
          if (t.key === "Backspace" && !(0, l.yl)(t) && !t.shiftKey && !t.altKey) {
            var i = (0, M.im)(n, e[e.currentMode].element, r);
            if ((i.start === 0 || i.start === 1 && n.innerText === `
`) && r.toString() === "")
              return n.parentElement.outerHTML = '<p data-block="0"><wbr>'.concat(n.firstElementChild.innerHTML, "</p>"), (0, M.ib)(e[e.currentMode].element, r), $(e), t.preventDefault(), !0;
          }
          return !(0, l.yl)(t) && !t.altKey && t.key === "Enter" ? (n.firstElementChild.textContent.endsWith(`
`) || n.firstElementChild.insertAdjacentText("beforeend", `
`), r.extractContents(), r.insertNode(document.createTextNode(`
`)), r.collapse(!1), (0, M.Hc)(r), (0, l.vU)() || (e.currentMode === "wysiwyg" ? ft(e, r) : Be(e, r)), be(e), t.preventDefault(), !0) : !1;
        }, pn = function(e, t, n, r) {
          var i = t.startContainer, a = (0, s.lG)(i, "BLOCKQUOTE");
          if (a && t.toString() === "") {
            if (n.key === "Backspace" && !(0, l.yl)(n) && !n.shiftKey && !n.altKey && (0, M.im)(a, e[e.currentMode].element, t).start === 0)
              return t.insertNode(document.createElement("wbr")), a.outerHTML = a.innerHTML, (0, M.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            if (r && n.key === "Enter" && !(0, l.yl)(n) && !n.shiftKey && !n.altKey && r.parentElement.tagName === "BLOCKQUOTE") {
              var o = !1;
              if (r.innerHTML.replace(v.g.ZWSP, "") === `
` || r.innerHTML.replace(v.g.ZWSP, "") === "" ? (o = !0, r.remove()) : r.innerHTML.endsWith(`

`) && (0, M.im)(r, e[e.currentMode].element, t).start === r.textContent.length - 1 && (r.innerHTML = r.innerHTML.substr(0, r.innerHTML.length - 2), o = !0), o)
                return a.insertAdjacentHTML("afterend", '<p data-block="0">'.concat(v.g.ZWSP, `<wbr>
</p>`)), (0, M.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            }
            var d = (0, s.F9)(i);
            if (e.currentMode === "wysiwyg" && d && N("⇧⌘;", n))
              return t.insertNode(document.createElement("wbr")), d.outerHTML = '<blockquote data-block="0">'.concat(d.outerHTML, "</blockquote>"), (0, M.ib)(e.wysiwyg.element, t), ue(e), n.preventDefault(), !0;
            if (nt(e, n, t, a, a) || Fe(e, n, t, a, a))
              return !0;
          }
          return !1;
        }, hn = function(e, t, n) {
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
              return (0, M.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            }
            if (n.key === "Enter" && !(0, l.yl)(n) && !n.shiftKey && !n.altKey) {
              if (i.textContent.trim() === "")
                if ((0, s.fb)(i.parentElement, "vditor-task")) {
                  var h = (0, s.O9)(r);
                  h && Dt(e, i, t, h);
                } else if (i.nextElementSibling) {
                  var u = "", E = "", _ = !1;
                  Array.from(i.parentElement.children).forEach(function(q) {
                    i.isSameNode(q) ? _ = !0 : _ ? u += q.outerHTML : E += q.outerHTML;
                  });
                  var P = i.parentElement.tagName, R = i.parentElement.tagName === "OL" ? "" : ' data-marker="'.concat(i.parentElement.getAttribute("data-marker"), '"'), O = "";
                  E && (O = i.parentElement.tagName === "UL" ? "" : ' start="1"', E = "<".concat(P, ' data-tight="true"').concat(R, ' data-block="0">').concat(E, "</").concat(P, ">")), i.parentElement.outerHTML = "".concat(E, `<p data-block="0"><wbr>
</p><`).concat(P, `
 data-tight="true"`).concat(R, ' data-block="0"').concat(O, ">").concat(u, "</").concat(P, ">");
                } else
                  i.parentElement.insertAdjacentHTML("afterend", `<p data-block="0"><wbr>
</p>`), i.parentElement.querySelectorAll("li").length === 1 ? i.parentElement.remove() : i.remove();
              else r.nodeType !== 3 && t.startOffset === 0 && r.firstChild.tagName === "INPUT" ? t.setStart(r.childNodes[1], 1) : (t.setEndAfter(i.lastChild), i.insertAdjacentHTML("afterend", '<li class="vditor-task" data-marker="'.concat(i.getAttribute("data-marker"), '"><input type="checkbox"> <wbr></li>')), document.querySelector("wbr").after(t.extractContents()));
              return (0, M.ib)(e[e.currentMode].element, t), $(e), be(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, mn = function(e, t, n, r) {
          if (t.startContainer.nodeType !== 3) {
            var i = t.startContainer.children[t.startOffset];
            if (i && i.tagName === "HR")
              return t.selectNodeContents(i.previousElementSibling), t.collapse(!1), n.preventDefault(), !0;
          }
          if (r) {
            var a = r.previousElementSibling;
            if (a && (0, M.im)(r, e[e.currentMode].element, t).start === 0 && ((0, l.vU)() && a.tagName === "HR" || a.tagName === "TABLE")) {
              if (a.tagName === "TABLE") {
                var o = a.lastElementChild.lastElementChild.lastElementChild;
                o.innerHTML = o.innerHTML.trimLeft() + "<wbr>" + r.textContent.trim(), r.remove();
              } else
                a.remove();
              return (0, M.ib)(e[e.currentMode].element, t), $(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, gn = function(e) {
          (0, l.vU)() && e.startContainer.nodeType !== 3 && e.startContainer.tagName === "HR" && e.setStartBefore(e.startContainer);
        }, yn = function(e, t, n) {
          var r, i;
          if (!(0, l.vU)())
            return !1;
          if (e.key === "ArrowUp" && t && ((r = t.previousElementSibling) === null || r === void 0 ? void 0 : r.tagName) === "TABLE") {
            var a = t.previousElementSibling;
            return n.selectNodeContents(a.rows[a.rows.length - 1].lastElementChild), n.collapse(!1), e.preventDefault(), !0;
          }
          return e.key === "ArrowDown" && t && ((i = t.nextElementSibling) === null || i === void 0 ? void 0 : i.tagName) === "TABLE" ? (n.selectNodeContents(t.nextElementSibling.rows[0].cells[0]), n.collapse(!0), e.preventDefault(), !0) : !1;
        }, gt = function(e, t, n) {
          return Qn(void 0, void 0, void 0, function() {
            var r, i, a, o, d, h, u, E, _, P, R, O, q, D, B, D, F;
            return $n(this, function(W) {
              switch (W.label) {
                case 0:
                  return e[e.currentMode].element.getAttribute("contenteditable") !== "true" ? [
                    2
                    /*return*/
                  ] : (t.stopPropagation(), t.preventDefault(), "clipboardData" in t ? (r = t.clipboardData.getData("text/html"), i = t.clipboardData.getData("text/plain"), a = t.clipboardData.files) : (r = t.dataTransfer.getData("text/html"), i = t.dataTransfer.getData("text/plain"), t.dataTransfer.types.includes("Files") && (a = t.dataTransfer.items)), o = {}, d = function(Z, le) {
                    if (!le)
                      return ["", Lute.WalkContinue];
                    if (e.options.upload.renderLinkDest)
                      return e.options.upload.renderLinkDest(e, Z, le);
                    var oe = Z.TokensStr();
                    if (Z.__internal_object__.Parent.Type === 34 && oe && oe.indexOf("file://") === -1 && e.options.upload.linkToImgUrl) {
                      var fe = new XMLHttpRequest();
                      fe.open("POST", e.options.upload.linkToImgUrl), e.options.upload.token && fe.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (fe.withCredentials = !0), Qt(e, fe), fe.setRequestHeader("Content-Type", "application/json; charset=utf-8"), fe.onreadystatechange = function() {
                        if (fe.readyState === XMLHttpRequest.DONE) {
                          if (fe.status === 200) {
                            var Te = fe.responseText;
                            e.options.upload.linkToImgFormat && (Te = e.options.upload.linkToImgFormat(fe.responseText));
                            var Le = JSON.parse(Te);
                            if (Le.code !== 0) {
                              e.tip.show(Le.msg);
                              return;
                            }
                            var _e = Le.data.originalURL;
                            if (e.currentMode === "sv")
                              e.sv.element.querySelectorAll(".vditor-sv__marker--link").forEach(function(we) {
                                we.textContent === _e && (we.textContent = Le.data.url);
                              });
                            else {
                              var Y = e[e.currentMode].element.querySelector('img[src="'.concat(_e, '"]'));
                              Y.src = Le.data.url, e.currentMode === "ir" && (Y.previousElementSibling.previousElementSibling.innerHTML = Le.data.url);
                            }
                            $(e);
                          } else
                            e.tip.show(fe.responseText);
                          e.options.upload.linkToImgCallback && e.options.upload.linkToImgCallback(fe.responseText);
                        }
                      }, fe.send(JSON.stringify({ url: oe }));
                    }
                    return e.currentMode === "ir" ? ['<span class="vditor-ir__marker vditor-ir__marker--link">'.concat(Lute.EscapeHTMLStr(oe), "</span>"), Lute.WalkContinue] : e.currentMode === "wysiwyg" ? ["", Lute.WalkContinue] : ['<span class="vditor-sv__marker--link">'.concat(Lute.EscapeHTMLStr(oe), "</span>"), Lute.WalkContinue];
                  }, (r.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<a href="'.concat(i, '">').concat(i, "</a>") || r.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<!--StartFragment--><a href="'.concat(i, '">').concat(i, "</a><!--EndFragment-->")) && (r = ""), h = new DOMParser().parseFromString(r, "text/html"), h.body && (r = h.body.innerHTML), r = Lute.Sanitize(r), e.wysiwyg.getComments(e), u = e[e.currentMode].element.scrollHeight, E = ve(r, i, e.currentMode), _ = e.currentMode === "sv" ? (0, s.a1)(t.target, "data-type", "code-block") : (0, s.lG)(t.target, "CODE"), _ ? (e.currentMode === "sv" ? document.execCommand("insertHTML", !1, i.replace(/&/g, "&amp;").replace(/</g, "&lt;")) : (P = (0, M.im)(t.target, e[e.currentMode].element), _.parentElement.tagName !== "PRE" && (i += v.g.ZWSP), _.textContent = _.textContent.substring(0, P.start) + i + _.textContent.substring(P.end), (0, M.$j)(P.start + i.length, P.start + i.length, _.parentElement), !((F = _.parentElement) === null || F === void 0) && F.nextElementSibling.classList.contains("vditor-".concat(e.currentMode, "__preview")) && (_.parentElement.nextElementSibling.innerHTML = _.outerHTML, ie(_.parentElement.nextElementSibling, e))), [3, 8]) : [3, 1]);
                case 1:
                  return E ? (n.pasteCode(E), [3, 8]) : [3, 2];
                case 2:
                  return r.trim() === "" ? [3, 3] : (R = document.createElement("div"), R.innerHTML = r, R.querySelectorAll("[style]").forEach(function(Z) {
                    Z.removeAttribute("style");
                  }), R.querySelectorAll(".vditor-copy").forEach(function(Z) {
                    Z.remove();
                  }), e.currentMode === "ir" ? (o.HTML2VditorIRDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, M.oC)(e.lute.HTML2VditorIRDOM(R.innerHTML), e)) : e.currentMode === "wysiwyg" ? (o.HTML2VditorDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, M.oC)(e.lute.HTML2VditorDOM(R.innerHTML), e)) : (o.Md2VditorSVDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), xt(e, e.lute.HTML2Md(R.innerHTML).trimRight())), e.outline.render(e), [3, 8]);
                case 3:
                  return a.length > 0 ? e.options.upload.url || e.options.upload.handler ? [4, Ht(e, a)] : [3, 5] : [3, 7];
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
                  i.trim() !== "" && a.length === 0 && (D = (0, M.zh)(e), D.toString() !== "" && e.lute.IsValidLinkDest(i) && (i = "[".concat(D.toString(), "](").concat(i, ")")), e.currentMode === "ir" ? (o.Md2VditorIRDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, M.oC)(e.lute.Md2VditorIRDOM(i), e)) : e.currentMode === "wysiwyg" ? (o.Md2VditorDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), (0, M.oC)(e.lute.Md2VditorDOM(i), e)) : (o.Md2VditorSVDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: o }), xt(e, i)), e.outline.render(e)), W.label = 8;
                case 8:
                  return e.currentMode !== "sv" && (B = (0, s.F9)((0, M.zh)(e).startContainer), B && (D = (0, M.zh)(e), e[e.currentMode].element.querySelectorAll("wbr").forEach(function(Z) {
                    Z.remove();
                  }), D.insertNode(document.createElement("wbr")), e.currentMode === "wysiwyg" ? B.outerHTML = e.lute.SpinVditorDOM(B.outerHTML) : B.outerHTML = e.lute.SpinVditorIRDOM(B.outerHTML), (0, M.ib)(e[e.currentMode].element, D)), e[e.currentMode].element.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(Z) {
                    ie(Z, e);
                  })), e.wysiwyg.triggerRemoveComment(e), $(e), e[e.currentMode].element.scrollHeight - u > Math.min(e[e.currentMode].element.clientHeight, window.innerHeight) / 2 && be(e), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, bn, wn = function(e) {
          e.hint.render(e);
          var t = (0, M.zh)(e).startContainer, n = (0, s.a1)(t, "data-type", "code-block-info");
          if (n)
            if (n.textContent.replace(v.g.ZWSP, "") === "" && e.hint.recentLanguage) {
              n.textContent = v.g.ZWSP + e.hint.recentLanguage;
              var r = (0, M.zh)(e);
              r.selectNodeContents(n);
            } else {
              var i = [], a = n.textContent.substring(0, (0, M.im)(n, e.ir.element).start).replace(v.g.ZWSP, "");
              (e.options.preview.hljs.langs || v.g.CODE_LANGUAGES).forEach(function(o) {
                o.indexOf(a.toLowerCase()) > -1 && i.push({
                  html: o,
                  value: o
                });
              }), e.hint.genHTML(i, a, e);
            }
        }, Pe = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && wn(e), clearTimeout(e.ir.processTimeoutId), e.ir.processTimeoutId = window.setTimeout(function() {
            if (!e.ir.composingLock) {
              var n = H(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, rt = function(e, t) {
          var n = (0, M.zh)(e), r = (0, s.F9)(n.startContainer) || n.startContainer;
          if (r) {
            var i = r.querySelector(".vditor-ir__marker--heading");
            i ? i.innerHTML = t : (r.insertAdjacentText("afterbegin", t), n.selectNodeContents(r), n.collapse(!1)), Be(e, n.cloneRange()), Qe(e);
          }
        }, yt = function(e, t, n) {
          var r = (0, s.a1)(e.startContainer, "data-type", n);
          if (r) {
            r.firstElementChild.remove(), r.lastElementChild.remove(), e.insertNode(document.createElement("wbr"));
            var i = document.createElement("div");
            i.innerHTML = t.lute.SpinVditorIRDOM(r.outerHTML), r.outerHTML = i.firstElementChild.innerHTML.trim();
          }
        }, nr = function(e, t, n, r) {
          var i = (0, M.zh)(e), a = t.getAttribute("data-type"), o = i.startContainer;
          o.nodeType === 3 && (o = o.parentElement);
          var d = !0;
          if (t.classList.contains("vditor-menu--current"))
            if (a === "quote") {
              var h = (0, s.lG)(o, "BLOCKQUOTE");
              h && (i.insertNode(document.createElement("wbr")), h.outerHTML = h.innerHTML.trim() === "" ? '<p data-block="0">'.concat(h.innerHTML, "</p>") : h.innerHTML);
            } else if (a === "link") {
              var u = (0, s.a1)(i.startContainer, "data-type", "a");
              if (u) {
                var E = (0, s.fb)(i.startContainer, "vditor-ir__link");
                E ? (i.insertNode(document.createElement("wbr")), u.outerHTML = E.innerHTML) : u.outerHTML = u.querySelector(".vditor-ir__link").innerHTML + "<wbr>";
              }
            } else a === "italic" ? yt(i, e, "em") : a === "bold" ? yt(i, e, "strong") : a === "strike" ? yt(i, e, "s") : a === "inline-code" ? yt(i, e, "code") : (a === "check" || a === "list" || a === "ordered-list") && (pt(e, i, a), d = !1, t.classList.remove("vditor-menu--current"));
          else {
            e.ir.element.childNodes.length === 0 && (e.ir.element.innerHTML = '<p data-block="0"><wbr></p>', (0, M.ib)(e.ir.element, i));
            var _ = (0, s.F9)(i.startContainer);
            if (a === "line") {
              if (_) {
                var P = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                _.innerHTML.trim() === "" ? _.outerHTML = P : _.insertAdjacentHTML("afterend", P);
              }
            } else if (a === "quote")
              _ && (i.insertNode(document.createElement("wbr")), _.outerHTML = '<blockquote data-block="0">'.concat(_.outerHTML, "</blockquote>"), d = !1, t.classList.add("vditor-menu--current"));
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
              O.innerHTML = R, i.insertNode(O), Be(e, i), a === "table" && (i.selectNodeContents(getSelection().getRangeAt(0).startContainer.parentElement), (0, M.Hc)(i));
            } else (a === "check" || a === "list" || a === "ordered-list") && (pt(e, i, a, !1), d = !1, g(e.toolbar.elements, ["check", "list", "ordered-list"]), t.classList.add("vditor-menu--current"));
          }
          (0, M.ib)(e.ir.element, i), Pe(e), d && Qe(e);
        }, rr = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function d(E) {
              try {
                u(r.next(E));
              } catch (_) {
                o(_);
              }
            }
            function h(E) {
              try {
                u(r.throw(E));
              } catch (_) {
                o(_);
              }
            }
            function u(E) {
              E.done ? a(E.value) : i(E.value).then(d, h);
            }
            u((r = r.apply(e, [])).next());
          });
        }, ir = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1) throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(u) {
            return function(E) {
              return h([u, E]);
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
            } catch (E) {
              u = [6, E], i = 0;
            } finally {
              r = a = 0;
            }
            if (u[0] & 5) throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, ar = (
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
                    d.textContent = v.g.ZWSP + a.trimRight(), o.selectNodeContents(d), o.collapse(!1), Pe(i), d.parentElement.querySelectorAll("code").forEach(function(_) {
                      _.className = "language-" + a.trimRight();
                    }), ie(d.parentElement.querySelector(".vditor-ir__preview"), i), n.recentLanguage = a.trimRight();
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
                if (o.setStart(o.startContainer, n.lastIndex), o.deleteContents(), i.options.hint.parse ? i.currentMode === "sv" ? (0, M.oC)(i.lute.SpinVditorSVDOM(a), i) : i.currentMode === "wysiwyg" ? (0, M.oC)(i.lute.SpinVditorDOM(a), i) : (0, M.oC)(i.lute.SpinVditorIRDOM(a), i) : (0, M.oC)(a, i), n.splitChar === ":" && a.indexOf(":") > -1 && i.currentMode !== "sv" && o.insertNode(document.createTextNode(" ")), o.collapse(!1), (0, M.Hc)(o), i.currentMode === "wysiwyg") {
                  var E = (0, s.fb)(o.startContainer, "vditor-wysiwyg__block");
                  E && E.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (E.lastElementChild.innerHTML = E.firstElementChild.innerHTML, ie(E.lastElementChild, i));
                } else if (i.currentMode === "ir") {
                  var E = (0, s.fb)(o.startContainer, "vditor-ir__marker--pre");
                  E && E.nextElementSibling.classList.contains("vditor-ir__preview") && (E.nextElementSibling.innerHTML = E.innerHTML, ie(E.nextElementSibling, i));
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
                      return rr(n, void 0, void 0, function() {
                        var u;
                        return ir(this, function(E) {
                          switch (E.label) {
                            case 0:
                              return u = this.genHTML, [4, h.hint(a)];
                            case 1:
                              return u.apply(this, [E.sent(), a, t]), [
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
              var a = r[r.currentMode].element, o = (0, M.Ny)(a), d = o.left + (r.options.outline.position === "left" ? r.outline.element.offsetWidth : 0), h = o.top, u = "";
              t.forEach(function(_, P) {
                if (!(P > 7)) {
                  var R = _.html;
                  if (n !== "") {
                    var O = R.lastIndexOf(">") + 1, q = R.substr(O), B = q.toLowerCase().indexOf(n.toLowerCase());
                    B > -1 && (q = q.substring(0, B) + "<b>" + q.substring(B, B + n.length) + "</b>" + q.substring(B + n.length), R = R.substr(0, O) + q);
                  }
                  u += '<button type="button" data-value="'.concat(encodeURIComponent(_.value), ` "
`).concat(P === 0 ? "class='vditor-hint--current'" : "", "> ").concat(R, "</button>");
                }
              }), this.element.innerHTML = u;
              var E = parseInt(document.defaultView.getComputedStyle(a, null).getPropertyValue("line-height"), 10);
              this.element.style.top = "".concat(h + (E || 22), "px"), this.element.style.left = "".concat(d, "px"), this.element.style.display = "block", this.element.style.right = "auto", this.element.querySelectorAll("button").forEach(function(_) {
                _.addEventListener("click", function(P) {
                  i.fillEmoji(_, r), P.preventDefault();
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
                var E = t.lastIndexOf(u.key);
                r.lastIndex < E && (r.splitChar = u.key, r.lastIndex = E);
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
        ), or = (
          /** @class */
          function() {
            function e(t) {
              this.composingLock = !1;
              var n = document.createElement("div");
              n.className = "vditor-ir", n.innerHTML = '<pre class="vditor-reset" placeholder="'.concat(t.options.placeholder, `"
 contenteditable="true" spellcheck="false"></pre>`), this.element = n.firstElementChild, this.bindEvent(t), Ct(t, this.element), Zt(t, this.element), Lt(t, this.element), kt(t, this.element), At(t, this.element), Mt(t, this.element), Tt(t, this.element, this.copy), _t(t, this.element, this.copy);
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
                gt(t, r, {
                  pasteCode: function(i) {
                    document.execCommand("insertHTML", !1, i);
                  }
                });
              }), this.element.addEventListener("scroll", function() {
                S(t, ["hint"]);
              }), this.element.addEventListener("compositionstart", function(r) {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                (0, l.vU)() || Be(t, getSelection().getRangeAt(0).cloneRange()), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop")) {
                  if (n.preventInput) {
                    n.preventInput = !1, Pe(t, {
                      enableAddUndoStack: !0,
                      enableHint: !0,
                      enableInput: !0
                    });
                    return;
                  }
                  n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《" || Be(t, getSelection().getRangeAt(0).cloneRange(), !1, r);
                }
              }), this.element.addEventListener("click", function(r) {
                if (r.target.tagName === "INPUT") {
                  r.target.checked ? r.target.setAttribute("checked", "checked") : r.target.removeAttribute("checked"), n.preventInput = !0, Pe(t);
                  return;
                }
                var i = (0, M.zh)(t), a = (0, s.fb)(r.target, "vditor-ir__preview");
                if (a || (a = (0, s.fb)(i.startContainer, "vditor-ir__preview")), a && (a.previousElementSibling.firstElementChild ? i.selectNodeContents(a.previousElementSibling.firstElementChild) : i.selectNodeContents(a.previousElementSibling), i.collapse(!0), (0, M.Hc)(i), be(t)), r.target.tagName === "IMG") {
                  var o = r.target.parentElement.querySelector(".vditor-ir__marker--link");
                  o && (i.selectNode(o), (0, M.Hc)(i));
                }
                var d = (0, s.a1)(r.target, "data-type", "a");
                if (d && !d.classList.contains("vditor-ir__node--expand")) {
                  t.options.link.click ? t.options.link.click(d.querySelector(":scope > .vditor-ir__marker--link")) : t.options.link.isOpen && window.open(d.querySelector(":scope > .vditor-ir__marker--link").textContent);
                  return;
                }
                if (r.target.isEqualNode(n.element) && n.element.lastElementChild && i.collapsed) {
                  var h = n.element.lastElementChild.getBoundingClientRect();
                  r.y > h.top + h.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(v.g.ZWSP, "") === "" ? (i.selectNodeContents(n.element.lastElementChild), i.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", '<p data-block="0">'.concat(v.g.ZWSP, "<wbr></p>")), (0, M.ib)(n.element, i)));
                }
                i.toString() === "" ? j(i, t) : setTimeout(function() {
                  j((0, M.zh)(t), t);
                }), ot(r, t), Qe(t);
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l.yl)(r))) {
                  if (r.key === "Enter" && be(t), Qe(t), (r.key === "Backspace" || r.key === "Delete") && t.ir.element.innerHTML !== "" && t.ir.element.childNodes.length === 1 && t.ir.element.firstElementChild && t.ir.element.firstElementChild.tagName === "P" && t.ir.element.firstElementChild.childElementCount === 0 && (t.ir.element.textContent === "" || t.ir.element.textContent === `
`)) {
                    t.ir.element.innerHTML = "";
                    return;
                  }
                  var i = (0, M.zh)(t);
                  r.key === "Backspace" ? ((0, l.vU)() && i.startContainer.textContent === `
` && i.startOffset === 1 && (i.startContainer.textContent = "", j(i, t)), n.element.querySelectorAll(".language-math").forEach(function(o) {
                    var d = o.querySelector("br");
                    d && d.remove();
                  })) : r.key.indexOf("Arrow") > -1 ? ((r.key === "ArrowLeft" || r.key === "ArrowRight") && wn(t), j(i, t)) : r.keyCode === 229 && r.code === "" && r.key === "Unidentified" && j(i, t);
                  var a = (0, s.fb)(i.startContainer, "vditor-ir__preview");
                  if (a) {
                    if (r.key === "ArrowUp" || r.key === "ArrowLeft")
                      return a.previousElementSibling.firstElementChild ? i.selectNodeContents(a.previousElementSibling.firstElementChild) : i.selectNodeContents(a.previousElementSibling), i.collapse(!1), r.preventDefault(), !0;
                    if (a.tagName === "SPAN" && (r.key === "ArrowDown" || r.key === "ArrowRight"))
                      return a.parentElement.getAttribute("data-type") === "html-entity" ? (a.parentElement.insertAdjacentText("afterend", v.g.ZWSP), i.setStart(a.parentElement.nextSibling, 1)) : i.selectNodeContents(a.parentElement.lastElementChild), i.collapse(!1), r.preventDefault(), !0;
                  }
                }
              });
            }, e;
          }()
        ), vn = function(e) {
          if (e.currentMode === "sv")
            return e.lute.Md2HTML(H(e));
          if (e.currentMode === "wysiwyg")
            return e.lute.VditorDOM2HTML(e.wysiwyg.element.innerHTML);
          if (e.currentMode === "ir")
            return e.lute.VditorIRDOM2HTML(e.ir.element.innerHTML);
        }, sr = ee(65), En = ee(182), lr = (
          /** @class */
          function() {
            function e(t) {
              this.element = document.createElement("div"), this.element.className = "vditor-outline", this.element.innerHTML = '<div class="vditor-outline__title">'.concat(t, `</div>
<div class="vditor-outline__content"></div>`);
            }
            return e.prototype.render = function(t) {
              var n = "";
              return t.preview.element.style.display === "block" ? n = (0, En.k)(t.preview.previewElement, this.element.lastElementChild, t) : n = (0, En.k)(t[t.currentMode].element, this.element.lastElementChild, t), n;
            }, e.prototype.toggle = function(t, n, r) {
              var i;
              n === void 0 && (n = !0), r === void 0 && (r = !0);
              var a = (i = t.toolbar.elements.outline) === null || i === void 0 ? void 0 : i.firstElementChild;
              if (n && window.innerWidth >= v.g.MOBILE_WIDTH ? (this.element.style.display = "block", this.render(t), a == null || a.classList.add("vditor-menu--current")) : (this.element.style.display = "none", a == null || a.classList.remove("vditor-menu--current")), r && getSelection().rangeCount > 0) {
                var o = getSelection().getRangeAt(0);
                t[t.currentMode].element.contains(o.startContainer) && (0, M.Hc)(o);
              }
              xe(t);
            }, e;
          }()
        ), cr = ee(431), ur = (
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
                  var E = n.previewElement.querySelector("#" + u.getAttribute("data-target-id"));
                  E && (n.element.scrollTop = E.offsetTop);
                  return;
                }
                if (h.target.tagName === "A") {
                  t.options.link.click ? t.options.link.click(h.target) : t.options.link.isOpen && window.open(h.target.getAttribute("href")), h.preventDefault();
                  return;
                }
                h.target.tagName === "IMG" && (t.options.image.preview ? t.options.image.preview(h.target) : t.options.image.isPreview && (0, G.E)(h.target, t.options.lang, t.options.theme));
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
                    var E = u.getAttribute("data-type"), _ = r.find(function(P) {
                      return (P == null ? void 0 : P.key) === E;
                    });
                    if (_) {
                      _.click(E);
                      return;
                    }
                    if (E === "mp-wechat" || E === "zhihu") {
                      n.copyToX(t, n.previewElement.cloneNode(!0), E);
                      return;
                    }
                    E === "desktop" ? n.previewElement.style.width = "auto" : E === "tablet" ? n.previewElement.style.width = "780px" : n.previewElement.style.width = "360px", n.previewElement.scrollWidth > n.previewElement.parentElement.clientWidth && (n.previewElement.style.width = "auto"), n.render(t), i.querySelectorAll("button").forEach(function(P) {
                      P.classList.remove("vditor-preview__action--current");
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
              if (H(t).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === "") {
                this.previewElement.innerHTML = "";
                return;
              }
              var i = (/* @__PURE__ */ new Date()).getTime(), a = H(t);
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
              i && i.classList.remove("vditor-comment--focus"), (0, I.O)(t.preview.previewElement, t.options.preview.hljs), (0, Q.s)(t.options.preview.hljs, t.preview.previewElement, t.options.cdn), (0, se.i)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, ge.K)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, V.P)(t.preview.previewElement, t.options.cdn), (0, z.v)(t.preview.previewElement, t.options.cdn), (0, T.p)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, de.P)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, ce.B)(t.preview.previewElement, t.options.cdn), (0, x.Q)(t.preview.previewElement, t.options.cdn), t.options.preview.render.media.enable && (0, cr.Y)(t.preview.previewElement), t.options.customRenders.forEach(function(d) {
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
              i.selectNode(n), (0, M.Hc)(i), document.execCommand("copy"), n.remove(), t.tip.show(["zhihu", "mp-wechat"].includes(r) ? "已复制，可到".concat(r === "zhihu" ? "知乎" : "微信公众号平台", "进行粘贴") : "已复制到剪切板");
            }, e;
          }()
        ), fr = (
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
        ), dr = (
          /** @class */
          function() {
            function e(t) {
              this.composingLock = !1, this.element = document.createElement("pre"), this.element.className = "vditor-sv vditor-reset", this.element.setAttribute("placeholder", t.options.placeholder), this.element.setAttribute("contenteditable", "true"), this.element.setAttribute("spellcheck", "false"), this.bindEvent(t), Ct(t, this.element), Lt(t, this.element), kt(t, this.element), At(t, this.element), Mt(t, this.element), Tt(t, this.element, this.copy), _t(t, this.element, this.copy);
            }
            return e.prototype.copy = function(t, n) {
              t.stopPropagation(), t.preventDefault(), t.clipboardData.setData("text/plain", tt(n[n.currentMode].element));
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.element.addEventListener("paste", function(r) {
                gt(t, r, {
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
                (0, l.vU)() || ae(t, r), n.composingLock = !1;
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
                  ae(t, r);
                }
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l.yl)(r))) {
                  if ((r.key === "Backspace" || r.key === "Delete") && t.sv.element.innerHTML !== "" && t.sv.element.childNodes.length === 1 && t.sv.element.firstElementChild && t.sv.element.firstElementChild.tagName === "DIV" && t.sv.element.firstElementChild.childElementCount === 2 && (t.sv.element.firstElementChild.textContent === "" || t.sv.element.textContent === `
`)) {
                    t.sv.element.innerHTML = "";
                    return;
                  }
                  r.key === "Enter" && be(t);
                }
              });
            }, e;
          }()
        ), Sn = (
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
        ), Pt = function(e, t) {
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
        }, pr = /* @__PURE__ */ function() {
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
        }(), hr = (
          /** @class */
          function(e) {
            pr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return n.options.preview.mode === "both" && i.element.children[0].classList.add("vditor-menu--current"), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                var o = i.element.firstElementChild;
                o.classList.contains(v.g.CLASS_MENU_DISABLED) || (a.preventDefault(), n.currentMode === "sv" && (n.options.preview.mode === "both" ? Pt("editor", n) : Pt("both", n)));
              }), i;
            }
            return t;
          }(me)
        ), mr = (
          /** @class */
          /* @__PURE__ */ function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-toolbar__br";
            }
            return e;
          }()
        ), Cn = ee(34), gr = /* @__PURE__ */ function() {
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
        }(), yr = (
          /** @class */
          function(e) {
            gr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow");
              var d = "";
              return v.g.CODE_THEME.forEach(function(h) {
                d += "<button>".concat(h, "</button>");
              }), o.innerHTML = '<div style="overflow: auto;max-height:'.concat(window.innerHeight / 2, 'px">').concat(d, "</div>"), o.addEventListener((0, l.Le)(), function(h) {
                h.target.tagName === "BUTTON" && (S(n, ["subToolbar"]), n.options.preview.hljs.style = h.target.textContent, (0, Cn.Y)(h.target.textContent, n.options.cdn), h.preventDefault(), h.stopPropagation());
              }), i.element.appendChild(o), b(n, o, a, r.level), i;
            }
            return t;
          }(me)
        ), br = /* @__PURE__ */ function() {
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
        }(), wr = (
          /** @class */
          function(e) {
            br(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow");
              var d = "";
              return Object.keys(n.options.preview.theme.list).forEach(function(h) {
                d += '<button data-type="'.concat(h, '">').concat(n.options.preview.theme.list[h], "</button>");
              }), o.innerHTML = '<div style="overflow: auto;max-height:'.concat(window.innerHeight / 2, 'px">').concat(d, "</div>"), o.addEventListener((0, l.Le)(), function(h) {
                h.target.tagName === "BUTTON" && (S(n, ["subToolbar"]), n.options.preview.theme.current = h.target.getAttribute("data-type"), (0, X.Z)(n.options.preview.theme.current, n.options.preview.theme.path), h.preventDefault(), h.stopPropagation());
              }), i.element.appendChild(o), b(n, o, a, r.level), i;
            }
            return t;
          }(me)
        ), vr = (
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
        ), Er = /* @__PURE__ */ function() {
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
        }(), Sr = (
          /** @class */
          function(e) {
            Er(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].innerHTML = r.icon, i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !a.currentTarget.classList.contains(v.g.CLASS_MENU_DISABLED) && r.click(a, n);
              }), i;
            }
            return t;
          }(me)
        ), Cr = /* @__PURE__ */ function() {
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
        }(), Lr = (
          /** @class */
          function(e) {
            Cr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.firstElementChild.addEventListener((0, l.Le)(), function(a) {
                var o = i.element.firstElementChild;
                o.classList.contains(v.g.CLASS_MENU_DISABLED) || (a.preventDefault(), o.classList.contains("vditor-menu--current") ? (o.classList.remove("vditor-menu--current"), n.devtools.element.style.display = "none", xe(n)) : (o.classList.add("vditor-menu--current"), n.devtools.element.style.display = "block", xe(n), n.devtools.renderEchart(n)));
              }), i;
            }
            return t;
          }(me)
        ), Mr = (
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
</div>`), i.element.appendChild(a), b(n, a, i.element.firstElementChild, r.level), i.bindEvent(n), i;
            }
            return t.prototype.bindEvent = function(n) {
              var r = this;
              this.element.lastElementChild.addEventListener((0, l.Le)(), function(i) {
                var a = (0, C.S)(i.target, "BUTTON");
                if (a) {
                  i.preventDefault();
                  var o = a.getAttribute("data-value"), d = (0, M.zh)(n), h = o;
                  if (n.currentMode === "wysiwyg" ? h = n.lute.SpinVditorDOM(o) : n.currentMode === "ir" && (h = n.lute.SpinVditorIRDOM(o)), o.indexOf(":") > -1 && n.currentMode !== "sv") {
                    var u = document.createElement("div");
                    u.innerHTML = h, h = u.firstElementChild.firstElementChild.outerHTML + " ", (0, M.oC)(h, n);
                  } else
                    d.extractContents(), d.insertNode(document.createTextNode(o));
                  d.collapse(!1), (0, M.Hc)(d), r.element.lastElementChild.style.display = "none", $(n);
                }
              }), this.element.lastElementChild.addEventListener("mouseover", function(i) {
                var a = (0, C.S)(i.target, "BUTTON");
                a && (r.element.querySelector(".vditor-emojis__tip").innerHTML = a.getAttribute("data-key"));
              });
            }, t;
          }(me)
        ), Ln = function(e, t, n) {
          var r = document.createElement("a");
          "download" in r ? (r.download = n, r.style.display = "none", r.href = URL.createObjectURL(new Blob([t])), document.body.appendChild(r), r.click(), r.remove()) : e.tip.show(window.VditorI18n.downloadTip, 0);
        }, kr = function(e) {
          var t = H(e);
          Ln(e, t, t.substr(0, 10) + ".md");
        }, Ar = function(e) {
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
            t.contentWindow.postMessage(H(e), "*");
          }, 200);
        }, xr = function(e) {
          var t = vn(e), n = '<html><head><link rel="stylesheet" type="text/css" href="'.concat(e.options.cdn, `/dist/index.css"/>
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
    Vditor.markmapRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.flowchartRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.graphvizRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.chartRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.mindmapRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.abcRender(previewElement, '`).concat(e.options.cdn, `');
    `).concat(e.options.preview.render.media.enable ? "Vditor.mediaRender(previewElement);" : "", `
    Vditor.speechRender(previewElement);
<\/script>
<script src="`).concat(e.options.cdn, "/dist/js/icons/").concat(e.options.icon, '.js"><\/script></body></html>');
          Ln(e, n, t.substr(0, 10) + ".html");
        }, Hr = /* @__PURE__ */ function() {
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
        }(), Dr = (
          /** @class */
          function(e) {
            Hr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              return o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow"), o.innerHTML = `<button data-type="markdown">Markdown</button>
<button data-type="pdf">PDF</button>
<button data-type="html">HTML</button>`, o.addEventListener((0, l.Le)(), function(d) {
                var h = d.target;
                if (h.tagName === "BUTTON") {
                  switch (h.getAttribute("data-type")) {
                    case "markdown":
                      kr(n);
                      break;
                    case "pdf":
                      Ar(n);
                      break;
                    case "html":
                      xr(n);
                      break;
                  }
                  S(n, ["subToolbar"]), d.preventDefault(), d.stopPropagation();
                }
              }), i.element.appendChild(o), b(n, o, a, r.level), i;
            }
            return t;
          }(me)
        ), Or = /* @__PURE__ */ function() {
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
        }(), Nr = (
          /** @class */
          function(e) {
            Or(t, e);
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
                }), n.counter && (n.counter.element.className = n.counter.element.className.replace("__n", "__s"))), n.devtools && n.devtools.renderEchart(n), r.click && r.click(i, n), xe(n), lt(n);
              });
            }, t;
          }(me)
        ), Rr = /* @__PURE__ */ function() {
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
            Rr(t, e);
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
                o.preventDefault(), clearTimeout(n.wysiwyg.afterRenderTimeoutId), clearTimeout(n.ir.processTimeoutId), clearTimeout(n.sv.processTimeoutId), !i.classList.contains(v.g.CLASS_MENU_DISABLED) && (i.blur(), i.classList.contains("vditor-menu--current") ? (n.currentMode === "wysiwyg" ? (Et(n), ue(n)) : n.currentMode === "ir" && rt(n, ""), i.classList.remove("vditor-menu--current")) : (S(n, ["subToolbar"]), r.style.display = "block"));
              });
              for (var a = 0; a < 6; a++)
                r.children.item(a).addEventListener((0, l.Le)(), function(o) {
                  o.preventDefault(), n.currentMode === "wysiwyg" ? (ct(n, o.target.getAttribute("data-tag")), ue(n), i.classList.add("vditor-menu--current")) : n.currentMode === "ir" ? (rt(n, o.target.getAttribute("data-value")), i.classList.add("vditor-menu--current")) : Jt(n, o.target.getAttribute("data-value")), r.style.display = "none";
                });
            }, t;
          }(me)
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
        }(), jr = (
          /** @class */
          function(e) {
            Ir(t, e);
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
          }(me)
        ), Br = /* @__PURE__ */ function() {
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
        }(), Ur = (
          /** @class */
          function(e) {
            Br(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                if (a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED) || n.currentMode === "sv")) {
                  var o = (0, M.zh)(n), d = (0, s.lG)(o.startContainer, "LI");
                  d && rn(n, d, o);
                }
              }), i;
            }
            return t;
          }(me)
        ), Vr = /* @__PURE__ */ function() {
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
        }(), Wr = (
          /** @class */
          function(e) {
            Vr(t, e);
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
        组件版本：Vditor v`.concat(v.H, " / Lute v").concat(Lute.Version, `
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
          }(me)
        ), Kr = /* @__PURE__ */ function() {
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
        }(), qr = (
          /** @class */
          function(e) {
            Kr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED) || n.currentMode === "sv") && dt(n, "afterend");
              }), i;
            }
            return t;
          }(me)
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
        }(), zr = (
          /** @class */
          function(e) {
            Gr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED) || n.currentMode === "sv") && dt(n, "beforebegin");
              }), i;
            }
            return t;
          }(me)
        ), Fr = /* @__PURE__ */ function() {
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
        }(), Zr = (
          /** @class */
          function(e) {
            Fr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                if (a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED) || n.currentMode === "sv")) {
                  var o = (0, M.zh)(n), d = (0, s.lG)(o.startContainer, "LI");
                  d && Dt(n, d, o, d.parentElement);
                }
              }), i;
            }
            return t;
          }(me)
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
        }(), Jr = (
          /** @class */
          function(e) {
            Xr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return n.options.outline && i.element.firstElementChild.classList.add("vditor-menu--current"), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault();
                var o = n.toolbar.elements.outline.firstElementChild;
                o.classList.contains(v.g.CLASS_MENU_DISABLED) || (n.options.outline.enable = !i.element.firstElementChild.classList.contains("vditor-menu--current"), n.outline.toggle(n, n.options.outline.enable));
              }), i;
            }
            return t;
          }(me)
        ), Yr = /* @__PURE__ */ function() {
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
        }(), Qr = (
          /** @class */
          function(e) {
            Yr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this;
              this.element.children[0].addEventListener((0, l.Le)(), function(i) {
                i.preventDefault();
                var a = r.element.firstElementChild;
                if (!a.classList.contains(v.g.CLASS_MENU_DISABLED)) {
                  var o = v.g.EDIT_TOOLBARS.concat(["both", "edit-mode", "devtools"]);
                  a.classList.contains("vditor-menu--current") ? (a.classList.remove("vditor-menu--current"), n.currentMode === "sv" ? (n.sv.element.style.display = "block", n.options.preview.mode === "both" ? n.preview.element.style.display = "block" : n.preview.element.style.display = "none") : (n[n.currentMode].element.parentElement.style.display = "block", n.preview.element.style.display = "none"), m(n.toolbar.elements, o), n.outline.render(n)) : (f(n.toolbar.elements, o), n.preview.element.style.display = "block", n.currentMode === "sv" ? n.sv.element.style.display = "none" : n[n.currentMode].element.parentElement.style.display = "none", n.preview.render(n), a.classList.add("vditor-menu--current"), S(n, ["subToolbar", "hint", "popover"]), setTimeout(function() {
                    n.outline.render(n);
                  }, n.options.preview.delay + 10)), xe(n);
                }
              });
            }, t;
          }(me)
        ), $r = (
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
              for (var u = r.length, E = 44, _ = 1, P = 0; P < u; P++)
                d.setInt16(E, r[P] * (32767 * _), !0), E += 2;
              return new Blob([d], { type: "audio/wav" });
            }, e.prototype.downSampleBuffer = function(t, n) {
              if (n === this.DEFAULT_SAMPLE_RATE || n > this.DEFAULT_SAMPLE_RATE)
                return t;
              for (var r = this.DEFAULT_SAMPLE_RATE / n, i = Math.round(t.length / r), a = new Float32Array(i), o = 0, d = 0; o < a.length; ) {
                for (var h = Math.round((o + 1) * r), u = 0, E = 0, _ = d; _ < h && _ < t.length; _++)
                  u += t[_], E++;
                a[o] = u / E, o++, d = h;
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
        ), ei = /* @__PURE__ */ function() {
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
        }(), ti = (
          /** @class */
          function(e) {
            ei(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this, i;
              this.element.children[0].addEventListener((0, l.Le)(), function(a) {
                if (a.preventDefault(), !r.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED)) {
                  var o = n[n.currentMode].element;
                  if (!i) {
                    navigator.mediaDevices.getUserMedia({ audio: !0 }).then(function(h) {
                      i = new $r(h), i.recorder.onaudioprocess = function(u) {
                        if (i.isRecording) {
                          var E = u.inputBuffer.getChannelData(0), _ = u.inputBuffer.getChannelData(1);
                          i.cloneChannelData(E, _);
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
                    Ht(n, [d]), r.element.children[0].classList.remove("vditor-menu--current");
                  } else
                    n.tip.show(window.VditorI18n.recording), o.setAttribute("contenteditable", "false"), i.startRecordingNewWavFile(), r.element.children[0].classList.add("vditor-menu--current");
                }
              });
            }, t;
          }(me)
        ), ni = /* @__PURE__ */ function() {
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
        }(), ri = (
          /** @class */
          function(e) {
            ni(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return f({ redo: i.element }, ["redo"]), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !i.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED) && n.undo.redo(n);
              }), i;
            }
            return t;
          }(me)
        ), ii = /* @__PURE__ */ function() {
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
        }(), ai = (
          /** @class */
          function(e) {
            ii(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return f({ undo: i.element }, ["undo"]), i.element.children[0].addEventListener((0, l.Le)(), function(a) {
                a.preventDefault(), !i.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED) && n.undo.undo(n);
              }), i;
            }
            return t;
          }(me)
        ), oi = /* @__PURE__ */ function() {
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
        }(), si = (
          /** @class */
          function(e) {
            oi(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = '<input type="file"';
              return n.options.upload.multiple && (a += ' multiple="multiple"'), n.options.upload.accept && (a += ' accept="'.concat(n.options.upload.accept, '"')), i.element.children[0].innerHTML = "".concat(r.icon || '<svg><use xlink:href="#vditor-icon-upload"></use></svg>').concat(a, ">"), i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this;
              this.element.children[0].addEventListener((0, l.Le)(), function(i) {
                if (r.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED)) {
                  i.stopPropagation(), i.preventDefault();
                  return;
                }
              }), this.element.querySelector("input").addEventListener("change", function(i) {
                if (r.element.firstElementChild.classList.contains(v.g.CLASS_MENU_DISABLED)) {
                  i.stopPropagation(), i.preventDefault();
                  return;
                }
                i.target.files.length !== 0 && Ht(n, i.target.files, i.target);
              });
            }, t;
          }(me)
        ), li = (
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
                  }), o.appendChild(d), b(t, d, o.children[0]);
                }
              }), t.options.toolbarConfig.hide && this.element.classList.add("vditor-toolbar--hide"), t.options.toolbarConfig.pin && this.element.classList.add("vditor-toolbar--pin"), t.options.counter.enable && (t.counter = new vr(t), this.element.appendChild(t.counter.element));
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
                  i = new me(t, n);
                  break;
                case "emoji":
                  i = new _r(t, n);
                  break;
                case "headings":
                  i = new Pr(t, n);
                  break;
                case "|":
                  i = new Mr();
                  break;
                case "br":
                  i = new mr();
                  break;
                case "undo":
                  i = new ai(t, n);
                  break;
                case "redo":
                  i = new ri(t, n);
                  break;
                case "help":
                  i = new jr(t, n);
                  break;
                case "both":
                  i = new hr(t, n);
                  break;
                case "preview":
                  i = new Qr(t, n);
                  break;
                case "fullscreen":
                  i = new Nr(t, n);
                  break;
                case "upload":
                  i = new si(t, n);
                  break;
                case "record":
                  i = new ti(t, n);
                  break;
                case "info":
                  i = new Wr(t, n);
                  break;
                case "edit-mode":
                  i = new Kn(t, n);
                  break;
                case "devtools":
                  i = new Lr(t, n);
                  break;
                case "outdent":
                  i = new Zr(t, n);
                  break;
                case "indent":
                  i = new Ur(t, n);
                  break;
                case "outline":
                  i = new Jr(t, n);
                  break;
                case "insert-after":
                  i = new qr(t, n);
                  break;
                case "insert-before":
                  i = new zr(t, n);
                  break;
                case "code-theme":
                  i = new yr(t, n);
                  break;
                case "content-theme":
                  i = new wr(t, n);
                  break;
                case "export":
                  i = new Dr(t, n);
                  break;
                default:
                  i = new Sr(t, n);
                  break;
              }
              if (i) {
                var a = n.name;
                return (a === "br" || a === "|") && (a = a + r), this.elements[a] = i.element, i.element;
              }
            }, e;
          }()
        ), ci = ee(85), ui = (
          /** @class */
          function() {
            function e() {
              this.stackSize = 50, this.resetStack(), this.dmp = new ci();
            }
            return e.prototype.clearStack = function(t) {
              this.resetStack(), this.resetIcon(t);
            }, e.prototype.resetIcon = function(t) {
              t.toolbar && (this[t.currentMode].undoStack.length > 1 ? m(t.toolbar.elements, ["undo"]) : f(t.toolbar.elements, ["undo"]), this[t.currentMode].redoStack.length !== 0 ? m(t.toolbar.elements, ["redo"]) : f(t.toolbar.elements, ["redo"]));
            }, e.prototype.undo = function(t) {
              if (t[t.currentMode].element.getAttribute("contenteditable") !== "false" && !(this[t.currentMode].undoStack.length < 2)) {
                var n = this[t.currentMode].undoStack.pop();
                n && (this[t.currentMode].redoStack.push(n), this.renderDiff(n, t), this[t.currentMode].hasUndo = !0, S(t, ["hint"]));
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
              if (this[n.currentMode].lastText = i, n[n.currentMode].element.innerHTML = i, n.currentMode !== "sv" && n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview[data-render='2']")).forEach(function(d) {
                ie(d, n);
              }), n[n.currentMode].element.querySelector("wbr"))
                (0, M.ib)(n[n.currentMode].element, n[n.currentMode].element.ownerDocument.createRange()), be(n);
              else {
                var o = getSelection().getRangeAt(0);
                o.setEndBefore(n[n.currentMode].element), o.collapse(!1);
              }
              Ne(n), $(n, {
                enableAddUndoStack: !1,
                enableHint: !1,
                enableInput: !0
              }), ze(n), n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview[data-render='2']")).forEach(function(d) {
                ie(d, n);
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
              }), n && r && (0, M.Hc)(r), d.replace('<span class="vditor-wbr"></span>', "<wbr>");
            }, e;
          }()
        ), fi = ee(2), di = (
          /** @class */
          function() {
            function e(t) {
              this.defaultOptions = {
                rtl: !1,
                after: void 0,
                cache: {
                  enable: !0
                },
                cdn: v.g.CDN,
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
                  emojiPath: "".concat(v.g.CDN, "/dist/images/emoji"),
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
                  hljs: v.g.HLJS_OPTIONS,
                  markdown: v.g.MARKDOWN_OPTIONS,
                  math: v.g.MATH_OPTIONS,
                  maxWidth: 800,
                  mode: "both",
                  theme: v.g.THEME_OPTIONS,
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
              var E = (0, fi.T)(this.defaultOptions, this.options);
              if (E.cache.enable && !E.cache.id)
                throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
              return E;
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
        ), pi = (
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
</div>`), this.element = r.firstElementChild, this.popover = r.firstElementChild.nextElementSibling, this.selectPopover = r.lastElementChild, this.bindEvent(t), Ct(t, this.element), Zt(t, this.element), Lt(t, this.element), kt(t, this.element), At(t, this.element), Mt(t, this.element), Tt(t, this.element, this.copy), _t(t, this.element, this.copy), t.options.comment.enable && (this.selectPopover.querySelector("button").onclick = function() {
                var i = Lute.NewNodeID(), a = getSelection().getRangeAt(0), o = a.cloneRange(), d = a.extractContents(), h, u, E = !1, _ = !1;
                d.childNodes.forEach(function(O, q) {
                  var B = !1;
                  if (O.nodeType === 3 ? B = !0 : O.classList.contains("vditor-comment") ? O.classList.contains("vditor-comment") && O.setAttribute("data-cmtids", O.getAttribute("data-cmtids") + " " + i) : B = !0, B)
                    if (O.nodeType !== 3 && O.getAttribute("data-block") === "0" && q === 0 && o.startOffset > 0)
                      O.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(O.innerHTML, "</span>"), h = O;
                    else if (O.nodeType !== 3 && O.getAttribute("data-block") === "0" && q === d.childNodes.length - 1 && o.endOffset < o.endContainer.textContent.length)
                      O.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(O.innerHTML, "</span>"), u = O;
                    else if (O.nodeType !== 3 && O.getAttribute("data-block") === "0")
                      q === 0 ? E = !0 : q === d.childNodes.length - 1 && (_ = !0), O.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(O.innerHTML, "</span>");
                    else {
                      var D = document.createElement("span");
                      D.classList.add("vditor-comment"), D.setAttribute("data-cmtids", i), O.parentNode.insertBefore(D, O), D.appendChild(O);
                    }
                });
                var P = (0, s.F9)(o.startContainer);
                P && (h ? (P.insertAdjacentHTML("beforeend", h.innerHTML), h.remove()) : P.textContent.trim().replace(v.g.ZWSP, "") === "" && E && P.remove());
                var R = (0, s.F9)(o.endContainer);
                R && (u ? (R.insertAdjacentHTML("afterbegin", u.innerHTML), u.remove()) : R.textContent.trim().replace(v.g.ZWSP, "") === "" && _ && R.remove()), a.insertNode(d), t.options.comment.add(i, a.toString(), n.getComments(t, !0)), ue(t, {
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
              var t = (0, M.Ny)(this.element);
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
                var E = document.createElement("div");
                E.appendChild(r.cloneContents()), t.clipboardData.setData("text/plain", n.lute.VditorDOM2Md(E.innerHTML).trim()), t.clipboardData.setData("text/html", "");
              }
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.unbindListener(), window.addEventListener("scroll", this.scrollListener = function() {
                if (S(t, ["hint"]), !(n.popover.style.display !== "block" || n.selectPopover.style.display !== "block")) {
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
                if (S(t, ["hint"]), t.options.comment && t.options.comment.enable && t.options.comment.scroll && t.options.comment.scroll(t.wysiwyg.element.scrollTop), n.popover.style.display === "block") {
                  var r = parseInt(n.popover.getAttribute("data-top"), 10) - t.wysiwyg.element.scrollTop, i = -8;
                  t.options.toolbarConfig.pin && t.toolbar.element.getBoundingClientRect().top === 0 && (i = window.scrollY - t.element.offsetTop + i);
                  var a = Math.max(i, Math.min(r, n.element.clientHeight - 21)) + "px";
                  n.popover.style.top = a, n.selectPopover.style.top = a;
                }
              }), this.element.addEventListener("paste", function(r) {
                gt(t, r, {
                  pasteCode: function(i) {
                    var a = (0, M.zh)(t), o = document.createElement("template");
                    o.innerHTML = i, a.insertNode(o.content.cloneNode(!0));
                    var d = (0, s.a1)(a.startContainer, "data-block", "0");
                    d ? d.outerHTML = t.lute.SpinVditorDOM(d.outerHTML) : t.wysiwyg.element.innerHTML = t.lute.SpinVditorDOM(t.wysiwyg.element.innerHTML), (0, M.ib)(t.wysiwyg.element, a);
                  }
                });
              }), this.element.addEventListener("compositionstart", function() {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                var i = (0, C.W)(getSelection().getRangeAt(0).startContainer);
                if (i && i.textContent === "") {
                  Ne(t);
                  return;
                }
                (0, l.vU)() || ft(t, getSelection().getRangeAt(0).cloneRange(), r), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop")) {
                  if (n.preventInput) {
                    n.preventInput = !1, ue(t);
                    return;
                  }
                  if (n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《") {
                    ue(t);
                    return;
                  }
                  var i = getSelection().getRangeAt(0), a = (0, s.F9)(i.startContainer);
                  if (a || (Gt(t, i), a = (0, s.F9)(i.startContainer)), !!a) {
                    for (var o = (0, M.im)(a, t.wysiwyg.element, i).start, d = !0, h = o - 1; h > a.textContent.substr(0, o).lastIndexOf(`
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
                    var E = (0, C.W)(getSelection().getRangeAt(0).startContainer);
                    if (E && E.textContent === "" && (Ne(t), E.remove()), d && a.getAttribute("data-type") !== "code-block" || u || Nt(a.innerHTML) || Ot(a.innerHTML) && a.previousElementSibling) {
                      typeof t.options.input == "function" && t.options.input(H(t));
                      return;
                    }
                    r.inputType === "insertParagraph" && n.element.innerHTML === "<p><br></p><p><br></p>" && a.previousElementSibling.remove(), ft(t, i, r);
                  }
                }
              }), this.element.addEventListener("click", function(r) {
                if (r.target.tagName === "INPUT") {
                  var i = r.target;
                  i.checked ? i.setAttribute("checked", "checked") : i.removeAttribute("checked"), n.preventInput = !0, ue(t);
                  return;
                }
                if (r.target.tagName === "IMG" && // plantuml 图片渲染不进行提示
                !r.target.parentElement.classList.contains("vditor-wysiwyg__preview")) {
                  r.target.getAttribute("data-type") === "link-ref" ? zt(t, r.target) : Bn(r, t);
                  return;
                }
                var a = (0, s.lG)(r.target, "A");
                if (a) {
                  t.options.link.click ? t.options.link.click(a) : t.options.link.isOpen && window.open(a.getAttribute("href")), r.preventDefault();
                  return;
                }
                var o = (0, M.zh)(t);
                if (r.target.isEqualNode(n.element) && n.element.lastElementChild && o.collapsed) {
                  var d = n.element.lastElementChild.getBoundingClientRect();
                  r.y > d.top + d.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(v.g.ZWSP, "") === "" ? (o.selectNodeContents(n.element.lastElementChild), o.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", '<p data-block="0">'.concat(v.g.ZWSP, "<wbr></p>")), (0, M.ib)(n.element, o)));
                }
                Ve(t);
                var h = (0, s.fb)(r.target, "vditor-wysiwyg__preview");
                h || (h = (0, s.fb)((0, M.zh)(t).startContainer, "vditor-wysiwyg__preview")), h && $e(h, t), ot(r, t);
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l.yl)(r))) {
                  r.key === "Enter" && be(t), (r.key === "Backspace" || r.key === "Delete") && t.wysiwyg.element.innerHTML !== "" && t.wysiwyg.element.childNodes.length === 1 && t.wysiwyg.element.firstElementChild && t.wysiwyg.element.firstElementChild.tagName === "P" && t.wysiwyg.element.firstElementChild.childElementCount === 0 && (t.wysiwyg.element.textContent === "" || t.wysiwyg.element.textContent === `
`) && (t.wysiwyg.element.innerHTML = "");
                  var i = (0, M.zh)(t);
                  if (r.key === "Backspace" && (0, l.vU)() && i.startContainer.textContent === `
` && i.startOffset === 1 && (i.startContainer.textContent = ""), Gt(t, i), Ve(t), !(r.key !== "ArrowDown" && r.key !== "ArrowRight" && r.key !== "Backspace" && r.key !== "ArrowLeft" && r.key !== "ArrowUp")) {
                    (r.key === "ArrowLeft" || r.key === "ArrowRight") && t.hint.render(t);
                    var a = (0, s.fb)(i.startContainer, "vditor-wysiwyg__preview");
                    if (!a && i.startContainer.nodeType !== 3 && i.startOffset > 0) {
                      var o = i.startContainer;
                      o.classList.contains("vditor-wysiwyg__block") && (a = o.lastElementChild);
                    }
                    if (a) {
                      var d = a.previousElementSibling;
                      if (d.style.display === "none") {
                        r.key === "ArrowDown" || r.key === "ArrowRight" ? $e(a, t) : $e(a, t, !1);
                        return;
                      }
                      var h = a.previousElementSibling;
                      if (h.tagName === "PRE" && (h = h.firstElementChild), r.key === "ArrowDown" || r.key === "ArrowRight") {
                        var o = a.parentElement, u = Pn(o);
                        if (u && u.nodeType !== 3) {
                          var E = u.querySelector(".vditor-wysiwyg__preview");
                          if (E) {
                            $e(E, t);
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
        ), hi = /* @__PURE__ */ function() {
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
        }(), mi = (
          /** @class */
          function(e) {
            hi(t, e);
            function t(n, r) {
              var i = e.call(this) || this;
              if (i.version = v.H, typeof n == "string") {
                if (r ? r.cache ? r.cache.id || (r.cache.id = "vditor".concat(n)) : r.cache = { id: "vditor".concat(n) } : r = {
                  cache: {
                    id: "vditor".concat(n)
                  }
                }, !document.getElementById(n))
                  return i.showErrorTip("Failed to get element by id: ".concat(n)), i;
                n = document.getElementById(n);
              }
              var a = new di(r), o = a.merge();
              if (o.i18n)
                window.VditorI18n = o.i18n, i.init(n, o);
              else if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(o.lang)) {
                var d = "vditorI18nScript", h = d + o.lang;
                document.querySelectorAll('head script[id^="'.concat(d, '"]')).forEach(function(u) {
                  u.id !== h && document.head.removeChild(u);
                }), (0, k.G)("".concat(o.cdn, "/dist/js/i18n/").concat(o.lang, ".js"), h).then(function() {
                  i.init(n, o);
                }).catch(function(u) {
                  i.showErrorTip("GET ".concat(o.cdn, "/dist/js/i18n/").concat(o.lang, ".js net::ERR_ABORTED 404 (Not Found)"));
                });
              } else
                throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
              return i;
            }
            return t.prototype.showErrorTip = function(n) {
              var r = new Sn();
              document.body.appendChild(r.element), r.show(n, 0);
            }, t.prototype.updateToolbarConfig = function(n) {
              this.vditor.toolbar.updateConfig(this.vditor, n);
            }, t.prototype.setTheme = function(n, r, i, a) {
              this.vditor.options.theme = n, pe(this.vditor), r && (this.vditor.options.preview.theme.current = r, (0, X.Z)(r, a || this.vditor.options.preview.theme.path)), i && (this.vditor.options.preview.hljs.style = i, (0, Cn.Y)(i, this.vditor.options.cdn));
            }, t.prototype.getValue = function() {
              return H(this.vditor);
            }, t.prototype.getCurrentMode = function() {
              return this.vditor.currentMode;
            }, t.prototype.focus = function() {
              this.vditor.currentMode === "sv" ? this.vditor.sv.element.focus() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.focus() : this.vditor.currentMode === "ir" && this.vditor.ir.element.focus();
            }, t.prototype.blur = function() {
              this.vditor.currentMode === "sv" ? this.vditor.sv.element.blur() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.blur() : this.vditor.currentMode === "ir" && this.vditor.ir.element.blur();
            }, t.prototype.disabled = function() {
              S(this.vditor, ["subToolbar", "hint", "popover"]), f(this.vditor.toolbar.elements, v.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "false");
            }, t.prototype.enable = function() {
              m(this.vditor.toolbar.elements, v.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor.undo.resetIcon(this.vditor), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
            }, t.prototype.getSelection = function() {
              if (this.vditor.currentMode === "wysiwyg")
                return tt(this.vditor.wysiwyg.element);
              if (this.vditor.currentMode === "sv")
                return tt(this.vditor.sv.element);
              if (this.vditor.currentMode === "ir")
                return tt(this.vditor.ir.element);
            }, t.prototype.renderPreview = function(n) {
              this.vditor.preview.render(this.vditor, n);
            }, t.prototype.getCursorPosition = function() {
              return (0, M.Ny)(this.vditor[this.vditor.currentMode].element);
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
              return vn(this.vditor);
            }, t.prototype.tip = function(n, r) {
              this.vditor.tip.show(n, r);
            }, t.prototype.setPreviewMode = function(n) {
              Pt(n, this.vditor);
            }, t.prototype.deleteValue = function() {
              window.getSelection().isCollapsed || document.execCommand("delete", !1);
            }, t.prototype.updateValue = function(n) {
              document.execCommand("insertHTML", !1, n);
            }, t.prototype.insertValue = function(n, r) {
              r === void 0 && (r = !0);
              var i = (0, M.zh)(this.vditor);
              i.collapse(!0);
              var a = document.createElement("template");
              a.innerHTML = n, i.insertNode(a.content.cloneNode(!0)), i.collapse(!1), this.vditor.currentMode === "sv" ? (this.vditor.sv.preventInput = !0, r && ae(this.vditor)) : this.vditor.currentMode === "wysiwyg" ? r && ft(this.vditor, getSelection().getRangeAt(0)) : this.vditor.currentMode === "ir" && (this.vditor.ir.preventInput = !0, r && Be(this.vditor, getSelection().getRangeAt(0), !0));
            }, t.prototype.insertMD = function(n) {
              this.vditor.currentMode === "ir" ? (0, M.oC)(this.vditor.lute.Md2VditorIRDOM(n), this.vditor) : this.vditor.currentMode === "wysiwyg" ? (0, M.oC)(this.vditor.lute.Md2VditorDOM(n), this.vditor) : xt(this.vditor, n), this.vditor.outline.render(this.vditor), $(this.vditor);
            }, t.prototype.setValue = function(n, r) {
              var i = this;
              r === void 0 && (r = !1), this.vditor.currentMode === "sv" ? (this.vditor.sv.element.innerHTML = "<div data-block='0'>".concat(this.vditor.lute.SpinVditorSVDOM(n), "</div>"), Ee(this.vditor, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              })) : this.vditor.currentMode === "wysiwyg" ? Ft(this.vditor, n, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }) : (this.vditor.ir.element.innerHTML = this.vditor.lute.Md2VditorIRDOM(n), this.vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(a) {
                ie(a, i.vditor);
              }), Pe(this.vditor, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              })), this.vditor.outline.render(this.vditor), n || (S(this.vditor, ["emoji", "headings", "submenu", "hint"]), this.vditor.wysiwyg.popover && (this.vditor.wysiwyg.popover.style.display = "none"), this.clearCache()), r && this.clearStack();
            }, t.prototype.clearStack = function() {
              this.vditor.undo.clearStack(this.vditor), this.vditor.undo.addToUndoStack(this.vditor);
            }, t.prototype.destroy = function() {
              this.vditor.element.innerHTML = this.vditor.originalInnerHTML, this.vditor.element.classList.remove("vditor"), this.vditor.element.removeAttribute("style");
              var n = document.getElementById("vditorIconScript");
              n && n.remove(), this.clearCache(), Wt(), this.vditor.wysiwyg.unbindListener();
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
                  }), d.length === 0 ? (a.outerHTML = a.innerHTML, (0, M.zh)(r.vditor).collapse(!0)) : a.setAttribute("data-cmtids", d.join(" "));
                };
                n.forEach(function(a) {
                  r.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(o) {
                    i(o, a);
                  }), r.vditor.preview.element.style.display !== "none" && r.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(o) {
                    i(o, a);
                  });
                }), ue(this.vditor, {
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
                hint: new ar(r.hint.extend),
                lute: void 0,
                options: r,
                originalInnerHTML: n.innerHTML,
                outline: new lr(window.VditorI18n.outline),
                tip: new Sn()
              }, this.vditor.sv = new dr(this.vditor), this.vditor.undo = new ui(), this.vditor.wysiwyg = new pi(this.vditor), this.vditor.ir = new or(this.vditor), this.vditor.toolbar = new li(this.vditor), r.resize.enable && (this.vditor.resize = new fr(this.vditor)), this.vditor.toolbar.elements.devtools && (this.vditor.devtools = new c()), (r.upload.url || r.upload.handler) && (this.vditor.upload = new Zn()), (0, k.G)(r._lutePath || "".concat(r.cdn, "/dist/js/lute/lute.min.js"), "vditorLuteScript").then(function() {
                i.vditor.lute = (0, sr.X)({
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
                }), i.vditor.preview = new ur(i.vditor), ke(i.vditor), r.after && r.after(), r.icon && (0, k.J)("".concat(r.cdn, "/dist/js/icons/").concat(r.icon, ".js"), "vditorIconScript");
              });
            }, t;
          }(J.default)
        );
        const gi = mi;
      })(), at = at.default, at;
    })()
  ));
})(Hn);
var wi = Hn.exports;
const Si = /* @__PURE__ */ bi(wi);
export {
  Si as V
};
