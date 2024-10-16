function g(t) {
  return axios.post("/api/auth/attachConfig/page", t);
}
function h(t) {
  return axios.post("/api/auth/attachConfig/add", t);
}
function p(t) {
  return axios.put("/api/auth/attachConfig/update", t);
}
function f(t) {
  return axios.get("/api/auth/attachConfig/get?id=" + t);
}
function d(t) {
  return axios.put("/api/auth/attachConfig/updateMaster", t);
}
function l(t) {
  return axios.delete("/api/auth/attachConfig/del?id=" + t);
}
function C() {
  return axios.get("/api/auth/attachConfig/getAll");
}
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
function w(t, a) {
  if (arguments.length === 0 || !t)
    return null;
  const s = a || "{y}-{m}-{d} {h}:{i}:{s}";
  let e;
  typeof t == "object" ? e = t : (typeof t == "string" && /^[0-9]+$/.test(t) ? t = parseInt(t) : typeof t == "string" && (t = t.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof t == "number" && t.toString().length === 10 && (t = t * 1e3), e = new Date(t));
  const o = {
    y: e.getFullYear(),
    m: e.getMonth() + 1,
    d: e.getDate(),
    h: e.getHours(),
    i: e.getMinutes(),
    s: e.getSeconds(),
    a: e.getDay()
  };
  return s.replace(/{([ymdhisa])+}/g, (r, i) => {
    let n = o[i];
    return i === "a" ? ["日", "一", "二", "三", "四", "五", "六"][n] : (r.length > 0 && n < 10 && (n = "0" + n), n || 0);
  });
}
function A(t) {
  return window.document.body.clientWidth < t ? window.document.body.clientWidth : t;
}
export {
  g as a,
  p as b,
  h as c,
  A as d,
  l as e,
  d as f,
  f as g,
  C as h,
  w as p
};
