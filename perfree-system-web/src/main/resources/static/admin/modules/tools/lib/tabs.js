import { _ as de, c as lt, g as ut } from "./_commonjsHelpers.js";
const it = window.Pinia.defineStore, Ce = it({
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
function ct() {
  return axios.post("/api/captchaImage", {});
}
function dt(e) {
  return axios.post("/api/login", e);
}
function mt() {
  return axios.get("/api/auth/menuAdminList");
}
function pt() {
  return axios.get("/api/auth/userInfo");
}
function ln(e, l) {
  if (arguments.length === 0 || !e)
    return null;
  const t = l || "{y}-{m}-{d} {h}:{i}:{s}";
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
  return t.replace(/{([ymdhisa])+}/g, (m, c) => {
    let p = a[c];
    return c === "a" ? ["日", "一", "二", "三", "四", "五", "六"][p] : (m.length > 0 && p < 10 && (p = "0" + p), p || 0);
  });
}
function un(e, l, t, n, a) {
  l = l || "id", t = t || "parentId", a = a || Math.min.apply(Math, e.map((c) => c[t])) || 0;
  const r = JSON.parse(JSON.stringify(e)), m = r.filter((c) => {
    let p = r.filter((V) => c[l] === V[t]);
    return p.length > 0 && (c.children = p), c[t] === a;
  });
  return m !== "" ? m : e;
}
function ft() {
  return new Promise((e, l) => {
    const t = Ce();
    mt().then((n) => {
      if (n.code === 200) {
        let a = n.data;
        a.unshift(
          {
            name: "首页",
            url: "/admin",
            icon: "fa-solid fa-home",
            seq: 0,
            type: 1,
            target: 0,
            status: 0,
            pluginId: null,
            flag: null,
            component: "/view/Home",
            componentName: "home",
            moduleName: "home",
            menuType: 1,
            perms: "",
            isFrame: 1,
            id: "home",
            pid: "-1",
            children: []
          }
        ), t.setMenuList(a), e();
      }
    });
  });
}
function tt(e, l) {
  for (let t of e)
    t.children && t.children.length > 0 ? tt(t.children, l) : t.url && t.component && t.moduleName && l.push(t);
}
function cn(e) {
  return axios.post("/api/auth/codegen/getTableList", e);
}
function dn(e) {
  return axios.post("/api/auth/codegen/create-list", e);
}
function mn(e) {
  return axios.post("/api/auth/codegen/codegenTablePage", e);
}
function pn(e) {
  return axios.get("/api/auth/codegen/getCodegenInfoByTableId?tableId=" + e);
}
function fn(e) {
  return axios.post("/api/auth/codegen/saveConfig", e);
}
const ht = "data:image/png;base64,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", gt = window.Vue.renderList, Ue = window.Vue.Fragment, ne = window.Vue.openBlock, Oe = window.Vue.createElementBlock, pe = window.Vue.resolveComponent, Ne = window.Vue.createVNode, ae = window.Vue.withCtx, ye = window.Vue.createBlock, Le = window.Vue.createCommentVNode, Qe = window.Vue.toDisplayString, wt = window.Vue.createElementVNode, vt = window.Vue.createTextVNode, Ct = window.VueRouter.useRouter, Vt = {
  __name: "MenuTree",
  props: ["menuList"],
  setup(e) {
    const l = Ct(), t = e;
    function n(a) {
      a.isFrame === 0 ? a.target === 1 ? window.open(a.url, "_blank") : l.replace("/frame/" + a.id) : l.replace(a.url);
    }
    return (a, r) => {
      const m = pe("font-awesome-icon"), c = pe("el-icon"), p = pe("menuTree", !0), V = pe("el-sub-menu"), B = pe("el-menu-item");
      return ne(!0), Oe(Ue, null, gt(t.menuList, (h) => (ne(), Oe(Ue, null, [
        h.children && h.children.length > 0 ? (ne(), ye(V, {
          key: 0,
          index: h.id,
          class: "menu-item"
        }, {
          title: ae(() => [
            h.icon ? (ne(), ye(c, {
              key: 0,
              class: "menu-icon"
            }, {
              default: ae(() => [
                Ne(m, {
                  icon: h.icon
                }, null, 8, ["icon"])
              ]),
              _: 2
            }, 1024)) : Le("", !0),
            wt("span", null, Qe(h.name), 1)
          ]),
          default: ae(() => [
            Ne(p, {
              menuList: h.children
            }, null, 8, ["menuList"])
          ]),
          _: 2
        }, 1032, ["index"])) : (ne(), ye(B, {
          key: 1,
          index: h.isFrame === 0 ? "/frame/" + h.id : h.url,
          class: "menu-item",
          onClick: (_) => n(h)
        }, {
          title: ae(() => [
            vt(Qe(h.name), 1)
          ]),
          default: ae(() => [
            h.icon ? (ne(), ye(c, {
              key: 0,
              class: "menu-icon"
            }, {
              default: ae(() => [
                Ne(m, {
                  icon: h.icon
                }, null, 8, ["icon"])
              ]),
              _: 2
            }, 1024)) : Le("", !0)
          ]),
          _: 2
        }, 1032, ["index", "onClick"]))
      ], 64))), 256);
    };
  }
}, Et = /* @__PURE__ */ de(Vt, [["__scopeId", "data-v-8bad3624"]]), Pe = window.Vue.createElementVNode, Ge = window.Vue.normalizeClass, ze = window.Vue.unref, je = window.Vue.createVNode, Ze = window.Vue.resolveComponent, Me = window.Vue.withCtx, yt = window.Vue.openBlock, bt = window.Vue.createBlock, kt = window.Vue.pushScopeId, Rt = window.Vue.popScopeId, St = (e) => (kt("data-v-e02bac1d"), e = e(), Rt(), e), xt = { class: "logoBox" }, At = /* @__PURE__ */ St(() => /* @__PURE__ */ Pe("img", {
  src: ht,
  class: "logo-img"
}, null, -1)), It = window.VueRouter.useRoute, _t = window.VueRouter.useRouter, We = window.Vue.ref, He = window.Vue.watch, Tt = {
  __name: "Side",
  props: ["menuIsCollapse"],
  setup(e) {
    const l = Ce(), t = _t(), n = It();
    let a = We(t.currentRoute.value.path), r = We(l.menuList);
    return He(n, () => {
      a.value = n.fullPath;
    }), He(
      () => l.menuList,
      (m, c) => {
        r.value = m;
      },
      { deep: !0 }
    ), (m, c) => {
      const p = Ze("el-menu"), V = Ze("el-aside");
      return yt(), bt(V, {
        class: Ge({ sider: !0, fullMaxHeight: !0, collapseSider: e.menuIsCollapse })
      }, {
        default: Me(() => [
          Pe("div", xt, [
            At,
            Pe("h2", {
              class: Ge({ logoTitle: !0, logoHide: e.menuIsCollapse })
            }, "Perfree", 2)
          ]),
          je(p, {
            class: "side-menu",
            "default-active": ze(a),
            collapse: e.menuIsCollapse,
            "popper-class": "poper-menu",
            "collapse-transition": !1,
            "unique-opened": !0
          }, {
            default: Me(() => [
              je(Et, { "menu-list": ze(r) }, null, 8, ["menu-list"])
            ]),
            _: 1
          }, 8, ["default-active", "collapse"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
}, Nt = /* @__PURE__ */ de(Tt, [["__scopeId", "data-v-e02bac1d"]]), fe = {
  // 主题
  theme: "default",
  // 主题色
  primaryColor: "#5FB878",
  // 顶栏通色
  headerUnified: !1,
  // 是否开启tab栏
  tabOpen: !0,
  // 路由动画
  routeAnimation: "animate__fadeIn"
}, Bt = window.Pinia.defineStore, Ae = Bt({
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
}), se = window.Vue.unref, P = window.Vue.createElementVNode, re = window.Vue.createTextVNode, F = window.Vue.resolveComponent, I = window.Vue.withCtx, i = window.Vue.createVNode, le = window.Vue.isRef, Dt = window.Vue.openBlock, Ft = window.Vue.createBlock, Pt = window.Vue.pushScopeId, Ut = window.Vue.popScopeId, Ve = (e) => (Pt("data-v-bfdce948"), e = e(), Ut(), e), Ot = /* @__PURE__ */ Ve(() => /* @__PURE__ */ P("span", { class: "theme-header" }, "主题配置", -1)), Lt = { class: "theme-style-box" }, Qt = { class: "other-setting" }, Gt = /* @__PURE__ */ Ve(() => /* @__PURE__ */ P("span", { class: "label" }, "主题颜色", -1)), zt = { class: "other-setting" }, jt = /* @__PURE__ */ Ve(() => /* @__PURE__ */ P("span", { class: "label" }, "顶栏通色", -1)), Zt = { class: "other-setting" }, Mt = /* @__PURE__ */ Ve(() => /* @__PURE__ */ P("span", { class: "label" }, "顶部tab栏", -1)), Wt = { class: "other-setting" }, Ht = /* @__PURE__ */ Ve(() => /* @__PURE__ */ P("span", { class: "label" }, "路由动画", -1)), Y = window.VueUse.useCssVar, q = window.Vue.ref, Jt = {
  __name: "ThemeSetting",
  setup(e, { expose: l }) {
    const t = Ae();
    let n = q(t.theme), a = q(t.primaryColor), r = q(t.headerUnified), m = q(t.tabOpen), c = q(t.routeAnimation), p = q(!1);
    const V = q(null), B = Y("--el-color-primary", V), h = Y("--el-color-primary-light-3", V), _ = Y("--el-color-primary-light-5", V), E = Y("--el-color-primary-light-7", V), o = Y("--el-color-primary-light-8", V), s = Y("--el-color-primary-light-9", V), u = Y("--el-color-primary-dark-2", V), v = q([
      "#5FB878",
      "#ff4500",
      "#ff8c00",
      "#ffd700",
      "#90ee90",
      "#00ced1",
      "#1e90ff",
      "#c71585"
    ]), f = (k) => {
      t.setTheme(k), document.getElementsByTagName("body")[0].setAttribute("class", "theme-" + k);
    }, N = () => {
      p.value = !0;
    }, d = () => {
      r.value = fe.headerUnified, a.value = fe.primaryColor, m.value = fe.tabOpen, n.value = fe.theme, c.value = fe.routeAnimation, f(n.value), x(a.value), D(r.value), te(m.value), A();
    }, g = (k) => {
      n.value = k, f(k);
    }, x = (k) => {
      B.value = k, h.value = k + 80, _.value = k, E.value = k, o.value = k, s.value = k + 10, u.value = k, t.setPrimaryColor(k);
    }, D = (k) => {
      t.setHeaderUnified(k);
    }, A = () => {
      t.setRouteAnimation(c.value);
    }, te = () => {
      t.setTabOpen(m.value);
    };
    return l({
      openThemeSetting: N
    }), (k, y) => {
      const oe = F("el-divider"), w = F("el-aside"), U = F("el-header"), C = F("el-main"), O = F("el-container"), me = F("el-radio"), Te = F("el-radio-group"), Ee = F("el-color-picker"), L = F("el-switch"), R = F("el-option"), at = F("el-select"), st = F("el-button"), rt = F("el-drawer");
      return Dt(), Ft(rt, {
        modelValue: se(p),
        "onUpdate:modelValue": y[8] || (y[8] = (S) => le(p) ? p.value = S : p = S),
        direction: "rtl",
        size: "350px",
        "z-index": 99,
        class: "themeSettingBox"
      }, {
        header: I(() => [
          Ot
        ]),
        default: I(() => [
          i(oe, null, {
            default: I(() => [
              re("侧边栏样式")
            ]),
            _: 1
          }),
          P("div", Lt, [
            i(Te, {
              modelValue: se(n),
              "onUpdate:modelValue": y[3] || (y[3] = (S) => le(n) ? n.value = S : n = S),
              onChange: f
            }, {
              default: I(() => [
                P("div", {
                  class: "theme-style",
                  onClick: y[0] || (y[0] = (S) => g("default"))
                }, [
                  i(O, { class: "theme-box t-default" }, {
                    default: I(() => [
                      i(w),
                      i(O, null, {
                        default: I(() => [
                          i(U),
                          i(C)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  i(me, { value: "default" }, {
                    default: I(() => [
                      re("默认")
                    ]),
                    _: 1
                  })
                ]),
                P("div", {
                  class: "theme-style",
                  onClick: y[1] || (y[1] = (S) => g("light"))
                }, [
                  i(O, { class: "theme-box t-light" }, {
                    default: I(() => [
                      i(w, { width: "30px" }),
                      i(O, null, {
                        default: I(() => [
                          i(U),
                          i(C)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  i(me, { value: "light" }, {
                    default: I(() => [
                      re("白色")
                    ]),
                    _: 1
                  })
                ]),
                P("div", {
                  class: "theme-style",
                  onClick: y[2] || (y[2] = (S) => g("purple"))
                }, [
                  i(O, { class: "theme-box t-purple" }, {
                    default: I(() => [
                      i(w, { width: "30px" }),
                      i(O, null, {
                        default: I(() => [
                          i(U),
                          i(C)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  i(me, { value: "purple" }, {
                    default: I(() => [
                      re("骚紫")
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          i(oe, null, {
            default: I(() => [
              re("其他配置")
            ]),
            _: 1
          }),
          P("div", Qt, [
            Gt,
            i(Ee, {
              modelValue: se(a),
              "onUpdate:modelValue": y[4] || (y[4] = (S) => le(a) ? a.value = S : a = S),
              "show-alpha": !1,
              predefine: v.value,
              "color-format": "hex",
              onChange: x
            }, null, 8, ["modelValue", "predefine"])
          ]),
          P("div", zt, [
            jt,
            i(L, {
              modelValue: se(r),
              "onUpdate:modelValue": y[5] || (y[5] = (S) => le(r) ? r.value = S : r = S),
              onChange: D
            }, null, 8, ["modelValue"])
          ]),
          P("div", Zt, [
            Mt,
            i(L, {
              modelValue: se(m),
              "onUpdate:modelValue": y[6] || (y[6] = (S) => le(m) ? m.value = S : m = S),
              onChange: te
            }, null, 8, ["modelValue"])
          ]),
          P("div", Wt, [
            Ht,
            i(at, {
              modelValue: se(c),
              "onUpdate:modelValue": y[7] || (y[7] = (S) => le(c) ? c.value = S : c = S),
              placeholder: "请选择",
              style: { width: "180px" },
              onChange: A
            }, {
              default: I(() => [
                i(R, {
                  key: "animate__fadeIn",
                  label: "fadeIn",
                  value: "animate__fadeIn"
                }),
                i(R, {
                  key: "animate__fadeInDown",
                  label: "fadeInDown",
                  value: "animate__fadeInDown"
                }),
                i(R, {
                  key: "animate__fadeInLeft",
                  label: "fadeInLeft",
                  value: "animate__fadeInLeft"
                }),
                i(R, {
                  key: "animate__fadeInRight",
                  label: "fadeInRight",
                  value: "animate__fadeInRight"
                }),
                i(R, {
                  key: "animate__fadeInUp",
                  label: "fadeInUp",
                  value: "animate__fadeInUp"
                }),
                i(R, {
                  key: "animate__flipInX",
                  label: "flipInX",
                  value: "animate__flipInX"
                }),
                i(R, {
                  key: "animate__lightSpeedInRight",
                  label: "lightSpeedInRight",
                  value: "animate__lightSpeedInRight"
                }),
                i(R, {
                  key: "animate__lightSpeedInLeft",
                  label: "lightSpeedInLeft",
                  value: "animate__lightSpeedInLeft"
                }),
                i(R, {
                  key: "animate__rotateInDownLeft",
                  label: "rotateInDownLeft",
                  value: "animate__rotateInDownLeft"
                }),
                i(R, {
                  key: "animate__rotateInDownRight",
                  label: "rotateInDownRight",
                  value: "animate__rotateInDownRight"
                }),
                i(R, {
                  key: "animate__rotateInUpLeft",
                  label: "rotateInUpLeft",
                  value: "animate__rotateInUpLeft"
                }),
                i(R, {
                  key: "animate__zoomIn",
                  label: "zoomIn",
                  value: "animate__zoomIn"
                }),
                i(R, {
                  key: "animate__slideInDown",
                  label: "slideInDown",
                  value: "animate__slideInDown"
                }),
                i(R, {
                  key: "animate__slideInLeft",
                  label: "slideInLeft",
                  value: "animate__slideInLeft"
                }),
                i(R, {
                  key: "animate__slideInUp",
                  label: "slideInUp",
                  value: "animate__slideInUp"
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ]),
        footer: I(() => [
          i(st, { onClick: d }, {
            default: I(() => [
              re("重置主题")
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
}, qt = /* @__PURE__ */ de(Jt, [["__scopeId", "data-v-bfdce948"]]), ve = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, W = window.Vue.unref, z = window.Vue.resolveComponent, b = window.Vue.createVNode, ue = window.Vue.openBlock, Je = window.Vue.createElementBlock, he = window.Vue.createCommentVNode, j = window.Vue.createElementVNode, be = window.Vue.createTextVNode, T = window.Vue.withCtx, qe = window.Vue.toDisplayString, ke = window.Vue.createBlock, Kt = window.Vue.isRef, Yt = window.Vue.normalizeClass;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const Xt = { class: "h-left" }, $t = { class: "h-right" }, eo = { class: "h-btn" }, to = { class: "h-user" }, oo = { class: "h-userName" }, no = window.VueUse.useDark, ao = window.VueUse.useFullscreen, so = window.VueRouter.useRoute, ro = window.VueRouter.useRouter, lo = window.Vue.nextTick, Re = window.Vue.ref, uo = {
  __name: "Header",
  emits: ["menuCollapse"],
  setup(e, { emit: l }) {
    const t = ro(), n = so(), a = Ae(), r = no(), m = Re(null), { isFullscreen: c, toggle: p } = ao(m), V = Re(null), B = Re(JSON.parse(localStorage.getItem(ve.STORAGE_USER_INFO))), h = () => {
      p();
    }, _ = l;
    let E = Re(!1);
    const o = () => {
      E.value = !E.value, _("menuCollapse", E.value);
    }, s = () => {
      V.value && V.value.openThemeSetting();
    }, u = () => {
      a.setRefreshRouteflag(!0), lo(() => {
        setTimeout(() => {
          a.setRefreshRouteflag(!1);
        }, 200);
      });
    }, v = () => {
      localStorage.removeItem(ve.STORAGE_TOKEN), t.replace("/login");
    };
    function f() {
      window.location.href = "/";
    }
    return (N, d) => {
      const g = z("font-awesome-icon"), x = z("el-breadcrumb-item"), D = z("el-breadcrumb"), A = z("el-tooltip"), te = z("el-switch"), k = z("el-avatar"), y = z("el-dropdown-item"), oe = z("el-dropdown-menu"), w = z("el-dropdown"), U = z("el-header");
      return ue(), ke(U, {
        class: Yt({ "p-header": !0, "header-unified": W(a).headerUnified }),
        id: "p-header"
      }, {
        default: T(() => [
          j("div", Xt, [
            W(E) ? he("", !0) : (ue(), Je("div", {
              key: 0,
              class: "h-btn",
              onClick: o
            }, [
              b(g, { icon: "fa-solid fa-outdent" })
            ])),
            W(E) ? (ue(), Je("div", {
              key: 1,
              class: "h-btn",
              onClick: o
            }, [
              b(g, { icon: "fa-solid fa-indent " })
            ])) : he("", !0),
            j("div", {
              class: "h-btn",
              onClick: u
            }, [
              b(g, { icon: "fa-solid fa-arrows-rotate " })
            ]),
            b(D, {
              separator: "/",
              class: "h-breadcrumb"
            }, {
              default: T(() => [
                b(x, { to: { path: "/" } }, {
                  default: T(() => [
                    be("首页")
                  ]),
                  _: 1
                }),
                W(n).fullPath !== "/" && W(n).fullPath !== "/admin" ? (ue(), ke(x, { key: 0 }, {
                  default: T(() => [
                    be(qe(W(n).meta.title), 1)
                  ]),
                  _: 1
                })) : he("", !0)
              ]),
              _: 1
            })
          ]),
          j("div", $t, [
            b(A, {
              content: "前往首页",
              placement: "bottom"
            }, {
              default: T(() => [
                j("div", {
                  class: "h-btn",
                  onClick: f
                }, [
                  b(g, { icon: "fa-solid fa-earth-americas" })
                ])
              ]),
              _: 1
            }),
            b(A, {
              content: "源码地址",
              placement: "bottom"
            }, {
              default: T(() => [
                j("div", eo, [
                  b(g, { icon: " fa-brands fa-github " })
                ])
              ]),
              _: 1
            }),
            W(c) ? he("", !0) : (ue(), ke(A, {
              key: 0,
              content: "全屏",
              placement: "bottom"
            }, {
              default: T(() => [
                j("div", {
                  class: "h-btn",
                  onClick: h
                }, [
                  b(g, { icon: "fa-solid fa-expand " })
                ])
              ]),
              _: 1
            })),
            W(c) ? (ue(), ke(A, {
              key: 1,
              content: "退出全屏",
              placement: "bottom"
            }, {
              default: T(() => [
                j("div", {
                  class: "h-btn",
                  onClick: h
                }, [
                  b(g, { icon: "fa-solid fa-compress " })
                ])
              ]),
              _: 1
            })) : he("", !0),
            b(te, {
              modelValue: W(r),
              "onUpdate:modelValue": d[0] || (d[0] = (C) => Kt(r) ? r.value = C : null)
            }, {
              "active-action": T(() => [
                b(g, { icon: "fa-solid fa-moon " })
              ]),
              "inactive-action": T(() => [
                b(g, { icon: "fa-regular fa-sun " })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            b(w, null, {
              dropdown: T(() => [
                b(oe, null, {
                  default: T(() => [
                    b(y, null, {
                      default: T(() => [
                        be("个人中心")
                      ]),
                      _: 1
                    }),
                    b(y, { onClick: v }, {
                      default: T(() => [
                        be("退出登录")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              default: T(() => [
                j("div", to, [
                  b(k, { src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" }),
                  j("span", oo, qe(B.value.userName), 1)
                ])
              ]),
              _: 1
            }),
            b(A, {
              content: "主题设置",
              placement: "bottom"
            }, {
              default: T(() => [
                j("div", {
                  class: "h-btn",
                  onClick: s
                }, [
                  b(g, { icon: "fa-solid fa-dharmachakra " })
                ])
              ]),
              _: 1
            })
          ]),
          b(qt, {
            ref_key: "themeSettingRef",
            ref: V
          }, null, 512)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
}, io = /* @__PURE__ */ de(uo, [["__scopeId", "data-v-b767e62d"]]);
/*! Element Plus v2.7.7 */
var co = {
  name: "zh-cn",
  el: {
    breadcrumb: {
      label: "面包屑"
    },
    colorpicker: {
      confirm: "确定",
      clear: "清空"
    },
    datepicker: {
      now: "此刻",
      today: "今天",
      cancel: "取消",
      clear: "清空",
      confirm: "确定",
      selectDate: "选择日期",
      selectTime: "选择时间",
      startDate: "开始日期",
      startTime: "开始时间",
      endDate: "结束日期",
      endTime: "结束时间",
      prevYear: "前一年",
      nextYear: "后一年",
      prevMonth: "上个月",
      nextMonth: "下个月",
      year: "年",
      month1: "1 月",
      month2: "2 月",
      month3: "3 月",
      month4: "4 月",
      month5: "5 月",
      month6: "6 月",
      month7: "7 月",
      month8: "8 月",
      month9: "9 月",
      month10: "10 月",
      month11: "11 月",
      month12: "12 月",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      },
      months: {
        jan: "一月",
        feb: "二月",
        mar: "三月",
        apr: "四月",
        may: "五月",
        jun: "六月",
        jul: "七月",
        aug: "八月",
        sep: "九月",
        oct: "十月",
        nov: "十一月",
        dec: "十二月"
      }
    },
    select: {
      loading: "加载中",
      noMatch: "无匹配数据",
      noData: "无数据",
      placeholder: "请选择"
    },
    cascader: {
      noMatch: "无匹配数据",
      loading: "加载中",
      placeholder: "请选择",
      noData: "暂无数据"
    },
    pagination: {
      goto: "前往",
      pagesize: "条/页",
      total: "共 {total} 条",
      pageClassifier: "页",
      page: "页",
      prev: "上一页",
      next: "下一页",
      currentPage: "第 {pager} 页",
      prevPages: "向前 {pager} 页",
      nextPages: "向后 {pager} 页",
      deprecationWarning: "你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档"
    },
    messagebox: {
      title: "提示",
      confirm: "确定",
      cancel: "取消",
      error: "输入的数据不合法!"
    },
    upload: {
      deleteTip: "按 delete 键可删除",
      delete: "删除",
      preview: "查看图片",
      continue: "继续上传"
    },
    table: {
      emptyText: "暂无数据",
      confirmFilter: "筛选",
      resetFilter: "重置",
      clearFilter: "全部",
      sumText: "合计"
    },
    tour: {
      next: "下一步",
      previous: "上一步",
      finish: "结束导览"
    },
    tree: {
      emptyText: "暂无数据"
    },
    transfer: {
      noMatch: "无匹配数据",
      noData: "无数据",
      titles: ["列表 1", "列表 2"],
      filterPlaceholder: "请输入搜索内容",
      noCheckedFormat: "共 {total} 项",
      hasCheckedFormat: "已选 {checked}/{total} 项"
    },
    image: {
      error: "加载失败"
    },
    pageHeader: {
      title: "返回"
    },
    popconfirm: {
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    },
    carousel: {
      leftArrow: "上一张幻灯片",
      rightArrow: "下一张幻灯片",
      indicator: "幻灯片切换至索引 {index}"
    }
  }
};
const H = window.Vue.unref, Z = window.Vue.createVNode, Be = window.Vue.normalizeClass, ge = window.Vue.resolveComponent, K = window.Vue.createElementVNode, mo = window.Vue.renderList, po = window.Vue.Fragment, J = window.Vue.openBlock, we = window.Vue.createElementBlock, fo = window.Vue.toDisplayString, De = window.Vue.createCommentVNode, ho = window.Vue.resolveDynamicComponent, Se = window.Vue.createBlock, go = window.Vue.KeepAlive, wo = window.Vue.Transition, X = window.Vue.withCtx, vo = window.Vue.pushScopeId, Co = window.Vue.popScopeId, Vo = (e) => (vo("data-v-058323e8"), e = e(), Co(), e), Eo = {
  key: 0,
  class: "header-tab"
}, yo = ["onClick"], bo = { class: "tab-item-name" }, ko = ["onClick"], Ro = { class: "p-page" }, So = /* @__PURE__ */ Vo(() => /* @__PURE__ */ K("span", null, "Copyright © 2018-2024 All Rights Reserved. ", -1)), xo = window.ElementPlus.ElConfigProvider, $ = window.VueUse.useCssVar, Ao = window.VueRouter.useRoute, Io = window.VueRouter.useRouter, _o = window.Vue.reactive, ee = window.Vue.ref, To = window.Vue.watch, No = {
  __name: "Layout",
  setup(e) {
    const l = Ae(), t = Ce(), n = Ao(), a = Io(), r = ee(), m = ee(), c = ee(null), p = $("--el-color-primary", c), V = $("--el-color-primary-light-3", c), B = $("--el-color-primary-light-5", c), h = $("--el-color-primary-light-7", c), _ = $("--el-color-primary-light-8", c), E = $("--el-color-primary-light-9", c), o = $("--el-color-primary-dark-2", c);
    let s = ee(t.cachedViews), u = ee(co), v = ee(!1), f = _o(ce);
    console.log(l.routeAnimation);
    const N = ee({
      commonLayout: !0,
      fullMaxHeight: !0
    });
    To(n, () => {
      console.log("route变化", n), d(n);
    });
    const d = (w) => {
      if (f.findIndex((C) => C.path === w.fullPath) < 0) {
        f.forEach((O) => {
          O.currActive = !1;
        });
        const C = {
          name: w.meta.title,
          hasClose: !0,
          path: w.fullPath,
          currActive: !0
        };
        f.push(C), l.setActiveTab(C);
      } else
        f.forEach((C) => {
          C.currActive = C.path === w.fullPath, C.path === w.fullPath && l.setActiveTab(C);
        });
    }, g = (w) => {
      v.value = w;
    }, x = () => {
      r.value.style.scrollBehavior = "smooth", r.value.scrollLeft -= 200;
    }, D = () => {
      r.value.style.scrollBehavior = "smooth", r.value.scrollLeft += 200;
    }, A = (w) => {
      f.forEach((U) => {
        U.currActive = U.path === w.path;
      }), a.push(w.path);
    }, te = (w, U) => {
      let C = f.findIndex((O) => O.path === w);
      f[C].currActive ? (f.splice(C, 1), C = C - 1, a.push(f[C].path)) : f.splice(C, 1), U.stopPropagation();
    }, k = () => {
      document.getElementsByTagName("body")[0].setAttribute("class", "theme-" + l.theme);
    }, y = () => {
      let w = l.primaryColor;
      p.value = w, V.value = w + 80, B.value = w, h.value = w, _.value = w, E.value = w + 10, o.value = w;
    };
    function oe() {
      l.activeTab && l.activeTab.path !== "/admin" && f.push(l.activeTab), d(n);
    }
    return y(), k(), oe(), (w, U) => {
      const C = ge("font-awesome-icon"), O = ge("RouterView"), me = ge("el-main"), Te = ge("el-footer"), Ee = ge("el-container");
      return J(), Se(H(xo), { locale: H(u) }, {
        default: X(() => [
          K("div", {
            class: Be(N.value)
          }, [
            Z(Ee, { class: "fullMaxHeight" }, {
              default: X(() => [
                Z(Nt, { "menu-is-collapse": H(v) }, null, 8, ["menu-is-collapse"]),
                Z(Ee, null, {
                  default: X(() => [
                    Z(io, {
                      onMenuCollapse: g,
                      class: Be({ headerBoxShadow: !H(l).tabOpen })
                    }, null, 8, ["class"]),
                    Z(me, { class: "p-main" }, {
                      default: X(() => [
                        H(l).tabOpen ? (J(), we("div", Eo, [
                          K("span", {
                            class: "tab-left-btn",
                            onClick: x
                          }, [
                            Z(C, { icon: "fa-solid fa-angle-left " })
                          ]),
                          K("div", {
                            class: "h-tab-box",
                            ref_key: "scrollbarRef",
                            ref: r
                          }, [
                            K("ul", {
                              class: "header-tab-ul",
                              ref_key: "innerRef",
                              ref: m
                            }, [
                              (J(!0), we(po, null, mo(H(f), (L) => (J(), we("li", {
                                class: Be({ "header-tab-item": !0, active: L.currActive }),
                                key: L.path,
                                onClick: (R) => A(L)
                              }, [
                                K("span", bo, fo(L.name), 1),
                                L.hasClose ? (J(), we("span", {
                                  key: 0,
                                  class: "tab-item-btn",
                                  onClick: (R) => te(L.path, R)
                                }, [
                                  Z(C, { icon: "fa-solid fa-xmark " })
                                ], 8, ko)) : De("", !0)
                              ], 10, yo))), 128))
                            ], 512)
                          ], 512),
                          K("span", {
                            class: "tab-right-btn",
                            onClick: D
                          }, [
                            Z(C, { icon: "fa-solid fa-angle-right " })
                          ])
                        ])) : De("", !0),
                        K("div", Ro, [
                          H(l).refreshRouteflag ? De("", !0) : (J(), Se(O, { key: 0 }, {
                            default: X(({ Component: L, route: R }) => [
                              Z(wo, {
                                name: "fade",
                                mode: "out-in",
                                "enter-active-class": "animate__animated " + H(l).routeAnimation
                              }, {
                                default: X(() => [
                                  (J(), Se(go, { include: H(s) }, [
                                    (J(), we("div", {
                                      key: R.fullPath,
                                      style: { height: "100%" }
                                    }, [
                                      (J(), Se(ho(L), {
                                        key: R.fullPath
                                      }))
                                    ]))
                                  ], 1032, ["include"]))
                                ]),
                                _: 2
                              }, 1032, ["enter-active-class"])
                            ]),
                            _: 1
                          }))
                        ])
                      ]),
                      _: 1
                    }),
                    Z(Te, { class: "footer" }, {
                      default: X(() => [
                        So
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ], 2)
        ]),
        _: 1
      }, 8, ["locale"]);
    };
  }
}, Bo = /* @__PURE__ */ de(No, [["__scopeId", "data-v-058323e8"]]);
var ot = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(e, l) {
  (function(t, n) {
    e.exports = n();
  })(lt, function() {
    var t = {};
    t.version = "0.2.0";
    var n = t.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    t.configure = function(o) {
      var s, u;
      for (s in o)
        u = o[s], u !== void 0 && o.hasOwnProperty(s) && (n[s] = u);
      return this;
    }, t.status = null, t.set = function(o) {
      var s = t.isStarted();
      o = a(o, n.minimum, 1), t.status = o === 1 ? null : o;
      var u = t.render(!s), v = u.querySelector(n.barSelector), f = n.speed, N = n.easing;
      return u.offsetWidth, c(function(d) {
        n.positionUsing === "" && (n.positionUsing = t.getPositioningCSS()), p(v, m(o, f, N)), o === 1 ? (p(u, {
          transition: "none",
          opacity: 1
        }), u.offsetWidth, setTimeout(function() {
          p(u, {
            transition: "all " + f + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            t.remove(), d();
          }, f);
        }, f)) : setTimeout(d, f);
      }), this;
    }, t.isStarted = function() {
      return typeof t.status == "number";
    }, t.start = function() {
      t.status || t.set(0);
      var o = function() {
        setTimeout(function() {
          t.status && (t.trickle(), o());
        }, n.trickleSpeed);
      };
      return n.trickle && o(), this;
    }, t.done = function(o) {
      return !o && !t.status ? this : t.inc(0.3 + 0.5 * Math.random()).set(1);
    }, t.inc = function(o) {
      var s = t.status;
      return s ? (typeof o != "number" && (o = (1 - s) * a(Math.random() * s, 0.1, 0.95)), s = a(s + o, 0, 0.994), t.set(s)) : t.start();
    }, t.trickle = function() {
      return t.inc(Math.random() * n.trickleRate);
    }, function() {
      var o = 0, s = 0;
      t.promise = function(u) {
        return !u || u.state() === "resolved" ? this : (s === 0 && t.start(), o++, s++, u.always(function() {
          s--, s === 0 ? (o = 0, t.done()) : t.set((o - s) / o);
        }), this);
      };
    }(), t.render = function(o) {
      if (t.isRendered()) return document.getElementById("nprogress");
      B(document.documentElement, "nprogress-busy");
      var s = document.createElement("div");
      s.id = "nprogress", s.innerHTML = n.template;
      var u = s.querySelector(n.barSelector), v = o ? "-100" : r(t.status || 0), f = document.querySelector(n.parent), N;
      return p(u, {
        transition: "all 0 linear",
        transform: "translate3d(" + v + "%,0,0)"
      }), n.showSpinner || (N = s.querySelector(n.spinnerSelector), N && E(N)), f != document.body && B(f, "nprogress-custom-parent"), f.appendChild(s), s;
    }, t.remove = function() {
      h(document.documentElement, "nprogress-busy"), h(document.querySelector(n.parent), "nprogress-custom-parent");
      var o = document.getElementById("nprogress");
      o && E(o);
    }, t.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, t.getPositioningCSS = function() {
      var o = document.body.style, s = "WebkitTransform" in o ? "Webkit" : "MozTransform" in o ? "Moz" : "msTransform" in o ? "ms" : "OTransform" in o ? "O" : "";
      return s + "Perspective" in o ? "translate3d" : s + "Transform" in o ? "translate" : "margin";
    };
    function a(o, s, u) {
      return o < s ? s : o > u ? u : o;
    }
    function r(o) {
      return (-1 + o) * 100;
    }
    function m(o, s, u) {
      var v;
      return n.positionUsing === "translate3d" ? v = { transform: "translate3d(" + r(o) + "%,0,0)" } : n.positionUsing === "translate" ? v = { transform: "translate(" + r(o) + "%,0)" } : v = { "margin-left": r(o) + "%" }, v.transition = "all " + s + "ms " + u, v;
    }
    var c = /* @__PURE__ */ function() {
      var o = [];
      function s() {
        var u = o.shift();
        u && u(s);
      }
      return function(u) {
        o.push(u), o.length == 1 && s();
      };
    }(), p = /* @__PURE__ */ function() {
      var o = ["Webkit", "O", "Moz", "ms"], s = {};
      function u(d) {
        return d.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(g, x) {
          return x.toUpperCase();
        });
      }
      function v(d) {
        var g = document.body.style;
        if (d in g) return d;
        for (var x = o.length, D = d.charAt(0).toUpperCase() + d.slice(1), A; x--; )
          if (A = o[x] + D, A in g) return A;
        return d;
      }
      function f(d) {
        return d = u(d), s[d] || (s[d] = v(d));
      }
      function N(d, g, x) {
        g = f(g), d.style[g] = x;
      }
      return function(d, g) {
        var x = arguments, D, A;
        if (x.length == 2)
          for (D in g)
            A = g[D], A !== void 0 && g.hasOwnProperty(D) && N(d, D, A);
        else
          N(d, x[1], x[2]);
      };
    }();
    function V(o, s) {
      var u = typeof o == "string" ? o : _(o);
      return u.indexOf(" " + s + " ") >= 0;
    }
    function B(o, s) {
      var u = _(o), v = u + s;
      V(u, s) || (o.className = v.substring(1));
    }
    function h(o, s) {
      var u = _(o), v;
      V(o, s) && (v = u.replace(" " + s + " ", " "), o.className = v.substring(1, v.length - 1));
    }
    function _(o) {
      return (" " + (o.className || "") + " ").replace(/\s+/gi, " ");
    }
    function E(o) {
      o && o.parentNode && o.parentNode.removeChild(o);
    }
    return t;
  });
})(ot);
var Do = ot.exports;
const nt = /* @__PURE__ */ ut(Do), G = window.Vue.createElementVNode, ie = window.Vue.resolveComponent, Q = window.Vue.createVNode, M = window.Vue.withCtx, Ke = window.Vue.withKeys, Ye = window.Vue.unref, Fe = window.Vue.openBlock, Xe = window.Vue.createBlock, $e = window.Vue.createCommentVNode, Fo = window.Vue.withModifiers, et = window.Vue.createTextVNode, Po = window.Vue.createElementBlock, Uo = window.Vue.pushScopeId, Oo = window.Vue.popScopeId, Ie = (e) => (Uo("data-v-faace03d"), e = e(), Oo(), e), Lo = { class: "container" }, Qo = { class: "login-box" }, Go = /* @__PURE__ */ Ie(() => /* @__PURE__ */ G("h3", { class: "title" }, "Perfree", -1)), zo = { class: "login-code" }, jo = ["src"], Zo = /* @__PURE__ */ Ie(() => /* @__PURE__ */ G("span", null, "登录", -1)), Mo = { class: "login-bottom-box" }, Wo = { class: "register-box" }, Ho = /* @__PURE__ */ Ie(() => /* @__PURE__ */ G("div", { class: "forget-password-box" }, [
  /* @__PURE__ */ G("a", { href: "javascript:;" }, "忘记密码")
], -1)), Jo = /* @__PURE__ */ Ie(() => /* @__PURE__ */ G("div", { class: "login-footer" }, [
  /* @__PURE__ */ G("span", null, "Copyright © 2018-2024 All Rights Reserved. ")
], -1)), qo = window.ElementPlus.ElMessage, Ko = window.VueRouter.useRouter, Yo = window.Vue.computed, Xo = window.Vue.getCurrentInstance, xe = window.Vue.ref, $o = {
  __name: "LoginView",
  setup(e) {
    const { proxy: l } = Xo(), t = Ko();
    let n = !0;
    const a = Ce(), r = xe({
      username: "",
      password: "",
      rememberMe: !1,
      code: "",
      uuid: ""
    }), m = Yo(() => ({
      username: [{ required: !0, trigger: "blur", message: "请输入您的账户" }],
      password: [{ required: !0, trigger: "blur", message: "请输入您的密码" }],
      code: [{ required: !0, trigger: "blur", message: "请输入验证码" }]
    }));
    let c = xe("");
    const p = xe(!1), V = xe(!0), B = () => {
      l.$refs.loginRef.validate((_) => {
        _ && dt(r.value).then((E) => {
          E.code === 200 ? (a.setMenuInit(!1), sn(), localStorage.setItem(ve.STORAGE_TOKEN, JSON.stringify(E.data)), pt().then((o) => {
            localStorage.setItem(ve.STORAGE_USER_INFO, JSON.stringify(o.data)), t.replace("/admin");
          })) : (qo.error(E.msg), r.value.code = "", p.value = !1, h());
        }).catch(() => {
        });
      });
    }, h = () => {
      ct().then((_) => {
        c.value = "data:image/gif;base64," + _.data.img, r.value.uuid = _.data.uuid;
      });
    };
    return h(), (_, E) => {
      const o = ie("font-awesome-icon"), s = ie("el-input"), u = ie("el-form-item"), v = ie("el-button"), f = ie("router-link"), N = ie("el-form");
      return Fe(), Po("div", Lo, [
        G("div", Qo, [
          Q(N, {
            ref: "loginRef",
            model: r.value,
            rules: m.value,
            class: "login-form"
          }, {
            default: M(() => [
              Go,
              Q(u, { prop: "username" }, {
                default: M(() => [
                  Q(s, {
                    modelValue: r.value.username,
                    "onUpdate:modelValue": E[0] || (E[0] = (d) => r.value.username = d),
                    type: "text",
                    size: "large",
                    "auto-complete": "off",
                    placeholder: "请输入账户"
                  }, {
                    prefix: M(() => [
                      Q(o, { icon: "fa-regular fa-user " })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              Q(u, { prop: "password" }, {
                default: M(() => [
                  Q(s, {
                    modelValue: r.value.password,
                    "onUpdate:modelValue": E[1] || (E[1] = (d) => r.value.password = d),
                    type: "password",
                    size: "large",
                    "auto-complete": "off",
                    placeholder: "请输入密码",
                    onKeyup: Ke(B, ["enter"])
                  }, {
                    prefix: M(() => [
                      Q(o, { icon: "fa-solid fa-lock " })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              Ye(n) ? (Fe(), Xe(u, {
                key: 0,
                prop: "code"
              }, {
                default: M(() => [
                  Q(s, {
                    modelValue: r.value.code,
                    "onUpdate:modelValue": E[2] || (E[2] = (d) => r.value.code = d),
                    "auto-complete": "off",
                    placeholder: "请输入验证码",
                    size: "large",
                    style: { width: "63%" },
                    onKeyup: Ke(B, ["enter"])
                  }, {
                    prefix: M(() => [
                      Q(o, { icon: "fa-solid fa-fax  " })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  G("div", zo, [
                    G("img", {
                      src: Ye(c),
                      onClick: h,
                      class: "login-code-img"
                    }, null, 8, jo)
                  ])
                ]),
                _: 1
              })) : $e("", !0),
              Q(u, { style: { width: "100%", "margin-top": "20px" } }, {
                default: M(() => [
                  Q(v, {
                    loading: p.value,
                    size: "large",
                    type: "primary",
                    style: { width: "100%" },
                    onClick: Fo(B, ["prevent"])
                  }, {
                    default: M(() => [
                      Zo
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  G("div", Mo, [
                    G("div", Wo, [
                      et(" 没有账号, "),
                      V.value ? (Fe(), Xe(f, {
                        key: 0,
                        class: "link-type",
                        to: "/register"
                      }, {
                        default: M(() => [
                          et("立即注册")
                        ]),
                        _: 1
                      })) : $e("", !0)
                    ]),
                    Ho
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model", "rules"])
        ]),
        Jo
      ]);
    };
  }
}, en = /* @__PURE__ */ de($o, [["__scopeId", "data-v-faace03d"]]), tn = async (e, l) => (await (await import("../_import-prod.js")).default(e, l)).default(), on = window.VueRouter.createRouter, nn = window.VueRouter.createWebHistory, _e = on({
  history: nn(),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Bo,
      redirect: "admin",
      children: []
    },
    {
      path: "/login",
      name: "login",
      component: en
    }
  ]
});
_e.afterEach(() => {
  nt.done();
});
_e.beforeEach((e, l, t) => {
  const n = Ce();
  nt.start();
  let a = localStorage.getItem(ve.STORAGE_TOKEN);
  if (a && (a = JSON.parse(a)), !a || !a.accessToken || a.accessToken === "") {
    if (e.path === "/login") {
      t();
      return;
    }
    t("/login");
  } else {
    if (n.menuInit) {
      t();
      return;
    }
    ft().then(() => {
      let r = [];
      tt(n.menuList, r), Promise.all([an(r)]).then(([m]) => {
        n.setMenuInit(!0), t({ ...e, replace: !0 });
      });
    });
  }
});
function an(e) {
  return new Promise(async (l, t) => {
    const n = e.reduce((a, r) => {
      const m = r.moduleName;
      return a[m] || (a[m] = []), a[m].push(r), a;
    }, {});
    for (const a in n) {
      if (!a)
        continue;
      let r = {
        moduleName: n[a][0].moduleName,
        pluginId: n[a][0].pluginId,
        pluginIsDev: n[a][0].pluginIsDev,
        pluginFrontDevAddress: n[a][0].pluginFrontDevAddress
      };
      try {
        await tn(r, a).then((m) => {
          m.router(n[a], a).forEach((p) => {
            _e.addRoute("layout", p);
          });
        });
      } catch {
      }
    }
    l();
  });
}
let ce = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function hn(e, l, t) {
  e && ce.findIndex((a) => a.path === l) < 0 && ce.push({
    name: e,
    hasClose: !0,
    path: l,
    currActive: !1
  }), _e.push({
    path: l,
    query: t
  });
}
function gn(e) {
  let l = ce.findIndex((t) => t.path === e);
  l >= 0 && ce.splice(l, 1);
}
function sn() {
  Ae().setActiveTab(null), ce = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
}
export {
  mn as a,
  cn as b,
  gn as c,
  dn as d,
  pn as g,
  un as h,
  ln as p,
  fn as s,
  hn as t
};
