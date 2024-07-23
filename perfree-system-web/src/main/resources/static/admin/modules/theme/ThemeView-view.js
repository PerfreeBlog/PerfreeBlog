import { a as D, s as K, u as M } from "./lib/theme.js";
import { u as j } from "./lib/@element-plus.js";
const J = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, P = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
}, $ = (_, w) => {
  const i = _.__vccOpts || _;
  for (const [g, x] of w)
    i[g] = x;
  return i;
}, n = window.Vue.createTextVNode, a = window.Vue.resolveComponent, o = window.Vue.withCtx, e = window.Vue.createVNode, s = window.Vue.createElementVNode, f = window.Vue.unref, H = window.Vue.renderList, Q = window.Vue.Fragment, r = window.Vue.openBlock, m = window.Vue.createElementBlock, h = window.Vue.toDisplayString, W = window.Vue.normalizeClass, V = window.Vue.createCommentVNode, X = window.Vue.createBlock, Y = window.Vue.isRef, Z = window.Vue.pushScopeId, ee = window.Vue.popScopeId, b = (_) => (Z("data-v-938a32f8"), _ = _(), ee(), _), te = { class: "page" }, oe = { style: { "text-align": "center", "margin-bottom": "10px", display: "flex", "justify-content": "center" } }, se = /* @__PURE__ */ b(() => /* @__PURE__ */ s("span", null, "-", -1)), ne = /* @__PURE__ */ b(() => /* @__PURE__ */ s("span", null, "-", -1)), le = {
  slot: "header",
  class: "header"
}, ae = { class: "theme-box-body" }, ce = { class: "theme-desc" }, ie = { class: "theme-btn-box" }, de = { class: "theme-btn-item" }, _e = { key: 0 }, re = { key: 1 }, ue = {
  key: 0,
  class: "theme-btn-item"
}, me = { class: "theme-btn-item" }, pe = {
  key: 1,
  class: "theme-btn-item"
}, fe = { class: "theme-btn-item" }, he = /* @__PURE__ */ b(() => /* @__PURE__ */ s("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ n(" 拖拽主题文件到此或"),
  /* @__PURE__ */ s("em", null, "点击上传主题文件")
], -1)), we = /* @__PURE__ */ b(() => /* @__PURE__ */ s("div", { class: "el-upload__tip" }, " 主题文件为zip格式,若主题文件已存在,则会自动覆盖更新! ", -1)), u = window.ElementPlus.ElMessage, T = window.Vue.ref, ve = {
  __name: "ThemeView",
  setup(_) {
    let w = T([]), i = T(!1), g = localStorage.getItem(J.STORAGE_TOKEN), x = P.baseURL, S = {
      Authorization: "Bearer " + JSON.parse(g).accessToken
    }, y = T();
    function v() {
      D().then((l) => {
        w.value = l.data;
      });
    }
    function A() {
      i.value = !0;
    }
    function E(l, c, d) {
      l.code === 200 ? (u.success("主题安装成功"), i.value = !1, y.value.clearFiles(), v()) : (u.error(l.msg), y.value.handleRemove(c));
    }
    function C(l) {
      u.error("主题上传失败,请检查网络是否通通畅");
    }
    function N(l) {
      l.isActive !== 1 && K(l.name).then((c) => {
        c.code === 200 ? (u.success("主题启用成功"), v()) : u.error(c.msg);
      });
    }
    function R(l) {
      M(l.name).then((c) => {
        c.code === 200 ? (u.success("主题卸载成功"), v()) : u.error(c.msg);
      });
    }
    return v(), (l, c) => {
      const d = a("el-button"), I = a("el-image"), k = a("el-text"), O = a("el-link"), p = a("font-awesome-icon"), U = a("el-card"), B = a("el-col"), L = a("el-row"), G = a("el-icon"), z = a("el-upload"), F = a("el-dialog");
      return r(), m("div", te, [
        s("div", oe, [
          e(d, {
            link: "",
            type: "primary",
            onClick: A
          }, {
            default: o(() => [
              n(" 安装新主题 ")
            ]),
            _: 1
          }),
          se,
          e(d, {
            link: "",
            type: "primary"
          }, {
            default: o(() => [
              n(" 主题仓库 ")
            ]),
            _: 1
          }),
          ne,
          e(d, {
            link: "",
            type: "primary"
          }, {
            default: o(() => [
              n(" 主题开发指南 ")
            ]),
            _: 1
          })
        ]),
        e(L, { gutter: 15 }, {
          default: o(() => [
            (r(!0), m(Q, null, H(f(w), (t) => (r(), X(B, {
              xs: 24,
              sm: 12,
              md: 8,
              lg: 8,
              xl: 6,
              key: t.name
            }, {
              default: o(() => [
                e(U, {
                  class: "box-card",
                  "body-style": { padding: "0" }
                }, {
                  default: o(() => [
                    s("div", le, [
                      s("span", null, h(t.name), 1)
                    ]),
                    s("div", ae, [
                      e(I, {
                        style: { width: "100%", height: "220px" },
                        src: "/static/themes/" + t.name + "/" + t.screenshots,
                        "preview-src-list": ["/static/themes/" + t.name + "/" + t.screenshots]
                      }, null, 8, ["src", "preview-src-list"]),
                      s("div", ce, [
                        e(k, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: o(() => [
                            n(" 主题作者: " + h(t.author.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        e(k, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: o(() => [
                            n(" 联系邮箱: " + h(t.author.email), 1)
                          ]),
                          _: 2
                        }, 1024),
                        e(k, {
                          "line-clamp": "1",
                          class: "theme-desc-text"
                        }, {
                          default: o(() => [
                            n(" 作者网址: "),
                            e(O, {
                              href: t.author.webSite,
                              target: "_blank",
                              class: "theme-desc-link"
                            }, {
                              default: o(() => [
                                n(h(t.author.webSite), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          _: 2
                        }, 1024),
                        e(k, {
                          "line-clamp": "2",
                          class: "theme-desc-text"
                        }, {
                          default: o(() => [
                            n(h(t.description), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    s("div", ie, [
                      s("div", de, [
                        e(d, {
                          link: "",
                          class: "theme-button",
                          onClick: (q) => N(t)
                        }, {
                          default: o(() => [
                            e(p, {
                              icon: "fa-solid fa-square-check",
                              class: W({ "theme-btn-icon": !0, "theme-active": t.isActive === 1 })
                            }, null, 8, ["class"]),
                            t.isActive === 0 ? (r(), m("span", _e, "启用")) : V("", !0),
                            t.isActive === 1 ? (r(), m("span", re, "已启用")) : V("", !0)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      t.isActive === 1 ? (r(), m("div", ue, [
                        e(d, {
                          link: "",
                          class: "theme-button"
                        }, {
                          default: o(() => [
                            e(p, {
                              icon: "fa-solid fa-wrench",
                              class: "theme-btn-icon"
                            }),
                            n(" 设置 ")
                          ]),
                          _: 1
                        })
                      ])) : V("", !0),
                      s("div", me, [
                        e(d, {
                          link: "",
                          class: "theme-button"
                        }, {
                          default: o(() => [
                            e(p, {
                              icon: "fa-solid fa-pencil-alt",
                              class: "theme-btn-icon"
                            }),
                            n(" 编辑 ")
                          ]),
                          _: 1
                        })
                      ]),
                      t.isActive === 0 ? (r(), m("div", pe, [
                        e(d, {
                          link: "",
                          class: "theme-button",
                          onClick: (q) => R(t)
                        }, {
                          default: o(() => [
                            e(p, {
                              icon: "fa-solid fa-trash-can",
                              class: "theme-btn-icon"
                            }),
                            n(" 卸载 ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])) : V("", !0),
                      s("div", fe, [
                        e(d, {
                          link: "",
                          class: "theme-button"
                        }, {
                          default: o(() => [
                            e(p, {
                              icon: "fa-solid fa-external-link-square",
                              class: "theme-btn-icon"
                            }),
                            n(" 预览 ")
                          ]),
                          _: 1
                        })
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
        e(F, {
          modelValue: f(i),
          "onUpdate:modelValue": c[0] || (c[0] = (t) => Y(i) ? i.value = t : i = t),
          title: "安装主题",
          width: "500px",
          draggable: ""
        }, {
          default: o(() => [
            e(z, {
              class: "upload-demo",
              drag: "",
              ref_key: "uploadRef",
              ref: y,
              accept: "application/zip",
              "on-success": E,
              "on-error": C,
              headers: f(S),
              action: f(x) + "/api/auth/theme/installTheme"
            }, {
              tip: o(() => [
                we
              ]),
              default: o(() => [
                e(G, { class: "el-icon--upload" }, {
                  default: o(() => [
                    e(f(j))
                  ]),
                  _: 1
                }),
                he
              ]),
              _: 1
            }, 8, ["headers", "action"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
}, be = /* @__PURE__ */ $(ve, [["__scopeId", "data-v-938a32f8"]]);
export {
  be as default
};
