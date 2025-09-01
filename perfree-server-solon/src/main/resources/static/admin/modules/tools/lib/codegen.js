const c = window.Pinia.defineStore;
c({
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
function l(e, o) {
  if (arguments.length === 0 || !e)
    return null;
  const s = o || "{y}-{m}-{d} {h}:{i}:{s}";
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
  return s.replace(/{([ymdhisa])+}/g, (r, n) => {
    let i = a[n];
    return n === "a" ? ["日", "一", "二", "三", "四", "五", "六"][i] : (r.length > 0 && i < 10 && (i = "0" + i), i || 0);
  });
}
function d(e, o, s, t, a) {
  o = o || "id", s = s || "parentId", a = a || Math.min.apply(Math, e.map((n) => n[s])) || 0;
  const g = JSON.parse(JSON.stringify(e)), r = g.filter((n) => {
    let i = g.filter((u) => n[o] === u[s]);
    return i.length > 0 && (n.children = i), n[s] === a;
  });
  return r.length === 0 && e.length > 0 ? e : r.length > 0 ? r : e;
}
function h(e) {
  return axios.post("/api/auth/codegen/getTableList", e);
}
function p(e) {
  return axios.post("/api/auth/codegen/create-list", e);
}
function f(e) {
  return axios.post("/api/auth/codegen/codegenTablePage", e);
}
function b(e) {
  return axios.get("/api/auth/codegen/getCodegenInfoByTableId?tableId=" + e);
}
function C(e) {
  return axios.post("/api/auth/codegen/saveConfig", e);
}
function w(e) {
  return axios.get("/api/auth/codegen/getCodeFileList?tableId=" + e);
}
function x(e) {
  return axios.post("/api/auth/codegen/getCodeFileContent", e);
}
function y(e) {
  return axios.delete("/api/auth/codegen/del?id=" + e);
}
function I(e) {
  return axios.get("/api/auth/codegen/download?id=" + e, { responseType: "blob" });
}
export {
  x as a,
  b,
  f as c,
  h as d,
  p as e,
  y as f,
  w as g,
  d as h,
  I as i,
  l as p,
  C as s
};
