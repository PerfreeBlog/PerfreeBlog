const l = window.Pinia.defineStore;
l({
  id: "common",
  state: () => ({
    menuInit: !1,
    optionInit: !1,
    menuList: [],
    cachedViews: []
  }),
  getters: {
    getMenuInit() {
      return this.menuInit;
    },
    getOptionInit() {
      return this.optionInit;
    },
    getMenuList() {
      return this.menuList;
    },
    getCachedViews() {
      return this.cachedViews;
    }
  },
  actions: {
    setMenuInit(t) {
      this.menuInit = t;
    },
    setOptionInit(t) {
      this.optionInit = t;
    },
    setMenuList(t) {
      this.menuList = t;
    },
    setCachedViews(t) {
      this.cachedViews = t;
    }
  },
  persist: {
    enabled: !1
  }
});
function a(t, n, e, o, i) {
  n = n || "id", e = e || "parentId", i = i || Math.min.apply(Math, t.map((s) => s[e])) || 0;
  const c = JSON.parse(JSON.stringify(t)), r = c.filter((s) => {
    let h = c.filter((u) => s[n] === u[e]);
    return h.length > 0 && (s.children = h), s[e] === i;
  });
  return r.length === 0 && t.length > 0 ? t : r.length > 0 ? r : t;
}
function d(t) {
  return window.document.body.clientWidth < t ? window.document.body.clientWidth : t;
}
const g = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [o, i] of n)
    e[o] = i;
  return e;
};
export {
  g as _,
  d,
  a as h
};
