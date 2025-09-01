import { s as te, r as O, p as ne, u as oe, l as le, a as ie, d as ae, b as se } from "./lib/@element-plus.js";
import { p as re, d as ue, e as de, u as ce } from "./lib/plugin.js";
const pe = window.Pinia.defineStore, me = pe({
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
function fe() {
  return axios.get("/api/auth/menuAdminList");
}
function ge(e, a) {
  if (arguments.length === 0 || !e)
    return null;
  const g = a || "{y}-{m}-{d} {h}:{i}:{s}";
  let s;
  typeof e == "object" ? s = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), s = new Date(e));
  const d = {
    y: s.getFullYear(),
    m: s.getMonth() + 1,
    d: s.getDate(),
    h: s.getHours(),
    i: s.getMinutes(),
    s: s.getSeconds(),
    a: s.getDay()
  };
  return g.replace(/{([ymdhisa])+}/g, (x, T) => {
    let y = d[T];
    return T === "a" ? ["日", "一", "二", "三", "四", "五", "六"][y] : (x.length > 0 && y < 10 && (y = "0" + y), y || 0);
  });
}
function he() {
  return new Promise((e, a) => {
    const g = me();
    fe().then((s) => {
      if (s.code === 200) {
        let d = s.data;
        d.unshift(
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
        ), g.setMenuList(d), e();
      }
    });
  });
}
function we(e) {
  return window.document.body.clientWidth < e ? window.document.body.clientWidth : e;
}
const _e = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, ve = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
}, be = window.Pinia.defineStore;
be({
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
let P = [{ name: "首页", hasClose: !1, path: "/admin", currActive: !0 }];
function ye(e, a, g) {
  e && P.findIndex((d) => d.path === a) < 0 && P.push({
    name: e,
    hasClose: !0,
    path: a,
    currActive: !1
  }), router.push({
    path: a,
    params: g
  });
}
const u = window.Vue.resolveComponent, n = window.Vue.createVNode, o = window.Vue.withCtx, r = window.Vue.unref, p = window.Vue.createTextVNode, U = window.Vue.resolveDirective, f = window.Vue.openBlock, _ = window.Vue.createBlock, k = window.Vue.withDirectives, v = window.Vue.createElementVNode, z = window.Vue.createCommentVNode, B = window.Vue.toDisplayString, ke = window.Vue.isRef, Ve = window.Vue.createElementBlock, Ce = { class: "page" }, Te = { class: "search-box" }, xe = { class: "right-tool" }, Se = { class: "table-box" }, Re = ["href"], m = window.ElementPlus.ElMessage, E = window.ElementPlus.ElMessageBox, V = window.Vue.ref, Ie = {
  __name: "PluginView",
  setup(e) {
    const a = V({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    }), g = V();
    let s = V([]), d = V(!1), b = V(!1), x = localStorage.getItem(_e.STORAGE_TOKEN), T = ve.baseURL, y = {
      Authorization: "Bearer " + JSON.parse(x).accessToken
    }, S = V();
    function L(i) {
      ye(`插件设置[${i.name}]`, "/admin/plugin/setting/" + i.pluginId, "");
    }
    function h() {
      d.value = !0, re(a.value).then((i) => {
        s.value = i.data.list, a.value.total = i.data.total, d.value = !1;
      });
    }
    function D() {
      a.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, g.value.resetFields(), h();
    }
    function M() {
      b.value = !0;
    }
    function F(i, t, R) {
      i.code === 200 ? (m.success("插件安装成功"), b.value = !1, S.value.clearFiles(), h()) : (m.error(i.msg), S.value.handleRemove(t));
    }
    function G(i) {
      m.error("插件上传失败,请检查网络是否通通畅");
    }
    function $(i) {
      E.confirm("确定要禁用[" + i.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ue(i.pluginId).then((t) => {
          t.code === 200 && t.data ? (he().then((R) => {
          }), m.success("插件禁用成功"), h()) : m.error(t.msg);
        });
      }).catch(() => {
      });
    }
    function j(i) {
      E.confirm("确定要启用[" + i.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        de(i.pluginId).then((t) => {
          t.code === 200 && t.data ? (m.success("插件启用成功"), window.location.reload()) : m.error(t.msg);
        });
      }).catch(() => {
      });
    }
    function H(i) {
      E.confirm("确定要卸载[" + i.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ce(i.pluginId).then((t) => {
          t.code === 200 ? t.data ? (m.success("插件卸载成功"), h()) : m.error("插件卸载失败") : m.error(t.msg);
        });
      }).catch(() => {
      });
    }
    return h(), (i, t) => {
      const R = u("el-input"), I = u("el-form-item"), w = u("el-button"), q = u("el-form"), K = u("el-col"), W = u("el-row"), c = u("el-table-column"), N = u("el-tag"), J = u("el-table"), Y = u("el-pagination"), Q = u("el-icon"), X = u("el-upload"), Z = u("el-dialog"), C = U("hasPermission"), ee = U("loading");
      return f(), Ve("div", Ce, [
        v("div", Te, [
          n(q, {
            inline: !0,
            model: a.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: g
          }, {
            default: o(() => [
              n(I, { label: "插件名称" }, {
                default: o(() => [
                  n(R, {
                    modelValue: a.value.name,
                    "onUpdate:modelValue": t[0] || (t[0] = (l) => a.value.name = l),
                    placeholder: "请输入插件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(I, null, {
                default: o(() => [
                  k((f(), _(w, {
                    type: "primary",
                    onClick: h,
                    icon: r(te)
                  }, {
                    default: o(() => t[4] || (t[4] = [
                      p("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [C, ["admin:plugin:query"]]
                  ]),
                  n(w, {
                    icon: r(O),
                    onClick: D
                  }, {
                    default: o(() => t[5] || (t[5] = [
                      p("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        n(W, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            n(K, { span: 1.5 }, {
              default: o(() => [
                k((f(), _(w, {
                  icon: r(ne),
                  type: "primary",
                  plain: "",
                  onClick: M
                }, {
                  default: o(() => t[6] || (t[6] = [
                    p("安装插件")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [C, ["admin:plugin:install"]]
                ])
              ]),
              _: 1
            }),
            v("div", xe, [
              n(w, {
                icon: r(O),
                circle: "",
                onClick: h
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        v("div", Se, [
          k((f(), _(J, {
            data: r(s),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              n(c, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              n(c, {
                prop: "name",
                label: "插件名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              n(c, {
                prop: "desc",
                label: "描述信息",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }),
              n(c, {
                prop: "version",
                label: "版本",
                "min-width": "80",
                "show-overflow-tooltip": ""
              }),
              n(c, {
                prop: "status",
                label: "状态",
                width: "100"
              }, {
                default: o((l) => [
                  l.row.status === 1 ? (f(), _(N, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: o(() => t[7] || (t[7] = [
                      p("已启用")
                    ])),
                    _: 1
                  })) : (f(), _(N, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: o(() => t[8] || (t[8] = [
                      p("已禁用")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              n(c, {
                prop: "author",
                label: "作者",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              n(c, {
                prop: "website",
                label: "作者网站",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }, {
                default: o((l) => [
                  v("a", {
                    href: l.row.website,
                    target: "_blank"
                  }, B(l.row.website), 9, Re)
                ]),
                _: 1
              }),
              n(c, {
                prop: "email",
                label: "联系方式",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              n(c, {
                prop: "createTime",
                label: "安装时间",
                "min-width": "180"
              }, {
                default: o((l) => [
                  v("span", null, B(r(ge)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              n(c, {
                label: "操作",
                width: "210",
                fixed: "right"
              }, {
                default: o((l) => [
                  l.row.status === 0 ? k((f(), _(w, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(oe),
                    onClick: (A) => j(l.row)
                  }, {
                    default: o(() => t[9] || (t[9] = [
                      p("启用")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [C, ["admin:plugin:enable"]]
                  ]) : z("", !0),
                  l.row.status === 1 ? k((f(), _(w, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(le),
                    onClick: (A) => $(l.row)
                  }, {
                    default: o(() => t[10] || (t[10] = [
                      p("禁用")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [C, ["admin:plugin:disable"]]
                  ]) : z("", !0),
                  n(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(ie),
                    onClick: (A) => L(l.row)
                  }, {
                    default: o(() => t[11] || (t[11] = [
                      p("插件设置")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  k((f(), _(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(ae),
                    onClick: (A) => H(l.row)
                  }, {
                    default: o(() => t[12] || (t[12] = [
                      p("卸载")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [C, ["admin:plugin:uninstall"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ee, r(d)]
          ]),
          n(Y, {
            "current-page": a.value.pageNo,
            "onUpdate:currentPage": t[1] || (t[1] = (l) => a.value.pageNo = l),
            "page-size": a.value.pageSize,
            "onUpdate:pageSize": t[2] || (t[2] = (l) => a.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: h,
            total: a.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        n(Z, {
          modelValue: r(b),
          "onUpdate:modelValue": t[3] || (t[3] = (l) => ke(b) ? b.value = l : b = l),
          title: "安装插件",
          width: r(we)(600),
          draggable: ""
        }, {
          default: o(() => [
            n(X, {
              class: "upload-demo",
              drag: "",
              ref_key: "uploadRef",
              ref: S,
              accept: "application/zip",
              "on-success": F,
              "on-error": G,
              headers: r(y),
              action: r(T) + "/api/auth/plugins/installPlugin"
            }, {
              tip: o(() => t[13] || (t[13] = [
                v("div", { class: "el-upload__tip" }, " 插件文件为zip格式,若插件已存在,则会自动覆盖更新! ", -1)
              ])),
              default: o(() => [
                n(Q, { class: "el-icon--upload" }, {
                  default: o(() => [
                    n(r(se))
                  ]),
                  _: 1
                }),
                t[14] || (t[14] = v("div", { class: "el-upload__text" }, [
                  p(" 拖拽插件文件到此或"),
                  v("em", null, "点击上传插件文件")
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
};
export {
  Ie as default
};
