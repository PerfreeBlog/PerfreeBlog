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
function h(e, i) {
  if (arguments.length === 0 || !e)
    return null;
  const n = i || "{y}-{m}-{d} {h}:{i}:{s}";
  let t;
  typeof e == "object" ? t = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), t = new Date(e));
  const a = {
    y: t.getFullYear(),
    m: t.getMonth() + 1,
    d: t.getDate(),
    h: t.getHours(),
    i: t.getMinutes(),
    s: t.getSeconds(),
    a: t.getDay()
  };
  return n.replace(/{([ymdhisa])+}/g, (u, o) => {
    let r = a[o];
    return o === "a" ? ["日", "一", "二", "三", "四", "五", "六"][r] : (u.length > 0 && r < 10 && (r = "0" + r), r || 0);
  });
}
function d(e) {
  return window.document.body.clientWidth < e ? window.document.body.clientWidth : e;
}
const f = (e, i) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of i)
    n[t] = a;
  return n;
};
function g(e) {
  return axios.post("/api/auth/page/createArticle", e);
}
function m(e) {
  return axios.post("/api/auth/article/page", e);
}
function A(e) {
  return axios.post("/api/auth/page/updateIsComment", e);
}
function b(e) {
  return axios.post("/api/auth/page/updateIsTop", e);
}
function x(e) {
  return axios.post("/api/auth/page/updateStatus", e);
}
function I(e) {
  return axios.delete("/api/auth/page/del?id=" + e);
}
function w(e) {
  return axios.get("/api/auth/article/get?id=" + e);
}
function y(e) {
  return axios.put("/api/auth/page/updateArticle", e);
}
const l = window.Pinia.defineStore;
l({
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
let s = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function T(e, i, n) {
  e && s.findIndex((a) => a.path === i) < 0 && s.push({
    name: e,
    hasClose: !0,
    path: i,
    currActive: !1
  }), router.push({
    path: i,
    params: n
  });
}
function C(e) {
  let i = s.findIndex((n) => n.path === e);
  i >= 0 && s.splice(i, 1);
}
export {
  f as _,
  g as a,
  w as b,
  C as c,
  d,
  m as e,
  I as f,
  A as g,
  b as h,
  x as i,
  h as p,
  T as t,
  y as u
};
