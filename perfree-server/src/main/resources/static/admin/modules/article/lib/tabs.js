const p = window.Pinia.defineStore;
p({
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
  const i = t || "{y}-{m}-{d} {h}:{i}:{s}";
  let a;
  typeof e == "object" ? a = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), a = new Date(e));
  const n = {
    y: a.getFullYear(),
    m: a.getMonth() + 1,
    d: a.getDate(),
    h: a.getHours(),
    i: a.getMinutes(),
    s: a.getSeconds(),
    a: a.getDay()
  };
  return i.replace(/{([ymdhisa])+}/g, (u, r) => {
    let s = n[r];
    return r === "a" ? ["日", "一", "二", "三", "四", "五", "六"][s] : (u.length > 0 && s < 10 && (s = "0" + s), s || 0);
  });
}
function d(e, t, i, a, n) {
  t = t || "id", i = i || "parentId", n = n || Math.min.apply(Math, e.map((r) => r[i])) || 0;
  const l = JSON.parse(JSON.stringify(e)), u = l.filter((r) => {
    let s = l.filter((c) => r[t] === c[i]);
    return s.length > 0 && (r.children = s), r[i] === n;
  });
  return u.length === 0 && e.length > 0 ? e : u.length > 0 ? u : e;
}
function g(e) {
  return window.document.body.clientWidth < e ? window.document.body.clientWidth : e;
}
const m = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [a, n] of t)
    i[a] = n;
  return i;
};
function A(e) {
  return axios.post("/api/auth/category/listTree", e);
}
function b() {
  return axios.get("/api/auth/tag/getAllTag");
}
function y(e) {
  return axios.post("/api/auth/article/createArticle", e);
}
function x(e) {
  return axios.post("/api/auth/article/page", e);
}
function T(e) {
  return axios.post("/api/auth/article/updateIsComment", e);
}
function w(e) {
  return axios.post("/api/auth/article/updateIsTop", e);
}
function C(e) {
  return axios.put("/api/auth/article/updateVisibility", e);
}
function R(e) {
  return axios.post("/api/auth/article/updateStatus", e);
}
function v(e) {
  return axios.delete("/api/auth/article/del?id=" + e);
}
function S(e) {
  return axios.get("/api/auth/article/get?id=" + e);
}
function O(e) {
  return axios.put("/api/auth/article/updateArticle", e);
}
const h = window.Pinia.defineStore;
h({
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
let o = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function U(e, t, i) {
  e && o.findIndex((n) => n.path === t) < 0 && o.push({
    name: e,
    hasClose: !0,
    path: t,
    currActive: !1
  }), router.push({
    path: t,
    params: i
  });
}
function M(e) {
  let t = o.findIndex((i) => i.path === e);
  t >= 0 && o.splice(t, 1);
}
export {
  m as _,
  M as a,
  y as b,
  A as c,
  g as d,
  S as e,
  x as f,
  b as g,
  d as h,
  v as i,
  T as j,
  w as k,
  C as l,
  R as m,
  f as p,
  U as t,
  O as u
};
