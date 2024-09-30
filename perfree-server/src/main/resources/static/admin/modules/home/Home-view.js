import { F as _ } from "./lib/@fortawesome.js";
import { l as L } from "./lib/@element-plus.js";
import { i as q } from "./lib/echarts.js";
function z() {
  return axios.get("/api/auth/adminHome/getHomeStatistic");
}
function W(o) {
  return axios.get("/api/article/getLatestArticle?num=" + o);
}
function X(o) {
  return axios.get("/api/comment/getLatestComment?num=" + o);
}
const G = window.Pinia.defineStore;
G({
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
    setMenuInit(o) {
      this.menuInit = o;
    },
    setMenuList(o) {
      this.menuList = o;
    },
    setCachedViews(o) {
      this.cachedViews = o;
    }
  },
  persist: {
    enabled: !1
  }
});
function J(o, u) {
  if (arguments.length === 0 || !o)
    return null;
  const h = u || "{y}-{m}-{d} {h}:{i}:{s}";
  let f;
  typeof o == "object" ? f = o : (typeof o == "string" && /^[0-9]+$/.test(o) ? o = parseInt(o) : typeof o == "string" && (o = o.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof o == "number" && o.toString().length === 10 && (o = o * 1e3), f = new Date(o));
  const d = {
    y: f.getFullYear(),
    m: f.getMonth() + 1,
    d: f.getDate(),
    h: f.getHours(),
    i: f.getMinutes(),
    s: f.getSeconds(),
    a: f.getDay()
  };
  return h.replace(/{([ymdhisa])+}/g, (C, k) => {
    let p = d[k];
    return k === "a" ? ["日", "一", "二", "三", "四", "五", "六"][p] : (C.length > 0 && p < 10 && (p = "0" + p), p || 0);
  });
}
function K(o) {
  const u = new Date(o), h = /* @__PURE__ */ new Date(), f = 1e3 * 60, d = f * 60, y = d * 24, C = y * 7, k = y * 30, p = h - u;
  if (p < 0)
    return "刚刚发表";
  const v = p / k, N = p / C, E = p / y, M = p / d, S = p / f;
  let i;
  return v >= 3 ? i = `${u.getFullYear()}-${(u.getMonth() + 1).toString().padStart(2, "0")}-${u.getDate().toString().padStart(2, "0")}` : v >= 1 ? i = `${Math.floor(v)}月前` : N >= 1 ? i = `${Math.floor(N)}周前` : E >= 1 ? i = `${Math.floor(E)}天前` : M >= 1 ? i = `${Math.floor(M)}小时前` : S >= 1 ? i = `${Math.floor(S)}分钟前` : i = "刚刚发表", i;
}
const Q = (o, u) => {
  const h = o.__vccOpts || o;
  for (const [f, d] of u)
    h[f] = d;
  return h;
}, x = window.Vue.resolveComponent, e = window.Vue.createVNode, w = window.Vue.toDisplayString, s = window.Vue.createElementVNode, n = window.Vue.withCtx, l = window.Vue.unref, g = window.Vue.createTextVNode, U = window.Vue.resolveDirective, c = window.Vue.openBlock, m = window.Vue.createElementBlock, T = window.Vue.withDirectives, H = window.Vue.renderList, F = window.Vue.Fragment, A = window.Vue.createBlock, P = window.Vue.createCommentVNode, Z = { class: "panelBox" }, tt = { style: { display: "flex", "flex-wrap": "wrap" } }, et = { class: "loginBoxRight" }, nt = { class: "title" }, st = { class: "panelBox" }, lt = { class: "panelBox" }, ot = { class: "panelBox" }, at = { class: "panelBox" }, it = { class: "panelBox" }, rt = { class: "panelBox" }, ut = { class: "panelBox" }, dt = { style: { "text-align": "center", "margin-top": "10px", "min-height": "500px" } }, ct = { class: "panelBox" }, ft = { style: { "margin-top": "10px", "min-height": "500px" } }, mt = { class: "comment-detail-box" }, pt = { class: "comment-detail-avatar-box" }, gt = ["src"], _t = { key: 1 }, vt = { class: "comment-detail-msg-box" }, wt = { class: "comment-detail-info" }, ht = { class: "comment-detail-name" }, xt = { class: "comment-detail-time" }, yt = { key: 0 }, kt = { key: 1 }, Vt = { key: 2 }, Bt = { class: "comment-detail-content" }, Tt = { class: "panelBox" }, bt = { class: "panelBox" }, Ct = { class: "panelBox" }, It = { class: "link-ul" }, Dt = window.ElementPlus.ElMessage, Lt = window.Vue.onMounted, b = window.Vue.ref, Mt = window.Vue.watch, St = {
  __name: "Home",
  setup(o) {
    var M, S;
    let u = b(!0), h = b(!0), f = b(!0), d = b({}), y = b([]), C = b([]);
    const k = b((S = (M = window.pinia.state._value) == null ? void 0 : M.userStore) == null ? void 0 : S.userInfo);
    Mt(() => {
      var i, t;
      return (t = (i = window.pinia.state._value) == null ? void 0 : i.userStore) == null ? void 0 : t.userInfo;
    }, (i) => {
      k.value = i;
    }), getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim();
    function p() {
      u.value = !0, z().then((i) => {
        i.code === 200 ? (d.value = i.data, q(document.getElementById("attachEcharts")).setOption({
          tooltip: {
            trigger: "item"
          },
          series: [
            {
              name: "附件统计",
              type: "pie",
              radius: "50%",
              data: [
                { value: d.value.attachImageTotal, name: "图片" },
                { value: d.value.attachVideoTotal, name: "视频" },
                { value: d.value.attachAudioTotal, name: "音频" },
                { value: d.value.attachOtherTotal, name: "其他" }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        })) : Dt.error(i.msg), u.value = !1;
      });
    }
    function v(i) {
      router.replace(i);
    }
    Lt(() => {
      p();
    });
    function N() {
      h.value = !0, W(15).then((i) => {
        y.value = i.data, h.value = !1;
      });
    }
    function E() {
      f.value = !0, X(6).then((i) => {
        C.value = i.data, f.value = !1;
      });
    }
    return N(), E(), (i, t) => {
      const j = x("el-avatar"), r = x("el-col"), I = x("el-statistic"), O = x("Calendar"), R = x("el-icon"), V = x("el-link"), Y = x("el-empty"), $ = x("el-row"), D = x("el-button"), B = U("loading");
      return c(), A($, {
        gutter: 15,
        style: { height: "100%" }
      }, {
        default: n(() => [
          e(r, { span: 24 }, {
            default: n(() => [
              s("div", Z, [
                s("div", tt, [
                  e(j, {
                    size: 65,
                    src: k.value.avatar
                  }, null, 8, ["src"]),
                  s("div", et, [
                    s("div", nt, "欢迎登录, " + w(k.value.userName), 1),
                    t[6] || (t[6] = s("div", { class: "welcome" }, "工欲善其事，必先利其器。 -- 论语", -1))
                  ]),
                  t[7] || (t[7] = s("div", {
                    style: { "margin-left": "auto" },
                    class: "weather-widget"
                  }, [
                    s("iframe", {
                      scrolling: "no",
                      src: "https://widget.tianqiapi.com/?style=tg&skin=pitaya",
                      frameborder: "0",
                      width: "470",
                      height: "60",
                      allowtransparency: "true"
                    })
                  ], -1))
                ])
              ])
            ]),
            _: 1
          }),
          e(r, {
            xs: 24,
            sm: 16,
            md: 16,
            lg: 20,
            xl: 20
          }, {
            default: n(() => [
              e($, { gutter: 15 }, {
                default: n(() => [
                  e(r, {
                    xs: 12,
                    sm: 8,
                    md: 4,
                    lg: 4,
                    xl: 4
                  }, {
                    default: n(() => [
                      T((c(), m("div", st, [
                        e(I, {
                          value: l(d).articleTotal
                        }, {
                          title: n(() => [
                            s("span", null, [
                              e(l(_), { icon: "fa-solid fa-file-alt" }),
                              t[8] || (t[8] = g(" 文章数量"))
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [B, l(u)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, {
                    xs: 12,
                    sm: 8,
                    md: 4,
                    lg: 4,
                    xl: 4
                  }, {
                    default: n(() => [
                      T((c(), m("div", lt, [
                        e(I, {
                          value: l(d).journalTotal
                        }, {
                          title: n(() => [
                            s("span", null, [
                              e(l(_), { icon: "fa-solid fa-golf-ball-tee" }),
                              t[9] || (t[9] = g(" 动态数量"))
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [B, l(u)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, {
                    xs: 12,
                    sm: 8,
                    md: 4,
                    lg: 4,
                    xl: 4
                  }, {
                    default: n(() => [
                      T((c(), m("div", ot, [
                        e(I, {
                          value: l(d).categoryTotal
                        }, {
                          title: n(() => [
                            s("span", null, [
                              e(l(_), { icon: "fa-solid fa-bars" }),
                              t[10] || (t[10] = g(" 分类数量"))
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [B, l(u)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, {
                    xs: 12,
                    sm: 8,
                    md: 4,
                    lg: 4,
                    xl: 4
                  }, {
                    default: n(() => [
                      T((c(), m("div", at, [
                        e(I, {
                          value: l(d).tagTotal
                        }, {
                          title: n(() => [
                            s("span", null, [
                              e(l(_), { icon: "fa-solid fa-bookmark" }),
                              t[11] || (t[11] = g(" 标签数量"))
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [B, l(u)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, {
                    xs: 12,
                    sm: 8,
                    md: 4,
                    lg: 4,
                    xl: 4
                  }, {
                    default: n(() => [
                      T((c(), m("div", it, [
                        e(I, {
                          value: l(d).commentTotal
                        }, {
                          title: n(() => [
                            s("span", null, [
                              e(l(_), { icon: "fa-solid fa-comment-alt" }),
                              t[12] || (t[12] = g(" 评论数量"))
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [B, l(u)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, {
                    xs: 12,
                    sm: 8,
                    md: 4,
                    lg: 4,
                    xl: 4
                  }, {
                    default: n(() => [
                      T((c(), m("div", rt, [
                        e(I, {
                          value: l(d).userTotal
                        }, {
                          title: n(() => [
                            s("span", null, [
                              e(l(_), { icon: "fa-solid fa-user" }),
                              t[13] || (t[13] = g(" 用户数量"))
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [B, l(u)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, { span: 24 }, {
                    default: n(() => [
                      e($, { gutter: 15 }, {
                        default: n(() => [
                          e(r, {
                            xs: 24,
                            sm: 24,
                            md: 12,
                            lg: 12,
                            xl: 12
                          }, {
                            default: n(() => [
                              s("div", ut, [
                                t[14] || (t[14] = s("div", { class: "panelTitle" }, "最新文章", -1)),
                                s("div", dt, [
                                  (c(!0), m(F, null, H(l(y), (a) => (c(), A(V, {
                                    class: "latest-article",
                                    href: "/article/" + a.slug,
                                    target: "_blank"
                                  }, {
                                    default: n(() => [
                                      e(R, null, {
                                        default: n(() => [
                                          e(O)
                                        ]),
                                        _: 1
                                      }),
                                      g(" " + w(l(J)(a.createTime, "{y}-{m}-{d}")) + " | " + w(a.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]))), 256)),
                                  l(y).length <= 0 ? (c(), A(Y, {
                                    key: 0,
                                    description: "暂无文章"
                                  })) : P("", !0)
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          e(r, {
                            xs: 24,
                            sm: 24,
                            md: 12,
                            lg: 12,
                            xl: 12
                          }, {
                            default: n(() => [
                              s("div", ct, [
                                t[15] || (t[15] = s("div", { class: "panelTitle" }, "最新评论", -1)),
                                s("div", ft, [
                                  (c(!0), m(F, null, H(l(C), (a) => (c(), m("div", mt, [
                                    s("div", pt, [
                                      a.avatar || a.userInfo && a.userInfo.avatar ? (c(), m("img", {
                                        key: 0,
                                        src: a.userInfo ? a.userInfo.avatar : a.avatar,
                                        width: "35px",
                                        height: "35px"
                                      }, null, 8, gt)) : (c(), m("span", _t, w(a.userInfo ? a.userInfo.userName[0] : a.userName[0]), 1))
                                    ]),
                                    s("div", vt, [
                                      s("div", wt, [
                                        s("span", ht, w(a.userInfo ? a.userInfo.userName : a.userName), 1),
                                        s("span", xt, [
                                          a.articleType === "journal" ? (c(), m("span", yt, "发表于动态标识为《" + w(a.articleId) + "》", 1)) : P("", !0),
                                          a.articleType === "article" ? (c(), m("span", kt, "发表于《" + w(a.articleTitle) + "》", 1)) : P("", !0),
                                          a.articleType === "page" ? (c(), m("span", Vt, "发表于《" + w(a.articleTitle) + "》", 1)) : P("", !0),
                                          g(" " + w(l(K)(a.createTime)), 1)
                                        ])
                                      ]),
                                      s("div", Bt, w(a.content), 1)
                                    ])
                                  ]))), 256))
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          e(r, {
            xs: 24,
            sm: 8,
            md: 8,
            lg: 4,
            xl: 4
          }, {
            default: n(() => [
              e($, { gutter: 10 }, {
                default: n(() => [
                  e(r, { span: 24 }, {
                    default: n(() => [
                      s("div", Tt, [
                        t[22] || (t[22] = s("div", { class: "panelTitle" }, "快捷功能", -1)),
                        e($, null, {
                          default: n(() => [
                            e(r, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: n(() => [
                                e(D, {
                                  plain: "",
                                  onClick: t[0] || (t[0] = (a) => v("/admin/article/create"))
                                }, {
                                  default: n(() => [
                                    e(l(_), { icon: "fa-solid fa-pencil-alt" })
                                  ]),
                                  _: 1
                                }),
                                t[16] || (t[16] = s("div", { class: "shortcuts-item-name" }, "写文章", -1))
                              ]),
                              _: 1
                            }),
                            e(r, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: n(() => [
                                e(D, {
                                  plain: "",
                                  onClick: t[1] || (t[1] = (a) => v("/admin/article"))
                                }, {
                                  default: n(() => [
                                    e(l(_), { icon: "fa-solid fa-file-alt" })
                                  ]),
                                  _: 1
                                }),
                                t[17] || (t[17] = s("div", { class: "shortcuts-item-name" }, "文章管理", -1))
                              ]),
                              _: 1
                            }),
                            e(r, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: n(() => [
                                e(D, {
                                  plain: "",
                                  onClick: t[2] || (t[2] = (a) => v("/admin/journal"))
                                }, {
                                  default: n(() => [
                                    e(l(_), { icon: "fa-solid fa-golf-ball-tee" })
                                  ]),
                                  _: 1
                                }),
                                t[18] || (t[18] = s("div", { class: "shortcuts-item-name" }, "动态管理", -1))
                              ]),
                              _: 1
                            }),
                            e(r, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: n(() => [
                                e(D, {
                                  plain: "",
                                  onClick: t[3] || (t[3] = (a) => v("/admin/category"))
                                }, {
                                  default: n(() => [
                                    e(l(_), { icon: "fa-solid fa-bars" })
                                  ]),
                                  _: 1
                                }),
                                t[19] || (t[19] = s("div", { class: "shortcuts-item-name" }, "分类管理", -1))
                              ]),
                              _: 1
                            }),
                            e(r, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: n(() => [
                                e(D, {
                                  plain: "",
                                  onClick: t[4] || (t[4] = (a) => v("/admin/tag"))
                                }, {
                                  default: n(() => [
                                    e(l(_), { icon: "fa-solid fa-bookmark" })
                                  ]),
                                  _: 1
                                }),
                                t[20] || (t[20] = s("div", { class: "shortcuts-item-name" }, "标签管理", -1))
                              ]),
                              _: 1
                            }),
                            e(r, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: n(() => [
                                e(D, {
                                  plain: "",
                                  onClick: t[5] || (t[5] = (a) => v("/admin/plugin"))
                                }, {
                                  default: n(() => [
                                    e(l(_), { icon: "fa-solid fa-plug-circle-exclamation" })
                                  ]),
                                  _: 1
                                }),
                                t[21] || (t[21] = s("div", { class: "shortcuts-item-name" }, "插件管理", -1))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, { span: 24 }, {
                    default: n(() => [
                      T((c(), m("div", bt, t[23] || (t[23] = [
                        s("div", { class: "panelTitle" }, "附件统计", -1),
                        s("div", {
                          class: "echartsBox",
                          id: "attachEcharts",
                          style: { height: "130px" }
                        }, null, -1)
                      ]))), [
                        [B, l(u)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(r, { span: 24 }, {
                    default: n(() => [
                      s("div", Ct, [
                        t[30] || (t[30] = s("div", { class: "panelTitle" }, "相关文档", -1)),
                        s("ul", It, [
                          s("li", null, [
                            e(V, {
                              icon: l(L),
                              href: "https://www.perfree.org.cn",
                              target: "_blank"
                            }, {
                              default: n(() => t[24] || (t[24] = [
                                g("PerfreeBlog 官网")
                              ])),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          s("li", null, [
                            e(V, {
                              icon: l(L),
                              href: "https://www.perfree.org.cn/theme",
                              target: "_blank"
                            }, {
                              default: n(() => t[25] || (t[25] = [
                                g("PerfreeBlog 主题仓库")
                              ])),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          s("li", null, [
                            e(V, {
                              icon: l(L),
                              href: "https://www.perfree.org.cn/plugin",
                              target: "_blank"
                            }, {
                              default: n(() => t[26] || (t[26] = [
                                g("PerfreeBlog 插件仓库")
                              ])),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          s("li", null, [
                            e(V, {
                              icon: l(L),
                              href: "https://www.perfree.org.cn/useDoc",
                              target: "_blank"
                            }, {
                              default: n(() => t[27] || (t[27] = [
                                g("PerfreeBlog 使用文档")
                              ])),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          s("li", null, [
                            e(V, {
                              icon: l(L),
                              href: "https://www.perfree.org.cn/themeDevDoc",
                              target: "_blank"
                            }, {
                              default: n(() => t[28] || (t[28] = [
                                g("PerfreeBlog 主题开发文档")
                              ])),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          s("li", null, [
                            e(V, {
                              icon: l(L),
                              href: "https://www.perfree.org.cn/pluginDevDoc",
                              target: "_blank"
                            }, {
                              default: n(() => t[29] || (t[29] = [
                                g("PerfreeBlog 插件开发文档")
                              ])),
                              _: 1
                            }, 8, ["icon"])
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}, Pt = /* @__PURE__ */ Q(St, [["__scopeId", "data-v-90528c19"]]);
export {
  Pt as default
};
