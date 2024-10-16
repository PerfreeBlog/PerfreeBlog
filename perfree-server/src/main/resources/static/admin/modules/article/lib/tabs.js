const p = window.Pinia.defineStore;
p({
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
function f(e, t) {
  if (arguments.length === 0 || !e)
    return null;
  const i = t || "{y}-{m}-{d} {h}:{i}:{s}";
  let n;
  typeof e == "object" ? n = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), n = new Date(e));
  const a = {
    y: n.getFullYear(),
    m: n.getMonth() + 1,
    d: n.getDate(),
    h: n.getHours(),
    i: n.getMinutes(),
    s: n.getSeconds(),
    a: n.getDay()
  };
  return i.replace(/{([ymdhisa])+}/g, (o, r) => {
    let s = a[r];
    return r === "a" ? ["日", "一", "二", "三", "四", "五", "六"][s] : (o.length > 0 && s < 10 && (s = "0" + s), s || 0);
  });
}
function g(e, t, i, n, a) {
  t = t || "id", i = i || "parentId", a = a || Math.min.apply(Math, e.map((r) => r[i])) || 0;
  const l = JSON.parse(JSON.stringify(e)), o = l.filter((r) => {
    let s = l.filter((c) => r[t] === c[i]);
    return s.length > 0 && (r.children = s), r[i] === a;
  });
  return o.length === 0 && e.length > 0 ? e : o.length > 0 ? o : e;
}
function d(e) {
  return window.document.body.clientWidth < e ? window.document.body.clientWidth : e;
}
const m = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [n, a] of t)
    i[n] = a;
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
function I(e) {
  return axios.put("/api/auth/article/updateVisibility", e);
}
function C(e) {
  return axios.post("/api/auth/article/updateStatus", e);
}
function O(e) {
  return axios.delete("/api/auth/article/del?id=" + e);
}
function R(e) {
  return axios.get("/api/auth/article/get?id=" + e);
}
function v(e) {
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
let u = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function S(e, t, i) {
  e && u.findIndex((a) => a.path === t) < 0 && u.push({
    name: e,
    hasClose: !0,
    path: t,
    currActive: !1
  }), router.push({
    path: t,
    params: i
  });
}
function U(e) {
  let t = u.findIndex((i) => i.path === e);
  t >= 0 && u.splice(t, 1);
}
export {
  m as _,
  U as a,
  y as b,
  A as c,
  d,
  R as e,
  x as f,
  b as g,
  g as h,
  O as i,
  T as j,
  w as k,
  I as l,
  C as m,
  f as p,
  S as t,
  v as u
};
