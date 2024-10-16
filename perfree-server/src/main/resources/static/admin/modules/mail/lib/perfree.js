const u = window.Pinia.defineStore;
u({
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
    setMenuInit(e) {
      this.menuInit = e;
    },
    setOptionInit(e) {
      this.optionInit = e;
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
function d(e, s) {
  if (arguments.length === 0 || !e)
    return null;
  const r = s || "{y}-{m}-{d} {h}:{i}:{s}";
  let t;
  typeof e == "object" ? t = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), t = new Date(e));
  const o = {
    y: t.getFullYear(),
    m: t.getMonth() + 1,
    d: t.getDate(),
    h: t.getHours(),
    i: t.getMinutes(),
    s: t.getSeconds(),
    a: t.getDay()
  };
  return r.replace(/{([ymdhisa])+}/g, (a, i) => {
    let n = o[i];
    return i === "a" ? ["日", "一", "二", "三", "四", "五", "六"][n] : (a.length > 0 && n < 10 && (n = "0" + n), n || 0);
  });
}
function g(e) {
  return window.document.body.clientWidth < e ? window.document.body.clientWidth : e;
}
export {
  g as d,
  d as p
};
