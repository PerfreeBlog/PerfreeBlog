const f = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [i, s] of a)
    t[i] = s;
  return t;
};
function g(e) {
  return axios.post("/api/auth/category/listTree", e);
}
function d() {
  return axios.get("/api/auth/tag/getAllTag");
}
function m(e) {
  return axios.post("/api/auth/article/createArticle", e);
}
function A(e) {
  return axios.post("/api/auth/article/page", e);
}
function b(e) {
  return axios.post("/api/auth/article/updateIsComment", e);
}
function T(e) {
  return axios.post("/api/auth/article/updateIsTop", e);
}
function y(e) {
  return axios.post("/api/auth/article/updateStatus", e);
}
function x(e) {
  return axios.delete("/api/auth/article/del?id=" + e);
}
const h = window.Pinia.defineStore;
h({
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
function w(e, a) {
  if (arguments.length === 0 || !e)
    return null;
  const t = a || "{y}-{m}-{d} {h}:{i}:{s}";
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
  return t.replace(/{([ymdhisa])+}/g, (o, n) => {
    let r = s[n];
    return n === "a" ? ["日", "一", "二", "三", "四", "五", "六"][r] : (o.length > 0 && r < 10 && (r = "0" + r), r || 0);
  });
}
function R(e, a, t, i, s) {
  a = a || "id", t = t || "parentId", s = s || Math.min.apply(Math, e.map((n) => n[t])) || 0;
  const u = JSON.parse(JSON.stringify(e)), o = u.filter((n) => {
    let r = u.filter((c) => n[a] === c[t]);
    return r.length > 0 && (n.children = r), n[t] === s;
  });
  return o !== "" ? o : e;
}
const p = window.Pinia.defineStore;
p({
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
let l = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function C(e, a, t) {
  router.push({
    path: a,
    query: t
  });
}
function S(e) {
  let a = l.findIndex((t) => t.path === e);
  a >= 0 && l.splice(a, 1);
}
export {
  f as _,
  m as a,
  S as b,
  g as c,
  A as d,
  x as e,
  b as f,
  d as g,
  R as h,
  T as i,
  y as j,
  w as p,
  C as t
};
