function z(t) {
  if (typeof t != "string" || !t)
    throw new Error("expected a non-empty string, got: " + t);
}
function Y(t) {
  if (typeof t != "number")
    throw new Error("expected a number, got: " + t);
}
const lt = 1, dt = 1, O = "emoji", $ = "keyvalue", le = "favorites", ut = "tokens", Ce = "tokens", ft = "unicode", _e = "count", mt = "group", pt = "order", Ie = "group-order", ie = "eTag", W = "url", ye = "skinTone", M = "readonly", de = "readwrite", Ae = "skinUnicodes", ht = "skinUnicodes", gt = "https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json", bt = "en";
function yt(t, e) {
  const n = /* @__PURE__ */ new Set(), i = [];
  for (const r of t) {
    const o = e(r);
    n.has(o) || (n.add(o), i.push(r));
  }
  return i;
}
function ke(t) {
  return yt(t, (e) => e.unicode);
}
function kt(t) {
  function e(n, i, r) {
    const o = i ? t.createObjectStore(n, { keyPath: i }) : t.createObjectStore(n);
    if (r)
      for (const [a, [m, u]] of Object.entries(r))
        o.createIndex(a, m, { multiEntry: u });
    return o;
  }
  e($), e(
    O,
    /* keyPath */
    ft,
    {
      [Ce]: [
        ut,
        /* multiEntry */
        !0
      ],
      [Ie]: [[mt, pt]],
      [Ae]: [
        ht,
        /* multiEntry */
        !0
      ]
    }
  ), e(le, void 0, {
    [_e]: [""]
  });
}
const re = {}, G = {}, V = {};
function Le(t, e, n) {
  n.onerror = () => e(n.error), n.onblocked = () => e(new Error("IDB blocked")), n.onsuccess = () => t(n.result);
}
async function vt(t) {
  const e = await new Promise((n, i) => {
    const r = indexedDB.open(t, lt);
    re[t] = r, r.onupgradeneeded = (o) => {
      o.oldVersion < dt && kt(r.result);
    }, Le(n, i, r);
  });
  return e.onclose = () => ue(t), e;
}
function Et(t) {
  return G[t] || (G[t] = vt(t)), G[t];
}
function A(t, e, n, i) {
  return new Promise((r, o) => {
    const a = t.transaction(e, n, { durability: "relaxed" }), m = typeof e == "string" ? a.objectStore(e) : e.map((l) => a.objectStore(l));
    let u;
    i(m, a, (l) => {
      u = l;
    }), a.oncomplete = () => r(u), a.onerror = () => o(a.error);
  });
}
function ue(t) {
  const e = re[t], n = e && e.result;
  if (n) {
    n.close();
    const i = V[t];
    if (i)
      for (const r of i)
        r();
  }
  delete re[t], delete G[t], delete V[t];
}
function wt(t) {
  return new Promise((e, n) => {
    ue(t);
    const i = indexedDB.deleteDatabase(t);
    Le(e, n, i);
  });
}
function Tt(t, e) {
  let n = V[t];
  n || (n = V[t] = []), n.push(e);
}
const jt = /* @__PURE__ */ new Set([
  ":D",
  "XD",
  ":'D",
  "O:)",
  ":X",
  ":P",
  ";P",
  "XP",
  ":L",
  ":Z",
  ":j",
  "8D",
  "XO",
  "8)",
  ":B",
  ":O",
  ":S",
  ":'o",
  "Dx",
  "X(",
  "D:",
  ":C",
  ">0)",
  ":3",
  "</3",
  "<3",
  "\\M/",
  ":E",
  "8#"
]);
function D(t) {
  return t.split(/[\s_]+/).map((e) => !e.match(/\w/) || jt.has(e) ? e.toLowerCase() : e.replace(/[)(:,]/g, "").replace(/’/g, "'").toLowerCase()).filter(Boolean);
}
const St = 2;
function Oe(t) {
  return t.filter(Boolean).map((e) => e.toLowerCase()).filter((e) => e.length >= St);
}
function xt(t) {
  return t.map(({ annotation: n, emoticon: i, group: r, order: o, shortcodes: a, skins: m, tags: u, emoji: l, version: d }) => {
    const h = [...new Set(
      Oe([
        ...(a || []).map(D).flat(),
        ...(u || []).map(D).flat(),
        ...D(n),
        i
      ])
    )].sort(), f = {
      annotation: n,
      group: r,
      order: o,
      tags: u,
      tokens: h,
      unicode: l,
      version: d
    };
    if (i && (f.emoticon = i), a && (f.shortcodes = a), m) {
      f.skinTones = [], f.skinUnicodes = [], f.skinVersions = [];
      for (const { tone: g, emoji: w, version: j } of m)
        f.skinTones.push(g), f.skinUnicodes.push(w), f.skinVersions.push(j);
    }
    return f;
  });
}
function De(t, e, n, i) {
  t[e](n).onsuccess = (r) => i && i(r.target.result);
}
function L(t, e, n) {
  De(t, "get", e, n);
}
function $e(t, e, n) {
  De(t, "getAll", e, n);
}
function fe(t) {
  t.commit && t.commit();
}
function Ct(t, e) {
  let n = t[0];
  for (let i = 1; i < t.length; i++) {
    const r = t[i];
    e(n) > e(r) && (n = r);
  }
  return n;
}
function Me(t, e) {
  const n = Ct(t, (r) => r.length), i = [];
  for (const r of n)
    t.some((o) => o.findIndex((a) => e(a) === e(r)) === -1) || i.push(r);
  return i;
}
async function _t(t) {
  return !await me(t, $, W);
}
async function It(t, e, n) {
  const [i, r] = await Promise.all([ie, W].map((o) => me(t, $, o)));
  return i === n && r === e;
}
async function At(t, e) {
  return A(t, O, M, (i, r, o) => {
    let a;
    const m = () => {
      i.getAll(a && IDBKeyRange.lowerBound(a, !0), 50).onsuccess = (u) => {
        const l = u.target.result;
        for (const d of l)
          if (a = d.unicode, e(d))
            return o(d);
        if (l.length < 50)
          return o();
        m();
      };
    };
    m();
  });
}
async function Be(t, e, n, i) {
  try {
    const r = xt(e);
    await A(t, [O, $], de, ([o, a], m) => {
      let u, l, d = 0;
      function h() {
        ++d === 2 && f();
      }
      function f() {
        if (!(u === i && l === n)) {
          o.clear();
          for (const g of r)
            o.put(g);
          a.put(i, ie), a.put(n, W), fe(m);
        }
      }
      L(a, ie, (g) => {
        u = g, h();
      }), L(a, W, (g) => {
        l = g, h();
      });
    });
  } finally {
  }
}
async function Lt(t, e) {
  return A(t, O, M, (n, i, r) => {
    const o = IDBKeyRange.bound([e, 0], [e + 1, 0], !1, !0);
    $e(n.index(Ie), o, r);
  });
}
async function Fe(t, e) {
  const n = Oe(D(e));
  return n.length ? A(t, O, M, (i, r, o) => {
    const a = [], m = () => {
      a.length === n.length && u();
    }, u = () => {
      const l = Me(a, (d) => d.unicode);
      o(l.sort((d, h) => d.order < h.order ? -1 : 1));
    };
    for (let l = 0; l < n.length; l++) {
      const d = n[l], h = l === n.length - 1 ? IDBKeyRange.bound(d, d + "￿", !1, !0) : IDBKeyRange.only(d);
      $e(i.index(Ce), h, (f) => {
        a.push(f), m();
      });
    }
  }) : [];
}
async function Ot(t, e) {
  const n = await Fe(t, e);
  return n.length ? n.filter((i) => (i.shortcodes || []).map((o) => o.toLowerCase()).includes(e.toLowerCase()))[0] || null : await At(t, (r) => (r.shortcodes || []).includes(e.toLowerCase())) || null;
}
async function Dt(t, e) {
  return A(t, O, M, (n, i, r) => L(n, e, (o) => {
    if (o)
      return r(o);
    L(n.index(Ae), e, (a) => r(a || null));
  }));
}
function me(t, e, n) {
  return A(t, e, M, (i, r, o) => L(i, n, o));
}
function $t(t, e, n, i) {
  return A(t, e, de, (r, o) => {
    r.put(i, n), fe(o);
  });
}
function Mt(t, e) {
  return A(t, le, de, (n, i) => L(n, e, (r) => {
    n.put((r || 0) + 1, e), fe(i);
  }));
}
function Bt(t, e, n) {
  return n === 0 ? [] : A(t, [le, O], M, ([i, r], o, a) => {
    const m = [];
    i.index(_e).openCursor(void 0, "prev").onsuccess = (u) => {
      const l = u.target.result;
      if (!l)
        return a(m);
      function d(g) {
        if (m.push(g), m.length === n)
          return a(m);
        l.continue();
      }
      const h = l.primaryKey, f = e.byName(h);
      if (f)
        return d(f);
      L(r, h, (g) => {
        if (g)
          return d(g);
        l.continue();
      });
    };
  });
}
const P = "";
function Ft(t, e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t) {
    const o = e(r);
    for (const a of o) {
      let m = n;
      for (let l = 0; l < a.length; l++) {
        const d = a.charAt(l);
        let h = m.get(d);
        h || (h = /* @__PURE__ */ new Map(), m.set(d, h)), m = h;
      }
      let u = m.get(P);
      u || (u = [], m.set(P, u)), u.push(r);
    }
  }
  return (r, o) => {
    let a = n;
    for (let l = 0; l < r.length; l++) {
      const d = r.charAt(l), h = a.get(d);
      if (h)
        a = h;
      else
        return [];
    }
    if (o)
      return a.get(P) || [];
    const m = [], u = [a];
    for (; u.length; ) {
      const d = [...u.shift().entries()].sort((h, f) => h[0] < f[0] ? -1 : 1);
      for (const [h, f] of d)
        h === P ? m.push(...f) : u.push(f);
    }
    return m;
  };
}
const Rt = [
  "name",
  "url"
];
function Nt(t) {
  const e = t && Array.isArray(t), n = e && t.length && (!t[0] || Rt.some((i) => !(i in t[0])));
  if (!e || n)
    throw new Error("Custom emojis are in the wrong format");
}
function ve(t) {
  Nt(t);
  const e = (f, g) => f.name.toLowerCase() < g.name.toLowerCase() ? -1 : 1, n = t.sort(e), r = Ft(t, (f) => {
    const g = /* @__PURE__ */ new Set();
    if (f.shortcodes)
      for (const w of f.shortcodes)
        for (const j of D(w))
          g.add(j);
    return g;
  }), o = (f) => r(f, !0), a = (f) => r(f, !1), m = (f) => {
    const g = D(f), w = g.map((j, _) => (_ < g.length - 1 ? o : a)(j));
    return Me(w, (j) => j.name).sort(e);
  }, u = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (const f of t) {
    l.set(f.name.toLowerCase(), f);
    for (const g of f.shortcodes || [])
      u.set(g.toLowerCase(), f);
  }
  return {
    all: n,
    search: m,
    byShortcode: (f) => u.get(f.toLowerCase()),
    byName: (f) => l.get(f.toLowerCase())
  };
}
const zt = typeof wrappedJSObject < "u";
function F(t) {
  if (!t)
    return t;
  if (zt && (t = structuredClone(t)), delete t.tokens, t.skinTones) {
    const e = t.skinTones.length;
    t.skins = Array(e);
    for (let n = 0; n < e; n++)
      t.skins[n] = {
        tone: t.skinTones[n],
        unicode: t.skinUnicodes[n],
        version: t.skinVersions[n]
      };
    delete t.skinTones, delete t.skinUnicodes, delete t.skinVersions;
  }
  return t;
}
function Re(t) {
  t || console.warn("emoji-picker-element is more efficient if the dataSource server exposes an ETag header.");
}
const Pt = [
  "annotation",
  "emoji",
  "group",
  "order",
  "version"
];
function Ut(t) {
  if (!t || !Array.isArray(t) || !t[0] || typeof t[0] != "object" || Pt.some((e) => !(e in t[0])))
    throw new Error("Emoji data is in the wrong format");
}
function Ne(t, e) {
  if (Math.floor(t.status / 100) !== 2)
    throw new Error("Failed to fetch: " + e + ":  " + t.status);
}
async function Gt(t) {
  const e = await fetch(t, { method: "HEAD" });
  Ne(e, t);
  const n = e.headers.get("etag");
  return Re(n), n;
}
async function se(t) {
  const e = await fetch(t);
  Ne(e, t);
  const n = e.headers.get("etag");
  Re(n);
  const i = await e.json();
  return Ut(i), [n, i];
}
function Kt(t) {
  for (var e = "", n = new Uint8Array(t), i = n.byteLength, r = -1; ++r < i; )
    e += String.fromCharCode(n[r]);
  return e;
}
function Wt(t) {
  for (var e = t.length, n = new ArrayBuffer(e), i = new Uint8Array(n), r = -1; ++r < e; )
    i[r] = t.charCodeAt(r);
  return n;
}
async function ze(t) {
  const e = JSON.stringify(t);
  let n = Wt(e);
  const i = await crypto.subtle.digest("SHA-1", n), r = Kt(i);
  return btoa(r);
}
async function Vt(t, e) {
  let n, i = await Gt(e);
  if (!i) {
    const r = await se(e);
    i = r[0], n = r[1], i || (i = await ze(n));
  }
  await It(t, e, i) || (n || (n = (await se(e))[1]), await Be(t, n, e, i));
}
async function Ht(t, e) {
  let [n, i] = await se(e);
  n || (n = await ze(i)), await Be(t, i, e, n);
}
class qt {
  constructor({ dataSource: e = gt, locale: n = bt, customEmoji: i = [] } = {}) {
    this.dataSource = e, this.locale = n, this._dbName = `emoji-picker-element-${this.locale}`, this._db = void 0, this._lazyUpdate = void 0, this._custom = ve(i), this._clear = this._clear.bind(this), this._ready = this._init();
  }
  async _init() {
    const e = this._db = await Et(this._dbName);
    Tt(this._dbName, this._clear);
    const n = this.dataSource;
    await _t(e) ? await Ht(e, n) : this._lazyUpdate = Vt(e, n);
  }
  async ready() {
    const e = async () => (this._ready || (this._ready = this._init()), this._ready);
    await e(), this._db || await e();
  }
  async getEmojiByGroup(e) {
    return Y(e), await this.ready(), ke(await Lt(this._db, e)).map(F);
  }
  async getEmojiBySearchQuery(e) {
    z(e), await this.ready();
    const n = this._custom.search(e), i = ke(await Fe(this._db, e)).map(F);
    return [
      ...n,
      ...i
    ];
  }
  async getEmojiByShortcode(e) {
    z(e), await this.ready();
    const n = this._custom.byShortcode(e);
    return n || F(await Ot(this._db, e));
  }
  async getEmojiByUnicodeOrName(e) {
    z(e), await this.ready();
    const n = this._custom.byName(e);
    return n || F(await Dt(this._db, e));
  }
  async getPreferredSkinTone() {
    return await this.ready(), await me(this._db, $, ye) || 0;
  }
  async setPreferredSkinTone(e) {
    return Y(e), await this.ready(), $t(this._db, $, ye, e);
  }
  async incrementFavoriteEmojiCount(e) {
    return z(e), await this.ready(), Mt(this._db, e);
  }
  async getTopFavoriteEmoji(e) {
    return Y(e), await this.ready(), (await Bt(this._db, this._custom, e)).map(F);
  }
  set customEmoji(e) {
    this._custom = ve(e);
  }
  get customEmoji() {
    return this._custom.all;
  }
  async _shutdown() {
    await this.ready();
    try {
      await this._lazyUpdate;
    } catch {
    }
  }
  // clear references to IDB, e.g. during a close event
  _clear() {
    this._db = this._ready = this._lazyUpdate = void 0;
  }
  async close() {
    await this._shutdown(), await ue(this._dbName);
  }
  async delete() {
    await this._shutdown(), await wt(this._dbName);
  }
}
const ae = [
  [-1, "✨", "custom"],
  [0, "😀", "smileys-emotion"],
  [1, "👋", "people-body"],
  [3, "🐱", "animals-nature"],
  [4, "🍎", "food-drink"],
  [5, "🏠️", "travel-places"],
  [6, "⚽", "activities"],
  [7, "📝", "objects"],
  [8, "⛔️", "symbols"],
  [9, "🏁", "flags"]
].map(([t, e, n]) => ({ id: t, emoji: e, name: n })), Z = ae.slice(1), Xt = 2, Ee = 6, Pe = typeof requestIdleCallback == "function" ? requestIdleCallback : setTimeout;
function we(t) {
  return t.unicode.includes("‍");
}
const Yt = {
  "🫨": 15.1,
  // shaking head, technically from v15 but see note above
  "🫠": 14,
  "🥲": 13.1,
  // smiling face with tear, technically from v13 but see note above
  "🥻": 12.1,
  // sari, technically from v12 but see note above
  "🥰": 11,
  "🤩": 5,
  "👱‍♀️": 4,
  "🤣": 3,
  "👁️‍🗨️": 2,
  "😀": 1,
  "😐️": 0.7,
  "😃": 0.6
}, Zt = 1e3, Jt = "🖐️", Qt = 8, en = [
  "😊",
  "😒",
  "❤️",
  "👍️",
  "😍",
  "😂",
  "😭",
  "☺️",
  "😔",
  "😩",
  "😏",
  "💕",
  "🙌",
  "😘"
], Ue = '"Twemoji Mozilla","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif', tn = (t, e) => t < e ? -1 : t > e ? 1 : 0, Te = (t, e) => {
  const n = document.createElement("canvas");
  n.width = n.height = 1;
  const i = n.getContext("2d", {
    // Improves the performance of `getImageData()`
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getContextAttributes#willreadfrequently
    willReadFrequently: !0
  });
  return i.textBaseline = "top", i.font = `100px ${Ue}`, i.fillStyle = e, i.scale(0.01, 0.01), i.fillText(t, 0, 0), i.getImageData(0, 0, 1, 1).data;
}, nn = (t, e) => {
  const n = [...t].join(","), i = [...e].join(",");
  return n === i && !n.startsWith("0,0,0,");
};
function on(t) {
  const e = Te(t, "#000"), n = Te(t, "#fff");
  return e && n && nn(e, n);
}
function rn() {
  const t = Object.entries(Yt);
  try {
    for (const [e, n] of t)
      if (on(e))
        return n;
  } catch {
  } finally {
  }
  return t[0][1];
}
let J;
const Q = () => (J || (J = new Promise((t) => Pe(() => t(rn())))), J), ce = /* @__PURE__ */ new Map(), sn = "️", an = "\uD83C", cn = "‍", ln = 127995, dn = 57339;
function un(t, e) {
  if (e === 0)
    return t;
  const n = t.indexOf(cn);
  return n !== -1 ? t.substring(0, n) + String.fromCodePoint(ln + e - 1) + t.substring(n) : (t.endsWith(sn) && (t = t.substring(0, t.length - 1)), t + an + String.fromCodePoint(dn + e - 1));
}
function I(t) {
  t.preventDefault(), t.stopPropagation();
}
function ee(t, e, n) {
  return e += t ? -1 : 1, e < 0 ? e = n.length - 1 : e >= n.length && (e = 0), e;
}
function Ge(t, e) {
  const n = /* @__PURE__ */ new Set(), i = [];
  for (const r of t) {
    const o = e(r);
    n.has(o) || (n.add(o), i.push(r));
  }
  return i;
}
function fn(t, e) {
  const n = (i) => {
    const r = {};
    for (const o of i)
      typeof o.tone == "number" && o.version <= e && (r[o.tone] = o.unicode);
    return r;
  };
  return t.map(({ unicode: i, skins: r, shortcodes: o, url: a, name: m, category: u, annotation: l }) => ({
    unicode: i,
    name: m,
    shortcodes: o,
    url: a,
    category: u,
    annotation: l,
    id: i || m,
    skins: r && n(r)
  }));
}
const K = requestAnimationFrame;
let mn = typeof ResizeObserver == "function";
function pn(t, e, n) {
  let i;
  mn ? (i = new ResizeObserver(n), i.observe(t)) : K(n), e.addEventListener("abort", () => {
    i && i.disconnect();
  });
}
function je(t) {
  {
    const e = document.createRange();
    return e.selectNode(t.firstChild), e.getBoundingClientRect().width;
  }
}
let te;
function hn(t, e, n) {
  let i = !0;
  for (const r of t) {
    const o = n(r), a = je(o);
    typeof te > "u" && (te = je(e));
    const m = a / 1.8 < te;
    ce.set(r.unicode, m), m || (i = !1);
  }
  return i;
}
function gn(t) {
  return Ge(t, (e) => e);
}
function bn(t) {
  t && (t.scrollTop = 0);
}
function R(t, e, n) {
  let i = t.get(e);
  return i || (i = n(), t.set(e, i)), i;
}
function Se(t) {
  return "" + t;
}
function yn(t) {
  const e = document.createElement("template");
  return e.innerHTML = t, e;
}
const kn = /* @__PURE__ */ new WeakMap(), vn = /* @__PURE__ */ new WeakMap(), En = Symbol("un-keyed"), wn = "replaceChildren" in Element.prototype;
function Tn(t, e) {
  wn ? t.replaceChildren(...e) : (t.innerHTML = "", t.append(...e));
}
function jn(t, e) {
  let n = t.firstChild, i = 0;
  for (; n; ) {
    if (e[i] !== n)
      return !0;
    n = n.nextSibling, i++;
  }
  return i !== e.length;
}
function Sn(t, e) {
  const { targetNode: n } = e;
  let { targetParentNode: i } = e, r = !1;
  i ? r = jn(i, t) : (r = !0, e.targetNode = void 0, e.targetParentNode = i = n.parentNode), r && Tn(i, t);
}
function xn(t, e) {
  for (const n of e) {
    const {
      targetNode: i,
      currentExpression: r,
      binding: {
        expressionIndex: o,
        attributeName: a,
        attributeValuePre: m,
        attributeValuePost: u
      }
    } = n, l = t[o];
    if (r !== l)
      if (n.currentExpression = l, a)
        i.setAttribute(a, m + Se(l) + u);
      else {
        let d;
        Array.isArray(l) ? Sn(l, n) : l instanceof Element ? (d = l, i.replaceWith(d)) : i.nodeValue = Se(l), d && (n.targetNode = d);
      }
  }
}
function Cn(t) {
  let e = "", n = !1, i = !1, r = -1;
  const o = /* @__PURE__ */ new Map(), a = [];
  for (let u = 0, l = t.length; u < l; u++) {
    const d = t[u];
    if (e += d, u === l - 1)
      break;
    for (let S = 0; S < d.length; S++)
      switch (d.charAt(S)) {
        case "<": {
          d.charAt(S + 1) === "/" ? a.pop() : (n = !0, a.push(++r));
          break;
        }
        case ">": {
          n = !1, i = !1;
          break;
        }
        case "=": {
          i = !0;
          break;
        }
      }
    const h = a[a.length - 1], f = R(o, h, () => []);
    let g, w, j;
    if (i) {
      const S = /(\S+)="?([^"=]*)$/.exec(d);
      g = S[1], w = S[2], j = /^[^">]*/.exec(t[u + 1])[0];
    }
    const _ = {
      attributeName: g,
      attributeValuePre: w,
      attributeValuePost: j,
      expressionIndex: u
    };
    f.push(_), !n && !i && (e += " ");
  }
  return {
    template: yn(e),
    elementsToBindings: o
  };
}
function _n(t, e) {
  const n = [], i = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT);
  let r = t, o = -1;
  do {
    const a = e.get(++o);
    if (a)
      for (let m = 0; m < a.length; m++) {
        const u = a[m], l = u.attributeName ? r : r.firstChild, d = {
          binding: u,
          targetNode: l,
          targetParentNode: void 0,
          currentExpression: void 0
        };
        n.push(d);
      }
  } while (r = i.nextNode());
  return n;
}
function In(t) {
  const { template: e, elementsToBindings: n } = R(kn, t, () => Cn(t)), i = e.cloneNode(!0).content.firstElementChild, r = _n(i, n);
  return function(a) {
    return xn(a, r), i;
  };
}
function An(t) {
  const e = R(vn, t, () => /* @__PURE__ */ new Map());
  let n = En;
  function i(o, ...a) {
    const m = R(e, o, () => /* @__PURE__ */ new Map());
    return R(m, n, () => In(o))(a);
  }
  function r(o, a, m) {
    return o.map((u, l) => {
      const d = n;
      n = m(u);
      try {
        return a(u, l);
      } finally {
        n = d;
      }
    });
  }
  return { map: r, html: i };
}
function Ln(t, e, n, i, r, o, a, m, u) {
  const { labelWithSkin: l, titleForEmoji: d, unicodeWithSkin: h } = n, { html: f, map: g } = An(e);
  function w(y, k, T) {
    return g(y, (x, B) => f`<button role="${k ? "option" : "menuitem"}" aria-selected="${k ? B === e.activeSearchItem : ""}" aria-label="${l(x, e.currentSkinTone)}" title="${d(x)}" class="${"emoji" + (k && B === e.activeSearchItem ? " active" : "") + (x.unicode ? "" : " custom-emoji")}" id="${`${T}-${x.id}`}" style="${x.unicode ? "" : `--custom-emoji-background: url(${JSON.stringify(x.url)})`}">${x.unicode ? h(x, e.currentSkinTone) : ""}</button>`, (x) => `${T}-${x.id}`);
  }
  const _ = f`<section data-ref="rootElement" class="picker" aria-label="${e.i18n.regionLabel}" style="${e.pickerStyle}"><div class="pad-top"></div><div class="search-row"><div class="search-wrapper"><input id="search" class="search" type="search" role="combobox" enterkeyhint="search" placeholder="${e.i18n.searchLabel}" autocapitalize="none" autocomplete="off" spellcheck="true" aria-expanded="${!!(e.searchMode && e.currentEmojis.length)}" aria-controls="search-results" aria-describedby="search-description" aria-autocomplete="list" aria-activedescendant="${e.activeSearchItemId ? `emo-${e.activeSearchItemId}` : ""}" data-ref="searchElement" data-on-input="onSearchInput" data-on-keydown="onSearchKeydown"><label class="sr-only" for="search">${e.i18n.searchLabel}</label> <span id="search-description" class="sr-only">${e.i18n.searchDescription}</span></div><div class="skintone-button-wrapper ${e.skinTonePickerExpandedAfterAnimation ? "expanded" : ""}"><button id="skintone-button" class="emoji ${e.skinTonePickerExpanded ? "hide-focus" : ""}" aria-label="${e.skinToneButtonLabel}" title="${e.skinToneButtonLabel}" aria-describedby="skintone-description" aria-haspopup="listbox" aria-expanded="${e.skinTonePickerExpanded}" aria-controls="skintone-list" data-on-click="onClickSkinToneButton">${e.skinToneButtonText}</button></div><span id="skintone-description" class="sr-only">${e.i18n.skinToneDescription}</span><div data-ref="skinToneDropdown" id="skintone-list" class="skintone-list hide-focus ${e.skinTonePickerExpanded ? "" : "hidden no-animate"}" style="transform:translateY(${e.skinTonePickerExpanded ? 0 : "calc(-1 * var(--num-skintones) * var(--total-emoji-size))"})" role="listbox" aria-label="${e.i18n.skinTonesLabel}" aria-activedescendant="skintone-${e.activeSkinTone}" aria-hidden="${!e.skinTonePickerExpanded}" tabIndex="-1" data-on-focusout="onSkinToneOptionsFocusOut" data-on-click="onSkinToneOptionsClick" data-on-keydown="onSkinToneOptionsKeydown" data-on-keyup="onSkinToneOptionsKeyup">${g(e.skinTones, (y, k) => f`<div id="skintone-${k}" class="emoji ${k === e.activeSkinTone ? "active" : ""}" aria-selected="${k === e.activeSkinTone}" role="option" title="${e.i18n.skinTones[k]}" aria-label="${e.i18n.skinTones[k]}">${y}</div>`, (y) => y)}</div></div><div class="nav" role="tablist" style="grid-template-columns:repeat(${e.groups.length},1fr)" aria-label="${e.i18n.categoriesLabel}" data-on-keydown="onNavKeydown" data-on-click="onNavClick">${g(e.groups, (y) => f`<button role="tab" class="nav-button" aria-controls="tab-${y.id}" aria-label="${e.i18n.categories[y.name]}" aria-selected="${!e.searchMode && e.currentGroup.id === y.id}" title="${e.i18n.categories[y.name]}" data-group-id="${y.id}"><div class="nav-emoji emoji">${y.emoji}</div></button>`, (y) => y.id)}</div><div class="indicator-wrapper"><div class="indicator" style="transform:translateX(${/* istanbul ignore next */
  (e.isRtl ? -1 : 1) * e.currentGroupIndex * 100}%)"></div></div><div class="message ${e.message ? "" : "gone"}" role="alert" aria-live="polite">${e.message}</div><div data-ref="tabpanelElement" class="tabpanel ${!e.databaseLoaded || e.message ? "gone" : ""}" role="${e.searchMode ? "region" : "tabpanel"}" aria-label="${e.searchMode ? e.i18n.searchResultsLabel : e.i18n.categories[e.currentGroup.name]}" id="${e.searchMode ? "" : `tab-${e.currentGroup.id}`}" tabIndex="0" data-on-click="onEmojiClick"><div data-action="calculateEmojiGridStyle">${g(e.currentEmojisWithCategories, (y, k) => f`<div><div id="menu-label-${k}" class="category ${e.currentEmojisWithCategories.length === 1 && e.currentEmojisWithCategories[0].category === "" ? "gone" : ""}" aria-hidden="true">${e.searchMode ? e.i18n.searchResultsLabel : y.category ? y.category : e.currentEmojisWithCategories.length > 1 ? e.i18n.categories.custom : e.i18n.categories[e.currentGroup.name]}</div><div class="emoji-menu ${k !== 0 && !e.searchMode && e.currentGroup.id === -1 ? "visibility-auto" : ""}" style="${`--num-rows: ${Math.ceil(y.emojis.length / e.numColumns)}`}" data-action="updateOnIntersection" role="${e.searchMode ? "listbox" : "menu"}" aria-labelledby="menu-label-${k}" id="${e.searchMode ? "search-results" : ""}">${w(
    y.emojis,
    e.searchMode,
    /* prefix */
    "emo"
  )}</div></div>`, (y) => y.category)}</div></div><div class="favorites onscreen emoji-menu ${e.message ? "gone" : ""}" role="menu" aria-label="${e.i18n.favoritesLabel}" data-on-click="onEmojiClick">${w(
    e.currentFavorites,
    /* searchMode */
    !1,
    /* prefix */
    "fav"
  )}</div><button data-ref="baselineEmoji" aria-hidden="true" tabindex="-1" class="abs-pos hidden emoji baseline-emoji">😀</button></section>`, S = (y, k) => {
    for (const T of t.querySelectorAll(`[${y}]`))
      k(T, T.getAttribute(y));
  };
  if (u) {
    t.appendChild(_);
    for (const y of ["click", "focusout", "input", "keydown", "keyup"])
      S(`data-on-${y}`, (k, T) => {
        k.addEventListener(y, i[T]);
      });
    S("data-ref", (y, k) => {
      o[k] = y;
    }), a.addEventListener("abort", () => {
      t.removeChild(_);
    });
  }
  S("data-action", (y, k) => {
    let T = m.get(k);
    T || m.set(k, T = /* @__PURE__ */ new WeakSet()), T.has(y) || (T.add(y), r[k](y));
  });
}
const H = typeof queueMicrotask == "function" ? queueMicrotask : (t) => Promise.resolve().then(t);
function On(t) {
  let e = !1, n;
  const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
  let o;
  const a = () => {
    if (e)
      return;
    const l = [...r];
    r.clear();
    try {
      for (const d of l)
        d();
    } finally {
      o = !1, r.size && (o = !0, H(a));
    }
  }, m = new Proxy({}, {
    get(l, d) {
      if (n) {
        let h = i.get(d);
        h || (h = /* @__PURE__ */ new Set(), i.set(d, h)), h.add(n);
      }
      return l[d];
    },
    set(l, d, h) {
      if (l[d] !== h) {
        l[d] = h;
        const f = i.get(d);
        if (f) {
          for (const g of f)
            r.add(g);
          o || (o = !0, H(a));
        }
      }
      return !0;
    }
  }), u = (l) => {
    const d = () => {
      const h = n;
      n = d;
      try {
        return l();
      } finally {
        n = h;
      }
    };
    return d();
  };
  return t.addEventListener("abort", () => {
    e = !0;
  }), {
    state: m,
    createEffect: u
  };
}
function ne(t, e, n) {
  if (t.length !== e.length)
    return !1;
  for (let i = 0; i < t.length; i++)
    if (!n(t[i], e[i]))
      return !1;
  return !0;
}
const xe = /* @__PURE__ */ new WeakMap();
function Dn(t, e, n) {
  {
    const i = t.closest(".tabpanel");
    let r = xe.get(i);
    r || (r = new IntersectionObserver(n, {
      root: i,
      // trigger if we are 1/2 scroll container height away so that the images load a bit quicker while scrolling
      rootMargin: "50% 0px 50% 0px",
      // trigger if any part of the emoji grid is intersecting
      threshold: 0
    }), xe.set(i, r), e.addEventListener("abort", () => {
      r.disconnect();
    })), r.observe(t);
  }
}
const oe = [], { assign: U } = Object;
function $n(t, e) {
  const n = {}, i = new AbortController(), r = i.signal, { state: o, createEffect: a } = On(r), m = /* @__PURE__ */ new Map();
  U(o, {
    skinToneEmoji: void 0,
    i18n: void 0,
    database: void 0,
    customEmoji: void 0,
    customCategorySorting: void 0,
    emojiVersion: void 0
  }), U(o, e), U(o, {
    initialLoad: !0,
    currentEmojis: [],
    currentEmojisWithCategories: [],
    rawSearchText: "",
    searchText: "",
    searchMode: !1,
    activeSearchItem: -1,
    message: void 0,
    skinTonePickerExpanded: !1,
    skinTonePickerExpandedAfterAnimation: !1,
    currentSkinTone: 0,
    activeSkinTone: 0,
    skinToneButtonText: void 0,
    pickerStyle: void 0,
    skinToneButtonLabel: "",
    skinTones: [],
    currentFavorites: [],
    defaultFavoriteEmojis: void 0,
    numColumns: Qt,
    isRtl: !1,
    currentGroupIndex: 0,
    groups: Z,
    databaseLoaded: !1,
    activeSearchItemId: void 0
  }), a(() => {
    o.currentGroup !== o.groups[o.currentGroupIndex] && (o.currentGroup = o.groups[o.currentGroupIndex]);
  });
  const u = (s) => {
    t.getElementById(s).focus();
  }, l = (s) => t.getElementById(`emo-${s.id}`), d = (s, c) => {
    n.rootElement.dispatchEvent(new CustomEvent(s, {
      detail: c,
      bubbles: !0,
      composed: !0
    }));
  }, h = (s, c) => s.id === c.id, f = (s, c) => {
    const { category: p, emojis: b } = s, { category: v, emojis: E } = c;
    return p !== v ? !1 : ne(b, E, h);
  }, g = (s) => {
    ne(o.currentEmojis, s, h) || (o.currentEmojis = s);
  }, w = (s) => {
    o.searchMode !== s && (o.searchMode = s);
  }, j = (s) => {
    ne(o.currentEmojisWithCategories, s, f) || (o.currentEmojisWithCategories = s);
  }, _ = (s, c) => c && s.skins && s.skins[c] || s.unicode, k = {
    labelWithSkin: (s, c) => gn([
      s.name || _(s, c),
      s.annotation,
      ...s.shortcodes || oe
    ].filter(Boolean)).join(", "),
    titleForEmoji: (s) => s.annotation || (s.shortcodes || oe).join(", "),
    unicodeWithSkin: _
  }, T = {
    onClickSkinToneButton: it,
    onEmojiClick: nt,
    onNavClick: et,
    onNavKeydown: tt,
    onSearchKeydown: Qe,
    onSkinToneOptionsClick: ot,
    onSkinToneOptionsFocusOut: at,
    onSkinToneOptionsKeydown: rt,
    onSkinToneOptionsKeyup: st,
    onSearchInput: ct
  }, x = {
    calculateEmojiGridStyle: He,
    updateOnIntersection: qe
  };
  let B = !0;
  a(() => {
    Ln(t, o, k, T, x, n, r, m, B), B = !1;
  }), o.emojiVersion || Q().then((s) => {
    s || (o.message = o.i18n.emojiUnsupportedMessage);
  }), a(() => {
    async function s() {
      let c = !1;
      const p = setTimeout(() => {
        c = !0, o.message = o.i18n.loadingMessage;
      }, Zt);
      try {
        await o.database.ready(), o.databaseLoaded = !0;
      } catch (b) {
        console.error(b), o.message = o.i18n.networkErrorMessage;
      } finally {
        clearTimeout(p), c && (c = !1, o.message = "");
      }
    }
    o.database && s();
  }), a(() => {
    o.pickerStyle = `
      --num-groups: ${o.groups.length}; 
      --indicator-opacity: ${o.searchMode ? 0 : 1}; 
      --num-skintones: ${Ee};`;
  }), a(() => {
    o.customEmoji && o.database && pe();
  }), a(() => {
    o.customEmoji && o.customEmoji.length ? o.groups !== ae && (o.groups = ae) : o.groups !== Z && (o.currentGroupIndex && o.currentGroupIndex--, o.groups = Z);
  }), a(() => {
    async function s() {
      o.databaseLoaded && (o.currentSkinTone = await o.database.getPreferredSkinTone());
    }
    s();
  }), a(() => {
    o.skinTones = Array(Ee).fill().map((s, c) => un(o.skinToneEmoji, c));
  }), a(() => {
    o.skinToneButtonText = o.skinTones[o.currentSkinTone];
  }), a(() => {
    o.skinToneButtonLabel = o.i18n.skinToneLabel.replace("{skinTone}", o.i18n.skinTones[o.currentSkinTone]);
  }), a(() => {
    async function s() {
      const { database: c } = o, p = (await Promise.all(en.map((b) => c.getEmojiByUnicodeOrName(b)))).filter(Boolean);
      o.defaultFavoriteEmojis = p;
    }
    o.databaseLoaded && s();
  });
  function pe() {
    const { customEmoji: s, database: c } = o, p = s || oe;
    c.customEmoji !== p && (c.customEmoji = p);
  }
  a(() => {
    async function s() {
      pe();
      const { database: c, defaultFavoriteEmojis: p, numColumns: b } = o, v = await c.getTopFavoriteEmoji(b), E = await q(Ge([
        ...v,
        ...p
      ], (C) => C.unicode || C.name).slice(0, b));
      o.currentFavorites = E;
    }
    o.databaseLoaded && o.defaultFavoriteEmojis && s();
  });
  function He(s) {
    pn(s, r, () => {
      {
        const c = getComputedStyle(n.rootElement), p = parseInt(c.getPropertyValue("--num-columns"), 10), b = c.getPropertyValue("direction") === "rtl";
        o.numColumns = p, o.isRtl = b;
      }
    });
  }
  function qe(s) {
    Dn(s, r, (c) => {
      for (const { target: p, isIntersecting: b } of c)
        p.classList.toggle("onscreen", b);
    });
  }
  a(() => {
    async function s() {
      const { searchText: c, currentGroup: p, databaseLoaded: b, customEmoji: v } = o;
      if (!b)
        o.currentEmojis = [], o.searchMode = !1;
      else if (c.length >= Xt) {
        const E = await Je(c);
        o.searchText === c && (g(E), w(!0));
      } else {
        const { id: E } = p;
        if (E !== -1 || v && v.length) {
          const C = await Ze(E);
          o.currentGroup.id === E && (g(C), w(!1));
        }
      }
    }
    s();
  });
  const he = () => {
    K(() => bn(n.tabpanelElement));
  };
  a(() => {
    const { currentEmojis: s, emojiVersion: c } = o, p = s.filter((b) => b.unicode).filter((b) => we(b) && !ce.has(b.unicode));
    if (!c && p.length)
      g(s), K(() => Xe(p));
    else {
      const b = c ? s : s.filter(Ye);
      g(b), he();
    }
  });
  function Xe(s) {
    hn(s, n.baselineEmoji, l) ? he() : o.currentEmojis = [...o.currentEmojis];
  }
  function Ye(s) {
    return !s.unicode || !we(s) || ce.get(s.unicode);
  }
  async function ge(s) {
    const c = o.emojiVersion || await Q();
    return s.filter(({ version: p }) => !p || p <= c);
  }
  async function q(s) {
    return fn(s, o.emojiVersion || await Q());
  }
  async function Ze(s) {
    const c = s === -1 ? o.customEmoji : await o.database.getEmojiByGroup(s);
    return q(await ge(c));
  }
  async function Je(s) {
    return q(await ge(await o.database.getEmojiBySearchQuery(s)));
  }
  a(() => {
  }), a(() => {
    function s() {
      const { searchMode: p, currentEmojis: b } = o;
      if (p)
        return [
          {
            category: "",
            emojis: b
          }
        ];
      const v = /* @__PURE__ */ new Map();
      for (const E of b) {
        const C = E.category || "";
        let N = v.get(C);
        N || (N = [], v.set(C, N)), N.push(E);
      }
      return [...v.entries()].map(([E, C]) => ({ category: E, emojis: C })).sort((E, C) => o.customCategorySorting(E.category, C.category));
    }
    const c = s();
    j(c);
  }), a(() => {
    o.activeSearchItemId = o.activeSearchItem !== -1 && o.currentEmojis[o.activeSearchItem].id;
  }), a(() => {
    const { rawSearchText: s } = o;
    Pe(() => {
      o.searchText = (s || "").trim(), o.activeSearchItem = -1;
    });
  });
  function Qe(s) {
    if (!o.searchMode || !o.currentEmojis.length)
      return;
    const c = (p) => {
      I(s), o.activeSearchItem = ee(p, o.activeSearchItem, o.currentEmojis);
    };
    switch (s.key) {
      case "ArrowDown":
        return c(!1);
      case "ArrowUp":
        return c(!0);
      case "Enter":
        if (o.activeSearchItem === -1)
          o.activeSearchItem = 0;
        else
          return I(s), be(o.currentEmojis[o.activeSearchItem].id);
    }
  }
  function et(s) {
    const { target: c } = s, p = c.closest(".nav-button");
    if (!p)
      return;
    const b = parseInt(p.dataset.groupId, 10);
    n.searchElement.value = "", o.rawSearchText = "", o.searchText = "", o.activeSearchItem = -1, o.currentGroupIndex = o.groups.findIndex((v) => v.id === b);
  }
  function tt(s) {
    const { target: c, key: p } = s, b = (v) => {
      v && (I(s), v.focus());
    };
    switch (p) {
      case "ArrowLeft":
        return b(c.previousElementSibling);
      case "ArrowRight":
        return b(c.nextElementSibling);
      case "Home":
        return b(c.parentElement.firstElementChild);
      case "End":
        return b(c.parentElement.lastElementChild);
    }
  }
  async function be(s) {
    const c = await o.database.getEmojiByUnicodeOrName(s), p = [...o.currentEmojis, ...o.currentFavorites].find((v) => v.id === s), b = p.unicode && _(p, o.currentSkinTone);
    await o.database.incrementFavoriteEmojiCount(s), d("emoji-click", {
      emoji: c,
      skinTone: o.currentSkinTone,
      ...b && { unicode: b },
      ...p.name && { name: p.name }
    });
  }
  async function nt(s) {
    const { target: c } = s;
    if (!c.classList.contains("emoji"))
      return;
    I(s);
    const p = c.id.substring(4);
    be(p);
  }
  function X(s) {
    o.currentSkinTone = s, o.skinTonePickerExpanded = !1, u("skintone-button"), d("skin-tone-change", { skinTone: s }), o.database.setPreferredSkinTone(s);
  }
  function ot(s) {
    const { target: { id: c } } = s, p = c && c.match(/^skintone-(\d)/);
    if (!p)
      return;
    I(s);
    const b = parseInt(p[1], 10);
    X(b);
  }
  function it(s) {
    o.skinTonePickerExpanded = !o.skinTonePickerExpanded, o.activeSkinTone = o.currentSkinTone, o.skinTonePickerExpanded && (I(s), K(() => u("skintone-list")));
  }
  a(() => {
    o.skinTonePickerExpanded ? n.skinToneDropdown.addEventListener("transitionend", () => {
      o.skinTonePickerExpandedAfterAnimation = !0;
    }, { once: !0 }) : o.skinTonePickerExpandedAfterAnimation = !1;
  });
  function rt(s) {
    if (!o.skinTonePickerExpanded)
      return;
    const c = async (p) => {
      I(s), o.activeSkinTone = p;
    };
    switch (s.key) {
      case "ArrowUp":
        return c(ee(!0, o.activeSkinTone, o.skinTones));
      case "ArrowDown":
        return c(ee(!1, o.activeSkinTone, o.skinTones));
      case "Home":
        return c(0);
      case "End":
        return c(o.skinTones.length - 1);
      case "Enter":
        return I(s), X(o.activeSkinTone);
      case "Escape":
        return I(s), o.skinTonePickerExpanded = !1, u("skintone-button");
    }
  }
  function st(s) {
    if (o.skinTonePickerExpanded)
      switch (s.key) {
        case " ":
          return I(s), X(o.activeSkinTone);
      }
  }
  async function at(s) {
    const { relatedTarget: c } = s;
    (!c || c.id !== "skintone-list") && (o.skinTonePickerExpanded = !1);
  }
  function ct(s) {
    o.rawSearchText = s.target.value;
  }
  return {
    $set(s) {
      U(o, s);
    },
    $destroy() {
      i.abort();
    }
  };
}
const Mn = "https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json", Bn = "en";
var Fn = {
  categoriesLabel: "Categories",
  emojiUnsupportedMessage: "Your browser does not support color emoji.",
  favoritesLabel: "Favorites",
  loadingMessage: "Loading…",
  networkErrorMessage: "Could not load emoji.",
  regionLabel: "Emoji picker",
  searchDescription: "When search results are available, press up or down to select and enter to choose.",
  searchLabel: "Search",
  searchResultsLabel: "Search results",
  skinToneDescription: "When expanded, press up or down to select and enter to choose.",
  skinToneLabel: "Choose a skin tone (currently {skinTone})",
  skinTonesLabel: "Skin tones",
  skinTones: [
    "Default",
    "Light",
    "Medium-Light",
    "Medium",
    "Medium-Dark",
    "Dark"
  ],
  categories: {
    custom: "Custom",
    "smileys-emotion": "Smileys and emoticons",
    "people-body": "People and body",
    "animals-nature": "Animals and nature",
    "food-drink": "Food and drink",
    "travel-places": "Travel and places",
    activities: "Activities",
    objects: "Objects",
    symbols: "Symbols",
    flags: "Flags"
  }
}, Rn = ':host{--emoji-size:1.375rem;--emoji-padding:0.5rem;--category-emoji-size:var(--emoji-size);--category-emoji-padding:var(--emoji-padding);--indicator-height:3px;--input-border-radius:0.5rem;--input-border-size:1px;--input-font-size:1rem;--input-line-height:1.5;--input-padding:0.25rem;--num-columns:8;--outline-size:2px;--border-size:1px;--border-radius:0;--skintone-border-radius:1rem;--category-font-size:1rem;display:flex;width:min-content;height:400px}:host,:host(.light){color-scheme:light;--background:#fff;--border-color:#e0e0e0;--indicator-color:#385ac1;--input-border-color:#999;--input-font-color:#111;--input-placeholder-color:#999;--outline-color:#999;--category-font-color:#111;--button-active-background:#e6e6e6;--button-hover-background:#d9d9d9}:host(.dark){color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}@media (prefers-color-scheme:dark){:host{color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}}:host([hidden]){display:none}button{margin:0;padding:0;border:0;background:0 0;box-shadow:none;-webkit-tap-highlight-color:transparent}button::-moz-focus-inner{border:0}input{padding:0;margin:0;line-height:1.15;font-family:inherit}input[type=search]{-webkit-appearance:none}:focus{outline:var(--outline-color) solid var(--outline-size);outline-offset:calc(-1*var(--outline-size))}:host([data-js-focus-visible]) :focus:not([data-focus-visible-added]){outline:0}:focus:not(:focus-visible){outline:0}.hide-focus{outline:0}*{box-sizing:border-box}.picker{contain:content;display:flex;flex-direction:column;background:var(--background);border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);width:100%;height:100%;overflow:hidden;--total-emoji-size:calc(var(--emoji-size) + (2 * var(--emoji-padding)));--total-category-emoji-size:calc(var(--category-emoji-size) + (2 * var(--category-emoji-padding)))}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.hidden{opacity:0;pointer-events:none}.abs-pos{position:absolute;left:0;top:0}.gone{display:none!important}.skintone-button-wrapper,.skintone-list{background:var(--background);z-index:3}.skintone-button-wrapper.expanded{z-index:1}.skintone-list{position:absolute;inset-inline-end:0;top:0;z-index:2;overflow:visible;border-bottom:var(--border-size) solid var(--border-color);border-radius:0 0 var(--skintone-border-radius) var(--skintone-border-radius);will-change:transform;transition:transform .2s ease-in-out;transform-origin:center 0}@media (prefers-reduced-motion:reduce){.skintone-list{transition-duration:.001s}}@supports not (inset-inline-end:0){.skintone-list{right:0}}.skintone-list.no-animate{transition:none}.tabpanel{overflow-y:auto;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;will-change:transform;min-height:0;flex:1;contain:content}.emoji-menu{display:grid;grid-template-columns:repeat(var(--num-columns),var(--total-emoji-size));justify-content:space-around;align-items:flex-start;width:100%}.emoji-menu.visibility-auto{content-visibility:auto;contain-intrinsic-size:calc(var(--num-columns)*var(--total-emoji-size)) calc(var(--num-rows)*var(--total-emoji-size))}.category{padding:var(--emoji-padding);font-size:var(--category-font-size);color:var(--category-font-color)}.emoji,button.emoji{font-size:var(--emoji-size);display:flex;align-items:center;justify-content:center;border-radius:100%;height:var(--total-emoji-size);width:var(--total-emoji-size);line-height:1;overflow:hidden;font-family:var(--emoji-font-family);cursor:pointer}@media (hover:hover) and (pointer:fine){.emoji:hover,button.emoji:hover{background:var(--button-hover-background)}}.emoji.active,.emoji:active,button.emoji.active,button.emoji:active{background:var(--button-active-background)}.onscreen .custom-emoji::after{content:"";width:var(--emoji-size);height:var(--emoji-size);background-repeat:no-repeat;background-position:center center;background-size:contain;background-image:var(--custom-emoji-background)}.nav,.nav-button{align-items:center}.nav{display:grid;justify-content:space-between;contain:content}.nav-button{display:flex;justify-content:center}.nav-emoji{font-size:var(--category-emoji-size);width:var(--total-category-emoji-size);height:var(--total-category-emoji-size)}.indicator-wrapper{display:flex;border-bottom:1px solid var(--border-color)}.indicator{width:calc(100%/var(--num-groups));height:var(--indicator-height);opacity:var(--indicator-opacity);background-color:var(--indicator-color);will-change:transform,opacity;transition:opacity .1s linear,transform .25s ease-in-out}@media (prefers-reduced-motion:reduce){.indicator{will-change:opacity;transition:opacity .1s linear}}.pad-top,input.search{background:var(--background);width:100%}.pad-top{height:var(--emoji-padding);z-index:3}.search-row{display:flex;align-items:center;position:relative;padding-inline-start:var(--emoji-padding);padding-bottom:var(--emoji-padding)}.search-wrapper{flex:1;min-width:0}input.search{padding:var(--input-padding);border-radius:var(--input-border-radius);border:var(--input-border-size) solid var(--input-border-color);color:var(--input-font-color);font-size:var(--input-font-size);line-height:var(--input-line-height)}input.search::placeholder{color:var(--input-placeholder-color)}.favorites{overflow-y:auto;scrollbar-gutter:stable;display:flex;flex-direction:row;border-top:var(--border-size) solid var(--border-color);contain:content}.message{padding:var(--emoji-padding)}';
const Ke = [
  "customEmoji",
  "customCategorySorting",
  "database",
  "dataSource",
  "i18n",
  "locale",
  "skinToneEmoji",
  "emojiVersion"
], Nn = `:host{--emoji-font-family:${Ue}}`;
class We extends HTMLElement {
  constructor(e) {
    super(), this.attachShadow({ mode: "open" });
    const n = document.createElement("style");
    n.textContent = Rn + Nn, this.shadowRoot.appendChild(n), this._ctx = {
      // Set defaults
      locale: Bn,
      dataSource: Mn,
      skinToneEmoji: Jt,
      customCategorySorting: tn,
      customEmoji: null,
      i18n: Fn,
      emojiVersion: null,
      ...e
    };
    for (const i of Ke)
      i !== "database" && Object.prototype.hasOwnProperty.call(this, i) && (this._ctx[i] = this[i], delete this[i]);
    this._dbFlush();
  }
  connectedCallback() {
    this._cmp || (this._cmp = $n(this.shadowRoot, this._ctx));
  }
  disconnectedCallback() {
    H(() => {
      if (!this.isConnected && this._cmp) {
        this._cmp.$destroy(), this._cmp = void 0;
        const { database: e } = this._ctx;
        e.close().catch((n) => console.error(n));
      }
    });
  }
  static get observedAttributes() {
    return ["locale", "data-source", "skin-tone-emoji", "emoji-version"];
  }
  attributeChangedCallback(e, n, i) {
    this._set(
      // convert from kebab-case to camelcase
      // see https://github.com/sveltejs/svelte/issues/3852#issuecomment-665037015
      e.replace(/-([a-z])/g, (r, o) => o.toUpperCase()),
      // convert string attribute to float if necessary
      e === "emoji-version" ? parseFloat(i) : i
    );
  }
  _set(e, n) {
    this._ctx[e] = n, this._cmp && this._cmp.$set({ [e]: n }), ["locale", "dataSource"].includes(e) && this._dbFlush();
  }
  _dbCreate() {
    const { locale: e, dataSource: n, database: i } = this._ctx;
    (!i || i.locale !== e || i.dataSource !== n) && this._set("database", new qt({ locale: e, dataSource: n }));
  }
  // Update the Database in one microtask if the locale/dataSource change. We do one microtask
  // so we don't create two Databases if e.g. both the locale and the dataSource change
  _dbFlush() {
    H(() => this._dbCreate());
  }
}
const Ve = {};
for (const t of Ke)
  Ve[t] = {
    get() {
      return t === "database" && this._dbCreate(), this._ctx[t];
    },
    set(e) {
      if (t === "database")
        throw new Error("database is read-only");
      this._set(t, e);
    }
  };
Object.defineProperties(We.prototype, Ve);
customElements.get("emoji-picker") || customElements.define("emoji-picker", We);
