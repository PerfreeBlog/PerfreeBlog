const c = window.Pinia.defineStore;
c({
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
function f(e, t) {
  if (arguments.length === 0 || !e)
    return null;
  const n = t || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof e == "object" ? i = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), i = new Date(e));
  const s = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return n.replace(/{([ymdhisa])+}/g, (o, a) => {
    let r = s[a];
    return a === "a" ? ["日", "一", "二", "三", "四", "五", "六"][r] : (o.length > 0 && r < 10 && (r = "0" + r), r || 0);
  });
}
function d(e, t, n, i, s) {
  t = t || "id", n = n || "parentId", s = s || Math.min.apply(Math, e.map((a) => a[n])) || 0;
  const l = JSON.parse(JSON.stringify(e)), o = l.filter((a) => {
    let r = l.filter((h) => a[t] === h[n]);
    return r.length > 0 && (a.children = r), a[n] === s;
  });
  return o !== "" ? o : e;
}
function p(e) {
  return axios.post("/api/auth/codegen/getTableList", e);
}
function b(e) {
  return axios.post("/api/auth/codegen/create-list", e);
}
function m(e) {
  return axios.post("/api/auth/codegen/codegenTablePage", e);
}
function T(e) {
  return axios.get("/api/auth/codegen/getCodegenInfoByTableId?tableId=" + e);
}
function y(e) {
  return axios.post("/api/auth/codegen/saveConfig", e);
}
const g = window.Pinia.defineStore;
g({
  id: "app",
  state: () => ({
    activeTab: null,
    // 主题
    theme: null,
    // 主题色
    primaryColor: null,
    // 顶栏通色
    headerUnified: null,
    // 是否开启tab栏
    tabOpen: null,
    // 刷新路由标识
    refreshRouteflag: !1,
    // 路由动画
    routeAnimation: null
  }),
  getters: {
    getActiveTab() {
      return this.activeTab;
    },
    getTheme() {
      return this.theme;
    },
    getPrimaryColor() {
      return this.primaryColor;
    },
    getHeaderUnified() {
      return this.headerUnified;
    },
    getTabOpen() {
      return this.tabOpen;
    },
    getRefreshRouteflag() {
      return this.refreshRouteflag;
    },
    getRouteAnimation() {
      return this.routeAnimation;
    }
  },
  actions: {
    setActiveTab(e) {
      this.activeTab = e;
    },
    setTheme(e) {
      this.theme = e;
    },
    setPrimaryColor(e) {
      this.primaryColor = e;
    },
    setHeaderUnified(e) {
      this.headerUnified = e;
    },
    setTabOpen(e) {
      this.tabOpen = e;
    },
    setRefreshRouteflag(e) {
      this.refreshRouteflag = e;
    },
    setRouteAnimation(e) {
      this.routeAnimation = e;
    }
  },
  persist: {
    enabled: !0
    //开启本地存储
  }
});
let u = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function C(e, t, n) {
  e && u.findIndex((s) => s.path === t) < 0 && u.push({
    name: e,
    hasClose: !0,
    path: t,
    currActive: !1
  }), router.push({
    path: t,
    query: n
  });
}
function x(e) {
  let t = u.findIndex((n) => n.path === e);
  t >= 0 && u.splice(t, 1);
}
export {
  m as a,
  p as b,
  x as c,
  b as d,
  T as g,
  d as h,
  f as p,
  y as s,
  C as t
};
