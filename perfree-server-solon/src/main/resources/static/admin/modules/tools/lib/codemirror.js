var du = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pu(Ct) {
  return Ct && Ct.__esModule && Object.prototype.hasOwnProperty.call(Ct, "default") ? Ct.default : Ct;
}
var fl = { exports: {} }, da;
function hl() {
  return da || (da = 1, function(Ct, cl) {
    (function(U, je) {
      Ct.exports = je();
    })(du, function() {
      var U = navigator.userAgent, je = navigator.platform, j = /gecko\/\d/i.test(U), Ve = /MSIE \d/.test(U), St = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(U), Ne = /Edge\/(\d+)/.exec(U), z = Ve || St || Ne, N = z && (Ve ? document.documentMode || 6 : +(Ne || St)[1]), W = !Ne && /WebKit\//.test(U), ue = W && /Qt\/\d+\.\d+/.test(U), Pe = !Ne && /Chrome\/(\d+)/.exec(U), Pt = Pe && +Pe[1], Ge = /Opera\//.test(U), mr = /Apple Computer/.test(navigator.vendor), tr = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(U), br = /PhantomJS/.test(U), V = mr && (/Mobile\/\w+/.test(U) || navigator.maxTouchPoints > 2), Ze = /Android/.test(U), rr = V || Ze || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(U), be = V || /Mac/.test(je), nr = /\bCrOS\b/.test(U), hi = /win/i.test(je), $e = Ge && U.match(/Version\/(\d*\.\d*)/);
      $e && ($e = Number($e[1])), $e && $e >= 15 && (Ge = !1, W = !0);
      var Nn = be && (ue || Ge && ($e == null || $e < 12.11)), xr = j || z && N >= 9;
      function It(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
      }
      var ht = function(e, t) {
        var n = e.className, r = It(t).exec(n);
        if (r) {
          var i = n.slice(r.index + r[0].length);
          e.className = n.slice(0, r.index) + (i ? r[1] + i : "");
        }
      };
      function w(e) {
        for (var t = e.childNodes.length; t > 0; --t)
          e.removeChild(e.firstChild);
        return e;
      }
      function H(e, t) {
        return w(e).appendChild(t);
      }
      function p(e, t, n, r) {
        var i = document.createElement(e);
        if (n && (i.className = n), r && (i.style.cssText = r), typeof t == "string")
          i.appendChild(document.createTextNode(t));
        else if (t)
          for (var l = 0; l < t.length; ++l)
            i.appendChild(t[l]);
        return i;
      }
      function ct(e, t, n, r) {
        var i = p(e, t, n, r);
        return i.setAttribute("role", "presentation"), i;
      }
      var Ie;
      document.createRange ? Ie = function(e, t, n, r) {
        var i = document.createRange();
        return i.setEnd(r || e, n), i.setStart(e, t), i;
      } : Ie = function(e, t, n) {
        var r = document.body.createTextRange();
        try {
          r.moveToElementText(e.parentNode);
        } catch {
          return r;
        }
        return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r;
      };
      function et(e, t) {
        if (t.nodeType == 3 && (t = t.parentNode), e.contains)
          return e.contains(t);
        do
          if (t.nodeType == 11 && (t = t.host), t == e)
            return !0;
        while (t = t.parentNode);
      }
      function xe(e) {
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
      function Ue(e, t) {
        var n = e.className;
        It(t).test(n) || (e.className += (n ? " " : "") + t);
      }
      function kt(e, t) {
        for (var n = e.split(" "), r = 0; r < n.length; r++)
          n[r] && !It(n[r]).test(t) && (t += " " + n[r]);
        return t;
      }
      var ir = function(e) {
        e.select();
      };
      V ? ir = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : z && (ir = function(e) {
        try {
          e.select();
        } catch {
        }
      });
      function _e(e) {
        return e.display.wrapper.ownerDocument;
      }
      function tt(e) {
        return he(e.display.wrapper);
      }
      function he(e) {
        return e.getRootNode ? e.getRootNode() : e.ownerDocument;
      }
      function B(e) {
        return _e(e).defaultView;
      }
      function P(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
          return e.apply(null, t);
        };
      }
      function _(e, t, n) {
        t || (t = {});
        for (var r in e)
          e.hasOwnProperty(r) && (n !== !1 || !t.hasOwnProperty(r)) && (t[r] = e[r]);
        return t;
      }
      function Z(e, t, n, r, i) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var l = r || 0, o = i || 0; ; ) {
          var a = e.indexOf("	", l);
          if (a < 0 || a >= t)
            return o + (t - l);
          o += a - l, o += n - o % n, l = a + 1;
        }
      }
      var dt = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = P(this.onTimeout, this);
      };
      dt.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +/* @__PURE__ */ new Date() ? e.f() : setTimeout(e.handler, e.time - +/* @__PURE__ */ new Date());
      }, dt.prototype.set = function(e, t) {
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
      var Le = 50, Bt = { toString: function() {
        return "CodeMirror.Pass";
      } }, Ke = { scroll: !1 }, pt = { origin: "*mouse" }, Xe = { origin: "+move" };
      function vt(e, t, n) {
        for (var r = 0, i = 0; ; ) {
          var l = e.indexOf("	", r);
          l == -1 && (l = e.length);
          var o = l - r;
          if (l == e.length || i + o >= t)
            return r + Math.min(o, t - i);
          if (i += l - r, i += n - i % n, r = l + 1, i >= t)
            return r;
        }
      }
      var Lt = [""];
      function Zr(e) {
        for (; Lt.length <= e; )
          Lt.push(X(Lt) + " ");
        return Lt[e];
      }
      function X(e) {
        return e[e.length - 1];
      }
      function lr(e, t) {
        for (var n = [], r = 0; r < e.length; r++)
          n[r] = t(e[r], r);
        return n;
      }
      function ci(e, t, n) {
        for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i; )
          r++;
        e.splice(r, 0, t);
      }
      function Dn() {
      }
      function An(e, t) {
        var n;
        return Object.create ? n = Object.create(e) : (Dn.prototype = e, n = new Dn()), t && _(t, n), n;
      }
      var di = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function Qr(e) {
        return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || di.test(e));
      }
      function Tt(e, t) {
        return t ? t.source.indexOf("\\w") > -1 && Qr(e) ? !0 : t.test(e) : Qr(e);
      }
      function On(e) {
        for (var t in e)
          if (e.hasOwnProperty(t) && e[t])
            return !1;
        return !0;
      }
      var Mt = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function oe(e) {
        return e.charCodeAt(0) >= 768 && Mt.test(e);
      }
      function zt(e, t, n) {
        for (; (n < 0 ? t > 0 : t < e.length) && oe(e.charAt(t)); )
          t += n;
        return t;
      }
      function gt(e, t, n) {
        for (var r = t > n ? -1 : 1; ; ) {
          if (t == n)
            return t;
          var i = (t + n) / 2, l = r < 0 ? Math.ceil(i) : Math.floor(i);
          if (l == t)
            return e(l) ? t : n;
          e(l) ? n = l : t = l + r;
        }
      }
      function Rt(e, t, n, r) {
        if (!e)
          return r(t, n, "ltr", 0);
        for (var i = !1, l = 0; l < e.length; ++l) {
          var o = e[l];
          (o.from < n && o.to > t || t == n && o.to == t) && (r(Math.max(o.from, t), Math.min(o.to, n), o.level == 1 ? "rtl" : "ltr", l), i = !0);
        }
        i || r(t, n, "ltr");
      }
      var or = null;
      function Gt(e, t, n) {
        var r;
        or = null;
        for (var i = 0; i < e.length; ++i) {
          var l = e[i];
          if (l.from < t && l.to > t)
            return i;
          l.to == t && (l.from != l.to && n == "before" ? r = i : or = i), l.from == t && (l.from != l.to && n != "before" ? r = i : or = i);
        }
        return r ?? or;
      }
      var pi = /* @__PURE__ */ function() {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function n(u) {
          return u <= 247 ? e.charAt(u) : 1424 <= u && u <= 1524 ? "R" : 1536 <= u && u <= 1785 ? t.charAt(u - 1536) : 1774 <= u && u <= 2220 ? "r" : 8192 <= u && u <= 8203 ? "w" : u == 8204 ? "b" : "L";
        }
        var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, i = /[stwN]/, l = /[LRr]/, o = /[Lb1n]/, a = /[1n]/;
        function s(u, h, d) {
          this.level = u, this.from = h, this.to = d;
        }
        return function(u, h) {
          var d = h == "ltr" ? "L" : "R";
          if (u.length == 0 || h == "ltr" && !r.test(u))
            return !1;
          for (var g = u.length, v = [], m = 0; m < g; ++m)
            v.push(n(u.charCodeAt(m)));
          for (var x = 0, S = d; x < g; ++x) {
            var k = v[x];
            k == "m" ? v[x] = S : S = k;
          }
          for (var M = 0, L = d; M < g; ++M) {
            var D = v[M];
            D == "1" && L == "r" ? v[M] = "n" : l.test(D) && (L = D, D == "r" && (v[M] = "R"));
          }
          for (var F = 1, O = v[0]; F < g - 1; ++F) {
            var G = v[F];
            G == "+" && O == "1" && v[F + 1] == "1" ? v[F] = "1" : G == "," && O == v[F + 1] && (O == "1" || O == "n") && (v[F] = O), O = G;
          }
          for (var J = 0; J < g; ++J) {
            var ge = v[J];
            if (ge == ",")
              v[J] = "N";
            else if (ge == "%") {
              var ee = void 0;
              for (ee = J + 1; ee < g && v[ee] == "%"; ++ee)
                ;
              for (var Re = J && v[J - 1] == "!" || ee < g && v[ee] == "1" ? "1" : "N", He = J; He < ee; ++He)
                v[He] = Re;
              J = ee - 1;
            }
          }
          for (var ae = 0, Ee = d; ae < g; ++ae) {
            var me = v[ae];
            Ee == "L" && me == "1" ? v[ae] = "L" : l.test(me) && (Ee = me);
          }
          for (var fe = 0; fe < g; ++fe)
            if (i.test(v[fe])) {
              var se = void 0;
              for (se = fe + 1; se < g && i.test(v[se]); ++se)
                ;
              for (var ie = (fe ? v[fe - 1] : d) == "L", Fe = (se < g ? v[se] : d) == "L", Yr = ie == Fe ? ie ? "L" : "R" : d, er = fe; er < se; ++er)
                v[er] = Yr;
              fe = se - 1;
            }
          for (var ke = [], wt, ye = 0; ye < g; )
            if (o.test(v[ye])) {
              var sl = ye;
              for (++ye; ye < g && o.test(v[ye]); ++ye)
                ;
              ke.push(new s(0, sl, ye));
            } else {
              var Ft = ye, gr = ke.length, yr = h == "rtl" ? 1 : 0;
              for (++ye; ye < g && v[ye] != "L"; ++ye)
                ;
              for (var Me = Ft; Me < ye; )
                if (a.test(v[Me])) {
                  Ft < Me && (ke.splice(gr, 0, new s(1, Ft, Me)), gr += yr);
                  var qr = Me;
                  for (++Me; Me < ye && a.test(v[Me]); ++Me)
                    ;
                  ke.splice(gr, 0, new s(2, qr, Me)), gr += yr, Ft = Me;
                } else
                  ++Me;
              Ft < ye && ke.splice(gr, 0, new s(1, Ft, ye));
            }
          return h == "ltr" && (ke[0].level == 1 && (wt = u.match(/^\s+/)) && (ke[0].from = wt[0].length, ke.unshift(new s(0, 0, wt[0].length))), X(ke).level == 1 && (wt = u.match(/\s+$/)) && (X(ke).to -= wt[0].length, ke.push(new s(0, g - wt[0].length, g)))), h == "rtl" ? ke.reverse() : ke;
        };
      }();
      function K(e, t) {
        var n = e.order;
        return n == null && (n = e.order = pi(e.text, t)), n;
      }
      var Wn = [], E = function(e, t, n) {
        if (e.addEventListener)
          e.addEventListener(t, n, !1);
        else if (e.attachEvent)
          e.attachEvent("on" + t, n);
        else {
          var r = e._handlers || (e._handlers = {});
          r[t] = (r[t] || Wn).concat(n);
        }
      };
      function Nt(e, t) {
        return e._handlers && e._handlers[t] || Wn;
      }
      function we(e, t, n) {
        if (e.removeEventListener)
          e.removeEventListener(t, n, !1);
        else if (e.detachEvent)
          e.detachEvent("on" + t, n);
        else {
          var r = e._handlers, i = r && r[t];
          if (i) {
            var l = R(i, n);
            l > -1 && (r[t] = i.slice(0, l).concat(i.slice(l + 1)));
          }
        }
      }
      function te(e, t) {
        var n = Nt(e, t);
        if (n.length)
          for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i)
            n[i].apply(null, r);
      }
      function re(e, t, n) {
        return typeof t == "string" && (t = { type: t, preventDefault: function() {
          this.defaultPrevented = !0;
        } }), te(e, n || t.type, e, t), De(t) || t.codemirrorIgnore;
      }
      function Qe(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
          for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r)
            R(n, t[r]) == -1 && n.push(t[r]);
      }
      function Be(e, t) {
        return Nt(e, t).length > 0;
      }
      function rt(e) {
        e.prototype.on = function(t, n) {
          E(this, t, n);
        }, e.prototype.off = function(t, n) {
          we(this, t, n);
        };
      }
      function Ce(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }
      function wr(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }
      function De(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == !1;
      }
      function Ut(e) {
        Ce(e), wr(e);
      }
      function Jr(e) {
        return e.target || e.srcElement;
      }
      function nt(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), be && e.ctrlKey && t == 1 && (t = 3), t;
      }
      var vi = function() {
        if (z && N < 9)
          return !1;
        var e = p("div");
        return "draggable" in e || "dragDrop" in e;
      }(), Cr;
      function Hn(e) {
        if (Cr == null) {
          var t = p("span", "​");
          H(e, p("span", [t, document.createTextNode("x")])), e.firstChild.offsetHeight != 0 && (Cr = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(z && N < 8));
        }
        var n = Cr ? p("span", "​") : p("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        return n.setAttribute("cm-text", ""), n;
      }
      var jr;
      function _t(e) {
        if (jr != null)
          return jr;
        var t = H(e, document.createTextNode("AخA")), n = Ie(t, 0, 1).getBoundingClientRect(), r = Ie(t, 1, 2).getBoundingClientRect();
        return w(e), !n || n.left == n.right ? !1 : jr = r.right - n.right < 3;
      }
      var Je = `

b`.split(/\n/).length != 3 ? function(e) {
        for (var t = 0, n = [], r = e.length; t <= r; ) {
          var i = e.indexOf(`
`, t);
          i == -1 && (i = e.length);
          var l = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i), o = l.indexOf("\r");
          o != -1 ? (n.push(l.slice(0, o)), t += o + 1) : (n.push(l), t = i + 1);
        }
        return n;
      } : function(e) {
        return e.split(/\r\n?|\n/);
      }, Kt = window.getSelection ? function(e) {
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
      }, En = function() {
        var e = p("div");
        return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), typeof e.oncopy == "function");
      }(), it = null;
      function gi(e) {
        if (it != null)
          return it;
        var t = H(e, p("span", "x")), n = t.getBoundingClientRect(), r = Ie(t, 0, 1).getBoundingClientRect();
        return it = Math.abs(n.left - r.left) > 1;
      }
      var Sr = {}, lt = {};
      function ot(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Sr[e] = t;
      }
      function ar(e, t) {
        lt[e] = t;
      }
      function kr(e) {
        if (typeof e == "string" && lt.hasOwnProperty(e))
          e = lt[e];
        else if (e && typeof e.name == "string" && lt.hasOwnProperty(e.name)) {
          var t = lt[e.name];
          typeof t == "string" && (t = { name: t }), e = An(t, e), e.name = t.name;
        } else {
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
            return kr("application/xml");
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
            return kr("application/json");
        }
        return typeof e == "string" ? { name: e } : e || { name: "null" };
      }
      function Lr(e, t) {
        t = kr(t);
        var n = Sr[t.name];
        if (!n)
          return Lr(e, "text/plain");
        var r = n(e, t);
        if (Xt.hasOwnProperty(t.name)) {
          var i = Xt[t.name];
          for (var l in i)
            i.hasOwnProperty(l) && (r.hasOwnProperty(l) && (r["_" + l] = r[l]), r[l] = i[l]);
        }
        if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
          for (var o in t.modeProps)
            r[o] = t.modeProps[o];
        return r;
      }
      var Xt = {};
      function Tr(e, t) {
        var n = Xt.hasOwnProperty(e) ? Xt[e] : Xt[e] = {};
        _(t, n);
      }
      function yt(e, t) {
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
      function Vr(e, t) {
        for (var n; e.innerMode && (n = e.innerMode(t), !(!n || n.mode == e)); )
          t = n.state, e = n.mode;
        return n || { mode: e, state: t };
      }
      function Mr(e, t, n) {
        return e.startState ? e.startState(t, n) : !0;
      }
      var ne = function(e, t, n) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = n;
      };
      ne.prototype.eol = function() {
        return this.pos >= this.string.length;
      }, ne.prototype.sol = function() {
        return this.pos == this.lineStart;
      }, ne.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      }, ne.prototype.next = function() {
        if (this.pos < this.string.length)
          return this.string.charAt(this.pos++);
      }, ne.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos), n;
        if (typeof e == "string" ? n = t == e : n = t && (e.test ? e.test(t) : e(t)), n)
          return ++this.pos, t;
      }, ne.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e); )
          ;
        return this.pos > t;
      }, ne.prototype.eatSpace = function() {
        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
          ++this.pos;
        return this.pos > e;
      }, ne.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      }, ne.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1)
          return this.pos = t, !0;
      }, ne.prototype.backUp = function(e) {
        this.pos -= e;
      }, ne.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = Z(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Z(this.string, this.lineStart, this.tabSize) : 0);
      }, ne.prototype.indentation = function() {
        return Z(this.string, null, this.tabSize) - (this.lineStart ? Z(this.string, this.lineStart, this.tabSize) : 0);
      }, ne.prototype.match = function(e, t, n) {
        if (typeof e == "string") {
          var r = function(o) {
            return n ? o.toLowerCase() : o;
          }, i = this.string.substr(this.pos, e.length);
          if (r(i) == r(e))
            return t !== !1 && (this.pos += e.length), !0;
        } else {
          var l = this.string.slice(this.pos).match(e);
          return l && l.index > 0 ? null : (l && t !== !1 && (this.pos += l[0].length), l);
        }
      }, ne.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      }, ne.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      }, ne.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
      }, ne.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
      };
      function A(e, t) {
        if (t -= e.first, t < 0 || t >= e.size)
          throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; !n.lines; )
          for (var r = 0; ; ++r) {
            var i = n.children[r], l = i.chunkSize();
            if (t < l) {
              n = i;
              break;
            }
            t -= l;
          }
        return n.lines[t];
      }
      function Dt(e, t, n) {
        var r = [], i = t.line;
        return e.iter(t.line, n.line + 1, function(l) {
          var o = l.text;
          i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i;
        }), r;
      }
      function $r(e, t, n) {
        var r = [];
        return e.iter(t, n, function(i) {
          r.push(i.text);
        }), r;
      }
      function Ye(e, t) {
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
      function c(e, t) {
        var n = e.first;
        e: do {
          for (var r = 0; r < e.children.length; ++r) {
            var i = e.children[r], l = i.height;
            if (t < l) {
              e = i;
              continue e;
            }
            t -= l, n += i.chunkSize();
          }
          return n;
        } while (!e.lines);
        for (var o = 0; o < e.lines.length; ++o) {
          var a = e.lines[o], s = a.height;
          if (t < s)
            break;
          t -= s;
        }
        return n + o;
      }
      function b(e, t) {
        return t >= e.first && t < e.first + e.size;
      }
      function C(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }
      function y(e, t, n) {
        if (n === void 0 && (n = null), !(this instanceof y))
          return new y(e, t, n);
        this.line = e, this.ch = t, this.sticky = n;
      }
      function T(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }
      function Y(e, t) {
        return e.sticky == t.sticky && T(e, t) == 0;
      }
      function ce(e) {
        return y(e.line, e.ch);
      }
      function Ae(e, t) {
        return T(e, t) < 0 ? t : e;
      }
      function Nr(e, t) {
        return T(e, t) < 0 ? e : t;
      }
      function dl(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }
      function I(e, t) {
        if (t.line < e.first)
          return y(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? y(n, A(e, n).text.length) : pa(t, A(e, t.line).text.length);
      }
      function pa(e, t) {
        var n = e.ch;
        return n == null || n > t ? y(e.line, t) : n < 0 ? y(e.line, 0) : e;
      }
      function pl(e, t) {
        for (var n = [], r = 0; r < t.length; r++)
          n[r] = I(e, t[r]);
        return n;
      }
      var Fn = function(e, t) {
        this.state = e, this.lookAhead = t;
      }, mt = function(e, t, n, r) {
        this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1;
      };
      mt.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
      }, mt.prototype.baseToken = function(e) {
        if (!this.baseTokens)
          return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; )
          this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: t && t.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - e
        };
      }, mt.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }, mt.fromSaved = function(e, t, n) {
        return t instanceof Fn ? new mt(e, yt(e.mode, t.state), n, t.lookAhead) : new mt(e, yt(e.mode, t), n);
      }, mt.prototype.save = function(e) {
        var t = e !== !1 ? yt(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new Fn(t, this.maxLookAhead) : t;
      };
      function vl(e, t, n, r) {
        var i = [e.state.modeGen], l = {};
        wl(
          e,
          t.text,
          e.doc.mode,
          n,
          function(u, h) {
            return i.push(u, h);
          },
          l,
          r
        );
        for (var o = n.state, a = function(u) {
          n.baseTokens = i;
          var h = e.state.overlays[u], d = 1, g = 0;
          n.state = !0, wl(e, t.text, h.mode, n, function(v, m) {
            for (var x = d; g < v; ) {
              var S = i[d];
              S > v && i.splice(d, 1, v, i[d + 1], S), d += 2, g = Math.min(v, S);
            }
            if (m)
              if (h.opaque)
                i.splice(x, d - x, v, "overlay " + m), d = x + 2;
              else
                for (; x < d; x += 2) {
                  var k = i[x + 1];
                  i[x + 1] = (k ? k + " " : "") + "overlay " + m;
                }
          }, l), n.state = o, n.baseTokens = null, n.baseTokenPos = 1;
        }, s = 0; s < e.state.overlays.length; ++s) a(s);
        return { styles: i, classes: l.bgClass || l.textClass ? l : null };
      }
      function gl(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var r = en(e, f(t)), i = t.text.length > e.options.maxHighlightLength && yt(e.doc.mode, r.state), l = vl(e, t, r);
          i && (r.state = i), t.stateAfter = r.save(!i), t.styles = l.styles, l.classes ? t.styleClasses = l.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        }
        return t.styles;
      }
      function en(e, t, n) {
        var r = e.doc, i = e.display;
        if (!r.mode.startState)
          return new mt(r, !0, t);
        var l = va(e, t, n), o = l > r.first && A(r, l - 1).stateAfter, a = o ? mt.fromSaved(r, o, l) : new mt(r, Mr(r.mode), l);
        return r.iter(l, t, function(s) {
          yi(e, s.text, a);
          var u = a.line;
          s.stateAfter = u == t - 1 || u % 5 == 0 || u >= i.viewFrom && u < i.viewTo ? a.save() : null, a.nextLine();
        }), n && (r.modeFrontier = a.line), a;
      }
      function yi(e, t, n, r) {
        var i = e.doc.mode, l = new ne(t, e.options.tabSize, n);
        for (l.start = l.pos = r || 0, t == "" && yl(i, n.state); !l.eol(); )
          mi(i, l, n.state), l.start = l.pos;
      }
      function yl(e, t) {
        if (e.blankLine)
          return e.blankLine(t);
        if (e.innerMode) {
          var n = Vr(e, t);
          if (n.mode.blankLine)
            return n.mode.blankLine(n.state);
        }
      }
      function mi(e, t, n, r) {
        for (var i = 0; i < 10; i++) {
          r && (r[0] = Vr(e, n).mode);
          var l = e.token(t, n);
          if (t.pos > t.start)
            return l;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
      }
      var ml = function(e, t, n) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = n;
      };
      function bl(e, t, n, r) {
        var i = e.doc, l = i.mode, o;
        t = I(i, t);
        var a = A(i, t.line), s = en(e, t.line, n), u = new ne(a.text, e.options.tabSize, s), h;
        for (r && (h = []); (r || u.pos < t.ch) && !u.eol(); )
          u.start = u.pos, o = mi(l, u, s.state), r && h.push(new ml(u, o, yt(i.mode, s.state)));
        return r ? h : new ml(u, o, s.state);
      }
      function xl(e, t) {
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
      function wl(e, t, n, r, i, l, o) {
        var a = n.flattenSpans;
        a == null && (a = e.options.flattenSpans);
        var s = 0, u = null, h = new ne(t, e.options.tabSize, r), d, g = e.options.addModeClass && [null];
        for (t == "" && xl(yl(n, r.state), l); !h.eol(); ) {
          if (h.pos > e.options.maxHighlightLength ? (a = !1, o && yi(e, t, r, h.pos), h.pos = t.length, d = null) : d = xl(mi(n, h, r.state, g), l), g) {
            var v = g[0].name;
            v && (d = "m-" + (d ? v + " " + d : v));
          }
          if (!a || u != d) {
            for (; s < h.start; )
              s = Math.min(h.start, s + 5e3), i(s, u);
            u = d;
          }
          h.start = h.pos;
        }
        for (; s < h.pos; ) {
          var m = Math.min(h.pos, s + 5e3);
          i(m, u), s = m;
        }
      }
      function va(e, t, n) {
        for (var r, i, l = e.doc, o = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > o; --a) {
          if (a <= l.first)
            return l.first;
          var s = A(l, a - 1), u = s.stateAfter;
          if (u && (!n || a + (u instanceof Fn ? u.lookAhead : 0) <= l.modeFrontier))
            return a;
          var h = Z(s.text, null, e.options.tabSize);
          (i == null || r > h) && (i = a - 1, r = h);
        }
        return i;
      }
      function ga(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
          for (var n = e.first, r = t - 1; r > n; r--) {
            var i = A(e, r).stateAfter;
            if (i && (!(i instanceof Fn) || r + i.lookAhead < t)) {
              n = r + 1;
              break;
            }
          }
          e.highlightFrontier = Math.min(e.highlightFrontier, n);
        }
      }
      var Cl = !1, At = !1;
      function ya() {
        Cl = !0;
      }
      function ma() {
        At = !0;
      }
      function Pn(e, t, n) {
        this.marker = e, this.from = t, this.to = n;
      }
      function tn(e, t) {
        if (e)
          for (var n = 0; n < e.length; ++n) {
            var r = e[n];
            if (r.marker == t)
              return r;
          }
      }
      function ba(e, t) {
        for (var n, r = 0; r < e.length; ++r)
          e[r] != t && (n || (n = [])).push(e[r]);
        return n;
      }
      function xa(e, t, n) {
        var r = n && window.WeakSet && (n.markedSpans || (n.markedSpans = /* @__PURE__ */ new WeakSet()));
        r && e.markedSpans && r.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], r && r.add(e.markedSpans)), t.marker.attachLine(e);
      }
      function wa(e, t, n) {
        var r;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var l = e[i], o = l.marker, a = l.from == null || (o.inclusiveLeft ? l.from <= t : l.from < t);
            if (a || l.from == t && o.type == "bookmark" && (!n || !l.marker.insertLeft)) {
              var s = l.to == null || (o.inclusiveRight ? l.to >= t : l.to > t);
              (r || (r = [])).push(new Pn(o, l.from, s ? null : l.to));
            }
          }
        return r;
      }
      function Ca(e, t, n) {
        var r;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var l = e[i], o = l.marker, a = l.to == null || (o.inclusiveRight ? l.to >= t : l.to > t);
            if (a || l.from == t && o.type == "bookmark" && (!n || l.marker.insertLeft)) {
              var s = l.from == null || (o.inclusiveLeft ? l.from <= t : l.from < t);
              (r || (r = [])).push(new Pn(
                o,
                s ? null : l.from - t,
                l.to == null ? null : l.to - t
              ));
            }
          }
        return r;
      }
      function bi(e, t) {
        if (t.full)
          return null;
        var n = b(e, t.from.line) && A(e, t.from.line).markedSpans, r = b(e, t.to.line) && A(e, t.to.line).markedSpans;
        if (!n && !r)
          return null;
        var i = t.from.ch, l = t.to.ch, o = T(t.from, t.to) == 0, a = wa(n, i, o), s = Ca(r, l, o), u = t.text.length == 1, h = X(t.text).length + (u ? i : 0);
        if (a)
          for (var d = 0; d < a.length; ++d) {
            var g = a[d];
            if (g.to == null) {
              var v = tn(s, g.marker);
              v ? u && (g.to = v.to == null ? null : v.to + h) : g.to = i;
            }
          }
        if (s)
          for (var m = 0; m < s.length; ++m) {
            var x = s[m];
            if (x.to != null && (x.to += h), x.from == null) {
              var S = tn(a, x.marker);
              S || (x.from = h, u && (a || (a = [])).push(x));
            } else
              x.from += h, u && (a || (a = [])).push(x);
          }
        a && (a = Sl(a)), s && s != a && (s = Sl(s));
        var k = [a];
        if (!u) {
          var M = t.text.length - 2, L;
          if (M > 0 && a)
            for (var D = 0; D < a.length; ++D)
              a[D].to == null && (L || (L = [])).push(new Pn(a[D].marker, null, null));
          for (var F = 0; F < M; ++F)
            k.push(L);
          k.push(s);
        }
        return k;
      }
      function Sl(e) {
        for (var t = 0; t < e.length; ++t) {
          var n = e[t];
          n.from != null && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
        }
        return e.length ? e : null;
      }
      function Sa(e, t, n) {
        var r = null;
        if (e.iter(t.line, n.line + 1, function(v) {
          if (v.markedSpans)
            for (var m = 0; m < v.markedSpans.length; ++m) {
              var x = v.markedSpans[m].marker;
              x.readOnly && (!r || R(r, x) == -1) && (r || (r = [])).push(x);
            }
        }), !r)
          return null;
        for (var i = [{ from: t, to: n }], l = 0; l < r.length; ++l)
          for (var o = r[l], a = o.find(0), s = 0; s < i.length; ++s) {
            var u = i[s];
            if (!(T(u.to, a.from) < 0 || T(u.from, a.to) > 0)) {
              var h = [s, 1], d = T(u.from, a.from), g = T(u.to, a.to);
              (d < 0 || !o.inclusiveLeft && !d) && h.push({ from: u.from, to: a.from }), (g > 0 || !o.inclusiveRight && !g) && h.push({ from: a.to, to: u.to }), i.splice.apply(i, h), s += h.length - 3;
            }
          }
        return i;
      }
      function kl(e) {
        var t = e.markedSpans;
        if (t) {
          for (var n = 0; n < t.length; ++n)
            t[n].marker.detachLine(e);
          e.markedSpans = null;
        }
      }
      function Ll(e, t) {
        if (t) {
          for (var n = 0; n < t.length; ++n)
            t[n].marker.attachLine(e);
          e.markedSpans = t;
        }
      }
      function In(e) {
        return e.inclusiveLeft ? -1 : 0;
      }
      function Bn(e) {
        return e.inclusiveRight ? 1 : 0;
      }
      function xi(e, t) {
        var n = e.lines.length - t.lines.length;
        if (n != 0)
          return n;
        var r = e.find(), i = t.find(), l = T(r.from, i.from) || In(e) - In(t);
        if (l)
          return -l;
        var o = T(r.to, i.to) || Bn(e) - Bn(t);
        return o || t.id - e.id;
      }
      function Tl(e, t) {
        var n = At && e.markedSpans, r;
        if (n)
          for (var i = void 0, l = 0; l < n.length; ++l)
            i = n[l], i.marker.collapsed && (t ? i.from : i.to) == null && (!r || xi(r, i.marker) < 0) && (r = i.marker);
        return r;
      }
      function Ml(e) {
        return Tl(e, !0);
      }
      function zn(e) {
        return Tl(e, !1);
      }
      function ka(e, t) {
        var n = At && e.markedSpans, r;
        if (n)
          for (var i = 0; i < n.length; ++i) {
            var l = n[i];
            l.marker.collapsed && (l.from == null || l.from < t) && (l.to == null || l.to > t) && (!r || xi(r, l.marker) < 0) && (r = l.marker);
          }
        return r;
      }
      function Nl(e, t, n, r, i) {
        var l = A(e, t), o = At && l.markedSpans;
        if (o)
          for (var a = 0; a < o.length; ++a) {
            var s = o[a];
            if (s.marker.collapsed) {
              var u = s.marker.find(0), h = T(u.from, n) || In(s.marker) - In(i), d = T(u.to, r) || Bn(s.marker) - Bn(i);
              if (!(h >= 0 && d <= 0 || h <= 0 && d >= 0) && (h <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? T(u.to, n) >= 0 : T(u.to, n) > 0) || h >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? T(u.from, r) <= 0 : T(u.from, r) < 0)))
                return !0;
            }
          }
      }
      function at(e) {
        for (var t; t = Ml(e); )
          e = t.find(-1, !0).line;
        return e;
      }
      function La(e) {
        for (var t; t = zn(e); )
          e = t.find(1, !0).line;
        return e;
      }
      function Ta(e) {
        for (var t, n; t = zn(e); )
          e = t.find(1, !0).line, (n || (n = [])).push(e);
        return n;
      }
      function wi(e, t) {
        var n = A(e, t), r = at(n);
        return n == r ? t : f(r);
      }
      function Dl(e, t) {
        if (t > e.lastLine())
          return t;
        var n = A(e, t), r;
        if (!Yt(e, n))
          return t;
        for (; r = zn(n); )
          n = r.find(1, !0).line;
        return f(n) + 1;
      }
      function Yt(e, t) {
        var n = At && t.markedSpans;
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
          return Ci(e, r.line, tn(r.line.markedSpans, n.marker));
        }
        if (n.marker.inclusiveRight && n.to == t.text.length)
          return !0;
        for (var i = void 0, l = 0; l < t.markedSpans.length; ++l)
          if (i = t.markedSpans[l], i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (i.to == null || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && Ci(e, t, i))
            return !0;
      }
      function Ot(e) {
        e = at(e);
        for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
          var i = n.lines[r];
          if (i == e)
            break;
          t += i.height;
        }
        for (var l = n.parent; l; n = l, l = n.parent)
          for (var o = 0; o < l.children.length; ++o) {
            var a = l.children[o];
            if (a == n)
              break;
            t += a.height;
          }
        return t;
      }
      function Rn(e) {
        if (e.height == 0)
          return 0;
        for (var t = e.text.length, n, r = e; n = Ml(r); ) {
          var i = n.find(0, !0);
          r = i.from.line, t += i.from.ch - i.to.ch;
        }
        for (r = e; n = zn(r); ) {
          var l = n.find(0, !0);
          t -= r.text.length - l.from.ch, r = l.to.line, t += r.text.length - l.to.ch;
        }
        return t;
      }
      function Si(e) {
        var t = e.display, n = e.doc;
        t.maxLine = A(n, n.first), t.maxLineLength = Rn(t.maxLine), t.maxLineChanged = !0, n.iter(function(r) {
          var i = Rn(r);
          i > t.maxLineLength && (t.maxLineLength = i, t.maxLine = r);
        });
      }
      var Dr = function(e, t, n) {
        this.text = e, Ll(this, t), this.height = n ? n(this) : 1;
      };
      Dr.prototype.lineNo = function() {
        return f(this);
      }, rt(Dr);
      function Ma(e, t, n, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), e.order != null && (e.order = null), kl(e), Ll(e, n);
        var i = r ? r(e) : 1;
        i != e.height && Ye(e, i);
      }
      function Na(e) {
        e.parent = null, kl(e);
      }
      var Da = {}, Aa = {};
      function Al(e, t) {
        if (!e || /^\s*$/.test(e))
          return null;
        var n = t.addModeClass ? Aa : Da;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
      }
      function Ol(e, t) {
        var n = ct("span", null, null, W ? "padding-right: .1px" : null), r = {
          pre: ct("pre", [n], "CodeMirror-line"),
          content: n,
          col: 0,
          pos: 0,
          cm: e,
          trailingSpace: !1,
          splitSpaces: e.getOption("lineWrapping")
        };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
          var l = i ? t.rest[i - 1] : t.line, o = void 0;
          r.pos = 0, r.addToken = Wa, _t(e.display.measure) && (o = K(l, e.doc.direction)) && (r.addToken = Ea(r.addToken, o)), r.map = [];
          var a = t != e.display.externalMeasured && f(l);
          Fa(l, r, gl(e, l, a)), l.styleClasses && (l.styleClasses.bgClass && (r.bgClass = kt(l.styleClasses.bgClass, r.bgClass || "")), l.styleClasses.textClass && (r.textClass = kt(l.styleClasses.textClass, r.textClass || ""))), r.map.length == 0 && r.map.push(0, 0, r.content.appendChild(Hn(e.display.measure))), i == 0 ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (W) {
          var s = r.content.lastChild;
          (/\bcm-tab\b/.test(s.className) || s.querySelector && s.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack");
        }
        return te(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = kt(r.pre.className, r.textClass || "")), r;
      }
      function Oa(e) {
        var t = p("span", "•", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }
      function Wa(e, t, n, r, i, l, o) {
        if (t) {
          var a = e.splitSpaces ? Ha(t, e.trailingSpace) : t, s = e.cm.state.specialChars, u = !1, h;
          if (!s.test(t))
            e.col += t.length, h = document.createTextNode(a), e.map.push(e.pos, e.pos + t.length, h), z && N < 9 && (u = !0), e.pos += t.length;
          else {
            h = document.createDocumentFragment();
            for (var d = 0; ; ) {
              s.lastIndex = d;
              var g = s.exec(t), v = g ? g.index - d : t.length - d;
              if (v) {
                var m = document.createTextNode(a.slice(d, d + v));
                z && N < 9 ? h.appendChild(p("span", [m])) : h.appendChild(m), e.map.push(e.pos, e.pos + v, m), e.col += v, e.pos += v;
              }
              if (!g)
                break;
              d += v + 1;
              var x = void 0;
              if (g[0] == "	") {
                var S = e.cm.options.tabSize, k = S - e.col % S;
                x = h.appendChild(p("span", Zr(k), "cm-tab")), x.setAttribute("role", "presentation"), x.setAttribute("cm-text", "	"), e.col += k;
              } else g[0] == "\r" || g[0] == `
` ? (x = h.appendChild(p("span", g[0] == "\r" ? "␍" : "␤", "cm-invalidchar")), x.setAttribute("cm-text", g[0]), e.col += 1) : (x = e.cm.options.specialCharPlaceholder(g[0]), x.setAttribute("cm-text", g[0]), z && N < 9 ? h.appendChild(p("span", [x])) : h.appendChild(x), e.col += 1);
              e.map.push(e.pos, e.pos + 1, x), e.pos++;
            }
          }
          if (e.trailingSpace = a.charCodeAt(t.length - 1) == 32, n || r || i || u || l || o) {
            var M = n || "";
            r && (M += r), i && (M += i);
            var L = p("span", [h], M, l);
            if (o)
              for (var D in o)
                o.hasOwnProperty(D) && D != "style" && D != "class" && L.setAttribute(D, o[D]);
            return e.content.appendChild(L);
          }
          e.content.appendChild(h);
        }
      }
      function Ha(e, t) {
        if (e.length > 1 && !/  /.test(e))
          return e;
        for (var n = t, r = "", i = 0; i < e.length; i++) {
          var l = e.charAt(i);
          l == " " && n && (i == e.length - 1 || e.charCodeAt(i + 1) == 32) && (l = " "), r += l, n = l == " ";
        }
        return r;
      }
      function Ea(e, t) {
        return function(n, r, i, l, o, a, s) {
          i = i ? i + " cm-force-border" : "cm-force-border";
          for (var u = n.pos, h = u + r.length; ; ) {
            for (var d = void 0, g = 0; g < t.length && (d = t[g], !(d.to > u && d.from <= u)); g++)
              ;
            if (d.to >= h)
              return e(n, r, i, l, o, a, s);
            e(n, r.slice(0, d.to - u), i, l, null, a, s), l = null, r = r.slice(d.to - u), u = d.to;
          }
        };
      }
      function Wl(e, t, n, r) {
        var i = !r && n.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1;
      }
      function Fa(e, t, n) {
        var r = e.markedSpans, i = e.text, l = 0;
        if (!r) {
          for (var o = 1; o < n.length; o += 2)
            t.addToken(t, i.slice(l, l = n[o]), Al(n[o + 1], t.cm.options));
          return;
        }
        for (var a = i.length, s = 0, u = 1, h = "", d, g, v = 0, m, x, S, k, M; ; ) {
          if (v == s) {
            m = x = S = g = "", M = null, k = null, v = 1 / 0;
            for (var L = [], D = void 0, F = 0; F < r.length; ++F) {
              var O = r[F], G = O.marker;
              if (G.type == "bookmark" && O.from == s && G.widgetNode)
                L.push(G);
              else if (O.from <= s && (O.to == null || O.to > s || G.collapsed && O.to == s && O.from == s)) {
                if (O.to != null && O.to != s && v > O.to && (v = O.to, x = ""), G.className && (m += " " + G.className), G.css && (g = (g ? g + ";" : "") + G.css), G.startStyle && O.from == s && (S += " " + G.startStyle), G.endStyle && O.to == v && (D || (D = [])).push(G.endStyle, O.to), G.title && ((M || (M = {})).title = G.title), G.attributes)
                  for (var J in G.attributes)
                    (M || (M = {}))[J] = G.attributes[J];
                G.collapsed && (!k || xi(k.marker, G) < 0) && (k = O);
              } else O.from > s && v > O.from && (v = O.from);
            }
            if (D)
              for (var ge = 0; ge < D.length; ge += 2)
                D[ge + 1] == v && (x += " " + D[ge]);
            if (!k || k.from == s)
              for (var ee = 0; ee < L.length; ++ee)
                Wl(t, 0, L[ee]);
            if (k && (k.from || 0) == s) {
              if (Wl(
                t,
                (k.to == null ? a + 1 : k.to) - s,
                k.marker,
                k.from == null
              ), k.to == null)
                return;
              k.to == s && (k = !1);
            }
          }
          if (s >= a)
            break;
          for (var Re = Math.min(a, v); ; ) {
            if (h) {
              var He = s + h.length;
              if (!k) {
                var ae = He > Re ? h.slice(0, Re - s) : h;
                t.addToken(
                  t,
                  ae,
                  d ? d + m : m,
                  S,
                  s + ae.length == v ? x : "",
                  g,
                  M
                );
              }
              if (He >= Re) {
                h = h.slice(Re - s), s = Re;
                break;
              }
              s = He, S = "";
            }
            h = i.slice(l, l = n[u++]), d = Al(n[u++], t.cm.options);
          }
        }
      }
      function Hl(e, t, n) {
        this.line = t, this.rest = Ta(t), this.size = this.rest ? f(X(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = Yt(e, t);
      }
      function Gn(e, t, n) {
        for (var r = [], i, l = t; l < n; l = i) {
          var o = new Hl(e.doc, A(e.doc, l), l);
          i = l + o.size, r.push(o);
        }
        return r;
      }
      var Ar = null;
      function Pa(e) {
        Ar ? Ar.ops.push(e) : e.ownsGroup = Ar = {
          ops: [e],
          delayedCallbacks: []
        };
      }
      function Ia(e) {
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
      function Ba(e, t) {
        var n = e.ownsGroup;
        if (n)
          try {
            Ia(n);
          } finally {
            Ar = null, t(n);
          }
      }
      var rn = null;
      function de(e, t) {
        var n = Nt(e, t);
        if (n.length) {
          var r = Array.prototype.slice.call(arguments, 2), i;
          Ar ? i = Ar.delayedCallbacks : rn ? i = rn : (i = rn = [], setTimeout(za, 0));
          for (var l = function(a) {
            i.push(function() {
              return n[a].apply(null, r);
            });
          }, o = 0; o < n.length; ++o)
            l(o);
        }
      }
      function za() {
        var e = rn;
        rn = null;
        for (var t = 0; t < e.length; ++t)
          e[t]();
      }
      function El(e, t, n, r) {
        for (var i = 0; i < t.changes.length; i++) {
          var l = t.changes[i];
          l == "text" ? Ga(e, t) : l == "gutter" ? Pl(e, t, n, r) : l == "class" ? ki(e, t) : l == "widget" && Ua(e, t, r);
        }
        t.changes = null;
      }
      function nn(e) {
        return e.node == e.text && (e.node = p("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), z && N < 8 && (e.node.style.zIndex = 2)), e.node;
      }
      function Ra(e, t) {
        var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (n && (n += " CodeMirror-linebackground"), t.background)
          n ? t.background.className = n : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (n) {
          var r = nn(t);
          t.background = r.insertBefore(p("div", null, n), r.firstChild), e.display.input.setUneditable(t.background);
        }
      }
      function Fl(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : Ol(e, t);
      }
      function Ga(e, t) {
        var n = t.text.className, r = Fl(e, t);
        t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, ki(e, t)) : n && (t.text.className = n);
      }
      function ki(e, t) {
        Ra(e, t), t.line.wrapClass ? nn(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = n || "";
      }
      function Pl(e, t, n, r) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var i = nn(t);
          t.gutterBackground = p(
            "div",
            null,
            "CodeMirror-gutter-background " + t.line.gutterClass,
            "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"
          ), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text);
        }
        var l = t.line.gutterMarkers;
        if (e.options.lineNumbers || l) {
          var o = nn(t), a = t.gutter = p("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
          if (a.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(a), o.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), e.options.lineNumbers && (!l || !l["CodeMirror-linenumbers"]) && (t.lineNumber = a.appendChild(
            p(
              "div",
              C(e.options, n),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"
            )
          )), l)
            for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
              var u = e.display.gutterSpecs[s].className, h = l.hasOwnProperty(u) && l[u];
              h && a.appendChild(p(
                "div",
                [h],
                "CodeMirror-gutter-elt",
                "left: " + r.gutterLeft[u] + "px; width: " + r.gutterWidth[u] + "px"
              ));
            }
        }
      }
      function Ua(e, t, n) {
        t.alignable && (t.alignable = null);
        for (var r = It("CodeMirror-linewidget"), i = t.node.firstChild, l = void 0; i; i = l)
          l = i.nextSibling, r.test(i.className) && t.node.removeChild(i);
        Il(e, t, n);
      }
      function _a(e, t, n, r) {
        var i = Fl(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), ki(e, t), Pl(e, t, n, r), Il(e, t, r), t.node;
      }
      function Il(e, t, n) {
        if (Bl(e, t.line, t, n, !0), t.rest)
          for (var r = 0; r < t.rest.length; r++)
            Bl(e, t.rest[r], t, n, !1);
      }
      function Bl(e, t, n, r, i) {
        if (t.widgets)
          for (var l = nn(n), o = 0, a = t.widgets; o < a.length; ++o) {
            var s = a[o], u = p("div", [s.node], "CodeMirror-linewidget" + (s.className ? " " + s.className : ""));
            s.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), Ka(s, u, n, r), e.display.input.setUneditable(u), i && s.above ? l.insertBefore(u, n.gutter || n.text) : l.appendChild(u), de(s, "redraw");
          }
      }
      function Ka(e, t, n, r) {
        if (e.noHScroll) {
          (n.alignable || (n.alignable = [])).push(t);
          var i = r.wrapperWidth;
          t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px";
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
      }
      function ln(e) {
        if (e.height != null)
          return e.height;
        var t = e.doc.cm;
        if (!t)
          return 0;
        if (!et(document.body, e.node)) {
          var n = "position: relative;";
          e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), H(t.display.measure, p("div", [e.node], null, n));
        }
        return e.height = e.node.parentNode.offsetHeight;
      }
      function Wt(e, t) {
        for (var n = Jr(t); n != e.wrapper; n = n.parentNode)
          if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == e.sizer && n != e.mover)
            return !0;
      }
      function Un(e) {
        return e.lineSpace.offsetTop;
      }
      function Li(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }
      function zl(e) {
        if (e.cachedPaddingH)
          return e.cachedPaddingH;
        var t = H(e.measure, p("pre", "x", "CodeMirror-line-like")), n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, r = { left: parseInt(n.paddingLeft), right: parseInt(n.paddingRight) };
        return !isNaN(r.left) && !isNaN(r.right) && (e.cachedPaddingH = r), r;
      }
      function bt(e) {
        return Le - e.display.nativeBarWidth;
      }
      function sr(e) {
        return e.display.scroller.clientWidth - bt(e) - e.display.barWidth;
      }
      function Ti(e) {
        return e.display.scroller.clientHeight - bt(e) - e.display.barHeight;
      }
      function Xa(e, t, n) {
        var r = e.options.lineWrapping, i = r && sr(e);
        if (!t.measure.heights || r && t.measure.width != i) {
          var l = t.measure.heights = [];
          if (r) {
            t.measure.width = i;
            for (var o = t.text.firstChild.getClientRects(), a = 0; a < o.length - 1; a++) {
              var s = o[a], u = o[a + 1];
              Math.abs(s.bottom - u.bottom) > 2 && l.push((s.bottom + u.top) / 2 - n.top);
            }
          }
          l.push(n.bottom - n.top);
        }
      }
      function Rl(e, t, n) {
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
      function Ya(e, t) {
        t = at(t);
        var n = f(t), r = e.display.externalMeasured = new Hl(e.doc, t, n);
        r.lineN = n;
        var i = r.built = Ol(e, r);
        return r.text = i.pre, H(e.display.lineMeasure, i.pre), r;
      }
      function Gl(e, t, n, r) {
        return xt(e, Or(e, t), n, r);
      }
      function Mi(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
          return e.display.view[hr(e, t)];
        var n = e.display.externalMeasured;
        if (n && t >= n.lineN && t < n.lineN + n.size)
          return n;
      }
      function Or(e, t) {
        var n = f(t), r = Mi(e, n);
        r && !r.text ? r = null : r && r.changes && (El(e, r, n, Wi(e)), e.curOp.forceUpdate = !0), r || (r = Ya(e, t));
        var i = Rl(r, t, n);
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
      function xt(e, t, n, r, i) {
        t.before && (n = -1);
        var l = n + (r || ""), o;
        return t.cache.hasOwnProperty(l) ? o = t.cache[l] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Xa(e, t.view, t.rect), t.hasHeights = !0), o = Za(e, t, n, r), o.bogus || (t.cache[l] = o)), {
          left: o.left,
          right: o.right,
          top: i ? o.rtop : o.top,
          bottom: i ? o.rbottom : o.bottom
        };
      }
      var Ul = { left: 0, right: 0, top: 0, bottom: 0 };
      function _l(e, t, n) {
        for (var r, i, l, o, a, s, u = 0; u < e.length; u += 3)
          if (a = e[u], s = e[u + 1], t < a ? (i = 0, l = 1, o = "left") : t < s ? (i = t - a, l = i + 1) : (u == e.length - 3 || t == s && e[u + 3] > t) && (l = s - a, i = l - 1, t >= s && (o = "right")), i != null) {
            if (r = e[u + 2], a == s && n == (r.insertLeft ? "left" : "right") && (o = n), n == "left" && i == 0)
              for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; )
                r = e[(u -= 3) + 2], o = "left";
            if (n == "right" && i == s - a)
              for (; u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft; )
                r = e[(u += 3) + 2], o = "right";
            break;
          }
        return { node: r, start: i, end: l, collapse: o, coverStart: a, coverEnd: s };
      }
      function qa(e, t) {
        var n = Ul;
        if (t == "left")
          for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++)
            ;
        else
          for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--)
            ;
        return n;
      }
      function Za(e, t, n, r) {
        var i = _l(t.map, n, r), l = i.node, o = i.start, a = i.end, s = i.collapse, u;
        if (l.nodeType == 3) {
          for (var h = 0; h < 4; h++) {
            for (; o && oe(t.line.text.charAt(i.coverStart + o)); )
              --o;
            for (; i.coverStart + a < i.coverEnd && oe(t.line.text.charAt(i.coverStart + a)); )
              ++a;
            if (z && N < 9 && o == 0 && a == i.coverEnd - i.coverStart ? u = l.parentNode.getBoundingClientRect() : u = qa(Ie(l, o, a).getClientRects(), r), u.left || u.right || o == 0)
              break;
            a = o, o = o - 1, s = "right";
          }
          z && N < 11 && (u = Qa(e.display.measure, u));
        } else {
          o > 0 && (s = r = "right");
          var d;
          e.options.lineWrapping && (d = l.getClientRects()).length > 1 ? u = d[r == "right" ? d.length - 1 : 0] : u = l.getBoundingClientRect();
        }
        if (z && N < 9 && !o && (!u || !u.left && !u.right)) {
          var g = l.parentNode.getClientRects()[0];
          g ? u = { left: g.left, right: g.left + Hr(e.display), top: g.top, bottom: g.bottom } : u = Ul;
        }
        for (var v = u.top - t.rect.top, m = u.bottom - t.rect.top, x = (v + m) / 2, S = t.view.measure.heights, k = 0; k < S.length - 1 && !(x < S[k]); k++)
          ;
        var M = k ? S[k - 1] : 0, L = S[k], D = {
          left: (s == "right" ? u.right : u.left) - t.rect.left,
          right: (s == "left" ? u.left : u.right) - t.rect.left,
          top: M,
          bottom: L
        };
        return !u.left && !u.right && (D.bogus = !0), e.options.singleCursorHeightPerLine || (D.rtop = v, D.rbottom = m), D;
      }
      function Qa(e, t) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !gi(e))
          return t;
        var n = screen.logicalXDPI / screen.deviceXDPI, r = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: t.left * n,
          right: t.right * n,
          top: t.top * r,
          bottom: t.bottom * r
        };
      }
      function Kl(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
          for (var t = 0; t < e.rest.length; t++)
            e.measure.caches[t] = {};
      }
      function Xl(e) {
        e.display.externalMeasure = null, w(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++)
          Kl(e.display.view[t]);
      }
      function on(e) {
        Xl(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
      }
      function Yl(e) {
        return Pe && Ze ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft)) : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
      }
      function ql(e) {
        return Pe && Ze ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop)) : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
      }
      function Ni(e) {
        var t = at(e), n = t.widgets, r = 0;
        if (n)
          for (var i = 0; i < n.length; ++i)
            n[i].above && (r += ln(n[i]));
        return r;
      }
      function _n(e, t, n, r, i) {
        if (!i) {
          var l = Ni(t);
          n.top += l, n.bottom += l;
        }
        if (r == "line")
          return n;
        r || (r = "local");
        var o = Ot(t);
        if (r == "local" ? o += Un(e.display) : o -= e.display.viewOffset, r == "page" || r == "window") {
          var a = e.display.lineSpace.getBoundingClientRect();
          o += a.top + (r == "window" ? 0 : ql(_e(e)));
          var s = a.left + (r == "window" ? 0 : Yl(_e(e)));
          n.left += s, n.right += s;
        }
        return n.top += o, n.bottom += o, n;
      }
      function Zl(e, t, n) {
        if (n == "div")
          return t;
        var r = t.left, i = t.top;
        if (n == "page")
          r -= Yl(_e(e)), i -= ql(_e(e));
        else if (n == "local" || !n) {
          var l = e.display.sizer.getBoundingClientRect();
          r += l.left, i += l.top;
        }
        var o = e.display.lineSpace.getBoundingClientRect();
        return { left: r - o.left, top: i - o.top };
      }
      function Kn(e, t, n, r, i) {
        return r || (r = A(e.doc, t.line)), _n(e, r, Gl(e, r, t.ch, i), n);
      }
      function st(e, t, n, r, i, l) {
        r = r || A(e.doc, t.line), i || (i = Or(e, r));
        function o(m, x) {
          var S = xt(e, i, m, x ? "right" : "left", l);
          return x ? S.left = S.right : S.right = S.left, _n(e, r, S, n);
        }
        var a = K(r, e.doc.direction), s = t.ch, u = t.sticky;
        if (s >= r.text.length ? (s = r.text.length, u = "before") : s <= 0 && (s = 0, u = "after"), !a)
          return o(u == "before" ? s - 1 : s, u == "before");
        function h(m, x, S) {
          var k = a[x], M = k.level == 1;
          return o(S ? m - 1 : m, M != S);
        }
        var d = Gt(a, s, u), g = or, v = h(s, d, u == "before");
        return g != null && (v.other = h(s, g, u != "before")), v;
      }
      function Ql(e, t) {
        var n = 0;
        t = I(e.doc, t), e.options.lineWrapping || (n = Hr(e.display) * t.ch);
        var r = A(e.doc, t.line), i = Ot(r) + Un(e.display);
        return { left: n, right: n, top: i, bottom: i + r.height };
      }
      function Di(e, t, n, r, i) {
        var l = y(e, t, n);
        return l.xRel = i, r && (l.outside = r), l;
      }
      function Ai(e, t, n) {
        var r = e.doc;
        if (n += e.display.viewOffset, n < 0)
          return Di(r.first, 0, null, -1, -1);
        var i = c(r, n), l = r.first + r.size - 1;
        if (i > l)
          return Di(r.first + r.size - 1, A(r, l).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var o = A(r, i); ; ) {
          var a = Ja(e, o, i, t, n), s = ka(o, a.ch + (a.xRel > 0 || a.outside > 0 ? 1 : 0));
          if (!s)
            return a;
          var u = s.find(1);
          if (u.line == i)
            return u;
          o = A(r, i = u.line);
        }
      }
      function Jl(e, t, n, r) {
        r -= Ni(t);
        var i = t.text.length, l = gt(function(o) {
          return xt(e, n, o - 1).bottom <= r;
        }, i, 0);
        return i = gt(function(o) {
          return xt(e, n, o).top > r;
        }, l, i), { begin: l, end: i };
      }
      function jl(e, t, n, r) {
        n || (n = Or(e, t));
        var i = _n(e, t, xt(e, n, r), "line").top;
        return Jl(e, t, n, i);
      }
      function Oi(e, t, n, r) {
        return e.bottom <= n ? !1 : e.top > n ? !0 : (r ? e.left : e.right) > t;
      }
      function Ja(e, t, n, r, i) {
        i -= Ot(t);
        var l = Or(e, t), o = Ni(t), a = 0, s = t.text.length, u = !0, h = K(t, e.doc.direction);
        if (h) {
          var d = (e.options.lineWrapping ? Va : ja)(e, t, n, l, h, r, i);
          u = d.level != 1, a = u ? d.from : d.to - 1, s = u ? d.to : d.from - 1;
        }
        var g = null, v = null, m = gt(function(F) {
          var O = xt(e, l, F);
          return O.top += o, O.bottom += o, Oi(O, r, i, !1) ? (O.top <= i && O.left <= r && (g = F, v = O), !0) : !1;
        }, a, s), x, S, k = !1;
        if (v) {
          var M = r - v.left < v.right - r, L = M == u;
          m = g + (L ? 0 : 1), S = L ? "after" : "before", x = M ? v.left : v.right;
        } else {
          !u && (m == s || m == a) && m++, S = m == 0 ? "after" : m == t.text.length ? "before" : xt(e, l, m - (u ? 1 : 0)).bottom + o <= i == u ? "after" : "before";
          var D = st(e, y(n, m, S), "line", t, l);
          x = D.left, k = i < D.top ? -1 : i >= D.bottom ? 1 : 0;
        }
        return m = zt(t.text, m, 1), Di(n, m, S, k, r - x);
      }
      function ja(e, t, n, r, i, l, o) {
        var a = gt(function(d) {
          var g = i[d], v = g.level != 1;
          return Oi(st(
            e,
            y(n, v ? g.to : g.from, v ? "before" : "after"),
            "line",
            t,
            r
          ), l, o, !0);
        }, 0, i.length - 1), s = i[a];
        if (a > 0) {
          var u = s.level != 1, h = st(
            e,
            y(n, u ? s.from : s.to, u ? "after" : "before"),
            "line",
            t,
            r
          );
          Oi(h, l, o, !0) && h.top > o && (s = i[a - 1]);
        }
        return s;
      }
      function Va(e, t, n, r, i, l, o) {
        var a = Jl(e, t, r, o), s = a.begin, u = a.end;
        /\s/.test(t.text.charAt(u - 1)) && u--;
        for (var h = null, d = null, g = 0; g < i.length; g++) {
          var v = i[g];
          if (!(v.from >= u || v.to <= s)) {
            var m = v.level != 1, x = xt(e, r, m ? Math.min(u, v.to) - 1 : Math.max(s, v.from)).right, S = x < l ? l - x + 1e9 : x - l;
            (!h || d > S) && (h = v, d = S);
          }
        }
        return h || (h = i[i.length - 1]), h.from < s && (h = { from: s, to: h.to, level: h.level }), h.to > u && (h = { from: h.from, to: u, level: h.level }), h;
      }
      var ur;
      function Wr(e) {
        if (e.cachedTextHeight != null)
          return e.cachedTextHeight;
        if (ur == null) {
          ur = p("pre", null, "CodeMirror-line-like");
          for (var t = 0; t < 49; ++t)
            ur.appendChild(document.createTextNode("x")), ur.appendChild(p("br"));
          ur.appendChild(document.createTextNode("x"));
        }
        H(e.measure, ur);
        var n = ur.offsetHeight / 50;
        return n > 3 && (e.cachedTextHeight = n), w(e.measure), n || 1;
      }
      function Hr(e) {
        if (e.cachedCharWidth != null)
          return e.cachedCharWidth;
        var t = p("span", "xxxxxxxxxx"), n = p("pre", [t], "CodeMirror-line-like");
        H(e.measure, n);
        var r = t.getBoundingClientRect(), i = (r.right - r.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10;
      }
      function Wi(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, l = t.gutters.firstChild, o = 0; l; l = l.nextSibling, ++o) {
          var a = e.display.gutterSpecs[o].className;
          n[a] = l.offsetLeft + l.clientLeft + i, r[a] = l.clientWidth;
        }
        return {
          fixedPos: Hi(t),
          gutterTotalWidth: t.gutters.offsetWidth,
          gutterLeft: n,
          gutterWidth: r,
          wrapperWidth: t.wrapper.clientWidth
        };
      }
      function Hi(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }
      function Vl(e) {
        var t = Wr(e.display), n = e.options.lineWrapping, r = n && Math.max(5, e.display.scroller.clientWidth / Hr(e.display) - 3);
        return function(i) {
          if (Yt(e.doc, i))
            return 0;
          var l = 0;
          if (i.widgets)
            for (var o = 0; o < i.widgets.length; o++)
              i.widgets[o].height && (l += i.widgets[o].height);
          return n ? l + (Math.ceil(i.text.length / r) || 1) * t : l + t;
        };
      }
      function Ei(e) {
        var t = e.doc, n = Vl(e);
        t.iter(function(r) {
          var i = n(r);
          i != r.height && Ye(r, i);
        });
      }
      function fr(e, t, n, r) {
        var i = e.display;
        if (!n && Jr(t).getAttribute("cm-not-content") == "true")
          return null;
        var l, o, a = i.lineSpace.getBoundingClientRect();
        try {
          l = t.clientX - a.left, o = t.clientY - a.top;
        } catch {
          return null;
        }
        var s = Ai(e, l, o), u;
        if (r && s.xRel > 0 && (u = A(e.doc, s.line).text).length == s.ch) {
          var h = Z(u, u.length, e.options.tabSize) - u.length;
          s = y(s.line, Math.max(0, Math.round((l - zl(e.display).left) / Hr(e.display)) - h));
        }
        return s;
      }
      function hr(e, t) {
        if (t >= e.display.viewTo || (t -= e.display.viewFrom, t < 0))
          return null;
        for (var n = e.display.view, r = 0; r < n.length; r++)
          if (t -= n[r].size, t < 0)
            return r;
      }
      function Oe(e, t, n, r) {
        t == null && (t = e.doc.first), n == null && (n = e.doc.first + e.doc.size), r || (r = 0);
        var i = e.display;
        if (r && n < i.viewTo && (i.updateLineNumbers == null || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo)
          At && wi(e.doc, t) < i.viewTo && Zt(e);
        else if (n <= i.viewFrom)
          At && Dl(e.doc, n + r) > i.viewFrom ? Zt(e) : (i.viewFrom += r, i.viewTo += r);
        else if (t <= i.viewFrom && n >= i.viewTo)
          Zt(e);
        else if (t <= i.viewFrom) {
          var l = Xn(e, n, n + r, 1);
          l ? (i.view = i.view.slice(l.index), i.viewFrom = l.lineN, i.viewTo += r) : Zt(e);
        } else if (n >= i.viewTo) {
          var o = Xn(e, t, t, -1);
          o ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : Zt(e);
        } else {
          var a = Xn(e, t, t, -1), s = Xn(e, n, n + r, 1);
          a && s ? (i.view = i.view.slice(0, a.index).concat(Gn(e, a.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += r) : Zt(e);
        }
        var u = i.externalMeasured;
        u && (n < u.lineN ? u.lineN += r : t < u.lineN + u.size && (i.externalMeasured = null));
      }
      function qt(e, t, n) {
        e.curOp.viewChanged = !0;
        var r = e.display, i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
          var l = r.view[hr(e, t)];
          if (l.node != null) {
            var o = l.changes || (l.changes = []);
            R(o, n) == -1 && o.push(n);
          }
        }
      }
      function Zt(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }
      function Xn(e, t, n, r) {
        var i = hr(e, t), l, o = e.display.view;
        if (!At || n == e.doc.first + e.doc.size)
          return { index: i, lineN: n };
        for (var a = e.display.viewFrom, s = 0; s < i; s++)
          a += o[s].size;
        if (a != t) {
          if (r > 0) {
            if (i == o.length - 1)
              return null;
            l = a + o[i].size - t, i++;
          } else
            l = a - t;
          t += l, n += l;
        }
        for (; wi(e.doc, n) != n; ) {
          if (i == (r < 0 ? 0 : o.length - 1))
            return null;
          n += r * o[i - (r < 0 ? 1 : 0)].size, i += r;
        }
        return { index: i, lineN: n };
      }
      function $a(e, t, n) {
        var r = e.display, i = r.view;
        i.length == 0 || t >= r.viewTo || n <= r.viewFrom ? (r.view = Gn(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = Gn(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(hr(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(Gn(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, hr(e, n)))), r.viewTo = n;
      }
      function $l(e) {
        for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
          var i = t[r];
          !i.hidden && (!i.node || i.changes) && ++n;
        }
        return n;
      }
      function an(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }
      function eo(e, t) {
        t === void 0 && (t = !0);
        var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), l = r.selection = document.createDocumentFragment(), o = e.options.$customCursor;
        o && (t = !0);
        for (var a = 0; a < n.sel.ranges.length; a++)
          if (!(!t && a == n.sel.primIndex)) {
            var s = n.sel.ranges[a];
            if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
              var u = s.empty();
              if (o) {
                var h = o(e, s);
                h && Fi(e, h, i);
              } else (u || e.options.showCursorWhenSelecting) && Fi(e, s.head, i);
              u || es(e, s, l);
            }
          }
        return r;
      }
      function Fi(e, t, n) {
        var r = st(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = n.appendChild(p("div", " ", "CodeMirror-cursor"));
        if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
          var l = Kn(e, t, "div", null, null), o = l.right - l.left;
          i.style.width = (o > 0 ? o : e.defaultCharWidth()) + "px";
        }
        if (r.other) {
          var a = n.appendChild(p("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
          a.style.display = "", a.style.left = r.other.left + "px", a.style.top = r.other.top + "px", a.style.height = (r.other.bottom - r.other.top) * 0.85 + "px";
        }
      }
      function Yn(e, t) {
        return e.top - t.top || e.left - t.left;
      }
      function es(e, t, n) {
        var r = e.display, i = e.doc, l = document.createDocumentFragment(), o = zl(e.display), a = o.left, s = Math.max(r.sizerWidth, sr(e) - r.sizer.offsetLeft) - o.right, u = i.direction == "ltr";
        function h(L, D, F, O) {
          D < 0 && (D = 0), D = Math.round(D), O = Math.round(O), l.appendChild(p("div", null, "CodeMirror-selected", "position: absolute; left: " + L + `px;
                             top: ` + D + "px; width: " + (F ?? s - L) + `px;
                             height: ` + (O - D) + "px"));
        }
        function d(L, D, F) {
          var O = A(i, L), G = O.text.length, J, ge;
          function ee(ae, Ee) {
            return Kn(e, y(L, ae), "div", O, Ee);
          }
          function Re(ae, Ee, me) {
            var fe = jl(e, O, null, ae), se = Ee == "ltr" == (me == "after") ? "left" : "right", ie = me == "after" ? fe.begin : fe.end - (/\s/.test(O.text.charAt(fe.end - 1)) ? 2 : 1);
            return ee(ie, se)[se];
          }
          var He = K(O, i.direction);
          return Rt(He, D || 0, F ?? G, function(ae, Ee, me, fe) {
            var se = me == "ltr", ie = ee(ae, se ? "left" : "right"), Fe = ee(Ee - 1, se ? "right" : "left"), Yr = D == null && ae == 0, er = F == null && Ee == G, ke = fe == 0, wt = !He || fe == He.length - 1;
            if (Fe.top - ie.top <= 3) {
              var ye = (u ? Yr : er) && ke, sl = (u ? er : Yr) && wt, Ft = ye ? a : (se ? ie : Fe).left, gr = sl ? s : (se ? Fe : ie).right;
              h(Ft, ie.top, gr - Ft, ie.bottom);
            } else {
              var yr, Me, qr, ul;
              se ? (yr = u && Yr && ke ? a : ie.left, Me = u ? s : Re(ae, me, "before"), qr = u ? a : Re(Ee, me, "after"), ul = u && er && wt ? s : Fe.right) : (yr = u ? Re(ae, me, "before") : a, Me = !u && Yr && ke ? s : ie.right, qr = !u && er && wt ? a : Fe.left, ul = u ? Re(Ee, me, "after") : s), h(yr, ie.top, Me - yr, ie.bottom), ie.bottom < Fe.top && h(a, ie.bottom, null, Fe.top), h(qr, Fe.top, ul - qr, Fe.bottom);
            }
            (!J || Yn(ie, J) < 0) && (J = ie), Yn(Fe, J) < 0 && (J = Fe), (!ge || Yn(ie, ge) < 0) && (ge = ie), Yn(Fe, ge) < 0 && (ge = Fe);
          }), { start: J, end: ge };
        }
        var g = t.from(), v = t.to();
        if (g.line == v.line)
          d(g.line, g.ch, v.ch);
        else {
          var m = A(i, g.line), x = A(i, v.line), S = at(m) == at(x), k = d(g.line, g.ch, S ? m.text.length + 1 : null).end, M = d(v.line, S ? 0 : null, v.ch).start;
          S && (k.top < M.top - 2 ? (h(k.right, k.top, null, k.bottom), h(a, M.top, M.left, M.bottom)) : h(k.right, k.top, M.left - k.right, k.bottom)), k.bottom < M.top && h(a, k.bottom, null, M.top);
        }
        n.appendChild(l);
      }
      function Pi(e) {
        if (e.state.focused) {
          var t = e.display;
          clearInterval(t.blinker);
          var n = !0;
          t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
            e.hasFocus() || Er(e), t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }
      function to(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || Bi(e));
      }
      function Ii(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && Er(e));
        }, 100);
      }
      function Bi(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), e.options.readOnly != "nocursor" && (e.state.focused || (te(e, "focus", e, t), e.state.focused = !0, Ue(e.display.wrapper, "CodeMirror-focused"), !e.curOp && e.display.selForContextMenu != e.doc.sel && (e.display.input.reset(), W && setTimeout(function() {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), Pi(e));
      }
      function Er(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (te(e, "blur", e, t), e.state.focused = !1, ht(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }
      function qn(e) {
        for (var t = e.display, n = t.lineDiv.offsetTop, r = Math.max(0, t.scroller.getBoundingClientRect().top), i = t.lineDiv.getBoundingClientRect().top, l = 0, o = 0; o < t.view.length; o++) {
          var a = t.view[o], s = e.options.lineWrapping, u = void 0, h = 0;
          if (!a.hidden) {
            if (i += a.line.height, z && N < 8) {
              var d = a.node.offsetTop + a.node.offsetHeight;
              u = d - n, n = d;
            } else {
              var g = a.node.getBoundingClientRect();
              u = g.bottom - g.top, !s && a.text.firstChild && (h = a.text.firstChild.getBoundingClientRect().right - g.left - 1);
            }
            var v = a.line.height - u;
            if ((v > 5e-3 || v < -5e-3) && (i < r && (l -= v), Ye(a.line, u), ro(a.line), a.rest))
              for (var m = 0; m < a.rest.length; m++)
                ro(a.rest[m]);
            if (h > e.display.sizerWidth) {
              var x = Math.ceil(h / Hr(e.display));
              x > e.display.maxLineLength && (e.display.maxLineLength = x, e.display.maxLine = a.line, e.display.maxLineChanged = !0);
            }
          }
        }
        Math.abs(l) > 2 && (t.scroller.scrollTop += l);
      }
      function ro(e) {
        if (e.widgets)
          for (var t = 0; t < e.widgets.length; ++t) {
            var n = e.widgets[t], r = n.node.parentNode;
            r && (n.height = r.offsetHeight);
          }
      }
      function Zn(e, t, n) {
        var r = n && n.top != null ? Math.max(0, n.top) : e.scroller.scrollTop;
        r = Math.floor(r - Un(e));
        var i = n && n.bottom != null ? n.bottom : r + e.wrapper.clientHeight, l = c(t, r), o = c(t, i);
        if (n && n.ensure) {
          var a = n.ensure.from.line, s = n.ensure.to.line;
          a < l ? (l = a, o = c(t, Ot(A(t, a)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= o && (l = c(t, Ot(A(t, s)) - e.wrapper.clientHeight), o = s);
        }
        return { from: l, to: Math.max(o, l + 1) };
      }
      function ts(e, t) {
        if (!re(e, "scrollCursorIntoView")) {
          var n = e.display, r = n.sizer.getBoundingClientRect(), i = null, l = n.wrapper.ownerDocument;
          if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (l.defaultView.innerHeight || l.documentElement.clientHeight) && (i = !1), i != null && !br) {
            var o = p("div", "​", null, `position: absolute;
                         top: ` + (t.top - n.viewOffset - Un(e.display)) + `px;
                         height: ` + (t.bottom - t.top + bt(e) + n.barHeight) + `px;
                         left: ` + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
            e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o);
          }
        }
      }
      function rs(e, t, n, r) {
        r == null && (r = 0);
        var i;
        !e.options.lineWrapping && t == n && (n = t.sticky == "before" ? y(t.line, t.ch + 1, "before") : t, t = t.ch ? y(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after") : t);
        for (var l = 0; l < 5; l++) {
          var o = !1, a = st(e, t), s = !n || n == t ? a : st(e, n);
          i = {
            left: Math.min(a.left, s.left),
            top: Math.min(a.top, s.top) - r,
            right: Math.max(a.left, s.left),
            bottom: Math.max(a.bottom, s.bottom) + r
          };
          var u = zi(e, i), h = e.doc.scrollTop, d = e.doc.scrollLeft;
          if (u.scrollTop != null && (un(e, u.scrollTop), Math.abs(e.doc.scrollTop - h) > 1 && (o = !0)), u.scrollLeft != null && (cr(e, u.scrollLeft), Math.abs(e.doc.scrollLeft - d) > 1 && (o = !0)), !o)
            break;
        }
        return i;
      }
      function ns(e, t) {
        var n = zi(e, t);
        n.scrollTop != null && un(e, n.scrollTop), n.scrollLeft != null && cr(e, n.scrollLeft);
      }
      function zi(e, t) {
        var n = e.display, r = Wr(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && e.curOp.scrollTop != null ? e.curOp.scrollTop : n.scroller.scrollTop, l = Ti(e), o = {};
        t.bottom - t.top > l && (t.bottom = t.top + l);
        var a = e.doc.height + Li(n), s = t.top < r, u = t.bottom > a - r;
        if (t.top < i)
          o.scrollTop = s ? 0 : t.top;
        else if (t.bottom > i + l) {
          var h = Math.min(t.top, (u ? a : t.bottom) - l);
          h != i && (o.scrollTop = h);
        }
        var d = e.options.fixedGutter ? 0 : n.gutters.offsetWidth, g = e.curOp && e.curOp.scrollLeft != null ? e.curOp.scrollLeft : n.scroller.scrollLeft - d, v = sr(e) - n.gutters.offsetWidth, m = t.right - t.left > v;
        return m && (t.right = t.left + v), t.left < 10 ? o.scrollLeft = 0 : t.left < g ? o.scrollLeft = Math.max(0, t.left + d - (m ? 0 : 10)) : t.right > v + g - 3 && (o.scrollLeft = t.right + (m ? 0 : 10) - v), o;
      }
      function Ri(e, t) {
        t != null && (Qn(e), e.curOp.scrollTop = (e.curOp.scrollTop == null ? e.doc.scrollTop : e.curOp.scrollTop) + t);
      }
      function Fr(e) {
        Qn(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin };
      }
      function sn(e, t, n) {
        (t != null || n != null) && Qn(e), t != null && (e.curOp.scrollLeft = t), n != null && (e.curOp.scrollTop = n);
      }
      function is(e, t) {
        Qn(e), e.curOp.scrollToPos = t;
      }
      function Qn(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
          e.curOp.scrollToPos = null;
          var n = Ql(e, t.from), r = Ql(e, t.to);
          no(e, n, r, t.margin);
        }
      }
      function no(e, t, n, r) {
        var i = zi(e, {
          left: Math.min(t.left, n.left),
          top: Math.min(t.top, n.top) - r,
          right: Math.max(t.right, n.right),
          bottom: Math.max(t.bottom, n.bottom) + r
        });
        sn(e, i.scrollLeft, i.scrollTop);
      }
      function un(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (j || Ui(e, { top: t }), io(e, t, !0), j && Ui(e), cn(e, 100));
      }
      function io(e, t, n) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), !(e.display.scroller.scrollTop == t && !n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }
      function cr(e, t, n, r) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), !((n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r) && (e.doc.scrollLeft = t, uo(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }
      function fn(e) {
        var t = e.display, n = t.gutters.offsetWidth, r = Math.round(e.doc.height + Li(e.display));
        return {
          clientHeight: t.scroller.clientHeight,
          viewHeight: t.wrapper.clientHeight,
          scrollWidth: t.scroller.scrollWidth,
          clientWidth: t.scroller.clientWidth,
          viewWidth: t.wrapper.clientWidth,
          barLeft: e.options.fixedGutter ? n : 0,
          docHeight: r,
          scrollHeight: r + bt(e) + t.barHeight,
          nativeBarWidth: t.nativeBarWidth,
          gutterWidth: n
        };
      }
      var dr = function(e, t, n) {
        this.cm = n;
        var r = this.vert = p("div", [p("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), i = this.horiz = p("div", [p("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        r.tabIndex = i.tabIndex = -1, e(r), e(i), E(r, "scroll", function() {
          r.clientHeight && t(r.scrollTop, "vertical");
        }), E(i, "scroll", function() {
          i.clientWidth && t(i.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = !1, z && N < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };
      dr.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1, n = e.scrollHeight > e.clientHeight + 1, r = e.nativeBarWidth;
        if (n) {
          this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
          var i = e.viewHeight - (t ? r : 0);
          this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else
          this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
          this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
          var l = e.viewWidth - e.barLeft - (n ? r : 0);
          this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + l) + "px";
        } else
          this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (r == 0 && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: n ? r : 0, bottom: t ? r : 0 };
      }, dr.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, dr.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, dr.prototype.zeroWidthHack = function() {
        var e = be && !tr ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new dt(), this.disableVert = new dt();
      }, dr.prototype.enableZeroWidthBar = function(e, t, n) {
        e.style.visibility = "";
        function r() {
          var i = e.getBoundingClientRect(), l = n == "vert" ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1);
          l != e ? e.style.visibility = "hidden" : t.set(1e3, r);
        }
        t.set(1e3, r);
      }, dr.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
      };
      var hn = function() {
      };
      hn.prototype.update = function() {
        return { bottom: 0, right: 0 };
      }, hn.prototype.setScrollLeft = function() {
      }, hn.prototype.setScrollTop = function() {
      }, hn.prototype.clear = function() {
      };
      function Pr(e, t) {
        t || (t = fn(e));
        var n = e.display.barWidth, r = e.display.barHeight;
        lo(e, t);
        for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++)
          n != e.display.barWidth && e.options.lineWrapping && qn(e), lo(e, fn(e)), n = e.display.barWidth, r = e.display.barHeight;
      }
      function lo(e, t) {
        var n = e.display, r = n.scrollbars.update(t);
        n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = "";
      }
      var oo = { native: dr, null: hn };
      function ao(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && ht(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new oo[e.options.scrollbarStyle](function(t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), E(t, "mousedown", function() {
            e.state.focused && setTimeout(function() {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function(t, n) {
          n == "horizontal" ? cr(e, t) : un(e, t);
        }, e), e.display.scrollbars.addClass && Ue(e.display.wrapper, e.display.scrollbars.addClass);
      }
      var ls = 0;
      function pr(e) {
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
          id: ++ls,
          // Unique ID
          markArrays: null
          // Used by addMarkedSpan
        }, Pa(e.curOp);
      }
      function vr(e) {
        var t = e.curOp;
        t && Ba(t, function(n) {
          for (var r = 0; r < n.ops.length; r++)
            n.ops[r].cm.curOp = null;
          os(n);
        });
      }
      function os(e) {
        for (var t = e.ops, n = 0; n < t.length; n++)
          as(t[n]);
        for (var r = 0; r < t.length; r++)
          ss(t[r]);
        for (var i = 0; i < t.length; i++)
          us(t[i]);
        for (var l = 0; l < t.length; l++)
          fs(t[l]);
        for (var o = 0; o < t.length; o++)
          hs(t[o]);
      }
      function as(e) {
        var t = e.cm, n = t.display;
        ds(t), e.updateMaxLine && Si(t), e.mustUpdate = e.viewChanged || e.forceUpdate || e.scrollTop != null || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new Jn(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }
      function ss(e) {
        e.updatedDisplay = e.mustUpdate && Gi(e.cm, e.update);
      }
      function us(e) {
        var t = e.cm, n = t.display;
        e.updatedDisplay && qn(t), e.barMeasure = fn(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Gl(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + bt(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - sr(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection());
      }
      function fs(e) {
        var t = e.cm;
        e.adjustWidthTo != null && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && cr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var n = e.focus && e.focus == xe(tt(t));
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && Pr(t, e.barMeasure), e.updatedDisplay && Ki(t, e.barMeasure), e.selectionChanged && Pi(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && to(e.cm);
      }
      function hs(e) {
        var t = e.cm, n = t.display, r = t.doc;
        if (e.updatedDisplay && so(t, e.update), n.wheelStartX != null && (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) && (n.wheelStartX = n.wheelStartY = null), e.scrollTop != null && io(t, e.scrollTop, e.forceScroll), e.scrollLeft != null && cr(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          var i = rs(
            t,
            I(r, e.scrollToPos.from),
            I(r, e.scrollToPos.to),
            e.scrollToPos.margin
          );
          ts(t, i);
        }
        var l = e.maybeHiddenMarkers, o = e.maybeUnhiddenMarkers;
        if (l)
          for (var a = 0; a < l.length; ++a)
            l[a].lines.length || te(l[a], "hide");
        if (o)
          for (var s = 0; s < o.length; ++s)
            o[s].lines.length && te(o[s], "unhide");
        n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && te(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }
      function ze(e, t) {
        if (e.curOp)
          return t();
        pr(e);
        try {
          return t();
        } finally {
          vr(e);
        }
      }
      function pe(e, t) {
        return function() {
          if (e.curOp)
            return t.apply(e, arguments);
          pr(e);
          try {
            return t.apply(e, arguments);
          } finally {
            vr(e);
          }
        };
      }
      function Te(e) {
        return function() {
          if (this.curOp)
            return e.apply(this, arguments);
          pr(this);
          try {
            return e.apply(this, arguments);
          } finally {
            vr(this);
          }
        };
      }
      function ve(e) {
        return function() {
          var t = this.cm;
          if (!t || t.curOp)
            return e.apply(this, arguments);
          pr(t);
          try {
            return e.apply(this, arguments);
          } finally {
            vr(t);
          }
        };
      }
      function cn(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, P(cs, e));
      }
      function cs(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
          var n = +/* @__PURE__ */ new Date() + e.options.workTime, r = en(e, t.highlightFrontier), i = [];
          t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(l) {
            if (r.line >= e.display.viewFrom) {
              var o = l.styles, a = l.text.length > e.options.maxHighlightLength ? yt(t.mode, r.state) : null, s = vl(e, l, r, !0);
              a && (r.state = a), l.styles = s.styles;
              var u = l.styleClasses, h = s.classes;
              h ? l.styleClasses = h : u && (l.styleClasses = null);
              for (var d = !o || o.length != l.styles.length || u != h && (!u || !h || u.bgClass != h.bgClass || u.textClass != h.textClass), g = 0; !d && g < o.length; ++g)
                d = o[g] != l.styles[g];
              d && i.push(r.line), l.stateAfter = r.save(), r.nextLine();
            } else
              l.text.length <= e.options.maxHighlightLength && yi(e, l.text, r), l.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
            if (+/* @__PURE__ */ new Date() > n)
              return cn(e, e.options.workDelay), !0;
          }), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), i.length && ze(e, function() {
            for (var l = 0; l < i.length; l++)
              qt(e, i[l], "text");
          });
        }
      }
      var Jn = function(e, t, n) {
        var r = e.display;
        this.viewport = t, this.visible = Zn(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = sr(e), this.force = n, this.dims = Wi(e), this.events = [];
      };
      Jn.prototype.signal = function(e, t) {
        Be(e, t) && this.events.push(arguments);
      }, Jn.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++)
          te.apply(null, this.events[e]);
      };
      function ds(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = bt(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = bt(e) + "px", t.scrollbarsClipped = !0);
      }
      function ps(e) {
        if (e.hasFocus())
          return null;
        var t = xe(tt(e));
        if (!t || !et(e.display.lineDiv, t))
          return null;
        var n = { activeElt: t };
        if (window.getSelection) {
          var r = B(e).getSelection();
          r.anchorNode && r.extend && et(e.display.lineDiv, r.anchorNode) && (n.anchorNode = r.anchorNode, n.anchorOffset = r.anchorOffset, n.focusNode = r.focusNode, n.focusOffset = r.focusOffset);
        }
        return n;
      }
      function vs(e) {
        if (!(!e || !e.activeElt || e.activeElt == xe(he(e.activeElt))) && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && et(document.body, e.anchorNode) && et(document.body, e.focusNode))) {
          var t = e.activeElt.ownerDocument, n = t.defaultView.getSelection(), r = t.createRange();
          r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), n.removeAllRanges(), n.addRange(r), n.extend(e.focusNode, e.focusOffset);
        }
      }
      function Gi(e, t) {
        var n = e.display, r = e.doc;
        if (t.editorIsHidden)
          return Zt(e), !1;
        if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && $l(e) == 0)
          return !1;
        fo(e) && (Zt(e), t.dims = Wi(e));
        var i = r.first + r.size, l = Math.max(t.visible.from - e.options.viewportMargin, r.first), o = Math.min(i, t.visible.to + e.options.viewportMargin);
        n.viewFrom < l && l - n.viewFrom < 20 && (l = Math.max(r.first, n.viewFrom)), n.viewTo > o && n.viewTo - o < 20 && (o = Math.min(i, n.viewTo)), At && (l = wi(e.doc, l), o = Dl(e.doc, o));
        var a = l != n.viewFrom || o != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
        $a(e, l, o), n.viewOffset = Ot(A(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
        var s = $l(e);
        if (!a && s == 0 && !t.force && n.renderedView == n.view && (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo))
          return !1;
        var u = ps(e);
        return s > 4 && (n.lineDiv.style.display = "none"), gs(e, n.updateLineNumbers, t.dims), s > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, vs(u), w(n.cursorDiv), w(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, a && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, cn(e, 400)), n.updateLineNumbers = null, !0;
      }
      function so(e, t) {
        for (var n = t.viewport, r = !0; ; r = !1) {
          if (!r || !e.options.lineWrapping || t.oldDisplayWidth == sr(e)) {
            if (n && n.top != null && (n = { top: Math.min(e.doc.height + Li(e.display) - Ti(e), n.top) }), t.visible = Zn(e.display, e.doc, n), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
              break;
          } else r && (t.visible = Zn(e.display, e.doc, n));
          if (!Gi(e, t))
            break;
          qn(e);
          var i = fn(e);
          an(e), Pr(e, i), Ki(e, i), t.force = !1;
        }
        t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }
      function Ui(e, t) {
        var n = new Jn(e, t);
        if (Gi(e, n)) {
          qn(e), so(e, n);
          var r = fn(e);
          an(e), Pr(e, r), Ki(e, r), n.finish();
        }
      }
      function gs(e, t, n) {
        var r = e.display, i = e.options.lineNumbers, l = r.lineDiv, o = l.firstChild;
        function a(m) {
          var x = m.nextSibling;
          return W && be && e.display.currentWheelTarget == m ? m.style.display = "none" : m.parentNode.removeChild(m), x;
        }
        for (var s = r.view, u = r.viewFrom, h = 0; h < s.length; h++) {
          var d = s[h];
          if (!d.hidden) if (!d.node || d.node.parentNode != l) {
            var g = _a(e, d, u, n);
            l.insertBefore(g, o);
          } else {
            for (; o != d.node; )
              o = a(o);
            var v = i && t != null && t <= u && d.lineNumber;
            d.changes && (R(d.changes, "gutter") > -1 && (v = !1), El(e, d, u, n)), v && (w(d.lineNumber), d.lineNumber.appendChild(document.createTextNode(C(e.options, u)))), o = d.node.nextSibling;
          }
          u += d.size;
        }
        for (; o; )
          o = a(o);
      }
      function _i(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px", de(e, "gutterChanged", e);
      }
      function Ki(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + bt(e) + "px";
      }
      function uo(e) {
        var t = e.display, n = t.view;
        if (!(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))) {
          for (var r = Hi(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, l = r + "px", o = 0; o < n.length; o++)
            if (!n[o].hidden) {
              e.options.fixedGutter && (n[o].gutter && (n[o].gutter.style.left = l), n[o].gutterBackground && (n[o].gutterBackground.style.left = l));
              var a = n[o].alignable;
              if (a)
                for (var s = 0; s < a.length; s++)
                  a[s].style.left = l;
            }
          e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
        }
      }
      function fo(e) {
        if (!e.options.lineNumbers)
          return !1;
        var t = e.doc, n = C(e.options, t.first + t.size - 1), r = e.display;
        if (n.length != r.lineNumChars) {
          var i = r.measure.appendChild(p(
            "div",
            [p("div", n)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          )), l = i.firstChild.offsetWidth, o = i.offsetWidth - l;
          return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(l, r.lineGutter.offsetWidth - o) + 1, r.lineNumWidth = r.lineNumInnerWidth + o, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", _i(e.display), !0;
        }
        return !1;
      }
      function Xi(e, t) {
        for (var n = [], r = !1, i = 0; i < e.length; i++) {
          var l = e[i], o = null;
          if (typeof l != "string" && (o = l.style, l = l.className), l == "CodeMirror-linenumbers")
            if (t)
              r = !0;
            else
              continue;
          n.push({ className: l, style: o });
        }
        return t && !r && n.push({ className: "CodeMirror-linenumbers", style: null }), n;
      }
      function ho(e) {
        var t = e.gutters, n = e.gutterSpecs;
        w(t), e.lineGutter = null;
        for (var r = 0; r < n.length; ++r) {
          var i = n[r], l = i.className, o = i.style, a = t.appendChild(p("div", null, "CodeMirror-gutter " + l));
          o && (a.style.cssText = o), l == "CodeMirror-linenumbers" && (e.lineGutter = a, a.style.width = (e.lineNumWidth || 1) + "px");
        }
        t.style.display = n.length ? "" : "none", _i(e);
      }
      function dn(e) {
        ho(e.display), Oe(e), uo(e);
      }
      function ys(e, t, n, r) {
        var i = this;
        this.input = n, i.scrollbarFiller = p("div", null, "CodeMirror-scrollbar-filler"), i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = p("div", null, "CodeMirror-gutter-filler"), i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = ct("div", null, "CodeMirror-code"), i.selectionDiv = p("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = p("div", null, "CodeMirror-cursors"), i.measure = p("div", null, "CodeMirror-measure"), i.lineMeasure = p("div", null, "CodeMirror-measure"), i.lineSpace = ct(
          "div",
          [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var l = ct("div", [i.lineSpace], "CodeMirror-lines");
        i.mover = p("div", [l], null, "position: relative"), i.sizer = p("div", [i.mover], "CodeMirror-sizer"), i.sizerWidth = null, i.heightForcer = p("div", null, null, "position: absolute; height: " + Le + "px; width: 1px;"), i.gutters = p("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = p("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"), i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = p("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"), Pe && Pt >= 105 && (i.wrapper.style.clipPath = "inset(0px)"), i.wrapper.setAttribute("translate", "no"), z && N < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0), !W && !(j && rr) && (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)), i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first, i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0, i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0, i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null, i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null, i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null, i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, i.gutterSpecs = Xi(r.gutters, r.lineNumbers), ho(i), n.init(i);
      }
      var jn = 0, Ht = null;
      z ? Ht = -0.53 : j ? Ht = 15 : Pe ? Ht = -0.7 : mr && (Ht = -1 / 3);
      function co(e) {
        var t = e.wheelDeltaX, n = e.wheelDeltaY;
        return t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), n == null && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : n == null && (n = e.wheelDelta), { x: t, y: n };
      }
      function ms(e) {
        var t = co(e);
        return t.x *= Ht, t.y *= Ht, t;
      }
      function po(e, t) {
        Pe && Pt == 102 && (e.display.chromeScrollHack == null ? e.display.sizer.style.pointerEvents = "none" : clearTimeout(e.display.chromeScrollHack), e.display.chromeScrollHack = setTimeout(function() {
          e.display.chromeScrollHack = null, e.display.sizer.style.pointerEvents = "";
        }, 100));
        var n = co(t), r = n.x, i = n.y, l = Ht;
        t.deltaMode === 0 && (r = t.deltaX, i = t.deltaY, l = 1);
        var o = e.display, a = o.scroller, s = a.scrollWidth > a.clientWidth, u = a.scrollHeight > a.clientHeight;
        if (r && s || i && u) {
          if (i && be && W) {
            e: for (var h = t.target, d = o.view; h != a; h = h.parentNode)
              for (var g = 0; g < d.length; g++)
                if (d[g].node == h) {
                  e.display.currentWheelTarget = h;
                  break e;
                }
          }
          if (r && !j && !Ge && l != null) {
            i && u && un(e, Math.max(0, a.scrollTop + i * l)), cr(e, Math.max(0, a.scrollLeft + r * l)), (!i || i && u) && Ce(t), o.wheelStartX = null;
            return;
          }
          if (i && l != null) {
            var v = i * l, m = e.doc.scrollTop, x = m + o.wrapper.clientHeight;
            v < 0 ? m = Math.max(0, m + v - 50) : x = Math.min(e.doc.height, x + v + 50), Ui(e, { top: m, bottom: x });
          }
          jn < 20 && t.deltaMode !== 0 && (o.wheelStartX == null ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = r, o.wheelDY = i, setTimeout(function() {
            if (o.wheelStartX != null) {
              var S = a.scrollLeft - o.wheelStartX, k = a.scrollTop - o.wheelStartY, M = k && o.wheelDY && k / o.wheelDY || S && o.wheelDX && S / o.wheelDX;
              o.wheelStartX = o.wheelStartY = null, M && (Ht = (Ht * jn + M) / (jn + 1), ++jn);
            }
          }, 200)) : (o.wheelDX += r, o.wheelDY += i));
        }
      }
      var qe = function(e, t) {
        this.ranges = e, this.primIndex = t;
      };
      qe.prototype.primary = function() {
        return this.ranges[this.primIndex];
      }, qe.prototype.equals = function(e) {
        if (e == this)
          return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
          return !1;
        for (var t = 0; t < this.ranges.length; t++) {
          var n = this.ranges[t], r = e.ranges[t];
          if (!Y(n.anchor, r.anchor) || !Y(n.head, r.head))
            return !1;
        }
        return !0;
      }, qe.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new q(ce(this.ranges[t].anchor), ce(this.ranges[t].head));
        return new qe(e, this.primIndex);
      }, qe.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
          if (!this.ranges[e].empty())
            return !0;
        return !1;
      }, qe.prototype.contains = function(e, t) {
        t || (t = e);
        for (var n = 0; n < this.ranges.length; n++) {
          var r = this.ranges[n];
          if (T(t, r.from()) >= 0 && T(e, r.to()) <= 0)
            return n;
        }
        return -1;
      };
      var q = function(e, t) {
        this.anchor = e, this.head = t;
      };
      q.prototype.from = function() {
        return Nr(this.anchor, this.head);
      }, q.prototype.to = function() {
        return Ae(this.anchor, this.head);
      }, q.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function ut(e, t, n) {
        var r = e && e.options.selectionsMayTouch, i = t[n];
        t.sort(function(g, v) {
          return T(g.from(), v.from());
        }), n = R(t, i);
        for (var l = 1; l < t.length; l++) {
          var o = t[l], a = t[l - 1], s = T(a.to(), o.from());
          if (r && !o.empty() ? s > 0 : s >= 0) {
            var u = Nr(a.from(), o.from()), h = Ae(a.to(), o.to()), d = a.empty() ? o.from() == o.head : a.from() == a.head;
            l <= n && --n, t.splice(--l, 2, new q(d ? h : u, d ? u : h));
          }
        }
        return new qe(t, n);
      }
      function Qt(e, t) {
        return new qe([new q(e, t || e)], 0);
      }
      function Jt(e) {
        return e.text ? y(
          e.from.line + e.text.length - 1,
          X(e.text).length + (e.text.length == 1 ? e.from.ch : 0)
        ) : e.to;
      }
      function vo(e, t) {
        if (T(e, t.from) < 0)
          return e;
        if (T(e, t.to) <= 0)
          return Jt(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1, r = e.ch;
        return e.line == t.to.line && (r += Jt(t).ch - t.to.ch), y(n, r);
      }
      function Yi(e, t) {
        for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
          var i = e.sel.ranges[r];
          n.push(new q(
            vo(i.anchor, t),
            vo(i.head, t)
          ));
        }
        return ut(e.cm, n, e.sel.primIndex);
      }
      function go(e, t, n) {
        return e.line == t.line ? y(n.line, e.ch - t.ch + n.ch) : y(n.line + (e.line - t.line), e.ch);
      }
      function bs(e, t, n) {
        for (var r = [], i = y(e.first, 0), l = i, o = 0; o < t.length; o++) {
          var a = t[o], s = go(a.from, i, l), u = go(Jt(a), i, l);
          if (i = a.to, l = u, n == "around") {
            var h = e.sel.ranges[o], d = T(h.head, h.anchor) < 0;
            r[o] = new q(d ? u : s, d ? s : u);
          } else
            r[o] = new q(s, s);
        }
        return new qe(r, e.sel.primIndex);
      }
      function qi(e) {
        e.doc.mode = Lr(e.options, e.doc.modeOption), pn(e);
      }
      function pn(e) {
        e.doc.iter(function(t) {
          t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, cn(e, 100), e.state.modeGen++, e.curOp && Oe(e);
      }
      function yo(e, t) {
        return t.from.ch == 0 && t.to.ch == 0 && X(t.text) == "" && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }
      function Zi(e, t, n, r) {
        function i(M) {
          return n ? n[M] : null;
        }
        function l(M, L, D) {
          Ma(M, L, D, r), de(M, "change", M, t);
        }
        function o(M, L) {
          for (var D = [], F = M; F < L; ++F)
            D.push(new Dr(u[F], i(F), r));
          return D;
        }
        var a = t.from, s = t.to, u = t.text, h = A(e, a.line), d = A(e, s.line), g = X(u), v = i(u.length - 1), m = s.line - a.line;
        if (t.full)
          e.insert(0, o(0, u.length)), e.remove(u.length, e.size - u.length);
        else if (yo(e, t)) {
          var x = o(0, u.length - 1);
          l(d, d.text, v), m && e.remove(a.line, m), x.length && e.insert(a.line, x);
        } else if (h == d)
          if (u.length == 1)
            l(h, h.text.slice(0, a.ch) + g + h.text.slice(s.ch), v);
          else {
            var S = o(1, u.length - 1);
            S.push(new Dr(g + h.text.slice(s.ch), v, r)), l(h, h.text.slice(0, a.ch) + u[0], i(0)), e.insert(a.line + 1, S);
          }
        else if (u.length == 1)
          l(h, h.text.slice(0, a.ch) + u[0] + d.text.slice(s.ch), i(0)), e.remove(a.line + 1, m);
        else {
          l(h, h.text.slice(0, a.ch) + u[0], i(0)), l(d, g + d.text.slice(s.ch), v);
          var k = o(1, u.length - 1);
          m > 1 && e.remove(a.line + 1, m - 1), e.insert(a.line + 1, k);
        }
        de(e, "change", e, t);
      }
      function jt(e, t, n) {
        function r(i, l, o) {
          if (i.linked)
            for (var a = 0; a < i.linked.length; ++a) {
              var s = i.linked[a];
              if (s.doc != l) {
                var u = o && s.sharedHist;
                n && !u || (t(s.doc, u), r(s.doc, i, u));
              }
            }
        }
        r(e, null, !0);
      }
      function mo(e, t) {
        if (t.cm)
          throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, Ei(e), qi(e), bo(e), e.options.direction = t.direction, e.options.lineWrapping || Si(e), e.options.mode = t.modeOption, Oe(e);
      }
      function bo(e) {
        (e.doc.direction == "rtl" ? Ue : ht)(e.display.lineDiv, "CodeMirror-rtl");
      }
      function xs(e) {
        ze(e, function() {
          bo(e), Oe(e);
        });
      }
      function Vn(e) {
        this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1;
      }
      function Qi(e, t) {
        var n = { from: ce(t.from), to: Jt(t), text: Dt(e, t.from, t.to) };
        return Co(e, n, t.from.line, t.to.line + 1), jt(e, function(r) {
          return Co(r, n, t.from.line, t.to.line + 1);
        }, !0), n;
      }
      function xo(e) {
        for (; e.length; ) {
          var t = X(e);
          if (t.ranges)
            e.pop();
          else
            break;
        }
      }
      function ws(e, t) {
        if (t)
          return xo(e.done), X(e.done);
        if (e.done.length && !X(e.done).ranges)
          return X(e.done);
        if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
          return e.done.pop(), X(e.done);
      }
      function wo(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var l = +/* @__PURE__ */ new Date(), o, a;
        if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && i.lastModTime > l - (e.cm ? e.cm.options.historyEventDelay : 500) || t.origin.charAt(0) == "*")) && (o = ws(i, i.lastOp == r)))
          a = X(o.changes), T(t.from, t.to) == 0 && T(t.from, a.to) == 0 ? a.to = Jt(t) : o.changes.push(Qi(e, t));
        else {
          var s = X(i.done);
          for ((!s || !s.ranges) && $n(e.sel, i.done), o = {
            changes: [Qi(e, t)],
            generation: i.generation
          }, i.done.push(o); i.done.length > i.undoDepth; )
            i.done.shift(), i.done[0].ranges || i.done.shift();
        }
        i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, a || te(e, "historyAdded");
      }
      function Cs(e, t, n, r) {
        var i = t.charAt(0);
        return i == "*" || i == "+" && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && /* @__PURE__ */ new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }
      function Ss(e, t, n, r) {
        var i = e.history, l = r && r.origin;
        n == i.lastSelOp || l && i.lastSelOrigin == l && (i.lastModTime == i.lastSelTime && i.lastOrigin == l || Cs(e, l, X(i.done), t)) ? i.done[i.done.length - 1] = t : $n(t, i.done), i.lastSelTime = +/* @__PURE__ */ new Date(), i.lastSelOrigin = l, i.lastSelOp = n, r && r.clearRedo !== !1 && xo(i.undone);
      }
      function $n(e, t) {
        var n = X(t);
        n && n.ranges && n.equals(e) || t.push(e);
      }
      function Co(e, t, n, r) {
        var i = t["spans_" + e.id], l = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(o) {
          o.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[l] = o.markedSpans), ++l;
        });
      }
      function ks(e) {
        if (!e)
          return null;
        for (var t, n = 0; n < e.length; ++n)
          e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t : null : e;
      }
      function Ls(e, t) {
        var n = t["spans_" + e.id];
        if (!n)
          return null;
        for (var r = [], i = 0; i < t.text.length; ++i)
          r.push(ks(n[i]));
        return r;
      }
      function So(e, t) {
        var n = Ls(e, t), r = bi(e, t);
        if (!n)
          return r;
        if (!r)
          return n;
        for (var i = 0; i < n.length; ++i) {
          var l = n[i], o = r[i];
          if (l && o)
            e: for (var a = 0; a < o.length; ++a) {
              for (var s = o[a], u = 0; u < l.length; ++u)
                if (l[u].marker == s.marker)
                  continue e;
              l.push(s);
            }
          else o && (n[i] = o);
        }
        return n;
      }
      function Ir(e, t, n) {
        for (var r = [], i = 0; i < e.length; ++i) {
          var l = e[i];
          if (l.ranges) {
            r.push(n ? qe.prototype.deepCopy.call(l) : l);
            continue;
          }
          var o = l.changes, a = [];
          r.push({ changes: a });
          for (var s = 0; s < o.length; ++s) {
            var u = o[s], h = void 0;
            if (a.push({ from: u.from, to: u.to, text: u.text }), t)
              for (var d in u)
                (h = d.match(/^spans_(\d+)$/)) && R(t, Number(h[1])) > -1 && (X(a)[d] = u[d], delete u[d]);
          }
        }
        return r;
      }
      function Ji(e, t, n, r) {
        if (r) {
          var i = e.anchor;
          if (n) {
            var l = T(t, i) < 0;
            l != T(n, i) < 0 ? (i = t, t = n) : l != T(t, n) < 0 && (t = n);
          }
          return new q(i, t);
        } else
          return new q(n || t, t);
      }
      function ei(e, t, n, r, i) {
        i == null && (i = e.cm && (e.cm.display.shift || e.extend)), Se(e, new qe([Ji(e.sel.primary(), t, n, i)], 0), r);
      }
      function ko(e, t, n) {
        for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), l = 0; l < e.sel.ranges.length; l++)
          r[l] = Ji(e.sel.ranges[l], t[l], null, i);
        var o = ut(e.cm, r, e.sel.primIndex);
        Se(e, o, n);
      }
      function ji(e, t, n, r) {
        var i = e.sel.ranges.slice(0);
        i[t] = n, Se(e, ut(e.cm, i, e.sel.primIndex), r);
      }
      function Lo(e, t, n, r) {
        Se(e, Qt(t, n), r);
      }
      function Ts(e, t, n) {
        var r = {
          ranges: t.ranges,
          update: function(i) {
            this.ranges = [];
            for (var l = 0; l < i.length; l++)
              this.ranges[l] = new q(
                I(e, i[l].anchor),
                I(e, i[l].head)
              );
          },
          origin: n && n.origin
        };
        return te(e, "beforeSelectionChange", e, r), e.cm && te(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? ut(e.cm, r.ranges, r.ranges.length - 1) : t;
      }
      function To(e, t, n) {
        var r = e.history.done, i = X(r);
        i && i.ranges ? (r[r.length - 1] = t, ti(e, t, n)) : Se(e, t, n);
      }
      function Se(e, t, n) {
        ti(e, t, n), Ss(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
      }
      function ti(e, t, n) {
        (Be(e, "beforeSelectionChange") || e.cm && Be(e.cm, "beforeSelectionChange")) && (t = Ts(e, t, n));
        var r = n && n.bias || (T(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        Mo(e, Do(e, t, r, !0)), !(n && n.scroll === !1) && e.cm && e.cm.getOption("readOnly") != "nocursor" && Fr(e.cm);
      }
      function Mo(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, Qe(e.cm)), de(e, "cursorActivity", e));
      }
      function No(e) {
        Mo(e, Do(e, e.sel, null, !1));
      }
      function Do(e, t, n, r) {
        for (var i, l = 0; l < t.ranges.length; l++) {
          var o = t.ranges[l], a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[l], s = ri(e, o.anchor, a && a.anchor, n, r), u = o.head == o.anchor ? s : ri(e, o.head, a && a.head, n, r);
          (i || s != o.anchor || u != o.head) && (i || (i = t.ranges.slice(0, l)), i[l] = new q(s, u));
        }
        return i ? ut(e.cm, i, t.primIndex) : t;
      }
      function Br(e, t, n, r, i) {
        var l = A(e, t.line);
        if (l.markedSpans)
          for (var o = 0; o < l.markedSpans.length; ++o) {
            var a = l.markedSpans[o], s = a.marker, u = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft, h = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
            if ((a.from == null || (u ? a.from <= t.ch : a.from < t.ch)) && (a.to == null || (h ? a.to >= t.ch : a.to > t.ch))) {
              if (i && (te(s, "beforeCursorEnter"), s.explicitlyCleared))
                if (l.markedSpans) {
                  --o;
                  continue;
                } else
                  break;
              if (!s.atomic)
                continue;
              if (n) {
                var d = s.find(r < 0 ? 1 : -1), g = void 0;
                if ((r < 0 ? h : u) && (d = Ao(e, d, -r, d && d.line == t.line ? l : null)), d && d.line == t.line && (g = T(d, n)) && (r < 0 ? g < 0 : g > 0))
                  return Br(e, d, t, r, i);
              }
              var v = s.find(r < 0 ? -1 : 1);
              return (r < 0 ? u : h) && (v = Ao(e, v, r, v.line == t.line ? l : null)), v ? Br(e, v, t, r, i) : null;
            }
          }
        return t;
      }
      function ri(e, t, n, r, i) {
        var l = r || 1, o = Br(e, t, n, l, i) || !i && Br(e, t, n, l, !0) || Br(e, t, n, -l, i) || !i && Br(e, t, n, -l, !0);
        return o || (e.cantEdit = !0, y(e.first, 0));
      }
      function Ao(e, t, n, r) {
        return n < 0 && t.ch == 0 ? t.line > e.first ? I(e, y(t.line - 1)) : null : n > 0 && t.ch == (r || A(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? y(t.line + 1, 0) : null : new y(t.line, t.ch + n);
      }
      function Oo(e) {
        e.setSelection(y(e.firstLine(), 0), y(e.lastLine()), Ke);
      }
      function Wo(e, t, n) {
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
        return n && (r.update = function(i, l, o, a) {
          i && (r.from = I(e, i)), l && (r.to = I(e, l)), o && (r.text = o), a !== void 0 && (r.origin = a);
        }), te(e, "beforeChange", e, r), e.cm && te(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : { from: r.from, to: r.to, text: r.text, origin: r.origin };
      }
      function zr(e, t, n) {
        if (e.cm) {
          if (!e.cm.curOp)
            return pe(e.cm, zr)(e, t, n);
          if (e.cm.state.suppressEdits)
            return;
        }
        if (!((Be(e, "beforeChange") || e.cm && Be(e.cm, "beforeChange")) && (t = Wo(e, t, !0), !t))) {
          var r = Cl && !n && Sa(e, t.from, t.to);
          if (r)
            for (var i = r.length - 1; i >= 0; --i)
              Ho(e, { from: r[i].from, to: r[i].to, text: i ? [""] : t.text, origin: t.origin });
          else
            Ho(e, t);
        }
      }
      function Ho(e, t) {
        if (!(t.text.length == 1 && t.text[0] == "" && T(t.from, t.to) == 0)) {
          var n = Yi(e, t);
          wo(e, t, n, e.cm ? e.cm.curOp.id : NaN), vn(e, t, n, bi(e, t));
          var r = [];
          jt(e, function(i, l) {
            !l && R(r, i.history) == -1 && (Io(i.history, t), r.push(i.history)), vn(i, t, null, bi(i, t));
          });
        }
      }
      function ni(e, t, n) {
        var r = e.cm && e.cm.state.suppressEdits;
        if (!(r && !n)) {
          for (var i = e.history, l, o = e.sel, a = t == "undo" ? i.done : i.undone, s = t == "undo" ? i.undone : i.done, u = 0; u < a.length && (l = a[u], !(n ? l.ranges && !l.equals(e.sel) : !l.ranges)); u++)
            ;
          if (u != a.length) {
            for (i.lastOrigin = i.lastSelOrigin = null; ; )
              if (l = a.pop(), l.ranges) {
                if ($n(l, s), n && !l.equals(e.sel)) {
                  Se(e, l, { clearRedo: !1 });
                  return;
                }
                o = l;
              } else if (r) {
                a.push(l);
                return;
              } else
                break;
            var h = [];
            $n(o, s), s.push({ changes: h, generation: i.generation }), i.generation = l.generation || ++i.maxGeneration;
            for (var d = Be(e, "beforeChange") || e.cm && Be(e.cm, "beforeChange"), g = function(x) {
              var S = l.changes[x];
              if (S.origin = t, d && !Wo(e, S, !1))
                return a.length = 0, {};
              h.push(Qi(e, S));
              var k = x ? Yi(e, S) : X(a);
              vn(e, S, k, So(e, S)), !x && e.cm && e.cm.scrollIntoView({ from: S.from, to: Jt(S) });
              var M = [];
              jt(e, function(L, D) {
                !D && R(M, L.history) == -1 && (Io(L.history, S), M.push(L.history)), vn(L, S, null, So(L, S));
              });
            }, v = l.changes.length - 1; v >= 0; --v) {
              var m = g(v);
              if (m) return m.v;
            }
          }
        }
      }
      function Eo(e, t) {
        if (t != 0 && (e.first += t, e.sel = new qe(lr(e.sel.ranges, function(i) {
          return new q(
            y(i.anchor.line + t, i.anchor.ch),
            y(i.head.line + t, i.head.ch)
          );
        }), e.sel.primIndex), e.cm)) {
          Oe(e.cm, e.first, e.first - t, t);
          for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++)
            qt(e.cm, r, "gutter");
        }
      }
      function vn(e, t, n, r) {
        if (e.cm && !e.cm.curOp)
          return pe(e.cm, vn)(e, t, n, r);
        if (t.to.line < e.first) {
          Eo(e, t.text.length - 1 - (t.to.line - t.from.line));
          return;
        }
        if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var i = t.text.length - 1 - (e.first - t.from.line);
            Eo(e, i), t = {
              from: y(e.first, 0),
              to: y(t.to.line + i, t.to.ch),
              text: [X(t.text)],
              origin: t.origin
            };
          }
          var l = e.lastLine();
          t.to.line > l && (t = {
            from: t.from,
            to: y(l, A(e, l).text.length),
            text: [t.text[0]],
            origin: t.origin
          }), t.removed = Dt(e, t.from, t.to), n || (n = Yi(e, t)), e.cm ? Ms(e.cm, t, r) : Zi(e, t, r), ti(e, n, Ke), e.cantEdit && ri(e, y(e.firstLine(), 0)) && (e.cantEdit = !1);
        }
      }
      function Ms(e, t, n) {
        var r = e.doc, i = e.display, l = t.from, o = t.to, a = !1, s = l.line;
        e.options.lineWrapping || (s = f(at(A(r, l.line))), r.iter(s, o.line + 1, function(v) {
          if (v == i.maxLine)
            return a = !0, !0;
        })), r.sel.contains(t.from, t.to) > -1 && Qe(e), Zi(r, t, n, Vl(e)), e.options.lineWrapping || (r.iter(s, l.line + t.text.length, function(v) {
          var m = Rn(v);
          m > i.maxLineLength && (i.maxLine = v, i.maxLineLength = m, i.maxLineChanged = !0, a = !1);
        }), a && (e.curOp.updateMaxLine = !0)), ga(r, l.line), cn(e, 400);
        var u = t.text.length - (o.line - l.line) - 1;
        t.full ? Oe(e) : l.line == o.line && t.text.length == 1 && !yo(e.doc, t) ? qt(e, l.line, "text") : Oe(e, l.line, o.line + 1, u);
        var h = Be(e, "changes"), d = Be(e, "change");
        if (d || h) {
          var g = {
            from: l,
            to: o,
            text: t.text,
            removed: t.removed,
            origin: t.origin
          };
          d && de(e, "change", e, g), h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(g);
        }
        e.display.selForContextMenu = null;
      }
      function Rr(e, t, n, r, i) {
        var l;
        r || (r = n), T(r, n) < 0 && (l = [r, n], n = l[0], r = l[1]), typeof t == "string" && (t = e.splitLines(t)), zr(e, { from: n, to: r, text: t, origin: i });
      }
      function Fo(e, t, n, r) {
        n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
      }
      function Po(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
          var l = e[i], o = !0;
          if (l.ranges) {
            l.copied || (l = e[i] = l.deepCopy(), l.copied = !0);
            for (var a = 0; a < l.ranges.length; a++)
              Fo(l.ranges[a].anchor, t, n, r), Fo(l.ranges[a].head, t, n, r);
            continue;
          }
          for (var s = 0; s < l.changes.length; ++s) {
            var u = l.changes[s];
            if (n < u.from.line)
              u.from = y(u.from.line + r, u.from.ch), u.to = y(u.to.line + r, u.to.ch);
            else if (t <= u.to.line) {
              o = !1;
              break;
            }
          }
          o || (e.splice(0, i + 1), i = 0);
        }
      }
      function Io(e, t) {
        var n = t.from.line, r = t.to.line, i = t.text.length - (r - n) - 1;
        Po(e.done, n, r, i), Po(e.undone, n, r, i);
      }
      function gn(e, t, n, r) {
        var i = t, l = t;
        return typeof t == "number" ? l = A(e, dl(e, t)) : i = f(t), i == null ? null : (r(l, i) && e.cm && qt(e.cm, i, n), l);
      }
      function yn(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, n = 0; n < e.length; ++n)
          e[n].parent = this, t += e[n].height;
        this.height = t;
      }
      yn.prototype = {
        chunkSize: function() {
          return this.lines.length;
        },
        // Remove the n lines at offset 'at'.
        removeInner: function(e, t) {
          for (var n = e, r = e + t; n < r; ++n) {
            var i = this.lines[n];
            this.height -= i.height, Na(i), de(i, "delete");
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
      function mn(e) {
        this.children = e;
        for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
          var i = e[r];
          t += i.chunkSize(), n += i.height, i.parent = this;
        }
        this.size = t, this.height = n, this.parent = null;
      }
      mn.prototype = {
        chunkSize: function() {
          return this.size;
        },
        removeInner: function(e, t) {
          this.size -= t;
          for (var n = 0; n < this.children.length; ++n) {
            var r = this.children[n], i = r.chunkSize();
            if (e < i) {
              var l = Math.min(t, i - e), o = r.height;
              if (r.removeInner(e, l), this.height -= o - r.height, i == l && (this.children.splice(n--, 1), r.parent = null), (t -= l) == 0)
                break;
              e = 0;
            } else
              e -= i;
          }
          if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof yn))) {
            var a = [];
            this.collapse(a), this.children = [new yn(a)], this.children[0].parent = this;
          }
        },
        collapse: function(e) {
          for (var t = 0; t < this.children.length; ++t)
            this.children[t].collapse(e);
        },
        insertInner: function(e, t, n) {
          this.size += t.length, this.height += n;
          for (var r = 0; r < this.children.length; ++r) {
            var i = this.children[r], l = i.chunkSize();
            if (e <= l) {
              if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                for (var o = i.lines.length % 25 + 25, a = o; a < i.lines.length; ) {
                  var s = new yn(i.lines.slice(a, a += 25));
                  i.height -= s.height, this.children.splice(++r, 0, s), s.parent = this;
                }
                i.lines = i.lines.slice(0, o), this.maybeSpill();
              }
              break;
            }
            e -= l;
          }
        },
        // When a node has grown, check whether it should be split.
        maybeSpill: function() {
          if (!(this.children.length <= 10)) {
            var e = this;
            do {
              var t = e.children.splice(e.children.length - 5, 5), n = new mn(t);
              if (e.parent) {
                e.size -= n.size, e.height -= n.height;
                var i = R(e.parent.children, e);
                e.parent.children.splice(i + 1, 0, n);
              } else {
                var r = new mn(e.children);
                r.parent = e, e.children = [r, n], e = r;
              }
              n.parent = e.parent;
            } while (e.children.length > 10);
            e.parent.maybeSpill();
          }
        },
        iterN: function(e, t, n) {
          for (var r = 0; r < this.children.length; ++r) {
            var i = this.children[r], l = i.chunkSize();
            if (e < l) {
              var o = Math.min(t, l - e);
              if (i.iterN(e, o, n))
                return !0;
              if ((t -= o) == 0)
                break;
              e = 0;
            } else
              e -= l;
          }
        }
      };
      var bn = function(e, t, n) {
        if (n)
          for (var r in n)
            n.hasOwnProperty(r) && (this[r] = n[r]);
        this.doc = e, this.node = t;
      };
      bn.prototype.clear = function() {
        var e = this.doc.cm, t = this.line.widgets, n = this.line, r = f(n);
        if (!(r == null || !t)) {
          for (var i = 0; i < t.length; ++i)
            t[i] == this && t.splice(i--, 1);
          t.length || (n.widgets = null);
          var l = ln(this);
          Ye(n, Math.max(0, n.height - l)), e && (ze(e, function() {
            Bo(e, n, -l), qt(e, r, "widget");
          }), de(e, "lineWidgetCleared", e, this, r));
        }
      }, bn.prototype.changed = function() {
        var e = this, t = this.height, n = this.doc.cm, r = this.line;
        this.height = null;
        var i = ln(this) - t;
        i && (Yt(this.doc, r) || Ye(r, r.height + i), n && ze(n, function() {
          n.curOp.forceUpdate = !0, Bo(n, r, i), de(n, "lineWidgetChanged", n, e, f(r));
        }));
      }, rt(bn);
      function Bo(e, t, n) {
        Ot(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Ri(e, n);
      }
      function Ns(e, t, n, r) {
        var i = new bn(e, n, r), l = e.cm;
        return l && i.noHScroll && (l.display.alignWidgets = !0), gn(e, t, "widget", function(o) {
          var a = o.widgets || (o.widgets = []);
          if (i.insertAt == null ? a.push(i) : a.splice(Math.min(a.length, Math.max(0, i.insertAt)), 0, i), i.line = o, l && !Yt(e, o)) {
            var s = Ot(o) < e.scrollTop;
            Ye(o, o.height + ln(i)), s && Ri(l, i.height), l.curOp.forceUpdate = !0;
          }
          return !0;
        }), l && de(l, "lineWidgetAdded", l, i, typeof t == "number" ? t : f(t)), i;
      }
      var zo = 0, Vt = function(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++zo;
      };
      Vt.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          var e = this.doc.cm, t = e && !e.curOp;
          if (t && pr(e), Be(this, "clear")) {
            var n = this.find();
            n && de(this, "clear", n.from, n.to);
          }
          for (var r = null, i = null, l = 0; l < this.lines.length; ++l) {
            var o = this.lines[l], a = tn(o.markedSpans, this);
            e && !this.collapsed ? qt(e, f(o), "text") : e && (a.to != null && (i = f(o)), a.from != null && (r = f(o))), o.markedSpans = ba(o.markedSpans, a), a.from == null && this.collapsed && !Yt(this.doc, o) && e && Ye(o, Wr(e.display));
          }
          if (e && this.collapsed && !e.options.lineWrapping)
            for (var s = 0; s < this.lines.length; ++s) {
              var u = at(this.lines[s]), h = Rn(u);
              h > e.display.maxLineLength && (e.display.maxLine = u, e.display.maxLineLength = h, e.display.maxLineChanged = !0);
            }
          r != null && e && this.collapsed && Oe(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && No(e.doc)), e && de(e, "markerCleared", e, this, r, i), t && vr(e), this.parent && this.parent.clear();
        }
      }, Vt.prototype.find = function(e, t) {
        e == null && this.type == "bookmark" && (e = 1);
        for (var n, r, i = 0; i < this.lines.length; ++i) {
          var l = this.lines[i], o = tn(l.markedSpans, this);
          if (o.from != null && (n = y(t ? l : f(l), o.from), e == -1))
            return n;
          if (o.to != null && (r = y(t ? l : f(l), o.to), e == 1))
            return r;
        }
        return n && { from: n, to: r };
      }, Vt.prototype.changed = function() {
        var e = this, t = this.find(-1, !0), n = this, r = this.doc.cm;
        !t || !r || ze(r, function() {
          var i = t.line, l = f(t.line), o = Mi(r, l);
          if (o && (Kl(o), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !Yt(n.doc, i) && n.height != null) {
            var a = n.height;
            n.height = null;
            var s = ln(n) - a;
            s && Ye(i, i.height + s);
          }
          de(r, "markerChanged", r, e);
        });
      }, Vt.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (!t.maybeHiddenMarkers || R(t.maybeHiddenMarkers, this) == -1) && (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(e);
      }, Vt.prototype.detachLine = function(e) {
        if (this.lines.splice(R(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, rt(Vt);
      function Gr(e, t, n, r, i) {
        if (r && r.shared)
          return Ds(e, t, n, r, i);
        if (e.cm && !e.cm.curOp)
          return pe(e.cm, Gr)(e, t, n, r, i);
        var l = new Vt(e, i), o = T(t, n);
        if (r && _(r, l, !1), o > 0 || o == 0 && l.clearWhenEmpty !== !1)
          return l;
        if (l.replacedWith && (l.collapsed = !0, l.widgetNode = ct("span", [l.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || l.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (l.widgetNode.insertLeft = !0)), l.collapsed) {
          if (Nl(e, t.line, t, n, l) || t.line != n.line && Nl(e, n.line, t, n, l))
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          ma();
        }
        l.addToHistory && wo(e, { from: t, to: n, origin: "markText" }, e.sel, NaN);
        var a = t.line, s = e.cm, u;
        if (e.iter(a, n.line + 1, function(d) {
          s && l.collapsed && !s.options.lineWrapping && at(d) == s.display.maxLine && (u = !0), l.collapsed && a != t.line && Ye(d, 0), xa(d, new Pn(
            l,
            a == t.line ? t.ch : null,
            a == n.line ? n.ch : null
          ), e.cm && e.cm.curOp), ++a;
        }), l.collapsed && e.iter(t.line, n.line + 1, function(d) {
          Yt(e, d) && Ye(d, 0);
        }), l.clearOnEnter && E(l, "beforeCursorEnter", function() {
          return l.clear();
        }), l.readOnly && (ya(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), l.collapsed && (l.id = ++zo, l.atomic = !0), s) {
          if (u && (s.curOp.updateMaxLine = !0), l.collapsed)
            Oe(s, t.line, n.line + 1);
          else if (l.className || l.startStyle || l.endStyle || l.css || l.attributes || l.title)
            for (var h = t.line; h <= n.line; h++)
              qt(s, h, "text");
          l.atomic && No(s.doc), de(s, "markerAdded", s, l);
        }
        return l;
      }
      var xn = function(e, t) {
        this.markers = e, this.primary = t;
        for (var n = 0; n < e.length; ++n)
          e[n].parent = this;
      };
      xn.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          this.explicitlyCleared = !0;
          for (var e = 0; e < this.markers.length; ++e)
            this.markers[e].clear();
          de(this, "clear");
        }
      }, xn.prototype.find = function(e, t) {
        return this.primary.find(e, t);
      }, rt(xn);
      function Ds(e, t, n, r, i) {
        r = _(r), r.shared = !1;
        var l = [Gr(e, t, n, r, i)], o = l[0], a = r.widgetNode;
        return jt(e, function(s) {
          a && (r.widgetNode = a.cloneNode(!0)), l.push(Gr(s, I(s, t), I(s, n), r, i));
          for (var u = 0; u < s.linked.length; ++u)
            if (s.linked[u].isParent)
              return;
          o = X(l);
        }), new xn(l, o);
      }
      function Ro(e) {
        return e.findMarks(y(e.first, 0), e.clipPos(y(e.lastLine())), function(t) {
          return t.parent;
        });
      }
      function As(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n], i = r.find(), l = e.clipPos(i.from), o = e.clipPos(i.to);
          if (T(l, o)) {
            var a = Gr(e, l, o, r.primary, r.primary.type);
            r.markers.push(a), a.parent = r;
          }
        }
      }
      function Os(e) {
        for (var t = function(r) {
          var i = e[r], l = [i.primary.doc];
          jt(i.primary.doc, function(s) {
            return l.push(s);
          });
          for (var o = 0; o < i.markers.length; o++) {
            var a = i.markers[o];
            R(l, a.doc) == -1 && (a.parent = null, i.markers.splice(o--, 1));
          }
        }, n = 0; n < e.length; n++) t(n);
      }
      var Ws = 0, We = function(e, t, n, r, i) {
        if (!(this instanceof We))
          return new We(e, t, n, r, i);
        n == null && (n = 0), mn.call(this, [new yn([new Dr("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = n;
        var l = y(n, 0);
        this.sel = Qt(l), this.history = new Vn(null), this.id = ++Ws, this.modeOption = t, this.lineSep = r, this.direction = i == "rtl" ? "rtl" : "ltr", this.extend = !1, typeof e == "string" && (e = this.splitLines(e)), Zi(this, { from: l, to: l, text: e }), Se(this, Qt(l), Ke);
      };
      We.prototype = An(mn.prototype, {
        constructor: We,
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
          var t = $r(this, this.first, this.first + this.size);
          return e === !1 ? t : t.join(e || this.lineSeparator());
        },
        setValue: ve(function(e) {
          var t = y(this.first, 0), n = this.first + this.size - 1;
          zr(this, {
            from: t,
            to: y(n, A(this, n).text.length),
            text: this.splitLines(e),
            origin: "setValue",
            full: !0
          }, !0), this.cm && sn(this.cm, 0, 0), Se(this, Qt(t), Ke);
        }),
        replaceRange: function(e, t, n, r) {
          t = I(this, t), n = n ? I(this, n) : t, Rr(this, e, t, n, r);
        },
        getRange: function(e, t, n) {
          var r = Dt(this, I(this, e), I(this, t));
          return n === !1 ? r : n === "" ? r.join("") : r.join(n || this.lineSeparator());
        },
        getLine: function(e) {
          var t = this.getLineHandle(e);
          return t && t.text;
        },
        getLineHandle: function(e) {
          if (b(this, e))
            return A(this, e);
        },
        getLineNumber: function(e) {
          return f(e);
        },
        getLineHandleVisualStart: function(e) {
          return typeof e == "number" && (e = A(this, e)), at(e);
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
          return I(this, e);
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
        setCursor: ve(function(e, t, n) {
          Lo(this, I(this, typeof e == "number" ? y(e, t || 0) : e), null, n);
        }),
        setSelection: ve(function(e, t, n) {
          Lo(this, I(this, e), I(this, t || e), n);
        }),
        extendSelection: ve(function(e, t, n) {
          ei(this, I(this, e), t && I(this, t), n);
        }),
        extendSelections: ve(function(e, t) {
          ko(this, pl(this, e), t);
        }),
        extendSelectionsBy: ve(function(e, t) {
          var n = lr(this.sel.ranges, e);
          ko(this, pl(this, n), t);
        }),
        setSelections: ve(function(e, t, n) {
          if (e.length) {
            for (var r = [], i = 0; i < e.length; i++)
              r[i] = new q(
                I(this, e[i].anchor),
                I(this, e[i].head || e[i].anchor)
              );
            t == null && (t = Math.min(e.length - 1, this.sel.primIndex)), Se(this, ut(this.cm, r, t), n);
          }
        }),
        addSelection: ve(function(e, t, n) {
          var r = this.sel.ranges.slice(0);
          r.push(new q(I(this, e), I(this, t || e))), Se(this, ut(this.cm, r, r.length - 1), n);
        }),
        getSelection: function(e) {
          for (var t = this.sel.ranges, n, r = 0; r < t.length; r++) {
            var i = Dt(this, t[r].from(), t[r].to());
            n = n ? n.concat(i) : i;
          }
          return e === !1 ? n : n.join(e || this.lineSeparator());
        },
        getSelections: function(e) {
          for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
            var i = Dt(this, n[r].from(), n[r].to());
            e !== !1 && (i = i.join(e || this.lineSeparator())), t[r] = i;
          }
          return t;
        },
        replaceSelection: function(e, t, n) {
          for (var r = [], i = 0; i < this.sel.ranges.length; i++)
            r[i] = e;
          this.replaceSelections(r, t, n || "+input");
        },
        replaceSelections: ve(function(e, t, n) {
          for (var r = [], i = this.sel, l = 0; l < i.ranges.length; l++) {
            var o = i.ranges[l];
            r[l] = { from: o.from(), to: o.to(), text: this.splitLines(e[l]), origin: n };
          }
          for (var a = t && t != "end" && bs(this, r, t), s = r.length - 1; s >= 0; s--)
            zr(this, r[s]);
          a ? To(this, a) : this.cm && Fr(this.cm);
        }),
        undo: ve(function() {
          ni(this, "undo");
        }),
        redo: ve(function() {
          ni(this, "redo");
        }),
        undoSelection: ve(function() {
          ni(this, "undo", !0);
        }),
        redoSelection: ve(function() {
          ni(this, "redo", !0);
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
          this.history = new Vn(this.history), jt(this, function(t) {
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
            done: Ir(this.history.done),
            undone: Ir(this.history.undone)
          };
        },
        setHistory: function(e) {
          var t = this.history = new Vn(this.history);
          t.done = Ir(e.done.slice(0), null, !0), t.undone = Ir(e.undone.slice(0), null, !0);
        },
        setGutterMarker: ve(function(e, t, n) {
          return gn(this, e, "gutter", function(r) {
            var i = r.gutterMarkers || (r.gutterMarkers = {});
            return i[t] = n, !n && On(i) && (r.gutterMarkers = null), !0;
          });
        }),
        clearGutter: ve(function(e) {
          var t = this;
          this.iter(function(n) {
            n.gutterMarkers && n.gutterMarkers[e] && gn(t, n, "gutter", function() {
              return n.gutterMarkers[e] = null, On(n.gutterMarkers) && (n.gutterMarkers = null), !0;
            });
          });
        }),
        lineInfo: function(e) {
          var t;
          if (typeof e == "number") {
            if (!b(this, e) || (t = e, e = A(this, e), !e))
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
        addLineClass: ve(function(e, t, n) {
          return gn(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass";
            if (!r[i])
              r[i] = n;
            else {
              if (It(n).test(r[i]))
                return !1;
              r[i] += " " + n;
            }
            return !0;
          });
        }),
        removeLineClass: ve(function(e, t, n) {
          return gn(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass", l = r[i];
            if (l)
              if (n == null)
                r[i] = null;
              else {
                var o = l.match(It(n));
                if (!o)
                  return !1;
                var a = o.index + o[0].length;
                r[i] = l.slice(0, o.index) + (!o.index || a == l.length ? "" : " ") + l.slice(a) || null;
              }
            else return !1;
            return !0;
          });
        }),
        addLineWidget: ve(function(e, t, n) {
          return Ns(this, e, t, n);
        }),
        removeLineWidget: function(e) {
          e.clear();
        },
        markText: function(e, t, n) {
          return Gr(this, I(this, e), I(this, t), n, n && n.type || "range");
        },
        setBookmark: function(e, t) {
          var n = {
            replacedWith: t && (t.nodeType == null ? t.widget : t),
            insertLeft: t && t.insertLeft,
            clearWhenEmpty: !1,
            shared: t && t.shared,
            handleMouseEvents: t && t.handleMouseEvents
          };
          return e = I(this, e), Gr(this, e, e, n, "bookmark");
        },
        findMarksAt: function(e) {
          e = I(this, e);
          var t = [], n = A(this, e.line).markedSpans;
          if (n)
            for (var r = 0; r < n.length; ++r) {
              var i = n[r];
              (i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
            }
          return t;
        },
        findMarks: function(e, t, n) {
          e = I(this, e), t = I(this, t);
          var r = [], i = e.line;
          return this.iter(e.line, t.line + 1, function(l) {
            var o = l.markedSpans;
            if (o)
              for (var a = 0; a < o.length; a++) {
                var s = o[a];
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
            var l = i.text.length + r;
            if (l > e)
              return t = e, !0;
            e -= l, ++n;
          }), I(this, y(n, t));
        },
        indexFromPos: function(e) {
          e = I(this, e);
          var t = e.ch;
          if (e.line < this.first || e.ch < 0)
            return 0;
          var n = this.lineSeparator().length;
          return this.iter(this.first, e.line, function(r) {
            t += r.text.length + n;
          }), t;
        },
        copy: function(e) {
          var t = new We(
            $r(this, this.first, this.first + this.size),
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
          var r = new We($r(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
          return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }), r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], As(r, Ro(this)), r;
        },
        unlinkDoc: function(e) {
          if (e instanceof $ && (e = e.doc), this.linked)
            for (var t = 0; t < this.linked.length; ++t) {
              var n = this.linked[t];
              if (n.doc == e) {
                this.linked.splice(t, 1), e.unlinkDoc(this), Os(Ro(this));
                break;
              }
            }
          if (e.history == this.history) {
            var r = [e.id];
            jt(e, function(i) {
              return r.push(i.id);
            }, !0), e.history = new Vn(null), e.history.done = Ir(this.history.done, r), e.history.undone = Ir(this.history.undone, r);
          }
        },
        iterLinkedDocs: function(e) {
          jt(this, e);
        },
        getMode: function() {
          return this.mode;
        },
        getEditor: function() {
          return this.cm;
        },
        splitLines: function(e) {
          return this.lineSep ? e.split(this.lineSep) : Je(e);
        },
        lineSeparator: function() {
          return this.lineSep || `
`;
        },
        setDirection: ve(function(e) {
          e != "rtl" && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(t) {
            return t.order = null;
          }), this.cm && xs(this.cm));
        })
      }), We.prototype.eachLine = We.prototype.iter;
      var Go = 0;
      function Hs(e) {
        var t = this;
        if (Uo(t), !(re(t, e) || Wt(t.display, e))) {
          Ce(e), z && (Go = +/* @__PURE__ */ new Date());
          var n = fr(t, e, !0), r = e.dataTransfer.files;
          if (!(!n || t.isReadOnly()))
            if (r && r.length && window.FileReader && window.File)
              for (var i = r.length, l = Array(i), o = 0, a = function() {
                ++o == i && pe(t, function() {
                  n = I(t.doc, n);
                  var v = {
                    from: n,
                    to: n,
                    text: t.doc.splitLines(
                      l.filter(function(m) {
                        return m != null;
                      }).join(t.doc.lineSeparator())
                    ),
                    origin: "paste"
                  };
                  zr(t.doc, v), To(t.doc, Qt(I(t.doc, n), I(t.doc, Jt(v))));
                })();
              }, s = function(v, m) {
                if (t.options.allowDropFileTypes && R(t.options.allowDropFileTypes, v.type) == -1) {
                  a();
                  return;
                }
                var x = new FileReader();
                x.onerror = function() {
                  return a();
                }, x.onload = function() {
                  var S = x.result;
                  if (/[\x00-\x08\x0e-\x1f]{2}/.test(S)) {
                    a();
                    return;
                  }
                  l[m] = S, a();
                }, x.readAsText(v);
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
                  var d;
                  if (t.state.draggingText && !t.state.draggingText.copy && (d = t.listSelections()), ti(t.doc, Qt(n, n)), d)
                    for (var g = 0; g < d.length; ++g)
                      Rr(t.doc, "", d[g].anchor, d[g].head, "drag");
                  t.replaceSelection(h, "around", "paste"), t.display.input.focus();
                }
              } catch {
              }
            }
        }
      }
      function Es(e, t) {
        if (z && (!e.state.draggingText || +/* @__PURE__ */ new Date() - Go < 100)) {
          Ut(t);
          return;
        }
        if (!(re(e, t) || Wt(e.display, t)) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !mr)) {
          var n = p("img", null, null, "position: fixed; left: 0; top: 0;");
          n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", Ge && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), Ge && n.parentNode.removeChild(n);
        }
      }
      function Fs(e, t) {
        var n = fr(e, t);
        if (n) {
          var r = document.createDocumentFragment();
          Fi(e, n, r), e.display.dragCursor || (e.display.dragCursor = p("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), H(e.display.dragCursor, r);
        }
      }
      function Uo(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }
      function _o(e) {
        if (document.getElementsByClassName) {
          for (var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < t.length; r++) {
            var i = t[r].CodeMirror;
            i && n.push(i);
          }
          n.length && n[0].operation(function() {
            for (var l = 0; l < n.length; l++)
              e(n[l]);
          });
        }
      }
      var Ko = !1;
      function Ps() {
        Ko || (Is(), Ko = !0);
      }
      function Is() {
        var e;
        E(window, "resize", function() {
          e == null && (e = setTimeout(function() {
            e = null, _o(Bs);
          }, 100));
        }), E(window, "blur", function() {
          return _o(Er);
        });
      }
      function Bs(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize();
      }
      for (var $t = {
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
      }, wn = 0; wn < 10; wn++)
        $t[wn + 48] = $t[wn + 96] = String(wn);
      for (var ii = 65; ii <= 90; ii++)
        $t[ii] = String.fromCharCode(ii);
      for (var Cn = 1; Cn <= 12; Cn++)
        $t[Cn + 111] = $t[Cn + 63235] = "F" + Cn;
      var Et = {};
      Et.basic = {
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
      }, Et.pcDefault = {
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
      }, Et.emacsy = {
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
      }, Et.macDefault = {
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
      }, Et.default = be ? Et.macDefault : Et.pcDefault;
      function zs(e) {
        var t = e.split(/-(?!$)/);
        e = t[t.length - 1];
        for (var n, r, i, l, o = 0; o < t.length - 1; o++) {
          var a = t[o];
          if (/^(cmd|meta|m)$/i.test(a))
            l = !0;
          else if (/^a(lt)?$/i.test(a))
            n = !0;
          else if (/^(c|ctrl|control)$/i.test(a))
            r = !0;
          else if (/^s(hift)?$/i.test(a))
            i = !0;
          else
            throw new Error("Unrecognized modifier name: " + a);
        }
        return n && (e = "Alt-" + e), r && (e = "Ctrl-" + e), l && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
      }
      function Rs(e) {
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
            for (var i = lr(n.split(" "), zs), l = 0; l < i.length; l++) {
              var o = void 0, a = void 0;
              l == i.length - 1 ? (a = i.join(" "), o = r) : (a = i.slice(0, l + 1).join(" "), o = "...");
              var s = t[a];
              if (!s)
                t[a] = o;
              else if (s != o)
                throw new Error("Inconsistent bindings for " + a);
            }
            delete e[n];
          }
        for (var u in t)
          e[u] = t[u];
        return e;
      }
      function Ur(e, t, n, r) {
        t = li(t);
        var i = t.call ? t.call(e, r) : t[e];
        if (i === !1)
          return "nothing";
        if (i === "...")
          return "multi";
        if (i != null && n(i))
          return "handled";
        if (t.fallthrough) {
          if (Object.prototype.toString.call(t.fallthrough) != "[object Array]")
            return Ur(e, t.fallthrough, n, r);
          for (var l = 0; l < t.fallthrough.length; l++) {
            var o = Ur(e, t.fallthrough[l], n, r);
            if (o)
              return o;
          }
        }
      }
      function Xo(e) {
        var t = typeof e == "string" ? e : $t[e.keyCode];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
      }
      function Yo(e, t, n) {
        var r = e;
        return t.altKey && r != "Alt" && (e = "Alt-" + e), (Nn ? t.metaKey : t.ctrlKey) && r != "Ctrl" && (e = "Ctrl-" + e), (Nn ? t.ctrlKey : t.metaKey) && r != "Mod" && (e = "Cmd-" + e), !n && t.shiftKey && r != "Shift" && (e = "Shift-" + e), e;
      }
      function qo(e, t) {
        if (Ge && e.keyCode == 34 && e.char)
          return !1;
        var n = $t[e.keyCode];
        return n == null || e.altGraphKey ? !1 : (e.keyCode == 3 && e.code && (n = e.code), Yo(n, e, t));
      }
      function li(e) {
        return typeof e == "string" ? Et[e] : e;
      }
      function _r(e, t) {
        for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
          for (var l = t(n[i]); r.length && T(l.from, X(r).to) <= 0; ) {
            var o = r.pop();
            if (T(o.from, l.from) < 0) {
              l.from = o.from;
              break;
            }
          }
          r.push(l);
        }
        ze(e, function() {
          for (var a = r.length - 1; a >= 0; a--)
            Rr(e.doc, "", r[a].from, r[a].to, "+delete");
          Fr(e);
        });
      }
      function Vi(e, t, n) {
        var r = zt(e.text, t + n, n);
        return r < 0 || r > e.text.length ? null : r;
      }
      function $i(e, t, n) {
        var r = Vi(e, t.ch, n);
        return r == null ? null : new y(t.line, r, n < 0 ? "after" : "before");
      }
      function el(e, t, n, r, i) {
        if (e) {
          t.doc.direction == "rtl" && (i = -i);
          var l = K(n, t.doc.direction);
          if (l) {
            var o = i < 0 ? X(l) : l[0], a = i < 0 == (o.level == 1), s = a ? "after" : "before", u;
            if (o.level > 0 || t.doc.direction == "rtl") {
              var h = Or(t, n);
              u = i < 0 ? n.text.length - 1 : 0;
              var d = xt(t, h, u).top;
              u = gt(function(g) {
                return xt(t, h, g).top == d;
              }, i < 0 == (o.level == 1) ? o.from : o.to - 1, u), s == "before" && (u = Vi(n, u, 1));
            } else
              u = i < 0 ? o.to : o.from;
            return new y(r, u, s);
          }
        }
        return new y(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after");
      }
      function Gs(e, t, n, r) {
        var i = K(t, e.doc.direction);
        if (!i)
          return $i(t, n, r);
        n.ch >= t.text.length ? (n.ch = t.text.length, n.sticky = "before") : n.ch <= 0 && (n.ch = 0, n.sticky = "after");
        var l = Gt(i, n.ch, n.sticky), o = i[l];
        if (e.doc.direction == "ltr" && o.level % 2 == 0 && (r > 0 ? o.to > n.ch : o.from < n.ch))
          return $i(t, n, r);
        var a = function(k, M) {
          return Vi(t, k instanceof y ? k.ch : k, M);
        }, s, u = function(k) {
          return e.options.lineWrapping ? (s = s || Or(e, t), jl(e, t, s, k)) : { begin: 0, end: t.text.length };
        }, h = u(n.sticky == "before" ? a(n, -1) : n.ch);
        if (e.doc.direction == "rtl" || o.level == 1) {
          var d = o.level == 1 == r < 0, g = a(n, d ? 1 : -1);
          if (g != null && (d ? g <= o.to && g <= h.end : g >= o.from && g >= h.begin)) {
            var v = d ? "before" : "after";
            return new y(n.line, g, v);
          }
        }
        var m = function(k, M, L) {
          for (var D = function(J, ge) {
            return ge ? new y(n.line, a(J, 1), "before") : new y(n.line, J, "after");
          }; k >= 0 && k < i.length; k += M) {
            var F = i[k], O = M > 0 == (F.level != 1), G = O ? L.begin : a(L.end, -1);
            if (F.from <= G && G < F.to || (G = O ? F.from : a(F.to, -1), L.begin <= G && G < L.end))
              return D(G, O);
          }
        }, x = m(l + r, r, h);
        if (x)
          return x;
        var S = r > 0 ? h.end : a(h.begin, -1);
        return S != null && !(r > 0 && S == t.text.length) && (x = m(r > 0 ? 0 : i.length - 1, r, u(S)), x) ? x : null;
      }
      var Sn = {
        selectAll: Oo,
        singleSelection: function(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Ke);
        },
        killLine: function(e) {
          return _r(e, function(t) {
            if (t.empty()) {
              var n = A(e.doc, t.head.line).text.length;
              return t.head.ch == n && t.head.line < e.lastLine() ? { from: t.head, to: y(t.head.line + 1, 0) } : { from: t.head, to: y(t.head.line, n) };
            } else
              return { from: t.from(), to: t.to() };
          });
        },
        deleteLine: function(e) {
          return _r(e, function(t) {
            return {
              from: y(t.from().line, 0),
              to: I(e.doc, y(t.to().line + 1, 0))
            };
          });
        },
        delLineLeft: function(e) {
          return _r(e, function(t) {
            return {
              from: y(t.from().line, 0),
              to: t.from()
            };
          });
        },
        delWrappedLineLeft: function(e) {
          return _r(e, function(t) {
            var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: n }, "div");
            return { from: r, to: t.from() };
          });
        },
        delWrappedLineRight: function(e) {
          return _r(e, function(t) {
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
          return e.extendSelection(y(e.firstLine(), 0));
        },
        goDocEnd: function(e) {
          return e.extendSelection(y(e.lastLine()));
        },
        goLineStart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Zo(e, t.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Qo(e, t.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Us(e, t.head.line);
            },
            { origin: "+move", bias: -1 }
          );
        },
        goLineRight: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
          }, Xe);
        },
        goLineLeft: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: 0, top: n }, "div");
          }, Xe);
        },
        goLineLeftSmart: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: n }, "div");
            return r.ch < e.getLine(r.line).search(/\S/) ? Qo(e, t.head) : r;
          }, Xe);
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
            var l = n[i].from(), o = Z(e.getLine(l.line), l.ch, r);
            t.push(Zr(r - o % r));
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
          return ze(e, function() {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
              if (t[r].empty()) {
                var i = t[r].head, l = A(e.doc, i.line).text;
                if (l) {
                  if (i.ch == l.length && (i = new y(i.line, i.ch - 1)), i.ch > 0)
                    i = new y(i.line, i.ch + 1), e.replaceRange(
                      l.charAt(i.ch - 1) + l.charAt(i.ch - 2),
                      y(i.line, i.ch - 2),
                      i,
                      "+transpose"
                    );
                  else if (i.line > e.doc.first) {
                    var o = A(e.doc, i.line - 1).text;
                    o && (i = new y(i.line, 1), e.replaceRange(
                      l.charAt(0) + e.doc.lineSeparator() + o.charAt(o.length - 1),
                      y(i.line - 1, o.length - 1),
                      i,
                      "+transpose"
                    ));
                  }
                }
                n.push(new q(i, i));
              }
            e.setSelections(n);
          });
        },
        newlineAndIndent: function(e) {
          return ze(e, function() {
            for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--)
              e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input");
            t = e.listSelections();
            for (var r = 0; r < t.length; r++)
              e.indentLine(t[r].from().line, null, !0);
            Fr(e);
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
      function Zo(e, t) {
        var n = A(e.doc, t), r = at(n);
        return r != n && (t = f(r)), el(!0, e, r, t, 1);
      }
      function Us(e, t) {
        var n = A(e.doc, t), r = La(n);
        return r != n && (t = f(r)), el(!0, e, n, t, -1);
      }
      function Qo(e, t) {
        var n = Zo(e, t.line), r = A(e.doc, n.line), i = K(r, e.doc.direction);
        if (!i || i[0].level == 0) {
          var l = Math.max(n.ch, r.text.search(/\S/)), o = t.line == n.line && t.ch <= l && t.ch;
          return y(n.line, o ? 0 : l, n.sticky);
        }
        return n;
      }
      function oi(e, t, n) {
        if (typeof t == "string" && (t = Sn[t], !t))
          return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift, i = !1;
        try {
          e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != Bt;
        } finally {
          e.display.shift = r, e.state.suppressEdits = !1;
        }
        return i;
      }
      function _s(e, t, n) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
          var i = Ur(t, e.state.keyMaps[r], n, e);
          if (i)
            return i;
        }
        return e.options.extraKeys && Ur(t, e.options.extraKeys, n, e) || Ur(t, e.options.keyMap, n, e);
      }
      var Ks = new dt();
      function kn(e, t, n, r) {
        var i = e.state.keySeq;
        if (i) {
          if (Xo(t))
            return "handled";
          if (/\'$/.test(t) ? e.state.keySeq = null : Ks.set(50, function() {
            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
          }), Jo(e, i + " " + t, n, r))
            return !0;
        }
        return Jo(e, t, n, r);
      }
      function Jo(e, t, n, r) {
        var i = _s(e, t, r);
        return i == "multi" && (e.state.keySeq = t), i == "handled" && de(e, "keyHandled", e, t, n), (i == "handled" || i == "multi") && (Ce(n), Pi(e)), !!i;
      }
      function jo(e, t) {
        var n = qo(t, !0);
        return n ? t.shiftKey && !e.state.keySeq ? kn(e, "Shift-" + n, t, function(r) {
          return oi(e, r, !0);
        }) || kn(e, n, t, function(r) {
          if (typeof r == "string" ? /^go[A-Z]/.test(r) : r.motion)
            return oi(e, r);
        }) : kn(e, n, t, function(r) {
          return oi(e, r);
        }) : !1;
      }
      function Xs(e, t, n) {
        return kn(e, "'" + n + "'", t, function(r) {
          return oi(e, r, !0);
        });
      }
      var tl = null;
      function Vo(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && (t.curOp.focus = xe(tt(t)), !re(t, e))) {
          z && N < 11 && e.keyCode == 27 && (e.returnValue = !1);
          var n = e.keyCode;
          t.display.shift = n == 16 || e.shiftKey;
          var r = jo(t, e);
          Ge && (tl = r ? n : null, !r && n == 88 && !En && (be ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), j && !be && !r && n == 46 && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), n == 18 && !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) && Ys(t);
        }
      }
      function Ys(e) {
        var t = e.display.lineDiv;
        Ue(t, "CodeMirror-crosshair");
        function n(r) {
          (r.keyCode == 18 || !r.altKey) && (ht(t, "CodeMirror-crosshair"), we(document, "keyup", n), we(document, "mouseover", n));
        }
        E(document, "keyup", n), E(document, "mouseover", n);
      }
      function $o(e) {
        e.keyCode == 16 && (this.doc.sel.shift = !1), re(this, e);
      }
      function ea(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && !(Wt(t.display, e) || re(t, e) || e.ctrlKey && !e.altKey || be && e.metaKey)) {
          var n = e.keyCode, r = e.charCode;
          if (Ge && n == tl) {
            tl = null, Ce(e);
            return;
          }
          if (!(Ge && (!e.which || e.which < 10) && jo(t, e))) {
            var i = String.fromCharCode(r ?? n);
            i != "\b" && (Xs(t, e, i) || t.display.input.onKeyPress(e));
          }
        }
      }
      var qs = 400, rl = function(e, t, n) {
        this.time = e, this.pos = t, this.button = n;
      };
      rl.prototype.compare = function(e, t, n) {
        return this.time + qs > e && T(t, this.pos) == 0 && n == this.button;
      };
      var Ln, Tn;
      function Zs(e, t) {
        var n = +/* @__PURE__ */ new Date();
        return Tn && Tn.compare(n, e, t) ? (Ln = Tn = null, "triple") : Ln && Ln.compare(n, e, t) ? (Tn = new rl(n, e, t), Ln = null, "double") : (Ln = new rl(n, e, t), Tn = null, "single");
      }
      function ta(e) {
        var t = this, n = t.display;
        if (!(re(t, e) || n.activeTouch && n.input.supportsTouch())) {
          if (n.input.ensurePolled(), n.shift = e.shiftKey, Wt(n, e)) {
            W || (n.scroller.draggable = !1, setTimeout(function() {
              return n.scroller.draggable = !0;
            }, 100));
            return;
          }
          if (!nl(t, e)) {
            var r = fr(t, e), i = nt(e), l = r ? Zs(r, i) : "single";
            B(t).focus(), i == 1 && t.state.selectingText && t.state.selectingText(e), !(r && Qs(t, i, r, l, e)) && (i == 1 ? r ? js(t, r, l, e) : Jr(e) == n.scroller && Ce(e) : i == 2 ? (r && ei(t.doc, r), setTimeout(function() {
              return n.input.focus();
            }, 20)) : i == 3 && (xr ? t.display.input.onContextMenu(e) : Ii(t)));
          }
        }
      }
      function Qs(e, t, n, r, i) {
        var l = "Click";
        return r == "double" ? l = "Double" + l : r == "triple" && (l = "Triple" + l), l = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + l, kn(e, Yo(l, i), i, function(o) {
          if (typeof o == "string" && (o = Sn[o]), !o)
            return !1;
          var a = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), a = o(e, n) != Bt;
          } finally {
            e.state.suppressEdits = !1;
          }
          return a;
        });
      }
      function Js(e, t, n) {
        var r = e.getOption("configureMouse"), i = r ? r(e, t, n) : {};
        if (i.unit == null) {
          var l = nr ? n.shiftKey && n.metaKey : n.altKey;
          i.unit = l ? "rectangle" : t == "single" ? "char" : t == "double" ? "word" : "line";
        }
        return (i.extend == null || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey), i.addNew == null && (i.addNew = be ? n.metaKey : n.ctrlKey), i.moveOnDrag == null && (i.moveOnDrag = !(be ? n.altKey : n.ctrlKey)), i;
      }
      function js(e, t, n, r) {
        z ? setTimeout(P(to, e), 0) : e.curOp.focus = xe(tt(e));
        var i = Js(e, n, r), l = e.doc.sel, o;
        e.options.dragDrop && vi && !e.isReadOnly() && n == "single" && (o = l.contains(t)) > -1 && (T((o = l.ranges[o]).from(), t) < 0 || t.xRel > 0) && (T(o.to(), t) > 0 || t.xRel < 0) ? Vs(e, r, t, i) : $s(e, r, t, i);
      }
      function Vs(e, t, n, r) {
        var i = e.display, l = !1, o = pe(e, function(u) {
          W && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : Ii(e)), we(i.wrapper.ownerDocument, "mouseup", o), we(i.wrapper.ownerDocument, "mousemove", a), we(i.scroller, "dragstart", s), we(i.scroller, "drop", o), l || (Ce(u), r.addNew || ei(e.doc, n, null, null, r.extend), W && !mr || z && N == 9 ? setTimeout(function() {
            i.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), i.input.focus();
          }, 20) : i.input.focus());
        }), a = function(u) {
          l = l || Math.abs(t.clientX - u.clientX) + Math.abs(t.clientY - u.clientY) >= 10;
        }, s = function() {
          return l = !0;
        };
        W && (i.scroller.draggable = !0), e.state.draggingText = o, o.copy = !r.moveOnDrag, E(i.wrapper.ownerDocument, "mouseup", o), E(i.wrapper.ownerDocument, "mousemove", a), E(i.scroller, "dragstart", s), E(i.scroller, "drop", o), e.state.delayingBlurEvent = !0, setTimeout(function() {
          return i.input.focus();
        }, 20), i.scroller.dragDrop && i.scroller.dragDrop();
      }
      function ra(e, t, n) {
        if (n == "char")
          return new q(t, t);
        if (n == "word")
          return e.findWordAt(t);
        if (n == "line")
          return new q(y(t.line, 0), I(e.doc, y(t.line + 1, 0)));
        var r = n(e, t);
        return new q(r.from, r.to);
      }
      function $s(e, t, n, r) {
        z && Ii(e);
        var i = e.display, l = e.doc;
        Ce(t);
        var o, a, s = l.sel, u = s.ranges;
        if (r.addNew && !r.extend ? (a = l.sel.contains(n), a > -1 ? o = u[a] : o = new q(n, n)) : (o = l.sel.primary(), a = l.sel.primIndex), r.unit == "rectangle")
          r.addNew || (o = new q(n, n)), n = fr(e, t, !0, !0), a = -1;
        else {
          var h = ra(e, n, r.unit);
          r.extend ? o = Ji(o, h.anchor, h.head, r.extend) : o = h;
        }
        r.addNew ? a == -1 ? (a = u.length, Se(
          l,
          ut(e, u.concat([o]), a),
          { scroll: !1, origin: "*mouse" }
        )) : u.length > 1 && u[a].empty() && r.unit == "char" && !r.extend ? (Se(
          l,
          ut(e, u.slice(0, a).concat(u.slice(a + 1)), 0),
          { scroll: !1, origin: "*mouse" }
        ), s = l.sel) : ji(l, a, o, pt) : (a = 0, Se(l, new qe([o], 0), pt), s = l.sel);
        var d = n;
        function g(L) {
          if (T(d, L) != 0)
            if (d = L, r.unit == "rectangle") {
              for (var D = [], F = e.options.tabSize, O = Z(A(l, n.line).text, n.ch, F), G = Z(A(l, L.line).text, L.ch, F), J = Math.min(O, G), ge = Math.max(O, G), ee = Math.min(n.line, L.line), Re = Math.min(e.lastLine(), Math.max(n.line, L.line)); ee <= Re; ee++) {
                var He = A(l, ee).text, ae = vt(He, J, F);
                J == ge ? D.push(new q(y(ee, ae), y(ee, ae))) : He.length > ae && D.push(new q(y(ee, ae), y(ee, vt(He, ge, F))));
              }
              D.length || D.push(new q(n, n)), Se(
                l,
                ut(e, s.ranges.slice(0, a).concat(D), a),
                { origin: "*mouse", scroll: !1 }
              ), e.scrollIntoView(L);
            } else {
              var Ee = o, me = ra(e, L, r.unit), fe = Ee.anchor, se;
              T(me.anchor, fe) > 0 ? (se = me.head, fe = Nr(Ee.from(), me.anchor)) : (se = me.anchor, fe = Ae(Ee.to(), me.head));
              var ie = s.ranges.slice(0);
              ie[a] = eu(e, new q(I(l, fe), se)), Se(l, ut(e, ie, a), pt);
            }
        }
        var v = i.wrapper.getBoundingClientRect(), m = 0;
        function x(L) {
          var D = ++m, F = fr(e, L, !0, r.unit == "rectangle");
          if (F)
            if (T(F, d) != 0) {
              e.curOp.focus = xe(tt(e)), g(F);
              var O = Zn(i, l);
              (F.line >= O.to || F.line < O.from) && setTimeout(pe(e, function() {
                m == D && x(L);
              }), 150);
            } else {
              var G = L.clientY < v.top ? -20 : L.clientY > v.bottom ? 20 : 0;
              G && setTimeout(pe(e, function() {
                m == D && (i.scroller.scrollTop += G, x(L));
              }), 50);
            }
        }
        function S(L) {
          e.state.selectingText = !1, m = 1 / 0, L && (Ce(L), i.input.focus()), we(i.wrapper.ownerDocument, "mousemove", k), we(i.wrapper.ownerDocument, "mouseup", M), l.history.lastSelOrigin = null;
        }
        var k = pe(e, function(L) {
          L.buttons === 0 || !nt(L) ? S(L) : x(L);
        }), M = pe(e, S);
        e.state.selectingText = M, E(i.wrapper.ownerDocument, "mousemove", k), E(i.wrapper.ownerDocument, "mouseup", M);
      }
      function eu(e, t) {
        var n = t.anchor, r = t.head, i = A(e.doc, n.line);
        if (T(n, r) == 0 && n.sticky == r.sticky)
          return t;
        var l = K(i);
        if (!l)
          return t;
        var o = Gt(l, n.ch, n.sticky), a = l[o];
        if (a.from != n.ch && a.to != n.ch)
          return t;
        var s = o + (a.from == n.ch == (a.level != 1) ? 0 : 1);
        if (s == 0 || s == l.length)
          return t;
        var u;
        if (r.line != n.line)
          u = (r.line - n.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
        else {
          var h = Gt(l, r.ch, r.sticky), d = h - o || (r.ch - n.ch) * (a.level == 1 ? -1 : 1);
          h == s - 1 || h == s ? u = d < 0 : u = d > 0;
        }
        var g = l[s + (u ? -1 : 0)], v = u == (g.level == 1), m = v ? g.from : g.to, x = v ? "after" : "before";
        return n.ch == m && n.sticky == x ? t : new q(new y(n.line, m, x), r);
      }
      function na(e, t, n, r) {
        var i, l;
        if (t.touches)
          i = t.touches[0].clientX, l = t.touches[0].clientY;
        else
          try {
            i = t.clientX, l = t.clientY;
          } catch {
            return !1;
          }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right))
          return !1;
        r && Ce(t);
        var o = e.display, a = o.lineDiv.getBoundingClientRect();
        if (l > a.bottom || !Be(e, n))
          return De(t);
        l -= a.top - o.viewOffset;
        for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
          var u = o.gutters.childNodes[s];
          if (u && u.getBoundingClientRect().right >= i) {
            var h = c(e.doc, l), d = e.display.gutterSpecs[s];
            return te(e, n, e, h, d.className, t), De(t);
          }
        }
      }
      function nl(e, t) {
        return na(e, t, "gutterClick", !0);
      }
      function ia(e, t) {
        Wt(e.display, t) || tu(e, t) || re(e, t, "contextmenu") || xr || e.display.input.onContextMenu(t);
      }
      function tu(e, t) {
        return Be(e, "gutterContextMenu") ? na(e, t, "gutterContextMenu", !1) : !1;
      }
      function la(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), on(e);
      }
      var Kr = { toString: function() {
        return "CodeMirror.Init";
      } }, oa = {}, ai = {};
      function ru(e) {
        var t = e.optionHandlers;
        function n(r, i, l, o) {
          e.defaults[r] = i, l && (t[r] = o ? function(a, s, u) {
            u != Kr && l(a, s, u);
          } : l);
        }
        e.defineOption = n, e.Init = Kr, n("value", "", function(r, i) {
          return r.setValue(i);
        }, !0), n("mode", null, function(r, i) {
          r.doc.modeOption = i, qi(r);
        }, !0), n("indentUnit", 2, qi, !0), n("indentWithTabs", !1), n("smartIndent", !0), n("tabSize", 4, function(r) {
          pn(r), on(r), Oe(r);
        }, !0), n("lineSeparator", null, function(r, i) {
          if (r.doc.lineSep = i, !!i) {
            var l = [], o = r.doc.first;
            r.doc.iter(function(s) {
              for (var u = 0; ; ) {
                var h = s.text.indexOf(i, u);
                if (h == -1)
                  break;
                u = h + i.length, l.push(y(o, h));
              }
              o++;
            });
            for (var a = l.length - 1; a >= 0; a--)
              Rr(r.doc, i, l[a], y(l[a].line, l[a].ch + i.length));
          }
        }), n("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(r, i, l) {
          r.state.specialChars = new RegExp(i.source + (i.test("	") ? "" : "|	"), "g"), l != Kr && r.refresh();
        }), n("specialCharPlaceholder", Oa, function(r) {
          return r.refresh();
        }, !0), n("electricChars", !0), n("inputStyle", rr ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), n("spellcheck", !1, function(r, i) {
          return r.getInputField().spellcheck = i;
        }, !0), n("autocorrect", !1, function(r, i) {
          return r.getInputField().autocorrect = i;
        }, !0), n("autocapitalize", !1, function(r, i) {
          return r.getInputField().autocapitalize = i;
        }, !0), n("rtlMoveVisually", !hi), n("wholeLineUpdateBefore", !0), n("theme", "default", function(r) {
          la(r), dn(r);
        }, !0), n("keyMap", "default", function(r, i, l) {
          var o = li(i), a = l != Kr && li(l);
          a && a.detach && a.detach(r, o), o.attach && o.attach(r, a || null);
        }), n("extraKeys", null), n("configureMouse", null), n("lineWrapping", !1, iu, !0), n("gutters", [], function(r, i) {
          r.display.gutterSpecs = Xi(i, r.options.lineNumbers), dn(r);
        }, !0), n("fixedGutter", !0, function(r, i) {
          r.display.gutters.style.left = i ? Hi(r.display) + "px" : "0", r.refresh();
        }, !0), n("coverGutterNextToScrollbar", !1, function(r) {
          return Pr(r);
        }, !0), n("scrollbarStyle", "native", function(r) {
          ao(r), Pr(r), r.display.scrollbars.setScrollTop(r.doc.scrollTop), r.display.scrollbars.setScrollLeft(r.doc.scrollLeft);
        }, !0), n("lineNumbers", !1, function(r, i) {
          r.display.gutterSpecs = Xi(r.options.gutters, i), dn(r);
        }, !0), n("firstLineNumber", 1, dn, !0), n("lineNumberFormatter", function(r) {
          return r;
        }, dn, !0), n("showCursorWhenSelecting", !1, an, !0), n("resetSelectionOnContextMenu", !0), n("lineWiseCopyCut", !0), n("pasteLinesPerSelection", !0), n("selectionsMayTouch", !1), n("readOnly", !1, function(r, i) {
          i == "nocursor" && (Er(r), r.display.input.blur()), r.display.input.readOnlyChanged(i);
        }), n("screenReaderLabel", null, function(r, i) {
          i = i === "" ? null : i, r.display.input.screenReaderLabelChanged(i);
        }), n("disableInput", !1, function(r, i) {
          i || r.display.input.reset();
        }, !0), n("dragDrop", !0, nu), n("allowDropFileTypes", null), n("cursorBlinkRate", 530), n("cursorScrollMargin", 0), n("cursorHeight", 1, an, !0), n("singleCursorHeightPerLine", !0, an, !0), n("workTime", 100), n("workDelay", 100), n("flattenSpans", !0, pn, !0), n("addModeClass", !1, pn, !0), n("pollInterval", 100), n("undoDepth", 200, function(r, i) {
          return r.doc.history.undoDepth = i;
        }), n("historyEventDelay", 1250), n("viewportMargin", 10, function(r) {
          return r.refresh();
        }, !0), n("maxHighlightLength", 1e4, pn, !0), n("moveInputWithCursor", !0, function(r, i) {
          i || r.display.input.resetPosition();
        }), n("tabindex", null, function(r, i) {
          return r.display.input.getField().tabIndex = i || "";
        }), n("autofocus", null), n("direction", "ltr", function(r, i) {
          return r.doc.setDirection(i);
        }, !0), n("phrases", null);
      }
      function nu(e, t, n) {
        var r = n && n != Kr;
        if (!t != !r) {
          var i = e.display.dragFunctions, l = t ? E : we;
          l(e.display.scroller, "dragstart", i.start), l(e.display.scroller, "dragenter", i.enter), l(e.display.scroller, "dragover", i.over), l(e.display.scroller, "dragleave", i.leave), l(e.display.scroller, "drop", i.drop);
        }
      }
      function iu(e) {
        e.options.lineWrapping ? (Ue(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (ht(e.display.wrapper, "CodeMirror-wrap"), Si(e)), Ei(e), Oe(e), on(e), setTimeout(function() {
          return Pr(e);
        }, 100);
      }
      function $(e, t) {
        var n = this;
        if (!(this instanceof $))
          return new $(e, t);
        this.options = t = t ? _(t) : {}, _(oa, t, !1);
        var r = t.value;
        typeof r == "string" ? r = new We(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
        var i = new $.inputStyles[t.inputStyle](this), l = this.display = new ys(e, r, i, t);
        l.wrapper.CodeMirror = this, la(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), ao(this), this.state = {
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
          highlight: new dt(),
          // stores highlight worker timeout
          keySeq: null,
          // Unfinished key sequence
          specialChars: null
        }, t.autofocus && !rr && l.input.focus(), z && N < 11 && setTimeout(function() {
          return n.display.input.reset(!0);
        }, 20), lu(this), Ps(), pr(this), this.curOp.forceUpdate = !0, mo(this, r), t.autofocus && !rr || this.hasFocus() ? setTimeout(function() {
          n.hasFocus() && !n.state.focused && Bi(n);
        }, 20) : Er(this);
        for (var o in ai)
          ai.hasOwnProperty(o) && ai[o](this, t[o], Kr);
        fo(this), t.finishInit && t.finishInit(this);
        for (var a = 0; a < il.length; ++a)
          il[a](this);
        vr(this), W && t.lineWrapping && getComputedStyle(l.lineDiv).textRendering == "optimizelegibility" && (l.lineDiv.style.textRendering = "auto");
      }
      $.defaults = oa, $.optionHandlers = ai;
      function lu(e) {
        var t = e.display;
        E(t.scroller, "mousedown", pe(e, ta)), z && N < 11 ? E(t.scroller, "dblclick", pe(e, function(s) {
          if (!re(e, s)) {
            var u = fr(e, s);
            if (!(!u || nl(e, s) || Wt(e.display, s))) {
              Ce(s);
              var h = e.findWordAt(u);
              ei(e.doc, h.anchor, h.head);
            }
          }
        })) : E(t.scroller, "dblclick", function(s) {
          return re(e, s) || Ce(s);
        }), E(t.scroller, "contextmenu", function(s) {
          return ia(e, s);
        }), E(t.input.getField(), "contextmenu", function(s) {
          t.scroller.contains(s.target) || ia(e, s);
        });
        var n, r = { end: 0 };
        function i() {
          t.activeTouch && (n = setTimeout(function() {
            return t.activeTouch = null;
          }, 1e3), r = t.activeTouch, r.end = +/* @__PURE__ */ new Date());
        }
        function l(s) {
          if (s.touches.length != 1)
            return !1;
          var u = s.touches[0];
          return u.radiusX <= 1 && u.radiusY <= 1;
        }
        function o(s, u) {
          if (u.left == null)
            return !0;
          var h = u.left - s.left, d = u.top - s.top;
          return h * h + d * d > 20 * 20;
        }
        E(t.scroller, "touchstart", function(s) {
          if (!re(e, s) && !l(s) && !nl(e, s)) {
            t.input.ensurePolled(), clearTimeout(n);
            var u = +/* @__PURE__ */ new Date();
            t.activeTouch = {
              start: u,
              moved: !1,
              prev: u - r.end <= 300 ? r : null
            }, s.touches.length == 1 && (t.activeTouch.left = s.touches[0].pageX, t.activeTouch.top = s.touches[0].pageY);
          }
        }), E(t.scroller, "touchmove", function() {
          t.activeTouch && (t.activeTouch.moved = !0);
        }), E(t.scroller, "touchend", function(s) {
          var u = t.activeTouch;
          if (u && !Wt(t, s) && u.left != null && !u.moved && /* @__PURE__ */ new Date() - u.start < 300) {
            var h = e.coordsChar(t.activeTouch, "page"), d;
            !u.prev || o(u, u.prev) ? d = new q(h, h) : !u.prev.prev || o(u, u.prev.prev) ? d = e.findWordAt(h) : d = new q(y(h.line, 0), I(e.doc, y(h.line + 1, 0))), e.setSelection(d.anchor, d.head), e.focus(), Ce(s);
          }
          i();
        }), E(t.scroller, "touchcancel", i), E(t.scroller, "scroll", function() {
          t.scroller.clientHeight && (un(e, t.scroller.scrollTop), cr(e, t.scroller.scrollLeft, !0), te(e, "scroll", e));
        }), E(t.scroller, "mousewheel", function(s) {
          return po(e, s);
        }), E(t.scroller, "DOMMouseScroll", function(s) {
          return po(e, s);
        }), E(t.wrapper, "scroll", function() {
          return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0;
        }), t.dragFunctions = {
          enter: function(s) {
            re(e, s) || Ut(s);
          },
          over: function(s) {
            re(e, s) || (Fs(e, s), Ut(s));
          },
          start: function(s) {
            return Es(e, s);
          },
          drop: pe(e, Hs),
          leave: function(s) {
            re(e, s) || Uo(e);
          }
        };
        var a = t.input.getField();
        E(a, "keyup", function(s) {
          return $o.call(e, s);
        }), E(a, "keydown", pe(e, Vo)), E(a, "keypress", pe(e, ea)), E(a, "focus", function(s) {
          return Bi(e, s);
        }), E(a, "blur", function(s) {
          return Er(e, s);
        });
      }
      var il = [];
      $.defineInitHook = function(e) {
        return il.push(e);
      };
      function Mn(e, t, n, r) {
        var i = e.doc, l;
        n == null && (n = "add"), n == "smart" && (i.mode.indent ? l = en(e, t).state : n = "prev");
        var o = e.options.tabSize, a = A(i, t), s = Z(a.text, null, o);
        a.stateAfter && (a.stateAfter = null);
        var u = a.text.match(/^\s*/)[0], h;
        if (!r && !/\S/.test(a.text))
          h = 0, n = "not";
        else if (n == "smart" && (h = i.mode.indent(l, a.text.slice(u.length), a.text), h == Bt || h > 150)) {
          if (!r)
            return;
          n = "prev";
        }
        n == "prev" ? t > i.first ? h = Z(A(i, t - 1).text, null, o) : h = 0 : n == "add" ? h = s + e.options.indentUnit : n == "subtract" ? h = s - e.options.indentUnit : typeof n == "number" && (h = s + n), h = Math.max(0, h);
        var d = "", g = 0;
        if (e.options.indentWithTabs)
          for (var v = Math.floor(h / o); v; --v)
            g += o, d += "	";
        if (g < h && (d += Zr(h - g)), d != u)
          return Rr(i, d, y(t, 0), y(t, u.length), "+input"), a.stateAfter = null, !0;
        for (var m = 0; m < i.sel.ranges.length; m++) {
          var x = i.sel.ranges[m];
          if (x.head.line == t && x.head.ch < u.length) {
            var S = y(t, u.length);
            ji(i, m, new q(S, S));
            break;
          }
        }
      }
      var ft = null;
      function si(e) {
        ft = e;
      }
      function ll(e, t, n, r, i) {
        var l = e.doc;
        e.display.shift = !1, r || (r = l.sel);
        var o = +/* @__PURE__ */ new Date() - 200, a = i == "paste" || e.state.pasteIncoming > o, s = Je(t), u = null;
        if (a && r.ranges.length > 1)
          if (ft && ft.text.join(`
`) == t) {
            if (r.ranges.length % ft.text.length == 0) {
              u = [];
              for (var h = 0; h < ft.text.length; h++)
                u.push(l.splitLines(ft.text[h]));
            }
          } else s.length == r.ranges.length && e.options.pasteLinesPerSelection && (u = lr(s, function(k) {
            return [k];
          }));
        for (var d = e.curOp.updateInput, g = r.ranges.length - 1; g >= 0; g--) {
          var v = r.ranges[g], m = v.from(), x = v.to();
          v.empty() && (n && n > 0 ? m = y(m.line, m.ch - n) : e.state.overwrite && !a ? x = y(x.line, Math.min(A(l, x.line).text.length, x.ch + X(s).length)) : a && ft && ft.lineWise && ft.text.join(`
`) == s.join(`
`) && (m = x = y(m.line, 0)));
          var S = {
            from: m,
            to: x,
            text: u ? u[g % u.length] : s,
            origin: i || (a ? "paste" : e.state.cutIncoming > o ? "cut" : "+input")
          };
          zr(e.doc, S), de(e, "inputRead", e, S);
        }
        t && !a && sa(e, t), Fr(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = d), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
      }
      function aa(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("Text");
        if (n)
          return e.preventDefault(), !t.isReadOnly() && !t.options.disableInput && t.hasFocus() && ze(t, function() {
            return ll(t, n, 0, null, "paste");
          }), !0;
      }
      function sa(e, t) {
        if (!(!e.options.electricChars || !e.options.smartIndent))
          for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
            var i = n.ranges[r];
            if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
              var l = e.getModeAt(i.head), o = !1;
              if (l.electricChars) {
                for (var a = 0; a < l.electricChars.length; a++)
                  if (t.indexOf(l.electricChars.charAt(a)) > -1) {
                    o = Mn(e, i.head.line, "smart");
                    break;
                  }
              } else l.electricInput && l.electricInput.test(A(e.doc, i.head.line).text.slice(0, i.head.ch)) && (o = Mn(e, i.head.line, "smart"));
              o && de(e, "electricInput", e, i.head.line);
            }
          }
      }
      function ua(e) {
        for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
          var i = e.doc.sel.ranges[r].head.line, l = { anchor: y(i, 0), head: y(i + 1, 0) };
          n.push(l), t.push(e.getRange(l.anchor, l.head));
        }
        return { text: t, ranges: n };
      }
      function ol(e, t, n, r) {
        e.setAttribute("autocorrect", n ? "on" : "off"), e.setAttribute("autocapitalize", r ? "on" : "off"), e.setAttribute("spellcheck", !!t);
      }
      function fa() {
        var e = p("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), t = p("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return W ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), V && (e.style.border = "1px solid black"), t;
      }
      function ou(e) {
        var t = e.optionHandlers, n = e.helpers = {};
        e.prototype = {
          constructor: e,
          focus: function() {
            B(this).focus(), this.display.input.focus();
          },
          setOption: function(r, i) {
            var l = this.options, o = l[r];
            l[r] == i && r != "mode" || (l[r] = i, t.hasOwnProperty(r) && pe(this, t[r])(this, i, o), te(this, "optionChange", this, r));
          },
          getOption: function(r) {
            return this.options[r];
          },
          getDoc: function() {
            return this.doc;
          },
          addKeyMap: function(r, i) {
            this.state.keyMaps[i ? "push" : "unshift"](li(r));
          },
          removeKeyMap: function(r) {
            for (var i = this.state.keyMaps, l = 0; l < i.length; ++l)
              if (i[l] == r || i[l].name == r)
                return i.splice(l, 1), !0;
          },
          addOverlay: Te(function(r, i) {
            var l = r.token ? r : e.getMode(this.options, r);
            if (l.startState)
              throw new Error("Overlays may not be stateful.");
            ci(
              this.state.overlays,
              {
                mode: l,
                modeSpec: r,
                opaque: i && i.opaque,
                priority: i && i.priority || 0
              },
              function(o) {
                return o.priority;
              }
            ), this.state.modeGen++, Oe(this);
          }),
          removeOverlay: Te(function(r) {
            for (var i = this.state.overlays, l = 0; l < i.length; ++l) {
              var o = i[l].modeSpec;
              if (o == r || typeof r == "string" && o.name == r) {
                i.splice(l, 1), this.state.modeGen++, Oe(this);
                return;
              }
            }
          }),
          indentLine: Te(function(r, i, l) {
            typeof i != "string" && typeof i != "number" && (i == null ? i = this.options.smartIndent ? "smart" : "prev" : i = i ? "add" : "subtract"), b(this.doc, r) && Mn(this, r, i, l);
          }),
          indentSelection: Te(function(r) {
            for (var i = this.doc.sel.ranges, l = -1, o = 0; o < i.length; o++) {
              var a = i[o];
              if (a.empty())
                a.head.line > l && (Mn(this, a.head.line, r, !0), l = a.head.line, o == this.doc.sel.primIndex && Fr(this));
              else {
                var s = a.from(), u = a.to(), h = Math.max(l, s.line);
                l = Math.min(this.lastLine(), u.line - (u.ch ? 0 : 1)) + 1;
                for (var d = h; d < l; ++d)
                  Mn(this, d, r);
                var g = this.doc.sel.ranges;
                s.ch == 0 && i.length == g.length && g[o].from().ch > 0 && ji(this.doc, o, new q(s, g[o].to()), Ke);
              }
            }
          }),
          // Fetch the parser token for a given character. Useful for hacks
          // that want to inspect the mode state (say, for completion).
          getTokenAt: function(r, i) {
            return bl(this, r, i);
          },
          getLineTokens: function(r, i) {
            return bl(this, y(r), i, !0);
          },
          getTokenTypeAt: function(r) {
            r = I(this.doc, r);
            var i = gl(this, A(this.doc, r.line)), l = 0, o = (i.length - 1) / 2, a = r.ch, s;
            if (a == 0)
              s = i[2];
            else
              for (; ; ) {
                var u = l + o >> 1;
                if ((u ? i[u * 2 - 1] : 0) >= a)
                  o = u;
                else if (i[u * 2 + 1] < a)
                  l = u + 1;
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
            var l = [];
            if (!n.hasOwnProperty(i))
              return l;
            var o = n[i], a = this.getModeAt(r);
            if (typeof a[i] == "string")
              o[a[i]] && l.push(o[a[i]]);
            else if (a[i])
              for (var s = 0; s < a[i].length; s++) {
                var u = o[a[i][s]];
                u && l.push(u);
              }
            else a.helperType && o[a.helperType] ? l.push(o[a.helperType]) : o[a.name] && l.push(o[a.name]);
            for (var h = 0; h < o._global.length; h++) {
              var d = o._global[h];
              d.pred(a, this) && R(l, d.val) == -1 && l.push(d.val);
            }
            return l;
          },
          getStateAfter: function(r, i) {
            var l = this.doc;
            return r = dl(l, r ?? l.first + l.size - 1), en(this, r + 1, i).state;
          },
          cursorCoords: function(r, i) {
            var l, o = this.doc.sel.primary();
            return r == null ? l = o.head : typeof r == "object" ? l = I(this.doc, r) : l = r ? o.from() : o.to(), st(this, l, i || "page");
          },
          charCoords: function(r, i) {
            return Kn(this, I(this.doc, r), i || "page");
          },
          coordsChar: function(r, i) {
            return r = Zl(this, r, i || "page"), Ai(this, r.left, r.top);
          },
          lineAtHeight: function(r, i) {
            return r = Zl(this, { top: r, left: 0 }, i || "page").top, c(this.doc, r + this.display.viewOffset);
          },
          heightAtLine: function(r, i, l) {
            var o = !1, a;
            if (typeof r == "number") {
              var s = this.doc.first + this.doc.size - 1;
              r < this.doc.first ? r = this.doc.first : r > s && (r = s, o = !0), a = A(this.doc, r);
            } else
              a = r;
            return _n(this, a, { top: 0, left: 0 }, i || "page", l || o).top + (o ? this.doc.height - Ot(a) : 0);
          },
          defaultTextHeight: function() {
            return Wr(this.display);
          },
          defaultCharWidth: function() {
            return Hr(this.display);
          },
          getViewport: function() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          },
          addWidget: function(r, i, l, o, a) {
            var s = this.display;
            r = st(this, I(this.doc, r));
            var u = r.bottom, h = r.left;
            if (i.style.position = "absolute", i.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(i), s.sizer.appendChild(i), o == "over")
              u = r.top;
            else if (o == "above" || o == "near") {
              var d = Math.max(s.wrapper.clientHeight, this.doc.height), g = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
              (o == "above" || r.bottom + i.offsetHeight > d) && r.top > i.offsetHeight ? u = r.top - i.offsetHeight : r.bottom + i.offsetHeight <= d && (u = r.bottom), h + i.offsetWidth > g && (h = g - i.offsetWidth);
            }
            i.style.top = u + "px", i.style.left = i.style.right = "", a == "right" ? (h = s.sizer.clientWidth - i.offsetWidth, i.style.right = "0px") : (a == "left" ? h = 0 : a == "middle" && (h = (s.sizer.clientWidth - i.offsetWidth) / 2), i.style.left = h + "px"), l && ns(this, { left: h, top: u, right: h + i.offsetWidth, bottom: u + i.offsetHeight });
          },
          triggerOnKeyDown: Te(Vo),
          triggerOnKeyPress: Te(ea),
          triggerOnKeyUp: $o,
          triggerOnMouseDown: Te(ta),
          execCommand: function(r) {
            if (Sn.hasOwnProperty(r))
              return Sn[r].call(null, this);
          },
          triggerElectric: Te(function(r) {
            sa(this, r);
          }),
          findPosH: function(r, i, l, o) {
            var a = 1;
            i < 0 && (a = -1, i = -i);
            for (var s = I(this.doc, r), u = 0; u < i && (s = al(this.doc, s, a, l, o), !s.hitSide); ++u)
              ;
            return s;
          },
          moveH: Te(function(r, i) {
            var l = this;
            this.extendSelectionsBy(function(o) {
              return l.display.shift || l.doc.extend || o.empty() ? al(l.doc, o.head, r, i, l.options.rtlMoveVisually) : r < 0 ? o.from() : o.to();
            }, Xe);
          }),
          deleteH: Te(function(r, i) {
            var l = this.doc.sel, o = this.doc;
            l.somethingSelected() ? o.replaceSelection("", null, "+delete") : _r(this, function(a) {
              var s = al(o, a.head, r, i, !1);
              return r < 0 ? { from: s, to: a.head } : { from: a.head, to: s };
            });
          }),
          findPosV: function(r, i, l, o) {
            var a = 1, s = o;
            i < 0 && (a = -1, i = -i);
            for (var u = I(this.doc, r), h = 0; h < i; ++h) {
              var d = st(this, u, "div");
              if (s == null ? s = d.left : d.left = s, u = ha(this, d, a, l), u.hitSide)
                break;
            }
            return u;
          },
          moveV: Te(function(r, i) {
            var l = this, o = this.doc, a = [], s = !this.display.shift && !o.extend && o.sel.somethingSelected();
            if (o.extendSelectionsBy(function(h) {
              if (s)
                return r < 0 ? h.from() : h.to();
              var d = st(l, h.head, "div");
              h.goalColumn != null && (d.left = h.goalColumn), a.push(d.left);
              var g = ha(l, d, r, i);
              return i == "page" && h == o.sel.primary() && Ri(l, Kn(l, g, "div").top - d.top), g;
            }, Xe), a.length)
              for (var u = 0; u < o.sel.ranges.length; u++)
                o.sel.ranges[u].goalColumn = a[u];
          }),
          // Find the word at the given position (as returned by coordsChar).
          findWordAt: function(r) {
            var i = this.doc, l = A(i, r.line).text, o = r.ch, a = r.ch;
            if (l) {
              var s = this.getHelper(r, "wordChars");
              (r.sticky == "before" || a == l.length) && o ? --o : ++a;
              for (var u = l.charAt(o), h = Tt(u, s) ? function(d) {
                return Tt(d, s);
              } : /\s/.test(u) ? function(d) {
                return /\s/.test(d);
              } : function(d) {
                return !/\s/.test(d) && !Tt(d);
              }; o > 0 && h(l.charAt(o - 1)); )
                --o;
              for (; a < l.length && h(l.charAt(a)); )
                ++a;
            }
            return new q(y(r.line, o), y(r.line, a));
          },
          toggleOverwrite: function(r) {
            r != null && r == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? Ue(this.display.cursorDiv, "CodeMirror-overwrite") : ht(this.display.cursorDiv, "CodeMirror-overwrite"), te(this, "overwriteToggle", this, this.state.overwrite));
          },
          hasFocus: function() {
            return this.display.input.getField() == xe(tt(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: Te(function(r, i) {
            sn(this, r, i);
          }),
          getScrollInfo: function() {
            var r = this.display.scroller;
            return {
              left: r.scrollLeft,
              top: r.scrollTop,
              height: r.scrollHeight - bt(this) - this.display.barHeight,
              width: r.scrollWidth - bt(this) - this.display.barWidth,
              clientHeight: Ti(this),
              clientWidth: sr(this)
            };
          },
          scrollIntoView: Te(function(r, i) {
            r == null ? (r = { from: this.doc.sel.primary().head, to: null }, i == null && (i = this.options.cursorScrollMargin)) : typeof r == "number" ? r = { from: y(r, 0), to: null } : r.from == null && (r = { from: r, to: null }), r.to || (r.to = r.from), r.margin = i || 0, r.from.line != null ? is(this, r) : no(this, r.from, r.to, r.margin);
          }),
          setSize: Te(function(r, i) {
            var l = this, o = function(s) {
              return typeof s == "number" || /^\d+$/.test(String(s)) ? s + "px" : s;
            };
            r != null && (this.display.wrapper.style.width = o(r)), i != null && (this.display.wrapper.style.height = o(i)), this.options.lineWrapping && Xl(this);
            var a = this.display.viewFrom;
            this.doc.iter(a, this.display.viewTo, function(s) {
              if (s.widgets) {
                for (var u = 0; u < s.widgets.length; u++)
                  if (s.widgets[u].noHScroll) {
                    qt(l, a, "widget");
                    break;
                  }
              }
              ++a;
            }), this.curOp.forceUpdate = !0, te(this, "refresh", this);
          }),
          operation: function(r) {
            return ze(this, r);
          },
          startOperation: function() {
            return pr(this);
          },
          endOperation: function() {
            return vr(this);
          },
          refresh: Te(function() {
            var r = this.display.cachedTextHeight;
            Oe(this), this.curOp.forceUpdate = !0, on(this), sn(this, this.doc.scrollLeft, this.doc.scrollTop), _i(this.display), (r == null || Math.abs(r - Wr(this.display)) > 0.5 || this.options.lineWrapping) && Ei(this), te(this, "refresh", this);
          }),
          swapDoc: Te(function(r) {
            var i = this.doc;
            return i.cm = null, this.state.selectingText && this.state.selectingText(), mo(this, r), on(this), this.display.input.reset(), sn(this, r.scrollLeft, r.scrollTop), this.curOp.forceScroll = !0, de(this, "swapDoc", this, i), i;
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
        }, rt(e), e.registerHelper = function(r, i, l) {
          n.hasOwnProperty(r) || (n[r] = e[r] = { _global: [] }), n[r][i] = l;
        }, e.registerGlobalHelper = function(r, i, l, o) {
          e.registerHelper(r, i, o), n[r]._global.push({ pred: l, val: o });
        };
      }
      function al(e, t, n, r, i) {
        var l = t, o = n, a = A(e, t.line), s = i && e.direction == "rtl" ? -n : n;
        function u() {
          var M = t.line + s;
          return M < e.first || M >= e.first + e.size ? !1 : (t = new y(M, t.ch, t.sticky), a = A(e, M));
        }
        function h(M) {
          var L;
          if (r == "codepoint") {
            var D = a.text.charCodeAt(t.ch + (n > 0 ? 0 : -1));
            if (isNaN(D))
              L = null;
            else {
              var F = n > 0 ? D >= 55296 && D < 56320 : D >= 56320 && D < 57343;
              L = new y(t.line, Math.max(0, Math.min(a.text.length, t.ch + n * (F ? 2 : 1))), -n);
            }
          } else i ? L = Gs(e.cm, a, t, n) : L = $i(a, t, n);
          if (L == null)
            if (!M && u())
              t = el(i, e.cm, a, t.line, s);
            else
              return !1;
          else
            t = L;
          return !0;
        }
        if (r == "char" || r == "codepoint")
          h();
        else if (r == "column")
          h(!0);
        else if (r == "word" || r == "group")
          for (var d = null, g = r == "group", v = e.cm && e.cm.getHelper(t, "wordChars"), m = !0; !(n < 0 && !h(!m)); m = !1) {
            var x = a.text.charAt(t.ch) || `
`, S = Tt(x, v) ? "w" : g && x == `
` ? "n" : !g || /\s/.test(x) ? null : "p";
            if (g && !m && !S && (S = "s"), d && d != S) {
              n < 0 && (n = 1, h(), t.sticky = "after");
              break;
            }
            if (S && (d = S), n > 0 && !h(!m))
              break;
          }
        var k = ri(e, t, l, o, !0);
        return Y(l, k) && (k.hitSide = !0), k;
      }
      function ha(e, t, n, r) {
        var i = e.doc, l = t.left, o;
        if (r == "page") {
          var a = Math.min(e.display.wrapper.clientHeight, B(e).innerHeight || i(e).documentElement.clientHeight), s = Math.max(a - 0.5 * Wr(e.display), 3);
          o = (n > 0 ? t.bottom : t.top) + n * s;
        } else r == "line" && (o = n > 0 ? t.bottom + 3 : t.top - 3);
        for (var u; u = Ai(e, l, o), !!u.outside; ) {
          if (n < 0 ? o <= 0 : o >= i.height) {
            u.hitSide = !0;
            break;
          }
          o += n * 5;
        }
        return u;
      }
      var Q = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new dt(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };
      Q.prototype.init = function(e) {
        var t = this, n = this, r = n.cm, i = n.div = e.lineDiv;
        i.contentEditable = !0, ol(i, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize);
        function l(a) {
          for (var s = a.target; s; s = s.parentNode) {
            if (s == i)
              return !0;
            if (/\bCodeMirror-(?:line)?widget\b/.test(s.className))
              break;
          }
          return !1;
        }
        E(i, "paste", function(a) {
          !l(a) || re(r, a) || aa(a, r) || N <= 11 && setTimeout(pe(r, function() {
            return t.updateFromDOM();
          }), 20);
        }), E(i, "compositionstart", function(a) {
          t.composing = { data: a.data, done: !1 };
        }), E(i, "compositionupdate", function(a) {
          t.composing || (t.composing = { data: a.data, done: !1 });
        }), E(i, "compositionend", function(a) {
          t.composing && (a.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
        }), E(i, "touchstart", function() {
          return n.forceCompositionEnd();
        }), E(i, "input", function() {
          t.composing || t.readFromDOMSoon();
        });
        function o(a) {
          if (!(!l(a) || re(r, a))) {
            if (r.somethingSelected())
              si({ lineWise: !1, text: r.getSelections() }), a.type == "cut" && r.replaceSelection("", null, "cut");
            else if (r.options.lineWiseCopyCut) {
              var s = ua(r);
              si({ lineWise: !0, text: s.text }), a.type == "cut" && r.operation(function() {
                r.setSelections(s.ranges, 0, Ke), r.replaceSelection("", null, "cut");
              });
            } else
              return;
            if (a.clipboardData) {
              a.clipboardData.clearData();
              var u = ft.text.join(`
`);
              if (a.clipboardData.setData("Text", u), a.clipboardData.getData("Text") == u) {
                a.preventDefault();
                return;
              }
            }
            var h = fa(), d = h.firstChild;
            ol(d), r.display.lineSpace.insertBefore(h, r.display.lineSpace.firstChild), d.value = ft.text.join(`
`);
            var g = xe(he(i));
            ir(d), setTimeout(function() {
              r.display.lineSpace.removeChild(h), g.focus(), g == i && n.showPrimarySelection();
            }, 50);
          }
        }
        E(i, "copy", o), E(i, "cut", o);
      }, Q.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label");
      }, Q.prototype.prepareSelection = function() {
        var e = eo(this.cm, !1);
        return e.focus = xe(he(this.div)) == this.div, e;
      }, Q.prototype.showSelection = function(e, t) {
        !e || !this.cm.display.view.length || ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, Q.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, Q.prototype.showPrimarySelection = function() {
        var e = this.getSelection(), t = this.cm, n = t.doc.sel.primary(), r = n.from(), i = n.to();
        if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || i.line < t.display.viewFrom) {
          e.removeAllRanges();
          return;
        }
        var l = ui(t, e.anchorNode, e.anchorOffset), o = ui(t, e.focusNode, e.focusOffset);
        if (!(l && !l.bad && o && !o.bad && T(Nr(l, o), r) == 0 && T(Ae(l, o), i) == 0)) {
          var a = t.display.view, s = r.line >= t.display.viewFrom && ca(t, r) || { node: a[0].measure.map[2], offset: 0 }, u = i.line < t.display.viewTo && ca(t, i);
          if (!u) {
            var h = a[a.length - 1].measure, d = h.maps ? h.maps[h.maps.length - 1] : h.map;
            u = { node: d[d.length - 1], offset: d[d.length - 2] - d[d.length - 3] };
          }
          if (!s || !u) {
            e.removeAllRanges();
            return;
          }
          var g = e.rangeCount && e.getRangeAt(0), v;
          try {
            v = Ie(s.node, s.offset, u.offset, u.node);
          } catch {
          }
          v && (!j && t.state.focused ? (e.collapse(s.node, s.offset), v.collapsed || (e.removeAllRanges(), e.addRange(v))) : (e.removeAllRanges(), e.addRange(v)), g && e.anchorNode == null ? e.addRange(g) : j && this.startGracePeriod()), this.rememberSelection();
        }
      }, Q.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, Q.prototype.showMultipleSelections = function(e) {
        H(this.cm.display.cursorDiv, e.cursors), H(this.cm.display.selectionDiv, e.selection);
      }, Q.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, Q.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount)
          return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return et(this.div, t);
      }, Q.prototype.focus = function() {
        this.cm.options.readOnly != "nocursor" && ((!this.selectionInEditor() || xe(he(this.div)) != this.div) && this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, Q.prototype.blur = function() {
        this.div.blur();
      }, Q.prototype.getField = function() {
        return this.div;
      }, Q.prototype.supportsTouch = function() {
        return !0;
      }, Q.prototype.receivedFocus = function() {
        var e = this, t = this;
        this.selectionInEditor() ? setTimeout(function() {
          return e.pollSelection();
        }, 20) : ze(this.cm, function() {
          return t.cm.curOp.selectionChanged = !0;
        });
        function n() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, n));
        }
        this.polling.set(this.cm.options.pollInterval, n);
      }, Q.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, Q.prototype.pollSelection = function() {
        if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
          var e = this.getSelection(), t = this.cm;
          if (Ze && Pe && this.cm.display.gutterSpecs.length && au(e.anchorNode)) {
            this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var n = ui(t, e.anchorNode, e.anchorOffset), r = ui(t, e.focusNode, e.focusOffset);
            n && r && ze(t, function() {
              Se(t.doc, Qt(n, r), Ke), (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, Q.prototype.pollContent = function() {
        this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e = this.cm, t = e.display, n = e.doc.sel.primary(), r = n.from(), i = n.to();
        if (r.ch == 0 && r.line > e.firstLine() && (r = y(r.line - 1, A(e.doc, r.line - 1).length)), i.ch == A(e.doc, i.line).text.length && i.line < e.lastLine() && (i = y(i.line + 1, 0)), r.line < t.viewFrom || i.line > t.viewTo - 1)
          return !1;
        var l, o, a;
        r.line == t.viewFrom || (l = hr(e, r.line)) == 0 ? (o = f(t.view[0].line), a = t.view[0].node) : (o = f(t.view[l].line), a = t.view[l - 1].node.nextSibling);
        var s = hr(e, i.line), u, h;
        if (s == t.view.length - 1 ? (u = t.viewTo - 1, h = t.lineDiv.lastChild) : (u = f(t.view[s + 1].line) - 1, h = t.view[s + 1].node.previousSibling), !a)
          return !1;
        for (var d = e.doc.splitLines(su(e, a, h, o, u)), g = Dt(e.doc, y(o, 0), y(u, A(e.doc, u).text.length)); d.length > 1 && g.length > 1; )
          if (X(d) == X(g))
            d.pop(), g.pop(), u--;
          else if (d[0] == g[0])
            d.shift(), g.shift(), o++;
          else
            break;
        for (var v = 0, m = 0, x = d[0], S = g[0], k = Math.min(x.length, S.length); v < k && x.charCodeAt(v) == S.charCodeAt(v); )
          ++v;
        for (var M = X(d), L = X(g), D = Math.min(
          M.length - (d.length == 1 ? v : 0),
          L.length - (g.length == 1 ? v : 0)
        ); m < D && M.charCodeAt(M.length - m - 1) == L.charCodeAt(L.length - m - 1); )
          ++m;
        if (d.length == 1 && g.length == 1 && o == r.line)
          for (; v && v > r.ch && M.charCodeAt(M.length - m - 1) == L.charCodeAt(L.length - m - 1); )
            v--, m++;
        d[d.length - 1] = M.slice(0, M.length - m).replace(/^\u200b+/, ""), d[0] = d[0].slice(v).replace(/\u200b+$/, "");
        var F = y(o, v), O = y(u, g.length ? X(g).length - m : 0);
        if (d.length > 1 || d[0] || T(F, O))
          return Rr(e.doc, d, F, O, "+input"), !0;
      }, Q.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      }, Q.prototype.reset = function() {
        this.forceCompositionEnd();
      }, Q.prototype.forceCompositionEnd = function() {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, Q.prototype.readFromDOMSoon = function() {
        var e = this;
        this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
          if (e.readDOMTimeout = null, e.composing)
            if (e.composing.done)
              e.composing = null;
            else
              return;
          e.updateFromDOM();
        }, 80));
      }, Q.prototype.updateFromDOM = function() {
        var e = this;
        (this.cm.isReadOnly() || !this.pollContent()) && ze(this.cm, function() {
          return Oe(e.cm);
        });
      }, Q.prototype.setUneditable = function(e) {
        e.contentEditable = "false";
      }, Q.prototype.onKeyPress = function(e) {
        e.charCode == 0 || this.composing || (e.preventDefault(), this.cm.isReadOnly() || pe(this.cm, ll)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0));
      }, Q.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String(e != "nocursor");
      }, Q.prototype.onContextMenu = function() {
      }, Q.prototype.resetPosition = function() {
      }, Q.prototype.needsContentAttribute = !0;
      function ca(e, t) {
        var n = Mi(e, t.line);
        if (!n || n.hidden)
          return null;
        var r = A(e.doc, t.line), i = Rl(n, r, t.line), l = K(r, e.doc.direction), o = "left";
        if (l) {
          var a = Gt(l, t.ch);
          o = a % 2 ? "right" : "left";
        }
        var s = _l(i.map, t.ch, o);
        return s.offset = s.collapse == "right" ? s.end : s.start, s;
      }
      function au(e) {
        for (var t = e; t; t = t.parentNode)
          if (/CodeMirror-gutter-wrapper/.test(t.className))
            return !0;
        return !1;
      }
      function Xr(e, t) {
        return t && (e.bad = !0), e;
      }
      function su(e, t, n, r, i) {
        var l = "", o = !1, a = e.doc.lineSeparator(), s = !1;
        function u(v) {
          return function(m) {
            return m.id == v;
          };
        }
        function h() {
          o && (l += a, s && (l += a), o = s = !1);
        }
        function d(v) {
          v && (h(), l += v);
        }
        function g(v) {
          if (v.nodeType == 1) {
            var m = v.getAttribute("cm-text");
            if (m) {
              d(m);
              return;
            }
            var x = v.getAttribute("cm-marker"), S;
            if (x) {
              var k = e.findMarks(y(r, 0), y(i + 1, 0), u(+x));
              k.length && (S = k[0].find(0)) && d(Dt(e.doc, S.from, S.to).join(a));
              return;
            }
            if (v.getAttribute("contenteditable") == "false")
              return;
            var M = /^(pre|div|p|li|table|br)$/i.test(v.nodeName);
            if (!/^br$/i.test(v.nodeName) && v.textContent.length == 0)
              return;
            M && h();
            for (var L = 0; L < v.childNodes.length; L++)
              g(v.childNodes[L]);
            /^(pre|p)$/i.test(v.nodeName) && (s = !0), M && (o = !0);
          } else v.nodeType == 3 && d(v.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
        for (; g(t), t != n; )
          t = t.nextSibling, s = !1;
        return l;
      }
      function ui(e, t, n) {
        var r;
        if (t == e.display.lineDiv) {
          if (r = e.display.lineDiv.childNodes[n], !r)
            return Xr(e.clipPos(y(e.display.viewTo - 1)), !0);
          t = null, n = 0;
        } else
          for (r = t; ; r = r.parentNode) {
            if (!r || r == e.display.lineDiv)
              return null;
            if (r.parentNode && r.parentNode == e.display.lineDiv)
              break;
          }
        for (var i = 0; i < e.display.view.length; i++) {
          var l = e.display.view[i];
          if (l.node == r)
            return uu(l, t, n);
        }
      }
      function uu(e, t, n) {
        var r = e.text.firstChild, i = !1;
        if (!t || !et(r, t))
          return Xr(y(f(e.line), 0), !0);
        if (t == r && (i = !0, t = r.childNodes[n], n = 0, !t)) {
          var l = e.rest ? X(e.rest) : e.line;
          return Xr(y(f(l), l.text.length), i);
        }
        var o = t.nodeType == 3 ? t : null, a = t;
        for (!o && t.childNodes.length == 1 && t.firstChild.nodeType == 3 && (o = t.firstChild, n && (n = o.nodeValue.length)); a.parentNode != r; )
          a = a.parentNode;
        var s = e.measure, u = s.maps;
        function h(S, k, M) {
          for (var L = -1; L < (u ? u.length : 0); L++)
            for (var D = L < 0 ? s.map : u[L], F = 0; F < D.length; F += 3) {
              var O = D[F + 2];
              if (O == S || O == k) {
                var G = f(L < 0 ? e.line : e.rest[L]), J = D[F] + M;
                return (M < 0 || O != S) && (J = D[F + (M ? 1 : 0)]), y(G, J);
              }
            }
        }
        var d = h(o, a, n);
        if (d)
          return Xr(d, i);
        for (var g = a.nextSibling, v = o ? o.nodeValue.length - n : 0; g; g = g.nextSibling) {
          if (d = h(g, g.firstChild, 0), d)
            return Xr(y(d.line, d.ch - v), i);
          v += g.textContent.length;
        }
        for (var m = a.previousSibling, x = n; m; m = m.previousSibling) {
          if (d = h(m, m.firstChild, -1), d)
            return Xr(y(d.line, d.ch + x), i);
          x += m.textContent.length;
        }
      }
      var le = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new dt(), this.hasSelection = !1, this.composing = null, this.resetting = !1;
      };
      le.prototype.init = function(e) {
        var t = this, n = this, r = this.cm;
        this.createField(e);
        var i = this.textarea;
        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), V && (i.style.width = "0px"), E(i, "input", function() {
          z && N >= 9 && t.hasSelection && (t.hasSelection = null), n.poll();
        }), E(i, "paste", function(o) {
          re(r, o) || aa(o, r) || (r.state.pasteIncoming = +/* @__PURE__ */ new Date(), n.fastPoll());
        });
        function l(o) {
          if (!re(r, o)) {
            if (r.somethingSelected())
              si({ lineWise: !1, text: r.getSelections() });
            else if (r.options.lineWiseCopyCut) {
              var a = ua(r);
              si({ lineWise: !0, text: a.text }), o.type == "cut" ? r.setSelections(a.ranges, null, Ke) : (n.prevInput = "", i.value = a.text.join(`
`), ir(i));
            } else
              return;
            o.type == "cut" && (r.state.cutIncoming = +/* @__PURE__ */ new Date());
          }
        }
        E(i, "cut", l), E(i, "copy", l), E(e.scroller, "paste", function(o) {
          if (!(Wt(e, o) || re(r, o))) {
            if (!i.dispatchEvent) {
              r.state.pasteIncoming = +/* @__PURE__ */ new Date(), n.focus();
              return;
            }
            var a = new Event("paste");
            a.clipboardData = o.clipboardData, i.dispatchEvent(a);
          }
        }), E(e.lineSpace, "selectstart", function(o) {
          Wt(e, o) || Ce(o);
        }), E(i, "compositionstart", function() {
          var o = r.getCursor("from");
          n.composing && n.composing.range.clear(), n.composing = {
            start: o,
            range: r.markText(o, r.getCursor("to"), { className: "CodeMirror-composing" })
          };
        }), E(i, "compositionend", function() {
          n.composing && (n.poll(), n.composing.range.clear(), n.composing = null);
        });
      }, le.prototype.createField = function(e) {
        this.wrapper = fa(), this.textarea = this.wrapper.firstChild;
        var t = this.cm.options;
        ol(this.textarea, t.spellcheck, t.autocorrect, t.autocapitalize);
      }, le.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label");
      }, le.prototype.prepareSelection = function() {
        var e = this.cm, t = e.display, n = e.doc, r = eo(e);
        if (e.options.moveInputWithCursor) {
          var i = st(e, n.sel.primary().head, "div"), l = t.wrapper.getBoundingClientRect(), o = t.lineDiv.getBoundingClientRect();
          r.teTop = Math.max(0, Math.min(
            t.wrapper.clientHeight - 10,
            i.top + o.top - l.top
          )), r.teLeft = Math.max(0, Math.min(
            t.wrapper.clientWidth - 10,
            i.left + o.left - l.left
          ));
        }
        return r;
      }, le.prototype.showSelection = function(e) {
        var t = this.cm, n = t.display;
        H(n.cursorDiv, e.cursors), H(n.selectionDiv, e.selection), e.teTop != null && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, le.prototype.reset = function(e) {
        if (!(this.contextMenuPending || this.composing && e)) {
          var t = this.cm;
          if (this.resetting = !0, t.somethingSelected()) {
            this.prevInput = "";
            var n = t.getSelection();
            this.textarea.value = n, t.state.focused && ir(this.textarea), z && N >= 9 && (this.hasSelection = n);
          } else e || (this.prevInput = this.textarea.value = "", z && N >= 9 && (this.hasSelection = null));
          this.resetting = !1;
        }
      }, le.prototype.getField = function() {
        return this.textarea;
      }, le.prototype.supportsTouch = function() {
        return !1;
      }, le.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!rr || xe(he(this.textarea)) != this.textarea))
          try {
            this.textarea.focus();
          } catch {
          }
      }, le.prototype.blur = function() {
        this.textarea.blur();
      }, le.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, le.prototype.receivedFocus = function() {
        this.slowPoll();
      }, le.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, le.prototype.fastPoll = function() {
        var e = !1, t = this;
        t.pollingFast = !0;
        function n() {
          var r = t.poll();
          !r && !e ? (e = !0, t.polling.set(60, n)) : (t.pollingFast = !1, t.slowPoll());
        }
        t.polling.set(20, n);
      }, le.prototype.poll = function() {
        var e = this, t = this.cm, n = this.textarea, r = this.prevInput;
        if (this.contextMenuPending || this.resetting || !t.state.focused || Kt(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq)
          return !1;
        var i = n.value;
        if (i == r && !t.somethingSelected())
          return !1;
        if (z && N >= 9 && this.hasSelection === i || be && /[\uf700-\uf7ff]/.test(i))
          return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
          var l = i.charCodeAt(0);
          if (l == 8203 && !r && (r = "​"), l == 8666)
            return this.reset(), this.cm.execCommand("undo");
        }
        for (var o = 0, a = Math.min(r.length, i.length); o < a && r.charCodeAt(o) == i.charCodeAt(o); )
          ++o;
        return ze(t, function() {
          ll(
            t,
            i.slice(o),
            r.length - o,
            null,
            e.composing ? "*compose" : null
          ), i.length > 1e3 || i.indexOf(`
`) > -1 ? n.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(
            e.composing.start,
            t.getCursor("to"),
            { className: "CodeMirror-composing" }
          ));
        }), !0;
      }, le.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, le.prototype.onKeyPress = function() {
        z && N >= 9 && (this.hasSelection = null), this.fastPoll();
      }, le.prototype.onContextMenu = function(e) {
        var t = this, n = t.cm, r = n.display, i = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var l = fr(n, e), o = r.scroller.scrollTop;
        if (!l || Ge)
          return;
        var a = n.options.resetSelectionOnContextMenu;
        a && n.doc.sel.contains(l) == -1 && pe(n, Se)(n.doc, Qt(l), Ke);
        var s = i.style.cssText, u = t.wrapper.style.cssText, h = t.wrapper.offsetParent.getBoundingClientRect();
        t.wrapper.style.cssText = "position: static", i.style.cssText = `position: absolute; width: 30px; height: 30px;
      top: ` + (e.clientY - h.top - 5) + "px; left: " + (e.clientX - h.left - 5) + `px;
      z-index: 1000; background: ` + (z ? "rgba(255, 255, 255, .05)" : "transparent") + `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;
        var d;
        W && (d = i.ownerDocument.defaultView.scrollY), r.input.focus(), W && i.ownerDocument.defaultView.scrollTo(null, d), r.input.reset(), n.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = v, r.selForContextMenu = n.doc.sel, clearTimeout(r.detectingSelectAll);
        function g() {
          if (i.selectionStart != null) {
            var x = n.somethingSelected(), S = "​" + (x ? i.value : "");
            i.value = "⇚", i.value = S, t.prevInput = x ? "" : "​", i.selectionStart = 1, i.selectionEnd = S.length, r.selForContextMenu = n.doc.sel;
          }
        }
        function v() {
          if (t.contextMenuPending == v && (t.contextMenuPending = !1, t.wrapper.style.cssText = u, i.style.cssText = s, z && N < 9 && r.scrollbars.setScrollTop(r.scroller.scrollTop = o), i.selectionStart != null)) {
            (!z || z && N < 9) && g();
            var x = 0, S = function() {
              r.selForContextMenu == n.doc.sel && i.selectionStart == 0 && i.selectionEnd > 0 && t.prevInput == "​" ? pe(n, Oo)(n) : x++ < 10 ? r.detectingSelectAll = setTimeout(S, 500) : (r.selForContextMenu = null, r.input.reset());
            };
            r.detectingSelectAll = setTimeout(S, 200);
          }
        }
        if (z && N >= 9 && g(), xr) {
          Ut(e);
          var m = function() {
            we(window, "mouseup", m), setTimeout(v, 20);
          };
          E(window, "mouseup", m);
        } else
          setTimeout(v, 50);
      }, le.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = e == "nocursor", this.textarea.readOnly = !!e;
      }, le.prototype.setUneditable = function() {
      }, le.prototype.needsContentAttribute = !1;
      function fu(e, t) {
        if (t = t ? _(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), t.autofocus == null) {
          var n = xe(he(e));
          t.autofocus = n == e || e.getAttribute("autofocus") != null && n == document.body;
        }
        function r() {
          e.value = a.getValue();
        }
        var i;
        if (e.form && (E(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
          var l = e.form;
          i = l.submit;
          try {
            var o = l.submit = function() {
              r(), l.submit = i, l.submit(), l.submit = o;
            };
          } catch {
          }
        }
        t.finishInit = function(s) {
          s.save = r, s.getTextArea = function() {
            return e;
          }, s.toTextArea = function() {
            s.toTextArea = isNaN, r(), e.parentNode.removeChild(s.getWrapperElement()), e.style.display = "", e.form && (we(e.form, "submit", r), !t.leaveSubmitMethodAlone && typeof e.form.submit == "function" && (e.form.submit = i));
          };
        }, e.style.display = "none";
        var a = $(
          function(s) {
            return e.parentNode.insertBefore(s, e.nextSibling);
          },
          t
        );
        return a;
      }
      function hu(e) {
        e.off = we, e.on = E, e.wheelEventPixels = ms, e.Doc = We, e.splitLines = Je, e.countColumn = Z, e.findColumn = vt, e.isWordChar = Qr, e.Pass = Bt, e.signal = te, e.Line = Dr, e.changeEnd = Jt, e.scrollbarModel = oo, e.Pos = y, e.cmpPos = T, e.modes = Sr, e.mimeModes = lt, e.resolveMode = kr, e.getMode = Lr, e.modeExtensions = Xt, e.extendMode = Tr, e.copyState = yt, e.startState = Mr, e.innerMode = Vr, e.commands = Sn, e.keyMap = Et, e.keyName = qo, e.isModifierKey = Xo, e.lookupKey = Ur, e.normalizeKeyMap = Rs, e.StringStream = ne, e.SharedTextMarker = xn, e.TextMarker = Vt, e.LineWidget = bn, e.e_preventDefault = Ce, e.e_stopPropagation = wr, e.e_stop = Ut, e.addClass = Ue, e.contains = et, e.rmClass = ht, e.keyNames = $t;
      }
      ru($), ou($);
      var cu = "iter insert remove copy getEditor constructor".split(" ");
      for (var fi in We.prototype)
        We.prototype.hasOwnProperty(fi) && R(cu, fi) < 0 && ($.prototype[fi] = /* @__PURE__ */ function(e) {
          return function() {
            return e.apply(this.doc, arguments);
          };
        }(We.prototype[fi]));
      return rt(We), $.inputStyles = { textarea: le, contenteditable: Q }, $.defineMode = function(e) {
        !$.defaults.mode && e != "null" && ($.defaults.mode = e), ot.apply(this, arguments);
      }, $.defineMIME = ar, $.defineMode("null", function() {
        return { token: function(e) {
          return e.skipToEnd();
        } };
      }), $.defineMIME("text/plain", "null"), $.defineExtension = function(e, t) {
        $.prototype[e] = t;
      }, $.defineDocExtension = function(e, t) {
        We.prototype[e] = t;
      }, $.fromTextArea = fu, hu($), $.version = "5.65.18", $;
    });
  }(fl)), fl.exports;
}
var vu = hl();
const gu = /* @__PURE__ */ pu(vu);
(function(Ct, cl) {
  (function(U) {
    U(hl());
  })(function(U) {
    U.defineMode("javascript", function(je, j) {
      var Ve = je.indentUnit, St = j.statementIndent, Ne = j.jsonld, z = j.json || Ne, N = j.trackScope !== !1, W = j.typescript, ue = j.wordCharacters || /[\w$\xa1-\uffff]/, Pe = function() {
        function f(ce) {
          return { type: ce, style: "keyword" };
        }
        var c = f("keyword a"), b = f("keyword b"), C = f("keyword c"), y = f("keyword d"), T = f("operator"), Y = { type: "atom", style: "atom" };
        return {
          if: f("if"),
          while: c,
          with: c,
          else: b,
          do: b,
          try: b,
          finally: b,
          return: y,
          break: y,
          continue: y,
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
          in: T,
          typeof: T,
          instanceof: T,
          true: Y,
          false: Y,
          null: Y,
          undefined: Y,
          NaN: Y,
          Infinity: Y,
          this: f("this"),
          class: f("class"),
          super: f("atom"),
          yield: C,
          export: f("export"),
          import: f("import"),
          extends: C,
          await: C
        };
      }(), Pt = /[+\-*&%=<>!?|~^@]/, Ge = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
      function mr(f) {
        for (var c = !1, b, C = !1; (b = f.next()) != null; ) {
          if (!c) {
            if (b == "/" && !C) return;
            b == "[" ? C = !0 : C && b == "]" && (C = !1);
          }
          c = !c && b == "\\";
        }
      }
      var tr, br;
      function V(f, c, b) {
        return tr = f, br = b, c;
      }
      function Ze(f, c) {
        var b = f.next();
        if (b == '"' || b == "'")
          return c.tokenize = rr(b), c.tokenize(f, c);
        if (b == "." && f.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))
          return V("number", "number");
        if (b == "." && f.match(".."))
          return V("spread", "meta");
        if (/[\[\]{}\(\),;\:\.]/.test(b))
          return V(b);
        if (b == "=" && f.eat(">"))
          return V("=>", "operator");
        if (b == "0" && f.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))
          return V("number", "number");
        if (/\d/.test(b))
          return f.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), V("number", "number");
        if (b == "/")
          return f.eat("*") ? (c.tokenize = be, be(f, c)) : f.eat("/") ? (f.skipToEnd(), V("comment", "comment")) : Ye(f, c, 1) ? (mr(f), f.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), V("regexp", "string-2")) : (f.eat("="), V("operator", "operator", f.current()));
        if (b == "`")
          return c.tokenize = nr, nr(f, c);
        if (b == "#" && f.peek() == "!")
          return f.skipToEnd(), V("meta", "meta");
        if (b == "#" && f.eatWhile(ue))
          return V("variable", "property");
        if (b == "<" && f.match("!--") || b == "-" && f.match("->") && !/\S/.test(f.string.slice(0, f.start)))
          return f.skipToEnd(), V("comment", "comment");
        if (Pt.test(b))
          return (b != ">" || !c.lexical || c.lexical.type != ">") && (f.eat("=") ? (b == "!" || b == "=") && f.eat("=") : /[<>*+\-|&?]/.test(b) && (f.eat(b), b == ">" && f.eat(b))), b == "?" && f.eat(".") ? V(".") : V("operator", "operator", f.current());
        if (ue.test(b)) {
          f.eatWhile(ue);
          var C = f.current();
          if (c.lastType != ".") {
            if (Pe.propertyIsEnumerable(C)) {
              var y = Pe[C];
              return V(y.type, y.style, C);
            }
            if (C == "async" && f.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1))
              return V("async", "keyword", C);
          }
          return V("variable", "variable", C);
        }
      }
      function rr(f) {
        return function(c, b) {
          var C = !1, y;
          if (Ne && c.peek() == "@" && c.match(Ge))
            return b.tokenize = Ze, V("jsonld-keyword", "meta");
          for (; (y = c.next()) != null && !(y == f && !C); )
            C = !C && y == "\\";
          return C || (b.tokenize = Ze), V("string", "string");
        };
      }
      function be(f, c) {
        for (var b = !1, C; C = f.next(); ) {
          if (C == "/" && b) {
            c.tokenize = Ze;
            break;
          }
          b = C == "*";
        }
        return V("comment", "comment");
      }
      function nr(f, c) {
        for (var b = !1, C; (C = f.next()) != null; ) {
          if (!b && (C == "`" || C == "$" && f.eat("{"))) {
            c.tokenize = Ze;
            break;
          }
          b = !b && C == "\\";
        }
        return V("quasi", "string-2", f.current());
      }
      var hi = "([{}])";
      function $e(f, c) {
        c.fatArrowAt && (c.fatArrowAt = null);
        var b = f.string.indexOf("=>", f.start);
        if (!(b < 0)) {
          if (W) {
            var C = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(f.string.slice(f.start, b));
            C && (b = C.index);
          }
          for (var y = 0, T = !1, Y = b - 1; Y >= 0; --Y) {
            var ce = f.string.charAt(Y), Ae = hi.indexOf(ce);
            if (Ae >= 0 && Ae < 3) {
              if (!y) {
                ++Y;
                break;
              }
              if (--y == 0) {
                ce == "(" && (T = !0);
                break;
              }
            } else if (Ae >= 3 && Ae < 6)
              ++y;
            else if (ue.test(ce))
              T = !0;
            else if (/["'\/`]/.test(ce))
              for (; ; --Y) {
                if (Y == 0) return;
                var Nr = f.string.charAt(Y - 1);
                if (Nr == ce && f.string.charAt(Y - 2) != "\\") {
                  Y--;
                  break;
                }
              }
            else if (T && !y) {
              ++Y;
              break;
            }
          }
          T && !y && (c.fatArrowAt = Y);
        }
      }
      var Nn = {
        atom: !0,
        number: !0,
        variable: !0,
        string: !0,
        regexp: !0,
        this: !0,
        import: !0,
        "jsonld-keyword": !0
      };
      function xr(f, c, b, C, y, T) {
        this.indented = f, this.column = c, this.type = b, this.prev = y, this.info = T, C != null && (this.align = C);
      }
      function It(f, c) {
        if (!N) return !1;
        for (var b = f.localVars; b; b = b.next)
          if (b.name == c) return !0;
        for (var C = f.context; C; C = C.prev)
          for (var b = C.vars; b; b = b.next)
            if (b.name == c) return !0;
      }
      function ht(f, c, b, C, y) {
        var T = f.cc;
        for (w.state = f, w.stream = y, w.marked = null, w.cc = T, w.style = c, f.lexical.hasOwnProperty("align") || (f.lexical.align = !0); ; ) {
          var Y = T.length ? T.pop() : z ? R : Z;
          if (Y(b, C)) {
            for (; T.length && T[T.length - 1].lex; )
              T.pop()();
            return w.marked ? w.marked : b == "variable" && It(f, C) ? "variable-2" : c;
          }
        }
      }
      var w = { state: null, column: null, marked: null, cc: null };
      function H() {
        for (var f = arguments.length - 1; f >= 0; f--) w.cc.push(arguments[f]);
      }
      function p() {
        return H.apply(null, arguments), !0;
      }
      function ct(f, c) {
        for (var b = c; b; b = b.next) if (b.name == f) return !0;
        return !1;
      }
      function Ie(f) {
        var c = w.state;
        if (w.marked = "def", !!N) {
          if (c.context) {
            if (c.lexical.info == "var" && c.context && c.context.block) {
              var b = et(f, c.context);
              if (b != null) {
                c.context = b;
                return;
              }
            } else if (!ct(f, c.localVars)) {
              c.localVars = new kt(f, c.localVars);
              return;
            }
          }
          j.globalVars && !ct(f, c.globalVars) && (c.globalVars = new kt(f, c.globalVars));
        }
      }
      function et(f, c) {
        if (c)
          if (c.block) {
            var b = et(f, c.prev);
            return b ? b == c.prev ? c : new Ue(b, c.vars, !0) : null;
          } else return ct(f, c.vars) ? c : new Ue(c.prev, new kt(f, c.vars), !1);
        else return null;
      }
      function xe(f) {
        return f == "public" || f == "private" || f == "protected" || f == "abstract" || f == "readonly";
      }
      function Ue(f, c, b) {
        this.prev = f, this.vars = c, this.block = b;
      }
      function kt(f, c) {
        this.name = f, this.next = c;
      }
      var ir = new kt("this", new kt("arguments", null));
      function _e() {
        w.state.context = new Ue(w.state.context, w.state.localVars, !1), w.state.localVars = ir;
      }
      function tt() {
        w.state.context = new Ue(w.state.context, w.state.localVars, !0), w.state.localVars = null;
      }
      _e.lex = tt.lex = !0;
      function he() {
        w.state.localVars = w.state.context.vars, w.state.context = w.state.context.prev;
      }
      he.lex = !0;
      function B(f, c) {
        var b = function() {
          var C = w.state, y = C.indented;
          if (C.lexical.type == "stat") y = C.lexical.indented;
          else for (var T = C.lexical; T && T.type == ")" && T.align; T = T.prev)
            y = T.indented;
          C.lexical = new xr(y, w.stream.column(), f, null, C.lexical, c);
        };
        return b.lex = !0, b;
      }
      function P() {
        var f = w.state;
        f.lexical.prev && (f.lexical.type == ")" && (f.indented = f.lexical.indented), f.lexical = f.lexical.prev);
      }
      P.lex = !0;
      function _(f) {
        function c(b) {
          return b == f ? p() : f == ";" || b == "}" || b == ")" || b == "]" ? H() : p(c);
        }
        return c;
      }
      function Z(f, c) {
        return f == "var" ? p(B("vardef", c), wr, _(";"), P) : f == "keyword a" ? p(B("form"), Bt, Z, P) : f == "keyword b" ? p(B("form"), Z, P) : f == "keyword d" ? w.stream.match(/^\s*$/, !1) ? p() : p(B("stat"), pt, _(";"), P) : f == "debugger" ? p(_(";")) : f == "{" ? p(B("}"), tt, gt, P, he) : f == ";" ? p() : f == "if" ? (w.state.lexical.info == "else" && w.state.cc[w.state.cc.length - 1] == P && w.state.cc.pop()(), p(B("form"), Bt, Z, P, Cr)) : f == "function" ? p(Je) : f == "for" ? p(B("form"), tt, Hn, Z, he, P) : f == "class" || W && c == "interface" ? (w.marked = "keyword", p(B("form", f == "class" ? f : c), Sr, P)) : f == "variable" ? W && c == "declare" ? (w.marked = "keyword", p(Z)) : W && (c == "module" || c == "enum" || c == "type") && w.stream.match(/^\s*\w/, !1) ? (w.marked = "keyword", c == "enum" ? p(A) : c == "type" ? p(En, _("operator"), K, _(";")) : p(B("form"), De, _("{"), B("}"), gt, P, P)) : W && c == "namespace" ? (w.marked = "keyword", p(B("form"), R, Z, P)) : W && c == "abstract" ? (w.marked = "keyword", p(Z)) : p(B("stat"), di) : f == "switch" ? p(
          B("form"),
          Bt,
          _("{"),
          B("}", "switch"),
          tt,
          gt,
          P,
          P,
          he
        ) : f == "case" ? p(R, _(":")) : f == "default" ? p(_(":")) : f == "catch" ? p(B("form"), _e, dt, Z, P, he) : f == "export" ? p(B("stat"), kr, P) : f == "import" ? p(B("stat"), Xt, P) : f == "async" ? p(Z) : c == "@" ? p(R, Z) : H(B("stat"), R, _(";"), P);
      }
      function dt(f) {
        if (f == "(") return p(it, _(")"));
      }
      function R(f, c) {
        return Ke(f, c, !1);
      }
      function Le(f, c) {
        return Ke(f, c, !0);
      }
      function Bt(f) {
        return f != "(" ? H() : p(B(")"), pt, _(")"), P);
      }
      function Ke(f, c, b) {
        if (w.state.fatArrowAt == w.stream.start) {
          var C = b ? lr : X;
          if (f == "(") return p(_e, B(")"), oe(it, ")"), P, _("=>"), C, he);
          if (f == "variable") return H(_e, De, _("=>"), C, he);
        }
        var y = b ? vt : Xe;
        return Nn.hasOwnProperty(f) ? p(y) : f == "function" ? p(Je, y) : f == "class" || W && c == "interface" ? (w.marked = "keyword", p(B("form"), gi, P)) : f == "keyword c" || f == "async" ? p(b ? Le : R) : f == "(" ? p(B(")"), pt, _(")"), P, y) : f == "operator" || f == "spread" ? p(b ? Le : R) : f == "[" ? p(B("]"), ne, P, y) : f == "{" ? zt(Tt, "}", null, y) : f == "quasi" ? H(Lt, y) : f == "new" ? p(ci(b)) : p();
      }
      function pt(f) {
        return f.match(/[;\}\)\],]/) ? H() : H(R);
      }
      function Xe(f, c) {
        return f == "," ? p(pt) : vt(f, c, !1);
      }
      function vt(f, c, b) {
        var C = b == !1 ? Xe : vt, y = b == !1 ? R : Le;
        if (f == "=>") return p(_e, b ? lr : X, he);
        if (f == "operator")
          return /\+\+|--/.test(c) || W && c == "!" ? p(C) : W && c == "<" && w.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1) ? p(B(">"), oe(K, ">"), P, C) : c == "?" ? p(R, _(":"), y) : p(y);
        if (f == "quasi")
          return H(Lt, C);
        if (f != ";") {
          if (f == "(") return zt(Le, ")", "call", C);
          if (f == ".") return p(Qr, C);
          if (f == "[") return p(B("]"), pt, _("]"), P, C);
          if (W && c == "as")
            return w.marked = "keyword", p(K, C);
          if (f == "regexp")
            return w.state.lastType = w.marked = "operator", w.stream.backUp(w.stream.pos - w.stream.start - 1), p(y);
        }
      }
      function Lt(f, c) {
        return f != "quasi" ? H() : c.slice(c.length - 2) != "${" ? p(Lt) : p(pt, Zr);
      }
      function Zr(f) {
        if (f == "}")
          return w.marked = "string-2", w.state.tokenize = nr, p(Lt);
      }
      function X(f) {
        return $e(w.stream, w.state), H(f == "{" ? Z : R);
      }
      function lr(f) {
        return $e(w.stream, w.state), H(f == "{" ? Z : Le);
      }
      function ci(f) {
        return function(c) {
          return c == "." ? p(f ? An : Dn) : c == "variable" && W ? p(Be, f ? vt : Xe) : H(f ? Le : R);
        };
      }
      function Dn(f, c) {
        if (c == "target")
          return w.marked = "keyword", p(Xe);
      }
      function An(f, c) {
        if (c == "target")
          return w.marked = "keyword", p(vt);
      }
      function di(f) {
        return f == ":" ? p(P, Z) : H(Xe, _(";"), P);
      }
      function Qr(f) {
        if (f == "variable")
          return w.marked = "property", p();
      }
      function Tt(f, c) {
        if (f == "async")
          return w.marked = "property", p(Tt);
        if (f == "variable" || w.style == "keyword") {
          if (w.marked = "property", c == "get" || c == "set") return p(On);
          var b;
          return W && w.state.fatArrowAt == w.stream.start && (b = w.stream.match(/^\s*:\s*/, !1)) && (w.state.fatArrowAt = w.stream.pos + b[0].length), p(Mt);
        } else {
          if (f == "number" || f == "string")
            return w.marked = Ne ? "property" : w.style + " property", p(Mt);
          if (f == "jsonld-keyword")
            return p(Mt);
          if (W && xe(c))
            return w.marked = "keyword", p(Tt);
          if (f == "[")
            return p(R, Rt, _("]"), Mt);
          if (f == "spread")
            return p(Le, Mt);
          if (c == "*")
            return w.marked = "keyword", p(Tt);
          if (f == ":")
            return H(Mt);
        }
      }
      function On(f) {
        return f != "variable" ? H(Mt) : (w.marked = "property", p(Je));
      }
      function Mt(f) {
        if (f == ":") return p(Le);
        if (f == "(") return H(Je);
      }
      function oe(f, c, b) {
        function C(y, T) {
          if (b ? b.indexOf(y) > -1 : y == ",") {
            var Y = w.state.lexical;
            return Y.info == "call" && (Y.pos = (Y.pos || 0) + 1), p(function(ce, Ae) {
              return ce == c || Ae == c ? H() : H(f);
            }, C);
          }
          return y == c || T == c ? p() : b && b.indexOf(";") > -1 ? H(f) : p(_(c));
        }
        return function(y, T) {
          return y == c || T == c ? p() : H(f, C);
        };
      }
      function zt(f, c, b) {
        for (var C = 3; C < arguments.length; C++)
          w.cc.push(arguments[C]);
        return p(B(c, b), oe(f, c), P);
      }
      function gt(f) {
        return f == "}" ? p() : H(Z, gt);
      }
      function Rt(f, c) {
        if (W) {
          if (f == ":") return p(K);
          if (c == "?") return p(Rt);
        }
      }
      function or(f, c) {
        if (W && (f == ":" || c == "in")) return p(K);
      }
      function Gt(f) {
        if (W && f == ":")
          return w.stream.match(/^\s*\w+\s+is\b/, !1) ? p(R, pi, K) : p(K);
      }
      function pi(f, c) {
        if (c == "is")
          return w.marked = "keyword", p();
      }
      function K(f, c) {
        if (c == "keyof" || c == "typeof" || c == "infer" || c == "readonly")
          return w.marked = "keyword", p(c == "typeof" ? Le : K);
        if (f == "variable" || c == "void")
          return w.marked = "type", p(Qe);
        if (c == "|" || c == "&") return p(K);
        if (f == "string" || f == "number" || f == "atom") return p(Qe);
        if (f == "[") return p(B("]"), oe(K, "]", ","), P, Qe);
        if (f == "{") return p(B("}"), E, P, Qe);
        if (f == "(") return p(oe(re, ")"), Wn, Qe);
        if (f == "<") return p(oe(K, ">"), K);
        if (f == "quasi")
          return H(we, Qe);
      }
      function Wn(f) {
        if (f == "=>") return p(K);
      }
      function E(f) {
        return f.match(/[\}\)\]]/) ? p() : f == "," || f == ";" ? p(E) : H(Nt, E);
      }
      function Nt(f, c) {
        if (f == "variable" || w.style == "keyword")
          return w.marked = "property", p(Nt);
        if (c == "?" || f == "number" || f == "string")
          return p(Nt);
        if (f == ":")
          return p(K);
        if (f == "[")
          return p(_("variable"), or, _("]"), Nt);
        if (f == "(")
          return H(Kt, Nt);
        if (!f.match(/[;\}\)\],]/))
          return p();
      }
      function we(f, c) {
        return f != "quasi" ? H() : c.slice(c.length - 2) != "${" ? p(we) : p(K, te);
      }
      function te(f) {
        if (f == "}")
          return w.marked = "string-2", w.state.tokenize = nr, p(we);
      }
      function re(f, c) {
        return f == "variable" && w.stream.match(/^\s*[?:]/, !1) || c == "?" ? p(re) : f == ":" ? p(K) : f == "spread" ? p(re) : H(K);
      }
      function Qe(f, c) {
        if (c == "<") return p(B(">"), oe(K, ">"), P, Qe);
        if (c == "|" || f == "." || c == "&") return p(K);
        if (f == "[") return p(K, _("]"), Qe);
        if (c == "extends" || c == "implements")
          return w.marked = "keyword", p(K);
        if (c == "?") return p(K, _(":"), K);
      }
      function Be(f, c) {
        if (c == "<") return p(B(">"), oe(K, ">"), P, Qe);
      }
      function rt() {
        return H(K, Ce);
      }
      function Ce(f, c) {
        if (c == "=") return p(K);
      }
      function wr(f, c) {
        return c == "enum" ? (w.marked = "keyword", p(A)) : H(De, Rt, nt, vi);
      }
      function De(f, c) {
        if (W && xe(c))
          return w.marked = "keyword", p(De);
        if (f == "variable")
          return Ie(c), p();
        if (f == "spread") return p(De);
        if (f == "[") return zt(Jr, "]");
        if (f == "{") return zt(Ut, "}");
      }
      function Ut(f, c) {
        return f == "variable" && !w.stream.match(/^\s*:/, !1) ? (Ie(c), p(nt)) : (f == "variable" && (w.marked = "property"), f == "spread" ? p(De) : f == "}" ? H() : f == "[" ? p(R, _("]"), _(":"), Ut) : p(_(":"), De, nt));
      }
      function Jr() {
        return H(De, nt);
      }
      function nt(f, c) {
        if (c == "=") return p(Le);
      }
      function vi(f) {
        if (f == ",") return p(wr);
      }
      function Cr(f, c) {
        if (f == "keyword b" && c == "else") return p(B("form", "else"), Z, P);
      }
      function Hn(f, c) {
        if (c == "await") return p(Hn);
        if (f == "(") return p(B(")"), jr, P);
      }
      function jr(f) {
        return f == "var" ? p(wr, _t) : f == "variable" ? p(_t) : H(_t);
      }
      function _t(f, c) {
        return f == ")" ? p() : f == ";" ? p(_t) : c == "in" || c == "of" ? (w.marked = "keyword", p(R, _t)) : H(R, _t);
      }
      function Je(f, c) {
        if (c == "*")
          return w.marked = "keyword", p(Je);
        if (f == "variable")
          return Ie(c), p(Je);
        if (f == "(") return p(_e, B(")"), oe(it, ")"), P, Gt, Z, he);
        if (W && c == "<") return p(B(">"), oe(rt, ">"), P, Je);
      }
      function Kt(f, c) {
        if (c == "*")
          return w.marked = "keyword", p(Kt);
        if (f == "variable")
          return Ie(c), p(Kt);
        if (f == "(") return p(_e, B(")"), oe(it, ")"), P, Gt, he);
        if (W && c == "<") return p(B(">"), oe(rt, ">"), P, Kt);
      }
      function En(f, c) {
        if (f == "keyword" || f == "variable")
          return w.marked = "type", p(En);
        if (c == "<")
          return p(B(">"), oe(rt, ">"), P);
      }
      function it(f, c) {
        return c == "@" && p(R, it), f == "spread" ? p(it) : W && xe(c) ? (w.marked = "keyword", p(it)) : W && f == "this" ? p(Rt, nt) : H(De, Rt, nt);
      }
      function gi(f, c) {
        return f == "variable" ? Sr(f, c) : lt(f, c);
      }
      function Sr(f, c) {
        if (f == "variable")
          return Ie(c), p(lt);
      }
      function lt(f, c) {
        if (c == "<") return p(B(">"), oe(rt, ">"), P, lt);
        if (c == "extends" || c == "implements" || W && f == ",")
          return c == "implements" && (w.marked = "keyword"), p(W ? K : R, lt);
        if (f == "{") return p(B("}"), ot, P);
      }
      function ot(f, c) {
        if (f == "async" || f == "variable" && (c == "static" || c == "get" || c == "set" || W && xe(c)) && w.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
          return w.marked = "keyword", p(ot);
        if (f == "variable" || w.style == "keyword")
          return w.marked = "property", p(ar, ot);
        if (f == "number" || f == "string") return p(ar, ot);
        if (f == "[")
          return p(R, Rt, _("]"), ar, ot);
        if (c == "*")
          return w.marked = "keyword", p(ot);
        if (W && f == "(") return H(Kt, ot);
        if (f == ";" || f == ",") return p(ot);
        if (f == "}") return p();
        if (c == "@") return p(R, ot);
      }
      function ar(f, c) {
        if (c == "!" || c == "?") return p(ar);
        if (f == ":") return p(K, nt);
        if (c == "=") return p(Le);
        var b = w.state.lexical.prev, C = b && b.info == "interface";
        return H(C ? Kt : Je);
      }
      function kr(f, c) {
        return c == "*" ? (w.marked = "keyword", p(Mr, _(";"))) : c == "default" ? (w.marked = "keyword", p(R, _(";"))) : f == "{" ? p(oe(Lr, "}"), Mr, _(";")) : H(Z);
      }
      function Lr(f, c) {
        if (c == "as")
          return w.marked = "keyword", p(_("variable"));
        if (f == "variable") return H(Le, Lr);
      }
      function Xt(f) {
        return f == "string" ? p() : f == "(" ? H(R) : f == "." ? H(Xe) : H(Tr, yt, Mr);
      }
      function Tr(f, c) {
        return f == "{" ? zt(Tr, "}") : (f == "variable" && Ie(c), c == "*" && (w.marked = "keyword"), p(Vr));
      }
      function yt(f) {
        if (f == ",") return p(Tr, yt);
      }
      function Vr(f, c) {
        if (c == "as")
          return w.marked = "keyword", p(Tr);
      }
      function Mr(f, c) {
        if (c == "from")
          return w.marked = "keyword", p(R);
      }
      function ne(f) {
        return f == "]" ? p() : H(oe(Le, "]"));
      }
      function A() {
        return H(B("form"), De, _("{"), B("}"), oe(Dt, "}"), P, P);
      }
      function Dt() {
        return H(De, nt);
      }
      function $r(f, c) {
        return f.lastType == "operator" || f.lastType == "," || Pt.test(c.charAt(0)) || /[,.]/.test(c.charAt(0));
      }
      function Ye(f, c, b) {
        return c.tokenize == Ze && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(c.lastType) || c.lastType == "quasi" && /\{\s*$/.test(f.string.slice(0, f.pos - (b || 0)));
      }
      return {
        startState: function(f) {
          var c = {
            tokenize: Ze,
            lastType: "sof",
            cc: [],
            lexical: new xr((f || 0) - Ve, 0, "block", !1),
            localVars: j.localVars,
            context: j.localVars && new Ue(null, null, !1),
            indented: f || 0
          };
          return j.globalVars && typeof j.globalVars == "object" && (c.globalVars = j.globalVars), c;
        },
        token: function(f, c) {
          if (f.sol() && (c.lexical.hasOwnProperty("align") || (c.lexical.align = !1), c.indented = f.indentation(), $e(f, c)), c.tokenize != be && f.eatSpace()) return null;
          var b = c.tokenize(f, c);
          return tr == "comment" ? b : (c.lastType = tr == "operator" && (br == "++" || br == "--") ? "incdec" : tr, ht(c, b, tr, br, f));
        },
        indent: function(f, c) {
          if (f.tokenize == be || f.tokenize == nr) return U.Pass;
          if (f.tokenize != Ze) return 0;
          var b = c && c.charAt(0), C = f.lexical, y;
          if (!/^\s*else\b/.test(c)) for (var T = f.cc.length - 1; T >= 0; --T) {
            var Y = f.cc[T];
            if (Y == P) C = C.prev;
            else if (Y != Cr && Y != he) break;
          }
          for (; (C.type == "stat" || C.type == "form") && (b == "}" || (y = f.cc[f.cc.length - 1]) && (y == Xe || y == vt) && !/^[,\.=+\-*:?[\(]/.test(c)); )
            C = C.prev;
          St && C.type == ")" && C.prev.type == "stat" && (C = C.prev);
          var ce = C.type, Ae = b == ce;
          return ce == "vardef" ? C.indented + (f.lastType == "operator" || f.lastType == "," ? C.info.length + 1 : 0) : ce == "form" && b == "{" ? C.indented : ce == "form" ? C.indented + Ve : ce == "stat" ? C.indented + ($r(f, c) ? St || Ve : 0) : C.info == "switch" && !Ae && j.doubleIndentSwitch != !1 ? C.indented + (/^(?:case|default)\b/.test(c) ? Ve : 2 * Ve) : C.align ? C.column + (Ae ? 0 : 1) : C.indented + (Ae ? 0 : Ve);
        },
        electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
        blockCommentStart: z ? null : "/*",
        blockCommentEnd: z ? null : "*/",
        blockCommentContinue: z ? null : " * ",
        lineComment: z ? null : "//",
        fold: "brace",
        closeBrackets: "()[]{}''\"\"``",
        helperType: z ? "json" : "javascript",
        jsonldMode: Ne,
        jsonMode: z,
        expressionAllowed: Ye,
        skipExpression: function(f) {
          ht(f, "atom", "atom", "true", new U.StringStream("", 2, null));
        }
      };
    }), U.registerHelper("wordChars", "javascript", /[\w$]/), U.defineMIME("text/javascript", "javascript"), U.defineMIME("text/ecmascript", "javascript"), U.defineMIME("application/javascript", "javascript"), U.defineMIME("application/x-javascript", "javascript"), U.defineMIME("application/ecmascript", "javascript"), U.defineMIME("application/json", { name: "javascript", json: !0 }), U.defineMIME("application/x-json", { name: "javascript", json: !0 }), U.defineMIME("application/manifest+json", { name: "javascript", json: !0 }), U.defineMIME("application/ld+json", { name: "javascript", jsonld: !0 }), U.defineMIME("text/typescript", { name: "javascript", typescript: !0 }), U.defineMIME("application/typescript", { name: "javascript", typescript: !0 });
  });
})();
(function(Ct, cl) {
  (function(U) {
    U(hl());
  })(function(U) {
    U.defineOption("placeholder", "", function(N, W, ue) {
      var Pe = ue && ue != U.Init;
      if (W && !Pe)
        N.on("blur", St), N.on("change", Ne), N.on("swapDoc", Ne), U.on(N.getInputField(), "compositionupdate", N.state.placeholderCompose = function() {
          Ve(N);
        }), Ne(N);
      else if (!W && Pe) {
        N.off("blur", St), N.off("change", Ne), N.off("swapDoc", Ne), U.off(N.getInputField(), "compositionupdate", N.state.placeholderCompose), je(N);
        var Pt = N.getWrapperElement();
        Pt.className = Pt.className.replace(" CodeMirror-empty", "");
      }
      W && !N.hasFocus() && St(N);
    });
    function je(N) {
      N.state.placeholder && (N.state.placeholder.parentNode.removeChild(N.state.placeholder), N.state.placeholder = null);
    }
    function j(N) {
      je(N);
      var W = N.state.placeholder = document.createElement("pre");
      W.style.cssText = "height: 0; overflow: visible", W.style.direction = N.getOption("direction"), W.className = "CodeMirror-placeholder CodeMirror-line-like";
      var ue = N.getOption("placeholder");
      typeof ue == "string" && (ue = document.createTextNode(ue)), W.appendChild(ue), N.display.lineSpace.insertBefore(W, N.display.lineSpace.firstChild);
    }
    function Ve(N) {
      setTimeout(function() {
        var W = !1;
        if (N.lineCount() == 1) {
          var ue = N.getInputField();
          W = ue.nodeName == "TEXTAREA" ? !N.getLine(0).length : !/[^\u200b]/.test(ue.querySelector(".CodeMirror-line").textContent);
        }
        W ? j(N) : je(N);
      }, 20);
    }
    function St(N) {
      z(N) && j(N);
    }
    function Ne(N) {
      var W = N.getWrapperElement(), ue = z(N);
      W.className = W.className.replace(" CodeMirror-empty", "") + (ue ? " CodeMirror-empty" : ""), ue ? j(N) : je(N);
    }
    function z(N) {
      return N.lineCount() === 1 && N.getLine(0) === "";
    }
  });
})();
export {
  gu as C,
  pu as g
};
