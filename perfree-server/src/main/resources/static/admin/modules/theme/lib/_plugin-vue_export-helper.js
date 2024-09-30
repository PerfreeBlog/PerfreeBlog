const l = window.Pinia.defineStore;
l({
  id: "common",
  state: () => ({
    menuInit: !1,
    menuList: [],
    cachedViews: []
  }),
  getters: {
    getMenuInit() {
      return this.menuInit;
    },
    getMenuList() {
      return this.menuList;
    },
    getCachedViews() {
      return this.cachedViews;
    }
  },
  actions: {
    setMenuInit(e) {
      this.menuInit = e;
    },
    setMenuList(e) {
      this.menuList = e;
    },
    setCachedViews(e) {
      this.cachedViews = e;
    }
  },
  persist: {
    enabled: !1
  }
});
function a(e, n, t, c, i) {
  n = n || "id", t = t || "parentId", i = i || Math.min.apply(Math, e.map((s) => s[t])) || 0;
  const u = JSON.parse(JSON.stringify(e)), r = u.filter((s) => {
    let h = u.filter((o) => s[n] === o[t]);
    return h.length > 0 && (s.children = h), s[t] === i;
  });
  return r.length === 0 && e.length > 0 ? e : r.length > 0 ? r : e;
}
function d(e) {
  return window.document.body.clientWidth < e ? window.document.body.clientWidth : e;
}
const m = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [c, i] of n)
    t[c] = i;
  return t;
};
export {
  m as _,
  d,
  a as h
};
