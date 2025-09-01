import { c as j, d as J, u as W } from "./lib/theme.js";
import { u as Q } from "./lib/@element-plus.js";
import { _ as X, d as Y } from "./lib/_plugin-vue_export-helper.js";
const Z = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, ee = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
}, te = window.Pinia.defineStore;
te({
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
    setActiveTab(o) {
      this.activeTab = o;
    },
    setTheme(o) {
      this.theme = o;
    },
    setPrimaryColor(o) {
      this.primaryColor = o;
    },
    setHeaderUnified(o) {
      this.headerUnified = o;
    },
    setTabOpen(o) {
      this.tabOpen = o;
    },
    setRefreshRouteflag(o) {
      this.refreshRouteflag = o;
    },
    setRouteAnimation(o) {
      this.routeAnimation = o;
    }
  },
  persist: {
    enabled: !0
    //开启本地存储
  }
});
let E = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function S(o, p, d) {
  o && E.findIndex((V) => V.path === p) < 0 && E.push({
    name: o,
    hasClose: !0,
    path: p,
    currActive: !1
  }), router.push({
    path: p,
    params: d
  });
}
const i = window.Vue.createTextVNode, r = window.Vue.resolveComponent, ne = window.Vue.resolveDirective, s = window.Vue.withCtx, c = window.Vue.openBlock, T = window.Vue.createBlock, N = window.Vue.withDirectives, m = window.Vue.createElementBlock, n = window.Vue.createVNode, a = window.Vue.createElementVNode, h = window.Vue.unref, se = window.Vue.renderList, oe = window.Vue.Fragment, v = window.Vue.toDisplayString, ie = window.Vue.normalizeClass, w = window.Vue.createCommentVNode, le = window.Vue.isRef, ae = { class: "page" }, re = { style: { "text-align": "center", "margin-bottom": "10px", display: "flex", "justify-content": "center" } }, ce = {
  slot: "header",
  class: "header"
}, de = { class: "theme-box-body" }, ue = { class: "theme-desc" }, me = { class: "theme-btn-box" }, fe = { class: "theme-btn-item" }, pe = { key: 0 }, _e = { key: 1 }, he = {
  key: 0,
  class: "theme-btn-item"
}, we = { class: "theme-btn-item" }, ve = {
  key: 1,
  class: "theme-btn-item"
}, ge = { class: "theme-btn-item" }, f = window.ElementPlus.ElMessage, A = window.Vue.ref, be = {
  __name: "ThemeView",
  setup(o) {
    let p = A([]), d = A(!1), C = localStorage.getItem(Z.STORAGE_TOKEN), V = ee.baseURL, O = {
      Authorization: "Bearer " + JSON.parse(C).accessToken
    }, x = A();
    function g() {
      j().then((l) => {
        p.value = l.data;
      });
    }
    function U() {
      d.value = !0;
    }
    function D(l, e, u) {
      l.code === 200 ? (f.success("主题安装成功"), d.value = !1, x.value.clearFiles(), g()) : (f.error(l.msg), x.value.handleRemove(e));
    }
    function P(l) {
      f.error("主题上传失败,请检查网络是否通通畅");
    }
    function B(l) {
      l.isActive !== 1 && J(l.path).then((e) => {
        e.code === 200 ? (f.success("主题启用成功"), g()) : f.error(e.msg);
      });
    }
    function I(l) {
      W(l.path).then((e) => {
        e.code === 200 ? (f.success("主题卸载成功"), g()) : f.error(e.msg);
      });
    }
    function L() {
      S("", "/admin/theme/setting", "");
    }
    function G(l) {
      S(`主题编辑-[${l.name}]`, "/admin/theme/edit/" + l.path, "");
    }
    return g(), (l, e) => {
      const u = r("el-link"), z = r("el-image"), b = r("el-text"), _ = r("font-awesome-icon"), k = r("el-button"), F = r("el-card"), $ = r("el-col"), q = r("el-row"), H = r("el-icon"), K = r("el-upload"), M = r("el-dialog"), R = ne("hasPermission");
      return c(), m("div", ae, [
        a("div", re, [
          N((c(), T(u, {
            type: "primary",
            onClick: U
          }, {
            default: s(() => e[2] || (e[2] = [
              i("安装新主题")
            ])),
            _: 1
          })), [
            [R, ["admin:theme:install"]]
          ]),
          N((c(), m("span", null, e[3] || (e[3] = [
            i("-")
          ]))), [
            [R, ["admin:theme:install"]]
          ]),
          n(u, {
            type: "primary",
            href: "https://www.perfree.org.cn/theme",
            target: "_blank"
          }, {
            default: s(() => e[4] || (e[4] = [
              i("主题仓库")
            ])),
            _: 1
          }),
          e[6] || (e[6] = a("span", null, "-", -1)),
          n(u, {
            type: "primary",
            href: "https://docs.perfree.org.cn/themeDevDocs/",
            target: "_blank"
          }, {
            default: s(() => e[5] || (e[5] = [
              i("主题开发指南")
            ])),
            _: 1
          })
        ]),
        n(q, { gutter: 15 }, {
          default: s(() => [
            (c(!0), m(oe, null, se(h(p), (t) => (c(), T($, {
              xs: 24,
              sm: 12,
              md: 8,
              lg: 8,
              xl: 6,
              key: t.name
            }, {
              default: s(() => [
                n(F, {
                  class: "box-card",
                  "body-style": { padding: "0" }
                }, {
                  default: s(() => [
                    a("div", ce, [
                      a("span", null, v(t.name), 1)
                    ]),
                    a("div", de, [
                      n(z, {
                        style: { width: "100%", height: "220px" },
                        src: "/static/themes/" + t.path + "/" + t.screenshots,
                        "preview-src-list": ["/static/themes/" + t.path + "/" + t.screenshots]
                      }, null, 8, ["src", "preview-src-list"]),
                      a("div", ue, [
                        n(b, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            i(" 主题作者: " + v(t.author.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        n(b, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            i(" 联系邮箱: " + v(t.author.email), 1)
                          ]),
                          _: 2
                        }, 1024),
                        n(b, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            e[7] || (e[7] = i(" 作者网址: ")),
                            n(u, {
                              href: t.author.webSite,
                              target: "_blank",
                              class: "theme-desc-link"
                            }, {
                              default: s(() => [
                                i(v(t.author.webSite), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          _: 2
                        }, 1024),
                        n(b, {
                          "line-clamp": "2",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            i(v(t.description), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    a("div", me, [
                      a("div", fe, [
                        n(k, {
                          link: "",
                          class: "theme-button",
                          onClick: (y) => B(t)
                        }, {
                          default: s(() => [
                            n(_, {
                              icon: "fa-solid fa-square-check",
                              class: ie({ "theme-btn-icon": !0, "theme-active": t.isActive === 1 })
                            }, null, 8, ["class"]),
                            t.isActive === 0 ? (c(), m("span", pe, "启用")) : w("", !0),
                            t.isActive === 1 ? (c(), m("span", _e, "已启用")) : w("", !0)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      t.isActive === 1 ? (c(), m("div", he, [
                        n(k, {
                          link: "",
                          class: "theme-button",
                          onClick: e[0] || (e[0] = (y) => L())
                        }, {
                          default: s(() => [
                            n(_, {
                              icon: "fa-solid fa-wrench",
                              class: "theme-btn-icon"
                            }),
                            e[8] || (e[8] = i(" 设置 "))
                          ]),
                          _: 1
                        })
                      ])) : w("", !0),
                      a("div", we, [
                        n(k, {
                          link: "",
                          class: "theme-button",
                          onClick: (y) => G(t)
                        }, {
                          default: s(() => [
                            n(_, {
                              icon: "fa-solid fa-pencil-alt",
                              class: "theme-btn-icon"
                            }),
                            e[9] || (e[9] = i(" 编辑 "))
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      t.isActive === 0 ? (c(), m("div", ve, [
                        n(k, {
                          link: "",
                          class: "theme-button",
                          onClick: (y) => I(t)
                        }, {
                          default: s(() => [
                            n(_, {
                              icon: "fa-solid fa-trash-can",
                              class: "theme-btn-icon"
                            }),
                            e[10] || (e[10] = i(" 卸载 "))
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])) : w("", !0),
                      a("div", ge, [
                        t.isActive === 1 ? (c(), T(u, {
                          key: 0,
                          class: "theme-button",
                          href: "/",
                          target: "_blank"
                        }, {
                          default: s(() => [
                            n(_, {
                              icon: "fa-solid fa-external-link-square",
                              class: "theme-btn-icon"
                            }),
                            e[11] || (e[11] = i(" 访问 "))
                          ]),
                          _: 1
                        })) : w("", !0),
                        t.isActive === 0 ? (c(), T(u, {
                          key: 1,
                          class: "theme-button",
                          href: "/?previewTheme=" + t.path,
                          target: "_blank"
                        }, {
                          default: s(() => [
                            n(_, {
                              icon: "fa-solid fa-external-link-square",
                              class: "theme-btn-icon"
                            }),
                            e[12] || (e[12] = i(" 预览 "))
                          ]),
                          _: 2
                        }, 1032, ["href"])) : w("", !0)
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024))), 128))
          ]),
          _: 1
        }),
        n(M, {
          modelValue: h(d),
          "onUpdate:modelValue": e[1] || (e[1] = (t) => le(d) ? d.value = t : d = t),
          title: "安装主题",
          width: h(Y)(600),
          draggable: ""
        }, {
          default: s(() => [
            n(K, {
              class: "upload-demo",
              drag: "",
              ref_key: "uploadRef",
              ref: x,
              accept: "application/zip",
              "on-success": D,
              "on-error": P,
              headers: h(O),
              action: h(V) + "/api/auth/theme/installTheme"
            }, {
              tip: s(() => e[13] || (e[13] = [
                a("div", { class: "el-upload__tip" }, " 主题文件为zip格式,若主题文件已存在,则会自动覆盖更新! ", -1)
              ])),
              default: s(() => [
                n(H, { class: "el-icon--upload" }, {
                  default: s(() => [
                    n(h(Q))
                  ]),
                  _: 1
                }),
                e[14] || (e[14] = a("div", { class: "el-upload__text" }, [
                  i(" 拖拽主题文件到此或"),
                  a("em", null, "点击上传主题文件")
                ], -1))
              ]),
              _: 1
            }, 8, ["headers", "action"])
          ]),
          _: 1
        }, 8, ["modelValue", "width"])
      ]);
    };
  }
}, xe = /* @__PURE__ */ X(be, [["__scopeId", "data-v-01b23769"]]);
export {
  xe as default
};
