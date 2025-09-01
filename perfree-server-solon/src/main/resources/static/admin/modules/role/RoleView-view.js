import { s as de, r as q, p as ce, e as pe, f as me, d as fe } from "./lib/@element-plus.js";
function ge(t) {
  return axios.get("/api/auth/role/getRoleMenus?id=" + t);
}
function he(t) {
  return axios.post("/api/auth/role/assignRoleMenu", t);
}
function ve(t) {
  return axios.post("/api/auth/menu/list", t);
}
const we = window.Pinia.defineStore;
we({
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
    setMenuInit(t) {
      this.menuInit = t;
    },
    setOptionInit(t) {
      this.optionInit = t;
    },
    setMenuList(t) {
      this.menuList = t;
    },
    setCachedViews(t) {
      this.cachedViews = t;
    }
  },
  persist: {
    enabled: !1
  }
});
function _e(t, y) {
  if (arguments.length === 0 || !t)
    return null;
  const _ = y || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof t == "object" ? i = t : (typeof t == "string" && /^[0-9]+$/.test(t) ? t = parseInt(t) : typeof t == "string" && (t = t.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof t == "number" && t.toString().length === 10 && (t = t * 1e3), i = new Date(t));
  const r = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return _.replace(/{([ymdhisa])+}/g, (x, s) => {
    let h = r[s];
    return s === "a" ? ["日", "一", "二", "三", "四", "五", "六"][h] : (x.length > 0 && h < 10 && (h = "0" + h), h || 0);
  });
}
function be(t, y, _, i, r) {
  y = y || "id", _ = _ || "parentId", r = r || Math.min.apply(Math, t.map((s) => s[_])) || 0;
  const d = JSON.parse(JSON.stringify(t)), x = d.filter((s) => {
    let h = d.filter((M) => s[y] === M[_]);
    return h.length > 0 && (s.children = h), s[_] === r;
  });
  return x.length === 0 && t.length > 0 ? t : x.length > 0 ? x : t;
}
function J(t) {
  return window.document.body.clientWidth < t ? window.document.body.clientWidth : t;
}
function Ve(t) {
  return axios.post("/api/auth/role/page", t);
}
function ye(t) {
  return axios.get("/api/auth/role/get?id=" + t);
}
function ke(t) {
  return axios.post("/api/auth/role/add", t);
}
function xe(t) {
  return axios.post("/api/auth/role/update", t);
}
function Ce(t) {
  return axios.delete("/api/auth/role/del?id=" + t);
}
const Re = window.Pinia.defineStore;
Re({
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
    setActiveTab(t) {
      this.activeTab = t;
    },
    setTheme(t) {
      this.theme = t;
    },
    setPrimaryColor(t) {
      this.primaryColor = t;
    },
    setHeaderUnified(t) {
      this.headerUnified = t;
    },
    setTabOpen(t) {
      this.tabOpen = t;
    },
    setRefreshRouteflag(t) {
      this.refreshRouteflag = t;
    },
    setRouteAnimation(t) {
      this.routeAnimation = t;
    }
  },
  persist: {
    enabled: !0
    //开启本地存储
  }
});
const g = window.Vue.resolveComponent, l = window.Vue.createVNode, a = window.Vue.withCtx, u = window.Vue.unref, w = window.Vue.createTextVNode, W = window.Vue.resolveDirective, C = window.Vue.openBlock, T = window.Vue.createBlock, R = window.Vue.withDirectives, A = window.Vue.createElementVNode, Ae = window.Vue.toDisplayString, D = window.Vue.isRef, Me = window.Vue.createElementBlock, Te = { class: "page" }, Fe = { class: "search-box" }, Ue = { class: "right-tool" }, Ee = { class: "table-box" }, Se = { style: { width: "100%", border: "1px solid rgb(228 231 237)", padding: "5px" } }, De = { class: "dialog-footer" }, Oe = { class: "dialog-footer" }, V = window.ElementPlus.ElMessage, ze = window.ElementPlus.ElMessageBox, Ne = window.Vue.reactive, p = window.Vue.ref, Be = {
  __name: "RoleView",
  setup(t) {
    let y = p([]);
    const _ = {
      children: "children",
      label: "name"
    }, i = p({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    }), r = p({
      id: "",
      name: "",
      code: "",
      expand: !1,
      selectAll: !1
    }), d = p({
      id: "",
      name: "",
      code: "",
      description: ""
    }), x = Ne({
      name: [{ required: !0, message: "请输入角色名称", trigger: "blur" }],
      code: [{ required: !0, message: "请输入角色编码", trigger: "blur" }]
    }), s = p(), h = p(), M = p(), O = p();
    let b = p(!1), v = p(!1), F = p(""), L = p([]), z = p(!1), N = p(!1);
    function G(n, e) {
      let c = e.checkedKeys.findIndex((m) => m === n.id), f = !1;
      c >= 0 && (f = !0), s.value.setChecked(n.id, f, !1), f ? P(n, !0) : P(n, !1);
    }
    function P(n, e) {
      n.children && n.children.length > 0 && n.children.forEach((c) => {
        s.value.setChecked(c.id, e, !1), c.children && c.children.length > 0 && P(c, e);
      });
    }
    function Y() {
      M.value.validate((n) => {
        n && (d.value.id ? xe(d.value).then((e) => {
          e.code === 200 ? (V.success("操作成功"), v.value = !1, U(), k()) : V.error(e.msg);
        }) : ke(d.value).then((e) => {
          e.code === 200 ? (V.success("操作成功"), v.value = !1, U(), k()) : V.error(e.msg);
        }));
      });
    }
    function Q() {
      U(), F.value = "添加角色", v.value = !0;
    }
    function X(n) {
      U(), F.value = "修改角色", v.value = !0, ye(n.id).then((e) => {
        d.value = e.data;
      });
    }
    function Z(n) {
      ze.confirm("确定要删除[" + n.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Ce(n.id).then((e) => {
          e.code === 200 && e.data ? (V.success("删除成功"), k()) : V.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function k() {
      z.value = !0, Ve(i.value).then((n) => {
        L.value = n.data.list, i.value.total = n.data.total, z.value = !1;
      });
    }
    function ee() {
      i.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, h.value.resetFields(), k();
    }
    function U() {
      d.value = {
        id: "",
        name: "",
        code: "",
        description: ""
      }, M.value && M.value.resetFields();
    }
    function B() {
      r.value = {
        id: "",
        name: "",
        code: "",
        expand: !1,
        selectAll: !1
      }, O.value && O.value.resetFields();
    }
    function te(n) {
      if (n.code === "admin") {
        V.warning("admin角色默认拥有所有权限,不可修改");
        return;
      }
      B(), b.value = !0, r.value.name = n.name, r.value.code = n.code, r.value.id = n.id, F.value = "菜单权限", N.value = !0, ve({ type: 1 }).then((e) => {
        y.value = be(e.data, "id", "pid", "children", "-1"), ge(n.id).then((c) => {
          s.value.setCheckedKeys(c.data), N.value = !1;
        });
      });
    }
    function le() {
      r.value.expand ? Object.values(s.value.store.nodesMap).forEach((n) => n.expand()) : Object.values(s.value.store.nodesMap).forEach((n) => n.collapse());
    }
    function ne() {
      r.value.selectAll ? Object.values(s.value.store.nodesMap).forEach((n) => {
        n.checked = !0;
      }) : Object.values(s.value.store.nodesMap).forEach((n) => {
        n.checked = !1;
      });
    }
    function oe() {
      let n = {
        menuIds: [...s.value.getCheckedKeys(), ...s.value.getHalfCheckedKeys()],
        roleId: r.value.id
      };
      he(n).then((e) => {
        e.code === 200 && e.data ? (V.success("操作成功"), b.value = !1, B()) : V.error(e.msg);
      });
    }
    return k(), (n, e) => {
      const c = g("el-input"), f = g("el-form-item"), m = g("el-button"), I = g("el-form"), ae = g("el-col"), ie = g("el-row"), E = g("el-table-column"), re = g("el-table"), se = g("el-pagination"), j = g("el-checkbox"), ue = g("el-tree"), $ = g("el-dialog"), S = W("hasPermission"), H = W("loading");
      return C(), Me("div", Te, [
        A("div", Fe, [
          l(I, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: h
          }, {
            default: a(() => [
              l(f, { label: "角色名称" }, {
                default: a(() => [
                  l(c, {
                    modelValue: i.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => i.value.name = o),
                    placeholder: "请输入角色名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(f, null, {
                default: a(() => [
                  R((C(), T(m, {
                    type: "primary",
                    onClick: k,
                    icon: u(de)
                  }, {
                    default: a(() => e[14] || (e[14] = [
                      w("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [S, ["admin:role:query"]]
                  ]),
                  l(m, {
                    icon: u(q),
                    onClick: ee
                  }, {
                    default: a(() => e[15] || (e[15] = [
                      w("重置")
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
        l(ie, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            l(ae, { span: 1.5 }, {
              default: a(() => [
                R((C(), T(m, {
                  icon: u(ce),
                  type: "primary",
                  plain: "",
                  onClick: Q
                }, {
                  default: a(() => e[16] || (e[16] = [
                    w("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [S, ["admin:role:create"]]
                ])
              ]),
              _: 1
            }),
            A("div", Ue, [
              l(m, {
                icon: u(q),
                circle: "",
                onClick: k
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        A("div", Ee, [
          R((C(), T(re, {
            data: u(L),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              l(E, {
                prop: "name",
                label: "角色名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(E, {
                prop: "code",
                label: "角色编码",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(E, {
                prop: "description",
                label: "描述",
                "min-width": "240",
                "show-overflow-tooltip": ""
              }),
              l(E, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: a((o) => [
                  A("span", null, Ae(u(_e)(o.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(E, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: a((o) => [
                  R((C(), T(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(pe),
                    onClick: (K) => X(o.row)
                  }, {
                    default: a(() => e[17] || (e[17] = [
                      w("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [S, ["admin:role:update"]]
                  ]),
                  R((C(), T(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(me),
                    onClick: (K) => te(o.row)
                  }, {
                    default: a(() => e[18] || (e[18] = [
                      w("菜单权限 ")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [S, ["admin:role:permission"]]
                  ]),
                  R((C(), T(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(fe),
                    onClick: (K) => Z(o.row)
                  }, {
                    default: a(() => e[19] || (e[19] = [
                      w("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [S, ["admin:role:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [H, u(z)]
          ]),
          l(se, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (o) => i.value.pageNo = o),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (o) => i.value.pageSize = o),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: k,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l($, {
          modelValue: u(b),
          "onUpdate:modelValue": e[8] || (e[8] = (o) => D(b) ? b.value = o : b = o),
          title: u(F),
          width: u(J)(600),
          draggable: ""
        }, {
          footer: a(() => [
            A("span", De, [
              l(m, {
                type: "primary",
                onClick: oe
              }, {
                default: a(() => e[20] || (e[20] = [
                  w("确 定")
                ])),
                _: 1
              }),
              l(m, {
                onClick: e[7] || (e[7] = (o) => {
                  D(b) ? b.value = !1 : b = !1, B();
                })
              }, {
                default: a(() => e[21] || (e[21] = [
                  w("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            l(I, {
              ref_key: "menuFormRef",
              ref: O,
              model: r.value,
              "label-width": "80px",
              class: "demo-ruleForm",
              "status-icon": ""
            }, {
              default: a(() => [
                l(f, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: a(() => [
                    l(c, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": e[3] || (e[3] = (o) => r.value.name = o),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(f, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: a(() => [
                    l(c, {
                      modelValue: r.value.code,
                      "onUpdate:modelValue": e[4] || (e[4] = (o) => r.value.code = o),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(f, {
                  label: "菜单权限",
                  prop: "code"
                }, {
                  default: a(() => [
                    l(j, {
                      modelValue: r.value.expand,
                      "onUpdate:modelValue": e[5] || (e[5] = (o) => r.value.expand = o),
                      label: "展开/折叠",
                      onChange: le
                    }, null, 8, ["modelValue"]),
                    l(j, {
                      modelValue: r.value.selectAll,
                      "onUpdate:modelValue": e[6] || (e[6] = (o) => r.value.selectAll = o),
                      label: "全选/全不选",
                      onChange: ne
                    }, null, 8, ["modelValue"]),
                    A("div", Se, [
                      R(l(ue, {
                        props: _,
                        data: u(y),
                        "node-key": "id",
                        "show-checkbox": "",
                        ref_key: "menuTree",
                        ref: s,
                        "check-strictly": !0,
                        onCheck: G
                      }, null, 8, ["data"]), [
                        [H, u(N)]
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
        }, 8, ["modelValue", "title", "width"]),
        l($, {
          modelValue: u(v),
          "onUpdate:modelValue": e[13] || (e[13] = (o) => D(v) ? v.value = o : v = o),
          title: u(F),
          width: u(J)(600),
          draggable: ""
        }, {
          footer: a(() => [
            A("span", Oe, [
              l(m, {
                type: "primary",
                onClick: Y
              }, {
                default: a(() => e[22] || (e[22] = [
                  w("确 定")
                ])),
                _: 1
              }),
              l(m, {
                onClick: e[12] || (e[12] = (o) => {
                  D(v) ? v.value = !1 : v = !1, U();
                })
              }, {
                default: a(() => e[23] || (e[23] = [
                  w("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            l(I, {
              ref_key: "addFormRef",
              ref: M,
              model: d.value,
              "label-width": "80px",
              "status-icon": "",
              rules: x
            }, {
              default: a(() => [
                l(f, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: a(() => [
                    l(c, {
                      modelValue: d.value.name,
                      "onUpdate:modelValue": e[9] || (e[9] = (o) => d.value.name = o),
                      placeholder: "请输入角色名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(f, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: a(() => [
                    l(c, {
                      modelValue: d.value.code,
                      "onUpdate:modelValue": e[10] || (e[10] = (o) => d.value.code = o),
                      placeholder: "请输入角色编码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(f, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: a(() => [
                    l(c, {
                      modelValue: d.value.description,
                      "onUpdate:modelValue": e[11] || (e[11] = (o) => d.value.description = o),
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
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  Be as default
};
