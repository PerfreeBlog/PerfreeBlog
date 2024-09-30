import { s as ke, r as we, p as Ve, e as Ue, d as Te } from "./lib/@element-plus.js";
function ae(u) {
  return axios.post("/api/auth/menu/page", u);
}
function Ee(u) {
  return axios.get("/api/auth/menu/get?id=" + u);
}
function $e(u) {
  return axios.post("/api/auth/menu/add", u);
}
function Le(u) {
  return axios.post("/api/auth/menu/update", u);
}
function Pe(u) {
  return axios.delete("/api/auth/menu/del?id=" + u);
}
const qe = window.Pinia.defineStore;
qe({
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
    setMenuInit(u) {
      this.menuInit = u;
    },
    setMenuList(u) {
      this.menuList = u;
    },
    setCachedViews(u) {
      this.cachedViews = u;
    }
  },
  persist: {
    enabled: !1
  }
});
function ue(u, $, f, p, y) {
  $ = $ || "id", f = f || "parentId", y = y || Math.min.apply(Math, u.map((g) => g[f])) || 0;
  const I = JSON.parse(JSON.stringify(u)), c = I.filter((g) => {
    let P = I.filter((b) => g[$] === b[f]);
    return P.length > 0 && (g.children = P), g[f] === y;
  });
  return c.length === 0 && u.length > 0 ? u : c.length > 0 ? c : u;
}
function Be(u) {
  return window.document.body.clientWidth < u ? window.document.body.clientWidth : u;
}
const Ie = (u, $) => {
  const f = u.__vccOpts || u;
  for (const [p, y] of $)
    f[p] = y;
  return f;
}, N = window.Vue.unref, J = window.Vue.resolveComponent, M = window.Vue.openBlock, X = window.Vue.createBlock, Me = window.Vue.createCommentVNode, le = window.Vue.isRef, A = window.Vue.withCtx, D = window.Vue.createVNode, ie = window.Vue.renderList, de = window.Vue.Fragment, se = window.Vue.createElementBlock, re = window.Vue.normalizeClass, te = window.Vue.createElementVNode, Ae = { class: "icon-panel" }, Re = { class: "icon-panel" }, Se = { class: "icon-panel" }, me = window["fontawesome-svg-core"].library, De = window.Vue.onMounted, Oe = window.Vue.onUnmounted, T = window.Vue.ref, je = window.Vue.watch, ze = window.ElementPlus.ElMessage, Je = {
  __name: "el-icon-picker",
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u, { emit: $ }) {
    let f = T([]);
    Object.keys(me.definitions.fas).forEach((v) => {
      f.value.push("fa-solid fa-" + v);
    });
    let p = T([]);
    Object.keys(me.definitions.far).forEach((v) => {
      p.value.push("fa-regular fa-" + v);
    });
    let y = T([]);
    Object.keys(me.definitions.fab).forEach((v) => {
      y.value.push("fa-brands fa-" + v);
    });
    const I = u;
    je(() => I.modelValue, (v) => {
      c.value = v;
    });
    let c = T(I.modelValue), g = T("fas");
    const P = $, b = T(), j = T();
    let k = T(null), R = T(!1), o = T([...f.value]), S = T([...p.value]), h = T([...y.value]);
    function G(v) {
      c.value = v, P("update:modelValue", v), Z();
    }
    function ne() {
      [...f.value, ...p.value, ...y.value].includes(c.value) ? P("update:modelValue", c.value) : c.value = "";
    }
    function K() {
      if (k.value) {
        const v = k.value.toLowerCase();
        o.value = f.value.filter((s) => s.includes(v)), S.value = p.value.filter((s) => s.includes(v)), h.value = y.value.filter((s) => s.includes(v)), o.value.length > 0 ? g.value = "fas" : S.value.length > 0 ? g.value = "far" : h.value.length > 0 ? g.value = "fab" : (ze.warning("未查找到图标"), k.value = null, K());
      } else
        o.value = [...f.value], S.value = [...p.value], h.value = [...y.value];
    }
    De(() => {
      document.addEventListener("mousedown", Y);
    }), Oe(() => {
      document.removeEventListener("mousedown", Y);
    });
    function Y(v) {
      const s = v.composedPath();
      b.value && !s.includes(b.value) && !s.includes(j.value) && Z();
    }
    function Z() {
      R.value = !1, k.value = null, o.value = [...f.value], S.value = [...p.value], h.value = [...y.value];
    }
    return (v, s) => {
      const z = J("font-awesome-icon"), _ = J("el-input"), e = J("el-button"), x = J("el-tab-pane"), w = J("el-tabs"), L = J("el-popover");
      return M(), X(L, {
        visible: N(R),
        width: "500",
        placement: "bottom-start",
        ref_key: "iconSelect",
        ref: b
      }, {
        reference: A(() => [
          D(_, {
            modelValue: N(c),
            "onUpdate:modelValue": s[0] || (s[0] = (i) => le(c) ? c.value = i : c = i),
            class: "w-50 m-2",
            placeholder: "请选择图标",
            onInput: ne,
            onClick: s[1] || (s[1] = (i) => le(R) ? R.value = !0 : R = !0)
          }, {
            prefix: A(() => [
              N(c) ? (M(), X(z, {
                key: 0,
                icon: N(c)
              }, null, 8, ["icon"])) : Me("", !0)
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        default: A(() => [
          te("div", {
            class: "el-icon-picker",
            ref_key: "iconPicker",
            ref: j
          }, [
            D(_, {
              modelValue: N(k),
              "onUpdate:modelValue": s[2] || (s[2] = (i) => le(k) ? k.value = i : k = i),
              placeholder: "搜索图标"
            }, {
              append: A(() => [
                D(e, {
                  icon: N(ke),
                  onClick: K
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            D(w, {
              modelValue: N(g),
              "onUpdate:modelValue": s[3] || (s[3] = (i) => le(g) ? g.value = i : g = i)
            }, {
              default: A(() => [
                D(x, {
                  label: "实心图标",
                  name: "fas"
                }, {
                  default: A(() => [
                    te("div", Ae, [
                      (M(!0), se(de, null, ie(N(o), (i) => (M(), X(z, {
                        class: re([i, "icon", { "icon-active": i === N(c) }]),
                        icon: i,
                        key: i,
                        onClick: (U) => G(i)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                }),
                D(x, {
                  label: "常规图标",
                  name: "far"
                }, {
                  default: A(() => [
                    te("div", Re, [
                      (M(!0), se(de, null, ie(N(S), (i) => (M(), X(z, {
                        class: re([i, "icon", { "icon-active": i === N(c) }]),
                        icon: i,
                        key: i,
                        onClick: (U) => G(i)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                }),
                D(x, {
                  label: "品牌图标",
                  name: "fab"
                }, {
                  default: A(() => [
                    te("div", Se, [
                      (M(!0), se(de, null, ie(N(h), (i) => (M(), X(z, {
                        class: re([i, "icon", { "icon-active": i === N(c) }]),
                        icon: i,
                        key: i,
                        onClick: (U) => G(i)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ], 512)
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
}, We = /* @__PURE__ */ Ie(Je, [["__scopeId", "data-v-feaa3af9"]]);
function Ge() {
  return axios.get("/api/auth/article/getAllPage");
}
const V = window.Vue.resolveComponent, l = window.Vue.createVNode, t = window.Vue.withCtx, d = window.Vue.openBlock, r = window.Vue.createBlock, n = window.Vue.unref, m = window.Vue.createTextVNode, ge = window.Vue.resolveDirective, O = window.Vue.withDirectives, oe = window.Vue.createElementVNode, B = window.Vue.createCommentVNode, Ke = window.Vue.renderList, He = window.Vue.Fragment, ye = window.Vue.createElementBlock, Qe = window.Vue.createSlots, Xe = window.Vue.isRef, Ye = { class: "page" }, Ze = { class: "search-box" }, el = { class: "right-tool" }, ll = { class: "table-box" }, tl = { class: "dialog-footer" }, W = window.ElementPlus.ElMessage, ol = window.ElementPlus.ElMessageBox, be = window.Vue.reactive, F = window.Vue.ref, al = {
  __name: "MenuView",
  setup(u) {
    const $ = F(), f = F(), p = F({
      name: "",
      type: 0
    }), y = F();
    let I = F([]), c = F(!1), g = F([]);
    F([]);
    let P = F([]), b = F(!1), j = F(""), k = F(!1);
    const R = be({
      children: "children",
      label: "name",
      value: "id"
    });
    let o = F({
      seq: 0,
      icon: "",
      pid: "-1",
      name: "",
      url: "",
      componentName: "",
      moduleName: "",
      component: "",
      perms: "",
      target: 0,
      isFrame: 1,
      status: 0,
      type: 0,
      menuType: 0
    });
    const S = be({
      name: [{ required: !0, message: "请输入菜单名称", trigger: "blur" }],
      seq: [{ required: !0, message: "请输入排序", trigger: "blur" }],
      menuType: [{ required: !0, message: "请选择菜单分类", trigger: "blur" }],
      status: [{ required: !0, message: "请选择菜单状态", trigger: "blur" }],
      target: [{ required: !0, message: "请选择菜单打开方式", trigger: "blur" }],
      isFrame: [{ required: !0, message: "请选择菜单是否为外链", trigger: "blur" }],
      url: [{ required: !0, message: "请输入菜单地址", trigger: "blur" }],
      type: [{ required: !0, message: "请选择菜单类型", trigger: "blur" }]
    });
    function h() {
      c.value = !0, ae(p.value).then((_) => {
        g.value = ue(_.data, "id", "pid", "children", "-1"), c.value = !1;
      });
    }
    function G() {
      p.value = {
        name: "",
        type: p.value.type
      }, $.value.resetFields(), h();
    }
    function ne(_) {
      ol.confirm("确定要删除[" + _.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Pe(_.id).then((e) => {
          e.code === 200 && e.data ? (W.success("删除成功"), h()) : W.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function K(_) {
      j.value = `添加${p.value.type === 0 ? "前台" : "后台"}菜单`, s(), b.value = !0, k.value = !0, ae({ type: p.value.type }).then((e) => {
        P.value = [{ id: "-1", name: "主类目", children: ue(e.data, "id", "pid", "children", "-1") }], k.value = !1;
      }), _ && _.id && (o.value.pid = _.id, o.value.type = _.type);
    }
    function Y() {
      b.value = !1, s();
    }
    function Z(_) {
      s(), j.value = `修改${p.value.type === 0 ? "前台" : "后台"}菜单`, b.value = !0, k.value = !0, ae({ type: p.value.type }).then((e) => {
        P.value = [{ id: "-1", name: "主类目", children: ue(e.data, "id", "pid", "children", "-1") }], Ee(_.id).then((x) => {
          k.value = !1, o.value = x.data, y.value.setCurrentKey(x.data.pid);
        });
      });
    }
    function v() {
      f.value.validate((_) => {
        _ && (o.value.pid || (o.value.pid = "-1"), o.value.id ? Le(o.value).then((e) => {
          e.code === 200 ? (W.success("修改成功"), b.value = !1, s(), h()) : W.error(e.msg);
        }) : $e(o.value).then((e) => {
          e.code === 200 ? (W.success("添加成功"), b.value = !1, s(), h()) : W.error(e.msg);
        }));
      });
    }
    function s() {
      o.value = {
        seq: 0,
        icon: "",
        pid: "-1",
        name: "",
        url: "",
        componentName: "",
        moduleName: "",
        component: "",
        perms: "",
        target: 0,
        isFrame: 1,
        status: 0,
        type: 0,
        menuType: 0
      }, f.value && f.value.resetFields();
    }
    function z() {
      Ge().then((_) => {
        I.value = _.data;
      });
    }
    return z(), h(), (_, e) => {
      const x = V("el-input"), w = V("el-form-item"), L = V("el-option"), i = V("el-select"), U = V("el-button"), pe = V("el-form"), C = V("el-col"), ce = V("el-row"), q = V("el-table-column"), xe = V("font-awesome-icon"), ee = V("el-tag"), he = V("el-table"), Ce = V("el-tree-select"), E = V("el-radio"), H = V("el-radio-group"), Ne = V("el-input-number"), fe = V("el-option-group"), Fe = V("el-dialog"), Q = ge("hasPermission"), ve = ge("loading");
      return d(), ye("div", Ye, [
        oe("div", Ze, [
          l(pe, {
            inline: !0,
            model: p.value,
            ref_key: "searchFormRef",
            ref: $
          }, {
            default: t(() => [
              l(w, { label: "菜单名称" }, {
                default: t(() => [
                  l(x, {
                    modelValue: p.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => p.value.name = a),
                    placeholder: "请输入菜单名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(w, { label: "菜单分类" }, {
                default: t(() => [
                  l(i, {
                    modelValue: p.value.type,
                    "onUpdate:modelValue": e[1] || (e[1] = (a) => p.value.type = a),
                    placeholder: "请选择菜单分类",
                    style: { width: "200px" }
                  }, {
                    default: t(() => [
                      (d(), r(L, {
                        key: 0,
                        label: "前台",
                        value: 0
                      })),
                      (d(), r(L, {
                        key: 1,
                        label: "后台",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(w, null, {
                default: t(() => [
                  O((d(), r(U, {
                    type: "primary",
                    onClick: h,
                    icon: n(ke)
                  }, {
                    default: t(() => e[18] || (e[18] = [
                      m("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [Q, ["admin:menu:query"]]
                  ]),
                  l(U, {
                    icon: n(we),
                    onClick: G
                  }, {
                    default: t(() => e[19] || (e[19] = [
                      m("重置")
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
        l(ce, {
          gutter: 10,
          class: "mb8"
        }, {
          default: t(() => [
            l(C, { span: 1.5 }, {
              default: t(() => [
                O((d(), r(U, {
                  icon: n(Ve),
                  type: "primary",
                  plain: "",
                  onClick: K
                }, {
                  default: t(() => e[20] || (e[20] = [
                    m("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [Q, ["admin:menu:create"]]
                ])
              ]),
              _: 1
            }),
            oe("div", el, [
              l(U, {
                icon: n(we),
                circle: "",
                onClick: h
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        oe("div", ll, [
          O((d(), r(he, {
            data: n(g),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: t(() => [
              l(q, {
                prop: "name",
                label: "菜单名称",
                width: "240",
                "show-overflow-tooltip": ""
              }),
              l(q, {
                prop: "icon",
                label: "图标",
                width: "100"
              }, {
                default: t((a) => [
                  a.row.icon ? (d(), r(xe, {
                    key: 0,
                    icon: a.row.icon
                  }, null, 8, ["icon"])) : B("", !0)
                ]),
                _: 1
              }),
              l(q, {
                prop: "seq",
                label: "排序",
                width: "80"
              }),
              l(q, {
                prop: "url",
                label: "菜单地址",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(q, {
                prop: "component",
                label: "组件路径",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(q, {
                prop: "perms",
                label: "权限标识",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(q, {
                prop: "status",
                label: "状态",
                width: "80"
              }, {
                default: t((a) => [
                  a.row.status === 0 ? (d(), r(ee, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: t(() => e[21] || (e[21] = [
                      m("开启")
                    ])),
                    _: 1
                  })) : (d(), r(ee, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: t(() => e[22] || (e[22] = [
                      m("关闭")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(q, {
                prop: "type",
                label: "菜单分类",
                width: "80"
              }, {
                default: t((a) => [
                  a.row.type === 0 ? (d(), r(ee, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: t(() => e[23] || (e[23] = [
                      m("前台")
                    ])),
                    _: 1
                  })) : (d(), r(ee, {
                    key: 1,
                    class: "ml-2",
                    type: "info"
                  }, {
                    default: t(() => e[24] || (e[24] = [
                      m("后台")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(q, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: t((a) => [
                  O((d(), r(U, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(Ue),
                    onClick: (_e) => Z(a.row)
                  }, {
                    default: t(() => e[25] || (e[25] = [
                      m("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [Q, ["admin:menu:update"]]
                  ]),
                  O((d(), r(U, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(Ve),
                    onClick: (_e) => K(a.row)
                  }, {
                    default: t(() => e[26] || (e[26] = [
                      m("新增")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [Q, ["admin:menu:create"]]
                  ]),
                  O((d(), r(U, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(Te),
                    onClick: (_e) => ne(a.row)
                  }, {
                    default: t(() => e[27] || (e[27] = [
                      m("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [Q, ["admin:menu:del"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ve, n(c)]
          ])
        ]),
        l(Fe, {
          modelValue: n(b),
          "onUpdate:modelValue": e[17] || (e[17] = (a) => Xe(b) ? b.value = a : b = a),
          title: n(j),
          width: n(Be)(800),
          draggable: ""
        }, {
          footer: t(() => [
            oe("span", tl, [
              l(U, {
                type: "primary",
                onClick: v
              }, {
                default: t(() => e[39] || (e[39] = [
                  m("确 定")
                ])),
                _: 1
              }),
              l(U, { onClick: Y }, {
                default: t(() => e[40] || (e[40] = [
                  m("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            O((d(), r(pe, {
              ref_key: "ruleFormRef",
              ref: f,
              model: n(o),
              rules: S,
              "label-width": "100px",
              class: "demo-ruleForm",
              "status-icon": ""
            }, {
              default: t(() => [
                l(w, {
                  label: "父级菜单",
                  prop: "pid"
                }, {
                  default: t(() => [
                    l(Ce, {
                      modelValue: n(o).pid,
                      "onUpdate:modelValue": e[2] || (e[2] = (a) => n(o).pid = a),
                      data: n(P),
                      props: R,
                      "check-strictly": "",
                      "auto-expand-parent": "",
                      "render-after-expand": !1,
                      "node-key": "id",
                      ref_key: "addTreeRef",
                      ref: y,
                      style: { width: "100%" },
                      clearable: ""
                    }, null, 8, ["modelValue", "data", "props"])
                  ]),
                  _: 1
                }),
                l(w, {
                  label: "菜单类型",
                  prop: "menuType"
                }, {
                  default: t(() => [
                    l(H, {
                      modelValue: n(o).menuType,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => n(o).menuType = a)
                    }, {
                      default: t(() => [
                        l(E, {
                          label: 0,
                          value: 0
                        }, {
                          default: t(() => e[28] || (e[28] = [
                            m("目录")
                          ])),
                          _: 1
                        }),
                        l(E, {
                          label: 1,
                          value: 1
                        }, {
                          default: t(() => e[29] || (e[29] = [
                            m("菜单")
                          ])),
                          _: 1
                        }),
                        l(E, {
                          label: 2,
                          value: 2
                        }, {
                          default: t(() => e[30] || (e[30] = [
                            m("按钮")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(ce, null, {
                  default: t(() => [
                    l(C, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "菜单名称",
                          prop: "name"
                        }, {
                          default: t(() => [
                            l(x, {
                              modelValue: n(o).name,
                              "onUpdate:modelValue": e[4] || (e[4] = (a) => n(o).name = a),
                              placeholder: "请输入菜单名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    l(C, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "菜单分类",
                          prop: "type"
                        }, {
                          default: t(() => [
                            l(H, {
                              modelValue: n(o).type,
                              "onUpdate:modelValue": e[5] || (e[5] = (a) => n(o).type = a)
                            }, {
                              default: t(() => [
                                l(E, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: t(() => e[31] || (e[31] = [
                                    m("前台")
                                  ])),
                                  _: 1
                                }),
                                l(E, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: t(() => e[32] || (e[32] = [
                                    m("后台")
                                  ])),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    n(o).menuType === 0 || n(o).menuType === 1 ? (d(), r(C, {
                      key: 0,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "菜单图标",
                          prop: "icon"
                        }, {
                          default: t(() => [
                            l(We, {
                              modelValue: n(o).icon,
                              "onUpdate:modelValue": e[6] || (e[6] = (a) => n(o).icon = a)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : B("", !0),
                    l(C, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "菜单排序",
                          prop: "seq"
                        }, {
                          default: t(() => [
                            l(Ne, {
                              modelValue: n(o).seq,
                              "onUpdate:modelValue": e[7] || (e[7] = (a) => n(o).seq = a),
                              min: 0,
                              max: 9999,
                              "controls-position": "right",
                              placeholder: "菜单排序"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    n(o).menuType === 1 ? (d(), r(C, {
                      key: 1,
                      xs: 24,
                      sm: 24,
                      md: n(o).type === 0 ? 24 : 12,
                      lg: n(o).type === 0 ? 24 : 12,
                      xl: n(o).type === 0 ? 24 : 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "菜单地址",
                          prop: "url"
                        }, {
                          default: t(() => [
                            l(x, {
                              modelValue: n(o).url,
                              "onUpdate:modelValue": e[9] || (e[9] = (a) => n(o).url = a),
                              placeholder: "请输入菜单地址"
                            }, Qe({ _: 2 }, [
                              n(o).type === 0 ? {
                                name: "append",
                                fn: t(() => [
                                  l(i, {
                                    modelValue: n(o).url,
                                    "onUpdate:modelValue": e[8] || (e[8] = (a) => n(o).url = a),
                                    placeholder: "选择地址",
                                    style: { width: "240px" }
                                  }, {
                                    default: t(() => [
                                      l(fe, {
                                        key: "系统自带",
                                        label: "系统自带"
                                      }, {
                                        default: t(() => [
                                          l(L, {
                                            label: "/ [首页]",
                                            value: "/"
                                          }),
                                          l(L, {
                                            label: "/categories [分类页]",
                                            value: "/categories"
                                          }),
                                          l(L, {
                                            label: "/tags [标签页]",
                                            value: "/tags"
                                          }),
                                          l(L, {
                                            label: "/journal [动态页]",
                                            value: "/journal"
                                          }),
                                          l(L, {
                                            label: "/archive [归档页]",
                                            value: "/archive"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      l(fe, {
                                        key: "自定义页面",
                                        label: "自定义页面"
                                      }, {
                                        default: t(() => [
                                          (d(!0), ye(He, null, Ke(n(I), (a) => (d(), r(L, {
                                            label: "/page/" + a.slug + " [" + a.title + "]",
                                            value: "/page/" + a.slug
                                          }, null, 8, ["label", "value"]))), 256))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue"])
                                ]),
                                key: "0"
                              } : void 0
                            ]), 1032, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["md", "lg", "xl"])) : B("", !0),
                    n(o).menuType === 1 && n(o).type === 1 ? (d(), r(C, {
                      key: 2,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "组件名称",
                          prop: "componentName"
                        }, {
                          default: t(() => [
                            l(x, {
                              modelValue: n(o).componentName,
                              "onUpdate:modelValue": e[10] || (e[10] = (a) => n(o).componentName = a),
                              placeholder: "请输入组件名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : B("", !0),
                    n(o).menuType === 1 && n(o).type === 1 ? (d(), r(C, {
                      key: 3,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "模块名称",
                          prop: "moduleName"
                        }, {
                          default: t(() => [
                            l(x, {
                              modelValue: n(o).moduleName,
                              "onUpdate:modelValue": e[11] || (e[11] = (a) => n(o).moduleName = a),
                              placeholder: "请输入模块名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : B("", !0),
                    n(o).menuType === 1 && n(o).type === 1 ? (d(), r(C, {
                      key: 4,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "组件路径",
                          prop: "component"
                        }, {
                          default: t(() => [
                            l(x, {
                              modelValue: n(o).component,
                              "onUpdate:modelValue": e[12] || (e[12] = (a) => n(o).component = a),
                              placeholder: "请输入组件路径"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : B("", !0),
                    n(o).menuType === 2 ? (d(), r(C, {
                      key: 5,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "权限标识",
                          prop: "perms"
                        }, {
                          default: t(() => [
                            l(x, {
                              modelValue: n(o).perms,
                              "onUpdate:modelValue": e[13] || (e[13] = (a) => n(o).perms = a),
                              placeholder: "请输入权限标识"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : B("", !0),
                    n(o).menuType === 1 ? (d(), r(C, {
                      key: 6,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "打开方式",
                          prop: "target"
                        }, {
                          default: t(() => [
                            l(H, {
                              modelValue: n(o).target,
                              "onUpdate:modelValue": e[14] || (e[14] = (a) => n(o).target = a)
                            }, {
                              default: t(() => [
                                l(E, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: t(() => e[33] || (e[33] = [
                                    m("本页")
                                  ])),
                                  _: 1
                                }),
                                l(E, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: t(() => e[34] || (e[34] = [
                                    m("新窗口")
                                  ])),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : B("", !0),
                    n(o).menuType === 1 ? (d(), r(C, {
                      key: 7,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "是否外链",
                          prop: "isFrame"
                        }, {
                          default: t(() => [
                            l(H, {
                              modelValue: n(o).isFrame,
                              "onUpdate:modelValue": e[15] || (e[15] = (a) => n(o).isFrame = a)
                            }, {
                              default: t(() => [
                                l(E, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: t(() => e[35] || (e[35] = [
                                    m("是")
                                  ])),
                                  _: 1
                                }),
                                l(E, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: t(() => e[36] || (e[36] = [
                                    m("否")
                                  ])),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : B("", !0),
                    l(C, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: t(() => [
                        l(w, {
                          label: "菜单状态",
                          prop: "status"
                        }, {
                          default: t(() => [
                            l(H, {
                              modelValue: n(o).status,
                              "onUpdate:modelValue": e[16] || (e[16] = (a) => n(o).status = a)
                            }, {
                              default: t(() => [
                                l(E, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: t(() => e[37] || (e[37] = [
                                    m("开启")
                                  ])),
                                  _: 1
                                }),
                                l(E, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: t(() => e[38] || (e[38] = [
                                    m("关闭")
                                  ])),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
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
            }, 8, ["model", "rules"])), [
              [ve, n(k)]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  al as default
};
