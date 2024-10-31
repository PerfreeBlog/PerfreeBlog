import { t as b, N as Wi, s as Ir, T as Pt, a as Nr, b as ce, I as hs, c as De, P as Fr, h as Hr, p as Vr, d as Wr } from "./@lezer.js";
import { S as gt } from "./style-mod.js";
import { k as zr, b as $r, s as Kr } from "./w3c-keyname.js";
class M {
  /**
  Get the line description around the given position.
  */
  lineAt(t) {
    if (t < 0 || t > this.length)
      throw new RangeError(`Invalid position ${t} in document of length ${this.length}`);
    return this.lineInner(t, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(t) {
    if (t < 1 || t > this.lines)
      throw new RangeError(`Invalid line number ${t} in ${this.lines}-line document`);
    return this.lineInner(t, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(t, e, i) {
    [t, e] = Nt(this, t, e);
    let n = [];
    return this.decompose(
      0,
      t,
      n,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      n,
      3
      /* Open.To */
    ), this.decompose(
      e,
      this.length,
      n,
      1
      /* Open.From */
    ), et.from(n, this.length - (e - t) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(t) {
    return this.replace(this.length, this.length, t);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(t, e = this.length) {
    [t, e] = Nt(this, t, e);
    let i = [];
    return this.decompose(t, e, i, 0), et.from(i, e - t);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(t) {
    if (t == this)
      return !0;
    if (t.length != this.length || t.lines != this.lines)
      return !1;
    let e = this.scanIdentical(t, 1), i = this.length - this.scanIdentical(t, -1), n = new _t(this), r = new _t(t);
    for (let o = e, l = e; ; ) {
      if (n.next(o), r.next(o), o = 0, n.lineBreak != r.lineBreak || n.done != r.done || n.value != r.value)
        return !1;
      if (l += n.value.length, n.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(t = 1) {
    return new _t(this, t);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(t, e = this.length) {
    return new as(this, t, e);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(t, e) {
    let i;
    if (t == null)
      i = this.iter();
    else {
      e == null && (e = this.lines + 1);
      let n = this.line(t).from;
      i = this.iterRange(n, Math.max(n, e == this.lines + 1 ? this.length : e <= 1 ? 0 : this.line(e - 1).to));
    }
    return new cs(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let t = [];
    return this.flatten(t), t;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(t) {
    if (t.length == 0)
      throw new RangeError("A document must have at least one line");
    return t.length == 1 && !t[0] ? M.empty : t.length <= 32 ? new I(t) : et.from(I.split(t, []));
  }
}
class I extends M {
  constructor(t, e = qr(t)) {
    super(), this.text = t, this.length = e;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(t, e, i, n) {
    for (let r = 0; ; r++) {
      let o = this.text[r], l = n + o.length;
      if ((e ? i : l) >= t)
        return new jr(n, l, i, o);
      n = l + 1, i++;
    }
  }
  decompose(t, e, i, n) {
    let r = t <= 0 && e >= this.length ? this : new I(sn(this.text, t, e), Math.min(e, this.length) - Math.max(0, t));
    if (n & 1) {
      let o = i.pop(), l = Oe(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        i.push(new I(l, o.length + r.length));
      else {
        let h = l.length >> 1;
        i.push(new I(l.slice(0, h)), new I(l.slice(h)));
      }
    } else
      i.push(r);
  }
  replace(t, e, i) {
    if (!(i instanceof I))
      return super.replace(t, e, i);
    [t, e] = Nt(this, t, e);
    let n = Oe(this.text, Oe(i.text, sn(this.text, 0, t)), e), r = this.length + i.length - (e - t);
    return n.length <= 32 ? new I(n, r) : et.from(I.split(n, []), r);
  }
  sliceString(t, e = this.length, i = `
`) {
    [t, e] = Nt(this, t, e);
    let n = "";
    for (let r = 0, o = 0; r <= e && o < this.text.length; o++) {
      let l = this.text[o], h = r + l.length;
      r > t && o && (n += i), t < h && e > r && (n += l.slice(Math.max(0, t - r), e - r)), r = h + 1;
    }
    return n;
  }
  flatten(t) {
    for (let e of this.text)
      t.push(e);
  }
  scanIdentical() {
    return 0;
  }
  static split(t, e) {
    let i = [], n = -1;
    for (let r of t)
      i.push(r), n += r.length + 1, i.length == 32 && (e.push(new I(i, n)), i = [], n = -1);
    return n > -1 && e.push(new I(i, n)), e;
  }
}
class et extends M {
  constructor(t, e) {
    super(), this.children = t, this.length = e, this.lines = 0;
    for (let i of t)
      this.lines += i.lines;
  }
  lineInner(t, e, i, n) {
    for (let r = 0; ; r++) {
      let o = this.children[r], l = n + o.length, h = i + o.lines - 1;
      if ((e ? h : l) >= t)
        return o.lineInner(t, e, i, n);
      n = l + 1, i = h + 1;
    }
  }
  decompose(t, e, i, n) {
    for (let r = 0, o = 0; o <= e && r < this.children.length; r++) {
      let l = this.children[r], h = o + l.length;
      if (t <= h && e >= o) {
        let c = n & ((o <= t ? 1 : 0) | (h >= e ? 2 : 0));
        o >= t && h <= e && !c ? i.push(l) : l.decompose(t - o, e - o, i, c);
      }
      o = h + 1;
    }
  }
  replace(t, e, i) {
    if ([t, e] = Nt(this, t, e), i.lines < this.lines)
      for (let n = 0, r = 0; n < this.children.length; n++) {
        let o = this.children[n], l = r + o.length;
        if (t >= r && e <= l) {
          let h = o.replace(t - r, e - r, i), c = this.lines - o.lines + h.lines;
          if (h.lines < c >> 4 && h.lines > c >> 6) {
            let a = this.children.slice();
            return a[n] = h, new et(a, this.length - (e - t) + i.length);
          }
          return super.replace(r, l, h);
        }
        r = l + 1;
      }
    return super.replace(t, e, i);
  }
  sliceString(t, e = this.length, i = `
`) {
    [t, e] = Nt(this, t, e);
    let n = "";
    for (let r = 0, o = 0; r < this.children.length && o <= e; r++) {
      let l = this.children[r], h = o + l.length;
      o > t && r && (n += i), t < h && e > o && (n += l.sliceString(t - o, e - o, i)), o = h + 1;
    }
    return n;
  }
  flatten(t) {
    for (let e of this.children)
      e.flatten(t);
  }
  scanIdentical(t, e) {
    if (!(t instanceof et))
      return 0;
    let i = 0, [n, r, o, l] = e > 0 ? [0, 0, this.children.length, t.children.length] : [this.children.length - 1, t.children.length - 1, -1, -1];
    for (; ; n += e, r += e) {
      if (n == o || r == l)
        return i;
      let h = this.children[n], c = t.children[r];
      if (h != c)
        return i + h.scanIdentical(c, e);
      i += h.length + 1;
    }
  }
  static from(t, e = t.reduce((i, n) => i + n.length + 1, -1)) {
    let i = 0;
    for (let d of t)
      i += d.lines;
    if (i < 32) {
      let d = [];
      for (let p of t)
        p.flatten(d);
      return new I(d, e);
    }
    let n = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), r = n << 1, o = n >> 1, l = [], h = 0, c = -1, a = [];
    function f(d) {
      let p;
      if (d.lines > r && d instanceof et)
        for (let g of d.children)
          f(g);
      else d.lines > o && (h > o || !h) ? (u(), l.push(d)) : d instanceof I && h && (p = a[a.length - 1]) instanceof I && d.lines + p.lines <= 32 ? (h += d.lines, c += d.length + 1, a[a.length - 1] = new I(p.text.concat(d.text), p.length + 1 + d.length)) : (h + d.lines > n && u(), h += d.lines, c += d.length + 1, a.push(d));
    }
    function u() {
      h != 0 && (l.push(a.length == 1 ? a[0] : et.from(a, c)), c = -1, h = a.length = 0);
    }
    for (let d of t)
      f(d);
    return u(), l.length == 1 ? l[0] : new et(l, e);
  }
}
M.empty = /* @__PURE__ */ new I([""], 0);
function qr(s) {
  let t = -1;
  for (let e of s)
    t += e.length + 1;
  return t;
}
function Oe(s, t, e = 0, i = 1e9) {
  for (let n = 0, r = 0, o = !0; r < s.length && n <= i; r++) {
    let l = s[r], h = n + l.length;
    h >= e && (h > i && (l = l.slice(0, i - n)), n < e && (l = l.slice(e - n)), o ? (t[t.length - 1] += l, o = !1) : t.push(l)), n = h + 1;
  }
  return t;
}
function sn(s, t, e) {
  return Oe(s, [""], t, e);
}
class _t {
  constructor(t, e = 1) {
    this.dir = e, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [t], this.offsets = [e > 0 ? 1 : (t instanceof I ? t.text.length : t.children.length) << 1];
  }
  nextInner(t, e) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, n = this.nodes[i], r = this.offsets[i], o = r >> 1, l = n instanceof I ? n.text.length : n.children.length;
      if (o == (e > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        e > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (e > 0 ? 0 : 1)) {
        if (this.offsets[i] += e, t == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        t--;
      } else if (n instanceof I) {
        let h = n.text[o + (e < 0 ? -1 : 0)];
        if (this.offsets[i] += e, h.length > Math.max(0, t))
          return this.value = t == 0 ? h : e > 0 ? h.slice(t) : h.slice(0, h.length - t), this;
        t -= h.length;
      } else {
        let h = n.children[o + (e < 0 ? -1 : 0)];
        t > h.length ? (t -= h.length, this.offsets[i] += e) : (e < 0 && this.offsets[i]--, this.nodes.push(h), this.offsets.push(e > 0 ? 1 : (h instanceof I ? h.text.length : h.children.length) << 1));
      }
    }
  }
  next(t = 0) {
    return t < 0 && (this.nextInner(-t, -this.dir), t = this.value.length), this.nextInner(t, this.dir);
  }
}
class as {
  constructor(t, e, i) {
    this.value = "", this.done = !1, this.cursor = new _t(t, e > i ? -1 : 1), this.pos = e > i ? t.length : 0, this.from = Math.min(e, i), this.to = Math.max(e, i);
  }
  nextInner(t, e) {
    if (e < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    t += Math.max(0, e < 0 ? this.pos - this.to : this.from - this.pos);
    let i = e < 0 ? this.pos - this.from : this.to - this.pos;
    t > i && (t = i), i -= t;
    let { value: n } = this.cursor.next(t);
    return this.pos += (n.length + t) * e, this.value = n.length <= i ? n : e < 0 ? n.slice(n.length - i) : n.slice(0, i), this.done = !this.value, this;
  }
  next(t = 0) {
    return t < 0 ? t = Math.max(t, this.from - this.pos) : t > 0 && (t = Math.min(t, this.to - this.pos)), this.nextInner(t, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class cs {
  constructor(t) {
    this.inner = t, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(t = 0) {
    let { done: e, lineBreak: i, value: n } = this.inner.next(t);
    return e && this.afterBreak ? (this.value = "", this.afterBreak = !1) : e ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = n, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (M.prototype[Symbol.iterator] = function() {
  return this.iter();
}, _t.prototype[Symbol.iterator] = as.prototype[Symbol.iterator] = cs.prototype[Symbol.iterator] = function() {
  return this;
});
class jr {
  /**
  @internal
  */
  constructor(t, e, i, n) {
    this.from = t, this.to = e, this.number = i, this.text = n;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function Nt(s, t, e) {
  return t = Math.max(0, Math.min(s.length, t)), [t, Math.max(t, Math.min(s.length, e))];
}
let Et = /* @__PURE__ */ "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((s) => s ? parseInt(s, 36) : 1);
for (let s = 1; s < Et.length; s++)
  Et[s] += Et[s - 1];
function Xr(s) {
  for (let t = 1; t < Et.length; t += 2)
    if (Et[t] > s)
      return Et[t - 1] <= s;
  return !1;
}
function rn(s) {
  return s >= 127462 && s <= 127487;
}
const on = 8205;
function nt(s, t, e = !0, i = !0) {
  return (e ? fs : Jr)(s, t, i);
}
function fs(s, t, e) {
  if (t == s.length)
    return t;
  t && us(s.charCodeAt(t)) && ds(s.charCodeAt(t - 1)) && t--;
  let i = Pe(s, t);
  for (t += ai(i); t < s.length; ) {
    let n = Pe(s, t);
    if (i == on || n == on || e && Xr(n))
      t += ai(n), i = n;
    else if (rn(n)) {
      let r = 0, o = t - 2;
      for (; o >= 0 && rn(Pe(s, o)); )
        r++, o -= 2;
      if (r % 2 == 0)
        break;
      t += 2;
    } else
      break;
  }
  return t;
}
function Jr(s, t, e) {
  for (; t > 0; ) {
    let i = fs(s, t - 2, e);
    if (i < t)
      return i;
    t--;
  }
  return 0;
}
function us(s) {
  return s >= 56320 && s < 57344;
}
function ds(s) {
  return s >= 55296 && s < 56320;
}
function Pe(s, t) {
  let e = s.charCodeAt(t);
  if (!ds(e) || t + 1 == s.length)
    return e;
  let i = s.charCodeAt(t + 1);
  return us(i) ? (e - 55296 << 10) + (i - 56320) + 65536 : e;
}
function ai(s) {
  return s < 65536 ? 1 : 2;
}
const ci = /\r\n?|\n/;
var K = /* @__PURE__ */ function(s) {
  return s[s.Simple = 0] = "Simple", s[s.TrackDel = 1] = "TrackDel", s[s.TrackBefore = 2] = "TrackBefore", s[s.TrackAfter = 3] = "TrackAfter", s;
}(K || (K = {}));
class lt {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(t) {
    this.sections = t;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let t = 0;
    for (let e = 0; e < this.sections.length; e += 2)
      t += this.sections[e];
    return t;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let t = 0;
    for (let e = 0; e < this.sections.length; e += 2) {
      let i = this.sections[e + 1];
      t += i < 0 ? this.sections[e] : i;
    }
    return t;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(t) {
    for (let e = 0, i = 0, n = 0; e < this.sections.length; ) {
      let r = this.sections[e++], o = this.sections[e++];
      o < 0 ? (t(i, n, r), n += r) : n += o, i += r;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(t, e = !1) {
    fi(this, t, e);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let t = [];
    for (let e = 0; e < this.sections.length; ) {
      let i = this.sections[e++], n = this.sections[e++];
      n < 0 ? t.push(i, n) : t.push(n, i);
    }
    return new lt(t);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(t) {
    return this.empty ? t : t.empty ? this : ps(this, t);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `other` happened before the ones in `this`.
  */
  mapDesc(t, e = !1) {
    return t.empty ? this : ui(this, t, e);
  }
  mapPos(t, e = -1, i = K.Simple) {
    let n = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], h = this.sections[o++], c = n + l;
      if (h < 0) {
        if (c > t)
          return r + (t - n);
        r += l;
      } else {
        if (i != K.Simple && c >= t && (i == K.TrackDel && n < t && c > t || i == K.TrackBefore && n < t || i == K.TrackAfter && c > t))
          return null;
        if (c > t || c == t && e < 0 && !l)
          return t == n || e < 0 ? r : r + h;
        r += h;
      }
      n = c;
    }
    if (t > n)
      throw new RangeError(`Position ${t} is out of range for changeset of length ${n}`);
    return r;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(t, e = t) {
    for (let i = 0, n = 0; i < this.sections.length && n <= e; ) {
      let r = this.sections[i++], o = this.sections[i++], l = n + r;
      if (o >= 0 && n <= e && l >= t)
        return n < t && l > e ? "cover" : !0;
      n = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let t = "";
    for (let e = 0; e < this.sections.length; ) {
      let i = this.sections[e++], n = this.sections[e++];
      t += (t ? " " : "") + i + (n >= 0 ? ":" + n : "");
    }
    return t;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(t) {
    if (!Array.isArray(t) || t.length % 2 || t.some((e) => typeof e != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new lt(t);
  }
  /**
  @internal
  */
  static create(t) {
    return new lt(t);
  }
}
class F extends lt {
  constructor(t, e) {
    super(t), this.inserted = e;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(t) {
    if (this.length != t.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return fi(this, (e, i, n, r, o) => t = t.replace(n, n + (i - e), o), !1), t;
  }
  mapDesc(t, e = !1) {
    return ui(this, t, e, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(t) {
    let e = this.sections.slice(), i = [];
    for (let n = 0, r = 0; n < e.length; n += 2) {
      let o = e[n], l = e[n + 1];
      if (l >= 0) {
        e[n] = l, e[n + 1] = o;
        let h = n >> 1;
        for (; i.length < h; )
          i.push(M.empty);
        i.push(o ? t.slice(r, r + o) : M.empty);
      }
      r += o;
    }
    return new F(e, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(t) {
    return this.empty ? t : t.empty ? this : ps(this, t, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(t, e = !1) {
    return t.empty ? this : ui(this, t, e, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(t, e = !1) {
    fi(this, t, e);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return lt.create(this.sections);
  }
  /**
  @internal
  */
  filter(t) {
    let e = [], i = [], n = [], r = new ne(this);
    t: for (let o = 0, l = 0; ; ) {
      let h = o == t.length ? 1e9 : t[o++];
      for (; l < h || l == h && r.len == 0; ) {
        if (r.done)
          break t;
        let a = Math.min(r.len, h - l);
        z(n, a, -1);
        let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        z(e, a, f), f > 0 && dt(i, e, r.text), r.forward(a), l += a;
      }
      let c = t[o++];
      for (; l < c; ) {
        if (r.done)
          break t;
        let a = Math.min(r.len, c - l);
        z(e, a, -1), z(n, a, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(a), l += a;
      }
    }
    return {
      changes: new F(e, i),
      filtered: lt.create(n)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let t = [];
    for (let e = 0; e < this.sections.length; e += 2) {
      let i = this.sections[e], n = this.sections[e + 1];
      n < 0 ? t.push(i) : n == 0 ? t.push([i]) : t.push([i].concat(this.inserted[e >> 1].toJSON()));
    }
    return t;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(t, e, i) {
    let n = [], r = [], o = 0, l = null;
    function h(a = !1) {
      if (!a && !n.length)
        return;
      o < e && z(n, e - o, -1);
      let f = new F(n, r);
      l = l ? l.compose(f.map(l)) : f, n = [], r = [], o = 0;
    }
    function c(a) {
      if (Array.isArray(a))
        for (let f of a)
          c(f);
      else if (a instanceof F) {
        if (a.length != e)
          throw new RangeError(`Mismatched change set length (got ${a.length}, expected ${e})`);
        h(), l = l ? l.compose(a.map(l)) : a;
      } else {
        let { from: f, to: u = f, insert: d } = a;
        if (f > u || f < 0 || u > e)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${e})`);
        let p = d ? typeof d == "string" ? M.of(d.split(i || ci)) : d : M.empty, g = p.length;
        if (f == u && g == 0)
          return;
        f < o && h(), f > o && z(n, f - o, -1), z(n, u - f, g), dt(r, n, p), o = u;
      }
    }
    return c(t), h(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(t) {
    return new F(t ? [t, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(t) {
    if (!Array.isArray(t))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let e = [], i = [];
    for (let n = 0; n < t.length; n++) {
      let r = t[n];
      if (typeof r == "number")
        e.push(r, -1);
      else {
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          e.push(r[0], 0);
        else {
          for (; i.length < n; )
            i.push(M.empty);
          i[n] = M.of(r.slice(1)), e.push(r[0], i[n].length);
        }
      }
    }
    return new F(e, i);
  }
  /**
  @internal
  */
  static createSet(t, e) {
    return new F(t, e);
  }
}
function z(s, t, e, i = !1) {
  if (t == 0 && e <= 0)
    return;
  let n = s.length - 2;
  n >= 0 && e <= 0 && e == s[n + 1] ? s[n] += t : t == 0 && s[n] == 0 ? s[n + 1] += e : i ? (s[n] += t, s[n + 1] += e) : s.push(t, e);
}
function dt(s, t, e) {
  if (e.length == 0)
    return;
  let i = t.length - 2 >> 1;
  if (i < s.length)
    s[s.length - 1] = s[s.length - 1].append(e);
  else {
    for (; s.length < i; )
      s.push(M.empty);
    s.push(e);
  }
}
function fi(s, t, e) {
  let i = s.inserted;
  for (let n = 0, r = 0, o = 0; o < s.sections.length; ) {
    let l = s.sections[o++], h = s.sections[o++];
    if (h < 0)
      n += l, r += l;
    else {
      let c = n, a = r, f = M.empty;
      for (; c += l, a += h, h && i && (f = f.append(i[o - 2 >> 1])), !(e || o == s.sections.length || s.sections[o + 1] < 0); )
        l = s.sections[o++], h = s.sections[o++];
      t(n, c, r, a, f), n = c, r = a;
    }
  }
}
function ui(s, t, e, i = !1) {
  let n = [], r = i ? [] : null, o = new ne(s), l = new ne(t);
  for (let h = -1; ; )
    if (o.ins == -1 && l.ins == -1) {
      let c = Math.min(o.len, l.len);
      z(n, c, -1), o.forward(c), l.forward(c);
    } else if (l.ins >= 0 && (o.ins < 0 || h == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !e))) {
      let c = l.len;
      for (z(n, l.ins, -1); c; ) {
        let a = Math.min(o.len, c);
        o.ins >= 0 && h < o.i && o.len <= a && (z(n, 0, o.ins), r && dt(r, n, o.text), h = o.i), o.forward(a), c -= a;
      }
      l.next();
    } else if (o.ins >= 0) {
      let c = 0, a = o.len;
      for (; a; )
        if (l.ins == -1) {
          let f = Math.min(a, l.len);
          c += f, a -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < a)
          a -= l.len, l.next();
        else
          break;
      z(n, c, h < o.i ? o.ins : 0), r && h < o.i && dt(r, n, o.text), h = o.i, o.forward(o.len - a);
    } else {
      if (o.done && l.done)
        return r ? F.createSet(n, r) : lt.create(n);
      throw new Error("Mismatched change set lengths");
    }
}
function ps(s, t, e = !1) {
  let i = [], n = e ? [] : null, r = new ne(s), o = new ne(t);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return n ? F.createSet(i, n) : lt.create(i);
    if (r.ins == 0)
      z(i, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      z(i, 0, o.ins, l), n && dt(n, i, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let h = Math.min(r.len2, o.len), c = i.length;
        if (r.ins == -1) {
          let a = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          z(i, h, a, l), n && a && dt(n, i, o.text);
        } else o.ins == -1 ? (z(i, r.off ? 0 : r.len, h, l), n && dt(n, i, r.textBit(h))) : (z(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), n && !o.off && dt(n, i, o.text));
        l = (r.ins > h || o.ins >= 0 && o.len > h) && (l || i.length > c), r.forward2(h), o.forward(h);
      }
    }
  }
}
class ne {
  constructor(t) {
    this.set = t, this.i = 0, this.next();
  }
  next() {
    let { sections: t } = this.set;
    this.i < t.length ? (this.len = t[this.i++], this.ins = t[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: t } = this.set, e = this.i - 2 >> 1;
    return e >= t.length ? M.empty : t[e];
  }
  textBit(t) {
    let { inserted: e } = this.set, i = this.i - 2 >> 1;
    return i >= e.length && !t ? M.empty : e[i].slice(this.off, t == null ? void 0 : this.off + t);
  }
  forward(t) {
    t == this.len ? this.next() : (this.len -= t, this.off += t);
  }
  forward2(t) {
    this.ins == -1 ? this.forward(t) : t == this.ins ? this.next() : (this.ins -= t, this.off += t);
  }
}
class vt {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let t = this.flags & 7;
    return t == 7 ? null : t;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let t = this.flags >> 6;
    return t == 16777215 ? void 0 : t;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(t, e = -1) {
    let i, n;
    return this.empty ? i = n = t.mapPos(this.from, e) : (i = t.mapPos(this.from, 1), n = t.mapPos(this.to, -1)), i == this.from && n == this.to ? this : new vt(i, n, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(t, e = t) {
    if (t <= this.anchor && e >= this.anchor)
      return S.range(t, e);
    let i = Math.abs(t - this.anchor) > Math.abs(e - this.anchor) ? t : e;
    return S.range(this.anchor, i);
  }
  /**
  Compare this range to another range.
  */
  eq(t, e = !1) {
    return this.anchor == t.anchor && this.head == t.head && (!e || !this.empty || this.assoc == t.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(t) {
    if (!t || typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return S.range(t.anchor, t.head);
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new vt(t, e, i);
  }
}
class S {
  constructor(t, e) {
    this.ranges = t, this.mainIndex = e;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(t, e = -1) {
    return t.empty ? this : S.create(this.ranges.map((i) => i.map(t, e)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(t, e = !1) {
    if (this.ranges.length != t.ranges.length || this.mainIndex != t.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(t.ranges[i], e))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new S([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(t, e = !0) {
    return S.create([t].concat(this.ranges), e ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(t, e = this.mainIndex) {
    let i = this.ranges.slice();
    return i[e] = t, S.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((t) => t.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(t) {
    if (!t || !Array.isArray(t.ranges) || typeof t.main != "number" || t.main >= t.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new S(t.ranges.map((e) => vt.fromJSON(e)), t.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(t, e = t) {
    return new S([S.range(t, e)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(t, e = 0) {
    if (t.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, n = 0; n < t.length; n++) {
      let r = t[n];
      if (r.empty ? r.from <= i : r.from < i)
        return S.normalized(t.slice(), e);
      i = r.to;
    }
    return new S(t, e);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(t, e = 0, i, n) {
    return vt.create(t, t, (e == 0 ? 0 : e < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (n ?? 16777215) << 6);
  }
  /**
  Create a selection range.
  */
  static range(t, e, i, n) {
    let r = (i ?? 16777215) << 6 | (n == null ? 7 : Math.min(6, n));
    return e < t ? vt.create(e, t, 48 | r) : vt.create(t, e, (e > t ? 8 : 0) | r);
  }
  /**
  @internal
  */
  static normalized(t, e = 0) {
    let i = t[e];
    t.sort((n, r) => n.from - r.from), e = t.indexOf(i);
    for (let n = 1; n < t.length; n++) {
      let r = t[n], o = t[n - 1];
      if (r.empty ? r.from <= o.to : r.from < o.to) {
        let l = o.from, h = Math.max(r.to, o.to);
        n <= e && e--, t.splice(--n, 2, r.anchor > r.head ? S.range(h, l) : S.range(l, h));
      }
    }
    return new S(t, e);
  }
}
function gs(s, t) {
  for (let e of s.ranges)
    if (e.to > t)
      throw new RangeError("Selection points outside of document");
}
let zi = 0;
class k {
  constructor(t, e, i, n, r) {
    this.combine = t, this.compareInput = e, this.compare = i, this.isStatic = n, this.id = zi++, this.default = t([]), this.extensions = typeof r == "function" ? r(this) : r;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(t = {}) {
    return new k(t.combine || ((e) => e), t.compareInput || ((e, i) => e === i), t.compare || (t.combine ? (e, i) => e === i : $i), !!t.static, t.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(t) {
    return new Be([], this, 0, t);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(t, e) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Be(t, this, 1, e);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(t, e) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Be(t, this, 2, e);
  }
  from(t, e) {
    return e || (e = (i) => i), this.compute([t], (i) => e(i.field(t)));
  }
}
function $i(s, t) {
  return s == t || s.length == t.length && s.every((e, i) => e === t[i]);
}
class Be {
  constructor(t, e, i, n) {
    this.dependencies = t, this.facet = e, this.type = i, this.value = n, this.id = zi++;
  }
  dynamicSlot(t) {
    var e;
    let i = this.value, n = this.facet.compareInput, r = this.id, o = t[r] >> 1, l = this.type == 2, h = !1, c = !1, a = [];
    for (let f of this.dependencies)
      f == "doc" ? h = !0 : f == "selection" ? c = !0 : ((e = t[f.id]) !== null && e !== void 0 ? e : 1) & 1 || a.push(t[f.id]);
    return {
      create(f) {
        return f.values[o] = i(f), 1;
      },
      update(f, u) {
        if (h && u.docChanged || c && (u.docChanged || u.selection) || di(f, a)) {
          let d = i(f);
          if (l ? !ln(d, f.values[o], n) : !n(d, f.values[o]))
            return f.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let d, p = u.config.address[r];
        if (p != null) {
          let g = Fe(u, p);
          if (this.dependencies.every((m) => m instanceof k ? u.facet(m) === f.facet(m) : m instanceof wt ? u.field(m, !1) == f.field(m, !1) : !0) || (l ? ln(d = i(f), g, n) : n(d = i(f), g)))
            return f.values[o] = g, 0;
        } else
          d = i(f);
        return f.values[o] = d, 1;
      }
    };
  }
}
function ln(s, t, e) {
  if (s.length != t.length)
    return !1;
  for (let i = 0; i < s.length; i++)
    if (!e(s[i], t[i]))
      return !1;
  return !0;
}
function di(s, t) {
  let e = !1;
  for (let i of t)
    te(s, i) & 1 && (e = !0);
  return e;
}
function Gr(s, t, e) {
  let i = e.map((h) => s[h.id]), n = e.map((h) => h.type), r = i.filter((h) => !(h & 1)), o = s[t.id] >> 1;
  function l(h) {
    let c = [];
    for (let a = 0; a < i.length; a++) {
      let f = Fe(h, i[a]);
      if (n[a] == 2)
        for (let u of f)
          c.push(u);
      else
        c.push(f);
    }
    return t.combine(c);
  }
  return {
    create(h) {
      for (let c of i)
        te(h, c);
      return h.values[o] = l(h), 1;
    },
    update(h, c) {
      if (!di(h, r))
        return 0;
      let a = l(h);
      return t.compare(a, h.values[o]) ? 0 : (h.values[o] = a, 1);
    },
    reconfigure(h, c) {
      let a = di(h, i), f = c.config.facets[t.id], u = c.facet(t);
      if (f && !a && $i(e, f))
        return h.values[o] = u, 0;
      let d = l(h);
      return t.compare(d, u) ? (h.values[o] = u, 0) : (h.values[o] = d, 1);
    }
  };
}
const hn = /* @__PURE__ */ k.define({ static: !0 });
class wt {
  constructor(t, e, i, n, r) {
    this.id = t, this.createF = e, this.updateF = i, this.compareF = n, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(t) {
    let e = new wt(zi++, t.create, t.update, t.compare || ((i, n) => i === n), t);
    return t.provide && (e.provides = t.provide(e)), e;
  }
  create(t) {
    let e = t.facet(hn).find((i) => i.field == this);
    return ((e == null ? void 0 : e.create) || this.createF)(t);
  }
  /**
  @internal
  */
  slot(t) {
    let e = t[this.id] >> 1;
    return {
      create: (i) => (i.values[e] = this.create(i), 1),
      update: (i, n) => {
        let r = i.values[e], o = this.updateF(r, n);
        return this.compareF(r, o) ? 0 : (i.values[e] = o, 1);
      },
      reconfigure: (i, n) => n.config.address[this.id] != null ? (i.values[e] = n.field(this), 0) : (i.values[e] = this.create(i), 1)
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(t) {
    return [this, hn.of({ field: this, create: t })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const St = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function jt(s) {
  return (t) => new ms(t, s);
}
const je = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ jt(St.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ jt(St.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ jt(St.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ jt(St.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ jt(St.lowest)
};
class ms {
  constructor(t, e) {
    this.inner = t, this.prec = e;
  }
}
class Xe {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(t) {
    return new pi(this, t);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(t) {
    return Xe.reconfigure.of({ compartment: this, extension: t });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(t) {
    return t.config.compartments.get(this);
  }
}
class pi {
  constructor(t, e) {
    this.compartment = t, this.inner = e;
  }
}
class Ne {
  constructor(t, e, i, n, r, o) {
    for (this.base = t, this.compartments = e, this.dynamicSlots = i, this.address = n, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(t) {
    let e = this.address[t.id];
    return e == null ? t.default : this.staticValues[e >> 1];
  }
  static resolve(t, e, i) {
    let n = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let u of Yr(t, e, o))
      u instanceof wt ? n.push(u) : (r[u.facet.id] || (r[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), h = [], c = [];
    for (let u of n)
      l[u.id] = c.length << 1, c.push((d) => u.slot(d));
    let a = i == null ? void 0 : i.config.facets;
    for (let u in r) {
      let d = r[u], p = d[0].facet, g = a && a[u] || [];
      if (d.every(
        (m) => m.type == 0
        /* Provider.Static */
      ))
        if (l[p.id] = h.length << 1 | 1, $i(g, d))
          h.push(i.facet(p));
        else {
          let m = p.combine(d.map((y) => y.value));
          h.push(i && p.compare(m, i.facet(p)) ? i.facet(p) : m);
        }
      else {
        for (let m of d)
          m.type == 0 ? (l[m.id] = h.length << 1 | 1, h.push(m.value)) : (l[m.id] = c.length << 1, c.push((y) => m.dynamicSlot(y)));
        l[p.id] = c.length << 1, c.push((m) => Gr(m, p, d));
      }
    }
    let f = c.map((u) => u(l));
    return new Ne(t, o, f, l, h, r);
  }
}
function Yr(s, t, e) {
  let i = [[], [], [], [], []], n = /* @__PURE__ */ new Map();
  function r(o, l) {
    let h = n.get(o);
    if (h != null) {
      if (h <= l)
        return;
      let c = i[h].indexOf(o);
      c > -1 && i[h].splice(c, 1), o instanceof pi && e.delete(o.compartment);
    }
    if (n.set(o, l), Array.isArray(o))
      for (let c of o)
        r(c, l);
    else if (o instanceof pi) {
      if (e.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let c = t.get(o.compartment) || o.inner;
      e.set(o.compartment, c), r(c, l);
    } else if (o instanceof ms)
      r(o.inner, o.prec);
    else if (o instanceof wt)
      i[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof Be)
      i[l].push(o), o.facet.extensions && r(o.facet.extensions, St.default);
    else {
      let c = o.extension;
      if (!c)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(c, l);
    }
  }
  return r(s, St.default), i.reduce((o, l) => o.concat(l));
}
function te(s, t) {
  if (t & 1)
    return 2;
  let e = t >> 1, i = s.status[e];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  s.status[e] = 4;
  let n = s.computeSlot(s, s.config.dynamicSlots[e]);
  return s.status[e] = 2 | n;
}
function Fe(s, t) {
  return t & 1 ? s.config.staticValues[t >> 1] : s.values[t >> 1];
}
const ys = /* @__PURE__ */ k.define(), gi = /* @__PURE__ */ k.define({
  combine: (s) => s.some((t) => t),
  static: !0
}), bs = /* @__PURE__ */ k.define({
  combine: (s) => s.length ? s[0] : void 0,
  static: !0
}), ws = /* @__PURE__ */ k.define(), Ss = /* @__PURE__ */ k.define(), vs = /* @__PURE__ */ k.define(), xs = /* @__PURE__ */ k.define({
  combine: (s) => s.length ? s[0] : !1
});
class Dt {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new Ur();
  }
}
class Ur {
  /**
  Create an instance of this annotation.
  */
  of(t) {
    return new Dt(this, t);
  }
}
class Qr {
  /**
  @internal
  */
  constructor(t) {
    this.map = t;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(t) {
    return new L(this, t);
  }
}
class L {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(t) {
    let e = this.type.map(this.value, t);
    return e === void 0 ? void 0 : e == this.value ? this : new L(this.type, e);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(t) {
    return this.type == t;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(t = {}) {
    return new Qr(t.map || ((e) => e));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(t, e) {
    if (!t.length)
      return t;
    let i = [];
    for (let n of t) {
      let r = n.map(e);
      r && i.push(r);
    }
    return i;
  }
}
L.reconfigure = /* @__PURE__ */ L.define();
L.appendConfig = /* @__PURE__ */ L.define();
class V {
  constructor(t, e, i, n, r, o) {
    this.startState = t, this.changes = e, this.selection = i, this.effects = n, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && gs(i, e.newLength), r.some((l) => l.type == V.time) || (this.annotations = r.concat(V.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(t, e, i, n, r, o) {
    return new V(t, e, i, n, r, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(t) {
    for (let e of this.annotations)
      if (e.type == t)
        return e.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(t) {
    let e = this.annotation(V.userEvent);
    return !!(e && (e == t || e.length > t.length && e.slice(0, t.length) == t && e[t.length] == "."));
  }
}
V.time = /* @__PURE__ */ Dt.define();
V.userEvent = /* @__PURE__ */ Dt.define();
V.addToHistory = /* @__PURE__ */ Dt.define();
V.remote = /* @__PURE__ */ Dt.define();
function Zr(s, t) {
  let e = [];
  for (let i = 0, n = 0; ; ) {
    let r, o;
    if (i < s.length && (n == t.length || t[n] >= s[i]))
      r = s[i++], o = s[i++];
    else if (n < t.length)
      r = t[n++], o = t[n++];
    else
      return e;
    !e.length || e[e.length - 1] < r ? e.push(r, o) : e[e.length - 1] < o && (e[e.length - 1] = o);
  }
}
function ks(s, t, e) {
  var i;
  let n, r, o;
  return e ? (n = t.changes, r = F.empty(t.changes.length), o = s.changes.compose(t.changes)) : (n = t.changes.map(s.changes), r = s.changes.mapDesc(t.changes, !0), o = s.changes.compose(n)), {
    changes: o,
    selection: t.selection ? t.selection.map(r) : (i = s.selection) === null || i === void 0 ? void 0 : i.map(n),
    effects: L.mapEffects(s.effects, n).concat(L.mapEffects(t.effects, r)),
    annotations: s.annotations.length ? s.annotations.concat(t.annotations) : t.annotations,
    scrollIntoView: s.scrollIntoView || t.scrollIntoView
  };
}
function mi(s, t, e) {
  let i = t.selection, n = Rt(t.annotations);
  return t.userEvent && (n = n.concat(V.userEvent.of(t.userEvent))), {
    changes: t.changes instanceof F ? t.changes : F.of(t.changes || [], e, s.facet(bs)),
    selection: i && (i instanceof S ? i : S.single(i.anchor, i.head)),
    effects: Rt(t.effects),
    annotations: n,
    scrollIntoView: !!t.scrollIntoView
  };
}
function Cs(s, t, e) {
  let i = mi(s, t.length ? t[0] : {}, s.doc.length);
  t.length && t[0].filter === !1 && (e = !1);
  for (let r = 1; r < t.length; r++) {
    t[r].filter === !1 && (e = !1);
    let o = !!t[r].sequential;
    i = ks(i, mi(s, t[r], o ? i.changes.newLength : s.doc.length), o);
  }
  let n = V.create(s, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return to(e ? _r(n) : n);
}
function _r(s) {
  let t = s.startState, e = !0;
  for (let n of t.facet(ws)) {
    let r = n(s);
    if (r === !1) {
      e = !1;
      break;
    }
    Array.isArray(r) && (e = e === !0 ? r : Zr(e, r));
  }
  if (e !== !0) {
    let n, r;
    if (e === !1)
      r = s.changes.invertedDesc, n = F.empty(t.doc.length);
    else {
      let o = s.changes.filter(e);
      n = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    s = V.create(t, n, s.selection && s.selection.map(r), L.mapEffects(s.effects, r), s.annotations, s.scrollIntoView);
  }
  let i = t.facet(Ss);
  for (let n = i.length - 1; n >= 0; n--) {
    let r = i[n](s);
    r instanceof V ? s = r : Array.isArray(r) && r.length == 1 && r[0] instanceof V ? s = r[0] : s = Cs(t, Rt(r), !1);
  }
  return s;
}
function to(s) {
  let t = s.startState, e = t.facet(vs), i = s;
  for (let n = e.length - 1; n >= 0; n--) {
    let r = e[n](s);
    r && Object.keys(r).length && (i = ks(i, mi(t, r, s.changes.newLength), !0));
  }
  return i == s ? s : V.create(t, s.changes, s.selection, i.effects, i.annotations, i.scrollIntoView);
}
const eo = [];
function Rt(s) {
  return s == null ? eo : Array.isArray(s) ? s : [s];
}
var ot = /* @__PURE__ */ function(s) {
  return s[s.Word = 0] = "Word", s[s.Space = 1] = "Space", s[s.Other = 2] = "Other", s;
}(ot || (ot = {}));
const io = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let yi;
try {
  yi = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function no(s) {
  if (yi)
    return yi.test(s);
  for (let t = 0; t < s.length; t++) {
    let e = s[t];
    if (/\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || io.test(e)))
      return !0;
  }
  return !1;
}
function so(s) {
  return (t) => {
    if (!/\S/.test(t))
      return ot.Space;
    if (no(t))
      return ot.Word;
    for (let e = 0; e < s.length; e++)
      if (t.indexOf(s[e]) > -1)
        return ot.Word;
    return ot.Other;
  };
}
class T {
  constructor(t, e, i, n, r, o) {
    this.config = t, this.doc = e, this.selection = i, this.values = n, this.status = t.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      te(this, l << 1);
    this.computeSlot = null;
  }
  field(t, e = !0) {
    let i = this.config.address[t.id];
    if (i == null) {
      if (e)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return te(this, i), Fe(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...t) {
    return Cs(this, t, !0);
  }
  /**
  @internal
  */
  applyTransaction(t) {
    let e = this.config, { base: i, compartments: n } = e;
    for (let l of t.effects)
      l.is(Xe.reconfigure) ? (e && (n = /* @__PURE__ */ new Map(), e.compartments.forEach((h, c) => n.set(c, h)), e = null), n.set(l.value.compartment, l.value.extension)) : l.is(L.reconfigure) ? (e = null, i = l.value) : l.is(L.appendConfig) && (e = null, i = Rt(i).concat(l.value));
    let r;
    e ? r = t.startState.values.slice() : (e = Ne.resolve(i, n, this), r = new T(e, this.doc, this.selection, e.dynamicSlots.map(() => null), (h, c) => c.reconfigure(h, this), null).values);
    let o = t.startState.facet(gi) ? t.newSelection : t.newSelection.asSingle();
    new T(e, t.newDoc, o, r, (l, h) => h.update(l, t), t);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(t) {
    return typeof t == "string" && (t = this.toText(t)), this.changeByRange((e) => ({
      changes: { from: e.from, to: e.to, insert: t },
      range: S.cursor(e.from + t.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(t) {
    let e = this.selection, i = t(e.ranges[0]), n = this.changes(i.changes), r = [i.range], o = Rt(i.effects);
    for (let l = 1; l < e.ranges.length; l++) {
      let h = t(e.ranges[l]), c = this.changes(h.changes), a = c.map(n);
      for (let u = 0; u < l; u++)
        r[u] = r[u].map(a);
      let f = n.mapDesc(c, !0);
      r.push(h.range.map(f)), n = n.compose(a), o = L.mapEffects(o, a).concat(L.mapEffects(Rt(h.effects), f));
    }
    return {
      changes: n,
      selection: S.create(r, e.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(t = []) {
    return t instanceof F ? t : F.of(t, this.doc.length, this.facet(T.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(t) {
    return M.of(t.split(this.facet(T.lineSeparator) || ci));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(t = 0, e = this.doc.length) {
    return this.doc.sliceString(t, e, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(t) {
    let e = this.config.address[t.id];
    return e == null ? t.default : (te(this, e), Fe(this, e));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(t) {
    let e = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (t)
      for (let i in t) {
        let n = t[i];
        n instanceof wt && this.config.address[n.id] != null && (e[i] = n.spec.toJSON(this.field(t[i]), this));
      }
    return e;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(t, e = {}, i) {
    if (!t || typeof t.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let n = [];
    if (i) {
      for (let r in i)
        if (Object.prototype.hasOwnProperty.call(t, r)) {
          let o = i[r], l = t[r];
          n.push(o.init((h) => o.spec.fromJSON(l, h)));
        }
    }
    return T.create({
      doc: t.doc,
      selection: S.fromJSON(t.selection),
      extensions: e.extensions ? n.concat([e.extensions]) : n
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(t = {}) {
    let e = Ne.resolve(t.extensions || [], /* @__PURE__ */ new Map()), i = t.doc instanceof M ? t.doc : M.of((t.doc || "").split(e.staticFacet(T.lineSeparator) || ci)), n = t.selection ? t.selection instanceof S ? t.selection : S.single(t.selection.anchor, t.selection.head) : S.single(0);
    return gs(n, i.length), e.staticFacet(gi) || (n = n.asSingle()), new T(e, i, n, e.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(T.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(T.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(xs);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(t, ...e) {
    for (let i of this.facet(T.phrases))
      if (Object.prototype.hasOwnProperty.call(i, t)) {
        t = i[t];
        break;
      }
    return e.length && (t = t.replace(/\$(\$|\d*)/g, (i, n) => {
      if (n == "$")
        return "$";
      let r = +(n || 1);
      return !r || r > e.length ? i : e[r - 1];
    })), t;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(t, e, i = -1) {
    let n = [];
    for (let r of this.facet(ys))
      for (let o of r(this, e, i))
        Object.prototype.hasOwnProperty.call(o, t) && n.push(o[t]);
    return n;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(t) {
    return so(this.languageDataAt("wordChars", t).join(""));
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(t) {
    let { text: e, from: i, length: n } = this.doc.lineAt(t), r = this.charCategorizer(t), o = t - i, l = t - i;
    for (; o > 0; ) {
      let h = nt(e, o, !1);
      if (r(e.slice(h, o)) != ot.Word)
        break;
      o = h;
    }
    for (; l < n; ) {
      let h = nt(e, l);
      if (r(e.slice(l, h)) != ot.Word)
        break;
      l = h;
    }
    return o == l ? null : S.range(o + i, l + i);
  }
}
T.allowMultipleSelections = gi;
T.tabSize = /* @__PURE__ */ k.define({
  combine: (s) => s.length ? s[0] : 4
});
T.lineSeparator = bs;
T.readOnly = xs;
T.phrases = /* @__PURE__ */ k.define({
  compare(s, t) {
    let e = Object.keys(s), i = Object.keys(t);
    return e.length == i.length && e.every((n) => s[n] == t[n]);
  }
});
T.languageData = ys;
T.changeFilter = ws;
T.transactionFilter = Ss;
T.transactionExtender = vs;
Xe.reconfigure = /* @__PURE__ */ L.define();
class Ct {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(t) {
    return this == t;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(t, e = t) {
    return se.create(t, e, this);
  }
}
Ct.prototype.startSide = Ct.prototype.endSide = 0;
Ct.prototype.point = !1;
Ct.prototype.mapMode = K.TrackDel;
class se {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.value = i;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new se(t, e, i);
  }
}
function bi(s, t) {
  return s.from - t.from || s.value.startSide - t.value.startSide;
}
class Ki {
  constructor(t, e, i, n) {
    this.from = t, this.to = e, this.value = i, this.maxPoint = n;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(t, e, i, n = 0) {
    let r = i ? this.to : this.from;
    for (let o = n, l = r.length; ; ) {
      if (o == l)
        return o;
      let h = o + l >> 1, c = r[h] - t || (i ? this.value[h].endSide : this.value[h].startSide) - e;
      if (h == o)
        return c >= 0 ? o : l;
      c >= 0 ? l = h : o = h + 1;
    }
  }
  between(t, e, i, n) {
    for (let r = this.findIndex(e, -1e9, !0), o = this.findIndex(i, 1e9, !1, r); r < o; r++)
      if (n(this.from[r] + t, this.to[r] + t, this.value[r]) === !1)
        return !1;
  }
  map(t, e) {
    let i = [], n = [], r = [], o = -1, l = -1;
    for (let h = 0; h < this.value.length; h++) {
      let c = this.value[h], a = this.from[h] + t, f = this.to[h] + t, u, d;
      if (a == f) {
        let p = e.mapPos(a, c.startSide, c.mapMode);
        if (p == null || (u = d = p, c.startSide != c.endSide && (d = e.mapPos(a, c.endSide), d < u)))
          continue;
      } else if (u = e.mapPos(a, c.startSide), d = e.mapPos(f, c.endSide), u > d || u == d && c.startSide > 0 && c.endSide <= 0)
        continue;
      (d - u || c.endSide - c.startSide) < 0 || (o < 0 && (o = u), c.point && (l = Math.max(l, d - u)), i.push(c), n.push(u - o), r.push(d - o));
    }
    return { mapped: i.length ? new Ki(n, r, i, l) : null, pos: o };
  }
}
class E {
  constructor(t, e, i, n) {
    this.chunkPos = t, this.chunk = e, this.nextLayer = i, this.maxPoint = n;
  }
  /**
  @internal
  */
  static create(t, e, i, n) {
    return new E(t, e, i, n);
  }
  /**
  @internal
  */
  get length() {
    let t = this.chunk.length - 1;
    return t < 0 ? 0 : Math.max(this.chunkEnd(t), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let t = this.nextLayer.size;
    for (let e of this.chunk)
      t += e.value.length;
    return t;
  }
  /**
  @internal
  */
  chunkEnd(t) {
    return this.chunkPos[t] + this.chunk[t].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(t) {
    let { add: e = [], sort: i = !1, filterFrom: n = 0, filterTo: r = this.length } = t, o = t.filter;
    if (e.length == 0 && !o)
      return this;
    if (i && (e = e.slice().sort(bi)), this.isEmpty)
      return e.length ? E.of(e) : this;
    let l = new As(this, null, -1).goto(0), h = 0, c = [], a = new re();
    for (; l.value || h < e.length; )
      if (h < e.length && (l.from - e[h].from || l.startSide - e[h].value.startSide) >= 0) {
        let f = e[h++];
        a.addInner(f.from, f.to, f.value) || c.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (h == e.length || this.chunkEnd(l.chunkIndex) < e[h].from) && (!o || n > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && a.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || n > l.to || r < l.from || o(l.from, l.to, l.value)) && (a.addInner(l.from, l.to, l.value) || c.push(se.create(l.from, l.to, l.value))), l.next());
    return a.finishInner(this.nextLayer.isEmpty && !c.length ? E.empty : this.nextLayer.update({ add: c, filter: o, filterFrom: n, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(t) {
    if (t.empty || this.isEmpty)
      return this;
    let e = [], i = [], n = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], h = this.chunk[o], c = t.touchesRange(l, l + h.length);
      if (c === !1)
        n = Math.max(n, h.maxPoint), e.push(h), i.push(t.mapPos(l));
      else if (c === !0) {
        let { mapped: a, pos: f } = h.map(l, t);
        a && (n = Math.max(n, a.maxPoint), e.push(a), i.push(f));
      }
    }
    let r = this.nextLayer.map(t);
    return e.length == 0 ? r : new E(i, e, r || E.empty, n);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(t, e, i) {
    if (!this.isEmpty) {
      for (let n = 0; n < this.chunk.length; n++) {
        let r = this.chunkPos[n], o = this.chunk[n];
        if (e >= r && t <= r + o.length && o.between(r, t - r, e - r, i) === !1)
          return;
      }
      this.nextLayer.between(t, e, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(t = 0) {
    return oe.from([this]).goto(t);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(t, e = 0) {
    return oe.from(t).goto(e);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(t, e, i, n, r = -1) {
    let o = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), h = an(o, l, i), c = new Xt(o, h, r), a = new Xt(l, h, r);
    i.iterGaps((f, u, d) => cn(c, f, a, u, d, n)), i.empty && i.length == 0 && cn(c, 0, a, 0, 0, n);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(t, e, i = 0, n) {
    n == null && (n = 999999999);
    let r = t.filter((a) => !a.isEmpty && e.indexOf(a) < 0), o = e.filter((a) => !a.isEmpty && t.indexOf(a) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let l = an(r, o), h = new Xt(r, l, 0).goto(i), c = new Xt(o, l, 0).goto(i);
    for (; ; ) {
      if (h.to != c.to || !wi(h.active, c.active) || h.point && (!c.point || !h.point.eq(c.point)))
        return !1;
      if (h.to > n)
        return !0;
      h.next(), c.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(t, e, i, n, r = -1) {
    let o = new Xt(t, null, r).goto(e), l = e, h = o.openStart;
    for (; ; ) {
      let c = Math.min(o.to, i);
      if (o.point) {
        let a = o.activeForPoint(o.to), f = o.pointFrom < e ? a.length + 1 : o.point.startSide < 0 ? a.length : Math.min(a.length, h);
        n.point(l, c, o.point, a, f, o.pointRank), h = Math.min(o.openEnd(c), a.length);
      } else c > l && (n.span(l, c, o.active, h), h = o.openEnd(c));
      if (o.to > i)
        return h + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(t, e = !1) {
    let i = new re();
    for (let n of t instanceof se ? [t] : e ? ro(t) : t)
      i.add(n.from, n.to, n.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(t) {
    if (!t.length)
      return E.empty;
    let e = t[t.length - 1];
    for (let i = t.length - 2; i >= 0; i--)
      for (let n = t[i]; n != E.empty; n = n.nextLayer)
        e = new E(n.chunkPos, n.chunk, e, Math.max(n.maxPoint, e.maxPoint));
    return e;
  }
}
E.empty = /* @__PURE__ */ new E([], [], null, -1);
function ro(s) {
  if (s.length > 1)
    for (let t = s[0], e = 1; e < s.length; e++) {
      let i = s[e];
      if (bi(t, i) > 0)
        return s.slice().sort(bi);
      t = i;
    }
  return s;
}
E.empty.nextLayer = E.empty;
class re {
  finishChunk(t) {
    this.chunks.push(new Ki(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, t && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(t, e, i) {
    this.addInner(t, e, i) || (this.nextLayer || (this.nextLayer = new re())).add(t, e, i);
  }
  /**
  @internal
  */
  addInner(t, e, i) {
    let n = t - this.lastTo || i.startSide - this.last.endSide;
    if (n <= 0 && (t - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return n < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = t), this.from.push(t - this.chunkStart), this.to.push(e - this.chunkStart), this.last = i, this.lastFrom = t, this.lastTo = e, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, e - t)), !0);
  }
  /**
  @internal
  */
  addChunk(t, e) {
    if ((t - this.lastTo || e.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint), this.chunks.push(e), this.chunkPos.push(t);
    let i = e.value.length - 1;
    return this.last = e.value[i], this.lastFrom = e.from[i] + t, this.lastTo = e.to[i] + t, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(E.empty);
  }
  /**
  @internal
  */
  finishInner(t) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return t;
    let e = E.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(t) : t, this.setMaxPoint);
    return this.from = null, e;
  }
}
function an(s, t, e) {
  let i = /* @__PURE__ */ new Map();
  for (let r of s)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
  let n = /* @__PURE__ */ new Set();
  for (let r of t)
    for (let o = 0; o < r.chunk.length; o++) {
      let l = i.get(r.chunk[o]);
      l != null && (e ? e.mapPos(l) : l) == r.chunkPos[o] && !(e != null && e.touchesRange(l, l + r.chunk[o].length)) && n.add(r.chunk[o]);
    }
  return n;
}
class As {
  constructor(t, e, i, n = 0) {
    this.layer = t, this.skip = e, this.minPoint = i, this.rank = n;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(t, e = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(t, e, !1), this;
  }
  gotoInner(t, e, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let n = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(n) || this.layer.chunkEnd(this.chunkIndex) < t || n.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let n = this.layer.chunk[this.chunkIndex].findIndex(t - this.layer.chunkPos[this.chunkIndex], e, !0);
      (!i || this.rangeIndex < n) && this.setRangeIndex(n);
    }
    this.next();
  }
  forward(t, e) {
    (this.to - t || this.endSide - e) < 0 && this.gotoInner(t, e, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let t = this.layer.chunkPos[this.chunkIndex], e = this.layer.chunk[this.chunkIndex], i = t + e.from[this.rangeIndex];
        if (this.from = i, this.to = t + e.to[this.rangeIndex], this.value = e.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(t) {
    if (t == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = t;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(t) {
    return this.from - t.from || this.startSide - t.startSide || this.rank - t.rank || this.to - t.to || this.endSide - t.endSide;
  }
}
class oe {
  constructor(t) {
    this.heap = t;
  }
  static from(t, e = null, i = -1) {
    let n = [];
    for (let r = 0; r < t.length; r++)
      for (let o = t[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && n.push(new As(o, e, i, r));
    return n.length == 1 ? n[0] : new oe(n);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(t, e = -1e9) {
    for (let i of this.heap)
      i.goto(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ue(this.heap, i);
    return this.next(), this;
  }
  forward(t, e) {
    for (let i of this.heap)
      i.forward(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ue(this.heap, i);
    (this.to - t || this.value.endSide - e) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let t = this.heap[0];
      this.from = t.from, this.to = t.to, this.value = t.value, this.rank = t.rank, t.value && t.next(), Ue(this.heap, 0);
    }
  }
}
function Ue(s, t) {
  for (let e = s[t]; ; ) {
    let i = (t << 1) + 1;
    if (i >= s.length)
      break;
    let n = s[i];
    if (i + 1 < s.length && n.compare(s[i + 1]) >= 0 && (n = s[i + 1], i++), e.compare(n) < 0)
      break;
    s[i] = e, s[t] = n, t = i;
  }
}
class Xt {
  constructor(t, e, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = oe.from(t, e, i);
  }
  goto(t, e = -1e9) {
    return this.cursor.goto(t, e), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = t, this.endSide = e, this.openStart = -1, this.next(), this;
  }
  forward(t, e) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - t || this.active[this.minActive].endSide - e) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(t, e);
  }
  removeActive(t) {
    ye(this.active, t), ye(this.activeTo, t), ye(this.activeRank, t), this.minActive = fn(this.active, this.activeTo);
  }
  addActive(t) {
    let e = 0, { value: i, to: n, rank: r } = this.cursor;
    for (; e < this.activeRank.length && (r - this.activeRank[e] || n - this.activeTo[e]) > 0; )
      e++;
    be(this.active, e, i), be(this.activeTo, e, n), be(this.activeRank, e, r), t && be(t, e, this.cursor.from), this.minActive = fn(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let t = this.to, e = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let n = this.minActive;
      if (n > -1 && (this.activeTo[n] - this.cursor.from || this.active[n].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[n] > t) {
          this.to = this.activeTo[n], this.endSide = this.active[n].endSide;
          break;
        }
        this.removeActive(n), i && ye(i, n);
      } else if (this.cursor.value)
        if (this.cursor.from > t) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (e && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let n = i.length - 1; n >= 0 && i[n] < t; n--)
        this.openStart++;
    }
  }
  activeForPoint(t) {
    if (!this.active.length)
      return this.active;
    let e = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > t || this.activeTo[i] == t && this.active[i].endSide >= this.point.endSide) && e.push(this.active[i]);
    return e.reverse();
  }
  openEnd(t) {
    let e = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > t; i--)
      e++;
    return e;
  }
}
function cn(s, t, e, i, n, r) {
  s.goto(t), e.goto(i);
  let o = i + n, l = i, h = i - t;
  for (; ; ) {
    let c = s.to + h - e.to || s.endSide - e.endSide, a = c < 0 ? s.to + h : e.to, f = Math.min(a, o);
    if (s.point || e.point ? s.point && e.point && (s.point == e.point || s.point.eq(e.point)) && wi(s.activeForPoint(s.to), e.activeForPoint(e.to)) || r.comparePoint(l, f, s.point, e.point) : f > l && !wi(s.active, e.active) && r.compareRange(l, f, s.active, e.active), a > o)
      break;
    l = a, c <= 0 && s.next(), c >= 0 && e.next();
  }
}
function wi(s, t) {
  if (s.length != t.length)
    return !1;
  for (let e = 0; e < s.length; e++)
    if (s[e] != t[e] && !s[e].eq(t[e]))
      return !1;
  return !0;
}
function ye(s, t) {
  for (let e = t, i = s.length - 1; e < i; e++)
    s[e] = s[e + 1];
  s.pop();
}
function be(s, t, e) {
  for (let i = s.length - 1; i >= t; i--)
    s[i + 1] = s[i];
  s[t] = e;
}
function fn(s, t) {
  let e = -1, i = 1e9;
  for (let n = 0; n < t.length; n++)
    (t[n] - i || s[n].endSide - s[e].endSide) < 0 && (e = n, i = t[n]);
  return e;
}
function oo(s, t, e = s.length) {
  let i = 0;
  for (let n = 0; n < e; )
    s.charCodeAt(n) == 9 ? (i += t - i % t, n++) : (i++, n = nt(s, n));
  return i;
}
function lo(s, t, e, i) {
  for (let n = 0, r = 0; ; ) {
    if (r >= t)
      return n;
    if (n == s.length)
      break;
    r += s.charCodeAt(n) == 9 ? e - r % e : 1, n = nt(s, n);
  }
  return i === !0 ? -1 : s.length;
}
function le(s) {
  let t;
  return s.nodeType == 11 ? t = s.getSelection ? s : s.ownerDocument : t = s, t.getSelection();
}
function Si(s, t) {
  return t ? s == t || s.contains(t.nodeType != 1 ? t.parentNode : t) : !1;
}
function ho(s) {
  let t = s.activeElement;
  for (; t && t.shadowRoot; )
    t = t.shadowRoot.activeElement;
  return t;
}
function Ee(s, t) {
  if (!t.anchorNode)
    return !1;
  try {
    return Si(s, t.anchorNode);
  } catch {
    return !1;
  }
}
function Ft(s) {
  return s.nodeType == 3 ? Mt(s, 0, s.nodeValue.length).getClientRects() : s.nodeType == 1 ? s.getClientRects() : [];
}
function ee(s, t, e, i) {
  return e ? un(s, t, e, i, -1) || un(s, t, e, i, 1) : !1;
}
function At(s) {
  for (var t = 0; ; t++)
    if (s = s.previousSibling, !s)
      return t;
}
function He(s) {
  return s.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(s.nodeName);
}
function un(s, t, e, i, n) {
  for (; ; ) {
    if (s == e && t == i)
      return !0;
    if (t == (n < 0 ? 0 : at(s))) {
      if (s.nodeName == "DIV")
        return !1;
      let r = s.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      t = At(s) + (n < 0 ? 0 : 1), s = r;
    } else if (s.nodeType == 1) {
      if (s = s.childNodes[t + (n < 0 ? -1 : 0)], s.nodeType == 1 && s.contentEditable == "false")
        return !1;
      t = n < 0 ? at(s) : 0;
    } else
      return !1;
  }
}
function at(s) {
  return s.nodeType == 3 ? s.nodeValue.length : s.childNodes.length;
}
function fe(s, t) {
  let e = t ? s.left : s.right;
  return { left: e, right: e, top: s.top, bottom: s.bottom };
}
function ao(s) {
  let t = s.visualViewport;
  return t ? {
    left: 0,
    right: t.width,
    top: 0,
    bottom: t.height
  } : {
    left: 0,
    right: s.innerWidth,
    top: 0,
    bottom: s.innerHeight
  };
}
function Ms(s, t) {
  let e = t.width / s.offsetWidth, i = t.height / s.offsetHeight;
  return (e > 0.995 && e < 1.005 || !isFinite(e) || Math.abs(t.width - s.offsetWidth) < 1) && (e = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(t.height - s.offsetHeight) < 1) && (i = 1), { scaleX: e, scaleY: i };
}
function co(s, t, e, i, n, r, o, l) {
  let h = s.ownerDocument, c = h.defaultView || window;
  for (let a = s, f = !1; a && !f; )
    if (a.nodeType == 1) {
      let u, d = a == h.body, p = 1, g = 1;
      if (d)
        u = ao(c);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(a).position) && (f = !0), a.scrollHeight <= a.clientHeight && a.scrollWidth <= a.clientWidth) {
          a = a.assignedSlot || a.parentNode;
          continue;
        }
        let v = a.getBoundingClientRect();
        ({ scaleX: p, scaleY: g } = Ms(a, v)), u = {
          left: v.left,
          right: v.left + a.clientWidth * p,
          top: v.top,
          bottom: v.top + a.clientHeight * g
        };
      }
      let m = 0, y = 0;
      if (n == "nearest")
        t.top < u.top ? (y = -(u.top - t.top + o), e > 0 && t.bottom > u.bottom + y && (y = t.bottom - u.bottom + y + o)) : t.bottom > u.bottom && (y = t.bottom - u.bottom + o, e < 0 && t.top - y < u.top && (y = -(u.top + y - t.top + o)));
      else {
        let v = t.bottom - t.top, A = u.bottom - u.top;
        y = (n == "center" && v <= A ? t.top + v / 2 - A / 2 : n == "start" || n == "center" && e < 0 ? t.top - o : t.bottom - A + o) - u.top;
      }
      if (i == "nearest" ? t.left < u.left ? (m = -(u.left - t.left + r), e > 0 && t.right > u.right + m && (m = t.right - u.right + m + r)) : t.right > u.right && (m = t.right - u.right + r, e < 0 && t.left < u.left + m && (m = -(u.left + m - t.left + r))) : m = (i == "center" ? t.left + (t.right - t.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? t.left - r : t.right - (u.right - u.left) + r) - u.left, m || y)
        if (d)
          c.scrollBy(m, y);
        else {
          let v = 0, A = 0;
          if (y) {
            let x = a.scrollTop;
            a.scrollTop += y / g, A = (a.scrollTop - x) * g;
          }
          if (m) {
            let x = a.scrollLeft;
            a.scrollLeft += m / p, v = (a.scrollLeft - x) * p;
          }
          t = {
            left: t.left - v,
            top: t.top - A,
            right: t.right - v,
            bottom: t.bottom - A
          }, v && Math.abs(v - m) < 1 && (i = "nearest"), A && Math.abs(A - y) < 1 && (n = "nearest");
        }
      if (d)
        break;
      a = a.assignedSlot || a.parentNode;
    } else if (a.nodeType == 11)
      a = a.host;
    else
      break;
}
function fo(s) {
  let t = s.ownerDocument, e, i;
  for (let n = s.parentNode; n && !(n == t.body || e && i); )
    if (n.nodeType == 1)
      !i && n.scrollHeight > n.clientHeight && (i = n), !e && n.scrollWidth > n.clientWidth && (e = n), n = n.assignedSlot || n.parentNode;
    else if (n.nodeType == 11)
      n = n.host;
    else
      break;
  return { x: e, y: i };
}
class uo {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(t) {
    return this.anchorNode == t.anchorNode && this.anchorOffset == t.anchorOffset && this.focusNode == t.focusNode && this.focusOffset == t.focusOffset;
  }
  setRange(t) {
    let { anchorNode: e, focusNode: i } = t;
    this.set(e, Math.min(t.anchorOffset, e ? at(e) : 0), i, Math.min(t.focusOffset, i ? at(i) : 0));
  }
  set(t, e, i, n) {
    this.anchorNode = t, this.anchorOffset = e, this.focusNode = i, this.focusOffset = n;
  }
}
let Ot = null;
function Ts(s) {
  if (s.setActive)
    return s.setActive();
  if (Ot)
    return s.focus(Ot);
  let t = [];
  for (let e = s; e && (t.push(e, e.scrollTop, e.scrollLeft), e != e.ownerDocument); e = e.parentNode)
    ;
  if (s.focus(Ot == null ? {
    get preventScroll() {
      return Ot = { preventScroll: !0 }, !0;
    }
  } : void 0), !Ot) {
    Ot = !1;
    for (let e = 0; e < t.length; ) {
      let i = t[e++], n = t[e++], r = t[e++];
      i.scrollTop != n && (i.scrollTop = n), i.scrollLeft != r && (i.scrollLeft = r);
    }
  }
}
let dn;
function Mt(s, t, e = t) {
  let i = dn || (dn = document.createRange());
  return i.setEnd(s, e), i.setStart(s, t), i;
}
function Lt(s, t, e, i) {
  let n = { key: t, code: t, keyCode: e, which: e, cancelable: !0 };
  i && ({ altKey: n.altKey, ctrlKey: n.ctrlKey, shiftKey: n.shiftKey, metaKey: n.metaKey } = i);
  let r = new KeyboardEvent("keydown", n);
  r.synthetic = !0, s.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", n);
  return o.synthetic = !0, s.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function po(s) {
  for (; s; ) {
    if (s && (s.nodeType == 9 || s.nodeType == 11 && s.host))
      return s;
    s = s.assignedSlot || s.parentNode;
  }
  return null;
}
function Ds(s) {
  for (; s.attributes.length; )
    s.removeAttributeNode(s.attributes[0]);
}
function go(s, t) {
  let e = t.focusNode, i = t.focusOffset;
  if (!e || t.anchorNode != e || t.anchorOffset != i)
    return !1;
  for (i = Math.min(i, at(e)); ; )
    if (i) {
      if (e.nodeType != 1)
        return !1;
      let n = e.childNodes[i - 1];
      n.contentEditable == "false" ? i-- : (e = n, i = at(e));
    } else {
      if (e == s)
        return !0;
      i = At(e), e = e.parentNode;
    }
}
function Os(s) {
  return s.scrollTop > Math.max(1, s.scrollHeight - s.clientHeight - 4);
}
function Ps(s, t) {
  for (let e = s, i = t; ; ) {
    if (e.nodeType == 3 && i > 0)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i > 0) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i - 1], i = at(e);
    } else if (e.parentNode && !He(e))
      i = At(e), e = e.parentNode;
    else
      return null;
  }
}
function Bs(s, t) {
  for (let e = s, i = t; ; ) {
    if (e.nodeType == 3 && i < e.nodeValue.length)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i < e.childNodes.length) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i], i = 0;
    } else if (e.parentNode && !He(e))
      i = At(e) + 1, e = e.parentNode;
    else
      return null;
  }
}
class $ {
  constructor(t, e, i = !0) {
    this.node = t, this.offset = e, this.precise = i;
  }
  static before(t, e) {
    return new $(t.parentNode, At(t), e);
  }
  static after(t, e) {
    return new $(t.parentNode, At(t) + 1, e);
  }
}
const qi = [];
class O {
  constructor() {
    this.parent = null, this.dom = null, this.flags = 2;
  }
  get overrideDOMText() {
    return null;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(t) {
    let e = this.posAtStart;
    for (let i of this.children) {
      if (i == t)
        return e;
      e += i.length + i.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(t) {
    return this.posBefore(t) + t.length;
  }
  sync(t, e) {
    if (this.flags & 2) {
      let i = this.dom, n = null, r;
      for (let o of this.children) {
        if (o.flags & 7) {
          if (!o.dom && (r = n ? n.nextSibling : i.firstChild)) {
            let l = O.get(r);
            (!l || !l.parent && l.canReuseDOM(o)) && o.reuseDOM(r);
          }
          o.sync(t, e), o.flags &= -8;
        }
        if (r = n ? n.nextSibling : i.firstChild, e && !e.written && e.node == i && r != o.dom && (e.written = !0), o.dom.parentNode == i)
          for (; r && r != o.dom; )
            r = pn(r);
        else
          i.insertBefore(o.dom, r);
        n = o.dom;
      }
      for (r = n ? n.nextSibling : i.firstChild, r && e && e.node == i && (e.written = !0); r; )
        r = pn(r);
    } else if (this.flags & 1)
      for (let i of this.children)
        i.flags & 7 && (i.sync(t, e), i.flags &= -8);
  }
  reuseDOM(t) {
  }
  localPosFromDOM(t, e) {
    let i;
    if (t == this.dom)
      i = this.dom.childNodes[e];
    else {
      let n = at(t) == 0 ? 0 : e == 0 ? -1 : 1;
      for (; ; ) {
        let r = t.parentNode;
        if (r == this.dom)
          break;
        n == 0 && r.firstChild != r.lastChild && (t == r.firstChild ? n = -1 : n = 1), t = r;
      }
      n < 0 ? i = t : i = t.nextSibling;
    }
    if (i == this.dom.firstChild)
      return 0;
    for (; i && !O.get(i); )
      i = i.nextSibling;
    if (!i)
      return this.length;
    for (let n = 0, r = 0; ; n++) {
      let o = this.children[n];
      if (o.dom == i)
        return r;
      r += o.length + o.breakAfter;
    }
  }
  domBoundsAround(t, e, i = 0) {
    let n = -1, r = -1, o = -1, l = -1;
    for (let h = 0, c = i, a = i; h < this.children.length; h++) {
      let f = this.children[h], u = c + f.length;
      if (c < t && u > e)
        return f.domBoundsAround(t, e, c);
      if (u >= t && n == -1 && (n = h, r = c), c > e && f.dom.parentNode == this.dom) {
        o = h, l = a;
        break;
      }
      a = u, c = u + f.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? i + this.length : l,
      startDOM: (n ? this.children[n - 1].dom.nextSibling : null) || this.dom.firstChild,
      endDOM: o < this.children.length && o >= 0 ? this.children[o].dom : null
    };
  }
  markDirty(t = !1) {
    this.flags |= 2, this.markParentsDirty(t);
  }
  markParentsDirty(t) {
    for (let e = this.parent; e; e = e.parent) {
      if (t && (e.flags |= 2), e.flags & 1)
        return;
      e.flags |= 1, t = !1;
    }
  }
  setParent(t) {
    this.parent != t && (this.parent = t, this.flags & 7 && this.markParentsDirty(!0));
  }
  setDOM(t) {
    this.dom != t && (this.dom && (this.dom.cmView = null), this.dom = t, t.cmView = this);
  }
  get rootView() {
    for (let t = this; ; ) {
      let e = t.parent;
      if (!e)
        return t;
      t = e;
    }
  }
  replaceChildren(t, e, i = qi) {
    this.markDirty();
    for (let n = t; n < e; n++) {
      let r = this.children[n];
      r.parent == this && i.indexOf(r) < 0 && r.destroy();
    }
    this.children.splice(t, e - t, ...i);
    for (let n = 0; n < i.length; n++)
      i[n].setParent(this);
  }
  ignoreMutation(t) {
    return !1;
  }
  ignoreEvent(t) {
    return !1;
  }
  childCursor(t = this.length) {
    return new Es(this.children, t, this.children.length);
  }
  childPos(t, e = 1) {
    return this.childCursor().findPos(t, e);
  }
  toString() {
    let t = this.constructor.name.replace("View", "");
    return t + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (t == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
  }
  static get(t) {
    return t.cmView;
  }
  get isEditable() {
    return !0;
  }
  get isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  merge(t, e, i, n, r, o) {
    return !1;
  }
  become(t) {
    return !1;
  }
  canReuseDOM(t) {
    return t.constructor == this.constructor && !((this.flags | t.flags) & 8);
  }
  // When this is a zero-length view with a side, this should return a
  // number <= 0 to indicate it is before its position, or a
  // number > 0 when after its position.
  getSide() {
    return 0;
  }
  destroy() {
    for (let t of this.children)
      t.parent == this && t.destroy();
    this.parent = null;
  }
}
O.prototype.breakAfter = 0;
function pn(s) {
  let t = s.nextSibling;
  return s.parentNode.removeChild(s), t;
}
class Es {
  constructor(t, e, i) {
    this.children = t, this.pos = e, this.i = i, this.off = 0;
  }
  findPos(t, e = 1) {
    for (; ; ) {
      if (t > this.pos || t == this.pos && (e > 0 || this.i == 0 || this.children[this.i - 1].breakAfter))
        return this.off = t - this.pos, this;
      let i = this.children[--this.i];
      this.pos -= i.length + i.breakAfter;
    }
  }
}
function Rs(s, t, e, i, n, r, o, l, h) {
  let { children: c } = s, a = c.length ? c[t] : null, f = r.length ? r[r.length - 1] : null, u = f ? f.breakAfter : o;
  if (!(t == i && a && !o && !u && r.length < 2 && a.merge(e, n, r.length ? f : null, e == 0, l, h))) {
    if (i < c.length) {
      let d = c[i];
      d && (n < d.length || d.breakAfter && (f != null && f.breakAfter)) ? (t == i && (d = d.split(n), n = 0), !u && f && d.merge(0, n, f, !0, 0, h) ? r[r.length - 1] = d : ((n || d.children.length && !d.children[0].length) && d.merge(0, n, null, !1, 0, h), r.push(d))) : d != null && d.breakAfter && (f ? f.breakAfter = 1 : o = 1), i++;
    }
    for (a && (a.breakAfter = o, e > 0 && (!o && r.length && a.merge(e, a.length, r[0], !1, l, 0) ? a.breakAfter = r.shift().breakAfter : (e < a.length || a.children.length && a.children[a.children.length - 1].length == 0) && a.merge(e, a.length, null, !1, l, 0), t++)); t < i && r.length; )
      if (c[i - 1].become(r[r.length - 1]))
        i--, r.pop(), h = r.length ? 0 : l;
      else if (c[t].become(r[0]))
        t++, r.shift(), l = r.length ? 0 : h;
      else
        break;
    !r.length && t && i < c.length && !c[t - 1].breakAfter && c[i].merge(0, 0, c[t - 1], !1, l, h) && t--, (t < i || r.length) && s.replaceChildren(t, i, r);
  }
}
function Ls(s, t, e, i, n, r) {
  let o = s.childCursor(), { i: l, off: h } = o.findPos(e, 1), { i: c, off: a } = o.findPos(t, -1), f = t - e;
  for (let u of i)
    f += u.length;
  s.length += f, Rs(s, c, a, l, h, i, 0, n, r);
}
let X = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, vi = typeof document < "u" ? document : { documentElement: { style: {} } };
const xi = /* @__PURE__ */ /Edge\/(\d+)/.exec(X.userAgent), Is = /* @__PURE__ */ /MSIE \d/.test(X.userAgent), ki = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(X.userAgent), Je = !!(Is || ki || xi), gn = !Je && /* @__PURE__ */ /gecko\/(\d+)/i.test(X.userAgent), Qe = !Je && /* @__PURE__ */ /Chrome\/(\d+)/.exec(X.userAgent), mn = "webkitFontSmoothing" in vi.documentElement.style, Ns = !Je && /* @__PURE__ */ /Apple Computer/.test(X.vendor), yn = Ns && (/* @__PURE__ */ /Mobile\/\w+/.test(X.userAgent) || X.maxTouchPoints > 2);
var w = {
  mac: yn || /* @__PURE__ */ /Mac/.test(X.platform),
  windows: /* @__PURE__ */ /Win/.test(X.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(X.platform),
  ie: Je,
  ie_version: Is ? vi.documentMode || 6 : ki ? +ki[1] : xi ? +xi[1] : 0,
  gecko: gn,
  gecko_version: gn ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(X.userAgent) || [0, 0])[1] : 0,
  chrome: !!Qe,
  chrome_version: Qe ? +Qe[1] : 0,
  ios: yn,
  android: /* @__PURE__ */ /Android\b/.test(X.userAgent),
  webkit: mn,
  safari: Ns,
  webkit_version: mn ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(X.userAgent) || [0, 0])[1] : 0,
  tabSize: vi.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
const mo = 256;
class Z extends O {
  constructor(t) {
    super(), this.text = t;
  }
  get length() {
    return this.text.length;
  }
  createDOM(t) {
    this.setDOM(t || document.createTextNode(this.text));
  }
  sync(t, e) {
    this.dom || this.createDOM(), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text);
  }
  reuseDOM(t) {
    t.nodeType == 3 && this.createDOM(t);
  }
  merge(t, e, i) {
    return this.flags & 8 || i && (!(i instanceof Z) || this.length - (e - t) + i.length > mo || i.flags & 8) ? !1 : (this.text = this.text.slice(0, t) + (i ? i.text : "") + this.text.slice(e), this.markDirty(), !0);
  }
  split(t) {
    let e = new Z(this.text.slice(t));
    return this.text = this.text.slice(0, t), this.markDirty(), e.flags |= this.flags & 8, e;
  }
  localPosFromDOM(t, e) {
    return t == this.dom ? e : e ? this.text.length : 0;
  }
  domAtPos(t) {
    return new $(this.dom, t);
  }
  domBoundsAround(t, e, i) {
    return { from: i, to: i + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling };
  }
  coordsAt(t, e) {
    return yo(this.dom, t, e);
  }
}
class ct extends O {
  constructor(t, e = [], i = 0) {
    super(), this.mark = t, this.children = e, this.length = i;
    for (let n of e)
      n.setParent(this);
  }
  setAttrs(t) {
    if (Ds(t), this.mark.class && (t.className = this.mark.class), this.mark.attrs)
      for (let e in this.mark.attrs)
        t.setAttribute(e, this.mark.attrs[e]);
    return t;
  }
  canReuseDOM(t) {
    return super.canReuseDOM(t) && !((this.flags | t.flags) & 8);
  }
  reuseDOM(t) {
    t.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(t), this.flags |= 6);
  }
  sync(t, e) {
    this.dom ? this.flags & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(t, e);
  }
  merge(t, e, i, n, r, o) {
    return i && (!(i instanceof ct && i.mark.eq(this.mark)) || t && r <= 0 || e < this.length && o <= 0) ? !1 : (Ls(this, t, e, i ? i.children.slice() : [], r - 1, o - 1), this.markDirty(), !0);
  }
  split(t) {
    let e = [], i = 0, n = -1, r = 0;
    for (let l of this.children) {
      let h = i + l.length;
      h > t && e.push(i < t ? l.split(t - i) : l), n < 0 && i >= t && (n = r), i = h, r++;
    }
    let o = this.length - t;
    return this.length = t, n > -1 && (this.children.length = n, this.markDirty()), new ct(this.mark, e, o);
  }
  domAtPos(t) {
    return Fs(this, t);
  }
  coordsAt(t, e) {
    return Vs(this, t, e);
  }
}
function yo(s, t, e) {
  let i = s.nodeValue.length;
  t > i && (t = i);
  let n = t, r = t, o = 0;
  t == 0 && e < 0 || t == i && e >= 0 ? w.chrome || w.gecko || (t ? (n--, o = 1) : r < i && (r++, o = -1)) : e < 0 ? n-- : r < i && r++;
  let l = Mt(s, n, r).getClientRects();
  if (!l.length)
    return null;
  let h = l[(o ? o < 0 : e >= 0) ? 0 : l.length - 1];
  return w.safari && !o && h.width == 0 && (h = Array.prototype.find.call(l, (c) => c.width) || h), o ? fe(h, o < 0) : h || null;
}
class xt extends O {
  static create(t, e, i) {
    return new xt(t, e, i);
  }
  constructor(t, e, i) {
    super(), this.widget = t, this.length = e, this.side = i, this.prevWidget = null;
  }
  split(t) {
    let e = xt.create(this.widget, this.length - t, this.side);
    return this.length -= t, e;
  }
  sync(t) {
    (!this.dom || !this.widget.updateDOM(this.dom, t)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(t)), this.widget.editable || (this.dom.contentEditable = "false"));
  }
  getSide() {
    return this.side;
  }
  merge(t, e, i, n, r, o) {
    return i && (!(i instanceof xt) || !this.widget.compare(i.widget) || t > 0 && r <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
  }
  become(t) {
    return t instanceof xt && t.side == this.side && this.widget.constructor == t.widget.constructor ? (this.widget.compare(t.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, this.length = t.length, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(t) {
    return this.widget.ignoreEvent(t);
  }
  get overrideDOMText() {
    if (this.length == 0)
      return M.empty;
    let t = this;
    for (; t.parent; )
      t = t.parent;
    let { view: e } = t, i = e && e.state.doc, n = this.posAtStart;
    return i ? i.slice(n, n + this.length) : M.empty;
  }
  domAtPos(t) {
    return (this.length ? t == 0 : this.side > 0) ? $.before(this.dom) : $.after(this.dom, t == this.length);
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(t, e) {
    let i = this.widget.coordsAt(this.dom, t, e);
    if (i)
      return i;
    let n = this.dom.getClientRects(), r = null;
    if (!n.length)
      return null;
    let o = this.side ? this.side < 0 : t > 0;
    for (let l = o ? n.length - 1 : 0; r = n[l], !(t > 0 ? l == 0 : l == n.length - 1 || r.top < r.bottom); l += o ? -1 : 1)
      ;
    return fe(r, !o);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
}
class Ht extends O {
  constructor(t) {
    super(), this.side = t;
  }
  get length() {
    return 0;
  }
  merge() {
    return !1;
  }
  become(t) {
    return t instanceof Ht && t.side == this.side;
  }
  split() {
    return new Ht(this.side);
  }
  sync() {
    if (!this.dom) {
      let t = document.createElement("img");
      t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), this.setDOM(t);
    }
  }
  getSide() {
    return this.side;
  }
  domAtPos(t) {
    return this.side > 0 ? $.before(this.dom) : $.after(this.dom);
  }
  localPosFromDOM() {
    return 0;
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(t) {
    return this.dom.getBoundingClientRect();
  }
  get overrideDOMText() {
    return M.empty;
  }
  get isHidden() {
    return !0;
  }
}
Z.prototype.children = xt.prototype.children = Ht.prototype.children = qi;
function Fs(s, t) {
  let e = s.dom, { children: i } = s, n = 0;
  for (let r = 0; n < i.length; n++) {
    let o = i[n], l = r + o.length;
    if (!(l == r && o.getSide() <= 0)) {
      if (t > r && t < l && o.dom.parentNode == e)
        return o.domAtPos(t - r);
      if (t <= r)
        break;
      r = l;
    }
  }
  for (let r = n; r > 0; r--) {
    let o = i[r - 1];
    if (o.dom.parentNode == e)
      return o.domAtPos(o.length);
  }
  for (let r = n; r < i.length; r++) {
    let o = i[r];
    if (o.dom.parentNode == e)
      return o.domAtPos(0);
  }
  return new $(e, 0);
}
function Hs(s, t, e) {
  let i, { children: n } = s;
  e > 0 && t instanceof ct && n.length && (i = n[n.length - 1]) instanceof ct && i.mark.eq(t.mark) ? Hs(i, t.children[0], e - 1) : (n.push(t), t.setParent(s)), s.length += t.length;
}
function Vs(s, t, e) {
  let i = null, n = -1, r = null, o = -1;
  function l(c, a) {
    for (let f = 0, u = 0; f < c.children.length && u <= a; f++) {
      let d = c.children[f], p = u + d.length;
      p >= a && (d.children.length ? l(d, a - u) : (!r || r.isHidden && e > 0) && (p > a || u == p && d.getSide() > 0) ? (r = d, o = a - u) : (u < a || u == p && d.getSide() < 0 && !d.isHidden) && (i = d, n = a - u)), u = p;
    }
  }
  l(s, t);
  let h = (e < 0 ? i : r) || i || r;
  return h ? h.coordsAt(Math.max(0, h == i ? n : o), e) : bo(s);
}
function bo(s) {
  let t = s.dom.lastChild;
  if (!t)
    return s.dom.getBoundingClientRect();
  let e = Ft(t);
  return e[e.length - 1] || null;
}
function Ci(s, t) {
  for (let e in s)
    e == "class" && t.class ? t.class += " " + s.class : e == "style" && t.style ? t.style += ";" + s.style : t[e] = s[e];
  return t;
}
const bn = /* @__PURE__ */ Object.create(null);
function Ve(s, t, e) {
  if (s == t)
    return !0;
  s || (s = bn), t || (t = bn);
  let i = Object.keys(s), n = Object.keys(t);
  if (i.length - (e && i.indexOf(e) > -1 ? 1 : 0) != n.length - (e && n.indexOf(e) > -1 ? 1 : 0))
    return !1;
  for (let r of i)
    if (r != e && (n.indexOf(r) == -1 || s[r] !== t[r]))
      return !1;
  return !0;
}
function Ai(s, t, e) {
  let i = !1;
  if (t)
    for (let n in t)
      e && n in e || (i = !0, n == "style" ? s.style.cssText = "" : s.removeAttribute(n));
  if (e)
    for (let n in e)
      t && t[n] == e[n] || (i = !0, n == "style" ? s.style.cssText = e[n] : s.setAttribute(n, e[n]));
  return i;
}
function wo(s) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let e = 0; e < s.attributes.length; e++) {
    let i = s.attributes[e];
    t[i.name] = i.value;
  }
  return t;
}
class ue {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(t) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(t, e) {
    return !1;
  }
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(t) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(t, e, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(t) {
  }
}
var rt = /* @__PURE__ */ function(s) {
  return s[s.Text = 0] = "Text", s[s.WidgetBefore = 1] = "WidgetBefore", s[s.WidgetAfter = 2] = "WidgetAfter", s[s.WidgetRange = 3] = "WidgetRange", s;
}(rt || (rt = {}));
class P extends Ct {
  constructor(t, e, i, n) {
    super(), this.startSide = t, this.endSide = e, this.widget = i, this.spec = n;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(t) {
    return new de(t);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(t) {
    let e = Math.max(-1e4, Math.min(1e4, t.side || 0)), i = !!t.block;
    return e += i && !t.inlineOrder ? e > 0 ? 3e8 : -4e8 : e > 0 ? 1e8 : -1e8, new mt(t, e, e, i, t.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(t) {
    let e = !!t.block, i, n;
    if (t.isBlockGap)
      i = -5e8, n = 4e8;
    else {
      let { start: r, end: o } = Ws(t, e);
      i = (r ? e ? -3e8 : -1 : 5e8) - 1, n = (o ? e ? 2e8 : 1 : -6e8) + 1;
    }
    return new mt(t, i, n, e, t.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(t) {
    return new pe(t);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(t, e = !1) {
    return E.of(t, e);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
P.none = E.empty;
class de extends P {
  constructor(t) {
    let { start: e, end: i } = Ws(t);
    super(e ? -1 : 5e8, i ? 1 : -6e8, null, t), this.tagName = t.tagName || "span", this.class = t.class || "", this.attrs = t.attributes || null;
  }
  eq(t) {
    var e, i;
    return this == t || t instanceof de && this.tagName == t.tagName && (this.class || ((e = this.attrs) === null || e === void 0 ? void 0 : e.class)) == (t.class || ((i = t.attrs) === null || i === void 0 ? void 0 : i.class)) && Ve(this.attrs, t.attrs, "class");
  }
  range(t, e = t) {
    if (t >= e)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(t, e);
  }
}
de.prototype.point = !1;
class pe extends P {
  constructor(t) {
    super(-2e8, -2e8, null, t);
  }
  eq(t) {
    return t instanceof pe && this.spec.class == t.spec.class && Ve(this.spec.attributes, t.spec.attributes);
  }
  range(t, e = t) {
    if (e != t)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(t, e);
  }
}
pe.prototype.mapMode = K.TrackBefore;
pe.prototype.point = !0;
class mt extends P {
  constructor(t, e, i, n, r, o) {
    super(e, i, r, t), this.block = n, this.isReplace = o, this.mapMode = n ? e <= 0 ? K.TrackBefore : K.TrackAfter : K.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? rt.WidgetRange : this.startSide <= 0 ? rt.WidgetBefore : rt.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(t) {
    return t instanceof mt && So(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
  }
  range(t, e = t) {
    if (this.isReplace && (t > e || t == e && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && e != t)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(t, e);
  }
}
mt.prototype.point = !0;
function Ws(s, t = !1) {
  let { inclusiveStart: e, inclusiveEnd: i } = s;
  return e == null && (e = s.inclusive), i == null && (i = s.inclusive), { start: e ?? t, end: i ?? t };
}
function So(s, t) {
  return s == t || !!(s && t && s.compare(t));
}
function Mi(s, t, e, i = 0) {
  let n = e.length - 1;
  n >= 0 && e[n] + i >= s ? e[n] = Math.max(e[n], t) : e.push(s, t);
}
class N extends O {
  constructor() {
    super(...arguments), this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0;
  }
  // Consumes source
  merge(t, e, i, n, r, o) {
    if (i) {
      if (!(i instanceof N))
        return !1;
      this.dom || i.transferDOM(this);
    }
    return n && this.setDeco(i ? i.attrs : null), Ls(this, t, e, i ? i.children.slice() : [], r, o), !0;
  }
  split(t) {
    let e = new N();
    if (e.breakAfter = this.breakAfter, this.length == 0)
      return e;
    let { i, off: n } = this.childPos(t);
    n && (e.append(this.children[i].split(n), 0), this.children[i].merge(n, this.children[i].length, null, !1, 0, 0), i++);
    for (let r = i; r < this.children.length; r++)
      e.append(this.children[r], 0);
    for (; i > 0 && this.children[i - 1].length == 0; )
      this.children[--i].destroy();
    return this.children.length = i, this.markDirty(), this.length = t, e;
  }
  transferDOM(t) {
    this.dom && (this.markDirty(), t.setDOM(this.dom), t.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null);
  }
  setDeco(t) {
    Ve(this.attrs, t) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = t);
  }
  append(t, e) {
    Hs(this, t, e);
  }
  // Only called when building a line view in ContentBuilder
  addLineDeco(t) {
    let e = t.spec.attributes, i = t.spec.class;
    e && (this.attrs = Ci(e, this.attrs || {})), i && (this.attrs = Ci({ class: i }, this.attrs || {}));
  }
  domAtPos(t) {
    return Fs(this, t);
  }
  reuseDOM(t) {
    t.nodeName == "DIV" && (this.setDOM(t), this.flags |= 6);
  }
  sync(t, e) {
    var i;
    this.dom ? this.flags & 4 && (Ds(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (Ai(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(t, e);
    let n = this.dom.lastChild;
    for (; n && O.get(n) instanceof ct; )
      n = n.lastChild;
    if (!n || !this.length || n.nodeName != "BR" && ((i = O.get(n)) === null || i === void 0 ? void 0 : i.isEditable) == !1 && (!w.ios || !this.children.some((r) => r instanceof Z))) {
      let r = document.createElement("BR");
      r.cmIgnore = !0, this.dom.appendChild(r);
    }
  }
  measureTextSize() {
    if (this.children.length == 0 || this.length > 20)
      return null;
    let t = 0, e;
    for (let i of this.children) {
      if (!(i instanceof Z) || /[^ -~]/.test(i.text))
        return null;
      let n = Ft(i.dom);
      if (n.length != 1)
        return null;
      t += n[0].width, e = n[0].height;
    }
    return t ? {
      lineHeight: this.dom.getBoundingClientRect().height,
      charWidth: t / this.length,
      textHeight: e
    } : null;
  }
  coordsAt(t, e) {
    let i = Vs(this, t, e);
    if (!this.children.length && i && this.parent) {
      let { heightOracle: n } = this.parent.view.viewState, r = i.bottom - i.top;
      if (Math.abs(r - n.lineHeight) < 2 && n.textHeight < r) {
        let o = (r - n.textHeight) / 2;
        return { top: i.top + o, bottom: i.bottom - o, left: i.left, right: i.left };
      }
    }
    return i;
  }
  become(t) {
    return t instanceof N && this.children.length == 0 && t.children.length == 0 && Ve(this.attrs, t.attrs) && this.breakAfter == t.breakAfter;
  }
  covers() {
    return !0;
  }
  static find(t, e) {
    for (let i = 0, n = 0; i < t.children.length; i++) {
      let r = t.children[i], o = n + r.length;
      if (o >= e) {
        if (r instanceof N)
          return r;
        if (o > e)
          break;
      }
      n = o + r.breakAfter;
    }
    return null;
  }
}
class ht extends O {
  constructor(t, e, i) {
    super(), this.widget = t, this.length = e, this.deco = i, this.breakAfter = 0, this.prevWidget = null;
  }
  merge(t, e, i, n, r, o) {
    return i && (!(i instanceof ht) || !this.widget.compare(i.widget) || t > 0 && r <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
  }
  domAtPos(t) {
    return t == 0 ? $.before(this.dom) : $.after(this.dom, t == this.length);
  }
  split(t) {
    let e = this.length - t;
    this.length = t;
    let i = new ht(this.widget, e, this.deco);
    return i.breakAfter = this.breakAfter, i;
  }
  get children() {
    return qi;
  }
  sync(t) {
    (!this.dom || !this.widget.updateDOM(this.dom, t)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(t)), this.widget.editable || (this.dom.contentEditable = "false"));
  }
  get overrideDOMText() {
    return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : M.empty;
  }
  domBoundsAround() {
    return null;
  }
  become(t) {
    return t instanceof ht && t.widget.constructor == this.widget.constructor ? (t.widget.compare(this.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, this.length = t.length, this.deco = t.deco, this.breakAfter = t.breakAfter, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(t) {
    return this.widget.ignoreEvent(t);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  coordsAt(t, e) {
    let i = this.widget.coordsAt(this.dom, t, e);
    return i || (this.widget instanceof Ti ? null : fe(this.dom.getBoundingClientRect(), this.length ? t == 0 : e <= 0));
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
  covers(t) {
    let { startSide: e, endSide: i } = this.deco;
    return e == i ? !1 : t < 0 ? e < 0 : i > 0;
  }
}
class Ti extends ue {
  constructor(t) {
    super(), this.height = t;
  }
  toDOM() {
    let t = document.createElement("div");
    return t.className = "cm-gap", this.updateDOM(t), t;
  }
  eq(t) {
    return t.height == this.height;
  }
  updateDOM(t) {
    return t.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
class ie {
  constructor(t, e, i, n) {
    this.doc = t, this.pos = e, this.end = i, this.disallowBlockEffectsFor = n, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.bufferMarks = [], this.atCursorPos = !0, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = t.iter(), this.skip = e;
  }
  posCovered() {
    if (this.content.length == 0)
      return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
    let t = this.content[this.content.length - 1];
    return !(t.breakAfter || t instanceof ht && t.deco.endSide < 0);
  }
  getLine() {
    return this.curLine || (this.content.push(this.curLine = new N()), this.atCursorPos = !0), this.curLine;
  }
  flushBuffer(t = this.bufferMarks) {
    this.pendingBuffer && (this.curLine.append(we(new Ht(-1), t), t.length), this.pendingBuffer = 0);
  }
  addBlockWidget(t) {
    this.flushBuffer(), this.curLine = null, this.content.push(t);
  }
  finish(t) {
    this.pendingBuffer && t <= this.bufferMarks.length ? this.flushBuffer() : this.pendingBuffer = 0, !this.posCovered() && !(t && this.content.length && this.content[this.content.length - 1] instanceof ht) && this.getLine();
  }
  buildText(t, e, i) {
    for (; t > 0; ) {
      if (this.textOff == this.text.length) {
        let { value: r, lineBreak: o, done: l } = this.cursor.next(this.skip);
        if (this.skip = 0, l)
          throw new Error("Ran out of text content when drawing inline views");
        if (o) {
          this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer(), this.curLine = null, this.atCursorPos = !0, t--;
          continue;
        } else
          this.text = r, this.textOff = 0;
      }
      let n = Math.min(
        this.text.length - this.textOff,
        t,
        512
        /* T.Chunk */
      );
      this.flushBuffer(e.slice(e.length - i)), this.getLine().append(we(new Z(this.text.slice(this.textOff, this.textOff + n)), e), i), this.atCursorPos = !0, this.textOff += n, t -= n, i = 0;
    }
  }
  span(t, e, i, n) {
    this.buildText(e - t, i, n), this.pos = e, this.openStart < 0 && (this.openStart = n);
  }
  point(t, e, i, n, r, o) {
    if (this.disallowBlockEffectsFor[o] && i instanceof mt) {
      if (i.block)
        throw new RangeError("Block decorations may not be specified via plugins");
      if (e > this.doc.lineAt(this.pos).to)
        throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
    }
    let l = e - t;
    if (i instanceof mt)
      if (i.block)
        i.startSide > 0 && !this.posCovered() && this.getLine(), this.addBlockWidget(new ht(i.widget || Vt.block, l, i));
      else {
        let h = xt.create(i.widget || Vt.inline, l, l ? 0 : i.startSide), c = this.atCursorPos && !h.isEditable && r <= n.length && (t < e || i.startSide > 0), a = !h.isEditable && (t < e || r > n.length || i.startSide <= 0), f = this.getLine();
        this.pendingBuffer == 2 && !c && !h.isEditable && (this.pendingBuffer = 0), this.flushBuffer(n), c && (f.append(we(new Ht(1), n), r), r = n.length + Math.max(0, r - n.length)), f.append(we(h, n), r), this.atCursorPos = a, this.pendingBuffer = a ? t < e || r > n.length ? 1 : 2 : 0, this.pendingBuffer && (this.bufferMarks = n.slice());
      }
    else this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(i);
    l && (this.textOff + l <= this.text.length ? this.textOff += l : (this.skip += l - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = e), this.openStart < 0 && (this.openStart = r);
  }
  static build(t, e, i, n, r) {
    let o = new ie(t, e, i, r);
    return o.openEnd = E.spans(n, e, i, o), o.openStart < 0 && (o.openStart = o.openEnd), o.finish(o.openEnd), o;
  }
}
function we(s, t) {
  for (let e of t)
    s = new ct(e, [s], s.length);
  return s;
}
class Vt extends ue {
  constructor(t) {
    super(), this.tag = t;
  }
  eq(t) {
    return t.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(t) {
    return t.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
Vt.inline = /* @__PURE__ */ new Vt("span");
Vt.block = /* @__PURE__ */ new Vt("div");
var W = /* @__PURE__ */ function(s) {
  return s[s.LTR = 0] = "LTR", s[s.RTL = 1] = "RTL", s;
}(W || (W = {}));
const Tt = W.LTR, ji = W.RTL;
function zs(s) {
  let t = [];
  for (let e = 0; e < s.length; e++)
    t.push(1 << +s[e]);
  return t;
}
const vo = /* @__PURE__ */ zs("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), xo = /* @__PURE__ */ zs("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Di = /* @__PURE__ */ Object.create(null), tt = [];
for (let s of ["()", "[]", "{}"]) {
  let t = /* @__PURE__ */ s.charCodeAt(0), e = /* @__PURE__ */ s.charCodeAt(1);
  Di[t] = e, Di[e] = -t;
}
function $s(s) {
  return s <= 247 ? vo[s] : 1424 <= s && s <= 1524 ? 2 : 1536 <= s && s <= 1785 ? xo[s - 1536] : 1774 <= s && s <= 2220 ? 4 : 8192 <= s && s <= 8204 ? 256 : 64336 <= s && s <= 65023 ? 4 : 1;
}
const ko = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class pt {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? ji : Tt;
  }
  /**
  @internal
  */
  constructor(t, e, i) {
    this.from = t, this.to = e, this.level = i;
  }
  /**
  @internal
  */
  side(t, e) {
    return this.dir == e == t ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(t, e) {
    return t == (this.dir == e);
  }
  /**
  @internal
  */
  static find(t, e, i, n) {
    let r = -1;
    for (let o = 0; o < t.length; o++) {
      let l = t[o];
      if (l.from <= e && l.to >= e) {
        if (l.level == i)
          return o;
        (r < 0 || (n != 0 ? n < 0 ? l.from < e : l.to > e : t[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function Ks(s, t) {
  if (s.length != t.length)
    return !1;
  for (let e = 0; e < s.length; e++) {
    let i = s[e], n = t[e];
    if (i.from != n.from || i.to != n.to || i.direction != n.direction || !Ks(i.inner, n.inner))
      return !1;
  }
  return !0;
}
const D = [];
function Co(s, t, e, i, n) {
  for (let r = 0; r <= i.length; r++) {
    let o = r ? i[r - 1].to : t, l = r < i.length ? i[r].from : e, h = r ? 256 : n;
    for (let c = o, a = h, f = h; c < l; c++) {
      let u = $s(s.charCodeAt(c));
      u == 512 ? u = a : u == 8 && f == 4 && (u = 16), D[c] = u == 4 ? 2 : u, u & 7 && (f = u), a = u;
    }
    for (let c = o, a = h, f = h; c < l; c++) {
      let u = D[c];
      if (u == 128)
        c < l - 1 && a == D[c + 1] && a & 24 ? u = D[c] = a : D[c] = 256;
      else if (u == 64) {
        let d = c + 1;
        for (; d < l && D[d] == 64; )
          d++;
        let p = c && a == 8 || d < e && D[d] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let g = c; g < d; g++)
          D[g] = p;
        c = d - 1;
      } else u == 8 && f == 1 && (D[c] = 1);
      a = u, u & 7 && (f = u);
    }
  }
}
function Ao(s, t, e, i, n) {
  let r = n == 1 ? 2 : 1;
  for (let o = 0, l = 0, h = 0; o <= i.length; o++) {
    let c = o ? i[o - 1].to : t, a = o < i.length ? i[o].from : e;
    for (let f = c, u, d, p; f < a; f++)
      if (d = Di[u = s.charCodeAt(f)])
        if (d < 0) {
          for (let g = l - 3; g >= 0; g -= 3)
            if (tt[g + 1] == -d) {
              let m = tt[g + 2], y = m & 2 ? n : m & 4 ? m & 1 ? r : n : 0;
              y && (D[f] = D[tt[g]] = y), l = g;
              break;
            }
        } else {
          if (tt.length == 189)
            break;
          tt[l++] = f, tt[l++] = u, tt[l++] = h;
        }
      else if ((p = D[f]) == 2 || p == 1) {
        let g = p == n;
        h = g ? 0 : 1;
        for (let m = l - 3; m >= 0; m -= 3) {
          let y = tt[m + 2];
          if (y & 2)
            break;
          if (g)
            tt[m + 2] |= 2;
          else {
            if (y & 4)
              break;
            tt[m + 2] |= 4;
          }
        }
      }
  }
}
function Mo(s, t, e, i) {
  for (let n = 0, r = i; n <= e.length; n++) {
    let o = n ? e[n - 1].to : s, l = n < e.length ? e[n].from : t;
    for (let h = o; h < l; ) {
      let c = D[h];
      if (c == 256) {
        let a = h + 1;
        for (; ; )
          if (a == l) {
            if (n == e.length)
              break;
            a = e[n++].to, l = n < e.length ? e[n].from : t;
          } else if (D[a] == 256)
            a++;
          else
            break;
        let f = r == 1, u = (a < t ? D[a] : i) == 1, d = f == u ? f ? 1 : 2 : i;
        for (let p = a, g = n, m = g ? e[g - 1].to : s; p > h; )
          p == m && (p = e[--g].from, m = g ? e[g - 1].to : s), D[--p] = d;
        h = a;
      } else
        r = c, h++;
    }
  }
}
function Oi(s, t, e, i, n, r, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == n % 2)
    for (let h = t, c = 0; h < e; ) {
      let a = !0, f = !1;
      if (c == r.length || h < r[c].from) {
        let g = D[h];
        g != l && (a = !1, f = g == 16);
      }
      let u = !a && l == 1 ? [] : null, d = a ? i : i + 1, p = h;
      t: for (; ; )
        if (c < r.length && p == r[c].from) {
          if (f)
            break t;
          let g = r[c];
          if (!a)
            for (let m = g.to, y = c + 1; ; ) {
              if (m == e)
                break t;
              if (y < r.length && r[y].from == m)
                m = r[y++].to;
              else {
                if (D[m] == l)
                  break t;
                break;
              }
            }
          if (c++, u)
            u.push(g);
          else {
            g.from > h && o.push(new pt(h, g.from, d));
            let m = g.direction == Tt != !(d % 2);
            Pi(s, m ? i + 1 : i, n, g.inner, g.from, g.to, o), h = g.to;
          }
          p = g.to;
        } else {
          if (p == e || (a ? D[p] != l : D[p] == l))
            break;
          p++;
        }
      u ? Oi(s, h, p, i + 1, n, u, o) : h < p && o.push(new pt(h, p, d)), h = p;
    }
  else
    for (let h = e, c = r.length; h > t; ) {
      let a = !0, f = !1;
      if (!c || h > r[c - 1].to) {
        let g = D[h - 1];
        g != l && (a = !1, f = g == 16);
      }
      let u = !a && l == 1 ? [] : null, d = a ? i : i + 1, p = h;
      t: for (; ; )
        if (c && p == r[c - 1].to) {
          if (f)
            break t;
          let g = r[--c];
          if (!a)
            for (let m = g.from, y = c; ; ) {
              if (m == t)
                break t;
              if (y && r[y - 1].to == m)
                m = r[--y].from;
              else {
                if (D[m - 1] == l)
                  break t;
                break;
              }
            }
          if (u)
            u.push(g);
          else {
            g.to < h && o.push(new pt(g.to, h, d));
            let m = g.direction == Tt != !(d % 2);
            Pi(s, m ? i + 1 : i, n, g.inner, g.from, g.to, o), h = g.from;
          }
          p = g.from;
        } else {
          if (p == t || (a ? D[p - 1] != l : D[p - 1] == l))
            break;
          p--;
        }
      u ? Oi(s, p, h, i + 1, n, u, o) : p < h && o.push(new pt(p, h, d)), h = p;
    }
}
function Pi(s, t, e, i, n, r, o) {
  let l = t % 2 ? 2 : 1;
  Co(s, n, r, i, l), Ao(s, n, r, i, l), Mo(n, r, i, l), Oi(s, n, r, t, e, i, o);
}
function To(s, t, e) {
  if (!s)
    return [new pt(0, 0, t == ji ? 1 : 0)];
  if (t == Tt && !e.length && !ko.test(s))
    return qs(s.length);
  if (e.length)
    for (; s.length > D.length; )
      D[D.length] = 256;
  let i = [], n = t == Tt ? 0 : 1;
  return Pi(s, n, n, e, 0, s.length, i), i;
}
function qs(s) {
  return [new pt(0, s, 0)];
}
let js = "";
function Do(s, t, e, i, n) {
  var r;
  let o = i.head - s.from, l = pt.find(t, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), h = t[l], c = h.side(n, e);
  if (o == c) {
    let u = l += n ? 1 : -1;
    if (u < 0 || u >= t.length)
      return null;
    h = t[l = u], o = h.side(!n, e), c = h.side(n, e);
  }
  let a = nt(s.text, o, h.forward(n, e));
  (a < h.from || a > h.to) && (a = c), js = s.text.slice(Math.min(o, a), Math.max(o, a));
  let f = l == (n ? t.length - 1 : 0) ? null : t[l + (n ? 1 : -1)];
  return f && a == c && f.level + (n ? 0 : 1) < h.level ? S.cursor(f.side(!n, e) + s.from, f.forward(n, e) ? 1 : -1, f.level) : S.cursor(a + s.from, h.forward(n, e) ? -1 : 1, h.level);
}
function Oo(s, t, e) {
  for (let i = t; i < e; i++) {
    let n = $s(s.charCodeAt(i));
    if (n == 1)
      return Tt;
    if (n == 2 || n == 4)
      return ji;
  }
  return Tt;
}
const Xs = /* @__PURE__ */ k.define(), Js = /* @__PURE__ */ k.define(), Gs = /* @__PURE__ */ k.define(), Ys = /* @__PURE__ */ k.define(), Bi = /* @__PURE__ */ k.define(), Us = /* @__PURE__ */ k.define(), Qs = /* @__PURE__ */ k.define(), Xi = /* @__PURE__ */ k.define(), Ji = /* @__PURE__ */ k.define(), Zs = /* @__PURE__ */ k.define({
  combine: (s) => s.some((t) => t)
}), Po = /* @__PURE__ */ k.define({
  combine: (s) => s.some((t) => t)
}), _s = /* @__PURE__ */ k.define();
class It {
  constructor(t, e = "nearest", i = "nearest", n = 5, r = 5, o = !1) {
    this.range = t, this.y = e, this.x = i, this.yMargin = n, this.xMargin = r, this.isSnapshot = o;
  }
  map(t) {
    return t.empty ? this : new It(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(t) {
    return this.range.to <= t.doc.length ? this : new It(S.cursor(t.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Se = /* @__PURE__ */ L.define({ map: (s, t) => s.map(t) }), tr = /* @__PURE__ */ L.define();
function st(s, t, e) {
  let i = s.facet(Ys);
  i.length ? i[0](t) : window.onerror ? window.onerror(String(t), e, void 0, void 0, t) : e ? console.error(e + ":", t) : console.error(t);
}
const ft = /* @__PURE__ */ k.define({ combine: (s) => s.length ? s[0] : !0 });
let Bo = 0;
const Yt = /* @__PURE__ */ k.define();
class yt {
  constructor(t, e, i, n, r) {
    this.id = t, this.create = e, this.domEventHandlers = i, this.domEventObservers = n, this.extension = r(this);
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(t, e) {
    const { eventHandlers: i, eventObservers: n, provide: r, decorations: o } = e || {};
    return new yt(Bo++, t, i, n, (l) => {
      let h = [Yt.of(l)];
      return o && h.push(he.of((c) => {
        let a = c.plugin(l);
        return a ? o(a) : P.none;
      })), r && h.push(r(l)), h;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(t, e) {
    return yt.define((i) => new t(i), e);
  }
}
class Ze {
  constructor(t) {
    this.spec = t, this.mustUpdate = null, this.value = null;
  }
  update(t) {
    if (this.value) {
      if (this.mustUpdate) {
        let e = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(e);
          } catch (i) {
            if (st(e.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.create(t);
      } catch (e) {
        st(t.state, e, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(t) {
    var e;
    if (!((e = this.value) === null || e === void 0) && e.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        st(t.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const er = /* @__PURE__ */ k.define(), Gi = /* @__PURE__ */ k.define(), he = /* @__PURE__ */ k.define(), ir = /* @__PURE__ */ k.define(), Yi = /* @__PURE__ */ k.define(), nr = /* @__PURE__ */ k.define();
function wn(s, t) {
  let e = s.state.facet(nr);
  if (!e.length)
    return e;
  let i = e.map((r) => r instanceof Function ? r(s) : r), n = [];
  return E.spans(i, t.from, t.to, {
    point() {
    },
    span(r, o, l, h) {
      let c = r - t.from, a = o - t.from, f = n;
      for (let u = l.length - 1; u >= 0; u--, h--) {
        let d = l[u].spec.bidiIsolate, p;
        if (d == null && (d = Oo(t.text, c, a)), h > 0 && f.length && (p = f[f.length - 1]).to == c && p.direction == d)
          p.to = a, f = p.inner;
        else {
          let g = { from: c, to: a, direction: d, inner: [] };
          f.push(g), f = g.inner;
        }
      }
    }
  }), n;
}
const sr = /* @__PURE__ */ k.define();
function rr(s) {
  let t = 0, e = 0, i = 0, n = 0;
  for (let r of s.state.facet(sr)) {
    let o = r(s);
    o && (o.left != null && (t = Math.max(t, o.left)), o.right != null && (e = Math.max(e, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (n = Math.max(n, o.bottom)));
  }
  return { left: t, right: e, top: i, bottom: n };
}
const Ut = /* @__PURE__ */ k.define();
class Y {
  constructor(t, e, i, n) {
    this.fromA = t, this.toA = e, this.fromB = i, this.toB = n;
  }
  join(t) {
    return new Y(Math.min(this.fromA, t.fromA), Math.max(this.toA, t.toA), Math.min(this.fromB, t.fromB), Math.max(this.toB, t.toB));
  }
  addToSet(t) {
    let e = t.length, i = this;
    for (; e > 0; e--) {
      let n = t[e - 1];
      if (!(n.fromA > i.toA)) {
        if (n.toA < i.fromA)
          break;
        i = i.join(n), t.splice(e - 1, 1);
      }
    }
    return t.splice(e, 0, i), t;
  }
  static extendWithRanges(t, e) {
    if (e.length == 0)
      return t;
    let i = [];
    for (let n = 0, r = 0, o = 0, l = 0; ; n++) {
      let h = n == t.length ? null : t[n], c = o - l, a = h ? h.fromB : 1e9;
      for (; r < e.length && e[r] < a; ) {
        let f = e[r], u = e[r + 1], d = Math.max(l, f), p = Math.min(a, u);
        if (d <= p && new Y(d + c, p + c, d, p).addToSet(i), u > a)
          break;
        r += 2;
      }
      if (!h)
        return i;
      new Y(h.fromA, h.toA, h.fromB, h.toB).addToSet(i), o = h.toA, l = h.toB;
    }
  }
}
class We {
  constructor(t, e, i) {
    this.view = t, this.state = e, this.transactions = i, this.flags = 0, this.startState = t.state, this.changes = F.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let n = [];
    this.changes.iterChangedRanges((r, o, l, h) => n.push(new Y(r, o, l, h))), this.changedRanges = n;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new We(t, e, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 10) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((t) => t.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
class Sn extends O {
  get length() {
    return this.view.state.doc.length;
  }
  constructor(t) {
    super(), this.view = t, this.decorations = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.markedForComposition = /* @__PURE__ */ new Set(), this.editContextFormatting = P.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.setDOM(t.contentDOM), this.children = [new N()], this.children[0].setParent(this), this.updateDeco(), this.updateInner([new Y(0, 0, 0, t.state.doc.length)], 0, null);
  }
  // Update the document view to a given state.
  update(t) {
    var e;
    let i = t.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: a }) => a < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = t.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = t.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(t);
    let n = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((e = this.domChanged) === null || e === void 0) && e.newSel ? n = this.domChanged.newSel.head : !Ho(t.changes, this.hasComposition) && !t.selectionSet && (n = t.state.selection.main.head));
    let r = n > -1 ? Ro(this.view, t.changes, n) : null;
    if (this.domChanged = null, this.hasComposition) {
      this.markedForComposition.clear();
      let { from: c, to: a } = this.hasComposition;
      i = new Y(c, a, t.changes.mapPos(c, -1), t.changes.mapPos(a, 1)).addToSet(i.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (w.ie || w.chrome) && !r && t && t.state.doc.lines != t.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.updateDeco(), h = No(o, l, t.changes);
    return i = Y.extendWithRanges(i, h), !(this.flags & 7) && i.length == 0 ? !1 : (this.updateInner(i, t.startState.doc.length, r), t.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(t, e, i) {
    this.view.viewState.mustMeasureContent = !0, this.updateChildren(t, e, i);
    let { observer: n } = this.view;
    n.ignore(() => {
      this.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let o = w.chrome || w.ios ? { node: n.selectionRange.focusNode, written: !1 } : void 0;
      this.sync(this.view, o), this.flags &= -8, o && (o.written || n.selectionRange.focusNode != o.node) && (this.forceSelection = !0), this.dom.style.height = "";
    }), this.markedForComposition.forEach(
      (o) => o.flags &= -9
      /* ViewFlag.Composition */
    );
    let r = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let o of this.children)
        o instanceof ht && o.widget instanceof Ti && r.push(o.dom);
    n.updateGaps(r);
  }
  updateChildren(t, e, i) {
    let n = i ? i.range.addToSet(t.slice()) : t, r = this.childCursor(e);
    for (let o = n.length - 1; ; o--) {
      let l = o >= 0 ? n[o] : null;
      if (!l)
        break;
      let { fromA: h, toA: c, fromB: a, toB: f } = l, u, d, p, g;
      if (i && i.range.fromB < f && i.range.toB > a) {
        let x = ie.build(this.view.state.doc, a, i.range.fromB, this.decorations, this.dynamicDecorationMap), R = ie.build(this.view.state.doc, i.range.toB, f, this.decorations, this.dynamicDecorationMap);
        d = x.breakAtStart, p = x.openStart, g = R.openEnd;
        let G = this.compositionView(i);
        R.breakAtStart ? G.breakAfter = 1 : R.content.length && G.merge(G.length, G.length, R.content[0], !1, R.openStart, 0) && (G.breakAfter = R.content[0].breakAfter, R.content.shift()), x.content.length && G.merge(0, 0, x.content[x.content.length - 1], !0, 0, x.openEnd) && x.content.pop(), u = x.content.concat(G).concat(R.content);
      } else
        ({ content: u, breakAtStart: d, openStart: p, openEnd: g } = ie.build(this.view.state.doc, a, f, this.decorations, this.dynamicDecorationMap));
      let { i: m, off: y } = r.findPos(c, 1), { i: v, off: A } = r.findPos(h, -1);
      Rs(this, v, A, m, y, u, d, p, g);
    }
    i && this.fixCompositionDOM(i);
  }
  updateEditContextFormatting(t) {
    this.editContextFormatting = this.editContextFormatting.map(t.changes);
    for (let e of t.transactions)
      for (let i of e.effects)
        i.is(tr) && (this.editContextFormatting = i.value);
  }
  compositionView(t) {
    let e = new Z(t.text.nodeValue);
    e.flags |= 8;
    for (let { deco: n } of t.marks)
      e = new ct(n, [e], e.length);
    let i = new N();
    return i.append(e, 0), i;
  }
  fixCompositionDOM(t) {
    let e = (r, o) => {
      o.flags |= 8 | (o.children.some(
        (h) => h.flags & 7
        /* ViewFlag.Dirty */
      ) ? 1 : 0), this.markedForComposition.add(o);
      let l = O.get(r);
      l && l != o && (l.dom = null), o.setDOM(r);
    }, i = this.childPos(t.range.fromB, 1), n = this.children[i.i];
    e(t.line, n);
    for (let r = t.marks.length - 1; r >= -1; r--)
      i = n.childPos(i.off, 1), n = n.children[i.i], e(r >= 0 ? t.marks[r].node : t.text, n);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(t = !1, e = !1) {
    (t || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let i = this.view.root.activeElement, n = i == this.dom, r = !n && Ee(this.dom, this.view.observer.selectionRange) && !(i && this.dom.contains(i));
    if (!(n || e || r))
      return;
    let o = this.forceSelection;
    this.forceSelection = !1;
    let l = this.view.state.selection.main, h = this.moveToLine(this.domAtPos(l.anchor)), c = l.empty ? h : this.moveToLine(this.domAtPos(l.head));
    if (w.gecko && l.empty && !this.hasComposition && Eo(h)) {
      let f = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(f, h.node.childNodes[h.offset] || null)), h = c = new $(f, 0), o = !0;
    }
    let a = this.view.observer.selectionRange;
    (o || !a.focusNode || (!ee(h.node, h.offset, a.anchorNode, a.anchorOffset) || !ee(c.node, c.offset, a.focusNode, a.focusOffset)) && !this.suppressWidgetCursorChange(a, l)) && (this.view.observer.ignore(() => {
      w.android && w.chrome && this.dom.contains(a.focusNode) && Fo(a.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({ preventScroll: !0 }));
      let f = le(this.view.root);
      if (f) if (l.empty) {
        if (w.gecko) {
          let u = Lo(h.node, h.offset);
          if (u && u != 3) {
            let d = (u == 1 ? Ps : Bs)(h.node, h.offset);
            d && (h = new $(d.node, d.offset));
          }
        }
        f.collapse(h.node, h.offset), l.bidiLevel != null && f.caretBidiLevel !== void 0 && (f.caretBidiLevel = l.bidiLevel);
      } else if (f.extend) {
        f.collapse(h.node, h.offset);
        try {
          f.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let u = document.createRange();
        l.anchor > l.head && ([h, c] = [c, h]), u.setEnd(c.node, c.offset), u.setStart(h.node, h.offset), f.removeAllRanges(), f.addRange(u);
      }
      r && this.view.root.activeElement == this.dom && (this.dom.blur(), i && i.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new $(a.anchorNode, a.anchorOffset), this.impreciseHead = c.precise ? null : new $(a.focusNode, a.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(t, e) {
    return this.hasComposition && e.empty && ee(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset) && this.posFromDOM(t.focusNode, t.focusOffset) == e.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: t } = this, e = t.state.selection.main, i = le(t.root), { anchorNode: n, anchorOffset: r } = t.observer.selectionRange;
    if (!i || !e.empty || !e.assoc || !i.modify)
      return;
    let o = N.find(this, e.head);
    if (!o)
      return;
    let l = o.posAtStart;
    if (e.head == l || e.head == l + o.length)
      return;
    let h = this.coordsAt(e.head, -1), c = this.coordsAt(e.head, 1);
    if (!h || !c || h.bottom > c.top)
      return;
    let a = this.domAtPos(e.head + e.assoc);
    i.collapse(a.node, a.offset), i.modify("move", e.assoc < 0 ? "forward" : "backward", "lineboundary"), t.observer.readSelectionRange();
    let f = t.observer.selectionRange;
    t.docView.posFromDOM(f.anchorNode, f.anchorOffset) != e.from && i.collapse(n, r);
  }
  // If a position is in/near a block widget, move it to a nearby text
  // line, since we don't want the cursor inside a block widget.
  moveToLine(t) {
    let e = this.dom, i;
    if (t.node != e)
      return t;
    for (let n = t.offset; !i && n < e.childNodes.length; n++) {
      let r = O.get(e.childNodes[n]);
      r instanceof N && (i = r.domAtPos(0));
    }
    for (let n = t.offset - 1; !i && n >= 0; n--) {
      let r = O.get(e.childNodes[n]);
      r instanceof N && (i = r.domAtPos(r.length));
    }
    return i ? new $(i.node, i.offset, !0) : t;
  }
  nearest(t) {
    for (let e = t; e; ) {
      let i = O.get(e);
      if (i && i.rootView == this)
        return i;
      e = e.parentNode;
    }
    return null;
  }
  posFromDOM(t, e) {
    let i = this.nearest(t);
    if (!i)
      throw new RangeError("Trying to find position for a DOM position outside of the document");
    return i.localPosFromDOM(t, e) + i.posAtStart;
  }
  domAtPos(t) {
    let { i: e, off: i } = this.childCursor().findPos(t, -1);
    for (; e < this.children.length - 1; ) {
      let n = this.children[e];
      if (i < n.length || n instanceof N)
        break;
      e++, i = 0;
    }
    return this.children[e].domAtPos(i);
  }
  coordsAt(t, e) {
    let i = null, n = 0;
    for (let r = this.length, o = this.children.length - 1; o >= 0; o--) {
      let l = this.children[o], h = r - l.breakAfter, c = h - l.length;
      if (h < t)
        break;
      if (c <= t && (c < t || l.covers(-1)) && (h > t || l.covers(1)) && (!i || l instanceof N && !(i instanceof N && e >= 0)))
        i = l, n = c;
      else if (i && c == t && h == t && l instanceof ht && Math.abs(e) < 2) {
        if (l.deco.startSide < 0)
          break;
        o && (i = null);
      }
      r = c;
    }
    return i ? i.coordsAt(t - n, e) : null;
  }
  coordsForChar(t) {
    let { i: e, off: i } = this.childPos(t, 1), n = this.children[e];
    if (!(n instanceof N))
      return null;
    for (; n.children.length; ) {
      let { i: l, off: h } = n.childPos(i, 1);
      for (; ; l++) {
        if (l == n.children.length)
          return null;
        if ((n = n.children[l]).length)
          break;
      }
      i = h;
    }
    if (!(n instanceof Z))
      return null;
    let r = nt(n.text, i);
    if (r == i)
      return null;
    let o = Mt(n.dom, i, r).getClientRects();
    for (let l = 0; l < o.length; l++) {
      let h = o[l];
      if (l == o.length - 1 || h.top < h.bottom && h.left < h.right)
        return h;
    }
    return null;
  }
  measureVisibleLineHeights(t) {
    let e = [], { from: i, to: n } = t, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, h = this.view.textDirection == W.LTR;
    for (let c = 0, a = 0; a < this.children.length; a++) {
      let f = this.children[a], u = c + f.length;
      if (u > n)
        break;
      if (c >= i) {
        let d = f.dom.getBoundingClientRect();
        if (e.push(d.height), o) {
          let p = f.dom.lastChild, g = p ? Ft(p) : [];
          if (g.length) {
            let m = g[g.length - 1], y = h ? m.right - d.left : d.right - m.left;
            y > l && (l = y, this.minWidth = r, this.minWidthFrom = c, this.minWidthTo = u);
          }
        }
      }
      c = u + f.breakAfter;
    }
    return e;
  }
  textDirectionAt(t) {
    let { i: e } = this.childPos(t, 1);
    return getComputedStyle(this.children[e].dom).direction == "rtl" ? W.RTL : W.LTR;
  }
  measureTextSize() {
    for (let r of this.children)
      if (r instanceof N) {
        let o = r.measureTextSize();
        if (o)
          return o;
      }
    let t = document.createElement("div"), e, i, n;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.dom.appendChild(t);
      let r = Ft(t.firstChild)[0];
      e = t.getBoundingClientRect().height, i = r ? r.width / 27 : 7, n = r ? r.height : e, t.remove();
    }), { lineHeight: e, charWidth: i, textHeight: n };
  }
  childCursor(t = this.length) {
    let e = this.children.length;
    return e && (t -= this.children[--e].length), new Es(this.children, t, e);
  }
  computeBlockGapDeco() {
    let t = [], e = this.view.viewState;
    for (let i = 0, n = 0; ; n++) {
      let r = n == e.viewports.length ? null : e.viewports[n], o = r ? r.from - 1 : this.length;
      if (o > i) {
        let l = (e.lineBlockAt(o).bottom - e.lineBlockAt(i).top) / this.view.scaleY;
        t.push(P.replace({
          widget: new Ti(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return P.set(t);
  }
  updateDeco() {
    let t = 1, e = this.view.state.facet(he).map((r) => (this.dynamicDecorationMap[t++] = typeof r == "function") ? r(this.view) : r), i = !1, n = this.view.state.facet(ir).map((r, o) => {
      let l = typeof r == "function";
      return l && (i = !0), l ? r(this.view) : r;
    });
    for (n.length && (this.dynamicDecorationMap[t++] = i, e.push(E.join(n))), this.decorations = [
      this.editContextFormatting,
      ...e,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; t < this.decorations.length; )
      this.dynamicDecorationMap[t++] = !1;
    return this.decorations;
  }
  scrollIntoView(t) {
    if (t.isSnapshot) {
      let c = this.view.viewState.lineBlockAt(t.range.head);
      this.view.scrollDOM.scrollTop = c.top - t.yMargin, this.view.scrollDOM.scrollLeft = t.xMargin;
      return;
    }
    for (let c of this.view.state.facet(_s))
      try {
        if (c(this.view, t.range, t))
          return !0;
      } catch (a) {
        st(this.view.state, a, "scroll handler");
      }
    let { range: e } = t, i = this.coordsAt(e.head, e.empty ? e.assoc : e.head > e.anchor ? -1 : 1), n;
    if (!i)
      return;
    !e.empty && (n = this.coordsAt(e.anchor, e.anchor > e.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, n.left),
      top: Math.min(i.top, n.top),
      right: Math.max(i.right, n.right),
      bottom: Math.max(i.bottom, n.bottom)
    });
    let r = rr(this.view), o = {
      left: i.left - r.left,
      top: i.top - r.top,
      right: i.right + r.right,
      bottom: i.bottom + r.bottom
    }, { offsetWidth: l, offsetHeight: h } = this.view.scrollDOM;
    co(this.view.scrollDOM, o, e.head < e.anchor ? -1 : 1, t.x, t.y, Math.max(Math.min(t.xMargin, l), -l), Math.max(Math.min(t.yMargin, h), -h), this.view.textDirection == W.LTR);
  }
}
function Eo(s) {
  return s.node.nodeType == 1 && s.node.firstChild && (s.offset == 0 || s.node.childNodes[s.offset - 1].contentEditable == "false") && (s.offset == s.node.childNodes.length || s.node.childNodes[s.offset].contentEditable == "false");
}
function or(s, t) {
  let e = s.observer.selectionRange;
  if (!e.focusNode)
    return null;
  let i = Ps(e.focusNode, e.focusOffset), n = Bs(e.focusNode, e.focusOffset), r = i || n;
  if (n && i && n.node != i.node) {
    let l = O.get(n.node);
    if (!l || l instanceof Z && l.text != n.node.nodeValue)
      r = n;
    else if (s.docView.lastCompositionAfterCursor) {
      let h = O.get(i.node);
      !h || h instanceof Z && h.text != i.node.nodeValue || (r = n);
    }
  }
  if (s.docView.lastCompositionAfterCursor = r != i, !r)
    return null;
  let o = t - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function Ro(s, t, e) {
  let i = or(s, e);
  if (!i)
    return null;
  let { node: n, from: r, to: o } = i, l = n.nodeValue;
  if (/[\n\r]/.test(l) || s.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let h = t.invertedDesc, c = new Y(h.mapPos(r), h.mapPos(o), r, o), a = [];
  for (let f = n.parentNode; ; f = f.parentNode) {
    let u = O.get(f);
    if (u instanceof ct)
      a.push({ node: f, deco: u.mark });
    else {
      if (u instanceof N || f.nodeName == "DIV" && f.parentNode == s.contentDOM)
        return { range: c, text: n, marks: a, line: f };
      if (f != s.contentDOM)
        a.push({ node: f, deco: new de({
          inclusive: !0,
          attributes: wo(f),
          tagName: f.tagName.toLowerCase()
        }) });
      else
        return null;
    }
  }
}
function Lo(s, t) {
  return s.nodeType != 1 ? 0 : (t && s.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < s.childNodes.length && s.childNodes[t].contentEditable == "false" ? 2 : 0);
}
let Io = class {
  constructor() {
    this.changes = [];
  }
  compareRange(t, e) {
    Mi(t, e, this.changes);
  }
  comparePoint(t, e) {
    Mi(t, e, this.changes);
  }
};
function No(s, t, e) {
  let i = new Io();
  return E.compare(s, t, e, i), i.changes;
}
function Fo(s, t) {
  for (let e = s; e && e != t; e = e.assignedSlot || e.parentNode)
    if (e.nodeType == 1 && e.contentEditable == "false")
      return !0;
  return !1;
}
function Ho(s, t) {
  let e = !1;
  return t && s.iterChangedRanges((i, n) => {
    i < t.to && n > t.from && (e = !0);
  }), e;
}
function Vo(s, t, e = 1) {
  let i = s.charCategorizer(t), n = s.doc.lineAt(t), r = t - n.from;
  if (n.length == 0)
    return S.cursor(t);
  r == 0 ? e = 1 : r == n.length && (e = -1);
  let o = r, l = r;
  e < 0 ? o = nt(n.text, r, !1) : l = nt(n.text, r);
  let h = i(n.text.slice(o, l));
  for (; o > 0; ) {
    let c = nt(n.text, o, !1);
    if (i(n.text.slice(c, o)) != h)
      break;
    o = c;
  }
  for (; l < n.length; ) {
    let c = nt(n.text, l);
    if (i(n.text.slice(l, c)) != h)
      break;
    l = c;
  }
  return S.range(o + n.from, l + n.from);
}
function Wo(s, t) {
  return t.left > s ? t.left - s : Math.max(0, s - t.right);
}
function zo(s, t) {
  return t.top > s ? t.top - s : Math.max(0, s - t.bottom);
}
function _e(s, t) {
  return s.top < t.bottom - 1 && s.bottom > t.top + 1;
}
function vn(s, t) {
  return t < s.top ? { top: t, left: s.left, right: s.right, bottom: s.bottom } : s;
}
function xn(s, t) {
  return t > s.bottom ? { top: s.top, left: s.left, right: s.right, bottom: t } : s;
}
function Ei(s, t, e) {
  let i, n, r, o, l = !1, h, c, a, f;
  for (let p = s.firstChild; p; p = p.nextSibling) {
    let g = Ft(p);
    for (let m = 0; m < g.length; m++) {
      let y = g[m];
      n && _e(n, y) && (y = vn(xn(y, n.bottom), n.top));
      let v = Wo(t, y), A = zo(e, y);
      if (v == 0 && A == 0)
        return p.nodeType == 3 ? kn(p, t, e) : Ei(p, t, e);
      if (!i || o > A || o == A && r > v) {
        i = p, n = y, r = v, o = A;
        let x = A ? e < y.top ? -1 : 1 : v ? t < y.left ? -1 : 1 : 0;
        l = !x || (x > 0 ? m < g.length - 1 : m > 0);
      }
      v == 0 ? e > y.bottom && (!a || a.bottom < y.bottom) ? (h = p, a = y) : e < y.top && (!f || f.top > y.top) && (c = p, f = y) : a && _e(a, y) ? a = xn(a, y.bottom) : f && _e(f, y) && (f = vn(f, y.top));
    }
  }
  if (a && a.bottom >= e ? (i = h, n = a) : f && f.top <= e && (i = c, n = f), !i)
    return { node: s, offset: 0 };
  let u = Math.max(n.left, Math.min(n.right, t));
  if (i.nodeType == 3)
    return kn(i, u, e);
  if (l && i.contentEditable != "false")
    return Ei(i, u, e);
  let d = Array.prototype.indexOf.call(s.childNodes, i) + (t >= (n.left + n.right) / 2 ? 1 : 0);
  return { node: s, offset: d };
}
function kn(s, t, e) {
  let i = s.nodeValue.length, n = -1, r = 1e9, o = 0;
  for (let l = 0; l < i; l++) {
    let h = Mt(s, l, l + 1).getClientRects();
    for (let c = 0; c < h.length; c++) {
      let a = h[c];
      if (a.top == a.bottom)
        continue;
      o || (o = t - a.left);
      let f = (a.top > e ? a.top - e : e - a.bottom) - 1;
      if (a.left - 1 <= t && a.right + 1 >= t && f < r) {
        let u = t >= (a.left + a.right) / 2, d = u;
        if ((w.chrome || w.gecko) && Mt(s, l).getBoundingClientRect().left == a.right && (d = !u), f <= 0)
          return { node: s, offset: l + (d ? 1 : 0) };
        n = l + (d ? 1 : 0), r = f;
      }
    }
  }
  return { node: s, offset: n > -1 ? n : o > 0 ? s.nodeValue.length : 0 };
}
function lr(s, t, e, i = -1) {
  var n, r;
  let o = s.contentDOM.getBoundingClientRect(), l = o.top + s.viewState.paddingTop, h, { docHeight: c } = s.viewState, { x: a, y: f } = t, u = f - l;
  if (u < 0)
    return 0;
  if (u > c)
    return s.state.doc.length;
  for (let x = s.viewState.heightOracle.textHeight / 2, R = !1; h = s.elementAtHeight(u), h.type != rt.Text; )
    for (; u = i > 0 ? h.bottom + x : h.top - x, !(u >= 0 && u <= c); ) {
      if (R)
        return e ? null : 0;
      R = !0, i = -i;
    }
  f = l + u;
  let d = h.from;
  if (d < s.viewport.from)
    return s.viewport.from == 0 ? 0 : e ? null : Cn(s, o, h, a, f);
  if (d > s.viewport.to)
    return s.viewport.to == s.state.doc.length ? s.state.doc.length : e ? null : Cn(s, o, h, a, f);
  let p = s.dom.ownerDocument, g = s.root.elementFromPoint ? s.root : p, m = g.elementFromPoint(a, f);
  m && !s.contentDOM.contains(m) && (m = null), m || (a = Math.max(o.left + 1, Math.min(o.right - 1, a)), m = g.elementFromPoint(a, f), m && !s.contentDOM.contains(m) && (m = null));
  let y, v = -1;
  if (m && ((n = s.docView.nearest(m)) === null || n === void 0 ? void 0 : n.isEditable) != !1) {
    if (p.caretPositionFromPoint) {
      let x = p.caretPositionFromPoint(a, f);
      x && ({ offsetNode: y, offset: v } = x);
    } else if (p.caretRangeFromPoint) {
      let x = p.caretRangeFromPoint(a, f);
      x && ({ startContainer: y, startOffset: v } = x, (!s.contentDOM.contains(y) || w.safari && $o(y, v, a) || w.chrome && Ko(y, v, a)) && (y = void 0));
    }
  }
  if (!y || !s.docView.dom.contains(y)) {
    let x = N.find(s.docView, d);
    if (!x)
      return u > h.top + h.height / 2 ? h.to : h.from;
    ({ node: y, offset: v } = Ei(x.dom, a, f));
  }
  let A = s.docView.nearest(y);
  if (!A)
    return null;
  if (A.isWidget && ((r = A.dom) === null || r === void 0 ? void 0 : r.nodeType) == 1) {
    let x = A.dom.getBoundingClientRect();
    return t.y < x.top || t.y <= x.bottom && t.x <= (x.left + x.right) / 2 ? A.posAtStart : A.posAtEnd;
  } else
    return A.localPosFromDOM(y, v) + A.posAtStart;
}
function Cn(s, t, e, i, n) {
  let r = Math.round((i - t.left) * s.defaultCharacterWidth);
  if (s.lineWrapping && e.height > s.defaultLineHeight * 1.5) {
    let l = s.viewState.heightOracle.textHeight, h = Math.floor((n - e.top - (s.defaultLineHeight - l) * 0.5) / l);
    r += h * s.viewState.heightOracle.lineLength;
  }
  let o = s.state.sliceDoc(e.from, e.to);
  return e.from + lo(o, r, s.state.tabSize);
}
function $o(s, t, e) {
  let i;
  if (s.nodeType != 3 || t != (i = s.nodeValue.length))
    return !1;
  for (let n = s.nextSibling; n; n = n.nextSibling)
    if (n.nodeType != 1 || n.nodeName != "BR")
      return !1;
  return Mt(s, i - 1, i).getBoundingClientRect().left > e;
}
function Ko(s, t, e) {
  if (t != 0)
    return !1;
  for (let n = s; ; ) {
    let r = n.parentNode;
    if (!r || r.nodeType != 1 || r.firstChild != n)
      return !1;
    if (r.classList.contains("cm-line"))
      break;
    n = r;
  }
  let i = s.nodeType == 1 ? s.getBoundingClientRect() : Mt(s, 0, Math.max(s.nodeValue.length, 1)).getBoundingClientRect();
  return e - i.left > 5;
}
function qo(s, t) {
  let e = s.lineBlockAt(t);
  if (Array.isArray(e.type)) {
    for (let i of e.type)
      if (i.to > t || i.to == t && (i.to == e.to || i.type == rt.Text))
        return i;
  }
  return e;
}
function jo(s, t, e, i) {
  let n = qo(s, t.head), r = !i || n.type != rt.Text || !(s.lineWrapping || n.widgetLineBreaks) ? null : s.coordsAtPos(t.assoc < 0 && t.head > n.from ? t.head - 1 : t.head);
  if (r) {
    let o = s.dom.getBoundingClientRect(), l = s.textDirectionAt(n.from), h = s.posAtCoords({
      x: e == (l == W.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (h != null)
      return S.cursor(h, e ? -1 : 1);
  }
  return S.cursor(e ? n.to : n.from, e ? -1 : 1);
}
function An(s, t, e, i) {
  let n = s.state.doc.lineAt(t.head), r = s.bidiSpans(n), o = s.textDirectionAt(n.from);
  for (let l = t, h = null; ; ) {
    let c = Do(n, r, o, l, e), a = js;
    if (!c) {
      if (n.number == (e ? s.state.doc.lines : 1))
        return l;
      a = `
`, n = s.state.doc.line(n.number + (e ? 1 : -1)), r = s.bidiSpans(n), c = s.visualLineSide(n, !e);
    }
    if (h) {
      if (!h(a))
        return l;
    } else {
      if (!i)
        return c;
      h = i(a);
    }
    l = c;
  }
}
function Xo(s, t, e) {
  let i = s.state.charCategorizer(t), n = i(e);
  return (r) => {
    let o = i(r);
    return n == ot.Space && (n = o), n == o;
  };
}
function Jo(s, t, e, i) {
  let n = t.head, r = e ? 1 : -1;
  if (n == (e ? s.state.doc.length : 0))
    return S.cursor(n, t.assoc);
  let o = t.goalColumn, l, h = s.contentDOM.getBoundingClientRect(), c = s.coordsAtPos(n, t.assoc || -1), a = s.documentTop;
  if (c)
    o == null && (o = c.left - h.left), l = r < 0 ? c.top : c.bottom;
  else {
    let d = s.viewState.lineBlockAt(n);
    o == null && (o = Math.min(h.right - h.left, s.defaultCharacterWidth * (n - d.from))), l = (r < 0 ? d.top : d.bottom) + a;
  }
  let f = h.left + o, u = i ?? s.viewState.heightOracle.textHeight >> 1;
  for (let d = 0; ; d += 10) {
    let p = l + (u + d) * r, g = lr(s, { x: f, y: p }, !1, r);
    if (p < h.top || p > h.bottom || (r < 0 ? g < n : g > n)) {
      let m = s.docView.coordsForChar(g), y = !m || p < m.top ? -1 : 1;
      return S.cursor(g, y, void 0, o);
    }
  }
}
function Re(s, t, e) {
  for (; ; ) {
    let i = 0;
    for (let n of s)
      n.between(t - 1, t + 1, (r, o, l) => {
        if (t > r && t < o) {
          let h = i || e || (t - r < o - t ? -1 : 1);
          t = h < 0 ? r : o, i = h;
        }
      });
    if (!i)
      return t;
  }
}
function ti(s, t, e) {
  let i = Re(s.state.facet(Yi).map((n) => n(s)), e.from, t.head > e.from ? -1 : 1);
  return i == e.from ? e : S.cursor(i, i < e.from ? 1 : -1);
}
const Qt = "￿";
class Go {
  constructor(t, e) {
    this.points = t, this.text = "", this.lineSeparator = e.facet(T.lineSeparator);
  }
  append(t) {
    this.text += t;
  }
  lineBreak() {
    this.text += Qt;
  }
  readRange(t, e) {
    if (!t)
      return this;
    let i = t.parentNode;
    for (let n = t; ; ) {
      this.findPointBefore(i, n);
      let r = this.text.length;
      this.readNode(n);
      let o = n.nextSibling;
      if (o == e)
        break;
      let l = O.get(n), h = O.get(o);
      (l && h ? l.breakAfter : (l ? l.breakAfter : He(n)) || He(o) && (n.nodeName != "BR" || n.cmIgnore) && this.text.length > r) && this.lineBreak(), n = o;
    }
    return this.findPointBefore(i, e), this;
  }
  readTextNode(t) {
    let e = t.nodeValue;
    for (let i of this.points)
      i.node == t && (i.pos = this.text.length + Math.min(i.offset, e.length));
    for (let i = 0, n = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = e.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = n.exec(e)) && (r = l.index, o = l[0].length), this.append(e.slice(i, r < 0 ? e.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let h of this.points)
          h.node == t && h.pos > this.text.length && (h.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(t) {
    if (t.cmIgnore)
      return;
    let e = O.get(t), i = e && e.overrideDOMText;
    if (i != null) {
      this.findPointInside(t, i.length);
      for (let n = i.iter(); !n.next().done; )
        n.lineBreak ? this.lineBreak() : this.append(n.value);
    } else t.nodeType == 3 ? this.readTextNode(t) : t.nodeName == "BR" ? t.nextSibling && this.lineBreak() : t.nodeType == 1 && this.readRange(t.firstChild, null);
  }
  findPointBefore(t, e) {
    for (let i of this.points)
      i.node == t && t.childNodes[i.offset] == e && (i.pos = this.text.length);
  }
  findPointInside(t, e) {
    for (let i of this.points)
      (t.nodeType == 3 ? i.node == t : t.contains(i.node)) && (i.pos = this.text.length + (Yo(t, i.node, i.offset) ? e : 0));
  }
}
function Yo(s, t, e) {
  for (; ; ) {
    if (!t || e < at(t))
      return !1;
    if (t == s)
      return !0;
    e = At(t) + 1, t = t.parentNode;
  }
}
class Mn {
  constructor(t, e) {
    this.node = t, this.offset = e, this.pos = -1;
  }
}
class Uo {
  constructor(t, e, i, n) {
    this.typeOver = n, this.bounds = null, this.text = "", this.domChanged = e > -1;
    let { impreciseHead: r, impreciseAnchor: o } = t.docView;
    if (t.state.readOnly && e > -1)
      this.newSel = null;
    else if (e > -1 && (this.bounds = t.docView.domBoundsAround(e, i, 0))) {
      let l = r || o ? [] : _o(t), h = new Go(l, t.state);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = tl(l, this.bounds.from);
    } else {
      let l = t.observer.selectionRange, h = r && r.node == l.focusNode && r.offset == l.focusOffset || !Si(t.contentDOM, l.focusNode) ? t.state.selection.main.head : t.docView.posFromDOM(l.focusNode, l.focusOffset), c = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !Si(t.contentDOM, l.anchorNode) ? t.state.selection.main.anchor : t.docView.posFromDOM(l.anchorNode, l.anchorOffset), a = t.viewport;
      if ((w.ios || w.chrome) && t.state.selection.main.empty && h != c && (a.from > 0 || a.to < t.state.doc.length)) {
        let f = Math.min(h, c), u = Math.max(h, c), d = a.from - f, p = a.to - u;
        (d == 0 || d == 1 || f == 0) && (p == 0 || p == -1 || u == t.state.doc.length) && (h = 0, c = t.state.doc.length);
      }
      this.newSel = S.single(c, h);
    }
  }
}
function hr(s, t) {
  let e, { newSel: i } = t, n = s.state.selection.main, r = s.inputState.lastKeyTime > Date.now() - 100 ? s.inputState.lastKeyCode : -1;
  if (t.bounds) {
    let { from: o, to: l } = t.bounds, h = n.from, c = null;
    (r === 8 || w.android && t.text.length < l - o) && (h = n.to, c = "end");
    let a = Zo(s.state.doc.sliceString(o, l, Qt), t.text, h - o, c);
    a && (w.chrome && r == 13 && a.toB == a.from + 2 && t.text.slice(a.from, a.toB) == Qt + Qt && a.toB--, e = {
      from: o + a.from,
      to: o + a.toA,
      insert: M.of(t.text.slice(a.from, a.toB).split(Qt))
    });
  } else i && (!s.hasFocus && s.state.facet(ft) || i.main.eq(n)) && (i = null);
  if (!e && !i)
    return !1;
  if (!e && t.typeOver && !n.empty && i && i.main.empty ? e = { from: n.from, to: n.to, insert: s.state.doc.slice(n.from, n.to) } : e && e.from >= n.from && e.to <= n.to && (e.from != n.from || e.to != n.to) && n.to - n.from - (e.to - e.from) <= 4 ? e = {
    from: n.from,
    to: n.to,
    insert: s.state.doc.slice(n.from, e.from).append(e.insert).append(s.state.doc.slice(e.to, n.to))
  } : (w.mac || w.android) && e && e.from == e.to && e.from == n.head - 1 && /^\. ?$/.test(e.insert.toString()) && s.contentDOM.getAttribute("autocorrect") == "off" ? (i && e.insert.length == 2 && (i = S.single(i.main.anchor - 1, i.main.head - 1)), e = { from: n.from, to: n.to, insert: M.of([" "]) }) : w.chrome && e && e.from == e.to && e.from == n.head && e.insert.toString() == `
 ` && s.lineWrapping && (i && (i = S.single(i.main.anchor - 1, i.main.head - 1)), e = { from: n.from, to: n.to, insert: M.of([" "]) }), e)
    return Ui(s, e, i, r);
  if (i && !i.main.eq(n)) {
    let o = !1, l = "select";
    return s.inputState.lastSelectionTime > Date.now() - 50 && (s.inputState.lastSelectionOrigin == "select" && (o = !0), l = s.inputState.lastSelectionOrigin), s.dispatch({ selection: i, scrollIntoView: o, userEvent: l }), !0;
  } else
    return !1;
}
function Ui(s, t, e, i = -1) {
  if (w.ios && s.inputState.flushIOSKey(t))
    return !0;
  let n = s.state.selection.main;
  if (w.android && (t.to == n.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (t.from == n.from || t.from == n.from - 1 && s.state.sliceDoc(t.from, n.from) == " ") && t.insert.length == 1 && t.insert.lines == 2 && Lt(s.contentDOM, "Enter", 13) || (t.from == n.from - 1 && t.to == n.to && t.insert.length == 0 || i == 8 && t.insert.length < t.to - t.from && t.to > n.head) && Lt(s.contentDOM, "Backspace", 8) || t.from == n.from && t.to == n.to + 1 && t.insert.length == 0 && Lt(s.contentDOM, "Delete", 46)))
    return !0;
  let r = t.insert.toString();
  s.inputState.composing >= 0 && s.inputState.composing++;
  let o, l = () => o || (o = Qo(s, t, e));
  return s.state.facet(Us).some((h) => h(s, t.from, t.to, r, l)) || s.dispatch(l()), !0;
}
function Qo(s, t, e) {
  let i, n = s.state, r = n.selection.main;
  if (t.from >= r.from && t.to <= r.to && t.to - t.from >= (r.to - r.from) / 3 && (!e || e.main.empty && e.main.from == t.from + t.insert.length) && s.inputState.composing < 0) {
    let l = r.from < t.from ? n.sliceDoc(r.from, t.from) : "", h = r.to > t.to ? n.sliceDoc(t.to, r.to) : "";
    i = n.replaceSelection(s.state.toText(l + t.insert.sliceString(0, void 0, s.state.lineBreak) + h));
  } else {
    let l = n.changes(t), h = e && e.main.to <= l.newLength ? e.main : void 0;
    if (n.selection.ranges.length > 1 && s.inputState.composing >= 0 && t.to <= r.to && t.to >= r.to - 10) {
      let c = s.state.sliceDoc(t.from, t.to), a, f = e && or(s, e.main.head);
      if (f) {
        let p = t.insert.length - (t.to - t.from);
        a = { from: f.from, to: f.to - p };
      } else
        a = s.state.doc.lineAt(r.head);
      let u = r.to - t.to, d = r.to - r.from;
      i = n.changeByRange((p) => {
        if (p.from == r.from && p.to == r.to)
          return { changes: l, range: h || p.map(l) };
        let g = p.to - u, m = g - c.length;
        if (p.to - p.from != d || s.state.sliceDoc(m, g) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        p.to >= a.from && p.from <= a.to)
          return { range: p };
        let y = n.changes({ from: m, to: g, insert: t.insert }), v = p.to - r.to;
        return {
          changes: y,
          range: h ? S.range(Math.max(0, h.anchor + v), Math.max(0, h.head + v)) : p.map(y)
        };
      });
    } else
      i = {
        changes: l,
        selection: h && n.selection.replaceRange(h)
      };
  }
  let o = "input.type";
  return (s.composing || s.inputState.compositionPendingChange && s.inputState.compositionEndedAt > Date.now() - 50) && (s.inputState.compositionPendingChange = !1, o += ".compose", s.inputState.compositionFirstChange && (o += ".start", s.inputState.compositionFirstChange = !1)), n.update(i, { userEvent: o, scrollIntoView: !0 });
}
function Zo(s, t, e, i) {
  let n = Math.min(s.length, t.length), r = 0;
  for (; r < n && s.charCodeAt(r) == t.charCodeAt(r); )
    r++;
  if (r == n && s.length == t.length)
    return null;
  let o = s.length, l = t.length;
  for (; o > 0 && l > 0 && s.charCodeAt(o - 1) == t.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let h = Math.max(0, r - Math.min(o, l));
    e -= o + h - r;
  }
  if (o < r && s.length < t.length) {
    let h = e <= r && e >= o ? r - e : 0;
    r -= h, l = r + (l - o), o = r;
  } else if (l < r) {
    let h = e <= r && e >= l ? r - e : 0;
    r -= h, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function _o(s) {
  let t = [];
  if (s.root.activeElement != s.contentDOM)
    return t;
  let { anchorNode: e, anchorOffset: i, focusNode: n, focusOffset: r } = s.observer.selectionRange;
  return e && (t.push(new Mn(e, i)), (n != e || r != i) && t.push(new Mn(n, r))), t;
}
function tl(s, t) {
  if (s.length == 0)
    return null;
  let e = s[0].pos, i = s.length == 2 ? s[1].pos : e;
  return e > -1 && i > -1 ? S.single(e + t, i + t) : null;
}
class el {
  setSelectionOrigin(t) {
    this.lastSelectionOrigin = t, this.lastSelectionTime = Date.now();
  }
  constructor(t) {
    this.view = t, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = t.hasFocus, w.safari && t.contentDOM.addEventListener("input", () => null), w.gecko && yl(t.contentDOM.ownerDocument);
  }
  handleEvent(t) {
    !al(this.view, t) || this.ignoreDuringComposition(t) || t.type == "keydown" && this.keydown(t) || this.runHandlers(t.type, t);
  }
  runHandlers(t, e) {
    let i = this.handlers[t];
    if (i) {
      for (let n of i.observers)
        n(this.view, e);
      for (let n of i.handlers) {
        if (e.defaultPrevented)
          break;
        if (n(this.view, e)) {
          e.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(t) {
    let e = il(t), i = this.handlers, n = this.view.contentDOM;
    for (let r in e)
      if (r != "scroll") {
        let o = !e[r].handlers.length, l = i[r];
        l && o != !l.handlers.length && (n.removeEventListener(r, this.handleEvent), l = null), l || n.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in i)
      r != "scroll" && !e[r] && n.removeEventListener(r, this.handleEvent);
    this.handlers = e;
  }
  keydown(t) {
    if (this.lastKeyCode = t.keyCode, this.lastKeyTime = Date.now(), t.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && t.keyCode != 27 && cr.indexOf(t.keyCode) < 0 && (this.tabFocusMode = -1), w.android && w.chrome && !t.synthetic && (t.keyCode == 13 || t.keyCode == 8))
      return this.view.observer.delayAndroidKey(t.key, t.keyCode), !0;
    let e;
    return w.ios && !t.synthetic && !t.altKey && !t.metaKey && ((e = ar.find((i) => i.keyCode == t.keyCode)) && !t.ctrlKey || nl.indexOf(t.key) > -1 && t.ctrlKey && !t.shiftKey) ? (this.pendingIOSKey = e || t, setTimeout(() => this.flushIOSKey(), 250), !0) : (t.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(t) {
    let e = this.pendingIOSKey;
    return !e || e.key == "Enter" && t && t.from < t.to && /^\S+$/.test(t.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Lt(this.view.contentDOM, e.key, e.keyCode, e instanceof KeyboardEvent ? e : void 0));
  }
  ignoreDuringComposition(t) {
    return /^key/.test(t.type) ? this.composing > 0 ? !0 : w.safari && !w.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1 : !1;
  }
  startMouseSelection(t) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = t;
  }
  update(t) {
    this.view.observer.update(t), this.mouseSelection && this.mouseSelection.update(t), this.draggedContent && t.docChanged && (this.draggedContent = this.draggedContent.map(t.changes)), t.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function Tn(s, t) {
  return (e, i) => {
    try {
      return t.call(s, i, e);
    } catch (n) {
      st(e.state, n);
    }
  };
}
function il(s) {
  let t = /* @__PURE__ */ Object.create(null);
  function e(i) {
    return t[i] || (t[i] = { observers: [], handlers: [] });
  }
  for (let i of s) {
    let n = i.spec;
    if (n && n.domEventHandlers)
      for (let r in n.domEventHandlers) {
        let o = n.domEventHandlers[r];
        o && e(r).handlers.push(Tn(i.value, o));
      }
    if (n && n.domEventObservers)
      for (let r in n.domEventObservers) {
        let o = n.domEventObservers[r];
        o && e(r).observers.push(Tn(i.value, o));
      }
  }
  for (let i in _)
    e(i).handlers.push(_[i]);
  for (let i in U)
    e(i).observers.push(U[i]);
  return t;
}
const ar = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], nl = "dthko", cr = [16, 17, 18, 20, 91, 92, 224, 225], ve = 6;
function xe(s) {
  return Math.max(0, s) * 0.7 + 8;
}
function sl(s, t) {
  return Math.max(Math.abs(s.clientX - t.clientX), Math.abs(s.clientY - t.clientY));
}
class rl {
  constructor(t, e, i, n) {
    this.view = t, this.startEvent = e, this.style = i, this.mustSelect = n, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = e, this.scrollParents = fo(t.contentDOM), this.atoms = t.state.facet(Yi).map((o) => o(t));
    let r = t.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = e.shiftKey, this.multiple = t.state.facet(T.allowMultipleSelections) && ol(t, e), this.dragging = hl(t, e) && dr(e) == 1 ? null : !1;
  }
  start(t) {
    this.dragging === !1 && this.select(t);
  }
  move(t) {
    if (t.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && sl(this.startEvent, t) < 10)
      return;
    this.select(this.lastEvent = t);
    let e = 0, i = 0, n = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: n, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let h = rr(this.view);
    t.clientX - h.left <= n + ve ? e = -xe(n - t.clientX) : t.clientX + h.right >= o - ve && (e = xe(t.clientX - o)), t.clientY - h.top <= r + ve ? i = -xe(r - t.clientY) : t.clientY + h.bottom >= l - ve && (i = xe(t.clientY - l)), this.setScrollSpeed(e, i);
  }
  up(t) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || t.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let t = this.view.contentDOM.ownerDocument;
    t.removeEventListener("mousemove", this.move), t.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(t, e) {
    this.scrollSpeed = { x: t, y: e }, t || e ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: t, y: e } = this.scrollSpeed;
    t && this.scrollParents.x && (this.scrollParents.x.scrollLeft += t, t = 0), e && this.scrollParents.y && (this.scrollParents.y.scrollTop += e, e = 0), (t || e) && this.view.win.scrollBy(t, e), this.dragging === !1 && this.select(this.lastEvent);
  }
  skipAtoms(t) {
    let e = null;
    for (let i = 0; i < t.ranges.length; i++) {
      let n = t.ranges[i], r = null;
      if (n.empty) {
        let o = Re(this.atoms, n.from, 0);
        o != n.from && (r = S.cursor(o, -1));
      } else {
        let o = Re(this.atoms, n.from, -1), l = Re(this.atoms, n.to, 1);
        (o != n.from || l != n.to) && (r = S.range(n.from == n.anchor ? o : l, n.from == n.head ? o : l));
      }
      r && (e || (e = t.ranges.slice()), e[i] = r);
    }
    return e ? S.create(e, t.mainIndex) : t;
  }
  select(t) {
    let { view: e } = this, i = this.skipAtoms(this.style.get(t, this.extend, this.multiple));
    (this.mustSelect || !i.eq(e.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(t) {
    t.transactions.some((e) => e.isUserEvent("input.type")) ? this.destroy() : this.style.update(t) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function ol(s, t) {
  let e = s.state.facet(Xs);
  return e.length ? e[0](t) : w.mac ? t.metaKey : t.ctrlKey;
}
function ll(s, t) {
  let e = s.state.facet(Js);
  return e.length ? e[0](t) : w.mac ? !t.altKey : !t.ctrlKey;
}
function hl(s, t) {
  let { main: e } = s.state.selection;
  if (e.empty)
    return !1;
  let i = le(s.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let n = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < n.length; r++) {
    let o = n[r];
    if (o.left <= t.clientX && o.right >= t.clientX && o.top <= t.clientY && o.bottom >= t.clientY)
      return !0;
  }
  return !1;
}
function al(s, t) {
  if (!t.bubbles)
    return !0;
  if (t.defaultPrevented)
    return !1;
  for (let e = t.target, i; e != s.contentDOM; e = e.parentNode)
    if (!e || e.nodeType == 11 || (i = O.get(e)) && i.ignoreEvent(t))
      return !1;
  return !0;
}
const _ = /* @__PURE__ */ Object.create(null), U = /* @__PURE__ */ Object.create(null), fr = w.ie && w.ie_version < 15 || w.ios && w.webkit_version < 604;
function cl(s) {
  let t = s.dom.parentNode;
  if (!t)
    return;
  let e = t.appendChild(document.createElement("textarea"));
  e.style.cssText = "position: fixed; left: -10000px; top: 10px", e.focus(), setTimeout(() => {
    s.focus(), e.remove(), ur(s, e.value);
  }, 50);
}
function Ge(s, t, e) {
  for (let i of s.facet(t))
    e = i(e, s);
  return e;
}
function ur(s, t) {
  t = Ge(s.state, Xi, t);
  let { state: e } = s, i, n = 1, r = e.toText(t), o = r.lines == e.selection.ranges.length;
  if (Ri != null && e.selection.ranges.every((h) => h.empty) && Ri == r.toString()) {
    let h = -1;
    i = e.changeByRange((c) => {
      let a = e.doc.lineAt(c.from);
      if (a.from == h)
        return { range: c };
      h = a.from;
      let f = e.toText((o ? r.line(n++).text : t) + e.lineBreak);
      return {
        changes: { from: a.from, insert: f },
        range: S.cursor(c.from + f.length)
      };
    });
  } else o ? i = e.changeByRange((h) => {
    let c = r.line(n++);
    return {
      changes: { from: h.from, to: h.to, insert: c.text },
      range: S.cursor(h.from + c.length)
    };
  }) : i = e.replaceSelection(r);
  s.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
U.scroll = (s) => {
  s.inputState.lastScrollTop = s.scrollDOM.scrollTop, s.inputState.lastScrollLeft = s.scrollDOM.scrollLeft;
};
_.keydown = (s, t) => (s.inputState.setSelectionOrigin("select"), t.keyCode == 27 && s.inputState.tabFocusMode != 0 && (s.inputState.tabFocusMode = Date.now() + 2e3), !1);
U.touchstart = (s, t) => {
  s.inputState.lastTouchTime = Date.now(), s.inputState.setSelectionOrigin("select.pointer");
};
U.touchmove = (s) => {
  s.inputState.setSelectionOrigin("select.pointer");
};
_.mousedown = (s, t) => {
  if (s.observer.flush(), s.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let e = null;
  for (let i of s.state.facet(Gs))
    if (e = i(s, t), e)
      break;
  if (!e && t.button == 0 && (e = dl(s, t)), e) {
    let i = !s.hasFocus;
    s.inputState.startMouseSelection(new rl(s, t, e, i)), i && s.observer.ignore(() => {
      Ts(s.contentDOM);
      let r = s.root.activeElement;
      r && !r.contains(s.contentDOM) && r.blur();
    });
    let n = s.inputState.mouseSelection;
    if (n)
      return n.start(t), n.dragging === !1;
  }
  return !1;
};
function Dn(s, t, e, i) {
  if (i == 1)
    return S.cursor(t, e);
  if (i == 2)
    return Vo(s.state, t, e);
  {
    let n = N.find(s.docView, t), r = s.state.doc.lineAt(n ? n.posAtEnd : t), o = n ? n.posAtStart : r.from, l = n ? n.posAtEnd : r.to;
    return l < s.state.doc.length && l == r.to && l++, S.range(o, l);
  }
}
let On = (s, t, e) => t >= e.top && t <= e.bottom && s >= e.left && s <= e.right;
function fl(s, t, e, i) {
  let n = N.find(s.docView, t);
  if (!n)
    return 1;
  let r = t - n.posAtStart;
  if (r == 0)
    return 1;
  if (r == n.length)
    return -1;
  let o = n.coordsAt(r, -1);
  if (o && On(e, i, o))
    return -1;
  let l = n.coordsAt(r, 1);
  return l && On(e, i, l) ? 1 : o && o.bottom >= i ? -1 : 1;
}
function Pn(s, t) {
  let e = s.posAtCoords({ x: t.clientX, y: t.clientY }, !1);
  return { pos: e, bias: fl(s, e, t.clientX, t.clientY) };
}
const ul = w.ie && w.ie_version <= 11;
let Bn = null, En = 0, Rn = 0;
function dr(s) {
  if (!ul)
    return s.detail;
  let t = Bn, e = Rn;
  return Bn = s, Rn = Date.now(), En = !t || e > Date.now() - 400 && Math.abs(t.clientX - s.clientX) < 2 && Math.abs(t.clientY - s.clientY) < 2 ? (En + 1) % 3 : 1;
}
function dl(s, t) {
  let e = Pn(s, t), i = dr(t), n = s.state.selection;
  return {
    update(r) {
      r.docChanged && (e.pos = r.changes.mapPos(e.pos), n = n.map(r.changes));
    },
    get(r, o, l) {
      let h = Pn(s, r), c, a = Dn(s, h.pos, h.bias, i);
      if (e.pos != h.pos && !o) {
        let f = Dn(s, e.pos, e.bias, i), u = Math.min(f.from, a.from), d = Math.max(f.to, a.to);
        a = u < a.from ? S.range(u, d) : S.range(d, u);
      }
      return o ? n.replaceRange(n.main.extend(a.from, a.to)) : l && i == 1 && n.ranges.length > 1 && (c = pl(n, h.pos)) ? c : l ? n.addRange(a) : S.create([a]);
    }
  };
}
function pl(s, t) {
  for (let e = 0; e < s.ranges.length; e++) {
    let { from: i, to: n } = s.ranges[e];
    if (i <= t && n >= t)
      return S.create(s.ranges.slice(0, e).concat(s.ranges.slice(e + 1)), s.mainIndex == e ? 0 : s.mainIndex - (s.mainIndex > e ? 1 : 0));
  }
  return null;
}
_.dragstart = (s, t) => {
  let { selection: { main: e } } = s.state;
  if (t.target.draggable) {
    let n = s.docView.nearest(t.target);
    if (n && n.isWidget) {
      let r = n.posAtStart, o = r + n.length;
      (r >= e.to || o <= e.from) && (e = S.range(r, o));
    }
  }
  let { inputState: i } = s;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = e, t.dataTransfer && (t.dataTransfer.setData("Text", Ge(s.state, Ji, s.state.sliceDoc(e.from, e.to))), t.dataTransfer.effectAllowed = "copyMove"), !1;
};
_.dragend = (s) => (s.inputState.draggedContent = null, !1);
function Ln(s, t, e, i) {
  if (e = Ge(s.state, Xi, e), !e)
    return;
  let n = s.posAtCoords({ x: t.clientX, y: t.clientY }, !1), { draggedContent: r } = s.inputState, o = i && r && ll(s, t) ? { from: r.from, to: r.to } : null, l = { from: n, insert: e }, h = s.state.changes(o ? [o, l] : l);
  s.focus(), s.dispatch({
    changes: h,
    selection: { anchor: h.mapPos(n, -1), head: h.mapPos(n, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), s.inputState.draggedContent = null;
}
_.drop = (s, t) => {
  if (!t.dataTransfer)
    return !1;
  if (s.state.readOnly)
    return !0;
  let e = t.dataTransfer.files;
  if (e && e.length) {
    let i = Array(e.length), n = 0, r = () => {
      ++n == e.length && Ln(s, t, i.filter((o) => o != null).join(s.state.lineBreak), !1);
    };
    for (let o = 0; o < e.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
      }, l.readAsText(e[o]);
    }
    return !0;
  } else {
    let i = t.dataTransfer.getData("Text");
    if (i)
      return Ln(s, t, i, !0), !0;
  }
  return !1;
};
_.paste = (s, t) => {
  if (s.state.readOnly)
    return !0;
  s.observer.flush();
  let e = fr ? null : t.clipboardData;
  return e ? (ur(s, e.getData("text/plain") || e.getData("text/uri-list")), !0) : (cl(s), !1);
};
function gl(s, t) {
  let e = s.dom.parentNode;
  if (!e)
    return;
  let i = e.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = t, i.focus(), i.selectionEnd = t.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), s.focus();
  }, 50);
}
function ml(s) {
  let t = [], e = [], i = !1;
  for (let n of s.selection.ranges)
    n.empty || (t.push(s.sliceDoc(n.from, n.to)), e.push(n));
  if (!t.length) {
    let n = -1;
    for (let { from: r } of s.selection.ranges) {
      let o = s.doc.lineAt(r);
      o.number > n && (t.push(o.text), e.push({ from: o.from, to: Math.min(s.doc.length, o.to + 1) })), n = o.number;
    }
    i = !0;
  }
  return { text: Ge(s, Ji, t.join(s.lineBreak)), ranges: e, linewise: i };
}
let Ri = null;
_.copy = _.cut = (s, t) => {
  let { text: e, ranges: i, linewise: n } = ml(s.state);
  if (!e && !n)
    return !1;
  Ri = n ? e : null, t.type == "cut" && !s.state.readOnly && s.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = fr ? null : t.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", e), !0) : (gl(s, e), !1);
};
const pr = /* @__PURE__ */ Dt.define();
function gr(s, t) {
  let e = [];
  for (let i of s.facet(Qs)) {
    let n = i(s, t);
    n && e.push(n);
  }
  return e ? s.update({ effects: e, annotations: pr.of(!0) }) : null;
}
function mr(s) {
  setTimeout(() => {
    let t = s.hasFocus;
    if (t != s.inputState.notifiedFocused) {
      let e = gr(s.state, t);
      e ? s.dispatch(e) : s.update([]);
    }
  }, 10);
}
U.focus = (s) => {
  s.inputState.lastFocusTime = Date.now(), !s.scrollDOM.scrollTop && (s.inputState.lastScrollTop || s.inputState.lastScrollLeft) && (s.scrollDOM.scrollTop = s.inputState.lastScrollTop, s.scrollDOM.scrollLeft = s.inputState.lastScrollLeft), mr(s);
};
U.blur = (s) => {
  s.observer.clearSelectionRange(), mr(s);
};
U.compositionstart = U.compositionupdate = (s) => {
  s.observer.editContext || (s.inputState.compositionFirstChange == null && (s.inputState.compositionFirstChange = !0), s.inputState.composing < 0 && (s.inputState.composing = 0));
};
U.compositionend = (s) => {
  s.observer.editContext || (s.inputState.composing = -1, s.inputState.compositionEndedAt = Date.now(), s.inputState.compositionPendingKey = !0, s.inputState.compositionPendingChange = s.observer.pendingRecords().length > 0, s.inputState.compositionFirstChange = null, w.chrome && w.android ? s.observer.flushSoon() : s.inputState.compositionPendingChange ? Promise.resolve().then(() => s.observer.flush()) : setTimeout(() => {
    s.inputState.composing < 0 && s.docView.hasComposition && s.update([]);
  }, 50));
};
U.contextmenu = (s) => {
  s.inputState.lastContextMenu = Date.now();
};
_.beforeinput = (s, t) => {
  var e, i;
  if (t.inputType == "insertReplacementText" && s.observer.editContext) {
    let r = (e = t.dataTransfer) === null || e === void 0 ? void 0 : e.getData("text/plain"), o = t.getTargetRanges();
    if (r && o.length) {
      let l = o[0], h = s.posAtDOM(l.startContainer, l.startOffset), c = s.posAtDOM(l.endContainer, l.endOffset);
      return Ui(s, { from: h, to: c, insert: s.state.toText(r) }, null), !0;
    }
  }
  let n;
  if (w.chrome && w.android && (n = ar.find((r) => r.inputType == t.inputType)) && (s.observer.delayAndroidKey(n.key, n.keyCode), n.key == "Backspace" || n.key == "Delete")) {
    let r = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && s.hasFocus && (s.contentDOM.blur(), s.focus());
    }, 100);
  }
  return w.ios && t.inputType == "deleteContentForward" && s.observer.flushSoon(), w.safari && t.inputType == "insertText" && s.inputState.composing >= 0 && setTimeout(() => U.compositionend(s, t), 20), !1;
};
const In = /* @__PURE__ */ new Set();
function yl(s) {
  In.has(s) || (In.add(s), s.addEventListener("copy", () => {
  }), s.addEventListener("cut", () => {
  }));
}
const Nn = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let Wt = !1;
function Fn() {
  Wt = !1;
}
class bl {
  constructor(t) {
    this.lineWrapping = t, this.doc = M.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(t, e) {
    let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((e - t - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(t) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((t - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(t) {
    return this.doc = t, this;
  }
  mustRefreshForWrapping(t) {
    return Nn.indexOf(t) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(t) {
    let e = !1;
    for (let i = 0; i < t.length; i++) {
      let n = t[i];
      n < 0 ? i++ : this.heightSamples[Math.floor(n * 10)] || (e = !0, this.heightSamples[Math.floor(n * 10)] = !0);
    }
    return e;
  }
  refresh(t, e, i, n, r, o) {
    let l = Nn.indexOf(t) > -1, h = Math.round(e) != Math.round(this.lineHeight) || this.lineWrapping != l;
    if (this.lineWrapping = l, this.lineHeight = e, this.charWidth = i, this.textHeight = n, this.lineLength = r, h) {
      this.heightSamples = {};
      for (let c = 0; c < o.length; c++) {
        let a = o[c];
        a < 0 ? c++ : this.heightSamples[Math.floor(a * 10)] = !0;
      }
    }
    return h;
  }
}
class wl {
  constructor(t, e) {
    this.from = t, this.heights = e, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class it {
  /**
  @internal
  */
  constructor(t, e, i, n, r) {
    this.from = t, this.length = e, this.top = i, this.height = n, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? rt.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof mt ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(t) {
    let e = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(t._content) ? t._content : [t]);
    return new it(this.from, this.length + t.length, this.top, this.height + t.height, e);
  }
}
var B = /* @__PURE__ */ function(s) {
  return s[s.ByPos = 0] = "ByPos", s[s.ByHeight = 1] = "ByHeight", s[s.ByPosNoHeight = 2] = "ByPosNoHeight", s;
}(B || (B = {}));
const Le = 1e-3;
class q {
  constructor(t, e, i = 2) {
    this.length = t, this.height = e, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(t) {
    this.flags = (t ? 2 : 0) | this.flags & -3;
  }
  setHeight(t) {
    this.height != t && (Math.abs(this.height - t) > Le && (Wt = !0), this.height = t);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(t, e, i) {
    return q.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(t, e) {
    e.push(this);
  }
  decomposeRight(t, e) {
    e.push(this);
  }
  applyChanges(t, e, i, n) {
    let r = this, o = i.doc;
    for (let l = n.length - 1; l >= 0; l--) {
      let { fromA: h, toA: c, fromB: a, toB: f } = n[l], u = r.lineAt(h, B.ByPosNoHeight, i.setDoc(e), 0, 0), d = u.to >= c ? u : r.lineAt(c, B.ByPosNoHeight, i, 0, 0);
      for (f += d.to - c, c = d.to; l > 0 && u.from <= n[l - 1].toA; )
        h = n[l - 1].fromA, a = n[l - 1].fromB, l--, h < u.from && (u = r.lineAt(h, B.ByPosNoHeight, i, 0, 0));
      a += u.from - h, h = u.from;
      let p = Qi.build(i.setDoc(o), t, a, f);
      r = ze(r, r.replace(h, c, p));
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new J(0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(t) {
    if (t.length == 1)
      return t[0];
    let e = 0, i = t.length, n = 0, r = 0;
    for (; ; )
      if (e == i)
        if (n > r * 2) {
          let l = t[e - 1];
          l.break ? t.splice(--e, 1, l.left, null, l.right) : t.splice(--e, 1, l.left, l.right), i += 1 + l.break, n -= l.size;
        } else if (r > n * 2) {
          let l = t[i];
          l.break ? t.splice(i, 1, l.left, null, l.right) : t.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
        } else
          break;
      else if (n < r) {
        let l = t[e++];
        l && (n += l.size);
      } else {
        let l = t[--i];
        l && (r += l.size);
      }
    let o = 0;
    return t[e - 1] == null ? (o = 1, e--) : t[e] == null && (o = 1, i++), new Sl(q.of(t.slice(0, e)), o, q.of(t.slice(i)));
  }
}
function ze(s, t) {
  return s == t ? s : (s.constructor != t.constructor && (Wt = !0), t);
}
q.prototype.size = 1;
class yr extends q {
  constructor(t, e, i) {
    super(t, e), this.deco = i;
  }
  blockAt(t, e, i, n) {
    return new it(n, this.length, i, this.height, this.deco || 0);
  }
  lineAt(t, e, i, n, r) {
    return this.blockAt(0, i, n, r);
  }
  forEachLine(t, e, i, n, r, o) {
    t <= r + this.length && e >= r && o(this.blockAt(0, i, n, r));
  }
  updateHeight(t, e = 0, i = !1, n) {
    return n && n.from <= e && n.more && this.setHeight(n.heights[n.index++]), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class J extends yr {
  constructor(t, e) {
    super(t, e, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0;
  }
  blockAt(t, e, i, n) {
    return new it(n, this.length, i, this.height, this.breaks);
  }
  replace(t, e, i) {
    let n = i[0];
    return i.length == 1 && (n instanceof J || n instanceof H && n.flags & 4) && Math.abs(this.length - n.length) < 10 ? (n instanceof H ? n = new J(n.length, this.height) : n.height = this.height, this.outdated || (n.outdated = !1), n) : q.of(i);
  }
  updateHeight(t, e = 0, i = !1, n) {
    return n && n.from <= e && n.more ? this.setHeight(n.heights[n.index++]) : (i || this.outdated) && this.setHeight(Math.max(this.widgetHeight, t.heightForLine(this.length - this.collapsed)) + this.breaks * t.lineHeight), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class H extends q {
  constructor(t) {
    super(t, 0);
  }
  heightMetrics(t, e) {
    let i = t.doc.lineAt(e).number, n = t.doc.lineAt(e + this.length).number, r = n - i + 1, o, l = 0;
    if (t.lineWrapping) {
      let h = Math.min(this.height, t.lineHeight * r);
      o = h / r, this.length > r + 1 && (l = (this.height - h) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: n, perLine: o, perChar: l };
  }
  blockAt(t, e, i, n) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: h } = this.heightMetrics(e, n);
    if (e.lineWrapping) {
      let c = n + (t < e.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (t - i) / this.height)) * this.length)), a = e.doc.lineAt(c), f = l + a.length * h, u = Math.max(i, t - f / 2);
      return new it(a.from, a.length, u, f, 0);
    } else {
      let c = Math.max(0, Math.min(o - r, Math.floor((t - i) / l))), { from: a, length: f } = e.doc.line(r + c);
      return new it(a, f, i + l * c, l, 0);
    }
  }
  lineAt(t, e, i, n, r) {
    if (e == B.ByHeight)
      return this.blockAt(t, i, n, r);
    if (e == B.ByPosNoHeight) {
      let { from: d, to: p } = i.doc.lineAt(t);
      return new it(d, p - d, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: h } = this.heightMetrics(i, r), c = i.doc.lineAt(t), a = l + c.length * h, f = c.number - o, u = n + l * f + h * (c.from - r - f);
    return new it(c.from, c.length, Math.max(n, Math.min(u, n + this.height - a)), a, 0);
  }
  forEachLine(t, e, i, n, r, o) {
    t = Math.max(t, r), e = Math.min(e, r + this.length);
    let { firstLine: l, perLine: h, perChar: c } = this.heightMetrics(i, r);
    for (let a = t, f = n; a <= e; ) {
      let u = i.doc.lineAt(a);
      if (a == t) {
        let p = u.number - l;
        f += h * p + c * (t - r - p);
      }
      let d = h + c * u.length;
      o(new it(u.from, u.length, f, d, 0)), f += d, a = u.to + 1;
    }
  }
  replace(t, e, i) {
    let n = this.length - e;
    if (n > 0) {
      let r = i[i.length - 1];
      r instanceof H ? i[i.length - 1] = new H(r.length + n) : i.push(null, new H(n - 1));
    }
    if (t > 0) {
      let r = i[0];
      r instanceof H ? i[0] = new H(t + r.length) : i.unshift(new H(t - 1), null);
    }
    return q.of(i);
  }
  decomposeLeft(t, e) {
    e.push(new H(t - 1), null);
  }
  decomposeRight(t, e) {
    e.push(null, new H(this.length - t - 1));
  }
  updateHeight(t, e = 0, i = !1, n) {
    let r = e + this.length;
    if (n && n.from <= e + this.length && n.more) {
      let o = [], l = Math.max(e, n.from), h = -1;
      for (n.from > e && o.push(new H(n.from - e - 1).updateHeight(t, e)); l <= r && n.more; ) {
        let a = t.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = n.heights[n.index++];
        h == -1 ? h = f : Math.abs(f - h) >= Le && (h = -2);
        let u = new J(a, f);
        u.outdated = !1, o.push(u), l += a + 1;
      }
      l <= r && o.push(null, new H(r - l).updateHeight(t, l));
      let c = q.of(o);
      return (h < 0 || Math.abs(c.height - this.height) >= Le || Math.abs(h - this.heightMetrics(t, e).perLine) >= Le) && (Wt = !0), ze(this, c);
    } else (i || this.outdated) && (this.setHeight(t.heightForGap(e, e + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Sl extends q {
  constructor(t, e, i) {
    super(t.length + e + i.length, t.height + i.height, e | (t.outdated || i.outdated ? 2 : 0)), this.left = t, this.right = i, this.size = t.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(t, e, i, n) {
    let r = i + this.left.height;
    return t < r ? this.left.blockAt(t, e, i, n) : this.right.blockAt(t, e, r, n + this.left.length + this.break);
  }
  lineAt(t, e, i, n, r) {
    let o = n + this.left.height, l = r + this.left.length + this.break, h = e == B.ByHeight ? t < o : t < l, c = h ? this.left.lineAt(t, e, i, n, r) : this.right.lineAt(t, e, i, o, l);
    if (this.break || (h ? c.to < l : c.from > l))
      return c;
    let a = e == B.ByPosNoHeight ? B.ByPosNoHeight : B.ByPos;
    return h ? c.join(this.right.lineAt(l, a, i, o, l)) : this.left.lineAt(l, a, i, n, r).join(c);
  }
  forEachLine(t, e, i, n, r, o) {
    let l = n + this.left.height, h = r + this.left.length + this.break;
    if (this.break)
      t < h && this.left.forEachLine(t, e, i, n, r, o), e >= h && this.right.forEachLine(t, e, i, l, h, o);
    else {
      let c = this.lineAt(h, B.ByPos, i, n, r);
      t < c.from && this.left.forEachLine(t, c.from - 1, i, n, r, o), c.to >= t && c.from <= e && o(c), e > c.to && this.right.forEachLine(c.to + 1, e, i, l, h, o);
    }
  }
  replace(t, e, i) {
    let n = this.left.length + this.break;
    if (e < n)
      return this.balanced(this.left.replace(t, e, i), this.right);
    if (t > this.left.length)
      return this.balanced(this.left, this.right.replace(t - n, e - n, i));
    let r = [];
    t > 0 && this.decomposeLeft(t, r);
    let o = r.length;
    for (let l of i)
      r.push(l);
    if (t > 0 && Hn(r, o - 1), e < this.length) {
      let l = r.length;
      this.decomposeRight(e, r), Hn(r, l);
    }
    return q.of(r);
  }
  decomposeLeft(t, e) {
    let i = this.left.length;
    if (t <= i)
      return this.left.decomposeLeft(t, e);
    e.push(this.left), this.break && (i++, t >= i && e.push(null)), t > i && this.right.decomposeLeft(t - i, e);
  }
  decomposeRight(t, e) {
    let i = this.left.length, n = i + this.break;
    if (t >= n)
      return this.right.decomposeRight(t - n, e);
    t < i && this.left.decomposeRight(t, e), this.break && t < n && e.push(null), e.push(this.right);
  }
  balanced(t, e) {
    return t.size > 2 * e.size || e.size > 2 * t.size ? q.of(this.break ? [t, null, e] : [t, e]) : (this.left = ze(this.left, t), this.right = ze(this.right, e), this.setHeight(t.height + e.height), this.outdated = t.outdated || e.outdated, this.size = t.size + e.size, this.length = t.length + this.break + e.length, this);
  }
  updateHeight(t, e = 0, i = !1, n) {
    let { left: r, right: o } = this, l = e + r.length + this.break, h = null;
    return n && n.from <= e + r.length && n.more ? h = r = r.updateHeight(t, e, i, n) : r.updateHeight(t, e, i), n && n.from <= l + o.length && n.more ? h = o = o.updateHeight(t, l, i, n) : o.updateHeight(t, l, i), h ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Hn(s, t) {
  let e, i;
  s[t] == null && (e = s[t - 1]) instanceof H && (i = s[t + 1]) instanceof H && s.splice(t - 1, 3, new H(e.length + 1 + i.length));
}
const vl = 5;
class Qi {
  constructor(t, e) {
    this.pos = t, this.oracle = e, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = t;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(t, e) {
    if (this.lineStart > -1) {
      let i = Math.min(e, this.lineEnd), n = this.nodes[this.nodes.length - 1];
      n instanceof J ? n.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new J(i - this.pos, -1)), this.writtenTo = i, e > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = e;
  }
  point(t, e, i) {
    if (t < e || i.heightRelevant) {
      let n = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      n < 0 && (n = this.oracle.lineHeight);
      let o = e - t;
      i.block ? this.addBlock(new yr(o, n, i)) : (o || r || n >= vl) && this.addLineDeco(n, r, o);
    } else e > t && this.span(t, e);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = t, this.lineEnd = e, this.writtenTo < t && ((this.writtenTo < t - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, t - 1)), this.nodes.push(null)), this.pos > t && this.nodes.push(new J(this.pos - t, -1)), this.writtenTo = this.pos;
  }
  blankContent(t, e) {
    let i = new H(e - t);
    return this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let t = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (t instanceof J)
      return t;
    let e = new J(0, -1);
    return this.nodes.push(e), e;
  }
  addBlock(t) {
    this.enterLine();
    let e = t.deco;
    e && e.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(t), this.writtenTo = this.pos = this.pos + t.length, e && e.endSide > 0 && (this.covering = t);
  }
  addLineDeco(t, e, i) {
    let n = this.ensureLine();
    n.length += i, n.collapsed += i, n.widgetHeight = Math.max(n.widgetHeight, t), n.breaks += e, this.writtenTo = this.pos = this.pos + i;
  }
  finish(t) {
    let e = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(e instanceof J) && !this.isCovered ? this.nodes.push(new J(0, -1)) : (this.writtenTo < this.pos || e == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = t;
    for (let n of this.nodes)
      n instanceof J && n.updateHeight(this.oracle, i), i += n ? n.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(t, e, i, n) {
    let r = new Qi(i, t);
    return E.spans(e, i, n, r, 0), r.finish(i);
  }
}
function xl(s, t, e) {
  let i = new kl();
  return E.compare(s, t, e, i, 0), i.changes;
}
class kl {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(t, e, i, n) {
    (t < e || i && i.heightRelevant || n && n.heightRelevant) && Mi(t, e, this.changes, 5);
  }
}
function Cl(s, t) {
  let e = s.getBoundingClientRect(), i = s.ownerDocument, n = i.defaultView || window, r = Math.max(0, e.left), o = Math.min(n.innerWidth, e.right), l = Math.max(0, e.top), h = Math.min(n.innerHeight, e.bottom);
  for (let c = s.parentNode; c && c != i.body; )
    if (c.nodeType == 1) {
      let a = c, f = window.getComputedStyle(a);
      if ((a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth) && f.overflow != "visible") {
        let u = a.getBoundingClientRect();
        r = Math.max(r, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), h = Math.min(c == s.parentNode ? n.innerHeight : h, u.bottom);
      }
      c = f.position == "absolute" || f.position == "fixed" ? a.offsetParent : a.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
  return {
    left: r - e.left,
    right: Math.max(r, o) - e.left,
    top: l - (e.top + t),
    bottom: Math.max(l, h) - (e.top + t)
  };
}
function Al(s, t) {
  let e = s.getBoundingClientRect();
  return {
    left: 0,
    right: e.right - e.left,
    top: t,
    bottom: e.bottom - (e.top + t)
  };
}
class ei {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.size = i;
  }
  static same(t, e) {
    if (t.length != e.length)
      return !1;
    for (let i = 0; i < t.length; i++) {
      let n = t[i], r = e[i];
      if (n.from != r.from || n.to != r.to || n.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(t, e) {
    return P.replace({
      widget: new Ml(this.size * (e ? t.scaleY : t.scaleX), e)
    }).range(this.from, this.to);
  }
}
class Ml extends ue {
  constructor(t, e) {
    super(), this.size = t, this.vertical = e;
  }
  eq(t) {
    return t.size == this.size && t.vertical == this.vertical;
  }
  toDOM() {
    let t = document.createElement("div");
    return this.vertical ? t.style.height = this.size + "px" : (t.style.width = this.size + "px", t.style.height = "2px", t.style.display = "inline-block"), t;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class Vn {
  constructor(t) {
    this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = !1, this.scaleX = 1, this.scaleY = 1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Wn, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = W.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let e = t.facet(Gi).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
    this.heightOracle = new bl(e), this.stateDeco = t.facet(he).filter((i) => typeof i != "function"), this.heightMap = q.empty().applyChanges(this.stateDeco, M.empty, this.heightOracle.setDoc(t.doc), [new Y(0, 0, 0, t.doc.length)]);
    for (let i = 0; i < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); i++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = P.set(this.lineGaps.map((i) => i.draw(this, !1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let t = [this.viewport], { main: e } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let n = i ? e.head : e.anchor;
      if (!t.some(({ from: r, to: o }) => n >= r && n <= o)) {
        let { from: r, to: o } = this.lineBlockAt(n);
        t.push(new ke(r, o));
      }
    }
    return this.viewports = t.sort((i, n) => i.from - n.from), this.updateScaler();
  }
  updateScaler() {
    let t = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Wn : new Zi(this.heightOracle, this.heightMap, this.viewports), t.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (t) => {
      this.viewportLines.push(Zt(t, this.scaler));
    });
  }
  update(t, e = null) {
    this.state = t.state;
    let i = this.stateDeco;
    this.stateDeco = this.state.facet(he).filter((a) => typeof a != "function");
    let n = t.changedRanges, r = Y.extendWithRanges(n, xl(i, this.stateDeco, t ? t.changes : F.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
    Fn(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, t.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || Wt) && (t.flags |= 2), l ? (this.scrollAnchorPos = t.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = this.heightMap.height);
    let h = r.length ? this.mapViewport(this.viewport, t.changes) : this.viewport;
    (e && (e.range.head < h.from || e.range.head > h.to) || !this.viewportIsAppropriate(h)) && (h = this.getViewport(0, e));
    let c = h.from != this.viewport.from || h.to != this.viewport.to;
    this.viewport = h, t.flags |= this.updateForViewport(), (c || !t.changes.empty || t.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, t.changes))), t.flags |= this.computeVisibleRanges(), e && (this.scrollTarget = e), !this.mustEnforceCursorAssoc && t.selectionSet && t.view.lineWrapping && t.state.selection.main.empty && t.state.selection.main.assoc && !t.state.facet(Po) && (this.mustEnforceCursorAssoc = !0);
  }
  measure(t) {
    let e = t.contentDOM, i = window.getComputedStyle(e), n = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? W.RTL : W.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r), l = e.getBoundingClientRect(), h = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let c = 0, a = 0;
    if (l.width && l.height) {
      let { scaleX: x, scaleY: R } = Ms(e, l);
      (x > 5e-3 && Math.abs(this.scaleX - x) > 5e-3 || R > 5e-3 && Math.abs(this.scaleY - R) > 5e-3) && (this.scaleX = x, this.scaleY = R, c |= 8, o = h = !0);
    }
    let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, c |= 10), this.editorWidth != t.scrollDOM.clientWidth && (n.lineWrapping && (h = !0), this.editorWidth = t.scrollDOM.clientWidth, c |= 8);
    let d = t.scrollDOM.scrollTop * this.scaleY;
    this.scrollTop != d && (this.scrollAnchorHeight = -1, this.scrollTop = d), this.scrolledToBottom = Os(t.scrollDOM);
    let p = (this.printing ? Al : Cl)(e, this.paddingTop), g = p.top - this.pixelViewport.top, m = p.bottom - this.pixelViewport.bottom;
    this.pixelViewport = p;
    let y = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (y != this.inView && (this.inView = y, y && (h = !0)), !this.inView && !this.scrollTarget)
      return 0;
    let v = l.width;
    if ((this.contentDOMWidth != v || this.editorHeight != t.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = t.scrollDOM.clientHeight, c |= 8), h) {
      let x = t.docView.measureVisibleLineHeights(this.viewport);
      if (n.mustRefreshForHeights(x) && (o = !0), o || n.lineWrapping && Math.abs(v - this.contentDOMWidth) > n.charWidth) {
        let { lineHeight: R, charWidth: G, textHeight: Lr } = t.docView.measureTextSize();
        o = R > 0 && n.refresh(r, R, G, Lr, v / G, x), o && (t.docView.minWidth = 0, c |= 8);
      }
      g > 0 && m > 0 ? a = Math.max(g, m) : g < 0 && m < 0 && (a = Math.min(g, m)), Fn();
      for (let R of this.viewports) {
        let G = R.from == this.viewport.from ? x : t.docView.measureVisibleLineHeights(R);
        this.heightMap = (o ? q.empty().applyChanges(this.stateDeco, M.empty, this.heightOracle, [new Y(0, 0, 0, t.state.doc.length)]) : this.heightMap).updateHeight(n, 0, o, new wl(R.from, G));
      }
      Wt && (c |= 2);
    }
    let A = !this.viewportIsAppropriate(this.viewport, a) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return A && (c & 2 && (c |= this.updateScaler()), this.viewport = this.getViewport(a, this.scrollTarget), c |= this.updateForViewport()), (c & 2 || A) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, t)), c |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, t.docView.enforceCursorAssoc()), c;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(t, e) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)), n = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, h = new ke(n.lineAt(o - i * 1e3, B.ByHeight, r, 0, 0).from, n.lineAt(l + (1 - i) * 1e3, B.ByHeight, r, 0, 0).to);
    if (e) {
      let { head: c } = e.range;
      if (c < h.from || c > h.to) {
        let a = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = n.lineAt(c, B.ByPos, r, 0, 0), u;
        e.y == "center" ? u = (f.top + f.bottom) / 2 - a / 2 : e.y == "start" || e.y == "nearest" && c < h.from ? u = f.top : u = f.bottom - a, h = new ke(n.lineAt(u - 1e3 / 2, B.ByHeight, r, 0, 0).from, n.lineAt(u + a + 1e3 / 2, B.ByHeight, r, 0, 0).to);
      }
    }
    return h;
  }
  mapViewport(t, e) {
    let i = e.mapPos(t.from, -1), n = e.mapPos(t.to, 1);
    return new ke(this.heightMap.lineAt(i, B.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(n, B.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: t, to: e }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: n } = this.heightMap.lineAt(t, B.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(e, B.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (t == 0 || n <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (e == this.state.doc.length || r >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && n > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(t, e) {
    if (!t.length || e.empty)
      return t;
    let i = [];
    for (let n of t)
      e.touchesRange(n.from, n.to) || i.push(new ei(e.mapPos(n.from), e.mapPos(n.to), n.size));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(t, e) {
    let i = this.heightOracle.lineWrapping, n = i ? 1e4 : 2e3, r = n >> 1, o = n << 1;
    if (this.defaultTextDirection != W.LTR && !i)
      return [];
    let l = [], h = (a, f, u, d) => {
      if (f - a < r)
        return;
      let p = this.state.selection.main, g = [p.from];
      p.empty || g.push(p.to);
      for (let y of g)
        if (y > a && y < f) {
          h(a, y - 10, u, d), h(y + 10, f, u, d);
          return;
        }
      let m = Dl(t, (y) => y.from >= u.from && y.to <= u.to && Math.abs(y.from - a) < r && Math.abs(y.to - f) < r && !g.some((v) => y.from < v && y.to > v));
      if (!m) {
        if (f < u.to && e && i && e.visibleRanges.some((y) => y.from <= f && y.to >= f)) {
          let y = e.moveToLineBoundary(S.cursor(f), !1, !0).head;
          y > a && (f = y);
        }
        m = new ei(a, f, this.gapSize(u, a, f, d));
      }
      l.push(m);
    }, c = (a) => {
      if (a.length < o || a.type != rt.Text)
        return;
      let f = Tl(a.from, a.to, this.stateDeco);
      if (f.total < o)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, p;
      if (i) {
        let g = n / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, y;
        if (u != null) {
          let v = Ae(f, u), A = ((this.visibleBottom - this.visibleTop) / 2 + g) / a.height;
          m = v - A, y = v + A;
        } else
          m = (this.visibleTop - a.top - g) / a.height, y = (this.visibleBottom - a.top + g) / a.height;
        d = Ce(f, m), p = Ce(f, y);
      } else {
        let g = f.total * this.heightOracle.charWidth, m = n * this.heightOracle.charWidth, y, v;
        if (u != null) {
          let A = Ae(f, u), x = ((this.pixelViewport.right - this.pixelViewport.left) / 2 + m) / g;
          y = A - x, v = A + x;
        } else
          y = (this.pixelViewport.left - m) / g, v = (this.pixelViewport.right + m) / g;
        d = Ce(f, y), p = Ce(f, v);
      }
      d > a.from && h(a.from, d, a, f), p < a.to && h(p, a.to, a, f);
    };
    for (let a of this.viewportLines)
      Array.isArray(a.type) ? a.type.forEach(c) : c(a);
    return l;
  }
  gapSize(t, e, i, n) {
    let r = Ae(n, i) - Ae(n, e);
    return this.heightOracle.lineWrapping ? t.height * r : n.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(t) {
    ei.same(t, this.lineGaps) || (this.lineGaps = t, this.lineGapDeco = P.set(t.map((e) => e.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges() {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let e = [];
    E.spans(t, this.viewport.from, this.viewport.to, {
      span(n, r) {
        e.push({ from: n, to: r });
      },
      point() {
      }
    }, 20);
    let i = e.length != this.visibleRanges.length || this.visibleRanges.some((n, r) => n.from != e[r].from || n.to != e[r].to);
    return this.visibleRanges = e, i ? 4 : 0;
  }
  lineBlockAt(t) {
    return t >= this.viewport.from && t <= this.viewport.to && this.viewportLines.find((e) => e.from <= t && e.to >= t) || Zt(this.heightMap.lineAt(t, B.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(t) {
    return t >= this.viewportLines[0].top && t <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((e) => e.top <= t && e.bottom >= t) || Zt(this.heightMap.lineAt(this.scaler.fromDOM(t), B.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  scrollAnchorAt(t) {
    let e = this.lineBlockAtHeight(t + 8);
    return e.from >= this.viewport.from || this.viewportLines[0].top - t > 200 ? e : this.viewportLines[0];
  }
  elementAtHeight(t) {
    return Zt(this.heightMap.blockAt(this.scaler.fromDOM(t), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class ke {
  constructor(t, e) {
    this.from = t, this.to = e;
  }
}
function Tl(s, t, e) {
  let i = [], n = s, r = 0;
  return E.spans(e, s, t, {
    span() {
    },
    point(o, l) {
      o > n && (i.push({ from: n, to: o }), r += o - n), n = l;
    }
  }, 20), n < t && (i.push({ from: n, to: t }), r += t - n), { total: r, ranges: i };
}
function Ce({ total: s, ranges: t }, e) {
  if (e <= 0)
    return t[0].from;
  if (e >= 1)
    return t[t.length - 1].to;
  let i = Math.floor(s * e);
  for (let n = 0; ; n++) {
    let { from: r, to: o } = t[n], l = o - r;
    if (i <= l)
      return r + i;
    i -= l;
  }
}
function Ae(s, t) {
  let e = 0;
  for (let { from: i, to: n } of s.ranges) {
    if (t <= n) {
      e += t - i;
      break;
    }
    e += n - i;
  }
  return e / s.total;
}
function Dl(s, t) {
  for (let e of s)
    if (t(e))
      return e;
}
const Wn = {
  toDOM(s) {
    return s;
  },
  fromDOM(s) {
    return s;
  },
  scale: 1,
  eq(s) {
    return s == this;
  }
};
class Zi {
  constructor(t, e, i) {
    let n = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: l, to: h }) => {
      let c = e.lineAt(l, B.ByPos, t, 0, 0).top, a = e.lineAt(h, B.ByPos, t, 0, 0).bottom;
      return n += a - c, { from: l, to: h, top: c, bottom: a, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - n) / (e.height - n);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(t) {
    for (let e = 0, i = 0, n = 0; ; e++) {
      let r = e < this.viewports.length ? this.viewports[e] : null;
      if (!r || t < r.top)
        return n + (t - i) * this.scale;
      if (t <= r.bottom)
        return r.domTop + (t - r.top);
      i = r.bottom, n = r.domBottom;
    }
  }
  fromDOM(t) {
    for (let e = 0, i = 0, n = 0; ; e++) {
      let r = e < this.viewports.length ? this.viewports[e] : null;
      if (!r || t < r.domTop)
        return i + (t - n) / this.scale;
      if (t <= r.domBottom)
        return r.top + (t - r.domTop);
      i = r.bottom, n = r.domBottom;
    }
  }
  eq(t) {
    return t instanceof Zi ? this.scale == t.scale && this.viewports.length == t.viewports.length && this.viewports.every((e, i) => e.from == t.viewports[i].from && e.to == t.viewports[i].to) : !1;
  }
}
function Zt(s, t) {
  if (t.scale == 1)
    return s;
  let e = t.toDOM(s.top), i = t.toDOM(s.bottom);
  return new it(s.from, s.length, e, i - e, Array.isArray(s._content) ? s._content.map((n) => Zt(n, t)) : s._content);
}
const Me = /* @__PURE__ */ k.define({ combine: (s) => s.join(" ") }), Li = /* @__PURE__ */ k.define({ combine: (s) => s.indexOf(!0) > -1 }), Ii = /* @__PURE__ */ gt.newName(), br = /* @__PURE__ */ gt.newName(), wr = /* @__PURE__ */ gt.newName(), Sr = { "&light": "." + br, "&dark": "." + wr };
function Ni(s, t, e) {
  return new gt(t, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (n) => {
        if (n == "&")
          return s;
        if (!e || !e[n])
          throw new RangeError(`Unsupported selector: ${n}`);
        return e[n];
      }) : s + " " + i;
    }
  });
}
const Ol = /* @__PURE__ */ Ni("." + Ii, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // https://github.com/codemirror/dev/issues/456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#444"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    insetInlineStart: 0,
    zIndex: 200
  },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    borderRight: "1px solid #ddd"
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top"
  },
  ".cm-highlightSpace:before": {
    content: "attr(data-display)",
    position: "absolute",
    pointerEvents: "none",
    color: "#888"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, Sr), Pl = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, ii = w.ie && w.ie_version <= 11;
class Bl {
  constructor(t) {
    this.view = t, this.active = !1, this.editContext = null, this.selectionRange = new uo(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = t.contentDOM, this.observer = new MutationObserver((e) => {
      for (let i of e)
        this.queue.push(i);
      (w.ie && w.ie_version <= 11 || w.ios && t.composing) && e.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && t.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(w.chrome && w.chrome_version < 126) && (this.editContext = new Rl(t), t.state.facet(ft) && (t.contentDOM.editContext = this.editContext.editContext)), ii && (this.onCharData = (e) => {
      this.queue.push({
        target: e.target,
        type: "characterData",
        oldValue: e.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var e;
      ((e = this.view.docView) === null || e === void 0 ? void 0 : e.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(t.scrollDOM)), this.addWindowListeners(this.win = t.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((e) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), e.length > 0 && e[e.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((e) => {
      e.length > 0 && e[e.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(t) {
    this.view.inputState.runHandlers("scroll", t), this.intersecting && this.view.measure();
  }
  onScroll(t) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(t);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(t) {
    (t.type == "change" || !t.type) && !t.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(t) {
    if (this.gapIntersection && (t.length != this.gaps.length || this.gaps.some((e, i) => e != t[i]))) {
      this.gapIntersection.disconnect();
      for (let e of t)
        this.gapIntersection.observe(e);
      this.gaps = t;
    }
  }
  onSelectionChange(t) {
    let e = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, n = this.selectionRange;
    if (i.state.facet(ft) ? i.root.activeElement != this.dom : !Ee(i.dom, n))
      return;
    let r = n.anchorNode && i.docView.nearest(n.anchorNode);
    if (r && r.ignoreEvent(t)) {
      e || (this.selectionChanged = !1);
      return;
    }
    (w.ie && w.ie_version <= 11 || w.android && w.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    n.focusNode && ee(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: t } = this, e = le(t.root);
    if (!e)
      return !1;
    let i = w.safari && t.root.nodeType == 11 && ho(this.dom.ownerDocument) == this.dom && El(this.view, e) || e;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let n = Ee(this.dom, i);
    return n && !this.selectionChanged && t.inputState.lastFocusTime > Date.now() - 200 && t.inputState.lastTouchTime < Date.now() - 300 && go(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, t.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), n && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(t, e) {
    this.selectionRange.set(t.node, t.offset, e.node, e.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let t = 0, e = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !e && t < this.scrollTargets.length && this.scrollTargets[t] == i ? t++ : e || (e = this.scrollTargets.slice(0, t)), e && e.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (t < this.scrollTargets.length && !e && (e = this.scrollTargets.slice(0, t)), e) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = e)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(t) {
    if (!this.active)
      return t();
    try {
      return this.stop(), t();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, Pl), ii && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), ii && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(t, e) {
    var i;
    if (!this.delayedAndroidKey) {
      let n = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Lt(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(n);
    }
    (!this.delayedAndroidKey || t == "Enter") && (this.delayedAndroidKey = {
      key: t,
      keyCode: e,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let t of this.observer.takeRecords())
      this.queue.push(t);
    return this.queue;
  }
  processRecords() {
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let e = -1, i = -1, n = !1;
    for (let r of t) {
      let o = this.readMutation(r);
      o && (o.typeOver && (n = !0), e == -1 ? { from: e, to: i } = o : (e = Math.min(o.from, e), i = Math.max(o.to, i)));
    }
    return { from: e, to: i, typeOver: n };
  }
  readChange() {
    let { from: t, to: e, typeOver: i } = this.processRecords(), n = this.selectionChanged && Ee(this.dom, this.selectionRange);
    if (t < 0 && !n)
      return null;
    t > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Uo(this.view, t, e, i);
    return this.view.docView.domChanged = { newSel: r.newSel ? r.newSel.main : null }, r;
  }
  // Apply pending changes, if any
  flush(t = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    t && this.readSelectionRange();
    let e = this.readChange();
    if (!e)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, n = hr(this.view, e);
    return this.view.state == i && (e.domChanged || e.newSel && !e.newSel.main.eq(this.view.state.selection.main)) && this.view.update([]), n;
  }
  readMutation(t) {
    let e = this.view.docView.nearest(t.target);
    if (!e || e.ignoreMutation(t))
      return null;
    if (e.markDirty(t.type == "attributes"), t.type == "attributes" && (e.flags |= 4), t.type == "childList") {
      let i = zn(e, t.previousSibling || t.target.previousSibling, -1), n = zn(e, t.nextSibling || t.target.nextSibling, 1);
      return {
        from: i ? e.posAfter(i) : e.posAtStart,
        to: n ? e.posBefore(n) : e.posAtEnd,
        typeOver: !1
      };
    } else return t.type == "characterData" ? { from: e.posAtStart, to: e.posAtEnd, typeOver: t.target.nodeValue == t.oldValue } : null;
  }
  setWindow(t) {
    t != this.win && (this.removeWindowListeners(this.win), this.win = t, this.addWindowListeners(this.win));
  }
  addWindowListeners(t) {
    t.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : t.addEventListener("beforeprint", this.onPrint), t.addEventListener("scroll", this.onScroll), t.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(t) {
    t.removeEventListener("scroll", this.onScroll), t.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : t.removeEventListener("beforeprint", this.onPrint), t.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(t) {
    this.editContext && (this.editContext.update(t), t.startState.facet(ft) != t.state.facet(ft) && (t.view.contentDOM.editContext = t.state.facet(ft) ? this.editContext.editContext : null));
  }
  destroy() {
    var t, e, i;
    this.stop(), (t = this.intersection) === null || t === void 0 || t.disconnect(), (e = this.gapIntersection) === null || e === void 0 || e.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let n of this.scrollTargets)
      n.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function zn(s, t, e) {
  for (; t; ) {
    let i = O.get(t);
    if (i && i.parent == s)
      return i;
    let n = t.parentNode;
    t = n != s.dom ? n : e > 0 ? t.nextSibling : t.previousSibling;
  }
  return null;
}
function $n(s, t) {
  let e = t.startContainer, i = t.startOffset, n = t.endContainer, r = t.endOffset, o = s.docView.domAtPos(s.state.selection.main.anchor);
  return ee(o.node, o.offset, n, r) && ([e, i, n, r] = [n, r, e, i]), { anchorNode: e, anchorOffset: i, focusNode: n, focusOffset: r };
}
function El(s, t) {
  if (t.getComposedRanges) {
    let n = t.getComposedRanges(s.root)[0];
    if (n)
      return $n(s, n);
  }
  let e = null;
  function i(n) {
    n.preventDefault(), n.stopImmediatePropagation(), e = n.getTargetRanges()[0];
  }
  return s.contentDOM.addEventListener("beforeinput", i, !0), s.dom.ownerDocument.execCommand("indent"), s.contentDOM.removeEventListener("beforeinput", i, !0), e ? $n(s, e) : null;
}
class Rl {
  constructor(t) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.resetRange(t.state);
    let e = this.editContext = new window.EditContext({
      text: t.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, t.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(t.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let { anchor: n } = t.state.selection.main, r = {
        from: this.toEditorPos(i.updateRangeStart),
        to: this.toEditorPos(i.updateRangeEnd),
        insert: M.of(i.text.split(`
`))
      };
      r.from == this.from && n < this.from ? r.from = n : r.to == this.to && n > this.to && (r.to = n), !(r.from == r.to && !r.insert.length) && (this.pendingContextChange = r, t.state.readOnly || Ui(t, r, S.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd))), this.pendingContextChange && (this.revertPending(t.state), this.setSelection(t.state)));
    }, this.handlers.characterboundsupdate = (i) => {
      let n = [], r = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let h = t.coordsForChar(o);
        r = h && new DOMRect(h.left, h.top, h.right - h.left, h.bottom - h.top) || r || new DOMRect(), n.push(r);
      }
      e.updateCharacterBounds(i.rangeStart, n);
    }, this.handlers.textformatupdate = (i) => {
      let n = [];
      for (let r of i.getTextFormats()) {
        let o = r.underlineStyle, l = r.underlineThickness;
        if (o != "None" && l != "None") {
          let h = `text-decoration: underline ${o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${l == "Thin" ? 1 : 2}px`;
          n.push(P.mark({ attributes: { style: h } }).range(this.toEditorPos(r.rangeStart), this.toEditorPos(r.rangeEnd)));
        }
      }
      t.dispatch({ effects: tr.of(P.set(n)) });
    }, this.handlers.compositionstart = () => {
      t.inputState.composing < 0 && (t.inputState.composing = 0, t.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      t.inputState.composing = -1, t.inputState.compositionFirstChange = null;
    };
    for (let i in this.handlers)
      e.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let n = le(i.root);
      n && n.rangeCount && this.editContext.updateSelectionBounds(n.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(t) {
    let e = 0, i = !1, n = this.pendingContextChange;
    return t.changes.iterChanges((r, o, l, h, c) => {
      if (i)
        return;
      let a = c.length - (o - r);
      if (n && o >= n.to)
        if (n.from == r && n.to == o && n.insert.eq(c)) {
          n = this.pendingContextChange = null, e += a, this.to += a;
          return;
        } else
          n = null, this.revertPending(t.state);
      if (r += e, o += e, o <= this.from)
        this.from += a, this.to += a;
      else if (r < this.to) {
        if (r < this.from || o > this.to || this.to - this.from + c.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), c.toString()), this.to += a;
      }
      e += a;
    }), n && !i && this.revertPending(t.state), !i;
  }
  update(t) {
    let e = this.pendingContextChange;
    !this.applyEdits(t) || !this.rangeIsValid(t.state) ? (this.pendingContextChange = null, this.resetRange(t.state), this.editContext.updateText(0, this.editContext.text.length, t.state.doc.sliceString(this.from, this.to)), this.setSelection(t.state)) : (t.docChanged || t.selectionSet || e) && this.setSelection(t.state), (t.geometryChanged || t.docChanged || t.selectionSet) && t.view.requestMeasure(this.measureReq);
  }
  resetRange(t) {
    let { head: e } = t.selection.main;
    this.from = Math.max(
      0,
      e - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      t.doc.length,
      e + 1e4
      /* CxVp.Margin */
    );
  }
  revertPending(t) {
    let e = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(e.from), this.toContextPos(e.from + e.insert.length), t.doc.sliceString(e.from, e.to));
  }
  setSelection(t) {
    let { main: e } = t.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, e.anchor))), n = this.toContextPos(e.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != n) && this.editContext.updateSelection(i, n);
  }
  rangeIsValid(t) {
    let { head: e } = t.selection.main;
    return !(this.from > 0 && e - this.from < 500 || this.to < t.doc.length && this.to - e < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(t) {
    return t + this.from;
  }
  toContextPos(t) {
    return t - this.from;
  }
  destroy() {
    for (let t in this.handlers)
      this.editContext.removeEventListener(t, this.handlers[t]);
  }
}
class C {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(t = {}) {
    var e;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), t.parent && t.parent.appendChild(this.dom);
    let { dispatch: i } = t;
    this.dispatchTransactions = t.dispatchTransactions || i && ((n) => n.forEach((r) => i(r, this))) || ((n) => this.update(n)), this.dispatch = this.dispatch.bind(this), this._root = t.root || po(t.parent) || document, this.viewState = new Vn(t.state || T.create(t)), t.scrollTo && t.scrollTo.is(Se) && (this.viewState.scrollTarget = t.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Yt).map((n) => new Ze(n));
    for (let n of this.plugins)
      n.update(this);
    this.observer = new Bl(this), this.inputState = new el(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Sn(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((e = document.fonts) === null || e === void 0) && e.ready && document.fonts.ready.then(() => this.requestMeasure());
  }
  dispatch(...t) {
    let e = t.length == 1 && t[0] instanceof V ? t : t.length == 1 && Array.isArray(t[0]) ? t[0] : [this.state.update(...t)];
    this.dispatchTransactions(e, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let e = !1, i = !1, n, r = this.state;
    for (let u of t) {
      if (u.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, h = null;
    t.some((u) => u.annotation(pr)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, h = gr(r, o), h || (l = 1));
    let c = this.observer.delayedAndroidKey, a = null;
    if (c ? (this.observer.clearDelayedAndroidKey(), a = this.observer.readChange(), (a && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (a = null)) : this.observer.clear(), r.facet(T.phrases) != this.state.facet(T.phrases))
      return this.setState(r);
    n = We.create(this, r, t), n.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of t) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: d } = u.state.selection;
          f = new It(d.empty ? d : S.cursor(d.head, d.head > d.anchor ? -1 : 1));
        }
        for (let d of u.effects)
          d.is(Se) && (f = d.value.clip(this.state));
      }
      this.viewState.update(n, f), this.bidiCache = $e.update(this.bidiCache, n.changes), n.empty || (this.updatePlugins(n), this.inputState.update(n)), e = this.docView.update(n), this.state.facet(Ut) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(e, t.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (n.startState.facet(Me) != n.state.facet(Me) && (this.viewState.mustMeasureContent = !0), (e || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), e && this.docViewUpdate(), !n.empty)
      for (let u of this.state.facet(Bi))
        try {
          u(n);
        } catch (d) {
          st(this.state, d, "update listener");
        }
    (h || a) && Promise.resolve().then(() => {
      h && this.state == h.startState && this.dispatch(h), a && !hr(this, a) && c.force && Lt(this.contentDOM, c.key, c.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = t;
      return;
    }
    this.updateState = 2;
    let e = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new Vn(t), this.plugins = t.facet(Yt).map((i) => new Ze(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new Sn(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    e && this.focus(), this.requestMeasure();
  }
  updatePlugins(t) {
    let e = t.startState.facet(Yt), i = t.state.facet(Yt);
    if (e != i) {
      let n = [];
      for (let r of i) {
        let o = e.indexOf(r);
        if (o < 0)
          n.push(new Ze(r));
        else {
          let l = this.plugins[o];
          l.mustUpdate = t, n.push(l);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != t && r.destroy(this);
      this.plugins = n, this.pluginMap.clear();
    } else
      for (let n of this.plugins)
        n.mustUpdate = t;
    for (let n = 0; n < this.plugins.length; n++)
      this.plugins[n].update(this);
    e != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let t of this.plugins) {
      let e = t.value;
      if (e && e.docViewUpdate)
        try {
          e.docViewUpdate(this);
        } catch (i) {
          st(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(t = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, t && this.observer.forceFlush();
    let e = null, i = this.scrollDOM, n = i.scrollTop * this.scaleY, { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(n - this.viewState.scrollTop) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (Os(i))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(n);
            r = d.from, o = d.top;
          }
        this.updateState = 1;
        let h = this.viewState.measure(this);
        if (!h && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let c = [];
        h & 4 || ([this.measureRequests, c] = [c, this.measureRequests]);
        let a = c.map((d) => {
          try {
            return d.read(this);
          } catch (p) {
            return st(this.state, p), Kn;
          }
        }), f = We.create(this, this.state, []), u = !1;
        f.flags |= h, e ? e.flags |= h : e = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
        for (let d = 0; d < c.length; d++)
          if (a[d] != Kn)
            try {
              let p = c[d];
              p.write && p.write(a[d], this);
            } catch (p) {
              st(this.state, p);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let p = (r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o;
              if (p > 1 || p < -1) {
                n = n + p, i.scrollTop = n / this.scaleY, o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (e && !e.empty)
      for (let l of this.state.facet(Bi))
        l(e);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Ii + " " + (this.state.facet(Li) ? wr : br) + " " + this.state.facet(Me);
  }
  updateAttrs() {
    let t = qn(this, er, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), e = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      translate: "no",
      contenteditable: this.state.facet(ft) ? "true" : "false",
      class: "cm-content",
      style: `${w.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (e["aria-readonly"] = "true"), qn(this, Gi, e);
    let i = this.observer.ignore(() => {
      let n = Ai(this.contentDOM, this.contentAttrs, e), r = Ai(this.dom, this.editorAttrs, t);
      return n || r;
    });
    return this.editorAttrs = t, this.contentAttrs = e, i;
  }
  showAnnouncements(t) {
    let e = !0;
    for (let i of t)
      for (let n of i.effects)
        if (n.is(C.announce)) {
          e && (this.announceDOM.textContent = ""), e = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = n.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Ut);
    let t = this.state.facet(C.cspNonce);
    gt.mount(this.root, this.styleModules.concat(Ol).reverse(), t ? { nonce: t } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(t) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), t) {
      if (this.measureRequests.indexOf(t) > -1)
        return;
      if (t.key != null) {
        for (let e = 0; e < this.measureRequests.length; e++)
          if (this.measureRequests[e].key === t.key) {
            this.measureRequests[e] = t;
            return;
          }
      }
      this.measureRequests.push(t);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(t) {
    let e = this.pluginMap.get(t);
    return (e === void 0 || e && e.spec != t) && this.pluginMap.set(t, e = this.plugins.find((i) => i.spec == t) || null), e && e.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(t) {
    return this.readMeasured(), this.viewState.elementAtHeight(t);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(t) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(t);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(t) {
    return this.viewState.lineBlockAt(t);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(t, e, i) {
    return ti(this, t, An(this, t, e, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(t, e) {
    return ti(this, t, An(this, t, e, (i) => Xo(this, t.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(t, e) {
    let i = this.bidiSpans(t), n = this.textDirectionAt(t.from), r = i[e ? i.length - 1 : 0];
    return S.cursor(r.side(e, n) + t.from, r.forward(!e, n) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(t, e, i = !0) {
    return jo(this, t, e, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(t, e, i) {
    return ti(this, t, Jo(this, t, e, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(t) {
    return this.docView.domAtPos(t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(t, e = 0) {
    return this.docView.posFromDOM(t, e);
  }
  posAtCoords(t, e = !0) {
    return this.readMeasured(), lr(this, t, e);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(t, e = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(t, e);
    if (!i || i.left == i.right)
      return i;
    let n = this.state.doc.lineAt(t), r = this.bidiSpans(n), o = r[pt.find(r, t - n.from, -1, e)];
    return fe(i, o.dir == W.LTR == e > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(t) {
    return this.readMeasured(), this.docView.coordsForChar(t);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(t) {
    return !this.state.facet(Zs) || t < this.viewport.from || t > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(t));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(t) {
    if (t.length > Ll)
      return qs(t.length);
    let e = this.textDirectionAt(t.from), i;
    for (let r of this.bidiCache)
      if (r.from == t.from && r.dir == e && (r.fresh || Ks(r.isolates, i = wn(this, t))))
        return r.order;
    i || (i = wn(this, t));
    let n = To(t.text, e, i);
    return this.bidiCache.push(new $e(t.from, t.to, e, i, !0, n)), n;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var t;
    return (this.dom.ownerDocument.hasFocus() || w.safari && ((t = this.inputState) === null || t === void 0 ? void 0 : t.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Ts(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(t) {
    this._root != t && (this._root = t, this.observer.setWindow((t.nodeType == 9 ? t : t.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let t of this.plugins)
      t.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(t, e = {}) {
    return Se.of(new It(typeof t == "number" ? S.cursor(t) : t, e.y, e.x, e.yMargin, e.xMargin));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: t, scrollLeft: e } = this.scrollDOM, i = this.viewState.scrollAnchorAt(t);
    return Se.of(new It(S.cursor(i.from), "start", "start", i.top - t, e, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(t) {
    t == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof t == "boolean" ? this.inputState.tabFocusMode = t ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + t);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(t) {
    return yt.define(() => ({}), { eventHandlers: t });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(t) {
    return yt.define(() => ({}), { eventObservers: t });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(t, e) {
    let i = gt.newName(), n = [Me.of(i), Ut.of(Ni(`.${i}`, t))];
    return e && e.dark && n.push(Li.of(!0)), n;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(t) {
    return je.lowest(Ut.of(Ni("." + Ii, t, Sr)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(t) {
    var e;
    let i = t.querySelector(".cm-content"), n = i && O.get(i) || O.get(t);
    return ((e = n == null ? void 0 : n.rootView) === null || e === void 0 ? void 0 : e.view) || null;
  }
}
C.styleModule = Ut;
C.inputHandler = Us;
C.clipboardInputFilter = Xi;
C.clipboardOutputFilter = Ji;
C.scrollHandler = _s;
C.focusChangeEffect = Qs;
C.perLineTextDirection = Zs;
C.exceptionSink = Ys;
C.updateListener = Bi;
C.editable = ft;
C.mouseSelectionStyle = Gs;
C.dragMovesSelection = Js;
C.clickAddsSelectionRange = Xs;
C.decorations = he;
C.outerDecorations = ir;
C.atomicRanges = Yi;
C.bidiIsolatedRanges = nr;
C.scrollMargins = sr;
C.darkTheme = Li;
C.cspNonce = /* @__PURE__ */ k.define({ combine: (s) => s.length ? s[0] : "" });
C.contentAttributes = Gi;
C.editorAttributes = er;
C.lineWrapping = /* @__PURE__ */ C.contentAttributes.of({ class: "cm-lineWrapping" });
C.announce = /* @__PURE__ */ L.define();
const Ll = 4096, Kn = {};
class $e {
  constructor(t, e, i, n, r, o) {
    this.from = t, this.to = e, this.dir = i, this.isolates = n, this.fresh = r, this.order = o;
  }
  static update(t, e) {
    if (e.empty && !t.some((r) => r.fresh))
      return t;
    let i = [], n = t.length ? t[t.length - 1].dir : W.LTR;
    for (let r = Math.max(0, t.length - 10); r < t.length; r++) {
      let o = t[r];
      o.dir == n && !e.touchesRange(o.from, o.to) && i.push(new $e(e.mapPos(o.from, 1), e.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function qn(s, t, e) {
  for (let i = s.state.facet(t), n = i.length - 1; n >= 0; n--) {
    let r = i[n], o = typeof r == "function" ? r(s) : r;
    o && Ci(o, e);
  }
  return e;
}
const Il = w.mac ? "mac" : w.windows ? "win" : w.linux ? "linux" : "key";
function Nl(s, t) {
  const e = s.split(/-(?!$)/);
  let i = e[e.length - 1];
  i == "Space" && (i = " ");
  let n, r, o, l;
  for (let h = 0; h < e.length - 1; ++h) {
    const c = e[h];
    if (/^(cmd|meta|m)$/i.test(c))
      l = !0;
    else if (/^a(lt)?$/i.test(c))
      n = !0;
    else if (/^(c|ctrl|control)$/i.test(c))
      r = !0;
    else if (/^s(hift)?$/i.test(c))
      o = !0;
    else if (/^mod$/i.test(c))
      t == "mac" ? l = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + c);
  }
  return n && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function Te(s, t, e) {
  return t.altKey && (s = "Alt-" + s), t.ctrlKey && (s = "Ctrl-" + s), t.metaKey && (s = "Meta-" + s), e !== !1 && t.shiftKey && (s = "Shift-" + s), s;
}
const Fl = /* @__PURE__ */ je.default(/* @__PURE__ */ C.domEventHandlers({
  keydown(s, t) {
    return zl(Hl(t.state), s, t, "editor");
  }
})), vr = /* @__PURE__ */ k.define({ enables: Fl }), jn = /* @__PURE__ */ new WeakMap();
function Hl(s) {
  let t = s.facet(vr), e = jn.get(t);
  return e || jn.set(t, e = Wl(t.reduce((i, n) => i.concat(n), []))), e;
}
let ut = null;
const Vl = 4e3;
function Wl(s, t = Il) {
  let e = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), n = (o, l) => {
    let h = i[o];
    if (h == null)
      i[o] = l;
    else if (h != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, h, c, a) => {
    var f, u;
    let d = e[o] || (e[o] = /* @__PURE__ */ Object.create(null)), p = l.split(/ (?!$)/).map((y) => Nl(y, t));
    for (let y = 1; y < p.length; y++) {
      let v = p.slice(0, y).join(" ");
      n(v, !0), d[v] || (d[v] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(A) => {
          let x = ut = { view: A, prefix: v, scope: o };
          return setTimeout(() => {
            ut == x && (ut = null);
          }, Vl), !0;
        }]
      });
    }
    let g = p.join(" ");
    n(g, !1);
    let m = d[g] || (d[g] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    h && m.run.push(h), c && (m.preventDefault = !0), a && (m.stopPropagation = !0);
  };
  for (let o of s) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let c of l) {
        let a = e[c] || (e[c] = /* @__PURE__ */ Object.create(null));
        a._any || (a._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let u in a)
          a[u].run.push((d) => f(d, Fi));
      }
    let h = o[t] || o.key;
    if (h)
      for (let c of l)
        r(c, h, o.run, o.preventDefault, o.stopPropagation), o.shift && r(c, "Shift-" + h, o.shift, o.preventDefault, o.stopPropagation);
  }
  return e;
}
let Fi = null;
function zl(s, t, e, i) {
  Fi = t;
  let n = zr(t), r = Pe(n, 0), o = ai(r) == n.length && n != " ", l = "", h = !1, c = !1, a = !1;
  ut && ut.view == e && ut.scope == i && (l = ut.prefix + " ", cr.indexOf(t.keyCode) < 0 && (c = !0, ut = null));
  let f = /* @__PURE__ */ new Set(), u = (m) => {
    if (m) {
      for (let y of m.run)
        if (!f.has(y) && (f.add(y), y(e)))
          return m.stopPropagation && (a = !0), !0;
      m.preventDefault && (m.stopPropagation && (a = !0), c = !0);
    }
    return !1;
  }, d = s[i], p, g;
  return d && (u(d[l + Te(n, t, !o)]) ? h = !0 : o && (t.altKey || t.metaKey || t.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(w.windows && t.ctrlKey && t.altKey) && (p = $r[t.keyCode]) && p != n ? (u(d[l + Te(p, t, !0)]) || t.shiftKey && (g = Kr[t.keyCode]) != n && g != p && u(d[l + Te(g, t, !1)])) && (h = !0) : o && t.shiftKey && u(d[l + Te(n, t, !0)]) && (h = !0), !h && u(d._any) && (h = !0)), c && (h = !0), h && a && t.stopPropagation(), Fi = null, h;
}
const $l = !w.ios, Xn = {
  ".cm-line": {
    "& ::selection, &::selection": { backgroundColor: "transparent !important" }
  },
  ".cm-content": {
    "& :focus": {
      caretColor: "initial !important",
      "&::selection, & ::selection": {
        backgroundColor: "Highlight !important"
      }
    }
  }
};
$l && (Xn[".cm-line"].caretColor = Xn[".cm-content"].caretColor = "transparent !important");
class Kl extends ue {
  constructor(t) {
    super(), this.content = t;
  }
  toDOM() {
    let t = document.createElement("span");
    return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : this.content), typeof this.content == "string" ? t.setAttribute("aria-label", "placeholder " + this.content) : t.setAttribute("aria-hidden", "true"), t;
  }
  coordsAt(t) {
    let e = t.firstChild ? Ft(t.firstChild) : [];
    if (!e.length)
      return null;
    let i = window.getComputedStyle(t.parentNode), n = fe(e[0], i.direction != "rtl"), r = parseInt(i.lineHeight);
    return n.bottom - n.top > r * 1.5 ? { left: n.left, right: n.right, top: n.top, bottom: n.top + r } : n;
  }
  ignoreEvent() {
    return !1;
  }
}
function Zh(s) {
  return yt.fromClass(class {
    constructor(t) {
      this.view = t, this.placeholder = s ? P.set([P.widget({ widget: new Kl(s), side: 1 }).range(0)]) : P.none;
    }
    get decorations() {
      return this.view.state.doc.length ? P.none : this.placeholder;
    }
  }, { decorations: (t) => t.decorations });
}
class zt extends Ct {
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(t) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(t) {
  }
}
zt.prototype.elementClass = "";
zt.prototype.toDOM = void 0;
zt.prototype.mapMode = K.TrackBefore;
zt.prototype.startSide = zt.prototype.endSide = -1;
zt.prototype.point = !0;
var ni;
const Bt = /* @__PURE__ */ new ce();
function xr(s) {
  return k.define({
    combine: s ? (t) => t.concat(s) : void 0
  });
}
const _i = /* @__PURE__ */ new ce();
class Q {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(t, e, i = [], n = "") {
    this.data = t, this.name = n, T.prototype.hasOwnProperty("tree") || Object.defineProperty(T.prototype, "tree", { get() {
      return bt(this);
    } }), this.parser = e, this.extension = [
      Kt.of(this),
      T.languageData.of((r, o, l) => {
        let h = Jn(r, o, l), c = h.type.prop(Bt);
        if (!c)
          return [];
        let a = r.facet(c), f = h.type.prop(_i);
        if (f) {
          let u = h.resolve(o - h.from, l);
          for (let d of f)
            if (d.test(u, r)) {
              let p = r.facet(d.facet);
              return d.type == "replace" ? p : p.concat(a);
            }
        }
        return a;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(t, e, i = -1) {
    return Jn(t, e, i).type.prop(Bt) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(t) {
    let e = t.facet(Kt);
    if ((e == null ? void 0 : e.data) == this.data)
      return [{ from: 0, to: t.doc.length }];
    if (!e || !e.allowsNesting)
      return [];
    let i = [], n = (r, o) => {
      if (r.prop(Bt) == this.data) {
        i.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(ce.mounted);
      if (l) {
        if (l.tree.prop(Bt) == this.data) {
          if (l.overlay)
            for (let h of l.overlay)
              i.push({ from: h.from + o, to: h.to + o });
          else
            i.push({ from: o, to: o + r.length });
          return;
        } else if (l.overlay) {
          let h = i.length;
          if (n(l.tree, l.overlay[0].from + o), i.length > h)
            return;
        }
      }
      for (let h = 0; h < r.children.length; h++) {
        let c = r.children[h];
        c instanceof Pt && n(c, r.positions[h] + o);
      }
    };
    return n(bt(t), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
Q.setState = /* @__PURE__ */ L.define();
function Jn(s, t, e) {
  let i = s.facet(Kt), n = bt(s).topNode;
  if (!i || i.allowsNesting)
    for (let r = n; r; r = r.enter(t, e, hs.ExcludeBuffers))
      r.type.isTop && (n = r);
  return n;
}
class Ke extends Q {
  constructor(t, e, i) {
    super(t, e, [], i), this.parser = e;
  }
  /**
  Define a language from a parser.
  */
  static define(t) {
    let e = xr(t.languageData);
    return new Ke(e, t.parser.configure({
      props: [Bt.add((i) => i.isTop ? e : void 0)]
    }), t.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(t, e) {
    return new Ke(this.data, this.parser.configure(t), e || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function bt(s) {
  let t = s.field(Q.state, !1);
  return t ? t.tree : Pt.empty;
}
class ql {
  /**
  Create an input object for the given document.
  */
  constructor(t) {
    this.doc = t, this.cursorPos = 0, this.string = "", this.cursor = t.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(t) {
    return this.string = this.cursor.next(t - this.cursorPos).value, this.cursorPos = t + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(t) {
    return this.syncTo(t), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(t, e) {
    let i = this.cursorPos - this.string.length;
    return t < i || e >= this.cursorPos ? this.doc.sliceString(t, e) : this.string.slice(t - i, e - i);
  }
}
let Jt = null;
class qe {
  constructor(t, e, i = [], n, r, o, l, h) {
    this.parser = t, this.state = e, this.fragments = i, this.tree = n, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = h, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new qe(t, e, [], Pt.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new ql(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(t, e) {
    return e != null && e >= this.state.doc.length && (e = void 0), this.tree != Pt.empty && this.isDone(e ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof t == "number") {
        let n = Date.now() + t;
        t = () => Date.now() > n;
      }
      for (this.parse || (this.parse = this.startParse()), e != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > e) && e < this.state.doc.length && this.parse.stopAt(e); ; ) {
        let n = this.parse.advance();
        if (n)
          if (this.fragments = this.withoutTempSkipped(De.addTree(n, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = n, this.parse = null, this.treeLen < (e ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (t())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let t, e;
    this.parse && (t = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > t) && this.parse.stopAt(t), this.withContext(() => {
      for (; !(e = this.parse.advance()); )
        ;
    }), this.treeLen = t, this.tree = e, this.fragments = this.withoutTempSkipped(De.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(t) {
    let e = Jt;
    Jt = this;
    try {
      return t();
    } finally {
      Jt = e;
    }
  }
  withoutTempSkipped(t) {
    for (let e; e = this.tempSkipped.pop(); )
      t = Gn(t, e.from, e.to);
    return t;
  }
  /**
  @internal
  */
  changes(t, e) {
    let { fragments: i, tree: n, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !t.empty) {
      let h = [];
      if (t.iterChangedRanges((c, a, f, u) => h.push({ fromA: c, toA: a, fromB: f, toB: u })), i = De.applyChanges(i, h), n = Pt.empty, r = 0, o = { from: t.mapPos(o.from, -1), to: t.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let c of this.skipped) {
          let a = t.mapPos(c.from, 1), f = t.mapPos(c.to, -1);
          a < f && l.push({ from: a, to: f });
        }
      }
    }
    return new qe(this.parser, e, i, n, r, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(t) {
    if (this.viewport.from == t.from && this.viewport.to == t.to)
      return !1;
    this.viewport = t;
    let e = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: n, to: r } = this.skipped[i];
      n < t.to && r > t.from && (this.fragments = Gn(this.fragments, n, r), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= e ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(t, e) {
    this.skipped.push({ from: t, to: e });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(t) {
    return new class extends Fr {
      createParse(e, i, n) {
        let r = n[0].from, o = n[n.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let h = Jt;
            if (h) {
              for (let c of n)
                h.tempSkipped.push(c);
              t && (h.scheduleOn = h.scheduleOn ? Promise.all([h.scheduleOn, t]) : t);
            }
            return this.parsedPos = o, new Pt(Wi.none, [], [], o - r);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(t) {
    t = Math.min(t, this.state.doc.length);
    let e = this.fragments;
    return this.treeLen >= t && e.length && e[0].from == 0 && e[0].to >= t;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return Jt;
  }
}
function Gn(s, t, e) {
  return De.applyChanges(s, [{ fromA: t, toA: e, fromB: t, toB: e }]);
}
class $t {
  constructor(t) {
    this.context = t, this.tree = t.tree;
  }
  apply(t) {
    if (!t.docChanged && this.tree == this.context.tree)
      return this;
    let e = this.context.changes(t.changes, t.state), i = this.context.treeLen == t.startState.doc.length ? void 0 : Math.max(t.changes.mapPos(this.context.treeLen), e.viewport.to);
    return e.work(20, i) || e.takeTree(), new $t(e);
  }
  static init(t) {
    let e = Math.min(3e3, t.doc.length), i = qe.create(t.facet(Kt).parser, t, { from: 0, to: e });
    return i.work(20, e) || i.takeTree(), new $t(i);
  }
}
Q.state = /* @__PURE__ */ wt.define({
  create: $t.init,
  update(s, t) {
    for (let e of t.effects)
      if (e.is(Q.setState))
        return e.value;
    return t.startState.facet(Kt) != t.state.facet(Kt) ? $t.init(t.state) : s.apply(t);
  }
});
let kr = (s) => {
  let t = setTimeout(
    () => s(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(t);
};
typeof requestIdleCallback < "u" && (kr = (s) => {
  let t = -1, e = setTimeout(
    () => {
      t = requestIdleCallback(s, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => t < 0 ? clearTimeout(e) : cancelIdleCallback(t);
});
const si = typeof navigator < "u" && (!((ni = navigator.scheduling) === null || ni === void 0) && ni.isInputPending) ? () => navigator.scheduling.isInputPending() : null, jl = /* @__PURE__ */ yt.fromClass(class {
  constructor(t) {
    this.view = t, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(t) {
    let e = this.view.state.field(Q.state).context;
    (e.updateViewport(t.view.viewport) || this.view.viewport.to > e.treeLen) && this.scheduleWork(), (t.docChanged || t.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(e);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: t } = this.view, e = t.field(Q.state);
    (e.tree != e.context.tree || !e.context.isDone(t.doc.length)) && (this.working = kr(this.work));
  }
  work(t) {
    this.working = null;
    let e = Date.now();
    if (this.chunkEnd < e && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = e + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: n } } = this.view, r = i.field(Q.state);
    if (r.tree == r.context.tree && r.context.isDone(
      n + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, t && !si ? Math.max(25, t.timeRemaining() - 5) : 1e9), l = r.context.treeLen < n && i.doc.length > n + 1e3, h = r.context.work(() => si && si() || Date.now() > o, n + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - e, (h || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: Q.setState.of(new $t(r.context)) })), this.chunkBudget > 0 && !(h && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(t) {
    t.scheduleOn && (this.workScheduled++, t.scheduleOn.then(() => this.scheduleWork()).catch((e) => st(this.view.state, e)).then(() => this.workScheduled--), t.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Kt = /* @__PURE__ */ k.define({
  combine(s) {
    return s.length ? s[0] : null;
  },
  enables: (s) => [
    Q.state,
    jl,
    C.contentAttributes.compute([s], (t) => {
      let e = t.facet(s);
      return e && e.name ? { "data-language": e.name } : {};
    })
  ]
});
class Xl {
  /**
  Create a language support object.
  */
  constructor(t, e = []) {
    this.language = t, this.support = e, this.extension = [t, e];
  }
}
const Ye = /* @__PURE__ */ k.define({
  combine: (s) => {
    if (!s.length)
      return "  ";
    let t = s[0];
    if (!t || /\S/.test(t) || Array.from(t).some((e) => e != t[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(s[0]));
    return t;
  }
});
function Jl(s) {
  let t = s.facet(Ye);
  return t.charCodeAt(0) == 9 ? s.tabSize * t.length : t.length;
}
function Gl(s, t) {
  let e = "", i = s.tabSize, n = s.facet(Ye)[0];
  if (n == "	") {
    for (; t >= i; )
      e += "	", t -= i;
    n = " ";
  }
  for (let r = 0; r < t; r++)
    e += n;
  return e;
}
const Yl = /* @__PURE__ */ new ce();
function Ul(s) {
  let t = s.node, e = t.childAfter(t.from), i = t.lastChild;
  if (!e)
    return null;
  let n = s.options.simulateBreak, r = s.state.doc.lineAt(e.from), o = n == null || n <= r.from ? r.to : Math.min(r.to, n);
  for (let l = e.to; ; ) {
    let h = t.childAfter(l);
    if (!h || h == i)
      return null;
    if (!h.type.isSkipped)
      return h.from < o ? e : null;
    l = h.to;
  }
}
function Ql({ closing: s, align: t = !0, units: e = 1 }) {
  return (i) => Zl(i, t, e, s);
}
function Zl(s, t, e, i, n) {
  let r = s.textAfter, o = r.match(/^\s*/)[0].length, l = i && r.slice(o, o + i.length) == i || n == s.pos + o, h = t ? Ul(s) : null;
  return h ? l ? s.column(h.from) : s.column(h.to) : s.baseIndent + (l ? 0 : s.unit * e);
}
const _l = (s) => s.baseIndent;
function ri({ except: s, units: t = 1 } = {}) {
  return (e) => {
    let i = s && s.test(e.textAfter);
    return e.baseIndent + (i ? 0 : t * e.unit);
  };
}
const th = /* @__PURE__ */ new ce();
function eh(s) {
  let t = s.firstChild, e = s.lastChild;
  return t && t.to < e.from ? { from: t.to, to: e.type.isError ? s.to : e.from } : null;
}
class ge {
  constructor(t, e) {
    this.specs = t;
    let i;
    function n(l) {
      let h = gt.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + h] = l, h;
    }
    const r = typeof e.all == "string" ? e.all : e.all ? n(e.all) : void 0, o = e.scope;
    this.scope = o instanceof Q ? (l) => l.prop(Bt) == o.data : o ? (l) => l == o : void 0, this.style = Nr(t.map((l) => ({
      tag: l.tag,
      class: l.class || n(Object.assign({}, l, { tag: null }))
    })), {
      all: r
    }).style, this.module = i ? new gt(i) : null, this.themeType = e.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(t, e) {
    return new ge(t, e || {});
  }
}
const Hi = /* @__PURE__ */ k.define(), ih = /* @__PURE__ */ k.define({
  combine(s) {
    return s.length ? [s[0]] : null;
  }
});
function oi(s) {
  let t = s.facet(Hi);
  return t.length ? t : s.facet(ih);
}
function nh(s, t) {
  let e = [rh], i;
  return s instanceof ge && (s.module && e.push(C.styleModule.of(s.module)), i = s.themeType), i ? e.push(Hi.computeN([C.darkTheme], (n) => n.facet(C.darkTheme) == (i == "dark") ? [s] : [])) : e.push(Hi.of(s)), e;
}
class sh {
  constructor(t) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = bt(t.state), this.decorations = this.buildDeco(t, oi(t.state)), this.decoratedTo = t.viewport.to;
  }
  update(t) {
    let e = bt(t.state), i = oi(t.state), n = i != oi(t.startState), { viewport: r } = t.view, o = t.changes.mapPos(this.decoratedTo, 1);
    e.length < r.to && !n && e.type == this.tree.type && o >= r.to ? (this.decorations = this.decorations.map(t.changes), this.decoratedTo = o) : (e != this.tree || t.viewportChanged || n) && (this.tree = e, this.decorations = this.buildDeco(t.view, i), this.decoratedTo = r.to);
  }
  buildDeco(t, e) {
    if (!e || !this.tree.length)
      return P.none;
    let i = new re();
    for (let { from: n, to: r } of t.visibleRanges)
      Hr(this.tree, e, (o, l, h) => {
        i.add(o, l, this.markCache[h] || (this.markCache[h] = P.mark({ class: h })));
      }, n, r);
    return i.finish();
  }
}
const rh = /* @__PURE__ */ je.high(/* @__PURE__ */ yt.fromClass(sh, {
  decorations: (s) => s.decorations
}));
b.meta, b.link, b.heading, b.emphasis, b.strong, b.strikethrough, b.keyword, b.atom, b.bool, b.url, b.contentSeparator, b.labelName, b.literal, b.inserted, b.string, b.deleted, b.regexp, b.escape, b.string, b.variableName, b.variableName, b.typeName, b.namespace, b.className, b.variableName, b.macroName, b.propertyName, b.comment, b.invalid;
const oh = /* @__PURE__ */ Object.create(null), Yn = [Wi.none], Un = [], Qn = /* @__PURE__ */ Object.create(null), lh = /* @__PURE__ */ Object.create(null);
for (let [s, t] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  lh[s] = /* @__PURE__ */ hh(oh, t);
function li(s, t) {
  Un.indexOf(s) > -1 || (Un.push(s), console.warn(t));
}
function hh(s, t) {
  let e = [];
  for (let l of t.split(" ")) {
    let h = [];
    for (let c of l.split(".")) {
      let a = s[c] || b[c];
      a ? typeof a == "function" ? h.length ? h = h.map(a) : li(c, `Modifier ${c} used at start of tag`) : h.length ? li(c, `Tag ${c} used as modifier`) : h = Array.isArray(a) ? a : [a] : li(c, `Unknown highlighting tag ${c}`);
    }
    for (let c of h)
      e.push(c);
  }
  if (!e.length)
    return 0;
  let i = t.replace(/ /g, "_"), n = i + " " + e.map((l) => l.id), r = Qn[n];
  if (r)
    return r.id;
  let o = Qn[n] = Wi.define({
    id: Yn.length,
    name: i,
    props: [Ir({ [i]: e })]
  });
  return Yn.push(o), o.id;
}
W.RTL, W.LTR;
function Cr(s, t) {
  let e = -1;
  return s.changeByRange((i) => {
    let n = [];
    for (let o = i.from; o <= i.to; ) {
      let l = s.doc.lineAt(o);
      l.number > e && (i.empty || i.to > l.from) && (t(l, n, i), e = l.number), o = l.to + 1;
    }
    let r = s.changes(n);
    return {
      changes: n,
      range: S.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
    };
  });
}
const ah = ({ state: s, dispatch: t }) => s.readOnly ? !1 : (t(s.update(Cr(s, (e, i) => {
  i.push({ from: e.from, insert: s.facet(Ye) });
}), { userEvent: "input.indent" })), !0), ch = ({ state: s, dispatch: t }) => s.readOnly ? !1 : (t(s.update(Cr(s, (e, i) => {
  let n = /^\s*/.exec(e.text)[0];
  if (!n)
    return;
  let r = oo(n, s.tabSize), o = 0, l = Gl(s, Math.max(0, r - Jl(s)));
  for (; o < n.length && o < l.length && n.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: e.from + o, to: e.from + n.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), ta = { key: "Tab", run: ah, shift: ch };
function Zn(s) {
  let t = Object.keys(s).join(""), e = /\w/.test(t);
  return e && (t = t.replace(/\w/g, "")), `[${e ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
}
function fh(s) {
  let t = /* @__PURE__ */ Object.create(null), e = /* @__PURE__ */ Object.create(null);
  for (let { label: n } of s) {
    t[n[0]] = !0;
    for (let r = 1; r < n.length; r++)
      e[n[r]] = !0;
  }
  let i = Zn(t) + Zn(e) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function uh(s) {
  let t = s.map((n) => typeof n == "string" ? { label: n } : n), [e, i] = t.every((n) => /^\w+$/.test(n.label)) ? [/\w*$/, /\w+$/] : fh(t);
  return (n) => {
    let r = n.matchBefore(i);
    return r || n.explicit ? { from: r ? r.from : n.pos, options: t, validFor: e } : null;
  };
}
function dh(s, t) {
  return (e) => {
    for (let i = bt(e.state).resolveInner(e.pos, -1); i; i = i.parent) {
      if (s.indexOf(i.name) > -1)
        return null;
      if (i.type.isTop)
        break;
    }
    return t(e);
  };
}
const ph = /* @__PURE__ */ Dt.define(), gh = /* @__PURE__ */ C.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class mh {
  constructor(t, e, i, n) {
    this.field = t, this.line = e, this.from = i, this.to = n;
  }
}
class tn {
  constructor(t, e, i) {
    this.field = t, this.from = e, this.to = i;
  }
  map(t) {
    let e = t.mapPos(this.from, -1, K.TrackDel), i = t.mapPos(this.to, 1, K.TrackDel);
    return e == null || i == null ? null : new tn(this.field, e, i);
  }
}
class en {
  constructor(t, e) {
    this.lines = t, this.fieldPositions = e;
  }
  instantiate(t, e) {
    let i = [], n = [e], r = t.doc.lineAt(e), o = /^\s*/.exec(r.text)[0];
    for (let h of this.lines) {
      if (i.length) {
        let c = o, a = /^\t*/.exec(h)[0].length;
        for (let f = 0; f < a; f++)
          c += t.facet(Ye);
        n.push(e + c.length - a), h = c + h.slice(a);
      }
      i.push(h), e += h.length + 1;
    }
    let l = this.fieldPositions.map((h) => new tn(h.field, n[h.line] + h.from, n[h.line] + h.to));
    return { text: i, ranges: l };
  }
  static parse(t) {
    let e = [], i = [], n = [], r;
    for (let o of t.split(/\r\n?|\n/)) {
      for (; r = /[#$]\{(?:(\d+)(?::([^}]*))?|((?:\\[{}]|[^}])*))\}/.exec(o); ) {
        let l = r[1] ? +r[1] : null, h = r[2] || r[3] || "", c = -1, a = h.replace(/\\[{}]/g, (f) => f[1]);
        for (let f = 0; f < e.length; f++)
          (l != null ? e[f].seq == l : a && e[f].name == a) && (c = f);
        if (c < 0) {
          let f = 0;
          for (; f < e.length && (l == null || e[f].seq != null && e[f].seq < l); )
            f++;
          e.splice(f, 0, { seq: l, name: a }), c = f;
          for (let u of n)
            u.field >= c && u.field++;
        }
        n.push(new mh(c, i.length, r.index, r.index + a.length)), o = o.slice(0, r.index) + h + o.slice(r.index + r[0].length);
      }
      o = o.replace(/\\([{}])/g, (l, h, c) => {
        for (let a of n)
          a.line == i.length && a.from > c && (a.from--, a.to--);
        return h;
      }), i.push(o);
    }
    return new en(i, n);
  }
}
let yh = /* @__PURE__ */ P.widget({ widget: /* @__PURE__ */ new class extends ue {
  toDOM() {
    let s = document.createElement("span");
    return s.className = "cm-snippetFieldPosition", s;
  }
  ignoreEvent() {
    return !1;
  }
}() }), bh = /* @__PURE__ */ P.mark({ class: "cm-snippetField" });
class qt {
  constructor(t, e) {
    this.ranges = t, this.active = e, this.deco = P.set(t.map((i) => (i.from == i.to ? yh : bh).range(i.from, i.to)));
  }
  map(t) {
    let e = [];
    for (let i of this.ranges) {
      let n = i.map(t);
      if (!n)
        return null;
      e.push(n);
    }
    return new qt(e, this.active);
  }
  selectionInsideField(t) {
    return t.ranges.every((e) => this.ranges.some((i) => i.field == this.active && i.from <= e.from && i.to >= e.to));
  }
}
const me = /* @__PURE__ */ L.define({
  map(s, t) {
    return s && s.map(t);
  }
}), wh = /* @__PURE__ */ L.define(), ae = /* @__PURE__ */ wt.define({
  create() {
    return null;
  },
  update(s, t) {
    for (let e of t.effects) {
      if (e.is(me))
        return e.value;
      if (e.is(wh) && s)
        return new qt(s.ranges, e.value);
    }
    return s && t.docChanged && (s = s.map(t.changes)), s && t.selection && !s.selectionInsideField(t.selection) && (s = null), s;
  },
  provide: (s) => C.decorations.from(s, (t) => t ? t.deco : P.none)
});
function nn(s, t) {
  return S.create(s.filter((e) => e.field == t).map((e) => S.range(e.from, e.to)));
}
function Sh(s) {
  let t = en.parse(s);
  return (e, i, n, r) => {
    let { text: o, ranges: l } = t.instantiate(e.state, n), h = {
      changes: { from: n, to: r, insert: M.of(o) },
      scrollIntoView: !0,
      annotations: i ? [ph.of(i), V.userEvent.of("input.complete")] : void 0
    };
    if (l.length && (h.selection = nn(l, 0)), l.some((c) => c.field > 0)) {
      let c = new qt(l, 0), a = h.effects = [me.of(c)];
      e.state.field(ae, !1) === void 0 && a.push(L.appendConfig.of([ae, Ah, Mh, gh]));
    }
    e.dispatch(e.state.update(h));
  };
}
function Ar(s) {
  return ({ state: t, dispatch: e }) => {
    let i = t.field(ae, !1);
    if (!i || s < 0 && i.active == 0)
      return !1;
    let n = i.active + s, r = s > 0 && !i.ranges.some((o) => o.field == n + s);
    return e(t.update({
      selection: nn(i.ranges, n),
      effects: me.of(r ? null : new qt(i.ranges, n)),
      scrollIntoView: !0
    })), !0;
  };
}
const vh = ({ state: s, dispatch: t }) => s.field(ae, !1) ? (t(s.update({ effects: me.of(null) })), !0) : !1, xh = /* @__PURE__ */ Ar(1), kh = /* @__PURE__ */ Ar(-1), Ch = [
  { key: "Tab", run: xh, shift: kh },
  { key: "Escape", run: vh }
], _n = /* @__PURE__ */ k.define({
  combine(s) {
    return s.length ? s[0] : Ch;
  }
}), Ah = /* @__PURE__ */ je.highest(/* @__PURE__ */ vr.compute([_n], (s) => s.facet(_n)));
function j(s, t) {
  return Object.assign(Object.assign({}, t), { apply: Sh(s) });
}
const Mh = /* @__PURE__ */ C.domEventHandlers({
  mousedown(s, t) {
    let e = t.state.field(ae, !1), i;
    if (!e || (i = t.posAtCoords({ x: s.clientX, y: s.clientY })) == null)
      return !1;
    let n = e.ranges.find((r) => r.from <= i && r.to >= i);
    return !n || n.field == e.active ? !1 : (t.dispatch({
      selection: nn(e.ranges, n.field),
      effects: me.of(e.ranges.some((r) => r.field > n.field) ? new qt(e.ranges, n.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), Mr = /* @__PURE__ */ new class extends Ct {
}();
Mr.startSide = 1;
Mr.endSide = -1;
const Tr = [
  /* @__PURE__ */ j("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ j("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ j("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ j("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ j("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ j(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ j("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ j(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ j(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ j('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ j('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], Th = /* @__PURE__ */ Tr.concat([
  /* @__PURE__ */ j("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ j("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ j("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), ts = /* @__PURE__ */ new Wr(), Dr = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Gt(s) {
  return (t, e) => {
    let i = t.node.getChild("VariableDefinition");
    return i && e(i, s), !0;
  };
}
const Dh = ["FunctionDeclaration"], Oh = {
  FunctionDeclaration: /* @__PURE__ */ Gt("function"),
  ClassDeclaration: /* @__PURE__ */ Gt("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Gt("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Gt("type"),
  NamespaceDeclaration: /* @__PURE__ */ Gt("namespace"),
  VariableDefinition(s, t) {
    s.matchContext(Dh) || t(s, "variable");
  },
  TypeDefinition(s, t) {
    t(s, "type");
  },
  __proto__: null
};
function Or(s, t) {
  let e = ts.get(t);
  if (e)
    return e;
  let i = [], n = !0;
  function r(o, l) {
    let h = s.sliceString(o.from, o.to);
    i.push({ label: h, type: l });
  }
  return t.cursor(hs.IncludeAnonymous).iterate((o) => {
    if (n)
      n = !1;
    else if (o.name) {
      let l = Oh[o.name];
      if (l && l(o, r) || Dr.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let l of Or(s, o.node))
        i.push(l);
      return !1;
    }
  }), ts.set(t, i), i;
}
const es = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Pr = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  ".",
  "?."
];
function Ph(s) {
  let t = bt(s.state).resolveInner(s.pos, -1);
  if (Pr.indexOf(t.name) > -1)
    return null;
  let e = t.name == "VariableName" || t.to - t.from < 20 && es.test(s.state.sliceDoc(t.from, t.to));
  if (!e && !s.explicit)
    return null;
  let i = [];
  for (let n = t; n; n = n.parent)
    Dr.has(n.name) && (i = i.concat(Or(s.state.doc, n)));
  return {
    options: i,
    from: e ? t.from : s.pos,
    validFor: es
  };
}
const kt = /* @__PURE__ */ Ke.define({
  name: "javascript",
  parser: /* @__PURE__ */ Vr.configure({
    props: [
      /* @__PURE__ */ Yl.add({
        IfStatement: /* @__PURE__ */ ri({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ ri({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: _l,
        SwitchBody: (s) => {
          let t = s.textAfter, e = /^\s*\}/.test(t), i = /^\s*(case|default)\b/.test(t);
          return s.baseIndent + (e ? 0 : i ? 1 : 2) * s.unit;
        },
        Block: /* @__PURE__ */ Ql({ closing: "}" }),
        ArrowFunction: (s) => s.baseIndent + s.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ ri({ except: /^{/ }),
        JSXElement(s) {
          let t = /^\s*<\//.test(s.textAfter);
          return s.lineIndent(s.node.from) + (t ? 0 : s.unit);
        },
        JSXEscape(s) {
          let t = /\s*\}/.test(s.textAfter);
          return s.lineIndent(s.node.from) + (t ? 0 : s.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(s) {
          return s.column(s.node.from) + s.unit;
        }
      }),
      /* @__PURE__ */ th.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": eh,
        BlockComment(s) {
          return { from: s.from + 2, to: s.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), Br = {
  test: (s) => /^JSX/.test(s.name),
  facet: /* @__PURE__ */ xr({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, Bh = /* @__PURE__ */ kt.configure({ dialect: "ts" }, "typescript"), Eh = /* @__PURE__ */ kt.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ _i.add((s) => s.isTop ? [Br] : void 0)]
}), Rh = /* @__PURE__ */ kt.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ _i.add((s) => s.isTop ? [Br] : void 0)]
}, "typescript");
let Er = (s) => ({ label: s, type: "keyword" });
const Rr = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(Er), Lh = /* @__PURE__ */ Rr.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(Er));
function ea(s = {}) {
  let t = s.jsx ? s.typescript ? Rh : Eh : s.typescript ? Bh : kt, e = s.typescript ? Th.concat(Lh) : Tr.concat(Rr);
  return new Xl(t, [
    kt.data.of({
      autocomplete: dh(Pr, uh(e))
    }),
    kt.data.of({
      autocomplete: Ph
    }),
    s.jsx ? Fh : []
  ]);
}
function Ih(s) {
  for (; ; ) {
    if (s.name == "JSXOpenTag" || s.name == "JSXSelfClosingTag" || s.name == "JSXFragmentTag")
      return s;
    if (s.name == "JSXEscape" || !s.parent)
      return null;
    s = s.parent;
  }
}
function is(s, t, e = s.length) {
  for (let i = t == null ? void 0 : t.firstChild; i; i = i.nextSibling)
    if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression")
      return s.sliceString(i.from, Math.min(i.to, e));
  return "";
}
const Nh = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), Fh = /* @__PURE__ */ C.inputHandler.of((s, t, e, i, n) => {
  if ((Nh ? s.composing : s.compositionStarted) || s.state.readOnly || t != e || i != ">" && i != "/" || !kt.isActiveAt(s.state, t, -1))
    return !1;
  let r = n(), { state: o } = r, l = o.changeByRange((h) => {
    var c;
    let { head: a } = h, f = bt(o).resolveInner(a - 1, -1), u;
    if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(a - 1, a) != i || f.name == "JSXAttributeValue" && f.to > a)) {
      if (i == ">" && f.name == "JSXFragmentTag")
        return { range: h, changes: { from: a, insert: "</>" } };
      if (i == "/" && f.name == "JSXStartCloseTag") {
        let d = f.parent, p = d.parent;
        if (p && d.from == a - 2 && ((u = is(o.doc, p.firstChild, a)) || ((c = p.firstChild) === null || c === void 0 ? void 0 : c.name) == "JSXFragmentTag")) {
          let g = `${u}>`;
          return { range: S.cursor(a + g.length, -1), changes: { from: a, insert: g } };
        }
      } else if (i == ">") {
        let d = Ih(f);
        if (d && d.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(a, a + 2)) && (u = is(o.doc, d, a)))
          return { range: h, changes: { from: a, insert: `</${u}>` } };
      }
    }
    return { range: h };
  });
  return l.changes.empty ? !1 : (s.dispatch([
    r,
    o.update(l, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
}), Hh = "#e5c07b", ns = "#e06c75", Vh = "#56b6c2", Wh = "#ffffff", Ie = "#abb2bf", Vi = "#7d8799", zh = "#61afef", $h = "#98c379", ss = "#d19a66", Kh = "#c678dd", qh = "#21252b", rs = "#2c313a", os = "#282c34", hi = "#353a42", jh = "#3E4451", ls = "#528bff", Xh = /* @__PURE__ */ C.theme({
  "&": {
    color: Ie,
    backgroundColor: os
  },
  ".cm-content": {
    caretColor: ls
  },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: ls },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: jh },
  ".cm-panels": { backgroundColor: qh, color: Ie },
  ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
  ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },
  ".cm-activeLine": { backgroundColor: "#6699ff0b" },
  ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },
  ".cm-gutters": {
    backgroundColor: os,
    color: Vi,
    border: "none"
  },
  ".cm-activeLineGutter": {
    backgroundColor: rs
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },
  ".cm-tooltip": {
    border: "none",
    backgroundColor: hi
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: hi,
    borderBottomColor: hi
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: rs,
      color: Ie
    }
  }
}, { dark: !0 }), Jh = /* @__PURE__ */ ge.define([
  {
    tag: b.keyword,
    color: Kh
  },
  {
    tag: [b.name, b.deleted, b.character, b.propertyName, b.macroName],
    color: ns
  },
  {
    tag: [/* @__PURE__ */ b.function(b.variableName), b.labelName],
    color: zh
  },
  {
    tag: [b.color, /* @__PURE__ */ b.constant(b.name), /* @__PURE__ */ b.standard(b.name)],
    color: ss
  },
  {
    tag: [/* @__PURE__ */ b.definition(b.name), b.separator],
    color: Ie
  },
  {
    tag: [b.typeName, b.className, b.number, b.changed, b.annotation, b.modifier, b.self, b.namespace],
    color: Hh
  },
  {
    tag: [b.operator, b.operatorKeyword, b.url, b.escape, b.regexp, b.link, /* @__PURE__ */ b.special(b.string)],
    color: Vh
  },
  {
    tag: [b.meta, b.comment],
    color: Vi
  },
  {
    tag: b.strong,
    fontWeight: "bold"
  },
  {
    tag: b.emphasis,
    fontStyle: "italic"
  },
  {
    tag: b.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: b.link,
    color: Vi,
    textDecoration: "underline"
  },
  {
    tag: b.heading,
    fontWeight: "bold",
    color: ns
  },
  {
    tag: [b.atom, b.bool, /* @__PURE__ */ b.special(b.variableName)],
    color: ss
  },
  {
    tag: [b.processingInstruction, b.string, b.inserted],
    color: $h
  },
  {
    tag: b.invalid,
    color: Wh
  }
]), ia = [Xh, /* @__PURE__ */ nh(Jh)];
export {
  Xe as C,
  C as E,
  L as S,
  T as a,
  Ye as b,
  ta as i,
  ea as j,
  vr as k,
  ia as o,
  Zh as p
};
