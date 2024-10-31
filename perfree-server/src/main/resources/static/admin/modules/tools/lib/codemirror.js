var su = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fu($e) {
  return $e && $e.__esModule && Object.prototype.hasOwnProperty.call($e, "default") ? $e.default : $e;
}
var Uo = { exports: {} };
(function($e, uu) {
  (function(re, kr) {
    $e.exports = kr();
  })(su, function() {
    var re = navigator.userAgent, kr = navigator.platform, He = /gecko\/\d/i.test(re), Dn = /MSIE \d/.test(re), Nn = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(re), Tr = /Edge\/(\d+)/.exec(re), A = Dn || Nn || Tr, E = A && (Dn ? document.documentMode || 6 : +(Tr || Nn)[1]), ie = !Tr && /WebKit\//.test(re), Ko = ie && /Qt\/\d+\.\d+/.test(re), et = !Tr && /Chrome\/(\d+)/.exec(re), _o = et && +et[1], Ce = /Opera\//.test(re), Mr = /Apple Computer/.test(navigator.vendor), Xo = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(re), Yo = /PhantomJS/.test(re), Kt = Mr && (/Mobile\/\w+/.test(re) || navigator.maxTouchPoints > 2), Dr = /Android/.test(re), _t = Kt || Dr || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(re), ye = Kt || /Mac/.test(kr), qo = /\bCrOS\b/.test(re), Zo = /win/i.test(kr), tt = Ce && re.match(/Version\/(\d*\.\d*)/);
    tt && (tt = Number(tt[1])), tt && tt >= 15 && (Ce = !1, ie = !0);
    var An = ye && (Ko || Ce && (tt == null || tt < 12.11)), di = He || A && E >= 9;
    function bt(e) {
      return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
    }
    var rt = function(e, t) {
      var i = e.className, r = bt(t).exec(i);
      if (r) {
        var n = i.slice(r.index + r[0].length);
        e.className = i.slice(0, r.index) + (n ? r[1] + n : "");
      }
    };
    function Ge(e) {
      for (var t = e.childNodes.length; t > 0; --t)
        e.removeChild(e.firstChild);
      return e;
    }
    function pe(e, t) {
      return Ge(e).appendChild(t);
    }
    function k(e, t, i, r) {
      var n = document.createElement(e);
      if (i && (n.className = i), r && (n.style.cssText = r), typeof t == "string")
        n.appendChild(document.createTextNode(t));
      else if (t)
        for (var l = 0; l < t.length; ++l)
          n.appendChild(t[l]);
      return n;
    }
    function xt(e, t, i, r) {
      var n = k(e, t, i, r);
      return n.setAttribute("role", "presentation"), n;
    }
    var it;
    document.createRange ? it = function(e, t, i, r) {
      var n = document.createRange();
      return n.setEnd(r || e, i), n.setStart(e, t), n;
    } : it = function(e, t, i) {
      var r = document.body.createTextRange();
      try {
        r.moveToElementText(e.parentNode);
      } catch {
        return r;
      }
      return r.collapse(!0), r.moveEnd("character", i), r.moveStart("character", t), r;
    };
    function Ue(e, t) {
      if (t.nodeType == 3 && (t = t.parentNode), e.contains)
        return e.contains(t);
      do
        if (t.nodeType == 11 && (t = t.host), t == e)
          return !0;
      while (t = t.parentNode);
    }
    function me(e) {
      var t;
      try {
        t = e.activeElement;
      } catch {
        t = e.body || null;
      }
      for (; t && t.shadowRoot && t.shadowRoot.activeElement; )
        t = t.shadowRoot.activeElement;
      return t;
    }
    function nt(e, t) {
      var i = e.className;
      bt(t).test(i) || (e.className += (i ? " " : "") + t);
    }
    function pi(e, t) {
      for (var i = e.split(" "), r = 0; r < i.length; r++)
        i[r] && !bt(i[r]).test(t) && (t += " " + i[r]);
      return t;
    }
    var Xt = function(e) {
      e.select();
    };
    Kt ? Xt = function(e) {
      e.selectionStart = 0, e.selectionEnd = e.value.length;
    } : A && (Xt = function(e) {
      try {
        e.select();
      } catch {
      }
    });
    function we(e) {
      return e.display.wrapper.ownerDocument;
    }
    function Nr(e) {
      return we(e).defaultView;
    }
    function vi(e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return function() {
        return e.apply(null, t);
      };
    }
    function lt(e, t, i) {
      t || (t = {});
      for (var r in e)
        e.hasOwnProperty(r) && (i !== !1 || !t.hasOwnProperty(r)) && (t[r] = e[r]);
      return t;
    }
    function be(e, t, i, r, n) {
      t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
      for (var l = r || 0, o = n || 0; ; ) {
        var a = e.indexOf("	", l);
        if (a < 0 || a >= t)
          return o + (t - l);
        o += a - l, o += i - o % i, l = a + 1;
      }
    }
    var Ke = function() {
      this.id = null, this.f = null, this.time = 0, this.handler = vi(this.onTimeout, this);
    };
    Ke.prototype.onTimeout = function(e) {
      e.id = 0, e.time <= +/* @__PURE__ */ new Date() ? e.f() : setTimeout(e.handler, e.time - +/* @__PURE__ */ new Date());
    }, Ke.prototype.set = function(e, t) {
      this.f = t;
      var i = +/* @__PURE__ */ new Date() + e;
      (!this.id || i < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = i);
    };
    function $(e, t) {
      for (var i = 0; i < e.length; ++i)
        if (e[i] == t)
          return i;
      return -1;
    }
    var On = 50, Ar = { toString: function() {
      return "CodeMirror.Pass";
    } }, Me = { scroll: !1 }, gi = { origin: "*mouse" }, Yt = { origin: "+move" };
    function yi(e, t, i) {
      for (var r = 0, n = 0; ; ) {
        var l = e.indexOf("	", r);
        l == -1 && (l = e.length);
        var o = l - r;
        if (l == e.length || n + o >= t)
          return r + Math.min(o, t - n);
        if (n += l - r, n += i - n % i, r = l + 1, n >= t)
          return r;
      }
    }
    var Or = [""];
    function mi(e) {
      for (; Or.length <= e; )
        Or.push(W(Or) + " ");
      return Or[e];
    }
    function W(e) {
      return e[e.length - 1];
    }
    function Wr(e, t) {
      for (var i = [], r = 0; r < e.length; r++)
        i[r] = t(e[r], r);
      return i;
    }
    function Qo(e, t, i) {
      for (var r = 0, n = i(t); r < e.length && i(e[r]) <= n; )
        r++;
      e.splice(r, 0, t);
    }
    function Wn() {
    }
    function Hn(e, t) {
      var i;
      return Object.create ? i = Object.create(e) : (Wn.prototype = e, i = new Wn()), t && lt(t, i), i;
    }
    var Jo = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    function bi(e) {
      return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Jo.test(e));
    }
    function Hr(e, t) {
      return t ? t.source.indexOf("\\w") > -1 && bi(e) ? !0 : t.test(e) : bi(e);
    }
    function Fn(e) {
      for (var t in e)
        if (e.hasOwnProperty(t) && e[t])
          return !1;
      return !0;
    }
    var jo = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function xi(e) {
      return e.charCodeAt(0) >= 768 && jo.test(e);
    }
    function Pn(e, t, i) {
      for (; (i < 0 ? t > 0 : t < e.length) && xi(e.charAt(t)); )
        t += i;
      return t;
    }
    function qt(e, t, i) {
      for (var r = t > i ? -1 : 1; ; ) {
        if (t == i)
          return t;
        var n = (t + i) / 2, l = r < 0 ? Math.ceil(n) : Math.floor(n);
        if (l == t)
          return e(l) ? t : i;
        e(l) ? i = l : t = l + r;
      }
    }
    function Vo(e, t, i, r) {
      if (!e)
        return r(t, i, "ltr", 0);
      for (var n = !1, l = 0; l < e.length; ++l) {
        var o = e[l];
        (o.from < i && o.to > t || t == i && o.to == t) && (r(Math.max(o.from, t), Math.min(o.to, i), o.level == 1 ? "rtl" : "ltr", l), n = !0);
      }
      n || r(t, i, "ltr");
    }
    var Zt = null;
    function Qt(e, t, i) {
      var r;
      Zt = null;
      for (var n = 0; n < e.length; ++n) {
        var l = e[n];
        if (l.from < t && l.to > t)
          return n;
        l.to == t && (l.from != l.to && i == "before" ? r = n : Zt = n), l.from == t && (l.from != l.to && i != "before" ? r = n : Zt = n);
      }
      return r ?? Zt;
    }
    var $o = /* @__PURE__ */ function() {
      var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
      function i(u) {
        return u <= 247 ? e.charAt(u) : 1424 <= u && u <= 1524 ? "R" : 1536 <= u && u <= 1785 ? t.charAt(u - 1536) : 1774 <= u && u <= 2220 ? "r" : 8192 <= u && u <= 8203 ? "w" : u == 8204 ? "b" : "L";
      }
      var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, n = /[stwN]/, l = /[LRr]/, o = /[Lb1n]/, a = /[1n]/;
      function s(u, f, h) {
        this.level = u, this.from = f, this.to = h;
      }
      return function(u, f) {
        var h = f == "ltr" ? "L" : "R";
        if (u.length == 0 || f == "ltr" && !r.test(u))
          return !1;
        for (var d = u.length, c = [], p = 0; p < d; ++p)
          c.push(i(u.charCodeAt(p)));
        for (var v = 0, y = h; v < d; ++v) {
          var m = c[v];
          m == "m" ? c[v] = y : y = m;
        }
        for (var x = 0, b = h; x < d; ++x) {
          var C = c[x];
          C == "1" && b == "r" ? c[x] = "n" : l.test(C) && (b = C, C == "r" && (c[x] = "R"));
        }
        for (var L = 1, S = c[0]; L < d - 1; ++L) {
          var N = c[L];
          N == "+" && S == "1" && c[L + 1] == "1" ? c[L] = "1" : N == "," && S == c[L + 1] && (S == "1" || S == "n") && (c[L] = S), S = N;
        }
        for (var P = 0; P < d; ++P) {
          var J = c[P];
          if (J == ",")
            c[P] = "N";
          else if (J == "%") {
            var B = void 0;
            for (B = P + 1; B < d && c[B] == "%"; ++B)
              ;
            for (var de = P && c[P - 1] == "!" || B < d && c[B] == "1" ? "1" : "N", ue = P; ue < B; ++ue)
              c[ue] = de;
            P = B - 1;
          }
        }
        for (var K = 0, fe = h; K < d; ++K) {
          var V = c[K];
          fe == "L" && V == "1" ? c[K] = "L" : l.test(V) && (fe = V);
        }
        for (var X = 0; X < d; ++X)
          if (n.test(c[X])) {
            var _ = void 0;
            for (_ = X + 1; _ < d && n.test(c[_]); ++_)
              ;
            for (var R = (X ? c[X - 1] : h) == "L", he = (_ < d ? c[_] : h) == "L", Gt = R == he ? R ? "L" : "R" : h, Ve = X; Ve < _; ++Ve)
              c[Ve] = Gt;
            X = _ - 1;
          }
        for (var te = [], We, j = 0; j < d; )
          if (o.test(c[j])) {
            var Tn = j;
            for (++j; j < d && o.test(c[j]); ++j)
              ;
            te.push(new s(0, Tn, j));
          } else {
            var ze = j, yt = te.length, mt = f == "rtl" ? 1 : 0;
            for (++j; j < d && c[j] != "L"; ++j)
              ;
            for (var le = ze; le < j; )
              if (a.test(c[le])) {
                ze < le && (te.splice(yt, 0, new s(1, ze, le)), yt += mt);
                var Ut = le;
                for (++le; le < j && a.test(c[le]); ++le)
                  ;
                te.splice(yt, 0, new s(2, Ut, le)), yt += mt, ze = le;
              } else
                ++le;
            ze < j && te.splice(yt, 0, new s(1, ze, j));
          }
        return f == "ltr" && (te[0].level == 1 && (We = u.match(/^\s+/)) && (te[0].from = We[0].length, te.unshift(new s(0, 0, We[0].length))), W(te).level == 1 && (We = u.match(/\s+$/)) && (W(te).to -= We[0].length, te.push(new s(0, d - We[0].length, d)))), f == "rtl" ? te.reverse() : te;
      };
    }();
    function Fe(e, t) {
      var i = e.order;
      return i == null && (i = e.order = $o(e.text, t)), i;
    }
    var En = [], T = function(e, t, i) {
      if (e.addEventListener)
        e.addEventListener(t, i, !1);
      else if (e.attachEvent)
        e.attachEvent("on" + t, i);
      else {
        var r = e._handlers || (e._handlers = {});
        r[t] = (r[t] || En).concat(i);
      }
    };
    function Ci(e, t) {
      return e._handlers && e._handlers[t] || En;
    }
    function ve(e, t, i) {
      if (e.removeEventListener)
        e.removeEventListener(t, i, !1);
      else if (e.detachEvent)
        e.detachEvent("on" + t, i);
      else {
        var r = e._handlers, n = r && r[t];
        if (n) {
          var l = $(n, i);
          l > -1 && (r[t] = n.slice(0, l).concat(n.slice(l + 1)));
        }
      }
    }
    function G(e, t) {
      var i = Ci(e, t);
      if (i.length)
        for (var r = Array.prototype.slice.call(arguments, 2), n = 0; n < i.length; ++n)
          i[n].apply(null, r);
    }
    function Y(e, t, i) {
      return typeof t == "string" && (t = { type: t, preventDefault: function() {
        this.defaultPrevented = !0;
      } }), G(e, i || t.type, e, t), wi(t) || t.codemirrorIgnore;
    }
    function In(e) {
      var t = e._handlers && e._handlers.cursorActivity;
      if (t)
        for (var i = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r)
          $(i, t[r]) == -1 && i.push(t[r]);
    }
    function xe(e, t) {
      return Ci(e, t).length > 0;
    }
    function Ct(e) {
      e.prototype.on = function(t, i) {
        T(this, t, i);
      }, e.prototype.off = function(t, i) {
        ve(this, t, i);
      };
    }
    function oe(e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = !1;
    }
    function Bn(e) {
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
    }
    function wi(e) {
      return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == !1;
    }
    function Jt(e) {
      oe(e), Bn(e);
    }
    function Si(e) {
      return e.target || e.srcElement;
    }
    function Rn(e) {
      var t = e.which;
      return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), ye && e.ctrlKey && t == 1 && (t = 3), t;
    }
    var ea = function() {
      if (A && E < 9)
        return !1;
      var e = k("div");
      return "draggable" in e || "dragDrop" in e;
    }(), Li;
    function ta(e) {
      if (Li == null) {
        var t = k("span", "​");
        pe(e, k("span", [t, document.createTextNode("x")])), e.firstChild.offsetHeight != 0 && (Li = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(A && E < 8));
      }
      var i = Li ? k("span", "​") : k("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
      return i.setAttribute("cm-text", ""), i;
    }
    var ki;
    function ra(e) {
      if (ki != null)
        return ki;
      var t = pe(e, document.createTextNode("AخA")), i = it(t, 0, 1).getBoundingClientRect(), r = it(t, 1, 2).getBoundingClientRect();
      return Ge(e), !i || i.left == i.right ? !1 : ki = r.right - i.right < 3;
    }
    var Ti = `

b`.split(/\n/).length != 3 ? function(e) {
      for (var t = 0, i = [], r = e.length; t <= r; ) {
        var n = e.indexOf(`
`, t);
        n == -1 && (n = e.length);
        var l = e.slice(t, e.charAt(n - 1) == "\r" ? n - 1 : n), o = l.indexOf("\r");
        o != -1 ? (i.push(l.slice(0, o)), t += o + 1) : (i.push(l), t = n + 1);
      }
      return i;
    } : function(e) {
      return e.split(/\r\n?|\n/);
    }, ia = window.getSelection ? function(e) {
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
    }, na = function() {
      var e = k("div");
      return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), typeof e.oncopy == "function");
    }(), Mi = null;
    function la(e) {
      if (Mi != null)
        return Mi;
      var t = pe(e, k("span", "x")), i = t.getBoundingClientRect(), r = it(t, 0, 1).getBoundingClientRect();
      return Mi = Math.abs(i.left - r.left) > 1;
    }
    var Di = {}, wt = {};
    function oa(e, t) {
      arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Di[e] = t;
    }
    function aa(e, t) {
      wt[e] = t;
    }
    function Fr(e) {
      if (typeof e == "string" && wt.hasOwnProperty(e))
        e = wt[e];
      else if (e && typeof e.name == "string" && wt.hasOwnProperty(e.name)) {
        var t = wt[e.name];
        typeof t == "string" && (t = { name: t }), e = Hn(t, e), e.name = t.name;
      } else {
        if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
          return Fr("application/xml");
        if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
          return Fr("application/json");
      }
      return typeof e == "string" ? { name: e } : e || { name: "null" };
    }
    function Ni(e, t) {
      t = Fr(t);
      var i = Di[t.name];
      if (!i)
        return Ni(e, "text/plain");
      var r = i(e, t);
      if (St.hasOwnProperty(t.name)) {
        var n = St[t.name];
        for (var l in n)
          n.hasOwnProperty(l) && (r.hasOwnProperty(l) && (r["_" + l] = r[l]), r[l] = n[l]);
      }
      if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
        for (var o in t.modeProps)
          r[o] = t.modeProps[o];
      return r;
    }
    var St = {};
    function sa(e, t) {
      var i = St.hasOwnProperty(e) ? St[e] : St[e] = {};
      lt(t, i);
    }
    function ot(e, t) {
      if (t === !0)
        return t;
      if (e.copyState)
        return e.copyState(t);
      var i = {};
      for (var r in t) {
        var n = t[r];
        n instanceof Array && (n = n.concat([])), i[r] = n;
      }
      return i;
    }
    function Ai(e, t) {
      for (var i; e.innerMode && (i = e.innerMode(t), !(!i || i.mode == e)); )
        t = i.state, e = i.mode;
      return i || { mode: e, state: t };
    }
    function zn(e, t, i) {
      return e.startState ? e.startState(t, i) : !0;
    }
    var U = function(e, t, i) {
      this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = i;
    };
    U.prototype.eol = function() {
      return this.pos >= this.string.length;
    }, U.prototype.sol = function() {
      return this.pos == this.lineStart;
    }, U.prototype.peek = function() {
      return this.string.charAt(this.pos) || void 0;
    }, U.prototype.next = function() {
      if (this.pos < this.string.length)
        return this.string.charAt(this.pos++);
    }, U.prototype.eat = function(e) {
      var t = this.string.charAt(this.pos), i;
      if (typeof e == "string" ? i = t == e : i = t && (e.test ? e.test(t) : e(t)), i)
        return ++this.pos, t;
    }, U.prototype.eatWhile = function(e) {
      for (var t = this.pos; this.eat(e); )
        ;
      return this.pos > t;
    }, U.prototype.eatSpace = function() {
      for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
        ++this.pos;
      return this.pos > e;
    }, U.prototype.skipToEnd = function() {
      this.pos = this.string.length;
    }, U.prototype.skipTo = function(e) {
      var t = this.string.indexOf(e, this.pos);
      if (t > -1)
        return this.pos = t, !0;
    }, U.prototype.backUp = function(e) {
      this.pos -= e;
    }, U.prototype.column = function() {
      return this.lastColumnPos < this.start && (this.lastColumnValue = be(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? be(this.string, this.lineStart, this.tabSize) : 0);
    }, U.prototype.indentation = function() {
      return be(this.string, null, this.tabSize) - (this.lineStart ? be(this.string, this.lineStart, this.tabSize) : 0);
    }, U.prototype.match = function(e, t, i) {
      if (typeof e == "string") {
        var r = function(o) {
          return i ? o.toLowerCase() : o;
        }, n = this.string.substr(this.pos, e.length);
        if (r(n) == r(e))
          return t !== !1 && (this.pos += e.length), !0;
      } else {
        var l = this.string.slice(this.pos).match(e);
        return l && l.index > 0 ? null : (l && t !== !1 && (this.pos += l[0].length), l);
      }
    }, U.prototype.current = function() {
      return this.string.slice(this.start, this.pos);
    }, U.prototype.hideFirstChars = function(e, t) {
      this.lineStart += e;
      try {
        return t();
      } finally {
        this.lineStart -= e;
      }
    }, U.prototype.lookAhead = function(e) {
      var t = this.lineOracle;
      return t && t.lookAhead(e);
    }, U.prototype.baseToken = function() {
      var e = this.lineOracle;
      return e && e.baseToken(this.pos);
    };
    function w(e, t) {
      if (t -= e.first, t < 0 || t >= e.size)
        throw new Error("There is no line " + (t + e.first) + " in the document.");
      for (var i = e; !i.lines; )
        for (var r = 0; ; ++r) {
          var n = i.children[r], l = n.chunkSize();
          if (t < l) {
            i = n;
            break;
          }
          t -= l;
        }
      return i.lines[t];
    }
    function at(e, t, i) {
      var r = [], n = t.line;
      return e.iter(t.line, i.line + 1, function(l) {
        var o = l.text;
        n == i.line && (o = o.slice(0, i.ch)), n == t.line && (o = o.slice(t.ch)), r.push(o), ++n;
      }), r;
    }
    function Oi(e, t, i) {
      var r = [];
      return e.iter(t, i, function(n) {
        r.push(n.text);
      }), r;
    }
    function De(e, t) {
      var i = t - e.height;
      if (i)
        for (var r = e; r; r = r.parent)
          r.height += i;
    }
    function H(e) {
      if (e.parent == null)
        return null;
      for (var t = e.parent, i = $(t.lines, e), r = t.parent; r; t = r, r = r.parent)
        for (var n = 0; r.children[n] != t; ++n)
          i += r.children[n].chunkSize();
      return i + t.first;
    }
    function st(e, t) {
      var i = e.first;
      e: do {
        for (var r = 0; r < e.children.length; ++r) {
          var n = e.children[r], l = n.height;
          if (t < l) {
            e = n;
            continue e;
          }
          t -= l, i += n.chunkSize();
        }
        return i;
      } while (!e.lines);
      for (var o = 0; o < e.lines.length; ++o) {
        var a = e.lines[o], s = a.height;
        if (t < s)
          break;
        t -= s;
      }
      return i + o;
    }
    function jt(e, t) {
      return t >= e.first && t < e.first + e.size;
    }
    function Wi(e, t) {
      return String(e.lineNumberFormatter(t + e.firstLineNumber));
    }
    function g(e, t, i) {
      if (i === void 0 && (i = null), !(this instanceof g))
        return new g(e, t, i);
      this.line = e, this.ch = t, this.sticky = i;
    }
    function M(e, t) {
      return e.line - t.line || e.ch - t.ch;
    }
    function Hi(e, t) {
      return e.sticky == t.sticky && M(e, t) == 0;
    }
    function Fi(e) {
      return g(e.line, e.ch);
    }
    function Pr(e, t) {
      return M(e, t) < 0 ? t : e;
    }
    function Er(e, t) {
      return M(e, t) < 0 ? e : t;
    }
    function Gn(e, t) {
      return Math.max(e.first, Math.min(t, e.first + e.size - 1));
    }
    function D(e, t) {
      if (t.line < e.first)
        return g(e.first, 0);
      var i = e.first + e.size - 1;
      return t.line > i ? g(i, w(e, i).text.length) : ua(t, w(e, t.line).text.length);
    }
    function ua(e, t) {
      var i = e.ch;
      return i == null || i > t ? g(e.line, t) : i < 0 ? g(e.line, 0) : e;
    }
    function Un(e, t) {
      for (var i = [], r = 0; r < t.length; r++)
        i[r] = D(e, t[r]);
      return i;
    }
    var Ir = function(e, t) {
      this.state = e, this.lookAhead = t;
    }, Ne = function(e, t, i, r) {
      this.state = t, this.doc = e, this.line = i, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1;
    };
    Ne.prototype.lookAhead = function(e) {
      var t = this.doc.getLine(this.line + e);
      return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
    }, Ne.prototype.baseToken = function(e) {
      if (!this.baseTokens)
        return null;
      for (; this.baseTokens[this.baseTokenPos] <= e; )
        this.baseTokenPos += 2;
      var t = this.baseTokens[this.baseTokenPos + 1];
      return {
        type: t && t.replace(/( |^)overlay .*/, ""),
        size: this.baseTokens[this.baseTokenPos] - e
      };
    }, Ne.prototype.nextLine = function() {
      this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
    }, Ne.fromSaved = function(e, t, i) {
      return t instanceof Ir ? new Ne(e, ot(e.mode, t.state), i, t.lookAhead) : new Ne(e, ot(e.mode, t), i);
    }, Ne.prototype.save = function(e) {
      var t = e !== !1 ? ot(this.doc.mode, this.state) : this.state;
      return this.maxLookAhead > 0 ? new Ir(t, this.maxLookAhead) : t;
    };
    function Kn(e, t, i, r) {
      var n = [e.state.modeGen], l = {};
      Qn(
        e,
        t.text,
        e.doc.mode,
        i,
        function(u, f) {
          return n.push(u, f);
        },
        l,
        r
      );
      for (var o = i.state, a = function(u) {
        i.baseTokens = n;
        var f = e.state.overlays[u], h = 1, d = 0;
        i.state = !0, Qn(e, t.text, f.mode, i, function(c, p) {
          for (var v = h; d < c; ) {
            var y = n[h];
            y > c && n.splice(h, 1, c, n[h + 1], y), h += 2, d = Math.min(c, y);
          }
          if (p)
            if (f.opaque)
              n.splice(v, h - v, c, "overlay " + p), h = v + 2;
            else
              for (; v < h; v += 2) {
                var m = n[v + 1];
                n[v + 1] = (m ? m + " " : "") + "overlay " + p;
              }
        }, l), i.state = o, i.baseTokens = null, i.baseTokenPos = 1;
      }, s = 0; s < e.state.overlays.length; ++s) a(s);
      return { styles: n, classes: l.bgClass || l.textClass ? l : null };
    }
    function _n(e, t, i) {
      if (!t.styles || t.styles[0] != e.state.modeGen) {
        var r = Vt(e, H(t)), n = t.text.length > e.options.maxHighlightLength && ot(e.doc.mode, r.state), l = Kn(e, t, r);
        n && (r.state = n), t.stateAfter = r.save(!n), t.styles = l.styles, l.classes ? t.styleClasses = l.classes : t.styleClasses && (t.styleClasses = null), i === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
      }
      return t.styles;
    }
    function Vt(e, t, i) {
      var r = e.doc, n = e.display;
      if (!r.mode.startState)
        return new Ne(r, !0, t);
      var l = fa(e, t, i), o = l > r.first && w(r, l - 1).stateAfter, a = o ? Ne.fromSaved(r, o, l) : new Ne(r, zn(r.mode), l);
      return r.iter(l, t, function(s) {
        Pi(e, s.text, a);
        var u = a.line;
        s.stateAfter = u == t - 1 || u % 5 == 0 || u >= n.viewFrom && u < n.viewTo ? a.save() : null, a.nextLine();
      }), i && (r.modeFrontier = a.line), a;
    }
    function Pi(e, t, i, r) {
      var n = e.doc.mode, l = new U(t, e.options.tabSize, i);
      for (l.start = l.pos = r || 0, t == "" && Xn(n, i.state); !l.eol(); )
        Ei(n, l, i.state), l.start = l.pos;
    }
    function Xn(e, t) {
      if (e.blankLine)
        return e.blankLine(t);
      if (e.innerMode) {
        var i = Ai(e, t);
        if (i.mode.blankLine)
          return i.mode.blankLine(i.state);
      }
    }
    function Ei(e, t, i, r) {
      for (var n = 0; n < 10; n++) {
        r && (r[0] = Ai(e, i).mode);
        var l = e.token(t, i);
        if (t.pos > t.start)
          return l;
      }
      throw new Error("Mode " + e.name + " failed to advance stream.");
    }
    var Yn = function(e, t, i) {
      this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = i;
    };
    function qn(e, t, i, r) {
      var n = e.doc, l = n.mode, o;
      t = D(n, t);
      var a = w(n, t.line), s = Vt(e, t.line, i), u = new U(a.text, e.options.tabSize, s), f;
      for (r && (f = []); (r || u.pos < t.ch) && !u.eol(); )
        u.start = u.pos, o = Ei(l, u, s.state), r && f.push(new Yn(u, o, ot(n.mode, s.state)));
      return r ? f : new Yn(u, o, s.state);
    }
    function Zn(e, t) {
      if (e)
        for (; ; ) {
          var i = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
          if (!i)
            break;
          e = e.slice(0, i.index) + e.slice(i.index + i[0].length);
          var r = i[1] ? "bgClass" : "textClass";
          t[r] == null ? t[r] = i[2] : new RegExp("(?:^|\\s)" + i[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + i[2]);
        }
      return e;
    }
    function Qn(e, t, i, r, n, l, o) {
      var a = i.flattenSpans;
      a == null && (a = e.options.flattenSpans);
      var s = 0, u = null, f = new U(t, e.options.tabSize, r), h, d = e.options.addModeClass && [null];
      for (t == "" && Zn(Xn(i, r.state), l); !f.eol(); ) {
        if (f.pos > e.options.maxHighlightLength ? (a = !1, o && Pi(e, t, r, f.pos), f.pos = t.length, h = null) : h = Zn(Ei(i, f, r.state, d), l), d) {
          var c = d[0].name;
          c && (h = "m-" + (h ? c + " " + h : c));
        }
        if (!a || u != h) {
          for (; s < f.start; )
            s = Math.min(f.start, s + 5e3), n(s, u);
          u = h;
        }
        f.start = f.pos;
      }
      for (; s < f.pos; ) {
        var p = Math.min(f.pos, s + 5e3);
        n(p, u), s = p;
      }
    }
    function fa(e, t, i) {
      for (var r, n, l = e.doc, o = i ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > o; --a) {
        if (a <= l.first)
          return l.first;
        var s = w(l, a - 1), u = s.stateAfter;
        if (u && (!i || a + (u instanceof Ir ? u.lookAhead : 0) <= l.modeFrontier))
          return a;
        var f = be(s.text, null, e.options.tabSize);
        (n == null || r > f) && (n = a - 1, r = f);
      }
      return n;
    }
    function ha(e, t) {
      if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
        for (var i = e.first, r = t - 1; r > i; r--) {
          var n = w(e, r).stateAfter;
          if (n && (!(n instanceof Ir) || r + n.lookAhead < t)) {
            i = r + 1;
            break;
          }
        }
        e.highlightFrontier = Math.min(e.highlightFrontier, i);
      }
    }
    var Jn = !1, Pe = !1;
    function ca() {
      Jn = !0;
    }
    function da() {
      Pe = !0;
    }
    function Br(e, t, i) {
      this.marker = e, this.from = t, this.to = i;
    }
    function $t(e, t) {
      if (e)
        for (var i = 0; i < e.length; ++i) {
          var r = e[i];
          if (r.marker == t)
            return r;
        }
    }
    function pa(e, t) {
      for (var i, r = 0; r < e.length; ++r)
        e[r] != t && (i || (i = [])).push(e[r]);
      return i;
    }
    function va(e, t, i) {
      var r = i && window.WeakSet && (i.markedSpans || (i.markedSpans = /* @__PURE__ */ new WeakSet()));
      r && e.markedSpans && r.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], r && r.add(e.markedSpans)), t.marker.attachLine(e);
    }
    function ga(e, t, i) {
      var r;
      if (e)
        for (var n = 0; n < e.length; ++n) {
          var l = e[n], o = l.marker, a = l.from == null || (o.inclusiveLeft ? l.from <= t : l.from < t);
          if (a || l.from == t && o.type == "bookmark" && (!i || !l.marker.insertLeft)) {
            var s = l.to == null || (o.inclusiveRight ? l.to >= t : l.to > t);
            (r || (r = [])).push(new Br(o, l.from, s ? null : l.to));
          }
        }
      return r;
    }
    function ya(e, t, i) {
      var r;
      if (e)
        for (var n = 0; n < e.length; ++n) {
          var l = e[n], o = l.marker, a = l.to == null || (o.inclusiveRight ? l.to >= t : l.to > t);
          if (a || l.from == t && o.type == "bookmark" && (!i || l.marker.insertLeft)) {
            var s = l.from == null || (o.inclusiveLeft ? l.from <= t : l.from < t);
            (r || (r = [])).push(new Br(
              o,
              s ? null : l.from - t,
              l.to == null ? null : l.to - t
            ));
          }
        }
      return r;
    }
    function Ii(e, t) {
      if (t.full)
        return null;
      var i = jt(e, t.from.line) && w(e, t.from.line).markedSpans, r = jt(e, t.to.line) && w(e, t.to.line).markedSpans;
      if (!i && !r)
        return null;
      var n = t.from.ch, l = t.to.ch, o = M(t.from, t.to) == 0, a = ga(i, n, o), s = ya(r, l, o), u = t.text.length == 1, f = W(t.text).length + (u ? n : 0);
      if (a)
        for (var h = 0; h < a.length; ++h) {
          var d = a[h];
          if (d.to == null) {
            var c = $t(s, d.marker);
            c ? u && (d.to = c.to == null ? null : c.to + f) : d.to = n;
          }
        }
      if (s)
        for (var p = 0; p < s.length; ++p) {
          var v = s[p];
          if (v.to != null && (v.to += f), v.from == null) {
            var y = $t(a, v.marker);
            y || (v.from = f, u && (a || (a = [])).push(v));
          } else
            v.from += f, u && (a || (a = [])).push(v);
        }
      a && (a = jn(a)), s && s != a && (s = jn(s));
      var m = [a];
      if (!u) {
        var x = t.text.length - 2, b;
        if (x > 0 && a)
          for (var C = 0; C < a.length; ++C)
            a[C].to == null && (b || (b = [])).push(new Br(a[C].marker, null, null));
        for (var L = 0; L < x; ++L)
          m.push(b);
        m.push(s);
      }
      return m;
    }
    function jn(e) {
      for (var t = 0; t < e.length; ++t) {
        var i = e[t];
        i.from != null && i.from == i.to && i.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
      }
      return e.length ? e : null;
    }
    function ma(e, t, i) {
      var r = null;
      if (e.iter(t.line, i.line + 1, function(c) {
        if (c.markedSpans)
          for (var p = 0; p < c.markedSpans.length; ++p) {
            var v = c.markedSpans[p].marker;
            v.readOnly && (!r || $(r, v) == -1) && (r || (r = [])).push(v);
          }
      }), !r)
        return null;
      for (var n = [{ from: t, to: i }], l = 0; l < r.length; ++l)
        for (var o = r[l], a = o.find(0), s = 0; s < n.length; ++s) {
          var u = n[s];
          if (!(M(u.to, a.from) < 0 || M(u.from, a.to) > 0)) {
            var f = [s, 1], h = M(u.from, a.from), d = M(u.to, a.to);
            (h < 0 || !o.inclusiveLeft && !h) && f.push({ from: u.from, to: a.from }), (d > 0 || !o.inclusiveRight && !d) && f.push({ from: a.to, to: u.to }), n.splice.apply(n, f), s += f.length - 3;
          }
        }
      return n;
    }
    function Vn(e) {
      var t = e.markedSpans;
      if (t) {
        for (var i = 0; i < t.length; ++i)
          t[i].marker.detachLine(e);
        e.markedSpans = null;
      }
    }
    function $n(e, t) {
      if (t) {
        for (var i = 0; i < t.length; ++i)
          t[i].marker.attachLine(e);
        e.markedSpans = t;
      }
    }
    function Rr(e) {
      return e.inclusiveLeft ? -1 : 0;
    }
    function zr(e) {
      return e.inclusiveRight ? 1 : 0;
    }
    function Bi(e, t) {
      var i = e.lines.length - t.lines.length;
      if (i != 0)
        return i;
      var r = e.find(), n = t.find(), l = M(r.from, n.from) || Rr(e) - Rr(t);
      if (l)
        return -l;
      var o = M(r.to, n.to) || zr(e) - zr(t);
      return o || t.id - e.id;
    }
    function el(e, t) {
      var i = Pe && e.markedSpans, r;
      if (i)
        for (var n = void 0, l = 0; l < i.length; ++l)
          n = i[l], n.marker.collapsed && (t ? n.from : n.to) == null && (!r || Bi(r, n.marker) < 0) && (r = n.marker);
      return r;
    }
    function tl(e) {
      return el(e, !0);
    }
    function Gr(e) {
      return el(e, !1);
    }
    function ba(e, t) {
      var i = Pe && e.markedSpans, r;
      if (i)
        for (var n = 0; n < i.length; ++n) {
          var l = i[n];
          l.marker.collapsed && (l.from == null || l.from < t) && (l.to == null || l.to > t) && (!r || Bi(r, l.marker) < 0) && (r = l.marker);
        }
      return r;
    }
    function rl(e, t, i, r, n) {
      var l = w(e, t), o = Pe && l.markedSpans;
      if (o)
        for (var a = 0; a < o.length; ++a) {
          var s = o[a];
          if (s.marker.collapsed) {
            var u = s.marker.find(0), f = M(u.from, i) || Rr(s.marker) - Rr(n), h = M(u.to, r) || zr(s.marker) - zr(n);
            if (!(f >= 0 && h <= 0 || f <= 0 && h >= 0) && (f <= 0 && (s.marker.inclusiveRight && n.inclusiveLeft ? M(u.to, i) >= 0 : M(u.to, i) > 0) || f >= 0 && (s.marker.inclusiveRight && n.inclusiveLeft ? M(u.from, r) <= 0 : M(u.from, r) < 0)))
              return !0;
          }
        }
    }
    function Se(e) {
      for (var t; t = tl(e); )
        e = t.find(-1, !0).line;
      return e;
    }
    function xa(e) {
      for (var t; t = Gr(e); )
        e = t.find(1, !0).line;
      return e;
    }
    function Ca(e) {
      for (var t, i; t = Gr(e); )
        e = t.find(1, !0).line, (i || (i = [])).push(e);
      return i;
    }
    function Ri(e, t) {
      var i = w(e, t), r = Se(i);
      return i == r ? t : H(r);
    }
    function il(e, t) {
      if (t > e.lastLine())
        return t;
      var i = w(e, t), r;
      if (!_e(e, i))
        return t;
      for (; r = Gr(i); )
        i = r.find(1, !0).line;
      return H(i) + 1;
    }
    function _e(e, t) {
      var i = Pe && t.markedSpans;
      if (i) {
        for (var r = void 0, n = 0; n < i.length; ++n)
          if (r = i[n], !!r.marker.collapsed) {
            if (r.from == null)
              return !0;
            if (!r.marker.widgetNode && r.from == 0 && r.marker.inclusiveLeft && zi(e, t, r))
              return !0;
          }
      }
    }
    function zi(e, t, i) {
      if (i.to == null) {
        var r = i.marker.find(1, !0);
        return zi(e, r.line, $t(r.line.markedSpans, i.marker));
      }
      if (i.marker.inclusiveRight && i.to == t.text.length)
        return !0;
      for (var n = void 0, l = 0; l < t.markedSpans.length; ++l)
        if (n = t.markedSpans[l], n.marker.collapsed && !n.marker.widgetNode && n.from == i.to && (n.to == null || n.to != i.from) && (n.marker.inclusiveLeft || i.marker.inclusiveRight) && zi(e, t, n))
          return !0;
    }
    function Ee(e) {
      e = Se(e);
      for (var t = 0, i = e.parent, r = 0; r < i.lines.length; ++r) {
        var n = i.lines[r];
        if (n == e)
          break;
        t += n.height;
      }
      for (var l = i.parent; l; i = l, l = i.parent)
        for (var o = 0; o < l.children.length; ++o) {
          var a = l.children[o];
          if (a == i)
            break;
          t += a.height;
        }
      return t;
    }
    function Ur(e) {
      if (e.height == 0)
        return 0;
      for (var t = e.text.length, i, r = e; i = tl(r); ) {
        var n = i.find(0, !0);
        r = n.from.line, t += n.from.ch - n.to.ch;
      }
      for (r = e; i = Gr(r); ) {
        var l = i.find(0, !0);
        t -= r.text.length - l.from.ch, r = l.to.line, t += r.text.length - l.to.ch;
      }
      return t;
    }
    function Gi(e) {
      var t = e.display, i = e.doc;
      t.maxLine = w(i, i.first), t.maxLineLength = Ur(t.maxLine), t.maxLineChanged = !0, i.iter(function(r) {
        var n = Ur(r);
        n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = r);
      });
    }
    var Lt = function(e, t, i) {
      this.text = e, $n(this, t), this.height = i ? i(this) : 1;
    };
    Lt.prototype.lineNo = function() {
      return H(this);
    }, Ct(Lt);
    function wa(e, t, i, r) {
      e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), e.order != null && (e.order = null), Vn(e), $n(e, i);
      var n = r ? r(e) : 1;
      n != e.height && De(e, n);
    }
    function Sa(e) {
      e.parent = null, Vn(e);
    }
    var La = {}, ka = {};
    function nl(e, t) {
      if (!e || /^\s*$/.test(e))
        return null;
      var i = t.addModeClass ? ka : La;
      return i[e] || (i[e] = e.replace(/\S+/g, "cm-$&"));
    }
    function ll(e, t) {
      var i = xt("span", null, null, ie ? "padding-right: .1px" : null), r = {
        pre: xt("pre", [i], "CodeMirror-line"),
        content: i,
        col: 0,
        pos: 0,
        cm: e,
        trailingSpace: !1,
        splitSpaces: e.getOption("lineWrapping")
      };
      t.measure = {};
      for (var n = 0; n <= (t.rest ? t.rest.length : 0); n++) {
        var l = n ? t.rest[n - 1] : t.line, o = void 0;
        r.pos = 0, r.addToken = Ma, ra(e.display.measure) && (o = Fe(l, e.doc.direction)) && (r.addToken = Na(r.addToken, o)), r.map = [];
        var a = t != e.display.externalMeasured && H(l);
        Aa(l, r, _n(e, l, a)), l.styleClasses && (l.styleClasses.bgClass && (r.bgClass = pi(l.styleClasses.bgClass, r.bgClass || "")), l.styleClasses.textClass && (r.textClass = pi(l.styleClasses.textClass, r.textClass || ""))), r.map.length == 0 && r.map.push(0, 0, r.content.appendChild(ta(e.display.measure))), n == 0 ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}));
      }
      if (ie) {
        var s = r.content.lastChild;
        (/\bcm-tab\b/.test(s.className) || s.querySelector && s.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack");
      }
      return G(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = pi(r.pre.className, r.textClass || "")), r;
    }
    function Ta(e) {
      var t = k("span", "•", "cm-invalidchar");
      return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
    }
    function Ma(e, t, i, r, n, l, o) {
      if (t) {
        var a = e.splitSpaces ? Da(t, e.trailingSpace) : t, s = e.cm.state.specialChars, u = !1, f;
        if (!s.test(t))
          e.col += t.length, f = document.createTextNode(a), e.map.push(e.pos, e.pos + t.length, f), A && E < 9 && (u = !0), e.pos += t.length;
        else {
          f = document.createDocumentFragment();
          for (var h = 0; ; ) {
            s.lastIndex = h;
            var d = s.exec(t), c = d ? d.index - h : t.length - h;
            if (c) {
              var p = document.createTextNode(a.slice(h, h + c));
              A && E < 9 ? f.appendChild(k("span", [p])) : f.appendChild(p), e.map.push(e.pos, e.pos + c, p), e.col += c, e.pos += c;
            }
            if (!d)
              break;
            h += c + 1;
            var v = void 0;
            if (d[0] == "	") {
              var y = e.cm.options.tabSize, m = y - e.col % y;
              v = f.appendChild(k("span", mi(m), "cm-tab")), v.setAttribute("role", "presentation"), v.setAttribute("cm-text", "	"), e.col += m;
            } else d[0] == "\r" || d[0] == `
` ? (v = f.appendChild(k("span", d[0] == "\r" ? "␍" : "␤", "cm-invalidchar")), v.setAttribute("cm-text", d[0]), e.col += 1) : (v = e.cm.options.specialCharPlaceholder(d[0]), v.setAttribute("cm-text", d[0]), A && E < 9 ? f.appendChild(k("span", [v])) : f.appendChild(v), e.col += 1);
            e.map.push(e.pos, e.pos + 1, v), e.pos++;
          }
        }
        if (e.trailingSpace = a.charCodeAt(t.length - 1) == 32, i || r || n || u || l || o) {
          var x = i || "";
          r && (x += r), n && (x += n);
          var b = k("span", [f], x, l);
          if (o)
            for (var C in o)
              o.hasOwnProperty(C) && C != "style" && C != "class" && b.setAttribute(C, o[C]);
          return e.content.appendChild(b);
        }
        e.content.appendChild(f);
      }
    }
    function Da(e, t) {
      if (e.length > 1 && !/  /.test(e))
        return e;
      for (var i = t, r = "", n = 0; n < e.length; n++) {
        var l = e.charAt(n);
        l == " " && i && (n == e.length - 1 || e.charCodeAt(n + 1) == 32) && (l = " "), r += l, i = l == " ";
      }
      return r;
    }
    function Na(e, t) {
      return function(i, r, n, l, o, a, s) {
        n = n ? n + " cm-force-border" : "cm-force-border";
        for (var u = i.pos, f = u + r.length; ; ) {
          for (var h = void 0, d = 0; d < t.length && (h = t[d], !(h.to > u && h.from <= u)); d++)
            ;
          if (h.to >= f)
            return e(i, r, n, l, o, a, s);
          e(i, r.slice(0, h.to - u), n, l, null, a, s), l = null, r = r.slice(h.to - u), u = h.to;
        }
      };
    }
    function ol(e, t, i, r) {
      var n = !r && i.widgetNode;
      n && e.map.push(e.pos, e.pos + t, n), !r && e.cm.display.input.needsContentAttribute && (n || (n = e.content.appendChild(document.createElement("span"))), n.setAttribute("cm-marker", i.id)), n && (e.cm.display.input.setUneditable(n), e.content.appendChild(n)), e.pos += t, e.trailingSpace = !1;
    }
    function Aa(e, t, i) {
      var r = e.markedSpans, n = e.text, l = 0;
      if (!r) {
        for (var o = 1; o < i.length; o += 2)
          t.addToken(t, n.slice(l, l = i[o]), nl(i[o + 1], t.cm.options));
        return;
      }
      for (var a = n.length, s = 0, u = 1, f = "", h, d, c = 0, p, v, y, m, x; ; ) {
        if (c == s) {
          p = v = y = d = "", x = null, m = null, c = 1 / 0;
          for (var b = [], C = void 0, L = 0; L < r.length; ++L) {
            var S = r[L], N = S.marker;
            if (N.type == "bookmark" && S.from == s && N.widgetNode)
              b.push(N);
            else if (S.from <= s && (S.to == null || S.to > s || N.collapsed && S.to == s && S.from == s)) {
              if (S.to != null && S.to != s && c > S.to && (c = S.to, v = ""), N.className && (p += " " + N.className), N.css && (d = (d ? d + ";" : "") + N.css), N.startStyle && S.from == s && (y += " " + N.startStyle), N.endStyle && S.to == c && (C || (C = [])).push(N.endStyle, S.to), N.title && ((x || (x = {})).title = N.title), N.attributes)
                for (var P in N.attributes)
                  (x || (x = {}))[P] = N.attributes[P];
              N.collapsed && (!m || Bi(m.marker, N) < 0) && (m = S);
            } else S.from > s && c > S.from && (c = S.from);
          }
          if (C)
            for (var J = 0; J < C.length; J += 2)
              C[J + 1] == c && (v += " " + C[J]);
          if (!m || m.from == s)
            for (var B = 0; B < b.length; ++B)
              ol(t, 0, b[B]);
          if (m && (m.from || 0) == s) {
            if (ol(
              t,
              (m.to == null ? a + 1 : m.to) - s,
              m.marker,
              m.from == null
            ), m.to == null)
              return;
            m.to == s && (m = !1);
          }
        }
        if (s >= a)
          break;
        for (var de = Math.min(a, c); ; ) {
          if (f) {
            var ue = s + f.length;
            if (!m) {
              var K = ue > de ? f.slice(0, de - s) : f;
              t.addToken(
                t,
                K,
                h ? h + p : p,
                y,
                s + K.length == c ? v : "",
                d,
                x
              );
            }
            if (ue >= de) {
              f = f.slice(de - s), s = de;
              break;
            }
            s = ue, y = "";
          }
          f = n.slice(l, l = i[u++]), h = nl(i[u++], t.cm.options);
        }
      }
    }
    function al(e, t, i) {
      this.line = t, this.rest = Ca(t), this.size = this.rest ? H(W(this.rest)) - i + 1 : 1, this.node = this.text = null, this.hidden = _e(e, t);
    }
    function Kr(e, t, i) {
      for (var r = [], n, l = t; l < i; l = n) {
        var o = new al(e.doc, w(e.doc, l), l);
        n = l + o.size, r.push(o);
      }
      return r;
    }
    var kt = null;
    function Oa(e) {
      kt ? kt.ops.push(e) : e.ownsGroup = kt = {
        ops: [e],
        delayedCallbacks: []
      };
    }
    function Wa(e) {
      var t = e.delayedCallbacks, i = 0;
      do {
        for (; i < t.length; i++)
          t[i].call(null);
        for (var r = 0; r < e.ops.length; r++) {
          var n = e.ops[r];
          if (n.cursorActivityHandlers)
            for (; n.cursorActivityCalled < n.cursorActivityHandlers.length; )
              n.cursorActivityHandlers[n.cursorActivityCalled++].call(null, n.cm);
        }
      } while (i < t.length);
    }
    function Ha(e, t) {
      var i = e.ownsGroup;
      if (i)
        try {
          Wa(i);
        } finally {
          kt = null, t(i);
        }
    }
    var er = null;
    function q(e, t) {
      var i = Ci(e, t);
      if (i.length) {
        var r = Array.prototype.slice.call(arguments, 2), n;
        kt ? n = kt.delayedCallbacks : er ? n = er : (n = er = [], setTimeout(Fa, 0));
        for (var l = function(a) {
          n.push(function() {
            return i[a].apply(null, r);
          });
        }, o = 0; o < i.length; ++o)
          l(o);
      }
    }
    function Fa() {
      var e = er;
      er = null;
      for (var t = 0; t < e.length; ++t)
        e[t]();
    }
    function sl(e, t, i, r) {
      for (var n = 0; n < t.changes.length; n++) {
        var l = t.changes[n];
        l == "text" ? Ea(e, t) : l == "gutter" ? fl(e, t, i, r) : l == "class" ? Ui(e, t) : l == "widget" && Ia(e, t, r);
      }
      t.changes = null;
    }
    function tr(e) {
      return e.node == e.text && (e.node = k("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), A && E < 8 && (e.node.style.zIndex = 2)), e.node;
    }
    function Pa(e, t) {
      var i = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
      if (i && (i += " CodeMirror-linebackground"), t.background)
        i ? t.background.className = i : (t.background.parentNode.removeChild(t.background), t.background = null);
      else if (i) {
        var r = tr(t);
        t.background = r.insertBefore(k("div", null, i), r.firstChild), e.display.input.setUneditable(t.background);
      }
    }
    function ul(e, t) {
      var i = e.display.externalMeasured;
      return i && i.line == t.line ? (e.display.externalMeasured = null, t.measure = i.measure, i.built) : ll(e, t);
    }
    function Ea(e, t) {
      var i = t.text.className, r = ul(e, t);
      t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, Ui(e, t)) : i && (t.text.className = i);
    }
    function Ui(e, t) {
      Pa(e, t), t.line.wrapClass ? tr(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
      var i = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
      t.text.className = i || "";
    }
    function fl(e, t, i, r) {
      if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
        var n = tr(t);
        t.gutterBackground = k(
          "div",
          null,
          "CodeMirror-gutter-background " + t.line.gutterClass,
          "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"
        ), e.display.input.setUneditable(t.gutterBackground), n.insertBefore(t.gutterBackground, t.text);
      }
      var l = t.line.gutterMarkers;
      if (e.options.lineNumbers || l) {
        var o = tr(t), a = t.gutter = k("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
        if (a.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(a), o.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), e.options.lineNumbers && (!l || !l["CodeMirror-linenumbers"]) && (t.lineNumber = a.appendChild(
          k(
            "div",
            Wi(e.options, i),
            "CodeMirror-linenumber CodeMirror-gutter-elt",
            "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"
          )
        )), l)
          for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
            var u = e.display.gutterSpecs[s].className, f = l.hasOwnProperty(u) && l[u];
            f && a.appendChild(k(
              "div",
              [f],
              "CodeMirror-gutter-elt",
              "left: " + r.gutterLeft[u] + "px; width: " + r.gutterWidth[u] + "px"
            ));
          }
      }
    }
    function Ia(e, t, i) {
      t.alignable && (t.alignable = null);
      for (var r = bt("CodeMirror-linewidget"), n = t.node.firstChild, l = void 0; n; n = l)
        l = n.nextSibling, r.test(n.className) && t.node.removeChild(n);
      hl(e, t, i);
    }
    function Ba(e, t, i, r) {
      var n = ul(e, t);
      return t.text = t.node = n.pre, n.bgClass && (t.bgClass = n.bgClass), n.textClass && (t.textClass = n.textClass), Ui(e, t), fl(e, t, i, r), hl(e, t, r), t.node;
    }
    function hl(e, t, i) {
      if (cl(e, t.line, t, i, !0), t.rest)
        for (var r = 0; r < t.rest.length; r++)
          cl(e, t.rest[r], t, i, !1);
    }
    function cl(e, t, i, r, n) {
      if (t.widgets)
        for (var l = tr(i), o = 0, a = t.widgets; o < a.length; ++o) {
          var s = a[o], u = k("div", [s.node], "CodeMirror-linewidget" + (s.className ? " " + s.className : ""));
          s.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), Ra(s, u, i, r), e.display.input.setUneditable(u), n && s.above ? l.insertBefore(u, i.gutter || i.text) : l.appendChild(u), q(s, "redraw");
        }
    }
    function Ra(e, t, i, r) {
      if (e.noHScroll) {
        (i.alignable || (i.alignable = [])).push(t);
        var n = r.wrapperWidth;
        t.style.left = r.fixedPos + "px", e.coverGutter || (n -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = n + "px";
      }
      e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
    }
    function rr(e) {
      if (e.height != null)
        return e.height;
      var t = e.doc.cm;
      if (!t)
        return 0;
      if (!Ue(document.body, e.node)) {
        var i = "position: relative;";
        e.coverGutter && (i += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (i += "width: " + t.display.wrapper.clientWidth + "px;"), pe(t.display.measure, k("div", [e.node], null, i));
      }
      return e.height = e.node.parentNode.offsetHeight;
    }
    function Ie(e, t) {
      for (var i = Si(t); i != e.wrapper; i = i.parentNode)
        if (!i || i.nodeType == 1 && i.getAttribute("cm-ignore-events") == "true" || i.parentNode == e.sizer && i != e.mover)
          return !0;
    }
    function _r(e) {
      return e.lineSpace.offsetTop;
    }
    function Ki(e) {
      return e.mover.offsetHeight - e.lineSpace.offsetHeight;
    }
    function dl(e) {
      if (e.cachedPaddingH)
        return e.cachedPaddingH;
      var t = pe(e.measure, k("pre", "x", "CodeMirror-line-like")), i = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, r = { left: parseInt(i.paddingLeft), right: parseInt(i.paddingRight) };
      return !isNaN(r.left) && !isNaN(r.right) && (e.cachedPaddingH = r), r;
    }
    function Ae(e) {
      return On - e.display.nativeBarWidth;
    }
    function ut(e) {
      return e.display.scroller.clientWidth - Ae(e) - e.display.barWidth;
    }
    function _i(e) {
      return e.display.scroller.clientHeight - Ae(e) - e.display.barHeight;
    }
    function za(e, t, i) {
      var r = e.options.lineWrapping, n = r && ut(e);
      if (!t.measure.heights || r && t.measure.width != n) {
        var l = t.measure.heights = [];
        if (r) {
          t.measure.width = n;
          for (var o = t.text.firstChild.getClientRects(), a = 0; a < o.length - 1; a++) {
            var s = o[a], u = o[a + 1];
            Math.abs(s.bottom - u.bottom) > 2 && l.push((s.bottom + u.top) / 2 - i.top);
          }
        }
        l.push(i.bottom - i.top);
      }
    }
    function pl(e, t, i) {
      if (e.line == t)
        return { map: e.measure.map, cache: e.measure.cache };
      if (e.rest) {
        for (var r = 0; r < e.rest.length; r++)
          if (e.rest[r] == t)
            return { map: e.measure.maps[r], cache: e.measure.caches[r] };
        for (var n = 0; n < e.rest.length; n++)
          if (H(e.rest[n]) > i)
            return { map: e.measure.maps[n], cache: e.measure.caches[n], before: !0 };
      }
    }
    function Ga(e, t) {
      t = Se(t);
      var i = H(t), r = e.display.externalMeasured = new al(e.doc, t, i);
      r.lineN = i;
      var n = r.built = ll(e, r);
      return r.text = n.pre, pe(e.display.lineMeasure, n.pre), r;
    }
    function vl(e, t, i, r) {
      return Oe(e, Tt(e, t), i, r);
    }
    function Xi(e, t) {
      if (t >= e.display.viewFrom && t < e.display.viewTo)
        return e.display.view[ct(e, t)];
      var i = e.display.externalMeasured;
      if (i && t >= i.lineN && t < i.lineN + i.size)
        return i;
    }
    function Tt(e, t) {
      var i = H(t), r = Xi(e, i);
      r && !r.text ? r = null : r && r.changes && (sl(e, r, i, Ji(e)), e.curOp.forceUpdate = !0), r || (r = Ga(e, t));
      var n = pl(r, t, i);
      return {
        line: t,
        view: r,
        rect: null,
        map: n.map,
        cache: n.cache,
        before: n.before,
        hasHeights: !1
      };
    }
    function Oe(e, t, i, r, n) {
      t.before && (i = -1);
      var l = i + (r || ""), o;
      return t.cache.hasOwnProperty(l) ? o = t.cache[l] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (za(e, t.view, t.rect), t.hasHeights = !0), o = Ka(e, t, i, r), o.bogus || (t.cache[l] = o)), {
        left: o.left,
        right: o.right,
        top: n ? o.rtop : o.top,
        bottom: n ? o.rbottom : o.bottom
      };
    }
    var gl = { left: 0, right: 0, top: 0, bottom: 0 };
    function yl(e, t, i) {
      for (var r, n, l, o, a, s, u = 0; u < e.length; u += 3)
        if (a = e[u], s = e[u + 1], t < a ? (n = 0, l = 1, o = "left") : t < s ? (n = t - a, l = n + 1) : (u == e.length - 3 || t == s && e[u + 3] > t) && (l = s - a, n = l - 1, t >= s && (o = "right")), n != null) {
          if (r = e[u + 2], a == s && i == (r.insertLeft ? "left" : "right") && (o = i), i == "left" && n == 0)
            for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; )
              r = e[(u -= 3) + 2], o = "left";
          if (i == "right" && n == s - a)
            for (; u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft; )
              r = e[(u += 3) + 2], o = "right";
          break;
        }
      return { node: r, start: n, end: l, collapse: o, coverStart: a, coverEnd: s };
    }
    function Ua(e, t) {
      var i = gl;
      if (t == "left")
        for (var r = 0; r < e.length && (i = e[r]).left == i.right; r++)
          ;
      else
        for (var n = e.length - 1; n >= 0 && (i = e[n]).left == i.right; n--)
          ;
      return i;
    }
    function Ka(e, t, i, r) {
      var n = yl(t.map, i, r), l = n.node, o = n.start, a = n.end, s = n.collapse, u;
      if (l.nodeType == 3) {
        for (var f = 0; f < 4; f++) {
          for (; o && xi(t.line.text.charAt(n.coverStart + o)); )
            --o;
          for (; n.coverStart + a < n.coverEnd && xi(t.line.text.charAt(n.coverStart + a)); )
            ++a;
          if (A && E < 9 && o == 0 && a == n.coverEnd - n.coverStart ? u = l.parentNode.getBoundingClientRect() : u = Ua(it(l, o, a).getClientRects(), r), u.left || u.right || o == 0)
            break;
          a = o, o = o - 1, s = "right";
        }
        A && E < 11 && (u = _a(e.display.measure, u));
      } else {
        o > 0 && (s = r = "right");
        var h;
        e.options.lineWrapping && (h = l.getClientRects()).length > 1 ? u = h[r == "right" ? h.length - 1 : 0] : u = l.getBoundingClientRect();
      }
      if (A && E < 9 && !o && (!u || !u.left && !u.right)) {
        var d = l.parentNode.getClientRects()[0];
        d ? u = { left: d.left, right: d.left + Dt(e.display), top: d.top, bottom: d.bottom } : u = gl;
      }
      for (var c = u.top - t.rect.top, p = u.bottom - t.rect.top, v = (c + p) / 2, y = t.view.measure.heights, m = 0; m < y.length - 1 && !(v < y[m]); m++)
        ;
      var x = m ? y[m - 1] : 0, b = y[m], C = {
        left: (s == "right" ? u.right : u.left) - t.rect.left,
        right: (s == "left" ? u.left : u.right) - t.rect.left,
        top: x,
        bottom: b
      };
      return !u.left && !u.right && (C.bogus = !0), e.options.singleCursorHeightPerLine || (C.rtop = c, C.rbottom = p), C;
    }
    function _a(e, t) {
      if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !la(e))
        return t;
      var i = screen.logicalXDPI / screen.deviceXDPI, r = screen.logicalYDPI / screen.deviceYDPI;
      return {
        left: t.left * i,
        right: t.right * i,
        top: t.top * r,
        bottom: t.bottom * r
      };
    }
    function ml(e) {
      if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
        for (var t = 0; t < e.rest.length; t++)
          e.measure.caches[t] = {};
    }
    function bl(e) {
      e.display.externalMeasure = null, Ge(e.display.lineMeasure);
      for (var t = 0; t < e.display.view.length; t++)
        ml(e.display.view[t]);
    }
    function ir(e) {
      bl(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
    }
    function xl(e) {
      return et && Dr ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft)) : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
    }
    function Cl(e) {
      return et && Dr ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop)) : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
    }
    function Yi(e) {
      var t = Se(e), i = t.widgets, r = 0;
      if (i)
        for (var n = 0; n < i.length; ++n)
          i[n].above && (r += rr(i[n]));
      return r;
    }
    function Xr(e, t, i, r, n) {
      if (!n) {
        var l = Yi(t);
        i.top += l, i.bottom += l;
      }
      if (r == "line")
        return i;
      r || (r = "local");
      var o = Ee(t);
      if (r == "local" ? o += _r(e.display) : o -= e.display.viewOffset, r == "page" || r == "window") {
        var a = e.display.lineSpace.getBoundingClientRect();
        o += a.top + (r == "window" ? 0 : Cl(we(e)));
        var s = a.left + (r == "window" ? 0 : xl(we(e)));
        i.left += s, i.right += s;
      }
      return i.top += o, i.bottom += o, i;
    }
    function wl(e, t, i) {
      if (i == "div")
        return t;
      var r = t.left, n = t.top;
      if (i == "page")
        r -= xl(we(e)), n -= Cl(we(e));
      else if (i == "local" || !i) {
        var l = e.display.sizer.getBoundingClientRect();
        r += l.left, n += l.top;
      }
      var o = e.display.lineSpace.getBoundingClientRect();
      return { left: r - o.left, top: n - o.top };
    }
    function Yr(e, t, i, r, n) {
      return r || (r = w(e.doc, t.line)), Xr(e, r, vl(e, r, t.ch, n), i);
    }
    function Le(e, t, i, r, n, l) {
      r = r || w(e.doc, t.line), n || (n = Tt(e, r));
      function o(p, v) {
        var y = Oe(e, n, p, v ? "right" : "left", l);
        return v ? y.left = y.right : y.right = y.left, Xr(e, r, y, i);
      }
      var a = Fe(r, e.doc.direction), s = t.ch, u = t.sticky;
      if (s >= r.text.length ? (s = r.text.length, u = "before") : s <= 0 && (s = 0, u = "after"), !a)
        return o(u == "before" ? s - 1 : s, u == "before");
      function f(p, v, y) {
        var m = a[v], x = m.level == 1;
        return o(y ? p - 1 : p, x != y);
      }
      var h = Qt(a, s, u), d = Zt, c = f(s, h, u == "before");
      return d != null && (c.other = f(s, d, u != "before")), c;
    }
    function Sl(e, t) {
      var i = 0;
      t = D(e.doc, t), e.options.lineWrapping || (i = Dt(e.display) * t.ch);
      var r = w(e.doc, t.line), n = Ee(r) + _r(e.display);
      return { left: i, right: i, top: n, bottom: n + r.height };
    }
    function qi(e, t, i, r, n) {
      var l = g(e, t, i);
      return l.xRel = n, r && (l.outside = r), l;
    }
    function Zi(e, t, i) {
      var r = e.doc;
      if (i += e.display.viewOffset, i < 0)
        return qi(r.first, 0, null, -1, -1);
      var n = st(r, i), l = r.first + r.size - 1;
      if (n > l)
        return qi(r.first + r.size - 1, w(r, l).text.length, null, 1, 1);
      t < 0 && (t = 0);
      for (var o = w(r, n); ; ) {
        var a = Xa(e, o, n, t, i), s = ba(o, a.ch + (a.xRel > 0 || a.outside > 0 ? 1 : 0));
        if (!s)
          return a;
        var u = s.find(1);
        if (u.line == n)
          return u;
        o = w(r, n = u.line);
      }
    }
    function Ll(e, t, i, r) {
      r -= Yi(t);
      var n = t.text.length, l = qt(function(o) {
        return Oe(e, i, o - 1).bottom <= r;
      }, n, 0);
      return n = qt(function(o) {
        return Oe(e, i, o).top > r;
      }, l, n), { begin: l, end: n };
    }
    function kl(e, t, i, r) {
      i || (i = Tt(e, t));
      var n = Xr(e, t, Oe(e, i, r), "line").top;
      return Ll(e, t, i, n);
    }
    function Qi(e, t, i, r) {
      return e.bottom <= i ? !1 : e.top > i ? !0 : (r ? e.left : e.right) > t;
    }
    function Xa(e, t, i, r, n) {
      n -= Ee(t);
      var l = Tt(e, t), o = Yi(t), a = 0, s = t.text.length, u = !0, f = Fe(t, e.doc.direction);
      if (f) {
        var h = (e.options.lineWrapping ? qa : Ya)(e, t, i, l, f, r, n);
        u = h.level != 1, a = u ? h.from : h.to - 1, s = u ? h.to : h.from - 1;
      }
      var d = null, c = null, p = qt(function(L) {
        var S = Oe(e, l, L);
        return S.top += o, S.bottom += o, Qi(S, r, n, !1) ? (S.top <= n && S.left <= r && (d = L, c = S), !0) : !1;
      }, a, s), v, y, m = !1;
      if (c) {
        var x = r - c.left < c.right - r, b = x == u;
        p = d + (b ? 0 : 1), y = b ? "after" : "before", v = x ? c.left : c.right;
      } else {
        !u && (p == s || p == a) && p++, y = p == 0 ? "after" : p == t.text.length ? "before" : Oe(e, l, p - (u ? 1 : 0)).bottom + o <= n == u ? "after" : "before";
        var C = Le(e, g(i, p, y), "line", t, l);
        v = C.left, m = n < C.top ? -1 : n >= C.bottom ? 1 : 0;
      }
      return p = Pn(t.text, p, 1), qi(i, p, y, m, r - v);
    }
    function Ya(e, t, i, r, n, l, o) {
      var a = qt(function(h) {
        var d = n[h], c = d.level != 1;
        return Qi(Le(
          e,
          g(i, c ? d.to : d.from, c ? "before" : "after"),
          "line",
          t,
          r
        ), l, o, !0);
      }, 0, n.length - 1), s = n[a];
      if (a > 0) {
        var u = s.level != 1, f = Le(
          e,
          g(i, u ? s.from : s.to, u ? "after" : "before"),
          "line",
          t,
          r
        );
        Qi(f, l, o, !0) && f.top > o && (s = n[a - 1]);
      }
      return s;
    }
    function qa(e, t, i, r, n, l, o) {
      var a = Ll(e, t, r, o), s = a.begin, u = a.end;
      /\s/.test(t.text.charAt(u - 1)) && u--;
      for (var f = null, h = null, d = 0; d < n.length; d++) {
        var c = n[d];
        if (!(c.from >= u || c.to <= s)) {
          var p = c.level != 1, v = Oe(e, r, p ? Math.min(u, c.to) - 1 : Math.max(s, c.from)).right, y = v < l ? l - v + 1e9 : v - l;
          (!f || h > y) && (f = c, h = y);
        }
      }
      return f || (f = n[n.length - 1]), f.from < s && (f = { from: s, to: f.to, level: f.level }), f.to > u && (f = { from: f.from, to: u, level: f.level }), f;
    }
    var ft;
    function Mt(e) {
      if (e.cachedTextHeight != null)
        return e.cachedTextHeight;
      if (ft == null) {
        ft = k("pre", null, "CodeMirror-line-like");
        for (var t = 0; t < 49; ++t)
          ft.appendChild(document.createTextNode("x")), ft.appendChild(k("br"));
        ft.appendChild(document.createTextNode("x"));
      }
      pe(e.measure, ft);
      var i = ft.offsetHeight / 50;
      return i > 3 && (e.cachedTextHeight = i), Ge(e.measure), i || 1;
    }
    function Dt(e) {
      if (e.cachedCharWidth != null)
        return e.cachedCharWidth;
      var t = k("span", "xxxxxxxxxx"), i = k("pre", [t], "CodeMirror-line-like");
      pe(e.measure, i);
      var r = t.getBoundingClientRect(), n = (r.right - r.left) / 10;
      return n > 2 && (e.cachedCharWidth = n), n || 10;
    }
    function Ji(e) {
      for (var t = e.display, i = {}, r = {}, n = t.gutters.clientLeft, l = t.gutters.firstChild, o = 0; l; l = l.nextSibling, ++o) {
        var a = e.display.gutterSpecs[o].className;
        i[a] = l.offsetLeft + l.clientLeft + n, r[a] = l.clientWidth;
      }
      return {
        fixedPos: ji(t),
        gutterTotalWidth: t.gutters.offsetWidth,
        gutterLeft: i,
        gutterWidth: r,
        wrapperWidth: t.wrapper.clientWidth
      };
    }
    function ji(e) {
      return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
    }
    function Tl(e) {
      var t = Mt(e.display), i = e.options.lineWrapping, r = i && Math.max(5, e.display.scroller.clientWidth / Dt(e.display) - 3);
      return function(n) {
        if (_e(e.doc, n))
          return 0;
        var l = 0;
        if (n.widgets)
          for (var o = 0; o < n.widgets.length; o++)
            n.widgets[o].height && (l += n.widgets[o].height);
        return i ? l + (Math.ceil(n.text.length / r) || 1) * t : l + t;
      };
    }
    function Vi(e) {
      var t = e.doc, i = Tl(e);
      t.iter(function(r) {
        var n = i(r);
        n != r.height && De(r, n);
      });
    }
    function ht(e, t, i, r) {
      var n = e.display;
      if (!i && Si(t).getAttribute("cm-not-content") == "true")
        return null;
      var l, o, a = n.lineSpace.getBoundingClientRect();
      try {
        l = t.clientX - a.left, o = t.clientY - a.top;
      } catch {
        return null;
      }
      var s = Zi(e, l, o), u;
      if (r && s.xRel > 0 && (u = w(e.doc, s.line).text).length == s.ch) {
        var f = be(u, u.length, e.options.tabSize) - u.length;
        s = g(s.line, Math.max(0, Math.round((l - dl(e.display).left) / Dt(e.display)) - f));
      }
      return s;
    }
    function ct(e, t) {
      if (t >= e.display.viewTo || (t -= e.display.viewFrom, t < 0))
        return null;
      for (var i = e.display.view, r = 0; r < i.length; r++)
        if (t -= i[r].size, t < 0)
          return r;
    }
    function ae(e, t, i, r) {
      t == null && (t = e.doc.first), i == null && (i = e.doc.first + e.doc.size), r || (r = 0);
      var n = e.display;
      if (r && i < n.viewTo && (n.updateLineNumbers == null || n.updateLineNumbers > t) && (n.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= n.viewTo)
        Pe && Ri(e.doc, t) < n.viewTo && Ye(e);
      else if (i <= n.viewFrom)
        Pe && il(e.doc, i + r) > n.viewFrom ? Ye(e) : (n.viewFrom += r, n.viewTo += r);
      else if (t <= n.viewFrom && i >= n.viewTo)
        Ye(e);
      else if (t <= n.viewFrom) {
        var l = qr(e, i, i + r, 1);
        l ? (n.view = n.view.slice(l.index), n.viewFrom = l.lineN, n.viewTo += r) : Ye(e);
      } else if (i >= n.viewTo) {
        var o = qr(e, t, t, -1);
        o ? (n.view = n.view.slice(0, o.index), n.viewTo = o.lineN) : Ye(e);
      } else {
        var a = qr(e, t, t, -1), s = qr(e, i, i + r, 1);
        a && s ? (n.view = n.view.slice(0, a.index).concat(Kr(e, a.lineN, s.lineN)).concat(n.view.slice(s.index)), n.viewTo += r) : Ye(e);
      }
      var u = n.externalMeasured;
      u && (i < u.lineN ? u.lineN += r : t < u.lineN + u.size && (n.externalMeasured = null));
    }
    function Xe(e, t, i) {
      e.curOp.viewChanged = !0;
      var r = e.display, n = e.display.externalMeasured;
      if (n && t >= n.lineN && t < n.lineN + n.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
        var l = r.view[ct(e, t)];
        if (l.node != null) {
          var o = l.changes || (l.changes = []);
          $(o, i) == -1 && o.push(i);
        }
      }
    }
    function Ye(e) {
      e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
    }
    function qr(e, t, i, r) {
      var n = ct(e, t), l, o = e.display.view;
      if (!Pe || i == e.doc.first + e.doc.size)
        return { index: n, lineN: i };
      for (var a = e.display.viewFrom, s = 0; s < n; s++)
        a += o[s].size;
      if (a != t) {
        if (r > 0) {
          if (n == o.length - 1)
            return null;
          l = a + o[n].size - t, n++;
        } else
          l = a - t;
        t += l, i += l;
      }
      for (; Ri(e.doc, i) != i; ) {
        if (n == (r < 0 ? 0 : o.length - 1))
          return null;
        i += r * o[n - (r < 0 ? 1 : 0)].size, n += r;
      }
      return { index: n, lineN: i };
    }
    function Za(e, t, i) {
      var r = e.display, n = r.view;
      n.length == 0 || t >= r.viewTo || i <= r.viewFrom ? (r.view = Kr(e, t, i), r.viewFrom = t) : (r.viewFrom > t ? r.view = Kr(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(ct(e, t))), r.viewFrom = t, r.viewTo < i ? r.view = r.view.concat(Kr(e, r.viewTo, i)) : r.viewTo > i && (r.view = r.view.slice(0, ct(e, i)))), r.viewTo = i;
    }
    function Ml(e) {
      for (var t = e.display.view, i = 0, r = 0; r < t.length; r++) {
        var n = t[r];
        !n.hidden && (!n.node || n.changes) && ++i;
      }
      return i;
    }
    function nr(e) {
      e.display.input.showSelection(e.display.input.prepareSelection());
    }
    function Dl(e, t) {
      t === void 0 && (t = !0);
      var i = e.doc, r = {}, n = r.cursors = document.createDocumentFragment(), l = r.selection = document.createDocumentFragment(), o = e.options.$customCursor;
      o && (t = !0);
      for (var a = 0; a < i.sel.ranges.length; a++)
        if (!(!t && a == i.sel.primIndex)) {
          var s = i.sel.ranges[a];
          if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
            var u = s.empty();
            if (o) {
              var f = o(e, s);
              f && $i(e, f, n);
            } else (u || e.options.showCursorWhenSelecting) && $i(e, s.head, n);
            u || Qa(e, s, l);
          }
        }
      return r;
    }
    function $i(e, t, i) {
      var r = Le(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), n = i.appendChild(k("div", " ", "CodeMirror-cursor"));
      if (n.style.left = r.left + "px", n.style.top = r.top + "px", n.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
        var l = Yr(e, t, "div", null, null), o = l.right - l.left;
        n.style.width = (o > 0 ? o : e.defaultCharWidth()) + "px";
      }
      if (r.other) {
        var a = i.appendChild(k("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
        a.style.display = "", a.style.left = r.other.left + "px", a.style.top = r.other.top + "px", a.style.height = (r.other.bottom - r.other.top) * 0.85 + "px";
      }
    }
    function Zr(e, t) {
      return e.top - t.top || e.left - t.left;
    }
    function Qa(e, t, i) {
      var r = e.display, n = e.doc, l = document.createDocumentFragment(), o = dl(e.display), a = o.left, s = Math.max(r.sizerWidth, ut(e) - r.sizer.offsetLeft) - o.right, u = n.direction == "ltr";
      function f(b, C, L, S) {
        C < 0 && (C = 0), C = Math.round(C), S = Math.round(S), l.appendChild(k("div", null, "CodeMirror-selected", "position: absolute; left: " + b + `px;
                             top: ` + C + "px; width: " + (L ?? s - b) + `px;
                             height: ` + (S - C) + "px"));
      }
      function h(b, C, L) {
        var S = w(n, b), N = S.text.length, P, J;
        function B(K, fe) {
          return Yr(e, g(b, K), "div", S, fe);
        }
        function de(K, fe, V) {
          var X = kl(e, S, null, K), _ = fe == "ltr" == (V == "after") ? "left" : "right", R = V == "after" ? X.begin : X.end - (/\s/.test(S.text.charAt(X.end - 1)) ? 2 : 1);
          return B(R, _)[_];
        }
        var ue = Fe(S, n.direction);
        return Vo(ue, C || 0, L ?? N, function(K, fe, V, X) {
          var _ = V == "ltr", R = B(K, _ ? "left" : "right"), he = B(fe - 1, _ ? "right" : "left"), Gt = C == null && K == 0, Ve = L == null && fe == N, te = X == 0, We = !ue || X == ue.length - 1;
          if (he.top - R.top <= 3) {
            var j = (u ? Gt : Ve) && te, Tn = (u ? Ve : Gt) && We, ze = j ? a : (_ ? R : he).left, yt = Tn ? s : (_ ? he : R).right;
            f(ze, R.top, yt - ze, R.bottom);
          } else {
            var mt, le, Ut, Mn;
            _ ? (mt = u && Gt && te ? a : R.left, le = u ? s : de(K, V, "before"), Ut = u ? a : de(fe, V, "after"), Mn = u && Ve && We ? s : he.right) : (mt = u ? de(K, V, "before") : a, le = !u && Gt && te ? s : R.right, Ut = !u && Ve && We ? a : he.left, Mn = u ? de(fe, V, "after") : s), f(mt, R.top, le - mt, R.bottom), R.bottom < he.top && f(a, R.bottom, null, he.top), f(Ut, he.top, Mn - Ut, he.bottom);
          }
          (!P || Zr(R, P) < 0) && (P = R), Zr(he, P) < 0 && (P = he), (!J || Zr(R, J) < 0) && (J = R), Zr(he, J) < 0 && (J = he);
        }), { start: P, end: J };
      }
      var d = t.from(), c = t.to();
      if (d.line == c.line)
        h(d.line, d.ch, c.ch);
      else {
        var p = w(n, d.line), v = w(n, c.line), y = Se(p) == Se(v), m = h(d.line, d.ch, y ? p.text.length + 1 : null).end, x = h(c.line, y ? 0 : null, c.ch).start;
        y && (m.top < x.top - 2 ? (f(m.right, m.top, null, m.bottom), f(a, x.top, x.left, x.bottom)) : f(m.right, m.top, x.left - m.right, m.bottom)), m.bottom < x.top && f(a, m.bottom, null, x.top);
      }
      i.appendChild(l);
    }
    function en(e) {
      if (e.state.focused) {
        var t = e.display;
        clearInterval(t.blinker);
        var i = !0;
        t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
          e.hasFocus() || Nt(e), t.cursorDiv.style.visibility = (i = !i) ? "" : "hidden";
        }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
      }
    }
    function Nl(e) {
      e.hasFocus() || (e.display.input.focus(), e.state.focused || rn(e));
    }
    function tn(e) {
      e.state.delayingBlurEvent = !0, setTimeout(function() {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && Nt(e));
      }, 100);
    }
    function rn(e, t) {
      e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), e.options.readOnly != "nocursor" && (e.state.focused || (G(e, "focus", e, t), e.state.focused = !0, nt(e.display.wrapper, "CodeMirror-focused"), !e.curOp && e.display.selForContextMenu != e.doc.sel && (e.display.input.reset(), ie && setTimeout(function() {
        return e.display.input.reset(!0);
      }, 20)), e.display.input.receivedFocus()), en(e));
    }
    function Nt(e, t) {
      e.state.delayingBlurEvent || (e.state.focused && (G(e, "blur", e, t), e.state.focused = !1, rt(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
        e.state.focused || (e.display.shift = !1);
      }, 150));
    }
    function Qr(e) {
      for (var t = e.display, i = t.lineDiv.offsetTop, r = Math.max(0, t.scroller.getBoundingClientRect().top), n = t.lineDiv.getBoundingClientRect().top, l = 0, o = 0; o < t.view.length; o++) {
        var a = t.view[o], s = e.options.lineWrapping, u = void 0, f = 0;
        if (!a.hidden) {
          if (n += a.line.height, A && E < 8) {
            var h = a.node.offsetTop + a.node.offsetHeight;
            u = h - i, i = h;
          } else {
            var d = a.node.getBoundingClientRect();
            u = d.bottom - d.top, !s && a.text.firstChild && (f = a.text.firstChild.getBoundingClientRect().right - d.left - 1);
          }
          var c = a.line.height - u;
          if ((c > 5e-3 || c < -5e-3) && (n < r && (l -= c), De(a.line, u), Al(a.line), a.rest))
            for (var p = 0; p < a.rest.length; p++)
              Al(a.rest[p]);
          if (f > e.display.sizerWidth) {
            var v = Math.ceil(f / Dt(e.display));
            v > e.display.maxLineLength && (e.display.maxLineLength = v, e.display.maxLine = a.line, e.display.maxLineChanged = !0);
          }
        }
      }
      Math.abs(l) > 2 && (t.scroller.scrollTop += l);
    }
    function Al(e) {
      if (e.widgets)
        for (var t = 0; t < e.widgets.length; ++t) {
          var i = e.widgets[t], r = i.node.parentNode;
          r && (i.height = r.offsetHeight);
        }
    }
    function Jr(e, t, i) {
      var r = i && i.top != null ? Math.max(0, i.top) : e.scroller.scrollTop;
      r = Math.floor(r - _r(e));
      var n = i && i.bottom != null ? i.bottom : r + e.wrapper.clientHeight, l = st(t, r), o = st(t, n);
      if (i && i.ensure) {
        var a = i.ensure.from.line, s = i.ensure.to.line;
        a < l ? (l = a, o = st(t, Ee(w(t, a)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= o && (l = st(t, Ee(w(t, s)) - e.wrapper.clientHeight), o = s);
      }
      return { from: l, to: Math.max(o, l + 1) };
    }
    function Ja(e, t) {
      if (!Y(e, "scrollCursorIntoView")) {
        var i = e.display, r = i.sizer.getBoundingClientRect(), n = null, l = i.wrapper.ownerDocument;
        if (t.top + r.top < 0 ? n = !0 : t.bottom + r.top > (l.defaultView.innerHeight || l.documentElement.clientHeight) && (n = !1), n != null && !Yo) {
          var o = k("div", "​", null, `position: absolute;
                         top: ` + (t.top - i.viewOffset - _r(e.display)) + `px;
                         height: ` + (t.bottom - t.top + Ae(e) + i.barHeight) + `px;
                         left: ` + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
          e.display.lineSpace.appendChild(o), o.scrollIntoView(n), e.display.lineSpace.removeChild(o);
        }
      }
    }
    function ja(e, t, i, r) {
      r == null && (r = 0);
      var n;
      !e.options.lineWrapping && t == i && (i = t.sticky == "before" ? g(t.line, t.ch + 1, "before") : t, t = t.ch ? g(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after") : t);
      for (var l = 0; l < 5; l++) {
        var o = !1, a = Le(e, t), s = !i || i == t ? a : Le(e, i);
        n = {
          left: Math.min(a.left, s.left),
          top: Math.min(a.top, s.top) - r,
          right: Math.max(a.left, s.left),
          bottom: Math.max(a.bottom, s.bottom) + r
        };
        var u = nn(e, n), f = e.doc.scrollTop, h = e.doc.scrollLeft;
        if (u.scrollTop != null && (or(e, u.scrollTop), Math.abs(e.doc.scrollTop - f) > 1 && (o = !0)), u.scrollLeft != null && (dt(e, u.scrollLeft), Math.abs(e.doc.scrollLeft - h) > 1 && (o = !0)), !o)
          break;
      }
      return n;
    }
    function Va(e, t) {
      var i = nn(e, t);
      i.scrollTop != null && or(e, i.scrollTop), i.scrollLeft != null && dt(e, i.scrollLeft);
    }
    function nn(e, t) {
      var i = e.display, r = Mt(e.display);
      t.top < 0 && (t.top = 0);
      var n = e.curOp && e.curOp.scrollTop != null ? e.curOp.scrollTop : i.scroller.scrollTop, l = _i(e), o = {};
      t.bottom - t.top > l && (t.bottom = t.top + l);
      var a = e.doc.height + Ki(i), s = t.top < r, u = t.bottom > a - r;
      if (t.top < n)
        o.scrollTop = s ? 0 : t.top;
      else if (t.bottom > n + l) {
        var f = Math.min(t.top, (u ? a : t.bottom) - l);
        f != n && (o.scrollTop = f);
      }
      var h = e.options.fixedGutter ? 0 : i.gutters.offsetWidth, d = e.curOp && e.curOp.scrollLeft != null ? e.curOp.scrollLeft : i.scroller.scrollLeft - h, c = ut(e) - i.gutters.offsetWidth, p = t.right - t.left > c;
      return p && (t.right = t.left + c), t.left < 10 ? o.scrollLeft = 0 : t.left < d ? o.scrollLeft = Math.max(0, t.left + h - (p ? 0 : 10)) : t.right > c + d - 3 && (o.scrollLeft = t.right + (p ? 0 : 10) - c), o;
    }
    function ln(e, t) {
      t != null && (jr(e), e.curOp.scrollTop = (e.curOp.scrollTop == null ? e.doc.scrollTop : e.curOp.scrollTop) + t);
    }
    function At(e) {
      jr(e);
      var t = e.getCursor();
      e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin };
    }
    function lr(e, t, i) {
      (t != null || i != null) && jr(e), t != null && (e.curOp.scrollLeft = t), i != null && (e.curOp.scrollTop = i);
    }
    function $a(e, t) {
      jr(e), e.curOp.scrollToPos = t;
    }
    function jr(e) {
      var t = e.curOp.scrollToPos;
      if (t) {
        e.curOp.scrollToPos = null;
        var i = Sl(e, t.from), r = Sl(e, t.to);
        Ol(e, i, r, t.margin);
      }
    }
    function Ol(e, t, i, r) {
      var n = nn(e, {
        left: Math.min(t.left, i.left),
        top: Math.min(t.top, i.top) - r,
        right: Math.max(t.right, i.right),
        bottom: Math.max(t.bottom, i.bottom) + r
      });
      lr(e, n.scrollLeft, n.scrollTop);
    }
    function or(e, t) {
      Math.abs(e.doc.scrollTop - t) < 2 || (He || an(e, { top: t }), Wl(e, t, !0), He && an(e), ur(e, 100));
    }
    function Wl(e, t, i) {
      t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), !(e.display.scroller.scrollTop == t && !i) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
    }
    function dt(e, t, i, r) {
      t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), !((i ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r) && (e.doc.scrollLeft = t, Il(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
    }
    function ar(e) {
      var t = e.display, i = t.gutters.offsetWidth, r = Math.round(e.doc.height + Ki(e.display));
      return {
        clientHeight: t.scroller.clientHeight,
        viewHeight: t.wrapper.clientHeight,
        scrollWidth: t.scroller.scrollWidth,
        clientWidth: t.scroller.clientWidth,
        viewWidth: t.wrapper.clientWidth,
        barLeft: e.options.fixedGutter ? i : 0,
        docHeight: r,
        scrollHeight: r + Ae(e) + t.barHeight,
        nativeBarWidth: t.nativeBarWidth,
        gutterWidth: i
      };
    }
    var pt = function(e, t, i) {
      this.cm = i;
      var r = this.vert = k("div", [k("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), n = this.horiz = k("div", [k("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
      r.tabIndex = n.tabIndex = -1, e(r), e(n), T(r, "scroll", function() {
        r.clientHeight && t(r.scrollTop, "vertical");
      }), T(n, "scroll", function() {
        n.clientWidth && t(n.scrollLeft, "horizontal");
      }), this.checkedZeroWidth = !1, A && E < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
    };
    pt.prototype.update = function(e) {
      var t = e.scrollWidth > e.clientWidth + 1, i = e.scrollHeight > e.clientHeight + 1, r = e.nativeBarWidth;
      if (i) {
        this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
        var n = e.viewHeight - (t ? r : 0);
        this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + n) + "px";
      } else
        this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
      if (t) {
        this.horiz.style.display = "block", this.horiz.style.right = i ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
        var l = e.viewWidth - e.barLeft - (i ? r : 0);
        this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + l) + "px";
      } else
        this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
      return !this.checkedZeroWidth && e.clientHeight > 0 && (r == 0 && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: i ? r : 0, bottom: t ? r : 0 };
    }, pt.prototype.setScrollLeft = function(e) {
      this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
    }, pt.prototype.setScrollTop = function(e) {
      this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
    }, pt.prototype.zeroWidthHack = function() {
      var e = ye && !Xo ? "12px" : "18px";
      this.horiz.style.height = this.vert.style.width = e, this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new Ke(), this.disableVert = new Ke();
    }, pt.prototype.enableZeroWidthBar = function(e, t, i) {
      e.style.visibility = "";
      function r() {
        var n = e.getBoundingClientRect(), l = i == "vert" ? document.elementFromPoint(n.right - 1, (n.top + n.bottom) / 2) : document.elementFromPoint((n.right + n.left) / 2, n.bottom - 1);
        l != e ? e.style.visibility = "hidden" : t.set(1e3, r);
      }
      t.set(1e3, r);
    }, pt.prototype.clear = function() {
      var e = this.horiz.parentNode;
      e.removeChild(this.horiz), e.removeChild(this.vert);
    };
    var sr = function() {
    };
    sr.prototype.update = function() {
      return { bottom: 0, right: 0 };
    }, sr.prototype.setScrollLeft = function() {
    }, sr.prototype.setScrollTop = function() {
    }, sr.prototype.clear = function() {
    };
    function Ot(e, t) {
      t || (t = ar(e));
      var i = e.display.barWidth, r = e.display.barHeight;
      Hl(e, t);
      for (var n = 0; n < 4 && i != e.display.barWidth || r != e.display.barHeight; n++)
        i != e.display.barWidth && e.options.lineWrapping && Qr(e), Hl(e, ar(e)), i = e.display.barWidth, r = e.display.barHeight;
    }
    function Hl(e, t) {
      var i = e.display, r = i.scrollbars.update(t);
      i.sizer.style.paddingRight = (i.barWidth = r.right) + "px", i.sizer.style.paddingBottom = (i.barHeight = r.bottom) + "px", i.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (i.scrollbarFiller.style.display = "block", i.scrollbarFiller.style.height = r.bottom + "px", i.scrollbarFiller.style.width = r.right + "px") : i.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (i.gutterFiller.style.display = "block", i.gutterFiller.style.height = r.bottom + "px", i.gutterFiller.style.width = t.gutterWidth + "px") : i.gutterFiller.style.display = "";
    }
    var Fl = { native: pt, null: sr };
    function Pl(e) {
      e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && rt(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new Fl[e.options.scrollbarStyle](function(t) {
        e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), T(t, "mousedown", function() {
          e.state.focused && setTimeout(function() {
            return e.display.input.focus();
          }, 0);
        }), t.setAttribute("cm-not-content", "true");
      }, function(t, i) {
        i == "horizontal" ? dt(e, t) : or(e, t);
      }, e), e.display.scrollbars.addClass && nt(e.display.wrapper, e.display.scrollbars.addClass);
    }
    var es = 0;
    function vt(e) {
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
        id: ++es,
        // Unique ID
        markArrays: null
        // Used by addMarkedSpan
      }, Oa(e.curOp);
    }
    function gt(e) {
      var t = e.curOp;
      t && Ha(t, function(i) {
        for (var r = 0; r < i.ops.length; r++)
          i.ops[r].cm.curOp = null;
        ts(i);
      });
    }
    function ts(e) {
      for (var t = e.ops, i = 0; i < t.length; i++)
        rs(t[i]);
      for (var r = 0; r < t.length; r++)
        is(t[r]);
      for (var n = 0; n < t.length; n++)
        ns(t[n]);
      for (var l = 0; l < t.length; l++)
        ls(t[l]);
      for (var o = 0; o < t.length; o++)
        os(t[o]);
    }
    function rs(e) {
      var t = e.cm, i = t.display;
      ss(t), e.updateMaxLine && Gi(t), e.mustUpdate = e.viewChanged || e.forceUpdate || e.scrollTop != null || e.scrollToPos && (e.scrollToPos.from.line < i.viewFrom || e.scrollToPos.to.line >= i.viewTo) || i.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new Vr(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
    }
    function is(e) {
      e.updatedDisplay = e.mustUpdate && on(e.cm, e.update);
    }
    function ns(e) {
      var t = e.cm, i = t.display;
      e.updatedDisplay && Qr(t), e.barMeasure = ar(t), i.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = vl(t, i.maxLine, i.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(i.scroller.clientWidth, i.sizer.offsetLeft + e.adjustWidthTo + Ae(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, i.sizer.offsetLeft + e.adjustWidthTo - ut(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = i.input.prepareSelection());
    }
    function ls(e) {
      var t = e.cm;
      e.adjustWidthTo != null && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && dt(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
      var i = e.focus && e.focus == me(we(t));
      e.preparedSelection && t.display.input.showSelection(e.preparedSelection, i), (e.updatedDisplay || e.startHeight != t.doc.height) && Ot(t, e.barMeasure), e.updatedDisplay && un(t, e.barMeasure), e.selectionChanged && en(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), i && Nl(e.cm);
    }
    function os(e) {
      var t = e.cm, i = t.display, r = t.doc;
      if (e.updatedDisplay && El(t, e.update), i.wheelStartX != null && (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) && (i.wheelStartX = i.wheelStartY = null), e.scrollTop != null && Wl(t, e.scrollTop, e.forceScroll), e.scrollLeft != null && dt(t, e.scrollLeft, !0, !0), e.scrollToPos) {
        var n = ja(
          t,
          D(r, e.scrollToPos.from),
          D(r, e.scrollToPos.to),
          e.scrollToPos.margin
        );
        Ja(t, n);
      }
      var l = e.maybeHiddenMarkers, o = e.maybeUnhiddenMarkers;
      if (l)
        for (var a = 0; a < l.length; ++a)
          l[a].lines.length || G(l[a], "hide");
      if (o)
        for (var s = 0; s < o.length; ++s)
          o[s].lines.length && G(o[s], "unhide");
      i.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && G(t, "changes", t, e.changeObjs), e.update && e.update.finish();
    }
    function ce(e, t) {
      if (e.curOp)
        return t();
      vt(e);
      try {
        return t();
      } finally {
        gt(e);
      }
    }
    function Z(e, t) {
      return function() {
        if (e.curOp)
          return t.apply(e, arguments);
        vt(e);
        try {
          return t.apply(e, arguments);
        } finally {
          gt(e);
        }
      };
    }
    function ne(e) {
      return function() {
        if (this.curOp)
          return e.apply(this, arguments);
        vt(this);
        try {
          return e.apply(this, arguments);
        } finally {
          gt(this);
        }
      };
    }
    function Q(e) {
      return function() {
        var t = this.cm;
        if (!t || t.curOp)
          return e.apply(this, arguments);
        vt(t);
        try {
          return e.apply(this, arguments);
        } finally {
          gt(t);
        }
      };
    }
    function ur(e, t) {
      e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, vi(as, e));
    }
    function as(e) {
      var t = e.doc;
      if (!(t.highlightFrontier >= e.display.viewTo)) {
        var i = +/* @__PURE__ */ new Date() + e.options.workTime, r = Vt(e, t.highlightFrontier), n = [];
        t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(l) {
          if (r.line >= e.display.viewFrom) {
            var o = l.styles, a = l.text.length > e.options.maxHighlightLength ? ot(t.mode, r.state) : null, s = Kn(e, l, r, !0);
            a && (r.state = a), l.styles = s.styles;
            var u = l.styleClasses, f = s.classes;
            f ? l.styleClasses = f : u && (l.styleClasses = null);
            for (var h = !o || o.length != l.styles.length || u != f && (!u || !f || u.bgClass != f.bgClass || u.textClass != f.textClass), d = 0; !h && d < o.length; ++d)
              h = o[d] != l.styles[d];
            h && n.push(r.line), l.stateAfter = r.save(), r.nextLine();
          } else
            l.text.length <= e.options.maxHighlightLength && Pi(e, l.text, r), l.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
          if (+/* @__PURE__ */ new Date() > i)
            return ur(e, e.options.workDelay), !0;
        }), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), n.length && ce(e, function() {
          for (var l = 0; l < n.length; l++)
            Xe(e, n[l], "text");
        });
      }
    }
    var Vr = function(e, t, i) {
      var r = e.display;
      this.viewport = t, this.visible = Jr(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = ut(e), this.force = i, this.dims = Ji(e), this.events = [];
    };
    Vr.prototype.signal = function(e, t) {
      xe(e, t) && this.events.push(arguments);
    }, Vr.prototype.finish = function() {
      for (var e = 0; e < this.events.length; e++)
        G.apply(null, this.events[e]);
    };
    function ss(e) {
      var t = e.display;
      !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Ae(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Ae(e) + "px", t.scrollbarsClipped = !0);
    }
    function us(e) {
      if (e.hasFocus())
        return null;
      var t = me(we(e));
      if (!t || !Ue(e.display.lineDiv, t))
        return null;
      var i = { activeElt: t };
      if (window.getSelection) {
        var r = Nr(e).getSelection();
        r.anchorNode && r.extend && Ue(e.display.lineDiv, r.anchorNode) && (i.anchorNode = r.anchorNode, i.anchorOffset = r.anchorOffset, i.focusNode = r.focusNode, i.focusOffset = r.focusOffset);
      }
      return i;
    }
    function fs(e) {
      if (!(!e || !e.activeElt || e.activeElt == me(e.activeElt.ownerDocument)) && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && Ue(document.body, e.anchorNode) && Ue(document.body, e.focusNode))) {
        var t = e.activeElt.ownerDocument, i = t.defaultView.getSelection(), r = t.createRange();
        r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), i.removeAllRanges(), i.addRange(r), i.extend(e.focusNode, e.focusOffset);
      }
    }
    function on(e, t) {
      var i = e.display, r = e.doc;
      if (t.editorIsHidden)
        return Ye(e), !1;
      if (!t.force && t.visible.from >= i.viewFrom && t.visible.to <= i.viewTo && (i.updateLineNumbers == null || i.updateLineNumbers >= i.viewTo) && i.renderedView == i.view && Ml(e) == 0)
        return !1;
      Bl(e) && (Ye(e), t.dims = Ji(e));
      var n = r.first + r.size, l = Math.max(t.visible.from - e.options.viewportMargin, r.first), o = Math.min(n, t.visible.to + e.options.viewportMargin);
      i.viewFrom < l && l - i.viewFrom < 20 && (l = Math.max(r.first, i.viewFrom)), i.viewTo > o && i.viewTo - o < 20 && (o = Math.min(n, i.viewTo)), Pe && (l = Ri(e.doc, l), o = il(e.doc, o));
      var a = l != i.viewFrom || o != i.viewTo || i.lastWrapHeight != t.wrapperHeight || i.lastWrapWidth != t.wrapperWidth;
      Za(e, l, o), i.viewOffset = Ee(w(e.doc, i.viewFrom)), e.display.mover.style.top = i.viewOffset + "px";
      var s = Ml(e);
      if (!a && s == 0 && !t.force && i.renderedView == i.view && (i.updateLineNumbers == null || i.updateLineNumbers >= i.viewTo))
        return !1;
      var u = us(e);
      return s > 4 && (i.lineDiv.style.display = "none"), hs(e, i.updateLineNumbers, t.dims), s > 4 && (i.lineDiv.style.display = ""), i.renderedView = i.view, fs(u), Ge(i.cursorDiv), Ge(i.selectionDiv), i.gutters.style.height = i.sizer.style.minHeight = 0, a && (i.lastWrapHeight = t.wrapperHeight, i.lastWrapWidth = t.wrapperWidth, ur(e, 400)), i.updateLineNumbers = null, !0;
    }
    function El(e, t) {
      for (var i = t.viewport, r = !0; ; r = !1) {
        if (!r || !e.options.lineWrapping || t.oldDisplayWidth == ut(e)) {
          if (i && i.top != null && (i = { top: Math.min(e.doc.height + Ki(e.display) - _i(e), i.top) }), t.visible = Jr(e.display, e.doc, i), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
            break;
        } else r && (t.visible = Jr(e.display, e.doc, i));
        if (!on(e, t))
          break;
        Qr(e);
        var n = ar(e);
        nr(e), Ot(e, n), un(e, n), t.force = !1;
      }
      t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
    }
    function an(e, t) {
      var i = new Vr(e, t);
      if (on(e, i)) {
        Qr(e), El(e, i);
        var r = ar(e);
        nr(e), Ot(e, r), un(e, r), i.finish();
      }
    }
    function hs(e, t, i) {
      var r = e.display, n = e.options.lineNumbers, l = r.lineDiv, o = l.firstChild;
      function a(p) {
        var v = p.nextSibling;
        return ie && ye && e.display.currentWheelTarget == p ? p.style.display = "none" : p.parentNode.removeChild(p), v;
      }
      for (var s = r.view, u = r.viewFrom, f = 0; f < s.length; f++) {
        var h = s[f];
        if (!h.hidden) if (!h.node || h.node.parentNode != l) {
          var d = Ba(e, h, u, i);
          l.insertBefore(d, o);
        } else {
          for (; o != h.node; )
            o = a(o);
          var c = n && t != null && t <= u && h.lineNumber;
          h.changes && ($(h.changes, "gutter") > -1 && (c = !1), sl(e, h, u, i)), c && (Ge(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(Wi(e.options, u)))), o = h.node.nextSibling;
        }
        u += h.size;
      }
      for (; o; )
        o = a(o);
    }
    function sn(e) {
      var t = e.gutters.offsetWidth;
      e.sizer.style.marginLeft = t + "px", q(e, "gutterChanged", e);
    }
    function un(e, t) {
      e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Ae(e) + "px";
    }
    function Il(e) {
      var t = e.display, i = t.view;
      if (!(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))) {
        for (var r = ji(t) - t.scroller.scrollLeft + e.doc.scrollLeft, n = t.gutters.offsetWidth, l = r + "px", o = 0; o < i.length; o++)
          if (!i[o].hidden) {
            e.options.fixedGutter && (i[o].gutter && (i[o].gutter.style.left = l), i[o].gutterBackground && (i[o].gutterBackground.style.left = l));
            var a = i[o].alignable;
            if (a)
              for (var s = 0; s < a.length; s++)
                a[s].style.left = l;
          }
        e.options.fixedGutter && (t.gutters.style.left = r + n + "px");
      }
    }
    function Bl(e) {
      if (!e.options.lineNumbers)
        return !1;
      var t = e.doc, i = Wi(e.options, t.first + t.size - 1), r = e.display;
      if (i.length != r.lineNumChars) {
        var n = r.measure.appendChild(k(
          "div",
          [k("div", i)],
          "CodeMirror-linenumber CodeMirror-gutter-elt"
        )), l = n.firstChild.offsetWidth, o = n.offsetWidth - l;
        return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(l, r.lineGutter.offsetWidth - o) + 1, r.lineNumWidth = r.lineNumInnerWidth + o, r.lineNumChars = r.lineNumInnerWidth ? i.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", sn(e.display), !0;
      }
      return !1;
    }
    function fn(e, t) {
      for (var i = [], r = !1, n = 0; n < e.length; n++) {
        var l = e[n], o = null;
        if (typeof l != "string" && (o = l.style, l = l.className), l == "CodeMirror-linenumbers")
          if (t)
            r = !0;
          else
            continue;
        i.push({ className: l, style: o });
      }
      return t && !r && i.push({ className: "CodeMirror-linenumbers", style: null }), i;
    }
    function Rl(e) {
      var t = e.gutters, i = e.gutterSpecs;
      Ge(t), e.lineGutter = null;
      for (var r = 0; r < i.length; ++r) {
        var n = i[r], l = n.className, o = n.style, a = t.appendChild(k("div", null, "CodeMirror-gutter " + l));
        o && (a.style.cssText = o), l == "CodeMirror-linenumbers" && (e.lineGutter = a, a.style.width = (e.lineNumWidth || 1) + "px");
      }
      t.style.display = i.length ? "" : "none", sn(e);
    }
    function fr(e) {
      Rl(e.display), ae(e), Il(e);
    }
    function cs(e, t, i, r) {
      var n = this;
      this.input = i, n.scrollbarFiller = k("div", null, "CodeMirror-scrollbar-filler"), n.scrollbarFiller.setAttribute("cm-not-content", "true"), n.gutterFiller = k("div", null, "CodeMirror-gutter-filler"), n.gutterFiller.setAttribute("cm-not-content", "true"), n.lineDiv = xt("div", null, "CodeMirror-code"), n.selectionDiv = k("div", null, null, "position: relative; z-index: 1"), n.cursorDiv = k("div", null, "CodeMirror-cursors"), n.measure = k("div", null, "CodeMirror-measure"), n.lineMeasure = k("div", null, "CodeMirror-measure"), n.lineSpace = xt(
        "div",
        [n.measure, n.lineMeasure, n.selectionDiv, n.cursorDiv, n.lineDiv],
        null,
        "position: relative; outline: none"
      );
      var l = xt("div", [n.lineSpace], "CodeMirror-lines");
      n.mover = k("div", [l], null, "position: relative"), n.sizer = k("div", [n.mover], "CodeMirror-sizer"), n.sizerWidth = null, n.heightForcer = k("div", null, null, "position: absolute; height: " + On + "px; width: 1px;"), n.gutters = k("div", null, "CodeMirror-gutters"), n.lineGutter = null, n.scroller = k("div", [n.sizer, n.heightForcer, n.gutters], "CodeMirror-scroll"), n.scroller.setAttribute("tabIndex", "-1"), n.wrapper = k("div", [n.scrollbarFiller, n.gutterFiller, n.scroller], "CodeMirror"), n.wrapper.setAttribute("translate", "no"), A && E < 8 && (n.gutters.style.zIndex = -1, n.scroller.style.paddingRight = 0), !ie && !(He && _t) && (n.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(n.wrapper) : e(n.wrapper)), n.viewFrom = n.viewTo = t.first, n.reportedViewFrom = n.reportedViewTo = t.first, n.view = [], n.renderedView = null, n.externalMeasured = null, n.viewOffset = 0, n.lastWrapHeight = n.lastWrapWidth = 0, n.updateLineNumbers = null, n.nativeBarWidth = n.barHeight = n.barWidth = 0, n.scrollbarsClipped = !1, n.lineNumWidth = n.lineNumInnerWidth = n.lineNumChars = null, n.alignWidgets = !1, n.cachedCharWidth = n.cachedTextHeight = n.cachedPaddingH = null, n.maxLine = null, n.maxLineLength = 0, n.maxLineChanged = !1, n.wheelDX = n.wheelDY = n.wheelStartX = n.wheelStartY = null, n.shift = !1, n.selForContextMenu = null, n.activeTouch = null, n.gutterSpecs = fn(r.gutters, r.lineNumbers), Rl(n), i.init(n);
    }
    var $r = 0, Be = null;
    A ? Be = -0.53 : He ? Be = 15 : et ? Be = -0.7 : Mr && (Be = -1 / 3);
    function zl(e) {
      var t = e.wheelDeltaX, i = e.wheelDeltaY;
      return t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), i == null && e.detail && e.axis == e.VERTICAL_AXIS ? i = e.detail : i == null && (i = e.wheelDelta), { x: t, y: i };
    }
    function ds(e) {
      var t = zl(e);
      return t.x *= Be, t.y *= Be, t;
    }
    function Gl(e, t) {
      et && _o == 102 && (e.display.chromeScrollHack == null ? e.display.sizer.style.pointerEvents = "none" : clearTimeout(e.display.chromeScrollHack), e.display.chromeScrollHack = setTimeout(function() {
        e.display.chromeScrollHack = null, e.display.sizer.style.pointerEvents = "";
      }, 100));
      var i = zl(t), r = i.x, n = i.y, l = Be;
      t.deltaMode === 0 && (r = t.deltaX, n = t.deltaY, l = 1);
      var o = e.display, a = o.scroller, s = a.scrollWidth > a.clientWidth, u = a.scrollHeight > a.clientHeight;
      if (r && s || n && u) {
        if (n && ye && ie) {
          e: for (var f = t.target, h = o.view; f != a; f = f.parentNode)
            for (var d = 0; d < h.length; d++)
              if (h[d].node == f) {
                e.display.currentWheelTarget = f;
                break e;
              }
        }
        if (r && !He && !Ce && l != null) {
          n && u && or(e, Math.max(0, a.scrollTop + n * l)), dt(e, Math.max(0, a.scrollLeft + r * l)), (!n || n && u) && oe(t), o.wheelStartX = null;
          return;
        }
        if (n && l != null) {
          var c = n * l, p = e.doc.scrollTop, v = p + o.wrapper.clientHeight;
          c < 0 ? p = Math.max(0, p + c - 50) : v = Math.min(e.doc.height, v + c + 50), an(e, { top: p, bottom: v });
        }
        $r < 20 && t.deltaMode !== 0 && (o.wheelStartX == null ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = r, o.wheelDY = n, setTimeout(function() {
          if (o.wheelStartX != null) {
            var y = a.scrollLeft - o.wheelStartX, m = a.scrollTop - o.wheelStartY, x = m && o.wheelDY && m / o.wheelDY || y && o.wheelDX && y / o.wheelDX;
            o.wheelStartX = o.wheelStartY = null, x && (Be = (Be * $r + x) / ($r + 1), ++$r);
          }
        }, 200)) : (o.wheelDX += r, o.wheelDY += n));
      }
    }
    var ge = function(e, t) {
      this.ranges = e, this.primIndex = t;
    };
    ge.prototype.primary = function() {
      return this.ranges[this.primIndex];
    }, ge.prototype.equals = function(e) {
      if (e == this)
        return !0;
      if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
        return !1;
      for (var t = 0; t < this.ranges.length; t++) {
        var i = this.ranges[t], r = e.ranges[t];
        if (!Hi(i.anchor, r.anchor) || !Hi(i.head, r.head))
          return !1;
      }
      return !0;
    }, ge.prototype.deepCopy = function() {
      for (var e = [], t = 0; t < this.ranges.length; t++)
        e[t] = new O(Fi(this.ranges[t].anchor), Fi(this.ranges[t].head));
      return new ge(e, this.primIndex);
    }, ge.prototype.somethingSelected = function() {
      for (var e = 0; e < this.ranges.length; e++)
        if (!this.ranges[e].empty())
          return !0;
      return !1;
    }, ge.prototype.contains = function(e, t) {
      t || (t = e);
      for (var i = 0; i < this.ranges.length; i++) {
        var r = this.ranges[i];
        if (M(t, r.from()) >= 0 && M(e, r.to()) <= 0)
          return i;
      }
      return -1;
    };
    var O = function(e, t) {
      this.anchor = e, this.head = t;
    };
    O.prototype.from = function() {
      return Er(this.anchor, this.head);
    }, O.prototype.to = function() {
      return Pr(this.anchor, this.head);
    }, O.prototype.empty = function() {
      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
    };
    function ke(e, t, i) {
      var r = e && e.options.selectionsMayTouch, n = t[i];
      t.sort(function(d, c) {
        return M(d.from(), c.from());
      }), i = $(t, n);
      for (var l = 1; l < t.length; l++) {
        var o = t[l], a = t[l - 1], s = M(a.to(), o.from());
        if (r && !o.empty() ? s > 0 : s >= 0) {
          var u = Er(a.from(), o.from()), f = Pr(a.to(), o.to()), h = a.empty() ? o.from() == o.head : a.from() == a.head;
          l <= i && --i, t.splice(--l, 2, new O(h ? f : u, h ? u : f));
        }
      }
      return new ge(t, i);
    }
    function qe(e, t) {
      return new ge([new O(e, t || e)], 0);
    }
    function Ze(e) {
      return e.text ? g(
        e.from.line + e.text.length - 1,
        W(e.text).length + (e.text.length == 1 ? e.from.ch : 0)
      ) : e.to;
    }
    function Ul(e, t) {
      if (M(e, t.from) < 0)
        return e;
      if (M(e, t.to) <= 0)
        return Ze(t);
      var i = e.line + t.text.length - (t.to.line - t.from.line) - 1, r = e.ch;
      return e.line == t.to.line && (r += Ze(t).ch - t.to.ch), g(i, r);
    }
    function hn(e, t) {
      for (var i = [], r = 0; r < e.sel.ranges.length; r++) {
        var n = e.sel.ranges[r];
        i.push(new O(
          Ul(n.anchor, t),
          Ul(n.head, t)
        ));
      }
      return ke(e.cm, i, e.sel.primIndex);
    }
    function Kl(e, t, i) {
      return e.line == t.line ? g(i.line, e.ch - t.ch + i.ch) : g(i.line + (e.line - t.line), e.ch);
    }
    function ps(e, t, i) {
      for (var r = [], n = g(e.first, 0), l = n, o = 0; o < t.length; o++) {
        var a = t[o], s = Kl(a.from, n, l), u = Kl(Ze(a), n, l);
        if (n = a.to, l = u, i == "around") {
          var f = e.sel.ranges[o], h = M(f.head, f.anchor) < 0;
          r[o] = new O(h ? u : s, h ? s : u);
        } else
          r[o] = new O(s, s);
      }
      return new ge(r, e.sel.primIndex);
    }
    function cn(e) {
      e.doc.mode = Ni(e.options, e.doc.modeOption), hr(e);
    }
    function hr(e) {
      e.doc.iter(function(t) {
        t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
      }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, ur(e, 100), e.state.modeGen++, e.curOp && ae(e);
    }
    function _l(e, t) {
      return t.from.ch == 0 && t.to.ch == 0 && W(t.text) == "" && (!e.cm || e.cm.options.wholeLineUpdateBefore);
    }
    function dn(e, t, i, r) {
      function n(x) {
        return i ? i[x] : null;
      }
      function l(x, b, C) {
        wa(x, b, C, r), q(x, "change", x, t);
      }
      function o(x, b) {
        for (var C = [], L = x; L < b; ++L)
          C.push(new Lt(u[L], n(L), r));
        return C;
      }
      var a = t.from, s = t.to, u = t.text, f = w(e, a.line), h = w(e, s.line), d = W(u), c = n(u.length - 1), p = s.line - a.line;
      if (t.full)
        e.insert(0, o(0, u.length)), e.remove(u.length, e.size - u.length);
      else if (_l(e, t)) {
        var v = o(0, u.length - 1);
        l(h, h.text, c), p && e.remove(a.line, p), v.length && e.insert(a.line, v);
      } else if (f == h)
        if (u.length == 1)
          l(f, f.text.slice(0, a.ch) + d + f.text.slice(s.ch), c);
        else {
          var y = o(1, u.length - 1);
          y.push(new Lt(d + f.text.slice(s.ch), c, r)), l(f, f.text.slice(0, a.ch) + u[0], n(0)), e.insert(a.line + 1, y);
        }
      else if (u.length == 1)
        l(f, f.text.slice(0, a.ch) + u[0] + h.text.slice(s.ch), n(0)), e.remove(a.line + 1, p);
      else {
        l(f, f.text.slice(0, a.ch) + u[0], n(0)), l(h, d + h.text.slice(s.ch), c);
        var m = o(1, u.length - 1);
        p > 1 && e.remove(a.line + 1, p - 1), e.insert(a.line + 1, m);
      }
      q(e, "change", e, t);
    }
    function Qe(e, t, i) {
      function r(n, l, o) {
        if (n.linked)
          for (var a = 0; a < n.linked.length; ++a) {
            var s = n.linked[a];
            if (s.doc != l) {
              var u = o && s.sharedHist;
              i && !u || (t(s.doc, u), r(s.doc, n, u));
            }
          }
      }
      r(e, null, !0);
    }
    function Xl(e, t) {
      if (t.cm)
        throw new Error("This document is already in use.");
      e.doc = t, t.cm = e, Vi(e), cn(e), Yl(e), e.options.direction = t.direction, e.options.lineWrapping || Gi(e), e.options.mode = t.modeOption, ae(e);
    }
    function Yl(e) {
      (e.doc.direction == "rtl" ? nt : rt)(e.display.lineDiv, "CodeMirror-rtl");
    }
    function vs(e) {
      ce(e, function() {
        Yl(e), ae(e);
      });
    }
    function ei(e) {
      this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1;
    }
    function pn(e, t) {
      var i = { from: Fi(t.from), to: Ze(t), text: at(e, t.from, t.to) };
      return Ql(e, i, t.from.line, t.to.line + 1), Qe(e, function(r) {
        return Ql(r, i, t.from.line, t.to.line + 1);
      }, !0), i;
    }
    function ql(e) {
      for (; e.length; ) {
        var t = W(e);
        if (t.ranges)
          e.pop();
        else
          break;
      }
    }
    function gs(e, t) {
      if (t)
        return ql(e.done), W(e.done);
      if (e.done.length && !W(e.done).ranges)
        return W(e.done);
      if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
        return e.done.pop(), W(e.done);
    }
    function Zl(e, t, i, r) {
      var n = e.history;
      n.undone.length = 0;
      var l = +/* @__PURE__ */ new Date(), o, a;
      if ((n.lastOp == r || n.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && n.lastModTime > l - (e.cm ? e.cm.options.historyEventDelay : 500) || t.origin.charAt(0) == "*")) && (o = gs(n, n.lastOp == r)))
        a = W(o.changes), M(t.from, t.to) == 0 && M(t.from, a.to) == 0 ? a.to = Ze(t) : o.changes.push(pn(e, t));
      else {
        var s = W(n.done);
        for ((!s || !s.ranges) && ti(e.sel, n.done), o = {
          changes: [pn(e, t)],
          generation: n.generation
        }, n.done.push(o); n.done.length > n.undoDepth; )
          n.done.shift(), n.done[0].ranges || n.done.shift();
      }
      n.done.push(i), n.generation = ++n.maxGeneration, n.lastModTime = n.lastSelTime = l, n.lastOp = n.lastSelOp = r, n.lastOrigin = n.lastSelOrigin = t.origin, a || G(e, "historyAdded");
    }
    function ys(e, t, i, r) {
      var n = t.charAt(0);
      return n == "*" || n == "+" && i.ranges.length == r.ranges.length && i.somethingSelected() == r.somethingSelected() && /* @__PURE__ */ new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
    }
    function ms(e, t, i, r) {
      var n = e.history, l = r && r.origin;
      i == n.lastSelOp || l && n.lastSelOrigin == l && (n.lastModTime == n.lastSelTime && n.lastOrigin == l || ys(e, l, W(n.done), t)) ? n.done[n.done.length - 1] = t : ti(t, n.done), n.lastSelTime = +/* @__PURE__ */ new Date(), n.lastSelOrigin = l, n.lastSelOp = i, r && r.clearRedo !== !1 && ql(n.undone);
    }
    function ti(e, t) {
      var i = W(t);
      i && i.ranges && i.equals(e) || t.push(e);
    }
    function Ql(e, t, i, r) {
      var n = t["spans_" + e.id], l = 0;
      e.iter(Math.max(e.first, i), Math.min(e.first + e.size, r), function(o) {
        o.markedSpans && ((n || (n = t["spans_" + e.id] = {}))[l] = o.markedSpans), ++l;
      });
    }
    function bs(e) {
      if (!e)
        return null;
      for (var t, i = 0; i < e.length; ++i)
        e[i].marker.explicitlyCleared ? t || (t = e.slice(0, i)) : t && t.push(e[i]);
      return t ? t.length ? t : null : e;
    }
    function xs(e, t) {
      var i = t["spans_" + e.id];
      if (!i)
        return null;
      for (var r = [], n = 0; n < t.text.length; ++n)
        r.push(bs(i[n]));
      return r;
    }
    function Jl(e, t) {
      var i = xs(e, t), r = Ii(e, t);
      if (!i)
        return r;
      if (!r)
        return i;
      for (var n = 0; n < i.length; ++n) {
        var l = i[n], o = r[n];
        if (l && o)
          e: for (var a = 0; a < o.length; ++a) {
            for (var s = o[a], u = 0; u < l.length; ++u)
              if (l[u].marker == s.marker)
                continue e;
            l.push(s);
          }
        else o && (i[n] = o);
      }
      return i;
    }
    function Wt(e, t, i) {
      for (var r = [], n = 0; n < e.length; ++n) {
        var l = e[n];
        if (l.ranges) {
          r.push(i ? ge.prototype.deepCopy.call(l) : l);
          continue;
        }
        var o = l.changes, a = [];
        r.push({ changes: a });
        for (var s = 0; s < o.length; ++s) {
          var u = o[s], f = void 0;
          if (a.push({ from: u.from, to: u.to, text: u.text }), t)
            for (var h in u)
              (f = h.match(/^spans_(\d+)$/)) && $(t, Number(f[1])) > -1 && (W(a)[h] = u[h], delete u[h]);
        }
      }
      return r;
    }
    function vn(e, t, i, r) {
      if (r) {
        var n = e.anchor;
        if (i) {
          var l = M(t, n) < 0;
          l != M(i, n) < 0 ? (n = t, t = i) : l != M(t, i) < 0 && (t = i);
        }
        return new O(n, t);
      } else
        return new O(i || t, t);
    }
    function ri(e, t, i, r, n) {
      n == null && (n = e.cm && (e.cm.display.shift || e.extend)), ee(e, new ge([vn(e.sel.primary(), t, i, n)], 0), r);
    }
    function jl(e, t, i) {
      for (var r = [], n = e.cm && (e.cm.display.shift || e.extend), l = 0; l < e.sel.ranges.length; l++)
        r[l] = vn(e.sel.ranges[l], t[l], null, n);
      var o = ke(e.cm, r, e.sel.primIndex);
      ee(e, o, i);
    }
    function gn(e, t, i, r) {
      var n = e.sel.ranges.slice(0);
      n[t] = i, ee(e, ke(e.cm, n, e.sel.primIndex), r);
    }
    function Vl(e, t, i, r) {
      ee(e, qe(t, i), r);
    }
    function Cs(e, t, i) {
      var r = {
        ranges: t.ranges,
        update: function(n) {
          this.ranges = [];
          for (var l = 0; l < n.length; l++)
            this.ranges[l] = new O(
              D(e, n[l].anchor),
              D(e, n[l].head)
            );
        },
        origin: i && i.origin
      };
      return G(e, "beforeSelectionChange", e, r), e.cm && G(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? ke(e.cm, r.ranges, r.ranges.length - 1) : t;
    }
    function $l(e, t, i) {
      var r = e.history.done, n = W(r);
      n && n.ranges ? (r[r.length - 1] = t, ii(e, t, i)) : ee(e, t, i);
    }
    function ee(e, t, i) {
      ii(e, t, i), ms(e, e.sel, e.cm ? e.cm.curOp.id : NaN, i);
    }
    function ii(e, t, i) {
      (xe(e, "beforeSelectionChange") || e.cm && xe(e.cm, "beforeSelectionChange")) && (t = Cs(e, t, i));
      var r = i && i.bias || (M(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
      eo(e, ro(e, t, r, !0)), !(i && i.scroll === !1) && e.cm && e.cm.getOption("readOnly") != "nocursor" && At(e.cm);
    }
    function eo(e, t) {
      t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, In(e.cm)), q(e, "cursorActivity", e));
    }
    function to(e) {
      eo(e, ro(e, e.sel, null, !1));
    }
    function ro(e, t, i, r) {
      for (var n, l = 0; l < t.ranges.length; l++) {
        var o = t.ranges[l], a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[l], s = ni(e, o.anchor, a && a.anchor, i, r), u = o.head == o.anchor ? s : ni(e, o.head, a && a.head, i, r);
        (n || s != o.anchor || u != o.head) && (n || (n = t.ranges.slice(0, l)), n[l] = new O(s, u));
      }
      return n ? ke(e.cm, n, t.primIndex) : t;
    }
    function Ht(e, t, i, r, n) {
      var l = w(e, t.line);
      if (l.markedSpans)
        for (var o = 0; o < l.markedSpans.length; ++o) {
          var a = l.markedSpans[o], s = a.marker, u = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft, f = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
          if ((a.from == null || (u ? a.from <= t.ch : a.from < t.ch)) && (a.to == null || (f ? a.to >= t.ch : a.to > t.ch))) {
            if (n && (G(s, "beforeCursorEnter"), s.explicitlyCleared))
              if (l.markedSpans) {
                --o;
                continue;
              } else
                break;
            if (!s.atomic)
              continue;
            if (i) {
              var h = s.find(r < 0 ? 1 : -1), d = void 0;
              if ((r < 0 ? f : u) && (h = io(e, h, -r, h && h.line == t.line ? l : null)), h && h.line == t.line && (d = M(h, i)) && (r < 0 ? d < 0 : d > 0))
                return Ht(e, h, t, r, n);
            }
            var c = s.find(r < 0 ? -1 : 1);
            return (r < 0 ? u : f) && (c = io(e, c, r, c.line == t.line ? l : null)), c ? Ht(e, c, t, r, n) : null;
          }
        }
      return t;
    }
    function ni(e, t, i, r, n) {
      var l = r || 1, o = Ht(e, t, i, l, n) || !n && Ht(e, t, i, l, !0) || Ht(e, t, i, -l, n) || !n && Ht(e, t, i, -l, !0);
      return o || (e.cantEdit = !0, g(e.first, 0));
    }
    function io(e, t, i, r) {
      return i < 0 && t.ch == 0 ? t.line > e.first ? D(e, g(t.line - 1)) : null : i > 0 && t.ch == (r || w(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? g(t.line + 1, 0) : null : new g(t.line, t.ch + i);
    }
    function no(e) {
      e.setSelection(g(e.firstLine(), 0), g(e.lastLine()), Me);
    }
    function lo(e, t, i) {
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
      return i && (r.update = function(n, l, o, a) {
        n && (r.from = D(e, n)), l && (r.to = D(e, l)), o && (r.text = o), a !== void 0 && (r.origin = a);
      }), G(e, "beforeChange", e, r), e.cm && G(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : { from: r.from, to: r.to, text: r.text, origin: r.origin };
    }
    function Ft(e, t, i) {
      if (e.cm) {
        if (!e.cm.curOp)
          return Z(e.cm, Ft)(e, t, i);
        if (e.cm.state.suppressEdits)
          return;
      }
      if (!((xe(e, "beforeChange") || e.cm && xe(e.cm, "beforeChange")) && (t = lo(e, t, !0), !t))) {
        var r = Jn && !i && ma(e, t.from, t.to);
        if (r)
          for (var n = r.length - 1; n >= 0; --n)
            oo(e, { from: r[n].from, to: r[n].to, text: n ? [""] : t.text, origin: t.origin });
        else
          oo(e, t);
      }
    }
    function oo(e, t) {
      if (!(t.text.length == 1 && t.text[0] == "" && M(t.from, t.to) == 0)) {
        var i = hn(e, t);
        Zl(e, t, i, e.cm ? e.cm.curOp.id : NaN), cr(e, t, i, Ii(e, t));
        var r = [];
        Qe(e, function(n, l) {
          !l && $(r, n.history) == -1 && (fo(n.history, t), r.push(n.history)), cr(n, t, null, Ii(n, t));
        });
      }
    }
    function li(e, t, i) {
      var r = e.cm && e.cm.state.suppressEdits;
      if (!(r && !i)) {
        for (var n = e.history, l, o = e.sel, a = t == "undo" ? n.done : n.undone, s = t == "undo" ? n.undone : n.done, u = 0; u < a.length && (l = a[u], !(i ? l.ranges && !l.equals(e.sel) : !l.ranges)); u++)
          ;
        if (u != a.length) {
          for (n.lastOrigin = n.lastSelOrigin = null; ; )
            if (l = a.pop(), l.ranges) {
              if (ti(l, s), i && !l.equals(e.sel)) {
                ee(e, l, { clearRedo: !1 });
                return;
              }
              o = l;
            } else if (r) {
              a.push(l);
              return;
            } else
              break;
          var f = [];
          ti(o, s), s.push({ changes: f, generation: n.generation }), n.generation = l.generation || ++n.maxGeneration;
          for (var h = xe(e, "beforeChange") || e.cm && xe(e.cm, "beforeChange"), d = function(v) {
            var y = l.changes[v];
            if (y.origin = t, h && !lo(e, y, !1))
              return a.length = 0, {};
            f.push(pn(e, y));
            var m = v ? hn(e, y) : W(a);
            cr(e, y, m, Jl(e, y)), !v && e.cm && e.cm.scrollIntoView({ from: y.from, to: Ze(y) });
            var x = [];
            Qe(e, function(b, C) {
              !C && $(x, b.history) == -1 && (fo(b.history, y), x.push(b.history)), cr(b, y, null, Jl(b, y));
            });
          }, c = l.changes.length - 1; c >= 0; --c) {
            var p = d(c);
            if (p) return p.v;
          }
        }
      }
    }
    function ao(e, t) {
      if (t != 0 && (e.first += t, e.sel = new ge(Wr(e.sel.ranges, function(n) {
        return new O(
          g(n.anchor.line + t, n.anchor.ch),
          g(n.head.line + t, n.head.ch)
        );
      }), e.sel.primIndex), e.cm)) {
        ae(e.cm, e.first, e.first - t, t);
        for (var i = e.cm.display, r = i.viewFrom; r < i.viewTo; r++)
          Xe(e.cm, r, "gutter");
      }
    }
    function cr(e, t, i, r) {
      if (e.cm && !e.cm.curOp)
        return Z(e.cm, cr)(e, t, i, r);
      if (t.to.line < e.first) {
        ao(e, t.text.length - 1 - (t.to.line - t.from.line));
        return;
      }
      if (!(t.from.line > e.lastLine())) {
        if (t.from.line < e.first) {
          var n = t.text.length - 1 - (e.first - t.from.line);
          ao(e, n), t = {
            from: g(e.first, 0),
            to: g(t.to.line + n, t.to.ch),
            text: [W(t.text)],
            origin: t.origin
          };
        }
        var l = e.lastLine();
        t.to.line > l && (t = {
          from: t.from,
          to: g(l, w(e, l).text.length),
          text: [t.text[0]],
          origin: t.origin
        }), t.removed = at(e, t.from, t.to), i || (i = hn(e, t)), e.cm ? ws(e.cm, t, r) : dn(e, t, r), ii(e, i, Me), e.cantEdit && ni(e, g(e.firstLine(), 0)) && (e.cantEdit = !1);
      }
    }
    function ws(e, t, i) {
      var r = e.doc, n = e.display, l = t.from, o = t.to, a = !1, s = l.line;
      e.options.lineWrapping || (s = H(Se(w(r, l.line))), r.iter(s, o.line + 1, function(c) {
        if (c == n.maxLine)
          return a = !0, !0;
      })), r.sel.contains(t.from, t.to) > -1 && In(e), dn(r, t, i, Tl(e)), e.options.lineWrapping || (r.iter(s, l.line + t.text.length, function(c) {
        var p = Ur(c);
        p > n.maxLineLength && (n.maxLine = c, n.maxLineLength = p, n.maxLineChanged = !0, a = !1);
      }), a && (e.curOp.updateMaxLine = !0)), ha(r, l.line), ur(e, 400);
      var u = t.text.length - (o.line - l.line) - 1;
      t.full ? ae(e) : l.line == o.line && t.text.length == 1 && !_l(e.doc, t) ? Xe(e, l.line, "text") : ae(e, l.line, o.line + 1, u);
      var f = xe(e, "changes"), h = xe(e, "change");
      if (h || f) {
        var d = {
          from: l,
          to: o,
          text: t.text,
          removed: t.removed,
          origin: t.origin
        };
        h && q(e, "change", e, d), f && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(d);
      }
      e.display.selForContextMenu = null;
    }
    function Pt(e, t, i, r, n) {
      var l;
      r || (r = i), M(r, i) < 0 && (l = [r, i], i = l[0], r = l[1]), typeof t == "string" && (t = e.splitLines(t)), Ft(e, { from: i, to: r, text: t, origin: n });
    }
    function so(e, t, i, r) {
      i < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
    }
    function uo(e, t, i, r) {
      for (var n = 0; n < e.length; ++n) {
        var l = e[n], o = !0;
        if (l.ranges) {
          l.copied || (l = e[n] = l.deepCopy(), l.copied = !0);
          for (var a = 0; a < l.ranges.length; a++)
            so(l.ranges[a].anchor, t, i, r), so(l.ranges[a].head, t, i, r);
          continue;
        }
        for (var s = 0; s < l.changes.length; ++s) {
          var u = l.changes[s];
          if (i < u.from.line)
            u.from = g(u.from.line + r, u.from.ch), u.to = g(u.to.line + r, u.to.ch);
          else if (t <= u.to.line) {
            o = !1;
            break;
          }
        }
        o || (e.splice(0, n + 1), n = 0);
      }
    }
    function fo(e, t) {
      var i = t.from.line, r = t.to.line, n = t.text.length - (r - i) - 1;
      uo(e.done, i, r, n), uo(e.undone, i, r, n);
    }
    function dr(e, t, i, r) {
      var n = t, l = t;
      return typeof t == "number" ? l = w(e, Gn(e, t)) : n = H(t), n == null ? null : (r(l, n) && e.cm && Xe(e.cm, n, i), l);
    }
    function pr(e) {
      this.lines = e, this.parent = null;
      for (var t = 0, i = 0; i < e.length; ++i)
        e[i].parent = this, t += e[i].height;
      this.height = t;
    }
    pr.prototype = {
      chunkSize: function() {
        return this.lines.length;
      },
      // Remove the n lines at offset 'at'.
      removeInner: function(e, t) {
        for (var i = e, r = e + t; i < r; ++i) {
          var n = this.lines[i];
          this.height -= n.height, Sa(n), q(n, "delete");
        }
        this.lines.splice(e, t);
      },
      // Helper used to collapse a small branch into a single leaf.
      collapse: function(e) {
        e.push.apply(e, this.lines);
      },
      // Insert the given array of lines at offset 'at', count them as
      // having the given height.
      insertInner: function(e, t, i) {
        this.height += i, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
        for (var r = 0; r < t.length; ++r)
          t[r].parent = this;
      },
      // Used to iterate over a part of the tree.
      iterN: function(e, t, i) {
        for (var r = e + t; e < r; ++e)
          if (i(this.lines[e]))
            return !0;
      }
    };
    function vr(e) {
      this.children = e;
      for (var t = 0, i = 0, r = 0; r < e.length; ++r) {
        var n = e[r];
        t += n.chunkSize(), i += n.height, n.parent = this;
      }
      this.size = t, this.height = i, this.parent = null;
    }
    vr.prototype = {
      chunkSize: function() {
        return this.size;
      },
      removeInner: function(e, t) {
        this.size -= t;
        for (var i = 0; i < this.children.length; ++i) {
          var r = this.children[i], n = r.chunkSize();
          if (e < n) {
            var l = Math.min(t, n - e), o = r.height;
            if (r.removeInner(e, l), this.height -= o - r.height, n == l && (this.children.splice(i--, 1), r.parent = null), (t -= l) == 0)
              break;
            e = 0;
          } else
            e -= n;
        }
        if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof pr))) {
          var a = [];
          this.collapse(a), this.children = [new pr(a)], this.children[0].parent = this;
        }
      },
      collapse: function(e) {
        for (var t = 0; t < this.children.length; ++t)
          this.children[t].collapse(e);
      },
      insertInner: function(e, t, i) {
        this.size += t.length, this.height += i;
        for (var r = 0; r < this.children.length; ++r) {
          var n = this.children[r], l = n.chunkSize();
          if (e <= l) {
            if (n.insertInner(e, t, i), n.lines && n.lines.length > 50) {
              for (var o = n.lines.length % 25 + 25, a = o; a < n.lines.length; ) {
                var s = new pr(n.lines.slice(a, a += 25));
                n.height -= s.height, this.children.splice(++r, 0, s), s.parent = this;
              }
              n.lines = n.lines.slice(0, o), this.maybeSpill();
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
            var t = e.children.splice(e.children.length - 5, 5), i = new vr(t);
            if (e.parent) {
              e.size -= i.size, e.height -= i.height;
              var n = $(e.parent.children, e);
              e.parent.children.splice(n + 1, 0, i);
            } else {
              var r = new vr(e.children);
              r.parent = e, e.children = [r, i], e = r;
            }
            i.parent = e.parent;
          } while (e.children.length > 10);
          e.parent.maybeSpill();
        }
      },
      iterN: function(e, t, i) {
        for (var r = 0; r < this.children.length; ++r) {
          var n = this.children[r], l = n.chunkSize();
          if (e < l) {
            var o = Math.min(t, l - e);
            if (n.iterN(e, o, i))
              return !0;
            if ((t -= o) == 0)
              break;
            e = 0;
          } else
            e -= l;
        }
      }
    };
    var gr = function(e, t, i) {
      if (i)
        for (var r in i)
          i.hasOwnProperty(r) && (this[r] = i[r]);
      this.doc = e, this.node = t;
    };
    gr.prototype.clear = function() {
      var e = this.doc.cm, t = this.line.widgets, i = this.line, r = H(i);
      if (!(r == null || !t)) {
        for (var n = 0; n < t.length; ++n)
          t[n] == this && t.splice(n--, 1);
        t.length || (i.widgets = null);
        var l = rr(this);
        De(i, Math.max(0, i.height - l)), e && (ce(e, function() {
          ho(e, i, -l), Xe(e, r, "widget");
        }), q(e, "lineWidgetCleared", e, this, r));
      }
    }, gr.prototype.changed = function() {
      var e = this, t = this.height, i = this.doc.cm, r = this.line;
      this.height = null;
      var n = rr(this) - t;
      n && (_e(this.doc, r) || De(r, r.height + n), i && ce(i, function() {
        i.curOp.forceUpdate = !0, ho(i, r, n), q(i, "lineWidgetChanged", i, e, H(r));
      }));
    }, Ct(gr);
    function ho(e, t, i) {
      Ee(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && ln(e, i);
    }
    function Ss(e, t, i, r) {
      var n = new gr(e, i, r), l = e.cm;
      return l && n.noHScroll && (l.display.alignWidgets = !0), dr(e, t, "widget", function(o) {
        var a = o.widgets || (o.widgets = []);
        if (n.insertAt == null ? a.push(n) : a.splice(Math.min(a.length, Math.max(0, n.insertAt)), 0, n), n.line = o, l && !_e(e, o)) {
          var s = Ee(o) < e.scrollTop;
          De(o, o.height + rr(n)), s && ln(l, n.height), l.curOp.forceUpdate = !0;
        }
        return !0;
      }), l && q(l, "lineWidgetAdded", l, n, typeof t == "number" ? t : H(t)), n;
    }
    var co = 0, Je = function(e, t) {
      this.lines = [], this.type = t, this.doc = e, this.id = ++co;
    };
    Je.prototype.clear = function() {
      if (!this.explicitlyCleared) {
        var e = this.doc.cm, t = e && !e.curOp;
        if (t && vt(e), xe(this, "clear")) {
          var i = this.find();
          i && q(this, "clear", i.from, i.to);
        }
        for (var r = null, n = null, l = 0; l < this.lines.length; ++l) {
          var o = this.lines[l], a = $t(o.markedSpans, this);
          e && !this.collapsed ? Xe(e, H(o), "text") : e && (a.to != null && (n = H(o)), a.from != null && (r = H(o))), o.markedSpans = pa(o.markedSpans, a), a.from == null && this.collapsed && !_e(this.doc, o) && e && De(o, Mt(e.display));
        }
        if (e && this.collapsed && !e.options.lineWrapping)
          for (var s = 0; s < this.lines.length; ++s) {
            var u = Se(this.lines[s]), f = Ur(u);
            f > e.display.maxLineLength && (e.display.maxLine = u, e.display.maxLineLength = f, e.display.maxLineChanged = !0);
          }
        r != null && e && this.collapsed && ae(e, r, n + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && to(e.doc)), e && q(e, "markerCleared", e, this, r, n), t && gt(e), this.parent && this.parent.clear();
      }
    }, Je.prototype.find = function(e, t) {
      e == null && this.type == "bookmark" && (e = 1);
      for (var i, r, n = 0; n < this.lines.length; ++n) {
        var l = this.lines[n], o = $t(l.markedSpans, this);
        if (o.from != null && (i = g(t ? l : H(l), o.from), e == -1))
          return i;
        if (o.to != null && (r = g(t ? l : H(l), o.to), e == 1))
          return r;
      }
      return i && { from: i, to: r };
    }, Je.prototype.changed = function() {
      var e = this, t = this.find(-1, !0), i = this, r = this.doc.cm;
      !t || !r || ce(r, function() {
        var n = t.line, l = H(t.line), o = Xi(r, l);
        if (o && (ml(o), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !_e(i.doc, n) && i.height != null) {
          var a = i.height;
          i.height = null;
          var s = rr(i) - a;
          s && De(n, n.height + s);
        }
        q(r, "markerChanged", r, e);
      });
    }, Je.prototype.attachLine = function(e) {
      if (!this.lines.length && this.doc.cm) {
        var t = this.doc.cm.curOp;
        (!t.maybeHiddenMarkers || $(t.maybeHiddenMarkers, this) == -1) && (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
      }
      this.lines.push(e);
    }, Je.prototype.detachLine = function(e) {
      if (this.lines.splice($(this.lines, e), 1), !this.lines.length && this.doc.cm) {
        var t = this.doc.cm.curOp;
        (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
      }
    }, Ct(Je);
    function Et(e, t, i, r, n) {
      if (r && r.shared)
        return Ls(e, t, i, r, n);
      if (e.cm && !e.cm.curOp)
        return Z(e.cm, Et)(e, t, i, r, n);
      var l = new Je(e, n), o = M(t, i);
      if (r && lt(r, l, !1), o > 0 || o == 0 && l.clearWhenEmpty !== !1)
        return l;
      if (l.replacedWith && (l.collapsed = !0, l.widgetNode = xt("span", [l.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || l.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (l.widgetNode.insertLeft = !0)), l.collapsed) {
        if (rl(e, t.line, t, i, l) || t.line != i.line && rl(e, i.line, t, i, l))
          throw new Error("Inserting collapsed marker partially overlapping an existing one");
        da();
      }
      l.addToHistory && Zl(e, { from: t, to: i, origin: "markText" }, e.sel, NaN);
      var a = t.line, s = e.cm, u;
      if (e.iter(a, i.line + 1, function(h) {
        s && l.collapsed && !s.options.lineWrapping && Se(h) == s.display.maxLine && (u = !0), l.collapsed && a != t.line && De(h, 0), va(h, new Br(
          l,
          a == t.line ? t.ch : null,
          a == i.line ? i.ch : null
        ), e.cm && e.cm.curOp), ++a;
      }), l.collapsed && e.iter(t.line, i.line + 1, function(h) {
        _e(e, h) && De(h, 0);
      }), l.clearOnEnter && T(l, "beforeCursorEnter", function() {
        return l.clear();
      }), l.readOnly && (ca(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), l.collapsed && (l.id = ++co, l.atomic = !0), s) {
        if (u && (s.curOp.updateMaxLine = !0), l.collapsed)
          ae(s, t.line, i.line + 1);
        else if (l.className || l.startStyle || l.endStyle || l.css || l.attributes || l.title)
          for (var f = t.line; f <= i.line; f++)
            Xe(s, f, "text");
        l.atomic && to(s.doc), q(s, "markerAdded", s, l);
      }
      return l;
    }
    var yr = function(e, t) {
      this.markers = e, this.primary = t;
      for (var i = 0; i < e.length; ++i)
        e[i].parent = this;
    };
    yr.prototype.clear = function() {
      if (!this.explicitlyCleared) {
        this.explicitlyCleared = !0;
        for (var e = 0; e < this.markers.length; ++e)
          this.markers[e].clear();
        q(this, "clear");
      }
    }, yr.prototype.find = function(e, t) {
      return this.primary.find(e, t);
    }, Ct(yr);
    function Ls(e, t, i, r, n) {
      r = lt(r), r.shared = !1;
      var l = [Et(e, t, i, r, n)], o = l[0], a = r.widgetNode;
      return Qe(e, function(s) {
        a && (r.widgetNode = a.cloneNode(!0)), l.push(Et(s, D(s, t), D(s, i), r, n));
        for (var u = 0; u < s.linked.length; ++u)
          if (s.linked[u].isParent)
            return;
        o = W(l);
      }), new yr(l, o);
    }
    function po(e) {
      return e.findMarks(g(e.first, 0), e.clipPos(g(e.lastLine())), function(t) {
        return t.parent;
      });
    }
    function ks(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i], n = r.find(), l = e.clipPos(n.from), o = e.clipPos(n.to);
        if (M(l, o)) {
          var a = Et(e, l, o, r.primary, r.primary.type);
          r.markers.push(a), a.parent = r;
        }
      }
    }
    function Ts(e) {
      for (var t = function(r) {
        var n = e[r], l = [n.primary.doc];
        Qe(n.primary.doc, function(s) {
          return l.push(s);
        });
        for (var o = 0; o < n.markers.length; o++) {
          var a = n.markers[o];
          $(l, a.doc) == -1 && (a.parent = null, n.markers.splice(o--, 1));
        }
      }, i = 0; i < e.length; i++) t(i);
    }
    var Ms = 0, se = function(e, t, i, r, n) {
      if (!(this instanceof se))
        return new se(e, t, i, r, n);
      i == null && (i = 0), vr.call(this, [new pr([new Lt("", null)])]), this.first = i, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = i;
      var l = g(i, 0);
      this.sel = qe(l), this.history = new ei(null), this.id = ++Ms, this.modeOption = t, this.lineSep = r, this.direction = n == "rtl" ? "rtl" : "ltr", this.extend = !1, typeof e == "string" && (e = this.splitLines(e)), dn(this, { from: l, to: l, text: e }), ee(this, qe(l), Me);
    };
    se.prototype = Hn(vr.prototype, {
      constructor: se,
      // Iterate over the document. Supports two forms -- with only one
      // argument, it calls that for each line in the document. With
      // three, it iterates over the range given by the first two (with
      // the second being non-inclusive).
      iter: function(e, t, i) {
        i ? this.iterN(e - this.first, t - e, i) : this.iterN(this.first, this.first + this.size, e);
      },
      // Non-public interface for adding and removing lines.
      insert: function(e, t) {
        for (var i = 0, r = 0; r < t.length; ++r)
          i += t[r].height;
        this.insertInner(e - this.first, t, i);
      },
      remove: function(e, t) {
        this.removeInner(e - this.first, t);
      },
      // From here, the methods are part of the public interface. Most
      // are also available from CodeMirror (editor) instances.
      getValue: function(e) {
        var t = Oi(this, this.first, this.first + this.size);
        return e === !1 ? t : t.join(e || this.lineSeparator());
      },
      setValue: Q(function(e) {
        var t = g(this.first, 0), i = this.first + this.size - 1;
        Ft(this, {
          from: t,
          to: g(i, w(this, i).text.length),
          text: this.splitLines(e),
          origin: "setValue",
          full: !0
        }, !0), this.cm && lr(this.cm, 0, 0), ee(this, qe(t), Me);
      }),
      replaceRange: function(e, t, i, r) {
        t = D(this, t), i = i ? D(this, i) : t, Pt(this, e, t, i, r);
      },
      getRange: function(e, t, i) {
        var r = at(this, D(this, e), D(this, t));
        return i === !1 ? r : i === "" ? r.join("") : r.join(i || this.lineSeparator());
      },
      getLine: function(e) {
        var t = this.getLineHandle(e);
        return t && t.text;
      },
      getLineHandle: function(e) {
        if (jt(this, e))
          return w(this, e);
      },
      getLineNumber: function(e) {
        return H(e);
      },
      getLineHandleVisualStart: function(e) {
        return typeof e == "number" && (e = w(this, e)), Se(e);
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
        return D(this, e);
      },
      getCursor: function(e) {
        var t = this.sel.primary(), i;
        return e == null || e == "head" ? i = t.head : e == "anchor" ? i = t.anchor : e == "end" || e == "to" || e === !1 ? i = t.to() : i = t.from(), i;
      },
      listSelections: function() {
        return this.sel.ranges;
      },
      somethingSelected: function() {
        return this.sel.somethingSelected();
      },
      setCursor: Q(function(e, t, i) {
        Vl(this, D(this, typeof e == "number" ? g(e, t || 0) : e), null, i);
      }),
      setSelection: Q(function(e, t, i) {
        Vl(this, D(this, e), D(this, t || e), i);
      }),
      extendSelection: Q(function(e, t, i) {
        ri(this, D(this, e), t && D(this, t), i);
      }),
      extendSelections: Q(function(e, t) {
        jl(this, Un(this, e), t);
      }),
      extendSelectionsBy: Q(function(e, t) {
        var i = Wr(this.sel.ranges, e);
        jl(this, Un(this, i), t);
      }),
      setSelections: Q(function(e, t, i) {
        if (e.length) {
          for (var r = [], n = 0; n < e.length; n++)
            r[n] = new O(
              D(this, e[n].anchor),
              D(this, e[n].head || e[n].anchor)
            );
          t == null && (t = Math.min(e.length - 1, this.sel.primIndex)), ee(this, ke(this.cm, r, t), i);
        }
      }),
      addSelection: Q(function(e, t, i) {
        var r = this.sel.ranges.slice(0);
        r.push(new O(D(this, e), D(this, t || e))), ee(this, ke(this.cm, r, r.length - 1), i);
      }),
      getSelection: function(e) {
        for (var t = this.sel.ranges, i, r = 0; r < t.length; r++) {
          var n = at(this, t[r].from(), t[r].to());
          i = i ? i.concat(n) : n;
        }
        return e === !1 ? i : i.join(e || this.lineSeparator());
      },
      getSelections: function(e) {
        for (var t = [], i = this.sel.ranges, r = 0; r < i.length; r++) {
          var n = at(this, i[r].from(), i[r].to());
          e !== !1 && (n = n.join(e || this.lineSeparator())), t[r] = n;
        }
        return t;
      },
      replaceSelection: function(e, t, i) {
        for (var r = [], n = 0; n < this.sel.ranges.length; n++)
          r[n] = e;
        this.replaceSelections(r, t, i || "+input");
      },
      replaceSelections: Q(function(e, t, i) {
        for (var r = [], n = this.sel, l = 0; l < n.ranges.length; l++) {
          var o = n.ranges[l];
          r[l] = { from: o.from(), to: o.to(), text: this.splitLines(e[l]), origin: i };
        }
        for (var a = t && t != "end" && ps(this, r, t), s = r.length - 1; s >= 0; s--)
          Ft(this, r[s]);
        a ? $l(this, a) : this.cm && At(this.cm);
      }),
      undo: Q(function() {
        li(this, "undo");
      }),
      redo: Q(function() {
        li(this, "redo");
      }),
      undoSelection: Q(function() {
        li(this, "undo", !0);
      }),
      redoSelection: Q(function() {
        li(this, "redo", !0);
      }),
      setExtending: function(e) {
        this.extend = e;
      },
      getExtending: function() {
        return this.extend;
      },
      historySize: function() {
        for (var e = this.history, t = 0, i = 0, r = 0; r < e.done.length; r++)
          e.done[r].ranges || ++t;
        for (var n = 0; n < e.undone.length; n++)
          e.undone[n].ranges || ++i;
        return { undo: t, redo: i };
      },
      clearHistory: function() {
        var e = this;
        this.history = new ei(this.history), Qe(this, function(t) {
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
          done: Wt(this.history.done),
          undone: Wt(this.history.undone)
        };
      },
      setHistory: function(e) {
        var t = this.history = new ei(this.history);
        t.done = Wt(e.done.slice(0), null, !0), t.undone = Wt(e.undone.slice(0), null, !0);
      },
      setGutterMarker: Q(function(e, t, i) {
        return dr(this, e, "gutter", function(r) {
          var n = r.gutterMarkers || (r.gutterMarkers = {});
          return n[t] = i, !i && Fn(n) && (r.gutterMarkers = null), !0;
        });
      }),
      clearGutter: Q(function(e) {
        var t = this;
        this.iter(function(i) {
          i.gutterMarkers && i.gutterMarkers[e] && dr(t, i, "gutter", function() {
            return i.gutterMarkers[e] = null, Fn(i.gutterMarkers) && (i.gutterMarkers = null), !0;
          });
        });
      }),
      lineInfo: function(e) {
        var t;
        if (typeof e == "number") {
          if (!jt(this, e) || (t = e, e = w(this, e), !e))
            return null;
        } else if (t = H(e), t == null)
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
      addLineClass: Q(function(e, t, i) {
        return dr(this, e, t == "gutter" ? "gutter" : "class", function(r) {
          var n = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass";
          if (!r[n])
            r[n] = i;
          else {
            if (bt(i).test(r[n]))
              return !1;
            r[n] += " " + i;
          }
          return !0;
        });
      }),
      removeLineClass: Q(function(e, t, i) {
        return dr(this, e, t == "gutter" ? "gutter" : "class", function(r) {
          var n = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass", l = r[n];
          if (l)
            if (i == null)
              r[n] = null;
            else {
              var o = l.match(bt(i));
              if (!o)
                return !1;
              var a = o.index + o[0].length;
              r[n] = l.slice(0, o.index) + (!o.index || a == l.length ? "" : " ") + l.slice(a) || null;
            }
          else return !1;
          return !0;
        });
      }),
      addLineWidget: Q(function(e, t, i) {
        return Ss(this, e, t, i);
      }),
      removeLineWidget: function(e) {
        e.clear();
      },
      markText: function(e, t, i) {
        return Et(this, D(this, e), D(this, t), i, i && i.type || "range");
      },
      setBookmark: function(e, t) {
        var i = {
          replacedWith: t && (t.nodeType == null ? t.widget : t),
          insertLeft: t && t.insertLeft,
          clearWhenEmpty: !1,
          shared: t && t.shared,
          handleMouseEvents: t && t.handleMouseEvents
        };
        return e = D(this, e), Et(this, e, e, i, "bookmark");
      },
      findMarksAt: function(e) {
        e = D(this, e);
        var t = [], i = w(this, e.line).markedSpans;
        if (i)
          for (var r = 0; r < i.length; ++r) {
            var n = i[r];
            (n.from == null || n.from <= e.ch) && (n.to == null || n.to >= e.ch) && t.push(n.marker.parent || n.marker);
          }
        return t;
      },
      findMarks: function(e, t, i) {
        e = D(this, e), t = D(this, t);
        var r = [], n = e.line;
        return this.iter(e.line, t.line + 1, function(l) {
          var o = l.markedSpans;
          if (o)
            for (var a = 0; a < o.length; a++) {
              var s = o[a];
              !(s.to != null && n == e.line && e.ch >= s.to || s.from == null && n != e.line || s.from != null && n == t.line && s.from >= t.ch) && (!i || i(s.marker)) && r.push(s.marker.parent || s.marker);
            }
          ++n;
        }), r;
      },
      getAllMarks: function() {
        var e = [];
        return this.iter(function(t) {
          var i = t.markedSpans;
          if (i)
            for (var r = 0; r < i.length; ++r)
              i[r].from != null && e.push(i[r].marker);
        }), e;
      },
      posFromIndex: function(e) {
        var t, i = this.first, r = this.lineSeparator().length;
        return this.iter(function(n) {
          var l = n.text.length + r;
          if (l > e)
            return t = e, !0;
          e -= l, ++i;
        }), D(this, g(i, t));
      },
      indexFromPos: function(e) {
        e = D(this, e);
        var t = e.ch;
        if (e.line < this.first || e.ch < 0)
          return 0;
        var i = this.lineSeparator().length;
        return this.iter(this.first, e.line, function(r) {
          t += r.text.length + i;
        }), t;
      },
      copy: function(e) {
        var t = new se(
          Oi(this, this.first, this.first + this.size),
          this.modeOption,
          this.first,
          this.lineSep,
          this.direction
        );
        return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
      },
      linkedDoc: function(e) {
        e || (e = {});
        var t = this.first, i = this.first + this.size;
        e.from != null && e.from > t && (t = e.from), e.to != null && e.to < i && (i = e.to);
        var r = new se(Oi(this, t, i), e.mode || this.modeOption, t, this.lineSep, this.direction);
        return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }), r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], ks(r, po(this)), r;
      },
      unlinkDoc: function(e) {
        if (e instanceof I && (e = e.doc), this.linked)
          for (var t = 0; t < this.linked.length; ++t) {
            var i = this.linked[t];
            if (i.doc == e) {
              this.linked.splice(t, 1), e.unlinkDoc(this), Ts(po(this));
              break;
            }
          }
        if (e.history == this.history) {
          var r = [e.id];
          Qe(e, function(n) {
            return r.push(n.id);
          }, !0), e.history = new ei(null), e.history.done = Wt(this.history.done, r), e.history.undone = Wt(this.history.undone, r);
        }
      },
      iterLinkedDocs: function(e) {
        Qe(this, e);
      },
      getMode: function() {
        return this.mode;
      },
      getEditor: function() {
        return this.cm;
      },
      splitLines: function(e) {
        return this.lineSep ? e.split(this.lineSep) : Ti(e);
      },
      lineSeparator: function() {
        return this.lineSep || `
`;
      },
      setDirection: Q(function(e) {
        e != "rtl" && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(t) {
          return t.order = null;
        }), this.cm && vs(this.cm));
      })
    }), se.prototype.eachLine = se.prototype.iter;
    var vo = 0;
    function Ds(e) {
      var t = this;
      if (go(t), !(Y(t, e) || Ie(t.display, e))) {
        oe(e), A && (vo = +/* @__PURE__ */ new Date());
        var i = ht(t, e, !0), r = e.dataTransfer.files;
        if (!(!i || t.isReadOnly()))
          if (r && r.length && window.FileReader && window.File)
            for (var n = r.length, l = Array(n), o = 0, a = function() {
              ++o == n && Z(t, function() {
                i = D(t.doc, i);
                var c = {
                  from: i,
                  to: i,
                  text: t.doc.splitLines(
                    l.filter(function(p) {
                      return p != null;
                    }).join(t.doc.lineSeparator())
                  ),
                  origin: "paste"
                };
                Ft(t.doc, c), $l(t.doc, qe(D(t.doc, i), D(t.doc, Ze(c))));
              })();
            }, s = function(c, p) {
              if (t.options.allowDropFileTypes && $(t.options.allowDropFileTypes, c.type) == -1) {
                a();
                return;
              }
              var v = new FileReader();
              v.onerror = function() {
                return a();
              }, v.onload = function() {
                var y = v.result;
                if (/[\x00-\x08\x0e-\x1f]{2}/.test(y)) {
                  a();
                  return;
                }
                l[p] = y, a();
              }, v.readAsText(c);
            }, u = 0; u < r.length; u++)
              s(r[u], u);
          else {
            if (t.state.draggingText && t.doc.sel.contains(i) > -1) {
              t.state.draggingText(e), setTimeout(function() {
                return t.display.input.focus();
              }, 20);
              return;
            }
            try {
              var f = e.dataTransfer.getData("Text");
              if (f) {
                var h;
                if (t.state.draggingText && !t.state.draggingText.copy && (h = t.listSelections()), ii(t.doc, qe(i, i)), h)
                  for (var d = 0; d < h.length; ++d)
                    Pt(t.doc, "", h[d].anchor, h[d].head, "drag");
                t.replaceSelection(f, "around", "paste"), t.display.input.focus();
              }
            } catch {
            }
          }
      }
    }
    function Ns(e, t) {
      if (A && (!e.state.draggingText || +/* @__PURE__ */ new Date() - vo < 100)) {
        Jt(t);
        return;
      }
      if (!(Y(e, t) || Ie(e.display, t)) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !Mr)) {
        var i = k("img", null, null, "position: fixed; left: 0; top: 0;");
        i.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", Ce && (i.width = i.height = 1, e.display.wrapper.appendChild(i), i._top = i.offsetTop), t.dataTransfer.setDragImage(i, 0, 0), Ce && i.parentNode.removeChild(i);
      }
    }
    function As(e, t) {
      var i = ht(e, t);
      if (i) {
        var r = document.createDocumentFragment();
        $i(e, i, r), e.display.dragCursor || (e.display.dragCursor = k("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), pe(e.display.dragCursor, r);
      }
    }
    function go(e) {
      e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
    }
    function yo(e) {
      if (document.getElementsByClassName) {
        for (var t = document.getElementsByClassName("CodeMirror"), i = [], r = 0; r < t.length; r++) {
          var n = t[r].CodeMirror;
          n && i.push(n);
        }
        i.length && i[0].operation(function() {
          for (var l = 0; l < i.length; l++)
            e(i[l]);
        });
      }
    }
    var mo = !1;
    function Os() {
      mo || (Ws(), mo = !0);
    }
    function Ws() {
      var e;
      T(window, "resize", function() {
        e == null && (e = setTimeout(function() {
          e = null, yo(Hs);
        }, 100));
      }), T(window, "blur", function() {
        return yo(Nt);
      });
    }
    function Hs(e) {
      var t = e.display;
      t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize();
    }
    for (var je = {
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
    }, mr = 0; mr < 10; mr++)
      je[mr + 48] = je[mr + 96] = String(mr);
    for (var oi = 65; oi <= 90; oi++)
      je[oi] = String.fromCharCode(oi);
    for (var br = 1; br <= 12; br++)
      je[br + 111] = je[br + 63235] = "F" + br;
    var Re = {};
    Re.basic = {
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
    }, Re.pcDefault = {
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
    }, Re.emacsy = {
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
    }, Re.macDefault = {
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
    }, Re.default = ye ? Re.macDefault : Re.pcDefault;
    function Fs(e) {
      var t = e.split(/-(?!$)/);
      e = t[t.length - 1];
      for (var i, r, n, l, o = 0; o < t.length - 1; o++) {
        var a = t[o];
        if (/^(cmd|meta|m)$/i.test(a))
          l = !0;
        else if (/^a(lt)?$/i.test(a))
          i = !0;
        else if (/^(c|ctrl|control)$/i.test(a))
          r = !0;
        else if (/^s(hift)?$/i.test(a))
          n = !0;
        else
          throw new Error("Unrecognized modifier name: " + a);
      }
      return i && (e = "Alt-" + e), r && (e = "Ctrl-" + e), l && (e = "Cmd-" + e), n && (e = "Shift-" + e), e;
    }
    function Ps(e) {
      var t = {};
      for (var i in e)
        if (e.hasOwnProperty(i)) {
          var r = e[i];
          if (/^(name|fallthrough|(de|at)tach)$/.test(i))
            continue;
          if (r == "...") {
            delete e[i];
            continue;
          }
          for (var n = Wr(i.split(" "), Fs), l = 0; l < n.length; l++) {
            var o = void 0, a = void 0;
            l == n.length - 1 ? (a = n.join(" "), o = r) : (a = n.slice(0, l + 1).join(" "), o = "...");
            var s = t[a];
            if (!s)
              t[a] = o;
            else if (s != o)
              throw new Error("Inconsistent bindings for " + a);
          }
          delete e[i];
        }
      for (var u in t)
        e[u] = t[u];
      return e;
    }
    function It(e, t, i, r) {
      t = ai(t);
      var n = t.call ? t.call(e, r) : t[e];
      if (n === !1)
        return "nothing";
      if (n === "...")
        return "multi";
      if (n != null && i(n))
        return "handled";
      if (t.fallthrough) {
        if (Object.prototype.toString.call(t.fallthrough) != "[object Array]")
          return It(e, t.fallthrough, i, r);
        for (var l = 0; l < t.fallthrough.length; l++) {
          var o = It(e, t.fallthrough[l], i, r);
          if (o)
            return o;
        }
      }
    }
    function bo(e) {
      var t = typeof e == "string" ? e : je[e.keyCode];
      return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
    }
    function xo(e, t, i) {
      var r = e;
      return t.altKey && r != "Alt" && (e = "Alt-" + e), (An ? t.metaKey : t.ctrlKey) && r != "Ctrl" && (e = "Ctrl-" + e), (An ? t.ctrlKey : t.metaKey) && r != "Mod" && (e = "Cmd-" + e), !i && t.shiftKey && r != "Shift" && (e = "Shift-" + e), e;
    }
    function Co(e, t) {
      if (Ce && e.keyCode == 34 && e.char)
        return !1;
      var i = je[e.keyCode];
      return i == null || e.altGraphKey ? !1 : (e.keyCode == 3 && e.code && (i = e.code), xo(i, e, t));
    }
    function ai(e) {
      return typeof e == "string" ? Re[e] : e;
    }
    function Bt(e, t) {
      for (var i = e.doc.sel.ranges, r = [], n = 0; n < i.length; n++) {
        for (var l = t(i[n]); r.length && M(l.from, W(r).to) <= 0; ) {
          var o = r.pop();
          if (M(o.from, l.from) < 0) {
            l.from = o.from;
            break;
          }
        }
        r.push(l);
      }
      ce(e, function() {
        for (var a = r.length - 1; a >= 0; a--)
          Pt(e.doc, "", r[a].from, r[a].to, "+delete");
        At(e);
      });
    }
    function yn(e, t, i) {
      var r = Pn(e.text, t + i, i);
      return r < 0 || r > e.text.length ? null : r;
    }
    function mn(e, t, i) {
      var r = yn(e, t.ch, i);
      return r == null ? null : new g(t.line, r, i < 0 ? "after" : "before");
    }
    function bn(e, t, i, r, n) {
      if (e) {
        t.doc.direction == "rtl" && (n = -n);
        var l = Fe(i, t.doc.direction);
        if (l) {
          var o = n < 0 ? W(l) : l[0], a = n < 0 == (o.level == 1), s = a ? "after" : "before", u;
          if (o.level > 0 || t.doc.direction == "rtl") {
            var f = Tt(t, i);
            u = n < 0 ? i.text.length - 1 : 0;
            var h = Oe(t, f, u).top;
            u = qt(function(d) {
              return Oe(t, f, d).top == h;
            }, n < 0 == (o.level == 1) ? o.from : o.to - 1, u), s == "before" && (u = yn(i, u, 1));
          } else
            u = n < 0 ? o.to : o.from;
          return new g(r, u, s);
        }
      }
      return new g(r, n < 0 ? i.text.length : 0, n < 0 ? "before" : "after");
    }
    function Es(e, t, i, r) {
      var n = Fe(t, e.doc.direction);
      if (!n)
        return mn(t, i, r);
      i.ch >= t.text.length ? (i.ch = t.text.length, i.sticky = "before") : i.ch <= 0 && (i.ch = 0, i.sticky = "after");
      var l = Qt(n, i.ch, i.sticky), o = n[l];
      if (e.doc.direction == "ltr" && o.level % 2 == 0 && (r > 0 ? o.to > i.ch : o.from < i.ch))
        return mn(t, i, r);
      var a = function(m, x) {
        return yn(t, m instanceof g ? m.ch : m, x);
      }, s, u = function(m) {
        return e.options.lineWrapping ? (s = s || Tt(e, t), kl(e, t, s, m)) : { begin: 0, end: t.text.length };
      }, f = u(i.sticky == "before" ? a(i, -1) : i.ch);
      if (e.doc.direction == "rtl" || o.level == 1) {
        var h = o.level == 1 == r < 0, d = a(i, h ? 1 : -1);
        if (d != null && (h ? d <= o.to && d <= f.end : d >= o.from && d >= f.begin)) {
          var c = h ? "before" : "after";
          return new g(i.line, d, c);
        }
      }
      var p = function(m, x, b) {
        for (var C = function(P, J) {
          return J ? new g(i.line, a(P, 1), "before") : new g(i.line, P, "after");
        }; m >= 0 && m < n.length; m += x) {
          var L = n[m], S = x > 0 == (L.level != 1), N = S ? b.begin : a(b.end, -1);
          if (L.from <= N && N < L.to || (N = S ? L.from : a(L.to, -1), b.begin <= N && N < b.end))
            return C(N, S);
        }
      }, v = p(l + r, r, f);
      if (v)
        return v;
      var y = r > 0 ? f.end : a(f.begin, -1);
      return y != null && !(r > 0 && y == t.text.length) && (v = p(r > 0 ? 0 : n.length - 1, r, u(y)), v) ? v : null;
    }
    var xr = {
      selectAll: no,
      singleSelection: function(e) {
        return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Me);
      },
      killLine: function(e) {
        return Bt(e, function(t) {
          if (t.empty()) {
            var i = w(e.doc, t.head.line).text.length;
            return t.head.ch == i && t.head.line < e.lastLine() ? { from: t.head, to: g(t.head.line + 1, 0) } : { from: t.head, to: g(t.head.line, i) };
          } else
            return { from: t.from(), to: t.to() };
        });
      },
      deleteLine: function(e) {
        return Bt(e, function(t) {
          return {
            from: g(t.from().line, 0),
            to: D(e.doc, g(t.to().line + 1, 0))
          };
        });
      },
      delLineLeft: function(e) {
        return Bt(e, function(t) {
          return {
            from: g(t.from().line, 0),
            to: t.from()
          };
        });
      },
      delWrappedLineLeft: function(e) {
        return Bt(e, function(t) {
          var i = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: i }, "div");
          return { from: r, to: t.from() };
        });
      },
      delWrappedLineRight: function(e) {
        return Bt(e, function(t) {
          var i = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: i }, "div");
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
        return e.extendSelection(g(e.firstLine(), 0));
      },
      goDocEnd: function(e) {
        return e.extendSelection(g(e.lastLine()));
      },
      goLineStart: function(e) {
        return e.extendSelectionsBy(
          function(t) {
            return wo(e, t.head.line);
          },
          { origin: "+move", bias: 1 }
        );
      },
      goLineStartSmart: function(e) {
        return e.extendSelectionsBy(
          function(t) {
            return So(e, t.head);
          },
          { origin: "+move", bias: 1 }
        );
      },
      goLineEnd: function(e) {
        return e.extendSelectionsBy(
          function(t) {
            return Is(e, t.head.line);
          },
          { origin: "+move", bias: -1 }
        );
      },
      goLineRight: function(e) {
        return e.extendSelectionsBy(function(t) {
          var i = e.cursorCoords(t.head, "div").top + 5;
          return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: i }, "div");
        }, Yt);
      },
      goLineLeft: function(e) {
        return e.extendSelectionsBy(function(t) {
          var i = e.cursorCoords(t.head, "div").top + 5;
          return e.coordsChar({ left: 0, top: i }, "div");
        }, Yt);
      },
      goLineLeftSmart: function(e) {
        return e.extendSelectionsBy(function(t) {
          var i = e.cursorCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: i }, "div");
          return r.ch < e.getLine(r.line).search(/\S/) ? So(e, t.head) : r;
        }, Yt);
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
        for (var t = [], i = e.listSelections(), r = e.options.tabSize, n = 0; n < i.length; n++) {
          var l = i[n].from(), o = be(e.getLine(l.line), l.ch, r);
          t.push(mi(r - o % r));
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
        return ce(e, function() {
          for (var t = e.listSelections(), i = [], r = 0; r < t.length; r++)
            if (t[r].empty()) {
              var n = t[r].head, l = w(e.doc, n.line).text;
              if (l) {
                if (n.ch == l.length && (n = new g(n.line, n.ch - 1)), n.ch > 0)
                  n = new g(n.line, n.ch + 1), e.replaceRange(
                    l.charAt(n.ch - 1) + l.charAt(n.ch - 2),
                    g(n.line, n.ch - 2),
                    n,
                    "+transpose"
                  );
                else if (n.line > e.doc.first) {
                  var o = w(e.doc, n.line - 1).text;
                  o && (n = new g(n.line, 1), e.replaceRange(
                    l.charAt(0) + e.doc.lineSeparator() + o.charAt(o.length - 1),
                    g(n.line - 1, o.length - 1),
                    n,
                    "+transpose"
                  ));
                }
              }
              i.push(new O(n, n));
            }
          e.setSelections(i);
        });
      },
      newlineAndIndent: function(e) {
        return ce(e, function() {
          for (var t = e.listSelections(), i = t.length - 1; i >= 0; i--)
            e.replaceRange(e.doc.lineSeparator(), t[i].anchor, t[i].head, "+input");
          t = e.listSelections();
          for (var r = 0; r < t.length; r++)
            e.indentLine(t[r].from().line, null, !0);
          At(e);
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
    function wo(e, t) {
      var i = w(e.doc, t), r = Se(i);
      return r != i && (t = H(r)), bn(!0, e, r, t, 1);
    }
    function Is(e, t) {
      var i = w(e.doc, t), r = xa(i);
      return r != i && (t = H(r)), bn(!0, e, i, t, -1);
    }
    function So(e, t) {
      var i = wo(e, t.line), r = w(e.doc, i.line), n = Fe(r, e.doc.direction);
      if (!n || n[0].level == 0) {
        var l = Math.max(i.ch, r.text.search(/\S/)), o = t.line == i.line && t.ch <= l && t.ch;
        return g(i.line, o ? 0 : l, i.sticky);
      }
      return i;
    }
    function si(e, t, i) {
      if (typeof t == "string" && (t = xr[t], !t))
        return !1;
      e.display.input.ensurePolled();
      var r = e.display.shift, n = !1;
      try {
        e.isReadOnly() && (e.state.suppressEdits = !0), i && (e.display.shift = !1), n = t(e) != Ar;
      } finally {
        e.display.shift = r, e.state.suppressEdits = !1;
      }
      return n;
    }
    function Bs(e, t, i) {
      for (var r = 0; r < e.state.keyMaps.length; r++) {
        var n = It(t, e.state.keyMaps[r], i, e);
        if (n)
          return n;
      }
      return e.options.extraKeys && It(t, e.options.extraKeys, i, e) || It(t, e.options.keyMap, i, e);
    }
    var Rs = new Ke();
    function Cr(e, t, i, r) {
      var n = e.state.keySeq;
      if (n) {
        if (bo(t))
          return "handled";
        if (/\'$/.test(t) ? e.state.keySeq = null : Rs.set(50, function() {
          e.state.keySeq == n && (e.state.keySeq = null, e.display.input.reset());
        }), Lo(e, n + " " + t, i, r))
          return !0;
      }
      return Lo(e, t, i, r);
    }
    function Lo(e, t, i, r) {
      var n = Bs(e, t, r);
      return n == "multi" && (e.state.keySeq = t), n == "handled" && q(e, "keyHandled", e, t, i), (n == "handled" || n == "multi") && (oe(i), en(e)), !!n;
    }
    function ko(e, t) {
      var i = Co(t, !0);
      return i ? t.shiftKey && !e.state.keySeq ? Cr(e, "Shift-" + i, t, function(r) {
        return si(e, r, !0);
      }) || Cr(e, i, t, function(r) {
        if (typeof r == "string" ? /^go[A-Z]/.test(r) : r.motion)
          return si(e, r);
      }) : Cr(e, i, t, function(r) {
        return si(e, r);
      }) : !1;
    }
    function zs(e, t, i) {
      return Cr(e, "'" + i + "'", t, function(r) {
        return si(e, r, !0);
      });
    }
    var xn = null;
    function To(e) {
      var t = this;
      if (!(e.target && e.target != t.display.input.getField()) && (t.curOp.focus = me(we(t)), !Y(t, e))) {
        A && E < 11 && e.keyCode == 27 && (e.returnValue = !1);
        var i = e.keyCode;
        t.display.shift = i == 16 || e.shiftKey;
        var r = ko(t, e);
        Ce && (xn = r ? i : null, !r && i == 88 && !na && (ye ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), He && !ye && !r && i == 46 && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), i == 18 && !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) && Gs(t);
      }
    }
    function Gs(e) {
      var t = e.display.lineDiv;
      nt(t, "CodeMirror-crosshair");
      function i(r) {
        (r.keyCode == 18 || !r.altKey) && (rt(t, "CodeMirror-crosshair"), ve(document, "keyup", i), ve(document, "mouseover", i));
      }
      T(document, "keyup", i), T(document, "mouseover", i);
    }
    function Mo(e) {
      e.keyCode == 16 && (this.doc.sel.shift = !1), Y(this, e);
    }
    function Do(e) {
      var t = this;
      if (!(e.target && e.target != t.display.input.getField()) && !(Ie(t.display, e) || Y(t, e) || e.ctrlKey && !e.altKey || ye && e.metaKey)) {
        var i = e.keyCode, r = e.charCode;
        if (Ce && i == xn) {
          xn = null, oe(e);
          return;
        }
        if (!(Ce && (!e.which || e.which < 10) && ko(t, e))) {
          var n = String.fromCharCode(r ?? i);
          n != "\b" && (zs(t, e, n) || t.display.input.onKeyPress(e));
        }
      }
    }
    var Us = 400, Cn = function(e, t, i) {
      this.time = e, this.pos = t, this.button = i;
    };
    Cn.prototype.compare = function(e, t, i) {
      return this.time + Us > e && M(t, this.pos) == 0 && i == this.button;
    };
    var wr, Sr;
    function Ks(e, t) {
      var i = +/* @__PURE__ */ new Date();
      return Sr && Sr.compare(i, e, t) ? (wr = Sr = null, "triple") : wr && wr.compare(i, e, t) ? (Sr = new Cn(i, e, t), wr = null, "double") : (wr = new Cn(i, e, t), Sr = null, "single");
    }
    function No(e) {
      var t = this, i = t.display;
      if (!(Y(t, e) || i.activeTouch && i.input.supportsTouch())) {
        if (i.input.ensurePolled(), i.shift = e.shiftKey, Ie(i, e)) {
          ie || (i.scroller.draggable = !1, setTimeout(function() {
            return i.scroller.draggable = !0;
          }, 100));
          return;
        }
        if (!wn(t, e)) {
          var r = ht(t, e), n = Rn(e), l = r ? Ks(r, n) : "single";
          Nr(t).focus(), n == 1 && t.state.selectingText && t.state.selectingText(e), !(r && _s(t, n, r, l, e)) && (n == 1 ? r ? Ys(t, r, l, e) : Si(e) == i.scroller && oe(e) : n == 2 ? (r && ri(t.doc, r), setTimeout(function() {
            return i.input.focus();
          }, 20)) : n == 3 && (di ? t.display.input.onContextMenu(e) : tn(t)));
        }
      }
    }
    function _s(e, t, i, r, n) {
      var l = "Click";
      return r == "double" ? l = "Double" + l : r == "triple" && (l = "Triple" + l), l = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + l, Cr(e, xo(l, n), n, function(o) {
        if (typeof o == "string" && (o = xr[o]), !o)
          return !1;
        var a = !1;
        try {
          e.isReadOnly() && (e.state.suppressEdits = !0), a = o(e, i) != Ar;
        } finally {
          e.state.suppressEdits = !1;
        }
        return a;
      });
    }
    function Xs(e, t, i) {
      var r = e.getOption("configureMouse"), n = r ? r(e, t, i) : {};
      if (n.unit == null) {
        var l = qo ? i.shiftKey && i.metaKey : i.altKey;
        n.unit = l ? "rectangle" : t == "single" ? "char" : t == "double" ? "word" : "line";
      }
      return (n.extend == null || e.doc.extend) && (n.extend = e.doc.extend || i.shiftKey), n.addNew == null && (n.addNew = ye ? i.metaKey : i.ctrlKey), n.moveOnDrag == null && (n.moveOnDrag = !(ye ? i.altKey : i.ctrlKey)), n;
    }
    function Ys(e, t, i, r) {
      A ? setTimeout(vi(Nl, e), 0) : e.curOp.focus = me(we(e));
      var n = Xs(e, i, r), l = e.doc.sel, o;
      e.options.dragDrop && ea && !e.isReadOnly() && i == "single" && (o = l.contains(t)) > -1 && (M((o = l.ranges[o]).from(), t) < 0 || t.xRel > 0) && (M(o.to(), t) > 0 || t.xRel < 0) ? qs(e, r, t, n) : Zs(e, r, t, n);
    }
    function qs(e, t, i, r) {
      var n = e.display, l = !1, o = Z(e, function(u) {
        ie && (n.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : tn(e)), ve(n.wrapper.ownerDocument, "mouseup", o), ve(n.wrapper.ownerDocument, "mousemove", a), ve(n.scroller, "dragstart", s), ve(n.scroller, "drop", o), l || (oe(u), r.addNew || ri(e.doc, i, null, null, r.extend), ie && !Mr || A && E == 9 ? setTimeout(function() {
          n.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), n.input.focus();
        }, 20) : n.input.focus());
      }), a = function(u) {
        l = l || Math.abs(t.clientX - u.clientX) + Math.abs(t.clientY - u.clientY) >= 10;
      }, s = function() {
        return l = !0;
      };
      ie && (n.scroller.draggable = !0), e.state.draggingText = o, o.copy = !r.moveOnDrag, T(n.wrapper.ownerDocument, "mouseup", o), T(n.wrapper.ownerDocument, "mousemove", a), T(n.scroller, "dragstart", s), T(n.scroller, "drop", o), e.state.delayingBlurEvent = !0, setTimeout(function() {
        return n.input.focus();
      }, 20), n.scroller.dragDrop && n.scroller.dragDrop();
    }
    function Ao(e, t, i) {
      if (i == "char")
        return new O(t, t);
      if (i == "word")
        return e.findWordAt(t);
      if (i == "line")
        return new O(g(t.line, 0), D(e.doc, g(t.line + 1, 0)));
      var r = i(e, t);
      return new O(r.from, r.to);
    }
    function Zs(e, t, i, r) {
      A && tn(e);
      var n = e.display, l = e.doc;
      oe(t);
      var o, a, s = l.sel, u = s.ranges;
      if (r.addNew && !r.extend ? (a = l.sel.contains(i), a > -1 ? o = u[a] : o = new O(i, i)) : (o = l.sel.primary(), a = l.sel.primIndex), r.unit == "rectangle")
        r.addNew || (o = new O(i, i)), i = ht(e, t, !0, !0), a = -1;
      else {
        var f = Ao(e, i, r.unit);
        r.extend ? o = vn(o, f.anchor, f.head, r.extend) : o = f;
      }
      r.addNew ? a == -1 ? (a = u.length, ee(
        l,
        ke(e, u.concat([o]), a),
        { scroll: !1, origin: "*mouse" }
      )) : u.length > 1 && u[a].empty() && r.unit == "char" && !r.extend ? (ee(
        l,
        ke(e, u.slice(0, a).concat(u.slice(a + 1)), 0),
        { scroll: !1, origin: "*mouse" }
      ), s = l.sel) : gn(l, a, o, gi) : (a = 0, ee(l, new ge([o], 0), gi), s = l.sel);
      var h = i;
      function d(b) {
        if (M(h, b) != 0)
          if (h = b, r.unit == "rectangle") {
            for (var C = [], L = e.options.tabSize, S = be(w(l, i.line).text, i.ch, L), N = be(w(l, b.line).text, b.ch, L), P = Math.min(S, N), J = Math.max(S, N), B = Math.min(i.line, b.line), de = Math.min(e.lastLine(), Math.max(i.line, b.line)); B <= de; B++) {
              var ue = w(l, B).text, K = yi(ue, P, L);
              P == J ? C.push(new O(g(B, K), g(B, K))) : ue.length > K && C.push(new O(g(B, K), g(B, yi(ue, J, L))));
            }
            C.length || C.push(new O(i, i)), ee(
              l,
              ke(e, s.ranges.slice(0, a).concat(C), a),
              { origin: "*mouse", scroll: !1 }
            ), e.scrollIntoView(b);
          } else {
            var fe = o, V = Ao(e, b, r.unit), X = fe.anchor, _;
            M(V.anchor, X) > 0 ? (_ = V.head, X = Er(fe.from(), V.anchor)) : (_ = V.anchor, X = Pr(fe.to(), V.head));
            var R = s.ranges.slice(0);
            R[a] = Qs(e, new O(D(l, X), _)), ee(l, ke(e, R, a), gi);
          }
      }
      var c = n.wrapper.getBoundingClientRect(), p = 0;
      function v(b) {
        var C = ++p, L = ht(e, b, !0, r.unit == "rectangle");
        if (L)
          if (M(L, h) != 0) {
            e.curOp.focus = me(we(e)), d(L);
            var S = Jr(n, l);
            (L.line >= S.to || L.line < S.from) && setTimeout(Z(e, function() {
              p == C && v(b);
            }), 150);
          } else {
            var N = b.clientY < c.top ? -20 : b.clientY > c.bottom ? 20 : 0;
            N && setTimeout(Z(e, function() {
              p == C && (n.scroller.scrollTop += N, v(b));
            }), 50);
          }
      }
      function y(b) {
        e.state.selectingText = !1, p = 1 / 0, b && (oe(b), n.input.focus()), ve(n.wrapper.ownerDocument, "mousemove", m), ve(n.wrapper.ownerDocument, "mouseup", x), l.history.lastSelOrigin = null;
      }
      var m = Z(e, function(b) {
        b.buttons === 0 || !Rn(b) ? y(b) : v(b);
      }), x = Z(e, y);
      e.state.selectingText = x, T(n.wrapper.ownerDocument, "mousemove", m), T(n.wrapper.ownerDocument, "mouseup", x);
    }
    function Qs(e, t) {
      var i = t.anchor, r = t.head, n = w(e.doc, i.line);
      if (M(i, r) == 0 && i.sticky == r.sticky)
        return t;
      var l = Fe(n);
      if (!l)
        return t;
      var o = Qt(l, i.ch, i.sticky), a = l[o];
      if (a.from != i.ch && a.to != i.ch)
        return t;
      var s = o + (a.from == i.ch == (a.level != 1) ? 0 : 1);
      if (s == 0 || s == l.length)
        return t;
      var u;
      if (r.line != i.line)
        u = (r.line - i.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
      else {
        var f = Qt(l, r.ch, r.sticky), h = f - o || (r.ch - i.ch) * (a.level == 1 ? -1 : 1);
        f == s - 1 || f == s ? u = h < 0 : u = h > 0;
      }
      var d = l[s + (u ? -1 : 0)], c = u == (d.level == 1), p = c ? d.from : d.to, v = c ? "after" : "before";
      return i.ch == p && i.sticky == v ? t : new O(new g(i.line, p, v), r);
    }
    function Oo(e, t, i, r) {
      var n, l;
      if (t.touches)
        n = t.touches[0].clientX, l = t.touches[0].clientY;
      else
        try {
          n = t.clientX, l = t.clientY;
        } catch {
          return !1;
        }
      if (n >= Math.floor(e.display.gutters.getBoundingClientRect().right))
        return !1;
      r && oe(t);
      var o = e.display, a = o.lineDiv.getBoundingClientRect();
      if (l > a.bottom || !xe(e, i))
        return wi(t);
      l -= a.top - o.viewOffset;
      for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
        var u = o.gutters.childNodes[s];
        if (u && u.getBoundingClientRect().right >= n) {
          var f = st(e.doc, l), h = e.display.gutterSpecs[s];
          return G(e, i, e, f, h.className, t), wi(t);
        }
      }
    }
    function wn(e, t) {
      return Oo(e, t, "gutterClick", !0);
    }
    function Wo(e, t) {
      Ie(e.display, t) || Js(e, t) || Y(e, t, "contextmenu") || di || e.display.input.onContextMenu(t);
    }
    function Js(e, t) {
      return xe(e, "gutterContextMenu") ? Oo(e, t, "gutterContextMenu", !1) : !1;
    }
    function Ho(e) {
      e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), ir(e);
    }
    var Rt = { toString: function() {
      return "CodeMirror.Init";
    } }, Fo = {}, ui = {};
    function js(e) {
      var t = e.optionHandlers;
      function i(r, n, l, o) {
        e.defaults[r] = n, l && (t[r] = o ? function(a, s, u) {
          u != Rt && l(a, s, u);
        } : l);
      }
      e.defineOption = i, e.Init = Rt, i("value", "", function(r, n) {
        return r.setValue(n);
      }, !0), i("mode", null, function(r, n) {
        r.doc.modeOption = n, cn(r);
      }, !0), i("indentUnit", 2, cn, !0), i("indentWithTabs", !1), i("smartIndent", !0), i("tabSize", 4, function(r) {
        hr(r), ir(r), ae(r);
      }, !0), i("lineSeparator", null, function(r, n) {
        if (r.doc.lineSep = n, !!n) {
          var l = [], o = r.doc.first;
          r.doc.iter(function(s) {
            for (var u = 0; ; ) {
              var f = s.text.indexOf(n, u);
              if (f == -1)
                break;
              u = f + n.length, l.push(g(o, f));
            }
            o++;
          });
          for (var a = l.length - 1; a >= 0; a--)
            Pt(r.doc, n, l[a], g(l[a].line, l[a].ch + n.length));
        }
      }), i("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function(r, n, l) {
        r.state.specialChars = new RegExp(n.source + (n.test("	") ? "" : "|	"), "g"), l != Rt && r.refresh();
      }), i("specialCharPlaceholder", Ta, function(r) {
        return r.refresh();
      }, !0), i("electricChars", !0), i("inputStyle", _t ? "contenteditable" : "textarea", function() {
        throw new Error("inputStyle can not (yet) be changed in a running editor");
      }, !0), i("spellcheck", !1, function(r, n) {
        return r.getInputField().spellcheck = n;
      }, !0), i("autocorrect", !1, function(r, n) {
        return r.getInputField().autocorrect = n;
      }, !0), i("autocapitalize", !1, function(r, n) {
        return r.getInputField().autocapitalize = n;
      }, !0), i("rtlMoveVisually", !Zo), i("wholeLineUpdateBefore", !0), i("theme", "default", function(r) {
        Ho(r), fr(r);
      }, !0), i("keyMap", "default", function(r, n, l) {
        var o = ai(n), a = l != Rt && ai(l);
        a && a.detach && a.detach(r, o), o.attach && o.attach(r, a || null);
      }), i("extraKeys", null), i("configureMouse", null), i("lineWrapping", !1, $s, !0), i("gutters", [], function(r, n) {
        r.display.gutterSpecs = fn(n, r.options.lineNumbers), fr(r);
      }, !0), i("fixedGutter", !0, function(r, n) {
        r.display.gutters.style.left = n ? ji(r.display) + "px" : "0", r.refresh();
      }, !0), i("coverGutterNextToScrollbar", !1, function(r) {
        return Ot(r);
      }, !0), i("scrollbarStyle", "native", function(r) {
        Pl(r), Ot(r), r.display.scrollbars.setScrollTop(r.doc.scrollTop), r.display.scrollbars.setScrollLeft(r.doc.scrollLeft);
      }, !0), i("lineNumbers", !1, function(r, n) {
        r.display.gutterSpecs = fn(r.options.gutters, n), fr(r);
      }, !0), i("firstLineNumber", 1, fr, !0), i("lineNumberFormatter", function(r) {
        return r;
      }, fr, !0), i("showCursorWhenSelecting", !1, nr, !0), i("resetSelectionOnContextMenu", !0), i("lineWiseCopyCut", !0), i("pasteLinesPerSelection", !0), i("selectionsMayTouch", !1), i("readOnly", !1, function(r, n) {
        n == "nocursor" && (Nt(r), r.display.input.blur()), r.display.input.readOnlyChanged(n);
      }), i("screenReaderLabel", null, function(r, n) {
        n = n === "" ? null : n, r.display.input.screenReaderLabelChanged(n);
      }), i("disableInput", !1, function(r, n) {
        n || r.display.input.reset();
      }, !0), i("dragDrop", !0, Vs), i("allowDropFileTypes", null), i("cursorBlinkRate", 530), i("cursorScrollMargin", 0), i("cursorHeight", 1, nr, !0), i("singleCursorHeightPerLine", !0, nr, !0), i("workTime", 100), i("workDelay", 100), i("flattenSpans", !0, hr, !0), i("addModeClass", !1, hr, !0), i("pollInterval", 100), i("undoDepth", 200, function(r, n) {
        return r.doc.history.undoDepth = n;
      }), i("historyEventDelay", 1250), i("viewportMargin", 10, function(r) {
        return r.refresh();
      }, !0), i("maxHighlightLength", 1e4, hr, !0), i("moveInputWithCursor", !0, function(r, n) {
        n || r.display.input.resetPosition();
      }), i("tabindex", null, function(r, n) {
        return r.display.input.getField().tabIndex = n || "";
      }), i("autofocus", null), i("direction", "ltr", function(r, n) {
        return r.doc.setDirection(n);
      }, !0), i("phrases", null);
    }
    function Vs(e, t, i) {
      var r = i && i != Rt;
      if (!t != !r) {
        var n = e.display.dragFunctions, l = t ? T : ve;
        l(e.display.scroller, "dragstart", n.start), l(e.display.scroller, "dragenter", n.enter), l(e.display.scroller, "dragover", n.over), l(e.display.scroller, "dragleave", n.leave), l(e.display.scroller, "drop", n.drop);
      }
    }
    function $s(e) {
      e.options.lineWrapping ? (nt(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (rt(e.display.wrapper, "CodeMirror-wrap"), Gi(e)), Vi(e), ae(e), ir(e), setTimeout(function() {
        return Ot(e);
      }, 100);
    }
    function I(e, t) {
      var i = this;
      if (!(this instanceof I))
        return new I(e, t);
      this.options = t = t ? lt(t) : {}, lt(Fo, t, !1);
      var r = t.value;
      typeof r == "string" ? r = new se(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
      var n = new I.inputStyles[t.inputStyle](this), l = this.display = new cs(e, r, n, t);
      l.wrapper.CodeMirror = this, Ho(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), Pl(this), this.state = {
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
        highlight: new Ke(),
        // stores highlight worker timeout
        keySeq: null,
        // Unfinished key sequence
        specialChars: null
      }, t.autofocus && !_t && l.input.focus(), A && E < 11 && setTimeout(function() {
        return i.display.input.reset(!0);
      }, 20), eu(this), Os(), vt(this), this.curOp.forceUpdate = !0, Xl(this, r), t.autofocus && !_t || this.hasFocus() ? setTimeout(function() {
        i.hasFocus() && !i.state.focused && rn(i);
      }, 20) : Nt(this);
      for (var o in ui)
        ui.hasOwnProperty(o) && ui[o](this, t[o], Rt);
      Bl(this), t.finishInit && t.finishInit(this);
      for (var a = 0; a < Sn.length; ++a)
        Sn[a](this);
      gt(this), ie && t.lineWrapping && getComputedStyle(l.lineDiv).textRendering == "optimizelegibility" && (l.lineDiv.style.textRendering = "auto");
    }
    I.defaults = Fo, I.optionHandlers = ui;
    function eu(e) {
      var t = e.display;
      T(t.scroller, "mousedown", Z(e, No)), A && E < 11 ? T(t.scroller, "dblclick", Z(e, function(s) {
        if (!Y(e, s)) {
          var u = ht(e, s);
          if (!(!u || wn(e, s) || Ie(e.display, s))) {
            oe(s);
            var f = e.findWordAt(u);
            ri(e.doc, f.anchor, f.head);
          }
        }
      })) : T(t.scroller, "dblclick", function(s) {
        return Y(e, s) || oe(s);
      }), T(t.scroller, "contextmenu", function(s) {
        return Wo(e, s);
      }), T(t.input.getField(), "contextmenu", function(s) {
        t.scroller.contains(s.target) || Wo(e, s);
      });
      var i, r = { end: 0 };
      function n() {
        t.activeTouch && (i = setTimeout(function() {
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
        var f = u.left - s.left, h = u.top - s.top;
        return f * f + h * h > 20 * 20;
      }
      T(t.scroller, "touchstart", function(s) {
        if (!Y(e, s) && !l(s) && !wn(e, s)) {
          t.input.ensurePolled(), clearTimeout(i);
          var u = +/* @__PURE__ */ new Date();
          t.activeTouch = {
            start: u,
            moved: !1,
            prev: u - r.end <= 300 ? r : null
          }, s.touches.length == 1 && (t.activeTouch.left = s.touches[0].pageX, t.activeTouch.top = s.touches[0].pageY);
        }
      }), T(t.scroller, "touchmove", function() {
        t.activeTouch && (t.activeTouch.moved = !0);
      }), T(t.scroller, "touchend", function(s) {
        var u = t.activeTouch;
        if (u && !Ie(t, s) && u.left != null && !u.moved && /* @__PURE__ */ new Date() - u.start < 300) {
          var f = e.coordsChar(t.activeTouch, "page"), h;
          !u.prev || o(u, u.prev) ? h = new O(f, f) : !u.prev.prev || o(u, u.prev.prev) ? h = e.findWordAt(f) : h = new O(g(f.line, 0), D(e.doc, g(f.line + 1, 0))), e.setSelection(h.anchor, h.head), e.focus(), oe(s);
        }
        n();
      }), T(t.scroller, "touchcancel", n), T(t.scroller, "scroll", function() {
        t.scroller.clientHeight && (or(e, t.scroller.scrollTop), dt(e, t.scroller.scrollLeft, !0), G(e, "scroll", e));
      }), T(t.scroller, "mousewheel", function(s) {
        return Gl(e, s);
      }), T(t.scroller, "DOMMouseScroll", function(s) {
        return Gl(e, s);
      }), T(t.wrapper, "scroll", function() {
        return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0;
      }), t.dragFunctions = {
        enter: function(s) {
          Y(e, s) || Jt(s);
        },
        over: function(s) {
          Y(e, s) || (As(e, s), Jt(s));
        },
        start: function(s) {
          return Ns(e, s);
        },
        drop: Z(e, Ds),
        leave: function(s) {
          Y(e, s) || go(e);
        }
      };
      var a = t.input.getField();
      T(a, "keyup", function(s) {
        return Mo.call(e, s);
      }), T(a, "keydown", Z(e, To)), T(a, "keypress", Z(e, Do)), T(a, "focus", function(s) {
        return rn(e, s);
      }), T(a, "blur", function(s) {
        return Nt(e, s);
      });
    }
    var Sn = [];
    I.defineInitHook = function(e) {
      return Sn.push(e);
    };
    function Lr(e, t, i, r) {
      var n = e.doc, l;
      i == null && (i = "add"), i == "smart" && (n.mode.indent ? l = Vt(e, t).state : i = "prev");
      var o = e.options.tabSize, a = w(n, t), s = be(a.text, null, o);
      a.stateAfter && (a.stateAfter = null);
      var u = a.text.match(/^\s*/)[0], f;
      if (!r && !/\S/.test(a.text))
        f = 0, i = "not";
      else if (i == "smart" && (f = n.mode.indent(l, a.text.slice(u.length), a.text), f == Ar || f > 150)) {
        if (!r)
          return;
        i = "prev";
      }
      i == "prev" ? t > n.first ? f = be(w(n, t - 1).text, null, o) : f = 0 : i == "add" ? f = s + e.options.indentUnit : i == "subtract" ? f = s - e.options.indentUnit : typeof i == "number" && (f = s + i), f = Math.max(0, f);
      var h = "", d = 0;
      if (e.options.indentWithTabs)
        for (var c = Math.floor(f / o); c; --c)
          d += o, h += "	";
      if (d < f && (h += mi(f - d)), h != u)
        return Pt(n, h, g(t, 0), g(t, u.length), "+input"), a.stateAfter = null, !0;
      for (var p = 0; p < n.sel.ranges.length; p++) {
        var v = n.sel.ranges[p];
        if (v.head.line == t && v.head.ch < u.length) {
          var y = g(t, u.length);
          gn(n, p, new O(y, y));
          break;
        }
      }
    }
    var Te = null;
    function fi(e) {
      Te = e;
    }
    function Ln(e, t, i, r, n) {
      var l = e.doc;
      e.display.shift = !1, r || (r = l.sel);
      var o = +/* @__PURE__ */ new Date() - 200, a = n == "paste" || e.state.pasteIncoming > o, s = Ti(t), u = null;
      if (a && r.ranges.length > 1)
        if (Te && Te.text.join(`
`) == t) {
          if (r.ranges.length % Te.text.length == 0) {
            u = [];
            for (var f = 0; f < Te.text.length; f++)
              u.push(l.splitLines(Te.text[f]));
          }
        } else s.length == r.ranges.length && e.options.pasteLinesPerSelection && (u = Wr(s, function(m) {
          return [m];
        }));
      for (var h = e.curOp.updateInput, d = r.ranges.length - 1; d >= 0; d--) {
        var c = r.ranges[d], p = c.from(), v = c.to();
        c.empty() && (i && i > 0 ? p = g(p.line, p.ch - i) : e.state.overwrite && !a ? v = g(v.line, Math.min(w(l, v.line).text.length, v.ch + W(s).length)) : a && Te && Te.lineWise && Te.text.join(`
`) == s.join(`
`) && (p = v = g(p.line, 0)));
        var y = {
          from: p,
          to: v,
          text: u ? u[d % u.length] : s,
          origin: n || (a ? "paste" : e.state.cutIncoming > o ? "cut" : "+input")
        };
        Ft(e.doc, y), q(e, "inputRead", e, y);
      }
      t && !a && Eo(e, t), At(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = h), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
    }
    function Po(e, t) {
      var i = e.clipboardData && e.clipboardData.getData("Text");
      if (i)
        return e.preventDefault(), !t.isReadOnly() && !t.options.disableInput && t.hasFocus() && ce(t, function() {
          return Ln(t, i, 0, null, "paste");
        }), !0;
    }
    function Eo(e, t) {
      if (!(!e.options.electricChars || !e.options.smartIndent))
        for (var i = e.doc.sel, r = i.ranges.length - 1; r >= 0; r--) {
          var n = i.ranges[r];
          if (!(n.head.ch > 100 || r && i.ranges[r - 1].head.line == n.head.line)) {
            var l = e.getModeAt(n.head), o = !1;
            if (l.electricChars) {
              for (var a = 0; a < l.electricChars.length; a++)
                if (t.indexOf(l.electricChars.charAt(a)) > -1) {
                  o = Lr(e, n.head.line, "smart");
                  break;
                }
            } else l.electricInput && l.electricInput.test(w(e.doc, n.head.line).text.slice(0, n.head.ch)) && (o = Lr(e, n.head.line, "smart"));
            o && q(e, "electricInput", e, n.head.line);
          }
        }
    }
    function Io(e) {
      for (var t = [], i = [], r = 0; r < e.doc.sel.ranges.length; r++) {
        var n = e.doc.sel.ranges[r].head.line, l = { anchor: g(n, 0), head: g(n + 1, 0) };
        i.push(l), t.push(e.getRange(l.anchor, l.head));
      }
      return { text: t, ranges: i };
    }
    function Bo(e, t, i, r) {
      e.setAttribute("autocorrect", i ? "" : "off"), e.setAttribute("autocapitalize", r ? "" : "off"), e.setAttribute("spellcheck", !!t);
    }
    function Ro() {
      var e = k("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), t = k("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
      return ie ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), Kt && (e.style.border = "1px solid black"), Bo(e), t;
    }
    function tu(e) {
      var t = e.optionHandlers, i = e.helpers = {};
      e.prototype = {
        constructor: e,
        focus: function() {
          Nr(this).focus(), this.display.input.focus();
        },
        setOption: function(r, n) {
          var l = this.options, o = l[r];
          l[r] == n && r != "mode" || (l[r] = n, t.hasOwnProperty(r) && Z(this, t[r])(this, n, o), G(this, "optionChange", this, r));
        },
        getOption: function(r) {
          return this.options[r];
        },
        getDoc: function() {
          return this.doc;
        },
        addKeyMap: function(r, n) {
          this.state.keyMaps[n ? "push" : "unshift"](ai(r));
        },
        removeKeyMap: function(r) {
          for (var n = this.state.keyMaps, l = 0; l < n.length; ++l)
            if (n[l] == r || n[l].name == r)
              return n.splice(l, 1), !0;
        },
        addOverlay: ne(function(r, n) {
          var l = r.token ? r : e.getMode(this.options, r);
          if (l.startState)
            throw new Error("Overlays may not be stateful.");
          Qo(
            this.state.overlays,
            {
              mode: l,
              modeSpec: r,
              opaque: n && n.opaque,
              priority: n && n.priority || 0
            },
            function(o) {
              return o.priority;
            }
          ), this.state.modeGen++, ae(this);
        }),
        removeOverlay: ne(function(r) {
          for (var n = this.state.overlays, l = 0; l < n.length; ++l) {
            var o = n[l].modeSpec;
            if (o == r || typeof r == "string" && o.name == r) {
              n.splice(l, 1), this.state.modeGen++, ae(this);
              return;
            }
          }
        }),
        indentLine: ne(function(r, n, l) {
          typeof n != "string" && typeof n != "number" && (n == null ? n = this.options.smartIndent ? "smart" : "prev" : n = n ? "add" : "subtract"), jt(this.doc, r) && Lr(this, r, n, l);
        }),
        indentSelection: ne(function(r) {
          for (var n = this.doc.sel.ranges, l = -1, o = 0; o < n.length; o++) {
            var a = n[o];
            if (a.empty())
              a.head.line > l && (Lr(this, a.head.line, r, !0), l = a.head.line, o == this.doc.sel.primIndex && At(this));
            else {
              var s = a.from(), u = a.to(), f = Math.max(l, s.line);
              l = Math.min(this.lastLine(), u.line - (u.ch ? 0 : 1)) + 1;
              for (var h = f; h < l; ++h)
                Lr(this, h, r);
              var d = this.doc.sel.ranges;
              s.ch == 0 && n.length == d.length && d[o].from().ch > 0 && gn(this.doc, o, new O(s, d[o].to()), Me);
            }
          }
        }),
        // Fetch the parser token for a given character. Useful for hacks
        // that want to inspect the mode state (say, for completion).
        getTokenAt: function(r, n) {
          return qn(this, r, n);
        },
        getLineTokens: function(r, n) {
          return qn(this, g(r), n, !0);
        },
        getTokenTypeAt: function(r) {
          r = D(this.doc, r);
          var n = _n(this, w(this.doc, r.line)), l = 0, o = (n.length - 1) / 2, a = r.ch, s;
          if (a == 0)
            s = n[2];
          else
            for (; ; ) {
              var u = l + o >> 1;
              if ((u ? n[u * 2 - 1] : 0) >= a)
                o = u;
              else if (n[u * 2 + 1] < a)
                l = u + 1;
              else {
                s = n[u * 2 + 2];
                break;
              }
            }
          var f = s ? s.indexOf("overlay ") : -1;
          return f < 0 ? s : f == 0 ? null : s.slice(0, f - 1);
        },
        getModeAt: function(r) {
          var n = this.doc.mode;
          return n.innerMode ? e.innerMode(n, this.getTokenAt(r).state).mode : n;
        },
        getHelper: function(r, n) {
          return this.getHelpers(r, n)[0];
        },
        getHelpers: function(r, n) {
          var l = [];
          if (!i.hasOwnProperty(n))
            return l;
          var o = i[n], a = this.getModeAt(r);
          if (typeof a[n] == "string")
            o[a[n]] && l.push(o[a[n]]);
          else if (a[n])
            for (var s = 0; s < a[n].length; s++) {
              var u = o[a[n][s]];
              u && l.push(u);
            }
          else a.helperType && o[a.helperType] ? l.push(o[a.helperType]) : o[a.name] && l.push(o[a.name]);
          for (var f = 0; f < o._global.length; f++) {
            var h = o._global[f];
            h.pred(a, this) && $(l, h.val) == -1 && l.push(h.val);
          }
          return l;
        },
        getStateAfter: function(r, n) {
          var l = this.doc;
          return r = Gn(l, r ?? l.first + l.size - 1), Vt(this, r + 1, n).state;
        },
        cursorCoords: function(r, n) {
          var l, o = this.doc.sel.primary();
          return r == null ? l = o.head : typeof r == "object" ? l = D(this.doc, r) : l = r ? o.from() : o.to(), Le(this, l, n || "page");
        },
        charCoords: function(r, n) {
          return Yr(this, D(this.doc, r), n || "page");
        },
        coordsChar: function(r, n) {
          return r = wl(this, r, n || "page"), Zi(this, r.left, r.top);
        },
        lineAtHeight: function(r, n) {
          return r = wl(this, { top: r, left: 0 }, n || "page").top, st(this.doc, r + this.display.viewOffset);
        },
        heightAtLine: function(r, n, l) {
          var o = !1, a;
          if (typeof r == "number") {
            var s = this.doc.first + this.doc.size - 1;
            r < this.doc.first ? r = this.doc.first : r > s && (r = s, o = !0), a = w(this.doc, r);
          } else
            a = r;
          return Xr(this, a, { top: 0, left: 0 }, n || "page", l || o).top + (o ? this.doc.height - Ee(a) : 0);
        },
        defaultTextHeight: function() {
          return Mt(this.display);
        },
        defaultCharWidth: function() {
          return Dt(this.display);
        },
        getViewport: function() {
          return { from: this.display.viewFrom, to: this.display.viewTo };
        },
        addWidget: function(r, n, l, o, a) {
          var s = this.display;
          r = Le(this, D(this.doc, r));
          var u = r.bottom, f = r.left;
          if (n.style.position = "absolute", n.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(n), s.sizer.appendChild(n), o == "over")
            u = r.top;
          else if (o == "above" || o == "near") {
            var h = Math.max(s.wrapper.clientHeight, this.doc.height), d = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
            (o == "above" || r.bottom + n.offsetHeight > h) && r.top > n.offsetHeight ? u = r.top - n.offsetHeight : r.bottom + n.offsetHeight <= h && (u = r.bottom), f + n.offsetWidth > d && (f = d - n.offsetWidth);
          }
          n.style.top = u + "px", n.style.left = n.style.right = "", a == "right" ? (f = s.sizer.clientWidth - n.offsetWidth, n.style.right = "0px") : (a == "left" ? f = 0 : a == "middle" && (f = (s.sizer.clientWidth - n.offsetWidth) / 2), n.style.left = f + "px"), l && Va(this, { left: f, top: u, right: f + n.offsetWidth, bottom: u + n.offsetHeight });
        },
        triggerOnKeyDown: ne(To),
        triggerOnKeyPress: ne(Do),
        triggerOnKeyUp: Mo,
        triggerOnMouseDown: ne(No),
        execCommand: function(r) {
          if (xr.hasOwnProperty(r))
            return xr[r].call(null, this);
        },
        triggerElectric: ne(function(r) {
          Eo(this, r);
        }),
        findPosH: function(r, n, l, o) {
          var a = 1;
          n < 0 && (a = -1, n = -n);
          for (var s = D(this.doc, r), u = 0; u < n && (s = kn(this.doc, s, a, l, o), !s.hitSide); ++u)
            ;
          return s;
        },
        moveH: ne(function(r, n) {
          var l = this;
          this.extendSelectionsBy(function(o) {
            return l.display.shift || l.doc.extend || o.empty() ? kn(l.doc, o.head, r, n, l.options.rtlMoveVisually) : r < 0 ? o.from() : o.to();
          }, Yt);
        }),
        deleteH: ne(function(r, n) {
          var l = this.doc.sel, o = this.doc;
          l.somethingSelected() ? o.replaceSelection("", null, "+delete") : Bt(this, function(a) {
            var s = kn(o, a.head, r, n, !1);
            return r < 0 ? { from: s, to: a.head } : { from: a.head, to: s };
          });
        }),
        findPosV: function(r, n, l, o) {
          var a = 1, s = o;
          n < 0 && (a = -1, n = -n);
          for (var u = D(this.doc, r), f = 0; f < n; ++f) {
            var h = Le(this, u, "div");
            if (s == null ? s = h.left : h.left = s, u = zo(this, h, a, l), u.hitSide)
              break;
          }
          return u;
        },
        moveV: ne(function(r, n) {
          var l = this, o = this.doc, a = [], s = !this.display.shift && !o.extend && o.sel.somethingSelected();
          if (o.extendSelectionsBy(function(f) {
            if (s)
              return r < 0 ? f.from() : f.to();
            var h = Le(l, f.head, "div");
            f.goalColumn != null && (h.left = f.goalColumn), a.push(h.left);
            var d = zo(l, h, r, n);
            return n == "page" && f == o.sel.primary() && ln(l, Yr(l, d, "div").top - h.top), d;
          }, Yt), a.length)
            for (var u = 0; u < o.sel.ranges.length; u++)
              o.sel.ranges[u].goalColumn = a[u];
        }),
        // Find the word at the given position (as returned by coordsChar).
        findWordAt: function(r) {
          var n = this.doc, l = w(n, r.line).text, o = r.ch, a = r.ch;
          if (l) {
            var s = this.getHelper(r, "wordChars");
            (r.sticky == "before" || a == l.length) && o ? --o : ++a;
            for (var u = l.charAt(o), f = Hr(u, s) ? function(h) {
              return Hr(h, s);
            } : /\s/.test(u) ? function(h) {
              return /\s/.test(h);
            } : function(h) {
              return !/\s/.test(h) && !Hr(h);
            }; o > 0 && f(l.charAt(o - 1)); )
              --o;
            for (; a < l.length && f(l.charAt(a)); )
              ++a;
          }
          return new O(g(r.line, o), g(r.line, a));
        },
        toggleOverwrite: function(r) {
          r != null && r == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? nt(this.display.cursorDiv, "CodeMirror-overwrite") : rt(this.display.cursorDiv, "CodeMirror-overwrite"), G(this, "overwriteToggle", this, this.state.overwrite));
        },
        hasFocus: function() {
          return this.display.input.getField() == me(we(this));
        },
        isReadOnly: function() {
          return !!(this.options.readOnly || this.doc.cantEdit);
        },
        scrollTo: ne(function(r, n) {
          lr(this, r, n);
        }),
        getScrollInfo: function() {
          var r = this.display.scroller;
          return {
            left: r.scrollLeft,
            top: r.scrollTop,
            height: r.scrollHeight - Ae(this) - this.display.barHeight,
            width: r.scrollWidth - Ae(this) - this.display.barWidth,
            clientHeight: _i(this),
            clientWidth: ut(this)
          };
        },
        scrollIntoView: ne(function(r, n) {
          r == null ? (r = { from: this.doc.sel.primary().head, to: null }, n == null && (n = this.options.cursorScrollMargin)) : typeof r == "number" ? r = { from: g(r, 0), to: null } : r.from == null && (r = { from: r, to: null }), r.to || (r.to = r.from), r.margin = n || 0, r.from.line != null ? $a(this, r) : Ol(this, r.from, r.to, r.margin);
        }),
        setSize: ne(function(r, n) {
          var l = this, o = function(s) {
            return typeof s == "number" || /^\d+$/.test(String(s)) ? s + "px" : s;
          };
          r != null && (this.display.wrapper.style.width = o(r)), n != null && (this.display.wrapper.style.height = o(n)), this.options.lineWrapping && bl(this);
          var a = this.display.viewFrom;
          this.doc.iter(a, this.display.viewTo, function(s) {
            if (s.widgets) {
              for (var u = 0; u < s.widgets.length; u++)
                if (s.widgets[u].noHScroll) {
                  Xe(l, a, "widget");
                  break;
                }
            }
            ++a;
          }), this.curOp.forceUpdate = !0, G(this, "refresh", this);
        }),
        operation: function(r) {
          return ce(this, r);
        },
        startOperation: function() {
          return vt(this);
        },
        endOperation: function() {
          return gt(this);
        },
        refresh: ne(function() {
          var r = this.display.cachedTextHeight;
          ae(this), this.curOp.forceUpdate = !0, ir(this), lr(this, this.doc.scrollLeft, this.doc.scrollTop), sn(this.display), (r == null || Math.abs(r - Mt(this.display)) > 0.5 || this.options.lineWrapping) && Vi(this), G(this, "refresh", this);
        }),
        swapDoc: ne(function(r) {
          var n = this.doc;
          return n.cm = null, this.state.selectingText && this.state.selectingText(), Xl(this, r), ir(this), this.display.input.reset(), lr(this, r.scrollLeft, r.scrollTop), this.curOp.forceScroll = !0, q(this, "swapDoc", this, n), n;
        }),
        phrase: function(r) {
          var n = this.options.phrases;
          return n && Object.prototype.hasOwnProperty.call(n, r) ? n[r] : r;
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
      }, Ct(e), e.registerHelper = function(r, n, l) {
        i.hasOwnProperty(r) || (i[r] = e[r] = { _global: [] }), i[r][n] = l;
      }, e.registerGlobalHelper = function(r, n, l, o) {
        e.registerHelper(r, n, o), i[r]._global.push({ pred: l, val: o });
      };
    }
    function kn(e, t, i, r, n) {
      var l = t, o = i, a = w(e, t.line), s = n && e.direction == "rtl" ? -i : i;
      function u() {
        var x = t.line + s;
        return x < e.first || x >= e.first + e.size ? !1 : (t = new g(x, t.ch, t.sticky), a = w(e, x));
      }
      function f(x) {
        var b;
        if (r == "codepoint") {
          var C = a.text.charCodeAt(t.ch + (i > 0 ? 0 : -1));
          if (isNaN(C))
            b = null;
          else {
            var L = i > 0 ? C >= 55296 && C < 56320 : C >= 56320 && C < 57343;
            b = new g(t.line, Math.max(0, Math.min(a.text.length, t.ch + i * (L ? 2 : 1))), -i);
          }
        } else n ? b = Es(e.cm, a, t, i) : b = mn(a, t, i);
        if (b == null)
          if (!x && u())
            t = bn(n, e.cm, a, t.line, s);
          else
            return !1;
        else
          t = b;
        return !0;
      }
      if (r == "char" || r == "codepoint")
        f();
      else if (r == "column")
        f(!0);
      else if (r == "word" || r == "group")
        for (var h = null, d = r == "group", c = e.cm && e.cm.getHelper(t, "wordChars"), p = !0; !(i < 0 && !f(!p)); p = !1) {
          var v = a.text.charAt(t.ch) || `
`, y = Hr(v, c) ? "w" : d && v == `
` ? "n" : !d || /\s/.test(v) ? null : "p";
          if (d && !p && !y && (y = "s"), h && h != y) {
            i < 0 && (i = 1, f(), t.sticky = "after");
            break;
          }
          if (y && (h = y), i > 0 && !f(!p))
            break;
        }
      var m = ni(e, t, l, o, !0);
      return Hi(l, m) && (m.hitSide = !0), m;
    }
    function zo(e, t, i, r) {
      var n = e.doc, l = t.left, o;
      if (r == "page") {
        var a = Math.min(e.display.wrapper.clientHeight, Nr(e).innerHeight || n(e).documentElement.clientHeight), s = Math.max(a - 0.5 * Mt(e.display), 3);
        o = (i > 0 ? t.bottom : t.top) + i * s;
      } else r == "line" && (o = i > 0 ? t.bottom + 3 : t.top - 3);
      for (var u; u = Zi(e, l, o), !!u.outside; ) {
        if (i < 0 ? o <= 0 : o >= n.height) {
          u.hitSide = !0;
          break;
        }
        o += i * 5;
      }
      return u;
    }
    var F = function(e) {
      this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Ke(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
    };
    F.prototype.init = function(e) {
      var t = this, i = this, r = i.cm, n = i.div = e.lineDiv;
      n.contentEditable = !0, Bo(n, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize);
      function l(a) {
        for (var s = a.target; s; s = s.parentNode) {
          if (s == n)
            return !0;
          if (/\bCodeMirror-(?:line)?widget\b/.test(s.className))
            break;
        }
        return !1;
      }
      T(n, "paste", function(a) {
        !l(a) || Y(r, a) || Po(a, r) || E <= 11 && setTimeout(Z(r, function() {
          return t.updateFromDOM();
        }), 20);
      }), T(n, "compositionstart", function(a) {
        t.composing = { data: a.data, done: !1 };
      }), T(n, "compositionupdate", function(a) {
        t.composing || (t.composing = { data: a.data, done: !1 });
      }), T(n, "compositionend", function(a) {
        t.composing && (a.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
      }), T(n, "touchstart", function() {
        return i.forceCompositionEnd();
      }), T(n, "input", function() {
        t.composing || t.readFromDOMSoon();
      });
      function o(a) {
        if (!(!l(a) || Y(r, a))) {
          if (r.somethingSelected())
            fi({ lineWise: !1, text: r.getSelections() }), a.type == "cut" && r.replaceSelection("", null, "cut");
          else if (r.options.lineWiseCopyCut) {
            var s = Io(r);
            fi({ lineWise: !0, text: s.text }), a.type == "cut" && r.operation(function() {
              r.setSelections(s.ranges, 0, Me), r.replaceSelection("", null, "cut");
            });
          } else
            return;
          if (a.clipboardData) {
            a.clipboardData.clearData();
            var u = Te.text.join(`
`);
            if (a.clipboardData.setData("Text", u), a.clipboardData.getData("Text") == u) {
              a.preventDefault();
              return;
            }
          }
          var f = Ro(), h = f.firstChild;
          r.display.lineSpace.insertBefore(f, r.display.lineSpace.firstChild), h.value = Te.text.join(`
`);
          var d = me(n.ownerDocument);
          Xt(h), setTimeout(function() {
            r.display.lineSpace.removeChild(f), d.focus(), d == n && i.showPrimarySelection();
          }, 50);
        }
      }
      T(n, "copy", o), T(n, "cut", o);
    }, F.prototype.screenReaderLabelChanged = function(e) {
      e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label");
    }, F.prototype.prepareSelection = function() {
      var e = Dl(this.cm, !1);
      return e.focus = me(this.div.ownerDocument) == this.div, e;
    }, F.prototype.showSelection = function(e, t) {
      !e || !this.cm.display.view.length || ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
    }, F.prototype.getSelection = function() {
      return this.cm.display.wrapper.ownerDocument.getSelection();
    }, F.prototype.showPrimarySelection = function() {
      var e = this.getSelection(), t = this.cm, i = t.doc.sel.primary(), r = i.from(), n = i.to();
      if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || n.line < t.display.viewFrom) {
        e.removeAllRanges();
        return;
      }
      var l = hi(t, e.anchorNode, e.anchorOffset), o = hi(t, e.focusNode, e.focusOffset);
      if (!(l && !l.bad && o && !o.bad && M(Er(l, o), r) == 0 && M(Pr(l, o), n) == 0)) {
        var a = t.display.view, s = r.line >= t.display.viewFrom && Go(t, r) || { node: a[0].measure.map[2], offset: 0 }, u = n.line < t.display.viewTo && Go(t, n);
        if (!u) {
          var f = a[a.length - 1].measure, h = f.maps ? f.maps[f.maps.length - 1] : f.map;
          u = { node: h[h.length - 1], offset: h[h.length - 2] - h[h.length - 3] };
        }
        if (!s || !u) {
          e.removeAllRanges();
          return;
        }
        var d = e.rangeCount && e.getRangeAt(0), c;
        try {
          c = it(s.node, s.offset, u.offset, u.node);
        } catch {
        }
        c && (!He && t.state.focused ? (e.collapse(s.node, s.offset), c.collapsed || (e.removeAllRanges(), e.addRange(c))) : (e.removeAllRanges(), e.addRange(c)), d && e.anchorNode == null ? e.addRange(d) : He && this.startGracePeriod()), this.rememberSelection();
      }
    }, F.prototype.startGracePeriod = function() {
      var e = this;
      clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
        e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
          return e.cm.curOp.selectionChanged = !0;
        });
      }, 20);
    }, F.prototype.showMultipleSelections = function(e) {
      pe(this.cm.display.cursorDiv, e.cursors), pe(this.cm.display.selectionDiv, e.selection);
    }, F.prototype.rememberSelection = function() {
      var e = this.getSelection();
      this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
    }, F.prototype.selectionInEditor = function() {
      var e = this.getSelection();
      if (!e.rangeCount)
        return !1;
      var t = e.getRangeAt(0).commonAncestorContainer;
      return Ue(this.div, t);
    }, F.prototype.focus = function() {
      this.cm.options.readOnly != "nocursor" && ((!this.selectionInEditor() || me(this.div.ownerDocument) != this.div) && this.showSelection(this.prepareSelection(), !0), this.div.focus());
    }, F.prototype.blur = function() {
      this.div.blur();
    }, F.prototype.getField = function() {
      return this.div;
    }, F.prototype.supportsTouch = function() {
      return !0;
    }, F.prototype.receivedFocus = function() {
      var e = this, t = this;
      this.selectionInEditor() ? setTimeout(function() {
        return e.pollSelection();
      }, 20) : ce(this.cm, function() {
        return t.cm.curOp.selectionChanged = !0;
      });
      function i() {
        t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, i));
      }
      this.polling.set(this.cm.options.pollInterval, i);
    }, F.prototype.selectionChanged = function() {
      var e = this.getSelection();
      return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
    }, F.prototype.pollSelection = function() {
      if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
        var e = this.getSelection(), t = this.cm;
        if (Dr && et && this.cm.display.gutterSpecs.length && ru(e.anchorNode)) {
          this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
          return;
        }
        if (!this.composing) {
          this.rememberSelection();
          var i = hi(t, e.anchorNode, e.anchorOffset), r = hi(t, e.focusNode, e.focusOffset);
          i && r && ce(t, function() {
            ee(t.doc, qe(i, r), Me), (i.bad || r.bad) && (t.curOp.selectionChanged = !0);
          });
        }
      }
    }, F.prototype.pollContent = function() {
      this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
      var e = this.cm, t = e.display, i = e.doc.sel.primary(), r = i.from(), n = i.to();
      if (r.ch == 0 && r.line > e.firstLine() && (r = g(r.line - 1, w(e.doc, r.line - 1).length)), n.ch == w(e.doc, n.line).text.length && n.line < e.lastLine() && (n = g(n.line + 1, 0)), r.line < t.viewFrom || n.line > t.viewTo - 1)
        return !1;
      var l, o, a;
      r.line == t.viewFrom || (l = ct(e, r.line)) == 0 ? (o = H(t.view[0].line), a = t.view[0].node) : (o = H(t.view[l].line), a = t.view[l - 1].node.nextSibling);
      var s = ct(e, n.line), u, f;
      if (s == t.view.length - 1 ? (u = t.viewTo - 1, f = t.lineDiv.lastChild) : (u = H(t.view[s + 1].line) - 1, f = t.view[s + 1].node.previousSibling), !a)
        return !1;
      for (var h = e.doc.splitLines(iu(e, a, f, o, u)), d = at(e.doc, g(o, 0), g(u, w(e.doc, u).text.length)); h.length > 1 && d.length > 1; )
        if (W(h) == W(d))
          h.pop(), d.pop(), u--;
        else if (h[0] == d[0])
          h.shift(), d.shift(), o++;
        else
          break;
      for (var c = 0, p = 0, v = h[0], y = d[0], m = Math.min(v.length, y.length); c < m && v.charCodeAt(c) == y.charCodeAt(c); )
        ++c;
      for (var x = W(h), b = W(d), C = Math.min(
        x.length - (h.length == 1 ? c : 0),
        b.length - (d.length == 1 ? c : 0)
      ); p < C && x.charCodeAt(x.length - p - 1) == b.charCodeAt(b.length - p - 1); )
        ++p;
      if (h.length == 1 && d.length == 1 && o == r.line)
        for (; c && c > r.ch && x.charCodeAt(x.length - p - 1) == b.charCodeAt(b.length - p - 1); )
          c--, p++;
      h[h.length - 1] = x.slice(0, x.length - p).replace(/^\u200b+/, ""), h[0] = h[0].slice(c).replace(/\u200b+$/, "");
      var L = g(o, c), S = g(u, d.length ? W(d).length - p : 0);
      if (h.length > 1 || h[0] || M(L, S))
        return Pt(e.doc, h, L, S, "+input"), !0;
    }, F.prototype.ensurePolled = function() {
      this.forceCompositionEnd();
    }, F.prototype.reset = function() {
      this.forceCompositionEnd();
    }, F.prototype.forceCompositionEnd = function() {
      this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
    }, F.prototype.readFromDOMSoon = function() {
      var e = this;
      this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
        if (e.readDOMTimeout = null, e.composing)
          if (e.composing.done)
            e.composing = null;
          else
            return;
        e.updateFromDOM();
      }, 80));
    }, F.prototype.updateFromDOM = function() {
      var e = this;
      (this.cm.isReadOnly() || !this.pollContent()) && ce(this.cm, function() {
        return ae(e.cm);
      });
    }, F.prototype.setUneditable = function(e) {
      e.contentEditable = "false";
    }, F.prototype.onKeyPress = function(e) {
      e.charCode == 0 || this.composing || (e.preventDefault(), this.cm.isReadOnly() || Z(this.cm, Ln)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0));
    }, F.prototype.readOnlyChanged = function(e) {
      this.div.contentEditable = String(e != "nocursor");
    }, F.prototype.onContextMenu = function() {
    }, F.prototype.resetPosition = function() {
    }, F.prototype.needsContentAttribute = !0;
    function Go(e, t) {
      var i = Xi(e, t.line);
      if (!i || i.hidden)
        return null;
      var r = w(e.doc, t.line), n = pl(i, r, t.line), l = Fe(r, e.doc.direction), o = "left";
      if (l) {
        var a = Qt(l, t.ch);
        o = a % 2 ? "right" : "left";
      }
      var s = yl(n.map, t.ch, o);
      return s.offset = s.collapse == "right" ? s.end : s.start, s;
    }
    function ru(e) {
      for (var t = e; t; t = t.parentNode)
        if (/CodeMirror-gutter-wrapper/.test(t.className))
          return !0;
      return !1;
    }
    function zt(e, t) {
      return t && (e.bad = !0), e;
    }
    function iu(e, t, i, r, n) {
      var l = "", o = !1, a = e.doc.lineSeparator(), s = !1;
      function u(c) {
        return function(p) {
          return p.id == c;
        };
      }
      function f() {
        o && (l += a, s && (l += a), o = s = !1);
      }
      function h(c) {
        c && (f(), l += c);
      }
      function d(c) {
        if (c.nodeType == 1) {
          var p = c.getAttribute("cm-text");
          if (p) {
            h(p);
            return;
          }
          var v = c.getAttribute("cm-marker"), y;
          if (v) {
            var m = e.findMarks(g(r, 0), g(n + 1, 0), u(+v));
            m.length && (y = m[0].find(0)) && h(at(e.doc, y.from, y.to).join(a));
            return;
          }
          if (c.getAttribute("contenteditable") == "false")
            return;
          var x = /^(pre|div|p|li|table|br)$/i.test(c.nodeName);
          if (!/^br$/i.test(c.nodeName) && c.textContent.length == 0)
            return;
          x && f();
          for (var b = 0; b < c.childNodes.length; b++)
            d(c.childNodes[b]);
          /^(pre|p)$/i.test(c.nodeName) && (s = !0), x && (o = !0);
        } else c.nodeType == 3 && h(c.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
      }
      for (; d(t), t != i; )
        t = t.nextSibling, s = !1;
      return l;
    }
    function hi(e, t, i) {
      var r;
      if (t == e.display.lineDiv) {
        if (r = e.display.lineDiv.childNodes[i], !r)
          return zt(e.clipPos(g(e.display.viewTo - 1)), !0);
        t = null, i = 0;
      } else
        for (r = t; ; r = r.parentNode) {
          if (!r || r == e.display.lineDiv)
            return null;
          if (r.parentNode && r.parentNode == e.display.lineDiv)
            break;
        }
      for (var n = 0; n < e.display.view.length; n++) {
        var l = e.display.view[n];
        if (l.node == r)
          return nu(l, t, i);
      }
    }
    function nu(e, t, i) {
      var r = e.text.firstChild, n = !1;
      if (!t || !Ue(r, t))
        return zt(g(H(e.line), 0), !0);
      if (t == r && (n = !0, t = r.childNodes[i], i = 0, !t)) {
        var l = e.rest ? W(e.rest) : e.line;
        return zt(g(H(l), l.text.length), n);
      }
      var o = t.nodeType == 3 ? t : null, a = t;
      for (!o && t.childNodes.length == 1 && t.firstChild.nodeType == 3 && (o = t.firstChild, i && (i = o.nodeValue.length)); a.parentNode != r; )
        a = a.parentNode;
      var s = e.measure, u = s.maps;
      function f(y, m, x) {
        for (var b = -1; b < (u ? u.length : 0); b++)
          for (var C = b < 0 ? s.map : u[b], L = 0; L < C.length; L += 3) {
            var S = C[L + 2];
            if (S == y || S == m) {
              var N = H(b < 0 ? e.line : e.rest[b]), P = C[L] + x;
              return (x < 0 || S != y) && (P = C[L + (x ? 1 : 0)]), g(N, P);
            }
          }
      }
      var h = f(o, a, i);
      if (h)
        return zt(h, n);
      for (var d = a.nextSibling, c = o ? o.nodeValue.length - i : 0; d; d = d.nextSibling) {
        if (h = f(d, d.firstChild, 0), h)
          return zt(g(h.line, h.ch - c), n);
        c += d.textContent.length;
      }
      for (var p = a.previousSibling, v = i; p; p = p.previousSibling) {
        if (h = f(p, p.firstChild, -1), h)
          return zt(g(h.line, h.ch + v), n);
        v += p.textContent.length;
      }
    }
    var z = function(e) {
      this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Ke(), this.hasSelection = !1, this.composing = null;
    };
    z.prototype.init = function(e) {
      var t = this, i = this, r = this.cm;
      this.createField(e);
      var n = this.textarea;
      e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), Kt && (n.style.width = "0px"), T(n, "input", function() {
        A && E >= 9 && t.hasSelection && (t.hasSelection = null), i.poll();
      }), T(n, "paste", function(o) {
        Y(r, o) || Po(o, r) || (r.state.pasteIncoming = +/* @__PURE__ */ new Date(), i.fastPoll());
      });
      function l(o) {
        if (!Y(r, o)) {
          if (r.somethingSelected())
            fi({ lineWise: !1, text: r.getSelections() });
          else if (r.options.lineWiseCopyCut) {
            var a = Io(r);
            fi({ lineWise: !0, text: a.text }), o.type == "cut" ? r.setSelections(a.ranges, null, Me) : (i.prevInput = "", n.value = a.text.join(`
`), Xt(n));
          } else
            return;
          o.type == "cut" && (r.state.cutIncoming = +/* @__PURE__ */ new Date());
        }
      }
      T(n, "cut", l), T(n, "copy", l), T(e.scroller, "paste", function(o) {
        if (!(Ie(e, o) || Y(r, o))) {
          if (!n.dispatchEvent) {
            r.state.pasteIncoming = +/* @__PURE__ */ new Date(), i.focus();
            return;
          }
          var a = new Event("paste");
          a.clipboardData = o.clipboardData, n.dispatchEvent(a);
        }
      }), T(e.lineSpace, "selectstart", function(o) {
        Ie(e, o) || oe(o);
      }), T(n, "compositionstart", function() {
        var o = r.getCursor("from");
        i.composing && i.composing.range.clear(), i.composing = {
          start: o,
          range: r.markText(o, r.getCursor("to"), { className: "CodeMirror-composing" })
        };
      }), T(n, "compositionend", function() {
        i.composing && (i.poll(), i.composing.range.clear(), i.composing = null);
      });
    }, z.prototype.createField = function(e) {
      this.wrapper = Ro(), this.textarea = this.wrapper.firstChild;
    }, z.prototype.screenReaderLabelChanged = function(e) {
      e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label");
    }, z.prototype.prepareSelection = function() {
      var e = this.cm, t = e.display, i = e.doc, r = Dl(e);
      if (e.options.moveInputWithCursor) {
        var n = Le(e, i.sel.primary().head, "div"), l = t.wrapper.getBoundingClientRect(), o = t.lineDiv.getBoundingClientRect();
        r.teTop = Math.max(0, Math.min(
          t.wrapper.clientHeight - 10,
          n.top + o.top - l.top
        )), r.teLeft = Math.max(0, Math.min(
          t.wrapper.clientWidth - 10,
          n.left + o.left - l.left
        ));
      }
      return r;
    }, z.prototype.showSelection = function(e) {
      var t = this.cm, i = t.display;
      pe(i.cursorDiv, e.cursors), pe(i.selectionDiv, e.selection), e.teTop != null && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
    }, z.prototype.reset = function(e) {
      if (!(this.contextMenuPending || this.composing)) {
        var t = this.cm;
        if (t.somethingSelected()) {
          this.prevInput = "";
          var i = t.getSelection();
          this.textarea.value = i, t.state.focused && Xt(this.textarea), A && E >= 9 && (this.hasSelection = i);
        } else e || (this.prevInput = this.textarea.value = "", A && E >= 9 && (this.hasSelection = null));
      }
    }, z.prototype.getField = function() {
      return this.textarea;
    }, z.prototype.supportsTouch = function() {
      return !1;
    }, z.prototype.focus = function() {
      if (this.cm.options.readOnly != "nocursor" && (!_t || me(this.textarea.ownerDocument) != this.textarea))
        try {
          this.textarea.focus();
        } catch {
        }
    }, z.prototype.blur = function() {
      this.textarea.blur();
    }, z.prototype.resetPosition = function() {
      this.wrapper.style.top = this.wrapper.style.left = 0;
    }, z.prototype.receivedFocus = function() {
      this.slowPoll();
    }, z.prototype.slowPoll = function() {
      var e = this;
      this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
        e.poll(), e.cm.state.focused && e.slowPoll();
      });
    }, z.prototype.fastPoll = function() {
      var e = !1, t = this;
      t.pollingFast = !0;
      function i() {
        var r = t.poll();
        !r && !e ? (e = !0, t.polling.set(60, i)) : (t.pollingFast = !1, t.slowPoll());
      }
      t.polling.set(20, i);
    }, z.prototype.poll = function() {
      var e = this, t = this.cm, i = this.textarea, r = this.prevInput;
      if (this.contextMenuPending || !t.state.focused || ia(i) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq)
        return !1;
      var n = i.value;
      if (n == r && !t.somethingSelected())
        return !1;
      if (A && E >= 9 && this.hasSelection === n || ye && /[\uf700-\uf7ff]/.test(n))
        return t.display.input.reset(), !1;
      if (t.doc.sel == t.display.selForContextMenu) {
        var l = n.charCodeAt(0);
        if (l == 8203 && !r && (r = "​"), l == 8666)
          return this.reset(), this.cm.execCommand("undo");
      }
      for (var o = 0, a = Math.min(r.length, n.length); o < a && r.charCodeAt(o) == n.charCodeAt(o); )
        ++o;
      return ce(t, function() {
        Ln(
          t,
          n.slice(o),
          r.length - o,
          null,
          e.composing ? "*compose" : null
        ), n.length > 1e3 || n.indexOf(`
`) > -1 ? i.value = e.prevInput = "" : e.prevInput = n, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(
          e.composing.start,
          t.getCursor("to"),
          { className: "CodeMirror-composing" }
        ));
      }), !0;
    }, z.prototype.ensurePolled = function() {
      this.pollingFast && this.poll() && (this.pollingFast = !1);
    }, z.prototype.onKeyPress = function() {
      A && E >= 9 && (this.hasSelection = null), this.fastPoll();
    }, z.prototype.onContextMenu = function(e) {
      var t = this, i = t.cm, r = i.display, n = t.textarea;
      t.contextMenuPending && t.contextMenuPending();
      var l = ht(i, e), o = r.scroller.scrollTop;
      if (!l || Ce)
        return;
      var a = i.options.resetSelectionOnContextMenu;
      a && i.doc.sel.contains(l) == -1 && Z(i, ee)(i.doc, qe(l), Me);
      var s = n.style.cssText, u = t.wrapper.style.cssText, f = t.wrapper.offsetParent.getBoundingClientRect();
      t.wrapper.style.cssText = "position: static", n.style.cssText = `position: absolute; width: 30px; height: 30px;
      top: ` + (e.clientY - f.top - 5) + "px; left: " + (e.clientX - f.left - 5) + `px;
      z-index: 1000; background: ` + (A ? "rgba(255, 255, 255, .05)" : "transparent") + `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;
      var h;
      ie && (h = n.ownerDocument.defaultView.scrollY), r.input.focus(), ie && n.ownerDocument.defaultView.scrollTo(null, h), r.input.reset(), i.somethingSelected() || (n.value = t.prevInput = " "), t.contextMenuPending = c, r.selForContextMenu = i.doc.sel, clearTimeout(r.detectingSelectAll);
      function d() {
        if (n.selectionStart != null) {
          var v = i.somethingSelected(), y = "​" + (v ? n.value : "");
          n.value = "⇚", n.value = y, t.prevInput = v ? "" : "​", n.selectionStart = 1, n.selectionEnd = y.length, r.selForContextMenu = i.doc.sel;
        }
      }
      function c() {
        if (t.contextMenuPending == c && (t.contextMenuPending = !1, t.wrapper.style.cssText = u, n.style.cssText = s, A && E < 9 && r.scrollbars.setScrollTop(r.scroller.scrollTop = o), n.selectionStart != null)) {
          (!A || A && E < 9) && d();
          var v = 0, y = function() {
            r.selForContextMenu == i.doc.sel && n.selectionStart == 0 && n.selectionEnd > 0 && t.prevInput == "​" ? Z(i, no)(i) : v++ < 10 ? r.detectingSelectAll = setTimeout(y, 500) : (r.selForContextMenu = null, r.input.reset());
          };
          r.detectingSelectAll = setTimeout(y, 200);
        }
      }
      if (A && E >= 9 && d(), di) {
        Jt(e);
        var p = function() {
          ve(window, "mouseup", p), setTimeout(c, 20);
        };
        T(window, "mouseup", p);
      } else
        setTimeout(c, 50);
    }, z.prototype.readOnlyChanged = function(e) {
      e || this.reset(), this.textarea.disabled = e == "nocursor", this.textarea.readOnly = !!e;
    }, z.prototype.setUneditable = function() {
    }, z.prototype.needsContentAttribute = !1;
    function lu(e, t) {
      if (t = t ? lt(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), t.autofocus == null) {
        var i = me(e.ownerDocument);
        t.autofocus = i == e || e.getAttribute("autofocus") != null && i == document.body;
      }
      function r() {
        e.value = a.getValue();
      }
      var n;
      if (e.form && (T(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
        var l = e.form;
        n = l.submit;
        try {
          var o = l.submit = function() {
            r(), l.submit = n, l.submit(), l.submit = o;
          };
        } catch {
        }
      }
      t.finishInit = function(s) {
        s.save = r, s.getTextArea = function() {
          return e;
        }, s.toTextArea = function() {
          s.toTextArea = isNaN, r(), e.parentNode.removeChild(s.getWrapperElement()), e.style.display = "", e.form && (ve(e.form, "submit", r), !t.leaveSubmitMethodAlone && typeof e.form.submit == "function" && (e.form.submit = n));
        };
      }, e.style.display = "none";
      var a = I(
        function(s) {
          return e.parentNode.insertBefore(s, e.nextSibling);
        },
        t
      );
      return a;
    }
    function ou(e) {
      e.off = ve, e.on = T, e.wheelEventPixels = ds, e.Doc = se, e.splitLines = Ti, e.countColumn = be, e.findColumn = yi, e.isWordChar = bi, e.Pass = Ar, e.signal = G, e.Line = Lt, e.changeEnd = Ze, e.scrollbarModel = Fl, e.Pos = g, e.cmpPos = M, e.modes = Di, e.mimeModes = wt, e.resolveMode = Fr, e.getMode = Ni, e.modeExtensions = St, e.extendMode = sa, e.copyState = ot, e.startState = zn, e.innerMode = Ai, e.commands = xr, e.keyMap = Re, e.keyName = Co, e.isModifierKey = bo, e.lookupKey = It, e.normalizeKeyMap = Ps, e.StringStream = U, e.SharedTextMarker = yr, e.TextMarker = Je, e.LineWidget = gr, e.e_preventDefault = oe, e.e_stopPropagation = Bn, e.e_stop = Jt, e.addClass = nt, e.contains = Ue, e.rmClass = rt, e.keyNames = je;
    }
    js(I), tu(I);
    var au = "iter insert remove copy getEditor constructor".split(" ");
    for (var ci in se.prototype)
      se.prototype.hasOwnProperty(ci) && $(au, ci) < 0 && (I.prototype[ci] = /* @__PURE__ */ function(e) {
        return function() {
          return e.apply(this.doc, arguments);
        };
      }(se.prototype[ci]));
    return Ct(se), I.inputStyles = { textarea: z, contenteditable: F }, I.defineMode = function(e) {
      !I.defaults.mode && e != "null" && (I.defaults.mode = e), oa.apply(this, arguments);
    }, I.defineMIME = aa, I.defineMode("null", function() {
      return { token: function(e) {
        return e.skipToEnd();
      } };
    }), I.defineMIME("text/plain", "null"), I.defineExtension = function(e, t) {
      I.prototype[e] = t;
    }, I.defineDocExtension = function(e, t) {
      se.prototype[e] = t;
    }, I.fromTextArea = lu, ou(I), I.version = "6.65.7", I;
  });
})(Uo);
var hu = Uo.exports;
export {
  hu as c,
  fu as g
};
