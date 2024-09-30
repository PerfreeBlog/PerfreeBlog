import { c as K, d as M, u as j } from "./lib/theme.js";
import { u as J } from "./lib/@element-plus.js";
import { _ as W, d as Q } from "./lib/_plugin-vue_export-helper.js";
const X = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, Y = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
}, Z = window.Pinia.defineStore;
Z({
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
let R = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function E(o, m, d) {
  o && R.findIndex((T) => T.path === m) < 0 && R.push({
    name: o,
    hasClose: !0,
    path: m,
    currActive: !1
  }), router.push({
    path: m,
    params: d
  });
}
const l = window.Vue.createTextVNode, r = window.Vue.resolveComponent, s = window.Vue.withCtx, t = window.Vue.createVNode, a = window.Vue.createElementVNode, _ = window.Vue.unref, ee = window.Vue.renderList, te = window.Vue.Fragment, c = window.Vue.openBlock, h = window.Vue.createElementBlock, v = window.Vue.toDisplayString, ne = window.Vue.normalizeClass, w = window.Vue.createCommentVNode, y = window.Vue.createBlock, se = window.Vue.isRef, oe = { class: "page" }, ie = { style: { "text-align": "center", "margin-bottom": "10px", display: "flex", "justify-content": "center" } }, le = {
  slot: "header",
  class: "header"
}, ae = { class: "theme-box-body" }, re = { class: "theme-desc" }, ce = { class: "theme-btn-box" }, de = { class: "theme-btn-item" }, ue = { key: 0 }, me = { key: 1 }, fe = {
  key: 0,
  class: "theme-btn-item"
}, pe = { class: "theme-btn-item" }, _e = {
  key: 1,
  class: "theme-btn-item"
}, he = { class: "theme-btn-item" }, u = window.ElementPlus.ElMessage, A = window.Vue.ref, we = {
  __name: "ThemeView",
  setup(o) {
    let m = A([]), d = A(!1), C = localStorage.getItem(X.STORAGE_TOKEN), T = Y.baseURL, S = {
      Authorization: "Bearer " + JSON.parse(C).accessToken
    }, x = A();
    function b() {
      K().then((i) => {
        m.value = i.data;
      });
    }
    function N() {
      d.value = !0;
    }
    function O(i, e, g) {
      i.code === 200 ? (u.success("主题安装成功"), d.value = !1, x.value.clearFiles(), b()) : (u.error(i.msg), x.value.handleRemove(e));
    }
    function U(i) {
      u.error("主题上传失败,请检查网络是否通通畅");
    }
    function B(i) {
      i.isActive !== 1 && M(i.name).then((e) => {
        e.code === 200 ? (u.success("主题启用成功"), b()) : u.error(e.msg);
      });
    }
    function I(i) {
      j(i.name).then((e) => {
        e.code === 200 ? (u.success("主题卸载成功"), b()) : u.error(e.msg);
      });
    }
    function L() {
      E("", "/admin/theme/setting", "");
    }
    function P(i) {
      E(`主题编辑-[${i.name}]`, "/admin/theme/edit/" + i.name, "");
    }
    return b(), (i, e) => {
      const g = r("el-link"), G = r("el-image"), k = r("el-text"), f = r("font-awesome-icon"), p = r("el-button"), z = r("el-card"), D = r("el-col"), F = r("el-row"), $ = r("el-icon"), q = r("el-upload"), H = r("el-dialog");
      return c(), h("div", oe, [
        a("div", ie, [
          t(g, {
            type: "primary",
            onClick: N
          }, {
            default: s(() => e[2] || (e[2] = [
              l("安装新主题")
            ])),
            _: 1
          }),
          e[5] || (e[5] = a("span", null, "-", -1)),
          t(g, {
            type: "primary",
            href: "https://www.perfree.org.cn/theme",
            target: "_blank"
          }, {
            default: s(() => e[3] || (e[3] = [
              l("主题仓库")
            ])),
            _: 1
          }),
          e[6] || (e[6] = a("span", null, "-", -1)),
          t(g, {
            type: "primary",
            href: "https://www.perfree.org.cn/themeDevDoc",
            target: "_blank"
          }, {
            default: s(() => e[4] || (e[4] = [
              l("主题开发指南")
            ])),
            _: 1
          })
        ]),
        t(F, { gutter: 15 }, {
          default: s(() => [
            (c(!0), h(te, null, ee(_(m), (n) => (c(), y(D, {
              xs: 24,
              sm: 12,
              md: 8,
              lg: 8,
              xl: 6,
              key: n.name
            }, {
              default: s(() => [
                t(z, {
                  class: "box-card",
                  "body-style": { padding: "0" }
                }, {
                  default: s(() => [
                    a("div", le, [
                      a("span", null, v(n.name), 1)
                    ]),
                    a("div", ae, [
                      t(G, {
                        style: { width: "100%", height: "220px" },
                        src: "/api/static/themes/" + n.name + "/" + n.screenshots,
                        "preview-src-list": ["/api/static/themes/" + n.name + "/" + n.screenshots]
                      }, null, 8, ["src", "preview-src-list"]),
                      a("div", re, [
                        t(k, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            l(" 主题作者: " + v(n.author.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        t(k, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            l(" 联系邮箱: " + v(n.author.email), 1)
                          ]),
                          _: 2
                        }, 1024),
                        t(k, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            e[7] || (e[7] = l(" 作者网址: ")),
                            t(g, {
                              href: n.author.webSite,
                              target: "_blank",
                              class: "theme-desc-link"
                            }, {
                              default: s(() => [
                                l(v(n.author.webSite), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          _: 2
                        }, 1024),
                        t(k, {
                          "line-clamp": "2",
                          class: "theme-desc-text"
                        }, {
                          default: s(() => [
                            l(v(n.description), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    a("div", ce, [
                      a("div", de, [
                        t(p, {
                          link: "",
                          class: "theme-button",
                          onClick: (V) => B(n)
                        }, {
                          default: s(() => [
                            t(f, {
                              icon: "fa-solid fa-square-check",
                              class: ne({ "theme-btn-icon": !0, "theme-active": n.isActive === 1 })
                            }, null, 8, ["class"]),
                            n.isActive === 0 ? (c(), h("span", ue, "启用")) : w("", !0),
                            n.isActive === 1 ? (c(), h("span", me, "已启用")) : w("", !0)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      n.isActive === 1 ? (c(), h("div", fe, [
                        t(p, {
                          link: "",
                          class: "theme-button",
                          onClick: e[0] || (e[0] = (V) => L())
                        }, {
                          default: s(() => [
                            t(f, {
                              icon: "fa-solid fa-wrench",
                              class: "theme-btn-icon"
                            }),
                            e[8] || (e[8] = l(" 设置 "))
                          ]),
                          _: 1
                        })
                      ])) : w("", !0),
                      a("div", pe, [
                        t(p, {
                          link: "",
                          class: "theme-button",
                          onClick: (V) => P(n)
                        }, {
                          default: s(() => [
                            t(f, {
                              icon: "fa-solid fa-pencil-alt",
                              class: "theme-btn-icon"
                            }),
                            e[9] || (e[9] = l(" 编辑 "))
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      n.isActive === 0 ? (c(), h("div", _e, [
                        t(p, {
                          link: "",
                          class: "theme-button",
                          onClick: (V) => I(n)
                        }, {
                          default: s(() => [
                            t(f, {
                              icon: "fa-solid fa-trash-can",
                              class: "theme-btn-icon"
                            }),
                            e[10] || (e[10] = l(" 卸载 "))
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])) : w("", !0),
                      a("div", he, [
                        n.isActive === 1 ? (c(), y(p, {
                          key: 0,
                          link: "",
                          class: "theme-button"
                        }, {
                          default: s(() => [
                            t(f, {
                              icon: "fa-solid fa-external-link-square",
                              class: "theme-btn-icon"
                            }),
                            e[11] || (e[11] = l(" 访问 "))
                          ]),
                          _: 1
                        })) : w("", !0),
                        n.isActive === 0 ? (c(), y(p, {
                          key: 1,
                          link: "",
                          class: "theme-button"
                        }, {
                          default: s(() => [
                            t(f, {
                              icon: "fa-solid fa-external-link-square",
                              class: "theme-btn-icon"
                            }),
                            e[12] || (e[12] = l(" 预览 "))
                          ]),
                          _: 1
                        })) : w("", !0)
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
        t(H, {
          modelValue: _(d),
          "onUpdate:modelValue": e[1] || (e[1] = (n) => se(d) ? d.value = n : d = n),
          title: "安装主题",
          width: _(Q)(600),
          draggable: ""
        }, {
          default: s(() => [
            t(q, {
              class: "upload-demo",
              drag: "",
              ref_key: "uploadRef",
              ref: x,
              accept: "application/zip",
              "on-success": O,
              "on-error": U,
              headers: _(S),
              action: _(T) + "/api/auth/theme/installTheme"
            }, {
              tip: s(() => e[13] || (e[13] = [
                a("div", { class: "el-upload__tip" }, " 主题文件为zip格式,若主题文件已存在,则会自动覆盖更新! ", -1)
              ])),
              default: s(() => [
                t($, { class: "el-icon--upload" }, {
                  default: s(() => [
                    t(_(J))
                  ]),
                  _: 1
                }),
                e[14] || (e[14] = a("div", { class: "el-upload__text" }, [
                  l(" 拖拽主题文件到此或"),
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
}, ke = /* @__PURE__ */ W(we, [["__scopeId", "data-v-146d5e21"]]);
export {
  ke as default
};
