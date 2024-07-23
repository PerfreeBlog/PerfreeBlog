import { s as _e, r as ae, p as ne, e as Ve, d as we } from "./lib/@element-plus.js";
function ve(u) {
  return axios.post("/api/auth/menu/page", u);
}
function ge(u) {
  return axios.get("/api/auth/menu/get?id=" + u);
}
function be(u) {
  return axios.post("/api/auth/menu/add", u);
}
function ye(u) {
  return axios.post("/api/auth/menu/update", u);
}
function ke(u) {
  return axios.delete("/api/auth/menu/del?id=" + u);
}
const he = window.Pinia.defineStore;
he({
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
function xe(u, k, p, V, v) {
  k = k || "id", p = p || "parentId", v = v || Math.min.apply(Math, u.map((i) => i[p])) || 0;
  const b = JSON.parse(JSON.stringify(u)), $ = b.filter((i) => {
    let h = b.filter((g) => i[k] === g[p]);
    return h.length > 0 && (i.children = h), i[p] === v;
  });
  return $ !== "" ? $ : u;
}
const Ce = (u, k) => {
  const p = u.__vccOpts || u;
  for (const [V, v] of k)
    p[V] = v;
  return p;
}, A = window.Vue.resolveComponent, U = window.Vue.openBlock, R = window.Vue.createBlock, Ne = window.Vue.createCommentVNode, B = window.Vue.withCtx, I = window.Vue.createVNode, j = window.Vue.unref, Q = window.Vue.renderList, W = window.Vue.Fragment, X = window.Vue.createElementBlock, Y = window.Vue.normalizeClass, J = window.Vue.createElementVNode, Te = window.Vue.isRef;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const Fe = { class: "el-icon-picker" }, Ue = { class: "icon-panel" }, $e = { class: "icon-panel" }, Ee = { class: "icon-panel" }, Z = window["fontawesome-svg-core"].library, G = window.Vue.ref, Be = {
  __name: "el-icon-picker",
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u, { emit: k }) {
    let p = G([]);
    Object.keys(Z.definitions.fas).forEach((g) => {
      p.value.push("fa-solid fa-" + g);
    });
    let V = G([]);
    Object.keys(Z.definitions.far).forEach((g) => {
      V.value.push("fa-regular fa-" + g);
    });
    let v = G([]);
    Object.keys(Z.definitions.fab).forEach((g) => {
      v.value.push("fa-brands fa-" + g);
    });
    let b = "fas";
    const $ = k, i = G();
    function h(g) {
      $("update:modelValue", g), i.value.hide();
    }
    return (g, t) => {
      const q = A("font-awesome-icon"), F = A("el-input"), M = A("el-tab-pane"), K = A("el-tabs"), O = A("el-popover");
      return U(), R(O, {
        trigger: "click",
        width: "500",
        placement: "bottom-start",
        ref_key: "iconSelect",
        ref: i
      }, {
        reference: B(() => [
          I(F, {
            modelValue: u.modelValue,
            class: "w-50 m-2",
            placeholder: "请选择图标"
          }, {
            prefix: B(() => [
              u.modelValue ? (U(), R(q, {
                key: 0,
                icon: u.modelValue
              }, null, 8, ["icon"])) : Ne("", !0)
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        default: B(() => [
          J("div", Fe, [
            I(K, {
              modelValue: j(b),
              "onUpdate:modelValue": t[0] || (t[0] = (s) => Te(b) ? b.value = s : b = s)
            }, {
              default: B(() => [
                I(M, {
                  label: "实心图标",
                  name: "fas"
                }, {
                  default: B(() => [
                    J("div", Ue, [
                      (U(!0), X(W, null, Q(j(p), (s) => (U(), R(q, {
                        class: Y([s, "icon", { "icon-active": s === u.modelValue }]),
                        icon: s,
                        key: s,
                        onClick: (P) => h(s)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                }),
                I(M, {
                  label: "常规图标",
                  name: "far"
                }, {
                  default: B(() => [
                    J("div", $e, [
                      (U(!0), X(W, null, Q(j(V), (s) => (U(), R(q, {
                        class: Y([s, "icon", { "icon-active": s === u.modelValue }]),
                        icon: s,
                        key: s,
                        onClick: (P) => h(s)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                }),
                I(M, {
                  label: "品牌图标",
                  name: "fab"
                }, {
                  default: B(() => [
                    J("div", Ee, [
                      (U(!0), X(W, null, Q(j(v), (s) => (U(), R(q, {
                        class: Y([s, "icon", { "icon-active": s === u.modelValue }]),
                        icon: s,
                        key: s,
                        onClick: (P) => h(s)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }, 512);
    };
  }
}, qe = /* @__PURE__ */ Ce(Be, [["__scopeId", "data-v-45ddfaa3"]]), m = window.Vue.resolveComponent, e = window.Vue.createVNode, l = window.Vue.withCtx, c = window.Vue.openBlock, f = window.Vue.createBlock, o = window.Vue.unref, d = window.Vue.createTextVNode, H = window.Vue.createElementVNode, N = window.Vue.createCommentVNode, Le = window.Vue.resolveDirective, Me = window.Vue.withDirectives, Se = window.Vue.isRef, De = window.Vue.createElementBlock, Ae = { class: "page" }, Re = { class: "search-box" }, Ie = { class: "right-tool" }, Oe = { class: "table-box" }, Pe = { class: "dialog-footer" }, L = window.ElementPlus.ElMessage, ze = window.ElementPlus.ElMessageBox, ue = window.Vue.reactive, T = window.Vue.ref, Je = {
  __name: "MenuView",
  setup(u) {
    const k = T(), p = T(), V = T({
      name: "",
      type: 0
    });
    let v = T(!1), b = T([]), $ = T([]), i = T(!1), h = T("");
    const g = ue({
      children: "children",
      label: "name",
      value: "id"
    });
    let t = T({
      seq: 0,
      icon: "",
      type: 0,
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
      menuType: 0
    });
    const q = ue({
      name: [{ required: !0, message: "请输入菜单名称", trigger: "blur" }],
      seq: [{ required: !0, message: "请输入排序", trigger: "blur" }],
      menuType: [{ required: !0, message: "请选择菜单分类", trigger: "blur" }],
      status: [{ required: !0, message: "请选择菜单状态", trigger: "blur" }],
      target: [{ required: !0, message: "请选择菜单打开方式", trigger: "blur" }],
      isFrame: [{ required: !0, message: "请选择菜单是否为外链", trigger: "blur" }],
      url: [{ required: !0, message: "请输入菜单地址", trigger: "blur" }],
      type: [{ required: !0, message: "请选择菜单类型", trigger: "blur" }]
    });
    function F() {
      v.value = !0, ve(V.value).then((_) => {
        b.value = xe(_.data, "id", "pid", "children", "-1"), $.value = [{ id: "-1", name: "主类目", children: b.value }], v.value = !1;
      });
    }
    function M() {
      V.value = {
        name: "",
        type: 0
      }, k.value.resetFields();
    }
    function K(_) {
      ze.confirm("确定要删除[" + _.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ke(_.id).then((a) => {
          a.code === 200 && a.data ? (L.success("删除成功"), F()) : L.error(a.msg);
        });
      }).catch(() => {
      });
    }
    function O(_) {
      h.value = "添加菜单", S(), i.value = !0, _ && _.id && (t.value.pid = _.id, t.value.type = _.type);
    }
    function s() {
      i.value = !1, S();
    }
    function P(_) {
      S(), ge(_.id).then((a) => {
        t.value = a.data, h.value = "修改菜单", i.value = !0;
      });
    }
    function de() {
      p.value.validate((_) => {
        _ && (t.value.pid || (t.value.pid = "-1"), t.value.id ? ye(t.value).then((a) => {
          a.code === 200 ? (L.success("修改成功"), i.value = !1, S(), F()) : L.error(a.msg);
        }) : be(t.value).then((a) => {
          a.code === 200 ? (L.success("添加成功"), i.value = !1, S(), F()) : L.error(a.msg);
        }));
      });
    }
    function S() {
      t.value = {
        seq: 0,
        icon: "",
        type: 0,
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
        menuType: 0
      }, p.value && p.value.resetFields();
    }
    return F(), (_, a) => {
      const E = m("el-input"), r = m("el-form-item"), ee = m("el-option"), se = m("el-select"), x = m("el-button"), le = m("el-form"), w = m("el-col"), te = m("el-row"), C = m("el-table-column"), ie = m("font-awesome-icon"), z = m("el-tag"), re = m("el-table"), me = m("el-tree-select"), y = m("el-radio"), D = m("el-radio-group"), ce = m("el-input-number"), pe = m("el-dialog"), fe = Le("loading");
      return c(), De("div", Ae, [
        H("div", Re, [
          e(le, {
            inline: !0,
            model: V.value,
            ref_key: "searchFormRef",
            ref: k
          }, {
            default: l(() => [
              e(r, { label: "菜单名称" }, {
                default: l(() => [
                  e(E, {
                    modelValue: V.value.name,
                    "onUpdate:modelValue": a[0] || (a[0] = (n) => V.value.name = n),
                    placeholder: "请输入菜单名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(r, { label: "菜单分类" }, {
                default: l(() => [
                  e(se, {
                    modelValue: V.value.type,
                    "onUpdate:modelValue": a[1] || (a[1] = (n) => V.value.type = n),
                    placeholder: "请选择菜单分类",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: l(() => [
                      (c(), f(ee, {
                        key: 0,
                        label: "前台",
                        value: 0
                      })),
                      (c(), f(ee, {
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
              e(r, null, {
                default: l(() => [
                  e(x, {
                    type: "primary",
                    onClick: F,
                    icon: o(_e)
                  }, {
                    default: l(() => [
                      d("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  e(x, {
                    icon: o(ae),
                    onClick: M
                  }, {
                    default: l(() => [
                      d("重置")
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
        e(te, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            e(w, { span: 1.5 }, {
              default: l(() => [
                e(x, {
                  icon: o(ne),
                  type: "primary",
                  plain: "",
                  onClick: O
                }, {
                  default: l(() => [
                    d("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            H("div", Ie, [
              e(x, {
                icon: o(ae),
                circle: "",
                onClick: F
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        H("div", Oe, [
          Me((c(), f(re, {
            data: o(b),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              e(C, {
                prop: "name",
                label: "菜单名称",
                width: "240"
              }),
              e(C, {
                prop: "icon",
                label: "图标",
                width: "100"
              }, {
                default: l((n) => [
                  n.row.icon ? (c(), f(ie, {
                    key: 0,
                    icon: n.row.icon
                  }, null, 8, ["icon"])) : N("", !0)
                ]),
                _: 1
              }),
              e(C, {
                prop: "seq",
                label: "排序",
                width: "80"
              }),
              e(C, {
                prop: "url",
                label: "菜单地址",
                "min-width": "150"
              }),
              e(C, {
                prop: "component",
                label: "组件路径",
                "min-width": "150"
              }),
              e(C, {
                prop: "perms",
                label: "权限标识",
                "min-width": "150"
              }),
              e(C, {
                prop: "status",
                label: "状态",
                width: "80"
              }, {
                default: l((n) => [
                  n.row.status === 0 ? (c(), f(z, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: l(() => [
                      d("开启")
                    ]),
                    _: 1
                  })) : (c(), f(z, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: l(() => [
                      d("关闭")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              e(C, {
                prop: "type",
                label: "菜单分类",
                width: "80"
              }, {
                default: l((n) => [
                  n.row.type === 0 ? (c(), f(z, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: l(() => [
                      d("前台")
                    ]),
                    _: 1
                  })) : (c(), f(z, {
                    key: 1,
                    class: "ml-2",
                    type: "info"
                  }, {
                    default: l(() => [
                      d("后台")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              e(C, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: l((n) => [
                  e(x, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(Ve),
                    onClick: (oe) => P(n.row)
                  }, {
                    default: l(() => [
                      d("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(x, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(ne),
                    onClick: (oe) => O(n.row)
                  }, {
                    default: l(() => [
                      d("新增")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(x, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(we),
                    onClick: (oe) => K(n.row)
                  }, {
                    default: l(() => [
                      d("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [fe, o(v)]
          ])
        ]),
        e(pe, {
          modelValue: o(i),
          "onUpdate:modelValue": a[16] || (a[16] = (n) => Se(i) ? i.value = n : i = n),
          title: o(h),
          width: "800px",
          draggable: ""
        }, {
          footer: l(() => [
            H("span", Pe, [
              e(x, {
                type: "primary",
                onClick: de
              }, {
                default: l(() => [
                  d("确 定")
                ]),
                _: 1
              }),
              e(x, { onClick: s }, {
                default: l(() => [
                  d("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            e(le, {
              ref_key: "ruleFormRef",
              ref: p,
              model: o(t),
              rules: q,
              "label-width": "100px",
              class: "demo-ruleForm",
              "status-icon": ""
            }, {
              default: l(() => [
                e(r, {
                  label: "父级菜单",
                  prop: "pid"
                }, {
                  default: l(() => [
                    e(me, {
                      modelValue: o(t).pid,
                      "onUpdate:modelValue": a[2] || (a[2] = (n) => o(t).pid = n),
                      data: o($),
                      props: g,
                      "check-strictly": "",
                      "render-after-expand": !1,
                      style: { width: "100%" },
                      clearable: ""
                    }, null, 8, ["modelValue", "data", "props"])
                  ]),
                  _: 1
                }),
                e(r, {
                  label: "菜单类型",
                  prop: "menuType"
                }, {
                  default: l(() => [
                    e(D, {
                      modelValue: o(t).menuType,
                      "onUpdate:modelValue": a[3] || (a[3] = (n) => o(t).menuType = n)
                    }, {
                      default: l(() => [
                        e(y, {
                          label: 0,
                          value: 0
                        }, {
                          default: l(() => [
                            d("目录")
                          ]),
                          _: 1
                        }),
                        e(y, {
                          label: 1,
                          value: 1
                        }, {
                          default: l(() => [
                            d("菜单")
                          ]),
                          _: 1
                        }),
                        e(y, {
                          label: 2,
                          value: 2
                        }, {
                          default: l(() => [
                            d("按钮")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(te, null, {
                  default: l(() => [
                    e(w, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "菜单名称",
                          prop: "name"
                        }, {
                          default: l(() => [
                            e(E, {
                              modelValue: o(t).name,
                              "onUpdate:modelValue": a[4] || (a[4] = (n) => o(t).name = n),
                              placeholder: "请输入菜单名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    e(w, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "菜单分类",
                          prop: "type"
                        }, {
                          default: l(() => [
                            e(D, {
                              modelValue: o(t).type,
                              "onUpdate:modelValue": a[5] || (a[5] = (n) => o(t).type = n)
                            }, {
                              default: l(() => [
                                e(y, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: l(() => [
                                    d("前台")
                                  ]),
                                  _: 1
                                }),
                                e(y, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: l(() => [
                                    d("后台")
                                  ]),
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
                    o(t).menuType === 0 || o(t).menuType === 1 ? (c(), f(w, {
                      key: 0,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "菜单图标",
                          prop: "icon"
                        }, {
                          default: l(() => [
                            e(qe, {
                              modelValue: o(t).icon,
                              "onUpdate:modelValue": a[6] || (a[6] = (n) => o(t).icon = n)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    e(w, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "菜单排序",
                          prop: "seq"
                        }, {
                          default: l(() => [
                            e(ce, {
                              modelValue: o(t).seq,
                              "onUpdate:modelValue": a[7] || (a[7] = (n) => o(t).seq = n),
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
                    o(t).menuType === 1 ? (c(), f(w, {
                      key: 1,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "菜单地址",
                          prop: "url"
                        }, {
                          default: l(() => [
                            e(E, {
                              modelValue: o(t).url,
                              "onUpdate:modelValue": a[8] || (a[8] = (n) => o(t).url = n),
                              placeholder: "请输入菜单地址"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 && o(t).type === 1 ? (c(), f(w, {
                      key: 2,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "组件名称",
                          prop: "componentName"
                        }, {
                          default: l(() => [
                            e(E, {
                              modelValue: o(t).componentName,
                              "onUpdate:modelValue": a[9] || (a[9] = (n) => o(t).componentName = n),
                              placeholder: "请输入组件名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 && o(t).type === 1 ? (c(), f(w, {
                      key: 3,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "模块名称",
                          prop: "moduleName"
                        }, {
                          default: l(() => [
                            e(E, {
                              modelValue: o(t).moduleName,
                              "onUpdate:modelValue": a[10] || (a[10] = (n) => o(t).moduleName = n),
                              placeholder: "请输入模块名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 && o(t).type === 1 ? (c(), f(w, {
                      key: 4,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "组件路径",
                          prop: "component"
                        }, {
                          default: l(() => [
                            e(E, {
                              modelValue: o(t).component,
                              "onUpdate:modelValue": a[11] || (a[11] = (n) => o(t).component = n),
                              placeholder: "请输入组件路径"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 2 ? (c(), f(w, {
                      key: 5,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "权限标识",
                          prop: "perms"
                        }, {
                          default: l(() => [
                            e(E, {
                              modelValue: o(t).perms,
                              "onUpdate:modelValue": a[12] || (a[12] = (n) => o(t).perms = n),
                              placeholder: "请输入权限标识"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 ? (c(), f(w, {
                      key: 6,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "打开方式",
                          prop: "target"
                        }, {
                          default: l(() => [
                            e(D, {
                              modelValue: o(t).target,
                              "onUpdate:modelValue": a[13] || (a[13] = (n) => o(t).target = n)
                            }, {
                              default: l(() => [
                                e(y, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: l(() => [
                                    d("本页")
                                  ]),
                                  _: 1
                                }),
                                e(y, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: l(() => [
                                    d("新窗口")
                                  ]),
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
                    })) : N("", !0),
                    o(t).menuType === 1 ? (c(), f(w, {
                      key: 7,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "是否外链",
                          prop: "isFrame"
                        }, {
                          default: l(() => [
                            e(D, {
                              modelValue: o(t).isFrame,
                              "onUpdate:modelValue": a[14] || (a[14] = (n) => o(t).isFrame = n)
                            }, {
                              default: l(() => [
                                e(y, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: l(() => [
                                    d("是")
                                  ]),
                                  _: 1
                                }),
                                e(y, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: l(() => [
                                    d("否")
                                  ]),
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
                    })) : N("", !0),
                    e(w, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: l(() => [
                        e(r, {
                          label: "菜单状态",
                          prop: "status"
                        }, {
                          default: l(() => [
                            e(D, {
                              modelValue: o(t).status,
                              "onUpdate:modelValue": a[15] || (a[15] = (n) => o(t).status = n)
                            }, {
                              default: l(() => [
                                e(y, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: l(() => [
                                    d("开启")
                                  ]),
                                  _: 1
                                }),
                                e(y, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: l(() => [
                                    d("关闭")
                                  ]),
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
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  Je as default
};
