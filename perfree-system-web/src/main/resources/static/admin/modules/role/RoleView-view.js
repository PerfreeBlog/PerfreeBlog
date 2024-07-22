function te(e) {
  return axios.get("/api/auth/role/getRoleMenus?id=" + e);
}
function ie(e) {
  return axios.post("/api/auth/role/assignRoleMenu", e);
}
function le(e) {
  return axios.post("/api/auth/menu/list", e);
}
const Ve = window.Pinia.defineStore;
Ve({
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
function ue(e, a) {
  if (arguments.length === 0 || !e)
    return null;
  const c = a || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof e == "object" ? i = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), i = new Date(e));
  const l = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return c.replace(/{([ymdhisa])+}/g, (g, V) => {
    let k = l[V];
    return V === "a" ? ["日", "一", "二", "三", "四", "五", "六"][k] : (g.length > 0 && k < 10 && (k = "0" + k), k || 0);
  });
}
function ce(e, a, c, i, l) {
  a = a || "id", c = c || "parentId", l = l || Math.min.apply(Math, e.map((V) => V[c])) || 0;
  const m = JSON.parse(JSON.stringify(e)), g = m.filter((V) => {
    let k = m.filter((h) => V[a] === h[c]);
    return k.length > 0 && (V.children = k), V[c] === l;
  });
  return g !== "" ? g : e;
}
function ae(e) {
  return axios.post("/api/auth/role/page", e);
}
function me(e) {
  return axios.get("/api/auth/role/get?id=" + e);
}
function re(e) {
  return axios.post("/api/auth/role/addOrUpdate", e);
}
function pe(e) {
  return axios.delete("/api/auth/role/del?id=" + e);
}
/*! Element Plus Icons Vue v2.3.1 */
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const ke = window.Vue.defineComponent, Ee = window.Vue.createElementVNode, Be = window.Vue.openBlock, fe = window.Vue.createElementBlock;
var se = /* @__PURE__ */ ke({
  name: "Delete",
  __name: "delete",
  setup(e) {
    return (a, c) => (Be(), fe("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Ee("path", {
        fill: "currentColor",
        d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
      })
    ]));
  }
}), Ce = se;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const Ne = window.Vue.defineComponent, j = window.Vue.createElementVNode, _e = window.Vue.openBlock, ve = window.Vue.createElementBlock;
var ge = /* @__PURE__ */ Ne({
  name: "Edit",
  __name: "edit",
  setup(e) {
    return (a, c) => (_e(), ve("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      j("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      j("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
}), he = ge;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const xe = window.Vue.defineComponent, be = window.Vue.createElementVNode, ye = window.Vue.openBlock, Me = window.Vue.createElementBlock;
var ze = /* @__PURE__ */ xe({
  name: "Filter",
  __name: "filter",
  setup(e) {
    return (a, c) => (ye(), Me("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      be("path", {
        fill: "currentColor",
        d: "M384 523.392V928a32 32 0 0 0 46.336 28.608l192-96A32 32 0 0 0 640 832V523.392l280.768-343.104a32 32 0 1 0-49.536-40.576l-288 352A32 32 0 0 0 576 512v300.224l-128 64V512a32 32 0 0 0-7.232-20.288L195.52 192H704a32 32 0 1 0 0-64H128a32 32 0 0 0-24.768 52.288z"
      })
    ]));
  }
}), Ae = ze;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const Re = window.Vue.defineComponent, Fe = window.Vue.createElementVNode, De = window.Vue.openBlock, Ue = window.Vue.createElementBlock;
var He = /* @__PURE__ */ Re({
  name: "Plus",
  __name: "plus",
  setup(e) {
    return (a, c) => (De(), Ue("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Fe("path", {
        fill: "currentColor",
        d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), Se = He;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const Te = window.Vue.defineComponent, Le = window.Vue.createElementVNode, Oe = window.Vue.openBlock, je = window.Vue.createElementBlock;
var Pe = /* @__PURE__ */ Te({
  name: "Refresh",
  __name: "refresh",
  setup(e) {
    return (a, c) => (Oe(), je("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Le("path", {
        fill: "currentColor",
        d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
      })
    ]));
  }
}), P = Pe;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const $e = window.Vue.defineComponent, Ie = window.Vue.createElementVNode, Ke = window.Vue.openBlock, qe = window.Vue.createElementBlock;
var Je = /* @__PURE__ */ $e({
  name: "Search",
  __name: "search",
  setup(e) {
    return (a, c) => (Ke(), qe("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Ie("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), Ge = Je;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const p = window.Vue.resolveComponent, o = window.Vue.createVNode, d = window.Vue.withCtx, u = window.Vue.unref, f = window.Vue.createTextVNode, _ = window.Vue.createElementVNode, Ye = window.Vue.toDisplayString, Qe = window.Vue.resolveDirective, $ = window.Vue.openBlock, We = window.Vue.createBlock, I = window.Vue.withDirectives, z = window.Vue.isRef, Xe = window.Vue.createElementBlock, Ze = { class: "page" }, en = { class: "search-box" }, nn = { class: "right-tool" }, on = { class: "table-box" }, wn = { style: { width: "100%", border: "1px solid rgb(228 231 237)", padding: "5px" } }, dn = { class: "dialog-footer" }, tn = { class: "dialog-footer" }, v = window.ElementPlus.ElMessage, ln = window.ElementPlus.ElMessageBox, Vn = window.Vue.reactive, r = window.Vue.ref, un = {
  __name: "RoleView",
  setup(e) {
    let a = r([]);
    const c = {
      children: "children",
      label: "name"
    }, i = r({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      name: ""
    }), l = r({
      id: "",
      name: "",
      code: "",
      expand: !1,
      selectAll: !1
    }), m = r({
      id: "",
      name: "",
      code: "",
      description: ""
    }), g = Vn({
      name: [{ required: !0, message: "请输入角色名称", trigger: "blur" }],
      code: [{ required: !0, message: "请输入角色编码", trigger: "blur" }]
    }), V = r(), k = r(), h = r(), A = r();
    let s = r(!1), B = r(!1), b = r(""), H = r([]), R = r(!1), F = r(!1);
    function K() {
      h.value.validate((t) => {
        t && re(m.value).then((n) => {
          n.code === 200 ? (v.success("操作成功"), B.value = !1, M(), x()) : v.error(n.msg);
        });
      });
    }
    function q() {
      M(), b.value = "添加角色", B.value = !0;
    }
    function J(t) {
      M(), b.value = "修改角色", B.value = !0, me(t.id).then((n) => {
        m.value = n.data;
      });
    }
    function G(t) {
      ln.confirm("确定要删除[" + t.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        pe(t.id).then((n) => {
          n.code === 200 && n.data ? (v.success("删除成功"), x()) : v.error(n.msg);
        });
      }).catch(() => {
      });
    }
    function x() {
      R.value = !0, ae(i.value).then((t) => {
        H.value = t.data.list, i.value.total = t.data.total, R.value = !1;
      });
    }
    function Y() {
      i.value = {
        name: ""
      }, k.value.resetFields();
    }
    function M() {
      m.value = {
        id: "",
        name: "",
        code: "",
        description: ""
      }, h.value && h.value.resetFields();
    }
    function D() {
      l.value = {
        id: "",
        name: "",
        code: "",
        expand: !1,
        selectAll: !1
      }, A.value && A.value.resetFields();
    }
    function Q(t) {
      if (t.code === "admin") {
        v.warning("admin角色默认拥有所有权限,不可修改");
        return;
      }
      D(), s.value = !0, l.value.name = t.name, l.value.code = t.code, l.value.id = t.id, b.value = "菜单权限", F.value = !0, le({}).then((n) => {
        a.value = ce(n.data, "id", "pid", "children", "-1"), te(t.id).then((C) => {
          V.value.setCheckedKeys(C.data), F.value = !1;
        });
      });
    }
    function W() {
      l.value.expand ? Object.values(V.value.store.nodesMap).forEach((t) => t.expand()) : Object.values(V.value.store.nodesMap).forEach((t) => t.collapse());
    }
    function X() {
      l.value.selectAll ? Object.values(V.value.store.nodesMap).forEach((t) => {
        t.checked = !0;
      }) : Object.values(V.value.store.nodesMap).forEach((t) => {
        t.checked = !1;
      });
    }
    function Z() {
      let t = {
        menuIds: [...V.value.getCheckedKeys(), ...V.value.getHalfCheckedKeys()],
        roleId: l.value.id
      };
      ie(t).then((n) => {
        n.code === 200 && n.data ? (v.success("操作成功"), s.value = !1, D()) : v.error(n.msg);
      });
    }
    return x(), (t, n) => {
      const C = p("el-input"), N = p("el-form-item"), E = p("el-button"), U = p("el-form"), ee = p("el-col"), ne = p("el-row"), y = p("el-table-column"), oe = p("el-table"), we = p("el-pagination"), S = p("el-checkbox"), de = p("el-tree"), T = p("el-dialog"), L = Qe("loading");
      return $(), Xe("div", Ze, [
        _("div", en, [
          o(U, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: k
          }, {
            default: d(() => [
              o(N, { label: "角色名称" }, {
                default: d(() => [
                  o(C, {
                    modelValue: i.value.name,
                    "onUpdate:modelValue": n[0] || (n[0] = (w) => i.value.name = w),
                    placeholder: "请输入角色名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              o(N, null, {
                default: d(() => [
                  o(E, {
                    type: "primary",
                    onClick: x,
                    icon: u(Ge)
                  }, {
                    default: d(() => [
                      f("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  o(E, {
                    icon: u(P),
                    onClick: Y
                  }, {
                    default: d(() => [
                      f("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        o(ne, {
          gutter: 10,
          class: "mb8"
        }, {
          default: d(() => [
            o(ee, { span: 1.5 }, {
              default: d(() => [
                o(E, {
                  icon: u(Se),
                  type: "primary",
                  plain: "",
                  onClick: q
                }, {
                  default: d(() => [
                    f("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            _("div", nn, [
              o(E, {
                icon: u(P),
                circle: "",
                onClick: x
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        _("div", on, [
          I(($(), We(oe, {
            data: u(H),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: d(() => [
              o(y, {
                prop: "name",
                label: "角色名称",
                "min-width": "150"
              }),
              o(y, {
                prop: "code",
                label: "角色编码",
                "min-width": "150"
              }),
              o(y, {
                prop: "description",
                label: "描述",
                "min-width": "240"
              }),
              o(y, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: d((w) => [
                  _("span", null, Ye(u(ue)(w.row.createTime)), 1)
                ]),
                _: 1
              }),
              o(y, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: d((w) => [
                  o(E, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(he),
                    onClick: (O) => J(w.row)
                  }, {
                    default: d(() => [
                      f("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  o(E, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Ae),
                    onClick: (O) => Q(w.row)
                  }, {
                    default: d(() => [
                      f("菜单权限 ")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  o(E, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Ce),
                    onClick: (O) => G(w.row)
                  }, {
                    default: d(() => [
                      f("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [L, u(R)]
          ]),
          o(we, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": n[1] || (n[1] = (w) => i.value.pageNo = w),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": n[2] || (n[2] = (w) => i.value.pageSize = w),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: x,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        o(T, {
          modelValue: u(s),
          "onUpdate:modelValue": n[8] || (n[8] = (w) => z(s) ? s.value = w : s = w),
          title: u(b),
          width: "600px",
          draggable: ""
        }, {
          footer: d(() => [
            _("span", dn, [
              o(E, {
                type: "primary",
                onClick: Z
              }, {
                default: d(() => [
                  f("确 定")
                ]),
                _: 1
              }),
              o(E, {
                onClick: n[7] || (n[7] = (w) => {
                  z(s) ? s.value = !1 : s = !1, D();
                })
              }, {
                default: d(() => [
                  f("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: d(() => [
            o(U, {
              ref_key: "menuFormRef",
              ref: A,
              model: l.value,
              "label-width": "80px",
              class: "demo-ruleForm",
              "status-icon": ""
            }, {
              default: d(() => [
                o(N, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: d(() => [
                    o(C, {
                      modelValue: l.value.name,
                      "onUpdate:modelValue": n[3] || (n[3] = (w) => l.value.name = w),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(N, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: d(() => [
                    o(C, {
                      modelValue: l.value.code,
                      "onUpdate:modelValue": n[4] || (n[4] = (w) => l.value.code = w),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(N, {
                  label: "菜单权限",
                  prop: "code"
                }, {
                  default: d(() => [
                    o(S, {
                      modelValue: l.value.expand,
                      "onUpdate:modelValue": n[5] || (n[5] = (w) => l.value.expand = w),
                      label: "展开/折叠",
                      onChange: W
                    }, null, 8, ["modelValue"]),
                    o(S, {
                      modelValue: l.value.selectAll,
                      "onUpdate:modelValue": n[6] || (n[6] = (w) => l.value.selectAll = w),
                      label: "全选/全不选",
                      onChange: X
                    }, null, 8, ["modelValue"]),
                    _("div", wn, [
                      I(o(de, {
                        props: c,
                        data: u(a),
                        "node-key": "id",
                        "show-checkbox": "",
                        ref_key: "menuTree",
                        ref: V,
                        "check-strictly": !0
                      }, null, 8, ["data"]), [
                        [L, u(F)]
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        o(T, {
          modelValue: u(B),
          "onUpdate:modelValue": n[13] || (n[13] = (w) => z(B) ? B.value = w : B = w),
          title: u(b),
          width: "600px",
          draggable: ""
        }, {
          footer: d(() => [
            _("span", tn, [
              o(E, {
                type: "primary",
                onClick: K
              }, {
                default: d(() => [
                  f("确 定")
                ]),
                _: 1
              }),
              o(E, {
                onClick: n[12] || (n[12] = (w) => {
                  z(B) ? B.value = !1 : B = !1, M();
                })
              }, {
                default: d(() => [
                  f("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: d(() => [
            o(U, {
              ref_key: "addFormRef",
              ref: h,
              model: m.value,
              "label-width": "80px",
              "status-icon": "",
              rules: g
            }, {
              default: d(() => [
                o(N, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: d(() => [
                    o(C, {
                      modelValue: m.value.name,
                      "onUpdate:modelValue": n[9] || (n[9] = (w) => m.value.name = w),
                      placeholder: "请输入角色名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(N, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: d(() => [
                    o(C, {
                      modelValue: m.value.code,
                      "onUpdate:modelValue": n[10] || (n[10] = (w) => m.value.code = w),
                      placeholder: "请输入角色编码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(N, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: d(() => [
                    o(C, {
                      modelValue: m.value.description,
                      "onUpdate:modelValue": n[11] || (n[11] = (w) => m.value.description = w),
                      placeholder: "请输入角色描述",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  un as default
};
