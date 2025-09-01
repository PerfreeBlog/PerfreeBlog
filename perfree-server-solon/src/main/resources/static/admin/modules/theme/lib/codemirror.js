var xu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ku(wt) {
  return wt && wt.__esModule && Object.prototype.hasOwnProperty.call(wt, "default") ? wt.default : wt;
}
var ho = { exports: {} }, da;
function Ar() {
  return da || (da = 1, function(wt, Or) {
    (function(z, xe) {
      wt.exports = xe();
    })(xu, function() {
      var z = navigator.userAgent, xe = navigator.platform, fe = /gecko\/\d/i.test(z), te = /MSIE \d/.test(z), Z = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(z), de = /Edge\/(\d+)/.exec(z), E = te || Z || de, N = E && (te ? document.documentMode || 6 : +(de || Z)[1]), I = !de && /WebKit\//.test(z), X = I && /Qt\/\d+\.\d+/.test(z), _ = !de && /Chrome\/(\d+)/.exec(z), ie = _ && +_[1], le = /Opera\//.test(z), De = /Apple Computer/.test(navigator.vendor), We = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(z), Be = /PhantomJS/.test(z), oe = De && (/Mobile\/\w+/.test(z) || navigator.maxTouchPoints > 2), $ = /Android/.test(z), ae = oe || $ || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(z), me = oe || /Mac/.test(xe), Ue = /\bCrOS\b/.test(z), lt = /win/i.test(xe), Re = le && z.match(/Version\/(\d*\.\d*)/);
      Re && (Re = Number(Re[1])), Re && Re >= 15 && (le = !1, I = !0);
      var Ke = me && (X || le && (Re == null || Re < 12.11)), J = fe || E && N >= 9;
      function Y(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
      }
      var Le = function(e, t) {
        var n = e.className, r = Y(t).exec(n);
        if (r) {
          var i = n.slice(r.index + r[0].length);
          e.className = n.slice(0, r.index) + (i ? r[1] + i : "");
        }
      };
      function k(e) {
        for (var t = e.childNodes.length; t > 0; --t)
          e.removeChild(e.firstChild);
        return e;
      }
      function F(e, t) {
        return k(e).appendChild(t);
      }
      function c(e, t, n, r) {
        var i = document.createElement(e);
        if (n && (i.className = n), r && (i.style.cssText = r), typeof t == "string")
          i.appendChild(document.createTextNode(t));
        else if (t)
          for (var o = 0; o < t.length; ++o)
            i.appendChild(t[o]);
        return i;
      }
      function W(e, t, n, r) {
        var i = c(e, t, n, r);
        return i.setAttribute("role", "presentation"), i;
      }
      var T;
      document.createRange ? T = function(e, t, n, r) {
        var i = document.createRange();
        return i.setEnd(r || e, n), i.setStart(e, t), i;
      } : T = function(e, t, n) {
        var r = document.body.createTextRange();
        try {
          r.moveToElementText(e.parentNode);
        } catch {
          return r;
        }
        return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r;
      };
      function q(e, t) {
        if (t.nodeType == 3 && (t = t.parentNode), e.contains)
          return e.contains(t);
        do
          if (t.nodeType == 11 && (t = t.host), t == e)
            return !0;
        while (t = t.parentNode);
      }
      function pe(e) {
        var t = e.ownerDocument || e, n;
        try {
          n = e.activeElement;
        } catch {
          n = t.body || null;
        }
        for (; n && n.shadowRoot && n.shadowRoot.activeElement; )
          n = n.shadowRoot.activeElement;
        return n;
      }
      function Pe(e, t) {
        var n = e.className;
        Y(t).test(n) || (e.className += (n ? " " : "") + t);
      }
      function Mt(e, t) {
        for (var n = e.split(" "), r = 0; r < n.length; r++)
          n[r] && !Y(n[r]).test(t) && (t += " " + n[r]);
        return t;
      }
      var Gt = function(e) {
        e.select();
      };
      oe ? Gt = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : E && (Gt = function(e) {
        try {
          e.select();
        } catch {
        }
      });
      function nt(e) {
        return e.display.wrapper.ownerDocument;
      }
      function gt(e) {
        return Se(e.display.wrapper);
      }
      function Se(e) {
        return e.getRootNode ? e.getRootNode() : e.ownerDocument;
      }
      function Q(e) {
        return nt(e).defaultView;
      }
      function j(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
          return e.apply(null, t);
        };
      }
      function re(e, t, n) {
        t || (t = {});
        for (var r in e)
          e.hasOwnProperty(r) && (n !== !1 || !t.hasOwnProperty(r)) && (t[r] = e[r]);
        return t;
      }
      function ce(e, t, n, r, i) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var o = r || 0, l = i || 0; ; ) {
          var a = e.indexOf("	", o);
          if (a < 0 || a >= t)
            return l + (t - o);
          l += a - o, l += n - l % n, o = a + 1;
        }
      }
      var ee = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = j(this.onTimeout, this);
      };
      ee.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +/* @__PURE__ */ new Date() ? e.f() : setTimeout(e.handler, e.time - +/* @__PURE__ */ new Date());
      }, ee.prototype.set = function(e, t) {
        this.f = t;
        var n = +/* @__PURE__ */ new Date() + e;
        (!this.id || n < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = n);
      };
      function R(e, t) {
        for (var n = 0; n < e.length; ++n)
          if (e[n] == t)
            return n;
        return -1;
      }
      var Je = 50, Nt = { toString: function() {
        return "CodeMirror.Pass";
      } }, at = { scroll: !1 }, xt = { origin: "*mouse" }, ve = { origin: "+move" };
      function Ee(e, t, n) {
        for (var r = 0, i = 0; ; ) {
          var o = e.indexOf("	", r);
          o == -1 && (o = e.length);
          var l = o - r;
          if (o == e.length || i + l >= t)
            return r + Math.min(l, t - i);
          if (i += o - r, i += n - i % n, r = o + 1, i >= t)
            return r;
        }
      }
      var st = [""];
      function kt(e) {
        for (; st.length <= e; )
          st.push(ue(st) + " ");
        return st[e];
      }
      function ue(e) {
        return e[e.length - 1];
      }
      function we(e, t) {
        for (var n = [], r = 0; r < e.length; r++)
          n[r] = t(e[r], r);
        return n;
      }
      function y(e, t, n) {
        for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i; )
          r++;
        e.splice(r, 0, t);
      }
      function M() {
      }
      function w(e, t) {
        var n;
        return Object.create ? n = Object.create(e) : (M.prototype = e, n = new M()), t && re(t, n), n;
      }
      var he = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function Ve(e) {
        return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || he.test(e));
      }
      function qt(e, t) {
        return t ? t.source.indexOf("\\w") > -1 && Ve(e) ? !0 : t.test(e) : Ve(e);
      }
      function Hn(e) {
        for (var t in e)
          if (e.hasOwnProperty(t) && e[t])
            return !1;
        return !0;
      }
      var Xt = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function He(e) {
        return e.charCodeAt(0) >= 768 && Xt.test(e);
      }
      function tr(e, t, n) {
        for (; (n < 0 ? t > 0 : t < e.length) && He(e.charAt(t)); )
          t += n;
        return t;
      }
      function It(e, t, n) {
        for (var r = t > n ? -1 : 1; ; ) {
          if (t == n)
            return t;
          var i = (t + n) / 2, o = r < 0 ? Math.ceil(i) : Math.floor(i);
          if (o == t)
            return e(o) ? t : n;
          e(o) ? n = o : t = o + r;
        }
      }
      function rr(e, t, n, r) {
        if (!e)
          return r(t, n, "ltr", 0);
        for (var i = !1, o = 0; o < e.length; ++o) {
          var l = e[o];
          (l.from < n && l.to > t || t == n && l.to == t) && (r(Math.max(l.from, t), Math.min(l.to, n), l.level == 1 ? "rtl" : "ltr", o), i = !0);
        }
        i || r(t, n, "ltr");
      }
      var yr = null;
      function nr(e, t, n) {
        var r;
        yr = null;
        for (var i = 0; i < e.length; ++i) {
          var o = e[i];
          if (o.from < t && o.to > t)
            return i;
          o.to == t && (o.from != o.to && n == "before" ? r = i : yr = i), o.from == t && (o.from != o.to && n != "before" ? r = i : yr = i);
        }
        return r ?? yr;
      }
      var gi = /* @__PURE__ */ function() {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function n(u) {
          return u <= 247 ? e.charAt(u) : 1424 <= u && u <= 1524 ? "R" : 1536 <= u && u <= 1785 ? t.charAt(u - 1536) : 1774 <= u && u <= 2220 ? "r" : 8192 <= u && u <= 8203 ? "w" : u == 8204 ? "b" : "L";
        }
        var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, i = /[stwN]/, o = /[LRr]/, l = /[Lb1n]/, a = /[1n]/;
        function s(u, h, p) {
          this.level = u, this.from = h, this.to = p;
        }
        return function(u, h) {
          var p = h == "ltr" ? "L" : "R";
          if (u.length == 0 || h == "ltr" && !r.test(u))
            return !1;
          for (var g = u.length, v = [], b = 0; b < g; ++b)
            v.push(n(u.charCodeAt(b)));
          for (var S = 0, L = p; S < g; ++S) {
            var A = v[S];
            A == "m" ? v[S] = L : L = A;
          }
          for (var P = 0, O = p; P < g; ++P) {
            var H = v[P];
            H == "1" && O == "r" ? v[P] = "n" : o.test(H) && (O = H, H == "r" && (v[P] = "R"));
          }
          for (var G = 1, K = v[0]; G < g - 1; ++G) {
            var ne = v[G];
            ne == "+" && K == "1" && v[G + 1] == "1" ? v[G] = "1" : ne == "," && K == v[G + 1] && (K == "1" || K == "n") && (v[G] = K), K = ne;
          }
          for (var ke = 0; ke < g; ++ke) {
            var je = v[ke];
            if (je == ",")
              v[ke] = "N";
            else if (je == "%") {
              var Te = void 0;
              for (Te = ke + 1; Te < g && v[Te] == "%"; ++Te)
                ;
              for (var bt = ke && v[ke - 1] == "!" || Te < g && v[Te] == "1" ? "1" : "N", dt = ke; dt < Te; ++dt)
                v[dt] = bt;
              ke = Te - 1;
            }
          }
          for (var Fe = 0, pt = p; Fe < g; ++Fe) {
            var Qe = v[Fe];
            pt == "L" && Qe == "1" ? v[Fe] = "L" : o.test(Qe) && (pt = Qe);
          }
          for (var _e = 0; _e < g; ++_e)
            if (i.test(v[_e])) {
              var Ie = void 0;
              for (Ie = _e + 1; Ie < g && i.test(v[Ie]); ++Ie)
                ;
              for (var Oe = (_e ? v[_e - 1] : p) == "L", vt = (Ie < g ? v[Ie] : p) == "L", rn = Oe == vt ? Oe ? "L" : "R" : p, gr = _e; gr < Ie; ++gr)
                v[gr] = rn;
              _e = Ie - 1;
            }
          for (var rt = [], Ut, Ze = 0; Ze < g; )
            if (l.test(v[Ze])) {
              var fo = Ze;
              for (++Ze; Ze < g && l.test(v[Ze]); ++Ze)
                ;
              rt.push(new s(0, fo, Ze));
            } else {
              var er = Ze, Mr = rt.length, Nr = h == "rtl" ? 1 : 0;
              for (++Ze; Ze < g && v[Ze] != "L"; ++Ze)
                ;
              for (var ot = er; ot < Ze; )
                if (a.test(v[ot])) {
                  er < ot && (rt.splice(Mr, 0, new s(1, er, ot)), Mr += Nr);
                  var nn = ot;
                  for (++ot; ot < Ze && a.test(v[ot]); ++ot)
                    ;
                  rt.splice(Mr, 0, new s(2, nn, ot)), Mr += Nr, er = ot;
                } else
                  ++ot;
              er < Ze && rt.splice(Mr, 0, new s(1, er, Ze));
            }
          return h == "ltr" && (rt[0].level == 1 && (Ut = u.match(/^\s+/)) && (rt[0].from = Ut[0].length, rt.unshift(new s(0, 0, Ut[0].length))), ue(rt).level == 1 && (Ut = u.match(/\s+$/)) && (ue(rt).to -= Ut[0].length, rt.push(new s(0, g - Ut[0].length, g)))), h == "rtl" ? rt.reverse() : rt;
        };
      }();
      function se(e, t) {
        var n = e.order;
        return n == null && (n = e.order = gi(e.text, t)), n;
      }
      var Fn = [], U = function(e, t, n) {
        if (e.addEventListener)
          e.addEventListener(t, n, !1);
        else if (e.attachEvent)
          e.attachEvent("on" + t, n);
        else {
          var r = e._handlers || (e._handlers = {});
          r[t] = (r[t] || Fn).concat(n);
        }
      };
      function Yt(e, t) {
        return e._handlers && e._handlers[t] || Fn;
      }
      function $e(e, t, n) {
        if (e.removeEventListener)
          e.removeEventListener(t, n, !1);
        else if (e.detachEvent)
          e.detachEvent("on" + t, n);
        else {
          var r = e._handlers, i = r && r[t];
          if (i) {
            var o = R(i, n);
            o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)));
          }
        }
      }
      function Me(e, t) {
        var n = Yt(e, t);
        if (n.length)
          for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i)
            n[i].apply(null, r);
      }
      function Ne(e, t, n) {
        return typeof t == "string" && (t = { type: t, preventDefault: function() {
          this.defaultPrevented = !0;
        } }), Me(e, n || t.type, e, t), ut(t) || t.codemirrorIgnore;
      }
      function Lt(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
          for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r)
            R(n, t[r]) == -1 && n.push(t[r]);
      }
      function yt(e, t) {
        return Yt(e, t).length > 0;
      }
      function At(e) {
        e.prototype.on = function(t, n) {
          U(this, t, n);
        }, e.prototype.off = function(t, n) {
          $e(this, t, n);
        };
      }
      function et(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }
      function Dr(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }
      function ut(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == !1;
      }
      function ir(e) {
        et(e), Dr(e);
      }
      function on(e) {
        return e.target || e.srcElement;
      }
      function Ot(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), me && e.ctrlKey && t == 1 && (t = 3), t;
      }
      var yi = function() {
        if (E && N < 9)
          return !1;
        var e = c("div");
        return "draggable" in e || "dragDrop" in e;
      }(), Wr;
      function In(e) {
        if (Wr == null) {
          var t = c("span", "​");
          F(e, c("span", [t, document.createTextNode("x")])), e.firstChild.offsetHeight != 0 && (Wr = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(E && N < 8));
        }
        var n = Wr ? c("span", "​") : c("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        return n.setAttribute("cm-text", ""), n;
      }
      var ln;
      function or(e) {
        if (ln != null)
          return ln;
        var t = F(e, document.createTextNode("AخA")), n = T(t, 0, 1).getBoundingClientRect(), r = T(t, 1, 2).getBoundingClientRect();
        return k(e), !n || n.left == n.right ? !1 : ln = r.right - n.right < 3;
      }
      var Tt = `

b`.split(/\n/).length != 3 ? function(e) {
        for (var t = 0, n = [], r = e.length; t <= r; ) {
          var i = e.indexOf(`
`, t);
          i == -1 && (i = e.length);
          var o = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i), l = o.indexOf("\r");
          l != -1 ? (n.push(o.slice(0, l)), t += l + 1) : (n.push(o), t = i + 1);
        }
        return n;
      } : function(e) {
        return e.split(/\r\n?|\n/);
      }, lr = window.getSelection ? function(e) {
        try {
          return e.selectionStart != e.selectionEnd;
        } catch {
          return !1;
        }
      } : function(e) {
        var t;
        try {
          t = e.ownerDocument.selection.createRange();
        } catch {
        }
        return !t || t.parentElement() != e ? !1 : t.compareEndPoints("StartToEnd", t) != 0;
      }, Bn = function() {
        var e = c("div");
        return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), typeof e.oncopy == "function");
      }(), Dt = null;
      function mi(e) {
        if (Dt != null)
          return Dt;
        var t = F(e, c("span", "x")), n = t.getBoundingClientRect(), r = T(t, 0, 1).getBoundingClientRect();
        return Dt = Math.abs(n.left - r.left) > 1;
      }
      var Pr = {}, Wt = {};
      function Pt(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Pr[e] = t;
      }
      function mr(e, t) {
        Wt[e] = t;
      }
      function zr(e) {
        if (typeof e == "string" && Wt.hasOwnProperty(e))
          e = Wt[e];
        else if (e && typeof e.name == "string" && Wt.hasOwnProperty(e.name)) {
          var t = Wt[e.name];
          typeof t == "string" && (t = { name: t }), e = w(t, e), e.name = t.name;
        } else {
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
            return zr("application/xml");
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
            return zr("application/json");
        }
        return typeof e == "string" ? { name: e } : e || { name: "null" };
      }
      function Er(e, t) {
        t = zr(t);
        var n = Pr[t.name];
        if (!n)
          return Er(e, "text/plain");
        var r = n(e, t);
        if (ar.hasOwnProperty(t.name)) {
          var i = ar[t.name];
          for (var o in i)
            i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]), r[o] = i[o]);
        }
        if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
          for (var l in t.modeProps)
            r[l] = t.modeProps[l];
        return r;
      }
      var ar = {};
      function Hr(e, t) {
        var n = ar.hasOwnProperty(e) ? ar[e] : ar[e] = {};
        re(t, n);
      }
      function Bt(e, t) {
        if (t === !0)
          return t;
        if (e.copyState)
          return e.copyState(t);
        var n = {};
        for (var r in t) {
          var i = t[r];
          i instanceof Array && (i = i.concat([])), n[r] = i;
        }
        return n;
      }
      function an(e, t) {
        for (var n; e.innerMode && (n = e.innerMode(t), !(!n || n.mode == e)); )
          t = n.state, e = n.mode;
        return n || { mode: e, state: t };
      }
      function Fr(e, t, n) {
        return e.startState ? e.startState(t, n) : !0;
      }
      var Ae = function(e, t, n) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = n;
      };
      Ae.prototype.eol = function() {
        return this.pos >= this.string.length;
      }, Ae.prototype.sol = function() {
        return this.pos == this.lineStart;
      }, Ae.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      }, Ae.prototype.next = function() {
        if (this.pos < this.string.length)
          return this.string.charAt(this.pos++);
      }, Ae.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos), n;
        if (typeof e == "string" ? n = t == e : n = t && (e.test ? e.test(t) : e(t)), n)
          return ++this.pos, t;
      }, Ae.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e); )
          ;
        return this.pos > t;
      }, Ae.prototype.eatSpace = function() {
        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
          ++this.pos;
        return this.pos > e;
      }, Ae.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      }, Ae.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1)
          return this.pos = t, !0;
      }, Ae.prototype.backUp = function(e) {
        this.pos -= e;
      }, Ae.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = ce(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? ce(this.string, this.lineStart, this.tabSize) : 0);
      }, Ae.prototype.indentation = function() {
        return ce(this.string, null, this.tabSize) - (this.lineStart ? ce(this.string, this.lineStart, this.tabSize) : 0);
      }, Ae.prototype.match = function(e, t, n) {
        if (typeof e == "string") {
          var r = function(l) {
            return n ? l.toLowerCase() : l;
          }, i = this.string.substr(this.pos, e.length);
          if (r(i) == r(e))
            return t !== !1 && (this.pos += e.length), !0;
        } else {
          var o = this.string.slice(this.pos).match(e);
          return o && o.index > 0 ? null : (o && t !== !1 && (this.pos += o[0].length), o);
        }
      }, Ae.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      }, Ae.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      }, Ae.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
      }, Ae.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
      };
      function B(e, t) {
        if (t -= e.first, t < 0 || t >= e.size)
          throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; !n.lines; )
          for (var r = 0; ; ++r) {
            var i = n.children[r], o = i.chunkSize();
            if (t < o) {
              n = i;
              break;
            }
            t -= o;
          }
        return n.lines[t];
      }
      function jt(e, t, n) {
        var r = [], i = t.line;
        return e.iter(t.line, n.line + 1, function(o) {
          var l = o.text;
          i == n.line && (l = l.slice(0, n.ch)), i == t.line && (l = l.slice(t.ch)), r.push(l), ++i;
        }), r;
      }
      function sn(e, t, n) {
        var r = [];
        return e.iter(t, n, function(i) {
          r.push(i.text);
        }), r;
      }
      function St(e, t) {
        var n = t - e.height;
        if (n)
          for (var r = e; r; r = r.parent)
            r.height += n;
      }
      function f(e) {
        if (e.parent == null)
          return null;
        for (var t = e.parent, n = R(t.lines, e), r = t.parent; r; t = r, r = r.parent)
          for (var i = 0; r.children[i] != t; ++i)
            n += r.children[i].chunkSize();
        return n + t.first;
      }
      function d(e, t) {
        var n = e.first;
        e: do {
          for (var r = 0; r < e.children.length; ++r) {
            var i = e.children[r], o = i.height;
            if (t < o) {
              e = i;
              continue e;
            }
            t -= o, n += i.chunkSize();
          }
          return n;
        } while (!e.lines);
        for (var l = 0; l < e.lines.length; ++l) {
          var a = e.lines[l], s = a.height;
          if (t < s)
            break;
          t -= s;
        }
        return n + l;
      }
      function x(e, t) {
        return t >= e.first && t < e.first + e.size;
      }
      function C(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }
      function m(e, t, n) {
        if (n === void 0 && (n = null), !(this instanceof m))
          return new m(e, t, n);
        this.line = e, this.ch = t, this.sticky = n;
      }
      function D(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }
      function ge(e, t) {
        return e.sticky == t.sticky && D(e, t) == 0;
      }
      function Ge(e) {
        return m(e.line, e.ch);
      }
      function ft(e, t) {
        return D(e, t) < 0 ? t : e;
      }
      function Ir(e, t) {
        return D(e, t) < 0 ? e : t;
      }
      function po(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }
      function V(e, t) {
        if (t.line < e.first)
          return m(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? m(n, B(e, n).text.length) : ka(t, B(e, t.line).text.length);
      }
      function ka(e, t) {
        var n = e.ch;
        return n == null || n > t ? m(e.line, t) : n < 0 ? m(e.line, 0) : e;
      }
      function vo(e, t) {
        for (var n = [], r = 0; r < t.length; r++)
          n[r] = V(e, t[r]);
        return n;
      }
      var Rn = function(e, t) {
        this.state = e, this.lookAhead = t;
      }, Rt = function(e, t, n, r) {
        this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1;
      };
      Rt.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
      }, Rt.prototype.baseToken = function(e) {
        if (!this.baseTokens)
          return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; )
          this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: t && t.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - e
        };
      }, Rt.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }, Rt.fromSaved = function(e, t, n) {
        return t instanceof Rn ? new Rt(e, Bt(e.mode, t.state), n, t.lookAhead) : new Rt(e, Bt(e.mode, t), n);
      }, Rt.prototype.save = function(e) {
        var t = e !== !1 ? Bt(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new Rn(t, this.maxLookAhead) : t;
      };
      function go(e, t, n, r) {
        var i = [e.state.modeGen], o = {};
        ko(
          e,
          t.text,
          e.doc.mode,
          n,
          function(u, h) {
            return i.push(u, h);
          },
          o,
          r
        );
        for (var l = n.state, a = function(u) {
          n.baseTokens = i;
          var h = e.state.overlays[u], p = 1, g = 0;
          n.state = !0, ko(e, t.text, h.mode, n, function(v, b) {
            for (var S = p; g < v; ) {
              var L = i[p];
              L > v && i.splice(p, 1, v, i[p + 1], L), p += 2, g = Math.min(v, L);
            }
            if (b)
              if (h.opaque)
                i.splice(S, p - S, v, "overlay " + b), p = S + 2;
              else
                for (; S < p; S += 2) {
                  var A = i[S + 1];
                  i[S + 1] = (A ? A + " " : "") + "overlay " + b;
                }
          }, o), n.state = l, n.baseTokens = null, n.baseTokenPos = 1;
        }, s = 0; s < e.state.overlays.length; ++s) a(s);
        return { styles: i, classes: o.bgClass || o.textClass ? o : null };
      }
      function yo(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var r = un(e, f(t)), i = t.text.length > e.options.maxHighlightLength && Bt(e.doc.mode, r.state), o = go(e, t, r);
          i && (r.state = i), t.stateAfter = r.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        }
        return t.styles;
      }
      function un(e, t, n) {
        var r = e.doc, i = e.display;
        if (!r.mode.startState)
          return new Rt(r, !0, t);
        var o = Sa(e, t, n), l = o > r.first && B(r, o - 1).stateAfter, a = l ? Rt.fromSaved(r, l, o) : new Rt(r, Fr(r.mode), o);
        return r.iter(o, t, function(s) {
          bi(e, s.text, a);
          var u = a.line;
          s.stateAfter = u == t - 1 || u % 5 == 0 || u >= i.viewFrom && u < i.viewTo ? a.save() : null, a.nextLine();
        }), n && (r.modeFrontier = a.line), a;
      }
      function bi(e, t, n, r) {
        var i = e.doc.mode, o = new Ae(t, e.options.tabSize, n);
        for (o.start = o.pos = r || 0, t == "" && mo(i, n.state); !o.eol(); )
          wi(i, o, n.state), o.start = o.pos;
      }
      function mo(e, t) {
        if (e.blankLine)
          return e.blankLine(t);
        if (e.innerMode) {
          var n = an(e, t);
          if (n.mode.blankLine)
            return n.mode.blankLine(n.state);
        }
      }
      function wi(e, t, n, r) {
        for (var i = 0; i < 10; i++) {
          r && (r[0] = an(e, n).mode);
          var o = e.token(t, n);
          if (t.pos > t.start)
            return o;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
      }
      var bo = function(e, t, n) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = n;
      };
      function wo(e, t, n, r) {
        var i = e.doc, o = i.mode, l;
        t = V(i, t);
        var a = B(i, t.line), s = un(e, t.line, n), u = new Ae(a.text, e.options.tabSize, s), h;
        for (r && (h = []); (r || u.pos < t.ch) && !u.eol(); )
          u.start = u.pos, l = wi(o, u, s.state), r && h.push(new bo(u, l, Bt(i.mode, s.state)));
        return r ? h : new bo(u, l, s.state);
      }
      function xo(e, t) {
        if (e)
          for (; ; ) {
            var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!n)
              break;
            e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
            var r = n[1] ? "bgClass" : "textClass";
            t[r] == null ? t[r] = n[2] : new RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + n[2]);
          }
        return e;
      }
      function ko(e, t, n, r, i, o, l) {
        var a = n.flattenSpans;
        a == null && (a = e.options.flattenSpans);
        var s = 0, u = null, h = new Ae(t, e.options.tabSize, r), p, g = e.options.addModeClass && [null];
        for (t == "" && xo(mo(n, r.state), o); !h.eol(); ) {
          if (h.pos > e.options.maxHighlightLength ? (a = !1, l && bi(e, t, r, h.pos), h.pos = t.length, p = null) : p = xo(wi(n, h, r.state, g), o), g) {
            var v = g[0].name;
            v && (p = "m-" + (p ? v + " " + p : v));
          }
          if (!a || u != p) {
            for (; s < h.start; )
              s = Math.min(h.start, s + 5e3), i(s, u);
            u = p;
          }
          h.start = h.pos;
        }
        for (; s < h.pos; ) {
          var b = Math.min(h.pos, s + 5e3);
          i(b, u), s = b;
        }
      }
      function Sa(e, t, n) {
        for (var r, i, o = e.doc, l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > l; --a) {
          if (a <= o.first)
            return o.first;
          var s = B(o, a - 1), u = s.stateAfter;
          if (u && (!n || a + (u instanceof Rn ? u.lookAhead : 0) <= o.modeFrontier))
            return a;
          var h = ce(s.text, null, e.options.tabSize);
          (i == null || r > h) && (i = a - 1, r = h);
        }
        return i;
      }
      function Ca(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
          for (var n = e.first, r = t - 1; r > n; r--) {
            var i = B(e, r).stateAfter;
            if (i && (!(i instanceof Rn) || r + i.lookAhead < t)) {
              n = r + 1;
              break;
            }
          }
          e.highlightFrontier = Math.min(e.highlightFrontier, n);
        }
      }
      var So = !1, Zt = !1;
      function La() {
        So = !0;
      }
      function Ta() {
        Zt = !0;
      }
      function Kn(e, t, n) {
        this.marker = e, this.from = t, this.to = n;
      }
      function fn(e, t) {
        if (e)
          for (var n = 0; n < e.length; ++n) {
            var r = e[n];
            if (r.marker == t)
              return r;
          }
      }
      function Ma(e, t) {
        for (var n, r = 0; r < e.length; ++r)
          e[r] != t && (n || (n = [])).push(e[r]);
        return n;
      }
      function Na(e, t, n) {
        var r = n && window.WeakSet && (n.markedSpans || (n.markedSpans = /* @__PURE__ */ new WeakSet()));
        r && e.markedSpans && r.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], r && r.add(e.markedSpans)), t.marker.attachLine(e);
      }
      function Aa(e, t, n) {
        var r;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], l = o.marker, a = o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
            if (a || o.from == t && l.type == "bookmark" && (!n || !o.marker.insertLeft)) {
              var s = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
              (r || (r = [])).push(new Kn(l, o.from, s ? null : o.to));
            }
          }
        return r;
      }
      function Oa(e, t, n) {
        var r;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], l = o.marker, a = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
            if (a || o.from == t && l.type == "bookmark" && (!n || o.marker.insertLeft)) {
              var s = o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
              (r || (r = [])).push(new Kn(
                l,
                s ? null : o.from - t,
                o.to == null ? null : o.to - t
              ));
            }
          }
        return r;
      }
      function xi(e, t) {
        if (t.full)
          return null;
        var n = x(e, t.from.line) && B(e, t.from.line).markedSpans, r = x(e, t.to.line) && B(e, t.to.line).markedSpans;
        if (!n && !r)
          return null;
        var i = t.from.ch, o = t.to.ch, l = D(t.from, t.to) == 0, a = Aa(n, i, l), s = Oa(r, o, l), u = t.text.length == 1, h = ue(t.text).length + (u ? i : 0);
        if (a)
          for (var p = 0; p < a.length; ++p) {
            var g = a[p];
            if (g.to == null) {
              var v = fn(s, g.marker);
              v ? u && (g.to = v.to == null ? null : v.to + h) : g.to = i;
            }
          }
        if (s)
          for (var b = 0; b < s.length; ++b) {
            var S = s[b];
            if (S.to != null && (S.to += h), S.from == null) {
              var L = fn(a, S.marker);
              L || (S.from = h, u && (a || (a = [])).push(S));
            } else
              S.from += h, u && (a || (a = [])).push(S);
          }
        a && (a = Co(a)), s && s != a && (s = Co(s));
        var A = [a];
        if (!u) {
          var P = t.text.length - 2, O;
          if (P > 0 && a)
            for (var H = 0; H < a.length; ++H)
              a[H].to == null && (O || (O = [])).push(new Kn(a[H].marker, null, null));
          for (var G = 0; G < P; ++G)
            A.push(O);
          A.push(s);
        }
        return A;
      }
      function Co(e) {
        for (var t = 0; t < e.length; ++t) {
          var n = e[t];
          n.from != null && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
        }
        return e.length ? e : null;
      }
      function Da(e, t, n) {
        var r = null;
        if (e.iter(t.line, n.line + 1, function(v) {
          if (v.markedSpans)
            for (var b = 0; b < v.markedSpans.length; ++b) {
              var S = v.markedSpans[b].marker;
              S.readOnly && (!r || R(r, S) == -1) && (r || (r = [])).push(S);
            }
        }), !r)
          return null;
        for (var i = [{ from: t, to: n }], o = 0; o < r.length; ++o)
          for (var l = r[o], a = l.find(0), s = 0; s < i.length; ++s) {
            var u = i[s];
            if (!(D(u.to, a.from) < 0 || D(u.from, a.to) > 0)) {
              var h = [s, 1], p = D(u.from, a.from), g = D(u.to, a.to);
              (p < 0 || !l.inclusiveLeft && !p) && h.push({ from: u.from, to: a.from }), (g > 0 || !l.inclusiveRight && !g) && h.push({ from: a.to, to: u.to }), i.splice.apply(i, h), s += h.length - 3;
            }
          }
        return i;
      }
      function Lo(e) {
        var t = e.markedSpans;
        if (t) {
          for (var n = 0; n < t.length; ++n)
            t[n].marker.detachLine(e);
          e.markedSpans = null;
        }
      }
      function To(e, t) {
        if (t) {
          for (var n = 0; n < t.length; ++n)
            t[n].marker.attachLine(e);
          e.markedSpans = t;
        }
      }
      function _n(e) {
        return e.inclusiveLeft ? -1 : 0;
      }
      function Un(e) {
        return e.inclusiveRight ? 1 : 0;
      }
      function ki(e, t) {
        var n = e.lines.length - t.lines.length;
        if (n != 0)
          return n;
        var r = e.find(), i = t.find(), o = D(r.from, i.from) || _n(e) - _n(t);
        if (o)
          return -o;
        var l = D(r.to, i.to) || Un(e) - Un(t);
        return l || t.id - e.id;
      }
      function Mo(e, t) {
        var n = Zt && e.markedSpans, r;
        if (n)
          for (var i = void 0, o = 0; o < n.length; ++o)
            i = n[o], i.marker.collapsed && (t ? i.from : i.to) == null && (!r || ki(r, i.marker) < 0) && (r = i.marker);
        return r;
      }
      function No(e) {
        return Mo(e, !0);
      }
      function Gn(e) {
        return Mo(e, !1);
      }
      function Wa(e, t) {
        var n = Zt && e.markedSpans, r;
        if (n)
          for (var i = 0; i < n.length; ++i) {
            var o = n[i];
            o.marker.collapsed && (o.from == null || o.from < t) && (o.to == null || o.to > t) && (!r || ki(r, o.marker) < 0) && (r = o.marker);
          }
        return r;
      }
      function Ao(e, t, n, r, i) {
        var o = B(e, t), l = Zt && o.markedSpans;
        if (l)
          for (var a = 0; a < l.length; ++a) {
            var s = l[a];
            if (s.marker.collapsed) {
              var u = s.marker.find(0), h = D(u.from, n) || _n(s.marker) - _n(i), p = D(u.to, r) || Un(s.marker) - Un(i);
              if (!(h >= 0 && p <= 0 || h <= 0 && p >= 0) && (h <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? D(u.to, n) >= 0 : D(u.to, n) > 0) || h >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? D(u.from, r) <= 0 : D(u.from, r) < 0)))
                return !0;
            }
          }
      }
      function zt(e) {
        for (var t; t = No(e); )
          e = t.find(-1, !0).line;
        return e;
      }
      function Pa(e) {
        for (var t; t = Gn(e); )
          e = t.find(1, !0).line;
        return e;
      }
      function za(e) {
        for (var t, n; t = Gn(e); )
          e = t.find(1, !0).line, (n || (n = [])).push(e);
        return n;
      }
      function Si(e, t) {
        var n = B(e, t), r = zt(n);
        return n == r ? t : f(r);
      }
      function Oo(e, t) {
        if (t > e.lastLine())
          return t;
        var n = B(e, t), r;
        if (!sr(e, n))
          return t;
        for (; r = Gn(n); )
          n = r.find(1, !0).line;
        return f(n) + 1;
      }
      function sr(e, t) {
        var n = Zt && t.markedSpans;
        if (n) {
          for (var r = void 0, i = 0; i < n.length; ++i)
            if (r = n[i], !!r.marker.collapsed) {
              if (r.from == null)
                return !0;
              if (!r.marker.widgetNode && r.from == 0 && r.marker.inclusiveLeft && Ci(e, t, r))
                return !0;
            }
        }
      }
      function Ci(e, t, n) {
        if (n.to == null) {
          var r = n.marker.find(1, !0);
          return Ci(e, r.line, fn(r.line.markedSpans, n.marker));
        }
        if (n.marker.inclusiveRight && n.to == t.text.length)
          return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
          if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (i.to == null || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && Ci(e, t, i))
            return !0;
      }
      function Jt(e) {
        e = zt(e);
        for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
          var i = n.lines[r];
          if (i == e)
            break;
          t += i.height;
        }
        for (var o = n.parent; o; n = o, o = n.parent)
          for (var l = 0; l < o.children.length; ++l) {
            var a = o.children[l];
            if (a == n)
              break;
            t += a.height;
          }
        return t;
      }
      function qn(e) {
        if (e.height == 0)
          return 0;
        for (var t = e.text.length, n, r = e; n = No(r); ) {
          var i = n.find(0, !0);
          r = i.from.line, t += i.from.ch - i.to.ch;
        }
        for (r = e; n = Gn(r); ) {
          var o = n.find(0, !0);
          t -= r.text.length - o.from.ch, r = o.to.line, t += r.text.length - o.to.ch;
        }
        return t;
      }
      function Li(e) {
        var t = e.display, n = e.doc;
        t.maxLine = B(n, n.first), t.maxLineLength = qn(t.maxLine), t.maxLineChanged = !0, n.iter(function(r) {
          var i = qn(r);
          i > t.maxLineLength && (t.maxLineLength = i, t.maxLine = r);
        });
      }
      var Br = function(e, t, n) {
        this.text = e, To(this, t), this.height = n ? n(this) : 1;
      };
      Br.prototype.lineNo = function() {
        return f(this);
      }, At(Br);
      function Ea(e, t, n, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), e.order != null && (e.order = null), Lo(e), To(e, n);
        var i = r ? r(e) : 1;
        i != e.height && St(e, i);
      }
      function Ha(e) {
        e.parent = null, Lo(e);
      }
      var Fa = {}, Ia = {};
      function Do(e, t) {
        if (!e || /^\s*$/.test(e))
          return null;
        var n = t.addModeClass ? Ia : Fa;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
      }
      function Wo(e, t) {
        var n = W("span", null, null, I ? "padding-right: .1px" : null), r = {
          pre: W("pre", [n], "CodeMirror-line"),
          content: n,
          col: 0,
          pos: 0,
          cm: e,
          trailingSpace: !1,
          splitSpaces: e.getOption("lineWrapping")
        };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
          var o = i ? t.rest[i - 1] : t.line, l = void 0;
          r.pos = 0, r.addToken = Ra, or(e.display.measure) && (l = se(o, e.doc.direction)) && (r.addToken = _a(r.addToken, l)), r.map = [];
          var a = t != e.display.externalMeasured && f(o);
          Ua(o, r, yo(e, o, a)), o.styleClasses && (o.styleClasses.bgClass && (r.bgClass = Mt(o.styleClasses.bgClass, r.bgClass || "")), o.styleClasses.textClass && (r.textClass = Mt(o.styleClasses.textClass, r.textClass || ""))), r.map.length == 0 && r.map.push(0, 0, r.content.appendChild(In(e.display.measure))), i == 0 ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (I) {
          var s = r.content.lastChild;
          (/\bcm-tab\b/.test(s.className) || s.querySelector && s.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack");
        }
        return Me(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = Mt(r.pre.className, r.textClass || "")), r;
      }
      function Ba(e) {
        var t = c("span", "•", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }
      function Ra(e, t, n, r, i, o, l) {
        if (t) {
          var a = e.splitSpaces ? Ka(t, e.trailingSpace) : t, s = e.cm.state.specialChars, u = !1, h;
          if (!s.test(t))
            e.col += t.length, h = document.createTextNode(a), e.map.push(e.pos, e.pos + t.length, h), E && N < 9 && (u = !0), e.pos += t.length;
          else {
            h = document.createDocumentFragment();
            for (var p = 0; ; ) {
              s.lastIndex = p;
              var g = s.exec(t), v = g ? g.index - p : t.length - p;
              if (v) {
                var b = document.createTextNode(a.slice(p, p + v));
                E && N < 9 ? h.appendChild(c("span", [b])) : h.appendChild(b), e.map.push(e.pos, e.pos + v, b), e.col += v, e.pos += v;
              }
              if (!g)
                break;
              p += v + 1;
              var S = void 0;
              if (g[0] == "	") {
                var L = e.cm.options.tabSize, A = L - e.col % L;
                S = h.appendChild(c("span", kt(A), "cm-tab")), S.setAttribute("role", "presentation"), S.setAttribute("cm-text", "	"), e.col += A;
              } else g[0] == "\r" || g[0] == `
` ? (S = h.appendChild(c("span", g[0] == "\r" ? "␍" : "␤", "cm-invalidchar")), S.setAttribute("cm-text", g[0]), e.col += 1) : (S = e.cm.options.specialCharPlaceholder(g[0]), S.setAttribute("cm-text", g[0]), E && N < 9 ? h.appendChild(c("span", [S])) : h.appendChild(S), e.col += 1);
              e.map.push(e.pos, e.pos + 1, S), e.pos++;
            }
          }
          if (e.trailingSpace = a.charCodeAt(t.length - 1) == 32, n || r || i || u || o || l) {
            var P = n || "";
            r && (P += r), i && (P += i);
            var O = c("span", [h], P, o);
            if (l)
              for (var H in l)
                l.hasOwnProperty(H) && H != "style" && H != "class" && O.setAttribute(H, l[H]);
            return e.content.appendChild(O);
          }
          e.content.appendChild(h);
        }
      }
      function Ka(e, t) {
        if (e.length > 1 && !/  /.test(e))
          return e;
        for (var n = t, r = "", i = 0; i < e.length; i++) {
          var o = e.charAt(i);
          o == " " && n && (i == e.length - 1 || e.charCodeAt(i + 1) == 32) && (o = " "), r += o, n = o == " ";
        }
        return r;
      }
      function _a(e, t) {
        return function(n, r, i, o, l, a, s) {
          i = i ? i + " cm-force-border" : "cm-force-border";
          for (var u = n.pos, h = u + r.length; ; ) {
            for (var p = void 0, g = 0; g < t.length && (p = t[g], !(p.to > u && p.from <= u)); g++)
              ;
            if (p.to >= h)
              return e(n, r, i, o, l, a, s);
            e(n, r.slice(0, p.to - u), i, o, null, a, s), o = null, r = r.slice(p.to - u), u = p.to;
          }
        };
      }
      function Po(e, t, n, r) {
        var i = !r && n.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1;
      }
      function Ua(e, t, n) {
        var r = e.markedSpans, i = e.text, o = 0;
        if (!r) {
          for (var l = 1; l < n.length; l += 2)
            t.addToken(t, i.slice(o, o = n[l]), Do(n[l + 1], t.cm.options));
          return;
        }
        for (var a = i.length, s = 0, u = 1, h = "", p, g, v = 0, b, S, L, A, P; ; ) {
          if (v == s) {
            b = S = L = g = "", P = null, A = null, v = 1 / 0;
            for (var O = [], H = void 0, G = 0; G < r.length; ++G) {
              var K = r[G], ne = K.marker;
              if (ne.type == "bookmark" && K.from == s && ne.widgetNode)
                O.push(ne);
              else if (K.from <= s && (K.to == null || K.to > s || ne.collapsed && K.to == s && K.from == s)) {
                if (K.to != null && K.to != s && v > K.to && (v = K.to, S = ""), ne.className && (b += " " + ne.className), ne.css && (g = (g ? g + ";" : "") + ne.css), ne.startStyle && K.from == s && (L += " " + ne.startStyle), ne.endStyle && K.to == v && (H || (H = [])).push(ne.endStyle, K.to), ne.title && ((P || (P = {})).title = ne.title), ne.attributes)
                  for (var ke in ne.attributes)
                    (P || (P = {}))[ke] = ne.attributes[ke];
                ne.collapsed && (!A || ki(A.marker, ne) < 0) && (A = K);
              } else K.from > s && v > K.from && (v = K.from);
            }
            if (H)
              for (var je = 0; je < H.length; je += 2)
                H[je + 1] == v && (S += " " + H[je]);
            if (!A || A.from == s)
              for (var Te = 0; Te < O.length; ++Te)
                Po(t, 0, O[Te]);
            if (A && (A.from || 0) == s) {
              if (Po(
                t,
                (A.to == null ? a + 1 : A.to) - s,
                A.marker,
                A.from == null
              ), A.to == null)
                return;
              A.to == s && (A = !1);
            }
          }
          if (s >= a)
            break;
          for (var bt = Math.min(a, v); ; ) {
            if (h) {
              var dt = s + h.length;
              if (!A) {
                var Fe = dt > bt ? h.slice(0, bt - s) : h;
                t.addToken(
                  t,
                  Fe,
                  p ? p + b : b,
                  L,
                  s + Fe.length == v ? S : "",
                  g,
                  P
                );
              }
              if (dt >= bt) {
                h = h.slice(bt - s), s = bt;
                break;
              }
              s = dt, L = "";
            }
            h = i.slice(o, o = n[u++]), p = Do(n[u++], t.cm.options);
          }
        }
      }
      function zo(e, t, n) {
        this.line = t, this.rest = za(t), this.size = this.rest ? f(ue(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = sr(e, t);
      }
      function Xn(e, t, n) {
        for (var r = [], i, o = t; o < n; o = i) {
          var l = new zo(e.doc, B(e.doc, o), o);
          i = o + l.size, r.push(l);
        }
        return r;
      }
      var Rr = null;
      function Ga(e) {
        Rr ? Rr.ops.push(e) : e.ownsGroup = Rr = {
          ops: [e],
          delayedCallbacks: []
        };
      }
      function qa(e) {
        var t = e.delayedCallbacks, n = 0;
        do {
          for (; n < t.length; n++)
            t[n].call(null);
          for (var r = 0; r < e.ops.length; r++) {
            var i = e.ops[r];
            if (i.cursorActivityHandlers)
              for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
                i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
          }
        } while (n < t.length);
      }
      function Xa(e, t) {
        var n = e.ownsGroup;
        if (n)
          try {
            qa(n);
          } finally {
            Rr = null, t(n);
          }
      }
      var cn = null;
      function qe(e, t) {
        var n = Yt(e, t);
        if (n.length) {
          var r = Array.prototype.slice.call(arguments, 2), i;
          Rr ? i = Rr.delayedCallbacks : cn ? i = cn : (i = cn = [], setTimeout(Ya, 0));
          for (var o = function(a) {
            i.push(function() {
              return n[a].apply(null, r);
            });
          }, l = 0; l < n.length; ++l)
            o(l);
        }
      }
      function Ya() {
        var e = cn;
        cn = null;
        for (var t = 0; t < e.length; ++t)
          e[t]();
      }
      function Eo(e, t, n, r) {
        for (var i = 0; i < t.changes.length; i++) {
          var o = t.changes[i];
          o == "text" ? Za(e, t) : o == "gutter" ? Fo(e, t, n, r) : o == "class" ? Ti(e, t) : o == "widget" && Ja(e, t, r);
        }
        t.changes = null;
      }
      function hn(e) {
        return e.node == e.text && (e.node = c("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), E && N < 8 && (e.node.style.zIndex = 2)), e.node;
      }
      function ja(e, t) {
        var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (n && (n += " CodeMirror-linebackground"), t.background)
          n ? t.background.className = n : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (n) {
          var r = hn(t);
          t.background = r.insertBefore(c("div", null, n), r.firstChild), e.display.input.setUneditable(t.background);
        }
      }
      function Ho(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : Wo(e, t);
      }
      function Za(e, t) {
        var n = t.text.className, r = Ho(e, t);
        t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, Ti(e, t)) : n && (t.text.className = n);
      }
      function Ti(e, t) {
        ja(e, t), t.line.wrapClass ? hn(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = n || "";
      }
      function Fo(e, t, n, r) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var i = hn(t);
          t.gutterBackground = c(
            "div",
            null,
            "CodeMirror-gutter-background " + t.line.gutterClass,
            "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"
          ), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text);
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
          var l = hn(t), a = t.gutter = c("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
          if (a.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(a), l.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), e.options.lineNumbers && (!o || !o["CodeMirror-linenumbers"]) && (t.lineNumber = a.appendChild(
            c(
              "div",
              C(e.options, n),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"
            )
          )), o)
            for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
              var u = e.display.gutterSpecs[s].className, h = o.hasOwnProperty(u) && o[u];
              h && a.appendChild(c(
                "div",
                [h],
                "CodeMirror-gutter-elt",
                "left: " + r.gutterLeft[u] + "px; width: " + r.gutterWidth[u] + "px"
              ));
            }
        }
      }
      function Ja(e, t, n) {
        t.alignable && (t.alignable = null);
        for (var r = Y("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o)
          o = i.nextSibling, r.test(i.className) && t.node.removeChild(i);
        Io(e, t, n);
      }
      function Qa(e, t, n, r) {
        var i = Ho(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), Ti(e, t), Fo(e, t, n, r), Io(e, t, r), t.node;
      }
      function Io(e, t, n) {
        if (Bo(e, t.line, t, n, !0), t.rest)
          for (var r = 0; r < t.rest.length; r++)
            Bo(e, t.rest[r], t, n, !1);
      }
      function Bo(e, t, n, r, i) {
        if (t.widgets)
          for (var o = hn(n), l = 0, a = t.widgets; l < a.length; ++l) {
            var s = a[l], u = c("div", [s.node], "CodeMirror-linewidget" + (s.className ? " " + s.className : ""));
            s.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), Va(s, u, n, r), e.display.input.setUneditable(u), i && s.above ? o.insertBefore(u, n.gutter || n.text) : o.appendChild(u), qe(s, "redraw");
          }
      }
      function Va(e, t, n, r) {
        if (e.noHScroll) {
          (n.alignable || (n.alignable = [])).push(t);
          var i = r.wrapperWidth;
          t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px";
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
      }
      function dn(e) {
        if (e.height != null)
          return e.height;
        var t = e.doc.cm;
        if (!t)
          return 0;
        if (!q(document.body, e.node)) {
          var n = "position: relative;";
          e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), F(t.display.measure, c("div", [e.node], null, n));
        }
        return e.height = e.node.parentNode.offsetHeight;
      }
      function Qt(e, t) {
        for (var n = on(t); n != e.wrapper; n = n.parentNode)
          if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == e.sizer && n != e.mover)
            return !0;
      }
      function Yn(e) {
        return e.lineSpace.offsetTop;
      }
      function Mi(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }
      function Ro(e) {
        if (e.cachedPaddingH)
          return e.cachedPaddingH;
        var t = F(e.measure, c("pre", "x", "CodeMirror-line-like")), n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, r = { left: parseInt(n.paddingLeft), right: parseInt(n.paddingRight) };
        return !isNaN(r.left) && !isNaN(r.right) && (e.cachedPaddingH = r), r;
      }
      function Kt(e) {
        return Je - e.display.nativeBarWidth;
      }
      function br(e) {
        return e.display.scroller.clientWidth - Kt(e) - e.display.barWidth;
      }
      function Ni(e) {
        return e.display.scroller.clientHeight - Kt(e) - e.display.barHeight;
      }
      function $a(e, t, n) {
        var r = e.options.lineWrapping, i = r && br(e);
        if (!t.measure.heights || r && t.measure.width != i) {
          var o = t.measure.heights = [];
          if (r) {
            t.measure.width = i;
            for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
              var s = l[a], u = l[a + 1];
              Math.abs(s.bottom - u.bottom) > 2 && o.push((s.bottom + u.top) / 2 - n.top);
            }
          }
          o.push(n.bottom - n.top);
        }
      }
      function Ko(e, t, n) {
        if (e.line == t)
          return { map: e.measure.map, cache: e.measure.cache };
        if (e.rest) {
          for (var r = 0; r < e.rest.length; r++)
            if (e.rest[r] == t)
              return { map: e.measure.maps[r], cache: e.measure.caches[r] };
          for (var i = 0; i < e.rest.length; i++)
            if (f(e.rest[i]) > n)
              return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 };
        }
      }
      function es(e, t) {
        t = zt(t);
        var n = f(t), r = e.display.externalMeasured = new zo(e.doc, t, n);
        r.lineN = n;
        var i = r.built = Wo(e, r);
        return r.text = i.pre, F(e.display.lineMeasure, i.pre), r;
      }
      function _o(e, t, n, r) {
        return _t(e, Kr(e, t), n, r);
      }
      function Ai(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
          return e.display.view[kr(e, t)];
        var n = e.display.externalMeasured;
        if (n && t >= n.lineN && t < n.lineN + n.size)
          return n;
      }
      function Kr(e, t) {
        var n = f(t), r = Ai(e, n);
        r && !r.text ? r = null : r && r.changes && (Eo(e, r, n, zi(e)), e.curOp.forceUpdate = !0), r || (r = es(e, t));
        var i = Ko(r, t, n);
        return {
          line: t,
          view: r,
          rect: null,
          map: i.map,
          cache: i.cache,
          before: i.before,
          hasHeights: !1
        };
      }
      function _t(e, t, n, r, i) {
        t.before && (n = -1);
        var o = n + (r || ""), l;
        return t.cache.hasOwnProperty(o) ? l = t.cache[o] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || ($a(e, t.view, t.rect), t.hasHeights = !0), l = rs(e, t, n, r), l.bogus || (t.cache[o] = l)), {
          left: l.left,
          right: l.right,
          top: i ? l.rtop : l.top,
          bottom: i ? l.rbottom : l.bottom
        };
      }
      var Uo = { left: 0, right: 0, top: 0, bottom: 0 };
      function Go(e, t, n) {
        for (var r, i, o, l, a, s, u = 0; u < e.length; u += 3)
          if (a = e[u], s = e[u + 1], t < a ? (i = 0, o = 1, l = "left") : t < s ? (i = t - a, o = i + 1) : (u == e.length - 3 || t == s && e[u + 3] > t) && (o = s - a, i = o - 1, t >= s && (l = "right")), i != null) {
            if (r = e[u + 2], a == s && n == (r.insertLeft ? "left" : "right") && (l = n), n == "left" && i == 0)
              for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; )
                r = e[(u -= 3) + 2], l = "left";
            if (n == "right" && i == s - a)
              for (; u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft; )
                r = e[(u += 3) + 2], l = "right";
            break;
          }
        return { node: r, start: i, end: o, collapse: l, coverStart: a, coverEnd: s };
      }
      function ts(e, t) {
        var n = Uo;
        if (t == "left")
          for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++)
            ;
        else
          for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--)
            ;
        return n;
      }
      function rs(e, t, n, r) {
        var i = Go(t.map, n, r), o = i.node, l = i.start, a = i.end, s = i.collapse, u;
        if (o.nodeType == 3) {
          for (var h = 0; h < 4; h++) {
            for (; l && He(t.line.text.charAt(i.coverStart + l)); )
              --l;
            for (; i.coverStart + a < i.coverEnd && He(t.line.text.charAt(i.coverStart + a)); )
              ++a;
            if (E && N < 9 && l == 0 && a == i.coverEnd - i.coverStart ? u = o.parentNode.getBoundingClientRect() : u = ts(T(o, l, a).getClientRects(), r), u.left || u.right || l == 0)
              break;
            a = l, l = l - 1, s = "right";
          }
          E && N < 11 && (u = ns(e.display.measure, u));
        } else {
          l > 0 && (s = r = "right");
          var p;
          e.options.lineWrapping && (p = o.getClientRects()).length > 1 ? u = p[r == "right" ? p.length - 1 : 0] : u = o.getBoundingClientRect();
        }
        if (E && N < 9 && !l && (!u || !u.left && !u.right)) {
          var g = o.parentNode.getClientRects()[0];
          g ? u = { left: g.left, right: g.left + Ur(e.display), top: g.top, bottom: g.bottom } : u = Uo;
        }
        for (var v = u.top - t.rect.top, b = u.bottom - t.rect.top, S = (v + b) / 2, L = t.view.measure.heights, A = 0; A < L.length - 1 && !(S < L[A]); A++)
          ;
        var P = A ? L[A - 1] : 0, O = L[A], H = {
          left: (s == "right" ? u.right : u.left) - t.rect.left,
          right: (s == "left" ? u.left : u.right) - t.rect.left,
          top: P,
          bottom: O
        };
        return !u.left && !u.right && (H.bogus = !0), e.options.singleCursorHeightPerLine || (H.rtop = v, H.rbottom = b), H;
      }
      function ns(e, t) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !mi(e))
          return t;
        var n = screen.logicalXDPI / screen.deviceXDPI, r = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: t.left * n,
          right: t.right * n,
          top: t.top * r,
          bottom: t.bottom * r
        };
      }
      function qo(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
          for (var t = 0; t < e.rest.length; t++)
            e.measure.caches[t] = {};
      }
      function Xo(e) {
        e.display.externalMeasure = null, k(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++)
          qo(e.display.view[t]);
      }
      function pn(e) {
        Xo(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
      }
      function Yo(e) {
        return _ && $ ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft)) : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
      }
      function jo(e) {
        return _ && $ ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop)) : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
      }
      function Oi(e) {
        var t = zt(e), n = t.widgets, r = 0;
        if (n)
          for (var i = 0; i < n.length; ++i)
            n[i].above && (r += dn(n[i]));
        return r;
      }
      function jn(e, t, n, r, i) {
        if (!i) {
          var o = Oi(t);
          n.top += o, n.bottom += o;
        }
        if (r == "line")
          return n;
        r || (r = "local");
        var l = Jt(t);
        if (r == "local" ? l += Yn(e.display) : l -= e.display.viewOffset, r == "page" || r == "window") {
          var a = e.display.lineSpace.getBoundingClientRect();
          l += a.top + (r == "window" ? 0 : jo(nt(e)));
          var s = a.left + (r == "window" ? 0 : Yo(nt(e)));
          n.left += s, n.right += s;
        }
        return n.top += l, n.bottom += l, n;
      }
      function Zo(e, t, n) {
        if (n == "div")
          return t;
        var r = t.left, i = t.top;
        if (n == "page")
          r -= Yo(nt(e)), i -= jo(nt(e));
        else if (n == "local" || !n) {
          var o = e.display.sizer.getBoundingClientRect();
          r += o.left, i += o.top;
        }
        var l = e.display.lineSpace.getBoundingClientRect();
        return { left: r - l.left, top: i - l.top };
      }
      function Zn(e, t, n, r, i) {
        return r || (r = B(e.doc, t.line)), jn(e, r, _o(e, r, t.ch, i), n);
      }
      function Et(e, t, n, r, i, o) {
        r = r || B(e.doc, t.line), i || (i = Kr(e, r));
        function l(b, S) {
          var L = _t(e, i, b, S ? "right" : "left", o);
          return S ? L.left = L.right : L.right = L.left, jn(e, r, L, n);
        }
        var a = se(r, e.doc.direction), s = t.ch, u = t.sticky;
        if (s >= r.text.length ? (s = r.text.length, u = "before") : s <= 0 && (s = 0, u = "after"), !a)
          return l(u == "before" ? s - 1 : s, u == "before");
        function h(b, S, L) {
          var A = a[S], P = A.level == 1;
          return l(L ? b - 1 : b, P != L);
        }
        var p = nr(a, s, u), g = yr, v = h(s, p, u == "before");
        return g != null && (v.other = h(s, g, u != "before")), v;
      }
      function Jo(e, t) {
        var n = 0;
        t = V(e.doc, t), e.options.lineWrapping || (n = Ur(e.display) * t.ch);
        var r = B(e.doc, t.line), i = Jt(r) + Yn(e.display);
        return { left: n, right: n, top: i, bottom: i + r.height };
      }
      function Di(e, t, n, r, i) {
        var o = m(e, t, n);
        return o.xRel = i, r && (o.outside = r), o;
      }
      function Wi(e, t, n) {
        var r = e.doc;
        if (n += e.display.viewOffset, n < 0)
          return Di(r.first, 0, null, -1, -1);
        var i = d(r, n), o = r.first + r.size - 1;
        if (i > o)
          return Di(r.first + r.size - 1, B(r, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var l = B(r, i); ; ) {
          var a = is(e, l, i, t, n), s = Wa(l, a.ch + (a.xRel > 0 || a.outside > 0 ? 1 : 0));
          if (!s)
            return a;
          var u = s.find(1);
          if (u.line == i)
            return u;
          l = B(r, i = u.line);
        }
      }
      function Qo(e, t, n, r) {
        r -= Oi(t);
        var i = t.text.length, o = It(function(l) {
          return _t(e, n, l - 1).bottom <= r;
        }, i, 0);
        return i = It(function(l) {
          return _t(e, n, l).top > r;
        }, o, i), { begin: o, end: i };
      }
      function Vo(e, t, n, r) {
        n || (n = Kr(e, t));
        var i = jn(e, t, _t(e, n, r), "line").top;
        return Qo(e, t, n, i);
      }
      function Pi(e, t, n, r) {
        return e.bottom <= n ? !1 : e.top > n ? !0 : (r ? e.left : e.right) > t;
      }
      function is(e, t, n, r, i) {
        i -= Jt(t);
        var o = Kr(e, t), l = Oi(t), a = 0, s = t.text.length, u = !0, h = se(t, e.doc.direction);
        if (h) {
          var p = (e.options.lineWrapping ? ls : os)(e, t, n, o, h, r, i);
          u = p.level != 1, a = u ? p.from : p.to - 1, s = u ? p.to : p.from - 1;
        }
        var g = null, v = null, b = It(function(G) {
          var K = _t(e, o, G);
          return K.top += l, K.bottom += l, Pi(K, r, i, !1) ? (K.top <= i && K.left <= r && (g = G, v = K), !0) : !1;
        }, a, s), S, L, A = !1;
        if (v) {
          var P = r - v.left < v.right - r, O = P == u;
          b = g + (O ? 0 : 1), L = O ? "after" : "before", S = P ? v.left : v.right;
        } else {
          !u && (b == s || b == a) && b++, L = b == 0 ? "after" : b == t.text.length ? "before" : _t(e, o, b - (u ? 1 : 0)).bottom + l <= i == u ? "after" : "before";
          var H = Et(e, m(n, b, L), "line", t, o);
          S = H.left, A = i < H.top ? -1 : i >= H.bottom ? 1 : 0;
        }
        return b = tr(t.text, b, 1), Di(n, b, L, A, r - S);
      }
      function os(e, t, n, r, i, o, l) {
        var a = It(function(p) {
          var g = i[p], v = g.level != 1;
          return Pi(Et(
            e,
            m(n, v ? g.to : g.from, v ? "before" : "after"),
            "line",
            t,
            r
          ), o, l, !0);
        }, 0, i.length - 1), s = i[a];
        if (a > 0) {
          var u = s.level != 1, h = Et(
            e,
            m(n, u ? s.from : s.to, u ? "after" : "before"),
            "line",
            t,
            r
          );
          Pi(h, o, l, !0) && h.top > l && (s = i[a - 1]);
        }
        return s;
      }
      function ls(e, t, n, r, i, o, l) {
        var a = Qo(e, t, r, l), s = a.begin, u = a.end;
        /\s/.test(t.text.charAt(u - 1)) && u--;
        for (var h = null, p = null, g = 0; g < i.length; g++) {
          var v = i[g];
          if (!(v.from >= u || v.to <= s)) {
            var b = v.level != 1, S = _t(e, r, b ? Math.min(u, v.to) - 1 : Math.max(s, v.from)).right, L = S < o ? o - S + 1e9 : S - o;
            (!h || p > L) && (h = v, p = L);
          }
        }
        return h || (h = i[i.length - 1]), h.from < s && (h = { from: s, to: h.to, level: h.level }), h.to > u && (h = { from: h.from, to: u, level: h.level }), h;
      }
      var wr;
      function _r(e) {
        if (e.cachedTextHeight != null)
          return e.cachedTextHeight;
        if (wr == null) {
          wr = c("pre", null, "CodeMirror-line-like");
          for (var t = 0; t < 49; ++t)
            wr.appendChild(document.createTextNode("x")), wr.appendChild(c("br"));
          wr.appendChild(document.createTextNode("x"));
        }
        F(e.measure, wr);
        var n = wr.offsetHeight / 50;
        return n > 3 && (e.cachedTextHeight = n), k(e.measure), n || 1;
      }
      function Ur(e) {
        if (e.cachedCharWidth != null)
          return e.cachedCharWidth;
        var t = c("span", "xxxxxxxxxx"), n = c("pre", [t], "CodeMirror-line-like");
        F(e.measure, n);
        var r = t.getBoundingClientRect(), i = (r.right - r.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10;
      }
      function zi(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) {
          var a = e.display.gutterSpecs[l].className;
          n[a] = o.offsetLeft + o.clientLeft + i, r[a] = o.clientWidth;
        }
        return {
          fixedPos: Ei(t),
          gutterTotalWidth: t.gutters.offsetWidth,
          gutterLeft: n,
          gutterWidth: r,
          wrapperWidth: t.wrapper.clientWidth
        };
      }
      function Ei(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }
      function $o(e) {
        var t = _r(e.display), n = e.options.lineWrapping, r = n && Math.max(5, e.display.scroller.clientWidth / Ur(e.display) - 3);
        return function(i) {
          if (sr(e.doc, i))
            return 0;
          var o = 0;
          if (i.widgets)
            for (var l = 0; l < i.widgets.length; l++)
              i.widgets[l].height && (o += i.widgets[l].height);
          return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t;
        };
      }
      function Hi(e) {
        var t = e.doc, n = $o(e);
        t.iter(function(r) {
          var i = n(r);
          i != r.height && St(r, i);
        });
      }
      function xr(e, t, n, r) {
        var i = e.display;
        if (!n && on(t).getAttribute("cm-not-content") == "true")
          return null;
        var o, l, a = i.lineSpace.getBoundingClientRect();
        try {
          o = t.clientX - a.left, l = t.clientY - a.top;
        } catch {
          return null;
        }
        var s = Wi(e, o, l), u;
        if (r && s.xRel > 0 && (u = B(e.doc, s.line).text).length == s.ch) {
          var h = ce(u, u.length, e.options.tabSize) - u.length;
          s = m(s.line, Math.max(0, Math.round((o - Ro(e.display).left) / Ur(e.display)) - h));
        }
        return s;
      }
      function kr(e, t) {
        if (t >= e.display.viewTo || (t -= e.display.viewFrom, t < 0))
          return null;
        for (var n = e.display.view, r = 0; r < n.length; r++)
          if (t -= n[r].size, t < 0)
            return r;
      }
      function ct(e, t, n, r) {
        t == null && (t = e.doc.first), n == null && (n = e.doc.first + e.doc.size), r || (r = 0);
        var i = e.display;
        if (r && n < i.viewTo && (i.updateLineNumbers == null || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo)
          Zt && Si(e.doc, t) < i.viewTo && fr(e);
        else if (n <= i.viewFrom)
          Zt && Oo(e.doc, n + r) > i.viewFrom ? fr(e) : (i.viewFrom += r, i.viewTo += r);
        else if (t <= i.viewFrom && n >= i.viewTo)
          fr(e);
        else if (t <= i.viewFrom) {
          var o = Jn(e, n, n + r, 1);
          o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : fr(e);
        } else if (n >= i.viewTo) {
          var l = Jn(e, t, t, -1);
          l ? (i.view = i.view.slice(0, l.index), i.viewTo = l.lineN) : fr(e);
        } else {
          var a = Jn(e, t, t, -1), s = Jn(e, n, n + r, 1);
          a && s ? (i.view = i.view.slice(0, a.index).concat(Xn(e, a.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += r) : fr(e);
        }
        var u = i.externalMeasured;
        u && (n < u.lineN ? u.lineN += r : t < u.lineN + u.size && (i.externalMeasured = null));
      }
      function ur(e, t, n) {
        e.curOp.viewChanged = !0;
        var r = e.display, i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
          var o = r.view[kr(e, t)];
          if (o.node != null) {
            var l = o.changes || (o.changes = []);
            R(l, n) == -1 && l.push(n);
          }
        }
      }
      function fr(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }
      function Jn(e, t, n, r) {
        var i = kr(e, t), o, l = e.display.view;
        if (!Zt || n == e.doc.first + e.doc.size)
          return { index: i, lineN: n };
        for (var a = e.display.viewFrom, s = 0; s < i; s++)
          a += l[s].size;
        if (a != t) {
          if (r > 0) {
            if (i == l.length - 1)
              return null;
            o = a + l[i].size - t, i++;
          } else
            o = a - t;
          t += o, n += o;
        }
        for (; Si(e.doc, n) != n; ) {
          if (i == (r < 0 ? 0 : l.length - 1))
            return null;
          n += r * l[i - (r < 0 ? 1 : 0)].size, i += r;
        }
        return { index: i, lineN: n };
      }
      function as(e, t, n) {
        var r = e.display, i = r.view;
        i.length == 0 || t >= r.viewTo || n <= r.viewFrom ? (r.view = Xn(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = Xn(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(kr(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(Xn(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, kr(e, n)))), r.viewTo = n;
      }
      function el(e) {
        for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
          var i = t[r];
          !i.hidden && (!i.node || i.changes) && ++n;
        }
        return n;
      }
      function vn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }
      function tl(e, t) {
        t === void 0 && (t = !0);
        var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), l = e.options.$customCursor;
        l && (t = !0);
        for (var a = 0; a < n.sel.ranges.length; a++)
          if (!(!t && a == n.sel.primIndex)) {
            var s = n.sel.ranges[a];
            if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
              var u = s.empty();
              if (l) {
                var h = l(e, s);
                h && Fi(e, h, i);
              } else (u || e.options.showCursorWhenSelecting) && Fi(e, s.head, i);
              u || ss(e, s, o);
            }
          }
        return r;
      }
      function Fi(e, t, n) {
        var r = Et(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = n.appendChild(c("div", " ", "CodeMirror-cursor"));
        if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
          var o = Zn(e, t, "div", null, null), l = o.right - o.left;
          i.style.width = (l > 0 ? l : e.defaultCharWidth()) + "px";
        }
        if (r.other) {
          var a = n.appendChild(c("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
          a.style.display = "", a.style.left = r.other.left + "px", a.style.top = r.other.top + "px", a.style.height = (r.other.bottom - r.other.top) * 0.85 + "px";
        }
      }
      function Qn(e, t) {
        return e.top - t.top || e.left - t.left;
      }
      function ss(e, t, n) {
        var r = e.display, i = e.doc, o = document.createDocumentFragment(), l = Ro(e.display), a = l.left, s = Math.max(r.sizerWidth, br(e) - r.sizer.offsetLeft) - l.right, u = i.direction == "ltr";
        function h(O, H, G, K) {
          H < 0 && (H = 0), H = Math.round(H), K = Math.round(K), o.appendChild(c("div", null, "CodeMirror-selected", "position: absolute; left: " + O + `px;
                             top: ` + H + "px; width: " + (G ?? s - O) + `px;
                             height: ` + (K - H) + "px"));
        }
        function p(O, H, G) {
          var K = B(i, O), ne = K.text.length, ke, je;
          function Te(Fe, pt) {
            return Zn(e, m(O, Fe), "div", K, pt);
          }
          function bt(Fe, pt, Qe) {
            var _e = Vo(e, K, null, Fe), Ie = pt == "ltr" == (Qe == "after") ? "left" : "right", Oe = Qe == "after" ? _e.begin : _e.end - (/\s/.test(K.text.charAt(_e.end - 1)) ? 2 : 1);
            return Te(Oe, Ie)[Ie];
          }
          var dt = se(K, i.direction);
          return rr(dt, H || 0, G ?? ne, function(Fe, pt, Qe, _e) {
            var Ie = Qe == "ltr", Oe = Te(Fe, Ie ? "left" : "right"), vt = Te(pt - 1, Ie ? "right" : "left"), rn = H == null && Fe == 0, gr = G == null && pt == ne, rt = _e == 0, Ut = !dt || _e == dt.length - 1;
            if (vt.top - Oe.top <= 3) {
              var Ze = (u ? rn : gr) && rt, fo = (u ? gr : rn) && Ut, er = Ze ? a : (Ie ? Oe : vt).left, Mr = fo ? s : (Ie ? vt : Oe).right;
              h(er, Oe.top, Mr - er, Oe.bottom);
            } else {
              var Nr, ot, nn, co;
              Ie ? (Nr = u && rn && rt ? a : Oe.left, ot = u ? s : bt(Fe, Qe, "before"), nn = u ? a : bt(pt, Qe, "after"), co = u && gr && Ut ? s : vt.right) : (Nr = u ? bt(Fe, Qe, "before") : a, ot = !u && rn && rt ? s : Oe.right, nn = !u && gr && Ut ? a : vt.left, co = u ? bt(pt, Qe, "after") : s), h(Nr, Oe.top, ot - Nr, Oe.bottom), Oe.bottom < vt.top && h(a, Oe.bottom, null, vt.top), h(nn, vt.top, co - nn, vt.bottom);
            }
            (!ke || Qn(Oe, ke) < 0) && (ke = Oe), Qn(vt, ke) < 0 && (ke = vt), (!je || Qn(Oe, je) < 0) && (je = Oe), Qn(vt, je) < 0 && (je = vt);
          }), { start: ke, end: je };
        }
        var g = t.from(), v = t.to();
        if (g.line == v.line)
          p(g.line, g.ch, v.ch);
        else {
          var b = B(i, g.line), S = B(i, v.line), L = zt(b) == zt(S), A = p(g.line, g.ch, L ? b.text.length + 1 : null).end, P = p(v.line, L ? 0 : null, v.ch).start;
          L && (A.top < P.top - 2 ? (h(A.right, A.top, null, A.bottom), h(a, P.top, P.left, P.bottom)) : h(A.right, A.top, P.left - A.right, A.bottom)), A.bottom < P.top && h(a, A.bottom, null, P.top);
        }
        n.appendChild(o);
      }
      function Ii(e) {
        if (e.state.focused) {
          var t = e.display;
          clearInterval(t.blinker);
          var n = !0;
          t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
            e.hasFocus() || Gr(e), t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }
      function rl(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || Ri(e));
      }
      function Bi(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && Gr(e));
        }, 100);
      }
      function Ri(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), e.options.readOnly != "nocursor" && (e.state.focused || (Me(e, "focus", e, t), e.state.focused = !0, Pe(e.display.wrapper, "CodeMirror-focused"), !e.curOp && e.display.selForContextMenu != e.doc.sel && (e.display.input.reset(), I && setTimeout(function() {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), Ii(e));
      }
      function Gr(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (Me(e, "blur", e, t), e.state.focused = !1, Le(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }
      function Vn(e) {
        for (var t = e.display, n = t.lineDiv.offsetTop, r = Math.max(0, t.scroller.getBoundingClientRect().top), i = t.lineDiv.getBoundingClientRect().top, o = 0, l = 0; l < t.view.length; l++) {
          var a = t.view[l], s = e.options.lineWrapping, u = void 0, h = 0;
          if (!a.hidden) {
            if (i += a.line.height, E && N < 8) {
              var p = a.node.offsetTop + a.node.offsetHeight;
              u = p - n, n = p;
            } else {
              var g = a.node.getBoundingClientRect();
              u = g.bottom - g.top, !s && a.text.firstChild && (h = a.text.firstChild.getBoundingClientRect().right - g.left - 1);
            }
            var v = a.line.height - u;
            if ((v > 5e-3 || v < -5e-3) && (i < r && (o -= v), St(a.line, u), nl(a.line), a.rest))
              for (var b = 0; b < a.rest.length; b++)
                nl(a.rest[b]);
            if (h > e.display.sizerWidth) {
              var S = Math.ceil(h / Ur(e.display));
              S > e.display.maxLineLength && (e.display.maxLineLength = S, e.display.maxLine = a.line, e.display.maxLineChanged = !0);
            }
          }
        }
        Math.abs(o) > 2 && (t.scroller.scrollTop += o);
      }
      function nl(e) {
        if (e.widgets)
          for (var t = 0; t < e.widgets.length; ++t) {
            var n = e.widgets[t], r = n.node.parentNode;
            r && (n.height = r.offsetHeight);
          }
      }
      function $n(e, t, n) {
        var r = n && n.top != null ? Math.max(0, n.top) : e.scroller.scrollTop;
        r = Math.floor(r - Yn(e));
        var i = n && n.bottom != null ? n.bottom : r + e.wrapper.clientHeight, o = d(t, r), l = d(t, i);
        if (n && n.ensure) {
          var a = n.ensure.from.line, s = n.ensure.to.line;
          a < o ? (o = a, l = d(t, Jt(B(t, a)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= l && (o = d(t, Jt(B(t, s)) - e.wrapper.clientHeight), l = s);
        }
        return { from: o, to: Math.max(l, o + 1) };
      }
      function us(e, t) {
        if (!Ne(e, "scrollCursorIntoView")) {
          var n = e.display, r = n.sizer.getBoundingClientRect(), i = null, o = n.wrapper.ownerDocument;
          if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (o.defaultView.innerHeight || o.documentElement.clientHeight) && (i = !1), i != null && !Be) {
            var l = c("div", "​", null, `position: absolute;
                         top: ` + (t.top - n.viewOffset - Yn(e.display)) + `px;
                         height: ` + (t.bottom - t.top + Kt(e) + n.barHeight) + `px;
                         left: ` + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
            e.display.lineSpace.appendChild(l), l.scrollIntoView(i), e.display.lineSpace.removeChild(l);
          }
        }
      }
      function fs(e, t, n, r) {
        r == null && (r = 0);
        var i;
        !e.options.lineWrapping && t == n && (n = t.sticky == "before" ? m(t.line, t.ch + 1, "before") : t, t = t.ch ? m(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after") : t);
        for (var o = 0; o < 5; o++) {
          var l = !1, a = Et(e, t), s = !n || n == t ? a : Et(e, n);
          i = {
            left: Math.min(a.left, s.left),
            top: Math.min(a.top, s.top) - r,
            right: Math.max(a.left, s.left),
            bottom: Math.max(a.bottom, s.bottom) + r
          };
          var u = Ki(e, i), h = e.doc.scrollTop, p = e.doc.scrollLeft;
          if (u.scrollTop != null && (yn(e, u.scrollTop), Math.abs(e.doc.scrollTop - h) > 1 && (l = !0)), u.scrollLeft != null && (Sr(e, u.scrollLeft), Math.abs(e.doc.scrollLeft - p) > 1 && (l = !0)), !l)
            break;
        }
        return i;
      }
      function cs(e, t) {
        var n = Ki(e, t);
        n.scrollTop != null && yn(e, n.scrollTop), n.scrollLeft != null && Sr(e, n.scrollLeft);
      }
      function Ki(e, t) {
        var n = e.display, r = _r(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && e.curOp.scrollTop != null ? e.curOp.scrollTop : n.scroller.scrollTop, o = Ni(e), l = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var a = e.doc.height + Mi(n), s = t.top < r, u = t.bottom > a - r;
        if (t.top < i)
          l.scrollTop = s ? 0 : t.top;
        else if (t.bottom > i + o) {
          var h = Math.min(t.top, (u ? a : t.bottom) - o);
          h != i && (l.scrollTop = h);
        }
        var p = e.options.fixedGutter ? 0 : n.gutters.offsetWidth, g = e.curOp && e.curOp.scrollLeft != null ? e.curOp.scrollLeft : n.scroller.scrollLeft - p, v = br(e) - n.gutters.offsetWidth, b = t.right - t.left > v;
        return b && (t.right = t.left + v), t.left < 10 ? l.scrollLeft = 0 : t.left < g ? l.scrollLeft = Math.max(0, t.left + p - (b ? 0 : 10)) : t.right > v + g - 3 && (l.scrollLeft = t.right + (b ? 0 : 10) - v), l;
      }
      function _i(e, t) {
        t != null && (ei(e), e.curOp.scrollTop = (e.curOp.scrollTop == null ? e.doc.scrollTop : e.curOp.scrollTop) + t);
      }
      function qr(e) {
        ei(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin };
      }
      function gn(e, t, n) {
        (t != null || n != null) && ei(e), t != null && (e.curOp.scrollLeft = t), n != null && (e.curOp.scrollTop = n);
      }
      function hs(e, t) {
        ei(e), e.curOp.scrollToPos = t;
      }
      function ei(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
          e.curOp.scrollToPos = null;
          var n = Jo(e, t.from), r = Jo(e, t.to);
          il(e, n, r, t.margin);
        }
      }
      function il(e, t, n, r) {
        var i = Ki(e, {
          left: Math.min(t.left, n.left),
          top: Math.min(t.top, n.top) - r,
          right: Math.max(t.right, n.right),
          bottom: Math.max(t.bottom, n.bottom) + r
        });
        gn(e, i.scrollLeft, i.scrollTop);
      }
      function yn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (fe || Gi(e, { top: t }), ol(e, t, !0), fe && Gi(e), wn(e, 100));
      }
      function ol(e, t, n) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), !(e.display.scroller.scrollTop == t && !n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }
      function Sr(e, t, n, r) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), !((n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r) && (e.doc.scrollLeft = t, fl(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }
      function mn(e) {
        var t = e.display, n = t.gutters.offsetWidth, r = Math.round(e.doc.height + Mi(e.display));
        return {
          clientHeight: t.scroller.clientHeight,
          viewHeight: t.wrapper.clientHeight,
          scrollWidth: t.scroller.scrollWidth,
          clientWidth: t.scroller.clientWidth,
          viewWidth: t.wrapper.clientWidth,
          barLeft: e.options.fixedGutter ? n : 0,
          docHeight: r,
          scrollHeight: r + Kt(e) + t.barHeight,
          nativeBarWidth: t.nativeBarWidth,
          gutterWidth: n
        };
      }
      var Cr = function(e, t, n) {
        this.cm = n;
        var r = this.vert = c("div", [c("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), i = this.horiz = c("div", [c("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        r.tabIndex = i.tabIndex = -1, e(r), e(i), U(r, "scroll", function() {
          r.clientHeight && t(r.scrollTop, "vertical");
        }), U(i, "scroll", function() {
          i.clientWidth && t(i.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = !1, E && N < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };
      Cr.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1, n = e.scrollHeight > e.clientHeight + 1, r = e.nativeBarWidth;
        if (n) {
          this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
          var i = e.viewHeight - (t ? r : 0);
          this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else
          this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
          this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
          var o = e.viewWidth - e.barLeft - (n ? r : 0);
          this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
        } else
          this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (r == 0 && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: n ? r : 0, bottom: t ? r : 0 };
      }, Cr.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, Cr.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, Cr.prototype.zeroWidthHack = function() {
        var e = me && !We ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new ee(), this.disableVert = new ee();
      }, Cr.prototype.enableZeroWidthBar = function(e, t, n) {
        e.style.visibility = "";
        function r() {
          var i = e.getBoundingClientRect(), o = n == "vert" ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1);
          o != e ? e.style.visibility = "hidden" : t.set(1e3, r);
        }
        t.set(1e3, r);
      }, Cr.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
      };
      var bn = function() {
      };
      bn.prototype.update = function() {
        return { bottom: 0, right: 0 };
      }, bn.prototype.setScrollLeft = function() {
      }, bn.prototype.setScrollTop = function() {
      }, bn.prototype.clear = function() {
      };
      function Xr(e, t) {
        t || (t = mn(e));
        var n = e.display.barWidth, r = e.display.barHeight;
        ll(e, t);
        for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++)
          n != e.display.barWidth && e.options.lineWrapping && Vn(e), ll(e, mn(e)), n = e.display.barWidth, r = e.display.barHeight;
      }
      function ll(e, t) {
        var n = e.display, r = n.scrollbars.update(t);
        n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = "";
      }
      var al = { native: Cr, null: bn };
      function sl(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && Le(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new al[e.options.scrollbarStyle](function(t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), U(t, "mousedown", function() {
            e.state.focused && setTimeout(function() {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function(t, n) {
          n == "horizontal" ? Sr(e, t) : yn(e, t);
        }, e), e.display.scrollbars.addClass && Pe(e.display.wrapper, e.display.scrollbars.addClass);
      }
      var ds = 0;
      function Lr(e) {
        e.curOp = {
          cm: e,
          viewChanged: !1,
          // Flag that indicates that lines might need to be redrawn
          startHeight: e.doc.height,
          // Used to detect need to update scrollbar
          forceUpdate: !1,
          // Used to force a redraw
          updateInput: 0,
          // Whether to reset the input textarea
          typing: !1,
          // Whether this reset should be careful to leave existing text (for compositing)
          changeObjs: null,
          // Accumulated changes, for firing change events
          cursorActivityHandlers: null,
          // Set of handlers to fire cursorActivity on
          cursorActivityCalled: 0,
          // Tracks which cursorActivity handlers have been called already
          selectionChanged: !1,
          // Whether the selection needs to be redrawn
          updateMaxLine: !1,
          // Set when the widest line needs to be determined anew
          scrollLeft: null,
          scrollTop: null,
          // Intermediate scroll position, not pushed to DOM yet
          scrollToPos: null,
          // Used to scroll to a specific position
          focus: !1,
          id: ++ds,
          // Unique ID
          markArrays: null
          // Used by addMarkedSpan
        }, Ga(e.curOp);
      }
      function Tr(e) {
        var t = e.curOp;
        t && Xa(t, function(n) {
          for (var r = 0; r < n.ops.length; r++)
            n.ops[r].cm.curOp = null;
          ps(n);
        });
      }
      function ps(e) {
        for (var t = e.ops, n = 0; n < t.length; n++)
          vs(t[n]);
        for (var r = 0; r < t.length; r++)
          gs(t[r]);
        for (var i = 0; i < t.length; i++)
          ys(t[i]);
        for (var o = 0; o < t.length; o++)
          ms(t[o]);
        for (var l = 0; l < t.length; l++)
          bs(t[l]);
      }
      function vs(e) {
        var t = e.cm, n = t.display;
        xs(t), e.updateMaxLine && Li(t), e.mustUpdate = e.viewChanged || e.forceUpdate || e.scrollTop != null || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new ti(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }
      function gs(e) {
        e.updatedDisplay = e.mustUpdate && Ui(e.cm, e.update);
      }
      function ys(e) {
        var t = e.cm, n = t.display;
        e.updatedDisplay && Vn(t), e.barMeasure = mn(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = _o(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Kt(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - br(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection());
      }
      function ms(e) {
        var t = e.cm;
        e.adjustWidthTo != null && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Sr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var n = e.focus && e.focus == pe(gt(t));
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && Xr(t, e.barMeasure), e.updatedDisplay && Xi(t, e.barMeasure), e.selectionChanged && Ii(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && rl(e.cm);
      }
      function bs(e) {
        var t = e.cm, n = t.display, r = t.doc;
        if (e.updatedDisplay && ul(t, e.update), n.wheelStartX != null && (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) && (n.wheelStartX = n.wheelStartY = null), e.scrollTop != null && ol(t, e.scrollTop, e.forceScroll), e.scrollLeft != null && Sr(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          var i = fs(
            t,
            V(r, e.scrollToPos.from),
            V(r, e.scrollToPos.to),
            e.scrollToPos.margin
          );
          us(t, i);
        }
        var o = e.maybeHiddenMarkers, l = e.maybeUnhiddenMarkers;
        if (o)
          for (var a = 0; a < o.length; ++a)
            o[a].lines.length || Me(o[a], "hide");
        if (l)
          for (var s = 0; s < l.length; ++s)
            l[s].lines.length && Me(l[s], "unhide");
        n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Me(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }
      function mt(e, t) {
        if (e.curOp)
          return t();
        Lr(e);
        try {
          return t();
        } finally {
          Tr(e);
        }
      }
      function Xe(e, t) {
        return function() {
          if (e.curOp)
            return t.apply(e, arguments);
          Lr(e);
          try {
            return t.apply(e, arguments);
          } finally {
            Tr(e);
          }
        };
      }
      function it(e) {
        return function() {
          if (this.curOp)
            return e.apply(this, arguments);
          Lr(this);
          try {
            return e.apply(this, arguments);
          } finally {
            Tr(this);
          }
        };
      }
      function Ye(e) {
        return function() {
          var t = this.cm;
          if (!t || t.curOp)
            return e.apply(this, arguments);
          Lr(t);
          try {
            return e.apply(this, arguments);
          } finally {
            Tr(t);
          }
        };
      }
      function wn(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, j(ws, e));
      }
      function ws(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
          var n = +/* @__PURE__ */ new Date() + e.options.workTime, r = un(e, t.highlightFrontier), i = [];
          t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
            if (r.line >= e.display.viewFrom) {
              var l = o.styles, a = o.text.length > e.options.maxHighlightLength ? Bt(t.mode, r.state) : null, s = go(e, o, r, !0);
              a && (r.state = a), o.styles = s.styles;
              var u = o.styleClasses, h = s.classes;
              h ? o.styleClasses = h : u && (o.styleClasses = null);
              for (var p = !l || l.length != o.styles.length || u != h && (!u || !h || u.bgClass != h.bgClass || u.textClass != h.textClass), g = 0; !p && g < l.length; ++g)
                p = l[g] != o.styles[g];
              p && i.push(r.line), o.stateAfter = r.save(), r.nextLine();
            } else
              o.text.length <= e.options.maxHighlightLength && bi(e, o.text, r), o.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
            if (+/* @__PURE__ */ new Date() > n)
              return wn(e, e.options.workDelay), !0;
          }), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), i.length && mt(e, function() {
            for (var o = 0; o < i.length; o++)
              ur(e, i[o], "text");
          });
        }
      }
      var ti = function(e, t, n) {
        var r = e.display;
        this.viewport = t, this.visible = $n(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = br(e), this.force = n, this.dims = zi(e), this.events = [];
      };
      ti.prototype.signal = function(e, t) {
        yt(e, t) && this.events.push(arguments);
      }, ti.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++)
          Me.apply(null, this.events[e]);
      };
      function xs(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Kt(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Kt(e) + "px", t.scrollbarsClipped = !0);
      }
      function ks(e) {
        if (e.hasFocus())
          return null;
        var t = pe(gt(e));
        if (!t || !q(e.display.lineDiv, t))
          return null;
        var n = { activeElt: t };
        if (window.getSelection) {
          var r = Q(e).getSelection();
          r.anchorNode && r.extend && q(e.display.lineDiv, r.anchorNode) && (n.anchorNode = r.anchorNode, n.anchorOffset = r.anchorOffset, n.focusNode = r.focusNode, n.focusOffset = r.focusOffset);
        }
        return n;
      }
      function Ss(e) {
        if (!(!e || !e.activeElt || e.activeElt == pe(Se(e.activeElt))) && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && q(document.body, e.anchorNode) && q(document.body, e.focusNode))) {
          var t = e.activeElt.ownerDocument, n = t.defaultView.getSelection(), r = t.createRange();
          r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), n.removeAllRanges(), n.addRange(r), n.extend(e.focusNode, e.focusOffset);
        }
      }
      function Ui(e, t) {
        var n = e.display, r = e.doc;
        if (t.editorIsHidden)
          return fr(e), !1;
        if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && el(e) == 0)
          return !1;
        cl(e) && (fr(e), t.dims = zi(e));
        var i = r.first + r.size, o = Math.max(t.visible.from - e.options.viewportMargin, r.first), l = Math.min(i, t.visible.to + e.options.viewportMargin);
        n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(i, n.viewTo)), Zt && (o = Si(e.doc, o), l = Oo(e.doc, l));
        var a = o != n.viewFrom || l != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
        as(e, o, l), n.viewOffset = Jt(B(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
        var s = el(e);
        if (!a && s == 0 && !t.force && n.renderedView == n.view && (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo))
          return !1;
        var u = ks(e);
        return s > 4 && (n.lineDiv.style.display = "none"), Cs(e, n.updateLineNumbers, t.dims), s > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, Ss(u), k(n.cursorDiv), k(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, a && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, wn(e, 400)), n.updateLineNumbers = null, !0;
      }
      function ul(e, t) {
        for (var n = t.viewport, r = !0; ; r = !1) {
          if (!r || !e.options.lineWrapping || t.oldDisplayWidth == br(e)) {
            if (n && n.top != null && (n = { top: Math.min(e.doc.height + Mi(e.display) - Ni(e), n.top) }), t.visible = $n(e.display, e.doc, n), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
              break;
          } else r && (t.visible = $n(e.display, e.doc, n));
          if (!Ui(e, t))
            break;
          Vn(e);
          var i = mn(e);
          vn(e), Xr(e, i), Xi(e, i), t.force = !1;
        }
        t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }
      function Gi(e, t) {
        var n = new ti(e, t);
        if (Ui(e, n)) {
          Vn(e), ul(e, n);
          var r = mn(e);
          vn(e), Xr(e, r), Xi(e, r), n.finish();
        }
      }
      function Cs(e, t, n) {
        var r = e.display, i = e.options.lineNumbers, o = r.lineDiv, l = o.firstChild;
        function a(b) {
          var S = b.nextSibling;
          return I && me && e.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b), S;
        }
        for (var s = r.view, u = r.viewFrom, h = 0; h < s.length; h++) {
          var p = s[h];
          if (!p.hidden) if (!p.node || p.node.parentNode != o) {
            var g = Qa(e, p, u, n);
            o.insertBefore(g, l);
          } else {
            for (; l != p.node; )
              l = a(l);
            var v = i && t != null && t <= u && p.lineNumber;
            p.changes && (R(p.changes, "gutter") > -1 && (v = !1), Eo(e, p, u, n)), v && (k(p.lineNumber), p.lineNumber.appendChild(document.createTextNode(C(e.options, u)))), l = p.node.nextSibling;
          }
          u += p.size;
        }
        for (; l; )
          l = a(l);
      }
      function qi(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px", qe(e, "gutterChanged", e);
      }
      function Xi(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Kt(e) + "px";
      }
      function fl(e) {
        var t = e.display, n = t.view;
        if (!(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))) {
          for (var r = Ei(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", l = 0; l < n.length; l++)
            if (!n[l].hidden) {
              e.options.fixedGutter && (n[l].gutter && (n[l].gutter.style.left = o), n[l].gutterBackground && (n[l].gutterBackground.style.left = o));
              var a = n[l].alignable;
              if (a)
                for (var s = 0; s < a.length; s++)
                  a[s].style.left = o;
            }
          e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
        }
      }
      function cl(e) {
        if (!e.options.lineNumbers)
          return !1;
        var t = e.doc, n = C(e.options, t.first + t.size - 1), r = e.display;
        if (n.length != r.lineNumChars) {
          var i = r.measure.appendChild(c(
            "div",
            [c("div", n)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          )), o = i.firstChild.offsetWidth, l = i.offsetWidth - o;
          return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - l) + 1, r.lineNumWidth = r.lineNumInnerWidth + l, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", qi(e.display), !0;
        }
        return !1;
      }
      function Yi(e, t) {
        for (var n = [], r = !1, i = 0; i < e.length; i++) {
          var o = e[i], l = null;
          if (typeof o != "string" && (l = o.style, o = o.className), o == "CodeMirror-linenumbers")
            if (t)
              r = !0;
            else
              continue;
          n.push({ className: o, style: l });
        }
        return t && !r && n.push({ className: "CodeMirror-linenumbers", style: null }), n;
      }
      function hl(e) {
        var t = e.gutters, n = e.gutterSpecs;
        k(t), e.lineGutter = null;
        for (var r = 0; r < n.length; ++r) {
          var i = n[r], o = i.className, l = i.style, a = t.appendChild(c("div", null, "CodeMirror-gutter " + o));
          l && (a.style.cssText = l), o == "CodeMirror-linenumbers" && (e.lineGutter = a, a.style.width = (e.lineNumWidth || 1) + "px");
        }
        t.style.display = n.length ? "" : "none", qi(e);
      }
      function xn(e) {
        hl(e.display), ct(e), fl(e);
      }
      function Ls(e, t, n, r) {
        var i = this;
        this.input = n, i.scrollbarFiller = c("div", null, "CodeMirror-scrollbar-filler"), i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = c("div", null, "CodeMirror-gutter-filler"), i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = W("div", null, "CodeMirror-code"), i.selectionDiv = c("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = c("div", null, "CodeMirror-cursors"), i.measure = c("div", null, "CodeMirror-measure"), i.lineMeasure = c("div", null, "CodeMirror-measure"), i.lineSpace = W(
          "div",
          [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var o = W("div", [i.lineSpace], "CodeMirror-lines");
        i.mover = c("div", [o], null, "position: relative"), i.sizer = c("div", [i.mover], "CodeMirror-sizer"), i.sizerWidth = null, i.heightForcer = c("div", null, null, "position: absolute; height: " + Je + "px; width: 1px;"), i.gutters = c("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = c("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"), i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = c("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"), _ && ie >= 105 && (i.wrapper.style.clipPath = "inset(0px)"), i.wrapper.setAttribute("translate", "no"), E && N < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0), !I && !(fe && ae) && (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)), i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first, i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0, i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0, i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null, i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null, i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null, i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, i.gutterSpecs = Yi(r.gutters, r.lineNumbers), hl(i), n.init(i);
      }
      var ri = 0, Vt = null;
      E ? Vt = -0.53 : fe ? Vt = 15 : _ ? Vt = -0.7 : De && (Vt = -1 / 3);
      function dl(e) {
        var t = e.wheelDeltaX, n = e.wheelDeltaY;
        return t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), n == null && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : n == null && (n = e.wheelDelta), { x: t, y: n };
      }
      function Ts(e) {
        var t = dl(e);
        return t.x *= Vt, t.y *= Vt, t;
      }
      function pl(e, t) {
        _ && ie == 102 && (e.display.chromeScrollHack == null ? e.display.sizer.style.pointerEvents = "none" : clearTimeout(e.display.chromeScrollHack), e.display.chromeScrollHack = setTimeout(function() {
          e.display.chromeScrollHack = null, e.display.sizer.style.pointerEvents = "";
        }, 100));
        var n = dl(t), r = n.x, i = n.y, o = Vt;
        t.deltaMode === 0 && (r = t.deltaX, i = t.deltaY, o = 1);
        var l = e.display, a = l.scroller, s = a.scrollWidth > a.clientWidth, u = a.scrollHeight > a.clientHeight;
        if (r && s || i && u) {
          if (i && me && I) {
            e: for (var h = t.target, p = l.view; h != a; h = h.parentNode)
              for (var g = 0; g < p.length; g++)
                if (p[g].node == h) {
                  e.display.currentWheelTarget = h;
                  break e;
                }
          }
          if (r && !fe && !le && o != null) {
            i && u && yn(e, Math.max(0, a.scrollTop + i * o)), Sr(e, Math.max(0, a.scrollLeft + r * o)), (!i || i && u) && et(t), l.wheelStartX = null;
            return;
          }
          if (i && o != null) {
            var v = i * o, b = e.doc.scrollTop, S = b + l.wrapper.clientHeight;
            v < 0 ? b = Math.max(0, b + v - 50) : S = Math.min(e.doc.height, S + v + 50), Gi(e, { top: b, bottom: S });
          }
          ri < 20 && t.deltaMode !== 0 && (l.wheelStartX == null ? (l.wheelStartX = a.scrollLeft, l.wheelStartY = a.scrollTop, l.wheelDX = r, l.wheelDY = i, setTimeout(function() {
            if (l.wheelStartX != null) {
              var L = a.scrollLeft - l.wheelStartX, A = a.scrollTop - l.wheelStartY, P = A && l.wheelDY && A / l.wheelDY || L && l.wheelDX && L / l.wheelDX;
              l.wheelStartX = l.wheelStartY = null, P && (Vt = (Vt * ri + P) / (ri + 1), ++ri);
            }
          }, 200)) : (l.wheelDX += r, l.wheelDY += i));
        }
      }
      var Ct = function(e, t) {
        this.ranges = e, this.primIndex = t;
      };
      Ct.prototype.primary = function() {
        return this.ranges[this.primIndex];
      }, Ct.prototype.equals = function(e) {
        if (e == this)
          return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
          return !1;
        for (var t = 0; t < this.ranges.length; t++) {
          var n = this.ranges[t], r = e.ranges[t];
          if (!ge(n.anchor, r.anchor) || !ge(n.head, r.head))
            return !1;
        }
        return !0;
      }, Ct.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new ye(Ge(this.ranges[t].anchor), Ge(this.ranges[t].head));
        return new Ct(e, this.primIndex);
      }, Ct.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
          if (!this.ranges[e].empty())
            return !0;
        return !1;
      }, Ct.prototype.contains = function(e, t) {
        t || (t = e);
        for (var n = 0; n < this.ranges.length; n++) {
          var r = this.ranges[n];
          if (D(t, r.from()) >= 0 && D(e, r.to()) <= 0)
            return n;
        }
        return -1;
      };
      var ye = function(e, t) {
        this.anchor = e, this.head = t;
      };
      ye.prototype.from = function() {
        return Ir(this.anchor, this.head);
      }, ye.prototype.to = function() {
        return ft(this.anchor, this.head);
      }, ye.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function Ht(e, t, n) {
        var r = e && e.options.selectionsMayTouch, i = t[n];
        t.sort(function(g, v) {
          return D(g.from(), v.from());
        }), n = R(t, i);
        for (var o = 1; o < t.length; o++) {
          var l = t[o], a = t[o - 1], s = D(a.to(), l.from());
          if (r && !l.empty() ? s > 0 : s >= 0) {
            var u = Ir(a.from(), l.from()), h = ft(a.to(), l.to()), p = a.empty() ? l.from() == l.head : a.from() == a.head;
            o <= n && --n, t.splice(--o, 2, new ye(p ? h : u, p ? u : h));
          }
        }
        return new Ct(t, n);
      }
      function cr(e, t) {
        return new Ct([new ye(e, t || e)], 0);
      }
      function hr(e) {
        return e.text ? m(
          e.from.line + e.text.length - 1,
          ue(e.text).length + (e.text.length == 1 ? e.from.ch : 0)
        ) : e.to;
      }
      function vl(e, t) {
        if (D(e, t.from) < 0)
          return e;
        if (D(e, t.to) <= 0)
          return hr(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1, r = e.ch;
        return e.line == t.to.line && (r += hr(t).ch - t.to.ch), m(n, r);
      }
      function ji(e, t) {
        for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
          var i = e.sel.ranges[r];
          n.push(new ye(
            vl(i.anchor, t),
            vl(i.head, t)
          ));
        }
        return Ht(e.cm, n, e.sel.primIndex);
      }
      function gl(e, t, n) {
        return e.line == t.line ? m(n.line, e.ch - t.ch + n.ch) : m(n.line + (e.line - t.line), e.ch);
      }
      function Ms(e, t, n) {
        for (var r = [], i = m(e.first, 0), o = i, l = 0; l < t.length; l++) {
          var a = t[l], s = gl(a.from, i, o), u = gl(hr(a), i, o);
          if (i = a.to, o = u, n == "around") {
            var h = e.sel.ranges[l], p = D(h.head, h.anchor) < 0;
            r[l] = new ye(p ? u : s, p ? s : u);
          } else
            r[l] = new ye(s, s);
        }
        return new Ct(r, e.sel.primIndex);
      }
      function Zi(e) {
        e.doc.mode = Er(e.options, e.doc.modeOption), kn(e);
      }
      function kn(e) {
        e.doc.iter(function(t) {
          t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, wn(e, 100), e.state.modeGen++, e.curOp && ct(e);
      }
      function yl(e, t) {
        return t.from.ch == 0 && t.to.ch == 0 && ue(t.text) == "" && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }
      function Ji(e, t, n, r) {
        function i(P) {
          return n ? n[P] : null;
        }
        function o(P, O, H) {
          Ea(P, O, H, r), qe(P, "change", P, t);
        }
        function l(P, O) {
          for (var H = [], G = P; G < O; ++G)
            H.push(new Br(u[G], i(G), r));
          return H;
        }
        var a = t.from, s = t.to, u = t.text, h = B(e, a.line), p = B(e, s.line), g = ue(u), v = i(u.length - 1), b = s.line - a.line;
        if (t.full)
          e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
        else if (yl(e, t)) {
          var S = l(0, u.length - 1);
          o(p, p.text, v), b && e.remove(a.line, b), S.length && e.insert(a.line, S);
        } else if (h == p)
          if (u.length == 1)
            o(h, h.text.slice(0, a.ch) + g + h.text.slice(s.ch), v);
          else {
            var L = l(1, u.length - 1);
            L.push(new Br(g + h.text.slice(s.ch), v, r)), o(h, h.text.slice(0, a.ch) + u[0], i(0)), e.insert(a.line + 1, L);
          }
        else if (u.length == 1)
          o(h, h.text.slice(0, a.ch) + u[0] + p.text.slice(s.ch), i(0)), e.remove(a.line + 1, b);
        else {
          o(h, h.text.slice(0, a.ch) + u[0], i(0)), o(p, g + p.text.slice(s.ch), v);
          var A = l(1, u.length - 1);
          b > 1 && e.remove(a.line + 1, b - 1), e.insert(a.line + 1, A);
        }
        qe(e, "change", e, t);
      }
      function dr(e, t, n) {
        function r(i, o, l) {
          if (i.linked)
            for (var a = 0; a < i.linked.length; ++a) {
              var s = i.linked[a];
              if (s.doc != o) {
                var u = l && s.sharedHist;
                n && !u || (t(s.doc, u), r(s.doc, i, u));
              }
            }
        }
        r(e, null, !0);
      }
      function ml(e, t) {
        if (t.cm)
          throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, Hi(e), Zi(e), bl(e), e.options.direction = t.direction, e.options.lineWrapping || Li(e), e.options.mode = t.modeOption, ct(e);
      }
      function bl(e) {
        (e.doc.direction == "rtl" ? Pe : Le)(e.display.lineDiv, "CodeMirror-rtl");
      }
      function Ns(e) {
        mt(e, function() {
          bl(e), ct(e);
        });
      }
      function ni(e) {
        this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1;
      }
      function Qi(e, t) {
        var n = { from: Ge(t.from), to: hr(t), text: jt(e, t.from, t.to) };
        return kl(e, n, t.from.line, t.to.line + 1), dr(e, function(r) {
          return kl(r, n, t.from.line, t.to.line + 1);
        }, !0), n;
      }
      function wl(e) {
        for (; e.length; ) {
          var t = ue(e);
          if (t.ranges)
            e.pop();
          else
            break;
        }
      }
      function As(e, t) {
        if (t)
          return wl(e.done), ue(e.done);
        if (e.done.length && !ue(e.done).ranges)
          return ue(e.done);
        if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
          return e.done.pop(), ue(e.done);
      }
      function xl(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var o = +/* @__PURE__ */ new Date(), l, a;
        if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && i.lastModTime > o - (e.cm ? e.cm.options.historyEventDelay : 500) || t.origin.charAt(0) == "*")) && (l = As(i, i.lastOp == r)))
          a = ue(l.changes), D(t.from, t.to) == 0 && D(t.from, a.to) == 0 ? a.to = hr(t) : l.changes.push(Qi(e, t));
        else {
          var s = ue(i.done);
          for ((!s || !s.ranges) && ii(e.sel, i.done), l = {
            changes: [Qi(e, t)],
            generation: i.generation
          }, i.done.push(l); i.done.length > i.undoDepth; )
            i.done.shift(), i.done[0].ranges || i.done.shift();
        }
        i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = o, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, a || Me(e, "historyAdded");
      }
      function Os(e, t, n, r) {
        var i = t.charAt(0);
        return i == "*" || i == "+" && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && /* @__PURE__ */ new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }
      function Ds(e, t, n, r) {
        var i = e.history, o = r && r.origin;
        n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || Os(e, o, ue(i.done), t)) ? i.done[i.done.length - 1] = t : ii(t, i.done), i.lastSelTime = +/* @__PURE__ */ new Date(), i.lastSelOrigin = o, i.lastSelOp = n, r && r.clearRedo !== !1 && wl(i.undone);
      }
      function ii(e, t) {
        var n = ue(t);
        n && n.ranges && n.equals(e) || t.push(e);
      }
      function kl(e, t, n, r) {
        var i = t["spans_" + e.id], o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(l) {
          l.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = l.markedSpans), ++o;
        });
      }
      function Ws(e) {
        if (!e)
          return null;
        for (var t, n = 0; n < e.length; ++n)
          e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t : null : e;
      }
      function Ps(e, t) {
        var n = t["spans_" + e.id];
        if (!n)
          return null;
        for (var r = [], i = 0; i < t.text.length; ++i)
          r.push(Ws(n[i]));
        return r;
      }
      function Sl(e, t) {
        var n = Ps(e, t), r = xi(e, t);
        if (!n)
          return r;
        if (!r)
          return n;
        for (var i = 0; i < n.length; ++i) {
          var o = n[i], l = r[i];
          if (o && l)
            e: for (var a = 0; a < l.length; ++a) {
              for (var s = l[a], u = 0; u < o.length; ++u)
                if (o[u].marker == s.marker)
                  continue e;
              o.push(s);
            }
          else l && (n[i] = l);
        }
        return n;
      }
      function Yr(e, t, n) {
        for (var r = [], i = 0; i < e.length; ++i) {
          var o = e[i];
          if (o.ranges) {
            r.push(n ? Ct.prototype.deepCopy.call(o) : o);
            continue;
          }
          var l = o.changes, a = [];
          r.push({ changes: a });
          for (var s = 0; s < l.length; ++s) {
            var u = l[s], h = void 0;
            if (a.push({ from: u.from, to: u.to, text: u.text }), t)
              for (var p in u)
                (h = p.match(/^spans_(\d+)$/)) && R(t, Number(h[1])) > -1 && (ue(a)[p] = u[p], delete u[p]);
          }
        }
        return r;
      }
      function Vi(e, t, n, r) {
        if (r) {
          var i = e.anchor;
          if (n) {
            var o = D(t, i) < 0;
            o != D(n, i) < 0 ? (i = t, t = n) : o != D(t, n) < 0 && (t = n);
          }
          return new ye(i, t);
        } else
          return new ye(n || t, t);
      }
      function oi(e, t, n, r, i) {
        i == null && (i = e.cm && (e.cm.display.shift || e.extend)), tt(e, new Ct([Vi(e.sel.primary(), t, n, i)], 0), r);
      }
      function Cl(e, t, n) {
        for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++)
          r[o] = Vi(e.sel.ranges[o], t[o], null, i);
        var l = Ht(e.cm, r, e.sel.primIndex);
        tt(e, l, n);
      }
      function $i(e, t, n, r) {
        var i = e.sel.ranges.slice(0);
        i[t] = n, tt(e, Ht(e.cm, i, e.sel.primIndex), r);
      }
      function Ll(e, t, n, r) {
        tt(e, cr(t, n), r);
      }
      function zs(e, t, n) {
        var r = {
          ranges: t.ranges,
          update: function(i) {
            this.ranges = [];
            for (var o = 0; o < i.length; o++)
              this.ranges[o] = new ye(
                V(e, i[o].anchor),
                V(e, i[o].head)
              );
          },
          origin: n && n.origin
        };
        return Me(e, "beforeSelectionChange", e, r), e.cm && Me(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? Ht(e.cm, r.ranges, r.ranges.length - 1) : t;
      }
      function Tl(e, t, n) {
        var r = e.history.done, i = ue(r);
        i && i.ranges ? (r[r.length - 1] = t, li(e, t, n)) : tt(e, t, n);
      }
      function tt(e, t, n) {
        li(e, t, n), Ds(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
      }
      function li(e, t, n) {
        (yt(e, "beforeSelectionChange") || e.cm && yt(e.cm, "beforeSelectionChange")) && (t = zs(e, t, n));
        var r = n && n.bias || (D(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        Ml(e, Al(e, t, r, !0)), !(n && n.scroll === !1) && e.cm && e.cm.getOption("readOnly") != "nocursor" && qr(e.cm);
      }
      function Ml(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, Lt(e.cm)), qe(e, "cursorActivity", e));
      }
      function Nl(e) {
        Ml(e, Al(e, e.sel, null, !1));
      }
      function Al(e, t, n, r) {
        for (var i, o = 0; o < t.ranges.length; o++) {
          var l = t.ranges[o], a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], s = ai(e, l.anchor, a && a.anchor, n, r), u = l.head == l.anchor ? s : ai(e, l.head, a && a.head, n, r);
          (i || s != l.anchor || u != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new ye(s, u));
        }
        return i ? Ht(e.cm, i, t.primIndex) : t;
      }
      function jr(e, t, n, r, i) {
        var o = B(e, t.line);
        if (o.markedSpans)
          for (var l = 0; l < o.markedSpans.length; ++l) {
            var a = o.markedSpans[l], s = a.marker, u = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft, h = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
            if ((a.from == null || (u ? a.from <= t.ch : a.from < t.ch)) && (a.to == null || (h ? a.to >= t.ch : a.to > t.ch))) {
              if (i && (Me(s, "beforeCursorEnter"), s.explicitlyCleared))
                if (o.markedSpans) {
                  --l;
                  continue;
                } else
                  break;
              if (!s.atomic)
                continue;
              if (n) {
                var p = s.find(r < 0 ? 1 : -1), g = void 0;
                if ((r < 0 ? h : u) && (p = Ol(e, p, -r, p && p.line == t.line ? o : null)), p && p.line == t.line && (g = D(p, n)) && (r < 0 ? g < 0 : g > 0))
                  return jr(e, p, t, r, i);
              }
              var v = s.find(r < 0 ? -1 : 1);
              return (r < 0 ? u : h) && (v = Ol(e, v, r, v.line == t.line ? o : null)), v ? jr(e, v, t, r, i) : null;
            }
          }
        return t;
      }
      function ai(e, t, n, r, i) {
        var o = r || 1, l = jr(e, t, n, o, i) || !i && jr(e, t, n, o, !0) || jr(e, t, n, -o, i) || !i && jr(e, t, n, -o, !0);
        return l || (e.cantEdit = !0, m(e.first, 0));
      }
      function Ol(e, t, n, r) {
        return n < 0 && t.ch == 0 ? t.line > e.first ? V(e, m(t.line - 1)) : null : n > 0 && t.ch == (r || B(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? m(t.line + 1, 0) : null : new m(t.line, t.ch + n);
      }
      function Dl(e) {
        e.setSelection(m(e.firstLine(), 0), m(e.lastLine()), at);
      }
      function Wl(e, t, n) {
        var r = {
          canceled: !1,
          from: t.from,
          to: t.to,
          text: t.text,
          origin: t.origin,
          cancel: function() {
            return r.canceled = !0;
          }
        };
        return n && (r.update = function(i, o, l, a) {
          i && (r.from = V(e, i)), o && (r.to = V(e, o)), l && (r.text = l), a !== void 0 && (r.origin = a);
        }), Me(e, "beforeChange", e, r), e.cm && Me(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : { from: r.from, to: r.to, text: r.text, origin: r.origin };
      }
      function Zr(e, t, n) {
        if (e.cm) {
          if (!e.cm.curOp)
            return Xe(e.cm, Zr)(e, t, n);
          if (e.cm.state.suppressEdits)
            return;
        }
        if (!((yt(e, "beforeChange") || e.cm && yt(e.cm, "beforeChange")) && (t = Wl(e, t, !0), !t))) {
          var r = So && !n && Da(e, t.from, t.to);
          if (r)
            for (var i = r.length - 1; i >= 0; --i)
              Pl(e, { from: r[i].from, to: r[i].to, text: i ? [""] : t.text, origin: t.origin });
          else
            Pl(e, t);
        }
      }
      function Pl(e, t) {
        if (!(t.text.length == 1 && t.text[0] == "" && D(t.from, t.to) == 0)) {
          var n = ji(e, t);
          xl(e, t, n, e.cm ? e.cm.curOp.id : NaN), Sn(e, t, n, xi(e, t));
          var r = [];
          dr(e, function(i, o) {
            !o && R(r, i.history) == -1 && (Fl(i.history, t), r.push(i.history)), Sn(i, t, null, xi(i, t));
          });
        }
      }
      function si(e, t, n) {
        var r = e.cm && e.cm.state.suppressEdits;
        if (!(r && !n)) {
          for (var i = e.history, o, l = e.sel, a = t == "undo" ? i.done : i.undone, s = t == "undo" ? i.undone : i.done, u = 0; u < a.length && (o = a[u], !(n ? o.ranges && !o.equals(e.sel) : !o.ranges)); u++)
            ;
          if (u != a.length) {
            for (i.lastOrigin = i.lastSelOrigin = null; ; )
              if (o = a.pop(), o.ranges) {
                if (ii(o, s), n && !o.equals(e.sel)) {
                  tt(e, o, { clearRedo: !1 });
                  return;
                }
                l = o;
              } else if (r) {
                a.push(o);
                return;
              } else
                break;
            var h = [];
            ii(l, s), s.push({ changes: h, generation: i.generation }), i.generation = o.generation || ++i.maxGeneration;
            for (var p = yt(e, "beforeChange") || e.cm && yt(e.cm, "beforeChange"), g = function(S) {
              var L = o.changes[S];
              if (L.origin = t, p && !Wl(e, L, !1))
                return a.length = 0, {};
              h.push(Qi(e, L));
              var A = S ? ji(e, L) : ue(a);
              Sn(e, L, A, Sl(e, L)), !S && e.cm && e.cm.scrollIntoView({ from: L.from, to: hr(L) });
              var P = [];
              dr(e, function(O, H) {
                !H && R(P, O.history) == -1 && (Fl(O.history, L), P.push(O.history)), Sn(O, L, null, Sl(O, L));
              });
            }, v = o.changes.length - 1; v >= 0; --v) {
              var b = g(v);
              if (b) return b.v;
            }
          }
        }
      }
      function zl(e, t) {
        if (t != 0 && (e.first += t, e.sel = new Ct(we(e.sel.ranges, function(i) {
          return new ye(
            m(i.anchor.line + t, i.anchor.ch),
            m(i.head.line + t, i.head.ch)
          );
        }), e.sel.primIndex), e.cm)) {
          ct(e.cm, e.first, e.first - t, t);
          for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++)
            ur(e.cm, r, "gutter");
        }
      }
      function Sn(e, t, n, r) {
        if (e.cm && !e.cm.curOp)
          return Xe(e.cm, Sn)(e, t, n, r);
        if (t.to.line < e.first) {
          zl(e, t.text.length - 1 - (t.to.line - t.from.line));
          return;
        }
        if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var i = t.text.length - 1 - (e.first - t.from.line);
            zl(e, i), t = {
              from: m(e.first, 0),
              to: m(t.to.line + i, t.to.ch),
              text: [ue(t.text)],
              origin: t.origin
            };
          }
          var o = e.lastLine();
          t.to.line > o && (t = {
            from: t.from,
            to: m(o, B(e, o).text.length),
            text: [t.text[0]],
            origin: t.origin
          }), t.removed = jt(e, t.from, t.to), n || (n = ji(e, t)), e.cm ? Es(e.cm, t, r) : Ji(e, t, r), li(e, n, at), e.cantEdit && ai(e, m(e.firstLine(), 0)) && (e.cantEdit = !1);
        }
      }
      function Es(e, t, n) {
        var r = e.doc, i = e.display, o = t.from, l = t.to, a = !1, s = o.line;
        e.options.lineWrapping || (s = f(zt(B(r, o.line))), r.iter(s, l.line + 1, function(v) {
          if (v == i.maxLine)
            return a = !0, !0;
        })), r.sel.contains(t.from, t.to) > -1 && Lt(e), Ji(r, t, n, $o(e)), e.options.lineWrapping || (r.iter(s, o.line + t.text.length, function(v) {
          var b = qn(v);
          b > i.maxLineLength && (i.maxLine = v, i.maxLineLength = b, i.maxLineChanged = !0, a = !1);
        }), a && (e.curOp.updateMaxLine = !0)), Ca(r, o.line), wn(e, 400);
        var u = t.text.length - (l.line - o.line) - 1;
        t.full ? ct(e) : o.line == l.line && t.text.length == 1 && !yl(e.doc, t) ? ur(e, o.line, "text") : ct(e, o.line, l.line + 1, u);
        var h = yt(e, "changes"), p = yt(e, "change");
        if (p || h) {
          var g = {
            from: o,
            to: l,
            text: t.text,
            removed: t.removed,
            origin: t.origin
          };
          p && qe(e, "change", e, g), h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(g);
        }
        e.display.selForContextMenu = null;
      }
      function Jr(e, t, n, r, i) {
        var o;
        r || (r = n), D(r, n) < 0 && (o = [r, n], n = o[0], r = o[1]), typeof t == "string" && (t = e.splitLines(t)), Zr(e, { from: n, to: r, text: t, origin: i });
      }
      function El(e, t, n, r) {
        n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
      }
      function Hl(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
          var o = e[i], l = !0;
          if (o.ranges) {
            o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
            for (var a = 0; a < o.ranges.length; a++)
              El(o.ranges[a].anchor, t, n, r), El(o.ranges[a].head, t, n, r);
            continue;
          }
          for (var s = 0; s < o.changes.length; ++s) {
            var u = o.changes[s];
            if (n < u.from.line)
              u.from = m(u.from.line + r, u.from.ch), u.to = m(u.to.line + r, u.to.ch);
            else if (t <= u.to.line) {
              l = !1;
              break;
            }
          }
          l || (e.splice(0, i + 1), i = 0);
        }
      }
      function Fl(e, t) {
        var n = t.from.line, r = t.to.line, i = t.text.length - (r - n) - 1;
        Hl(e.done, n, r, i), Hl(e.undone, n, r, i);
      }
      function Cn(e, t, n, r) {
        var i = t, o = t;
        return typeof t == "number" ? o = B(e, po(e, t)) : i = f(t), i == null ? null : (r(o, i) && e.cm && ur(e.cm, i, n), o);
      }
      function Ln(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, n = 0; n < e.length; ++n)
          e[n].parent = this, t += e[n].height;
        this.height = t;
      }
      Ln.prototype = {
        chunkSize: function() {
          return this.lines.length;
        },
        // Remove the n lines at offset 'at'.
        removeInner: function(e, t) {
          for (var n = e, r = e + t; n < r; ++n) {
            var i = this.lines[n];
            this.height -= i.height, Ha(i), qe(i, "delete");
          }
          this.lines.splice(e, t);
        },
        // Helper used to collapse a small branch into a single leaf.
        collapse: function(e) {
          e.push.apply(e, this.lines);
        },
        // Insert the given array of lines at offset 'at', count them as
        // having the given height.
        insertInner: function(e, t, n) {
          this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
          for (var r = 0; r < t.length; ++r)
            t[r].parent = this;
        },
        // Used to iterate over a part of the tree.
        iterN: function(e, t, n) {
          for (var r = e + t; e < r; ++e)
            if (n(this.lines[e]))
              return !0;
        }
      };
      function Tn(e) {
        this.children = e;
        for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
          var i = e[r];
          t += i.chunkSize(), n += i.height, i.parent = this;
        }
        this.size = t, this.height = n, this.parent = null;
      }
      Tn.prototype = {
        chunkSize: function() {
          return this.size;
        },
        removeInner: function(e, t) {
          this.size -= t;
          for (var n = 0; n < this.children.length; ++n) {
            var r = this.children[n], i = r.chunkSize();
            if (e < i) {
              var o = Math.min(t, i - e), l = r.height;
              if (r.removeInner(e, o), this.height -= l - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), (t -= o) == 0)
                break;
              e = 0;
            } else
              e -= i;
          }
          if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Ln))) {
            var a = [];
            this.collapse(a), this.children = [new Ln(a)], this.children[0].parent = this;
          }
        },
        collapse: function(e) {
          for (var t = 0; t < this.children.length; ++t)
            this.children[t].collapse(e);
        },
        insertInner: function(e, t, n) {
          this.size += t.length, this.height += n;
          for (var r = 0; r < this.children.length; ++r) {
            var i = this.children[r], o = i.chunkSize();
            if (e <= o) {
              if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                for (var l = i.lines.length % 25 + 25, a = l; a < i.lines.length; ) {
                  var s = new Ln(i.lines.slice(a, a += 25));
                  i.height -= s.height, this.children.splice(++r, 0, s), s.parent = this;
                }
                i.lines = i.lines.slice(0, l), this.maybeSpill();
              }
              break;
            }
            e -= o;
          }
        },
        // When a node has grown, check whether it should be split.
        maybeSpill: function() {
          if (!(this.children.length <= 10)) {
            var e = this;
            do {
              var t = e.children.splice(e.children.length - 5, 5), n = new Tn(t);
              if (e.parent) {
                e.size -= n.size, e.height -= n.height;
                var i = R(e.parent.children, e);
                e.parent.children.splice(i + 1, 0, n);
              } else {
                var r = new Tn(e.children);
                r.parent = e, e.children = [r, n], e = r;
              }
              n.parent = e.parent;
            } while (e.children.length > 10);
            e.parent.maybeSpill();
          }
        },
        iterN: function(e, t, n) {
          for (var r = 0; r < this.children.length; ++r) {
            var i = this.children[r], o = i.chunkSize();
            if (e < o) {
              var l = Math.min(t, o - e);
              if (i.iterN(e, l, n))
                return !0;
              if ((t -= l) == 0)
                break;
              e = 0;
            } else
              e -= o;
          }
        }
      };
      var Mn = function(e, t, n) {
        if (n)
          for (var r in n)
            n.hasOwnProperty(r) && (this[r] = n[r]);
        this.doc = e, this.node = t;
      };
      Mn.prototype.clear = function() {
        var e = this.doc.cm, t = this.line.widgets, n = this.line, r = f(n);
        if (!(r == null || !t)) {
          for (var i = 0; i < t.length; ++i)
            t[i] == this && t.splice(i--, 1);
          t.length || (n.widgets = null);
          var o = dn(this);
          St(n, Math.max(0, n.height - o)), e && (mt(e, function() {
            Il(e, n, -o), ur(e, r, "widget");
          }), qe(e, "lineWidgetCleared", e, this, r));
        }
      }, Mn.prototype.changed = function() {
        var e = this, t = this.height, n = this.doc.cm, r = this.line;
        this.height = null;
        var i = dn(this) - t;
        i && (sr(this.doc, r) || St(r, r.height + i), n && mt(n, function() {
          n.curOp.forceUpdate = !0, Il(n, r, i), qe(n, "lineWidgetChanged", n, e, f(r));
        }));
      }, At(Mn);
      function Il(e, t, n) {
        Jt(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && _i(e, n);
      }
      function Hs(e, t, n, r) {
        var i = new Mn(e, n, r), o = e.cm;
        return o && i.noHScroll && (o.display.alignWidgets = !0), Cn(e, t, "widget", function(l) {
          var a = l.widgets || (l.widgets = []);
          if (i.insertAt == null ? a.push(i) : a.splice(Math.min(a.length, Math.max(0, i.insertAt)), 0, i), i.line = l, o && !sr(e, l)) {
            var s = Jt(l) < e.scrollTop;
            St(l, l.height + dn(i)), s && _i(o, i.height), o.curOp.forceUpdate = !0;
          }
          return !0;
        }), o && qe(o, "lineWidgetAdded", o, i, typeof t == "number" ? t : f(t)), i;
      }
      var Bl = 0, pr = function(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++Bl;
      };
      pr.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          var e = this.doc.cm, t = e && !e.curOp;
          if (t && Lr(e), yt(this, "clear")) {
            var n = this.find();
            n && qe(this, "clear", n.from, n.to);
          }
          for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
            var l = this.lines[o], a = fn(l.markedSpans, this);
            e && !this.collapsed ? ur(e, f(l), "text") : e && (a.to != null && (i = f(l)), a.from != null && (r = f(l))), l.markedSpans = Ma(l.markedSpans, a), a.from == null && this.collapsed && !sr(this.doc, l) && e && St(l, _r(e.display));
          }
          if (e && this.collapsed && !e.options.lineWrapping)
            for (var s = 0; s < this.lines.length; ++s) {
              var u = zt(this.lines[s]), h = qn(u);
              h > e.display.maxLineLength && (e.display.maxLine = u, e.display.maxLineLength = h, e.display.maxLineChanged = !0);
            }
          r != null && e && this.collapsed && ct(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Nl(e.doc)), e && qe(e, "markerCleared", e, this, r, i), t && Tr(e), this.parent && this.parent.clear();
        }
      }, pr.prototype.find = function(e, t) {
        e == null && this.type == "bookmark" && (e = 1);
        for (var n, r, i = 0; i < this.lines.length; ++i) {
          var o = this.lines[i], l = fn(o.markedSpans, this);
          if (l.from != null && (n = m(t ? o : f(o), l.from), e == -1))
            return n;
          if (l.to != null && (r = m(t ? o : f(o), l.to), e == 1))
            return r;
        }
        return n && { from: n, to: r };
      }, pr.prototype.changed = function() {
        var e = this, t = this.find(-1, !0), n = this, r = this.doc.cm;
        !t || !r || mt(r, function() {
          var i = t.line, o = f(t.line), l = Ai(r, o);
          if (l && (qo(l), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !sr(n.doc, i) && n.height != null) {
            var a = n.height;
            n.height = null;
            var s = dn(n) - a;
            s && St(i, i.height + s);
          }
          qe(r, "markerChanged", r, e);
        });
      }, pr.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (!t.maybeHiddenMarkers || R(t.maybeHiddenMarkers, this) == -1) && (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(e);
      }, pr.prototype.detachLine = function(e) {
        if (this.lines.splice(R(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, At(pr);
      function Qr(e, t, n, r, i) {
        if (r && r.shared)
          return Fs(e, t, n, r, i);
        if (e.cm && !e.cm.curOp)
          return Xe(e.cm, Qr)(e, t, n, r, i);
        var o = new pr(e, i), l = D(t, n);
        if (r && re(r, o, !1), l > 0 || l == 0 && o.clearWhenEmpty !== !1)
          return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = W("span", [o.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
          if (Ao(e, t.line, t, n, o) || t.line != n.line && Ao(e, n.line, t, n, o))
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          Ta();
        }
        o.addToHistory && xl(e, { from: t, to: n, origin: "markText" }, e.sel, NaN);
        var a = t.line, s = e.cm, u;
        if (e.iter(a, n.line + 1, function(p) {
          s && o.collapsed && !s.options.lineWrapping && zt(p) == s.display.maxLine && (u = !0), o.collapsed && a != t.line && St(p, 0), Na(p, new Kn(
            o,
            a == t.line ? t.ch : null,
            a == n.line ? n.ch : null
          ), e.cm && e.cm.curOp), ++a;
        }), o.collapsed && e.iter(t.line, n.line + 1, function(p) {
          sr(e, p) && St(p, 0);
        }), o.clearOnEnter && U(o, "beforeCursorEnter", function() {
          return o.clear();
        }), o.readOnly && (La(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++Bl, o.atomic = !0), s) {
          if (u && (s.curOp.updateMaxLine = !0), o.collapsed)
            ct(s, t.line, n.line + 1);
          else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
            for (var h = t.line; h <= n.line; h++)
              ur(s, h, "text");
          o.atomic && Nl(s.doc), qe(s, "markerAdded", s, o);
        }
        return o;
      }
      var Nn = function(e, t) {
        this.markers = e, this.primary = t;
        for (var n = 0; n < e.length; ++n)
          e[n].parent = this;
      };
      Nn.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          this.explicitlyCleared = !0;
          for (var e = 0; e < this.markers.length; ++e)
            this.markers[e].clear();
          qe(this, "clear");
        }
      }, Nn.prototype.find = function(e, t) {
        return this.primary.find(e, t);
      }, At(Nn);
      function Fs(e, t, n, r, i) {
        r = re(r), r.shared = !1;
        var o = [Qr(e, t, n, r, i)], l = o[0], a = r.widgetNode;
        return dr(e, function(s) {
          a && (r.widgetNode = a.cloneNode(!0)), o.push(Qr(s, V(s, t), V(s, n), r, i));
          for (var u = 0; u < s.linked.length; ++u)
            if (s.linked[u].isParent)
              return;
          l = ue(o);
        }), new Nn(o, l);
      }
      function Rl(e) {
        return e.findMarks(m(e.first, 0), e.clipPos(m(e.lastLine())), function(t) {
          return t.parent;
        });
      }
      function Is(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n], i = r.find(), o = e.clipPos(i.from), l = e.clipPos(i.to);
          if (D(o, l)) {
            var a = Qr(e, o, l, r.primary, r.primary.type);
            r.markers.push(a), a.parent = r;
          }
        }
      }
      function Bs(e) {
        for (var t = function(r) {
          var i = e[r], o = [i.primary.doc];
          dr(i.primary.doc, function(s) {
            return o.push(s);
          });
          for (var l = 0; l < i.markers.length; l++) {
            var a = i.markers[l];
            R(o, a.doc) == -1 && (a.parent = null, i.markers.splice(l--, 1));
          }
        }, n = 0; n < e.length; n++) t(n);
      }
      var Rs = 0, ht = function(e, t, n, r, i) {
        if (!(this instanceof ht))
          return new ht(e, t, n, r, i);
        n == null && (n = 0), Tn.call(this, [new Ln([new Br("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = n;
        var o = m(n, 0);
        this.sel = cr(o), this.history = new ni(null), this.id = ++Rs, this.modeOption = t, this.lineSep = r, this.direction = i == "rtl" ? "rtl" : "ltr", this.extend = !1, typeof e == "string" && (e = this.splitLines(e)), Ji(this, { from: o, to: o, text: e }), tt(this, cr(o), at);
      };
      ht.prototype = w(Tn.prototype, {
        constructor: ht,
        // Iterate over the document. Supports two forms -- with only one
        // argument, it calls that for each line in the document. With
        // three, it iterates over the range given by the first two (with
        // the second being non-inclusive).
        iter: function(e, t, n) {
          n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e);
        },
        // Non-public interface for adding and removing lines.
        insert: function(e, t) {
          for (var n = 0, r = 0; r < t.length; ++r)
            n += t[r].height;
          this.insertInner(e - this.first, t, n);
        },
        remove: function(e, t) {
          this.removeInner(e - this.first, t);
        },
        // From here, the methods are part of the public interface. Most
        // are also available from CodeMirror (editor) instances.
        getValue: function(e) {
          var t = sn(this, this.first, this.first + this.size);
          return e === !1 ? t : t.join(e || this.lineSeparator());
        },
        setValue: Ye(function(e) {
          var t = m(this.first, 0), n = this.first + this.size - 1;
          Zr(this, {
            from: t,
            to: m(n, B(this, n).text.length),
            text: this.splitLines(e),
            origin: "setValue",
            full: !0
          }, !0), this.cm && gn(this.cm, 0, 0), tt(this, cr(t), at);
        }),
        replaceRange: function(e, t, n, r) {
          t = V(this, t), n = n ? V(this, n) : t, Jr(this, e, t, n, r);
        },
        getRange: function(e, t, n) {
          var r = jt(this, V(this, e), V(this, t));
          return n === !1 ? r : n === "" ? r.join("") : r.join(n || this.lineSeparator());
        },
        getLine: function(e) {
          var t = this.getLineHandle(e);
          return t && t.text;
        },
        getLineHandle: function(e) {
          if (x(this, e))
            return B(this, e);
        },
        getLineNumber: function(e) {
          return f(e);
        },
        getLineHandleVisualStart: function(e) {
          return typeof e == "number" && (e = B(this, e)), zt(e);
        },
        lineCount: function() {
          return this.size;
        },
        firstLine: function() {
          return this.first;
        },
        lastLine: function() {
          return this.first + this.size - 1;
        },
        clipPos: function(e) {
          return V(this, e);
        },
        getCursor: function(e) {
          var t = this.sel.primary(), n;
          return e == null || e == "head" ? n = t.head : e == "anchor" ? n = t.anchor : e == "end" || e == "to" || e === !1 ? n = t.to() : n = t.from(), n;
        },
        listSelections: function() {
          return this.sel.ranges;
        },
        somethingSelected: function() {
          return this.sel.somethingSelected();
        },
        setCursor: Ye(function(e, t, n) {
          Ll(this, V(this, typeof e == "number" ? m(e, t || 0) : e), null, n);
        }),
        setSelection: Ye(function(e, t, n) {
          Ll(this, V(this, e), V(this, t || e), n);
        }),
        extendSelection: Ye(function(e, t, n) {
          oi(this, V(this, e), t && V(this, t), n);
        }),
        extendSelections: Ye(function(e, t) {
          Cl(this, vo(this, e), t);
        }),
        extendSelectionsBy: Ye(function(e, t) {
          var n = we(this.sel.ranges, e);
          Cl(this, vo(this, n), t);
        }),
        setSelections: Ye(function(e, t, n) {
          if (e.length) {
            for (var r = [], i = 0; i < e.length; i++)
              r[i] = new ye(
                V(this, e[i].anchor),
                V(this, e[i].head || e[i].anchor)
              );
            t == null && (t = Math.min(e.length - 1, this.sel.primIndex)), tt(this, Ht(this.cm, r, t), n);
          }
        }),
        addSelection: Ye(function(e, t, n) {
          var r = this.sel.ranges.slice(0);
          r.push(new ye(V(this, e), V(this, t || e))), tt(this, Ht(this.cm, r, r.length - 1), n);
        }),
        getSelection: function(e) {
          for (var t = this.sel.ranges, n, r = 0; r < t.length; r++) {
            var i = jt(this, t[r].from(), t[r].to());
            n = n ? n.concat(i) : i;
          }
          return e === !1 ? n : n.join(e || this.lineSeparator());
        },
        getSelections: function(e) {
          for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
            var i = jt(this, n[r].from(), n[r].to());
            e !== !1 && (i = i.join(e || this.lineSeparator())), t[r] = i;
          }
          return t;
        },
        replaceSelection: function(e, t, n) {
          for (var r = [], i = 0; i < this.sel.ranges.length; i++)
            r[i] = e;
          this.replaceSelections(r, t, n || "+input");
        },
        replaceSelections: Ye(function(e, t, n) {
          for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
            var l = i.ranges[o];
            r[o] = { from: l.from(), to: l.to(), text: this.splitLines(e[o]), origin: n };
          }
          for (var a = t && t != "end" && Ms(this, r, t), s = r.length - 1; s >= 0; s--)
            Zr(this, r[s]);
          a ? Tl(this, a) : this.cm && qr(this.cm);
        }),
        undo: Ye(function() {
          si(this, "undo");
        }),
        redo: Ye(function() {
          si(this, "redo");
        }),
        undoSelection: Ye(function() {
          si(this, "undo", !0);
        }),
        redoSelection: Ye(function() {
          si(this, "redo", !0);
        }),
        setExtending: function(e) {
          this.extend = e;
        },
        getExtending: function() {
          return this.extend;
        },
        historySize: function() {
          for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++)
            e.done[r].ranges || ++t;
          for (var i = 0; i < e.undone.length; i++)
            e.undone[i].ranges || ++n;
          return { undo: t, redo: n };
        },
        clearHistory: function() {
          var e = this;
          this.history = new ni(this.history), dr(this, function(t) {
            return t.history = e.history;
          }, !0);
        },
        markClean: function() {
          this.cleanGeneration = this.changeGeneration(!0);
        },
        changeGeneration: function(e) {
          return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
        },
        isClean: function(e) {
          return this.history.generation == (e || this.cleanGeneration);
        },
        getHistory: function() {
          return {
            done: Yr(this.history.done),
            undone: Yr(this.history.undone)
          };
        },
        setHistory: function(e) {
          var t = this.history = new ni(this.history);
          t.done = Yr(e.done.slice(0), null, !0), t.undone = Yr(e.undone.slice(0), null, !0);
        },
        setGutterMarker: Ye(function(e, t, n) {
          return Cn(this, e, "gutter", function(r) {
            var i = r.gutterMarkers || (r.gutterMarkers = {});
            return i[t] = n, !n && Hn(i) && (r.gutterMarkers = null), !0;
          });
        }),
        clearGutter: Ye(function(e) {
          var t = this;
          this.iter(function(n) {
            n.gutterMarkers && n.gutterMarkers[e] && Cn(t, n, "gutter", function() {
              return n.gutterMarkers[e] = null, Hn(n.gutterMarkers) && (n.gutterMarkers = null), !0;
            });
          });
        }),
        lineInfo: function(e) {
          var t;
          if (typeof e == "number") {
            if (!x(this, e) || (t = e, e = B(this, e), !e))
              return null;
          } else if (t = f(e), t == null)
            return null;
          return {
            line: t,
            handle: e,
            text: e.text,
            gutterMarkers: e.gutterMarkers,
            textClass: e.textClass,
            bgClass: e.bgClass,
            wrapClass: e.wrapClass,
            widgets: e.widgets
          };
        },
        addLineClass: Ye(function(e, t, n) {
          return Cn(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass";
            if (!r[i])
              r[i] = n;
            else {
              if (Y(n).test(r[i]))
                return !1;
              r[i] += " " + n;
            }
            return !0;
          });
        }),
        removeLineClass: Ye(function(e, t, n) {
          return Cn(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass", o = r[i];
            if (o)
              if (n == null)
                r[i] = null;
              else {
                var l = o.match(Y(n));
                if (!l)
                  return !1;
                var a = l.index + l[0].length;
                r[i] = o.slice(0, l.index) + (!l.index || a == o.length ? "" : " ") + o.slice(a) || null;
              }
            else return !1;
            return !0;
          });
        }),
        addLineWidget: Ye(function(e, t, n) {
          return Hs(this, e, t, n);
        }),
        removeLineWidget: function(e) {
          e.clear();
        },
        markText: function(e, t, n) {
          return Qr(this, V(this, e), V(this, t), n, n && n.type || "range");
        },
        setBookmark: function(e, t) {
          var n = {
            replacedWith: t && (t.nodeType == null ? t.widget : t),
            insertLeft: t && t.insertLeft,
            clearWhenEmpty: !1,
            shared: t && t.shared,
            handleMouseEvents: t && t.handleMouseEvents
          };
          return e = V(this, e), Qr(this, e, e, n, "bookmark");
        },
        findMarksAt: function(e) {
          e = V(this, e);
          var t = [], n = B(this, e.line).markedSpans;
          if (n)
            for (var r = 0; r < n.length; ++r) {
              var i = n[r];
              (i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
            }
          return t;
        },
        findMarks: function(e, t, n) {
          e = V(this, e), t = V(this, t);
          var r = [], i = e.line;
          return this.iter(e.line, t.line + 1, function(o) {
            var l = o.markedSpans;
            if (l)
              for (var a = 0; a < l.length; a++) {
                var s = l[a];
                !(s.to != null && i == e.line && e.ch >= s.to || s.from == null && i != e.line || s.from != null && i == t.line && s.from >= t.ch) && (!n || n(s.marker)) && r.push(s.marker.parent || s.marker);
              }
            ++i;
          }), r;
        },
        getAllMarks: function() {
          var e = [];
          return this.iter(function(t) {
            var n = t.markedSpans;
            if (n)
              for (var r = 0; r < n.length; ++r)
                n[r].from != null && e.push(n[r].marker);
          }), e;
        },
        posFromIndex: function(e) {
          var t, n = this.first, r = this.lineSeparator().length;
          return this.iter(function(i) {
            var o = i.text.length + r;
            if (o > e)
              return t = e, !0;
            e -= o, ++n;
          }), V(this, m(n, t));
        },
        indexFromPos: function(e) {
          e = V(this, e);
          var t = e.ch;
          if (e.line < this.first || e.ch < 0)
            return 0;
          var n = this.lineSeparator().length;
          return this.iter(this.first, e.line, function(r) {
            t += r.text.length + n;
          }), t;
        },
        copy: function(e) {
          var t = new ht(
            sn(this, this.first, this.first + this.size),
            this.modeOption,
            this.first,
            this.lineSep,
            this.direction
          );
          return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
        },
        linkedDoc: function(e) {
          e || (e = {});
          var t = this.first, n = this.first + this.size;
          e.from != null && e.from > t && (t = e.from), e.to != null && e.to < n && (n = e.to);
          var r = new ht(sn(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
          return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }), r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], Is(r, Rl(this)), r;
        },
        unlinkDoc: function(e) {
          if (e instanceof Ce && (e = e.doc), this.linked)
            for (var t = 0; t < this.linked.length; ++t) {
              var n = this.linked[t];
              if (n.doc == e) {
                this.linked.splice(t, 1), e.unlinkDoc(this), Bs(Rl(this));
                break;
              }
            }
          if (e.history == this.history) {
            var r = [e.id];
            dr(e, function(i) {
              return r.push(i.id);
            }, !0), e.history = new ni(null), e.history.done = Yr(this.history.done, r), e.history.undone = Yr(this.history.undone, r);
          }
        },
        iterLinkedDocs: function(e) {
          dr(this, e);
        },
        getMode: function() {
          return this.mode;
        },
        getEditor: function() {
          return this.cm;
        },
        splitLines: function(e) {
          return this.lineSep ? e.split(this.lineSep) : Tt(e);
        },
        lineSeparator: function() {
          return this.lineSep || `
`;
        },
        setDirection: Ye(function(e) {
          e != "rtl" && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(t) {
            return t.order = null;
          }), this.cm && Ns(this.cm));
        })
      }), ht.prototype.eachLine = ht.prototype.iter;
      var Kl = 0;
      function Ks(e) {
        var t = this;
        if (_l(t), !(Ne(t, e) || Qt(t.display, e))) {
          et(e), E && (Kl = +/* @__PURE__ */ new Date());
          var n = xr(t, e, !0), r = e.dataTransfer.files;
          if (!(!n || t.isReadOnly()))
            if (r && r.length && window.FileReader && window.File)
              for (var i = r.length, o = Array(i), l = 0, a = function() {
                ++l == i && Xe(t, function() {
                  n = V(t.doc, n);
                  var v = {
                    from: n,
                    to: n,
                    text: t.doc.splitLines(
                      o.filter(function(b) {
                        return b != null;
                      }).join(t.doc.lineSeparator())
                    ),
                    origin: "paste"
                  };
                  Zr(t.doc, v), Tl(t.doc, cr(V(t.doc, n), V(t.doc, hr(v))));
                })();
              }, s = function(v, b) {
                if (t.options.allowDropFileTypes && R(t.options.allowDropFileTypes, v.type) == -1) {
                  a();
                  return;
                }
                var S = new FileReader();
                S.onerror = function() {
                  return a();
                }, S.onload = function() {
                  var L = S.result;
                  if (/[\x00-\x08\x0e-\x1f]{2}/.test(L)) {
                    a();
                    return;
                  }
                  o[b] = L, a();
                }, S.readAsText(v);
              }, u = 0; u < r.length; u++)
                s(r[u], u);
            else {
              if (t.state.draggingText && t.doc.sel.contains(n) > -1) {
                t.state.draggingText(e), setTimeout(function() {
                  return t.display.input.focus();
                }, 20);
                return;
              }
              try {
                var h = e.dataTransfer.getData("Text");
                if (h) {
                  var p;
                  if (t.state.draggingText && !t.state.draggingText.copy && (p = t.listSelections()), li(t.doc, cr(n, n)), p)
                    for (var g = 0; g < p.length; ++g)
                      Jr(t.doc, "", p[g].anchor, p[g].head, "drag");
                  t.replaceSelection(h, "around", "paste"), t.display.input.focus();
                }
              } catch {
              }
            }
        }
      }
      function _s(e, t) {
        if (E && (!e.state.draggingText || +/* @__PURE__ */ new Date() - Kl < 100)) {
          ir(t);
          return;
        }
        if (!(Ne(e, t) || Qt(e.display, t)) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !De)) {
          var n = c("img", null, null, "position: fixed; left: 0; top: 0;");
          n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", le && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), le && n.parentNode.removeChild(n);
        }
      }
      function Us(e, t) {
        var n = xr(e, t);
        if (n) {
          var r = document.createDocumentFragment();
          Fi(e, n, r), e.display.dragCursor || (e.display.dragCursor = c("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), F(e.display.dragCursor, r);
        }
      }
      function _l(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }
      function Ul(e) {
        if (document.getElementsByClassName) {
          for (var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < t.length; r++) {
            var i = t[r].CodeMirror;
            i && n.push(i);
          }
          n.length && n[0].operation(function() {
            for (var o = 0; o < n.length; o++)
              e(n[o]);
          });
        }
      }
      var Gl = !1;
      function Gs() {
        Gl || (qs(), Gl = !0);
      }
      function qs() {
        var e;
        U(window, "resize", function() {
          e == null && (e = setTimeout(function() {
            e = null, Ul(Xs);
          }, 100));
        }), U(window, "blur", function() {
          return Ul(Gr);
        });
      }
      function Xs(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize();
      }
      for (var vr = {
        3: "Pause",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        106: "*",
        107: "=",
        109: "-",
        110: ".",
        111: "/",
        145: "ScrollLock",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        224: "Mod",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
      }, An = 0; An < 10; An++)
        vr[An + 48] = vr[An + 96] = String(An);
      for (var ui = 65; ui <= 90; ui++)
        vr[ui] = String.fromCharCode(ui);
      for (var On = 1; On <= 12; On++)
        vr[On + 111] = vr[On + 63235] = "F" + On;
      var $t = {};
      $t.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
      }, $t.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
      }, $t.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
      }, $t.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
      }, $t.default = me ? $t.macDefault : $t.pcDefault;
      function Ys(e) {
        var t = e.split(/-(?!$)/);
        e = t[t.length - 1];
        for (var n, r, i, o, l = 0; l < t.length - 1; l++) {
          var a = t[l];
          if (/^(cmd|meta|m)$/i.test(a))
            o = !0;
          else if (/^a(lt)?$/i.test(a))
            n = !0;
          else if (/^(c|ctrl|control)$/i.test(a))
            r = !0;
          else if (/^s(hift)?$/i.test(a))
            i = !0;
          else
            throw new Error("Unrecognized modifier name: " + a);
        }
        return n && (e = "Alt-" + e), r && (e = "Ctrl-" + e), o && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
      }
      function js(e) {
        var t = {};
        for (var n in e)
          if (e.hasOwnProperty(n)) {
            var r = e[n];
            if (/^(name|fallthrough|(de|at)tach)$/.test(n))
              continue;
            if (r == "...") {
              delete e[n];
              continue;
            }
            for (var i = we(n.split(" "), Ys), o = 0; o < i.length; o++) {
              var l = void 0, a = void 0;
              o == i.length - 1 ? (a = i.join(" "), l = r) : (a = i.slice(0, o + 1).join(" "), l = "...");
              var s = t[a];
              if (!s)
                t[a] = l;
              else if (s != l)
                throw new Error("Inconsistent bindings for " + a);
            }
            delete e[n];
          }
        for (var u in t)
          e[u] = t[u];
        return e;
      }
      function Vr(e, t, n, r) {
        t = fi(t);
        var i = t.call ? t.call(e, r) : t[e];
        if (i === !1)
          return "nothing";
        if (i === "...")
          return "multi";
        if (i != null && n(i))
          return "handled";
        if (t.fallthrough) {
          if (Object.prototype.toString.call(t.fallthrough) != "[object Array]")
            return Vr(e, t.fallthrough, n, r);
          for (var o = 0; o < t.fallthrough.length; o++) {
            var l = Vr(e, t.fallthrough[o], n, r);
            if (l)
              return l;
          }
        }
      }
      function ql(e) {
        var t = typeof e == "string" ? e : vr[e.keyCode];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
      }
      function Xl(e, t, n) {
        var r = e;
        return t.altKey && r != "Alt" && (e = "Alt-" + e), (Ke ? t.metaKey : t.ctrlKey) && r != "Ctrl" && (e = "Ctrl-" + e), (Ke ? t.ctrlKey : t.metaKey) && r != "Mod" && (e = "Cmd-" + e), !n && t.shiftKey && r != "Shift" && (e = "Shift-" + e), e;
      }
      function Yl(e, t) {
        if (le && e.keyCode == 34 && e.char)
          return !1;
        var n = vr[e.keyCode];
        return n == null || e.altGraphKey ? !1 : (e.keyCode == 3 && e.code && (n = e.code), Xl(n, e, t));
      }
      function fi(e) {
        return typeof e == "string" ? $t[e] : e;
      }
      function $r(e, t) {
        for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
          for (var o = t(n[i]); r.length && D(o.from, ue(r).to) <= 0; ) {
            var l = r.pop();
            if (D(l.from, o.from) < 0) {
              o.from = l.from;
              break;
            }
          }
          r.push(o);
        }
        mt(e, function() {
          for (var a = r.length - 1; a >= 0; a--)
            Jr(e.doc, "", r[a].from, r[a].to, "+delete");
          qr(e);
        });
      }
      function eo(e, t, n) {
        var r = tr(e.text, t + n, n);
        return r < 0 || r > e.text.length ? null : r;
      }
      function to(e, t, n) {
        var r = eo(e, t.ch, n);
        return r == null ? null : new m(t.line, r, n < 0 ? "after" : "before");
      }
      function ro(e, t, n, r, i) {
        if (e) {
          t.doc.direction == "rtl" && (i = -i);
          var o = se(n, t.doc.direction);
          if (o) {
            var l = i < 0 ? ue(o) : o[0], a = i < 0 == (l.level == 1), s = a ? "after" : "before", u;
            if (l.level > 0 || t.doc.direction == "rtl") {
              var h = Kr(t, n);
              u = i < 0 ? n.text.length - 1 : 0;
              var p = _t(t, h, u).top;
              u = It(function(g) {
                return _t(t, h, g).top == p;
              }, i < 0 == (l.level == 1) ? l.from : l.to - 1, u), s == "before" && (u = eo(n, u, 1));
            } else
              u = i < 0 ? l.to : l.from;
            return new m(r, u, s);
          }
        }
        return new m(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after");
      }
      function Zs(e, t, n, r) {
        var i = se(t, e.doc.direction);
        if (!i)
          return to(t, n, r);
        n.ch >= t.text.length ? (n.ch = t.text.length, n.sticky = "before") : n.ch <= 0 && (n.ch = 0, n.sticky = "after");
        var o = nr(i, n.ch, n.sticky), l = i[o];
        if (e.doc.direction == "ltr" && l.level % 2 == 0 && (r > 0 ? l.to > n.ch : l.from < n.ch))
          return to(t, n, r);
        var a = function(A, P) {
          return eo(t, A instanceof m ? A.ch : A, P);
        }, s, u = function(A) {
          return e.options.lineWrapping ? (s = s || Kr(e, t), Vo(e, t, s, A)) : { begin: 0, end: t.text.length };
        }, h = u(n.sticky == "before" ? a(n, -1) : n.ch);
        if (e.doc.direction == "rtl" || l.level == 1) {
          var p = l.level == 1 == r < 0, g = a(n, p ? 1 : -1);
          if (g != null && (p ? g <= l.to && g <= h.end : g >= l.from && g >= h.begin)) {
            var v = p ? "before" : "after";
            return new m(n.line, g, v);
          }
        }
        var b = function(A, P, O) {
          for (var H = function(ke, je) {
            return je ? new m(n.line, a(ke, 1), "before") : new m(n.line, ke, "after");
          }; A >= 0 && A < i.length; A += P) {
            var G = i[A], K = P > 0 == (G.level != 1), ne = K ? O.begin : a(O.end, -1);
            if (G.from <= ne && ne < G.to || (ne = K ? G.from : a(G.to, -1), O.begin <= ne && ne < O.end))
              return H(ne, K);
          }
        }, S = b(o + r, r, h);
        if (S)
          return S;
        var L = r > 0 ? h.end : a(h.begin, -1);
        return L != null && !(r > 0 && L == t.text.length) && (S = b(r > 0 ? 0 : i.length - 1, r, u(L)), S) ? S : null;
      }
      var Dn = {
        selectAll: Dl,
        singleSelection: function(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), at);
        },
        killLine: function(e) {
          return $r(e, function(t) {
            if (t.empty()) {
              var n = B(e.doc, t.head.line).text.length;
              return t.head.ch == n && t.head.line < e.lastLine() ? { from: t.head, to: m(t.head.line + 1, 0) } : { from: t.head, to: m(t.head.line, n) };
            } else
              return { from: t.from(), to: t.to() };
          });
        },
        deleteLine: function(e) {
          return $r(e, function(t) {
            return {
              from: m(t.from().line, 0),
              to: V(e.doc, m(t.to().line + 1, 0))
            };
          });
        },
        delLineLeft: function(e) {
          return $r(e, function(t) {
            return {
              from: m(t.from().line, 0),
              to: t.from()
            };
          });
        },
        delWrappedLineLeft: function(e) {
          return $r(e, function(t) {
            var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: n }, "div");
            return { from: r, to: t.from() };
          });
        },
        delWrappedLineRight: function(e) {
          return $r(e, function(t) {
            var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
            return { from: t.from(), to: r };
          });
        },
        undo: function(e) {
          return e.undo();
        },
        redo: function(e) {
          return e.redo();
        },
        undoSelection: function(e) {
          return e.undoSelection();
        },
        redoSelection: function(e) {
          return e.redoSelection();
        },
        goDocStart: function(e) {
          return e.extendSelection(m(e.firstLine(), 0));
        },
        goDocEnd: function(e) {
          return e.extendSelection(m(e.lastLine()));
        },
        goLineStart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return jl(e, t.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Zl(e, t.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Js(e, t.head.line);
            },
            { origin: "+move", bias: -1 }
          );
        },
        goLineRight: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
          }, ve);
        },
        goLineLeft: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: 0, top: n }, "div");
          }, ve);
        },
        goLineLeftSmart: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: n }, "div");
            return r.ch < e.getLine(r.line).search(/\S/) ? Zl(e, t.head) : r;
          }, ve);
        },
        goLineUp: function(e) {
          return e.moveV(-1, "line");
        },
        goLineDown: function(e) {
          return e.moveV(1, "line");
        },
        goPageUp: function(e) {
          return e.moveV(-1, "page");
        },
        goPageDown: function(e) {
          return e.moveV(1, "page");
        },
        goCharLeft: function(e) {
          return e.moveH(-1, "char");
        },
        goCharRight: function(e) {
          return e.moveH(1, "char");
        },
        goColumnLeft: function(e) {
          return e.moveH(-1, "column");
        },
        goColumnRight: function(e) {
          return e.moveH(1, "column");
        },
        goWordLeft: function(e) {
          return e.moveH(-1, "word");
        },
        goGroupRight: function(e) {
          return e.moveH(1, "group");
        },
        goGroupLeft: function(e) {
          return e.moveH(-1, "group");
        },
        goWordRight: function(e) {
          return e.moveH(1, "word");
        },
        delCharBefore: function(e) {
          return e.deleteH(-1, "codepoint");
        },
        delCharAfter: function(e) {
          return e.deleteH(1, "char");
        },
        delWordBefore: function(e) {
          return e.deleteH(-1, "word");
        },
        delWordAfter: function(e) {
          return e.deleteH(1, "word");
        },
        delGroupBefore: function(e) {
          return e.deleteH(-1, "group");
        },
        delGroupAfter: function(e) {
          return e.deleteH(1, "group");
        },
        indentAuto: function(e) {
          return e.indentSelection("smart");
        },
        indentMore: function(e) {
          return e.indentSelection("add");
        },
        indentLess: function(e) {
          return e.indentSelection("subtract");
        },
        insertTab: function(e) {
          return e.replaceSelection("	");
        },
        insertSoftTab: function(e) {
          for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
            var o = n[i].from(), l = ce(e.getLine(o.line), o.ch, r);
            t.push(kt(r - l % r));
          }
          e.replaceSelections(t);
        },
        defaultTab: function(e) {
          e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
        },
        // Swap the two chars left and right of each selection's head.
        // Move cursor behind the two swapped characters afterwards.
        //
        // Doesn't consider line feeds a character.
        // Doesn't scan more than one line above to find a character.
        // Doesn't do anything on an empty line.
        // Doesn't do anything with non-empty selections.
        transposeChars: function(e) {
          return mt(e, function() {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
              if (t[r].empty()) {
                var i = t[r].head, o = B(e.doc, i.line).text;
                if (o) {
                  if (i.ch == o.length && (i = new m(i.line, i.ch - 1)), i.ch > 0)
                    i = new m(i.line, i.ch + 1), e.replaceRange(
                      o.charAt(i.ch - 1) + o.charAt(i.ch - 2),
                      m(i.line, i.ch - 2),
                      i,
                      "+transpose"
                    );
                  else if (i.line > e.doc.first) {
                    var l = B(e.doc, i.line - 1).text;
                    l && (i = new m(i.line, 1), e.replaceRange(
                      o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1),
                      m(i.line - 1, l.length - 1),
                      i,
                      "+transpose"
                    ));
                  }
                }
                n.push(new ye(i, i));
              }
            e.setSelections(n);
          });
        },
        newlineAndIndent: function(e) {
          return mt(e, function() {
            for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--)
              e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input");
            t = e.listSelections();
            for (var r = 0; r < t.length; r++)
              e.indentLine(t[r].from().line, null, !0);
            qr(e);
          });
        },
        openLine: function(e) {
          return e.replaceSelection(`
`, "start");
        },
        toggleOverwrite: function(e) {
          return e.toggleOverwrite();
        }
      };
      function jl(e, t) {
        var n = B(e.doc, t), r = zt(n);
        return r != n && (t = f(r)), ro(!0, e, r, t, 1);
      }
      function Js(e, t) {
        var n = B(e.doc, t), r = Pa(n);
        return r != n && (t = f(r)), ro(!0, e, n, t, -1);
      }
      function Zl(e, t) {
        var n = jl(e, t.line), r = B(e.doc, n.line), i = se(r, e.doc.direction);
        if (!i || i[0].level == 0) {
          var o = Math.max(n.ch, r.text.search(/\S/)), l = t.line == n.line && t.ch <= o && t.ch;
          return m(n.line, l ? 0 : o, n.sticky);
        }
        return n;
      }
      function ci(e, t, n) {
        if (typeof t == "string" && (t = Dn[t], !t))
          return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift, i = !1;
        try {
          e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != Nt;
        } finally {
          e.display.shift = r, e.state.suppressEdits = !1;
        }
        return i;
      }
      function Qs(e, t, n) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
          var i = Vr(t, e.state.keyMaps[r], n, e);
          if (i)
            return i;
        }
        return e.options.extraKeys && Vr(t, e.options.extraKeys, n, e) || Vr(t, e.options.keyMap, n, e);
      }
      var Vs = new ee();
      function Wn(e, t, n, r) {
        var i = e.state.keySeq;
        if (i) {
          if (ql(t))
            return "handled";
          if (/\'$/.test(t) ? e.state.keySeq = null : Vs.set(50, function() {
            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
          }), Jl(e, i + " " + t, n, r))
            return !0;
        }
        return Jl(e, t, n, r);
      }
      function Jl(e, t, n, r) {
        var i = Qs(e, t, r);
        return i == "multi" && (e.state.keySeq = t), i == "handled" && qe(e, "keyHandled", e, t, n), (i == "handled" || i == "multi") && (et(n), Ii(e)), !!i;
      }
      function Ql(e, t) {
        var n = Yl(t, !0);
        return n ? t.shiftKey && !e.state.keySeq ? Wn(e, "Shift-" + n, t, function(r) {
          return ci(e, r, !0);
        }) || Wn(e, n, t, function(r) {
          if (typeof r == "string" ? /^go[A-Z]/.test(r) : r.motion)
            return ci(e, r);
        }) : Wn(e, n, t, function(r) {
          return ci(e, r);
        }) : !1;
      }
      function $s(e, t, n) {
        return Wn(e, "'" + n + "'", t, function(r) {
          return ci(e, r, !0);
        });
      }
      var no = null;
      function Vl(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && (t.curOp.focus = pe(gt(t)), !Ne(t, e))) {
          E && N < 11 && e.keyCode == 27 && (e.returnValue = !1);
          var n = e.keyCode;
          t.display.shift = n == 16 || e.shiftKey;
          var r = Ql(t, e);
          le && (no = r ? n : null, !r && n == 88 && !Bn && (me ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), fe && !me && !r && n == 46 && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), n == 18 && !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) && eu(t);
        }
      }
      function eu(e) {
        var t = e.display.lineDiv;
        Pe(t, "CodeMirror-crosshair");
        function n(r) {
          (r.keyCode == 18 || !r.altKey) && (Le(t, "CodeMirror-crosshair"), $e(document, "keyup", n), $e(document, "mouseover", n));
        }
        U(document, "keyup", n), U(document, "mouseover", n);
      }
      function $l(e) {
        e.keyCode == 16 && (this.doc.sel.shift = !1), Ne(this, e);
      }
      function ea(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && !(Qt(t.display, e) || Ne(t, e) || e.ctrlKey && !e.altKey || me && e.metaKey)) {
          var n = e.keyCode, r = e.charCode;
          if (le && n == no) {
            no = null, et(e);
            return;
          }
          if (!(le && (!e.which || e.which < 10) && Ql(t, e))) {
            var i = String.fromCharCode(r ?? n);
            i != "\b" && ($s(t, e, i) || t.display.input.onKeyPress(e));
          }
        }
      }
      var tu = 400, io = function(e, t, n) {
        this.time = e, this.pos = t, this.button = n;
      };
      io.prototype.compare = function(e, t, n) {
        return this.time + tu > e && D(t, this.pos) == 0 && n == this.button;
      };
      var Pn, zn;
      function ru(e, t) {
        var n = +/* @__PURE__ */ new Date();
        return zn && zn.compare(n, e, t) ? (Pn = zn = null, "triple") : Pn && Pn.compare(n, e, t) ? (zn = new io(n, e, t), Pn = null, "double") : (Pn = new io(n, e, t), zn = null, "single");
      }
      function ta(e) {
        var t = this, n = t.display;
        if (!(Ne(t, e) || n.activeTouch && n.input.supportsTouch())) {
          if (n.input.ensurePolled(), n.shift = e.shiftKey, Qt(n, e)) {
            I || (n.scroller.draggable = !1, setTimeout(function() {
              return n.scroller.draggable = !0;
            }, 100));
            return;
          }
          if (!oo(t, e)) {
            var r = xr(t, e), i = Ot(e), o = r ? ru(r, i) : "single";
            Q(t).focus(), i == 1 && t.state.selectingText && t.state.selectingText(e), !(r && nu(t, i, r, o, e)) && (i == 1 ? r ? ou(t, r, o, e) : on(e) == n.scroller && et(e) : i == 2 ? (r && oi(t.doc, r), setTimeout(function() {
              return n.input.focus();
            }, 20)) : i == 3 && (J ? t.display.input.onContextMenu(e) : Bi(t)));
          }
        }
      }
      function nu(e, t, n, r, i) {
        var o = "Click";
        return r == "double" ? o = "Double" + o : r == "triple" && (o = "Triple" + o), o = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + o, Wn(e, Xl(o, i), i, function(l) {
          if (typeof l == "string" && (l = Dn[l]), !l)
            return !1;
          var a = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), a = l(e, n) != Nt;
          } finally {
            e.state.suppressEdits = !1;
          }
          return a;
        });
      }
      function iu(e, t, n) {
        var r = e.getOption("configureMouse"), i = r ? r(e, t, n) : {};
        if (i.unit == null) {
          var o = Ue ? n.shiftKey && n.metaKey : n.altKey;
          i.unit = o ? "rectangle" : t == "single" ? "char" : t == "double" ? "word" : "line";
        }
        return (i.extend == null || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey), i.addNew == null && (i.addNew = me ? n.metaKey : n.ctrlKey), i.moveOnDrag == null && (i.moveOnDrag = !(me ? n.altKey : n.ctrlKey)), i;
      }
      function ou(e, t, n, r) {
        E ? setTimeout(j(rl, e), 0) : e.curOp.focus = pe(gt(e));
        var i = iu(e, n, r), o = e.doc.sel, l;
        e.options.dragDrop && yi && !e.isReadOnly() && n == "single" && (l = o.contains(t)) > -1 && (D((l = o.ranges[l]).from(), t) < 0 || t.xRel > 0) && (D(l.to(), t) > 0 || t.xRel < 0) ? lu(e, r, t, i) : au(e, r, t, i);
      }
      function lu(e, t, n, r) {
        var i = e.display, o = !1, l = Xe(e, function(u) {
          I && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : Bi(e)), $e(i.wrapper.ownerDocument, "mouseup", l), $e(i.wrapper.ownerDocument, "mousemove", a), $e(i.scroller, "dragstart", s), $e(i.scroller, "drop", l), o || (et(u), r.addNew || oi(e.doc, n, null, null, r.extend), I && !De || E && N == 9 ? setTimeout(function() {
            i.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), i.input.focus();
          }, 20) : i.input.focus());
        }), a = function(u) {
          o = o || Math.abs(t.clientX - u.clientX) + Math.abs(t.clientY - u.clientY) >= 10;
        }, s = function() {
          return o = !0;
        };
        I && (i.scroller.draggable = !0), e.state.draggingText = l, l.copy = !r.moveOnDrag, U(i.wrapper.ownerDocument, "mouseup", l), U(i.wrapper.ownerDocument, "mousemove", a), U(i.scroller, "dragstart", s), U(i.scroller, "drop", l), e.state.delayingBlurEvent = !0, setTimeout(function() {
          return i.input.focus();
        }, 20), i.scroller.dragDrop && i.scroller.dragDrop();
      }
      function ra(e, t, n) {
        if (n == "char")
          return new ye(t, t);
        if (n == "word")
          return e.findWordAt(t);
        if (n == "line")
          return new ye(m(t.line, 0), V(e.doc, m(t.line + 1, 0)));
        var r = n(e, t);
        return new ye(r.from, r.to);
      }
      function au(e, t, n, r) {
        E && Bi(e);
        var i = e.display, o = e.doc;
        et(t);
        var l, a, s = o.sel, u = s.ranges;
        if (r.addNew && !r.extend ? (a = o.sel.contains(n), a > -1 ? l = u[a] : l = new ye(n, n)) : (l = o.sel.primary(), a = o.sel.primIndex), r.unit == "rectangle")
          r.addNew || (l = new ye(n, n)), n = xr(e, t, !0, !0), a = -1;
        else {
          var h = ra(e, n, r.unit);
          r.extend ? l = Vi(l, h.anchor, h.head, r.extend) : l = h;
        }
        r.addNew ? a == -1 ? (a = u.length, tt(
          o,
          Ht(e, u.concat([l]), a),
          { scroll: !1, origin: "*mouse" }
        )) : u.length > 1 && u[a].empty() && r.unit == "char" && !r.extend ? (tt(
          o,
          Ht(e, u.slice(0, a).concat(u.slice(a + 1)), 0),
          { scroll: !1, origin: "*mouse" }
        ), s = o.sel) : $i(o, a, l, xt) : (a = 0, tt(o, new Ct([l], 0), xt), s = o.sel);
        var p = n;
        function g(O) {
          if (D(p, O) != 0)
            if (p = O, r.unit == "rectangle") {
              for (var H = [], G = e.options.tabSize, K = ce(B(o, n.line).text, n.ch, G), ne = ce(B(o, O.line).text, O.ch, G), ke = Math.min(K, ne), je = Math.max(K, ne), Te = Math.min(n.line, O.line), bt = Math.min(e.lastLine(), Math.max(n.line, O.line)); Te <= bt; Te++) {
                var dt = B(o, Te).text, Fe = Ee(dt, ke, G);
                ke == je ? H.push(new ye(m(Te, Fe), m(Te, Fe))) : dt.length > Fe && H.push(new ye(m(Te, Fe), m(Te, Ee(dt, je, G))));
              }
              H.length || H.push(new ye(n, n)), tt(
                o,
                Ht(e, s.ranges.slice(0, a).concat(H), a),
                { origin: "*mouse", scroll: !1 }
              ), e.scrollIntoView(O);
            } else {
              var pt = l, Qe = ra(e, O, r.unit), _e = pt.anchor, Ie;
              D(Qe.anchor, _e) > 0 ? (Ie = Qe.head, _e = Ir(pt.from(), Qe.anchor)) : (Ie = Qe.anchor, _e = ft(pt.to(), Qe.head));
              var Oe = s.ranges.slice(0);
              Oe[a] = su(e, new ye(V(o, _e), Ie)), tt(o, Ht(e, Oe, a), xt);
            }
        }
        var v = i.wrapper.getBoundingClientRect(), b = 0;
        function S(O) {
          var H = ++b, G = xr(e, O, !0, r.unit == "rectangle");
          if (G)
            if (D(G, p) != 0) {
              e.curOp.focus = pe(gt(e)), g(G);
              var K = $n(i, o);
              (G.line >= K.to || G.line < K.from) && setTimeout(Xe(e, function() {
                b == H && S(O);
              }), 150);
            } else {
              var ne = O.clientY < v.top ? -20 : O.clientY > v.bottom ? 20 : 0;
              ne && setTimeout(Xe(e, function() {
                b == H && (i.scroller.scrollTop += ne, S(O));
              }), 50);
            }
        }
        function L(O) {
          e.state.selectingText = !1, b = 1 / 0, O && (et(O), i.input.focus()), $e(i.wrapper.ownerDocument, "mousemove", A), $e(i.wrapper.ownerDocument, "mouseup", P), o.history.lastSelOrigin = null;
        }
        var A = Xe(e, function(O) {
          O.buttons === 0 || !Ot(O) ? L(O) : S(O);
        }), P = Xe(e, L);
        e.state.selectingText = P, U(i.wrapper.ownerDocument, "mousemove", A), U(i.wrapper.ownerDocument, "mouseup", P);
      }
      function su(e, t) {
        var n = t.anchor, r = t.head, i = B(e.doc, n.line);
        if (D(n, r) == 0 && n.sticky == r.sticky)
          return t;
        var o = se(i);
        if (!o)
          return t;
        var l = nr(o, n.ch, n.sticky), a = o[l];
        if (a.from != n.ch && a.to != n.ch)
          return t;
        var s = l + (a.from == n.ch == (a.level != 1) ? 0 : 1);
        if (s == 0 || s == o.length)
          return t;
        var u;
        if (r.line != n.line)
          u = (r.line - n.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
        else {
          var h = nr(o, r.ch, r.sticky), p = h - l || (r.ch - n.ch) * (a.level == 1 ? -1 : 1);
          h == s - 1 || h == s ? u = p < 0 : u = p > 0;
        }
        var g = o[s + (u ? -1 : 0)], v = u == (g.level == 1), b = v ? g.from : g.to, S = v ? "after" : "before";
        return n.ch == b && n.sticky == S ? t : new ye(new m(n.line, b, S), r);
      }
      function na(e, t, n, r) {
        var i, o;
        if (t.touches)
          i = t.touches[0].clientX, o = t.touches[0].clientY;
        else
          try {
            i = t.clientX, o = t.clientY;
          } catch {
            return !1;
          }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right))
          return !1;
        r && et(t);
        var l = e.display, a = l.lineDiv.getBoundingClientRect();
        if (o > a.bottom || !yt(e, n))
          return ut(t);
        o -= a.top - l.viewOffset;
        for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
          var u = l.gutters.childNodes[s];
          if (u && u.getBoundingClientRect().right >= i) {
            var h = d(e.doc, o), p = e.display.gutterSpecs[s];
            return Me(e, n, e, h, p.className, t), ut(t);
          }
        }
      }
      function oo(e, t) {
        return na(e, t, "gutterClick", !0);
      }
      function ia(e, t) {
        Qt(e.display, t) || uu(e, t) || Ne(e, t, "contextmenu") || J || e.display.input.onContextMenu(t);
      }
      function uu(e, t) {
        return yt(e, "gutterContextMenu") ? na(e, t, "gutterContextMenu", !1) : !1;
      }
      function oa(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), pn(e);
      }
      var en = { toString: function() {
        return "CodeMirror.Init";
      } }, la = {}, hi = {};
      function fu(e) {
        var t = e.optionHandlers;
        function n(r, i, o, l) {
          e.defaults[r] = i, o && (t[r] = l ? function(a, s, u) {
            u != en && o(a, s, u);
          } : o);
        }
        e.defineOption = n, e.Init = en, n("value", "", function(r, i) {
          return r.setValue(i);
        }, !0), n("mode", null, function(r, i) {
          r.doc.modeOption = i, Zi(r);
        }, !0), n("indentUnit", 2, Zi, !0), n("indentWithTabs", !1), n("smartIndent", !0), n("tabSize", 4, function(r) {
          kn(r), pn(r), ct(r);
        }, !0), n("lineSeparator", null, function(r, i) {
          if (r.doc.lineSep = i, !!i) {
            var o = [], l = r.doc.first;
            r.doc.iter(function(s) {
              for (var u = 0; ; ) {
                var h = s.text.indexOf(i, u);
                if (h == -1)
                  break;
                u = h + i.length, o.push(m(l, h));
              }
              l++;
            });
            for (var a = o.length - 1; a >= 0; a--)
              Jr(r.doc, i, o[a], m(o[a].line, o[a].ch + i.length));
          }
        }), n("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(r, i, o) {
          r.state.specialChars = new RegExp(i.source + (i.test("	") ? "" : "|	"), "g"), o != en && r.refresh();
        }), n("specialCharPlaceholder", Ba, function(r) {
          return r.refresh();
        }, !0), n("electricChars", !0), n("inputStyle", ae ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), n("spellcheck", !1, function(r, i) {
          return r.getInputField().spellcheck = i;
        }, !0), n("autocorrect", !1, function(r, i) {
          return r.getInputField().autocorrect = i;
        }, !0), n("autocapitalize", !1, function(r, i) {
          return r.getInputField().autocapitalize = i;
        }, !0), n("rtlMoveVisually", !lt), n("wholeLineUpdateBefore", !0), n("theme", "default", function(r) {
          oa(r), xn(r);
        }, !0), n("keyMap", "default", function(r, i, o) {
          var l = fi(i), a = o != en && fi(o);
          a && a.detach && a.detach(r, l), l.attach && l.attach(r, a || null);
        }), n("extraKeys", null), n("configureMouse", null), n("lineWrapping", !1, hu, !0), n("gutters", [], function(r, i) {
          r.display.gutterSpecs = Yi(i, r.options.lineNumbers), xn(r);
        }, !0), n("fixedGutter", !0, function(r, i) {
          r.display.gutters.style.left = i ? Ei(r.display) + "px" : "0", r.refresh();
        }, !0), n("coverGutterNextToScrollbar", !1, function(r) {
          return Xr(r);
        }, !0), n("scrollbarStyle", "native", function(r) {
          sl(r), Xr(r), r.display.scrollbars.setScrollTop(r.doc.scrollTop), r.display.scrollbars.setScrollLeft(r.doc.scrollLeft);
        }, !0), n("lineNumbers", !1, function(r, i) {
          r.display.gutterSpecs = Yi(r.options.gutters, i), xn(r);
        }, !0), n("firstLineNumber", 1, xn, !0), n("lineNumberFormatter", function(r) {
          return r;
        }, xn, !0), n("showCursorWhenSelecting", !1, vn, !0), n("resetSelectionOnContextMenu", !0), n("lineWiseCopyCut", !0), n("pasteLinesPerSelection", !0), n("selectionsMayTouch", !1), n("readOnly", !1, function(r, i) {
          i == "nocursor" && (Gr(r), r.display.input.blur()), r.display.input.readOnlyChanged(i);
        }), n("screenReaderLabel", null, function(r, i) {
          i = i === "" ? null : i, r.display.input.screenReaderLabelChanged(i);
        }), n("disableInput", !1, function(r, i) {
          i || r.display.input.reset();
        }, !0), n("dragDrop", !0, cu), n("allowDropFileTypes", null), n("cursorBlinkRate", 530), n("cursorScrollMargin", 0), n("cursorHeight", 1, vn, !0), n("singleCursorHeightPerLine", !0, vn, !0), n("workTime", 100), n("workDelay", 100), n("flattenSpans", !0, kn, !0), n("addModeClass", !1, kn, !0), n("pollInterval", 100), n("undoDepth", 200, function(r, i) {
          return r.doc.history.undoDepth = i;
        }), n("historyEventDelay", 1250), n("viewportMargin", 10, function(r) {
          return r.refresh();
        }, !0), n("maxHighlightLength", 1e4, kn, !0), n("moveInputWithCursor", !0, function(r, i) {
          i || r.display.input.resetPosition();
        }), n("tabindex", null, function(r, i) {
          return r.display.input.getField().tabIndex = i || "";
        }), n("autofocus", null), n("direction", "ltr", function(r, i) {
          return r.doc.setDirection(i);
        }, !0), n("phrases", null);
      }
      function cu(e, t, n) {
        var r = n && n != en;
        if (!t != !r) {
          var i = e.display.dragFunctions, o = t ? U : $e;
          o(e.display.scroller, "dragstart", i.start), o(e.display.scroller, "dragenter", i.enter), o(e.display.scroller, "dragover", i.over), o(e.display.scroller, "dragleave", i.leave), o(e.display.scroller, "drop", i.drop);
        }
      }
      function hu(e) {
        e.options.lineWrapping ? (Pe(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Le(e.display.wrapper, "CodeMirror-wrap"), Li(e)), Hi(e), ct(e), pn(e), setTimeout(function() {
          return Xr(e);
        }, 100);
      }
      function Ce(e, t) {
        var n = this;
        if (!(this instanceof Ce))
          return new Ce(e, t);
        this.options = t = t ? re(t) : {}, re(la, t, !1);
        var r = t.value;
        typeof r == "string" ? r = new ht(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
        var i = new Ce.inputStyles[t.inputStyle](this), o = this.display = new Ls(e, r, i, t);
        o.wrapper.CodeMirror = this, oa(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), sl(this), this.state = {
          keyMaps: [],
          // stores maps added by addKeyMap
          overlays: [],
          // highlighting overlays, as added by addOverlay
          modeGen: 0,
          // bumped when mode/overlay changes, used to invalidate highlighting info
          overwrite: !1,
          delayingBlurEvent: !1,
          focused: !1,
          suppressEdits: !1,
          // used to disable editing during key handlers when in readOnly mode
          pasteIncoming: -1,
          cutIncoming: -1,
          // help recognize paste/cut edits in input.poll
          selectingText: !1,
          draggingText: !1,
          highlight: new ee(),
          // stores highlight worker timeout
          keySeq: null,
          // Unfinished key sequence
          specialChars: null
        }, t.autofocus && !ae && o.input.focus(), E && N < 11 && setTimeout(function() {
          return n.display.input.reset(!0);
        }, 20), du(this), Gs(), Lr(this), this.curOp.forceUpdate = !0, ml(this, r), t.autofocus && !ae || this.hasFocus() ? setTimeout(function() {
          n.hasFocus() && !n.state.focused && Ri(n);
        }, 20) : Gr(this);
        for (var l in hi)
          hi.hasOwnProperty(l) && hi[l](this, t[l], en);
        cl(this), t.finishInit && t.finishInit(this);
        for (var a = 0; a < lo.length; ++a)
          lo[a](this);
        Tr(this), I && t.lineWrapping && getComputedStyle(o.lineDiv).textRendering == "optimizelegibility" && (o.lineDiv.style.textRendering = "auto");
      }
      Ce.defaults = la, Ce.optionHandlers = hi;
      function du(e) {
        var t = e.display;
        U(t.scroller, "mousedown", Xe(e, ta)), E && N < 11 ? U(t.scroller, "dblclick", Xe(e, function(s) {
          if (!Ne(e, s)) {
            var u = xr(e, s);
            if (!(!u || oo(e, s) || Qt(e.display, s))) {
              et(s);
              var h = e.findWordAt(u);
              oi(e.doc, h.anchor, h.head);
            }
          }
        })) : U(t.scroller, "dblclick", function(s) {
          return Ne(e, s) || et(s);
        }), U(t.scroller, "contextmenu", function(s) {
          return ia(e, s);
        }), U(t.input.getField(), "contextmenu", function(s) {
          t.scroller.contains(s.target) || ia(e, s);
        });
        var n, r = { end: 0 };
        function i() {
          t.activeTouch && (n = setTimeout(function() {
            return t.activeTouch = null;
          }, 1e3), r = t.activeTouch, r.end = +/* @__PURE__ */ new Date());
        }
        function o(s) {
          if (s.touches.length != 1)
            return !1;
          var u = s.touches[0];
          return u.radiusX <= 1 && u.radiusY <= 1;
        }
        function l(s, u) {
          if (u.left == null)
            return !0;
          var h = u.left - s.left, p = u.top - s.top;
          return h * h + p * p > 20 * 20;
        }
        U(t.scroller, "touchstart", function(s) {
          if (!Ne(e, s) && !o(s) && !oo(e, s)) {
            t.input.ensurePolled(), clearTimeout(n);
            var u = +/* @__PURE__ */ new Date();
            t.activeTouch = {
              start: u,
              moved: !1,
              prev: u - r.end <= 300 ? r : null
            }, s.touches.length == 1 && (t.activeTouch.left = s.touches[0].pageX, t.activeTouch.top = s.touches[0].pageY);
          }
        }), U(t.scroller, "touchmove", function() {
          t.activeTouch && (t.activeTouch.moved = !0);
        }), U(t.scroller, "touchend", function(s) {
          var u = t.activeTouch;
          if (u && !Qt(t, s) && u.left != null && !u.moved && /* @__PURE__ */ new Date() - u.start < 300) {
            var h = e.coordsChar(t.activeTouch, "page"), p;
            !u.prev || l(u, u.prev) ? p = new ye(h, h) : !u.prev.prev || l(u, u.prev.prev) ? p = e.findWordAt(h) : p = new ye(m(h.line, 0), V(e.doc, m(h.line + 1, 0))), e.setSelection(p.anchor, p.head), e.focus(), et(s);
          }
          i();
        }), U(t.scroller, "touchcancel", i), U(t.scroller, "scroll", function() {
          t.scroller.clientHeight && (yn(e, t.scroller.scrollTop), Sr(e, t.scroller.scrollLeft, !0), Me(e, "scroll", e));
        }), U(t.scroller, "mousewheel", function(s) {
          return pl(e, s);
        }), U(t.scroller, "DOMMouseScroll", function(s) {
          return pl(e, s);
        }), U(t.wrapper, "scroll", function() {
          return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0;
        }), t.dragFunctions = {
          enter: function(s) {
            Ne(e, s) || ir(s);
          },
          over: function(s) {
            Ne(e, s) || (Us(e, s), ir(s));
          },
          start: function(s) {
            return _s(e, s);
          },
          drop: Xe(e, Ks),
          leave: function(s) {
            Ne(e, s) || _l(e);
          }
        };
        var a = t.input.getField();
        U(a, "keyup", function(s) {
          return $l.call(e, s);
        }), U(a, "keydown", Xe(e, Vl)), U(a, "keypress", Xe(e, ea)), U(a, "focus", function(s) {
          return Ri(e, s);
        }), U(a, "blur", function(s) {
          return Gr(e, s);
        });
      }
      var lo = [];
      Ce.defineInitHook = function(e) {
        return lo.push(e);
      };
      function En(e, t, n, r) {
        var i = e.doc, o;
        n == null && (n = "add"), n == "smart" && (i.mode.indent ? o = un(e, t).state : n = "prev");
        var l = e.options.tabSize, a = B(i, t), s = ce(a.text, null, l);
        a.stateAfter && (a.stateAfter = null);
        var u = a.text.match(/^\s*/)[0], h;
        if (!r && !/\S/.test(a.text))
          h = 0, n = "not";
        else if (n == "smart" && (h = i.mode.indent(o, a.text.slice(u.length), a.text), h == Nt || h > 150)) {
          if (!r)
            return;
          n = "prev";
        }
        n == "prev" ? t > i.first ? h = ce(B(i, t - 1).text, null, l) : h = 0 : n == "add" ? h = s + e.options.indentUnit : n == "subtract" ? h = s - e.options.indentUnit : typeof n == "number" && (h = s + n), h = Math.max(0, h);
        var p = "", g = 0;
        if (e.options.indentWithTabs)
          for (var v = Math.floor(h / l); v; --v)
            g += l, p += "	";
        if (g < h && (p += kt(h - g)), p != u)
          return Jr(i, p, m(t, 0), m(t, u.length), "+input"), a.stateAfter = null, !0;
        for (var b = 0; b < i.sel.ranges.length; b++) {
          var S = i.sel.ranges[b];
          if (S.head.line == t && S.head.ch < u.length) {
            var L = m(t, u.length);
            $i(i, b, new ye(L, L));
            break;
          }
        }
      }
      var Ft = null;
      function di(e) {
        Ft = e;
      }
      function ao(e, t, n, r, i) {
        var o = e.doc;
        e.display.shift = !1, r || (r = o.sel);
        var l = +/* @__PURE__ */ new Date() - 200, a = i == "paste" || e.state.pasteIncoming > l, s = Tt(t), u = null;
        if (a && r.ranges.length > 1)
          if (Ft && Ft.text.join(`
`) == t) {
            if (r.ranges.length % Ft.text.length == 0) {
              u = [];
              for (var h = 0; h < Ft.text.length; h++)
                u.push(o.splitLines(Ft.text[h]));
            }
          } else s.length == r.ranges.length && e.options.pasteLinesPerSelection && (u = we(s, function(A) {
            return [A];
          }));
        for (var p = e.curOp.updateInput, g = r.ranges.length - 1; g >= 0; g--) {
          var v = r.ranges[g], b = v.from(), S = v.to();
          v.empty() && (n && n > 0 ? b = m(b.line, b.ch - n) : e.state.overwrite && !a ? S = m(S.line, Math.min(B(o, S.line).text.length, S.ch + ue(s).length)) : a && Ft && Ft.lineWise && Ft.text.join(`
`) == s.join(`
`) && (b = S = m(b.line, 0)));
          var L = {
            from: b,
            to: S,
            text: u ? u[g % u.length] : s,
            origin: i || (a ? "paste" : e.state.cutIncoming > l ? "cut" : "+input")
          };
          Zr(e.doc, L), qe(e, "inputRead", e, L);
        }
        t && !a && sa(e, t), qr(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = p), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
      }
      function aa(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("Text");
        if (n)
          return e.preventDefault(), !t.isReadOnly() && !t.options.disableInput && t.hasFocus() && mt(t, function() {
            return ao(t, n, 0, null, "paste");
          }), !0;
      }
      function sa(e, t) {
        if (!(!e.options.electricChars || !e.options.smartIndent))
          for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
            var i = n.ranges[r];
            if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
              var o = e.getModeAt(i.head), l = !1;
              if (o.electricChars) {
                for (var a = 0; a < o.electricChars.length; a++)
                  if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                    l = En(e, i.head.line, "smart");
                    break;
                  }
              } else o.electricInput && o.electricInput.test(B(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = En(e, i.head.line, "smart"));
              l && qe(e, "electricInput", e, i.head.line);
            }
          }
      }
      function ua(e) {
        for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
          var i = e.doc.sel.ranges[r].head.line, o = { anchor: m(i, 0), head: m(i + 1, 0) };
          n.push(o), t.push(e.getRange(o.anchor, o.head));
        }
        return { text: t, ranges: n };
      }
      function so(e, t, n, r) {
        e.setAttribute("autocorrect", n ? "on" : "off"), e.setAttribute("autocapitalize", r ? "on" : "off"), e.setAttribute("spellcheck", !!t);
      }
      function fa() {
        var e = c("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), t = c("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return I ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), oe && (e.style.border = "1px solid black"), t;
      }
      function pu(e) {
        var t = e.optionHandlers, n = e.helpers = {};
        e.prototype = {
          constructor: e,
          focus: function() {
            Q(this).focus(), this.display.input.focus();
          },
          setOption: function(r, i) {
            var o = this.options, l = o[r];
            o[r] == i && r != "mode" || (o[r] = i, t.hasOwnProperty(r) && Xe(this, t[r])(this, i, l), Me(this, "optionChange", this, r));
          },
          getOption: function(r) {
            return this.options[r];
          },
          getDoc: function() {
            return this.doc;
          },
          addKeyMap: function(r, i) {
            this.state.keyMaps[i ? "push" : "unshift"](fi(r));
          },
          removeKeyMap: function(r) {
            for (var i = this.state.keyMaps, o = 0; o < i.length; ++o)
              if (i[o] == r || i[o].name == r)
                return i.splice(o, 1), !0;
          },
          addOverlay: it(function(r, i) {
            var o = r.token ? r : e.getMode(this.options, r);
            if (o.startState)
              throw new Error("Overlays may not be stateful.");
            y(
              this.state.overlays,
              {
                mode: o,
                modeSpec: r,
                opaque: i && i.opaque,
                priority: i && i.priority || 0
              },
              function(l) {
                return l.priority;
              }
            ), this.state.modeGen++, ct(this);
          }),
          removeOverlay: it(function(r) {
            for (var i = this.state.overlays, o = 0; o < i.length; ++o) {
              var l = i[o].modeSpec;
              if (l == r || typeof r == "string" && l.name == r) {
                i.splice(o, 1), this.state.modeGen++, ct(this);
                return;
              }
            }
          }),
          indentLine: it(function(r, i, o) {
            typeof i != "string" && typeof i != "number" && (i == null ? i = this.options.smartIndent ? "smart" : "prev" : i = i ? "add" : "subtract"), x(this.doc, r) && En(this, r, i, o);
          }),
          indentSelection: it(function(r) {
            for (var i = this.doc.sel.ranges, o = -1, l = 0; l < i.length; l++) {
              var a = i[l];
              if (a.empty())
                a.head.line > o && (En(this, a.head.line, r, !0), o = a.head.line, l == this.doc.sel.primIndex && qr(this));
              else {
                var s = a.from(), u = a.to(), h = Math.max(o, s.line);
                o = Math.min(this.lastLine(), u.line - (u.ch ? 0 : 1)) + 1;
                for (var p = h; p < o; ++p)
                  En(this, p, r);
                var g = this.doc.sel.ranges;
                s.ch == 0 && i.length == g.length && g[l].from().ch > 0 && $i(this.doc, l, new ye(s, g[l].to()), at);
              }
            }
          }),
          // Fetch the parser token for a given character. Useful for hacks
          // that want to inspect the mode state (say, for completion).
          getTokenAt: function(r, i) {
            return wo(this, r, i);
          },
          getLineTokens: function(r, i) {
            return wo(this, m(r), i, !0);
          },
          getTokenTypeAt: function(r) {
            r = V(this.doc, r);
            var i = yo(this, B(this.doc, r.line)), o = 0, l = (i.length - 1) / 2, a = r.ch, s;
            if (a == 0)
              s = i[2];
            else
              for (; ; ) {
                var u = o + l >> 1;
                if ((u ? i[u * 2 - 1] : 0) >= a)
                  l = u;
                else if (i[u * 2 + 1] < a)
                  o = u + 1;
                else {
                  s = i[u * 2 + 2];
                  break;
                }
              }
            var h = s ? s.indexOf("overlay ") : -1;
            return h < 0 ? s : h == 0 ? null : s.slice(0, h - 1);
          },
          getModeAt: function(r) {
            var i = this.doc.mode;
            return i.innerMode ? e.innerMode(i, this.getTokenAt(r).state).mode : i;
          },
          getHelper: function(r, i) {
            return this.getHelpers(r, i)[0];
          },
          getHelpers: function(r, i) {
            var o = [];
            if (!n.hasOwnProperty(i))
              return o;
            var l = n[i], a = this.getModeAt(r);
            if (typeof a[i] == "string")
              l[a[i]] && o.push(l[a[i]]);
            else if (a[i])
              for (var s = 0; s < a[i].length; s++) {
                var u = l[a[i][s]];
                u && o.push(u);
              }
            else a.helperType && l[a.helperType] ? o.push(l[a.helperType]) : l[a.name] && o.push(l[a.name]);
            for (var h = 0; h < l._global.length; h++) {
              var p = l._global[h];
              p.pred(a, this) && R(o, p.val) == -1 && o.push(p.val);
            }
            return o;
          },
          getStateAfter: function(r, i) {
            var o = this.doc;
            return r = po(o, r ?? o.first + o.size - 1), un(this, r + 1, i).state;
          },
          cursorCoords: function(r, i) {
            var o, l = this.doc.sel.primary();
            return r == null ? o = l.head : typeof r == "object" ? o = V(this.doc, r) : o = r ? l.from() : l.to(), Et(this, o, i || "page");
          },
          charCoords: function(r, i) {
            return Zn(this, V(this.doc, r), i || "page");
          },
          coordsChar: function(r, i) {
            return r = Zo(this, r, i || "page"), Wi(this, r.left, r.top);
          },
          lineAtHeight: function(r, i) {
            return r = Zo(this, { top: r, left: 0 }, i || "page").top, d(this.doc, r + this.display.viewOffset);
          },
          heightAtLine: function(r, i, o) {
            var l = !1, a;
            if (typeof r == "number") {
              var s = this.doc.first + this.doc.size - 1;
              r < this.doc.first ? r = this.doc.first : r > s && (r = s, l = !0), a = B(this.doc, r);
            } else
              a = r;
            return jn(this, a, { top: 0, left: 0 }, i || "page", o || l).top + (l ? this.doc.height - Jt(a) : 0);
          },
          defaultTextHeight: function() {
            return _r(this.display);
          },
          defaultCharWidth: function() {
            return Ur(this.display);
          },
          getViewport: function() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          },
          addWidget: function(r, i, o, l, a) {
            var s = this.display;
            r = Et(this, V(this.doc, r));
            var u = r.bottom, h = r.left;
            if (i.style.position = "absolute", i.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(i), s.sizer.appendChild(i), l == "over")
              u = r.top;
            else if (l == "above" || l == "near") {
              var p = Math.max(s.wrapper.clientHeight, this.doc.height), g = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
              (l == "above" || r.bottom + i.offsetHeight > p) && r.top > i.offsetHeight ? u = r.top - i.offsetHeight : r.bottom + i.offsetHeight <= p && (u = r.bottom), h + i.offsetWidth > g && (h = g - i.offsetWidth);
            }
            i.style.top = u + "px", i.style.left = i.style.right = "", a == "right" ? (h = s.sizer.clientWidth - i.offsetWidth, i.style.right = "0px") : (a == "left" ? h = 0 : a == "middle" && (h = (s.sizer.clientWidth - i.offsetWidth) / 2), i.style.left = h + "px"), o && cs(this, { left: h, top: u, right: h + i.offsetWidth, bottom: u + i.offsetHeight });
          },
          triggerOnKeyDown: it(Vl),
          triggerOnKeyPress: it(ea),
          triggerOnKeyUp: $l,
          triggerOnMouseDown: it(ta),
          execCommand: function(r) {
            if (Dn.hasOwnProperty(r))
              return Dn[r].call(null, this);
          },
          triggerElectric: it(function(r) {
            sa(this, r);
          }),
          findPosH: function(r, i, o, l) {
            var a = 1;
            i < 0 && (a = -1, i = -i);
            for (var s = V(this.doc, r), u = 0; u < i && (s = uo(this.doc, s, a, o, l), !s.hitSide); ++u)
              ;
            return s;
          },
          moveH: it(function(r, i) {
            var o = this;
            this.extendSelectionsBy(function(l) {
              return o.display.shift || o.doc.extend || l.empty() ? uo(o.doc, l.head, r, i, o.options.rtlMoveVisually) : r < 0 ? l.from() : l.to();
            }, ve);
          }),
          deleteH: it(function(r, i) {
            var o = this.doc.sel, l = this.doc;
            o.somethingSelected() ? l.replaceSelection("", null, "+delete") : $r(this, function(a) {
              var s = uo(l, a.head, r, i, !1);
              return r < 0 ? { from: s, to: a.head } : { from: a.head, to: s };
            });
          }),
          findPosV: function(r, i, o, l) {
            var a = 1, s = l;
            i < 0 && (a = -1, i = -i);
            for (var u = V(this.doc, r), h = 0; h < i; ++h) {
              var p = Et(this, u, "div");
              if (s == null ? s = p.left : p.left = s, u = ca(this, p, a, o), u.hitSide)
                break;
            }
            return u;
          },
          moveV: it(function(r, i) {
            var o = this, l = this.doc, a = [], s = !this.display.shift && !l.extend && l.sel.somethingSelected();
            if (l.extendSelectionsBy(function(h) {
              if (s)
                return r < 0 ? h.from() : h.to();
              var p = Et(o, h.head, "div");
              h.goalColumn != null && (p.left = h.goalColumn), a.push(p.left);
              var g = ca(o, p, r, i);
              return i == "page" && h == l.sel.primary() && _i(o, Zn(o, g, "div").top - p.top), g;
            }, ve), a.length)
              for (var u = 0; u < l.sel.ranges.length; u++)
                l.sel.ranges[u].goalColumn = a[u];
          }),
          // Find the word at the given position (as returned by coordsChar).
          findWordAt: function(r) {
            var i = this.doc, o = B(i, r.line).text, l = r.ch, a = r.ch;
            if (o) {
              var s = this.getHelper(r, "wordChars");
              (r.sticky == "before" || a == o.length) && l ? --l : ++a;
              for (var u = o.charAt(l), h = qt(u, s) ? function(p) {
                return qt(p, s);
              } : /\s/.test(u) ? function(p) {
                return /\s/.test(p);
              } : function(p) {
                return !/\s/.test(p) && !qt(p);
              }; l > 0 && h(o.charAt(l - 1)); )
                --l;
              for (; a < o.length && h(o.charAt(a)); )
                ++a;
            }
            return new ye(m(r.line, l), m(r.line, a));
          },
          toggleOverwrite: function(r) {
            r != null && r == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? Pe(this.display.cursorDiv, "CodeMirror-overwrite") : Le(this.display.cursorDiv, "CodeMirror-overwrite"), Me(this, "overwriteToggle", this, this.state.overwrite));
          },
          hasFocus: function() {
            return this.display.input.getField() == pe(gt(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: it(function(r, i) {
            gn(this, r, i);
          }),
          getScrollInfo: function() {
            var r = this.display.scroller;
            return {
              left: r.scrollLeft,
              top: r.scrollTop,
              height: r.scrollHeight - Kt(this) - this.display.barHeight,
              width: r.scrollWidth - Kt(this) - this.display.barWidth,
              clientHeight: Ni(this),
              clientWidth: br(this)
            };
          },
          scrollIntoView: it(function(r, i) {
            r == null ? (r = { from: this.doc.sel.primary().head, to: null }, i == null && (i = this.options.cursorScrollMargin)) : typeof r == "number" ? r = { from: m(r, 0), to: null } : r.from == null && (r = { from: r, to: null }), r.to || (r.to = r.from), r.margin = i || 0, r.from.line != null ? hs(this, r) : il(this, r.from, r.to, r.margin);
          }),
          setSize: it(function(r, i) {
            var o = this, l = function(s) {
              return typeof s == "number" || /^\d+$/.test(String(s)) ? s + "px" : s;
            };
            r != null && (this.display.wrapper.style.width = l(r)), i != null && (this.display.wrapper.style.height = l(i)), this.options.lineWrapping && Xo(this);
            var a = this.display.viewFrom;
            this.doc.iter(a, this.display.viewTo, function(s) {
              if (s.widgets) {
                for (var u = 0; u < s.widgets.length; u++)
                  if (s.widgets[u].noHScroll) {
                    ur(o, a, "widget");
                    break;
                  }
              }
              ++a;
            }), this.curOp.forceUpdate = !0, Me(this, "refresh", this);
          }),
          operation: function(r) {
            return mt(this, r);
          },
          startOperation: function() {
            return Lr(this);
          },
          endOperation: function() {
            return Tr(this);
          },
          refresh: it(function() {
            var r = this.display.cachedTextHeight;
            ct(this), this.curOp.forceUpdate = !0, pn(this), gn(this, this.doc.scrollLeft, this.doc.scrollTop), qi(this.display), (r == null || Math.abs(r - _r(this.display)) > 0.5 || this.options.lineWrapping) && Hi(this), Me(this, "refresh", this);
          }),
          swapDoc: it(function(r) {
            var i = this.doc;
            return i.cm = null, this.state.selectingText && this.state.selectingText(), ml(this, r), pn(this), this.display.input.reset(), gn(this, r.scrollLeft, r.scrollTop), this.curOp.forceScroll = !0, qe(this, "swapDoc", this, i), i;
          }),
          phrase: function(r) {
            var i = this.options.phrases;
            return i && Object.prototype.hasOwnProperty.call(i, r) ? i[r] : r;
          },
          getInputField: function() {
            return this.display.input.getField();
          },
          getWrapperElement: function() {
            return this.display.wrapper;
          },
          getScrollerElement: function() {
            return this.display.scroller;
          },
          getGutterElement: function() {
            return this.display.gutters;
          }
        }, At(e), e.registerHelper = function(r, i, o) {
          n.hasOwnProperty(r) || (n[r] = e[r] = { _global: [] }), n[r][i] = o;
        }, e.registerGlobalHelper = function(r, i, o, l) {
          e.registerHelper(r, i, l), n[r]._global.push({ pred: o, val: l });
        };
      }
      function uo(e, t, n, r, i) {
        var o = t, l = n, a = B(e, t.line), s = i && e.direction == "rtl" ? -n : n;
        function u() {
          var P = t.line + s;
          return P < e.first || P >= e.first + e.size ? !1 : (t = new m(P, t.ch, t.sticky), a = B(e, P));
        }
        function h(P) {
          var O;
          if (r == "codepoint") {
            var H = a.text.charCodeAt(t.ch + (n > 0 ? 0 : -1));
            if (isNaN(H))
              O = null;
            else {
              var G = n > 0 ? H >= 55296 && H < 56320 : H >= 56320 && H < 57343;
              O = new m(t.line, Math.max(0, Math.min(a.text.length, t.ch + n * (G ? 2 : 1))), -n);
            }
          } else i ? O = Zs(e.cm, a, t, n) : O = to(a, t, n);
          if (O == null)
            if (!P && u())
              t = ro(i, e.cm, a, t.line, s);
            else
              return !1;
          else
            t = O;
          return !0;
        }
        if (r == "char" || r == "codepoint")
          h();
        else if (r == "column")
          h(!0);
        else if (r == "word" || r == "group")
          for (var p = null, g = r == "group", v = e.cm && e.cm.getHelper(t, "wordChars"), b = !0; !(n < 0 && !h(!b)); b = !1) {
            var S = a.text.charAt(t.ch) || `
`, L = qt(S, v) ? "w" : g && S == `
` ? "n" : !g || /\s/.test(S) ? null : "p";
            if (g && !b && !L && (L = "s"), p && p != L) {
              n < 0 && (n = 1, h(), t.sticky = "after");
              break;
            }
            if (L && (p = L), n > 0 && !h(!b))
              break;
          }
        var A = ai(e, t, o, l, !0);
        return ge(o, A) && (A.hitSide = !0), A;
      }
      function ca(e, t, n, r) {
        var i = e.doc, o = t.left, l;
        if (r == "page") {
          var a = Math.min(e.display.wrapper.clientHeight, Q(e).innerHeight || i(e).documentElement.clientHeight), s = Math.max(a - 0.5 * _r(e.display), 3);
          l = (n > 0 ? t.bottom : t.top) + n * s;
        } else r == "line" && (l = n > 0 ? t.bottom + 3 : t.top - 3);
        for (var u; u = Wi(e, o, l), !!u.outside; ) {
          if (n < 0 ? l <= 0 : l >= i.height) {
            u.hitSide = !0;
            break;
          }
          l += n * 5;
        }
        return u;
      }
      var be = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new ee(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };
      be.prototype.init = function(e) {
        var t = this, n = this, r = n.cm, i = n.div = e.lineDiv;
        i.contentEditable = !0, so(i, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize);
        function o(a) {
          for (var s = a.target; s; s = s.parentNode) {
            if (s == i)
              return !0;
            if (/\bCodeMirror-(?:line)?widget\b/.test(s.className))
              break;
          }
          return !1;
        }
        U(i, "paste", function(a) {
          !o(a) || Ne(r, a) || aa(a, r) || N <= 11 && setTimeout(Xe(r, function() {
            return t.updateFromDOM();
          }), 20);
        }), U(i, "compositionstart", function(a) {
          t.composing = { data: a.data, done: !1 };
        }), U(i, "compositionupdate", function(a) {
          t.composing || (t.composing = { data: a.data, done: !1 });
        }), U(i, "compositionend", function(a) {
          t.composing && (a.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
        }), U(i, "touchstart", function() {
          return n.forceCompositionEnd();
        }), U(i, "input", function() {
          t.composing || t.readFromDOMSoon();
        });
        function l(a) {
          if (!(!o(a) || Ne(r, a))) {
            if (r.somethingSelected())
              di({ lineWise: !1, text: r.getSelections() }), a.type == "cut" && r.replaceSelection("", null, "cut");
            else if (r.options.lineWiseCopyCut) {
              var s = ua(r);
              di({ lineWise: !0, text: s.text }), a.type == "cut" && r.operation(function() {
                r.setSelections(s.ranges, 0, at), r.replaceSelection("", null, "cut");
              });
            } else
              return;
            if (a.clipboardData) {
              a.clipboardData.clearData();
              var u = Ft.text.join(`
`);
              if (a.clipboardData.setData("Text", u), a.clipboardData.getData("Text") == u) {
                a.preventDefault();
                return;
              }
            }
            var h = fa(), p = h.firstChild;
            so(p), r.display.lineSpace.insertBefore(h, r.display.lineSpace.firstChild), p.value = Ft.text.join(`
`);
            var g = pe(Se(i));
            Gt(p), setTimeout(function() {
              r.display.lineSpace.removeChild(h), g.focus(), g == i && n.showPrimarySelection();
            }, 50);
          }
        }
        U(i, "copy", l), U(i, "cut", l);
      }, be.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label");
      }, be.prototype.prepareSelection = function() {
        var e = tl(this.cm, !1);
        return e.focus = pe(Se(this.div)) == this.div, e;
      }, be.prototype.showSelection = function(e, t) {
        !e || !this.cm.display.view.length || ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, be.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, be.prototype.showPrimarySelection = function() {
        var e = this.getSelection(), t = this.cm, n = t.doc.sel.primary(), r = n.from(), i = n.to();
        if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || i.line < t.display.viewFrom) {
          e.removeAllRanges();
          return;
        }
        var o = pi(t, e.anchorNode, e.anchorOffset), l = pi(t, e.focusNode, e.focusOffset);
        if (!(o && !o.bad && l && !l.bad && D(Ir(o, l), r) == 0 && D(ft(o, l), i) == 0)) {
          var a = t.display.view, s = r.line >= t.display.viewFrom && ha(t, r) || { node: a[0].measure.map[2], offset: 0 }, u = i.line < t.display.viewTo && ha(t, i);
          if (!u) {
            var h = a[a.length - 1].measure, p = h.maps ? h.maps[h.maps.length - 1] : h.map;
            u = { node: p[p.length - 1], offset: p[p.length - 2] - p[p.length - 3] };
          }
          if (!s || !u) {
            e.removeAllRanges();
            return;
          }
          var g = e.rangeCount && e.getRangeAt(0), v;
          try {
            v = T(s.node, s.offset, u.offset, u.node);
          } catch {
          }
          v && (!fe && t.state.focused ? (e.collapse(s.node, s.offset), v.collapsed || (e.removeAllRanges(), e.addRange(v))) : (e.removeAllRanges(), e.addRange(v)), g && e.anchorNode == null ? e.addRange(g) : fe && this.startGracePeriod()), this.rememberSelection();
        }
      }, be.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, be.prototype.showMultipleSelections = function(e) {
        F(this.cm.display.cursorDiv, e.cursors), F(this.cm.display.selectionDiv, e.selection);
      }, be.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, be.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount)
          return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return q(this.div, t);
      }, be.prototype.focus = function() {
        this.cm.options.readOnly != "nocursor" && ((!this.selectionInEditor() || pe(Se(this.div)) != this.div) && this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, be.prototype.blur = function() {
        this.div.blur();
      }, be.prototype.getField = function() {
        return this.div;
      }, be.prototype.supportsTouch = function() {
        return !0;
      }, be.prototype.receivedFocus = function() {
        var e = this, t = this;
        this.selectionInEditor() ? setTimeout(function() {
          return e.pollSelection();
        }, 20) : mt(this.cm, function() {
          return t.cm.curOp.selectionChanged = !0;
        });
        function n() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, n));
        }
        this.polling.set(this.cm.options.pollInterval, n);
      }, be.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, be.prototype.pollSelection = function() {
        if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
          var e = this.getSelection(), t = this.cm;
          if ($ && _ && this.cm.display.gutterSpecs.length && vu(e.anchorNode)) {
            this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var n = pi(t, e.anchorNode, e.anchorOffset), r = pi(t, e.focusNode, e.focusOffset);
            n && r && mt(t, function() {
              tt(t.doc, cr(n, r), at), (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, be.prototype.pollContent = function() {
        this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e = this.cm, t = e.display, n = e.doc.sel.primary(), r = n.from(), i = n.to();
        if (r.ch == 0 && r.line > e.firstLine() && (r = m(r.line - 1, B(e.doc, r.line - 1).length)), i.ch == B(e.doc, i.line).text.length && i.line < e.lastLine() && (i = m(i.line + 1, 0)), r.line < t.viewFrom || i.line > t.viewTo - 1)
          return !1;
        var o, l, a;
        r.line == t.viewFrom || (o = kr(e, r.line)) == 0 ? (l = f(t.view[0].line), a = t.view[0].node) : (l = f(t.view[o].line), a = t.view[o - 1].node.nextSibling);
        var s = kr(e, i.line), u, h;
        if (s == t.view.length - 1 ? (u = t.viewTo - 1, h = t.lineDiv.lastChild) : (u = f(t.view[s + 1].line) - 1, h = t.view[s + 1].node.previousSibling), !a)
          return !1;
        for (var p = e.doc.splitLines(gu(e, a, h, l, u)), g = jt(e.doc, m(l, 0), m(u, B(e.doc, u).text.length)); p.length > 1 && g.length > 1; )
          if (ue(p) == ue(g))
            p.pop(), g.pop(), u--;
          else if (p[0] == g[0])
            p.shift(), g.shift(), l++;
          else
            break;
        for (var v = 0, b = 0, S = p[0], L = g[0], A = Math.min(S.length, L.length); v < A && S.charCodeAt(v) == L.charCodeAt(v); )
          ++v;
        for (var P = ue(p), O = ue(g), H = Math.min(
          P.length - (p.length == 1 ? v : 0),
          O.length - (g.length == 1 ? v : 0)
        ); b < H && P.charCodeAt(P.length - b - 1) == O.charCodeAt(O.length - b - 1); )
          ++b;
        if (p.length == 1 && g.length == 1 && l == r.line)
          for (; v && v > r.ch && P.charCodeAt(P.length - b - 1) == O.charCodeAt(O.length - b - 1); )
            v--, b++;
        p[p.length - 1] = P.slice(0, P.length - b).replace(/^\u200b+/, ""), p[0] = p[0].slice(v).replace(/\u200b+$/, "");
        var G = m(l, v), K = m(u, g.length ? ue(g).length - b : 0);
        if (p.length > 1 || p[0] || D(G, K))
          return Jr(e.doc, p, G, K, "+input"), !0;
      }, be.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      }, be.prototype.reset = function() {
        this.forceCompositionEnd();
      }, be.prototype.forceCompositionEnd = function() {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, be.prototype.readFromDOMSoon = function() {
        var e = this;
        this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
          if (e.readDOMTimeout = null, e.composing)
            if (e.composing.done)
              e.composing = null;
            else
              return;
          e.updateFromDOM();
        }, 80));
      }, be.prototype.updateFromDOM = function() {
        var e = this;
        (this.cm.isReadOnly() || !this.pollContent()) && mt(this.cm, function() {
          return ct(e.cm);
        });
      }, be.prototype.setUneditable = function(e) {
        e.contentEditable = "false";
      }, be.prototype.onKeyPress = function(e) {
        e.charCode == 0 || this.composing || (e.preventDefault(), this.cm.isReadOnly() || Xe(this.cm, ao)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0));
      }, be.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String(e != "nocursor");
      }, be.prototype.onContextMenu = function() {
      }, be.prototype.resetPosition = function() {
      }, be.prototype.needsContentAttribute = !0;
      function ha(e, t) {
        var n = Ai(e, t.line);
        if (!n || n.hidden)
          return null;
        var r = B(e.doc, t.line), i = Ko(n, r, t.line), o = se(r, e.doc.direction), l = "left";
        if (o) {
          var a = nr(o, t.ch);
          l = a % 2 ? "right" : "left";
        }
        var s = Go(i.map, t.ch, l);
        return s.offset = s.collapse == "right" ? s.end : s.start, s;
      }
      function vu(e) {
        for (var t = e; t; t = t.parentNode)
          if (/CodeMirror-gutter-wrapper/.test(t.className))
            return !0;
        return !1;
      }
      function tn(e, t) {
        return t && (e.bad = !0), e;
      }
      function gu(e, t, n, r, i) {
        var o = "", l = !1, a = e.doc.lineSeparator(), s = !1;
        function u(v) {
          return function(b) {
            return b.id == v;
          };
        }
        function h() {
          l && (o += a, s && (o += a), l = s = !1);
        }
        function p(v) {
          v && (h(), o += v);
        }
        function g(v) {
          if (v.nodeType == 1) {
            var b = v.getAttribute("cm-text");
            if (b) {
              p(b);
              return;
            }
            var S = v.getAttribute("cm-marker"), L;
            if (S) {
              var A = e.findMarks(m(r, 0), m(i + 1, 0), u(+S));
              A.length && (L = A[0].find(0)) && p(jt(e.doc, L.from, L.to).join(a));
              return;
            }
            if (v.getAttribute("contenteditable") == "false")
              return;
            var P = /^(pre|div|p|li|table|br)$/i.test(v.nodeName);
            if (!/^br$/i.test(v.nodeName) && v.textContent.length == 0)
              return;
            P && h();
            for (var O = 0; O < v.childNodes.length; O++)
              g(v.childNodes[O]);
            /^(pre|p)$/i.test(v.nodeName) && (s = !0), P && (l = !0);
          } else v.nodeType == 3 && p(v.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
        for (; g(t), t != n; )
          t = t.nextSibling, s = !1;
        return o;
      }
      function pi(e, t, n) {
        var r;
        if (t == e.display.lineDiv) {
          if (r = e.display.lineDiv.childNodes[n], !r)
            return tn(e.clipPos(m(e.display.viewTo - 1)), !0);
          t = null, n = 0;
        } else
          for (r = t; ; r = r.parentNode) {
            if (!r || r == e.display.lineDiv)
              return null;
            if (r.parentNode && r.parentNode == e.display.lineDiv)
              break;
          }
        for (var i = 0; i < e.display.view.length; i++) {
          var o = e.display.view[i];
          if (o.node == r)
            return yu(o, t, n);
        }
      }
      function yu(e, t, n) {
        var r = e.text.firstChild, i = !1;
        if (!t || !q(r, t))
          return tn(m(f(e.line), 0), !0);
        if (t == r && (i = !0, t = r.childNodes[n], n = 0, !t)) {
          var o = e.rest ? ue(e.rest) : e.line;
          return tn(m(f(o), o.text.length), i);
        }
        var l = t.nodeType == 3 ? t : null, a = t;
        for (!l && t.childNodes.length == 1 && t.firstChild.nodeType == 3 && (l = t.firstChild, n && (n = l.nodeValue.length)); a.parentNode != r; )
          a = a.parentNode;
        var s = e.measure, u = s.maps;
        function h(L, A, P) {
          for (var O = -1; O < (u ? u.length : 0); O++)
            for (var H = O < 0 ? s.map : u[O], G = 0; G < H.length; G += 3) {
              var K = H[G + 2];
              if (K == L || K == A) {
                var ne = f(O < 0 ? e.line : e.rest[O]), ke = H[G] + P;
                return (P < 0 || K != L) && (ke = H[G + (P ? 1 : 0)]), m(ne, ke);
              }
            }
        }
        var p = h(l, a, n);
        if (p)
          return tn(p, i);
        for (var g = a.nextSibling, v = l ? l.nodeValue.length - n : 0; g; g = g.nextSibling) {
          if (p = h(g, g.firstChild, 0), p)
            return tn(m(p.line, p.ch - v), i);
          v += g.textContent.length;
        }
        for (var b = a.previousSibling, S = n; b; b = b.previousSibling) {
          if (p = h(b, b.firstChild, -1), p)
            return tn(m(p.line, p.ch + S), i);
          S += b.textContent.length;
        }
      }
      var ze = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new ee(), this.hasSelection = !1, this.composing = null, this.resetting = !1;
      };
      ze.prototype.init = function(e) {
        var t = this, n = this, r = this.cm;
        this.createField(e);
        var i = this.textarea;
        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), oe && (i.style.width = "0px"), U(i, "input", function() {
          E && N >= 9 && t.hasSelection && (t.hasSelection = null), n.poll();
        }), U(i, "paste", function(l) {
          Ne(r, l) || aa(l, r) || (r.state.pasteIncoming = +/* @__PURE__ */ new Date(), n.fastPoll());
        });
        function o(l) {
          if (!Ne(r, l)) {
            if (r.somethingSelected())
              di({ lineWise: !1, text: r.getSelections() });
            else if (r.options.lineWiseCopyCut) {
              var a = ua(r);
              di({ lineWise: !0, text: a.text }), l.type == "cut" ? r.setSelections(a.ranges, null, at) : (n.prevInput = "", i.value = a.text.join(`
`), Gt(i));
            } else
              return;
            l.type == "cut" && (r.state.cutIncoming = +/* @__PURE__ */ new Date());
          }
        }
        U(i, "cut", o), U(i, "copy", o), U(e.scroller, "paste", function(l) {
          if (!(Qt(e, l) || Ne(r, l))) {
            if (!i.dispatchEvent) {
              r.state.pasteIncoming = +/* @__PURE__ */ new Date(), n.focus();
              return;
            }
            var a = new Event("paste");
            a.clipboardData = l.clipboardData, i.dispatchEvent(a);
          }
        }), U(e.lineSpace, "selectstart", function(l) {
          Qt(e, l) || et(l);
        }), U(i, "compositionstart", function() {
          var l = r.getCursor("from");
          n.composing && n.composing.range.clear(), n.composing = {
            start: l,
            range: r.markText(l, r.getCursor("to"), { className: "CodeMirror-composing" })
          };
        }), U(i, "compositionend", function() {
          n.composing && (n.poll(), n.composing.range.clear(), n.composing = null);
        });
      }, ze.prototype.createField = function(e) {
        this.wrapper = fa(), this.textarea = this.wrapper.firstChild;
        var t = this.cm.options;
        so(this.textarea, t.spellcheck, t.autocorrect, t.autocapitalize);
      }, ze.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label");
      }, ze.prototype.prepareSelection = function() {
        var e = this.cm, t = e.display, n = e.doc, r = tl(e);
        if (e.options.moveInputWithCursor) {
          var i = Et(e, n.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), l = t.lineDiv.getBoundingClientRect();
          r.teTop = Math.max(0, Math.min(
            t.wrapper.clientHeight - 10,
            i.top + l.top - o.top
          )), r.teLeft = Math.max(0, Math.min(
            t.wrapper.clientWidth - 10,
            i.left + l.left - o.left
          ));
        }
        return r;
      }, ze.prototype.showSelection = function(e) {
        var t = this.cm, n = t.display;
        F(n.cursorDiv, e.cursors), F(n.selectionDiv, e.selection), e.teTop != null && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, ze.prototype.reset = function(e) {
        if (!(this.contextMenuPending || this.composing && e)) {
          var t = this.cm;
          if (this.resetting = !0, t.somethingSelected()) {
            this.prevInput = "";
            var n = t.getSelection();
            this.textarea.value = n, t.state.focused && Gt(this.textarea), E && N >= 9 && (this.hasSelection = n);
          } else e || (this.prevInput = this.textarea.value = "", E && N >= 9 && (this.hasSelection = null));
          this.resetting = !1;
        }
      }, ze.prototype.getField = function() {
        return this.textarea;
      }, ze.prototype.supportsTouch = function() {
        return !1;
      }, ze.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!ae || pe(Se(this.textarea)) != this.textarea))
          try {
            this.textarea.focus();
          } catch {
          }
      }, ze.prototype.blur = function() {
        this.textarea.blur();
      }, ze.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, ze.prototype.receivedFocus = function() {
        this.slowPoll();
      }, ze.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, ze.prototype.fastPoll = function() {
        var e = !1, t = this;
        t.pollingFast = !0;
        function n() {
          var r = t.poll();
          !r && !e ? (e = !0, t.polling.set(60, n)) : (t.pollingFast = !1, t.slowPoll());
        }
        t.polling.set(20, n);
      }, ze.prototype.poll = function() {
        var e = this, t = this.cm, n = this.textarea, r = this.prevInput;
        if (this.contextMenuPending || this.resetting || !t.state.focused || lr(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq)
          return !1;
        var i = n.value;
        if (i == r && !t.somethingSelected())
          return !1;
        if (E && N >= 9 && this.hasSelection === i || me && /[\uf700-\uf7ff]/.test(i))
          return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
          var o = i.charCodeAt(0);
          if (o == 8203 && !r && (r = "​"), o == 8666)
            return this.reset(), this.cm.execCommand("undo");
        }
        for (var l = 0, a = Math.min(r.length, i.length); l < a && r.charCodeAt(l) == i.charCodeAt(l); )
          ++l;
        return mt(t, function() {
          ao(
            t,
            i.slice(l),
            r.length - l,
            null,
            e.composing ? "*compose" : null
          ), i.length > 1e3 || i.indexOf(`
`) > -1 ? n.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(
            e.composing.start,
            t.getCursor("to"),
            { className: "CodeMirror-composing" }
          ));
        }), !0;
      }, ze.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, ze.prototype.onKeyPress = function() {
        E && N >= 9 && (this.hasSelection = null), this.fastPoll();
      }, ze.prototype.onContextMenu = function(e) {
        var t = this, n = t.cm, r = n.display, i = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var o = xr(n, e), l = r.scroller.scrollTop;
        if (!o || le)
          return;
        var a = n.options.resetSelectionOnContextMenu;
        a && n.doc.sel.contains(o) == -1 && Xe(n, tt)(n.doc, cr(o), at);
        var s = i.style.cssText, u = t.wrapper.style.cssText, h = t.wrapper.offsetParent.getBoundingClientRect();
        t.wrapper.style.cssText = "position: static", i.style.cssText = `position: absolute; width: 30px; height: 30px;
      top: ` + (e.clientY - h.top - 5) + "px; left: " + (e.clientX - h.left - 5) + `px;
      z-index: 1000; background: ` + (E ? "rgba(255, 255, 255, .05)" : "transparent") + `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;
        var p;
        I && (p = i.ownerDocument.defaultView.scrollY), r.input.focus(), I && i.ownerDocument.defaultView.scrollTo(null, p), r.input.reset(), n.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = v, r.selForContextMenu = n.doc.sel, clearTimeout(r.detectingSelectAll);
        function g() {
          if (i.selectionStart != null) {
            var S = n.somethingSelected(), L = "​" + (S ? i.value : "");
            i.value = "⇚", i.value = L, t.prevInput = S ? "" : "​", i.selectionStart = 1, i.selectionEnd = L.length, r.selForContextMenu = n.doc.sel;
          }
        }
        function v() {
          if (t.contextMenuPending == v && (t.contextMenuPending = !1, t.wrapper.style.cssText = u, i.style.cssText = s, E && N < 9 && r.scrollbars.setScrollTop(r.scroller.scrollTop = l), i.selectionStart != null)) {
            (!E || E && N < 9) && g();
            var S = 0, L = function() {
              r.selForContextMenu == n.doc.sel && i.selectionStart == 0 && i.selectionEnd > 0 && t.prevInput == "​" ? Xe(n, Dl)(n) : S++ < 10 ? r.detectingSelectAll = setTimeout(L, 500) : (r.selForContextMenu = null, r.input.reset());
            };
            r.detectingSelectAll = setTimeout(L, 200);
          }
        }
        if (E && N >= 9 && g(), J) {
          ir(e);
          var b = function() {
            $e(window, "mouseup", b), setTimeout(v, 20);
          };
          U(window, "mouseup", b);
        } else
          setTimeout(v, 50);
      }, ze.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = e == "nocursor", this.textarea.readOnly = !!e;
      }, ze.prototype.setUneditable = function() {
      }, ze.prototype.needsContentAttribute = !1;
      function mu(e, t) {
        if (t = t ? re(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), t.autofocus == null) {
          var n = pe(Se(e));
          t.autofocus = n == e || e.getAttribute("autofocus") != null && n == document.body;
        }
        function r() {
          e.value = a.getValue();
        }
        var i;
        if (e.form && (U(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
          var o = e.form;
          i = o.submit;
          try {
            var l = o.submit = function() {
              r(), o.submit = i, o.submit(), o.submit = l;
            };
          } catch {
          }
        }
        t.finishInit = function(s) {
          s.save = r, s.getTextArea = function() {
            return e;
          }, s.toTextArea = function() {
            s.toTextArea = isNaN, r(), e.parentNode.removeChild(s.getWrapperElement()), e.style.display = "", e.form && ($e(e.form, "submit", r), !t.leaveSubmitMethodAlone && typeof e.form.submit == "function" && (e.form.submit = i));
          };
        }, e.style.display = "none";
        var a = Ce(
          function(s) {
            return e.parentNode.insertBefore(s, e.nextSibling);
          },
          t
        );
        return a;
      }
      function bu(e) {
        e.off = $e, e.on = U, e.wheelEventPixels = Ts, e.Doc = ht, e.splitLines = Tt, e.countColumn = ce, e.findColumn = Ee, e.isWordChar = Ve, e.Pass = Nt, e.signal = Me, e.Line = Br, e.changeEnd = hr, e.scrollbarModel = al, e.Pos = m, e.cmpPos = D, e.modes = Pr, e.mimeModes = Wt, e.resolveMode = zr, e.getMode = Er, e.modeExtensions = ar, e.extendMode = Hr, e.copyState = Bt, e.startState = Fr, e.innerMode = an, e.commands = Dn, e.keyMap = $t, e.keyName = Yl, e.isModifierKey = ql, e.lookupKey = Vr, e.normalizeKeyMap = js, e.StringStream = Ae, e.SharedTextMarker = Nn, e.TextMarker = pr, e.LineWidget = Mn, e.e_preventDefault = et, e.e_stopPropagation = Dr, e.e_stop = ir, e.addClass = Pe, e.contains = q, e.rmClass = Le, e.keyNames = vr;
      }
      fu(Ce), pu(Ce);
      var wu = "iter insert remove copy getEditor constructor".split(" ");
      for (var vi in ht.prototype)
        ht.prototype.hasOwnProperty(vi) && R(wu, vi) < 0 && (Ce.prototype[vi] = /* @__PURE__ */ function(e) {
          return function() {
            return e.apply(this.doc, arguments);
          };
        }(ht.prototype[vi]));
      return At(ht), Ce.inputStyles = { textarea: ze, contenteditable: be }, Ce.defineMode = function(e) {
        !Ce.defaults.mode && e != "null" && (Ce.defaults.mode = e), Pt.apply(this, arguments);
      }, Ce.defineMIME = mr, Ce.defineMode("null", function() {
        return { token: function(e) {
          return e.skipToEnd();
        } };
      }), Ce.defineMIME("text/plain", "null"), Ce.defineExtension = function(e, t) {
        Ce.prototype[e] = t;
      }, Ce.defineDocExtension = function(e, t) {
        ht.prototype[e] = t;
      }, Ce.fromTextArea = mu, bu(Ce), Ce.version = "5.65.18", Ce;
    });
  }(ho)), ho.exports;
}
var Su = Ar();
const Lu = /* @__PURE__ */ ku(Su);
var pa = { exports: {} }, va;
function wa() {
  return va || (va = 1, function(wt, Or) {
    (function(z) {
      z(Ar());
    })(function(z) {
      z.defineMode("javascript", function(xe, fe) {
        var te = xe.indentUnit, Z = fe.statementIndent, de = fe.jsonld, E = fe.json || de, N = fe.trackScope !== !1, I = fe.typescript, X = fe.wordCharacters || /[\w$\xa1-\uffff]/, _ = function() {
          function f(Ge) {
            return { type: Ge, style: "keyword" };
          }
          var d = f("keyword a"), x = f("keyword b"), C = f("keyword c"), m = f("keyword d"), D = f("operator"), ge = { type: "atom", style: "atom" };
          return {
            if: f("if"),
            while: d,
            with: d,
            else: x,
            do: x,
            try: x,
            finally: x,
            return: m,
            break: m,
            continue: m,
            new: f("new"),
            delete: C,
            void: C,
            throw: C,
            debugger: f("debugger"),
            var: f("var"),
            const: f("var"),
            let: f("var"),
            function: f("function"),
            catch: f("catch"),
            for: f("for"),
            switch: f("switch"),
            case: f("case"),
            default: f("default"),
            in: D,
            typeof: D,
            instanceof: D,
            true: ge,
            false: ge,
            null: ge,
            undefined: ge,
            NaN: ge,
            Infinity: ge,
            this: f("this"),
            class: f("class"),
            super: f("atom"),
            yield: C,
            export: f("export"),
            import: f("import"),
            extends: C,
            await: C
          };
        }(), ie = /[+\-*&%=<>!?|~^@]/, le = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
        function De(f) {
          for (var d = !1, x, C = !1; (x = f.next()) != null; ) {
            if (!d) {
              if (x == "/" && !C) return;
              x == "[" ? C = !0 : C && x == "]" && (C = !1);
            }
            d = !d && x == "\\";
          }
        }
        var We, Be;
        function oe(f, d, x) {
          return We = f, Be = x, d;
        }
        function $(f, d) {
          var x = f.next();
          if (x == '"' || x == "'")
            return d.tokenize = ae(x), d.tokenize(f, d);
          if (x == "." && f.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))
            return oe("number", "number");
          if (x == "." && f.match(".."))
            return oe("spread", "meta");
          if (/[\[\]{}\(\),;\:\.]/.test(x))
            return oe(x);
          if (x == "=" && f.eat(">"))
            return oe("=>", "operator");
          if (x == "0" && f.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))
            return oe("number", "number");
          if (/\d/.test(x))
            return f.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), oe("number", "number");
          if (x == "/")
            return f.eat("*") ? (d.tokenize = me, me(f, d)) : f.eat("/") ? (f.skipToEnd(), oe("comment", "comment")) : St(f, d, 1) ? (De(f), f.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), oe("regexp", "string-2")) : (f.eat("="), oe("operator", "operator", f.current()));
          if (x == "`")
            return d.tokenize = Ue, Ue(f, d);
          if (x == "#" && f.peek() == "!")
            return f.skipToEnd(), oe("meta", "meta");
          if (x == "#" && f.eatWhile(X))
            return oe("variable", "property");
          if (x == "<" && f.match("!--") || x == "-" && f.match("->") && !/\S/.test(f.string.slice(0, f.start)))
            return f.skipToEnd(), oe("comment", "comment");
          if (ie.test(x))
            return (x != ">" || !d.lexical || d.lexical.type != ">") && (f.eat("=") ? (x == "!" || x == "=") && f.eat("=") : /[<>*+\-|&?]/.test(x) && (f.eat(x), x == ">" && f.eat(x))), x == "?" && f.eat(".") ? oe(".") : oe("operator", "operator", f.current());
          if (X.test(x)) {
            f.eatWhile(X);
            var C = f.current();
            if (d.lastType != ".") {
              if (_.propertyIsEnumerable(C)) {
                var m = _[C];
                return oe(m.type, m.style, C);
              }
              if (C == "async" && f.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1))
                return oe("async", "keyword", C);
            }
            return oe("variable", "variable", C);
          }
        }
        function ae(f) {
          return function(d, x) {
            var C = !1, m;
            if (de && d.peek() == "@" && d.match(le))
              return x.tokenize = $, oe("jsonld-keyword", "meta");
            for (; (m = d.next()) != null && !(m == f && !C); )
              C = !C && m == "\\";
            return C || (x.tokenize = $), oe("string", "string");
          };
        }
        function me(f, d) {
          for (var x = !1, C; C = f.next(); ) {
            if (C == "/" && x) {
              d.tokenize = $;
              break;
            }
            x = C == "*";
          }
          return oe("comment", "comment");
        }
        function Ue(f, d) {
          for (var x = !1, C; (C = f.next()) != null; ) {
            if (!x && (C == "`" || C == "$" && f.eat("{"))) {
              d.tokenize = $;
              break;
            }
            x = !x && C == "\\";
          }
          return oe("quasi", "string-2", f.current());
        }
        var lt = "([{}])";
        function Re(f, d) {
          d.fatArrowAt && (d.fatArrowAt = null);
          var x = f.string.indexOf("=>", f.start);
          if (!(x < 0)) {
            if (I) {
              var C = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(f.string.slice(f.start, x));
              C && (x = C.index);
            }
            for (var m = 0, D = !1, ge = x - 1; ge >= 0; --ge) {
              var Ge = f.string.charAt(ge), ft = lt.indexOf(Ge);
              if (ft >= 0 && ft < 3) {
                if (!m) {
                  ++ge;
                  break;
                }
                if (--m == 0) {
                  Ge == "(" && (D = !0);
                  break;
                }
              } else if (ft >= 3 && ft < 6)
                ++m;
              else if (X.test(Ge))
                D = !0;
              else if (/["'\/`]/.test(Ge))
                for (; ; --ge) {
                  if (ge == 0) return;
                  var Ir = f.string.charAt(ge - 1);
                  if (Ir == Ge && f.string.charAt(ge - 2) != "\\") {
                    ge--;
                    break;
                  }
                }
              else if (D && !m) {
                ++ge;
                break;
              }
            }
            D && !m && (d.fatArrowAt = ge);
          }
        }
        var Ke = {
          atom: !0,
          number: !0,
          variable: !0,
          string: !0,
          regexp: !0,
          this: !0,
          import: !0,
          "jsonld-keyword": !0
        };
        function J(f, d, x, C, m, D) {
          this.indented = f, this.column = d, this.type = x, this.prev = m, this.info = D, C != null && (this.align = C);
        }
        function Y(f, d) {
          if (!N) return !1;
          for (var x = f.localVars; x; x = x.next)
            if (x.name == d) return !0;
          for (var C = f.context; C; C = C.prev)
            for (var x = C.vars; x; x = x.next)
              if (x.name == d) return !0;
        }
        function Le(f, d, x, C, m) {
          var D = f.cc;
          for (k.state = f, k.stream = m, k.marked = null, k.cc = D, k.style = d, f.lexical.hasOwnProperty("align") || (f.lexical.align = !0); ; ) {
            var ge = D.length ? D.pop() : E ? R : ce;
            if (ge(x, C)) {
              for (; D.length && D[D.length - 1].lex; )
                D.pop()();
              return k.marked ? k.marked : x == "variable" && Y(f, C) ? "variable-2" : d;
            }
          }
        }
        var k = { state: null, column: null, marked: null, cc: null };
        function F() {
          for (var f = arguments.length - 1; f >= 0; f--) k.cc.push(arguments[f]);
        }
        function c() {
          return F.apply(null, arguments), !0;
        }
        function W(f, d) {
          for (var x = d; x; x = x.next) if (x.name == f) return !0;
          return !1;
        }
        function T(f) {
          var d = k.state;
          if (k.marked = "def", !!N) {
            if (d.context) {
              if (d.lexical.info == "var" && d.context && d.context.block) {
                var x = q(f, d.context);
                if (x != null) {
                  d.context = x;
                  return;
                }
              } else if (!W(f, d.localVars)) {
                d.localVars = new Mt(f, d.localVars);
                return;
              }
            }
            fe.globalVars && !W(f, d.globalVars) && (d.globalVars = new Mt(f, d.globalVars));
          }
        }
        function q(f, d) {
          if (d)
            if (d.block) {
              var x = q(f, d.prev);
              return x ? x == d.prev ? d : new Pe(x, d.vars, !0) : null;
            } else return W(f, d.vars) ? d : new Pe(d.prev, new Mt(f, d.vars), !1);
          else return null;
        }
        function pe(f) {
          return f == "public" || f == "private" || f == "protected" || f == "abstract" || f == "readonly";
        }
        function Pe(f, d, x) {
          this.prev = f, this.vars = d, this.block = x;
        }
        function Mt(f, d) {
          this.name = f, this.next = d;
        }
        var Gt = new Mt("this", new Mt("arguments", null));
        function nt() {
          k.state.context = new Pe(k.state.context, k.state.localVars, !1), k.state.localVars = Gt;
        }
        function gt() {
          k.state.context = new Pe(k.state.context, k.state.localVars, !0), k.state.localVars = null;
        }
        nt.lex = gt.lex = !0;
        function Se() {
          k.state.localVars = k.state.context.vars, k.state.context = k.state.context.prev;
        }
        Se.lex = !0;
        function Q(f, d) {
          var x = function() {
            var C = k.state, m = C.indented;
            if (C.lexical.type == "stat") m = C.lexical.indented;
            else for (var D = C.lexical; D && D.type == ")" && D.align; D = D.prev)
              m = D.indented;
            C.lexical = new J(m, k.stream.column(), f, null, C.lexical, d);
          };
          return x.lex = !0, x;
        }
        function j() {
          var f = k.state;
          f.lexical.prev && (f.lexical.type == ")" && (f.indented = f.lexical.indented), f.lexical = f.lexical.prev);
        }
        j.lex = !0;
        function re(f) {
          function d(x) {
            return x == f ? c() : f == ";" || x == "}" || x == ")" || x == "]" ? F() : c(d);
          }
          return d;
        }
        function ce(f, d) {
          return f == "var" ? c(Q("vardef", d), Dr, re(";"), j) : f == "keyword a" ? c(Q("form"), Nt, ce, j) : f == "keyword b" ? c(Q("form"), ce, j) : f == "keyword d" ? k.stream.match(/^\s*$/, !1) ? c() : c(Q("stat"), xt, re(";"), j) : f == "debugger" ? c(re(";")) : f == "{" ? c(Q("}"), gt, It, j, Se) : f == ";" ? c() : f == "if" ? (k.state.lexical.info == "else" && k.state.cc[k.state.cc.length - 1] == j && k.state.cc.pop()(), c(Q("form"), Nt, ce, j, Wr)) : f == "function" ? c(Tt) : f == "for" ? c(Q("form"), gt, In, ce, Se, j) : f == "class" || I && d == "interface" ? (k.marked = "keyword", c(Q("form", f == "class" ? f : d), Pr, j)) : f == "variable" ? I && d == "declare" ? (k.marked = "keyword", c(ce)) : I && (d == "module" || d == "enum" || d == "type") && k.stream.match(/^\s*\w/, !1) ? (k.marked = "keyword", d == "enum" ? c(B) : d == "type" ? c(Bn, re("operator"), se, re(";")) : c(Q("form"), ut, re("{"), Q("}"), It, j, j)) : I && d == "namespace" ? (k.marked = "keyword", c(Q("form"), R, ce, j)) : I && d == "abstract" ? (k.marked = "keyword", c(ce)) : c(Q("stat"), he) : f == "switch" ? c(
            Q("form"),
            Nt,
            re("{"),
            Q("}", "switch"),
            gt,
            It,
            j,
            j,
            Se
          ) : f == "case" ? c(R, re(":")) : f == "default" ? c(re(":")) : f == "catch" ? c(Q("form"), nt, ee, ce, j, Se) : f == "export" ? c(Q("stat"), zr, j) : f == "import" ? c(Q("stat"), ar, j) : f == "async" ? c(ce) : d == "@" ? c(R, ce) : F(Q("stat"), R, re(";"), j);
        }
        function ee(f) {
          if (f == "(") return c(Dt, re(")"));
        }
        function R(f, d) {
          return at(f, d, !1);
        }
        function Je(f, d) {
          return at(f, d, !0);
        }
        function Nt(f) {
          return f != "(" ? F() : c(Q(")"), xt, re(")"), j);
        }
        function at(f, d, x) {
          if (k.state.fatArrowAt == k.stream.start) {
            var C = x ? we : ue;
            if (f == "(") return c(nt, Q(")"), He(Dt, ")"), j, re("=>"), C, Se);
            if (f == "variable") return F(nt, ut, re("=>"), C, Se);
          }
          var m = x ? Ee : ve;
          return Ke.hasOwnProperty(f) ? c(m) : f == "function" ? c(Tt, m) : f == "class" || I && d == "interface" ? (k.marked = "keyword", c(Q("form"), mi, j)) : f == "keyword c" || f == "async" ? c(x ? Je : R) : f == "(" ? c(Q(")"), xt, re(")"), j, m) : f == "operator" || f == "spread" ? c(x ? Je : R) : f == "[" ? c(Q("]"), Ae, j, m) : f == "{" ? tr(qt, "}", null, m) : f == "quasi" ? F(st, m) : f == "new" ? c(y(x)) : c();
        }
        function xt(f) {
          return f.match(/[;\}\)\],]/) ? F() : F(R);
        }
        function ve(f, d) {
          return f == "," ? c(xt) : Ee(f, d, !1);
        }
        function Ee(f, d, x) {
          var C = x == !1 ? ve : Ee, m = x == !1 ? R : Je;
          if (f == "=>") return c(nt, x ? we : ue, Se);
          if (f == "operator")
            return /\+\+|--/.test(d) || I && d == "!" ? c(C) : I && d == "<" && k.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1) ? c(Q(">"), He(se, ">"), j, C) : d == "?" ? c(R, re(":"), m) : c(m);
          if (f == "quasi")
            return F(st, C);
          if (f != ";") {
            if (f == "(") return tr(Je, ")", "call", C);
            if (f == ".") return c(Ve, C);
            if (f == "[") return c(Q("]"), xt, re("]"), j, C);
            if (I && d == "as")
              return k.marked = "keyword", c(se, C);
            if (f == "regexp")
              return k.state.lastType = k.marked = "operator", k.stream.backUp(k.stream.pos - k.stream.start - 1), c(m);
          }
        }
        function st(f, d) {
          return f != "quasi" ? F() : d.slice(d.length - 2) != "${" ? c(st) : c(xt, kt);
        }
        function kt(f) {
          if (f == "}")
            return k.marked = "string-2", k.state.tokenize = Ue, c(st);
        }
        function ue(f) {
          return Re(k.stream, k.state), F(f == "{" ? ce : R);
        }
        function we(f) {
          return Re(k.stream, k.state), F(f == "{" ? ce : Je);
        }
        function y(f) {
          return function(d) {
            return d == "." ? c(f ? w : M) : d == "variable" && I ? c(yt, f ? Ee : ve) : F(f ? Je : R);
          };
        }
        function M(f, d) {
          if (d == "target")
            return k.marked = "keyword", c(ve);
        }
        function w(f, d) {
          if (d == "target")
            return k.marked = "keyword", c(Ee);
        }
        function he(f) {
          return f == ":" ? c(j, ce) : F(ve, re(";"), j);
        }
        function Ve(f) {
          if (f == "variable")
            return k.marked = "property", c();
        }
        function qt(f, d) {
          if (f == "async")
            return k.marked = "property", c(qt);
          if (f == "variable" || k.style == "keyword") {
            if (k.marked = "property", d == "get" || d == "set") return c(Hn);
            var x;
            return I && k.state.fatArrowAt == k.stream.start && (x = k.stream.match(/^\s*:\s*/, !1)) && (k.state.fatArrowAt = k.stream.pos + x[0].length), c(Xt);
          } else {
            if (f == "number" || f == "string")
              return k.marked = de ? "property" : k.style + " property", c(Xt);
            if (f == "jsonld-keyword")
              return c(Xt);
            if (I && pe(d))
              return k.marked = "keyword", c(qt);
            if (f == "[")
              return c(R, rr, re("]"), Xt);
            if (f == "spread")
              return c(Je, Xt);
            if (d == "*")
              return k.marked = "keyword", c(qt);
            if (f == ":")
              return F(Xt);
          }
        }
        function Hn(f) {
          return f != "variable" ? F(Xt) : (k.marked = "property", c(Tt));
        }
        function Xt(f) {
          if (f == ":") return c(Je);
          if (f == "(") return F(Tt);
        }
        function He(f, d, x) {
          function C(m, D) {
            if (x ? x.indexOf(m) > -1 : m == ",") {
              var ge = k.state.lexical;
              return ge.info == "call" && (ge.pos = (ge.pos || 0) + 1), c(function(Ge, ft) {
                return Ge == d || ft == d ? F() : F(f);
              }, C);
            }
            return m == d || D == d ? c() : x && x.indexOf(";") > -1 ? F(f) : c(re(d));
          }
          return function(m, D) {
            return m == d || D == d ? c() : F(f, C);
          };
        }
        function tr(f, d, x) {
          for (var C = 3; C < arguments.length; C++)
            k.cc.push(arguments[C]);
          return c(Q(d, x), He(f, d), j);
        }
        function It(f) {
          return f == "}" ? c() : F(ce, It);
        }
        function rr(f, d) {
          if (I) {
            if (f == ":") return c(se);
            if (d == "?") return c(rr);
          }
        }
        function yr(f, d) {
          if (I && (f == ":" || d == "in")) return c(se);
        }
        function nr(f) {
          if (I && f == ":")
            return k.stream.match(/^\s*\w+\s+is\b/, !1) ? c(R, gi, se) : c(se);
        }
        function gi(f, d) {
          if (d == "is")
            return k.marked = "keyword", c();
        }
        function se(f, d) {
          if (d == "keyof" || d == "typeof" || d == "infer" || d == "readonly")
            return k.marked = "keyword", c(d == "typeof" ? Je : se);
          if (f == "variable" || d == "void")
            return k.marked = "type", c(Lt);
          if (d == "|" || d == "&") return c(se);
          if (f == "string" || f == "number" || f == "atom") return c(Lt);
          if (f == "[") return c(Q("]"), He(se, "]", ","), j, Lt);
          if (f == "{") return c(Q("}"), U, j, Lt);
          if (f == "(") return c(He(Ne, ")"), Fn, Lt);
          if (f == "<") return c(He(se, ">"), se);
          if (f == "quasi")
            return F($e, Lt);
        }
        function Fn(f) {
          if (f == "=>") return c(se);
        }
        function U(f) {
          return f.match(/[\}\)\]]/) ? c() : f == "," || f == ";" ? c(U) : F(Yt, U);
        }
        function Yt(f, d) {
          if (f == "variable" || k.style == "keyword")
            return k.marked = "property", c(Yt);
          if (d == "?" || f == "number" || f == "string")
            return c(Yt);
          if (f == ":")
            return c(se);
          if (f == "[")
            return c(re("variable"), yr, re("]"), Yt);
          if (f == "(")
            return F(lr, Yt);
          if (!f.match(/[;\}\)\],]/))
            return c();
        }
        function $e(f, d) {
          return f != "quasi" ? F() : d.slice(d.length - 2) != "${" ? c($e) : c(se, Me);
        }
        function Me(f) {
          if (f == "}")
            return k.marked = "string-2", k.state.tokenize = Ue, c($e);
        }
        function Ne(f, d) {
          return f == "variable" && k.stream.match(/^\s*[?:]/, !1) || d == "?" ? c(Ne) : f == ":" ? c(se) : f == "spread" ? c(Ne) : F(se);
        }
        function Lt(f, d) {
          if (d == "<") return c(Q(">"), He(se, ">"), j, Lt);
          if (d == "|" || f == "." || d == "&") return c(se);
          if (f == "[") return c(se, re("]"), Lt);
          if (d == "extends" || d == "implements")
            return k.marked = "keyword", c(se);
          if (d == "?") return c(se, re(":"), se);
        }
        function yt(f, d) {
          if (d == "<") return c(Q(">"), He(se, ">"), j, Lt);
        }
        function At() {
          return F(se, et);
        }
        function et(f, d) {
          if (d == "=") return c(se);
        }
        function Dr(f, d) {
          return d == "enum" ? (k.marked = "keyword", c(B)) : F(ut, rr, Ot, yi);
        }
        function ut(f, d) {
          if (I && pe(d))
            return k.marked = "keyword", c(ut);
          if (f == "variable")
            return T(d), c();
          if (f == "spread") return c(ut);
          if (f == "[") return tr(on, "]");
          if (f == "{") return tr(ir, "}");
        }
        function ir(f, d) {
          return f == "variable" && !k.stream.match(/^\s*:/, !1) ? (T(d), c(Ot)) : (f == "variable" && (k.marked = "property"), f == "spread" ? c(ut) : f == "}" ? F() : f == "[" ? c(R, re("]"), re(":"), ir) : c(re(":"), ut, Ot));
        }
        function on() {
          return F(ut, Ot);
        }
        function Ot(f, d) {
          if (d == "=") return c(Je);
        }
        function yi(f) {
          if (f == ",") return c(Dr);
        }
        function Wr(f, d) {
          if (f == "keyword b" && d == "else") return c(Q("form", "else"), ce, j);
        }
        function In(f, d) {
          if (d == "await") return c(In);
          if (f == "(") return c(Q(")"), ln, j);
        }
        function ln(f) {
          return f == "var" ? c(Dr, or) : f == "variable" ? c(or) : F(or);
        }
        function or(f, d) {
          return f == ")" ? c() : f == ";" ? c(or) : d == "in" || d == "of" ? (k.marked = "keyword", c(R, or)) : F(R, or);
        }
        function Tt(f, d) {
          if (d == "*")
            return k.marked = "keyword", c(Tt);
          if (f == "variable")
            return T(d), c(Tt);
          if (f == "(") return c(nt, Q(")"), He(Dt, ")"), j, nr, ce, Se);
          if (I && d == "<") return c(Q(">"), He(At, ">"), j, Tt);
        }
        function lr(f, d) {
          if (d == "*")
            return k.marked = "keyword", c(lr);
          if (f == "variable")
            return T(d), c(lr);
          if (f == "(") return c(nt, Q(")"), He(Dt, ")"), j, nr, Se);
          if (I && d == "<") return c(Q(">"), He(At, ">"), j, lr);
        }
        function Bn(f, d) {
          if (f == "keyword" || f == "variable")
            return k.marked = "type", c(Bn);
          if (d == "<")
            return c(Q(">"), He(At, ">"), j);
        }
        function Dt(f, d) {
          return d == "@" && c(R, Dt), f == "spread" ? c(Dt) : I && pe(d) ? (k.marked = "keyword", c(Dt)) : I && f == "this" ? c(rr, Ot) : F(ut, rr, Ot);
        }
        function mi(f, d) {
          return f == "variable" ? Pr(f, d) : Wt(f, d);
        }
        function Pr(f, d) {
          if (f == "variable")
            return T(d), c(Wt);
        }
        function Wt(f, d) {
          if (d == "<") return c(Q(">"), He(At, ">"), j, Wt);
          if (d == "extends" || d == "implements" || I && f == ",")
            return d == "implements" && (k.marked = "keyword"), c(I ? se : R, Wt);
          if (f == "{") return c(Q("}"), Pt, j);
        }
        function Pt(f, d) {
          if (f == "async" || f == "variable" && (d == "static" || d == "get" || d == "set" || I && pe(d)) && k.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
            return k.marked = "keyword", c(Pt);
          if (f == "variable" || k.style == "keyword")
            return k.marked = "property", c(mr, Pt);
          if (f == "number" || f == "string") return c(mr, Pt);
          if (f == "[")
            return c(R, rr, re("]"), mr, Pt);
          if (d == "*")
            return k.marked = "keyword", c(Pt);
          if (I && f == "(") return F(lr, Pt);
          if (f == ";" || f == ",") return c(Pt);
          if (f == "}") return c();
          if (d == "@") return c(R, Pt);
        }
        function mr(f, d) {
          if (d == "!" || d == "?") return c(mr);
          if (f == ":") return c(se, Ot);
          if (d == "=") return c(Je);
          var x = k.state.lexical.prev, C = x && x.info == "interface";
          return F(C ? lr : Tt);
        }
        function zr(f, d) {
          return d == "*" ? (k.marked = "keyword", c(Fr, re(";"))) : d == "default" ? (k.marked = "keyword", c(R, re(";"))) : f == "{" ? c(He(Er, "}"), Fr, re(";")) : F(ce);
        }
        function Er(f, d) {
          if (d == "as")
            return k.marked = "keyword", c(re("variable"));
          if (f == "variable") return F(Je, Er);
        }
        function ar(f) {
          return f == "string" ? c() : f == "(" ? F(R) : f == "." ? F(ve) : F(Hr, Bt, Fr);
        }
        function Hr(f, d) {
          return f == "{" ? tr(Hr, "}") : (f == "variable" && T(d), d == "*" && (k.marked = "keyword"), c(an));
        }
        function Bt(f) {
          if (f == ",") return c(Hr, Bt);
        }
        function an(f, d) {
          if (d == "as")
            return k.marked = "keyword", c(Hr);
        }
        function Fr(f, d) {
          if (d == "from")
            return k.marked = "keyword", c(R);
        }
        function Ae(f) {
          return f == "]" ? c() : F(He(Je, "]"));
        }
        function B() {
          return F(Q("form"), ut, re("{"), Q("}"), He(jt, "}"), j, j);
        }
        function jt() {
          return F(ut, Ot);
        }
        function sn(f, d) {
          return f.lastType == "operator" || f.lastType == "," || ie.test(d.charAt(0)) || /[,.]/.test(d.charAt(0));
        }
        function St(f, d, x) {
          return d.tokenize == $ && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(d.lastType) || d.lastType == "quasi" && /\{\s*$/.test(f.string.slice(0, f.pos - (x || 0)));
        }
        return {
          startState: function(f) {
            var d = {
              tokenize: $,
              lastType: "sof",
              cc: [],
              lexical: new J((f || 0) - te, 0, "block", !1),
              localVars: fe.localVars,
              context: fe.localVars && new Pe(null, null, !1),
              indented: f || 0
            };
            return fe.globalVars && typeof fe.globalVars == "object" && (d.globalVars = fe.globalVars), d;
          },
          token: function(f, d) {
            if (f.sol() && (d.lexical.hasOwnProperty("align") || (d.lexical.align = !1), d.indented = f.indentation(), Re(f, d)), d.tokenize != me && f.eatSpace()) return null;
            var x = d.tokenize(f, d);
            return We == "comment" ? x : (d.lastType = We == "operator" && (Be == "++" || Be == "--") ? "incdec" : We, Le(d, x, We, Be, f));
          },
          indent: function(f, d) {
            if (f.tokenize == me || f.tokenize == Ue) return z.Pass;
            if (f.tokenize != $) return 0;
            var x = d && d.charAt(0), C = f.lexical, m;
            if (!/^\s*else\b/.test(d)) for (var D = f.cc.length - 1; D >= 0; --D) {
              var ge = f.cc[D];
              if (ge == j) C = C.prev;
              else if (ge != Wr && ge != Se) break;
            }
            for (; (C.type == "stat" || C.type == "form") && (x == "}" || (m = f.cc[f.cc.length - 1]) && (m == ve || m == Ee) && !/^[,\.=+\-*:?[\(]/.test(d)); )
              C = C.prev;
            Z && C.type == ")" && C.prev.type == "stat" && (C = C.prev);
            var Ge = C.type, ft = x == Ge;
            return Ge == "vardef" ? C.indented + (f.lastType == "operator" || f.lastType == "," ? C.info.length + 1 : 0) : Ge == "form" && x == "{" ? C.indented : Ge == "form" ? C.indented + te : Ge == "stat" ? C.indented + (sn(f, d) ? Z || te : 0) : C.info == "switch" && !ft && fe.doubleIndentSwitch != !1 ? C.indented + (/^(?:case|default)\b/.test(d) ? te : 2 * te) : C.align ? C.column + (ft ? 0 : 1) : C.indented + (ft ? 0 : te);
          },
          electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
          blockCommentStart: E ? null : "/*",
          blockCommentEnd: E ? null : "*/",
          blockCommentContinue: E ? null : " * ",
          lineComment: E ? null : "//",
          fold: "brace",
          closeBrackets: "()[]{}''\"\"``",
          helperType: E ? "json" : "javascript",
          jsonldMode: de,
          jsonMode: E,
          expressionAllowed: St,
          skipExpression: function(f) {
            Le(f, "atom", "atom", "true", new z.StringStream("", 2, null));
          }
        };
      }), z.registerHelper("wordChars", "javascript", /[\w$]/), z.defineMIME("text/javascript", "javascript"), z.defineMIME("text/ecmascript", "javascript"), z.defineMIME("application/javascript", "javascript"), z.defineMIME("application/x-javascript", "javascript"), z.defineMIME("application/ecmascript", "javascript"), z.defineMIME("application/json", { name: "javascript", json: !0 }), z.defineMIME("application/x-json", { name: "javascript", json: !0 }), z.defineMIME("application/manifest+json", { name: "javascript", json: !0 }), z.defineMIME("application/ld+json", { name: "javascript", jsonld: !0 }), z.defineMIME("text/typescript", { name: "javascript", typescript: !0 }), z.defineMIME("application/typescript", { name: "javascript", typescript: !0 });
    });
  }()), pa.exports;
}
wa();
var ga = { exports: {} }, ya;
function Cu() {
  return ya || (ya = 1, function(wt, Or) {
    (function(z) {
      z(Ar());
    })(function(z) {
      var xe = {
        autoSelfClosers: {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          command: !0,
          embed: !0,
          frame: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
          menuitem: !0
        },
        implicitlyClosed: {
          dd: !0,
          li: !0,
          optgroup: !0,
          option: !0,
          p: !0,
          rp: !0,
          rt: !0,
          tbody: !0,
          td: !0,
          tfoot: !0,
          th: !0,
          tr: !0
        },
        contextGrabbers: {
          dd: { dd: !0, dt: !0 },
          dt: { dd: !0, dt: !0 },
          li: { li: !0 },
          option: { option: !0, optgroup: !0 },
          optgroup: { optgroup: !0 },
          p: {
            address: !0,
            article: !0,
            aside: !0,
            blockquote: !0,
            dir: !0,
            div: !0,
            dl: !0,
            fieldset: !0,
            footer: !0,
            form: !0,
            h1: !0,
            h2: !0,
            h3: !0,
            h4: !0,
            h5: !0,
            h6: !0,
            header: !0,
            hgroup: !0,
            hr: !0,
            menu: !0,
            nav: !0,
            ol: !0,
            p: !0,
            pre: !0,
            section: !0,
            table: !0,
            ul: !0
          },
          rp: { rp: !0, rt: !0 },
          rt: { rp: !0, rt: !0 },
          tbody: { tbody: !0, tfoot: !0 },
          td: { td: !0, th: !0 },
          tfoot: { tbody: !0 },
          th: { td: !0, th: !0 },
          thead: { tbody: !0, tfoot: !0 },
          tr: { tr: !0 }
        },
        doNotIndent: { pre: !0 },
        allowUnquoted: !0,
        allowMissing: !0,
        caseFold: !0
      }, fe = {
        autoSelfClosers: {},
        implicitlyClosed: {},
        contextGrabbers: {},
        doNotIndent: {},
        allowUnquoted: !1,
        allowMissing: !1,
        allowMissingTagName: !1,
        caseFold: !1
      };
      z.defineMode("xml", function(te, Z) {
        var de = te.indentUnit, E = {}, N = Z.htmlMode ? xe : fe;
        for (var I in N) E[I] = N[I];
        for (var I in Z) E[I] = Z[I];
        var X, _;
        function ie(c, W) {
          function T(Pe) {
            return W.tokenize = Pe, Pe(c, W);
          }
          var q = c.next();
          if (q == "<")
            return c.eat("!") ? c.eat("[") ? c.match("CDATA[") ? T(We("atom", "]]>")) : null : c.match("--") ? T(We("comment", "-->")) : c.match("DOCTYPE", !0, !0) ? (c.eatWhile(/[\w\._\-]/), T(Be(1))) : null : c.eat("?") ? (c.eatWhile(/[\w\._\-]/), W.tokenize = We("meta", "?>"), "meta") : (X = c.eat("/") ? "closeTag" : "openTag", W.tokenize = le, "tag bracket");
          if (q == "&") {
            var pe;
            return c.eat("#") ? c.eat("x") ? pe = c.eatWhile(/[a-fA-F\d]/) && c.eat(";") : pe = c.eatWhile(/[\d]/) && c.eat(";") : pe = c.eatWhile(/[\w\.\-:]/) && c.eat(";"), pe ? "atom" : "error";
          } else
            return c.eatWhile(/[^&<]/), null;
        }
        ie.isInText = !0;
        function le(c, W) {
          var T = c.next();
          if (T == ">" || T == "/" && c.eat(">"))
            return W.tokenize = ie, X = T == ">" ? "endTag" : "selfcloseTag", "tag bracket";
          if (T == "=")
            return X = "equals", null;
          if (T == "<") {
            W.tokenize = ie, W.state = Ue, W.tagName = W.tagStart = null;
            var q = W.tokenize(c, W);
            return q ? q + " tag error" : "tag error";
          } else return /[\'\"]/.test(T) ? (W.tokenize = De(T), W.stringStartCol = c.column(), W.tokenize(c, W)) : (c.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word");
        }
        function De(c) {
          var W = function(T, q) {
            for (; !T.eol(); )
              if (T.next() == c) {
                q.tokenize = le;
                break;
              }
            return "string";
          };
          return W.isInAttribute = !0, W;
        }
        function We(c, W) {
          return function(T, q) {
            for (; !T.eol(); ) {
              if (T.match(W)) {
                q.tokenize = ie;
                break;
              }
              T.next();
            }
            return c;
          };
        }
        function Be(c) {
          return function(W, T) {
            for (var q; (q = W.next()) != null; ) {
              if (q == "<")
                return T.tokenize = Be(c + 1), T.tokenize(W, T);
              if (q == ">")
                if (c == 1) {
                  T.tokenize = ie;
                  break;
                } else
                  return T.tokenize = Be(c - 1), T.tokenize(W, T);
            }
            return "meta";
          };
        }
        function oe(c) {
          return c && c.toLowerCase();
        }
        function $(c, W, T) {
          this.prev = c.context, this.tagName = W || "", this.indent = c.indented, this.startOfLine = T, (E.doNotIndent.hasOwnProperty(W) || c.context && c.context.noIndent) && (this.noIndent = !0);
        }
        function ae(c) {
          c.context && (c.context = c.context.prev);
        }
        function me(c, W) {
          for (var T; ; ) {
            if (!c.context || (T = c.context.tagName, !E.contextGrabbers.hasOwnProperty(oe(T)) || !E.contextGrabbers[oe(T)].hasOwnProperty(oe(W))))
              return;
            ae(c);
          }
        }
        function Ue(c, W, T) {
          return c == "openTag" ? (T.tagStart = W.column(), lt) : c == "closeTag" ? Re : Ue;
        }
        function lt(c, W, T) {
          return c == "word" ? (T.tagName = W.current(), _ = "tag", Y) : E.allowMissingTagName && c == "endTag" ? (_ = "tag bracket", Y(c, W, T)) : (_ = "error", lt);
        }
        function Re(c, W, T) {
          if (c == "word") {
            var q = W.current();
            return T.context && T.context.tagName != q && E.implicitlyClosed.hasOwnProperty(oe(T.context.tagName)) && ae(T), T.context && T.context.tagName == q || E.matchClosing === !1 ? (_ = "tag", Ke) : (_ = "tag error", J);
          } else return E.allowMissingTagName && c == "endTag" ? (_ = "tag bracket", Ke(c, W, T)) : (_ = "error", J);
        }
        function Ke(c, W, T) {
          return c != "endTag" ? (_ = "error", Ke) : (ae(T), Ue);
        }
        function J(c, W, T) {
          return _ = "error", Ke(c, W, T);
        }
        function Y(c, W, T) {
          if (c == "word")
            return _ = "attribute", Le;
          if (c == "endTag" || c == "selfcloseTag") {
            var q = T.tagName, pe = T.tagStart;
            return T.tagName = T.tagStart = null, c == "selfcloseTag" || E.autoSelfClosers.hasOwnProperty(oe(q)) ? me(T, q) : (me(T, q), T.context = new $(T, q, pe == T.indented)), Ue;
          }
          return _ = "error", Y;
        }
        function Le(c, W, T) {
          return c == "equals" ? k : (E.allowMissing || (_ = "error"), Y(c, W, T));
        }
        function k(c, W, T) {
          return c == "string" ? F : c == "word" && E.allowUnquoted ? (_ = "string", Y) : (_ = "error", Y(c, W, T));
        }
        function F(c, W, T) {
          return c == "string" ? F : Y(c, W, T);
        }
        return {
          startState: function(c) {
            var W = {
              tokenize: ie,
              state: Ue,
              indented: c || 0,
              tagName: null,
              tagStart: null,
              context: null
            };
            return c != null && (W.baseIndent = c), W;
          },
          token: function(c, W) {
            if (!W.tagName && c.sol() && (W.indented = c.indentation()), c.eatSpace()) return null;
            X = null;
            var T = W.tokenize(c, W);
            return (T || X) && T != "comment" && (_ = null, W.state = W.state(X || T, c, W), _ && (T = _ == "error" ? T + " error" : _)), T;
          },
          indent: function(c, W, T) {
            var q = c.context;
            if (c.tokenize.isInAttribute)
              return c.tagStart == c.indented ? c.stringStartCol + 1 : c.indented + de;
            if (q && q.noIndent) return z.Pass;
            if (c.tokenize != le && c.tokenize != ie)
              return T ? T.match(/^(\s*)/)[0].length : 0;
            if (c.tagName)
              return E.multilineTagIndentPastTag !== !1 ? c.tagStart + c.tagName.length + 2 : c.tagStart + de * (E.multilineTagIndentFactor || 1);
            if (E.alignCDATA && /<!\[CDATA\[/.test(W)) return 0;
            var pe = W && /^<(\/)?([\w_:\.-]*)/.exec(W);
            if (pe && pe[1])
              for (; q; )
                if (q.tagName == pe[2]) {
                  q = q.prev;
                  break;
                } else if (E.implicitlyClosed.hasOwnProperty(oe(q.tagName)))
                  q = q.prev;
                else
                  break;
            else if (pe)
              for (; q; ) {
                var Pe = E.contextGrabbers[oe(q.tagName)];
                if (Pe && Pe.hasOwnProperty(oe(pe[2])))
                  q = q.prev;
                else
                  break;
              }
            for (; q && q.prev && !q.startOfLine; )
              q = q.prev;
            return q ? q.indent + de : c.baseIndent || 0;
          },
          electricInput: /<\/[\s\w:]+>$/,
          blockCommentStart: "<!--",
          blockCommentEnd: "-->",
          configuration: E.htmlMode ? "html" : "xml",
          helperType: E.htmlMode ? "html" : "xml",
          skipAttribute: function(c) {
            c.state == k && (c.state = Y);
          },
          xmlCurrentTag: function(c) {
            return c.tagName ? { name: c.tagName, close: c.type == "closeTag" } : null;
          },
          xmlCurrentContext: function(c) {
            for (var W = [], T = c.context; T; T = T.prev)
              W.push(T.tagName);
            return W.reverse();
          }
        };
      }), z.defineMIME("text/xml", "xml"), z.defineMIME("application/xml", "xml"), z.mimeModes.hasOwnProperty("text/html") || z.defineMIME("text/html", { name: "xml", htmlMode: !0 });
    });
  }()), ga.exports;
}
var ma = { exports: {} }, ba;
function xa() {
  return ba || (ba = 1, function(wt, Or) {
    (function(z) {
      z(Ar());
    })(function(z) {
      z.defineMode("css", function(J, Y) {
        var Le = Y.inline;
        Y.propertyKeywords || (Y = z.resolveMode("text/css"));
        var k = J.indentUnit, F = Y.tokenHooks, c = Y.documentTypes || {}, W = Y.mediaTypes || {}, T = Y.mediaFeatures || {}, q = Y.mediaValueKeywords || {}, pe = Y.propertyKeywords || {}, Pe = Y.nonStandardPropertyKeywords || {}, Mt = Y.fontProperties || {}, Gt = Y.counterDescriptors || {}, nt = Y.colorKeywords || {}, gt = Y.valueKeywords || {}, Se = Y.allowNested, Q = Y.lineComment, j = Y.supportsAtComponent === !0, re = J.highlightNonStandardPropertyKeywords !== !1, ce, ee;
        function R(y, M) {
          return ce = M, y;
        }
        function Je(y, M) {
          var w = y.next();
          if (F[w]) {
            var he = F[w](y, M);
            if (he !== !1) return he;
          }
          if (w == "@")
            return y.eatWhile(/[\w\\\-]/), R("def", y.current());
          if (w == "=" || (w == "~" || w == "|") && y.eat("="))
            return R(null, "compare");
          if (w == '"' || w == "'")
            return M.tokenize = Nt(w), M.tokenize(y, M);
          if (w == "#")
            return y.eatWhile(/[\w\\\-]/), R("atom", "hash");
          if (w == "!")
            return y.match(/^\s*\w*/), R("keyword", "important");
          if (/\d/.test(w) || w == "." && y.eat(/\d/))
            return y.eatWhile(/[\w.%]/), R("number", "unit");
          if (w === "-") {
            if (/[\d.]/.test(y.peek()))
              return y.eatWhile(/[\w.%]/), R("number", "unit");
            if (y.match(/^-[\w\\\-]*/))
              return y.eatWhile(/[\w\\\-]/), y.match(/^\s*:/, !1) ? R("variable-2", "variable-definition") : R("variable-2", "variable");
            if (y.match(/^\w+-/))
              return R("meta", "meta");
          } else return /[,+>*\/]/.test(w) ? R(null, "select-op") : w == "." && y.match(/^-?[_a-z][_a-z0-9-]*/i) ? R("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(w) ? R(null, w) : y.match(/^[\w-.]+(?=\()/) ? (/^(url(-prefix)?|domain|regexp)$/i.test(y.current()) && (M.tokenize = at), R("variable callee", "variable")) : /[\w\\\-]/.test(w) ? (y.eatWhile(/[\w\\\-]/), R("property", "word")) : R(null, null);
        }
        function Nt(y) {
          return function(M, w) {
            for (var he = !1, Ve; (Ve = M.next()) != null; ) {
              if (Ve == y && !he) {
                y == ")" && M.backUp(1);
                break;
              }
              he = !he && Ve == "\\";
            }
            return (Ve == y || !he && y != ")") && (w.tokenize = null), R("string", "string");
          };
        }
        function at(y, M) {
          return y.next(), y.match(/^\s*[\"\')]/, !1) ? M.tokenize = null : M.tokenize = Nt(")"), R(null, "(");
        }
        function xt(y, M, w) {
          this.type = y, this.indent = M, this.prev = w;
        }
        function ve(y, M, w, he) {
          return y.context = new xt(w, M.indentation() + (he === !1 ? 0 : k), y.context), w;
        }
        function Ee(y) {
          return y.context.prev && (y.context = y.context.prev), y.context.type;
        }
        function st(y, M, w) {
          return we[w.context.type](y, M, w);
        }
        function kt(y, M, w, he) {
          for (var Ve = he || 1; Ve > 0; Ve--)
            w.context = w.context.prev;
          return st(y, M, w);
        }
        function ue(y) {
          var M = y.current().toLowerCase();
          gt.hasOwnProperty(M) ? ee = "atom" : nt.hasOwnProperty(M) ? ee = "keyword" : ee = "variable";
        }
        var we = {};
        return we.top = function(y, M, w) {
          if (y == "{")
            return ve(w, M, "block");
          if (y == "}" && w.context.prev)
            return Ee(w);
          if (j && /@component/i.test(y))
            return ve(w, M, "atComponentBlock");
          if (/^@(-moz-)?document$/i.test(y))
            return ve(w, M, "documentTypes");
          if (/^@(media|supports|(-moz-)?document|import)$/i.test(y))
            return ve(w, M, "atBlock");
          if (/^@(font-face|counter-style)/i.test(y))
            return w.stateArg = y, "restricted_atBlock_before";
          if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(y))
            return "keyframes";
          if (y && y.charAt(0) == "@")
            return ve(w, M, "at");
          if (y == "hash")
            ee = "builtin";
          else if (y == "word")
            ee = "tag";
          else {
            if (y == "variable-definition")
              return "maybeprop";
            if (y == "interpolation")
              return ve(w, M, "interpolation");
            if (y == ":")
              return "pseudo";
            if (Se && y == "(")
              return ve(w, M, "parens");
          }
          return w.context.type;
        }, we.block = function(y, M, w) {
          if (y == "word") {
            var he = M.current().toLowerCase();
            return pe.hasOwnProperty(he) ? (ee = "property", "maybeprop") : Pe.hasOwnProperty(he) ? (ee = re ? "string-2" : "property", "maybeprop") : Se ? (ee = M.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag", "block") : (ee += " error", "maybeprop");
          } else return y == "meta" ? "block" : !Se && (y == "hash" || y == "qualifier") ? (ee = "error", "block") : we.top(y, M, w);
        }, we.maybeprop = function(y, M, w) {
          return y == ":" ? ve(w, M, "prop") : st(y, M, w);
        }, we.prop = function(y, M, w) {
          if (y == ";") return Ee(w);
          if (y == "{" && Se) return ve(w, M, "propBlock");
          if (y == "}" || y == "{") return kt(y, M, w);
          if (y == "(") return ve(w, M, "parens");
          if (y == "hash" && !/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(M.current()))
            ee += " error";
          else if (y == "word")
            ue(M);
          else if (y == "interpolation")
            return ve(w, M, "interpolation");
          return "prop";
        }, we.propBlock = function(y, M, w) {
          return y == "}" ? Ee(w) : y == "word" ? (ee = "property", "maybeprop") : w.context.type;
        }, we.parens = function(y, M, w) {
          return y == "{" || y == "}" ? kt(y, M, w) : y == ")" ? Ee(w) : y == "(" ? ve(w, M, "parens") : y == "interpolation" ? ve(w, M, "interpolation") : (y == "word" && ue(M), "parens");
        }, we.pseudo = function(y, M, w) {
          return y == "meta" ? "pseudo" : y == "word" ? (ee = "variable-3", w.context.type) : st(y, M, w);
        }, we.documentTypes = function(y, M, w) {
          return y == "word" && c.hasOwnProperty(M.current()) ? (ee = "tag", w.context.type) : we.atBlock(y, M, w);
        }, we.atBlock = function(y, M, w) {
          if (y == "(") return ve(w, M, "atBlock_parens");
          if (y == "}" || y == ";") return kt(y, M, w);
          if (y == "{") return Ee(w) && ve(w, M, Se ? "block" : "top");
          if (y == "interpolation") return ve(w, M, "interpolation");
          if (y == "word") {
            var he = M.current().toLowerCase();
            he == "only" || he == "not" || he == "and" || he == "or" ? ee = "keyword" : W.hasOwnProperty(he) ? ee = "attribute" : T.hasOwnProperty(he) ? ee = "property" : q.hasOwnProperty(he) ? ee = "keyword" : pe.hasOwnProperty(he) ? ee = "property" : Pe.hasOwnProperty(he) ? ee = re ? "string-2" : "property" : gt.hasOwnProperty(he) ? ee = "atom" : nt.hasOwnProperty(he) ? ee = "keyword" : ee = "error";
          }
          return w.context.type;
        }, we.atComponentBlock = function(y, M, w) {
          return y == "}" ? kt(y, M, w) : y == "{" ? Ee(w) && ve(w, M, Se ? "block" : "top", !1) : (y == "word" && (ee = "error"), w.context.type);
        }, we.atBlock_parens = function(y, M, w) {
          return y == ")" ? Ee(w) : y == "{" || y == "}" ? kt(y, M, w, 2) : we.atBlock(y, M, w);
        }, we.restricted_atBlock_before = function(y, M, w) {
          return y == "{" ? ve(w, M, "restricted_atBlock") : y == "word" && w.stateArg == "@counter-style" ? (ee = "variable", "restricted_atBlock_before") : st(y, M, w);
        }, we.restricted_atBlock = function(y, M, w) {
          return y == "}" ? (w.stateArg = null, Ee(w)) : y == "word" ? (w.stateArg == "@font-face" && !Mt.hasOwnProperty(M.current().toLowerCase()) || w.stateArg == "@counter-style" && !Gt.hasOwnProperty(M.current().toLowerCase()) ? ee = "error" : ee = "property", "maybeprop") : "restricted_atBlock";
        }, we.keyframes = function(y, M, w) {
          return y == "word" ? (ee = "variable", "keyframes") : y == "{" ? ve(w, M, "top") : st(y, M, w);
        }, we.at = function(y, M, w) {
          return y == ";" ? Ee(w) : y == "{" || y == "}" ? kt(y, M, w) : (y == "word" ? ee = "tag" : y == "hash" && (ee = "builtin"), "at");
        }, we.interpolation = function(y, M, w) {
          return y == "}" ? Ee(w) : y == "{" || y == ";" ? kt(y, M, w) : (y == "word" ? ee = "variable" : y != "variable" && y != "(" && y != ")" && (ee = "error"), "interpolation");
        }, {
          startState: function(y) {
            return {
              tokenize: null,
              state: Le ? "block" : "top",
              stateArg: null,
              context: new xt(Le ? "block" : "top", y || 0, null)
            };
          },
          token: function(y, M) {
            if (!M.tokenize && y.eatSpace()) return null;
            var w = (M.tokenize || Je)(y, M);
            return w && typeof w == "object" && (ce = w[1], w = w[0]), ee = w, ce != "comment" && (M.state = we[M.state](ce, y, M)), ee;
          },
          indent: function(y, M) {
            var w = y.context, he = M && M.charAt(0), Ve = w.indent;
            return w.type == "prop" && (he == "}" || he == ")") && (w = w.prev), w.prev && (he == "}" && (w.type == "block" || w.type == "top" || w.type == "interpolation" || w.type == "restricted_atBlock") ? (w = w.prev, Ve = w.indent) : (he == ")" && (w.type == "parens" || w.type == "atBlock_parens") || he == "{" && (w.type == "at" || w.type == "atBlock")) && (Ve = Math.max(0, w.indent - k))), Ve;
          },
          electricChars: "}",
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          blockCommentContinue: " * ",
          lineComment: Q,
          fold: "brace"
        };
      });
      function xe(J) {
        for (var Y = {}, Le = 0; Le < J.length; ++Le)
          Y[J[Le].toLowerCase()] = !0;
        return Y;
      }
      var fe = [
        "domain",
        "regexp",
        "url",
        "url-prefix"
      ], te = xe(fe), Z = [
        "all",
        "aural",
        "braille",
        "handheld",
        "print",
        "projection",
        "screen",
        "tty",
        "tv",
        "embossed"
      ], de = xe(Z), E = [
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "device-width",
        "min-device-width",
        "max-device-width",
        "device-height",
        "min-device-height",
        "max-device-height",
        "aspect-ratio",
        "min-aspect-ratio",
        "max-aspect-ratio",
        "device-aspect-ratio",
        "min-device-aspect-ratio",
        "max-device-aspect-ratio",
        "color",
        "min-color",
        "max-color",
        "color-index",
        "min-color-index",
        "max-color-index",
        "monochrome",
        "min-monochrome",
        "max-monochrome",
        "resolution",
        "min-resolution",
        "max-resolution",
        "scan",
        "grid",
        "orientation",
        "device-pixel-ratio",
        "min-device-pixel-ratio",
        "max-device-pixel-ratio",
        "pointer",
        "any-pointer",
        "hover",
        "any-hover",
        "prefers-color-scheme",
        "dynamic-range",
        "video-dynamic-range"
      ], N = xe(E), I = [
        "landscape",
        "portrait",
        "none",
        "coarse",
        "fine",
        "on-demand",
        "hover",
        "interlace",
        "progressive",
        "dark",
        "light",
        "standard",
        "high"
      ], X = xe(I), _ = [
        "align-content",
        "align-items",
        "align-self",
        "alignment-adjust",
        "alignment-baseline",
        "all",
        "anchor-point",
        "animation",
        "animation-delay",
        "animation-direction",
        "animation-duration",
        "animation-fill-mode",
        "animation-iteration-count",
        "animation-name",
        "animation-play-state",
        "animation-timing-function",
        "appearance",
        "azimuth",
        "backdrop-filter",
        "backface-visibility",
        "background",
        "background-attachment",
        "background-blend-mode",
        "background-clip",
        "background-color",
        "background-image",
        "background-origin",
        "background-position",
        "background-position-x",
        "background-position-y",
        "background-repeat",
        "background-size",
        "baseline-shift",
        "binding",
        "bleed",
        "block-size",
        "bookmark-label",
        "bookmark-level",
        "bookmark-state",
        "bookmark-target",
        "border",
        "border-bottom",
        "border-bottom-color",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-bottom-style",
        "border-bottom-width",
        "border-collapse",
        "border-color",
        "border-image",
        "border-image-outset",
        "border-image-repeat",
        "border-image-slice",
        "border-image-source",
        "border-image-width",
        "border-left",
        "border-left-color",
        "border-left-style",
        "border-left-width",
        "border-radius",
        "border-right",
        "border-right-color",
        "border-right-style",
        "border-right-width",
        "border-spacing",
        "border-style",
        "border-top",
        "border-top-color",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-top-style",
        "border-top-width",
        "border-width",
        "bottom",
        "box-decoration-break",
        "box-shadow",
        "box-sizing",
        "break-after",
        "break-before",
        "break-inside",
        "caption-side",
        "caret-color",
        "clear",
        "clip",
        "color",
        "color-profile",
        "column-count",
        "column-fill",
        "column-gap",
        "column-rule",
        "column-rule-color",
        "column-rule-style",
        "column-rule-width",
        "column-span",
        "column-width",
        "columns",
        "contain",
        "content",
        "counter-increment",
        "counter-reset",
        "crop",
        "cue",
        "cue-after",
        "cue-before",
        "cursor",
        "direction",
        "display",
        "dominant-baseline",
        "drop-initial-after-adjust",
        "drop-initial-after-align",
        "drop-initial-before-adjust",
        "drop-initial-before-align",
        "drop-initial-size",
        "drop-initial-value",
        "elevation",
        "empty-cells",
        "fit",
        "fit-content",
        "fit-position",
        "flex",
        "flex-basis",
        "flex-direction",
        "flex-flow",
        "flex-grow",
        "flex-shrink",
        "flex-wrap",
        "float",
        "float-offset",
        "flow-from",
        "flow-into",
        "font",
        "font-family",
        "font-feature-settings",
        "font-kerning",
        "font-language-override",
        "font-optical-sizing",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-synthesis",
        "font-variant",
        "font-variant-alternates",
        "font-variant-caps",
        "font-variant-east-asian",
        "font-variant-ligatures",
        "font-variant-numeric",
        "font-variant-position",
        "font-variation-settings",
        "font-weight",
        "gap",
        "grid",
        "grid-area",
        "grid-auto-columns",
        "grid-auto-flow",
        "grid-auto-rows",
        "grid-column",
        "grid-column-end",
        "grid-column-gap",
        "grid-column-start",
        "grid-gap",
        "grid-row",
        "grid-row-end",
        "grid-row-gap",
        "grid-row-start",
        "grid-template",
        "grid-template-areas",
        "grid-template-columns",
        "grid-template-rows",
        "hanging-punctuation",
        "height",
        "hyphens",
        "icon",
        "image-orientation",
        "image-rendering",
        "image-resolution",
        "inline-box-align",
        "inset",
        "inset-block",
        "inset-block-end",
        "inset-block-start",
        "inset-inline",
        "inset-inline-end",
        "inset-inline-start",
        "isolation",
        "justify-content",
        "justify-items",
        "justify-self",
        "left",
        "letter-spacing",
        "line-break",
        "line-height",
        "line-height-step",
        "line-stacking",
        "line-stacking-ruby",
        "line-stacking-shift",
        "line-stacking-strategy",
        "list-style",
        "list-style-image",
        "list-style-position",
        "list-style-type",
        "margin",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "margin-top",
        "marks",
        "marquee-direction",
        "marquee-loop",
        "marquee-play-count",
        "marquee-speed",
        "marquee-style",
        "mask-clip",
        "mask-composite",
        "mask-image",
        "mask-mode",
        "mask-origin",
        "mask-position",
        "mask-repeat",
        "mask-size",
        "mask-type",
        "max-block-size",
        "max-height",
        "max-inline-size",
        "max-width",
        "min-block-size",
        "min-height",
        "min-inline-size",
        "min-width",
        "mix-blend-mode",
        "move-to",
        "nav-down",
        "nav-index",
        "nav-left",
        "nav-right",
        "nav-up",
        "object-fit",
        "object-position",
        "offset",
        "offset-anchor",
        "offset-distance",
        "offset-path",
        "offset-position",
        "offset-rotate",
        "opacity",
        "order",
        "orphans",
        "outline",
        "outline-color",
        "outline-offset",
        "outline-style",
        "outline-width",
        "overflow",
        "overflow-style",
        "overflow-wrap",
        "overflow-x",
        "overflow-y",
        "padding",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding-top",
        "page",
        "page-break-after",
        "page-break-before",
        "page-break-inside",
        "page-policy",
        "pause",
        "pause-after",
        "pause-before",
        "perspective",
        "perspective-origin",
        "pitch",
        "pitch-range",
        "place-content",
        "place-items",
        "place-self",
        "play-during",
        "position",
        "presentation-level",
        "punctuation-trim",
        "quotes",
        "region-break-after",
        "region-break-before",
        "region-break-inside",
        "region-fragment",
        "rendering-intent",
        "resize",
        "rest",
        "rest-after",
        "rest-before",
        "richness",
        "right",
        "rotate",
        "rotation",
        "rotation-point",
        "row-gap",
        "ruby-align",
        "ruby-overhang",
        "ruby-position",
        "ruby-span",
        "scale",
        "scroll-behavior",
        "scroll-margin",
        "scroll-margin-block",
        "scroll-margin-block-end",
        "scroll-margin-block-start",
        "scroll-margin-bottom",
        "scroll-margin-inline",
        "scroll-margin-inline-end",
        "scroll-margin-inline-start",
        "scroll-margin-left",
        "scroll-margin-right",
        "scroll-margin-top",
        "scroll-padding",
        "scroll-padding-block",
        "scroll-padding-block-end",
        "scroll-padding-block-start",
        "scroll-padding-bottom",
        "scroll-padding-inline",
        "scroll-padding-inline-end",
        "scroll-padding-inline-start",
        "scroll-padding-left",
        "scroll-padding-right",
        "scroll-padding-top",
        "scroll-snap-align",
        "scroll-snap-type",
        "shape-image-threshold",
        "shape-inside",
        "shape-margin",
        "shape-outside",
        "size",
        "speak",
        "speak-as",
        "speak-header",
        "speak-numeral",
        "speak-punctuation",
        "speech-rate",
        "stress",
        "string-set",
        "tab-size",
        "table-layout",
        "target",
        "target-name",
        "target-new",
        "target-position",
        "text-align",
        "text-align-last",
        "text-combine-upright",
        "text-decoration",
        "text-decoration-color",
        "text-decoration-line",
        "text-decoration-skip",
        "text-decoration-skip-ink",
        "text-decoration-style",
        "text-emphasis",
        "text-emphasis-color",
        "text-emphasis-position",
        "text-emphasis-style",
        "text-height",
        "text-indent",
        "text-justify",
        "text-orientation",
        "text-outline",
        "text-overflow",
        "text-rendering",
        "text-shadow",
        "text-size-adjust",
        "text-space-collapse",
        "text-transform",
        "text-underline-position",
        "text-wrap",
        "top",
        "touch-action",
        "transform",
        "transform-origin",
        "transform-style",
        "transition",
        "transition-delay",
        "transition-duration",
        "transition-property",
        "transition-timing-function",
        "translate",
        "unicode-bidi",
        "user-select",
        "vertical-align",
        "visibility",
        "voice-balance",
        "voice-duration",
        "voice-family",
        "voice-pitch",
        "voice-range",
        "voice-rate",
        "voice-stress",
        "voice-volume",
        "volume",
        "white-space",
        "widows",
        "width",
        "will-change",
        "word-break",
        "word-spacing",
        "word-wrap",
        "writing-mode",
        "z-index",
        // SVG-specific
        "clip-path",
        "clip-rule",
        "mask",
        "enable-background",
        "filter",
        "flood-color",
        "flood-opacity",
        "lighting-color",
        "stop-color",
        "stop-opacity",
        "pointer-events",
        "color-interpolation",
        "color-interpolation-filters",
        "color-rendering",
        "fill",
        "fill-opacity",
        "fill-rule",
        "image-rendering",
        "marker",
        "marker-end",
        "marker-mid",
        "marker-start",
        "paint-order",
        "shape-rendering",
        "stroke",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-rendering",
        "baseline-shift",
        "dominant-baseline",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "text-anchor",
        "writing-mode"
      ], ie = xe(_), le = [
        "accent-color",
        "aspect-ratio",
        "border-block",
        "border-block-color",
        "border-block-end",
        "border-block-end-color",
        "border-block-end-style",
        "border-block-end-width",
        "border-block-start",
        "border-block-start-color",
        "border-block-start-style",
        "border-block-start-width",
        "border-block-style",
        "border-block-width",
        "border-inline",
        "border-inline-color",
        "border-inline-end",
        "border-inline-end-color",
        "border-inline-end-style",
        "border-inline-end-width",
        "border-inline-start",
        "border-inline-start-color",
        "border-inline-start-style",
        "border-inline-start-width",
        "border-inline-style",
        "border-inline-width",
        "content-visibility",
        "margin-block",
        "margin-block-end",
        "margin-block-start",
        "margin-inline",
        "margin-inline-end",
        "margin-inline-start",
        "overflow-anchor",
        "overscroll-behavior",
        "padding-block",
        "padding-block-end",
        "padding-block-start",
        "padding-inline",
        "padding-inline-end",
        "padding-inline-start",
        "scroll-snap-stop",
        "scrollbar-3d-light-color",
        "scrollbar-arrow-color",
        "scrollbar-base-color",
        "scrollbar-dark-shadow-color",
        "scrollbar-face-color",
        "scrollbar-highlight-color",
        "scrollbar-shadow-color",
        "scrollbar-track-color",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "shape-inside",
        "zoom"
      ], De = xe(le), We = [
        "font-display",
        "font-family",
        "src",
        "unicode-range",
        "font-variant",
        "font-feature-settings",
        "font-stretch",
        "font-weight",
        "font-style"
      ], Be = xe(We), oe = [
        "additive-symbols",
        "fallback",
        "negative",
        "pad",
        "prefix",
        "range",
        "speak-as",
        "suffix",
        "symbols",
        "system"
      ], $ = xe(oe), ae = [
        "aliceblue",
        "antiquewhite",
        "aqua",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "black",
        "blanchedalmond",
        "blue",
        "blueviolet",
        "brown",
        "burlywood",
        "cadetblue",
        "chartreuse",
        "chocolate",
        "coral",
        "cornflowerblue",
        "cornsilk",
        "crimson",
        "cyan",
        "darkblue",
        "darkcyan",
        "darkgoldenrod",
        "darkgray",
        "darkgreen",
        "darkgrey",
        "darkkhaki",
        "darkmagenta",
        "darkolivegreen",
        "darkorange",
        "darkorchid",
        "darkred",
        "darksalmon",
        "darkseagreen",
        "darkslateblue",
        "darkslategray",
        "darkslategrey",
        "darkturquoise",
        "darkviolet",
        "deeppink",
        "deepskyblue",
        "dimgray",
        "dimgrey",
        "dodgerblue",
        "firebrick",
        "floralwhite",
        "forestgreen",
        "fuchsia",
        "gainsboro",
        "ghostwhite",
        "gold",
        "goldenrod",
        "gray",
        "grey",
        "green",
        "greenyellow",
        "honeydew",
        "hotpink",
        "indianred",
        "indigo",
        "ivory",
        "khaki",
        "lavender",
        "lavenderblush",
        "lawngreen",
        "lemonchiffon",
        "lightblue",
        "lightcoral",
        "lightcyan",
        "lightgoldenrodyellow",
        "lightgray",
        "lightgreen",
        "lightgrey",
        "lightpink",
        "lightsalmon",
        "lightseagreen",
        "lightskyblue",
        "lightslategray",
        "lightslategrey",
        "lightsteelblue",
        "lightyellow",
        "lime",
        "limegreen",
        "linen",
        "magenta",
        "maroon",
        "mediumaquamarine",
        "mediumblue",
        "mediumorchid",
        "mediumpurple",
        "mediumseagreen",
        "mediumslateblue",
        "mediumspringgreen",
        "mediumturquoise",
        "mediumvioletred",
        "midnightblue",
        "mintcream",
        "mistyrose",
        "moccasin",
        "navajowhite",
        "navy",
        "oldlace",
        "olive",
        "olivedrab",
        "orange",
        "orangered",
        "orchid",
        "palegoldenrod",
        "palegreen",
        "paleturquoise",
        "palevioletred",
        "papayawhip",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "purple",
        "rebeccapurple",
        "red",
        "rosybrown",
        "royalblue",
        "saddlebrown",
        "salmon",
        "sandybrown",
        "seagreen",
        "seashell",
        "sienna",
        "silver",
        "skyblue",
        "slateblue",
        "slategray",
        "slategrey",
        "snow",
        "springgreen",
        "steelblue",
        "tan",
        "teal",
        "thistle",
        "tomato",
        "turquoise",
        "violet",
        "wheat",
        "white",
        "whitesmoke",
        "yellow",
        "yellowgreen"
      ], me = xe(ae), Ue = [
        "above",
        "absolute",
        "activeborder",
        "additive",
        "activecaption",
        "afar",
        "after-white-space",
        "ahead",
        "alias",
        "all",
        "all-scroll",
        "alphabetic",
        "alternate",
        "always",
        "amharic",
        "amharic-abegede",
        "antialiased",
        "appworkspace",
        "arabic-indic",
        "armenian",
        "asterisks",
        "attr",
        "auto",
        "auto-flow",
        "avoid",
        "avoid-column",
        "avoid-page",
        "avoid-region",
        "axis-pan",
        "background",
        "backwards",
        "baseline",
        "below",
        "bidi-override",
        "binary",
        "bengali",
        "blink",
        "block",
        "block-axis",
        "blur",
        "bold",
        "bolder",
        "border",
        "border-box",
        "both",
        "bottom",
        "break",
        "break-all",
        "break-word",
        "brightness",
        "bullets",
        "button",
        "buttonface",
        "buttonhighlight",
        "buttonshadow",
        "buttontext",
        "calc",
        "cambodian",
        "capitalize",
        "caps-lock-indicator",
        "caption",
        "captiontext",
        "caret",
        "cell",
        "center",
        "checkbox",
        "circle",
        "cjk-decimal",
        "cjk-earthly-branch",
        "cjk-heavenly-stem",
        "cjk-ideographic",
        "clear",
        "clip",
        "close-quote",
        "col-resize",
        "collapse",
        "color",
        "color-burn",
        "color-dodge",
        "column",
        "column-reverse",
        "compact",
        "condensed",
        "conic-gradient",
        "contain",
        "content",
        "contents",
        "content-box",
        "context-menu",
        "continuous",
        "contrast",
        "copy",
        "counter",
        "counters",
        "cover",
        "crop",
        "cross",
        "crosshair",
        "cubic-bezier",
        "currentcolor",
        "cursive",
        "cyclic",
        "darken",
        "dashed",
        "decimal",
        "decimal-leading-zero",
        "default",
        "default-button",
        "dense",
        "destination-atop",
        "destination-in",
        "destination-out",
        "destination-over",
        "devanagari",
        "difference",
        "disc",
        "discard",
        "disclosure-closed",
        "disclosure-open",
        "document",
        "dot-dash",
        "dot-dot-dash",
        "dotted",
        "double",
        "down",
        "drop-shadow",
        "e-resize",
        "ease",
        "ease-in",
        "ease-in-out",
        "ease-out",
        "element",
        "ellipse",
        "ellipsis",
        "embed",
        "end",
        "ethiopic",
        "ethiopic-abegede",
        "ethiopic-abegede-am-et",
        "ethiopic-abegede-gez",
        "ethiopic-abegede-ti-er",
        "ethiopic-abegede-ti-et",
        "ethiopic-halehame-aa-er",
        "ethiopic-halehame-aa-et",
        "ethiopic-halehame-am-et",
        "ethiopic-halehame-gez",
        "ethiopic-halehame-om-et",
        "ethiopic-halehame-sid-et",
        "ethiopic-halehame-so-et",
        "ethiopic-halehame-ti-er",
        "ethiopic-halehame-ti-et",
        "ethiopic-halehame-tig",
        "ethiopic-numeric",
        "ew-resize",
        "exclusion",
        "expanded",
        "extends",
        "extra-condensed",
        "extra-expanded",
        "fantasy",
        "fast",
        "fill",
        "fill-box",
        "fixed",
        "flat",
        "flex",
        "flex-end",
        "flex-start",
        "footnotes",
        "forwards",
        "from",
        "geometricPrecision",
        "georgian",
        "grayscale",
        "graytext",
        "grid",
        "groove",
        "gujarati",
        "gurmukhi",
        "hand",
        "hangul",
        "hangul-consonant",
        "hard-light",
        "hebrew",
        "help",
        "hidden",
        "hide",
        "higher",
        "highlight",
        "highlighttext",
        "hiragana",
        "hiragana-iroha",
        "horizontal",
        "hsl",
        "hsla",
        "hue",
        "hue-rotate",
        "icon",
        "ignore",
        "inactiveborder",
        "inactivecaption",
        "inactivecaptiontext",
        "infinite",
        "infobackground",
        "infotext",
        "inherit",
        "initial",
        "inline",
        "inline-axis",
        "inline-block",
        "inline-flex",
        "inline-grid",
        "inline-table",
        "inset",
        "inside",
        "intrinsic",
        "invert",
        "italic",
        "japanese-formal",
        "japanese-informal",
        "justify",
        "kannada",
        "katakana",
        "katakana-iroha",
        "keep-all",
        "khmer",
        "korean-hangul-formal",
        "korean-hanja-formal",
        "korean-hanja-informal",
        "landscape",
        "lao",
        "large",
        "larger",
        "left",
        "level",
        "lighter",
        "lighten",
        "line-through",
        "linear",
        "linear-gradient",
        "lines",
        "list-item",
        "listbox",
        "listitem",
        "local",
        "logical",
        "loud",
        "lower",
        "lower-alpha",
        "lower-armenian",
        "lower-greek",
        "lower-hexadecimal",
        "lower-latin",
        "lower-norwegian",
        "lower-roman",
        "lowercase",
        "ltr",
        "luminosity",
        "malayalam",
        "manipulation",
        "match",
        "matrix",
        "matrix3d",
        "media-play-button",
        "media-slider",
        "media-sliderthumb",
        "media-volume-slider",
        "media-volume-sliderthumb",
        "medium",
        "menu",
        "menulist",
        "menulist-button",
        "menutext",
        "message-box",
        "middle",
        "min-intrinsic",
        "mix",
        "mongolian",
        "monospace",
        "move",
        "multiple",
        "multiple_mask_images",
        "multiply",
        "myanmar",
        "n-resize",
        "narrower",
        "ne-resize",
        "nesw-resize",
        "no-close-quote",
        "no-drop",
        "no-open-quote",
        "no-repeat",
        "none",
        "normal",
        "not-allowed",
        "nowrap",
        "ns-resize",
        "numbers",
        "numeric",
        "nw-resize",
        "nwse-resize",
        "oblique",
        "octal",
        "opacity",
        "open-quote",
        "optimizeLegibility",
        "optimizeSpeed",
        "oriya",
        "oromo",
        "outset",
        "outside",
        "outside-shape",
        "overlay",
        "overline",
        "padding",
        "padding-box",
        "painted",
        "page",
        "paused",
        "persian",
        "perspective",
        "pinch-zoom",
        "plus-darker",
        "plus-lighter",
        "pointer",
        "polygon",
        "portrait",
        "pre",
        "pre-line",
        "pre-wrap",
        "preserve-3d",
        "progress",
        "push-button",
        "radial-gradient",
        "radio",
        "read-only",
        "read-write",
        "read-write-plaintext-only",
        "rectangle",
        "region",
        "relative",
        "repeat",
        "repeating-linear-gradient",
        "repeating-radial-gradient",
        "repeating-conic-gradient",
        "repeat-x",
        "repeat-y",
        "reset",
        "reverse",
        "rgb",
        "rgba",
        "ridge",
        "right",
        "rotate",
        "rotate3d",
        "rotateX",
        "rotateY",
        "rotateZ",
        "round",
        "row",
        "row-resize",
        "row-reverse",
        "rtl",
        "run-in",
        "running",
        "s-resize",
        "sans-serif",
        "saturate",
        "saturation",
        "scale",
        "scale3d",
        "scaleX",
        "scaleY",
        "scaleZ",
        "screen",
        "scroll",
        "scrollbar",
        "scroll-position",
        "se-resize",
        "searchfield",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "self-start",
        "self-end",
        "semi-condensed",
        "semi-expanded",
        "separate",
        "sepia",
        "serif",
        "show",
        "sidama",
        "simp-chinese-formal",
        "simp-chinese-informal",
        "single",
        "skew",
        "skewX",
        "skewY",
        "skip-white-space",
        "slide",
        "slider-horizontal",
        "slider-vertical",
        "sliderthumb-horizontal",
        "sliderthumb-vertical",
        "slow",
        "small",
        "small-caps",
        "small-caption",
        "smaller",
        "soft-light",
        "solid",
        "somali",
        "source-atop",
        "source-in",
        "source-out",
        "source-over",
        "space",
        "space-around",
        "space-between",
        "space-evenly",
        "spell-out",
        "square",
        "square-button",
        "start",
        "static",
        "status-bar",
        "stretch",
        "stroke",
        "stroke-box",
        "sub",
        "subpixel-antialiased",
        "svg_masks",
        "super",
        "sw-resize",
        "symbolic",
        "symbols",
        "system-ui",
        "table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row",
        "table-row-group",
        "tamil",
        "telugu",
        "text",
        "text-bottom",
        "text-top",
        "textarea",
        "textfield",
        "thai",
        "thick",
        "thin",
        "threeddarkshadow",
        "threedface",
        "threedhighlight",
        "threedlightshadow",
        "threedshadow",
        "tibetan",
        "tigre",
        "tigrinya-er",
        "tigrinya-er-abegede",
        "tigrinya-et",
        "tigrinya-et-abegede",
        "to",
        "top",
        "trad-chinese-formal",
        "trad-chinese-informal",
        "transform",
        "translate",
        "translate3d",
        "translateX",
        "translateY",
        "translateZ",
        "transparent",
        "ultra-condensed",
        "ultra-expanded",
        "underline",
        "unidirectional-pan",
        "unset",
        "up",
        "upper-alpha",
        "upper-armenian",
        "upper-greek",
        "upper-hexadecimal",
        "upper-latin",
        "upper-norwegian",
        "upper-roman",
        "uppercase",
        "urdu",
        "url",
        "var",
        "vertical",
        "vertical-text",
        "view-box",
        "visible",
        "visibleFill",
        "visiblePainted",
        "visibleStroke",
        "visual",
        "w-resize",
        "wait",
        "wave",
        "wider",
        "window",
        "windowframe",
        "windowtext",
        "words",
        "wrap",
        "wrap-reverse",
        "x-large",
        "x-small",
        "xor",
        "xx-large",
        "xx-small"
      ], lt = xe(Ue), Re = fe.concat(Z).concat(E).concat(I).concat(_).concat(le).concat(ae).concat(Ue);
      z.registerHelper("hintWords", "css", Re);
      function Ke(J, Y) {
        for (var Le = !1, k; (k = J.next()) != null; ) {
          if (Le && k == "/") {
            Y.tokenize = null;
            break;
          }
          Le = k == "*";
        }
        return ["comment", "comment"];
      }
      z.defineMIME("text/css", {
        documentTypes: te,
        mediaTypes: de,
        mediaFeatures: N,
        mediaValueKeywords: X,
        propertyKeywords: ie,
        nonStandardPropertyKeywords: De,
        fontProperties: Be,
        counterDescriptors: $,
        colorKeywords: me,
        valueKeywords: lt,
        tokenHooks: {
          "/": function(J, Y) {
            return J.eat("*") ? (Y.tokenize = Ke, Ke(J, Y)) : !1;
          }
        },
        name: "css"
      }), z.defineMIME("text/x-scss", {
        mediaTypes: de,
        mediaFeatures: N,
        mediaValueKeywords: X,
        propertyKeywords: ie,
        nonStandardPropertyKeywords: De,
        colorKeywords: me,
        valueKeywords: lt,
        fontProperties: Be,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
          "/": function(J, Y) {
            return J.eat("/") ? (J.skipToEnd(), ["comment", "comment"]) : J.eat("*") ? (Y.tokenize = Ke, Ke(J, Y)) : ["operator", "operator"];
          },
          ":": function(J) {
            return J.match(/^\s*\{/, !1) ? [null, null] : !1;
          },
          $: function(J) {
            return J.match(/^[\w-]+/), J.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"];
          },
          "#": function(J) {
            return J.eat("{") ? [null, "interpolation"] : !1;
          }
        },
        name: "css",
        helperType: "scss"
      }), z.defineMIME("text/x-less", {
        mediaTypes: de,
        mediaFeatures: N,
        mediaValueKeywords: X,
        propertyKeywords: ie,
        nonStandardPropertyKeywords: De,
        colorKeywords: me,
        valueKeywords: lt,
        fontProperties: Be,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
          "/": function(J, Y) {
            return J.eat("/") ? (J.skipToEnd(), ["comment", "comment"]) : J.eat("*") ? (Y.tokenize = Ke, Ke(J, Y)) : ["operator", "operator"];
          },
          "@": function(J) {
            return J.eat("{") ? [null, "interpolation"] : J.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, !1) ? !1 : (J.eatWhile(/[\w\\\-]/), J.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]);
          },
          "&": function() {
            return ["atom", "atom"];
          }
        },
        name: "css",
        helperType: "less"
      }), z.defineMIME("text/x-gss", {
        documentTypes: te,
        mediaTypes: de,
        mediaFeatures: N,
        propertyKeywords: ie,
        nonStandardPropertyKeywords: De,
        fontProperties: Be,
        counterDescriptors: $,
        colorKeywords: me,
        valueKeywords: lt,
        supportsAtComponent: !0,
        tokenHooks: {
          "/": function(J, Y) {
            return J.eat("*") ? (Y.tokenize = Ke, Ke(J, Y)) : !1;
          }
        },
        name: "css",
        helperType: "gss"
      });
    });
  }()), ma.exports;
}
(function(wt, Or) {
  (function(z) {
    z(Ar(), Cu(), wa(), xa());
  })(function(z) {
    var xe = {
      script: [
        ["lang", /(javascript|babel)/i, "javascript"],
        ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
        ["type", /./, "text/plain"],
        [null, null, "javascript"]
      ],
      style: [
        ["lang", /^css$/i, "css"],
        ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
        ["type", /./, "text/plain"],
        [null, null, "css"]
      ]
    };
    function fe(X, _, ie) {
      var le = X.current(), De = le.search(_);
      return De > -1 ? X.backUp(le.length - De) : le.match(/<\/?$/) && (X.backUp(le.length), X.match(_, !1) || X.match(le)), ie;
    }
    var te = {};
    function Z(X) {
      var _ = te[X];
      return _ || (te[X] = new RegExp("\\s+" + X + `\\s*=\\s*('|")?([^'"]+)('|")?\\s*`));
    }
    function de(X, _) {
      var ie = X.match(Z(_));
      return ie ? /^\s*(.*?)\s*$/.exec(ie[2])[1] : "";
    }
    function E(X, _) {
      return new RegExp((_ ? "^" : "") + "</\\s*" + X + "\\s*>", "i");
    }
    function N(X, _) {
      for (var ie in X)
        for (var le = _[ie] || (_[ie] = []), De = X[ie], We = De.length - 1; We >= 0; We--)
          le.unshift(De[We]);
    }
    function I(X, _) {
      for (var ie = 0; ie < X.length; ie++) {
        var le = X[ie];
        if (!le[0] || le[1].test(de(_, le[0]))) return le[2];
      }
    }
    z.defineMode("htmlmixed", function(X, _) {
      var ie = z.getMode(X, {
        name: "xml",
        htmlMode: !0,
        multilineTagIndentFactor: _.multilineTagIndentFactor,
        multilineTagIndentPastTag: _.multilineTagIndentPastTag,
        allowMissingTagName: _.allowMissingTagName
      }), le = {}, De = _ && _.tags, We = _ && _.scriptTypes;
      if (N(xe, le), De && N(De, le), We) for (var Be = We.length - 1; Be >= 0; Be--)
        le.script.unshift(["type", We[Be].matches, We[Be].mode]);
      function oe($, ae) {
        var me = ie.token($, ae.htmlState), Ue = /\btag\b/.test(me), lt;
        if (Ue && !/[<>\s\/]/.test($.current()) && (lt = ae.htmlState.tagName && ae.htmlState.tagName.toLowerCase()) && le.hasOwnProperty(lt))
          ae.inTag = lt + " ";
        else if (ae.inTag && Ue && />$/.test($.current())) {
          var Re = /^([\S]+) (.*)/.exec(ae.inTag);
          ae.inTag = null;
          var Ke = $.current() == ">" && I(le[Re[1]], Re[2]), J = z.getMode(X, Ke), Y = E(Re[1], !0), Le = E(Re[1], !1);
          ae.token = function(k, F) {
            return k.match(Y, !1) ? (F.token = oe, F.localState = F.localMode = null, null) : fe(k, Le, F.localMode.token(k, F.localState));
          }, ae.localMode = J, ae.localState = z.startState(J, ie.indent(ae.htmlState, "", ""));
        } else ae.inTag && (ae.inTag += $.current(), $.eol() && (ae.inTag += " "));
        return me;
      }
      return {
        startState: function() {
          var $ = z.startState(ie);
          return { token: oe, inTag: null, localMode: null, localState: null, htmlState: $ };
        },
        copyState: function($) {
          var ae;
          return $.localState && (ae = z.copyState($.localMode, $.localState)), {
            token: $.token,
            inTag: $.inTag,
            localMode: $.localMode,
            localState: ae,
            htmlState: z.copyState(ie, $.htmlState)
          };
        },
        token: function($, ae) {
          return ae.token($, ae);
        },
        indent: function($, ae, me) {
          return !$.localMode || /^\s*<\//.test(ae) ? ie.indent($.htmlState, ae, me) : $.localMode.indent ? $.localMode.indent($.localState, ae, me) : z.Pass;
        },
        innerMode: function($) {
          return { state: $.localState || $.htmlState, mode: $.localMode || ie };
        }
      };
    }, "xml", "javascript", "css"), z.defineMIME("text/html", "htmlmixed");
  });
})();
(function(wt, Or) {
  (function(z) {
    z(Ar());
  })(function(z) {
    z.defineMode("yaml", function() {
      var xe = ["true", "false", "on", "off", "yes", "no"], fe = new RegExp("\\b((" + xe.join(")|(") + "))$", "i");
      return {
        token: function(te, Z) {
          var de = te.peek(), E = Z.escaped;
          if (Z.escaped = !1, de == "#" && (te.pos == 0 || /\s/.test(te.string.charAt(te.pos - 1))))
            return te.skipToEnd(), "comment";
          if (te.match(/^('([^']|\\.)*'?|"([^"]|\\.)*"?)/))
            return "string";
          if (Z.literal && te.indentation() > Z.keyCol)
            return te.skipToEnd(), "string";
          if (Z.literal && (Z.literal = !1), te.sol()) {
            if (Z.keyCol = 0, Z.pair = !1, Z.pairStart = !1, te.match("---") || te.match("..."))
              return "def";
            if (te.match(/\s*-\s+/))
              return "meta";
          }
          if (te.match(/^(\{|\}|\[|\])/))
            return de == "{" ? Z.inlinePairs++ : de == "}" ? Z.inlinePairs-- : de == "[" ? Z.inlineList++ : Z.inlineList--, "meta";
          if (Z.inlineList > 0 && !E && de == ",")
            return te.next(), "meta";
          if (Z.inlinePairs > 0 && !E && de == ",")
            return Z.keyCol = 0, Z.pair = !1, Z.pairStart = !1, te.next(), "meta";
          if (Z.pairStart) {
            if (te.match(/^\s*(\||\>)\s*/))
              return Z.literal = !0, "meta";
            if (te.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i))
              return "variable-2";
            if (Z.inlinePairs == 0 && te.match(/^\s*-?[0-9\.\,]+\s?$/) || Z.inlinePairs > 0 && te.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/))
              return "number";
            if (te.match(fe))
              return "keyword";
          }
          return !Z.pair && te.match(/^\s*(?:[,\[\]{}&*!|>'"%@`][^\s'":]|[^\s,\[\]{}#&*!|>'"%@`])[^#:]*(?=:($|\s))/) ? (Z.pair = !0, Z.keyCol = te.indentation(), "atom") : Z.pair && te.match(/^:\s*/) ? (Z.pairStart = !0, "meta") : (Z.pairStart = !1, Z.escaped = de == "\\", te.next(), null);
        },
        startState: function() {
          return {
            pair: !1,
            pairStart: !1,
            keyCol: 0,
            inlinePairs: 0,
            inlineList: 0,
            literal: !1,
            escaped: !1
          };
        },
        lineComment: "#",
        fold: "indent"
      };
    }), z.defineMIME("text/x-yaml", "yaml"), z.defineMIME("text/yaml", "yaml");
  });
})();
xa();
(function(wt, Or) {
  (function(z) {
    z(Ar());
  })(function(z) {
    z.defineOption("placeholder", "", function(N, I, X) {
      var _ = X && X != z.Init;
      if (I && !_)
        N.on("blur", Z), N.on("change", de), N.on("swapDoc", de), z.on(N.getInputField(), "compositionupdate", N.state.placeholderCompose = function() {
          te(N);
        }), de(N);
      else if (!I && _) {
        N.off("blur", Z), N.off("change", de), N.off("swapDoc", de), z.off(N.getInputField(), "compositionupdate", N.state.placeholderCompose), xe(N);
        var ie = N.getWrapperElement();
        ie.className = ie.className.replace(" CodeMirror-empty", "");
      }
      I && !N.hasFocus() && Z(N);
    });
    function xe(N) {
      N.state.placeholder && (N.state.placeholder.parentNode.removeChild(N.state.placeholder), N.state.placeholder = null);
    }
    function fe(N) {
      xe(N);
      var I = N.state.placeholder = document.createElement("pre");
      I.style.cssText = "height: 0; overflow: visible", I.style.direction = N.getOption("direction"), I.className = "CodeMirror-placeholder CodeMirror-line-like";
      var X = N.getOption("placeholder");
      typeof X == "string" && (X = document.createTextNode(X)), I.appendChild(X), N.display.lineSpace.insertBefore(I, N.display.lineSpace.firstChild);
    }
    function te(N) {
      setTimeout(function() {
        var I = !1;
        if (N.lineCount() == 1) {
          var X = N.getInputField();
          I = X.nodeName == "TEXTAREA" ? !N.getLine(0).length : !/[^\u200b]/.test(X.querySelector(".CodeMirror-line").textContent);
        }
        I ? fe(N) : xe(N);
      }, 20);
    }
    function Z(N) {
      E(N) && fe(N);
    }
    function de(N) {
      var I = N.getWrapperElement(), X = E(N);
      I.className = I.className.replace(" CodeMirror-empty", "") + (X ? " CodeMirror-empty" : ""), X ? fe(N) : xe(N);
    }
    function E(N) {
      return N.lineCount() === 1 && N.getLine(0) === "";
    }
  });
})();
export {
  Lu as C
};
